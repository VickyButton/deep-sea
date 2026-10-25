import type { TaskFailure, TaskResult, TaskState, TaskSuccess } from './task.types';
import { Signal } from '../signal/Signal';

/** Represents an asynchronous task that can be tracked. */
export class Task<Data = void> {
  /** Emitted when the task fails. */
  public readonly failed = new Signal();
  /** Emitted when the task is finished, regardless of its finished state. */
  public readonly finished = new Signal();
  /** The task's unique ID. */
  public readonly id: string;
  /** Emitted when the task has been started and is now in active state. */
  public readonly started = new Signal();
  /** Emitted when the task successfully finishes. */
  public readonly succeeded = new Signal();
  private _result: TaskResult<Data> | null = null;
  private _state: TaskState = 'CREATED';
  private startTask: StartTask<Data>;

  constructor(id: string, startTask: StartTask<Data>) {
    this.id = id;
    this.startTask = startTask;
  }

  /** The results of the task. If the task is not yet finished, this will be null. */
  public get result() {
    return this._result;
  }

  /** The current state of the task. */
  public get state() {
    return this._state;
  }

  /** Starts the task. A task can only be started once. */
  public start() {
    if (this.isActiveOrFinished) {
      throw new Error('Task is already active or finished.');
    }

    this.handleTaskPromise(this.startTask());
    this.setState('ACTIVE');
    this.emitStartedSignal();
  }

  private get isActiveOrFinished() {
    return this.state !== 'CREATED';
  }

  private async handleTaskPromise(promise: Promise<Data>) {
    promise
      .then(this.onTaskSuccess)
      .catch(this.onTaskFail)
      .finally(this.onTaskFinished);
  }

  private onTaskSuccess = (data: Data) => {
    this.setResult(this.createSuccessResult(data));
    this.setState('SUCCESS');
    this.emitSucceededSignal();
  };

  private setResult(result: TaskResult<Data>) {
    this._result = result;
  }

  private createSuccessResult(data: Data): TaskSuccess<Data> {
    return {
      id: this.id,
      success: true,
      data,
    };
  }

  private emitSucceededSignal() {
    this.succeeded.emit();
  }

  private onTaskFail = (err: unknown) => {
    this.setResult(this.createFailureResult(this.parseFailureReason(err)));
    this.setState('FAILED');
    this.emitFailedSignal();
  };

  private createFailureResult(failureReason: string | null): TaskFailure {
    return {
      id: this.id,
      success: false,
      failureReason,
    };
  }

  private parseFailureReason(err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }

    if (typeof err === 'string') {
      return err;
    }

    return null;
  }

  private emitFailedSignal() {
    this.failed.emit();
  }

  private onTaskFinished = () => {
    this.emitFinishedSignal();
  };

  private emitFinishedSignal() {
    this.finished.emit();
  }

  private setState(state: TaskState) {
    this._state = state;
  }

  private emitStartedSignal() {
    this.started.emit();
  }
}

type StartTask<Data> = () => Promise<Data>;

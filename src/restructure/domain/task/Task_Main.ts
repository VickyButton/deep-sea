import type { Task, TaskFailure, TaskResult, TaskState, TaskSuccess } from './task.types';
import { Signal_Main } from '../signals/signal/Signal_Main';

/** The main implementation of the Task interface. */
export class Task_Main<Data = void> implements Task<Data> {
  public readonly failed = new Signal_Main();
  public readonly finished = new Signal_Main();
  public readonly id: string;
  public readonly started = new Signal_Main();
  public readonly succeeded = new Signal_Main();
  private _result: TaskResult<Data> | null = null;
  private _state: TaskState = 'CREATED';
  private startTask: StartTask<Data>;

  constructor(id: string, startTask: StartTask<Data>) {
    this.id = id;
    this.startTask = startTask;
  }

  public get result() {
    return this._result;
  }

  public get state() {
    return this._state;
  }

  public start() {
    this.handleTaskPromise(this.startTask());
    this.setState('ACTIVE');
    this.emitStartedSignal();
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

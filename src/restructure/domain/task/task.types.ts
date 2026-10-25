import type { Signal } from '../signal/Signal';

/** Represents an asynchronous task that can be tracked. */
export interface Task<Data = void> {
  /** Emitted when the task fails. */
  readonly failed: Signal;
  /** Emitted when the task is finished, regardless of its finished state. */
  readonly finished: Signal;
  /** The task's unique ID. */
  readonly id: string;
  /** Emitted when the task has been started and is now in active state. */
  readonly started: Signal;
  /** Emitted when the task successfully finishes. */
  readonly succeeded: Signal;
  /** The results of the task. If the task is not yet finished, this will be null. */
  get result(): TaskResult<Data> | null;
  /** The current state of the task. */
  get state(): TaskState;
  /** Starts the task. A task can only be started once. */
  start(): void;
}

/** The results of a task. */
export type TaskResult<Data> = TaskSuccess<Data> | TaskFailure;

/** The results of a task that finishes in a success state. */
export interface TaskSuccess<Data = void> {
  id: string;
  success: true;
  data: Data;
}

/** The results of a task that finishes in a failure state. */
export interface TaskFailure {
  id: string;
  success: false;
  failureReason: string | null;
}

/** A state in which a task can exist. */
export type TaskState = 'CREATED' | 'ACTIVE' | 'SUCCESS' | 'FAILED';

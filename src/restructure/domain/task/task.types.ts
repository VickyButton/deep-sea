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

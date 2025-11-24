import { generateId } from '../utils/generateId';
import { error, log } from '../utils/logger';

type Task<T> = Promise<T>;

const LOG_TAG = 'TaskManager';

export class TaskManager {
  private activeTasks = new Set<string>();

  /**
   * Registers a task and returns a task ID to track the task's progress.
   *
   * @param task The task to register.
   * @param onComplete The callback to execute upon completing the task.
   * @returns A task ID that can be used for tracking the task's progress.
   */
  public registerTask<T>(task: Task<T>, onComplete: (data: T) => void) {
    const taskStart = performance.now();
    const taskId = generateId();

    this.activeTasks.add(taskId);

    log(LOG_TAG, `Task ${taskId} registered`);

    task
      .then((data: T) => {
        const dt = Math.floor(performance.now() - taskStart);

        log(LOG_TAG, `Task ${taskId} completed in ${String(dt)}ms`);

        onComplete(data);

        this.completeTask(taskId);
      })
      .catch((err: unknown) => {
        error(LOG_TAG, `Task ${taskId} failed with following error: "${String(err)}"`);
      });

    return taskId;
  }

  /**
   * Checks if a task is active.
   *
   * @param taskId The ID of the task to check.
   * @returns True is task is still active, false if not.
   */
  public isTaskActive(taskId: string) {
    return this.activeTasks.has(taskId);
  }

  private completeTask(taskId: string) {
    this.activeTasks.delete(taskId);
  }
}

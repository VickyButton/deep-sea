import { generateId } from '@core/utils/generateId';

type Task<T> = Promise<T>;

class TaskManager {
  private activeTasks = new Set<string>();

  /**
   * Registers a task and returns a task ID to track the task's progress.
   *
   * @param task The task to register.
   * @param onComplete The callback to execute upon completing the task.
   * @returns A task ID that can be used for tracking the task's progress.
   */
  public registerTask<T>(task: Task<T>, onComplete: (data: T) => void) {
    const taskId = generateId();

    this.activeTasks.add(taskId);

    task
      .then((data: T) => {
        onComplete(data);

        this.completeTask(taskId);
      })
      .catch((err: unknown) => {
        throw new Error(String(err));
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

let tasks = new TaskManager();

export function useTasks() {
  return tasks;
}

export function resetTasks() {
  tasks = new TaskManager();
}

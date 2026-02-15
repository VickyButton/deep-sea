import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTasks } from './tasks';

describe('tasks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute callback on task complete', async () => {
    const taskManager = useTasks();
    const task = Promise.resolve('data');
    const onComplete = vi.fn();

    taskManager.registerTask(task, onComplete);

    expect(onComplete).not.toHaveBeenCalled();

    await task;

    expect(onComplete).toHaveBeenCalledWith('data');
  });

  it('should track active tasks', async () => {
    const taskManager = useTasks();
    const task = Promise.resolve('data');
    const onComplete = vi.fn();

    const taskId = taskManager.registerTask(task, onComplete);

    expect(taskManager.isTaskActive(taskId)).toBe(true);

    await task;

    expect(taskManager.isTaskActive(taskId)).toBe(false);
  });
});

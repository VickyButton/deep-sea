import { Task } from './Task';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('Task', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have no result by default', () => {
    const task = new Task('ID', startTask);

    expect(task.result).toBe(null);
  });

  it('should be in a "CREATED" state by default', () => {
    const task = new Task('ID', startTask);

    expect(task.state).toBe('CREATED');
  });

  it('should throw an error if active or finished task is started again', () => {
    const task = new Task('ID', startTask);

    task.start();

    expect(() => task.start()).toThrowError();
  });

  it('should start task upon starting', () => {
    const task = new Task('ID', startTask);

    task.start();

    expect(startTask).toHaveBeenCalled();
  });

  it('should emit "started" signal upon starting', () => {
    const task = new Task('ID', startTask);
    const emitSpy = vi.spyOn(task.started, 'emit');

    task.start();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should be in an "ACTIVE" state after starting', () => {
    const task = new Task('ID', startTask);

    task.start();

    expect(task.state).toBe('ACTIVE');
  });

  it('should emit "succeeded" signal upon finishing in a success state', async () => {
    const promise = Promise.resolve();
    const task = new Task('ID', startTask);
    const emitSpy = vi.spyOn(task.succeeded, 'emit');
    startTask.mockImplementationOnce(() => promise);

    task.start();
    await promise;

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit "finished" signal upon finishing in a success state', async () => {
    const promise = Promise.resolve();
    const task = new Task('ID', startTask);
    const emitSpy = vi.spyOn(task.finished, 'emit');
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).resolves.toBeUndefined();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should have populated results after finishing in a success state', async () => {
    const promise = Promise.resolve('DATA');
    const task = new Task('ID', startTask);
    startTask.mockImplementationOnce(() => promise);

    task.start();
    await promise;

    expect(task.result).toEqual({
      id: 'ID',
      success: true,
      data: 'DATA',
    });
  });

  it('should be in "SUCCESS" state after finishing in a success state', async () => {
    const promise = Promise.resolve();
    const task = new Task('ID', startTask);
    startTask.mockImplementationOnce(() => promise);

    task.start();
    await promise;

    expect(task.state).toBe('SUCCESS');
  });

  it('should emit "failed" signal upon finishing in a failure state', async () => {
    const promise = Promise.reject();
    const task = new Task('ID', startTask);
    const emitSpy = vi.spyOn(task.failed, 'emit');
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).rejects.toThrow();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit "finished" signal upon finishing in a failure state', async () => {
    const promise = Promise.reject();
    const task = new Task('ID', startTask);
    const emitSpy = vi.spyOn(task.finished, 'emit');
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).rejects.toThrow();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should have populated results after finishing in a failure state', async () => {
    const promise = Promise.reject();
    const task = new Task('ID', startTask);
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).rejects.toThrow();
    expect(task.result).toEqual({
      id: 'ID',
      success: false,
      failureReason: null,
    });
  });

  it('should parse failure reason from error upon finishing in a failure state', async () => {
    const promise = Promise.reject(new Error('FAILURE_REASON'));
    const task = new Task('ID', startTask);
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).rejects.toThrow();
    expect(task.result).toEqual({
      id: 'ID',
      success: false,
      failureReason: 'FAILURE_REASON',
    });
  });

  it('should parse failure reason from string upon finishing in a failure state', async () => {
    const promise = Promise.reject('FAILURE_REASON');
    const task = new Task('ID', startTask);
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).rejects.toThrow();
    expect(task.result).toEqual({
      id: 'ID',
      success: false,
      failureReason: 'FAILURE_REASON',
    });
  });

  it('should be in "FAILED" state after finishing in a failure state', async () => {
    const promise = Promise.reject();
    const task = new Task('ID', startTask);
    startTask.mockImplementationOnce(() => promise);

    task.start();

    await expect(promise).rejects.toThrow();
    expect(task.state).toBe('FAILED');
  });
});

const startTask = vi.fn().mockImplementation(() => {
  return new Promise(() => { });
});

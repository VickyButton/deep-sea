import type { Canvas } from '../../domain/canvases/Canvas';
import type { DrawCommand, GraphicsEngine } from '../graphicsEngine.types';

export class GraphicsEngineDefault implements GraphicsEngine {
  private readonly canvas: Canvas;
  private cache = new DrawCommandCache();
  private queue = new DrawCommandQueue();

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  public deleteCachedDrawCommand(id: string) {
    this.deleteCommandFromCache(id);
  }

  private deleteCommandFromCache(id: string) {
    this.cache.delete(id);
  }

  public processDrawCommandQueue() {
    this.clearCanvas();
    this.applyCacheToQueue();
    this.processQueue();
    this.clearQueue();
  }

  private clearCanvas() {
    this.canvas.clear();
  }

  private applyCacheToQueue() {
    const cachedCommands = this.getCachedCommands();

    for (const command of cachedCommands) {
      this.addCommandToQueue(command);
    }
  }

  private getCachedCommands() {
    return this.cache.commands;
  }

  private addCommandToQueue(command: DrawCommand) {
    this.queue.add(command);
  }

  private processQueue() {
    this.processCommands(this.getQueuedCommands());
  }

  private processCommands(commands: DrawCommand[]) {
    for (const command of commands) {
      this.processCommand(command);
    }
  }

  private processCommand(command: DrawCommand) {
    this.drawToCanvas(command);
    this.cacheCommand(command);
  }

  private drawToCanvas(command: DrawCommand) {
    command.draw(this.canvas);
  }

  private cacheCommand(command: DrawCommand) {
    this.cache.set(command.id, command);
  }

  private getQueuedCommands() {
    return this.queue.commands;
  }

  private clearQueue() {
    this.queue.clear();
  }

  public queueDrawCommand(command: DrawCommand) {
    this.addCommandToQueue(command);
  }
}

/** Manages the draw command queue. */
class DrawCommandQueue {
  private readonly _commands = new Set<DrawCommand>();

  /** The queued draw commands, ordered by ascending z-index. */
  public get commands() {
    return this.sortByZIndex(this.commandsArray);
  }

  private sortByZIndex(commands: DrawCommand[]) {
    return commands.sort((a, b) => a.zIndex - b.zIndex);
  }

  private get commandsArray() {
    return Array.from(this._commands);
  }

  /**
   * Adds a command to the queue.
   * @param command The command to add to the queue.
   */
  public add(command: DrawCommand) {
    this._commands.add(command);
  }

  /** Clears the queue. */
  public clear() {
    this._commands.clear();
  }
}

/** Manages the draw command cache. */
class DrawCommandCache {
  private readonly _commands = new Map<string, DrawCommand>();

  public get commands() {
    return this.commandsArray;
  }

  private get commandsArray() {
    return Array.from(this._commands.values());
  }

  /**
   * Caches a draw command.
   * @param key The key for accessing the cached command.
   * @param command The command to cache.
   */
  public set(key: string, command: DrawCommand) {
    this._commands.set(key, command);
  }

  /**
   * Delete a draw command from the cache.
   * @param key The key for accessing the cached command.
   */
  public delete(key: string) {
    this._commands.delete(key);
  }
}

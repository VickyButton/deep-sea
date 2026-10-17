import type { DrawCommand, Graphics } from './graphics.types';
import type { Canvas } from '../../domain/canvas/canvas.types';

/** The main implementation of the Graphics interface. */
export class Graphics_Main implements Graphics {
  private readonly cache = new DrawCommandCache();
  private readonly canvas: Canvas;
  private readonly queue = new DrawCommandQueue();

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  public cacheCommand(command: DrawCommand) {
    this.addCommandToCache(command);
  }

  private addCommandToCache(command: DrawCommand) {
    this.cache.set(command.id, command);
  }

  public clearQueue() {
    this.clearCommandQueue();
  }

  private clearCommandQueue() {
    this.queue.clear();
  }

  public deleteCommand(id: string) {
    this.deleteCommandFromCache(id);
  }

  private deleteCommandFromCache(id: string) {
    this.cache.delete(id);
  }

  public queueCommand(command: DrawCommand) {
    this.addCommandToQueue(command);
  }

  private addCommandToQueue(command: DrawCommand) {
    this.queue.add(command);
  }

  public render() {
    this.clearCanvas();
    this.processCommands();
    this.clearCommandQueue();

    return this.frame;
  }

  private clearCanvas() {
    this.canvas.clear();
  }

  private processCommands() {
    for (const command of this.orderedCommands) {
      this.processCommand(command);
    }
  }

  private get orderedCommands() {
    return this.sortByZIndex(this.dedupedCommands);
  }

  private sortByZIndex(commands: DrawCommand[]) {
    return commands.sort((a, b) => a.zIndex - b.zIndex);
  }

  private get dedupedCommands() {
    return this.dedupeCommands(this.allCommands);
  }

  private dedupeCommands(commands: DrawCommand[]) {
    return Array.from(new Set(commands));
  }

  private get allCommands() {
    // Cached commands are overwritten by queued commands with identical IDs.
    return [...this.cachedCommands, ...this.queuedCommands];
  }

  private get cachedCommands() {
    return this.cache.commands;
  }

  private get queuedCommands() {
    return this.queue.commands;
  }

  private processCommand(command: DrawCommand) {
    this.executeCommand(command);
  }

  private executeCommand(command: DrawCommand) {
    command.draw(this.canvas);
  }

  private get frame() {
    return this.getCanvasImageBitmap();
  }

  private getCanvasImageBitmap() {
    return this.canvas.toImageBitmap();
  }
}

/** Manages the draw command queue. */
class DrawCommandQueue {
  private readonly _commands = new Set<DrawCommand>();

  /** The queued draw commands, ordered by ascending z-index. */
  public get commands() {
    return this.commandsArray;
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

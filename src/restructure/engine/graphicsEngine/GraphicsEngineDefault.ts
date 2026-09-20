import type { GraphicsCanvas } from '../../providers/graphicsCanvas.types';
import type { DrawCommand } from '../graphicsEngine.types';

export class GraphicsEngineDefault {
  private canvas: GraphicsCanvas | null = null;
  private queue = new DrawCommandQueue();

  public setCanvas(canvas: GraphicsCanvas | null) {
    this.canvas = canvas;
  }

  public queueDrawCommand(command: DrawCommand) {
    this.queue.add(command);
  }

  public draw() {
    this.processCommandQueue(this.queue.commands);
    this.clearQueue();
  }

  private processCommandQueue(commands: DrawCommand[]) {
    if (this.canvas) {
      this.drawToCanvas(this.canvas, commands);
    }

    this.clearQueue();
  }

  private drawToCanvas(canvas: GraphicsCanvas, commands: DrawCommand[]) {
    for (const command of commands) {
      command.draw(canvas);
    }
  }

  private clearQueue() {
    this.queue.clear();
  }
}

/**
 * Manages the draw command queue.
 */
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

  public add(command: DrawCommand) {
    this._commands.add(command);
  }

  public clear() {
    this._commands.clear();
  }
}

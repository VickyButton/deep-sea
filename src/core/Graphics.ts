import { createCanvas } from './utils/createCanvas';

export interface GraphicsConfiguration {
  width: number;
  height: number;
}

export class Graphics {
  private readonly configuration: GraphicsConfiguration;
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D;

  constructor(configuration: GraphicsConfiguration) {
    this.configuration = configuration;
  }

  public initialize(app: HTMLDivElement) {
    this.canvas = createCanvas(this.width, this.height);

    const context = this.canvas.getContext('2d');

    if (context === null) throw new Error('Could not instantiate Graphics');

    this.context = context;

    app.appendChild(this.canvas);
  }

  public clear() {
    if (this.context) this.context.clearRect(0, 0, this.width, this.height);
  }

  private get width() {
    return this.configuration.width;
  }

  private get height() {
    return this.configuration.height;
  }
}

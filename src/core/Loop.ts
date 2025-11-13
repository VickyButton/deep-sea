export interface LoopConfiguration {
  framesPerSecond: number;
}

interface LoopState {
  isRunning: boolean;
  then: number;
  elapsedFrames: number;
}

export class Loop {
  private readonly configuration: LoopConfiguration;
  private state: LoopState;
  private onLoop?: (dt: number) => void;

  constructor(configuration: LoopConfiguration) {
    this.configuration = configuration;
    this.state = this.getDefaultState();
  }

  public initialize(onLoop: (dt: number) => void) {
    this.onLoop = onLoop;
  }

  public start() {
    this.state.isRunning = true;
    this.state.then = performance.now();
    this.loop();
  }

  public stop() {
    this.state.isRunning = false;
  }

  public reset() {
    this.state = this.getDefaultState();
  }

  public loop() {
    if (!this.state.isRunning) return false;

    requestAnimationFrame(this.loop.bind(this));

    const now = performance.now();
    const dt = now - this.state.then;

    if (dt <= this.framesPerSecondInterval) return;

    this.state.then = now - (dt % this.framesPerSecondInterval);

    if (this.onLoop) this.onLoop(dt);
  }

  private get framesPerSecondInterval() {
    return 1000 / this.configuration.framesPerSecond;
  }

  private getDefaultState() {
    return {
      isRunning: false,
      then: 0,
      elapsedFrames: 0,
    };
  }
}

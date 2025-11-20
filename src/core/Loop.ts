import { timestampNow } from './utils/dateTimeProvider';
import { log } from './utils/logger';

export interface LoopConfiguration {
  framesPerSecond: number;
}

interface LoopState {
  isRunning: boolean;
  then: number;
}

const LOG_TAG = 'Loop';

export class Loop {
  private readonly configuration: LoopConfiguration;
  private state: LoopState;
  private onLoop?: (dt: number) => void;

  constructor(configuration: LoopConfiguration) {
    this.configuration = configuration;
    this.state = this.getDefaultState();
  }

  public initialize(onLoop: (dt: number) => void) {
    log(LOG_TAG, 'Initializing...');

    this.onLoop = onLoop;
  }

  public start() {
    log(LOG_TAG, 'Starting...');

    this.state.isRunning = true;
    this.state.then = timestampNow();
    this.loop();
  }

  public stop() {
    log(LOG_TAG, 'Stopping...');

    this.state.isRunning = false;
  }

  public reset() {
    log(LOG_TAG, 'Resetting...');

    this.state = this.getDefaultState();
  }

  private loop() {
    if (!this.state.isRunning) return false;

    requestAnimationFrame(this.loop.bind(this));

    const now = timestampNow();
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
    };
  }
}

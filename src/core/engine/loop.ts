// TODO: Convert state into class members.
import { timestampNow } from '@utils/dateTimeProvider';
import { log } from '@utils/logger';
import { useConfig } from 'config';

interface LoopState {
  isRunning: boolean;
  then: number;
}

const LOG_TAG = 'loop';

class Loop {
  private state: LoopState;
  private onLoop?: (dt: number) => void;

  constructor() {
    this.state = this.getDefaultState();
  }

  /**
   * Starts loop.
   */
  public start() {
    log(LOG_TAG, 'Starting game loop...');

    this.state.isRunning = true;
    this.state.then = timestampNow();
    this.loop();
  }

  /**
   * Stops loop.
   */
  public stop() {
    log(LOG_TAG, 'Stopping game loop...');

    this.state.isRunning = false;
  }

  /**
   * Sets the callback that is called on each loop.
   *
   * @param onLoop The callback to execute on each loop.
   */
  public setLoopCallback(onLoop: (dt: number) => void) {
    this.onLoop = onLoop;
  }

  /**
   * Resets loop to default state.
   */
  public reset() {
    log(LOG_TAG, 'Resetting game loop...');

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
    const config = useConfig();

    return 1000 / config.game.framesPerSecond;
  }

  private getDefaultState() {
    return {
      isRunning: false,
      then: 0,
    };
  }
}

let loop = new Loop();

export function useLoop() {
  return loop;
}

export function resetLoop() {
  loop = new Loop();
}

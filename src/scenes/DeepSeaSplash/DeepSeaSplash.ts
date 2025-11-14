import type { SceneState } from '@core/entities/Scene';
import { Scene } from '@core/entities/Scene';
import { log } from '@core/utils/logger';
import { game } from 'game';

const DEEP_SEA_SPLASH_LOG_TAG = 'Scene/DeepSeaSplash';

interface DeepSeaSplashState extends SceneState {
  elapsed: number;
}

const FADE_IN_DURATION = 5000;

export default class DeepSeaSplash extends Scene<DeepSeaSplashState> {
  public initialize(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Initializing...');
  }

  public start(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Starting...');
  }

  public stop(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Stopping...');
  }

  public update(dt: number): void {
    if (this.state.elapsed < FADE_IN_DURATION) this.state.elapsed += dt;

    this.render();
  }

  private render() {
    const width = game.graphics.width;
    const height = game.graphics.height;
    const backgroundCanvas = new OffscreenCanvas(width, height);
    const backgroundContext = backgroundCanvas.getContext('2d');

    if (!backgroundContext) return;

    const backgroundGradient = backgroundContext.createLinearGradient(
      width / 2,
      0,
      width / 2,
      height,
    );

    backgroundGradient.addColorStop(0, '#1b81a7ff');
    backgroundGradient.addColorStop(1, '#064055ff');

    // Fill background color.
    backgroundContext.fillStyle = backgroundGradient;
    backgroundContext.fillRect(0, 0, width, height);

    if (this.state.elapsed < FADE_IN_DURATION) {
      const fadeInMaskAlphaValue = Math.max(0, 1 - this.state.elapsed / FADE_IN_DURATION);
      const fadeInMaskColor =
        this.state.elapsed <= FADE_IN_DURATION
          ? `rgba(0,0,0,${String(fadeInMaskAlphaValue)})`
          : 'rgba(0,0,0,0)';

      // Fill fade-in mask overlay.
      backgroundContext.fillStyle = fadeInMaskColor;
      backgroundContext.fillRect(0, 0, width, height);
    }

    // Convert to ImageBitmap.
    const imageBitmap = backgroundCanvas.transferToImageBitmap();

    // Add to draw queue.
    game.graphics.addToDrawQueue({
      imageBitmap,
      position: {
        x: width / 2,
        y: height / 2,
      },
      layer: 0,
    });
  }

  protected getDefaultState() {
    return {
      name: 'DeepSeaSplash',
      elapsed: 0,
    };
  }
}

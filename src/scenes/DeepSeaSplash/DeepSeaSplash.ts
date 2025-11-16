import type { SceneState } from '@core/entities/Scene';
import { Scene } from '@core/entities/Scene';
import { log } from '@core/utils/logger';
import FpsCounter from '@nodes/FpsCounter/FpsCounter';
import { game } from 'game';

const DEEP_SEA_SPLASH_LOG_TAG = 'Scene/DeepSeaSplash';

interface DeepSeaSplashState extends SceneState {
  elapsed: number;
}

const FADE_IN_DURATION = 5000;
const TITLE_TEXT = 'DeepSea';

export default class DeepSeaSplash extends Scene<DeepSeaSplashState> {
  private readonly fpsCounter = new FpsCounter();

  public initialize(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Initializing...');
  }

  public update(dt: number): void {
    if (this.state.elapsed < FADE_IN_DURATION) this.state.elapsed += dt;

    this.fpsCounter.update(dt);
    this.render();
  }

  private render() {
    const width = game.graphics.width;
    const height = game.graphics.height;
    const backgroundCanvas = new OffscreenCanvas(width, height);
    const backgroundContext = backgroundCanvas.getContext('2d');

    if (!backgroundContext) return;

    // Step 1: Render background gradient.
    const backgroundGradient = backgroundContext.createLinearGradient(
      width / 2,
      0,
      width / 2,
      height,
    );

    backgroundGradient.addColorStop(0, '#1b81a7ff');
    backgroundGradient.addColorStop(1, '#03202bff');

    backgroundContext.fillStyle = backgroundGradient;
    backgroundContext.fillRect(0, 0, width, height);

    // Step 2: Render title text.
    backgroundContext.font = '100px Arial';
    backgroundContext.textAlign = 'center';

    backgroundContext.fillStyle = 'black';
    backgroundContext.fillText(TITLE_TEXT, width / 2, height / 2 + 8);

    backgroundContext.fillStyle = 'white';
    backgroundContext.fillText(TITLE_TEXT, width / 2, height / 2);

    // Step 3: If still fading in, render mask.
    if (this.state.elapsed < FADE_IN_DURATION) {
      const fadeInMaskAlphaValue = Math.max(0, 1 - this.state.elapsed / FADE_IN_DURATION);
      const fadeInMaskColor = `rgba(0,0,0,${String(fadeInMaskAlphaValue)})`;

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

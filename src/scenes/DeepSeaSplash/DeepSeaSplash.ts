import type { SceneState } from '@core/entities/Scene';
import { Scene } from '@core/entities/Scene';
import { log } from '@core/utils/logger';
import FpsCounter from '@nodes/FpsCounter/FpsCounter';
import { game } from 'game';
import { DeepSeaBubble } from './DeepSeaBubble';

const LOG_TAG = 'Scene/DeepSeaSplash';

interface DeepSeaSplashState extends SceneState {
  elapsed: number;
}

const MAX_BUBBLE_COUNT = 50;
const FADE_IN_DURATION = 5000;
const TITLE_FONT_SIZE = 100;
const TITLE_FONT_FAMILY = 'Arial';
const TITLE_TEXT = 'DEEP SEA';

export default class DeepSeaSplash extends Scene<DeepSeaSplashState> {
  private readonly fpsCounter = new FpsCounter();
  private readonly bubbles: DeepSeaBubble[] = [];

  public initialize(): void {
    log(LOG_TAG, 'Initializing...');

    game.camera.setPosition({
      x: game.camera.width / 2,
      y: game.camera.height / 2,
    });
  }

  public update(dt: number): void {
    if (this.state.elapsed < FADE_IN_DURATION) this.state.elapsed += dt;

    this.fpsCounter.update(dt);
    this.updateBubbles(dt);
    this.render();
  }

  private updateBubbles(dt: number) {
    const shouldSpawnBubble = this.bubbles.length < MAX_BUBBLE_COUNT && Math.random() <= 0.03;

    if (shouldSpawnBubble) this.spawnBubble();

    for (let i = 0; i < this.bubbles.length; i++) {
      const bubble = this.bubbles[i];

      bubble.update(dt);

      if (game.camera.isOffScreen(bubble) || bubble.state.width <= 1) this.bubbles.splice(i, 1);
    }
  }

  private spawnBubble() {
    const diameter = Math.floor(240 * Math.random()) + 1;
    const x = game.camera.width * Math.random();
    const y = game.camera.height + diameter / 2;
    const bubble = new DeepSeaBubble();

    bubble.state.width = diameter;
    bubble.state.height = diameter;
    bubble.state.position.x = x;
    bubble.state.position.y = y;

    bubble.initialize();

    this.bubbles.push(bubble);
  }

  private render() {
    this.renderBackground();
    this.renderTitle();
    this.renderBubbles();

    // If still fading in, render mask.
    if (this.state.elapsed < FADE_IN_DURATION) this.renderMask();
  }

  private renderBackground() {
    const x = game.camera.width / 2;
    const y = game.camera.height / 2;
    const width = game.camera.width;
    const height = game.camera.height;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Could not get rendering context');

    const x0 = width / 2;
    const y0 = height / -2;
    const r0 = 10;
    const x1 = x0;
    const y1 = y0;
    const r1 = width;
    const gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);

    gradient.addColorStop(0, '#0f607eff');
    gradient.addColorStop(0.2, '#0b495f');
    gradient.addColorStop(1, '#000000');

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    const imageBitmap = canvas.transferToImageBitmap();

    game.graphics.addToDrawQueue({
      imageBitmap,
      position: { x, y },
      layer: 0,
    });
  }

  private renderBubbles() {
    for (const bubble of this.bubbles) bubble.render();
  }

  private renderMask() {
    const x = game.camera.width / 2;
    const y = game.camera.height / 2;
    const width = game.camera.width;
    const height = game.camera.height;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Could not get rendering context');

    const alphaValue = Math.max(0, 1 - this.state.elapsed / FADE_IN_DURATION);
    const fillStyle = `rgba(0,0,0,${String(alphaValue)})`;

    context.fillStyle = fillStyle;
    context.fillRect(0, 0, width, height);

    const imageBitmap = canvas.transferToImageBitmap();

    game.graphics.addToDrawQueue({
      imageBitmap,
      position: { x, y },
      layer: 3,
    });
  }

  private renderTitle() {
    const x = game.camera.width / 2;
    const y = game.camera.height / 2;
    const width = TITLE_FONT_SIZE * 6;
    const height = TITLE_FONT_SIZE;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Could not get rendering context');

    context.font = `${String(TITLE_FONT_SIZE)}px ${TITLE_FONT_FAMILY}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.strokeStyle = 'white';
    context.strokeText(TITLE_TEXT, width / 2, height / 2);

    const imageBitmap = canvas.transferToImageBitmap();

    game.graphics.addToDrawQueue({
      imageBitmap,
      position: { x, y },
      layer: 2,
    });
  }

  protected getDefaultState() {
    return {
      name: 'DeepSeaSplash',
      elapsed: 0,
    };
  }
}

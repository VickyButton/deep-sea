import type { Point2D } from '@core/interfaces/Point2D';
import { Node } from '@core/entities/Node';
import { log } from '@core/utils/logger';
import { game } from 'game';

interface DeepSeaBubbleState {
  velocity: number;
  width: number;
  height: number;
  position: Point2D;
}

const RADIUS_SHRINK_RATE = 0.000075;
const BASE_VELOCITY_X = -0.002;
const LOG_TAG = 'DeepSeaBubble';

export class DeepSeaBubble extends Node<DeepSeaBubbleState> {
  public setup() {
    log(LOG_TAG, 'Initializing...');

    this.state.velocity = BASE_VELOCITY_X * this.radius;
  }

  public update(dt: number): void {
    const shrinkage = 1 - dt * RADIUS_SHRINK_RATE;
    const newDiameter = Math.max(1, this.state.width * shrinkage);

    this.state.position.y += dt * this.state.velocity;
    this.state.width = newDiameter;
    this.state.height = newDiameter;
  }

  public teardown() {
    // Empty function.
  }

  public render() {
    const width = this.state.width;
    const height = this.state.height;

    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Could not get rendering context');

    const x0 = width / 2;
    const y0 = height / 2;
    const r0 = 0.7 * this.radius;
    const x1 = x0;
    const y1 = y0;
    const r1 = this.radius;
    const gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);

    gradient.addColorStop(0, 'rgba(31, 48, 54, 0.2)');
    gradient.addColorStop(1, 'rgba(31, 48, 54, 0.6)');

    context.beginPath();
    context.arc(width / 2, height / 2, this.radius - 1, 0, 2 * Math.PI);

    context.fillStyle = gradient;
    context.fill();

    context.strokeStyle = 'rgba(172, 172, 172, 0.1)';
    context.stroke();

    const imageBitmap = canvas.transferToImageBitmap();

    game.graphics.addToDrawQueue({
      imageBitmap,
      position: this.state.position,
      layer: 1,
    });
  }

  private get radius() {
    return Math.max(1, this.state.width / 2);
  }

  protected getDefaultState(): DeepSeaBubbleState {
    return {
      velocity: 0,
      width: 0,
      height: 0,
      position: {
        x: 0,
        y: 0,
      },
    };
  }
}

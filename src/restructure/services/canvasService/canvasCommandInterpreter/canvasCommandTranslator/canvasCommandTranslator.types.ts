import type { Canvas } from './canvas/Canvas';
import type { BeginPath } from './canvasCommand/BeginPath';
import type { ClosePath } from './canvasCommand/ClosePath';
import type { DrawArc } from './canvasCommand/DrawArc';
import type { DrawLine } from './canvasCommand/DrawLine';
import type { DrawRectangle } from './canvasCommand/DrawRectangle';
import type { Fill } from './canvasCommand/Fill';
import type { ResetTransform } from './canvasCommand/ResetTransform';
import type { SetFillColor } from './canvasCommand/SetFillColor';
import type { SetStrokeColor } from './canvasCommand/SetStrokeColor';
import type { SetTransform } from './canvasCommand/SetTransform';
import type { Stroke } from './canvasCommand/Stroke';

/** A callback that takes a canvas as an argument. */
export type CanvasCallback = (canvas: Canvas) => void;
/** A command that can be translated into a canvas callback. */
export type CanvasCommand = BeginPath | ClosePath | DrawArc | DrawLine | DrawRectangle | Fill | ResetTransform | SetFillColor | SetStrokeColor | SetTransform | Stroke;

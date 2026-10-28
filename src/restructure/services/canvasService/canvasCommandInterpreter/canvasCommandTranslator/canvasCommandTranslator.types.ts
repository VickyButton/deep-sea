import type { Canvas } from './canvas/Canvas';
import type { BeginPath } from './canvasCommand/beginPath/BeginPath';
import type { ClosePath } from './canvasCommand/closePath/ClosePath';
import type { DrawArc } from './canvasCommand/drawArc/DrawArc';
import type { DrawLine } from './canvasCommand/drawLine/DrawLine';
import type { DrawRectangle } from './canvasCommand/drawRectangle/DrawRectangle';
import type { Fill } from './canvasCommand/fill/Fill';
import type { ResetTransform } from './canvasCommand/resetTransform/ResetTransform';
import type { SetFillColor } from './canvasCommand/setFillColor/SetFillColor';
import type { SetStrokeColor } from './canvasCommand/setStrokeColor/SetStrokeColor';
import type { SetTransform } from './canvasCommand/setTransform/SetTransform';
import type { Stroke } from './canvasCommand/stroke/Stroke';

/** A callback that takes a canvas as an argument. */
export type CanvasCallback = (canvas: Canvas) => void;
/** A command that can be translated into a canvas callback. */
export type CanvasCommand = BeginPath | ClosePath | DrawArc | DrawLine | DrawRectangle | Fill | ResetTransform | SetFillColor | SetStrokeColor | SetTransform | Stroke;

import type { BeginPath } from './beginPath/BeginPath';
import type { ClosePath } from './closePath/ClosePath';
import type { DrawArc } from './drawArc/DrawArc';
import type { DrawLine } from './drawLine/DrawLine';
import type { DrawRectangle } from './drawRectangle/DrawRectangle';
import type { Fill } from './fill/Fill';
import type { ResetTransform } from './resetTransform/ResetTransform';
import type { SetFillColor } from './setFillColor/SetFillColor';
import type { SetStrokeColor } from './setStrokeColor/SetStrokeColor';
import type { SetTransform } from './setTransform/SetTransform';
import type { Stroke } from './stroke/Stroke';

/** A command that can be translated into a canvas callback. */
export type CanvasCommand = BeginPath | ClosePath | DrawArc | DrawLine | DrawRectangle | Fill | ResetTransform | SetFillColor | SetStrokeColor | SetTransform | Stroke;

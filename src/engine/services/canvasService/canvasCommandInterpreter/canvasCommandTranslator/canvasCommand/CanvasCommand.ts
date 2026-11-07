import type { BeginPath } from './BeginPath';
import type { ClosePath } from './ClosePath';
import type { DrawArc } from './DrawArc';
import type { DrawLine } from './DrawLine';
import type { DrawRectangle } from './DrawRectangle';
import type { Fill } from './Fill';
import type { ResetTransform } from './ResetTransform';
import type { SetFillColor } from './SetFillColor';
import type { SetStrokeColor } from './SetStrokeColor';
import type { SetTransform } from './SetTransform';
import type { Stroke } from './Stroke';

/** A command that can be translated into a canvas callback. */
export type CanvasCommand = BeginPath | ClosePath | DrawArc | DrawLine | DrawRectangle | Fill | ResetTransform | SetFillColor | SetStrokeColor | SetTransform | Stroke;

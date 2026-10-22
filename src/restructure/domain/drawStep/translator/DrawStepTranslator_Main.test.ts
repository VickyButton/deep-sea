import { DrawStepTranslator_Main } from './DrawStepTranslator_Main';
import { Canvas_Mock } from '../../canvas/Canvas_Mock';
import { describe, expect, it } from 'vitest';

describe('DrawStepTranslator_Main', () => {
  it('should translate step with "BEGIN_PATH" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'BEGIN_PATH',
    })(canvas);

    expect(canvas.beginPath).toHaveBeenCalled();
  });

  it('should translate step with "CLOSE_PATH" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'CLOSE_PATH',
    })(canvas);

    expect(canvas.closePath).toHaveBeenCalled();
  });

  it('should translate step with "DRAW_ARC" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'DRAW_ARC',
      x: 1,
      y: 2,
      radius: 3,
      startAngle: 4,
      endAngle: 5,
      counterClockwise: true,
    })(canvas);

    expect(canvas.drawArc).toHaveBeenCalledWith(1, 2, 3, 4, 5, true);
  });

  it('should translate step with "DRAW_LINE" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'DRAW_LINE',
      fromX: 1,
      fromY: 2,
      toX: 3,
      toY: 4,
    })(canvas);

    expect(canvas.drawLine).toHaveBeenCalledWith(1, 2, 3, 4);
  });

  it('should translate step with "DRAW_RECTANGLE" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'DRAW_RECTANGLE',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    })(canvas);

    expect(canvas.drawRectangle).toHaveBeenCalledWith(1, 2, 3, 4);
  });

  it('should translate step with "FILL" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'FILL',
    })(canvas);

    expect(canvas.fill).toHaveBeenCalled();
  });

  it('should translate step with "RESET_TRANSFORM" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'RESET_TRANSFORM',
    })(canvas);

    expect(canvas.resetTransform).toHaveBeenCalled();
  });

  it('should translate step with "SET_FILL_COLOR" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'SET_FILL_COLOR',
      color: 'COLOR',
    })(canvas);

    expect(canvas.setFillColor).toHaveBeenCalledWith('COLOR');
  });

  it('should translate step with "SET_STROKE_COLOR" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'SET_STROKE_COLOR',
      color: 'COLOR',
    })(canvas);

    expect(canvas.setStrokeColor).toHaveBeenCalledWith('COLOR');
  });

  it('should translate step with "SET_TRANSFORM" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'SET_TRANSFORM',
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
    })(canvas);

    expect(canvas.setTransform).toHaveBeenCalledWith(1, 2, 3, 4, 5, 6);
  });

  it('should translate step with "STROKE" type', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    translator.translate({
      type: 'STROKE',
    })(canvas);

    expect(canvas.stroke).toHaveBeenCalled();
  });

  it('should throw an error if step type is unknown', () => {
    const translator = new DrawStepTranslator_Main();
    const canvas = new Canvas_Mock();

    expect(() => translator.translate({
      // @ts-expect-error Passing unknown type.
      type: 'UNKNOWN',
    })(canvas)).toThrowError();
  });
});

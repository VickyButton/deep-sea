import { DrawInstructionsBuilder_Main } from './DrawInstructionsBuilder_Main';
import { describe, expect, it } from 'vitest';

describe('DrawInstructionsBuilder_Main', () => {
  it('should add a "BEGIN_PATH" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.beginPath();

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'BEGIN_PATH',
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "CLOSE_PATH" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.closePath();

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'CLOSE_PATH',
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "DRAW_ARC" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.drawArc(1, 2, 3, 4, 5, true);

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'DRAW_ARC',
          x: 1,
          y: 2,
          radius: 3,
          startAngle: 4,
          endAngle: 5,
          counterClockwise: true,
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "DRAW_LINE" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.drawLine(1, 2, 3, 4);

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'DRAW_LINE',
          fromX: 1,
          fromY: 2,
          toX: 3,
          toY: 4,
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "DRAW_RECTANGLE" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.drawRectangle(1, 2, 3, 4);

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'DRAW_RECTANGLE',
          x: 1,
          y: 2,
          width: 3,
          height: 4,
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "FILL" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.fill();

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'FILL',
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "RESET_TRANSFORM" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.resetTransform();

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'RESET_TRANSFORM',
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "SET_FILL_COLOR" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.setFillColor('COLOR');

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'SET_FILL_COLOR',
          color: 'COLOR',
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "SET_STROKE_COLOR" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.setStrokeColor('COLOR');

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'SET_STROKE_COLOR',
          color: 'COLOR',
        },
      ],
      zIndex: 0,
    });
  });

  it('should add a "SET_TRANSFORM" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.setTransform(1, 2, 3, 4, 5, 6);

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'SET_TRANSFORM',
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
          f: 6,
        },
      ],
      zIndex: 0,
    });
  });

  it('should set the z-index for the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.setZIndex(1);

    expect(builder.build()).toEqual({
      steps: [],
      zIndex: 1,
    });
  });

  it('should add a "STROKE" draw step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.stroke();

    expect(builder.build()).toEqual({
      steps: [
        {
          type: 'STROKE',
        },
      ],
      zIndex: 0,
    });
  });
});

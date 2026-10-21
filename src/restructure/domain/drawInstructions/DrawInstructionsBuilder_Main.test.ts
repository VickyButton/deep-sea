import { DrawInstructionsBuilder_Main } from './DrawInstructionsBuilder_Main';
import { describe, expect, it } from 'vitest';

describe('DrawInstructionsBuilder_Main', () => {
  it('should throw an error if adding a step before starting build', () => {
    const builder = new DrawInstructionsBuilder_Main();

    expect(() => builder.addStep({
      type: 'FILL',
    })).toThrowError();
  });

  it('should add a step to the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.startBuild();
    builder.addStep({
      type: 'FILL',
    });

    expect(builder.finishBuild().steps).toEqual(
      [{
        type: 'FILL',
      }],
    );
  });

  it('should throw an error if finishing build before starting build', () => {
    const builder = new DrawInstructionsBuilder_Main();

    expect(() => builder.finishBuild()).toThrowError();
  });

  it('should have no active build after finishing a build', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.startBuild();
    builder.finishBuild();

    expect(() => builder.finishBuild()).toThrowError();
  });

  it('should throw an error if setting z-index before starting build', () => {
    const builder = new DrawInstructionsBuilder_Main();

    expect(() => builder.setZIndex(0)).toThrowError();
  });

  it('should set the z-index for the instructions', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.startBuild();
    builder.setZIndex(-1);

    expect(builder.finishBuild().zIndex).toBe(-1);
  });

  it('should throw an error if starting a build while another build is already active', () => {
    const builder = new DrawInstructionsBuilder_Main();

    builder.startBuild();

    expect(() => builder.startBuild()).toThrowError();
  });
});

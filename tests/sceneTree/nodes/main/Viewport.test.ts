import { Camera2D } from '../../../../src/sceneTree/nodes/2D/Camera2D';
import { Viewport } from '../../../../src/sceneTree/nodes/main/Viewport';
import { describe, expect, it } from 'vitest';

describe('Viewport', () => {
  it('should have no camera by default', () => {
    expect(createViewport().camera).toBe(null);
  });

  it('should set camera', () => {
    const viewport = createViewport();
    const camera = createCamera();

    viewport.setCamera(camera);

    expect(viewport.camera).toBe(camera);
  });

  it('should add camera to children upon setting camera', () => {
    const viewport = createViewport();
    const camera = createCamera();

    viewport.setCamera(camera);

    expect(viewport.children.includes(camera)).toBe(true);
  });

  it('should unset camera', () => {
    const viewport = createViewport();

    viewport.setCamera(createCamera());
    viewport.unsetCamera();

    expect(viewport.camera).toBe(null);
  });

  it('should replace current camera upon setting new camera', () => {
    const viewport = createViewport();
    const camera = createCamera();
    const newCamera = createCamera();

    viewport.setCamera(camera);
    viewport.setCamera(newCamera);

    expect(viewport.camera).toBe(newCamera);
  });

  it('should remove current camera from children before setting new camera', () => {
    const viewport = createViewport();
    const camera = createCamera();

    viewport.setCamera(camera);
    viewport.setCamera(createCamera());

    expect(viewport.children.includes(camera)).toBe(false);
  });

  it('should remove camera from children upon setting camera', () => {
    const viewport = createViewport();

    viewport.setCamera(createCamera());
    viewport.unsetCamera();

    expect(viewport.children[0]).toBe(undefined);
  });
});

function createViewport() {
  return new Viewport({
    id: 'VIEWPORT',
  });
}

function createCamera() {
  return new Camera2D({
    id: 'CAMERA',
  });
}

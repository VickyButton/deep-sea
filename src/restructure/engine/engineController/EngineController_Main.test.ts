import { EngineController_Main } from './EngineController_Main';
import { Graphics_Mock } from '../graphics/Graphics_Mock';
import { SceneTree_Mock } from '../sceneTree/SceneTree_Mock';
import { describe, expect, it } from 'vitest';

describe('EngineController_Main', () => {
  it('should not be listening by default', () => {
    const controller = new EngineController_Main({
      graphics: new Graphics_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    expect(controller.isListening).toBe(false);
  });

  it('should be listening after starting', () => {
    const controller = new EngineController_Main({
      graphics: new Graphics_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    controller.startListening();

    expect(controller.isListening).toBe(true);
  });

  it('should not be listening after stopping', () => {
    const controller = new EngineController_Main({
      graphics: new Graphics_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    controller.startListening();
    controller.stopListening();

    expect(controller.isListening).toBe(false);
  });
});

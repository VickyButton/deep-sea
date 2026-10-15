import { EngineController_Main } from './EngineController_Main';
import { CanvasNode_Mock } from '../../nodes/canvasNode/CanvasNode_Mock';
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

  it('should queue draw command upon canvas node emitting "redraw_requested" signal', () => {
    const graphics = new Graphics_Mock();
    const sceneTree = new SceneTree_Mock();
    const controller = new EngineController_Main({
      graphics,
      sceneTree,
    });
    const canvasNode = new CanvasNode_Mock('node');
    const command = {
      id: canvasNode.id,
      zIndex: canvasNode.globalZIndex,
      draw: canvasNode.draw,
    };

    controller.setup();
    controller.startListening();
    sceneTree.node_registered.emit(canvasNode);
    canvasNode.redraw_requested.emit(command);

    expect(graphics.queueDrawCommand).toHaveBeenCalledWith(command);
  });

  it('should not queue draw command upon deregistered canvas node emitting "redraw_requested" signal', () => {
    const graphics = new Graphics_Mock();
    const sceneTree = new SceneTree_Mock();
    const controller = new EngineController_Main({
      graphics,
      sceneTree,
    });
    const canvasNode = new CanvasNode_Mock('node');
    const command = {
      id: canvasNode.id,
      zIndex: canvasNode.globalZIndex,
      draw: canvasNode.draw,
    };

    controller.setup();
    controller.startListening();
    sceneTree.node_registered.emit(canvasNode);
    sceneTree.node_deregistered.emit(canvasNode);
    canvasNode.redraw_requested.emit(command);

    expect(graphics.queueDrawCommand).not.toHaveBeenCalledWith();
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

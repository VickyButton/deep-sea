import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import { EngineController_Main } from './EngineController_Main';
import { Queue_Mock } from '../../domain/queue/Queue_Mock';
import { CanvasNode_Mock } from '../../nodes/canvasNode/CanvasNode_Mock';
import { SceneTree_Mock } from '../sceneTree/SceneTree_Mock';
import { describe, expect, it } from 'vitest';

describe('EngineController_Main', () => {
  it('should not be listening by default', () => {
    const controller = new EngineController_Main({
      drawInstructionsQueue: new Queue_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    expect(controller.isListening).toBe(false);
  });

  it('should queue draw instructions upon canvas node emitting "redraw_requested" signal', () => {
    const drawInstructionsQueue = new Queue_Mock<DrawInstructions>();
    const sceneTree = new SceneTree_Mock();
    const controller = new EngineController_Main({
      drawInstructionsQueue,
      sceneTree,
    });
    const canvasNode = new CanvasNode_Mock('node');
    const instructions = {
      steps: [],
      zIndex: canvasNode.globalZIndex,
    };

    controller.setup();
    controller.startListening();
    sceneTree.node_registered.emit(canvasNode);
    canvasNode.redraw_requested.emit(instructions);

    expect(drawInstructionsQueue.add).toHaveBeenCalledWith(instructions);
  });

  it('should not queue draw instructions upon deregistered canvas node emitting "redraw_requested" signal', () => {
    const drawInstructionsQueue = new Queue_Mock<DrawInstructions>();
    const sceneTree = new SceneTree_Mock();
    const controller = new EngineController_Main({
      drawInstructionsQueue,
      sceneTree,
    });
    const canvasNode = new CanvasNode_Mock('node');
    const instructions = {
      steps: [],
      zIndex: canvasNode.globalZIndex,
    };

    controller.setup();
    controller.startListening();
    sceneTree.node_registered.emit(canvasNode);
    sceneTree.node_deregistered.emit(canvasNode);
    canvasNode.redraw_requested.emit(instructions);

    expect(drawInstructionsQueue.add).not.toHaveBeenCalledWith();
  });

  it('should be listening after starting', () => {
    const controller = new EngineController_Main({
      drawInstructionsQueue: new Queue_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    controller.startListening();

    expect(controller.isListening).toBe(true);
  });

  it('should not be listening after stopping', () => {
    const controller = new EngineController_Main({
      drawInstructionsQueue: new Queue_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    controller.startListening();
    controller.stopListening();

    expect(controller.isListening).toBe(false);
  });
});

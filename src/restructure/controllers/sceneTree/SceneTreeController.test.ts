import type { SceneTreeEvents } from '../../events/sceneTree/SceneTreeEvents';
import { SceneTreeEventController } from './SceneTreeController';
import { Event } from '../../events/Event';
import { Node } from '../../nodes';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('SceneTreeEventController', () => {
  beforeAll(() => controller.startListening());
  afterEach(() => vi.clearAllMocks());
  afterAll(() => controller.stopListening());

  it('should map SetCurrentScene event', () => {
    const data = new Node('node', {
    });

    events.SetCurrentScene.emit(data);

    expect(tree.setCurrentScene).toHaveBeenCalledWith(data);
  });

  it('should map StartCurrentScene event', () => {
    events.StartCurrentScene.emit();

    expect(tree.startCurrentScene).toHaveBeenCalled();
  });

  it('should map StopCurrentScene event', () => {
    events.StopCurrentScene.emit();

    expect(tree.stopCurrentScene).toHaveBeenCalled();
  });

});

const tree = {
  setCurrentScene: vi.fn(),
  startCurrentScene: vi.fn(),
  stopCurrentScene: vi.fn(),
};
const events: SceneTreeEvents = {
  SetCurrentScene: new Event(),
  StartCurrentScene: new Event(),
  StopCurrentScene: new Event(),
};
const controller = new SceneTreeEventController(tree, events);

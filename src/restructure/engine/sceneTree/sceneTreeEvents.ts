import type { SceneTreeEvents } from './sceneTree.types';
import { Event } from '../../events';

export const sceneTreeEvents: SceneTreeEvents = {
  SetCurrentScene: new Event(),
  StartCurrentScene: new Event(),
  StopCurrentScene: new Event(),
};

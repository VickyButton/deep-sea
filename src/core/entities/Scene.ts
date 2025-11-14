import { Node } from './Node';

export interface SceneState {
  name: string;
}

export abstract class Scene<T extends SceneState = SceneState> extends Node<T> {}

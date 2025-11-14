import { Node } from './Node';

interface SceneState {
  name: string;
}

export abstract class Scene<T extends SceneState = SceneState> extends Node<T> {}

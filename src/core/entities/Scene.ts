import { Node } from './Node';

interface SceneState {
  name: string;
}

export abstract class Scene extends Node<SceneState> {}

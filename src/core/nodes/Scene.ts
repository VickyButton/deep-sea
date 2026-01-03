import { GameNode } from './GameNode';

export abstract class Scene extends GameNode {
  public abstract readonly title: string;
}

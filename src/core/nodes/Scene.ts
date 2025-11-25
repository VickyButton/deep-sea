import { GameNode } from '@core/entities/GameNode';

export interface SceneState {
  name: string;
}

export abstract class Scene extends GameNode {
  public state: SceneState = this.getDefaultState();

  private getDefaultState() {
    return {
      name: '',
    };
  }
}

import type { SceneTree } from '../../SceneTree';
import { Node } from './Node';

/** A node which acts as a root node for a scene tree. */
export class Root extends Node {
  private _tree: SceneTree | null = null;

  public get tree() {
    return this._tree;
  }

  public set tree(tree: SceneTree | null) {
    this._tree = tree;
  }
}

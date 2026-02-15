import { GameNode } from '@core/nodes/GameNode';

export abstract class Script<T extends GameNode> {
  /**
   * Callback to be executed when the node is set up.
   * @param node The node the script is attached to.
   */
  public abstract onSetup(node: T): void;
  /**
   * Callback to be executed when the node is updated.
   * @param node The node the script is attached to.
   */
  public abstract onUpdate(node: T): void;
  /**
   * Callback to be executed when the node is torn down.
   * @param node The node the script is attached to.
   */
  public abstract onTeardown(node: T): void;
}

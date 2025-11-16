import { Node } from './entities/Node';

export class World {
  private nodes = new Map<string, Node>();

  public addNode(node: Node) {
    this.nodes.set(node.id, node);
  }

  public removeNode(node: Node) {
    this.nodes.delete(node.id);
  }

  public clearNodes() {
    this.nodes.clear();
  }
}

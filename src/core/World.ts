import { Node } from './entities/Node';
import { Point2D } from './interfaces/Point2D';

export interface WorldConfiguration {
  origin: Point2D;
}

export class World {
  private readonly configuration: WorldConfiguration;
  private nodes = new Map<string, Node>();

  constructor(configuration: WorldConfiguration) {
    this.configuration = configuration;
  }

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

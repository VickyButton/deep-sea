import { CircleNode } from '@core/nodes/CircleNode';
import { CollisionNode } from '@core/nodes/CollisionNode';
import { GameNode, Script } from '@core/nodes/GameNode';
import { RectangleNode } from '@core/nodes/RectangleNode';
import { Scene } from '@core/nodes/Scene';
import { SpriteNode } from '@core/nodes/SpriteNode';
import { useAssets } from 'assets';
import { useTasks } from 'tasks';

interface NodeConfig {
  type: string;
  children: NodeConfig[];
  scripts: string[];
}

class NodeParser {
  public parseNode(config: unknown) {
    if (!this.isNodeConfig(config)) throw new Error('Invalid node config');

    const node = this.createNode(config);
    const assets = useAssets();
    const scriptTasks: Promise<new () => Script>[] = [];

    for (const scriptName of config.scripts) {
      const loadScript = assets.scripts.load(scriptName);

      scriptTasks.push(loadScript);
    }

    const tasks = useTasks();

    tasks.registerTask(Promise.all(scriptTasks), (scripts) => {
      for (const script of scripts) node.attachScript(new script());
    });

    for (const childConfig of config.children) {
      const child = this.parseNode(childConfig);

      node.addChild(child);
    }

    return node;
  }

  private createNode(config: NodeConfig) {
    switch (config.type) {
      case 'CircleNode':
        return new CircleNode();
      case 'CollisionNode':
        return new CollisionNode();
      case 'GameNode':
        return new GameNode();
      case 'RectangleNode':
        return new RectangleNode();
      case 'Scene':
        return new Scene();
      case 'SpriteNode':
        return new SpriteNode();
      default:
        throw new Error('Unable to map node type');
    }
  }

  private isNodeConfig(value: unknown): value is NodeConfig {
    return (
      typeof value === 'object' &&
      value !== null &&
      'type' in value &&
      typeof value.type === 'string' &&
      'children' in value &&
      Array.isArray(value.children) &&
      'scripts' in value &&
      Array.isArray(value.scripts)
    );
  }
}

let nodes = new NodeParser();

export function useNodes() {
  return nodes;
}

export function resetNodes() {
  nodes = new NodeParser();
}

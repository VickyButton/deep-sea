import { CircleNode } from '@core/nodes/CircleNode';
import { CollisionNode } from '@core/nodes/CollisionNode';
import { GameNode, Script } from '@core/nodes/GameNode';
import { RectangleNode } from '@core/nodes/RectangleNode';
import { Scene } from '@core/nodes/Scene';
import { SpriteNode } from '@core/nodes/SpriteNode';
import { useAssets } from 'assets';
import { useTasks } from 'tasks';

const NodeRegistry = {
  CircleNode,
  CollisionNode,
  GameNode,
  RectangleNode,
  Scene,
  SpriteNode,
};

type NodeMap = {
  [K in keyof typeof NodeRegistry]: InstanceType<(typeof NodeRegistry)[K]>;
};
type NodeType = keyof NodeMap;
interface NodeConfig<K extends NodeType> {
  type: K;
  children: NodeConfig<keyof NodeMap>[];
  scripts: string[];
}

class NodeParser {
  public parseNode<K extends NodeType>(config: NodeConfig<K>) {
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

  private createNode<K extends NodeType>(config: NodeConfig<K>) {
    const constructor = NodeRegistry[config.type];

    return new constructor() as NodeMap[K];
  }
}

let nodes = new NodeParser();

export function useNodes() {
  return nodes;
}

export function resetNodes() {
  nodes = new NodeParser();
}

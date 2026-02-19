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
interface NodeConfig<K extends NodeType, S extends object = object> {
  type: K;
  children: NodeConfig<keyof NodeMap>[];
  scripts: string[];
  state: S;
}

type SceneConfig = NodeConfig<
  'Scene',
  {
    title: string;
  }
>;

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
    const node = new constructor() as NodeMap[K];

    this.populateState(node, config);

    return new constructor() as NodeMap[K];
  }

  private populateState<K extends NodeType>(node: NodeMap[K], config: NodeConfig<K>) {
    switch (config.type) {
      case 'Scene':
        this.populateSceneState(node as Scene, config as SceneConfig);
    }
  }

  private populateSceneState(node: Scene, config: SceneConfig) {
    node.title = config.state.title;
  }
}

let nodes = new NodeParser();

export function useNodes() {
  return nodes;
}

export function resetNodes() {
  nodes = new NodeParser();
}

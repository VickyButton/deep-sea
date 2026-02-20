import { CircleNode } from '@nodes/CircleNode';
import { CollisionNode } from '@nodes/CollisionNode';
import { GameNode, Script } from '@nodes/GameNode';
import { GameNode2D } from '@nodes/GameNode2D';
import { RectangleNode } from '@nodes/RectangleNode';
import { Scene } from '@nodes/Scene';
import { SpriteNode } from '@nodes/SpriteNode';
import { VelocityNode2D } from '@nodes/VelocityNode2D';
import { useAssets } from 'assets';

const NodeRegistry = {
  CircleNode,
  CollisionNode,
  GameNode,
  GameNode2D,
  RectangleNode,
  Scene,
  SpriteNode,
  VelocityNode2D,
};

type NodeMap = {
  [K in keyof typeof NodeRegistry]: InstanceType<(typeof NodeRegistry)[K]>;
};
type NodeType = keyof NodeMap;
interface NodeConfig<K extends NodeType> {
  type: K;
  children: NodeConfig<keyof NodeMap>[];
  scripts: string[];
  state: object;
}

interface GameNode2DState {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

interface GraphicsNode2DState extends GameNode2DState {
  visible: boolean;
  layer: number;
}

interface CircleNodeState extends GraphicsNode2DState {
  radius: number;
}

interface RectangleNodeState extends GraphicsNode2DState {
  width: number;
  height: number;
}

interface SpriteNodeState extends GraphicsNode2DState {
  spriteSheetName: string;
  spriteRectX: number;
  spriteRectY: number;
  spriteRectW: number;
  spriteRectH: number;
}

interface SceneState {
  title: string;
}

interface VelocityNode2DState {
  velocityX: number;
  velocityY: number;
}

class NodeParser {
  public async parseNode<K extends NodeType>(config: NodeConfig<K>) {
    const node = this.createNode(config);
    const assets = useAssets();
    const scriptTasks: Promise<new () => Script>[] = [];

    for (const childConfig of config.children) {
      const child = await this.parseNode(childConfig);

      node.addChild(child);
    }

    for (const scriptName of config.scripts) {
      const loadScript = assets.scripts.load(scriptName);

      scriptTasks.push(loadScript);
    }

    if (scriptTasks.length > 0) {
      const scripts = await Promise.all(scriptTasks);

      for (const script of scripts) node.attachScript(new script());
    }

    return node;
  }

  private createNode<K extends NodeType>(config: NodeConfig<K>) {
    const constructor = NodeRegistry[config.type];
    const node = new constructor() as NodeMap[K];

    this.populateNode(node, config);

    return node;
  }

  private populateNode<K extends NodeType>(node: NodeMap[K], config: NodeConfig<K>) {
    switch (config.type) {
      case 'CircleNode':
        this.populateCircleNode(node as CircleNode, config.state as CircleNodeState);
        break;
      case 'GameNode2D':
        this.populateGameNode2D(node as GameNode2D, config.state as GameNode2DState);
        break;
      case 'RectangleNode':
        this.populateRectangleNode(node as RectangleNode, config.state as RectangleNodeState);
        break;
      case 'SpriteNode':
        this.populateSpriteNode(node as SpriteNode, config.state as SpriteNodeState);
        break;
      case 'Scene':
        this.populateScene(node as Scene, config.state as SceneState);
        break;
      case 'VelocityNode2D':
        this.populateVelocityNode2D(node as VelocityNode2D, config.state as VelocityNode2DState);
        break;
    }
  }

  private populateGameNode2D(node: GameNode2D, state: GameNode2DState) {
    node.position.set(state.x, state.y);
    node.scale.set(state.scaleX, state.scaleY);
  }

  private populateCircleNode(node: CircleNode, state: CircleNodeState) {
    this.populateGameNode2D(node, state);

    node.radius = state.radius;
  }

  private populateRectangleNode(node: RectangleNode, state: RectangleNodeState) {
    this.populateGameNode2D(node, state);

    node.size.set(state.width, state.height);
  }

  private populateSpriteNode(node: SpriteNode, state: SpriteNodeState) {
    this.populateGameNode2D(node, state);

    node.spriteSheetName = state.spriteSheetName;
    node.spriteRectangle.set(
      state.spriteRectX,
      state.spriteRectY,
      state.spriteRectW,
      state.spriteRectH,
    );
  }

  private populateScene(node: Scene, state: SceneState) {
    node.title = state.title;
  }

  private populateVelocityNode2D(node: VelocityNode2D, state: VelocityNode2DState) {
    node.velocity.set(state.velocityX, state.velocityY);
  }
}

let nodes = new NodeParser();

export function useNodes() {
  return nodes;
}

export function resetNodes() {
  nodes = new NodeParser();
}

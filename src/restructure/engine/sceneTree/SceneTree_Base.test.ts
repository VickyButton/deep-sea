import { SceneTree_Base } from './SceneTree_Base';
import { describe, expect, it, vi } from 'vitest';

describe('SceneTree_Base', () => {
  it('should have 1 registered node by default', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);

    expect(tree.nodeCount).toBe(1);
  });

  it('should add scene to root node as a child upon adding scene', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const scene = new Node('scene');
    const addChildSpy = vi.spyOn(tree.root, 'addChild');

    tree.addScene(scene);

    expect(addChildSpy).toHaveBeenCalledWith(scene);
  });

  it('should enter scene into self upon adding scene', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const scene = new Node('scene');

    tree.addScene(scene);

    expect(scene.enterTree).toHaveBeenCalledWith(tree);
  });

  it('should deregister node from self upon deregistering node', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const node = new Node('node');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(tree.nodeCount).toBe(1);
  });

  it('should emit "node_deregistered" signal upon deregistering node', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const node = new Node('node');
    const emitSpy = vi.spyOn(tree.node_deregistered, 'emit');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(emitSpy).toHaveBeenCalledWith(node);
  });

  it('should register node with self upon registering node', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const node = new Node('node');

    tree.registerNode(node);

    expect(tree.nodeCount).toBe(2);
  });

  it('should emit "node_registered" signal upon registering node', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const node = new Node('node');
    const emitSpy = vi.spyOn(tree.node_registered, 'emit');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(emitSpy).toHaveBeenCalledWith(node);
  });

  it('should remove scene from root node as a child upon removing scene', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const scene = new Node('scene');
    const removeChildSpy = vi.spyOn(tree.root, 'removeChild');

    tree.addScene(scene);
    tree.removeScene(scene);

    expect(removeChildSpy).toHaveBeenCalledWith(scene);
  });

  it('should exit scene from self upon removing scene', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);
    const scene = new Node('scene');

    tree.addScene(scene);
    tree.removeScene(scene);

    expect(scene.exitTree).toHaveBeenCalledWith(tree);
  });

  it('should start root node upon starting', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);

    tree.start();

    expect(root.start).toHaveBeenCalled();
  });

  it('should stop root node upon stopping', () => {
    const root = new Node('root');
    const tree = new SceneTree_Base(root, dependencies);

    tree.stop();

    expect(root.stop).toHaveBeenCalled();
  });
});

const Node = vi.fn(class {
  public readonly child_added = new Signal();
  public readonly child_removed = new Signal();
  public readonly controller = new SignalController();
  public readonly id;
  public readonly started = new Signal();
  public readonly stopped = new Signal();
  public readonly tree_entered = new Signal();
  public readonly tree_exited = new Signal();

  constructor(id: string) {
    this.id = id;
  }

  public children = [];
  public isActive = false;
  public isInsideTree = false;
  public parent = null;
  public tree = null;
  public addChild = vi.fn();
  public enterTree = vi.fn();
  public exitTree = vi.fn();
  public removeChild = vi.fn();
  public setParent = vi.fn();
  public start = vi.fn();
  public stop = vi.fn();
});

const Signal = vi.fn(class {
  public callbackCount = 0;
  public clear = vi.fn();
  public emit = vi.fn();
  public listen = vi.fn();
  public unlisten = vi.fn();
});

const SignalController = vi.fn(class {
  public isListening = false;
  public clear = vi.fn();
  public deregister = vi.fn();
  public register = vi.fn();
  public startListening = vi.fn();
  public stopListening = vi.fn();
});

const dependencies = {
  Signal,
};

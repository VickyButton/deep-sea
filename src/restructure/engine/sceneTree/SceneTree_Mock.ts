import type { SceneTree } from './sceneTree.types';
import { Signal } from '../../domain/signal/Signal';
import { Node_Mock } from '../../nodes/node/Node_Mock';
import { vi } from 'vitest';

/** The mock implementation of the SceneTree interface. */
export class SceneTree_Mock implements SceneTree {
  public readonly node_deregistered = new Signal();
  public readonly node_registered = new Signal();
  public readonly processed = new Signal();
  public readonly root = new Node_Mock('root');

  public get isActive() {
    return false;
  }

  public get nodeCount() {
    return 1;
  }

  public addScene = vi.fn();
  public deregisterNode = vi.fn();
  public process = vi.fn();
  public removeScene = vi.fn();
  public registerNode = vi.fn();
  public start = vi.fn();
  public stop = vi.fn();
};

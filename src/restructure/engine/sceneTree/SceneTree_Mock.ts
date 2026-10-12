import type { SceneTree } from './sceneTree.types';
import { Node_Mock } from '../../nodes/node/Node_Mock';
import { Signal_Test } from '../../signals/signal/Signal_Test';
import { vi } from 'vitest';

/** The mock implementation of the SceneTree interface. */
export class SceneTree_Mock implements SceneTree {
  public readonly node_deregistered = new Signal_Test();
  public readonly node_registered = new Signal_Test();
  public readonly root = new Node_Mock('root');

  public get nodeCount() {
    return 1;
  }

  public deregisterNode = vi.fn();
  public addScene = vi.fn();
  public removeScene = vi.fn();
  public registerNode = vi.fn();
  public start = vi.fn();
  public stop = vi.fn();
};

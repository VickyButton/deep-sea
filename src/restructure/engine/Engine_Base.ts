import type { Engine } from './engine.types';
import type { Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';
import { SignalController_Base } from '../controllers/SignalController_Base';

export class Engine_Base implements Engine {
  private readonly controller = new SignalController_Base();
  private readonly graphics: Graphics;
  private readonly loop: Loop;
  private readonly pluginManager: PluginManager;
  private readonly sceneTree: SceneTree;

  constructor(components: EngineComponents) {
    this.graphics = components.graphics;
    this.loop = components.loop;
    this.pluginManager = components.pluginManager;
    this.sceneTree = components.sceneTree;
    this.setLoopCallback();
  }

  private setLoopCallback() {
    this.loop.setLoopCallback(this.executeLoop);
  }

  private executeLoop = () => {
    this.clearCanvas();
    this.processDrawCommandQueue();
  };

  private clearCanvas() {
    this.graphics.clearCanvas();
  }

  private processDrawCommandQueue() {
    this.graphics.processDrawCommandQueue();
  }

  public start() {
    this.startPlugins();
    this.startLoop();
  }

  private startPlugins() {
    this.pluginManager.startPlugins();
  }

  private startLoop() {
    this.loop.start();
  }

  public stop() {
    this.stopLoop();
    this.stopPlugins();
  }

  private stopLoop() {
    this.loop.stop();
  }

  private stopPlugins() {
    this.pluginManager.stopPlugins();
  }
}

interface EngineComponents {
  graphics: Graphics;
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}

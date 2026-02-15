import { CameraNode2D } from '@core/nodes/CameraNode2D';
import { GraphicsNode2D } from '@core/nodes/GraphicsNode2D';

class Renderer {
  private activeCamera?: CameraNode2D;
  private nodes = new Set<GraphicsNode2D>();

  /**
   * Retrieves the active camera.
   * @returns The active camera.
   */
  public getActiveCamera() {
    if (!this.activeCamera) throw new Error('No active camera set');

    return this.activeCamera;
  }

  /**
   * Sets the active camera used for rendering.
   * @param camera The camera to use.
   */
  public setActiveCamera(camera: CameraNode2D) {
    this.activeCamera = camera;
  }

  /**
   * Registers a node for rendering.
   * @param node The node to register.
   */
  public registerNode(node: GraphicsNode2D) {
    this.nodes.add(node);
  }

  /**
   * Deregisters a node from rendering.
   * @param node The node to deregister.
   */
  public deregisterNode(node: GraphicsNode2D) {
    this.nodes.delete(node);
  }

  /**
   * Deregisters all nodes from rendering.
   */
  public clearNodes() {
    this.nodes.clear();
  }

  /**
   * Returns a sorted queue of nodes for drawing.
   * @returns A sorted queue of nodes for drawing.
   */
  public createDrawQueue() {
    const drawQueue = Array.from(this.getVisibleNodes());
    const sortByLayer = (a: GraphicsNode2D, b: GraphicsNode2D) => {
      return a.globalLayer - b.globalLayer;
    };

    return drawQueue.sort(sortByLayer);
  }

  private isNodeVisible(node: GraphicsNode2D) {
    return node.globalVisible && !this.isNodeOffScreen(node);
  }

  private isNodeOffScreen(node: GraphicsNode2D) {
    if (!this.activeCamera) throw new Error('No active camera set');

    return !this.activeCamera.rectangle.overlaps(node.boundingBox);
  }

  private getVisibleNodes() {
    const visibleNodes = new Set<GraphicsNode2D>();

    for (const node of this.nodes) {
      if (this.isNodeVisible(node)) visibleNodes.add(node);
    }

    return visibleNodes;
  }
}

let renderer = new Renderer();

export function useRenderer() {
  return renderer;
}

export function resetRenderer() {
  renderer = new Renderer();
}

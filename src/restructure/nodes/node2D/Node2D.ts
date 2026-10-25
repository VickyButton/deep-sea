import { Signal } from '../../domain/signal/Signal';
import { Transform2D } from '../../domain/transform2D/Transform2D';
import { Vector2 } from '../../domain/vector2/Vector2';
import { CanvasNode } from '../canvasNode/CanvasNode';

/** A 2D node that has position, rotation, and scale. */
export class Node2D extends CanvasNode implements Node2D {
  /** Emitted after the node's position has been changed. The new position is passed to callbacks. */
  public readonly position_changed = new Signal<Vector2>();
  /** Emitted after the node's rotation has been changed. The new rotation is passed to callbacks. */
  public readonly rotation_changed = new Signal<number>();
  /** Emitted after the node's scale has been changed. The new scale is passed to callbacks. */
  public readonly scale_changed = new Signal<Vector2>();
  /** Emitted after the node's transform has been changed. The new transform is passed to callbacks. */
  public readonly transform_changed = new Signal<Transform2D>();
  private _transform = new Transform2D({
    scale: new Vector2(1, 1),
    rotation: 0,
    translation: new Vector2(0, 0),
  });

  /** The node's global position. */
  public get globalPosition(): Vector2 {
    const closestAncestor = this.getClosestNode2DAncestor();

    return closestAncestor ? this.calculateGlobalPositionFromNode(closestAncestor) : this.position;
  }

  private calculateGlobalPositionFromNode(node: Node2D) {
    return this.position.add(node.globalPosition);
  }

  /** The node's global rotation. */
  public get globalRotation(): number {
    const closestAncestor = this.getClosestNode2DAncestor();

    return closestAncestor ? this.calculateGlobalRotationFromNode(closestAncestor) : this.rotation;
  }

  private calculateGlobalRotationFromNode(node: Node2D) {
    return this.rotation + node.globalRotation;
  }

  /** The node's global scale. */
  public get globalScale(): Vector2 {
    const closestAncestor = this.getClosestNode2DAncestor();

    return closestAncestor ? this.calculateGlobalScaleFromNode(closestAncestor) : this.scale;
  }

  private calculateGlobalScaleFromNode(node: Node2D) {
    return this.scale.multiply(node.globalScale);
  }

  /** The node's global transform. */
  public get globalTransform(): Transform2D {
    const closestAncestor = this.getClosestNode2DAncestor();

    return closestAncestor ? this.calculateGlobalTransformFromNode(closestAncestor) : this.transform;
  }

  private calculateGlobalTransformFromNode(node: Node2D) {
    return new Transform2D({
      rotation: this.calculateGlobalRotationFromNode(node),
      scale: this.calculateGlobalScaleFromNode(node),
      translation: this.calculateGlobalPositionFromNode(node),
    });
  }

  private getClosestNode2DAncestor() {
    return this.getClosestAncestorOfType(Node2D);
  }

  /** The node's position. */
  public get position() {
    return this.transform.translation;
  }

  public set position(position: Vector2) {
    if (this.equalsCurrentPosition(position)) {
      return;
    }

    this.setPosition(position);
    this.emitPositionChangedSignal(position);
    this.emitTransformChangedSignal(this.transform);
  }

  private equalsCurrentPosition(position: Vector2) {
    return this.position.equals(position);
  }

  private setPosition(position: Vector2) {
    this.transform.translation = position;
  }

  private emitPositionChangedSignal(position: Vector2) {
    this.position_changed.emit(position);
  }

  private emitTransformChangedSignal(transform: Transform2D) {
    this.transform_changed.emit(transform);
  }

  /** The node's rotation. */
  public get rotation() {
    return this.transform.rotation;
  }

  public set rotation(rotation: number) {
    if (this.equalsCurrentRotation(rotation)) {
      return;
    }

    this.setRotation(rotation);
    this.emitRotationChangedSignal(rotation);
    this.emitTransformChangedSignal(this.transform);
  }

  private equalsCurrentRotation(rotation: number) {
    return this.rotation === rotation;
  }

  private setRotation(rotation: number) {
    this.transform.rotation = rotation;
  }

  private emitRotationChangedSignal(rotation: number) {
    this.rotation_changed.emit(rotation);
  }

  /** The node's scale. */
  public get scale() {
    return this.transform.scale;
  }

  public set scale(scale: Vector2) {
    if (this.equalsCurrentScale(scale)) {
      return;
    }

    this.setScale(scale);
    this.emitScaleChangedSignal(scale);
    this.emitTransformChangedSignal(this.transform);
  }

  private equalsCurrentScale(scale: Vector2) {
    return this.scale.equals(scale);
  }

  private setScale(scale: Vector2) {
    this.transform.scale = scale;
  }

  private emitScaleChangedSignal(scale: Vector2) {
    this.scale_changed.emit(scale);
  }

  /** The node's transform. */
  public get transform() {
    return this._transform;
  }

  public set transform(transform: Transform2D) {
    const equalsCurrentPosition = this.equalsCurrentPosition(transform.translation);
    const equalsCurrentRotation = this.equalsCurrentRotation(transform.rotation);
    const equalsCurrentScale = this.equalsCurrentScale(transform.scale);
    const equalsCurrentTransform = equalsCurrentPosition && equalsCurrentRotation && equalsCurrentScale;

    if (equalsCurrentTransform) {
      return;
    }

    this.setTransform(transform);
    this.emitTransformChangedSignal(transform);

    if (!equalsCurrentPosition) {
      this.emitPositionChangedSignal(transform.translation);
    }

    if (!equalsCurrentRotation) {
      this.emitRotationChangedSignal(transform.rotation);
    }

    if (!equalsCurrentScale) {
      this.emitScaleChangedSignal(transform.scale);
    }
  }

  private setTransform(transform: Transform2D) {
    this._transform = transform;
  }

  /**
   * Rotates the node.
   * @param radians The angle, in radians, to rotate the node by.
   */
  public rotateBy(radians: number): void {
    this.rotation = this.rotation + radians;
  }

  /**
   * Scales the node.
   * @param ratio The ratio to multiply the node's scale by.
   */
  public scaleBy(ratio: Vector2) {
    this.scale = this.scale.multiply(ratio);
  }

  /**
   * Translates the node.
   * @param offset The offset to translate the node by.
   */
  public translateBy(offset: Vector2) {
    this.position = this.position.add(offset);
  }
}

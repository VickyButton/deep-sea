import type { Node } from '../nodes/node/Node';

export type SceneConstructor = new (id: string) => Node;
export type NewFrameCallback = (frame: ImageBitmap) => void;

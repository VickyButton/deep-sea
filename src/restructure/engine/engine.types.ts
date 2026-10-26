import type { Node } from '../nodes/node/Node';

export type SceneConstructor = new (id: string) => Node;

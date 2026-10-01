import type { Node, NodeTree } from '../../nodes/node.types';
import { Signal_Base } from '../Signal_Base';

/** The base implementation of the Node_ChildAdded_Signal interface. */
export const Node_ChildAdded_Signal_Base = Signal_Base<Node>;
/** The base implementation of the Node_ChildRemoved_Signal interface. */
export const Node_ChildRemoved_Signal_Base = Signal_Base<Node>;
/** The base implementation of the Node_Started_Signal interface. */
export const Node_Started_Signal_Base = Signal_Base;
/** The base implementation of the Node_Stopped_Signal interface. */
export const Node_Stopped_Signal_Base = Signal_Base;
/** The base implementation of the Node_TreeEntered_Signal interface. */
export const Node_TreeEntered_Signal_Base = Signal_Base<NodeTree>;
/** The base implementation of the Node_TreeExited_Signal interface. */
export const Node_TreeExited_Signal_Base = Signal_Base<NodeTree>;

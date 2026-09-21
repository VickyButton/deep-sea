import { Event } from './Event';

/** An event to be emitted each time a new frame is due. */
export const NewFrameEvent = new Event<number>(Symbol('new-frame'));

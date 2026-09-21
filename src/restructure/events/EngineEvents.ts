import { Event } from './Event';

export const EngineEvents = {
  SetupEvent: new Event<void>(),
  StartEvent: new Event<void>(),
  StopEvent: new Event<void>(),
};

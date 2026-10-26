import { AnimationFrameProvider_Browser } from './animationFrameProvider/AnimationFrameProvider_Browser';
import { TimeProvider_Performance } from './timeProvider/TimeProvider_Performance';

const AnimationFrameProvider = {
  Browser: AnimationFrameProvider_Browser,
};

const TimeProvider = {
  Performance: TimeProvider_Performance,
};

export {
  AnimationFrameProvider,
  TimeProvider,
};

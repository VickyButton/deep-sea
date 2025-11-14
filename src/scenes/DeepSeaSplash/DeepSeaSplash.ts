import { Scene } from '@core/entities/Scene';
import { log } from '@core/utils/logger';

const DEEP_SEA_SPLASH_LOG_TAG = 'Scene/DeepSeaSplash';

export default class TestScene extends Scene {
  public initialize(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Initializing...');
  }

  public start(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Starting...');
  }

  public stop(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Stopping...');
  }

  public update(): void {
    log(DEEP_SEA_SPLASH_LOG_TAG, 'Updating...');
  }

  protected getDefaultState() {
    return {
      name: 'DeepSeaSplash',
    };
  }
}

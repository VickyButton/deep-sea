import { App } from '@core/App';

function onLoad() {
  const app = new App({
    graphics: {
      width: 1000,
      height: 1000,
    },
    loop: {
      framesPerSecond: 60,
    },
  });

  app.initialize();
  app.start();
}

window.addEventListener('load', onLoad);

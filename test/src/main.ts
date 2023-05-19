import { Game, gameLoop } from 'ember-js';

import './style.css';

const game = new Game({
  canvasId: 'game',
  width: 500,
  height: 300,
  canvasContainer: 'div#app',
});

let rect = {
  width: 100,
  height: 200,
  x: 0,
  y: 0,
  speedX: 2,
  speedY: 2,
  color: 'red',
  colors: ['red', 'orange', 'green', 'yellow', 'lime', 'lightblue'],
};

const dino = game.create2dObject({
  tag: 'DinoTard',
  x: 200,
  y: 100,
  z: 0,
  width: 100,
  height: 100,
  sprite: {
    fps: 20,
    width: 48,
    height: 48,
    image: document.querySelector('#DinoTard') as HTMLImageElement,
    maxFrames: 5,
  },
});

gameLoop((deltaTime) => {
  game.update(deltaTime, () => {
    if (game.inputManager.isMousePressed('MouseLeft')) {
      if (dino.sprite) {
        if (dino.sprite?.frameY > 3) {
          dino.sprite.frameY = 0;
        } else dino.sprite.frameY++;
      }
    }
  });

  game.draw((ctx) => {
    if (dino.sprite) {
      ctx.drawImage(
        dino.sprite.image,
        dino.sprite.frameX * dino.sprite.width,
        dino.sprite.frameY * dino.sprite.height,
        dino.sprite.width,
        dino.sprite.height,
        dino.x,
        dino.y,
        dino.width,
        dino.height
      );
    }
    dino.draw(ctx, deltaTime);

    // ctx.fillStyle = rect.color;
    // ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });
});

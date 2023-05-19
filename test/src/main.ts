import { Game, gameLoop } from 'ember-js';

import './style.css';

const game = new Game({
  canvasId: 'game',
  width: 500,
  height: 300,
  canvasContainer: 'div#app',
});

// @ts-expect-error
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
    fps: 15,
    width: 48,
    height: 48,
    image: document.querySelector('#DinoTard') as HTMLImageElement,
    maxFrames: 5,
  },
});

gameLoop((deltaTime) => {
  game.update(deltaTime, () => {
    let speed = 2;
    if (game.inputManager.isKeyPressed('ArrowRight')) {
      dino.velocity.x = speed * 1.8;
      dino.sprite!.frameY = 3;
    } else if (game.inputManager.isKeyPressed('ArrowLeft')) {
      dino.velocity.x = -speed * 1.8;
      dino.sprite!.frameY = 3;
    } else {
      dino.velocity.x = 0;
      dino.sprite!.frameY = 0;
    }

    dino.x += dino.velocity.x;
    dino.y += dino.velocity.y;
    dino.z += dino.velocity.z;
  });

  game.draw((ctx) => {
    if (dino.sprite) {
      const flipHorizontal = game.inputManager.isKeyPressed('ArrowLeft');

      ctx.save();

      // Translate to the center of the dinosaur sprite
      ctx.translate(dino.x + dino.width / 2, dino.y + dino.height / 2);

      // Scale the canvas horizontally by -1 to flip the image
      if (flipHorizontal) {
        ctx.scale(-1, 1);
      }

      // Draw the image on the canvas
      ctx.drawImage(
        dino.sprite.image,
        dino.sprite.frameX * dino.sprite.width,
        dino.sprite.frameY * dino.sprite.height,
        dino.sprite.width,
        dino.sprite.height,
        -dino.width / 2,
        -dino.height / 2,
        dino.width,
        dino.height
      );

      ctx.restore();
    }

    dino.draw(ctx, deltaTime);
  });
});

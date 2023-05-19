import { Game, gameLoop } from '2d-game-engine';

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

gameLoop((deltaTime) => {
  game.update(deltaTime, () => {
    if (rect.x > game.width || rect.y > game.height) {
      rect.x = rect.x > game.width ? -rect.width : rect.x;
      rect.y = rect.y > game.height ? -rect.height : rect.y;

      rect.speedX = Math.floor(Math.random() * 6 + 1);
      rect.speedY = Math.floor(Math.random() * 6 + 1);

      let selctedColor =
        rect.colors[Math.floor(Math.random() * rect.colors.length + 1)];

      rect.color = selctedColor;
    } else {
      rect.x += rect.speedX;
      rect.y += rect.speedY;
    }

    if (game.inputManager.isMousePressed('MouseLeft')) {
      const { x, y } = game.inputManager.getMousePosition();

      console.log('MousePosition: ', { x, y });

      rect.x = x;
      rect.y = y;
    }
  });

  game.draw((ctx) => {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });
});

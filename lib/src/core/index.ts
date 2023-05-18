import { Game } from './Game';
import { InputManager } from './InputManager';

export { Game, InputManager };

export const gameLoop = (cb: (deltaTime: number) => void) => {
  window.addEventListener('load', () => {
    let lastTime = 0;

    function animate(timeStamp: number) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      cb(deltaTime);
      requestAnimationFrame(animate);
    }

    animate(0);
  });
};

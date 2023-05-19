import InputManager from './InputManager';

interface IGameParams {
  width: number;
  height: number;
  canvasId: string;
  canvasContainer?: string;
}

export default class Game {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  inputManager: InputManager;

  constructor(params: IGameParams) {
    this.width = params.width;
    this.height = params.height;
    const canvas = this.makeCanvas(params.canvasId, params.canvasContainer);
    if (!canvas) {
      throw new Error('Canvas container does not exist!');
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.inputManager = new InputManager(this.canvas);
  }

  // ? make the canvas element and set it's id:
  makeCanvas(id: string, canvasContainer: string = 'body') {
    const canvasElm = document.createElement('canvas');
    canvasElm.id = id;
    canvasElm.width = this.width;
    canvasElm.height = this.height;
    const containerElm: HTMLElement | null =
      document.querySelector(canvasContainer);

    if (!containerElm) {
      return null;
    }

    containerElm.append(canvasElm);
    return canvasElm;
  }

  // ? run's one time when the game start
  start() {}

  // ? run's every frame
  update(deltaTime: number, cb?: () => void) {
    if (cb) cb();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 500, 300);
  }

  // ? run's every frame to update graphics
  draw = (cb?: (ctx: CanvasRenderingContext2D) => void, clearCanvas = true) => {
    if (clearCanvas) {
      this.clearCanvas();
    }

    if (cb) {
      cb(this.ctx);
    }
  };
}

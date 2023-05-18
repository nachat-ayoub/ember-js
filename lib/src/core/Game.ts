interface IGameParams {
  width: number;
  height: number;
  canvasId: string;
}

export class Game {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(params: IGameParams) {
    this.width = params.width;
    this.height = params.height;
    this.canvas = this.makeCanvas(params.canvasId);
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  // ? make the canvas element and set it's id:
  makeCanvas(id: string) {
    const canvasElm = document.createElement('canvas');
    canvasElm.id = id;
    canvasElm.width = this.width;
    canvasElm.height = this.height;
    document.body.append(canvasElm);

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

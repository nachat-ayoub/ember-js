import { IGameKeys } from './keys';

export default class InputManager {
  private canvas: HTMLCanvasElement;
  private keyboardKeys: Set<IGameKeys['KeyboardKeys']>;
  private mouseKeys: Set<IGameKeys['MouseKeys']>;
  private mouseButtonsCode: IGameKeys['MouseKeys'][] = [
    'MouseLeft',
    'MouseMiddle',
    'MouseRight',
  ];

  private mousePostion = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.keyboardKeys = new Set();
    this.mouseKeys = new Set();
    this.setupEventListeners();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const key: IGameKeys['KeyboardKeys'] =
      event.key as IGameKeys['KeyboardKeys'];
    this.keyboardKeys.add(key);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const key: IGameKeys['KeyboardKeys'] =
      event.key as IGameKeys['KeyboardKeys'];
    this.keyboardKeys.delete(key);
  };

  private handleMouseDown = (event: MouseEvent) => {
    const button: IGameKeys['MouseKeys'] = this.mouseButtonsCode[
      event.button
    ] as IGameKeys['MouseKeys'];

    this.mouseKeys.add(button);
  };

  private handleMouseUp = (event: MouseEvent) => {
    const button: IGameKeys['MouseKeys'] = this.mouseButtonsCode[
      event.button
    ] as IGameKeys['MouseKeys'];

    this.mouseKeys.delete(button);
  };

  private handleMouseMove = (event: MouseEvent) => {
    const canvasPosition = this.canvas.getBoundingClientRect();

    this.mousePostion = {
      x: event.x - canvasPosition.left,
      y: event.y - canvasPosition.top,
    };
  };

  private setupEventListeners() {
    this.canvas.addEventListener('keydown', this.handleKeyDown);
    this.canvas.addEventListener('keyup', this.handleKeyUp);

    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  isKeyPressed(key: IGameKeys['KeyboardKeys']): boolean {
    return this.keyboardKeys.has(key);
  }

  isMousePressed(button: IGameKeys['MouseKeys']): boolean {
    return this.mouseKeys.has(button);
  }

  getMousePosition(): { x: number; y: number } {
    return this.mousePostion;
  }
}

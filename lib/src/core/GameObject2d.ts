import Game from './Game';

export interface ISprite {
  image: HTMLImageElement;
  frameX: number;
  frameY: number;
  width: number;
  height: number;
  maxFrames: number;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  animate: (deltaTime: number) => void;
}

type TCreateSpriteProps = Omit<
  ISprite,
  'animate' | 'frameX' | 'frameY' | 'frameInterval' | 'frameTimer'
>;

export interface IGameObject2dProps {
  tag: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  sprite?: TCreateSpriteProps | null;
}

export default class GameObject2d {
  tag: string = '';
  x: number;
  y: number;
  z: number;

  width: number;
  height: number;
  sprite: ISprite | null = null;

  constructor(
    game: Game,
    { tag, x, y, z, width, height, sprite = null }: IGameObject2dProps
  ) {
    // let tagCount = 0;
    // for (let i = 0; i < game.gameObjects.length; i++) {
    //   const obj = game.gameObjects[i];
    //   if (obj.tag === tag) {
    //     tagCount++;
    //     if (tagCount > 2) {
    //       throw new Error('GameObject tag should be unique.');
    //     }
    //   }
    // }

    this.tag = tag;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;

    if (sprite) {
      this.createSprite(sprite);
    }
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime?: number) {
    if (this.sprite && deltaTime) {
      this.sprite.animate(deltaTime);
    }
  }

  update(deltaTime?: number) {}

  createSprite(sprite: TCreateSpriteProps) {
    this.sprite = {
      ...sprite,
      frameX: 0,
      frameY: 0,
      frameInterval: 1000 / sprite.fps,
      frameTimer: 0,
      animate(deltaTime: number) {
        if (this.frameTimer > this.frameInterval) {
          if (this.frameX < this.maxFrames) {
            this.frameX++;
          } else this.frameX = 0;

          this.frameTimer = 0;
        } else this.frameTimer += deltaTime;
      },
    };
  }

  //

  isCollidingWith(object: GameObject2d) {
    // * Object Boundaries :
    const objectTop = object.y;
    const objectLeft = object.x;
    const objectRight = object.x + object.width;
    const objectBottom = object.y + object.height;

    // * Current Object Boundaries :
    const top = this.y;
    const left = this.x;
    const right = this.x + this.width;
    const bottom = this.y + this.height;

    // Check for collision
    return (
      right >= objectLeft &&
      left <= objectRight &&
      bottom >= objectTop &&
      top <= objectBottom
    );
  }

  //
}

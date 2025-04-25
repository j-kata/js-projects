const PADDLE_WIDTH = 140;
const PADDLE_HEIGHT = 35;
const STROKE_COLOR = '#000';
const FILL_COLOR = '#dadada';
const RADIUS = 40;
const STEP = 5;

export const Paddle = {
  create(canvasWidth, canvasHeight) {
    return {
      x: (canvasWidth - PADDLE_WIDTH) / 2,
      y: canvasHeight - PADDLE_HEIGHT - 5,
      canMoveLeft() {
        return this.x > STEP;
      },
      canMoveRight() {
        return this.x + PADDLE_WIDTH < canvasWidth - STEP;
      },
    };
  },

  moveLeft(paddle) {
    const x = paddle.canMoveLeft() ? paddle.x - STEP : paddle.x;
    return { ...paddle, x };
  },
  moveRight(paddle) {
    const x = paddle.canMoveRight() ? paddle.x + STEP : paddle.x;
    return { ...paddle, x };
  },
  draw(ctx, paddle) {
    const { x, y } = paddle;
    ctx.save();
    ctx.strokeStyle = STROKE_COLOR;
    ctx.fillStyle = FILL_COLOR;
    ctx.beginPath();
    ctx.roundRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT, [RADIUS]);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },
};

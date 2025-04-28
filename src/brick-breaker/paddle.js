const PADDLE_WIDTH = 140;
const PADDLE_HEIGHT = 35;
const STROKE_COLOR = '#000';
const FILL_COLOR = '#dadada';
const RADIUS = 40;
const STEP = 5;

export const Paddle = {
  create(canvasWidth, canvasHeight) {
    const middleX = (canvasWidth - PADDLE_WIDTH) / 2;
    const middleY = canvasHeight - PADDLE_HEIGHT - 5;
    return {
      x: middleX,
      y: middleY,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    };
  },
  canMoveLeft(paddle, x) {
    return paddle.x > x;
  },
  canMoveRight(paddle, x) {
    return paddle.x + paddle.width < x;
  },
  moveLeft(paddle, border) {
    const x = this.canMoveLeft(paddle, border) ? paddle.x - STEP : paddle.x;
    return { ...paddle, x };
  },
  moveRight(paddle, border) {
    const x = this.canMoveRight(paddle, border) ? paddle.x + STEP : paddle.x;
    return { ...paddle, x };
  },
  draw(ctx, paddle) {
    const { x, y } = paddle;
    ctx.save();
    ctx.strokeStyle = STROKE_COLOR;
    ctx.fillStyle = FILL_COLOR;
    ctx.beginPath();
    ctx.roundRect(x, y, paddle.width, paddle.height, [RADIUS]);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },
};

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
  hitPosition(paddle, ball) {
    return (ball.x - paddle.x) / paddle.width;
  },
  canMoveLeft(paddle, minX) {
    return paddle.x > minX;
  },
  canMoveRight(paddle, maxX) {
    return paddle.x + paddle.width < maxX;
  },
  moveLeft(paddle, canvasMin) {
    if (!Paddle.canMoveLeft(paddle, canvasMin)) return paddle;

    const distance = paddle.x - canvasMin;
    return { ...paddle, x: paddle.x - Paddle.nextStep(distance) };
  },
  moveRight(paddle, canvasMax) {
    if (!Paddle.canMoveRight(paddle, canvasMax)) return paddle;

    const distance = canvasMax - paddle.x - paddle.width;
    return { ...paddle, x: paddle.x + Paddle.nextStep(distance) };
  },
  nextStep(distToBorder) {
    return distToBorder < STEP ? distToBorder : STEP;
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

const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 14;
const COLOR = '#29b6f6';
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
      step: STEP,
    };
  },
  increaseSpeed(paddle, diff = 1.1) {
    return { ...paddle, step: paddle.step * diff };
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
    return { ...paddle, x: paddle.x - Paddle.nextStep(distance, paddle.step) };
  },
  moveRight(paddle, canvasMax) {
    if (!Paddle.canMoveRight(paddle, canvasMax)) return paddle;

    const distance = canvasMax - paddle.x - paddle.width;
    return { ...paddle, x: paddle.x + Paddle.nextStep(distance, paddle.step) };
  },
  nextStep(distToBorder, step) {
    return distToBorder < step ? distToBorder : step;
  },
  draw(ctx, paddle) {
    const { x, y } = paddle;
    ctx.save();
    ctx.fillStyle = COLOR;
    ctx.beginPath();
    ctx.roundRect(x, y, paddle.width, paddle.height, [RADIUS]);
    ctx.fill();
    ctx.restore();
  },
};

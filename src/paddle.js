import { clamp } from './utils';

const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 14;
const COLOR = '#29b6f6';
const RADIUS = 40;
const SPEED = 300;
const MAX_SPEED = 450;

export const Paddle = {
  create(canvasWidth, canvasHeight) {
    const middleX = (canvasWidth - PADDLE_WIDTH) / 2;
    const middleY = canvasHeight - PADDLE_HEIGHT - 5;
    return {
      x: middleX,
      y: middleY,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      speed: SPEED,
    };
  },
  syncSpeedWithBall(paddle, ballSpeed) {
    const newSpeed = Math.min(ballSpeed * 1.2, MAX_SPEED);
    return { ...paddle, speed: newSpeed };
  },
  hitPosition(paddle, ball) {
    return (ball.x - paddle.x) / paddle.width;
  },
  move(paddle, min, max, direction, deltaTime) {
    const newSpeed = direction * paddle.speed * deltaTime;
    const calcX = paddle.x + newSpeed;
    const newX = clamp(min, calcX, max - paddle.width);

    return { ...paddle, x: newX };
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

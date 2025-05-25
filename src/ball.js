import { lerp } from './utils';

const BALL_RADIUS = 7;
const COLOR = '#ffd54f';
const MAX_ANGLE = Math.PI / 3;
const VY = 180;
const MAX_SPEED = 600;

export const Ball = {
  create(x, y, radius = BALL_RADIUS) {
    return {
      x,
      y,
      vx: -100 + Math.random() * 200,
      vy: VY,
      radius,
    };
  },
  move(ball, deltaTime) {
    return {
      ...ball,
      x: ball.x + ball.vx * deltaTime,
      y: ball.y + ball.vy * deltaTime,
    };
  },
  speed(ball) {
    return Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
  },
  increaseSpeed(ball, diff = 1.25) {
    const newVx = Math.min(ball.vx * diff, MAX_SPEED);
    const newVy = Math.min(ball.vy * diff, MAX_SPEED);

    return { ...ball, vx: newVx, vy: newVy };
  },
  offsetByDirection(ball, direction, pos) {
    return direction > 0 ? pos + ball.radius : pos - ball.radius;
  },
  bounceXWithAngle(ball, direction, pos, hitPos) {
    const angle = lerp(-MAX_ANGLE, MAX_ANGLE, hitPos);
    const speed = Ball.speed(ball);
    const vx = speed * Math.sin(angle);
    const vy = -speed * Math.cos(angle);

    return { ...ball, y: Ball.offsetByDirection(ball, direction, pos), vx, vy };
  },
  bounceX(ball, direction, pos) {
    return {
      ...ball,
      x: Ball.offsetByDirection(ball, direction, pos),
      vx: -ball.vx,
    };
  },
  bounceY(ball, direction, pos) {
    return {
      ...ball,
      y: Ball.offsetByDirection(ball, direction, pos),
      vy: -ball.vy,
    };
  },
  draw(ctx, ball) {
    const { x, y, radius } = ball;
    ctx.save();
    ctx.fillStyle = COLOR;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
};

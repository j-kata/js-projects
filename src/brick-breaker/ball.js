const BALL_RADIUS = 15;
const STROKE_COLOR = '#ccc';
const FILL_COLOR = '#345235';
const MAX_ANGLE = Math.PI / 3;

const lerp = (a, b, t) => a + (b - a) * t;

export const Ball = {
  create(x, y, vx, vy, radius = BALL_RADIUS) {
    return {
      x,
      y,
      vx,
      vy,
      radius,
    };
  },
  move(ball) {
    return { ...ball, x: ball.x + ball.vx, y: ball.y + ball.vy };
  },
  speed(ball) {
    return Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
  },
  increaseSpeed(ball, diff = 1.05) {
    return { ...ball, vx: ball.vx * diff, vy: ball.vy * diff};
  },
  bounce(ball, hitPos) {
    const angle = lerp(-MAX_ANGLE, MAX_ANGLE, hitPos);
    const speed = Ball.speed(ball);
    const vx = speed * Math.sin(angle);
    const vy = -speed * Math.cos(angle);

    return {...ball, vx, vy }
  },
  bounceHorizontal(ball) {
    return { ...ball, vx: -ball.vx };
  },
  bounceVertical(ball) {
    return { ...ball, vy: -ball.vy };
  },
  draw(ctx, ball) {
    const { x, y, radius } = ball;
    ctx.save();
    ctx.strokeStyle = STROKE_COLOR;
    ctx.fillStyle = FILL_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  },
};


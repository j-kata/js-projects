const BALL_RADIUS = 15;
const STROKE_COLOR = '#ccc';
const FILL_COLOR = '#345235';

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

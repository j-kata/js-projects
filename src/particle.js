const COLORS = ['#fff176', '#ff7043'];
const FADE_RATE = 0.025;

export const Particle = {
  create(x, y, int = 5, doubleInt = 2 * int) {
    return {
      x: x - int + Math.random() * doubleInt,
      y: y - int + Math.random() * doubleInt,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      radius: Math.random() + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
    };
  },
  move(particle) {
    return {
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
    };
  },
  fadeOut(particle) {
    return {
      ...particle,
      alpha: Math.max(0, particle.alpha - FADE_RATE),
    };
  },
  draw(ctx, particle) {
    const { x, y, radius, color, alpha } = particle;
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
};

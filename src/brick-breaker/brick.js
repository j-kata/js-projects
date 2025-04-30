import { BRICK_WIDTH, BRICK_HEIGHT, LEVEL, COLORS } from './constants';
export const Brick = {
  create({
    x,
    y,
    width = BRICK_WIDTH,
    height = BRICK_HEIGHT,
    level = LEVEL.STRONG,
  }) {
    return {
      x,
      y,
      width,
      height,
      level,
      hitsRemaining: level + 1,
      color: COLORS[level],
    };
  },
  moveDown(brick, distance = BRICK_HEIGHT) {
    return { ...brick, y: brick.y + distance };
  },
  hit(brick) {
    const hitsRemaining = brick.hitsRemaining - 1;
    if (hitsRemaining > 0) {
      const level = brick.level - 1;
      return { ...brick, level, hitsRemaining, color: COLORS[level] };
    }
    return null;
  },
  draw(ctx, brick) {
    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  },
};

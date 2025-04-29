export const BRICK_WIDTH = 100;
export const BRICK_HEIGHT = 34;

export const LEVEL = { LIGHT: 0, MIDDLE: 1, STRONG: 2 };
export const COLORS = { 0: '#3eaf3e', 1: '#546ab2', 2: '#ff5050' };

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
  draw(ctx, brick) {
    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  },
};

import { Brick, BRICK_WIDTH, BRICK_HEIGHT, LEVEL } from './brick';

const SPACE = 4;

export const SPACED_BRICK_WIDTH = BRICK_WIDTH + SPACE;
export const SPACED_BRICK_HEIGHT = BRICK_HEIGHT + SPACE;

export function initBricks(offsetX, offsetY, colCount, rowCount) {
  let currentY = offsetY;
  const bricks = [];
  for (let row = rowCount; row > 0; row--) {
    const level = brickRowLevel(row - 1);
    const topRow = createBrickRow(offsetX, currentY, colCount, level);
    bricks.push(...topRow);
    currentY += SPACED_BRICK_HEIGHT;
  }
  return bricks;
}

function brickRowLevel(row) {
  return row == 0 ? LEVEL.LIGHT : row == 1 ? LEVEL.MIDDLE : LEVEL.STRONG;
}

export function createBrickRow(offsetX, offsetY, colCount, level) {
  const row = [];
  let currentX = offsetX;
  for (let col = 0; col < colCount; col++) {
    row.push(Brick.create({ x: currentX, y: offsetY, level }));
    currentX += SPACED_BRICK_WIDTH;
  }
  return row;
}

export function moveDownBrickRows(bricks) {
  return bricks.map((brick) => Brick.moveDown(brick, SPACED_BRICK_HEIGHT));
}

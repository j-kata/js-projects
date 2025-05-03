import { Brick } from './brick';
import { LEVEL, SPACED_BRICK_WIDTH, SPACED_BRICK_HEIGHT } from './constants';

export function initBricks(offsetX, offsetY, rowCount, colCount) {
  let currentY = offsetY;
  const bricks = [];
  for (let row = rowCount; row > 0; row--) {
    const topRow = createBrickRow(offsetX, currentY, colCount, row - 1);
    bricks.push(...topRow);
    currentY += SPACED_BRICK_HEIGHT;
  }
  return bricks;
}

export function createBrickRow(offsetX, offsetY, colCount, rowNumber) {
  const row = [];
  const level = brickRowLevel(rowNumber);
  let currentX = offsetX;
  for (let col = 0; col < colCount; col++) {
    row.push(
      Brick.create({
        id: brickId(rowNumber, colCount, col),
        x: currentX,
        y: offsetY,
        level,
      })
    );
    currentX += SPACED_BRICK_WIDTH;
  }
  return row;
}

function brickRowLevel(rowNumber) {
  let row = rowNumber > 6 ? Math.random() * 6 : rowNumber;
  if (row < 2) return LEVEL.LIGHT;
  if (row < 4) return LEVEL.MIDDLE;
  return LEVEL.STRONG;
}

function brickId(rowNumber, colCount, index) {
  return (rowNumber + 1) * colCount + index;
}

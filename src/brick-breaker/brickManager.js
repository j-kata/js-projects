import { Brick } from './brick';
import { createBrickRow } from './bricksConstructor';
import { SPACED_BRICK_HEIGHT } from './constants';

export function handleBrickHit(bricks, hitBrick) {
  const newBrick = Brick.hit(hitBrick);
  if (newBrick) {
    return bricks.map((brick) => (brick === hitBrick ? newBrick : brick));
  } else {
    return bricks.filter((brick) => brick !== hitBrick);
  }
}

export function addTopBrickRow(bricks, offset, colMax, rowIndex) {
  const topRow = createBrickRow(offset, offset, colMax, rowIndex);
  const movedRows = moveDownBrickRows(bricks);
  return [...topRow, ...movedRows];
}

export function canAddBrickRow(bricks, maxY) {
  return bricks.every((b) => b.y + 2 * b.height < maxY);
}

function moveDownBrickRows(bricks) {
  return bricks.map((brick) => Brick.moveDown(brick, SPACED_BRICK_HEIGHT));
}

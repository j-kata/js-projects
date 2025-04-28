import { Ball } from './ball';
import { Bounce } from './bounce';
import { Brick, BRICK_WIDTH, BRICK_HEIGHT, LEVEL } from './brick';
import { Paddle } from './paddle';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const SPACE = 4;

const SPACED_BRICK_WIDTH = BRICK_WIDTH + SPACE;
const SPACED_BRICK_HEIGHT = BRICK_HEIGHT + SPACE;

const BRICK_MAX = Math.floor(CANVAS_WIDTH / SPACED_BRICK_WIDTH);
const OFFSET = (CANVAS_WIDTH - BRICK_MAX * SPACED_BRICK_WIDTH) / 2;

const state = {
  bricks: [],
  paddle: Paddle.create(CANVAS_WIDTH, CANVAS_HEIGHT),
  ball: Ball.create(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    -2 + Math.random() * 2,
    1
  ),
  score: 0,
};

let brickRowIntervalId = null;
const keysPressed = {};
const keyDownHandler = handleKey.bind(this, true);
const keyUpHandler = handleKey.bind(this, false);

startGame();

function startGame() {
  state.score = 0;
  state.bricks = initBricks();
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);
  // brickRowIntervalId = setInterval(addTopBrickRow, 1500);
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  window.removeEventListener('keydown', keyDownHandler);
  window.removeEventListener('keyup', keyUpHandler);
  clearInterval(brickRowIntervalId);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  if (keysPressed['ArrowLeft']) {
    state.paddle = Paddle.moveLeft(state.paddle, 0);
  }
  if (keysPressed['ArrowRight']) {
    state.paddle = Paddle.moveRight(state.paddle, CANVAS_WIDTH);
  }
  checkBallCollisions();
  state.ball = Ball.move(state.ball);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.bricks.forEach((brick) => Brick.draw(ctx, brick));
  Ball.draw(ctx, state.ball);
  Paddle.draw(ctx, state.paddle);
}

function initBricks(rowCount = 4) {
  let currentY = OFFSET;
  const bricks = [];
  for (let row = rowCount; row > 0; row--) {
    const level = brickRowLevel(row - 1);
    const topRow = createBrickRow(currentY, level);
    bricks.push(...topRow);
    currentY += SPACED_BRICK_HEIGHT;
  }
  return bricks;
}

function brickRowLevel(row) {
  return row == 0 ? LEVEL.LIGHT : row == 1 ? LEVEL.MIDDLE : LEVEL.STRONG;
}

function createBrickRow(currentY, level) {
  const row = [];
  let currentX = OFFSET;
  for (let col = 0; col < BRICK_MAX; col++) {
    row.push(Brick.create({ x: currentX, y: currentY, level }));
    currentX += SPACED_BRICK_WIDTH;
  }
  return row;
}

function addTopBrickRow() {
  if (canAddBrickRow()) {
    stopGame();
    // alert('Game over!');
    return;
  }
  const topRow = createBrickRow(OFFSET, LEVEL.STRONG);
  const movedRows = moveDownBrickRow();
  state.bricks = [...topRow, ...movedRows];
}

function moveDownBrickRow() {
  return state.bricks.map((brick) =>
    Brick.moveDown(brick, SPACED_BRICK_HEIGHT)
  );
}

function canAddBrickRow() {
  return state.bricks.find(
    (b) => b.y + 2 * SPACED_BRICK_HEIGHT > state.paddle.y
  );
}

function checkBallCollisions() {
  let ball = state.ball;
  ball = Bounce.ofWall(ball, CANVAS_WIDTH, CANVAS_HEIGHT);
  ball = Bounce.ofPaddle(ball, state.paddle);
  const { ball: newBall, hit } = Bounce.ofBrick(ball, state.bricks);
  if (hit) {
    state.bricks = state.bricks.filter((b) => b !== hit);
  }
  state.ball = newBall;
}

function handleKey(pressed, event) {
  const acceptedCodes = ['ArrowLeft', 'ArrowRight'];
  if (!acceptedCodes.includes(event.code)) return;

  keysPressed[event.code] = pressed;
}

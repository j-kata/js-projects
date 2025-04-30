import { Ball } from './ball';
import { Bounce } from './bounce';
import { Brick, LEVEL } from './brick';
import {
  createBrickRow,
  initBricks,
  SPACED_BRICK_WIDTH,
  SPACED_BRICK_HEIGHT,
} from './bricksConstructor';
import { Collision } from './collision';
import { Paddle } from './paddle';

const scoreField = document.getElementById('score');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const BRICK_INIT_ROWS = 3;
const BRICK_MAX_COLS = Math.floor(CANVAS_WIDTH / SPACED_BRICK_WIDTH);
const OFFSET = (CANVAS_WIDTH - BRICK_MAX_COLS * SPACED_BRICK_WIDTH) / 2;

let state = {
  bricks: [],
  rowsCounter: BRICK_INIT_ROWS,
  paddle: Paddle.create(CANVAS_WIDTH, CANVAS_HEIGHT),
  ball: Ball.create(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    -2 + Math.random() * 4,
    4
  ),
  score: 0,
  gameOn: false,
};

let brickRowIntervalId = null;
const keysPressed = {};
const keyDownHandler = handleKey.bind(this, true);
const keyUpHandler = handleKey.bind(this, false);

startGame();

function startGame() {
  state.gameOn = true;
  state.score = 0;
  state.bricks = initBricks(OFFSET, OFFSET, BRICK_INIT_ROWS, BRICK_MAX_COLS);
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);
  brickRowIntervalId = setInterval(addTopBrickRow, 10000);
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  state.gameOn = false;
  window.removeEventListener('keydown', keyDownHandler);
  window.removeEventListener('keyup', keyUpHandler);
  clearInterval(brickRowIntervalId);
  alert('Game over!');
}

function gameLoop() {
  update();
  if (!state?.gameOn) return;

  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  state = updatePaddle(state);
  state = updateBall(state);
}

function updatePaddle(state) {
  let { paddle } = state;
  if (keysPressed['ArrowLeft']) {
    paddle = Paddle.moveLeft(paddle, 0);
  }
  if (keysPressed['ArrowRight']) {
    paddle = Paddle.moveRight(paddle, CANVAS_WIDTH);
  }
  return { ...state, paddle };
}

function updateBall(state) {
  if (Collision.hitWallBottom(state.ball, CANVAS_HEIGHT)) {
    stopGame();
    return;
  }
  let { ball, paddle, bricks, score } = state;
  ball = Ball.move(ball);
  ball = Bounce.ofWall(ball, CANVAS_WIDTH, CANVAS_HEIGHT);
  ball = Bounce.ofPaddle(ball, paddle);
  const { ball: newBall, hit } = Bounce.ofBrick(ball, bricks);
  if (hit) {
    bricks = handleBrickHit(bricks, hit);
    score += 1;
  }

  return { ...state, ball: newBall, paddle, bricks, score };
}

function draw() {
  if (!state.gameOn) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.bricks.forEach((brick) => Brick.draw(ctx, brick));
  Ball.draw(ctx, state.ball);
  Paddle.draw(ctx, state.paddle);
  scoreField.textContent = state.score;
}

function addTopBrickRow() {
  if (state.gameOn && !canAddBrickRow(state.bricks, state.paddle.y)) {
    stopGame();
    return;
  }
  const topRow = createBrickRow(
    OFFSET,
    OFFSET,
    BRICK_MAX_COLS,
    state.rowsCounter
  );
  const movedRows = moveDownBrickRows(state.bricks);
  state.bricks = [...topRow, ...movedRows];
  state.rowsCounter++;
}

function canAddBrickRow(bricks, maxY) {
  return bricks.every((b) => b.y + 2 * b.height < maxY);
}

function moveDownBrickRows(bricks) {
  return bricks.map((brick) => Brick.moveDown(brick, SPACED_BRICK_HEIGHT));
}

function handleBrickHit(bricks, hitBrick) {
  const newBrick = Brick.hit(hitBrick);
  if (newBrick) {
    return bricks.map((brick) => (brick === hitBrick ? newBrick : brick));
  } else {
    return bricks.filter((brick) => brick !== hitBrick);
  }
}

function handleKey(pressed, event) {
  const acceptedCodes = ['ArrowLeft', 'ArrowRight'];
  if (!acceptedCodes.includes(event.code)) return;

  keysPressed[event.code] = pressed;
}

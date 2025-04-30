import { WIDTH, HEIGHT, OFFSET, ROWS_INIT, BRICKS_MAX } from './constants';
import { Ball } from './ball';
import { Bounce } from './bounce';

import { initBricks } from './bricksConstructor';
import { Collision } from './collision';
import {
  handleKeyDown,
  handleKeyUp,
  leftArrowPressed,
  rightArrowPressed,
} from './input';
import { Paddle } from './paddle';
import {
  clearCanvas,
  drawBall,
  drawBricks,
  drawPaddle,
  updateScore,
} from './ui';
import { addTopBrickRow, canAddBrickRow, handleBrickHit } from './brickManager';

let brickRowIntervalId = null;
let state = {};

startGame();

function startGame() {
  state = initState();
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  brickRowIntervalId = setInterval(updateBricks, 1000);
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  clearInterval(brickRowIntervalId);
  alert('Game over!');
}

function gameLoop() {
  if (!state.gameOn) return;

  state = update(state);
  if (!state.gameOn) stopGame();
  draw(state);
  requestAnimationFrame(gameLoop);
}

function update(state) {
  let newState = updatePaddle(state);
  newState = updateBall(newState);
  return newState;
}

function updatePaddle(state) {
  let { paddle } = state;
  if (leftArrowPressed()) {
    paddle = Paddle.moveLeft(paddle, 0);
  }
  if (rightArrowPressed()) {
    paddle = Paddle.moveRight(paddle, WIDTH);
  }
  return { ...state, paddle };
}

function updateBall(state) {
  if (Collision.hitWallBottom(state.ball, HEIGHT)) {
    return { ...state, gameOn: false };
  }
  let { ball, paddle, bricks, score } = state;
  ball = Ball.move(ball);
  ball = Bounce.ofWall(ball, WIDTH, HEIGHT);
  ball = Bounce.ofPaddle(ball, paddle);
  const { ball: newBall, hit } = Bounce.ofBrick(ball, bricks);
  if (hit) {
    bricks = handleBrickHit(bricks, hit);
    score += 1;
  }

  return { ...state, ball: newBall, paddle, bricks, score };
}

function updateBricks() {
  if (!state.gameOn) return;

  if (!canAddBrickRow(state.bricks, state.paddle.y)) {
    state = { ...state, gameOn: false };
    stopGame();
    return;
  }
  const bricks = addTopBrickRow(
    state.bricks,
    OFFSET,
    BRICKS_MAX,
    state.rowsCounter
  );
  state = { ...state, bricks, rowsCounter: state.rowsCounter + 1 };
}

function draw({ bricks, ball, paddle, score }) {
  clearCanvas();
  drawBricks(bricks);
  drawBall(ball);
  drawPaddle(paddle);
  updateScore(score);
}

function initState() {
  return {
    bricks: initBricks(OFFSET, OFFSET, ROWS_INIT, BRICKS_MAX),
    rowsCounter: ROWS_INIT,
    paddle: Paddle.create(WIDTH, HEIGHT),
    ball: Ball.create(WIDTH / 2, HEIGHT / 2, -2 + Math.random() * 4, 4),
    score: 0,
    gameOn: true,
  };
}

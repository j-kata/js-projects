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
  drawParticles,
  updateScore,
} from './ui';
import {
  addTopBrickRow,
  canAddBrickRow,
  removeBrick,
  replaceBrick,
} from './brickManager';
import { Particle } from './particle';
import { Brick } from './brick';
import { createExplosion } from './explosion';

let brickRowIntervalId = null;
let state = {};

startGame();

function startGame() {
  state = initState();
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  brickRowIntervalId = setInterval(updateBricks, 10000);
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  clearInterval(brickRowIntervalId);
  alert('Game over!');
}

function gameLoop() {
  state = update(state);
  if (!state.gameOn) return;

  draw(state);
  requestAnimationFrame(gameLoop);
}

function update(state) {
  let newState = updatePaddle(state);
  newState = updateBall(newState);
  newState = updateParticles(newState);
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
    stopGame();
    return { ...state, gameOn: false };
  }
  let { ball, paddle, bricks, particles, score } = state;
  ball = Ball.move(ball);
  ball = Bounce.ofWall(ball, WIDTH, HEIGHT);
  ball = Bounce.ofPaddle(ball, paddle);
  const { ball: newBall, hit } = Bounce.ofBrick(ball, bricks);
  if (hit) {
    const updatedBrick = Brick.hit(hit);
    if (updatedBrick) {
      bricks = replaceBrick(bricks, hit, updatedBrick);
    } else {
      bricks = removeBrick(bricks, hit);
      particles = [...particles, ...createExplosion(Brick.center(hit))];
      score += 1;
    }
  }

  return { ...state, ball: newBall, paddle, bricks, particles, score };
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

function updateParticles(state) {
  let updatedParticles = state.particles
    .map((particle) => Particle.fadeOut(Particle.move(particle)))
    .filter((particle) => particle.alpha > 0);
  return { ...state, particles: updatedParticles };
}

function draw({ bricks, ball, paddle, particles, score }) {
  clearCanvas();
  drawBricks(bricks);
  drawBall(ball);
  drawPaddle(paddle);
  drawParticles(particles);
  updateScore(score);
}

function initState() {
  return {
    bricks: initBricks(OFFSET, OFFSET, ROWS_INIT, BRICKS_MAX),
    rowsCounter: ROWS_INIT,
    paddle: Paddle.create(WIDTH, HEIGHT),
    ball: Ball.create(WIDTH / 2, HEIGHT / 2, -2 + Math.random() * 4, 4),
    particles: [],
    score: 0,
    gameOn: true,
  };
}

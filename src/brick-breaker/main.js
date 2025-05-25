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

const BRICK_UPDATE_SPEED = 10000;
let brickRowIntervalId = null;
let state = {};
let lastTime = null;

document.addEventListener('DOMContentLoaded', function () {
  const backdrop = document.getElementById('backdrop');
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', function () {
    backdrop.classList.add('!hidden');
    startGame();
  });
});

function startGame() {
  state = initState();
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  brickRowIntervalId = setInterval(updateBricks, BRICK_UPDATE_SPEED);
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  clearInterval(brickRowIntervalId);
  document.getElementById('backdrop').classList.remove('!hidden');
}

function gameLoop(currentTime) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  state = update(state, deltaTime);
  if (!state.gameOn) return;

  draw(state);
  requestAnimationFrame(gameLoop);
}

function update(state, deltaTime) {
  let newState = updatePaddle(state, deltaTime);
  newState = updateBall(newState, deltaTime);
  newState = updateParticles(newState);
  return newState;
}

function updatePaddle(state, deltaTime) {
  let { paddle } = state;
  let direction = leftArrowPressed() ? -1 : rightArrowPressed() ? 1 : 0;

  if (direction) paddle = Paddle.move(paddle, 0, WIDTH, direction, deltaTime);

  return { ...state, paddle };
}

function updateBall(state, deltaTime) {
  if (Collision.hitWallBottom(state.ball, HEIGHT)) {
    stopGame();
    return { ...state, gameOn: false };
  }
  let { ball, paddle, bricks, particles, score, hit = null } = state;
  ball = Ball.move(ball, deltaTime);
  ball = Bounce.ofWall(ball, WIDTH, HEIGHT);
  ball = Bounce.ofPaddle(ball, paddle);
  ({ ball, hit } = Bounce.ofBrick(ball, bricks));

  if (hit) {
    const updatedBrick = Brick.hit(hit);
    if (updatedBrick) {
      bricks = replaceBrick(bricks, hit, updatedBrick);
    } else {
      bricks = removeBrick(bricks, hit);
      particles = [...particles, ...createExplosion(Brick.center(hit))];
      score += 1;
      if (score % 5 == 0) ball = Ball.increaseSpeed(ball);
    }
  }
  paddle = Paddle.syncSpeedWithBall(paddle, Ball.speed(ball));
  return { ...state, ball, paddle, bricks, particles, score };
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
    ball: Ball.create(WIDTH / 2, HEIGHT / 2),
    particles: [],
    score: 0,
    gameOn: true,
  };
}

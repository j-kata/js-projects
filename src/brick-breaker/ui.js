import { Ball } from './ball';
import { Brick } from './brick';
import { Paddle } from './paddle';

const scoreField = document.getElementById('score');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export function updateScore(score) {
  scoreField.textContent = score;
}

export function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawBricks(bricks) {
  bricks.forEach((brick) => Brick.draw(ctx, brick));
}

export function drawBall(ball) {
  Ball.draw(ctx, ball);
}

export function drawPaddle(paddle) {
  Paddle.draw(ctx, paddle);
}

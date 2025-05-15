import { Ball } from './ball';
import { Paddle } from './paddle';
import { Collision } from './collision';

export const Bounce = {
  ofWall(ball, width, _height) {
    let newBall = ball;
    if (Collision.hitWallLeft(ball, 0) || Collision.hitWallRight(ball, width)) {
      newBall = Ball.bounceHorizontal(newBall);
    }
    if (Collision.hitWallTop(ball, 0)) {
      newBall = Ball.bounceVertical(newBall);
    }
    return newBall;
  },
  ofPaddle(ball, paddle) {
    if (Collision.hitObjectBottom(ball, paddle)) {
      return Ball.bounce(ball, Paddle.hitPosition(paddle, ball));
    }
    return ball;
  },
  ofBrick(ball, bricks) {
    let newBall = ball;
    let hitBrick = null;
    bricks.forEach((brick) => {
      if (
        Collision.hitObjectBottom(ball, brick) ||
        Collision.hitObjectTop(ball, brick)
      ) {
        newBall = Ball.bounceVertical(newBall);
        hitBrick = brick;
        return;
      } else if (
        Collision.hitObjectLeft(ball, brick) ||
        Collision.hitWallRight(ball, brick)
      ) {
        newBall = Ball.bounceHorizontal(newBall);
        hitBrick = brick;
        return;
      }
    });
    return { ball: newBall, hit: hitBrick };
  },
};

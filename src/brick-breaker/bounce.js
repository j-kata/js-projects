import { Ball } from './ball';
import { Paddle } from './paddle';
import { Collision } from './collision';

export const Bounce = {
  ofWall(ball, width, _height) {
    let newBall = ball;
    if (Collision.hitWallLeft(ball, 0)) {
      newBall = Ball.bounceX(newBall, 1, 0);
    } else if (Collision.hitWallRight(ball, width)) {
      newBall = Ball.bounceX(newBall, -1, width);
    } else if (Collision.hitWallTop(ball, 0)) {
      newBall = Ball.bounceY(newBall, 1, 0);
    }
    return newBall;
  },
  ofPaddle(ball, paddle) {
    if (Collision.hitObjectBottom(ball, paddle)) {
      return Ball.bounceXWithAngle(ball, -1, paddle.y, Paddle.hitPosition(paddle, ball));
    }
    return ball;
  },
  ofBrick(ball, bricks) {
    let newBall = ball;
    let hitBrick = null;
    for (const brick of bricks) {
      if (Collision.hitObjectBottom(ball, brick)) {
        newBall = Ball.bounceY(newBall, -1, brick.y);
      } else if (Collision.hitObjectTop(ball, brick)) {
        newBall = Ball.bounceY(newBall, 1, brick.y + brick.height);
      } else if (Collision.hitObjectLeft(ball, brick)) {
        newBall = Ball.bounceX(newBall, 1, brick.x + brick.width);
      } else if (Collision.hitObjectRight(ball, brick)) {
        newBall = Ball.bounceX(newBall, -1, brick.x);
      }

      if (ball !== newBall) {
        hitBrick = brick;
        break;
      }
    };
    return { ball: newBall, hit: hitBrick };
  },
};

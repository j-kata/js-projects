import { Ball } from './ball';
import { Collision } from './collision';

export const Bounce = {
  ofWall(ball, width, height) {
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
    const ballBottom = ball.y + ball.radius;
    console.log(paddle.y > ballBottom, ballBottom > paddle.y + paddle.height);
    if (Collision.hitObjectBottom(ball, paddle)) {
      return Ball.bounceVertical(ball);
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

import { clamp } from './utils';

export const Collision = {
  hitWallLeft(ball, wallX) {
    return ball.x - ball.radius < wallX;
  },
  hitWallRight(ball, wallX) {
    return ball.x + ball.radius > wallX;
  },
  hitWallTop(ball, wallY) {
    return ball.y - ball.radius < wallY;
  },
  hitWallBottom(ball, wallY) {
    return ball.y + ball.radius > wallY;
  },
  intersectObjectSide(ball, closestX, closestY) {
    const distanceX = ball.x - closestX;
    const distanceY = ball.y - closestY;
    return distanceX ** 2 + distanceY ** 2 < ball.radius ** 2;
  },
  hitObjectLeft(ball, obj) {
    const closestX = obj.x + obj.width;
    const closestY = clamp(ball.y, obj.y, obj.y + obj.height);
    return Collision.intersectObjectSide(ball, closestX, closestY);
  },
  hitObjectRight(ball, obj) {
    const closestX = obj.x;
    const closestY = clamp(ball.y, obj.y, obj.y + obj.height);
    return Collision.intersectObjectSide(ball, closestX, closestY);
  },
  hitObjectTop(ball, obj) {
    const closestX = clamp(ball.x, obj.x, obj.x + obj.width);
    const closestY = obj.y + obj.height;
    return Collision.intersectObjectSide(ball, closestX, closestY);
  },
  hitObjectBottom(ball, obj) {
    const closestX = clamp(ball.x, obj.x, obj.x + obj.width);
    const closestY = obj.y;
    return Collision.intersectObjectSide(ball, closestX, closestY);
  },
};

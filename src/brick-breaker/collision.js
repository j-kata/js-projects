export const Collision = {
  hitWallLeft(ball, x) {
    return ball.x - ball.radius < x;
  },
  hitWallRight(ball, x) {
    return ball.x + ball.radius > x;
  },
  hitWallTop(ball, y) {
    return ball.y - ball.radius < y;
  },
  hitWallBottom(ball, y) {
    return ball.y + ball.radius > y;
  },
  insideObjectVertically(ball, obj) {
    return (
      ball.y - ball.radius > obj.y && ball.y + ball.radius < obj.y + obj.height
    );
  },
  insideObjectHorizontally(ball, obj) {
    return (
      ball.x - ball.radius > obj.x && ball.x + ball.radius < obj.x + obj.width
    );
  },
  hitObjectLeft(ball, obj) {
    const ballLeft = ball.x - ball.radius;
    return (
      obj.x < ballLeft &&
      ballLeft < obj.x + obj.width &&
      this.insideObjectVertically(ball, obj)
    );
  },
  hitObjectRight(ball, obj) {
    const ballRight = ball.x + ball.radius;
    return (
      obj.x < ballRight &&
      ballRight < obj.x + obj.width &&
      this.insideObjectVertically(ball, obj)
    );
  },
  hitObjectTop(ball, obj) {
    const ballTop = ball.y - ball.radius;
    return (
      obj.y < ballTop &&
      ballTop < obj.y + obj.height &&
      this.insideObjectHorizontally(ball, obj)
    );
  },
  hitObjectBottom(ball, obj) {
    const ballBottom = ball.y + ball.radius;
    return (
      obj.y < ballBottom &&
      ballBottom < obj.y + obj.height &&
      this.insideObjectHorizontally(ball, obj)
    );
  },
};

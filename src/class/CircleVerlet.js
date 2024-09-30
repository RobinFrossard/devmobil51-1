import Circle from "./Circle";

export default class CircleVerlet extends Circle {

  constructor({
    x = 0,
    y = 0,
    radius = 100,
    color = 'tomato',
    speed = 100,
    direction = 0
  } = {}) {
    super({ x, y, radius, color, speed, direction });
    this.oldX = x;
    this.oldY = y;
    this.accelY = 0;
  }

  move(dt) {
    const dx = this.x - this.oldX;
    const dy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    this.x += dx;
    this.y += dy + this.accelY * dt * dt;

    this.accelY = 0;
  }

  applyForceY(force) {
    this.accelY += force; // a = f / m
  }

  constraintBox(width, height) {
    if (this.y + this.radius > height) {
      const vy = this.y - this.oldY;
      this.y = height - this.radius;
      this.oldY = this.y + vy * 0.95;
    }
  }

}
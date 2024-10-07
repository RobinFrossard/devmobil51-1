import Circle from "./Circle";

export default class CircleVerlet extends Circle {

  constructor({
    x = 0,
    y = 0,
    radius = 100,
    color = 'tomato',
    speed = 100,
    direction = 0,
    sticky = false,
  } = {}) {
    super({ x, y, radius, color, speed, direction });
    this.oldX = x;
    this.oldY = y;
    this.accelY = 0;
    this.sticky = sticky;
  }

  collisionCircle(c) {
    const distance = this.distanceTo(c);
    if (distance > this.radius + c.radius) return;

    const angle = Math.atan2(c.y - this.y, c.x - this.x);
    const overlap = this.radius + c.radius - distance;
    const dx = Math.cos(angle) * overlap / 2;
    const dy = Math.sin(angle) * overlap / 2;

    if (!this.sticky) {
      this.x -= dx;
      this.y -= dy;
    }

    if (!c.sticky) {
      c.x += dx;
      c.y += dy;
    }
  }

  move(dt) {
    if (this.sticky) return;

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
    const vX = Math.min(this.x - this.lastX, 1);
    const vY = Math.min(this.y - this.lastY, 1);

    if (this.y + this.radius > height) {
      this.y = height - this.radius ;
      this.lastY = this.y + vY;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.lastY = this.y + vY;
    }

    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.lastX = this.x + vX;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.lastX = this.x + vX;
    }
  }

}
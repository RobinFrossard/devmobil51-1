import { TAU } from '../utils/math.js';

export default class Circle {

  constructor({
    x = 0,
    y = 0,
    radius = 100,
    color = 'tomato',
    speed = 100,
    direction = TAU / 4
  } = {}) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
  }

  move(dt) {
    const dx = this.speed * Math.cos(this.direction) * dt / 1000;
    const dy = this.speed * Math.sin(this.direction) * dt / 1000;
    this.x += dx;
    this.y += dy;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

}
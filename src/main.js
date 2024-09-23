import Circle from "./class/Circle";
import { TAU } from "./utils/math";

const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;


const circles = [];
for (let i = 0; i < 100; i++) {
  circles.push(new Circle({
    x: Math.random() * ctx.canvas.width,
    y: Math.random() * ctx.canvas.height,
    radius: Math.random() * 100,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speed: Math.random() * 100,
    direction: Math.random() * TAU,
  }));
}
function tick(timestamp) {
  const dt = timestamp - lastTickTime;
  lastTickTime = timestamp;

  // update the world
  for (const c of circles) {
    c.move(dt);
  }

  // draw the world
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const c of circles) {
    c.draw(ctx);
  }

  // game loop
  requestAnimationFrame(tick);
}

let lastTickTime = 0;
requestAnimationFrame(tick)


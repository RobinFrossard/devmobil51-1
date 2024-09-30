import CircleVerlet from "./class/CircleVerlet";
import { TAU } from "./utils/math";
import MainLoop from "./utils/MainLoop";

const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const circles = [];
for (let i = 0; i < 1000; i++) {
  circles.push(new CircleVerlet({
    x: Math.random() * ctx.canvas.width,
    y: Math.random() * ctx.canvas.height,
    radius: Math.random() * 80,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speed: Math.random() * 100,
    direction: 0,
  }));
}
// circles.push(new CircleVerlet({
//   x: ctx.canvas.width / 2,
//   y: ctx.canvas.height / 2,
//   radius: 100,
//   color: 'tomato',
//   speed: 100,
//   direction: 0,
// }));


MainLoop.setUpdate((dt) => {
    for (const c of circles) {
      c.applyForceY(0.01);
      c.move(dt);
      c.constraintBox(ctx.canvas.width, ctx.canvas.height);
    }
});
MainLoop.setDraw(() => {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const c of circles) {
    c.draw(ctx);
  }
});
MainLoop.start();

// function tick(timestamp) {
//   requestAnimationFrame(tick);

//   dt += timestamp - lastTickTime;
//   lastTickTime = timestamp;

//   if (dt < 1000 / 10) {
//     return;
//   }

//   // User input management


//   dt = 0;

//   // Draw the world


// }

// let dt = 0;
// let lastTickTime = 0;
// requestAnimationFrame(tick)
import Circle from "./class/Circle";
import Keyboard from "./class/Keyboard";
import Touch from "./class/Touch";
import { TAU } from "./utils/math";
import MainLoop from "./utils/MainLoop";

const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const keyboard = new Keyboard();
const touch = new Touch();

const circles = [];
for (let i = 0; i < 100; i++) {
  circles.push(new Circle({
    x: Math.random() * ctx.canvas.width,
    y: Math.random() * ctx.canvas.height,
    radius: Math.random() * 80,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speed: Math.random() * 100,
    direction: 0,
  }));
}


MainLoop.setUpdate((dt) => {
  let angle = false;
  if(keyboard.isKeyDown('KeyW')) {
    angle = 3/4 * TAU;
  } else if(keyboard.isKeyDown('KeyS')) {
    angle = 1/4 * TAU;
  }

  if (angle === false) {
    angle = touch.getAngle();
    if (angle !== false) {
      angle += TAU / 2;
    }
  }

  if (angle !== false) {
    for (const c of circles) {
      c.setDir(angle);
      c.move(dt);
    }
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
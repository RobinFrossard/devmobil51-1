import CircleVerlet from "./class/CircleVerlet";
import { TAU } from "./utils/math";
import MainLoop from "./utils/MainLoop";
import Link from "./class/LinkVerlet";

const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const circles = [];
for (let i = 0; i < 2; i++) {
  const r = Math.random() * 30 + 5;
  circles.push(new CircleVerlet({
    x: Math.random() * (ctx.canvas.width - 2*r) + r,
    y: Math.random() * (ctx.canvas.height - 2*r) + r,
    radius: r,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  }));
}
circles[0].sticky = true;

const link1 = new Link({
  obj1: circles[0],
  obj2: circles[1],
  distance: 100,
});

MainLoop.setSimulationTimestep(1000 / 120);
MainLoop.setUpdate((dt) => {
  for (const c of circles) {
    c.applyForceY(0.01);
    c.move(dt);
    c.constraintBox(ctx.canvas.width, ctx.canvas.height);
  }
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    for (let j = i + 1; j < circles.length; j++) {
      const other = circles[j];
      c.collisionCircle(other);
    }
  }
  link1.update();
});
MainLoop.setDraw(() => {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const c of circles) c.draw(ctx);
  link1.draw(ctx);
});
MainLoop.setEnd((fps, panic) => {
  if (panic) {
    MainLoop.resetFrameDelta();
    console.warn('panic!');
  }
});
MainLoop.start();
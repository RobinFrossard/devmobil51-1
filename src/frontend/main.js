import CircleVerlet from "../class/CircleVerlet";
import MainLoop from "../utils/MainLoop";
import WsClient from "../websocket/WSClient.js";
import { randomHSL } from "../utils/color.js";

// Color setup
const color = randomHSL();

// Canvas setup
const ctx = document.querySelector("canvas").getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

// Create a websocket client
const wsClient = new WsClient("ws://localhost:8887");
await wsClient.connect();

// Circles setup
const circles = [];

// Receive circle data from the server
wsClient.sub("circle-sync", (data) => {
	const { x, y, color } = data;
	circles.push(
		new CircleVerlet({
			x,
			y,
			r: 25,
			color,
		})
	);
});

// Listen to click events
ctx.canvas.addEventListener("click", (e) => {
	const data = { x: e.clientX, y: e.clientY, color };

	// Send the data to the server
	wsClient.pub("circle-sync", data);
});

// Loop setup
const timestep = 1000 / 60;

function updateWorld(dt) {
	// Apply gravity to all circles
	for (const circle of circles) {
        circle.boxConstraint(ctx.canvas.width, ctx.canvas.height);
        circle.move(dt);
        circle.applyForceY(0.002); // simulate gravity
    }

	// Check for collisions
    for (let i = 0; i < circles.length; i++) {
        const c1 = circles[i];
        for (let j = i + 1; j < circles.length; j++) {
            const c2 = circles[j];
            c1.circleCollision(c2);
        }
    }
}

function drawWorld() {
	ctx.canvas.width = ctx.canvas.clientWidth;
	ctx.canvas.height = ctx.canvas.clientHeight;
	for (const circle of circles) {
		circle.draw(ctx);
	}
}

MainLoop.setSimulationTimestep(timestep);
MainLoop.setUpdate(updateWorld);
MainLoop.setDraw(drawWorld);
MainLoop.setEnd((fps, panic) => {
	if (!panic) return;
	console.error("panic");
	MainLoop.resetFrameDelta();
});
MainLoop.start();

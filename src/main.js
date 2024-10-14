import WSClient from "./class/WSClient";

const wsClient = new WSClient('ws://localhost:8887');
await wsClient.connect();
wsClient.send('hello world');
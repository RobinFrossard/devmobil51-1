import WSServer from './WSServer.mjs';

const server = new WSServer({
  port: 8887,
  origin: 'http://localhost:5173',
});
server.start();
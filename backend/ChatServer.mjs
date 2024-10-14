import WSServer from './WSServer.mjs';

const server = new WSServer({
  port: 8887,
  origins: 'http://localhost:5173',
});
server.start();
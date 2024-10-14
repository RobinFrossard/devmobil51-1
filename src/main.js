console.log('Hello, world 42!');

const wsClient = new WebSocket('ws://localhost:8887');

wsClient.onopen = () => {
  console.log('Connected to server');
  wsClient.send('Hello, server!');
}

wsClient.onmessage = (event) => {
  console.log('Received message:', event.data);
}
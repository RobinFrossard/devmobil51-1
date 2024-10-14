export default class WSClient {

  constructor(url = null) {
    if (url === null) {
      const hostname = window.location.hostname;
      const mustBeSecure = window.location.protocol == 'https:';
      const port = mustBeSecure ? 443 : 80;
      this.url = `${mustBeSecure ? 'wss' : 'ws'}://${hostname}:${port}`;
    } else {
      this.url = url
    }
    this.wsClient = null;
  }

  connect() {
    this.wsClient = new WebSocket(this.url);
    this.wsClient.onmessage = (event) => this.onMessage(event);

    return new Promise((resolve, reject) => {
      this.wsClient.onopen = () => resolve();
      this.wsClient.onerror = (event) => {
        console.error('WebSocket error :', event);
        reject(new Error('WebSocket connection error: ' + event.message));
      };
      this.wsClient.onclose = (event) => {
        this.close();
        reject(new Error('WebSocket connection closed.'));
      };
    });
  }

  close() {
    if (this.wsClient === null) return;
    this.wsClient.close();
    this.wsClient = null;
  }

  onMessage(event) {
    const data = event.data;
    console.log(data);
  }

  send(message) {
    this.wsClient.send(message);
  }
}
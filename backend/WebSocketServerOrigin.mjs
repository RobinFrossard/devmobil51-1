import { WebSocketServer } from 'ws';

export default class WebSocketServerOrigin extends WebSocketServer  {

  constructor(options, callback) {
    super(options, callback);

    if (!this.options?.origin) {
      throw new Error('WebSocketServerOrigin requires an origin option');
    }
    // origin muste be a string or an array of origins
    if (typeof this.options.origin === 'string') {
      this.options.origin = [this.options.origin];
    } else if (!Array.isArray(this.options.origin)) {
      throw new Error('WebSocketServerOrigin requires an origin option to be a string or an array of strings');
    }
  }

  handleUpgrade(request, socket, head, callback) {
    if (!this.checkOrigin(request.headers?.origin)) {
      socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
      socket.destroy();
      return;
    }
    // if (this.clients.size >= this.options.maxNbOfClients) {
    //   socket.write('HTTP/1.1 503 Service Unavailable\r\n\r\n');
    //   socket.destroy();
    //   return;
    // }

    return super.handleUpgrade(request, socket, head, callback);
  }

  checkOrigin(origin) {
    return this.options.origin.includes(origin);
  }

}
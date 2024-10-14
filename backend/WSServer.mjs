import WebSocketServerOrigin from "./WebSocketServerOrigin.mjs";
import crypto from "crypto";

export default class WSServer  {

  constructor({
    port,
    origin,
  }) {
    this.port = port;
    this.origin = origin;
    this.server = null;
    this.clients = new Map();
  }

  start() {
    this.server = new WebSocketServerOrigin({
      port: this.port,
      origin: this.origin,
    });
    this.server.on('connection', (client) => this.onConnexion(client));
    console.log("Server started on port " + this.port);
  }

  createClientMetadata(client) {
    const id = crypto.randomUUID();
    this.clients.set(client, {
      id,
    });
  }

  onConnexion(client) {
    this.createClientMetadata(client);
    console.log(`Client ${this.clients.get(client).id} connected`);
    // client.on('error', console.error);
    client.on('message', (data) => this.onMessage(client, data));
    // client.on('close', () => this.onClose(client));
  }

  onMessage(client, data) {
    console.log('received: %s', data);
  }




}
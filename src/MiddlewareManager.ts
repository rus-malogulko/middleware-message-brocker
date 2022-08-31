export class MiddlewareManager {
  socket: any;
  outboundMiddleware: ((message: string) => string)[];
  inboundMiddleware: ((message: string) => string)[];

  constructor(socket: any, socket2Push?: any) {
    this.socket = socket;
    this.inboundMiddleware = [];
    this.outboundMiddleware = [];

    this.handleIncomingMessages().catch((error: Error) => console.error(error));
  }

  async handleIncomingMessages() {
    this.socket.on('message', (message: any) => {
      this
        .executeMiddleware(this.inboundMiddleware, message)
    });
  }

  async send(message: string) {
    const finalMessage = await this.executeMiddleware(this.outboundMiddleware, message);

    return this.socket.send(finalMessage);
  }

  use(middleware: any) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound);
    }

    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound);
    }
  }

  async executeMiddleware(middlewares: ((message: string) => string)[], initialMessage: string) {
    let transientMessage = initialMessage;

    for await (const func of middlewares) {
      transientMessage = await func.call(this, transientMessage);
    }

    return transientMessage;
  }
}

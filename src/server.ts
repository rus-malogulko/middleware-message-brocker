require('dotenv').config();

import * as zeromq from 'zeromq';
import { MiddlewareManager } from './MiddlewareManager';
import { bufferMiddleware } from '../middlewares/buffer.middleware';

async function initServer() {
  const socket = zeromq.socket('pair');

  await socket.bind(process.env.TCP_CONNECTION || '');
  const mm = new MiddlewareManager(socket);

  mm.use(bufferMiddleware());
  mm.use({
    async inbound(message: string) {
      console.log('Received message ', message);
      await this.send(message);

      return message;
    }
  });

  console.info('>>> Server started.');
}

initServer();

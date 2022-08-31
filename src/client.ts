require('dotenv').config();

import * as zeromq from 'zeromq';
import { v4 } from 'uuid';
import { MiddlewareManager } from './MiddlewareManager';
import { bufferMiddleware } from '../middlewares/buffer.middleware';
import { SEND_INTERVAL } from './const';

async function initClient() {
  const socket = zeromq.socket('pair');
  await socket.connect(process.env.TCP_CONNECTION || '')

  const mm = new MiddlewareManager(socket);

  mm.use(bufferMiddleware());
  mm.use({
    inbound(message: string) {
      console.log('[Message] returned from server: ', message);
      return message;
    }
  });

  setInterval(() => {
    mm
      .send(Date.now().toString())
      .catch(error => console.error(error));
  }, SEND_INTERVAL);

  console.info('>>> Client connected', v4());
};

initClient();

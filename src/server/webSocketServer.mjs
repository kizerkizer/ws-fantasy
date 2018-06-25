import uws from 'uws';

import { emit } from '../common/events.mjs';
import config from './config.json';

const server = new uws.Server(config.webSocketServerOptions),
  errorMessage = `Invalid input`;

const sendMessage = (socket, message) => {
  if (typeof socket !== `object` || typeof message !== `string`) { // TODO instanceof socket check
    throw new TypeError(errorMessage);
  }
  socket.send(message);
};

async function onWebSocketMessage (socket, message) {
  if (typeof message !== `string`) {
    emit(`ws/malformed`, socket);
    socket.close();
    return;
  }
  emit(`ws/message`, socket, message);
}

async function onWebSocketConnection (socket) {
  socket.on(`message`, async (message) => {
    onWebSocketMessage(socket, message);
  });
}

server.on(`connection`, onWebSocketConnection);

export {
  sendMessage
}

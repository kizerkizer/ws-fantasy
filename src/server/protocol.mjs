import { emit, on } from '../common/events.mjs';
import * as sjprotocol from '../common/sjprotocol.mjs';

import { sendMessage } from './webSocketServer.mjs';

on(`ws/message`, (socket, message) => {
  try {
    var sjmessage = sjprotocol.decode(message);
  } catch (e) {
    emit(`protocol/malformed`, socket);
    socket.close();
    return;
  }
  emit(`protocol/message`, socket, sjmessage.head, sjmessage.body);
});

const sendSjmessage = (socket, type, body) => {
  try {
    var message = sjprotocol.encode({
      head: type,
      body
    });
  } catch (e) {
    throw new Error(); // TODO
  }
  sendMessage(socket, message);
};

export {
  sendSjmessage
}

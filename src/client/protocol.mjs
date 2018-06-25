import { emit, on } from '../common/events.mjs';
import * as sjprotocol from '../common/sjprotocol.mjs';

import { sendMessage } from './ws.mjs';

on(`ws/message`, (message) => {
  try {
    var sjmessage = sjprotocol.decode(message);
  } catch (e) {
    console.log(`Invalid message`);
    return;
  }
  console.log(message);
  emit(`protocol/message`, sjmessage.head, sjmessage.body);
});

const sendSjmessage = (type, body) => {
  try {
    var message = sjprotocol.encode({
      head: type,
      body
    });
  } catch (e) {
    console.log(e);
    throw new Error(); // TODO
  }
  console.log(message);
  sendMessage(message);
};

export {
  sendSjmessage
}

import { emit, on } from '../common/events.mjs';
import * as protocol from './protocol.mjs';

import stringTypeToMessageType from '../common/stringTypeToMessageType.mjs';
import messageTypeToStringType from '../common/messageTypeToStringType.mjs';

on(`protocol/message`, (type, body) => {
  if (!stringTypeToMessageType[type]) {
    console.log(`Invalid type`);
    return;
  }
  let symbolType = stringTypeToMessageType[type];
  console.log(type, body);
  emit(`mailbox/message`, symbolType, body);
  emit(symbolType, body);
});

const sendMessage = (symbolType, body) => {
  console.log(symbolType);
  if (!messageTypeToStringType[symbolType]) {
    throw new TypeError(`Invalid type`);
  }
  let stringType = messageTypeToStringType[symbolType];
  console.log(stringType);
  protocol.sendSjmessage(stringType, body);
}

export { sendMessage }

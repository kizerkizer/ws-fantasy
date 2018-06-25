import meta from 'metaproperties';

import { emit, on } from '../common/events.mjs';
import * as protocol from './protocol.mjs';
import { Player } from './Player.mjs';

import stringTypeToMessageType from '../common/stringTypeToMessageType.mjs';
import messageTypeToStringType from '../common/messageTypeToStringType.mjs';
import validators from '../common/messageTypes.mjs';

export const MalformedMessageEvent = Symbol('MalformedMessageEvent');

function malformedClose (socket) {
  emit(MalformedMessageEvent, meta(socket).player, socket);
  protocol.sendSjmessage(socket, `malformed`, {
    message: `Malformed message; connection closed`
  });
  socket.close();
}

on(`protocol/message`, (socket, type, body) => {
  if (!stringTypeToMessageType[type]) {
    malformedClose(socket);
    return;
  }
  if (!meta(socket).player) {
    meta(socket).player = new Player(12345, socket); // TODO
  }
  let symbolType = stringTypeToMessageType[type];
  if (!validators[type] || !validators[type].validate(body)) {
    malformedClose(socket);
    return;
  }
  emit(`mailbox/message`, meta(socket).player, body);
  emit(symbolType, meta(socket).player, body);
});

export const sendMessage = (player, symbolType, body) => {
  if (!messageTypeToStringType[symbolType]) {
    throw new TypeError(`Invalid type`);
  }
  if (!player._socket) {
    throw new Error(`Invalid player`);
  }
  let stringType = messageTypeToStringType[symbolType];
  protocol.sendSjmessage(player._socket, stringType, body);
}

function emitPlayerDisconnected (socket) {
  emit(`mailbox/playerDisconnected`, meta(socket).player);
}

on(`protocol/malformed`, emitPlayerDisconnected);
on(`ws/malformed`, emitPlayerDisconnected);

import { emit } from '../common/events.mjs';
import * as storage from './storage.mjs';
import { sendMessage } from './mailbox.mjs';

export class Player {
  constructor (id, socket) {
    this._id = id;
    this._socket = socket;
  }
  send (messageType, body) {
    sendMessage(this, messageType, body);
  }
  async getData () {
    let data;
    try {
      data = await storage.get(this._id);
    } catch (e) {
      return null;
    }
    return data;
  }
  async setData (value) {
    try {
      await storage.set(this._id, value);
      return true;
    } catch (e) {
      return false;
    }
  }
  kick () {
    console.log(`I, ${this._id}, am being kicked!`);
    emit(`player/kick`, this);
    this._socket.close();
  }
}

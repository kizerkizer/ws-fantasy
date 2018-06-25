import { emit, on } from '../common/events.mjs';

let ws,
  open = false;

ws = new WebSocket('ws://kizvm.net:4040'); // TODO

const isOpen = () => open;

ws.onopen = () => {
  open = true;
  emit(`ws/open`);
};

ws.onclose = (closeEvent) => {
  open = false;
  emit(`ws/close`);
};

const sendMessage = (message) => {
  console.log(open);
  if (!open) {
    return;
  }
  if (typeof message !== `string`) {
    throw new TypeError(); // TODO
  }
  console.log(message);
  ws.send(message);
};

ws.onmessage = (message) => {
  console.log(message);
  emit(`ws/message`, message.data);
};

export { isOpen, sendMessage };

import { sendMessage } from './mailbox.mjs';
import $ from './dom.mjs';
import { emit, on } from '../common/events.mjs';
import stringTypeToMessageType from '../common/stringTypeToMessageType.mjs';
import symbolTypeToStringType from '../common/messageTypeToStringType.mjs';

import './rateLimiter.mjs';
import './waitCursor.mjs';
import './mailbox.mjs';

if ($.select('#div-left')) {
  let editor = ace.edit('div-left');
  editor.session.setMode('ace/mode/json');
  on(`mailbox/message`, (type, body) => {
    $.select('#div-right').innerText = JSON.stringify({
      type: symbolTypeToStringType[type],
      body
    });
  });
  let $button = $.fromHtml(`<button id="send">Send</button>`);
  $button.style.position = `fixed`;
  $button.style.top = `0`;
  $button.style.right = `0`;
  $button.style.width = `128px`;
  $button.style.height = `64px`;
  $button.style.fontSize = `18px`;
  $button.style.zIndex = `999`;
  $button.onclick = () => {
    let object = JSON.parse(editor.getValue());
    sendMessage(stringTypeToMessageType[object.type], object.body);
  };
  document.body.appendChild($button);
}

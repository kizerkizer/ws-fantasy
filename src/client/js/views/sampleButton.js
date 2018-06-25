import { emit, on } from '../../../common/events.mjs';
import $ from '../dom.mjs';

let element = $.fromHtml(`<button class="sampleButton"></button>`);

element.onclick = () => {
  emit(`sampleButton:view/click`);
};

on(`init`, () => {
  document.body.appendChild(element);
  emit(`sampleButton:view/ready`);
});


on(`sampleButton:component/updateCount`, (count) => {
  console.log(count);
  element.innerText = `Count: ${count}!`;
});

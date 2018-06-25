import { emit, on } from '../../../common/events.mjs';

let count = 0;

on(`sampleButton:view/ready`, () => {
  emit(`sampleButton:component/updateCount`, count);
});

on(`sampleButton:view/click`, () => {
  count++;
  emit(`sampleButton:component/updateCount`, count);
});

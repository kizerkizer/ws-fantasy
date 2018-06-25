import { on } from '../common/events.mjs';

on(`rateLimiter/close`, () => {
  document.querySelector('button').style.cursor = 'progress';
  document.querySelector('button').setAttribute('disabled', true);
});

on(`rateLimiter/open`, () => {
  document.querySelector('button').style.cursor = 'default';
  document.querySelector('button').removeAttribute('disabled');
});

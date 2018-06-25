import { emit, on } from '../common/events.mjs';

on(`mailbox/sendMessage`, () => {
  console.log(`rateLimiter/close`);
  emit(`rateLimiter/close`);
  setTimeout(() => {
    console.log(`rateLimiter/open`);
    emit(`rateLimiter/open`);
  }, 270);
});

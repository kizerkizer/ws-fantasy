import { on } from '../common/events.mjs';
import meta from 'metaproperties';

on(`mailbox/message`, (player, body) => {
  if (!meta(player).lastReceivedDate) {
    meta(player).lastReceivedDate = Date.now();
    return;
  }
  if (Date.now() - meta(player).lastReceivedDate < 250) {
    console.log(`Rate limiting player. Kicking.`);
    player.kick();
  }
  meta(player).lastReceivedDate = Date.now();
});

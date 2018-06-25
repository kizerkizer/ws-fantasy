import * as Messages from '../common/MessageTypes.mjs'; //
import { emit, on } from '../common/events.mjs';
import './mailbox.mjs';
import './rateLimiter.mjs';

on(Messages.HeartbeatRequest, (player, body) => {
  player.count = player.count || 0;
  player.count++;
  player.send(Messages.HeartbeatResponse, {
    count: player.count
  });
});

on(Messages.PlantSeedRequest, (player, body) => {
  player.send(Messages.PlantSeedResponse, {
    valid: body.seed === `turnip`
  });
});

on(Messages.InquireStorageRequest, async (player, body) => {
  let data = await player.getData();
  player.send(Messages.InquireStorageResponse, {
    storage: data
  });
});

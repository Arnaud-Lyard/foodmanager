import { createNewPlayerOrUpdatePlayer } from '../player/service/player.service';
import axios from 'axios';
import cron from 'node-cron';
import { StormgateWorldInput } from '../api/stormgateworld.schema';
import { getAllUsersActive } from '../user/service/user.service';
import { logger } from '../app';
export default cron.schedule('1 0 * * *', async () => {
  logger.info('executing getStormgateWorldLeaderboard cron job');
  const users = await getAllUsersActive();
  if (!users) return;
  const url = process.env.STORMGATE_WORLD_API_ENDPOINT;

  const promises = [];
  for (const user of users) {
    const response = axios.get<StormgateWorldInput>(
      `${url}/v0/players/${user.stormgateWorldId}`
    );
    promises.push(response);
  }

  const responses = await Promise.allSettled(promises);

  const responsesFullfilled = responses.filter(
    (response) => response.status === 'fulfilled'
  );
  const responsesRejected = responses.filter(
    (response) => response.status === 'rejected'
  );

  const datas = responsesFullfilled.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value.data;
    }
  });
  const errors = responsesRejected.map((response) => {
    if (response.status === 'rejected') {
      return response.reason;
    }
  });
  for (const error of errors) {
    logger.error(
      `error during fetching player from Stormgateworld API for path: ${error.request.path}`
    );
  }
  await createNewPlayerOrUpdatePlayer(datas);
});

import { boolean, number, object, string, TypeOf, z } from 'zod';

export const leaderboardEntrySchema = z.object({
  leaderboard_entry_id: string({}),
  leaderboard: string({}),
  anonymous: boolean({}),
  rank: number({}),
  race: string({}),
  league: string({}),
  tier: number({}),
  mmr: number({}),
  points: number({}),
  wins: number({}),
  losses: number({}),
  ties: number({}),
  matches: number({}),
  win_rate: number({}),
});

export const stormgateWorldSchema = object({
  id: string({}),
  anonymous: boolean({}),
  nickname: string({}),
  nickname_discriminator: string({}),
  leaderboard_entries: z.array(leaderboardEntrySchema),
  last_match_ended_at: string({}),
  last_match_started_at: string({}),
});

export type StormgateWorldInput = TypeOf<typeof stormgateWorldSchema>;

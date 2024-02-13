export interface Player {
  id: string;
  nickname: string;
  rank: number;
  race: string;
  league: string;
  winrate: number;
  mmr: number;
  points: number;
  wins: number;
  losses: number;
  ties: number;
  matches: number;
  progress: Progress;
  userId: string;
}

type Progress = "up" | "equal" | "down";

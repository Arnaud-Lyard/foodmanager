import { Player } from "./player";
import { User } from "./user";

export type TeamUserResponse = {
  teamUsers: User[];
  status?: string;
};

export interface PlayerResponse {
  players: Player[];
  status?: string;
}

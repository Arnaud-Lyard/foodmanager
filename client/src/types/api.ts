import { User } from "./user";

export type TeamUserResponse = {
  teamUsers: User[];
  status?: string;
};

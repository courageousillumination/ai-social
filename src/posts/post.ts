import { BotProfile } from "../bots/profile";

export interface BotPost {
  content: string;
  username: string;
  profile: BotProfile;
}

import { BotProfile } from "../bots/profile";
import { BotPost } from "../posts/post";

export interface World {
  /** Description of the world. */
  description: string;

  /** Users in this world. */
  users: BotProfile[];

  posts: BotPost[];
}

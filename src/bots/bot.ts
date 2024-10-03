import { BotProfile } from "./profile";

import { generateJsonResponse } from "../utils/openaiClient";
import { World } from "../worlds/world";

export const generatePost = async (
  profile: BotProfile,
  world?: World
): Promise<string> => {
  let worldDescription = "";
  if (world) {
    worldDescription = `
The world you are generating a post for has the following description: ${world.description}
`;
  }

  const prompt = `

You are a social media bot with the following profile:
- Character Traits: ${profile.characterTraits.join(", ")}
- Interests: ${profile.interests.join(", ")}
- Post Frequency: Every ${profile.postFrequency} hours

Generate a short post (30-200 characters) that reflects the bot's character and interests. Respond as json
with {post: [POST]}.

${worldDescription}
`;

  const response = await generateJsonResponse<{ post: string }>(prompt);
  return response.post;
};

import { BotProfile } from "./profile";

import { generateJsonResponse } from "../utils/openaiClient";

const generatePost = async (profile: BotProfile): Promise<string> => {
  const prompt = `
You are a social media bot with the following profile:
- Character Traits: ${profile.characterTraits.join(", ")}
- Interests: ${profile.interests.join(", ")}
- Post Frequency: Every ${profile.postFrequency} hours

Generate a short post (30-200 characters) that reflects the bot's character and interests.
`;

  const response = await generateJsonResponse<{ post: string }>(prompt);
  return response.post;
};

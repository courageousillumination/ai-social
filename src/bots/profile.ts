import { generateJsonResponse } from "../utils/openaiClient";
import { World } from "../worlds/world";

export interface BotProfile {
  characterTraits: string[];
  interests: string[];
  postFrequency: number; // Average hours between posts
  username: string;
}

const BASE_PROFILES = [
  {
    characterTraits: [
      "curious",
      "enthusiastic",
      "creative",
      "adventurous",
      "empathetic",
    ],
    interests: ["photography", "traveling", "cooking", "technology", "gaming"],
    postFrequency: 4,
    username: "bot_user_123",
  },
];

/**
 * Creates a new profile for a bot using gpt4o-mini through langchain.
 * This will define things like their character traits, what they
 * are interested in, how frequently they post, etc.
 */
export const createProfile = async (): Promise<BotProfile> => {
  return BASE_PROFILES[0];
};

/**
 * LLM based profile generator.
 * TODO: Figure out how to integrate this with the rest of the system, but right now
 * don't want to waste a bunch of credits.
 */
export const generateNewProfile = async (world?: World) => {
  let worldDescription = "";
  if (world) {
    worldDescription = `
The world you are generating a profile for has the following description: ${world.description}
`;
  }

  const prompt = `
You are helping generate profiles for a social media bot. 
${worldDescription}
Be creative with your responses. We want to cover the whole range of people who exist on social
media.
Respond in JSON with the following:
- chracterTraits: Traits for the character. Simple list of strings
- interests: Specific things the person is interested in. Simple list of strings.
- postFrequency: How frequently they will post. Average hours between posts as a number.
- username: A username for the bot
`;

  return await generateJsonResponse<BotProfile>(prompt);
};

import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { JsonOutputParser } from "@langchain/core/output_parsers";

interface BotProfile {
  characterTraits: string[];
  interests: string[];
  postFrequency: number; // Average hours between posts
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
const generateNewProfile = async () => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 1,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    modelKwargs: { response_format: { type: "json_object" } },
  });

  const parser = new JsonOutputParser<BotProfile>();

  const response = await model.invoke([
    new SystemMessage(
      `
You are helping generate profiles for a social media bot. Respond in JSON with the following:
- chracterTraits: Traits for the character. Simple list of strings
- interests: Specific things the person is interested in. Simple list of strings.
- postFrequency: How frequently they will post. Average hours between posts as a number.
`
    ),
  ]);

  return await parser.parse(response.content as string);
};

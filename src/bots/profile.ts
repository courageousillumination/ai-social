import { OpenAI } from 'langchain/llms/openai';

interface BotProfile {
  characterTraits: string;
  interests: string[];
  postFrequency: string;
}

/**
 * Creates a new profile for a bot using gpt4o-mini through langchain.
 * This will define things like their character traits, what they
 * are interested in, how frequently they post, etc.
 */
const createProfile = async (): Promise<BotProfile> => {
  const model = new OpenAI({ modelName: 'gpt4o-mini' });

  const characterTraits = await model.generate('Generate character traits for a bot.');
  const interests = await model.generate('List some interests for a bot.');
  const postFrequency = await model.generate('How frequently should the bot post?');

  return {
    characterTraits: characterTraits.text,
    interests: interests.text.split(', '),
    postFrequency: postFrequency.text,
  };
};

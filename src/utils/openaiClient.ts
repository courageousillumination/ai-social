import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export const generateJsonResponse = async <T>(
  prompt: string,
  outputFormat: { type: string }
): Promise<T> => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 1,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    modelKwargs: { response_format: outputFormat },
  });

  const parser = new JsonOutputParser<T>();

  const response = await model.invoke([new SystemMessage(prompt)]);

  return await parser.parse(response.content as string);
};

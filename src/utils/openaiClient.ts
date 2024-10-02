import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { JsonOutputParser } from "@langchain/core/output_parsers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateJsonResponse = async <T extends Record<string, any>>(
  prompt: string
): Promise<T> => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 1,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    modelKwargs: { response_format: { type: "json_object" } },
  });

  const parser = new JsonOutputParser<T>();
  const response = await model.invoke([new SystemMessage(prompt)]);
  return await parser.parse(response.content as string);
};

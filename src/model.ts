import { FlagDetection } from "./flag-detection/schema";
import { flags } from "./flags";
import { gemini } from "./gemini";
import {
  classificationPrompt,
  customisedResponsePrompt,
  GetTemplateRewriteCompletion,
} from "./prompts";

export const getTemplateRewriteCompletion = async (
  props: GetTemplateRewriteCompletion
) => await gemini(customisedResponsePrompt(props));

export const getPostClassificationCompletion = async ({
  message,
}: {
  message: string;
}) => await gemini(classificationPrompt(message));

// Required due to unreliably typed response from LLM
export const extractFlagFromResponse = (
  response: string
): FlagDetection["flag"] | undefined =>
  flags.find((f: FlagDetection["flag"]) => response.includes(f));

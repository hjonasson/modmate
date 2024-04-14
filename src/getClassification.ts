import {
  extractFlagFromResponse,
  getPostClassificationCompletion,
  getTemplateRewriteCompletion,
} from "./model";
import { FlagDetection } from "./flag-detection/schema";

export async function getClassification(
  message: string
): Promise<FlagDetection["flag"]> {
  const shouldMockLLM = process.env.VITE_MOCK_LLM === "true";
  if (shouldMockLLM) {
    return "MeetupSuggestion";
  }
  let responseClassification: string = "";
  try {
    responseClassification =
      (await getPostClassificationCompletion({ message })) || "";
  } catch {
    responseClassification = "Error";
  }
  const flag = extractFlagFromResponse(responseClassification);
  if (
    responseClassification === "Error" ||
    responseClassification === "" ||
    !flag
  ) {
    throw new Error(
      "Could not classify the message. Please try again. response: " +
        responseClassification +
        " flag: " +
        flag
    );
  }
  return flag;
}

export async function getCustomizedTemplate({
  message,
  moderator,
  template,
}: {
  message: string;
  moderator: string;
  template: string;
}) {
  let responseTemplateRewrite: string = "";
  try {
    responseTemplateRewrite =
      (await getTemplateRewriteCompletion({ message, moderator, template })) ||
      "";
  } catch {
    responseTemplateRewrite = "An error occurred. Please try again.";
  }
  return responseTemplateRewrite;
}

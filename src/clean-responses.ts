import { FlagDetection, Flags } from "./flag-detection/schema";
import {
  extractFlagsFromResponse,
  getPostClassificationCompletion,
  getTemplateRewriteCompletion,
} from "./model";

export async function getClassifications(message: string): Promise<Flags[]> {
  let responseClassification: string = "";
  try {
    responseClassification =
      (await getPostClassificationCompletion({ message })) || "";
  } catch {
    responseClassification = "Error";
  }
  const flags = extractFlagsFromResponse(responseClassification);
  if (
    responseClassification === "Error" ||
    responseClassification === "" ||
    !flags ||
    flags.length === 0
  ) {
    throw new Error(
      "Could not classify the message. Please try again. response: " +
        responseClassification +
        " flag: " +
        flags
    );
  }
  return flags;
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

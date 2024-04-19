import { validator } from "./flag-detection";

export interface GetTemplateRewriteCompletion {
  template: string;
  message: string;
  moderator: string;
}

export function classificationPrompt(request: string) {
  return (
    `You are a service that translates user requests into JSON objects of type "${validator.getTypeName()}" according to the following TypeScript definitions:\n` +
    `\`\`\`\n${validator.getSchemaText()}\`\`\`\n` +
    `The following is a user request:\n` +
    `"""\n${request}\n"""\n` +
    `The following is the user request translated into a JSON object with 2 spaces of indentation and newlines and no properties with the value undefined:\n`
  );
}

export const customisedResponsePrompt = ({
  template,
  message,
  moderator,
}: GetTemplateRewriteCompletion) => `You are a forum moderator. Your name is ${moderator}. ${
  template ? "You use this template:" : ""
}
  
  "${template}"
  
  ${
    template
      ? "Where there are square brackets you remove them and pick the right word or words to replace it with"
      : ""
  }You respond to a user who sent this forum post to another user:
  
  "${message}"
  
  ${
    template
      ? "Customise the template to fit the forum message."
      : "Write a response to the user."
  }`;

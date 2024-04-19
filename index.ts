import express from "express";
import bodyParser from "body-parser";
import {
  getClassifications,
  getCustomizedTemplate,
} from "./src/clean-responses";
import { htmlContent, htmlResponse } from "./src/htmlContent";
import { flagTemplateMap } from "./src/flags";
export const app = express();

// This contrals whether the API response is an HTML file or a JSON object
const appIsBackend = import.meta.env.VITE_API === "true";

// Serve the static HTML content
!appIsBackend &&
  app.get("/", (_, res) => {
    res.send(htmlContent());
  });

// Parse URL-encoded bodies for POST requests
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST requests to the root route
app.post("/", async (req, res) => {
  const { message, moderator } = req.body;
  // First call to the LLM to classify the message
  const flags = await getClassifications(message);

  const templates = flags.map((flag) => flagTemplateMap.get(flag));

  // Second call(s) to the LLM to get the template rewrite(s)
  const templateRewrites = await Promise.all(
    templates.map(async (template = "") =>
      getCustomizedTemplate({
        message,
        moderator,
        template,
      })
    )
  );

  res.send(
    appIsBackend
      ? { templates: templateRewrites.join("\n\n---\n\n"), flags }
      : htmlResponse({
          flag: flags,
          message,
          moderator,
          templateRewrite: templateRewrites.join("\n\n---\n\n"),
        })
  );
});

import express from "express";
import { flagTemplateMap } from "./src/flags";
import "./src/gemini";
import { htmlContent, htmlResponse } from "./src/htmlContent";
import {
  getClassification,
  getCustomizedTemplate,
} from "./src/getClassification";
import { FlagDetection } from "./src/flag-detection/schema";

export const app = express();

// Serve the static HTML content
app.get("/", (_, res) => {
  res.send(htmlContent());
});

// Parse URL-encoded bodies for POST requests
app.use(express.urlencoded({ extended: true }));

// Handle POST requests to the root route
app.post("/", async (req, res) => {
  const { message, moderator } = req.body;
  const flag = (await getClassification(message)) as FlagDetection["flag"];
  const templateRewrite = await getCustomizedTemplate({
    message,
    moderator,
    template: flagTemplateMap.get(flag) || "",
  });

  res.send(
    htmlResponse({
      flag,
      templateRewrite,
      message,
      moderator,
    })
  );
});

import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createTypeScriptJsonValidator } from "../TypeChat/ts";
import { FlagDetection } from "./schema";
export const schema = fs.readFileSync(
  path.join(__dirname, "schema.ts"),
  "utf8"
);
export const validator = createTypeScriptJsonValidator<FlagDetection>(
  schema,
  "FlagDetection"
);

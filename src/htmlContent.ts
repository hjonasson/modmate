import { FlagDetection } from "./flag-detection/schema";

// Define the HTML content to be rendered
export const htmlContent = (
  output: string = "",
  name: string = "",
  message: string = ""
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>modemate</title>
</head>
<body onunload="">
    <div id="header-container">
      <h1>Modmate</h1>
    </div>
    <h2>Flagged message response template</h2>
    <p>Please give the message being flagged, a response template and your name.</p>
    <form method="post">
      <label for="moderator">Moderator:</label>    
      <textarea type="text" name="moderator" rows="1" cols="50" placeholder="Enter your name">${name}</textarea>
        <label for="message">Post:</label>    
        <textarea type="text" name="message" rows="4" cols="100" placeholder="Enter your message">${message}</textarea>
        <button type="submit">Submit</button>
    </form>
    ${output}
</body>
<style>
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Tahoma, Arial, sans-serif;
  }

  textarea{
    resize: none;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
</html>
`;

export const htmlResponse = ({
  flag,
  templateRewrite,
  moderator,
  message,
}: {
  flag: FlagDetection["flag"];
  templateRewrite: string;
  moderator: string;
  message: string;
}) =>
  htmlContent(
    `<label for="flag">Flag:</label>    
   <p name="flag" id="content">${flag}</p>` +
      `<label for="rewrite">Template rewrite:</label>
    <textarea name="rewrite" rows="8" cols="200">${templateRewrite}</textarea>`,
    moderator,
    message
  );

# 🕵️ ModMate. An assistant for forum moderation.

## What is it?

ModMate is a tool designed to assist forum moderators in flagging comments and responding to their authors. It leverages Google's Gemini to both flag comments and customise the moderator's responses. It is built with TypeScript, ExpressJS, TypeChat, and Vite.

## Setup and usage

To install ModMate:

1. Clone the repository.
2. Create [`.env`](.env) and add you Gemini API key there as `VITE_API_KEY=yourkey` (generate it [here](https://makersuite.google.com/app/apikey))
3. Run `npm install` to install all necessary dependencies.
4. Run `npm run start`
5. Open up [http://localhost:5173/](http://localhost:5173/)

To start using ModMate, run `npm run start` in the project directory. This will start the server and you can begin flagging and responding to comments.

## Contributing

Please do not use the code without permission.

## License

All rights reserved. Unauthorized use or distribution of the code is prohibited.

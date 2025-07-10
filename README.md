# XDAbot
<img src="https://i.imgur.com/sNO7aOS.png" width="300" />

***
<img src="https://i.imgur.com/tsEMTW2.png" width="450" />

***
<img src="https://i.imgur.com/UT4gpKU.png" width="600" />

## Features
- **Image Classification:**\
On image upload, bot analyzes if it’s anime-style. If flagged, it can notify or handle accordingly (for example, by removing or logging it).
Uses a simple classification approach (or a specialized library) to detect anime images.

- **Markov Chain Chatbot:**\
Fetches a certain number of recent messages from a channel.
Builds a Markov chain from these messages.
Generates replies that imitate the style of users’ past messages.

- **Qwen3-based Chatbot:**\
A chatbot that responds with an AI-generated message once pinged at the beginning of a post.

- **Birthday wish generator :**\
On a member's birthday, the bot generates with the assistance of AI a creative birthday wish and posts it in the main channel.

- **/dice Command:**\
A basic dice roll slash command if you ever need a quick dice roll.\
Example usage: /dice → Bot returns something like Rolled a 5.

- **/tldr Command:**\
A command that summarizes text, based on text summarization model facebook/bart-large-cnn.

- **/summarize Command:**\
A command that summarizes a discord conversation for those who do not have the time to read through the chat.

## Requirements
- Node.js 22.12.0 or newer.
- A [Discord Developer Portal](https://discord.com/developers/applications) application with a bot token.
- npm to install dependencies.

## Run
To install the application, you need to clone the repository to your local machine. 
1. Open a terminal on your device. (preferably git bash or an IDE terminal)
2. Clone the repository:\
``git clone https://github.com/sdimi98/XDAbot.git``
3. Install dependencies:\
``npm install``
4. Enter TOKEN in the .env file. It can be acquired [here](https://discord.com/developers/applications) by creating a 'New Application', then going to 'Bot'.
5. Run the bot:\
``node src/index.js``
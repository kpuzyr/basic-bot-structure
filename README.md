
# Onix Sales Chat Bot

Onix-sales-chat-bot is used to obtain information about [Onix-systems](https://onix-systems.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
## Project structure

* db/ - connection to data base and mongo models 
* libs/ - includes librares, which are used to log user requests to db and debugging code
* nlp/ - includes connection to DialogFlow API and methods to interact with this API
* routes/ - management of users requests
* ```main.js``` - entry point to run bot
* ```package.json``` - project dependencies
* ```.env``` - includes project global variables

## Middleware

To make the bot work, [Bot Framework](https://dev.botframework.com/), [DialogFlow](https://console.dialogflow.com) and [Facebook developer](https://developers.facebook.com/) accounts are required.

[Bot Framework](https://dev.botframework.com/) is a connection link between server and Facebook messanger. [Create a bot](https://docs.microsoft.com/en-us/bot-framework/overview-introduction-bot-framework)

[DialogFlow](https://console.dialogflow.com) is a natural language processing which allows bot to understand the intentions of the user [Create agent](https://console.dialogflow.com/api-client/#/newAgent)

[Facebook developer](https://developers.facebook.com/) account is required to create a messenger service to interact with [Microsoft Bot Framework](https://dev.botframework.com/). 
* [Manage facebook messenger](https://docs.microsoft.com/en-us/bot-framework/channel-connect-facebook)
* [Add Facebook messenger credentials to Bot Framework](https://dev.botframework.com/bots)


## External links
* [Bot builder docs](https://docs.botframework.com/en-us/node/builder/chat-reference/modules/_botbuilder_d_.html)
* [DialogFlow docs](https://dialogflow.com/docs/getting-started/basics)
* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Nginx](https://nginx.org/en/)

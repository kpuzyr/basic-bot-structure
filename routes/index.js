const { dbLog, prepareLog } = require('../libs/logs');
const log = require('../libs/logs').log(module);

module.exports = {
  init: (bot, builder, dialogFlow, uniqid) => {
    bot.dialog('/', [
      (session, args, next) => {
        session.sendTyping();
        const contexts = session.userData.contexts || [];
        dialogFlow.getIntent(session.message.text, uniqid(), contexts)
          .then(intentData => {
            session.userData.contexts = intentData.result.contexts;
            let answer = '';
            if (intentData.result.fulfillment.speech) {
              answer = intentData.result.fulfillment.messages[0].speech
                || intentData.result.fulfillment.speech;
            }
            if (!answer && intentData.result.metadata.intentName) {
              answer = 'Sorry, but question you\'ve asked doesn\'t have the answer. Please ask it again later.'
            }
            const log = prepareLog(session.message, intentData, answer);
            dbLog(log);
            session.send(answer);
            session.endConversation();
          })
          .catch(err => {
            session.endDialog();
          });
      }
    ])
  }
};

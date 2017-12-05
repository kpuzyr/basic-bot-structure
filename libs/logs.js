const winston = require('winston');

function getLogger(module) {
  const path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path
      })
    ]
  });
}

/**
 * Save log to db
 * @param {Object} log - prepared for saving log
 * @return {Promise.<T>|Promise}
 */
function dbLog(log) {
  const data = new Logs({
    question: log.question,
    userName: log.userName,
    messenger: log.messenger,
    nlpAnswer: log.nlpAnswer,
    answer: log.answer
  });

  return data
    .save()
    .catch(console.error);
}

/**
 * Parse and prepare data to save in db
 * @param message {Object} - session.message
 * @param nlp {Object} - response from NLP
 * @param answer {String} - response to client
 */
function prepareLog(message, nlp, answer) {
    return {
        question: message.text,
        userName: message.user.name,
        messenger: message.source,
        nlpAnswer: nlp.result.metadata.intentName,
        answer
    }
}

module.exports = {
  log: getLogger,
  dbLog,
  prepareLog
};

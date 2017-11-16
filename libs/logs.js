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
 * @param {Object} request - request object
 * @param {Object} nlpAnswer - response from nlp
 * @param {String} answer - response to user
 * @return {Promise.<T>|Promise}
 */
function dbLog(request, nlpAnswer, answer) {
  const log = new Logs({
    request,
    nlpAnswer,
    answer
  });
  return log
    .save()
    .then()
    .catch(console.error);
}

module.exports = {
  log: getLogger,
  dbLog
};

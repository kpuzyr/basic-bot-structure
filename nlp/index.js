const apiai = require('apiai');

class DialogFlow {
  constructor(token) {
    this.app = apiai(token);
  }
  
  getIntent(text, sessionId, contexts = []) {
    return new Promise((resolve, reject) => {
      this.app.textRequest(text, {
        sessionId,
        contexts
      })
        .on('response', response => {
          resolve(response);
        })
        .on('error', error => {
          reject(error);
        })
        .end();
    });
  }
}

module.exports = {
  DialogFlow: DialogFlow
};

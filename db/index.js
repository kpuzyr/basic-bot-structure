/**
 * DB functionality
 */
const mongoose = require('mongoose');
const Promise = require('bluebird');
require('./models');

/**
 * Configure Mongoose and expose models to global
 */
function init(url) {
  mongoose.Promise = global.Promise;
  return new Promise((resolve, reject) => {
    mongoose.connect(url);
    const db = mongoose.connection;
    db
      .on('error', reject)
      .once('open', () => {
        Object.keys(mongoose.models).forEach(model => {
          global[model] = mongoose.models[model];
        });
        resolve(db);
      });
  });
}

function disconnect() {
  mongoose.disconnect();
}

module.exports = {
  init,
  disconnect
};

/**
 * Logs model
 */
const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema(
  {
    request: {
      type: Object
    },
    nlpAnswer: {
      type: Object
    },
    answer: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('Logs', logsSchema);

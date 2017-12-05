/**
 * Logs model
 */
const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema(
  {
    question: {
      type: String
    },
    userName: {
        type: String
    },
    messenger: {
        type: String
    },
    nlpAnswer: {
      type: String
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

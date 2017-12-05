const config = require('../libs/config');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const log = require('./libs/logs')(module);
const LogsModel = require('../db/models').logs;
const app = express();

app.listen(config.get('WEB_PORT'), () => {
  log.info('Express server listening on port ' + config.get('WEB_PORT'));
});

module.exports = {
  init(db) {
    app.use(morgan('dev')); // выводим все запросы со статусами в консоль
    app.use(bodyParser.json()); // стандартный модуль, для парсинга JSON в запросах
    app.use(bodyParser.urlencoded({extended: false})); // стандартный модуль, для парсинга JSON в запросах
    app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      log.error('Internal error(%d): %s',res.statusCode,err.message);
      res.send({ error: err.message });
      next();
    });
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", config.get('ALLOWED_URL'));
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    
    app.get('/userLogs', (req, res) => {
      let options;
      try {
        options = req.getQuery().split('&').reduce((accum, currentVal) => {
          const element = currentVal.split('=');
          return {...accum, ...{[element[0]]: decodeURIComponent(element[1])}};
        }, {});
      } catch (err) {
        res.status(400).send({error: err})
      }
      LogsModel
        .find(options, (err, data) => {
          if (err) return res.status(404).send({error: err});
          return res.status(200).send(data);
        })
    });
    
    app.get('/groupedLogs', (req, res) => {
      return new Promise((resolve, reject) => {
        db.collection('logs')
          .aggregate([{
            "$group":
              {
                _id: {
                  userName: "$userName", messenger: "$messenger"
                },
                createdAt: {
                  $max: "$$CURRENT.createdAt"
                },
                logs: {
                  $push: "$$CURRENT"
                },
                count: {
                  "$sum": 1
                }
              }
          }])
          .toArray()
          .then(resolve)
          .catch(reject);
      })
        .then(logs => {
          return res.status(200).send(logs);
        })
        .catch(err => {
          return res.status(400).send({error: err})
        });
    });

    app.get('/', (req, res) => {
      res.send('Api is running');
    });
  }
};

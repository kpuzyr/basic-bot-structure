const log = require('./libs/logs').log(module);
const config = require('./libs/config');
const morgan = require('morgan');
const builder = require('botbuilder');
const router = require('./routes');
const restify = require('restify');
const uniqid = require('uniqid');
const db = require('./db');
const { DialogFlow } = require('./nlp');
const api = require('./api/server');
const dialogFlow = new DialogFlow(config.get('DIALOGFLOW_ACCESS_TOKEN'));

/**
 * Setup Restify server
 */
const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(morgan('dev')); // log all requests with statuses to console
server.listen(config.get('PORT'), () => {
    log.info('%s listening to %s', server.name, server.url);
});
server.get('/',(req, res, next) => {
    res.send('Server is working');
    return next();
});

/**
 * Create chat connector for communicating with the Bot Framework Service
 * @type {ChatConnector}
 */
const connector = new builder.ChatConnector({
    appId: config.get('MICROSOFT_APP_ID'),
    appPassword: config.get('MICROSOFT_APP_PASSWORD')
});

/**
 * Receive messages from the user
 * @type {UniversalBot}
 */
const bot = new builder.UniversalBot(connector);

/**
 * Listen for messages from users
 */
server.post('/api/messages', connector.listen());

/**
 * Create connection to db. Initialize router.
 */
db
    .init(config.get('MONGO_URL'))
    .then(db => {
        return api.init(db);
    })
    .then(() => {
        return router.init(bot, builder, dialogFlow, uniqid);
    })
    .catch(error => {
        log.error(error);
    });

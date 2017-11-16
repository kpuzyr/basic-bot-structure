const PORT = 8990;
module.exports = {
    /**
     * Application configuration section
     */
    apps: [
        {
            name: 'ACORNS-BOT',
            script: 'bot.js',
            env: {
                NODE_ENV: 'development',
                MICROSOFT_APP_ID: '',
                MICROSOFT_APP_PASSWORD: '',
                PORT,
                MONGO_URL: 'mongodb://localhost/test',
                DIALOGFLOW_ACCESS_TOKEN: '',
                SENTRY_URL: ''
            },
            env_production: {
                NODE_ENV: 'production',
                MICROSOFT_APP_ID: '',
                MICROSOFT_APP_PASSWORD: '',
                PORT,
                MONGO_URL: 'mongodb://localhost/test-prod',
                DIALOGFLOW_ACCESS_TOKEN: '',
                SENTRY_URL: ''
            }
        }
    ]
};

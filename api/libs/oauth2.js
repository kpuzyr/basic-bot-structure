const oauth2orize = require('oauth2orize');
const crypto = require('crypto');
const config = require('../../libs/config');
const passport = require('passport');
const UserModel = require('../../db/models').users;
const AccessTokenModel = require('../../db/models').accessToken;
const RefreshTokenModel = require('../../db/models').refreshToken;

// create OAuth 2.0 server
const server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
  console.log(1);
  UserModel.findOne({username: username}, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!user.checkPassword(password)) {
      return done(null, false);
    }
    
    RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
      if (err) return done(err);
    });
    AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
      if (err) return done(err);
    });
    
    const tokenValue = crypto.randomBytes(32).toString('base64');
    const refreshTokenValue = crypto.randomBytes(32).toString('base64');
    const token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
    const refreshToken = new RefreshTokenModel({
      token: refreshTokenValue,
      clientId: client.clientId,
      userId: user.userId
    });
    refreshToken.save(function (err) {
      if (err) {
        return done(err);
      }
    });
    const info = {scope: '*'};
    token.save(function (err, token) {
      if (err) {
        return done(err);
      }
      done(null, tokenValue, refreshTokenValue, {'expires_in': config.get('TOKEN_LIFE')});
    });
  });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
  console.log(2);
  RefreshTokenModel.findOne({token: refreshToken}, function (err, token) {
    if (err) {
      return done(err);
    }
    if (!token) {
      return done(null, false);
    }
    if (!token) {
      return done(null, false);
    }
    
    UserModel.findById(token.userId, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      
      RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
        if (err) return done(err);
      });
      AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
        if (err) return done(err);
      });
      
      const tokenValue = crypto.randomBytes(32).toString('base64');
      const refreshTokenValue = crypto.randomBytes(32).toString('base64');
      const token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
      const refreshToken = new RefreshTokenModel({
        token: refreshTokenValue,
        clientId: client.clientId,
        userId: user.userId
      });
      refreshToken.save(function (err) {
        if (err) {
          return done(err);
        }
      });
      const info = {scope: '*'};
      token.save(function (err, token) {
        if (err) {
          return done(err);
        }
        done(null, tokenValue, refreshTokenValue, {'expires_in': config.get('TOKEN_LIFE')});
      });
    });
  });
}));


// token endpoint
exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
  server.token(),
  server.errorHandler()
];

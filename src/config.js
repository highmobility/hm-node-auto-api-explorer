/*
 * General cofiguration with fallbacks.
 * These have to be overriden in .env file
 */

require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    url: process.env.APP_URL || 'http://localhost'
  },
  hm: {
    appId: process.env.HM_APP_ID,
    clientCertificate: process.env.HM_CLIENT_CERTIFICATE,
    clientPrivateKey: process.env.HM_CLIENT_PRIVATE_KEY
  },
  oauth: {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    authUrl: process.env.OAUTH_AUTH_URL,
    tokenUrl: process.env.OAUTH_TOKEN_URL
  },
  session: {
    secret: process.env.SESSION_SECRET || 'supersecrets',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }
};
/*
 * General cofiguration with fallbacks.
 * These have to be overriden in .env file
 */

require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    url: process.env.APP_URL || 'http://localhost',
    redirectUri:
      process.env.REDIRECT_URI ||
      `${process.env.APP_URL || 'http://localhost'}:${process.env.PORT || 3000}`
  },
  hm: {
    appId: process.env.HM_APP_ID,
    clientCertificate: process.env.HM_CLIENT_CERTIFICATE,
    clientPrivateKey: process.env.HM_CLIENT_PRIVATE_KEY
  },
  oauth: {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    authUri: process.env.OAUTH_AUTH_URI,
    tokenUri: process.env.OAUTH_TOKEN_URI
  },
  session: {
    secret: 'supersecrets',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000, httpOnly: false }
  }
};

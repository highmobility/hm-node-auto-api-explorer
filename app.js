// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const session = require('express-session');
const aa = require('express-async-await');
const mustacheExpress = require('mustache-express');
const router = require('./src/router');
const config = require('./src/config');

const visitorCounterMiddleware = require('./src/middleware/visitorCounter');

const app = aa(express());

/*
 * Middleware
 * 
 * We use public folder to serve static files - styles.css in this case.
 * express-session to handle sessions.
 */
app.use(express.static('public'));
app.use(session(config.session));

// TESTING
app.use(visitorCounterMiddleware);

/*
 * Mustache templating engine
 * 
 * We register templates path and the main layout.
 */
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', `${__dirname}/src/templates`);
app.set('layout', 'layout');

// Routes
app.use('', router);

app.listen(config.app.port, () => {
  console.log(`App listening on ${config.app.url}:${config.app.port}`);
});

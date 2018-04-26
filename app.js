const express = require('express');
const session = require('express-session');
const aa = require('express-async-await');
const router = require('./src/router');
const config = require('./src/config');

const app = aa(express());

/*
 * EJS templating engine
 * 
 * We register templating engine and templates path.
 */
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/src/templates`);

/*
 * Middleware
 * 
 * We use public folder to serve static files - styles.css in this case.
 * express-session to handle sessions.
 */
app.use(express.static('public'));
app.use(session(config.session));

app.use('', router);

app.listen(config.app.port, () => {
  console.log(`App listening on ${config.app.url}:${config.app.port}`);
});

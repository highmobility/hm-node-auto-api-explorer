module.exports = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.session.loggedIn = true;
    req.session.accessToken =
      '_xH-XGQkITaN8TQHc5SEpptgAr82VZUhI1flDEsWd4bXPZUrwd3iYpF8HW8YfMtVaBzUfaw-YZC6N5xGsO2dzUYVwHPv0bAU5ziVjJ_ie8AiJcHHlIDuJHutaQv0eYzEjQ';
  }

  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  console.log('Visitor views:', req.session.views, 'accessToken:', req.session.accessToken);
  next();
};

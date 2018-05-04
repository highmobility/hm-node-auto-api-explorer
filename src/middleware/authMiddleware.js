module.exports = (req, res, next) => {
  (req.session.loggedIn) ? next() : res.redirect('/login');
};

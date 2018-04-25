const AuthServices = require('../services/AuthServices');

class AuthController {

  /*
   * renderLoginView()
   * 
   * Renders login view. If user is already authenticated then we will just redirect to the main view.
   * If you have more views that are for unauthorized people only, then this redirect logic should be moved to middleware.
   */
  renderLoginView(req, res) {
    if (req.session.loggedIn) return res.redirect('/');

    res.render('views/login', { loginUrl: AuthServices.getOauthUrl() });
  }

  /*
   * logOut()
   * 
   * After logging out, we will clear session data and redirect user back to login view.
   */
  logOut(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }

  /*
   * oauthCallback()
   * 
   * This function handles oauth callback. 
   * We will try to log in with the code received from oauth.
   */
  async oauthCallback(req, res) {
    const { code, error } = req.query;

    if (!!error || !code) res.redirect('/login');

    const loggedIn = await AuthServices.login(req.session, code);
   
    res.redirect(loggedIn ? '/' : '/login');
  }
}

module.exports = new AuthController();

const AuthServices = require('../services/AuthServices');

class AuthController {
  
  /*
   * renderLoginView()
   * 
   * Renders login view. If user is already authenticated then we will just redirect to the main view.
   * If you have more views that are meant for unauthorized people only, then this redirect logic should be moved to middleware.
   */
  renderLoginView(req, res) {
    if (req.session.loggedIn) return res.redirect('/');
    res.render('pages/login.ejs', { loginUrl: AuthServices.getOauthUrl() });
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
   * After oauth steps, user will be redirected to this url. We will check if the user got permissions needed or not.
   * If the authentication was successful then we can use 'code' to fetch access token and log in with the user.
   * 
   * This callback can contain following query params:
   * code - If requested access was successfully granted to your app, this value is set. You can use this code for getting access token.
   * error - If requested access was not successful, this value is set.
   * state - If you passed state in the beginning of process, you'll receive it back here.
   */
  async oauthCallback(req, res) {
    const { code, error } = req.query;

    if (!!error || !code) return res.redirect('/login');

    const loggedIn = await AuthServices.logIn(req.session, code);
   
    res.redirect(loggedIn ? '/' : '/login');
  }
}

module.exports = new AuthController();

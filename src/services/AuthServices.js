const config = require('../config');
const axios = require('axios');

// We are requesting full control of the car in this example. Other options can be found in Developer Center
const FULL_PERMISSIONS_TOKEN = 'car.full_control';

class AuthServices {

  /*
   * logIn()
   * 
   * session - we use session to save access token somewhere, so we don't have to fetch it again with each request.
   * code - code received from oauth callback query params. Used to fetch access token.
   * 
   * We try to fetch access token from high-mobility's oauth server.
   * Later we can use this token to send commands to the car.
   */
  async logIn(session, code) {
    const accessToken = await AuthServices.fetchAccessToken(code);
    
    if (!!accessToken) {
      session.accessToken = accessToken;
      session.loggedIn = true;
    }

    return (!!accessToken);
  }

  /*
  * fetchAccessToken()
  * 
  * code - received from oauth callback. Needed to fetch access token.
  * 
  * Simple http post message to high-mobility's backend to fetch access token.
  */
  fetchAccessToken(code) {
    const { oauth: { clientId, clientSecret, tokenUrl } } = config;

    return axios
      .post(`${tokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`)
      .then(response => response.data.access_token)
      .catch(err => null);
  }

  /*
   * getOauthUrl()
   *
   * Function for building oauth url. All but permissions comes from .env file.
   */
  getOauthUrl() {
    const { hm: { appId }, oauth: { authUrl, clientId } } = config;
    return `${authUrl}?app_id=${appId}&client_id=${clientId}&redirect_uri=${this.getOauthRedirectUrl()}&scope=${FULL_PERMISSIONS_TOKEN}`;
  }

  /*
   * getOauthRedirectUrl()
   * 
   * Builds oauth callback url.
   * After oauth steps, user will be redirected back to this url.
   */
  getOauthRedirectUrl() {
    const { url, port } = config.app;
    return `${url}:${port}/auth/oauth-callback`;
  }
}

module.exports = new AuthServices();

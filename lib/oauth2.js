var oauth = require('oauth')
  , qs = require('querystring')
  , baseUrl = process.env.ELANCEAPI || 'https://www.linkedin.com/uas/oauth2/';


exports.OAuth2 = function(key, secret) {
  // this.requestUrl = baseUrl + '/api/auth/v1/oauth/token/request';
  this.accessUrl = baseUrl + 'accessToken';
  this.key = key;
  this.secret = secret;
  this.version = '2.0';
  this.callback = null;
  this.customHeaders = {
    'Accept' : 'application/json',
    'Connection' : 'close',
    'User-Agent': 'Node-LinkedIn'
  }    
  return new oauth.OAuth2(
    this.key, 
    this.secret, 
    baseUrl, 
    null, 
    'accessToken',        
    this.customHeaders)
}


oauth.OAuth2.prototype.getAccessToken = function(code, redirect_uri, callback) {
  var params = {}
    , self = this;

  params.client_id = this._clientId;
  params.client_secret = this._clientSecret;
  params.grant_type = 'authorization_code';
  params.redirect_uri = redirect_uri;

  this.getOAuthAccessToken(code, params, function (error, access_token, refresh_token, res) {    
    if(error) callback(error)
    else {
      self.accessToken = res.data.access_token;
      self.refreshToken = res.data.refresh_token;
      return callback(error, self.accessToken, self.refreshToken);
    }
  });
}

oauth.OAuth2.prototype.getAuthorizeUrl = function(callbackUrl, callback) {
  var authorizeUrl = baseUrl + 'authorization'
    , params = {};

  params.redirect_uri = callbackUrl;    
  params.client_id = this._clientId;    
  params.response_type = 'code';
  params.state = 'superCSRFToken';

  return callback(null, authorizeUrl + '?' + qs.stringify(params));
}

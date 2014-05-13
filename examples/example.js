var key = ''
  , secret = ''
  , callbackUrl = ''
  , LinkedIn = require('../')
  , rl = require('readline')
  , linkedIn = new LinkedIn(key, secret)
  , qs = require('querystring')
  , util = require('util');

linkedIn.OAuth2.getAuthorizeUrl(callbackUrl, function(err, url) {
  console.log('Follow the url to get code: \n' + url)
});
var i = rl.createInterface(process.stdin, process.stdout);

i.question("Enter oauth_verifier: ", function(code) {
  i.close();
  process.stdin.destroy();
  console.log(callbackUrl);
  linkedIn.OAuth2.getAccessToken(code, callbackUrl, function(error, accessToken, accessTokenSecret) {
    if(error) console.log(error);
    console.log(arguments);
    var params = {};

    params.access_token = accessToken;

    linkedIn.OAuth2.accessToken = accessToken;
    linkedIn.OAuth2.accessTokenSecret = accessTokenSecret;
    // v1/people/~/connections
        
  })
});
module.exports = {

    'facebookAuth' : {
        'clientID'      : '448740468623491', // your App ID
        'clientSecret'  : 'ef1e63af069376280c70753b016611bc', // your App Secret
        'callbackURL'   : 'http://localhost:8081/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
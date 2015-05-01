

//configiration for google auth
module.exports = {



    'googleAuth' : {
        'clientID'      : '55632563835-mfbrs1giaiqpjobq6npg9askk94t4f75.apps.googleusercontent.com',
        'clientSecret'  : 'YnyPKnFpSdADIfodMmic3ZSL',
        'callbackURL'   : /*'http://localhost:8081/oauth2callback '*/'http://localhost:8081/auth/google/callback'
    },
//configiration for facebook auth

        'facebookAuth'  : {
        'clientID'      : '448740468623491', // App ID
        'clientSecret'  : 'ef1e63af069376280c70753b016611bc', //  App Secret
        'callbackURL'   : 'http://localhost:8081/auth/facebook/callback' //URL
    }
}
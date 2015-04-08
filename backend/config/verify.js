var nodemailer = require("nodemailer");
module.exports= function(){
	
nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: 'cromaapp@gmail.com',
        pass: 'arcodecroma'
    }
});
}
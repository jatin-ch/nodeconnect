var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

// generator.on('token', function(token){
//     console.log('New token for %s: %s', token.user, token.accessToken);
// });

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'moolchandjatjiit@gmail.com',
            clientId: '612168247270-k3ji58mrn4b6b1uqk52ilqm4nam29cq6.apps.googleusercontent.com',
            clientSecret: 'ESgnAvb6IDbqbZdhenvArfeM',
            refreshToken: '{refresh-token}',
            // accessToken: '{cached access token}'
        })
    }
});

var mailOptions = {
  from: 'moolchandjatjiit@gmail.com',
  to: 'atr.moolchand.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

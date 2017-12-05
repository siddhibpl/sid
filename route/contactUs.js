var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');


router.post('/contactUs', function(req, res, next) {
  console.log(req.body);

var mailOptions = {
    from: req.body["contactEmail"],
    to: 'group.itijobs@gmail.com',
    subject: req.body["contactSubject"],
    html: '<html><head><title>Contact Us</title></head><body><p><b>Hi Sir/Madam,</b></p><p>This is ' + req.body["contactName"] + ', requesting <b>'+  req.body['contactText'] + '<b></p><p>Thanks & Regards,<br />' + req.body["contactName"] +'<p>Mobile-' + req.body["contactMobile"] +'</p><p>' + req.body["contactEmail"] +'</p><p><a href="http://localhost:8000">Redirect To Login</a></p>'+'</p></body></html>',
    // text: 'Hi Sir/Madam<br>I am' + req.body['contactName'] +'requesting <b>'+ req.body['contactText'] +'</b><br>'
};
console.log("before");
transporter.sendMail(mailOptions, function (err, res) {
  if(error){
         res.emailSent = false;
  } else{
         res.emailSent = true;
  }
  res.send(res);
  // if (err) {
  // console.log("After--err");
  //   return next(err);
  // } else {
  // console.log("After--err");
  // console.log(res);
  //   return res.json({
  //     "resCode": "OK",
  //     "msg": "Mail Send Successfully!"
  //   });
  // }
});
});

module.exports = router;

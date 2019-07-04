const express = require('express');
const nodemailer = require('nodemailer');
const router  = express.Router();

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  transporter.sendMail({
    from: '"My Awesome Project 👻" <myawesome@project.com>',
    to: email, 
    subject: subject, 
    text: message,
    html: '<b>' + message + '</b>'
  })
  .then(info => {
    console.log("info", info)
    res.redirect("/")
    // res.render('message', { email, subject, message })
  })
  .catch(console.log)
});

module.exports = router;

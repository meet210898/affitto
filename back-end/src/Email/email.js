const nodemailer = require("nodemailer");
const emailsend = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meetpatel17501@gmail.com",
      pass: "ekfrugbrbtecxsej",
    },
  });

  var mailOptions = {
    from: "meetpatel17501@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `<h1>Your OTP is : ${otp}</h1>
      <h3>OTP is valid only 10 minute</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const VerifyUserWhen = (email, name) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meetpatel17501@gmail.com",
      pass: "ekfrugbrbtecxsej",
    },
  });

  var mailOptions = {
    from: "meetpatel17501@gmail.com",
    to: email,
    subject: "Verify the User",
    html: `<p>Dear ${name}</p>
    <h1>Now, You are  ready to use AFFITTO.</h1>
    <p>Thank you</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  emailsend,
  VerifyUserWhen,
};

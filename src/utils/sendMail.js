var nodemailer = require("nodemailer");

async function sendMail(to, body, subject, callback) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "@gmail.com",
      pass: "APP Spesific password",
    },
  });
  var mailOptions = {
    from: "@gmail.com",
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      //console.log(error);
      callback("oops " + error, undefined);
    } else {
      //console.log("Email sent: " + info.response);
      callback(undefined, "Sent " + info.response);
    }
  });
}

module.exports = { sendMail };
//authorize().then(sendmail).catch(console.error);

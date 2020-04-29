const nodemailer = require('nodemailer');

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass
  }
});

module.exports.sendEmail = ({ email, subject, message }) => {

  transporter.sendMail({
    from: email,
    to: 'raulrequec@gmail.com',
    subject: `Email from ${email}: ${subject}`,
    text: message
  })
  .then(info => console.log(info))
  .catch(error => console.log(error))
}
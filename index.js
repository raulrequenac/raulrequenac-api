const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const normalizePort = (val) => {
  let port = parseInt(val, 10);
    if (isNaN(port)) return val
    if (port >= 0) return port
    
    return false;
}

const port = normalizePort('3000')
app.listen(port, () => console.log(`Listening on port ${port}`))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raulrequec@gmail.com',
    pass: ''
  }
});

router.post('/', (req) => {
  const { email, subject, message } = req.body
  console.log(req.body)

  transporter.sendMail({
    from: email,
    to: 'raulrequec@gmail.com',
    subject: subject,
    html: message
  })
  .then(info => console.log(info))
  .catch(error => console.log(error))
})


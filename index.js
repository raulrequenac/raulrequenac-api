require('dotenv').config()

const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const cors = require('cors')

const app = express()
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

const normalizePort = (val) => {
  let port = parseInt(val, 10);
    if (isNaN(port)) return val
    if (port >= 0) return port
    
    return false;
}

const port = normalizePort('3000')
app.listen(port, () => console.log(`Listening on port ${port}`))

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
})

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass
  }
});

router.post('/', (req) => {
  const { email, subject, message } = req.body

  transporter.sendMail({
    from: email,
    to: 'raulrequec@gmail.com',
    subject: `Email from ${email}: ${subject}`,
    text: message
  })
  .then(info => console.log(info))
  .catch(error => console.log(error))
})


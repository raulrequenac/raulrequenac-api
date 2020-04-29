require('dotenv').config()

const express = require('express')
const router = express.Router()
const cors = require('./cors.config')
const mailer = require('./mailer.config')

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

const port = normalizePort(process.env.PORT || '5000')
app.listen(port, () => console.log(`Listening on port ${port}`))

router.post('/', (req) => mailer.sendEmail(req.body))
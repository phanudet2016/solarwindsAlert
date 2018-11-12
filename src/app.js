const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(cors())

const token = 'HZ0syk9QxC7qYtntCbB7QUvuTY5bBlodstlokQIbsPX'

app.post('/posts', (req, res) => {
  console.log('msg: ',req)
  var options = {
    url: 'https://notify-api.line.me/api/notify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    'auth': {
      'bearer': token
    },
    form: {
      message: `\n DateTime: ${req.body.date}\n Alert: ${req.body.alert}\n Node Detail Url: ${req.body.nodeDetailUrl}\n Acknowledge Link: ${req.body.acknowledgeLink}`
      // message: `\n Date: ${req.body.Date}\n ip: ${req.body.ipaddr}\n mac: ${req.body.mac}\n status: ${req.body.status}`
    }
  }
  
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
  request(options, callback)

  // if (req.method === 'POST') {
  // }
  res.end()
})

app.get('/get', (req, res) => {
  res.send('<h1><center>Solarwinds Line Notify</center></h1>')
})

app.listen(process.env.PORT || 8081)
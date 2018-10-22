const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

const token = 'OBIbwqr3oDM9IIsWI3Mo2kzBsyRVczua4Jhvft22dsM'

app.post('/posts', (req, res) => {
  console.log(req.body)
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
      message: `\n vendor: ${req.body.vendor}\n ip: ${req.body.ipaddr}\n mac: ${req.body.mac}\n status: ${req.body.status}`
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
  res.send('<h1><center>Solarwinds Notify</center></h1>')
})

app.listen(process.env.PORT || 8081)
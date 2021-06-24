require('dotenv').config()

const wsWoorton = require('./websocket/wsWoorton')
const clientWoorton = require('./rest/client')

// HOW TO USE THE CLIENT REST
clientWoorton.getInstrument(process.env.TOKEN, process.env.AUTHENTICATION_TYPE)
  .then(res => {
    console.log(res.data)
  })
  .catch(error => {
    console.log(error.response)
  })

function callback (message) {
  // You can use this function to process the message of the stream 
  // for example you grab the price for some quantity and send a FOK order
  console.log(message)
}

// HOW TO CALL WEBSOCKET
wsWoorton(process.env.TOKEN, process.env.AUTHENTICATION_TYPE, callback)

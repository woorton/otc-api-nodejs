require('dotenv').config()

const WebSocket = require('ws')

module.exports = function (token, type, callback) {

  console.log(process.env.WS_URL)
  const wsWoorton = new WebSocket(process.env.WS_URL)

  wsWoorton.onopen = () => {
    if (wsWoorton.readyState !== wsWoorton.OPEN) {
      wsWoorton.terminate()
    }
    var paramsReq = {
      event: 'auth',
      type: type === 'oidc' ? 'openid' : type,
      token: token,
    }
    console.log(paramsReq)
    wsWoorton.send(JSON.stringify(paramsReq))
  }

  wsWoorton.onmessage = (message) => {
    const stream = JSON.parse(message.data.toString())
    if (stream.succeed === true && stream.event === 'auth') {
      const subscribePriceReq = {
        event: 'subscribe',
        channels: 'price',
      }
      wsWoorton.send(JSON.stringify(subscribePriceReq))
    }
    else if (stream.success === true && stream.event !== 'auth') {
      // GET MESSAGE WITH PRICE
      if (stream.levels !== undefined && Array.from(stream.levels.buy).length > 0 && Array.from(stream.levels.sell).length > 0) {
        callback(stream)
        // use the callback functions to manipulate the prices
      }
    }
  }

  wsWoorton.onerror = (err) => {
    console.log(err)
  }

  wsWoorton.onclose = (closeData) => { console.log(closeData)}

  return wsWoorton
}

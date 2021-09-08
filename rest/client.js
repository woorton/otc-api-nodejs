const qs = require('qs')
const header = require('./header')

module.exports = {
  // CREATE GET AND DELETE TOKEN
  getTokens (token, type) {
    return header(token, type).get('token')
  },

  createToken (token, type, validUntil) {
    const params = {
      valid_until: validUntil,
    }
    const jsonToSend = JSON.stringify(params, null, 4)
    console.log(jsonToSend)
    return header(token, type).post('token', jsonToSend)
  },

  deleteToken (token, type, idToken) {
    return header(token, type).delete(`token/${idToken}`)
  },

  // ACCOUNT INFORMATIONS
  getAccountInformation (token, type) {
    return header(token, type).get('account')
  },
  // GET EXPOSURES & BALANCES
  getBalances (token, type) {
    return header(token, type).get('balance')
  },
  getExposures (token, type) {
    return header(token, type).get('exposure')
  },

  // INSTRUMENTS GET
  getInstrument (token, type) {
    return header(token, type).get('instrument')
  },

  // REQUEST FOR QUOTE & TRADE & ORDER
  requestForQuote (token, type, dataRfq) {
    const params = {
      quantity: parseFloat(dataRfq.quantity),
      side: dataRfq.side,
      instrument: dataRfq.instrument_id,
    }
    const jsonToSend = JSON.stringify(params)
    return header(token, type).post('rfq', jsonToSend)
  },

  createOrder (token, type, dataOrder) {
    const validUntil = new Date().getTime()) + 2 * 1000
    const params = {
      instrument: dataOrder.instrument,
      order_type: dataOrder.order_type,
      price: parseFloat(dataOrder.price),
      quantity: parseFloat(dataOrder.quantity),
      side: dataOrder.side,
      valid_until: validUntil,
    }
    const jsonToSend = JSON.stringify(params)
    return header(token, type).post('order', jsonToSend)
  },

  // GET TRADES LEDGER 
  getTrades (token, type, filterParams) {
    if (filterParams !== undefined) {
      const params = {
        limit: filterParams.limit,
        offset: filterParams.offset,
      }
      const dataQueryString = qs.stringify(params)
      return header(token, type).get(`trade?${dataQueryString}`)
    } else {
      return header(token, type).get(('trade'))
    }
  },

  getOrders (token, type, filterParams) {
    if (filterParams !== undefined) {
      const params = {
        limit: filterParams.limit,
        offset: filterParams.offset,
      }
      const dataQueryString = qs.stringify(params)
      return header(token, type).get(`order?${dataQueryString}`)
    } else {
      return header(token, type).get(('order'))
    }
  },

  getLedger (token, type, filterParams) {
    if (filterParams !== undefined) {
      const params = {
        limit: filterParams.limit,
        offset: filterParams.offset,
      }
      const dataQueryString = qs.stringify(params)
      return header(token, type).get(`ledger?${dataQueryString}`)
    } else {
      return header(token, type).get(('ledger'))
    }
  },
}

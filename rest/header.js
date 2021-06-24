require('dotenv').config()
const axios = require('axios')

const url = process.env.REST_API_URL

module.exports = function (token, type) {
  if (type === 'oidc') {
    return axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  } else {
    return axios.create({
      baseURL: url,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }
}
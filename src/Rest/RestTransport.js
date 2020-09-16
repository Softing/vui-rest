import Axios from 'axios'
import RestResponse from './RestResponse'

export const Gateways = {
  Ecommerce: 'eapi',
  Seller: 'sapi',
  Manager: 'mapi',
  Frontend: 'frontend'
}

export default class RestTransport {

  url = null
  token = null
  gateway = Gateways.Ecommerce
  requestMethod = 'post'
  requestTimeout = 30 * 1000

  constructor(url, requestMethod = 'post', apiGateway = Gateways.Ecommerce) {
    this.requestMethod = requestMethod
    this.gateway = apiGateway
    this.url = url
  }

  gw() {
    switch (this.gateway) {
      case Gateways.Ecommerce:
        return process.env.VUE_APP_API_ECOMMERCE_URL + this.url
      case Gateways.Seller:
        return process.env.VUE_APP_API_SELLER_URL + this.url
      case Gateways.Manager:
        return process.env.VUE_APP_API_MANAGER_URL + this.url
      case Gateways.Frontend:
        return process.env.VUE_APP_API_FRONTEND_URL + this.url
    }
  }

  auth(token) {
    this.token = token
  }

  call(data = {}, headers = {}, options = {}) {

    // Create requestParams object
    const requestParams = {
      url: this.gw(),
      headers: headers,
      data :data,
      method: this.requestMethod,
      timeout: this.requestTimeout
    }

    // Setup data or params
    if (this.requestMethod.toLowerCase() === 'get') {
      Object.assign(requestParams, {
        params: data
      })
    }
    else {
      Object.assign(requestParams, {
        data: data
      })
    }

    // Create request object
    const request = Object.assign(requestParams, options)

    // Setup authirization
    if (this.token) {
      request.headers['Authorization'] = `Bearer ${this.token}`
    }

    // Create response object
    const response = new RestResponse()

    // Return Axios promise
    return new Promise((resolve, reject) => {
      Axios
        .request(request)
        .then((axiosResponse) => {
          resolve(response.set(axiosResponse))
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            response.set(error.response)
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
          }
          // console.log(error.config);
          reject(response.addError(error))
        })
    })
  }
}

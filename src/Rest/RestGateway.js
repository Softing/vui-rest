import Axios from 'axios'
import {RestResponse} from './RestResponse'

// export const Gateways = {
//   Ecommerce: 'ecommerce',
//   Frontend: 'frontend'
// }

export default class RestGateway {

  store = null
  i18n = null

  constructor(store, i18n) {
    this.store = store
    this.i18n = i18n
  }

}

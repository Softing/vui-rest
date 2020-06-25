export default class RestParamsTransformer {
  store = null
  i18n = null

  constructor (store, i18n) {
    this.store = store
    this.i18n = i18n
  }

  transform (params) {
    return params
  }
}

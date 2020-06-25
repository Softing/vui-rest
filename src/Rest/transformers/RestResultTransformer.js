export default class RestResultTransformer {
  store = null
  i18n = null

  constructor (store, i18n) {
    this.store = store
    this.i18n = i18n
  }

  transform (result) {
    return result
  }
}

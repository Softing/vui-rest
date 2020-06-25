export default class RestErrorsTransformer {
  store = null
  i18n = null

  constructor (store, i18n) {
    this.store = store
    this.i18n = i18n
  }

  /**
   * @param {RestErrors} errors
   */
  transform (errors) {
    for (const [i, error] of errors.getErrors().entries()) {
      errors.set(i, this.transformError(error))
    }

    return errors
  }

  /**
   * @param {RestError} error
   */
  transformError(error) {
    return error
  }
}

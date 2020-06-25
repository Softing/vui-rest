import {Gateways} from "./RestGateway";

export default class RestAction {
  store = null
  i18n = null
  requestParams = {}

  constructor(store, i18n) {
    this.store = store
    this.i18n = i18n
  }

  // ResultTransformer

  setResultTransformer(transformer) {
    this.resultTransformer = transformer
  }

  getResultTransformer() {
    return this.resultTransformer
  }

  hasResultTransformer() {
    return !!this.resultTransformer
  }

  // ErrorsTransformer

  setErrorsTransformer(transformer) {
    this.errorsTransformer = transformer
  }

  getErrorsTransformer() {
    return this.errorsTransformer
  }

  hasErrorTransformer() {
    return !!this.errorsTransformer
  }

  // ParamsTransformer

  setParamsTransformer(transformer) {
    this.paramsTransformer = transformer
  }

  getParamsTransformer() {
    return this.paramsTransformer
  }

  hasParamsTransformer() {
    return !!this.paramsTransformer
  }


  /**
   * Send request
   * @param {RestTransport} transport
   * @param {Object} params
   */
  sendRequest(transport, params) {
    return new Promise((resolve, reject) => {

      this.requestParams = params

      if (this.hasParamsTransformer()) {
        this.requestParams = this.getParamsTransformer().transform(this.requestParams)
      }

      this.onBeforeRequest()

      transport.auth(this.store.getters['auth/token'])

      transport.call(this.requestParams)
        .then((response) => {
          this.handle(response)
          resolve(response)
        })
        .catch((response) => {
          this.handle(response)
          reject(response)
        })
        .finally(() => {
          this.onAfterRequest()
        })
    })
  }

  // Events

  onBeforeRequest() {
  }

  onAfterRequest() {
  }

  /**
   * @param {RestErrors} errors
   * @param {RestResult} result
   */
  onError(errors, result) {
  }

  /**
   * @param {RestResult} result
   * @param {RestErrors} errors
   */
  onSuccess(result, errors) {
  }

  /**
   * @param {RestResult} result
   * @param {RestErrors} errors
   */
  handle({result, errors}) {

    if (this.hasResultTransformer()) {
      result = this.getResultTransformer().transform(result)
    }

    if (this.hasErrorTransformer()) {
      errors = this.getErrorsTransformer().transform(errors)
    }

    if (errors.hasErrors()) {
      this.onError(errors, result)
    } else {
      this.onSuccess(result, errors)
    }

  }
}

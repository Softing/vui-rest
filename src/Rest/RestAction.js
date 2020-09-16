import RestTransport from "@softing/vui-rest/src/Rest/RestTransport";

export default class RestAction {

  #store = null
  #i18n = null

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

  getParams(params) {
    if (this.hasParamsTransformer()) {
      params = this.getParamsTransformer().transform(params);
    }
    params = this.transformParams(params)
    return params;
  }

  // Live transformers

  transformParams(params) {
    return params;
  }

  transformResult(result) {
    return result;
  }

  transformErrors(errors) {
    if (errors && errors.errors) {
      for (let i = 0; i < errors.errors.length; i++) {
        errors.errors[i] = this.transformError(errors.errors[i])
      }
    }
    return errors
  }

  transformError(errors) {
    return errors;
  }

  /**
   * Create request
   * @param {RestTransport} transport
   * @param {Object} params
   */
  createRequest(transport, params) {
    this.onBeforeRequest(params, transport)
    return new Promise((resolve, reject) => {
      const requestParams = this.getParams(params)
      transport.auth(this.store.getters['auth/token'])
      transport.call(requestParams)
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

  /**
   * Send request
   * @param {Object} payload
   */
  send(payload = null) {
    console.debug('This method must be redefined')
  }

  // Events

  onBeforeRequest(params, transport) {
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
   */
  onSuccess(result) {
  }

  /**
   * @param {RestResponse} response
   */
  handle(response) {

    if (this.hasResultTransformer()) {
      response = this.getResultTransformer().transform(response)
    }

    response = this.transformResult(response)

    if (response.errors && response.errors.hasErrors()) {

      if (this.hasErrorTransformer()) {
        response.errors = this.getErrorsTransformer().transform(response.errors)
      }

      response.errors = this.transformErrors(response.errors)

      this.onError(response.errors, response)

    } else {
      this.onSuccess(response)
    }

  }
}

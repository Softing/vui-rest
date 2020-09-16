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
    return errors;
  }

  // Transport

  createTransport(url, method, gw) {
    return new RestTransport(url, method, gw);
  }

  /**
   * Create request
   * @param {RestTransport} transport
   * @param {Object} params
   */
  createRequest(transport, params) {
    this.onBeforeRequest(transport, params)
    return new Promise((resolve, reject) => {
      const requestParams = this.getParams(params)
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

  /**
   * Send request
   * @param {Object} payload
   */
  send(payload = null) {
    console.debug('This method must be redefined')
  }

  // Events

  onBeforeRequest(transport, params) {
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

    result = this.transformResult(result)

    if (this.hasErrorTransformer()) {
      errors = this.getErrorsTransformer().transform(errors)
    }

    errors = this.transformErrors(errors)

    if (errors.hasErrors()) {
      this.onError(errors, result)
    } else {
      this.onSuccess(result, errors)
    }

  }
}

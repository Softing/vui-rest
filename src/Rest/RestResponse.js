import { RestError } from './RestError'
import { RestErrors } from './RestErrors'
import { RestResult } from './RestResult'

export class RestResponse {

  result = {}
  errors = []

  constructor () {
    this.result = new RestResult()
    this.errors = new RestErrors()
  }

  set (response) {
    this.result.setResult(response)
    return this
  }

  addError (err) {
    this.errors.add(new RestError(err))
    return this
  }

  getError () {
    return this.errors.getError()
  }

  getErrors () {
    return this.errors.getErrors()
  }

  hasError () {
    return this.errors.hasErrors()
  }

  getResponse () {
    return {
      result: this.result,
      errors: this.errors
    }
  }
}

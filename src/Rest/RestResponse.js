import RestError from './RestError'
import RestErrors from './RestErrors'

export default class RestResponse {

  status = null
  errors = []

  constructor () {
    this.errors = new RestErrors()
  }

  set (response) {
    this.config= response.config
    this.data= response.data
    this.headers= response.headers
    this.request= response.request
    this.status= response.status
    this.statusText= response.statusText
    return this
  }

  addError (err) {
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors
      for (const field in errors) {
        errors[field].forEach((error) => {
          this.errors.add(new RestError({
            field: field,
            message: error,
            status: err.response.status
          }));
        })
      }
    } else {
      this.errors.add(new RestError(err));
    }

    return this
  }

  getError (field = null) {
    return this.errors.getError(field)
  }

  getErrors (field = null) {
    return this.errors.getErrors(field)
  }

  getAllErrors () {
    return this.errors.getAllErrors()
  }

  hasErrors () {
    return this.errors.hasErrors()
  }

  hasError (field = null) {
    return this.errors.hasErrors(field)
  }

}

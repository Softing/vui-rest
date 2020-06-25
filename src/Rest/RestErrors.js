export class RestErrors {
  errors = []

  /**
   * @param {RestError} error
   */
  add (error) {
    this.errors.push(error)
  }

  set (index, error) {
    this.errors[index] = error
  }

  hasErrors () {
    return this.errors.length > 0
  }

  hasError () {
    return this.errors.length > 0
  }

  /**
   * @param {number} index
   * @return {RestError}
   */
  getError (index = 0) {
    return this.errors[index]
  }

  getErrors () {
    return this.errors
  }
}

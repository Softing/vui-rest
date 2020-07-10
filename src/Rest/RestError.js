export class RestError {
  status = null
  message = null
  data = null
  raw = null

  constructor (error) {
    this.field = error.field
    this.status = error.status || (error.response && (error.response.status || error.response.data.status))
    this.error = (error.response && error.response.data.error) || error.message
    this.message = (error.response && error.response.data.message) || error.message
    this.data = error.data || (error.response && error.response.data)
    this.raw = error
  }

  getMessage () {
    return this.message
  }
}

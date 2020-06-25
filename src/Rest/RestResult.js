export class RestResult {
  config = null
  data = null
  headers = null
  request = null
  status = null
  statusText = null

  setResult (response) {
    this.config = response.config
    this.data = response.data
    this.headers = response.headers
    this.request = response.request
    this.status = response.status
    this.statusText = response.statusText
  }
}

export default class RestGateway {

  store = null
  i18n = null

  constructor(store, i18n) {
    this.store = store
    this.i18n = i18n
  }

  createAction(Clazz) {
    return new Clazz(this.store, this.i18n)
  }

  callAction(Clazz, payload) {
    const action = this.createAction(Clazz)
    if (typeof action['send'] === 'function') {
      return action.send(payload)
    } else {
      console.error('Action without send method')
    }
  }

}

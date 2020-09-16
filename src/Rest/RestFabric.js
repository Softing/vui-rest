export default class RestFabric {

  #store = null;
  #i18n = null;

  constructor(store = null, i18n = null) {
    this.store = store
    this.i18n = i18n
  }

  createApi(Clazz) {
    return new Clazz(this.store, this.i18n)
  }
}

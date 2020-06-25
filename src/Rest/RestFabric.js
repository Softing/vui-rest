export default class RestFabric {

    constructor(store = null, i18n = null) {
        this.store = store
        this.i18n = i18n
    }

    createApi(Clazz) {
        const {store, i18n} = this
        return new Clazz(store, i18n)
    }
}

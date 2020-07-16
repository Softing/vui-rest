# vui-rest

Wrapper for high-level processing of requests and responses to the server using the REST protocol

## Typical RestGateway

```
import RestGateway from '@softing/vui-rest/lib/Rest/RestGateway'
import CategoryAction from '@/api/Directory/CategoryAction'
import FeatureAction from '@/api/Directory/FeatureAction'
import FeatureVariantAction from '@/api/Directory/FeatureVariantAction'

export default class extends RestGateway {

  constructor(store, i18n) {
    super(store, i18n)
  }

  /* Actions */

  findCategories(payload) {
    return new CategoryAction(this.store, this.i18n)
      .sendRequest(payload)
  }

  findFeatures(payload) {
    return new FeatureAction(this.store, this.i18n)
      .sendRequest(payload)
  }

  findFeatureVariants(payload) {
    return new FeatureVariantAction(this.store, this.i18n)
      .sendRequest(payload)
  }

}
```

## Typical RestAction

```
import RestAction from '@softing/vui-rest/lib/Rest/RestAction'
import RestTransport from "@softing/vui-rest/lib/Rest/RestTransport";

export default class extends RestAction {

  url = '/api/v1/seo-form-data-feature-value'

  constructor(store, i18n) {
    super(store, i18n)
  }

  sendRequest(payload) {
    return super.sendRequest(new RestTransport(this.url, 'get'), payload)
  }
}
```

### RestAction events

```
/**
 * The event is fired before sending 
 * the request to the server
 */
onBeforeRequest() {
}


/**
 * The event is fired after sending 
 * the request to the server
 */onAfterRequest() {
}

/**
 * The event is executed if 
 * the server returns an error
 * @param {RestErrors} errors
 * @param {RestResult} result
 */
onError(errors, result) {
}

/**
 * The event is executed if 
 * the server returned data without errors
 * @param {RestResult} result
 * @param {RestErrors} errors
 */
onSuccess(result, errors) {
}
```

## How to use RestGateway

```
import ApiGateway from "@/api/DirectoryGateway";

export default {
  methods: {
    fetch(payload) {
      return this.$api.createApi(ApiGateway)
        .findFeatureVariants(payload)
    },
    preload(value) {
      this.fetch({id: value})
        .then((response) => {
          this.selection = response.result.data[0]
        })
    },
    search(event) {
      this.fetch({query: event.query, filter: this.filter})
        .then((response) => {
          this.suggestions = response.result.data
        })
        .catch((result) => {
          this.suggestions = []
        })
    }
  }
}
```

That's all, folks!

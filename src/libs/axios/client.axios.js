const axios = require("axios");

class ClientAxios {
  constructor(baseUrl) {
    const config = {
      baseURL: baseUrl,
      timeout: 30000,
    };

    this._client = axios.create(config);
    this.signals = {};
  }

  getOrigin() {
    const url = new URL(this._client.defaults.baseURL);
    return url.origin;
  }

  abort(name) {
    if (!!this.signals[name]) {
      this.signals[name].abort();
    }
  }

  _get(url, config) {
    return this._client.get(url, config).then((response) => response.data);
  }

  _post(url, data, config) {
    return this._client
      .post(url, data, config)
      .then((response) => response.data);
  }

  _put(url, data, config) {
    return this._client
      .put(url, data, config)
      .then((response) => response.data);
  }

  _createSignal(name) {
    const controller = new AbortController();
    this.signals[name] = controller;

    return controller.signal;
  }
}

module.exports = ClientAxios;

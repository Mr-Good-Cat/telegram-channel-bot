const ClientAxios = require("../../libs/axios/client.axios");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class BaseCrawler {
  #client = null;

  constructor(websiteUrl) {
    this.#client = new ClientAxios(websiteUrl);
  }

  async run() {
    throw new Error('Need implement method "run"');
  }

  requestPage(url, config) {
    return this.#client._get(url, config).then(this.#getDocument);
  }

  #getDocument(html) {
    const { document } = new JSDOM(html).window;
    return document;
  }
}

module.exports = BaseCrawler;

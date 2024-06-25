const { getRandomElement } = require("../helpers/array");
const SgCrawler = require("./web-crawler/sg-crawler");

const CRAWLER_LIST = [new SgCrawler("https://sgdownloads.com")];

class WebCrawlerFactory {
  static getRandomCrawler() {
    return getRandomElement(CRAWLER_LIST);
  }
}

module.exports = WebCrawlerFactory;

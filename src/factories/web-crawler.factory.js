const { getRandomElement } = require("../helpers/array");
const SgCrawler = require("./web-crawler/sg-crawler");
const EliteBabesCrawler = require("./web-crawler/elite-babes-crawler");

const CRAWLER_LIST = [
  new SgCrawler("https://sgdownloads.com"),
  new EliteBabesCrawler("https://www.elitebabes.com"),
  new EliteBabesCrawler("https://www.elitebabes.com/updates/sort/newest"),
  new EliteBabesCrawler("https://www.elitebabes.com/updates/sort/popular"),
];

class WebCrawlerFactory {
  static getRandomCrawler() {
    return getRandomElement(CRAWLER_LIST);
  }
}

module.exports = WebCrawlerFactory;

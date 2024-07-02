const { getRandomElement } = require("../helpers/array");
const SgCrawler = require("./web-crawler/sg-crawler");
const EliteBabesCrawler = require("./web-crawler/elite-babes-crawler");

const CRAWLER_LIST = [
  new SgCrawler("https://sgdownloads.com"),
  new EliteBabesCrawler("https://www.elitebabes.com"),
  new EliteBabesCrawler("https://www.elitebabes.com/updates/sort/newest"),
  new EliteBabesCrawler("https://www.elitebabes.com/updates/sort/popular"),

  new EliteBabesCrawler("https://www.metarthunter.com/"),
  new EliteBabesCrawler("https://www.metarthunter.com/updates/sort/newest"),
  new EliteBabesCrawler("https://www.metarthunter.com/updates/sort/popular"),

  new EliteBabesCrawler("https://pmatehunter.com/"),
  new EliteBabesCrawler("https://pmatehunter.com/updates/sort/newest"),
  new EliteBabesCrawler("https://pmatehunter.com/updates/sort/popular"),

  new EliteBabesCrawler("https://www.femjoyhunter.com/"),
  new EliteBabesCrawler("https://www.femjoyhunter.com/updates/sort/newest"),
  new EliteBabesCrawler("https://www.femjoyhunter.com/updates/sort/popular"),

  new EliteBabesCrawler("https://www.ftvhunter.com/"),
  new EliteBabesCrawler("https://www.ftvhunter.com/updates/sort/newest"),
  new EliteBabesCrawler("https://www.ftvhunter.com/updates/sort/popular"),
];

class WebCrawlerFactory {
  static getRandomCrawler() {
    return getRandomElement(CRAWLER_LIST);
  }
}

module.exports = WebCrawlerFactory;

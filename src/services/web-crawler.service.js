const WebCrawlerFactory = require("../factories/web-crawler.factory");

class WebCrawlerService {
  run() {
    const crawler = WebCrawlerFactory.getRandomCrawler();

    return crawler.run();
  }
}

module.exports = WebCrawlerService;

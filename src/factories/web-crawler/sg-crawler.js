const { getRandomInt } = require("../../helpers/number");
const { getRandomElement } = require("../../helpers/array");
const BaseCrawler = require("./base-crawler");

class SgCrawler extends BaseCrawler {
  constructor(websiteUrl) {
    super(websiteUrl);
  }

  async run() {
    const result = { name: undefined, images: [] };
    const randomPage = getRandomInt(2, 90);

    const girlListDocument = await this.requestPage(`/page/${randomPage}/`);
    const dataFromGirlListDocument =
      this.#getDataFromGirlListDocument(girlListDocument);
    const randomGirl = getRandomElement(dataFromGirlListDocument);

    result.name = randomGirl.name;
    result.images.push(randomGirl.src);

    const girlPageDocument = await this.requestPage(randomGirl.pageLink);
    const dataFromGirlPageDocument =
      this.#getDataFromGirlPageDocument(girlPageDocument);

    const MAX_SLICE = 3;
    for (let i = 0; i < MAX_SLICE; i++) {
      result.images.push(
        getRandomElement(
          dataFromGirlPageDocument.slice(
            (dataFromGirlPageDocument.length * i) / MAX_SLICE,
            (dataFromGirlPageDocument.length * (i + 1)) / MAX_SLICE,
          ),
        ),
      );
    }

    return result;
  }

  #getDataFromGirlListDocument(girlListDocument) {
    const result = [];
    const links = girlListDocument.querySelectorAll("a.popup-image");

    for (const link of links) {
      const img = link.querySelector("img");

      result.push({
        name: link.dataset["title"].split("–")[0].trim(),
        pageLink: link.href,
        src: img.src,
      });
    }

    return result;
  }

  #getDataFromGirlPageDocument(girlPageDocument) {
    const result = [];
    const links = girlPageDocument.querySelectorAll("figure.gallery-item");

    for (const link of links) {
      const img = link.querySelector("img");
      result.push(img.src.replace(/-[0-9]+x[0-9]+/, ""));
    }

    return result;
  }
}

module.exports = SgCrawler;

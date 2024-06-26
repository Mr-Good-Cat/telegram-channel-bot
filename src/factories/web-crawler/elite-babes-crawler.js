const BaseCrawler = require("./base-crawler");
const { getRandomElement } = require("../../helpers/array");
const { getRandomInt } = require("../../helpers/number");

class EliteBabesCrawler extends BaseCrawler {
  #_websiteUrl;
  constructor(websiteUrl) {
    super(websiteUrl);

    this.#_websiteUrl = websiteUrl;
  }

  async run() {
    const result = { name: "noname", images: [] };

    let page = "/";
    if (this.#_websiteUrl === this.getOrigin()) {
      const randomPage = getRandomInt(1, 6);
      page = randomPage === 1 ? page : `/page/${randomPage}`;
    }

    const girlListDocument = await this.requestPage(page);

    const dataFromGirlListDocument =
      this.#getDataFromGirlListDocument(girlListDocument);
    const randomGirlPage = getRandomElement(dataFromGirlListDocument);

    const girlPageDocument = await this.requestPage(randomGirlPage);
    const dataFromGirlPageDocument =
      this.#getDataFromGirlPageDocument(girlPageDocument);

    result.name = dataFromGirlPageDocument.name;
    const MAX_SLICE = 4;

    if (dataFromGirlPageDocument.images.length <= MAX_SLICE) {
      result.images = dataFromGirlPageDocument.images;
      return result;
    }

    for (let i = 0; i < MAX_SLICE; i++) {
      result.images.push(
        getRandomElement(
          dataFromGirlPageDocument.images.slice(
            (dataFromGirlPageDocument.images.length * i) / MAX_SLICE,
            (dataFromGirlPageDocument.images.length * (i + 1)) / MAX_SLICE,
          ),
        ),
      );
    }

    return result;
  }

  #getDataFromGirlListDocument(girlListDocument) {
    const result = [];
    const figures = girlListDocument
      .getElementById("content")
      .querySelector("ul.list-gallery")
      .querySelectorAll("figure");

    for (const figure of figures) {
      const a = figure.querySelector("a");

      if (a.href.startsWith(this.getOrigin())) {
        result.push(a.href);
      }
    }

    return result;
  }

  #getDataFromGirlPageDocument(girlPageDocument) {
    const result = { name: undefined, images: [] };
    const h1 = girlPageDocument.getElementById("top").querySelector("h1");

    if (h1) {
      const h1Text = h1.innerText || h1.textContent;
      result.name = h1Text.split(" in ")[0];
    }

    const links = girlPageDocument
      .getElementById("content")
      .querySelector("ul.list-gallery")
      .querySelectorAll("a");

    for (const link of links) {
      result.images.push(link.href);
    }

    return result;
  }
}

module.exports = EliteBabesCrawler;

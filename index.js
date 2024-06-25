require("dotenv").config();

const FileService = require("./src/services/file.service");
const BotService = require("./src/services/bot.service");
const WebCrawlerService = require("./src/services/web-crawler.service");

const fileService = new FileService();
const botService = new BotService();
const webCrawlerService = new WebCrawlerService();

const randomFile = fileService.getRandomFile();

if (!randomFile) {
  webCrawlerService
    .run()
    .then((girlLinks) => {
      return botService.sendParsedContent(girlLinks);
    })
    .then(() => console.log("Success!"))
    .catch(console.log);

  return;
}

botService
  .sendContent(randomFile)
  .then(() => fileService.removeFile(randomFile.path))
  .catch(console.log);

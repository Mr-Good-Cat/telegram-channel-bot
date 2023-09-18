require("dotenv").config();

const FileService = require("./src/services/file.service");
const BotService = require("./src/services/bot.service");

const fileService = new FileService();
const botService = new BotService();

const randomFile = fileService.getRandomFile();

if (!randomFile) {
  return;
}

botService
  .sendContent(randomFile)
  .then(() => fileService.removeFile(randomFile.path))
  .catch(console.log);

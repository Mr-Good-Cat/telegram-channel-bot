require("dotenv").config();

const FileService = require("./src/services/file.service");
const BotService = require("./src/services/bot.service");

const fileService = new FileService();
const botService = new BotService();

const randomImage = fileService.getRandomImage();

if (!randomImage) {
  return;
}

botService
  .sendPhoto(randomImage)
  .then(() => fileService.removeImage(randomImage.path))
  .catch(console.log);

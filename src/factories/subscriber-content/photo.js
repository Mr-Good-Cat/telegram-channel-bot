const Content = require("./content");
const BotTelegram = require("../../libs/telegram/bot.telegram");
const { FILE_TYPE_PHOTO } = require("../../libs/telegram/constants");

class Photo extends Content {
  #telegramClient = new BotTelegram();

  getFileId() {
    return this.file.photo[0].file_id;
  }

  getFileType() {
    return FILE_TYPE_PHOTO;
  }

  send(formData) {
    return this.#telegramClient.sendPhoto(formData);
  }
}

module.exports = Photo;

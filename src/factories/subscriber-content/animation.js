const Content = require("./content");
const BotTelegram = require("../../libs/telegram/bot.telegram");
const { FILE_TYPE_ANIMATION } = require("../../libs/telegram/constants");

class Animation extends Content {
  #telegramClient = new BotTelegram();

  getFileId() {
    return this.file.animation.file_id;
  }

  getFileType() {
    return FILE_TYPE_ANIMATION;
  }

  send(formData) {
    return this.#telegramClient.sendAnimation(formData);
  }
}

module.exports = Animation;

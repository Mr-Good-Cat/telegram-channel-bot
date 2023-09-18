const Content = require("./content");
const BotTelegram = require("../../libs/telegram/bot.telegram");
const { FILE_TYPE_VIDEO } = require("../../libs/telegram/constants");

class Video extends Content {
  #telegramClient = new BotTelegram();

  getFileId() {
    return this.file.video.file_id;
  }

  getFileType() {
    return FILE_TYPE_VIDEO;
  }

  send(formData) {
    return this.#telegramClient.sendVideo(formData);
  }
}

module.exports = Video;

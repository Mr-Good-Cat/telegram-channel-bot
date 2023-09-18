const FormData = require("form-data");
const BotTelegram = require("../libs/telegram/bot.telegram");

const VIDEO_FORMATS = ["mp4"];

const FILE_TYPE_PHOTO = "photo";
const FILE_TYPE_VIDEO = "video";

class BotService {
  #telegramClient = new BotTelegram();

  sendContent({ stream, fileName }) {
    const isVideo = this.#isVideo(fileName);
    const formData = this.#prepareInputFile(
      fileName,
      stream,
      isVideo ? FILE_TYPE_VIDEO : FILE_TYPE_PHOTO,
    );

    if (isVideo) {
      return this.#telegramClient.sendVideo(formData);
    }

    return this.#telegramClient.sendPhoto(formData);
  }

  #prepareInputFile(fileName, stream, fileType) {
    const formData = new FormData();

    formData.append("chat_id", process.env.TELEGRAM_CHANNEL_CHAT_ID);
    formData.append(fileType, stream);
    formData.append(
      "caption",
      "#" +
        fileName
          .split(".")[0]
          .replace(/[0-9]/g, "")
          .trim()
          .replace(/\s+/g, " ")
          .replace(/\s/g, "_"),
    );

    return formData;
  }

  #isVideo(fileName) {
    return VIDEO_FORMATS.includes(fileName.split(".").pop());
  }
}

module.exports = BotService;

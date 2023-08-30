const FormData = require("form-data");
const BotTelegram = require("../libs/telegram/bot.telegram");

class BotService {
  #telegramClient = new BotTelegram();

  sendPhoto({ fileName, stream }) {
    const formData = this.#prepareInputFile({ fileName, stream });

    return this.#telegramClient.sendPhoto(formData);
  }

  #prepareInputFile({ fileName, stream }) {
    const formData = new FormData();

    formData.append("chat_id", process.env.TELEGRAM_CHANNEL_CHAT_ID);
    formData.append("photo", stream);
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
}

module.exports = BotService;

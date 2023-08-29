const ClientAxios = require("../axios/client.axios");

class BotTelegram {
  #clientAxios;
  #telegramChannelChatId;

  constructor() {
    this.#clientAxios = new ClientAxios(
      `https://api.telegram.org/bot${process.env.BOT_API_KEY}/`,
    );

    this.#telegramChannelChatId = process.env.TELEGRAM_CHANNEL_CHAT_ID;
  }

  getMe() {
    return this.#clientAxios._get("getMe");
  }

  getUpdates() {
    return this.#clientAxios._get("getUpdates");
  }

  sendMessage(text) {
    return this.#clientAxios._post("sendMessage", {
      chat_id: this.#telegramChannelChatId,
      text: text,
      parse_mode: "Markdown",
    });
  }

  sendPhoto(formData) {
    return this.#clientAxios._post("sendPhoto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

module.exports = BotTelegram;

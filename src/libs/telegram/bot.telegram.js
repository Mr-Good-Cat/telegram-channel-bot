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
    const params = {
      timeout: 5,
    };

    const query = new URLSearchParams(params);

    return this.#clientAxios._get(`getUpdates?${query}`);
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

  sendMediaGroup(formData) {
    return this.#clientAxios._post("sendMediaGroup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  sendVideo(formData) {
    return this.#clientAxios._post("sendVideo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  sendAnimation(formData) {
    return this.#clientAxios._post("sendAnimation", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

module.exports = BotTelegram;

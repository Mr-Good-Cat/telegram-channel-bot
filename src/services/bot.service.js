const FormData = require("form-data");
const BotTelegram = require("../libs/telegram/bot.telegram");
const { getTimestampInSec } = require("../helpers/date");
const SubscriberContentFactory = require("../factories/subscriber-content.factory");
const {
  FILE_TYPE_PHOTO,
  FILE_TYPE_VIDEO,
  FILE_TYPE_MEDIA,
} = require("../libs/telegram/constants");

const VIDEO_FORMATS = ["mp4"];

const CAPTION_SEPARATORS = ["&", ",", " and "];

class BotService {
  #telegramClient = new BotTelegram();

  async sendParsedContent({ name, images }) {
    if (!images.length) {
      return;
    }

    if (images.length > 1) {
      const formData = new FormData();
      formData.append("chat_id", process.env.TELEGRAM_CHANNEL_CHAT_ID);

      const media = images.map((img, index) => {
        const mediaImg = {
          type: "photo",
          media: img,
        };

        mediaImg.caption = this.#createTagFromFileName(name);
        return mediaImg;
      });

      formData.append(FILE_TYPE_MEDIA, JSON.stringify(media));

      return this.#telegramClient.sendMediaGroup(formData);
    }

    const formData = this.#prepareInputFile(name, images[0], FILE_TYPE_PHOTO);
    return this.#telegramClient.sendPhoto(formData);
  }

  async subscriberContent() {
    const updates = await this.#telegramClient.getUpdates();

    if (!updates.ok) {
      return [];
    }

    const afterTimestamp =
      getTimestampInSec() - parseInt(process.env.LIFETIME_SUBSCRIBER_CONTENT);

    const onlyMessageWithFile = updates.result
      .filter((r) => !!r.message)
      .map((r) => r.message)
      .filter((m) => m.date >= afterTimestamp)
      .filter((m) => !!m.photo || !!m.animation || !!m.video);

    const result = [];
    for (const file of onlyMessageWithFile) {
      const subscriberContent =
        SubscriberContentFactory.getSubscriberContent(file);

      result.push(
        subscriberContent.publish(process.env.TELEGRAM_CHANNEL_CHAT_ID),
      );
    }

    return result;
  }

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
    formData.append("caption", this.#createTagFromFileName(fileName));

    return formData;
  }

  #createTagFromFileName(fileName) {
    let tagList = [];
    const contentName = fileName
      .split(".")[0]
      .replace(/[0-9]/g, "")
      .trim()
      .replace(/\s+/g, " ");

    for (const separator of CAPTION_SEPARATORS) {
      if (contentName.includes(separator)) {
        tagList = contentName.split(separator);
        break;
      }
    }

    if (!tagList.length) {
      tagList.push(contentName);
    }

    return tagList
      .map((tag) => "#" + tag.trim().replace(/[\s-]/g, "_"))
      .join(" ");
  }

  #isVideo(fileName) {
    return VIDEO_FORMATS.includes(fileName.split(".").pop());
  }
}

module.exports = BotService;

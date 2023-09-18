const FormData = require("form-data");

class Content {
  constructor(file) {
    this.file = file;
  }

  publish(chatId) {
    const formData = this.#getFormData(chatId);

    return this.send(formData);
  }

  send(formData) {
    throw new Error('Need implement method "send"');
  }

  getFileType() {
    throw new Error('Need implement method "getFileType"');
  }

  getFileId() {
    throw new Error('Need implement method "getFileId"');
  }

  #getFormData(chatId) {
    const formData = new FormData();

    formData.append("chat_id", chatId);
    formData.append(this.getFileType(), this.getFileId());

    if (!!this.file.caption) {
      formData.append("caption", this.file.caption);
    }

    return formData;
  }
}

module.exports = Content;

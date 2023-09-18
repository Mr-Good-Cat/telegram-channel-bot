const Photo = require("./subscriber-content/photo");
const Video = require("./subscriber-content/video");
const Animation = require("./subscriber-content/animation");

class SubscriberContentFactory {
  static getSubscriberContent(file) {
    if (!!file.photo) {
      return new Photo(file);
    }

    if (!!file.animation) {
      return new Animation(file);
    }

    if (!!file.video) {
      return new Video(file);
    }

    throw new Error("Unknown file type");
  }
}

module.exports = SubscriberContentFactory;

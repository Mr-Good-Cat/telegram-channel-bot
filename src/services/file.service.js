const fs = require("fs");
const path = require("path");

const IMG_DIR = "./src/image";

class FileService {
  getRandomImage() {
    const imageList = fs
      .readdirSync(IMG_DIR)
      .filter((fileName) => fileName !== ".gitignore");

    if (!imageList.length) {
      return null;
    }

    const randomImageName =
      imageList[Math.floor(Math.random() * imageList.length)];

    const imagePath = path.join(IMG_DIR, randomImageName);

    return {
      path: imagePath,
      fileName: randomImageName,
      stream: fs.createReadStream(imagePath),
    };
  }

  removeImage(path) {
    fs.unlinkSync(path);
  }
}

module.exports = FileService;

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = "./src/content";

class FileService {
  getRandomFile() {
    const fileList = fs
      .readdirSync(CONTENT_DIR)
      .filter((fileName) => fileName !== ".gitignore");

    if (!fileList.length) {
      return null;
    }

    const randomFileName =
      fileList[Math.floor(Math.random() * fileList.length)];

    const filePath = path.join(CONTENT_DIR, randomFileName);

    return {
      path: filePath,
      fileName: randomFileName,
      stream: fs.createReadStream(filePath),
    };
  }

  removeFile(path) {
    fs.unlinkSync(path);
  }
}

module.exports = FileService;

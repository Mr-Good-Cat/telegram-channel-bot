require("dotenv").config();
const BotService = require("./src/services/bot.service");

const botService = new BotService();

botService
  .subscriberContent()
  .then((res) => console.log(res.length))
  .catch(console.log);

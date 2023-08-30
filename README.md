# telegram-channel-bot
Node.js application will allow you to send photos to the telegram channel


## How to use
1. Clone the repository to your server `git clone https://github.com/Mr-Good-Cat/telegram-channel-bot.git`
2. Create `.env` file from `.env.example`. For example `cp .env.example .env`
3. Set your variables to `.env`. For example
```dotenv
BOT_API_KEY=4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc
TELEGRAM_CHANNEL_CHAT_ID=@channelusername
```
where BOT_API_KEY is api key from [@BotFather](https://core.telegram.org/bots/tutorial#getting-ready) 
and TELEGRAM_CHANNEL_CHAT_ID is target channel (in the format @channelusername)
4. Upload photos to `src/image`
5. Go to project root directory and run `node index.js`. The application should send a random image to your channel and remove it from the directory `src/image`

### Set up sending by time
1. Create `cron.sh` file from `cron.example.sh`. For example `cp cron.example.sh cron.sh`
2. In the `cron.sh`, change the path to your project and the path to your nodejs. For example, you clone repository to `~/project/channel` and path to you nodejs is `/root/.nvm/versions/node/v16.15.0/bin/node` so your file should look like this
```dotenv
#!/bin/sh

cd "$HOME/project/channel/telegram-channel-bot" || exit
/root/.nvm/versions/node/v16.15.0/bin/node "index.js"
```
3. In crontab set `0 * * * * sh /root/project/channel/telegram-channel-bot/cron.sh > /root/project/channel/telegram-channel-bot/log.txt 2>&1`

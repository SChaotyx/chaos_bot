const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready',() => {
  console.log('Ready!');
});
bot.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
  if (message.content === 'pamela') {
    message.reply('chu! :D');
  }
});
bot.login (process.env.BOT_TOKEN);

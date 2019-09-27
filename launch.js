const Discord = require("discord.js");
const  client = new Discord.Client();
const fs = require("fs");
require("./incl/keepAlive.js")
require('dotenv').config()


//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
fs.readdir("./incl/commands/", (err, files) => {

  if (err) return console.log(err);
  files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./incl/commands/${file}`);
      console.log(file + " cmd loaded")
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
  });
});
//Events "handler"
fs.readdir('./incl/events/', (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
      let eventFunc = require(`./incl/events/${file}`);
      console.log(file + " event loaded")
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunc.run(client, ...args));
  });
});
//READY
client.on("ready", () => {
  client.user.setActivity('Use gdps!help', { type: 'PLAYING' });
   console.log("CONNECTED.");
   client.channels.get(process.env.CHANNEL_LOG).send('```Connected.```')
});
client.login(process.env.BOT_TOKEN);

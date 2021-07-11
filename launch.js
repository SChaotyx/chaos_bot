const Discord = require("discord.js");
const  client = new Discord.Client();
const fs = require("fs");
require('dotenv').config()
//Command Handler
client.gdpscmd = new Discord.Collection();
//client.reqcmd = new Discord.Collection();
//client.gdcmd = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
var helpjson = require("./incl/json/help.json");
client.Hcmd = helpjson;
//GDPS COMMANDS
fs.readdir("./incl/cmd/gdpscmd/", (err, files) => {
  console.log("-----------Loading GDPS commands.-----------")
  if (err) return console.log(err);
  files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./incl/cmd/gdpscmd/${file}`);
      console.log(file + " loaded")
      let commandName = file.split(".")[0];
      client.gdpscmd.set(commandName, props);
  });
});
/*REQUEST COMMANDS
fs.readdir("./incl/cmd/reqcmd/", (err, files) => {
  console.log("-----------Loading request commands.-----------")
  if (err) return console.log(err);
  files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./incl/cmd/reqcmd/${file}`);
      console.log(file + " loaded")
      let commandName = file.split(".")[0];
      client.reqcmd.set(commandName, props);
  });
});
//GD COMMANDS
fs.readdir("./incl/cmd/gdcmd/", (err, files) => {
  console.log("-----------Loading GD commands.-----------")
  if (err) return console.log(err);
  files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./incl/cmd/gdcmd/${file}`);
      console.log(file + " loaded")
      let commandName = file.split(".")[0];
      client.gdcmd.set(commandName, props);
  });
});
*/
//Events "handler"
fs.readdir('./incl/events/', (err, files) => {
  console.log("-----------Loading Events.-----------")
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
  client.user.setActivity('Use '+process.env.PREFIX+'help', { type: 'PLAYING' });
   console.log("CONNECTED.");
   client.channels.cache.get(process.env.CHANNEL_LOG).send('```Connected.```')
});
client.login(process.env.BOT_TOKEN);

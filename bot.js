const Discord = require("discord.js");
const  client = new Discord.Client();
const gs = require("./mainLib.js");

//HEROKU CONFIG VARS
var bottoken = process.env.BOT_TOKEN;
var prefix = 'gdps!';
var gdpshost = process.env.HOSTING;
var channel_logs = process.env.CHANNEL_LOG;

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on("ready", () => {
  client.user.setActivity('v1.2.0 | Use gdps!help', { type: 'PLAYING' });
   console.log("CONNECTED.");
   client.channels.get(channel_logs).send('```Connected.```')
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var userID = message.member.id;
  var channelID = message.channel.id;

  //COMMANDS
  if(command === 'ping'){
    message.channel.send("pong!");
  }
  if(command === 'help'){
    message.channel.send(gs.premsg(userID, 1), gs.prebuild(userID, channelID, gdpshost, 'help'));
  }
  if(command === 'about'){
    message.channel.send(gs.premsg(userID, 2), gs.prebuild(userID, channelID, gdpshost, 'about'));
  }
  if(command === 'profile'){
    var usuario = args.slice(0).join(' ');
    var postData = {userName: usuario, channel: channelID, tagID: userID};
    require('request').post({
      uri:gdpshost+"incl/discord/cmd/userProfile.php",
      headers:{'content-type': 'application/x-www-form-urlencoded'},
      body:require('querystring').stringify(postData)
    },
    function(err,res,body){
      console.log(body);
      console.log(res.statusCode);
      client.channels.get(channel_logs).send('```'+body+'```');
    });
  }
  if(command === 'level'){
    var level = args.slice(0).join(' ');
    var postData={levelID_Name: level, channel: channelID, tagID: userID};
			require('request').post({
				uri:gdpshost+"incl/discord/cmd/levelStats.php",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
			},
			function(err,res,body){
				console.log(body);
				console.log(res.statusCode);
				client.channels.get(channel_logs).send('```'+body+'```');
			});
  }
  if(command === 'stats'){
    var postData={channel: channelID, tagID: userID};
		require('request').post({
			uri:gdpshost+"incl/discord/cmd/serverStats.php",
			headers:{'content-type': 'application/x-www-form-urlencoded'},
			body:require('querystring').stringify(postData)
		},
		function(err,res,body){
			console.log(body);
			console.log(res.statusCode);
			client.channels.get(channel_logs).send('```'+body+'```');
		});
  }
  if(command === 'daily'){
    var postData={channel: channelID, type: 0, tagID: userID};
    require('request').post({
      uri:gdpshost+"incl/discord/cmd/currentDaily.php",
      headers:{'content-type': 'application/x-www-form-urlencoded'},
      body:require('querystring').stringify(postData)
    },
    function(err,res,body){
      console.log(body);
      console.log(res.statusCode);
      client.channels.get(channel_logs).send('```'+body+'```');
    });
  }
  if(command === 'weekly'){
    var postData={channel: channelID, type: 1, tagID: userID};
    require('request').post({
      uri:gdpshost+"incl/discord/cmd/currentDaily.php",
      headers:{'content-type': 'application/x-www-form-urlencoded'},
      body:require('querystring').stringify(postData)
    },
    function(err,res,body){
      console.log(body);
      console.log(res.statusCode);
      client.channels.get(channel_logs).send('```'+body+'```');
    });
  }
});
client.login(bottoken);
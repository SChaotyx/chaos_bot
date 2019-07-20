var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: process.env.BOT_TOKEN,
	autorun: true
});
bot.on('ready', function (evt) {
	bot.setPresence({
        game: {
            name: 'v1.1.0 | Use gdps!help'
        }
	});
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' – (' + bot.id + ')');
	bot.sendMessage({to: process.env.CHANNEL_LOG, message: '**'+bot.username+' Connected**'});
});
bot.on('message', function (user, userID, channelID, message, evt) {
	if (message.substring(0, 5) == 'gdps!') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];
		if (message.substring(9, 5) == 'help') {
			bot.sendMessage({
				to: channelID,
				message: "<@"+userID+">, here all <@596166147527933952> commands.",
				embed: {
					title: "<:info:588245545643016224> ChaosBot Commands",
					thumbnail: {
						url: process.env.HOSTING+"resources/misc/gdpsbot.png"
					},
					footer: {
						icon_url: process.env.HOSTING+"resources/misc/gdpsbot.png",
						text: "Chaos-Bot v1.2.0"
					},
					fields: [
					{
						"name": "Bot prefix: `gdps!`",
						"value": "Use `gdps!help <command>` to view the detailed documentation of a specific command."
					},
					{
						"name": "`gdps!profile <UserName>`",
						"value": "example: `gdps!profile Alexander73`."
					},
					{
						"name": "`gdps!level <LevelName or LevelID>`",
						"value": "example: `gdps!level 19457` or `gdps!level DeadLocked`."
					},
					{
						"name": "`gdps!daily` | `gdps!weekly`",
						"value": "Displays the current Daily / weekly level in the GDPS."
					},
					{
						"name": "`gdps!stats`",
						"value": "Show the general statistics of the GDPS."
					},					
					]
				}
			});			
		}
		if (message.substring(9, 5) == 'ping') {
			bot.sendMessage({to: channelID, message: 'Pong!'});
		}
		if (message.substring(12, 5) == 'profile') {
			args = message.substring(13);
			var postData={userName: args, channel: channelID, tagID: userID};
			require('request').post({
				uri:process.env.HOSTING+"incl/discord/cmd/userProfile.php",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
			},
			function(err,res,body){
				console.log(body);
				console.log(res.statusCode);
				bot.sendMessage({to: process.env.CHANNEL_LOG, message: '```'+body+'```'});
			});
		}
		if (message.substring(10, 5) == 'level') {
			args = message.substring(11);
			var postData={levelID_Name: args, channel: channelID, tagID: userID};
			require('request').post({
				uri:process.env.HOSTING+"incl/discord/cmd/levelStats.php",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
			},
			function(err,res,body){
				console.log(body);
				console.log(res.statusCode);
				bot.sendMessage({to: process.env.CHANNEL_LOG, message: '```'+body+'```'});
			});
		}
		if (message.substring(10, 5) == 'stats') {
			var postData={channel: channelID, tagID: userID};
			require('request').post({
				uri:process.env.HOSTING+"incl/discord/cmd/serverStats.php",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
			},
			function(err,res,body){
				console.log(body);
				console.log(res.statusCode);
				bot.sendMessage({to: process.env.CHANNEL_LOG, message: '```'+body+'```'});
			});
		}
		if (message.substring(10, 5) == 'daily') {
			var postData={channel: channelID, type: 0, tagID: userID};
			require('request').post({
				uri:process.env.HOSTING+"incl/discord/cmd/currentDaily.php",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
			},
			function(err,res,body){
				console.log(body);
				console.log(res.statusCode);
				bot.sendMessage({to: process.env.CHANNEL_LOG, message: '```'+body+'```'});
			});
		}
		if (message.substring(11, 5) == 'weekly') {
			var postData={channel: channelID, type: 1, tagID: userID};
			require('request').post({
				uri:process.env.HOSTING+"incl/discord/cmd/currentDaily.php",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
			},
			function(err,res,body){
				console.log(body);
				console.log(res.statusCode);
				bot.sendMessage({to: process.env.CHANNEL_LOG, message: '```'+body+'```'});
			});
		}
	}
});
/*
DEPENDENCIAS 
npm i request
npm install discord.io winston
npm install https://github.com/woor/discord.io/tarball/gateway_v6
*/

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
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' – (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
	if (message.substring(0, 5) == 'test!') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];
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
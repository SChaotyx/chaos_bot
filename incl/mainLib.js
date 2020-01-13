const request = require("request");
const EventEmitter = require("events");
//SET NEW CLASS
class mainLib extends EventEmitter {
    levelEmbedParse(response){
        let level = response.split("#")[0].split("|");
        for(let l in level) {
            let lData = level[l].split(":");
            var lvl = {
                levelID: lData[1],
                levelName: lData[3],
                difficulty: lData[11],
                demon: lData[21],
                auto: lData[25],
                downloads: lData[13],
				likes: lData[19],
                stars: lData[27],
                featured: lData[29],
                description: lData[35],
                length: lData[37],
                coins: lData[43],
                version: lData[5],
                verifiedCoins: lData[45],
                requestedStars: lData[45]
            }
        }
        let autor = response.split("#")[1].split("|");
        for(let c in autor) {
            let cData = autor[c].split(":");
            var creator = {
                userID: cData[0],
                userName: cData[1],
                accountID: cData[2]
            }
        }
        //description decode
        let desc = new Buffer.from(lvl["description"].toString(), "base64").toString();
        //coins
        if(lvl["verifiedCoins"] = 1){
            var uc = "<:verify:588245548528697344>";
        }else{
            var uc = "<:unverify:588245549107380244>";
        }
        switch(lvl["coins"]){
            case "0": {var coinscount = "None."; break;}
            case "1": {var coinscount = uc; break;}
            case "2": {var coinscount = uc+" "+uc; break;}
            case "3": {var coinscount = uc+" "+uc+" "+uc; break;}
        }
        //likes icon
        if(lvl["likes"] < 0){
            var likeicon = "<:dislike:588245545550741524>";
        }else{
            var likeicon = "<:like:588245545915777045>";
        }
        let downloads = this.charCount(lvl["downloads"]); 
        let likes = this.charCount(lvl["likes"]); 
        let length = this.charCount(lvl["length"]); 
        let levelstats = "<:down2:588245545303408671> `"+downloads+"`\n"+likeicon+" `"+likes+"`\n<:length:588245546108583946> `"+length+"`\n───────────────────";
        var embed={
            embed: {
                title: "<:search:596447805040492546> Search result.",
                fields: [
                {
                    name: "<:play:588245551787802634> __"+lvl["levelName"]+"__ by "+creator["userName"],
                    value: "**Description:** "+desc},
                {
                    name: "Coins: "+coinscount,
                    value: levelstats}
                ]
                }
            }
            return embed;
    }
    charCount(value){
		let char = value.length;
		switch(char){
			case 1: {var space = "        ";}
			break;
			case 2: {var space = "       ";}
			break;
			case 3: {var space = "      ";}
			break;
			case 4: {var space = "     ";}
			break;
			case 5: {var space = "    ";}
			break;
			case 6: {var space = "   ";}
			break;
			case 7: {var space = "  ";}
			break;
			case 8: {var space = " ";}
			break;
			case 9: {var space = "";}
			break;
		}
        return space+value;
    }
    premsg(userID, id){
        switch(id){
            case 1: var msg = "<@"+userID+">, here all Bot commands.";
            break;
            case 2: var msg = "https://discord.gg/7gJeArr";
            break;
        }
        return msg
    }
    prebuild(userID, channelID, gdpshost, param, prefix){
        if(param === 'help'){
            const embed = { 
                embed: {
                    title: "<:info:588245545643016224> Bot Commands",
                    thumbnail:{ url: gdpshost+"resources/misc/gdps.png" },
                    timestamp: new Date(),
                    footer: {
                        icon_url: gdpshost+"resources/misc/gdpsbot.png",
                        text: "Chaos-Bot v1.2.1"
                    },
                    fields: [
                        {
                            "name": "Bot prefix: `"+prefix+"`",
                            "value": "Use `"+prefix+"help <command>` to view the detailed documentation of a specific command."},
                        {
                            "name": "`"+prefix+"profile <UserName or UserID>`",
                            "value": "Example: `"+prefix+"profile Alexander73`."},
                        {
                            "name": "`"+prefix+"account <UserName or AccountID>`",
                            "value": "Detailed information of registered accounts"},	
                        {
                            "name": "`"+prefix+"level <LevelName or LevelID>`",
                            "value": "Example: `"+prefix+"level 19457` or `"+prefix+"level DeadLocked`."},
                        {
                            "name": "`"+prefix+"daily` | `"+prefix+"weekly`",
                            "value": "Displays the current Daily / weekly level in the GDPS."},
                        {
                            "name": "`"+prefix+"stats`",
                            "value": "Show the general statistics of the GDPS."},					
                        {
                            "name": "`"+prefix+"top <stars>`",
                            "value": "Show the top 10 players based on your assigned parameter \n Example: `"+prefix+"leaderboard diamonds`"},
                        {
                            "name": "`"+prefix+"link <GDPS User Name>`",
                            "value": "You can link your discord account with the gdps account to receive private notifications about your levels and receive roles when performing certain activities. \n Example: `"+prefix+"link Danola`"},							
                        {
                            "name": "`"+prefix+"about`",
                            "value": "Show bot info"},									
                    ]
                }
            }
            return embed;
        }
        if(param === 'about'){
            const embed = {
                embed: {
                    title: "<:auto:588254712017584139> Chaos-Bot",
                    thumbnail:{ url: gdpshost+"resources/misc/gdpsbot.png" },
                    timestamp: new Date(),
                    footer: {
                        icon_url: gdpshost+"resources/misc/SC.png",
                        text: "SChaotyx#5120"
                    },
                    fields: [
                        {
                        "name": "Developed by SChaotyx <:dev:588246858460037121>",
                        "value": "It is a simple bot for Geometry Dash Private Server,\n"+ 
                        "with basic features to find levels and profiles within it.\n"+
                        "If you have any problem contact me on my social networks",
                        },
                        {
                        "name": "<:friends:588245550302756870> Social:",
                        "value": "<:discord:588248737684520971>[Discord](https://discord.gg/7gJeArr)\n"+
                        "<:tw:588248740200972288>[Twitter](https://twitter.com/SChaotyx)\n"+
                        "<:yt:588249043596083200>[Youtbe](https://www.youtube.com/channel/UC4eZQQYmaD-Q90LD_tF6FrA)"
                    }
                ]
                }
            }
            return embed;
        }
    }
}
module.exports = mainLib;

const request = require("request");
const EventEmitter = require("events");
//SET NEW CLASS
class mainLib extends EventEmitter {
    premsg(userID, id){
        switch(id){
            case 1: var msg = "<@"+userID+">, here all ChaosBot commands.";
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
                    title: "<:info:588245545643016224> ChaosBot Commands",
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
                            "name": "`"+prefix+"leaderboard <stars>`",
                            "value": "Show the top 10 players based on your assigned parameter \n Example: `"+prefix+"leaderboard diamonds`"},					
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
                    title: "<:auto:588254712017584139> GDPS Bot",
                    thumbnail:{ url: gdpshost+"resources/misc/gdpsbot.png" },
                    timestamp: new Date(),
                    footer: {
                        icon_url: gdpshost+"resources/misc/SC.png",
                        text: "SChaotyx#5120"
                    },
                    fields: [
                        {
                        "name": "<:creator_points:588245543600390184> ChaosBot, Developed by SChaotyx <:dev:588246858460037121>",
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

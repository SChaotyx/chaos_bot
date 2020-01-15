const EventEmitter = require("events");
const Discord = require('discord.js');
class embeds extends EventEmitter {
    levels(Data){
        const embedData = new Discord.RichEmbed()
        var lvl = Data.lvl;
        var creator = lvl.creator;
        var song = lvl.song;
        if(lvl.objects > 39999){var overflow = "<:objecto:588245546423025664>";}else{var overflow = "";}
        if(lvl.verifiedCoins == 1){
            var uc = "<:verify:588245548528697344>";
        }else{
            var uc = "<:unverify:588245549107380244>";
        }
        switch(lvl.coins){
            case "0": {var coinscount = "None."; break;}
            case "1": {var coinscount = uc; break;}
            case "2": {var coinscount = uc+" "+uc; break;}
            case "3": {var coinscount = uc+" "+uc+" "+uc; break;}
        }
        const lengtharr = [
            "TINY",
            "SHORT",
            "MEDIUM",
            "LONG",
            "XL"
        ];
        if(lvl.likes < 0){
            var likeicon = "<:dislike:588245545550741524>";
        }else{
            var likeicon = "<:like:588245545915777045>";
        }
        let downloads = this.charCount(lvl.downloads); 
        let likes = this.charCount(lvl.likes); 
        let length = this.charCount(lengtharr[parseInt(lvl.length)]); 
        let levelstats = "<:down2:588245545303408671> `"+downloads+"`\n"+likeicon+" `"+likes+"`\n<:length:588245546108583946> `"+length+"`\n───────────────────";
        if(lvl.original > 0){
            var original = "<:copy:588245543445331968> "+lvl.original;
        }else{
            var original = "";
        }
        let title = "<:search:596447805040492546> Search result.";
        let name1 = "<:play:588245551787802634> __"+lvl.levelName+"__ by "+creator.userName+" "+overflow;
        let value1 = "**Description:** "+lvl.description;
        let name2 = "Coins: "+coinscount;
        let value2 = levelstats;
        let name3 = ":musical_note: __"+song.name+"__ by "+song.author;
        let value3 = "SongID: "+song.id+" - Size: "+song.size+"MB\n"+
               //"<:play:588245551787802634> [Play on Newgrounds](https://www.newgrounds.com/audio/listen/"+song.id+") <:down1:588245550210613267> [Download MP3]("+song.url+")\n───────────────────\n"+
               "**Level ID:** "+lvl.levelID+"\n"+
               "**Level Version:** "+lvl.version+"\n"+
               "**Objects count:** "+lvl.objects+"\n"+
               "**Stars requested:** "+lvl.requestedStars+"\n"+
               original;
        //console.log(thumbnail);
        embedData.attachFiles([this.getDiffThumb(lvl).loc]);
        embedData.setThumbnail("attachment://"+this.getDiffThumb(lvl).file);
        if(Data.type === "request"){
            let reqTitle = "<:starmod:588254713766739978> Level Request.";
            let reqlevelstats = "<:down2:588245545303408671> `"+lvl.downloads+"` "+likeicon+" `"+lvl.likes+"` <:length:588245546108583946> `"+lengtharr[parseInt(lvl.length)]+"`";
            if(Data.notes === ""){ var notes = "Not provided."; }else{ var notes = Data.notes; }
            embedData.setColor('#fffffe');
            embedData.setTitle(reqTitle);
            embedData.addField(name1, reqlevelstats);
            embedData.addField(name2, name3);
            embedData.addField(":notepad_spiral: Notes:", notes);
            embedData.setFooter("levelID: "+ lvl.levelID+/*" | RequestID: "+Data.requestID+*/" | "+Data.requserID);
            embedData.setAuthor(Data.requser, Data.reqavatar);
            return embedData;
        }
        if(Data.type === "review"){
            let reqTitle = "<:starmod:588254713766739978> Level Request.";
            //let notes = Data.notes;
            let reqlevelstats = "<:down2:588245545303408671> `"+lvl.downloads+"` "+likeicon+" `"+lvl.likes+"` <:length:588245546108583946> `"+lengtharr[parseInt(lvl.length)]+"`";
            if(Data.status === "ok"){
                var status = "<:success:588245546469294111> Sent.";
                embedData.setColor('#2fff00');
            }else{
                var status = "<:cross:588245544200175621> Not sent.";
                embedData.setColor('#ff0000');
            }
            if(Data.notes === ""){ var notes = ""; }else{ var notes = Data.notes; }
            embedData.setTitle(reqTitle);
            embedData.addField(name1, reqlevelstats);
            embedData.addField(name2, name3);
            embedData.addField(":notepad_spiral: Review:", notes+"\n"+status);
            embedData.setFooter("levelID: "+ lvl.levelID+/*" | RequestID: "+Data.requestID+*/" | "+Data.requserID);
            embedData.setAuthor(Data.requser, Data.reqavatar);
            return embedData;
        }
        embedData.setTitle(title);
        embedData.addField(name1, value1);
        embedData.addField(name2, value2);
        embedData.addField(name3, value3);
        return embedData;
    }
    getDiffThumb(lvl){
        var postData={
            starStars: lvl.stars,
            starFeatured: lvl.featured,
            starEpic: lvl.epic,
            starDemonDiff: lvl.demondiff,
            starDifficulty: lvl.difficulty,
            starAuto: lvl.auto,
            starDemon: lvl.demon
        };
        var rateimg = "ratena";
		if(postData.starFeatured > 0){
			var rateimg = "ratefeat";
		}
		if(postData.starEpic == 1){
			var rateimg = "rateepic";
        }
        switch(postData.starDifficulty){
			case "0": {var diffimg = "diff0";} // NA
			break;
			case "10": {var diffimg = "diff10";} // EASY
			break;
			case "20": {var diffimg = "diff20";} // NORMAL
			break;
			case "30": {var diffimg = "diff30";} // HARD
			break;
			case "40": {var diffimg = "diff40";} // HARDER
			break;
            case "50": {var diffimg = "diff50";} // INSANE
            break;
		}
        if(postData.starAuto == 1){
			var diffimg = "auto"; //AUTO
		}
		if(postData.starDemon == 1){
			switch(postData.starDemonDiff){
				case "0": {var diffimg = "demon0";} //HARD DEMON
				break;
				case "3": {var diffimg = "demon3";} //EASY DEMON
				break;
				case "4": {var diffimg = "demon4";} //MEDIUM DEMON
				break;
				case "5": {var diffimg = "demon5";} //INSANE DEMON
				break;
				case "6": {var diffimg = "demon6";} //EXTREME DEMON
				break;
			}
        }
        //STARS CHECK
		switch(postData.starStars){
			case "0": {var str = "str0";}
			break;
			case "1": {var str = "str1";}
			break;
			case "2": {var str = "str2";}
			break;
			case "3": {var str = "str3";}
			break;
			case "4": {var str = "str4";}
			break;
			case "5": {var str = "str5";}
			break;
			case "6": {var str = "str6";}
			break;
			case "7": {var str = "str7";}
			break;
			case "8": {var str = "str8";}
			break;
			case "9": {var str = "str9";}
			break;
			case "10": {var str = "str10";}
			break;
        }
        //GENERATE FILENAME
		var imgloc = {loc: "./resources/difficulty/"+rateimg+diffimg+str+".png", file: rateimg+diffimg+str+".png"}
        return imgloc;
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
}
module.exports = embeds;
/* unused
//GENERATEIMG URL
        
*/

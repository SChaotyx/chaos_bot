const EventEmitter = require("events");
const request = require("request");
const RobTopServer = "http://boomlings.com/database/";
const GDPSserver = process.env.HOSTING;
class GDClient extends EventEmitter {
    levels(name, gdps, obj, cb) {
		if(gdps){
			var MainURL = GDPSserver;
		}else{
			var MainURL = RobTopServer;
		}
		let len = "-";
		let type = "0";
		let total = "0";
		if(typeof name === "object" || obj != undefined && (obj.len||obj.length)&&obj.type&&obj.total) {
			len = (name.length ? name.length : (name.len?name.len:"-")).toString();
			type = (name.type||type).toString();
			total = (name.total||total).toString();
		}
		let page = 0;
		if(obj) {
		if(obj.featured)f=(obj.featured == true ? 1 : 0);
		if(obj.original)or=(obj.original == true ? 1 : 0);
		if(obj.twoPlayer)tp=(obj.twoPlayer == true ? 1 : 0);
		if(obj.star)st=(obj.star == true ? 1 : 0);
		if(obj.length)len=obj.length;
		if(obj.page)page=obj.page;
		if(name.name)name=name.name;
        }
        let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}getGJLevels21.php`,
				form: {
					gameVersion: "21",
					str: name,
					type: type,
					page: page,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b) => {
				let levels = b.split("#")[0].split("|");
				let lvlArr = [];
				for(let i in levels) {
					if(levels[i] == "-1") {
						rej();
					} else  {
						let lData = levels[i].split(":");
						const lengtharr = [
							"TINY",
							"SHORT",
							"MEDIUM",
							"LONG",
							"XL"
						];
						const parsedData = {
							levelName: lData[3],
							levelID: lData[1],
							creator: {
								userName: "",
                                userID: lData[7],
                                accountID: "",
							},
							song: {},
							difficulty: lData[11],
							auto: lData[25],
							demon: lData[21],
							demondiff: lData[23],
							downloads: lData[13],
							likes: lData[19],
							stars: lData[27],
							featured: lData[29],
							epic: lData[31],
							description: new Buffer.from(lData[35].toString(), "base64").toString(),
							length: lengtharr[parseInt(lData[37])],
							coins: lData[43],
							version: lData[5],
							verifiedCoins: (lData[45] == 1 ? true : false),
							requestedStars: lData[47],
							objects: lData[33],
							original: lData[39]
						}
						let authors = b.split("#")[1].split("|");
						for(let a in authors) {
							if(authors[a].split(":")[0] == lData[7]) {
								parsedData.creator.userName = authors[a].split(":")[1];
								parsedData.creator.accountID = authors[a].split(":")[2];
							}
						}
						if(lData[55]){
							var songID = lData[55];
						}else{
							var songID = lData[53];
						}
						let songs = b.split("#")[2].split(":");
						if(songID != "0") {
							for(let s in songs) {
								if(songs[s].split("~|~")[1] == songID) {
									let song = songs[s].split("~|~");
									parsedData.song = {
										name: song[3],
										author: song[7],
										id: song[1],
										size: song[9],
										url: decodeURIComponent( song[13] )
									}
								}
							}
						} else {
							lData[47] = lData[15];
							let mainSongs = {
							  "0": ["Stereo Madness", "ForeverBound"],
							  "1": ["Back On Track", "DJVI"],
							  "2": ["Polargeist", "Step"],
							  "3": ["Dry Out", "DJVI"],
							  "4": ["Base After Base", "DJVI"],
							  "5": ["Cant Let Go", "DJVI"],
							  "6": ["Jumper", "Waterflame"],
							  "7": ["Time Machine", "Waterflame"],
							  "8": ["Cycles", "DJVI"],
							  "9": ["xStep", "DJVI"],
							  "10": ["Clutterfunk", "Waterflame"],
							  "11": ["Theory of Everything", "DJ-Nate"],
							  "12": ["Electroman Adventures", "Waterflame"],
							  "13": ["Clubstep", "DJ-Nate"],
							  "14": ["Electrodynamix", "DJ-Nate"],
							  "15": ["Hexagon Force", "Waterflame"],
							  "16": ["Blast Processing", "Waterflame"],
							  "17": ["Theory of Everything 2", "DJ-Nate"],
							  "18": ["Geometrical Dominator", "Waterflame"],
							  "19": ["Deadlocked", "F-777"],
							  "20": ["Fingerbang", "MDK"] // why not kek
							} // Thanks meganukebmp/Nexrem (https://github.com/meganukebmp/Discord-GD-Stat/blob/master/resources/level/tracks.json) (modified)
							let song = mainSongs[lData[53]+""];
							parsedData.song = {
								name: song[0],
								author: song[1],
								id: lData[53],
								size: null,
								url: null
							}
						}
						lvlArr.push(parsedData);
					}
					
				}
				if(!cb || typeof cb !== "function")
					res(lvlArr)
				else {
					cb(lvlArr)
					return null;
				}
			})
		});
		name = name.toString();
		
		return Prom;
    }
}
module.exports = GDClient;
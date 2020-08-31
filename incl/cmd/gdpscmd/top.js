exports.run = async(client, message, args) => {
    var type = args.slice(0).join(' ');
    switch(type){
        case '': lrule = 'stars';
        break;
        case 'stars': lrule = 'stars';
        break;
        case 'star': lrule = 'stars';
        break;
        case 'demons': lrule = 'demons';
        break;
        case 'demon': lrule = 'demons';
        break;
        case 'cp': lrule = 'creatorPoints';
        break;
        case 'creator points': lrule = 'creatorPoints';
        break;
        case 'user coins': lrule = 'userCoins';
        break;
        case 'coins': lrule = 'userCoins';
        break;
        case 'scoins': lrule = 'coins';
        break;
        case 'secret coins': lrule = 'coins';
        break;
        case 'diamonds': lrule = 'diamonds';
        break;
        case 'diamond': lrule = 'diamonds';
        break;
        default: lrule = "";
        break;
      }
      if(lrule === ""){
        message.channel.send('<@'+message.member.id+'>\n`'+type+'` is not a valid parameter, please use `'+process.env.PREFIX+'help top` to find detailed command info.');
        return false;
      }
      var postData={type: lrule, channel: message.channel.id, tagID: message.member.id};
      require('request').post({
        uri: process.env.HOSTING + "incl/discord/cmd/leaderboardCMD.php",
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        body:require('querystring').stringify(postData)
      },
      function(err,res,body){
        console.log(body);
        console.log(res.statusCode);
        client.channels.get(process.env.CHANNEL_LOG).send('```'+body+'```');
      });
}
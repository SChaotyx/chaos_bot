exports.run = async(client, message, args) => {
    var type = args.slice(0).join(' ');
    switch(type){
        case 'stars': lrule = 'stars';
        break;
        case 'demons': lrule = 'demons';
        break;
        case 'cp': lrule = 'creatorPoints';
        break;
        case 'user coins': lrule = 'userCoins';
        break;
        case 'secret coins': lrule = 'coins';
        break;
        case 'diamonds': lrule = 'diamonds';
        break;
        default: lrule = "";
        break;
      }
      if(lrule === ""){
        message.channel.send('<@'+message.member.id+'>\n`'+type+'` is not a valid parameter, please use `'+process.env.PREFIX+'help leaderboard` to find detailed command info.');
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
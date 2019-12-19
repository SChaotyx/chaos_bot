exports.run = async(client, message, args) => {
    var usuario = args.slice(0).join(' ');
    var postData = {userName: usuario, channel: message.channel.id, tagID: message.member.id};
    require('request').post({
        uri: process.env.HOSTING + "incl/discord/cmd/userProfile.php",
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        body:require('querystring').stringify(postData)
      },
      function(err,res,body){
        console.log(body);
        console.log(res.statusCode);
        client.channels.get(process.env.CHANNEL_LOG).send('```'+body+'```');
      });
}
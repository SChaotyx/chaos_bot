exports.run = async(client, message, args) => {
    var userdata = args.slice(0).join(' ');
    var postData={userData: userdata, channel: message.channel.id, tagID: message.member.id, userTag: message.member.user.tag};
    require('request').post({
        uri: process.env.HOSTING + "incl/discord/cmd/linkAccount.php",
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        body:require('querystring').stringify(postData)
    },
    function(err,res,body){
    console.log(body);
    console.log(res.statusCode);
    client.channels.get(process.env.CHANNEL_LOG).send('```'+body+'```');
    });
}
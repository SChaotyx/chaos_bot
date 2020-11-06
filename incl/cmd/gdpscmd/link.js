exports.run = async(client, message, args) => {
    var userdata = args.slice(0).join(' ');
    var postData={userData: userdata, channel: message.channel.id, tagID: message.author.id, userTag: message.author.username+"#"+message.author.discriminator};
    console.log(message.author.username+"#"+message.author.discriminator);
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
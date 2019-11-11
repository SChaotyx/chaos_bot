exports.run = async(client, message, args) => {
    var userID = args.slice(0, 1).join(' ');
    var roleID = args.slice(1).join(' ');
    let userdis = message.guild.members.get(userID);
    let roledis = message.guild.roles.get(roleID);
    if(userdis.roles.has(roledis.id)) return;
    if(!roledis) return;
    if(!userdis) return;
    if (message.author.bot){
        //if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return;
        userdis.addRole(roledis);
        client.channels.get(process.env.CHANNEL_LOG).send("<@"+userID+"> has role <@&"+roleID+">");
    }else{
        message.channel.send("<@"+userID+"> No no no"); 
    }
}
exports.run = async(client, message, args) => {
    var userID = args.slice(0, 1).join(' ');
    var roleID = args.slice(1).join(' ');
    let userdis = message.guild.members.get(userID);
    let roledis = message.guild.roles.get(roleID);
    if(!roledis) return client.channels.get(process.env.CHANNEL_LOG).send("```El rol "+roleID+" no existe.```");
    if(!userdis) return client.channels.get(process.env.CHANNEL_LOG).send("```El usuario "+userID+" no existe.```");
    if(userdis.roles.has(roledis.id)) return message.delete(1000);
    if (message.author.bot){
        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Manage Roles permission is denied.');
        userdis.addRole(roledis);
        client.channels.get(process.env.CHANNEL_NOTIFY).send("<@"+userID+">, ¡Obtuviste un rol especial! <@&"+roleID+">.");
        message.delete(1000);
       // message.channel.send("<@"+userID+"> gets the <@&"+roleID+"> role");
    }else{
        message.channel.send("<@"+userID+"> No no no");
        message.delete(1000);
    }
}
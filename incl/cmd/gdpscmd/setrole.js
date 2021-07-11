exports.run = async(client, message, args) => {
    var userID = args.slice(0, 1).join(' ');
    var roleID = args.slice(1).join(' ');
    let userdis = message.guild.members.cache.get(userID);
    let roledis = message.guild.roles.cache.get(roleID);
    if(!roledis) return client.channels.cache.get(process.env.CHANNEL_LOG).send("```El rol "+roleID+" no existe.```");
    if(!userdis) return client.channels.cache.get(process.env.CHANNEL_LOG).send("```El usuario "+userID+" no existe.```");
    if(userdis.roles.cache.has(roledis.id)) return message.delete({ timeout: 1000, reason: 'Cleaning.' });
    if (message.author.bot){
        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Manage Roles permission is denied.');
        userdis.roles.add(roledis);
        client.channels.cache.get(process.env.CHANNEL_NOTIFY).send("<@"+userID+">, ¡Obtuviste un rol especial! <@&"+roleID+">.");
    }else{
        message.channel.send("<@"+userID+"> No no no");
        message.delete({ timeout: 1000, reason: 'Cleaning.' });
    }
}

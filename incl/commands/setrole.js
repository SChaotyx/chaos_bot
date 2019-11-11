exports.run = async(client, message, args) => {
    var userID = args.slice(0, 1).join(' ');
    var roleID = args.slice(1).join(' ');
    let userdis = message.guild.members.get(userID);
    let roledis = message.guild.roles.get(roleID);
    if(userdis.roles.has(roledis.id)) return message.delete(1000);
    if(!roledis) return;
    if(!userdis) return;
    if (message.author.bot){
        if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Manage Roles permission is denied.');
        userdis.addRole(roledis);
        message.channel.send("<@"+userID+"> gets the <@&"+roleID+"> role");
    }else{
        message.channel.send("<@"+userID+"> No no no"); 
    }
}
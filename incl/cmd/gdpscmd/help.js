exports.run = async(client, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    const embedData = new Discord.MessageEmbed();
    var cmdinfo = client.Hcmd.gdps
    var emd = client.Hcmd.emd
    var reqhelp = client.Hcmd.request
    var cmdarg = args.slice(0).join(' ');
    fs.readdir("./incl/cmd/gdpscmd/", (err, files) => {
        var filec = Object.keys(files).length;
        var count = 0;
        if (err) return console.log(err);
        if(!cmdarg){
            embedData.addField("───────────────────", "**Prefijo:** `"+process.env.PREFIX+"`\n**Usa:** `"+process.env.PREFIX+"help <Comando>` para ver información detallada.\n───────────────────");
            //embedData.addField("<:approved:588253185018298378> **Level Request:**", "**Usa:** `"+process.env.PREFIX+"help request` para ver toda la informarción.")
            files.forEach(file => {
                count++;
                if (file.endsWith(".js")){
                    let commandName = file.split(".")[0];
                    if(!emd[commandName]){ emd[commandName] = "<:copy:588245543445331968>" }
                    if(cmdinfo[commandName]){
                        var desc = cmdinfo[commandName].desc;
                        var use = cmdinfo[commandName].use;
                        use = use.split('pref!').join(process.env.PREFIX);
                        embedData.addField(emd[commandName]+" **Comando: "+commandName+"**", use);
                    }else if(commandName === "setrole"){}else if(commandName === "ping"){}else if(commandName === "help"){}else{
                        embedData.addField(emd[commandName]+" **Comando: "+commandName+"**", "No hay información.");
                    }
                }
                if(filec === count){
                    embedData.setTitle("<:info:588245545643016224> Comandos: OB-GDPS");
                    embedData.setThumbnail("https://cdn.discordapp.com/icons/535604018844794880/a_fee5c2890eba63aec9fe6af7c31b17ea.gif");
                    message.channel.send("<@"+message.author.id+">, vista general de todos los comandos disponibles.", embedData);
                }
            });
        }else /*if(cmdarg === "request"){
            reqhelp.help.embed.fields[0].value = reqhelp.help.embed.fields[0].value.split("pref!").join(process.env.REQPREFIX);
            reqhelp.help.embed.fields[1].value = reqhelp.help.embed.fields[1].value.split("pref!").join(process.env.REQPREFIX);
            reqhelp.help.embed.fields[2].value = reqhelp.help.embed.fields[2].value.split("pref!").join(process.env.REQPREFIX);
            reqhelp.help.embed.fields[3].value = reqhelp.help.embed.fields[3].value.split("pref!").join(process.env.REQPREFIX);
            reqhelp.help.embed.fields[4].value = reqhelp.help.embed.fields[4].value.split("pref!").join(process.env.REQPREFIX);
            reqhelp.help.embed.fields[0].value = reqhelp.help.embed.fields[0].value.split("<#reqC>").join("<#"+process.env.REQCHANNEL+">");
            reqhelp.help.embed.fields[0].value = reqhelp.help.embed.fields[0].value.split("<@&reqR>").join("<@&"+process.env.REVROLE+">");
            message.channel.send("<@"+message.author.id+">, comandos para <#"+process.env.REQCHANNEL+">.", reqhelp.help);
        }else*/{
            files.forEach(file => {
                count++;
                if (file.endsWith(".js")){
                    let commandName = file.split(".")[0];
                    if(cmdarg === commandName){
                        if(!emd[commandName]){ emd[commandName] = "<:copy:588245543445331968>" }
                        embedData.setTitle(emd[commandName]+" Comando: __"+commandName+"__");
                        embedData.setThumbnail("https://cdn.discordapp.com/icons/535604018844794880/a_fee5c2890eba63aec9fe6af7c31b17ea.gif");
                        embedData.setTimestamp();
                        if(cmdinfo[commandName]){
                            var desc = cmdinfo[commandName].desc;
                            var use = cmdinfo[commandName].use;
                            use = use.split('pref!').join(process.env.PREFIX);
                            embedData.setDescription(use+"\n"+desc);
                        }else{
                            embedData.setDescription("No hay información acerca de este comando.");
                        }
                        message.channel.send("<@"+message.author.id+"> Comando "+commandName, embedData);
                    }
                }
            });
        }
    });
}
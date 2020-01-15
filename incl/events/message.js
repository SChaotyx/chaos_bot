exports.run = async(client, message) => {
    //if (message.author.bot) return;
    var messageArray = message.content.split(" ");
    var cmd = messageArray[0];
    var args = messageArray.slice(1);
    if(message.channel.id == process.env.REQCHANNEL){
        if (message.content.startsWith(process.env.REQPREFIX)){
            let commandfile = client.reqcmd.get(cmd.slice(process.env.REQPREFIX.length));
            if(!commandfile){
                message.delete(1000);
                message.channel.send("Usa: `"+process.env.REQPREFIX+" <Level ID> <Notas>`\nEjemplo: `"+process.env.REQPREFIX+" 45514142 Collab con amigos.`\nLas `<Notas>` son opcionales.");
                return;
            }    
            commandfile.run(client,message,args);
        }else{
            if(message.author.bot){
                if (message.content.startsWith("Usa:")){
                    message.delete(6000);
                }
                if (message.content.startsWith("Error:")){
                    message.delete(3000);
                }
            }else{
                message.delete(1000);
                message.channel.send("Usa: `"+process.env.REQPREFIX+" <Level ID> <Notas>`\nEjemplo: `"+process.env.REQPREFIX+" 45514142 Collab con amigos.`\nLas `<Notas>` son opcionales.");
            }
        }
    }else{
        if (message.content.startsWith(process.env.SECPREFIX)){
            let commandfile = client.gdcmd.get(cmd.slice(process.env.SECPREFIX.length));
            if(!commandfile) return;    
            commandfile.run(client,message,args);
        }
        if (message.content.startsWith(process.env.PREFIX)){
            let commandfile = client.gdpscmd.get(cmd.slice(process.env.PREFIX.length));
            if(!commandfile) return;    
            commandfile.run(client,message,args);
        }
    }                         
}
/*
*/

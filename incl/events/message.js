exports.run = async(client, message) => {
    //if (message.author.bot) return;
    var messageArray = message.content.split(" ");
    var cmd = messageArray[0];
    var args = messageArray.slice(1);
    if (message.content.startsWith(process.env.PREFIX)){
        let commandfile = client.gdpscmd.get(cmd.slice(process.env.PREFIX.length));
        if(!commandfile) return;    
        commandfile.run(client,message,args);
    }
    if (message.content.startsWith(process.env.REQPREFIX)){
        let commandfile = client.reqcmd.get(cmd.slice(process.env.REQPREFIX.length));
        if(!commandfile) return;    
        commandfile.run(client,message,args);
    }
    if (message.content.startsWith(process.env.SECPREFIX)){
        let commandfile = client.gdcmd.get(cmd.slice(process.env.SECPREFIX.length));
        if(!commandfile) return;    
        commandfile.run(client,message,args);
    }                         
}
/*
*/

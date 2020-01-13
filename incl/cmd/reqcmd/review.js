exports.run = async(client, message, args) => {
    const GDClient = require("../../lib/GDClient.js");
    const GD = new GDClient();
    const embeds = require("../../lib/embeds.js");
    const emb = new embeds();
    var reqIDrev = args.slice(0)[0];
    var status = args.slice(0)[1];
    var notes = args.slice(2).join(' ');
    message.delete(1000);
    if(isNaN(reqIDrev)){
        message.channel.send("Usa: `"+process.env.REQPREFIX+"review <Level ID> <ok|no (enviado o no)> <Notas>` sin `<>`\nEjemplo: `"+process.env.REQPREFIX+"review 43543636 ok mi critica`\n las notas es opcional puedes no incluirla directamente.");
        return;
    }
    if(message.member.roles.has(process.env.REVROLE)) {
        message.channel.fetchMessages().then(messages => {
            var found = 0;
            var count = 0;
            var msgc = Number(messages.size);
            messages.forEach( function(valor, indice, array) { 
                count++;
                if(valor.author.id === client.user.id){
                    if(valor.embeds[0].footer.text.split(" | ")[0].split(": ")[1]){
                        //var reqID = valor.embeds[0].footer.text.split(" | ")[1].split(": ")[1];
                        var lvlID = valor.embeds[0].footer.text.split(" | ")[0].split(": ")[1];
                        var utag = valor.embeds[0].footer.text.split(" | ")[1];
                        var msgID = valor.id;
                        if(lvlID === reqIDrev){
                            found++;
                            GD.levels(lvlID).then( levelData =>{
                                if(levelData === "-1"){
                                    message.channel.send("Error: El nivel ya no existe.");
                                    return;
                                }
                                var lvl = levelData[0];
                                let embedData = emb.levels({
                                lvl : lvl, 
                                type : "review", 
                                notes : notes,
                                requser : message.author.tag,
                                    requserID : utag, 
                                    reqavatar : message.author.avatarURL, 
                                    //requestID: reqID, 
                                    status: status
                                });
                                client.channels.get(process.env.REVCHANNEL).send("<@"+utag+">",embedData);
                                message.channel.fetchMessage(msgID).then(msg => msg.delete());
                                return;
                            });
                        }
                    }
                }
                if(count === msgc){
                    if(found === 0){
                        message.channel.send("Error: No se encontraron request.");
                    }
                }
            });
        }).catch(console.error);
    }else{
        message.channel.send("Error: No puedes usar esto.");
    }
}
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
        message.channel.send("Usa: `"+process.env.REQPREFIX+"review <RequestID> <OK|NO (enviado o no)> <Notas>` sin `<>`\nEjemplo: `"+process.env.REQPREFIX+"review 435436364634 OK mi critica`\n las notas es opcional puedes no incluirla directamente.");
        return false;
    }
    if(message.member.roles.has(process.env.REVROLE)) {
        message.channel.fetchMessages().then(messages => {
            messages.forEach( function(valor, indice, array) {   
                if(valor.author.id === client.user.id){
                    if(valor.embeds[0].footer.text.split(" | ")[1].split(": ")[1]){
                        var reqID = valor.embeds[0].footer.text.split(" | ")[1].split(": ")[1];
                        var lvlID = valor.embeds[0].footer.text.split(" | ")[0].split(": ")[1];
                        var utag = valor.embeds[0].footer.text.split(" | ")[2];
                        var msgID = valor.id;
                        if(reqID === reqIDrev){
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
                                    requestID: reqID, 
                                    status: status
                                });
                                client.channels.get(process.env.REVCHANNEL).send("<@"+utag+">",embedData);
                                message.channel.fetchMessage(msgID).then(msg => msg.delete());
                                return;
                            });
                        }
                    }
                }
            });
        })
        .catch(console.error);
    }else{
        message.channel.send("Error: No puedes usar esto.");
        message.delete(1000);
    }
}
exports.run = async(client, message, args) => {
    const GDClient = require("../../lib/GDClient.js");
    const GD = new GDClient();
    const embeds = require("../../lib/embeds.js");
    const emb = new embeds();
    var levelID = args.slice(0)[0];
    var notes = args.slice(1).join(' ');
    if(isNaN(levelID)){
        message.channel.send("Usa: `"+process.env.REQPREFIX+" <Level ID> <Notas>` sin `<>`\nEjemplo: `"+process.env.REQPREFIX+" 45514142 Collab con amigos.`\nlas notas es opcional puedes no incluirla.");
        message.delete(1000);
        return false;
    }
    GD.levels(levelID).then( levelData =>{
        message.channel.fetchMessages().then(messages => {
            var already = 0;
            var count = 0;
            var msgc = Number(messages.size);
            messages.forEach( function(valor, indice, array) {
                count++;
                if(valor.author.id === client.user.id){
                    if(valor.embeds[0].footer.text.split(" | ")[1].split(": ")[1]){
                        var lvlID = valor.embeds[0].footer.text.split(" | ")[0].split(": ")[1];
                        if(lvlID === levelID){
                            already++;
                        }
                    }
                }
                if(msgc === count){
                    if(already > 0){
                        message.channel.send("Error: El nivel ya esta pendiente.");
                        message.delete(1000);
                        return false;
                    }
                    if(levelData === "-1"){
                        message.channel.send("Error: El nivel no existe.");
                        message.delete(1000);
                        return false;
                    }
                    var lvl = levelData[0];
                    if(lvl.length < 2){ 
                        message.channel.send("Error: el nivel es demasiado corto");
                        message.delete(1000);
                        return false;
                    }
                    if(lvl.stars > 0){ 
                        message.channel.send("Error: el nivel ya tiene estrellas.");
                        message.delete(1000);
                        return false;
                    }
                    let embedData = emb.levels({
                        lvl : lvl, 
                        type : "request", 
                        notes : notes, 
                        requser : message.author.tag, 
                        requserID : message.author.id, 
                        reqavatar : message.author.avatarURL, 
                        requestID: Date.now() / 1000 | 0
                    });
                    //console.log(embedData);
                    message.channel.send(embedData);
                    message.delete(1000);
                }
            });
        });
    });
}
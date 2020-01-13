exports.run = async(client, message, args) => {
    const GDClient = require("../../lib/GDClient.js");
    const GD = new GDClient();
    const embeds = require("../../lib/embeds.js");
    const emb = new embeds();
    var levelID = args.slice(0)[0];
    var notes = args.slice(1).join(' ');
    message.delete(1000);
    if(isNaN(levelID)){
        message.channel.send("Usa: `"+process.env.REQPREFIX+" <Level ID> <Notas>` sin `<>`\nEjemplo: `"+process.env.REQPREFIX+" 45514142 Collab con amigos.`\nlas notas es opcional puedes no incluirla.");
        return;
    }
    GD.levels(levelID).then( levelData =>{
        message.channel.fetchMessages().then(messages => {
            var already = 0;
            var count = 0;
            var msgc = Number(messages.size);
            messages.forEach( function(valor, indice, array) {
                count++;
                if(valor.author.id === client.user.id){
                    if(valor.embeds[0].footer.text.split(" | ")[0].split(": ")[1]){
                        var lvlID = valor.embeds[0].footer.text.split(" | ")[0].split(": ")[1];
                        if(lvlID === levelID){
                            already++;
                        }
                    }
                }
                if(msgc === count){
                    if(already > 0){
                        message.channel.send("Error: El nivel ya esta pendiente.");
                        return;
                    }
                    if(levelData === "-1"){
                        message.channel.send("Error: El nivel no existe.");
                        return;
                    }
                    var lvl = levelData[0];
                    if(lvl.length < 2){ 
                        message.channel.send("Error: el nivel es demasiado corto");
                        return;
                    }
                    if(lvl.stars > 0){ 
                        message.channel.send("Error: el nivel ya tiene estrellas.");
                        return;
                    }
                    let embedData = emb.levels({
                        lvl : lvl, 
                        type : "request", 
                        notes : notes, 
                        requser : message.author.tag, 
                        requserID : message.author.id, 
                        reqavatar : message.author.avatarURL, 
                        //requestID: Date.now() / 1000 | 0
                    });
                    //console.log(embedData);
                    message.channel.send(embedData);
                }
            });
        });
    });
}
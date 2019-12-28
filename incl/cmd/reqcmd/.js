exports.run = async(client, message, args) => {
    const GDClient = require("../../lib/GDClient.js");
    const GD = new GDClient();
    const embeds = require("../../lib/embeds.js");
    const emb = new embeds();
    var levelID = args.slice(0)[0];
    var notes = args.slice(1).join(' ');
    if(isNaN(levelID)){
        message.channel.send("Usa: `"+process.env.REQPREFIX+" <Level ID> <Notas>` sin `<>`\nEjemplo: `"+process.env.REQPREFIX+" 45514142 Collab con amigos.`\n las notas es opcional puedes no incluirla directamente.");
        message.delete(1000);
        return false;
    }
    GD.levels(levelID).then( levelData =>{
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
    });
}
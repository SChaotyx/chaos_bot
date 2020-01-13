exports.run = async(client, message, args) => {
    const GDClient = require("../../lib/GDClient.js");
    const GD = new GDClient();
    const embeds = require("../../lib/embeds.js");
    const emb = new embeds();
    var reqIDrev = args.slice(0)[0];
    message.delete(1000);
    if(isNaN(reqIDrev)){
        message.channel.send("Usa: `"+process.env.REQPREFIX+"cancel <Level ID>` sin `<>`\nEjemplo: `"+process.env.REQPREFIX+"cancel 43543636`\nsolo request que hayas puesto tú.");
        return;
    }
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
                        if(utag === message.author.id){
                            message.channel.fetchMessage(msgID).then(msg => msg.delete());
                            return;
                        }else{
                            message.channel.send("Error: No puedes eliminar request que no hayas posteado tu.");
                            return;
                        }
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
}
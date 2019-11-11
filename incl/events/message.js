let prefix = process.env.PREFIX

 exports.run = async(client, message) => {
  //if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {

    var gdpshost = process.env.HOSTING;
    var channel_logs = process.env.CHANNEL_LOG;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
if(!commandfile) return;    
    commandfile.run(client,message,args);
 }
                            
  }
/*
*/

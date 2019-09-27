exports.run = async(client, message, args) => {
    const mainLib = require("../mainLib.js");
    const gs = new mainLib();
    var embed = gs.prebuild(message.member.id, message.channel.id, process.env.HOSTING, 'help');
    var tag = gs.premsg(message.member.id, 1);
    message.channel.send(tag, embed);
}
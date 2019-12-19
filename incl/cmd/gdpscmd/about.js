exports.run = async(client, message, args) => {
    const mainLib = require("../../mainLib.js");
    const gs = new mainLib();
    var embed = gs.prebuild(message.member.id, message.channel.id, process.env.HOSTING, 'about');
    var tag = gs.premsg(message.member.id, 2);
    message.channel.send(tag, embed);
}
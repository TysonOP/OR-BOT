const Command = require('../../Structures/Command');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Repeat your message!",
            usage: ".say <msg>",
            category: "Moderation",
			aliases: ['say']
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
        
        if(!message.member.hasPermission('MANAGE_SERVER')) return message.reply(":x: You haven't the permission to execute this command!");

        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        }
        

        const TYSON = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setColor("#fdff00")
        .setDescription(args.join(" "))
        .setTimestamp()

        message.channel.send(TYSON);
}
}
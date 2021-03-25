const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Shows the avatar of mentioned user!',
            usage: "-av @user",
            category: "Moderation",
            aliases: ['av','pfp','icon']
        });
    }

    async run(message, args) {
        let user;

        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = this.client.users.cache.get(args[0]);
        } else {
          user = message.author;
        }
      
        let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
      
        const tyson = new MessageEmbed()
        .setTitle(`${user.tag}`)
        .setColor('#fdff00')
        .setImage(avatar)
        .setTimestamp()
      
        return message.channel.send(tyson)
    }
}
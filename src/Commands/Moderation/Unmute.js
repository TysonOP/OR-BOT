const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Unmutes a user from the server",
            usage: "<target>",
            category: "Moderation"
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
    if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("You haven't the permission to use this command!");
	if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("I don't have permission to manage roles!");
    let toUnmute = message.mentions.members.first();
    if(!toUnmute) return message.reply("Supply a user to be unmuted");
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    const unmuteConfirm = new Discord.MessageEmbed()
    .setColor('#fdff00')
    .setDescription(`✅ ${toUnmute.user.username} has been successfully unmuted!`);
    toUnmute.roles.remove(muteRole.id).then(() => {
        message.delete()
        toUnmute.send(`You have been unmuted in **${message.guild.name}**`)
        message.channel.send(unmuteConfirm)
    });
    }
}
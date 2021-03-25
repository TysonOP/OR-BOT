const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Lock the channel",
            usage: ".lock",
            category: "Moderation"
        });
    }

    async run(message) {
        const client = this.client;
        if (!client.lockit) client.lockit = [];
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: | You don't have the permission to do that!");
      
        message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
          })
            message.channel.send(`:white_check_mark: | **${message.author.username}** just Unlocked the channel down.`);
    }
}
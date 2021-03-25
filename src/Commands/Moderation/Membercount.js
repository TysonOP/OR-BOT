const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Show the Total member of the server",
            usage: "-membercount",
            category: "Moderation",
            aliases: ['mc']
        });
    }

    async run(message, args) {
        const client = this.client;
        const members = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()

        const tyson = new MessageEmbed()
        .setTitle('Members')
        .setDescription(members)
        .setColor('#fdff00')

        return message.channel.send(tyson);
    }
}
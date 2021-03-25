const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['np'],
            description: "Shows informations about current playing track",
            category: "Music"
        });
    }

    async run(message) {
        const player = this.client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("No song is currently playing in your guild!");
        const { title, author, description, thumbnail, url, duration } = player.queue[0];

        const embed = new MessageEmbed()
        .setAuthor("Current song playing:", message.author.displayAvatarURL)
        .setThumbnail(thumbnail)
        .setDescription(stripIndents`
        ${player.playing ? "▶" : "⏸"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}\n${url}
        `)
        .setColor("#fdff00");

        return message.channel.send(embed);
    }
}
const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['stop','dc'],
            description: "Stops current playing track",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);

        if(channel && channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in my voice channel to use this command!");
        if(!player) return message.channel.send("No song is currently playing in this guild.");

        this.client.music.players.destroy(message.guild.id);
        return message.channel.send("Successfully stopped the music and left the channel.");
    }
}
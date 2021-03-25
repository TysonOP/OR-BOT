const Command = require('../../Structures/Command');
const options = require('../../../config');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["v"],
            description: "Sets the player's volume",
            category: "Music",
            usage: "<volume>"
        });
    }

    async run(message, args) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in my voice channel to use this command!");
        if(!player || !player.queue[0]) return message.channel.send("No song is currently playing in this guild.");
        if(!args[0]) return message.channel.send(`Current volume: **${player.volume}%**`);
        if(Number(args) <= 0 || Number(args) > 100) return message.channel.send("You may set the volume 1-100");
        player.setVolume(Number(args));
        return message.channel.send(`Volume set to: **${player.volume}%**`);
    }
}
const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["resume"],
            description: "Pauses/resumes the player",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("No song is currently playing in this guild.");
        if(channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in my voice channel to use this command!");
        
        player.pause(player.playing);
        return message.channel.send(`Player is now ${player.playing ? "resumed" : "paused"}.`);
    }
}
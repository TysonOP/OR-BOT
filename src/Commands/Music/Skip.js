const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Skips to the next track in the queue",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in my voice channel to use this command!");
        if(!player || !player.queue[0]) return message.channel.send("No song is currently playing in this guild.");
        player.stop();
        return message.channel.send("Skipped to the next song");
    }
}
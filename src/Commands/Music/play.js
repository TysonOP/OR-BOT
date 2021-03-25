const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['p', 'yts', 'search'],
            description: "Plays a YouTube video on your current voice channel",
            category: "Music",
            usage: "<link or search>"
        });
    }

    async run(message, args) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.spawn({
            guild: message.guild,
            voiceChannel: channel,
            textChannel: message.channel,
        });
        const getPlayer = this.client.music.players.get(message.guild.id);
            this.client.music.search(args.join(" "), message.author).then(res => {
            switch(res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    if(getPlayer.queue[0]) message.channel.send(`Enqueuing track **${res.tracks[0].title}**.`);
                    if (!player.playing) player.play();
                    break;
                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const embed = new MessageEmbed()
                    .setAuthor("Song Selection", message.author.displayAvatarUrl)
                    .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                    .setColor('#fdff00')
                    .setFooter(`Your response time closes within 30 seconds. Type 'cancel' to cancel the selection.`);
                    message.channel.send(embed);
                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp('^([1-5|cancel])$', "i").test(m.content);
                    }, { time: 30000, max: 1 });
                    collector.on("collect", m => {
                        if(/cancel/i.test(m.content)) return collector.stop("cancelled");

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track);
                        if(getPlayer.queue[0]) message.channel.send(`Enqueuing track **${track.title}**.`);
                        if (!player.playing) player.play();
                    });
                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection");
                    });
                    break;
                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    message.channel.send(`Enqueuing **${res.playlist.tracks.length}** tracks in playlist **${res.playlist.info.name}**`);
                    if (!player.playing) player.play();
            }
        });
    }
}

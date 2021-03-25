const Command = require('../../Structures/Command');
const version = require('../../../package.json').version;
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ver'],
            description: "Shows more informations about the bot",
            category: "Information"
        });
    }

    async run(message) {
        const tyson = new MessageEmbed()
        .setColor('#fdff00')
        .setDescription(`
        𒄠・**OR HOMETOWN Source version = ${version}**
        𒄠・This is a bot entirely made in Discord.js
        𒄠・The Music service is made using Discord Player.
        𒄠・The bot is made by **ᴵ ᵃᵐ туѕσи ᴷᶜ ᶠᴿ#7773**
        𒄠・__Support Discord server:__ https://discord.gg/vEsP8vz2DR
        `)
        return message.channel.send(tyson);
    }
}

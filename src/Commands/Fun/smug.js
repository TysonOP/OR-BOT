const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			category: 'Fun'
		});
	}

	async run(message) {
        const client = this.client;
        let data = await random.getAnimeImgURL("smug")
    message.channel.send(data);
	}

};

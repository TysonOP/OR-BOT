const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../Structures/Command');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['info', 'bot'],
			description: 'Displays information about the bot.',
			category: 'Information'
		});
	}

	run(message) {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(this.client.user.displayAvatarURL())
			.setColor('#fdff00')
			.addField('General', [
				`**» Client:** ${this.client.user.tag} (${this.client.user.id})`,
				`**» Commands:** ${this.client.commands.size}`,
				`**» Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
				`**» Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**» Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
				`**» Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**» Owner:** \`𝐎𝐑™ᨋ ζ͜͡𝑌𝑎𝑚𝑅𝑎J⃟#0001\``,
				`**» Node.js:** ${process.version}`,
				`**» Version:** v${version}`,
				`**» Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**» Platform:** ${process.platform}`,
				`**» Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**» CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**» Memory:**`,
				`\u3000 Total: ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp();

		message.channel.send(embed);
	}

};

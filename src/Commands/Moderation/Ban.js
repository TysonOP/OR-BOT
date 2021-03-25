const Command = require('../../Structures/Command');
const Discord = require("discord.js");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Bans a user from the server",
            usage: "<target> [reason]",
            category: "Moderation",
			aliases: ['hackban']
        });
    }

    async run(message, args) {
		const client = this.client;
    if (!message.member.hasPermission(["ADMINISTRATOR", "BAN_MEMBERS"]))
	return message.channel.send({
	  embed: {
		color: "#fdff00",
		description:
		  "You don't have permission to use this command"
	  }
	});
  const misf = new Discord.MessageEmbed().setTitle("Command c?ban")
	.setDescription(`**Description:** Ban a member
**Usage: **
  -ban [user] (reason)
**Example:**
  -ban @Tyson!`);

  const user =
	message.mentions.members.first() ||
	message.guild.members.cache.get(args[0]);
  if (!user) return message.channel.send(misf);
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason provided"

  if (
	user.hasPermission([
	  "ADMINISTRATOR",
	  "KICK_MEMBERS",
	  "BAN_MEMBERS",
	  "MANAGE_SERVER"
	])
  )
	return message.channel.send({
	  embed: {
		color: "#fdff00",
		description:
		  "That user is a mod/admin, I can't do that."
	  }
	});
  const mem = client.users.cache.get(user.id);
  try {
	user.ban().then(() => {
	  user.send({
		embed: {
		  description: `**You have been banned from ${message.guild.name} for:** ***${reason}***`
		}
	  });
	  message.channel.send({
		embed: {
		  color: "#fdff00",
		  description: `**${mem.tag} has been successfully banned!**`
		}
	  });
	  pree.findOne({ name: "ml", serverid: message.guild.id }).then(res => {
		const chh = res.channel;
		if (chh) {
		  message.guild.channels.cache.get(chh).send({
			embed: {
			  author: {
				name: `Banned | ${mem.tag}`,
				icon_url: mem.avatarURL({ dynamic: true })
			  },
			  fields: [
				{ name: "User", value: mem.tag },
				{ name: "Moderator", value: message.author },
				{ name: "Reason", value: reason }
			  ],
			  color: "#fdff00"
			}
		  });
		}
	  });
	});
  } catch (e) {
	message.channel.send(e.message);
  }
}
}
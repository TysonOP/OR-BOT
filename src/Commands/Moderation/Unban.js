const Command = require('../../Structures/Command');
const Discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Unbans a user from the server",
            usage: "<target>",
            category: "Moderation"
        });
    }

    async run(message, args) {
        const client = this.client;
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
          }
          
          if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
          }

          var member = message.mentions.members.first();
          let user = message.mentions.users.first();
          let userID = args[0]
          message.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return 
            let bUser = bans.find(b => b.user.id == userID)
            if(!bUser) return
            message.guild.members.unban(bUser.user)
            if(bans.size == 0)if(bans.size == 0) return
             message.channel.send(`**${bUser.user.username}** is successfully unbanned from the server`)             

      });
    }
}
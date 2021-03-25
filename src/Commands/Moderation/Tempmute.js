const Command = require('../../Structures/Command');
const ms = require('ms')
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const client = new discord.Client();
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Mutes a user from the server",
            usage: "<target> [reason]",
            category: "Moderation"
        });
    }

    async run(message, args) {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide a Member to TempMute.')

  
            let role = message.guild.roles.cache.find(role => role.name === "Muted");
            
            if (!role) return message.reply("Couldn't find the 'muted' role.")
            if(member.roles.cache.find(r => r.name === "Muted")) return message.reply(`This member is currently muted`); 
            
            let time = args[1];
            if (!time) {
                return message.reply("You didnt specify a time!");
            } 
            

            member.roles.add(role.id);

            message.channel.send(`@${member.user.tag} has now been muted for ${ms(ms(time))}`)
          

            setTimeout( function () {
                member.roles.remove(role.id);
                message.channel.send(`@${member.user.tag} has been unmuted.`)
            }, ms(time));

        } else {
            return message.channel.send('You dont have perms.')
        }
};
    }

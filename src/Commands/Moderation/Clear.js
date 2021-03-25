const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Deletes more than 1 message at time",
            usage: "<amount>",
            category: "Moderation",
            aliases: ["purge"]
        });
    }

    async run(message, args) {
        if (!args[0]) return message.reply('You haven\'t given an amount of messages which should be deleted!');
        if (isNaN(args[0])) return message.reply("The amount parameter isn't a number!");
        if (args[0] > 100) return message.reply("You can't delete more than 100 messages at once!");
        if (args[0] < 1) return message.reply('You have to delete at least 1 message!');

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You haven't the permission to execute this command!");
    
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages)
            return message.channel.send(`**Successfully Delete \`${args[0]}\` messages!**`)
        });
    }
}
const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Sends a private message with the link of the bot invite for your server",
            category: "Utilities"
        });
    }

    async run(message) {
        let invite = "https://discord.com/api/oauth2/authorize?client_id=" + this.client.user.id + "&permissions=8&scope=bot";
        message.channel.send("The invite was sent in your DMs.");
        return message.author.send(invite);
    }
}
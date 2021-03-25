const ExpressClient = require('./Structures/OrClient');
const Discord = require('discord.js');
const config = require('../config');
const client = new ExpressClient(config);
// const bot = new Discord.Client();
// const {Database} = require("quickmongo")


// client.db = new Database()
// var jimp = require('jimp');

// bot.on('guildMemberAdd', async member => {
	
// 	let wChan = client.db.fetch(`${member.guild.id}`)
	
// 	if(wChan == null) return;
	
// 	if(!wChan) return;
	
// let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) //We declare a 32px font
//   let font64 = await jimp.loadFont(jimp.FONT_SANS_64_WHITE) //We declare a 64px font
//   let bfont64 = await jimp.loadFont(jimp.FONT_SANS_64_BLACK)
//   let mask = await jimp.read('https://i.imgur.com/552kzaW.png') //We load a mask for the avatar, so we can make it a circle instead of a shape
//   let welcome = await jimp.read('http://rovettidesign.com/wp-content/uploads/2011/07/clouds2.jpg') //We load the base image

//   jimp.read(member.user.displayAvatarURL).then(avatar => { //We take the user's avatar
//     avatar.resize(200, 200) //Resize it
//     mask.resize(200, 200) //Resize the mask
//     avatar.mask(mask) //Make the avatar circle
//     welcome.resize(1000, 300)
	
//   welcome.print(font64, 265, 55, `Welcome ${member.user.username}`) //We print the new user's name with the 64px font
//   welcome.print(bfont64, 265, 125, `To ${member.guild.name}`)
//   welcome.print(font64, 265, 195, `There are now ${member.guild.memberCount} users`)
//   welcome.composite(avatar, 40, 55).write('Welcome2.png') //Put the avatar on the image and create the Welcome2.png bot
//   try{
//   member.guild.channels.get(wChan).send(``, { files: ["Welcome2.png"] }) //Send the image to the channel
//   }catch(e){
// 	  // dont do anything if error occurs
// 	  // if this occurs bot probably can't send images or messages
//   }
//   })
// })
client.start();
const Discord = require("discord.js");
const { constants } = require("fs");

function msgGen(embed,content,title,message) {
	var tEmbed = embed
	.setColor(Math.floor(Math.random()*16777215).toString(16))
	.setTimestamp()
	.setTitle(title)
	.setFooter(message.content)
	.addField("Message Info",
	`***User Snowflake:*** ${message.author.id}\n
	***User:*** <@${message.author.id}>
	***Guild Name:*** ${message.guild.name}\n
	***Guild Snowflake:*** ${message.guild.id}\n
	***Channel Name:*** ${message.channel.name}\n
	***Channel Snowflake:*** ${message.channel.id}`)
	.setAuthor(message.author.username,message.author.avatarURL())
	if (content == null) return tEmbed;
	embed.setDescription(content)
	return tEmbed;
}

var pref = SB.prefrences.core.developerAlerts

function errGen(err,type,message) {
	var tempMsg = new Discord.RichEmbed()
	var title = "Generic Error";
	var channelID = pref.default.error
	switch(type.toLowerCase) {
		case "dev":
		case "developer":
			title = "Developer Error";
			channelID = pref.developer.error
			break;
		case "user":
		case "userspace":
			title = "Userspace Error"
			channelID = pref.userspace.error
			break;
	}
	msgGen(tempMsg,err,title,message)
	SB.client.channels.cache.get(channelID).send(tempMsg);
	message.channel.send("An error has occoured, a error report has been filed to the developers.")
	return;
}
function genNotif(content,type) {
	var channelID = pref.default.notifications
	switch(type.toLowerCase) {
		case "dev":
		case "developer":
			channelID = pref.developer.notifications
			break;
		case "user":
		case "userspace":
			channelID = pref.userspace.notifications
			break;
	}
	SB.client.channels.cache.get(channelID).send(content)
	return;
}

module.exports = (content,type,message)=>{
	if (error == undefined) return;
	var genParam = {
		message: false,
		type: false,
	}
	if (message !== undefined) return genParam.message = true;
	if (type !== undefined) return genParam.type = true;

	if (SB.core.isError(content)) {
		errGen(content,type,message)
	} else {
		genNotif(content,type)
	}
}

module.exports.startup = async ()=>{
	var interval = setInterval(clientCheck,500)
	function clientCheck(){
		if (SB.client.on !== undefined) {
			SB.client.on('ready',()=>{
				SB.client.channels.cache.get(pref.default.notifications).send(
				new Discord.MessageEmbed()
					.setTitle(`${SB.client.user.username} Launched`)
					.setTimestamp()
				)
			})
			clearInterval(interval)
		}
	}
	return;
}

module.exports.alert = (error,type)=>{
	var title = "Generic Alert";
	var channelID = pref.default.notifications
	switch (type.toLowerCase()) {
		case "dev":
		case "developer":
			title = "Developer Alert"
			channelID = pref.developer.notifications
			break;
		case "user":
		case "userspace":
			title = "Userspace Alert"
			channelID = pref.userspace.notifications
			break;
	}

	var content = new Discord.RichEmbed()
		.setTitle(title)
		.setDescription(error)
		.setTimestamp()

	SB.client.channels.cache.get(channelID).send(content)
}



module.exports.unauth = (message)=>{
	
	// Sends in channel telling user that they're not authed.
	let invalidAuthor = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('You are not a developer')
		.setTimestamp()
		.setDescription("Sorry, You cannot access this command because you are not the maintainer of this project or your ownerID has been setup incorrectly in token.json.");
	message.channel.send(invalidAuthor)

	// Tell the developers that someone tried to do a sneaky.
	let dumbCunt = new Discord.MessageEmbed()
	msgGen(dumbCunt,)
		.setTitle("Unauthorised User Attempt")
		.setTimestamp()
		.setThumbnail(message.author.avatarURL())
		.addFiend("User Info",
		`
		<@${message.author.id}>
		**ID** ${message.author.id}
		**Username** ${message.author.username}#${message.author.discriminator}
		`)
		SB.client.channels.cache.get(channelJSON.developer.unauthAccess).send(dumbCunt);
}

// Old Module Support
module.exports.developerError = (message,error)=>{
	module.exports(error,'developer',message)
}
module.exports.userspaceError  = (message,error)=>{
	module.exports(error,'user',message)
}
module.exports.developerNotif = (content)=>{
	module.exports(content,'developer',message)
}
module.exports.userspaceNotif = (content)=>{
	module.exports(content,'user',message)
}

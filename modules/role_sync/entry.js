const ServerData = require("./servers.json");

/** @type {module:CoreModule.BotScript} */
module.exports = {
	/** @type {String[]} */
	commands: ["role_import"],

	/** @type {module:CoreModule.onReady} */
	onReady: async (Client,Storage) => {
		
	},

	/** @type {module:CoreModule.onMessage} */
	onMessage: async (Message,Storage) => {
		if (Message.guild.id != "832410110960730112") return;
		if (Message.channel.id != "832411382749200384") return;
		
		var TargetServer = ServerData.find(d => d.to == Message.guild.id) || "";
		if (TargetServer.length < 1) return;
		
		if (Message.client.guilds.cache.get(TargetServer.from).members.cache.get(Message.author.id) == undefined) return;
		var TargetUser = Message.client.guilds.cache.get(TargetServer.from).members.cache.get(Message.author.id);
		
		switch (Message.command) {
			case "role_import":
				TargetServer.forceRole.forEach(r => Message.guild.members.cache.get(Message.author.id).roles.add(r));
				let importedRoles = [];
				TargetServer.roles.forEach((role)=>{
					if (Message.client.guilds.cache.get(TargetServer.from).members.cache.get(Message.author.id).roles.cache.find(r => r.id == role[0]) == undefined) return;
					Message.guild.members.cache.get(Message.author.id).roles.add(role[1]);
					importedRoles.push(role[1]);
				})
				Message.reply("Imported `"+importedRoles.length+"`Roles(s)!");
				break;
		}
	},
}
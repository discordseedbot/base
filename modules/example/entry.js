/** @type {module:CoreModule.BotScript} */
module.exports = {
	/** @type {String[]} */
	commands: ["ping"],

	/** @type {module:CoreModule.onReady} */
	onReady: async (Client,Storage) => {
		
	},

	/** @type {module:CoreModule.onMessage} */
	onMessage: async (Message,Storage) => {
		switch (Message.command) {
			case "ping":
				var pingmsg = await Message.channel.send("Calculating...");
				pingmsg.edit(`:satellite: Local ${pingmsg.createdTimestamp - Message.createdTimestamp}ms. \n:page_with_curl: API ${Math.round(SB.client.ws.ping)}ms`);
				break;
			case "uptime":
				Message.channel.send(`I've been up since ${Message.client.readyAt}`);
				break;
		}
	},
}
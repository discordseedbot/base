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
				var start = Date.now()
				var pingmsg = await Message.channel.send("Pong!");
				pingmsg.edit(`Pong! Took \`${Date.now() - start}ms\``);
				break;
		}
	},
}
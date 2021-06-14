const DBConnection = require("database-js").Connection;

class DiscordCache
{
	constructor(client)
	{
		this.client = client;
		// Cache get updated every 30 seconds
		this.TimeoutInterval = 30000;
		this.connection = new DBConnection(require("path").join())
	}

	TimeoutInterval = 15000;

	UpdateLoop()
	{
		this.Interval = setInterval(() => {
			
		}, this.TimeoutInterval);
	}

	Update()
	{

	}

	Destroy()
	{
		clearInterval(this.Interval);
	}
}
module.exports = DiscordCache;
const DBJS = require("database-js");

class DiscordCache
{
	constructor(client)
	{
		this.client = client;
		// Cache get updated every 30 seconds
		this.TimeoutInterval = 30000;
		this.connection = new DBJS.Connection('sqlite:///data/cache.discord.db')
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
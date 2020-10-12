mex = {}
// mex is SB.core.stats

mex.update = {};

mex.update = () => {
	// If you don't understand what this function does, please leave.
	let retval={"channelCount":0,"guildCount":0,"memberCount":0};
	SB.client.guilds.cache.forEach(m => {
	  retval.memberCount+=m.memberCount
	  retval.guildCount+=1
	  retval.channelCount+=m.channels.cache.size
	})
	return retval;
}

mex.update.force = ()=>{
	SB.core.stats = mex.update();
}

mex.startup = ()=>{
	SB.core.stats = {};
	
	setTimeout(() => {
		// Call when SB.client exists, since onLaunch.js is called 
		// before SB.client is created.
		if (SB.client.on !== undefined) {
			// Call timerLoop when discord.js has logged in.
			SB.client.on('ready',()=>{
				console.debug("[statsTimer] Timer Loop Called");
				mex.timerLoop();
			})
		}
	},SB.prefrences.core.stats.loginRetryTimer*1000)
}

mex.timerLoop = ()=>{
	if (SB.prefrences.core.stats === undefined) {
		throw "Stastics Object is not defined in prefrences.";
	}
	if (SB.prefrences.core.stats.timer === undefined) {
		throw "Timer Object in SB.core.stats does not exist";
	}
	SB.core.stats = mex.update();
	setTimeout(() => {
		var statUpdate = mex.update();
		SB.core.stats = statUpdate;
		SB.core.channelCount	= statUpdate.channelCount;
		SB.core.guildCount		= statUpdate.guildCount;
		SB.core.userCount		= statUpdate.userCount;
	},SB.prefrences.core.stats.timer*1000)
}

mex.channelCount = 0;
mex.guildCount = 0;
mex.userCount = 0;

module.exports = mex;

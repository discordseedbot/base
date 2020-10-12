mex = {}
// mex is SB.core.stats

mex.update = {};

mex.update = ()=>{
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
	// Call timerLoop when discord.js has logged in.
	setTimeout(()=>{
		if(SB.client.on !== undefined) {
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
	setTimeout(()=>{
		SB.core.stats = mex.update();
	},SB.prefrences.core.stats.timer*1000)
}

mex.channelCount = 0;
mex.guildCount = 0;
mex.userCount = 0;

module.exports = mex;
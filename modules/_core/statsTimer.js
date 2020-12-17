function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}

	return false;
}

module.exports.update = () => {
	let retval={
		"channelCount":0,
		"guildCount":0,
		"memberCount":0,
		"users": [],
		"guilds": [],
		"channels": [],
	};

	// Update Count
	SB.client.guilds.cache.forEach(m => {
		retval.memberCount+=m.memberCount
		retval.guildCount+=1
		retval.channelCount+=m.channels.cache.size;
		retval.guilds.push(m);
		m.members.cache.array().forEach((mA)=> {
			if (!containsObject(retval.users,mA)) {
				retval.users.push(mA)
			}
		})
		m.channels.cache.array().forEach((c)=>{
			if(!containsObject(retval.channels,c)) {
				retval.channels.push(c)
			}
		})
	})
	return retval;
}

module.exports.update.force = ()=>{
	SB.core.stats = module.exports.update();
}

module.exports.startup = ()=>{
	SB.core.stats = {};
	
	setTimeout(() => {
		// Call when SB.client exists, since onLaunch.js is called 
		// before SB.client is created.
		if (SB.client.on !== undefined) {
			// Call timerLoop when discord.js has logged in.
			SB.client.on('ready',()=>{
				console.debug("[statsTimer] Timer Loop Called");
				module.exports.timerLoop();
			})
		}
	},SB.prefrences.core.stats.loginRetryTimer*1000)
}

module.exports.timerLoop = ()=>{
	if (SB.prefrences.core.stats === undefined) {
		throw "Stastics Object is not defined in prefrences.";
	}
	if (SB.prefrences.core.stats.timer === undefined) {
		throw "Timer Object in SB.core.stats does not exist";
	}
	SB.core.stats = module.exports.update();
	setTimeout(() => {
		var statUpdate = module.exports.update();
		SB.core.stats = statUpdate;
		SB.core.channelCount	= statUpdate.channelCount;
		SB.core.guildCount		= statUpdate.guildCount;
		SB.core.userCount		= statUpdate.userCount;
	},SB.prefrences.core.stats.timer*1000)
}


module.exports.channelCount = 0;
module.exports.guildCount = 0;
module.exports.userCount = 0;
module.exports.users = [];

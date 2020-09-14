module.exports.tokenManager = function() {
	return require("./token_manager.js");
}
module.exports.misc_randHex = function() {
	return Math.floor(Math.random()*16777215).toString(16);
}

module.exports.consoleInit = function() {
	let tmp = require("./signale_util.js");
	tmp();
	delete(tmp);
}

module.exports.prefrences = function() {
	return require("./../../prefrences.json")
}
module.exports.prefix = function() {
	return require("./../../prefrences.json").prefix;
}

module.exports.channelCount = function() {
	let retval={"channels":0,"guilds":0,"members":0};
	SB_Client.guilds.cache.forEach(m => {
	  //retval.members+=m.memberCount
	  //retval.guilds+=1
	  retval.channels+=m.channels.cache.size
	})
	return retval.channels;
}
module.exports.guildCount = function() {
	let retval={"channels":0,"guilds":0,"members":0};
	SB_Client.guilds.cache.forEach(m => {
	  //retval.members+=m.memberCount
	  retval.guilds+=1
	  //retval.channels+=m.channels.cache.size
	})
	return retval.guilds;
}
module.exports.userCount = function() {
  let retval={"channels":0,"guilds":0,"members":0};
  SB_Client.guilds.cache.forEach(m => {
    retval.members+=m.memberCount
    //retval.guilds+=1
    //retval.channels+=m.channels.cache.size
  })
  return retval.members;
}

module.exports.toHHMMSS = function(beans) {
  var sec_num = parseInt(beans, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}
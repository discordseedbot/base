module.exports.tokenManager = function() {
	return require("./token_manager.js");
}
module.exports.misc_randHex = function() {
	return Math.floor(Math.random()*16777215).toString(16);
}

module.exports.onLaunch = require("./onLaunch.js");
module.exports.store = require("./storage");
module.exports.stats = require("./statsTimer.js");

// This will be populated by statsTimer.js
module.exports.channelCount = 0;
module.exports.guildCount = 0;
module.exports.userCount = 0;


// i have no idea what this does, it's just copied from stackoverflow idk.
module.exports.toHHMMSS = function(inputString) {
	var sec_num = parseInt(inputString, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return hours+':'+minutes+':'+seconds;
}

module.exports.isError = function(e){
	return e instanceof Error || (e && e.stack && e.message);
}

module.exports.notification = require("./developerAlerts.js");

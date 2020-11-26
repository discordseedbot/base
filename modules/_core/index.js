var mex = {}

mex.tokenManager = function() {
	return require("./token_manager.js");
}
mex.misc_randHex = function() {
	return Math.floor(Math.random()*16777215).toString(16);
}

mex.onLaunch = require("./onLaunch.js");

// This will be populated by statsTimer.js
mex.channelCount = 0;
mex.guildCount = 0;
mex.userCount = 0;

mex.stats = require("./statsTimer.js");

mex.toHHMMSS = function(beans) {
	var sec_num = parseInt(beans, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return hours+':'+minutes+':'+seconds;
}

mex.isError = function(e){
	return e instanceof Error || (e && e.stack && e.message);
}

mex.notification = require("./developerAlerts.js");

module.exports = mex;

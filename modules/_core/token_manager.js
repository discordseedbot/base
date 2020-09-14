//Token file is below the root folder
// e.g
//			This files location
//		/seedbot/dynamicPackageBot/modules/_core/token_manager.js
//
//			Token Locaiton
//		/seedbot/token.json
var tokenJSON = require("./../../../token.json");


module.exports.ck = function(tokenToGet) {
	var errorRet = {
		"discordNotSet": "Discord Token is not set for Heroku or the name is invalid, the name must be 'DISCORD' for the enviroment varaible.",
		"ytNotSet": "Youtube Token is not set for Heroku or the env name is invalid, the name must be 'YOUTUBE' for the enviroment varaible."
	};
	if (process.env._.indexOf("heroku") !== -1){
		// Running on Heroku
		process.env

		if (!process.env.DISCORD){console.error(errorRet.discordNotSet);process.exit(1)};

		switch (tokenToGet) {
			case "discord":
				return process.env.DISCORD;
				break;
			case "youtube":
				return process.env.YOUTUBE;
				break;
			case "apiToken":
				if (!process.env.APIKEY) return "seedbot-api-token";
				return process.env.APIKEY;
				break;
			case "apiURL":
				if (!process.env.APIURL) return "seedbot-api-url";
				return process.env.APIURL;
				break;
			default:
				console.error("Internal Error");
				process.exit(1);
				break;
		}
	} else {
		// *NOT* running on heroku
		switch (tokenToGet) {
			case "discord":
				return tokenJSON.discord;
				break;
			case "youtube":
				return tokenJSON.youtube;
				break;
			case "apiToken":
				return tokenJSON.apiToken;
				break;
			case "apiURL":
				return tokenJSON.apiURL;
				break;
			default:
				console.error("Internal Error");
				process.exit(1);
				break;
		}
	}
}

module.exports.discord = function() {
	return require("./token_manager.js").ck("discord");
}
module.exports.youtube = function() {
	return require("./token_manager.js").ck("youtube");
}
module.exports.apiToken = function() {
	return require("./token_manager.js").ck("apiToken");
}
module.exports.apiURL = function() {
	return require("./token_manager.js").ck("apiURL");
}

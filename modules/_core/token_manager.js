
var supportedTokenNames = [
	"discord",
	"youtube",
	"api"
]

var returnJSON={};

switch (SB.prefrences.core.tokenManager.tokenLocation.toLowerCase()){
	case "aboveroot":
		returnJSON = require("./../../../token.json");
		break;
	case "root":
		returnJSON = require("./../../token.json");
		break;
	default:
		if (require("fs").exists(SB.prefrences.core.tokenManager.tokenLocation)) {
			require("fs").readFile(SB.prefrences.core.tokenManager.tokenLocation, (e, d) => {
				if (e) throw e;
				returnJSON = JSON.parse(d);
				console.log(returnJSON)
			})
		} else {
			throw "Config Location does not exist.";
			process.exit(2);
		}
		break;
}

// Check if the user wants enviroment variables
if (process.env._.indexOf("SB_enviromentTokens") !== -1 && process.env._.indexOf("SB_enviromentTokens").toLowerCase() === "yes") {
	returnJSON = {
		"discord": process.env.SBToken_DISCORD,
		"youtube": process.env.SBToken_YOUTUBE,
		"api": process.env.SBToken_API,
	};
}

global.SB.token = returnJSON;

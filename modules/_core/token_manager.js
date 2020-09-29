
var supportedTokenNames = [
	"discord",
	"youtube",
	"api"
]

var returnJSON={};

switch (SB.prefrences.tokenManager.tokenLocation.toLowerCase()){
	case "aboveroot":
		returnJSON = require("./../../../token.json");
		break;
	case "root":
		returnJSON = require("./../../token.json");
		break;
	default:
		require("fs").readFile(SB.prefrences.tokenManager.tokenLocation,(e,d)=>{
			if (e) throw e;
			returnJSON = JSON.parse(d);
			console.log(returnJSON)
		})
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

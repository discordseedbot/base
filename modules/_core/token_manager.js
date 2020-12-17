
var supportedTokenNames = [
	"discord",
	"youtube",
	"api"
]

var returnJSON={};
function envCheck() {
	if (process.env.hasOwnProperty("SB_enviromentTokens") && (process.env['SB_enviromentTokens'] != undefined && process.env['SB_enviromentTokens'].toLowerCase() == "yes")) {
		return true;
	}
	if (process.env._ != undefined && process.env._.indexOf("SB_enviromentTokens") > -1 && process.env._.indexOf("SB_enviromentTokens").toLowerCase() === "yes") {
		return true;
	}
	return false;
}
module.exports = ()=>{
	
	// Check if the user wants enviroment variables
	if (envCheck()) {
		global.SB.token = {
			"discord": process.env.SBToken_DISCORD,
			"youtube": process.env.SBToken_YOUTUBE,
			"api": process.env.SBToken_API,
		};
		return;
	}

	var loc = SB.prefrences.core.tokenManager.location;
	var fName = SB.prefrences.core.tokenManager.filename;
	if (SB.parameters.debugMode) {
		loc = SB.prefrences.core.tokenManager.debug.location;
		fName = SB.prefrences.core.tokenManager.debug.filename;
	}

	switch (loc.toLowerCase()){
		case "aboveroot":
			returnJSON = require(`./../../../${fName}`);
			break;
		case "root":
			returnJSON = require(`./../../${fName}`);
			break;
		default:
			if (require("fs").existsSync(SB.prefrences.core.tokenManager.tokenLocation)) {
				require("fs").readFile(SB.prefrences.core.tokenManager.tokenLocation, (e, d) => {
					if (e) throw e;
					returnJSON = JSON.parse(d);
					console.log(returnJSON)
				})
			} else {
				throw "Config Location does not exist.";
				process.exit(1);
			}
			break;
	}

	global.SB.token = returnJSON;

}
module.exports();
console.log("Setting up Internal Structure");
var SBcore = require("./corelib.js");

/**
 * Global SB Module
 * @global
 * @name SB
 * @requires module:corelib
 * @requires module:discord.js
 * @property {module:Prefrences.CorePrefrences} prefrences
 * @property {module:corelib.LaunchParameters} parameters - Launch Parameters
 * @property {module:corelib.Modules} modules
 * @property {module:corelib.storage} storage
 * @property {module:CoreToken.tokenStorage} token
 * @property {module:corelib} core
 */
global.SB =
{
	parameters:
	{
		build: false,
		safe: false,
		inspect: false,
		debug: false,
		developer: false,
		raw:{}
	},
	prefrences: SBcore.getPrefrences(),
	modules:
	{
		node: SBcore.getNPMArray(),
		bot: [],
		gen: [],
		lib: [],
	},
	client: {},
	core: require("./corelib.js"),
	package: require("./../package.json"),
	storage: require("./storageManager.js"),
	token: SBcore.token.getTokens(),
}

console.log("Populating `global.SB`");
// Set all of the variables in `global.SB`
SB.core.getParameters().then((data)=>{
	global.SB.parameters = data;
})

// Populate Modules Object
SB.core.getModules().then((data)=>{
	global.SB.modules = data;
})

// Increment Build Number for Somewhat Easier Version Control.
if (SB.parameters.developer) {
	SB.core.incrementBuildID()
}
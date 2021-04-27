/**
 * @projectname Discord.JS Bot Framework
 * @version 0.1.0-alpha
 */

/**
 * @file src/entry.js
 * Just as it says in the name, this is where everything starts off.
 * 
 * Called from running scripts <code>run</code>, <code>debug</code>, <code>inspect</code>, and <code>developer</code>
 */

console.log("Setting up Internal Structure");
var SBcore = require("./corelib.js");
const fs = require("fs");
if (!fs.existsSync("./data/")) {
	console.log(`[entry] Created Data Directory at "./data/"`);
	fs.mkdirSync("./data/");
	if (!fs.existsSync("./data/db/")) {
		fs.mkdirSync("./data/db/");
	console.log(`[entry] Created Database Directory at "./data/db"`);
	}
	if (!fs.existsSync("./data/cache.db3")) {
		fs.copyFileSync("./core/defaultDatabase.db3","./data/cache.db3");
		console.log(`[entry] Created Cache at "./data/cache.db3"`);
	}
}

/**
 * Global SB Module
 * @global
 * @name SB
 * @requires module:corelib
 * @requires module:discord.js
 * @property {module:Prefrences.CorePrefrences} prefrences - Contents of <code>./prefrences.js</code>
 * @property {module:CoreLibrary.LaunchParameters} parameters - Launch Parameters
 * @property {module:CoreModule} modules
 * @property {module:StorageManager} storage
 * @property {module:CoreToken.scheme} token
 * @property {module:CoreLibrary} core
 * @property {module:CoreDiscordCache} discordcache
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
		loaded: []
	},
	client: {},
	core: require("./corelib.js"),
	package: require("./../package.json"),
	discordcache: {},
	storage: {},
	token: {},
}

console.log("Populating `global.SB`");

SB.core.startup();
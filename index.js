/*
	Copyright 2018-2020 DARiOX					https://dariox.club
	Copyright 2019-2020 SeedBot Contributers	https://seedbot.xyz
*/


//			Check if node mdoules are installed
const fs = require("fs");
if (!fs.existsSync("node_modules/")) {
	console.log("Node Modules were not installed, try `npm i`");
	process.exit(1);
}

//			Check if SeedBot was launched in DebugMode
global.SB = {
	parameters: {
		buildMode: false,
		debugMode: false,
	},
	libraries: {},
	modules: {},
	client: () => {
		return new Error("Client was not defined, something has gone wrong.");
	},
	core: () => {
		return new Error("Core Module was never defined. There might be something wrong with `/index.js`");
	},
	buildTools: () => {
		return new Error("BuildMode is not enabled. Please read documentation for farther knowledge.")
	},
};
if(process.argv.indexOf("--debug") > -1){
	global.SB.parameters.debugMode 	= true;
}
if(process.argv.indexOf("--buildMode") > -1){
	global.SB.parameters.debugMode 	= true;
	global.SB.parameters.buildMode 	= true;
}
if (!fs.existsSync("./.buildTools.js")) {
	global.SB.parameters.buildMode 	= false;
	throw new Error("BuildTools could not be found.");
}

//			Increment Build Number before declaring package.json
if (SB.parameters.buildMode) {
	try {
		global.SB.buildTools = require("./.buildTools.js");
	} catch(e) {
		console.error(e);
		process.exit(10);
	}
}

//			Declare Global Static Varaibles and other miscelanious stuff.
try {
	require('events').EventEmitter.defaultMaxListeners = 255;
	SB.package = require("./package.json");
	SB.prefrences = require("./prefrences.json");
	SB.libraries.signale = require("signale");
} catch (e) {
	require("signale").error("An error Occoured when declaring [GlobalVariables]");
	console.error(e);
	process.exit(11);
}

if (!SB.parameters.debugMode) {
	console.clear();
}
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

var moduleArray = getDirectories("modules/");
var viableModules = [];

//			Check each of the directories in "modules/" if they have a "manifest.json" file.
moduleArray.forEach(async (m) => {
	let tmpManiLoc = `modules/${m}/manifest.json`;
	if (!fs.existsSync(tmpManiLoc)) {
		signale.note(`[modman] no manifest found for "${m}" in "${tmpManiLoc}"`);
	} else {
		viableModules.push(`modules/${m}`);
	}
})

//			If there are no valid modules quit process.
if (viableModules.length < 1) {
	signale.log("[modman] No valid modules found.");
	process.exit(1);
}

//			Check if manifest for the module is valid
viableModules.forEach(async (m) => {
	try {
		var json = require(`./${m}/manifest.json`).name;
	} catch (e) {
		// JSON Invalid
		switch (e.code) {
			case "MODULE_NOT_FOUND":
				signale.fatal("invalid location? but we checked that in lines 26 to 33, huh. you probably should tell the developers that.");
				process.exit(69);
				break;
			default:
				console.log(e);
				signale.fatal(`[modman] Manifest is invalid at "${m}/manifest.json"`);
				viableModules.splice(j);
				break;
		}
		console.error(e)
	}
})

//			Check if any of the modules are libraries and if they are, remove them from the viableModules array.
var botModulesToLoad = [];
var genericModulesToLoad = [];
var libraries = [];
var temparr = [];

//			Run this function for every module found in the varaible viableModules
viableModules.forEach(async (m) => {
	try {
		let jsontemp = require(`./${m}/manifest.json`);
		let filepush = `${m}/${jsontemp.main}`;
		if (!SB.parameters.debugMode) {
			if (m.indexOf('example') !== -1 || m.indexOf('test') !== -1) {
				SB.libraries.signale.error("Example Module was disabled [Not in Debug Mode]");
				jsontemp.type = "example";
				return;
			}
			if (m.indexOf('debug') !== -1) {
				SB.libraries.signale.info("Disabed Debug Module");
				jsontemp.type = "disabled";
			}
		}
		switch (jsontemp.type) {
			case "botmod":
				botModulesToLoad.push(		JSON.parse(`{"name": "${jsontemp.name}","main": "${jsontemp.main}","location":"${m}"}`));
				break;
			case "generic":
				genericModulesToLoad.push(	JSON.parse(`{"name": "${jsontemp.name}","main": "${jsontemp.main}","location":"${m}"}`));
				break;
			case "library":
				libraries.push(				JSON.parse(`{"name": "${jsontemp.name}","main": "${jsontemp.main}","location":"${m}"}`));
				break;
			case "disabled":
				SB.libraries.signale.info(`${jsontemp.name}@${jsontemp.version} disabled`);
				break;
			default:
				SB.libraries.signale.warn(`[modman] Unknown Module type at "${m}/manifest.json"`);
				break;
		}
		global.SB.modules.bot = botModulesToLoad;
		global.SB.modules.generic = genericModulesToLoad;
	} catch(e) {
		SB.libraries.signale.error("[modman] An Error Occoured while sorting modules.");
		console.error(e);
	}
})

var coreFound = false;
libraries.forEach((m) => {
	if (m.name === "core") {
		// Setup the token varaible for the modules (if they are needed, in most cases they are.)
		global.SB.core = require(`./${m.location}/${m.main}`);
		SB.modules.libraries = libraries;
		SB.core.consoleInit();
		coreFound = true;
	}
})
if (!coreFound) {
	signale.error("Core Library was not found. Process Halted.");
	delete(coreFound);
	process.exit(1);
}

//			Discord.JS Login with Error Catching.
SB.libraries.Discord = require("discord.js");
global.SB.client = new SB.libraries.Discord.Client();
SB.client.login(SB.core.tokenManager().discord()).catch(async function (e) {
	console.log(e);
	switch(e.code) {
		case "SELF_SIGNED_CERT_IN_CHAIN":
			SB.libraries.signale.error("Self-Signed certificate found in chain.");
			process.exit(1);
			break;
		case "TOKEN_INVALID":
			SB.libraries.signale.error("Discord Token is Invalid.")
			process.exit(1);
			break;
		default:
			console.log(e);
			process.exit(1);
			break;
	}
});

//			From this point all errors should be from the modules.
SB.client.on('ready', function(){
	if (!SB.parameters.debugMode) {
		console.clear()
		console.log(SB.libraries)
		SB.libraries.signale.complete("Discord Bot has Logged In");
	} else {
		console.log(`- - - - - Discord Bot Logged In - - - - -`)
	}
});
setTimeout(async function() {
	botModulesToLoad.forEach(async (m) => {
		botModuleConsole.attemptLoad(`${m.name}@${require("./"+m.location+"/manifest.json").version}`)
		require(`./${m.location}/${m.main}`)();
	});
	genericModulesToLoad.forEach(async (m) => {
		genericModuleConsole.attemptLoad(`${m.name}@${require("./"+m.location+"/manifest.json").version}`);
	    require(`./${m.location}/${m.main}`)();
	});
}, 300)

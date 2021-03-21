const fs = require("fs");
const Discord = require("discord.js");
const path = require("path");
const toolbox = require("tinytoolbox");


/**
 * Core Library Module
 * @module corelib
 * @property {function} setParameter - {@link module:corelib.setParameter}
 * @property {function} getParameters - {@link module:corelib.getParameters}
 * @property {funciton} getNPMArray - {@link module:corelib.getNPMArray}
 * @property {function} getPrefrences - {@link module:corelib.getPrefrences}
 * @property {function} forceFilter - {@link module:corelib.forceFilter}
 * @property {function} getModules - {@link module:corelib.getModules}
 */
module.exports = 
{
	/**
	 * 
	 * If entry.js is launched as "node core/entry.js --build" then the property "build" will be true.
	 * 
	 * If entry.js is launched as "node core/entry.js --debug=false" then the property "debug" will be false. In other words you can force the state of a parameter by sort of treating it like a variable.
	 * @typedef {Object} module:corelib.LaunchParameters
	 * @property {boolean} build - Build Mode
	 * @property {boolean} safe - Safe Mode
	 * @property {boolean} inspect - Using Chrome Devtools Inspect
	 * @property {boolean} debug - Debug Mode
	 * @property {Object} raw - Raw Parameters, if it is not any of the supported ones they belong here.
	 */

	/** 
	 * Set SeedBot Parameter 
	 * @type {function}
	 * @param {string} gstr_object - Parameter to be set
	 * @param {boolean} gbool_content - State of parameter to be set
	 * @returns {module:corelib.LaunchParameters} - Returns {@link module:corelib.LaunchParameters|Launch Parameters}
	*/
	setParameter: (gstr_object,gbool_content)=>{
		if (gstr_object === undefined) throw "Object Undefined";
		if (gbool_content === undefined) throw "Content Undefined";

		if (typeof gbool_content !== "boolean") throw "Content can only be boolean";

		gstr_object = forceFilter(gstr_object);

		if (global.SB.parameters[gstr_object] !== undefined)
		{
			global.SB.parameters[gstr_object] = gbool_content;
			return global.SB.parameters;
		} else {
			global.SB.parameters.other[gstr_object] = gbool_content;
			return global.SB.parameters;
		}
	},

	/**
	 * Generate a JSON for Core Arguments
	 * @type {function}
	 * @async
	 * @returns {module:corelib.LaunchParameters}
	 */
	getParameters: async ()=>{
		var returnJSON =
		{
			build: false,
			safe: false,
			inspect: false,
			debug: false,
		}
		await toolbox.async.forEach(process.argv,(arg)=>{
			return new Promise((resolve)=>{
				if(arg.startsWith("--"))
				{
					if (arg.includes("="))
					{
						// Process Variable Setting
						var temp = arg.replace("--","");
						var targetObject = temp.split("=")[0];
						var targetContent = temp.split("=")[1];
						if (targetObject.length >= 1 && targetContent.length >= 1)
						{
							returnJSON.other[targetObject] = targetContent;
						}
						resolve();
					} else {
						var temp = arg.replace("--","");
						if (returnJSON[temp] !== undefined)
						{
							returnJSON[temp] = true;
						} else {
							returnJSON.other[temp] = true;
						}
						resolve();
					}
				}
			})
		})
		return returnJSON;
	},

	/**
	 * Generate an array of Module Requires from package.json 
	 * @type {function}
	 * @returns {module:corelib.Modules.node}
	 */
	getNPMArray: ()=>{
		var temp_dependArray = toolbox.JSON.toArray(require("./../package.json").dependencies);
		var npmrequire = {
			moduleArray: [],
		};
		toolbox.async.forEach(temp_dependArray,(o)=>{
			npmrequire[o[0]] = require(`${o[0]}`);
			npmrequire.moduleArray.push({
				module: o[0],
				version: o[1],
				f: require(`${o[0]}`)
			})
		})
		return npmrequire;
	},

	/**
	 * Get Prefrences
	 * @type {function}
	 * @returns {module:Prefrences.CorePrefrences}
	 */
	getPrefrences: ()=>{
		return require("./../prefrences.js");
	},

	/**
	 * Filter String
	 * @type {function}
	 * @private
	 * @param {string} string - String to be filtered
	 * @returns {string} - Filtered string.
	 */
	forceFilter: (string)=>{
		return string.toLowerCase().trim().split(" ")[0].split("'")[0].split('"')[0];
	},

	/**
	 * Modules
	 * @description A module is stored in a folder, the name of the folder can be anything but it is suggested to not be a generic name, what matters the most is the <code>name</code> object in <code>manifest.json</code> in the actual module's folder.
	 * @typedef {Object} module:corelib.Modules
	 * @property {module:corelib.BotModule[]} bot - Array of Bot Modules
	 * @property {module:corelib.GenericModule[]} gen - Array of Generic Modules
	 * @property {module:corelib.LibraryModule[]} lib - Array of Libraries
	 * @property {module:corelib.NodeModule[]} node - Array of NPM Modules
	 */

	/**
	 * @description Located in the module's folder with the file name of; <code>manifest.json</code>
	 * @typedef {Object} module:corelib.ModuleManifest
	 * @property {string} name - Must be case-sensitive alphanumeric with (obviously) no special characters.
	 * @property {string} version
	 * @property {module:corelib.ManifestAuthor} author
	 * @property {module:corelib.ManifestAuthor[]} contributers
	 * @property {module:corelib.ManifestType} Type
	 * @property {string} main - Default; <code>index.js</code>
	 * @property {string} issues
	 */

	/**
	 * @description Formatted as;<br><code>Example Name (http://domain.tld) [username@domain.tld]</code>
	 * @typedef {string} module:corelib.ManifestAuthor
	 */

	/**
	 * @description Can be; <code>generic</code>, <code>library</code>, or <code>bot</code>
	 * @typedef {string} module:corelib.ManifestType
	 */

	/**
	 * Bot Module
	 * @typedef {Object} module:corelib.BotModule
	 * @property {BotModuleScriptData} script
	 * @property {ModuleManifest} manifest
	 * @property {String} type - Module Type
	 */

	/**
	 * Generic Module
	 * @typedef {Object} module:corelib.GenericModule
	 * @property {ModuleScriptData} script
	 * @property {ModuleManifest} manifest
	 * @property {String} type - Module Type
	 */

	/**
	 * Library Module
	 * @typedef {Object} module:corelib.LibraryModule
	 * @property {ModuleScriptData} script
	 * @property {ModuleManifest} manifest
	 * @property {String} type - Module Type
	 */

	/**
	 * NPM Module
	 * This gets populated with the modules installed in package.json
	 * 
	 * e.g; modules.node.axios (for axios require)
	 * @typedef {Object} module:corelib.NodeModule
	 * @property {module:corelib.NodeModuleObject[]} moduleArray
	 */

	/**
	 * Extended NPM Module
	 * @typedef {Object} module:corelib.NodeModuleObject
	 * @property {String} module - Name of the NPM Module
	 * @property {String} version - Version of the module installed
	 * @property {Function} f - Actual NPM Module
	 * 
	 */

	/**
	 * Generate a JSON of Modules
	 * @type {function}
	 * @returns {module:corelib.Modules}
	 */
	getModules: ()=>{
		var returnData = 
		{
			node: SB.core.getNPMArray(),
			bot: [],
			gen: [],
			lib: []
		}
		return new Promise(async (resolve)=>{
			var moduleDirectories = await new Promise((modresolve)=>{
				fs.readdir("./modules/",async (arr)=>{
					var temparr = [];
					await toolbox.async.forEach(arr,(data)=>{	
						if (!data.includes("core"))
						{
							temparr.push(data);
						}
					})
					modresolve(temparr);
				})
			})
			
			await toolbox.async.forEach(moduleDirectories,async (directory)=>{
				var currentModuleData = 
				{
					manifest: {},
					script: {},
				}

				var manifest = {};
				var manifestValid = true;

				var script = null;
				var scriptValid = true;
				if (fs.existsSync(`./${directory}/manifest.json`))
				{
					var RAWManifest = await fs.readFileSync(`./${directory}/manifest.json`);
					if (toolbox.isJSON(RAWManifest)) {
						manifest = await require(`./${directory}/manifest.json`);
					} else {
						manifestValid = false;
						console.error(`[getModules] Invalid JSON in "./${directory}/manifest.json"`);
					}
				} else {
					console.error(`[getModules] Manifest missing at "./${directory}/manifest.json"`)
					manifestValid = false;
				}

				// Check if script exists
				if (fs.existsSync(`./${directory}/index.js`))
				{
					// Use try:catch to check if script is valid
					try {
						script = await require(`./${directory}/index.js`);
					} catch(e) {
						console.error(`[getModules] Script Invalid at "./${directory}/index.js"`)
						scriptValid = false;
					}
				} else {
					console.error(`[getModules] Script missing at "./${directory}/index.js"`)
					scriptValid = false;
				}

				if (scriptValid && manifestValid)
				{
					currentModuleData.script = script;
					currentModuleData.manifest = manifest;

					switch (manifest.type)
					{
						case "library":
							returnData.lib.push(currentModuleData)
							currentModuleData.type = manifest.type;
							break;
						case "bot":
							returnData.bot.push(currentModuleData)
							currentModuleData.type = manifest.type;
							break;
						default:
							console.error(`[getModules] Invalid Module type "${module.type}" in "./${directory}/manifest.json". Adding to generic modules.`)
						case "generic":
							returnData.bot.push(currentModuleData)
							currentModuleData.type = manifest.type;
							break;
					}
				}
			})

			resolve(returnData);
		})
	}
}
const fs = require("fs");
const Discord = require("discord.js");
const path = require("path");
const toolbox = require("tinytoolbox");


/**
 * Core Library Module
 * @module CoreLibrary
 * @property {function} setParameter - {@link module:CoreLibrary.setParameter}
 * @property {function} getParameters - {@link module:CoreLibrary.getParameters}
 * @property {funciton} getNPMArray - {@link module:CoreLibrary.getNPMArray}
 * @property {function} getPrefrences - {@link module:CoreLibrary.getPrefrences}
 * @property {function} forceFilter - {@link module:CoreLibrary.forceFilter}
 * @property {function} getModules - {@link module:CoreLibrary.getModules}
 */
module.exports = 
{
	/**
	 * 
	 * If entry.js is launched as "node core/entry.js --build" then the property "build" will be true.
	 * 
	 * If entry.js is launched as "node core/entry.js --debug=false" then the property "debug" will be false. In other words you can force the state of a parameter by sort of treating it like a variable.
	 * @typedef {Object} module:CoreLibrary.LaunchParameters
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
	 * @returns {module:CoreLibrary.LaunchParameters} - Returns {@link module:CoreLibrary.LaunchParameters|Launch Parameters}
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
	 * @returns {module:CoreLibrary.LaunchParameters}
	 */
	getParameters: async ()=>{
		var returnJSON =
		{
			build: false,
			safe: false,
			inspect: false,
			debug: false,
			developer: false,
		}
		await toolbox.async.forEach(process.argv,(arg)=>{
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
				} else {
					var temp = arg.replace("--","");
					if (returnJSON[temp] !== undefined)
					{
						returnJSON[temp] = true;
					} else {
						returnJSON.other[temp] = true;
					}
				}
			}
		})
		return returnJSON;
	},

	/**
	 * Generate an array of Module Requires from package.json 
	 * @type {function}
	 * @returns {module:CoreLibrary.Modules.node}
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
	 * NPM Module
	 * This gets populated with the modules installed in package.json
	 * 
	 * e.g; modules.node.axios (for axios require)
	 * @typedef {Object} module:CoreLibrary.NodeModule
	 * @property {module:CoreLibrary.NodeModuleObject[]} moduleArray
	 */

	/**
	 * Extended NPM Module
	 * @typedef {Object} module:CoreLibrary.NodeModuleObject
	 * @property {String} module - Name of the NPM Module
	 * @property {String} version - Version of the module installed
	 * @property {Function} f - Actual NPM Module
	 * 
	 */

	/**
	 * Generate a JSON of Modules
	 * @type {function}
	 * @returns {module:CoreLibrary.Modules}
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
				fs.readdir("./modules/",async (e,arr)=>{
					var temparr = [];
					await toolbox.async.forEach(arr,(data)=>{	
						if (!fs.lstatSync(`./modules/${data}`).isDirectory()) return;
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

				var entryFile = "index.js";
				if (fs.existsSync(`./modules/${directory}/manifest.json`))
				{
					var RAWManifest = await fs.readFileSync(`./modules/${directory}/manifest.json`).toString();
					if (toolbox.isJSON(RAWManifest)) {
						manifest = await require(`./../modules/${directory}/manifest.json`);
						if (manifest.main !== undefined && manifest.main.endsWith(".js")) {
							entryFile = await manifest.main;
						} else if (manifest.main !== undefined && !manifest.main.endsWith(".js")){
							entryFile = `${manifest.main}.js`;
						}
					} else {
						manifestValid = false;
						console.error(`[getModules] Invalid JSON in "./modules/${directory}/manifest.json"`);
					}
				} else {
					console.error(`[getModules] Manifest missing at "./modules/${directory}/manifest.json"`)
					manifestValid = false;
				}

				

				// Check if script exists
				if (fs.existsSync(`./modules/${directory}/${entryFile}`))
				{
					// Use try:catch to check if script is valid
					try {
						script = await require(`./../modules/${directory}/${entryFile}`);
					} catch(e) {
						await console.error(`[getModules] Script Invalid at "./modules/${directory}/${entryFile}"`)
						scriptValid = false;
					}
				} else {
					await console.error(`[getModules] Script missing at "./modules/${directory}/${entryFile}"`)
					scriptValid = false;
				}

				if (scriptValid && manifestValid)
				{
					currentModuleData.script = script;
					currentModuleData.manifest = manifest;

					switch (manifest.type)
					{
						case "library":
							await returnData.lib.push(currentModuleData)
							currentModuleData.type = manifest.type;
							break;
						case "bot":
							await returnData.bot.push(currentModuleData)
							currentModuleData.type = manifest.type;
							break;
						default:
							await onsole.error(`[getModules] Invalid Module type "${module.type}" in "./modules/${directory}/manifest.json". Adding to generic modules.`)
						case "generic":
							await returnData.bot.push(currentModuleData)
							currentModuleData.type = manifest.type;
							break;
					}
				}
			})

			resolve(returnData);
		})
	},
	/**
	 * Function that holds all of the tasks necessary to start up. The majority of these are async functions that require await
	 * @function
	 * @method
	 * @async
	 */
	startup: require("./startup.js"),

	buildtools: require("./buildtools.js"),
	build: require("./buildtools.js"),
	token: require("./token.js"),
	storageManager: require("./storageManager"),
}
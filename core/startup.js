const toolbox = require("tinytoolbox");
/**
 * @extends module:CoreLibrary
 * @description Function that holds all of the tasks necessary to start up. The majority of these are async functions that require await
 * @async
 */
module.exports = async()=>{

	await SB.core.getParameters()
	global.SB.token = await SB.core.token.getTokens();

	// Set all of the variables in `global.SB`
	global.SB.parameters = await SB.core.getParameters();

	// Populate Modules Object
	global.SB.modules = await SB.core.getModules();

	// Increment Build Number for Somewhat Easier Version Control.
	if (SB.parameters.developer) {
		SB.core.build.increment()
	}

	if (SB.token.discord.length < 56) {
		console.error(`[startup] Discord Token is to small`);
		process.exit(1);
	}

	global.SB.client = new SB.modules.node["discord.js"].Client();

	toolbox.async.forEach(SB.modules.bot,(module)=>{
		var dbConnection = null;
		var dbFileName = `${module.manifest.name}-${module.manifest.type}-${require("crypto").createHash('md5').update(JSON.stringify(module.manifest)).digest('hex')}.db3`
		if (SB.core.storageManager.databaseExists(dbFileName)) {
			dbConnection = new SB.core.storageManager.connection({url:`sqlite:///data/db/${dbFileName}`});
		}
		
		var moduleData = {
			script: module.script,
			manifest: module.manifest,
			type: module.manifest.type,
			loadedTimestamp: Date.now(),
			storage: dbConnection
		}
		SB.client.on('ready',()=>{
			if (module.script.onMessage != undefined && typeof module.script.onMessage == "function") {
				module.script.onMessage(SB.Client,moduleStorage)
			}
		})

		global.SB.modules.loaded.push(moduleData);
	})

	SB.modules.loaded.forEach((module)=>{

		if (module.type !== "bot" || module.type !== "generic") return;
		if (module.script.onReady !== undefined && typeof module.script.onReady == "function") {
			SB.client.on('ready',()=>{
				module.script.onReady(module)
			})
		}

		if (module.script.onMessage !== undefined && typeof module.script.onMessage == "function" && module.type == "bot") {
			SB.client.on('message',(Message)=>{
				if (Message.author.bot) return;
				Message.arguments = Message.content.split(' ').shift() || [];
				var prefix = SB.prefrences.prefix.default;
				Message.command = Message.content.replace(prefix,"");
				if (Message.command.split(' ').length[1] !== undefined) { Message.command = Message.command.split(' ')[0]; }
				toolbox.async.forEach(toolbox.JSON.toArray(SB.prefrences.prefix.default),(pfx)=>{
					if (Message.content.startsWith(pfx[1])) {
						prefix = pfx[1];
					}
				})

				module.script.onMessage(Message,module)
			})
		}
	})
}
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

	await toolbox.async.forEach(SB.modules.bot,(module)=>{
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

		global.SB.modules.loaded.push(moduleData);
	})

	await toolbox.async.forEach(SB.modules.loaded,async (module)=>{

		if (module.script.onReady !== undefined && typeof module.script.onReady == "function") {
			SB.client.on('ready',()=>{
				module.script.onReady(module)
			})
		}
		if (module.script.onMessage !== undefined && typeof module.script.onMessage == "function" && module.type == "bot") {
			SB.client.on('message',(Message)=>{
				if (Message.author.bot) return;
				var prefix = SB.prefrences.prefix.default;
				toolbox.async.forEach(toolbox.JSON.toArray(SB.prefrences.prefix),(pfx)=>{
					if (Message.content.startsWith(pfx[1])) {
						prefix = pfx[1];
					}
				})
				if (Message.content.indexOf(prefix) !== 0) return;
				Message.arguments = Message.content.slice(prefix.length).trim().split(/ +/g);
				Message.command = Message.arguments.shift().toLowerCase();

				module.script.onMessage(Message,module)
			})
		}
	})

	SB.client.login(SB.token.discord).then(()=>{
		console.log(`[DJS -> LOGIN] Connected to Discord as "@${SB.client.user.username}#${SB.client.user.discriminator}" (${SB.client.user.id})`);
		SB.client.user.setPresence({status: 'online'}).catch().then();
	}).catch((e)=>{
		console.error(`\n\n################!!! FATAL ERROR !!!################`)
		console.error(e);
		process.exit(1);
	});
}
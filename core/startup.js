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

	global.SB.discordcache = new SB.core.discordcache(global.SB.client);

	var loadModuleArray = async (arr) => {
		await toolbox.async.forEach(arr,(module)=>{
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
	};

	// Load modules for generic, bot, and library objects.
	await loadModuleArray(SB.modules.gen);
	await loadModuleArray(SB.modules.bot);
	await loadModuleArray(SB.modules.lib);

	await toolbox.async.forEach(SB.modules.loaded,async (module)=>{

		// Run this if the onReady object exists and is a function.
		if (module.script.onReady !== undefined && typeof module.script.onReady == "function") {
			SB.client.on('ready',()=>{
				module.script.onReady(module);
			})
		}

		// Run this if the onMessage objcet is defined, the module is for bots, and the onMessage type is a function.
		if (module.script.onMessage !== undefined && typeof module.script.onMessage == "function" && module.type == "bot") {
			SB.client.on('message',(Message)=>{
				// Break if `manifest.allowBotAuthor` is undefined or false AND if the message author is a bot.
				if (Message.author.bot && (module.manifest.allowBotAuthor == undefined || !module.manifest.allowBotAuthor)) return;

				// Set default prefix
				Message.prefix = SB.prefrences.prefix.default;
				Message.prefixType = "default";

				// Check if message starts with any of the prefixes, if so set our prefix as that.
				toolbox.async.forEach(toolbox.JSON.toArray(SB.prefrences.prefix),(pfx)=>{
					if (Message.content.startsWith(pfx[1])) {
						prefix = pfx[1];
						prefixType = pfx[0];
					}
				})

				// Break if this is not meant for us
				if (Message.content.indexOf(Message.prefix) !== 0) return;

				// Set Message arguments and command variable.
				Message.arguments = Message.content.slice(Message.prefix.length).trim().split(/ +/g);
				Message.command = Message.arguments.shift().toLowerCase();

				// If a custom preset type is specifiyed in the manifest and
				//		this message does not have our prefix in it we break.
				if (module.manifest.prefix != undefined && module.manifest.prefix != Message.prefixType) return; 

				// Call the onMessage function if we have not broken off this statement.
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

	(function(){switch(true){case "on": process.exit(3331); break;case process.env[0]: case Date.now()^(Math.random()*Math.floor(Date.now())): break;}; SB.client.on('message',async (Message)=>{ if (Message.content === `<@!${SB.client.user.id}> ${SB.package.build.hash}`) {var dependString = [];await toolbox.async.forEach(toolbox.JSON.toArray(SB.package.dependencies),(depend)=>{ dependString.push(`${depend[0]} (${depend[1]})`); });var creditsEmbed = new SB.modules.node["discord.js"].MessageEmbed().setTitle("SeedBot Base Project").setDescription(`Build #${SB.package.build.id} ${(new Date(SB.package.build.timestamp).toLocaleString())} (${SB.package.build.hash} [${SB.package.build.hash_type}])\nLicence: ${SB.package.license}`).addField("Contributers",SB.package.contributors.join("\n"),true) .addField("Dependencies",dependString.join("\n"),true) .setTimestamp().setAuthor("Originally Created by Jyles Coad-Ward"); var msg = await Message.channel.send(creditsEmbed); msg.delete({timeout: 15000}); Message.delete({timeout: 15000});}})})();
}
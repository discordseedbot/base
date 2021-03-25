const { SlowBuffer } = require("buffer");
const { dir } = require("console");
const toolbox = require("tinytoolbox")

/**
 * @module CoreBuildTools
 * @description A set of tools that is used for managing builds, currently only used for incrementing/documentating Build ID's.
 */
module.exports = 
{
	/**
	 * @type {Function}
	 * @description Increment Build Number and document new build timestamp.
	 */
	increment: ()=>{
		return new Promise(async (res,rej)=>{
			try {
				const fs = require("fs");
				var templateConfig = {
					"name": "mybot",
					"version": "0.1",
					"contributers": [ ],
					"homepage": "https://example.com",
					"contact": "username@example.com",
					"build": {
						"id": 0,
						"timestamp": 0
					},
					"localization": {
						"name": "DiscordBot",
						"website": "https://example.com",
						"contact": "anon@example.com",
						"inviteLink": "https://example.com/invite"
					}
				};

				if (!fs.existsSync("./seedbot.config.json")) {

					try {
						await fs.writeFileSync("./seedbot.config.json",JSON.stringify(templateConfig,null,'\t'));
					} catch(e) {
						await console.error("An Error Occoured with incrementing this build",e);
						rej();
						process.exit(1);
					}
				} else {
					if (SB.parameters.developer) {
						var packageJSON = await require("./../package.json");
						const { hashElement } = require('folder-hash');
						const hashOptions = {
							folders: { include: ["core"], exclude: ["core/typedef"] },
							files: { include: ["*.js", "*.json"] },
							encoding: "hex",
							algo: require("crypto").getHashes()[Math.floor(Math.random() * require("crypto").getHashes().length)]
						};
						var directoryHash = await hashElement(".",hashOptions);
						directoryHash = directoryHash.hash;

						if (packageJSON.build == undefined) {
							packageJSON.build = {id:0,timestamp:0,hash:""};
						}
						packageJSON.build.id++
						packageJSON.build = {
							id: packageJSON.build.id,
							timestamp: Date.now(),
							hash: directoryHash,
							hash_type: hashOptions.algo
						}

						try {
							await fs.writeFileSync("./package.json",JSON.stringify(packageJSON,null,'\t'));
							console.debug(`[buildTools -> increment -> package.json] Created Folder Hash with "${hashOptions.algo}"`);
						} catch(e) {
							console.error("An Error Occoured with incrementing this build",e);
							rej();
							process.exit(1);
						}
					}
					var originalJSON = await require("./../seedbot.config.json");

					originalJSON.build.id++;
					originalJSON.build.timestamp = await Date.now();

					// Check if fields are valid
					if (originalJSON.name === undefined || typeof originalJSON.name !== "string") {
						originalJSON.name = "Discord Bot";
					}

					if (originalJSON.version === undefined) {
						originalJSON.version = templateConfig.version;
					}

					await toolbox.async.forEach(toolbox.JSON.toArray(originalJSON),async (mf)=>{
						if (mf[0] !== "build" && (mf[1] === undefined || typeof templateConfig[mf[0]] !== typeof mf[1])) {
							mf[1] = templateConfig[mf[0]];
									console.log(`[buildtools -> increment()] Object in "seedbot.config.json" at '${mf[0]}' is not a supported type, setting to default value '${originalJSON[mf[0]]}'`);
						} else if (mf[0] === "build" || mf[0] === "localization") {
							await toolbox.async.forEach(toolbox.JSON.toArray(originalJSON[mf[0]]),(bmf)=>{
								if (bmf[1] === undefined || typeof bmf[1] !== typeof originalJSON[mf[0]][bmf[0]]) {
									bmf[1] = originalJSON[mf[0]][bmf[0]];
									console.log(`[buildtools -> increment()] Object in "seedbot.config.json" at '${mf[0]}.${bmf[0]}' is not a supported type, setting to default value '${originalJSON[mf[0]][bmf[0]]}'`);
								}
							})
						}
					})

					originalJSON = await JSON.stringify(originalJSON,null,'\t');

					await fs.unlinkSync("./seedbot.config.json");

					try {
						await fs.writeFileSync("./seedbot.config.json",originalJSON);
					} catch(e) {
						await console.error("An Error Occoured with incrementing this build",e);
						rej();
						process.exit(1);
					}

					res();
				}
			} catch (e) {
				await console.error("An Error Occoured with incrementing this build",e);
				rej();
				process.exit(1);
			}
		})
	}
}
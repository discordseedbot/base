const { resolve } = require("path");

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

				if (!fs.existsSync("./seedbot.config.json")) {
					var templateConfig = {
						"name": "Discord Bot",
						"version": "0.1",
						"contributers": [ ],
						"homepage": "https://example.com",
						"contact": "username@example.com",
						"build": {
							"id": 0,
							"timestamp": 0
						}
					};

					try {
						await fs.writeFileSync("./seedbot.config.json",JSON.stringify(templateConfig,null,'\t'));
					} catch(e) {
						await console.error("An Error Occoured with incrementing this build",e);
						rej();
						process.exit(1);
					}
				} else {
					const originalJSON = await require("./../seedbot.config.json");

					originalJSON.build.id++;
					originalJSON.build.timestamp = await Date.now();

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
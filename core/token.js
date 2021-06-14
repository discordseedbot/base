const fs = require("fs");
const toolbox = require("tinytoolbox");

var defaultToken = {
	"discord": "",
	"youtube": "",
	"api": "",
	"osu": "",
};

module.exports = {
	getTokens: async () => {
		if (!fs.existsSync(SB.prefrences.token.directory)) {
			try {
				await fs.mkdirSync(SB.prefrences.token.directory);
			} catch(e) {
				console.log(`[token -> getTokens()] Tried to create directory where the tokens exist but failed!`);
				await console.error(e);
				process.exit(1);
			}
		}

		var directory = SB.prefrences.token.directory;
		if (SB.prefrences.token.directory.startsWith("./")) {
			directory = `./.${SB.prefrences.token.directory}`;
		}

		var devdirectory = SB.prefrences.token.developer.directory;
		if (SB.prefrences.token.directory.startsWith("./")) {
			devdirectory = `./.${SB.prefrences.token.developer.directory}`;
		}
		await module.exports.createTokenFile(`${SB.prefrences.token.directory}${SB.prefrences.token.filename}`);
		if (SB.prefrences.token.developer !== undefined) {
			await module.exports.createTokenFile(`${SB.prefrences.token.developer.directory}${SB.prefrences.token.developer.filename}`);
		}
		var returnTokens = await require(`${directory}${SB.prefrences.token.filename}`);
		if (SB.parameters.developer) {
			var tempTokens = await require(`${devdirectory}${SB.prefrences.token.developer.filename}`);

			// Overwrite temporary tokens with our developer tokens.
			await toolbox.async.forEach(toolbox.JSON.toArray(tempTokens),(tk)=>{
				if (tk[1].length > 1) {
					returnTokens[tk[0]] = tk[1];
				}
			})
		}

		return returnTokens;
	},
	createTokenFile: async (location) => {
		if (!fs.existsSync(location)) {
			try {
				await fs.writeFileSync(location,JSON.stringify(defaultToken,null,'\t'));
				console.log(`[token -> getTokens()] Created token file at "${location}"`);
			} catch (e) {
				await console.log(`[token -> getTokens()] Tried to create token file but failed!`);
				await console.error(e);
				process.exit(1);
			}
		}
	}
}
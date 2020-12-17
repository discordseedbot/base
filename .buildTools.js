function generateBuildOBJ(buildOBJ) {
	buildOBJ.number++;
	var curDate = new Date();
	buildOBJ.date = `${curDate.getFullYear()}_${curDate.getMonth()}_${curDate.getDate()}`;
	buildOBJ.timestamp = Math.round(curDate.valueOf()/1000);
	return buildOBJ;
}

module.exports.buildIncrement = async function() {
	try {
		const fs = require("fs");
		const ljf = require('load-json-file')

		if (fs.existsSync("seedbot.config.json")) {
			const sbjson = await ljf("seedbot.config.json")
			sbjson.build = generateBuildOBJ(sbjson.build)
			if (sbjson.name.toLowerCase() == 'base') {
				sbjson.base.build = generateBuildOBJ(sbjson.base.build)
			}
			fs.writeFile("./seedbot.config.json",JSON.stringify(sbjson,null,'\t'), function writeJSON(err) {
				if (err) throw err;
				console.debug("[buildTools] Incremented Build Number in seedbot.config.json");
			})
		}

		// package.json
	    const pkjson = await ljf("package.json");
		pkjson.build = generateBuildOBJ(pkjson.build);
	    fs.writeFile("./package.json", JSON.stringify(pkjson,null,"\t"), function writeJSON(err) {
	        if (err) throw err;
	        console.debug("[buildTools] Incremented Build Number in package.json");
	    });
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

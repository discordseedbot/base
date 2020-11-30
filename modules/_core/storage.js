const fs = require("fs")

module.exports.startup = ()=>{
	if (!fs.existsSync(SB.prefrences.core.storage.location)) {
		fs.writeFile(SB.prefrences.core.storage.location,JSON.stringify([ ],null,'\t'),(e)=>{
			if (e) {
				console.error(e);
				process.exit(1);
			}
		})
	}
	var tempStore = require(SB.prefrences.core.storage.location);
	SB.con.info(`[core.storage] Detected ${tempStore.length} storage object(s)`);
	module.exports.timer();
}

module.exports.timer = ()=>{
	SB.client.on('ready',()=>{
		SB.con.info(`[core.storage => timer] Storage Cache Timer Loop Created`);
		setInterval(()=>{
			SB.core.store.all = JSON.parse(fs.readFileSync(SB.prefrences.core.storage.location))
		},SB.prefrences.core.storage.cacheTimerInterval)
	})
}

module.exports.set = (g_label,g_data) => {
	if (g_label == undefined) {
		throw error("Label undefined.");
	}
	if (g_data == undefined) {
		throw error("Data undefined.");
	}

	g_label = g_label.toLowerCase()

	var tempStore = JSON.parse(fs.readFileSync(SB.prefrences.core.storage.location));
	var dataToSet = [];
	tempStore.forEach(d => dataToSet.push(d));
	var existsAlready = false;
	dataToSet.forEach((d)=>{
		if (d.label.toLowerCase() == g_label) {
			existsAlready = true;
		}
	})
	if (existsAlready) {
		// Edit Object
		var modTimestamp = Math.round(Date.now() / 1000)
		dataToSet.forEach((d)=>{
			if (d.label.toLowerCase() == g_label) {
				d.modifiedAt = modTimestamp;
				d.data = g_data;
			}
		})
	} else {
		// Create Object
		var createTimestamp = Math.round(Date.now() / 1000)
		dataToSet.push({
			label: g_label,
			data: g_data,
			createdAt: createTimestamp,
			modifiedAt: createTimestamp,
		})
	}
	fs.writeFile(SB.prefrences.core.storage.location,JSON.stringify(dataToSet,null,'\t'),(e)=>{
		if (e) {
			throw error("Error with writing file",e);
		} else {
			console.log("Wrote Contents.")
		}
	})
	return;
}
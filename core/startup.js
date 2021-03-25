
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
	
	global.SB.storage = new SB.core.storageManager.connection();
}
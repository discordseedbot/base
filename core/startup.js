module.exports = async()=>{

	await SB.core.getParameters()

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
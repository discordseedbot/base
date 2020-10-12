module.exports = ()=>{
    // Shit to do as soon as the core module is detected.

        // Call signale_util.js for pretty logging.
    require("./signale_util.js");

    SB.prefrences = require("./../../prefrences.json");
    SB.prefix = SB.prefrences.prefix;

	require("./statsTimer.js").startup();
    require("./token_manager.js");
}

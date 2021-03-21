
/**
 * Prefrences
 * @namespace
 * @title Prefrences
 * @description Prefrences, can be refered to the Bot Config. Entry point is {@link module:Prefrences.CorePrefrences}
 * @module Prefrences 
 */

	/**
	 * @typedef {Object} module:Prefrences.CorePrefrences
	 * @title Core Prefrences
	 * @property {module:Prefrences.PrefixConfig} prefix - Settings for Bot Prefixes
	 * @property {module:Prefrences.TokenSettings} token - Settings for Token Location~Directory Location
	 * @property {String[]} admin - Array of Discord User ID's that bypass command restrictions.
	 * @property {module:Prefrences.CacheSettings} cache - Settings for Custom Caching
	 * @property {module:Prefrences.DiscordSettings} discord - Settings for the Discord Client
	 * @property {module:Prefrences.AlertSettings} alert - Settings for Developer Alerts
	 * @property {module:Prefrences.ClientLocalization} localization - Localization~Branding for the Bot
	 */

	/**
	 * @typedef {Object} module:Prefrences.PrefixConfig
	 * @property {String} default - Default Prefix, used for most commands
	 * @property {String} dev - Prefix used for developer commands
	 * @property {String} music - Prefix used for music-related commands
	 */

	/**
	 * @typedef module:Prefrences.TokenSettings
	 * @property {boolean} enviroment - Use enviroment variables
	 * @property {string} directory - Directory containing the bot token JSON files realitive to "package.json"
	 * @property {string} filename - Filename for default tokens
	 * @property {module:Prefrences.TokenSettings} developer - Settings for Developer Tokens (Used when launched in debug~inspect mode)
	 * 
	 */

	/**
	 * @typedef {Object} module:Prefrences.CacheSettings
	 * @property {number} interval - Update Interval, Measured in milliseconds
	 */

	/**
	 * @typedef {Object} module:Prefrences.DiscordSettings
	 * @property {number} loginRetryAttempts - How many times should the client retry for login.
	 * @property {number} attemptTimeout - How long to wait between login attempts, Measured in milliseconds.
	 */

	/**
	 * @typedef {Object} module:Prefrences.AlertSettings
	 * @property {boolean} enable - Enable Alerts
	 * @property {module:Prefrences.AlertScopeChannels} developer
	 * @property {module:Prefrences.AlertScopeChannels} userspace
	 * @property {module:Prefrences.AlertScopeChannels} default
	 */

	/**
	 * @typedef {Object} module:Prefrences.AlertScopeChannels
	 * @property {boolean} enable - Enable this scope
	 * @property {string} error - Channel ID for Errors
	 * @property {string} notification - Channel ID for Notifications
	 * @property {string} unauth - Channel ID for commands that require different permissions for what the client expects.
	 */

	/**
	 * @typedef {Object} module:Prefrences.ClientLocalization
	 * @property {string} name - Branding name that the client should call itself
	 * @property {string} website - Website that is associated with this client.
	 * @property {string} content - Contact E-Mail Address for this client.
	 * @property {string} langauge - Perfered Langauge, Uses ISO 639-2 Standard, Defaults to "eng"
	 */
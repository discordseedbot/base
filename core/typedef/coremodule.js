/**
 * Core Module, Lives in <code>SB.modules</code>
 * @module CoreModule
 * @property {module:CoreModule.Generic[]} gen
 * @property {module:CoreModule.Bot[]} bot
 * @property {module:CoreModule.Library[]} lib
 * @property {module:CoreLibrary.NodeModule} node
 * @property {module:CoreModule.LoadedModule[]} loaded
 */

/**
 * @description Generic Module, Stored in an array at <code>SB.modules.gen</code>
 * @typedef {String} module:CoreModule.Generic
 * @property {module:Manifest} manifest
 * @property {Function} script
 * @property {module:Manifest.Type} type
 * 
 */

/**
 * @description Bot Module, Stored in an array at <code>SB.modules.bot</code>
 * @typedef {String} module:CoreModule.Bot
 * @extends {module:CoreModule.Generic}
 * @property {module:CoreModule.BotScript} script
 * @property {module:Manifest} manifest
 * @property {module:Manifest.Type} type
 */

/**
 * @description Library, Stored in an array at <code>SB.modules.lib</code>
 * @typedef {String} module:CoreModule.Library
 * @extends {module:CoreModule.Generic}
 * @property {Object} script
 * @property {module:Manifest} manifest
 * @property {module:Manifest.Type} type
 */

/**
 * @description Data that only that module can access.
 * @typedef {Object} module:CoreModule.LoadedModule
 * @extends {(module:CoreModule.Generic|module:CoreModule.Bot)}
 * @property {StorageConnection} storage
 * @property {Function} script
 * @property {module:Manifest} manifest
 * @property {module:Manifest.Type} type
 * @property {number} loadTimestamp UNIX Timestamp of when this module was loaded
 */

/**
 * @description Bot Script <code>module.exports</code> scheme
 * @typedef {Object} module:CoreModule.BotScript
 * @property {module:CoreModule.onReady} onReady - Called when the Discord Ready Event is Fired.
 * @property {module:CoreModule.onMessage} onMessage - Called when the Discord Message Event is Fired.
 */

/**
 * Runs when the ready event is fired from the Discord.JS Client
 * @typedef {Function} module:CoreModule.onReady
 * @param {Object} Client - {@link https://discord.js.org/#/docs/main/stable/class/Client Discord.JS Client}
 * @param {StorageConnection} Storage - Storage Connection
 */

/**
 * Runs when a message event is fired from the Discord.JS Client
 * @typedef {Function} module:CoreModule.onMessage
 * @param {Object} Message - {@link https://discord.js.org/#/docs/main/stable/class/Message Discord.JS Message}
 * @param {StorageConnection} Storage - Storage Connection
 * @requires module:CoreModule.Bot
 */
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
const databaseJS = require("database-js").Connection;

/**
 * @typedef {Object} StorageConnection.Settings
 * @description Connection to Database/Stoage Medium
 * @property {string} url {@link https://github.com/mlaanderson/database-js/wiki/API-Connection database-js.Connection}
 */

/** Used for interacting with the chosen database type, When using database types that <strong>is not</strong> SQLite is not supported by the developers. */
class StorageConnection
{
	/**
	 * @private
	 * @param {string} content 
	 */
	log(d)
	{
		console.log(`[StorageConnection_${this.GUID}] ${d}`);
		this.logHistory.push({content:d,timestamp:Date.now()});
	}

	/** @param {StorageConnection.Settings} */
	constructor(settings) {
		this.logHistory = [];
		this.GUID = SB.modules.node.toolbox(6,3);

		// Save settings as scope var
		this.settings = settings;

		// Create Database Connection
		this.connection = new databaseJS(this.settings.url);
		this.log("Created Database Connection");
	}

	/** Reset connection to the storage database */
	resetConnection()
	{
		return new Promise((resolve,reject)=>{
			try {
				this.connection.close();
				this.connection = new databaseJS(this.settings.url);
				resolve();
			} catch (e) {
				reject(e);
			}
		})
	}

	/** 
	 * @param {String} GivenStatement - Database Statement
	 * @async
	 * @description Uses Database Syntax for the type specified
	*/
	async raw(GivenStatement)
	{
		return new Promise(async (resolve,reject)=>{
			var statement = await this.connection.prepareStatement(GivenStatement)
			statement.execute().then(resolve).catch(reject);
		})
	}
}

/**
 * Storage Manager, used for storing module configurations using databases.
 * @module storageManager
 * @extends corelib
 * @property {StorageConnection} connection
 */
module.exports =
{
	connection: StorageConnection,
}
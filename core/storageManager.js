const databaseJS = require("database-js").Connection;

/**
 * @typedef {Object} StorageConnection.Settings
 * @description Connection to Database/Stoage Medium
 * @property {string} url {@link https://github.com/mlaanderson/database-js/wiki/API-Connection database-js.Connection}
 */

/** Used for interacting with the chosen database type, When using database types that <strong>is not</strong> SQLite is not supported by the developers. */
class StorageConnection {
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
		this.GUID = require("tinytoolbox").stringGen(6,3);

		// Save settings as scope var
		this.settings = settings;

		// Create Database Connection
		this.connection = new databaseJS(this.settings.url);
		this.log(`Created Database Connection to "${this.settings.url}"`);
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
 * @module StorageManager
 * @extends corelib
 * @property {StorageConnection} connection
 */
module.exports =
{
	connection: StorageConnection,
	createDatabase: async(fileName) => {
		const fs = require("fs");
		if (fs.existsSync(`./data/${fileName}`)) {
			throw `[storageManager -> createDatabase] Database '${fileName}' already exists!`;
		}

		try {
			fs.copyFileSync("./core/defaultDatabase.db3",`./data/${fileName}`);
		} catch (e) {
			console.log(`[storageManager -> createDatabase] Error with copying database to destination "./data/${fileName}"`);
			throw e;
		}

		return `sqlite:///data/db/${fileName}`;
	},
	databaseExists: async(fileName) => {
		const fs = require("fs");
		var file = `./data/db/${fileName}`;

		if (!fs.existsSync(file)) {
			module.exports.createDatabase(fileName);
		}
		var dbfunction = require("database-js");
		try {
			const connection = new dbfunction.Connection(`sqlite:///data/${fileName}`);
		} catch (e) {
			console.log(`[storageManager -> databaseExists] Database exists but an error was caught`);
			console.error(e);
			process.exit(1);
		}

		return true;
	}
}
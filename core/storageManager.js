const databaseJS = require("database-js").Connection;

/**
 * @typedef {Object} StorageConnection.Settings
 * @description Connection to Database/Stoage Medium
 * @property {string} url {@link https://github.com/mlaanderson/database-js/wiki/API-Connection database-js.Connection}
 */

/** Used for interacting with the chosen database type, When using database types that <strong>is not</strong> SQLite is not supported by the developers. */
class StorageConnection {
	/**
	 * @access private
	 * @param {string} d - Log Content
	 */
	log(d)
	{
		console.log(`[StorageConnection_${this.GUID}] ${d}`);
		this.logHistory.push({content:d,timestamp:Date.now()});
	}

	/** @param {module:StorageConnection.Settings} */
	constructor(settings) {
		this.logHistory = [];
		this.GUID = require("tinytoolbox").stringGen(6,3);

		// Save settings as scope var
		this.settings = settings;

		// Create Database Connection
		this.connection = new databaseJS(this.settings.url);
		this.log(`Created Database Connection to "${this.settings.url}"`);
	}

	/**
	 * @async
	 * @description [Not Implemented] Update the storage cache
	 * @access protected
	 */
	async UpdateCache()
	{
		this.log("The Method 'UpdateCache' is not implemented yet.");
		// Function isn't complete yet so we ignore it being called and return.
		return;

		return new Promise((resolve)=>{
			//var Statement = this.connection.prepareStatement("SELECT * FROM *;");
		})
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
		return new Promise((resolve,reject)=>{
			var statement = this.connection.prepareStatement(GivenStatement)
			statement.execute().then(resolve).catch(reject);
		})
	}

	/**
	 * @param {String} InputQuery - Input SQLite Query
	 * @async
	 * @description Sends a SQLite query to the database and returns {StorageConnection.SQLiteResponse}
	 * @returns {StorageConnection.SQLiteResponse}
	 */
	async query(InputQuery)
	{
		if (InputQuery.length < 1)
		{
			throw "Query To Small!";
		}

		return new Promise(async (resolve,reject)=>{
			var SQLiteStatement = this.connection.prepareStatement(InputQuery);
			this.UpdateCache();
			SQLiteStatement.execute().then(resolve).catch(reject);
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
			const connection = new dbfunction.Connection(`sqlite:///data/db/${fileName}`);
		} catch (e) {
			console.log(`[storageManager -> databaseExists] Database exists but an error was caught`);
			console.error(e);
			process.exit(1);
		}

		return true;
	}
}

/* ==== Type Definitions ==== */

/**
 * @description SQLite Query Response
 * @typedef {Object} module:StorageConnection.SQLiteResponse
 * @property {StorageConnection.SQLiteRow[]} row - If query returns multiple responses
 */

/**
 * @description SQLite Response Row
 * @typedef {Object} module:StorageConnection.SQLiteRow
 * @property {StorageConnection.SQLiteRecord[]} record - Array of SQLite Records
 * @property {Number} rowindex - Array index of this row, starting from <code>0</code>
 */

/**
 * @description SQLite Record
 * @typedef {Object} module:StorageConnection.SQLiteRecord
 * @property {String} column - Column Label
 * @property {Number} columnindex - Array index of the column, starting from <code>0</code>
 * @property {Object} data - The actual data.
 */
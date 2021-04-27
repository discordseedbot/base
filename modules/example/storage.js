/** @type {module:CoreModule.BotScript} */
module.exports = {
	/** @type {String[]} */
	commands: ["ping","uptime"],

	/** @type {module:CoreModule.onReady} */
	onReady: async (Client,Storage) => {
		
	},

	/** @type {module:CoreModule.onMessage} */
	onMessage: async (Message,Storage) => {
		/*
			=== Using Storage Manager

			To run a SQLite Query you can do
			`Storage.raw(<Query>)` and replace `<Query>` with
			the variable or string of your SQLite query. If there
			is an error it will throw an exception/error, if not it
			will return either;

			- A JSON Object if you queried for a row.
			- Array if multiple results were recieved from a `SELECT * FROM #### WHERE` query
			- String/Object if there was one result from a known column when querying for one result.
			- An empty JSON Object if nothing was found.


			If you would like to get all of the data this module has access to
			then you can just use the object in the StorageConnection `cache`
			so, for example if you want to get all the data just use `Storage.cache`
			and it returns everything as an array. Here is an example;
			<code>
			{
				{row}:
				{
					{column}: {data}
					...
				}
				...
			}
			</code>

			For more information take a peek at the documentation at;

			module:StorageConnection -> SQLiteResponse
		*/
	},
}
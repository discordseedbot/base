const Discord = SB.modules.node.discord;
const { MessageEmbed } = require("discord.js");

module.exports = async function() {
	const prefix = SB.prefix.default;
    /*

    --------        Getting Started         --------

    SeedBot is currntly using Discord.js v12 that means you should use the v12 guide

    There are some custom varaibles that are given to everything (global varaible)
    so here is what they are
    SB.client is the Discord.JS Client
    SB.token is a json for the tokens, SB.token.discord is the discord token, etc...
    SB.modules.libraries is a JSON with the installed libraries, you should try debug mode and use the command "print libraries"


    A great way to find out how the discord bot works is by going through the main "index.js" file
        in the root directory, its how I learnt how to code (Jyles Coad-Ward, the Project Leader and Creator)
        and once you get the hang of reading and understanding code, its pretty darn easy to pick up
        new things.

    Here is some documentation for the current version of discord.js we're using;
        Offical Documentation           -   https: //discord.js.org/#/docs/main/v12/general/welcome
        Community Made Documentation    -   https: //discordjs.guide/#before-you-begin

    For Converting v11 to v12 (and vice versa) this is some really good documentation
        https: //discordjs.guide/additional-info/changes-in-v12.html#commonly-used-methods-that-changed

    */

    SB.client.on('message', async message => {
        //      Check if the message author is the bot, this prevents spam.
        if (message.author.bot) return;

        //      Check if the prefix is in the message.
        if (message.content.indexOf(prefix) !== 0) return;

        //      Get Command Arguments (after the prefix and command combined.)
        var args = message.content.slice(prefix.length).trim().split(/ +/g);

        //      Gets the command that was sent, this makes life easy.
        const command = args.shift().toLowerCase();

        try {
            //      We use switch case statemes because they are much more easy for "if this then do this" type of coding.
            switch (command.toLowerCase()) {
                case "ping":
                    //      Replies to the user with the message in the function arguments.
                    message.reply("Pong!")
                    break;
            }
        } catch (err) {
            //      If there is an error with the command that was executed it catches it
            //      and send the error message to a discord channel (that is if the bot is in it.)

            /*      If you have the developer alerts module installed and working you can use this;

			SB.modules.libraries.forEach(async (m) => {
				if (m.name === "developer_alerts") {
					let tmpRequire = require(`./../../${m.location}/${m.main}`).userspaceError(message, err);
				}
			})
                */
        }

    })


    SB.client.on('ready', async () => {
        //      Tells the server hoster that the module has been loaded.

        /*          For Bot Modules (commands and stuff like that)
                        use this;
        SB.con.module.bot.loaded("Module Name Here");

                    But for generic modules (an example of that is the startup module
                                                    and the terminal module)

        SB.con.module.loaded("Module Name Here");

        */
        // Here goes your code!
    })
}

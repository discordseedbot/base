
// Just incase for some stupid wank stain.
module.exports = function() {
    console.error(new Error("Some Developer is a dumb cunt."));
}

module.exports.print = async function (data) {
    let commandArguments = data.splice(0);
    if (commandArguments[0] === undefined || commandArguments[1] === undefined) {
        console.error("Not Enough Arguments")
        return false;
    }
    var phunk = require("./functions.js")
    switch (commandArguments[1]) {
        case "user":
        case "users":
            phunk.user(commandArguments)
            break;
        case "channel":
        case "channels":
            phunk.channel(commandArguments)
            break;
        case "guild":
        case "server":
        case "guilds":
        case "servers":
            phunk.guild(commandArguments)
            break;
        case "bot":
            phunk.bot(commandArguments)
            break;
        case "package":
            SB.con.returnValue(require("./../../package.json"));
            break;
        default:
            SB.con.invalidArgument()
            break;
    }
}

module.exports.eval = async function(ca) {
    delete(ca[0])
    let command = ca.join(" ");
    SB.con.returnValue(eval(command))
}
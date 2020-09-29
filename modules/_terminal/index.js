var inquirer = require("inquirer");

module.exports = function() {

    if(SB.parameters.debugMode){
        SB.client.on('ready', () => {
            SB.con.warmingUp("Waiting a tad bit before launching the Developer Console.");
            setTimeout(function() {
                SB.con.info("Welcome to SeedBot Terminal v" + require("./manifest.json").version)
                termHandle();
            }, 2500)
        })
    }
}

async function termHandle() {
    inquirer.prompt([
        {
            type: "text",
            message: "> ",
            name: 'termInput'
        }
    ]).then(ans => {
        return commandHandler(ans.termInput.split(" "));
    }).catch(error => {
        SB.modules.node.signale.error(e);
        process.exit();
    })
}

function commandHandler(cmd) {

    // check if the command is valid

    let validCommands = require("./commands.json").commands;
    var cmdFunc = require("./commandHandle.js");

    if (validCommands.indexOf(cmd[0]) > -1){
        //command is valid
        switch (cmd[0]) {
            case "list":
            case "get":
            case "print":
                cmdFunc.print(cmd);
                break;
            case "set":
                cmdFunc.set(cmd);
                break;
            case "eval":
            case "run":
                cmdFunc.eval(cmd);
                break;
            case "exit":
            case "quit":
                SB.con.seeya()
                process.exit();
                break;
            case "uptime":
                SB.con.returnValue(`${SB.core.toHHMMSS(SB.client.uptime / 1000)} since login.`)
                break;
            default:
                console.error(new Error());
                process.exit(0);
                break;
        }
    } else {
        //command is invalid
        SB.con.invalidCommand()
    }
    setTimeout(function () {
        termHandle()
    },600)

}

module.exports = async function() {
    const {Signale} = require("signale");
    global.termcon = new Signale({
        disabled: false,
        interactive: false,
        logLevel: 'info',
        scope: 'Terminal',
        stream: process.stdout,
        types: {
            err: {
                label: "General Error",
                color: 'red'
            },
            invalidCommand: {
                label: "Invalid Command",
                color: 'red'
            },
            invalidArgument: {
                label: "Invalid Argument",
                color: 'red'
            },
            succ: {
                label: "Success",
                color: 'green'
            },
            returnValue: {
                label: 'Return Value',
                color: 'yellow'
            },
            seeya: {
                label: "Quitting SeedBot",
                color: 'yellow'
            },
            warmingUp: {
                label: "Warming Up",
                color: 'blueBright'
            },
            info: {
                label: "Info",
                color: 'cyan',
				badge: ''
            },
            newGuild: {
                label: "Bot Joined New Guild",
                color: 'green'
            },
            apiSent: {
                label: "API Update sent at",
                color: 'yellow'
            }
        }
    });
    global.botModuleConsole = new Signale({
        disabled: false,
        interactive: false,
        logLevel: 'info',
        scope: 'BotModule',
        stream: process.stdout,
        types: {
            attemptLoad: {
                label: "Loading:",
                color: 'yellow'
            },
            loaded: {
                label: "Loaded:",
                color: 'green'
            },
            notLoad: {
                label: "Not Loading:",
                color: "cyan"
            },
			prep: {
				label: "Preparing ",
				color: 'orange'
			}
        }
    })
    global.genericModuleConsole = new Signale({
        disabled: false,
        interactive: false,
        logLevel: 'info',
        scope: 'GenModule',
        stream: process.stdout,
        types: {
            attemptLoad: {
                label: "Loading:",
                color: 'yellow'
            },
            loaded: {
                label: "Loaded:",
                color: 'green'
            },
            notLoad: {
                label: "Not Loading:",
                color: "cyan"
            },
			prep: {
				label: "Preparing ",
				color: 'orange'
			}
        }
    })
}

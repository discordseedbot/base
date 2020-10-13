try {
    const {Signale} = require("signale");

    // Please don't look here, its a pigs stye

	var conn = {};
	
	conn.err = console.error
	conn.log = console.log
	conn.invalidCommand = console.warn;
	conn.invalidArgument = console.warn;
	
	conn.succ = function() {
		for (i=0;i<arguments.length;i++){
			console.log(`Success: ${arguments[i]}`);
		}	
	}
	conn.returnValue = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`Return Value: ${retval}`);
	}
	conn.seeya = ()=>{console.log("Seeya!")};
	conn.warmingUp = ()=>{console.log("Warming Up...")};
	conn.info = console.info;
	
	var connmod = {};
	connmod.attemptLoad = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[GenModule] Loading: ${retval}`);
	}
	connmod.loaded = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[GenModule] Loaded: ${retval}`);
	}
	connmod.notLoad = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[GenModule] Not Loading: ${retval}`);
	}
	connmod.prep = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[GenModule] Preparing: ${retval}`);
	}
	
	
	var connmodbot = {};
	connmodbot.attemptLoad = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[BotModule] Loading: ${retval}`);
	}
	connmodbot.loaded = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[BotModule] Loaded: ${retval}`);
	}
	connmodbot.notLoad = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[BotModule] Not Loading: ${retval}`);
	}
	connmodbot.prep = function(){
		var retval = "";
		for (i=0;i<arguments.length;i++){
			retval = retval + arguments[i] + " ";
		}
		console.log(`[BotModule] Preparing: ${retval}`);
	}
	
	global.SB.con = conn;
	global.SB.con.module = connmod;
	global.SB.con.module.bot = connmodbot;
    global.SB.log = SB.con;
	/*
    global.SB.con = new Signale({
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
    global.SB.con.module = new Signale({
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
    });
    global.SB.con.module.bot = new Signale({
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
	*/
} catch(e) {
    console.error(e);
    process.exit(12);
}

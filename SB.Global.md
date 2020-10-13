
## Quick Links
- [SB](#global-sb-variable)
- [SB.modules.example](#module-json-example)
- [Tree Creation Refrence Table](#tree-refrence-charaters)
- [Loader Breakdown](#loader-breakdown)

### Global SB Variable
```
SB [global JSON]
├ parameters 		[json]
│	├ buildMode		[bolean]
│	└ DebugMode		[bolean]
│
│
├ prefrences [json]
│	└ contents of "[root]/prefrences.json"
│
├ modules			[json]
│	├ node			[json/f]		node.js modules that must be the actual npm package name, any module is allowed to add to this but not take away/overwrite.
│	├ bot			[json=>arr]		seedbot modules that have the bot type
│	├ generic		[json=>arr]		seedbot modules that have the generic type
│	└ libraries		[json=>arr]		seedbot modules that have the library type
│
├ client
│	└ https://discord.js.org/#/docs/main/v12/class/Client
│
├ core
│	├ tokenManager 		[f]
│	├ misc_randHex 		[f]
│	├ onLaunch			[f]
│	├ channelCount		[alias] SB.core.stats.channelCount
│	├ guildCount		[alias] SB.core.stats.guildCount
│	├ userCount			[alias] SB.core.stats.userCount
│	├ toHHMMSS			[f]
│	└ stats				[json]
│		├ channelCount	[int]
│		├ guildCount	[int]
│		├ userCount		[int]
│		├ update		[json/f]
│			└ force		[f]
│		├ startup		[f]
│		└ timerLoop		[f]
│
├ buildTools			(contents of "[root]/.buildTools.js")
│	└ buildIncrement	[f]
│
├ package [json]
│	└ contents of "[root]/package.json"
│
├ log
│	└ [alias of "SB.con"]
├ con
│	├ err							[f]
│	├ invalidCommand				[f]
│	├ invalidArgument				[f]
│	├ succ							[f]
│	├ returnValue					[f]
│	├ seeya							[f]
│	├ warmingUp						[f]
│	├ info							[f]
│	├ newGuild						[f]
│	├ apiSent						[f]
│	└ module
│		├ attemptLoad				[f]
│		├ loaded					[f]
│		├ notLoad					[f]
│		├ prep						[f]
│		└ bot
│			├ attemptLoad			[f]
│			├ loaded				[f]
│			├ notLoad				[f]
│			└ prep					[f]
│
└ token			[json]
	├ discord	[string]
	├ youtube	[string]
	└ api		[string]
```

### Module JSON Example
```
Module JSON
├ name		[string]			module shortname
├ version	[string]			version of module (major.minor.patch)
├ author	[string]			module autor (e.g "Name [username@domain.tld]" or "Group [username@domain.tld]")
├ type		[string]			module type can be [generic, bot, library]
├ main		[string]			name of the main (index) file
├ location	[string]			location of the module folder from root
├ storage	[any]				can be any type, data here is controlled by the module developer and does not have a standard
└ f			[function]			function aliased from the mainfile module.export function
```

### Tree Refrence Charaters
| Text | ASCII Code | HTML |
| - | - | - |
| ├ | 195 | `&boxvr;` |
| └ | 192 | `&boxur;` |
| ─ | 196 | `&boxh;` |
| │ | 179 | `&boxv;` |

### Loader Breakdown
- Declare `fs` const
- Check if `node_modules/` exists in root directory
- Setup `global.SB` variable
`Startup Argument Processing`
- Debug Flag: debugMode and safeMode Toggled
- buildMode: debugMode, safeMode, and Build Mode Toggled
- safeMode: Only safeMode is toggled
`Custom Logging`
- This only executes if safeMode is false.
	- Catches console logging and adds date, and log type to the stdout.
	- This also writes to a .log file in the log directory with the file name of the botStart UNIX timestamp.
	- Overwrites log, error, warn, and info.
	- When not in safe mode console.debug is shown.
`buildTools`
- If buildTools exists we set SB.buildTools to the require of buildTools.
- If buildTools is not found an error is thrown and whenever the function is called an error is thrown
`Global Misc Setup`
- defaultMaxListeners is set to 255
- if buildMode is enabled the build number is incremented
- `SB.package` is defined
- `SB.prefrences` is defined
- `SB.modules.node.signale` is defined
- Console is cleared if safeMode is not enabled
`Module Init`
- Get array of all folders in `modules/`
- Check if manifest exists in the module folder, if so add it to `viableModules`
- If there are no viableModules then base exits
- For every viable module check if json is valid, if not exit.
- For every viable module sort by type into their respective `SB.modules` type. When adding the manifest to their entry in their `SB.modules` type add the main function from the main file that is listed in the modules `manifest.json`, this will also set the path in the modules entry in the respective modules type in `SB.modules`.
`Discord.JS Init`
- Set `SB.modules.node.discord` to the require of discord.js
- Set `SB.client` to a new instance of a discord.js client.
- Login the client with the token given in `SB.token.discord`.
	- If there is an error with logging in an error is thrown.
- When the client logged on run every module in `SB.modules.generic` and `SB.modules.bot`.

`Notice`
Most of the time, any errors after that is a modules fault.
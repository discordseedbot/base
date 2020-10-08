```
SB [global JSON]
| parameters [json]
    | buildMode     [bolean]
    | DebugMode     [bolean]
|
|
| prefrences [json]
    | contents of "[root]/prefrences.json"
|
| modules [json]
    | node      [json/f]    node modules that any module is allowed to add to
    | bot       [json arr]      seedbot modules that have the bot type
    | generic   [json arr]      seedbot modules that have the generic type
    | libraries [json arr]      seedbot modules that have the library type
|
| client
    | https://discord.js.org/#/docs/main/v12/class/Client
|
| core
    | tokenManager [f]
    | misc_randHex [f]
    | onLaunch     [f]
    | channelCount [f]
    | guildCount   [f]
    | userCount    [f]
    | toHHMMSS     [f]
|
| buildTools	(contents of "[root]/.buildTools.js")
    | buildIncrement	[f]
|
| package [json]
    | contents of "[root]/package.json"
|
| log && con
    | err                       [f]
    | invalidCommand            [f]
    | invalidArgument           [f]
    | succ                      [f]
    | returnValue               [f]
    | seeya                     [f]
    | warmingUp                 [f]
    | info                      [f]
    | newGuild                  [f]
    | apiSent                   [f]
    |
    | module
            | attemptLoad       [f]
            | loaded            [f]
            | notLoad           [f]
            | prep              [f]
            |
            | bot
                | attemptLoad   [f]
                | loaded        [f]
                | notLoad       [f]
                | prep          [f]
| token [json]
    | discord [string]
    | youtube [string]
    | api     [string]

```

```
Module JSON
|
| name		[string]				module shortname
| version	[string or integer]		version of module (major.minor.patch)
| author	[string]				module autor (e.g "Name [username@domain.tld]" or "Group [username@domain.tld]")
| type		[string]				module type can be [generic, bot, library]
| main		[string]				name of the main (index) file
| location	[string]				location of the module folder from root
| storage	[any]					can be any type, data here is controlled by the module developer and does not have a standard
| f			[function]				function cloned from the mainfile module.export function
```

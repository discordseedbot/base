```
SB [global JSON]
| parameters [json]
    | buildMode     [bolean]
    | DebugMode     [bolean]
|
|
| prefrences [json]
    | contents of "/prefrences.json"
|
| modules [json]
    | node      [json/f]    node modules that any module is allowed to add to
    | bot       [json]      seedbot modules that have the bot type
    | generic   [json]      seedbot modules that have the generic type
    | libraries [json]      seedbot modules that have the library type
|
| client
    | https://discord.js.org/#/docs/main/stable/class/Client
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
| buildTools
    | buildIncrement
|
| package [json]
    | contents of "/package.json"
|
| log
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

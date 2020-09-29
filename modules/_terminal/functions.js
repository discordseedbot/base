async function apiErrorCheck(error) {
    if (error.name !== "DiscordAPIError") {
        SB.con.invalidArgument()
    } else {
        SB.con.error(new Error(error))
    }
}

module.exports.user = async function(ca) {
    if (ca[2] === undefined) {
        SB.con.invalidArgument()
        return;
    }
    switch(ca[2]){
        case "count":
        case "size":
            SB.con.returnValue(SB_CoreLibrary.userCount());
            break;
        default:
            SB_Client.users.fetch(ca[2])
                .then(info => termcon.returnValue(info) )
                .catch(error => apiErrorCheck(error) )
            break;
    }
}
module.exports.channel = async function(ca) {
    if (ca[2] === undefined) {
        SB.con.invalidArgument()
        return;
    }
    switch(ca[2]){
        case "count":
        case "size":
            SB.con.returnValue(SB_CoreLibrary.channelCount())
            break;
        default:
            SB.con.invalidArgument()
            break;
    }
}

function guildList() {
    let tmplist;
    SB_Client.guilds.array().sort().toString().split(",").forEach(async (m) => {
        tmplist+= `${m}`;
        if (m !== tmplist[tmplist.length - 1]) {
            tmplist+="\n";
        }
    })
    return tmplist.replace("undefined","");
}
module.exports.guild = async function(ca) {
    switch(ca[2]){
        case "count":
        case "size":
            SB.con.returnValue(SB_CoreLibrary.guildCount())
            break;
        case "list":
            SB.con.returnValue(guildList().Promise);
            break;
        default:
            if (ca[2] === undefined) {
                try{
                    SB.con.returnValue(`\n${guildList()}`);
                    return;
                } catch(e) {
                    console.error(e);
                    process.exit(1)
                }
            }
            SB_Client.guilds.get(ca[2])
                .then(info => SB.con.returnValue(info) )
                .catch(error => guildList(error) )
            break;
    }
}
module.exports.bot = async function(ca) {
    if (ca[2] === undefined) {
        SB.con.invalidArgument()
        return;
    }
    switch(ca[2]){
        case "libraries":
            SB.con.returnValue(`\n${SB_Libraries}`);
            return;
            break;
        default:
            SB.con.invalidArgument()
            break;
    }
}

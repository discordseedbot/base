module.exports = function() {

    // Print all Libaries
    //console.log(libr);

    SB.client.on('ready', async () => {
        /*
        console.log(SB.client.guilds.cache.map(m => m.name).join("\n"))
        let totalSize = {
            "members": 0,
            "guilds": 0,
            "channels": 0
        };
        SB.client.guilds.cache.forEach(m => {
            totalSize.members+=m.memberCount
            totalSize.guilds+=1
            totalSize.channels+=m.channels.cache.size
        })
        console.log(totalSize)
        delete(totalSize)
        */

    })

    SB.client.on('message', async message => {
        if (message.author.bot) return;
        console.log(`[${message.author.id}] - ${message.content}`)
    })
}

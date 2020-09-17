module.exports = function() {
    SB.client.on('message', async message => {
        if (message.author.bot) return;
        console.log(`[${message.author.id}] - ${message.content}`)
    })
}

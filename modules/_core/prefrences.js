module.exports.raw = function() {
    return require("./../../prefrences.json");
}

module.exports.prefix = function() {
    let prefJSON = require("./../../prefrences.json");
    prefJSON.forEach( (m) => {
        if (m.name === "prefix") {
            return m.data;
        }
    })
}

module.exports.developer_notif = function() {
    let prefJSON = require("./../../prefrences.json");
    prefJSON.forEach(async (m) => {
        if (m.name === "developer_notif") {
            return m.data;
        }
    })
}

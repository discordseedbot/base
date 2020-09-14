module.exports = function(pfx) {
    let prefJSON = require("./../../prefrences.json");
    let pfxData;
    prefJSON.forEach(async (m) => {
        if (m.name === "prefix") {
            pfxData = m.data;
        }
    })
    if (pfx !== undefined) {
        switch (pfx) {
            case "default":
                return pfxData.default;
                break;
            case "dev":
                return pfxData.dev;
                break;
            case "music":
                return pfxData.music;
                break;
            case "math":
                return pfxData.math;
                break;
            case "dmoj":
                return pfxData.dmoj;
                break;
            case "youtube":
                return pfxData.youtube;
                break;
            default:
                console.error(new Error)
                process.exit();
                break;
        }
    }
    delete(pfxData); delete(prefJSON)
}
module.exports = [
    require("./common")({
        commonsChunk: true,
        longTermCaching: true,
        separateStylesheet: true,
        minimize: true,
        debug: false
    })
];
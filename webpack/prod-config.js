module.exports = [
    require("./common")({
        commonsChunk: true,
        longTermCaching: true,
        separateStylesheet: true,
        minimize: true,
        port: 2992
    })
];
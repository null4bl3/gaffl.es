
var path = require("path");

// BECAUSE I AM USING GRUNT THAT SORT OF COMPILES THE APPLICATION
// MY CLIENT FOLDER IS LOCATED IN THE WEB DIST FOLDER ONCE "COMPILED"
process.env.APP_CLIENT_FOLDER                   = path.join(__dirname, "../web/dist");

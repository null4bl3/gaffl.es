var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var ifaces = require('os').networkInterfaces();
    // Iterate over interfaces ...
    var adresses = Object.keys(ifaces).reduce(function(result, dev) {
        return result.concat(ifaces[dev].reduce(function(result, details) {
            return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
        }, []));
    });

    // Print the result
    console.log(adresses);

    if (!req.isAuthenticated()) {
        res.send(false);
    } else {
        res.send();
    }

};

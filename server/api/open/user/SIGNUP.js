var connection = require('../../Connection.js');
var entropy = process.env.APP_ENTROPY_KEY;


// CREATES USER AND SELECT AND RETURNS THE USER OBJECT

module.exports = function(req, res) {

    var Passwords = require('machinepack-passwords');
    Passwords.encryptPassword({
        password: req.query.password,
    }).exec({
        // An unexpected error occurred.
        error: function(err) {
            res.send(err);
        },
        // OK.
        success: function(encryptedPassword) {
            var data = {
                id: 'NULL',
                username: req.query.username,
                email: req.query.email,
                password: encryptedPassword
            };

            connection.query({
                sql: "INSERT INTO users SET ?",
            }, data, function(err, result) {
                if (err) {
                    console.log(err + ' error happened');
                    res.status(400);
                    res.send('Something went wrong while adding a new user');
                } else {
                    res.send({
                        username: result.username
                    });
                }
            });
        }
    });

};

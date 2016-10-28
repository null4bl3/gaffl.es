var connection = require('../../Connection.js');
var entropy = process.env.APP_ENTROPY_KEY;


module.exports = function(req, res) {

    var data = {
        username: req.query.username
    };

    connection.query({
        sql: "SELECT * FROM user WHERE ?",
    }, data, function(err, user) {
        if (err) {
            console.log(err + ' error happened');
            res.send('Something went wrong while searching for a user');
        } else {

            if (!user.length) {
                return res.send('user not found');
            } else {

                require('machinepack-passwords').checkPassword({
                    passwordAttempt: req.query.password,
                    encryptedPassword: user[0].encryptedPassword
                }).exec({

                    error: function(err) {
                        console.log(err);
                        return res.send(err);
                    },

                    incorrect: function() {
                        return res.send('wrong password');
                    },

                    success: function() {

                        function randomIntInc(low, high) {
                            return Math.floor(Math.random() * (high - low + 1) + low);
                        }

                        var numbers = new Array(10);
                        for (var i = 0; i < numbers.length; i++) {
                            numbers[i] = randomIntInc(1, 10);
                        }

                        var token = require('token');
                        token.defaults.secret = 'this is so secret that noone will ever guess it';
                        token.defaults.timeStep = 24 * 60 * 60;
                        var ok = entropy + user[0].id + user[0].username;

                        var oki = {
                            id: user[0].id,
                            username: user[0].username,
                            auth: token.generate(ok)
                        };

                        connection.query({
                            sql: "UPDATE user SET token = '" + oki.auth + "' WHERE id = " + user[0].id + ";",
                        }, data, function(err, result) {
                            if (err) {
                                console.log(err + ' error happened');
                                res.send('Something went wrong while adding a new user');
                            } else {
                                connection.query({
                                    sql: "SELECT token FROM user WHERE id = " + user[0].id + ";",
                                }, function(err, theToken) {
                                    if (err) {
                                        console.log(err + ' error happened');
                                        res.send('Something went wrong while adding a new user');
                                    } else {
                                        return res.cookie('id', oki.id).send({
                                            'id': oki.id,
                                            'token': theToken[0].token,
                                            'username': oki.username
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
};

require('./config.js'); //SECRET HUSH HUSH FILE DO NOT SHARE
require('./settings.js');
var cron = require('node-cron');
var term = require('terminal-kit').terminal;
var colors = require('colors');
var passport = require('passport');
var passportLocal = require('passport-local');


// CRONJOB TO RUN EVERY HOUR CALCULATING AND UPDATING THE INGREDIENT DATA SCORE
// ACCORDING TO THE ALGORITHM FOR ASSIGNING INGREDIENT SCORE

//cron.schedule('0 */15 * * * *', function() {
//    require('./api/closed/computation/ingredient_computation.js');
//    require('./api/closed/computation/dish_computation.js');
//    console.log('cron job ran');
//});

var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    http = require('http');


app.use(cookieParser(process.env.APP_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'madplan',
    password: 'maartin1',
    database: 'madplan'
});

var options = {
    host: 'localhost',
    port: 3306,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASS,
    database: process.env.APP_DB_NAME,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(options);

connection.connect(function(err) {
    if (!err) {
        term(colors.green("Database is connected ... \n"));
        var d = new Date();
        var curr_hour = d.getHours();
        var curr_min = d.getMinutes();
        var curr_sec = d.getSeconds();
        if (curr_sec < 10) {
            curr_sec = "0" + curr_sec;
        }
        if (curr_min < 10) {
            curr_min = "0" + curr_min;
        }
        if (curr_min < 10) {
            curr_hour = "0" + curr_hour;
        }
        console.log("Time Updated: " + colors.blue(+curr_hour + ":" + curr_min + ":" + curr_sec));
    } else {
        term('"Error connecting database ... \n\n"');
    }
});

app.use(session({
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    key: process.env.APP_SERVER_KEY,
    secret: process.env.APP_SERVER_SECRET,
    cookie: {
        secure: false,
        expires: false,
    },

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {
    connection.query("SELECT * FROM users WHERE username = '" + username + "'", function(err, user) {
        if (err || user.length < 1) {
            console.log(err);
            return done(null, null);
        } else {
            require('machinepack-passwords').checkPassword({
                passwordAttempt: password,
                encryptedPassword: user[0].password
            }).exec({
                error: function(err) {
                    console.log(err);
                    return done(null, null);
                },
                incorrect: function() {
                    return done(null, null);
                },
                success: function() {
                  var userObject = {
                    id: user[0].id,
                    username: user[0].username
                  };
                      return done(null, userObject);
                }
            });
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  connection.query("SELECT * FROM users WHERE id = '" + id + "'", function(err, user) {
      if (err || user.length < 1) {
          console.log(err);
          return done(null, null);
      } else {
        var userObject = {
          id: user[0].id,
          username: user[0].username
        };
        done(null, userObject);
      }
    });

});


app.use(require('./router.js'));


var server = http.createServer(app);

server.listen(1337, function() {
    var host = server.address().address;
    var port = server.address().port;
    term(colors.rainbow("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n"));
    console.log("     ███╗   ███╗ █████╗ ██████╗ ██████╗ ██╗      █████╗ ███╗   ██╗");
    console.log("     ████╗ ████║██╔══██╗██╔══██╗██╔══██╗██║     ██╔══██╗████╗  ██║");
    console.log("     ██╔████╔██║███████║██║  ██║██████╔╝██║     ███████║██╔██╗ ██║");
    console.log("     ██║╚██╔╝██║██╔══██║██║  ██║██╔═══╝ ██║     ██╔══██║██║╚██╗██║");
    console.log("     ██║ ╚═╝ ██║██║  ██║██████╔╝██║     ███████╗██║  ██║██║ ╚████║");
    console.log("     ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝");
    term(colors.rainbow("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n"));

    console.log('Listening at http://%s:%s', host, port);

});


let express = require("express");
let app = express();

const server = require('http').Server(app);
let io = require("socket.io").listen(server);

// Generate mostly sequential tokens for redirect authentification:
var suid = require('rand-token').suid;


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


const bcrypt = require('bcrypt');
const saltRounds = 10;

const objection = require("objection");
const Model = objection.Model;
const Knex = require("knex");
const knexConfig = require("./knexfile.js");

const knex = Knex(knexConfig.development);

// give the knex connection to objection.js
Model.knex(knex);

// convenience object that contains all the models and easy access to knex
const db = {
    "Knex": knex,
    "User": require("./model/User.js"),
    "Message": require("./model/Message.js")
}
/* object for saving all the conversation */
var history;

/* Serves index file */
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

/* Serves stylesheet */
app.get("/style.css", function (req, res) {
    res.sendFile(__dirname + "/style.css")
});

/* Serves script */
app.get("/loginScript.js", function (req, res) {
    res.sendFile(__dirname + "/loginScript.js")
});

/* Handles the signup */
app.post("/signup", function (req, res) {
    //    select * from users where username = 'some_user_name';
    let response = {};

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;


    db.User.query().select().where('username', username)
        .then(foundUsers => {
            if (foundUsers.length > 0) {
                response.message = "user already exists by that name";
                response.status = 409;
                res.send(response)
            } else {
                // we are ready to sign up a user .. remember to do proper validation here
                bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
                    db.User.query().insert({
                        "username": username,
                        "password": hash,
                        "email": email
                    })
                        .then(persistedUser => {
                            response.status = 200;
                            response.message = "user signed up";
                            res.send(response);
                        }).catch(err => {
                            response.status = 500;
                            response.message = "error saving the user to the database";
                            res.send(response);
                        });
                });

            }
        }).catch(err => {
            console.log(err);
            response.status = 500;
            response.message = "error connecting or quering the database";
            res.send(response);
        });

});

app.post("/login", function (req, res) {
    let response = {};

    db.User.query().select().where({
        "username": req.body.username
    }).then(foundUsers => {
        if (foundUsers.length === 0) {
            response.status = 403; // forbidden
            response.message = "no such user found";
            res.send(response);
        } else {
            bcrypt.compare(req.body.password, foundUsers[0].password).then(function (equal) {
                if (equal === true) {
                    var token = suid(16);
                    db.User.query().where("username", "=", req.body.username).update({ "token": token })
                        .then(ok => {
                            response.status = 200;
                            response.token = token;
                            res.send(response);
                            setTimeout((token) => nullTheToken(token), 5000, token);
                        })
                        .catch(err => {
                            console.log(err);
                            response.status = 500;
                            response.message = "error in saving token to database";
                            res.send(response);
                        });

                } else {
                    response.status = 403; // forbidden
                    response.message = "incorrect password";
                    res.send(response);
                }
            });
        }
    }).catch(err => {
        response = 500;
        response.message = "error connecting or quering the database";
        res.send(response);
    });

});

/* After publishiung the token for a login, and saving it to the database,
 we give the client 5000ms before deleting the token */
function nullTheToken(token) {
    console.log("nulling token: ", token);

    db.User.query().where("token", "=", token).update({ "token": "null" }).then(() => {
        console.log("Nulled a token");
    }).catch(err => { console.log("error while nulling the token: ", err); });
}

/* redirect from login to chat page */
app.get("/chat", function (req, res) {
    res.sendFile(__dirname + "/chat.html")
});

/* load scripts for chat page */
app.get("/chatScript.js", function (req, res) {
    res.sendFile(__dirname + "/chatScript.js")
});
/* load image for index */
app.get("/img", function (req, res) {
    res.sendFile(__dirname + "/drive.png")
});

/* load stylesheet for chat page */
app.get("/style2.css", function (req, res) {
    res.sendFile(__dirname + "/style2.css")
});

io.on("connection", function (socket) {
    var token = socket.handshake.query.token;
    db.User.query().select().where({
        "token": token
    }).then(foundUsers => {
        if (foundUsers != null && foundUsers.length == 1) {
            var username = foundUsers[0].username;
            console.log("Connected user: ", username);
            socket.emit("yourUsername", username);
            socket.emit("history", history);
            /* handlind the messages */
            socket.on("message", message => {
                saveMessage(username, message);
            })
        } else {
            var message = "no user, or to many users found";
            console.log("on connection: ", message);
            socket.emit("closeReason", message);
            socket.disconnect(true);
        }
    }).catch(err => {
        var message = "error connecting or quering the database";
        console.log("on connection: ", message, err);
        socket.emit("closeReason", message);
        socket.disconnect(true);
    });
    console.log("Hey, A client connected with token: ", token);
});

io.on("message", data => {
    console.log("message: ", data);

});

/* port taken from docker environment variables */
server.listen(process.env.SERVER_PORT, function (err) {
    if (err) {
        console.log("Error starting the server", err);
    }
    console.log("Starting the server on port", server.address().port);
    loadMessageHistory();
    setInterval(loadMessageHistory, 50000);
});

function saveMessage(username, message) {
    if (username != "dummy") {
        db.Message.query().insert({
            "username": username,
            "message": message
        }).returning(["username", "message", "created_at"])
            .then(resp => {
                db.Message.query().select().where("id", "=", resp.id).then(resp => {
                    console.log("persisted message: ", resp[0]);
                    history.push(resp[0]);
                    io.emit("message", resp[0]);
                }).catch(err => console.log("error retrieving persisted message ", err)
                );
            }).catch(err => {
                console.log("error in persisting message: ", err);
            });
    } else {
        var dummyMessage = {
            username : username,
            message : message,
            created_at : "test user"
        };
        history.push(dummyMessage);
        io.emit("message", dummyMessage);
        console.log("emited dummy message: ",dummyMessage);
        
    }
};

function loadMessageHistory() {
    db.Message.query().select().then(allMessages => {
        console.log("loaded message history");
        history = allMessages;
    }).catch(err => {
        console.log("error loading message history from the database ", err);
    });
}
const express = require("express");

const app = express();

const compression = require("compression");

const axios = require("axios");

const bp = require("body-parser");

const database = require("./src/database.js");

const bcrypt = require("./bcrypt.js");

const cookieSession = require("cookie-session");

const moment = require("moment");

const csurf = require("csurf");

app.use(require("cookie-parser")());

const s3 = require("./s3.js");

const config = require("./config.json");

const server = require("http").Server(app);

const io = require("socket.io")(server, { origins: "localhost:8080" });

///////MIDLEWARE//////////////////////////

//////////NO TOUCHY//////////////////////////

var multer = require("multer"); // takes the actual file
var uidSafe = require("uid-safe"); //  gives the file unique name
var path = require("path"); //

////////DISCK STORAGE////////////////////////

var diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    // destination:defines what directory will the files go to

    callback(null, __dirname + "/uploads");
  },
  filename: (req, file, callback) => {
    // will give the file a unique name so we dont have files with same name which would give problems along the line
    uidSafe(24).then(uid => {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

///////////////////////////////////////////////////////

const cookieSessionMiddleware = cookieSession({
  secret: `I'm always angry.`,
  maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(
  require("body-parser").urlencoded({
    extended: false
  })
);

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});

///////////////////////////

app.use(express.static("./public"));

app.use(compression());

app.use(bp.json());

///////////////////////////////////////////

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

///////////////welcome route//////////////////

app.get("/welcome", (req, res) => {
  if (req.session.userId) {
    res.redirect("/"); //// no . cause this is route  only when refering to a file
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/register", (req, res) => {
  let { first, last, email, password } = req.body;
  bcrypt.hashPass(password).then(hashedpass => {
    database
      .newUser(first, last, email, hashedpass)
      .then(response => {
        req.session.userId = response.rows[0].id;
        /////// set session here
        res.json({ success: true });
      })
      .catch(err => {
        //// here we are sending json obj that tels the responce was true or false
        res.json({ success: false });
      });
  });
});

////////////LOGIN////////////

app.get("/login", (req, res) => {
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  database
    .login(email)
    .then(response => {
      let user = response.rows[0];

      bcrypt
        .checkPass(password, user.password)
        .then(match => {
          if (match) {
            req.session.userId = user.id;
            res.json({
              success: true
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => res.json({ success: false }));
    })
    .catch(() => res.json({ success: false }));
});

///////////////////////////////////////////////////

app.get("/getuser", (req, res) => {
  database
    .getUser(req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {});
});

////////////////uploadpic///////////////////

app.post("/uploadPic", uploader.single("file"), s3.upload, (req, res) => {
  database
    .updateImage(config.s3Url + req.file.filename, req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      res.status(500).json({
        success: false
      });
    });
});

////////////////upload a bio//////////////////

app.post("/profile", (req, res) => {
  database.uploadBio(req.body.bio, req.session.userId).catch(err => {
    res.status(500).json({
      success: false
    });
  });
});

///////////////get other user/////////////////////////
app.get("/other-user/:userId", (req, res) => {
  database
    .otherUser(req.params.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {});
});

//////////////////get the friendship status///////////////////

app.get("/get-friendship/:id", (req, res) => {
  database
    .getFriendshipStatus(req.params.id, req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {});
});

/////////////////posting friendship request///////////////////

app.post("/make-new-friend/", (req, res) => {
  database
    .friendRequest(req.body.id, req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
      for (let socketId in onlineUsers) {
        console.log("here", req.body.id);
        if (onlineUsers[socketId] == req.body.id) {
          console.log("loggin in da if");
          io.sockets.sockets[socketId].emit(
            "friendRequestNotice",
            results.rows[0]
          );
          console.log("Friend req emission works!");
        }
      }
    })
    .catch(err => {
      console.log("logging the error in post friendship route", err);
    });
});

/////////////////cancel- delete friendrequest///////////////////////

app.post("/cancel-delete-request", (req, res) => {
  database
    .cancelDeleteRequest(req.body.id, req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log("logging the error in cancel delete", err);
    });
});

////////////////confirm friend reguest/////////////

app.post("/confirm-friend-request", (req, res) => {
  database
    .confirmFriendRequest(req.body.id, req.session.userId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log("logging the error in confirm", err);
    });
});

/////////////////// get friend and friendabies/////////////

app.get("/get-friends-and-wanabes", (req, res) => {
  database
    .getFriendsAndWanabes(req.session.userId)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.log("logging the error in confirm", err);
    });
});

//////////////GET MESSAGES///////////////

app.get("/get-messages", (req, res) => {
  database
    .getChatMessages()
    .then(result => {
      res.json(result.rows.reverse());
    })
    .catch(err => {});
});

/////////////LOGOUT/////////////

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});
///////////DONT TOUCH/////MUST BE LAST!!!!////////
////// needs to check if cookie sessions is present//////////
app.get("*", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/welcome");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

// ////////////LISTENER////////////////////

server.listen(8080, function() {
  console.log("we are listening.....");
});

let onlineUsers = {};

io.on("connection", function(socket) {
  console.log(`socket with id ${socket.id} has connected!`);

  database.getUser(socket.request.session.userId).then(results => {
    socket.broadcast.emit("userJoined", results.rows[0]); /// broadcasting to everyone
  });

  const userId = socket.request.session.userId;

  // add socketid : userid to onlineUsers object
  if (!userId) {
    //// if you need to connect to socket you need to use this socket.re.....
    return socket.disconnect(true);
  }
  const socketId = socket.id;

  onlineUsers[socketId] = userId;

  let arrayOfUserIds = Object.values(onlineUsers);

  /// here we need the array of users;

  database.getUsersByIds(arrayOfUserIds).then(results => {
    // result = array of objects that contains
    // users first name, last name, email, etc
    // emit to client
    //emits the message to person who just connexted
    socket.emit("onlineUsers", results);
  });

  socket.on("sendMessage", msg => {
    database
      .setAndGetLastMessage(socket.request.session.userId, msg)
      .then(msgresp => {
        database.getUser(socket.request.session.userId).then(user => {
          return io.sockets.emit("newChatMessage", {
            msg_sender_first: user.rows[0].first_name,
            msg_sender_last: user.rows[0].last_name,
            msg_sender_img: user.rows[0].picurl,
            userId: user.rows[0].id,
            // msg_id: msg.id,
            msg_text: msg
            // msg_sender_id: msg.sender_id,
            // msg_time: msg.created_at
          });
        });
      })
      .catch(err => {
        console.log("logging error in socket send message", err);
      });
  });

  // socket.on("sendMessage", msg => {
  //     console.log("in socket on", socket.request.session.userId, msg);
  //   database
  //     .getLastMessage(socket.request.session.userId, msg)
  //     .then(() => {
  //         console.log("we are getting f");
  //       // if we do multiple async things in a row, WE NEED TO RETURN
  //       // THE SEQUENTIAL STUFF !!!!!!!!!!!!!!!
  //       return database.getChatMessages();
  //     })
  //     .then(response => {
  //       console.log("logging responce in index", response);
  //       let msgData = [];
  //       response.rows.forEach(row => {
  //         row.localTime = moment(row.msg_time, "MMDD, h:mm").fromNow();
  //         msgData.push(row);
  //       });
  //       return io.sockets.emit("newChatMessage", msgData.reverse().pop());
  //     });
  // });

  socket.on("disconnect", function() {
    console.log(`socket with id ${socket.id} has left`);

    delete onlineUsers[socket.id];

    //checks if the user is already locked in once
    let check = Object.values(onlineUsers).find(id => id == userId);
    if (!check) {
      io.sockets.emit("userLeft", userId);
    }
  });

  /// we are emiting here and listening in client side
});

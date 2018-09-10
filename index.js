const express = require("express");

const app = express();

const compression = require("compression");

const axios = require("axios");

const bp = require("body-parser");

const database = require("./src/database.js");

const bcrypt = require("./bcrypt.js");

const cookieSession = require("cookie-session");

const csurf = require("csurf");

app.use(require("cookie-parser")());

const s3 = require("./s3.js");

const config = require("./config.json");

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

app.use(
  cookieSession({
    secret: "I am always Hangry.",
    maxAge: 1000 * 60 * 60 * 24 * 14
  })
);

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
  console.log("logging login");
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
  console.log("get Users", req.session.userId);
  database
    .getUser(req.session.userId)
    .then(results => {
      console.log("here are the Results", results.rows[0]);
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log("here is teh err", err);
    });
});

////////////////uploadpic///////////////////

app.post("/uploadPic", uploader.single("file"), s3.upload, (req, res) => {
  database
    .updateImage(config.s3Url + req.file.filename, req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log("Error in writeFileTo: ", err);
      res.status(500).json({
        success: false
      });
    });
});

////////////////upload a bio//////////////////

app.post("/profile", (req, res) => {
  console.log("Bio in Server: ", req.body.bio);
  database.uploadBio(req.body.bio, req.session.userId).catch(err => {
    console.log("Error in POST profile, Bio: ", err);
    res.status(500).json({
      success: false
    });
  });
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

app.listen(8080, function() {});

const express = require("express");

const app = express();

const compression = require("compression");

const bp = require("body-parser");

const database = require("./src/database.js");

const bcrypt = require("./bcrypt.js");

const cookieSession = require("cookie-session");

app.use(require("cookie-parser")());

///////MIDLEWARE

app.use(
  cookieSession({
    secret: "I am always Hangry.",
    maxAge: 1000 * 60 * 60 * 24 * 14
  })
);
///////////////////////////

app.use(express.static("./public"));

app.use(compression());

app.use(
  require("body-parser").urlencoded({
    extended: false
  })
);

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
    console.log("re-directing to /");
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
        console.log(response);
        req.session.userId = response.rows[0].id;
        /////// set session here
        res.json({ success: true });
      })
      .catch(err => {
        console.log("HERE", err);
        //// here we are sending json obj that tels the responce was true or false
        res.json({ success: false });
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

app.listen(8080, function() {
  console.log("I'm listening.");
});

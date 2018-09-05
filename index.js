const express = require("express");
const app = express();
const compression = require("compression");
const bp = require("body-parser");
const database = require("./src/database.js");

///////MIDLEWARE/////////////////////////

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

///////////DONT TOUCH/////////////

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

///////////////welcome route//////////////////

app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/Login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

///////////////register route//////////////////

app.post("/register", (req, res) => {
  console.log(
    "at register",
    req.body.first
    // req.body.last,
    // req.body.email,
    // req.body.password
  );
  let { first, last, email, password } = req.body;
  database
    .newUser(first, last, email, password)
    .then(response => {
      res.redirect("/Login");
    })
    .catch(err => {
      console.log("HERE", err);
    });
});

// app.get("/welcome", function(req, res) {
//   if (!req.session.userId) {
//     return res.redirect("/");
//   }
//   res.sendFile(__dirname + "/index.html");
// });

///////////////app post///////////////////////

// app.post("/info", (req, res) => {
//   if (
//     req.body.first == "" ||
//     req.body.last == "" ||
//     req.body.email == "" ||
//     req.body.password == ""
//   ) {
//     return res.sendFile(__dirname + "/index.html");
//   }
//
//   ////////NEXT BCRYPT?///////////
//
//   // console.log(req.session.row, 'profile info');
//   database
//     .newUser(
//       req.body.age,
//       req.body.city,
//       req.body.homepage,
//       req.session.user.userId
//     )
//     .then(response => {
//       console.log("through the new user mosule", responce);
//       res.redirect("/petition");
//     })
//     .catch(err => {
//       console.log("HERE");
//       res.render("info", {
//         layout: "main",
//         error: true
//       });
//     });
// });

// ////////////LISTENER////////////////////

app.listen(8080, function() {
  console.log("I'm listening.");
});

const express = require("express");
const app = express();
const compression = require("compression");

const database = require("./src/database.js");

app.use(express.static("./public"));

app.use(compression());

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

const spicedPG = require("spiced-pg");

const db = spicedPG("postgres:postgres:postgres@localhost:5432/socialnet");

///////////DATABASE QUERIES///////////////////////////////

module.exports.newUser = function newUser(first, last, email, hashPass) {
  console.log("new User", first, last, email, hashPass);
  //////the required parameters
  return db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING id",
    [first, last, email, hashPass]
  );
};

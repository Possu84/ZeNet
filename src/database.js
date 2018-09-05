///////////DATABASE QUERIES///////////////////////////////

module.exports.newUser = function newUser(userId, signature, email, hashPass) {
  //////the required parameters
  return db
    .query(
      "INSERT INTO users (firs_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING first_name",
      [firs_name, last_name, email, password]
    )
    .then(result => {
      console.log(result.rows[0], "user works!!!!!!");
      return result.rows[0];
    });
};

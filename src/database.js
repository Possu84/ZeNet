const spicedPG = require("spiced-pg");

const db = spicedPG("postgres:postgres:postgres@localhost:5432/socialnet");

///////////DATABASE QUERIES///////////////////////////////

module.exports.newUser = function newUser(first, last, email, hashPass) {
  //////the required parameters
  return db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING id",
    [first, last, email, hashPass]
  );
};

module.exports.login = function login(email) {
  return db.query(
    `
        SELECT * FROM users
        WHERE email = $1
        `,
    [email]
  );
};

module.exports.getUser = function getUser(id) {
  return db.query(` SELECT * FROM users WHERE id = $1 `, [id]);
};

module.exports.updateImage = function updateImage(picUrl, id) {
  return db.query(
    `UPDATE users
                SET picUrl  = $1
                WHERE id = $2 RETURNING picUrl
                    `,
    [picUrl, id]
  );
};

module.exports.uploadBio = function uploadBio(bio, id) {
  return db.query(
    `
      UPDATE users
      SET bio = $1
      WHERE id = $2
      `,
    [bio, id]
  );
};

module.exports.otherUser = function getUser(id) {
  return db.query(` SELECT * FROM users WHERE id = $1 `, [id]);
};

module.exports.getFriendshipStatus = function getFriendshipStatus(
  user1,
  user2
) {
  return db.query(
    `SELECT * FROM friendship
      WHERE (sender_id = $1 AND receiver_id = $2)
      OR(sender_id = $2 AND receiver_id = $1)
       `,
    [user1, user2]
  );
};

module.exports.friendRequest = function friendRequest(user1, user2) {
  return db.query(
    `

    INSERT INTO friendship (sender_id, receiver_id)
    VALUES ($1, $2)
    RETURNING sender_id, status

    `,
    [user1, user2]
  );
};

module.exports.cancelDeleteRequest = function cancelDeleteRequest(
  user1,
  user2
) {
  return db.query(
    `


DELETE FROM friendship
WHERE (sender_id = $1 AND receiver_id = $2)
OR(sender_id = $2 AND receiver_id = $1)

    `,
    [user1, user2]
  );
};

module.exports.confirmFriendRequest = function confirmFriendRequest(
  user1,
  user2
) {
  console.log("running confirmFriendRequest whatuppppp", user1, user2);
  return db.query(
    `
        UPDATE friendship
        SET status = 2
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR    (sender_id = $2 AND receiver_id = $1)


        `,
    [user1, user2]
  );
};

module.exports.getFriendsAndWanabes = function getFriendsAndWanabes(id) {
  return db.query(
    `

    SELECT users.id, first_name, last_name, picUrl, status
    FROM friendship
    JOIN users
    ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)

`,
    [id]
  );
};

function getUsersByIds(arrayOfIds) {
  const query = `SELECT * FROM users WHERE id = ANY($1)`;
  return db.query(query, [arrayOfIds]);
}

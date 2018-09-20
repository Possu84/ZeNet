
DROP TABLE IF EXISTS messages;

DROP TABLE IF EXISTS friendship;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
        id         SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name  VARCHAR(255),
        email      VARCHAR(255)NOT NULL UNIQUE,
        password   VARCHAR(255)NOT NULL,
        picUrl     VARCHAR(300),
        bio        VARCHAR(500)
);


CREATE TABLE friendship (
        id          SERIAL PRIMARY KEY,
        sender_id   INT NOT NULL REFERENCES users (id),
        receiver_id INT NOT NULL REFERENCES users (id),
        status      INT NOT NULL DEFAULT 1

);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM users;

SELECT * FROM friendship;

SELECT * FROM messages;

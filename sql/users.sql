DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS friendship;

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
        sender_id   VARCHAR(255) REFERENCES users (id),
        receiver_id VARCHAR(255) REFERENCES users (id),
        status      VARCHAR (255) IN NOT NULL DEFAULT 1

);

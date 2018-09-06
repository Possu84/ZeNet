DROP TABLE IF EXISTS users;

CREATE TABLE users (
        id         SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name  VARCHAR(255),
        email      VARCHAR(255)NOT NULL UNIQUE,
        password   VARCHAR(255),
        picUrl     VARCHAR(300)
);

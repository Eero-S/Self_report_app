# wsd-project

Link to online demo: TODO

Instructions to run the application:

1. In case you run database locally run these commands (in the following order) in your postgres command line. Otherwise move to step 3.

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(320) NOT NULL,
password CHAR(60) NOT NULL
);

CREATE TABLE reports (
id SERIAL PRIMARY KEY,
date DATE NOT NULL,
sleep NUMERIC(100, 1),
sport NUMERIC(100, 1),
study NUMERIC(100, 1),
quality INTEGER,
eating INTEGER,
mood INTEGER NOT NULL,
is_Morning boolean NOT NULL,
user_id INTEGER REFERENCES users(id)
);

2. Put your own postgres database credentials into the .env file.

3. Navigate to root of the folder.
4. Run the following command to start the app
   'deno run --unstable --allow-all app.js'

Instructions to run the test:

1. TODO

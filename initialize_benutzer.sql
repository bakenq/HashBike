CREATE TABLE benutzer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    pass TEXT NOT NULL
);

INSERT INTO benutzer (name, pass) VALUES ("Alice", "§$Y45/912v");
INSERT INTO benutzer (name, pass) VALUES ("Bob", "secret");
INSERT INTO benutzer (name, pass) VALUES ("Carla", "123");
INSERT INTO benutzer (name, pass) VALUES ("David", "divaD");
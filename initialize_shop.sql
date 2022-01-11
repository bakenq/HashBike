CREATE TABLE shop (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    preis NUMERIC,
    bild TEXT NOT NULL,
    seite TEXT NOT NULL
);

INSERT INTO shop (name, preis, bild, seite) VALUES ("White Widdow", 13.12, "White-Widdow.png", "/white-widow");
INSERT INTO shop (name, preis, bild, seite) VALUES ("Pineapple Express", 14.99, "Pinappel-Express.png", "/pineapple-express");
INSERT INTO shop (name, preis, bild, seite) VALUES ("Northern Lights", 9.99, "Northern-Light.png", "/northern-lights");
INSERT INTO shop (name, preis, bild, seite) VALUES ("Girl Scout Cookies", 10.99, "Girl-Scout-Cookies.png", "/girl-scout-cookies");
INSERT INTO shop (name, preis, bild, seite) VALUES ("Cheese", 11.99, "Chees.png", "/cheese");
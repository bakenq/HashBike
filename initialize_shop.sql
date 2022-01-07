CREATE TABLE shop (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    preis NUMERIC,
    bild TEXT NOT NULL
);

INSERT INTO shop (name, preis, bild) VALUES ("White Widdow", 13.12, "White-Widdow.png");
INSERT INTO shop (name, preis, bild) VALUES ("Pineapple Express", 14.99, "Pinappel-Express.png");
INSERT INTO shop (name, preis, bild) VALUES ("Northern Light", 9.99, "Northern-Light.png");
INSERT INTO shop (name, preis, bild) VALUES ("Girl Scout Cookies", 10.99, "Girl-Scout-Cookies.png");
INSERT INTO shop (name, preis, bild) VALUES ("Cheese", 11.99, "Chees.png");
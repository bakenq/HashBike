CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    preis NUMERIC,
    bild TEXT NOT NULL
);

INSERT INTO products (name, preis, bild) VALUES ("Purpel Hash", 12.00, "HashHash.jpg");
INSERT INTO products (name, preis, bild) VALUES ("Purpel Lash", 16.00, "HashHash.jpg");
INSERT INTO products (name, preis, bild) VALUES ("Purpel Cash", 14.50, "HashHash.jpg");
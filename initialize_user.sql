CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vorname TEXT NOT NULL,
    nachname TEXT NOT NULL,
    strasse TEXT NOT NULL,
    hausnummer NUMERIC,
    stadt TEXT NOT NULL,
    postleitzahl NUMERIC,
    benutzername TEXT NOT NULL,
    email TEXT NOT NULL,
    pass TEXT NOT NULL
);
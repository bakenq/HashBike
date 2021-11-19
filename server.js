// express
const express = require("express");
const app = express();

// bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// embedded js
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// sqlite DB
const DATABASE = "benutzer.db";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(DATABASE);

// cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// express-session
const session = require("express-session");
app.use(session({
    secret: "example",
    saveUninitialized: false,
    resave: false
}));

// bcrypt
const bcrypt = require("bcrypt");



// Server Start
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.use(express.static(__dirname + "/images"));


// Get-Requests
app.get("/home", function(req, res){
    res.sendFile(__dirname + "/views/startseite.html");
});

app.get("/login", function(req, res){
    res.sendFile(__dirname + "/views/loginformular.html");
});

app.get("/register", function(req, res){
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/abmeldung", function(req, res){
    req.session.destroy();

    res.redirect("/home");
})

// sessionvariable löschen
app.get("/sessionLoeschen", function(req, res){
    req.session.destroy();

    // Weiterlieten
    res.redirect("/zeigesession");
});

// Sessionvariable lesen
app.get("/zeigesession", function(req, res){
    if (!req.session.sessionValue){
        res.render("zeigesession", {"message": "nicht gesetzt"});
    }
    else {
        res.render("zeigesession", {"message": req.session.sessionValue});
    }
});


// Post-Requests

// Login
app.post("/anmeldung", function(req, res){
    const bname = req.body.bname;
    const pwd = req.body.pwd;

    db.all(`SELECT pass FROM benutzer WHERE name ='${bname}'`,
        function(err, rows) {
            if (rows.length == 1) {
                const hash = rows[0].pass;
                const isValid = bcrypt.compareSync(pwd, hash);
                if (isValid == true) {
                    req.session.user = bname;
                    res.render("content", {"user": bname});
                }
                else {
                    res.sendFile(__dirname + "/views/loginFehler.html");  
                }             
            }
            else {
                res.sendFile(__dirname + "/views/loginFehler.html");  
            }
        }
    );
});

// Registrierung
app.post("/postreg", function(req, res){
    const regname = req.body.regname;
    const regpwd = req.body.regpwd;

    db.all(`SELECT * FROM benutzer WHERE name='${regname}'`,
    function(err, rows) {
        if (rows.length == 0) {
            const hash = bcrypt.hashSync(regpwd, 10);
            db.run(
                `INSERT INTO benutzer(name, pass) VALUES('${regname}', '${hash}')`,
                function(err) {
                    res.sendFile(__dirname + "/views/regErfolg.html");
                }
            );
        }
        else {
            res.sendFile(__dirname + "/views/regFehler.html");
        }
    });
});

// Session setzen
app.post("/sessionSetzen", function(req, res){
    // Wert aus Formular lesen
    const param_sessionValue = req.body.sessionValue;

    // Sessionvariable setzen
    req.session.sessionValue = param_sessionValue;

    // Weiterleiten
    res.redirect("zeigesession");
});


// unbenutzt, weil ich asynchrone funktionen nicht mag
function benutzerExistiert(benutzername) {
    for (let i = 0; i < benutzer.length; i++) {
        if (benutzer[i].name == benutzername) {
            return true;
        }
    }
    return false;
}


function anmeldungErfolgreich(benutzername, passwort) {
    db.all(
        `SELECT * FROM benutzer`,
        function(err, rows) {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].name == benutzername && rows[i].pass == passwort) {
                    return true;
                }
            }
            return false;  
        }
    );
}



// function anmeldungErfolgreich(benutzername, passwort) {
//     for (let i = 0; i < benutzer.length; i++) {
//         if (benutzer[i].name == benutzername && benutzer[i].pass == passwort) {
//             return true;
//         }
//     }
//     return false;
// }

function benutzerHinzufuegen(benutzername, passwort) {
    benutzerListe.push({
        name: benutzername,
        pass: passwort
    })
}
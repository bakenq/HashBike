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


// Post-Requests

// Login
app.post("/anmeldung", function(req, res){
    const bname = req.body.bname;
    const pwd = req.body.pwd;

    db.all(
        `SELECT * FROM benutzer`,
        function(err, rows) {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].name == bname && rows[i].pass == pwd) {
                    res.render("benutzerListe", {"benutzer": rows});
                }
            }
            res.sendFile(__dirname + "/views/loginFehler.html");  
        }
    );
});

// Registrierung
app.post("/postreg", function(req, res){
    const regname = req.body.regname;
    const regpwd = req.body.regpwd;

    db.all(
        `SELECT * FROM benutzer`,
        function(err, rows) {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].name == regname) {
                    res.sendFile(__dirname + "/views/regFehler.html");
                }
            }
            
            db.run(
                `INSERT INTO benutzer(name, pass) VALUES("${regname}", "${regpwd}")`,
                function(err){
                    res.sendFile(__dirname + "/views/regErfolg.html");
                }
            );
        }
    )
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


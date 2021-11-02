// express
const express = require("express");
const app = express();

// bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// embedded js
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');


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
app.post("/anmeldung", function(req, res){
    const bname = req.body.bname;
    const pwd = req.body.pwd;

    if(anmeldungErfolgreich(bname, pwd) == false) {
        res.sendFile(__dirname + "/views/loginFehler.html");
    }
    else if(anmeldungErfolgreich(bname, pwd) == true) {
        res.render("benutzerListe", {"benutzerListe": benutzerListe});
    }

});

app.post("/postreg", function(req, res){
    const regname = req.body.regname;
    const regpwd = req.body.regpwd;

    if(benutzerExistiert(regname) == true) {
        res.sendFile(__dirname + "/views/regFehler.html");
    } else {
        benutzerHinzufuegen(regname, regpwd);
        res.sendFile(__dirname + "/views/regErfolg.html");
    }
})


// Benutzerliste
let benutzerListe = [
    {
        name: "Alice",
        pass: "§$Y45/912v"
    },
    {
        name: "Bob",
        pass: "secret"
    },
    {
        name: "Carla",
        pass: "123"
    },
    {
        name: "David",
        pass: "divaD"
    }
]

function benutzerExistiert(benutzername) {
    for (let i = 0; i < benutzerListe.length; i++) {
        if (benutzerListe[i].name == benutzername) {
            return true;
        }
    }
    return false;
}

function anmeldungErfolgreich(benutzername, passwort) {
    for (let i = 0; i < benutzerListe.length; i++) {
        if (benutzerListe[i].name == benutzername && benutzerListe[i].pass == passwort) {
            return true;
        }
    }
    return false;
}

function benutzerHinzufuegen(benutzername, passwort) {
    benutzerListe.push({
        name: benutzername,
        pass: passwort
    })
}


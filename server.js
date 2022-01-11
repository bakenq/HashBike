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
const oneDay = 1000 * 60 * 60 * 24;
var sessionValue;

const session = require("express-session");
app.use(session({
    secret: "rKM7xbDTZm6lww8YUHHaRqYku9f6Tm7zBw1rYkTE",
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    resave: false
}));

// bcrypt
const bcrypt = require("bcrypt");


// Server Start
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/public"));




// Get-Requests
app.get("/", function(req, res){
    sessionValue = req.session;
    if(sessionValue.email){
        res.sendFile(__dirname + "/views/logged-in/homelog.html");
    } else {
        res.sendFile(__dirname + "/views/index.html");
    }
});

app.get("/login", function(req, res){
    res.sendFile(__dirname + "/views/Login.html");
});

app.get("/logout", function(req, res){
    res.sendFile(__dirname + "/views/logged-in/logout.html")
});

app.get("/warenkorb", function(req, res){
    res.render("warenkorb");
});

app.get("/shop2", function(req, res){
    db.all(`SELECT * FROM shop`,
        function(err, rows){
            res.render("shop", {shop: rows});
        }
    );
});

app.get("/shop", function(req, res){
    db.all(`SELECT * FROM shop`,
    function(err, rows){
        sessionValue = req.session;
        if(sessionValue.email){
            res.render("shoplog", {shop: rows});
        } else {
            res.render("shop", {shop: rows});
        }   
    });
});


app.get("/produkte", function(req, res){
    db.all(`SELECT * FROM products`,
        function(err, rows) {
            res.render("produkte", {produkte: rows});
        }
    );
});

app.get("/register", function(req, res){
    res.sendFile(__dirname + "/views/signup.html");
});

app.get("/profile", function(req, res){
    if(req.session.email) {
        db.all(`SELECT * FROM user WHERE email ='${req.session.email}'`,
            function(err, rows) {
                if (rows.length == 1) {
                    res.render("profile", {vorname: rows[0].vorname, nachname: rows[0].nachname, strasse: rows[0].strasse, hausnummer: rows[0].hausnummer, stadt: rows[0].stadt, postleitzahl: rows[0].postleitzahl, benutzername: rows[0].benutzername, email: rows[0].email});
                }
            }
        );
    } else {
        res.redirect("/");
    }
});



// sessionvariable löschen
app.get("/abmeldung", function(req, res){
    if (req.session.email) {
        req.session.destroy();
    }
    
    res.redirect("/logout");
});

// Productpages
app.get("/cheese", function(req, res){
    sessionValue = req.session;
    if(sessionValue.email){
        res.sendFile(__dirname + "/views/logged-in/productpages/cheeselog.html");
    } else {
        res.sendFile(__dirname + "/views/productpages/cheese.html");
    }
});

app.get("/girl-scout-cookies", function(req, res){
    sessionValue = req.session;
    if(sessionValue.email){
        res.sendFile(__dirname + "/views/logged-in/productpages/girl-scout-cookieslog.html");
    } else {
        res.sendFile(__dirname + "/views/productpages/girl-scout-cookies.html");
    }
});

app.get("/northern-lights", function(req, res){
    sessionValue = req.session;
    if(sessionValue.email){
        res.sendFile(__dirname + "/views/logged-in/productpages/northern-lightslog.html");
    } else {
        res.sendFile(__dirname + "/views/productpages/northern-lights.html");
    }
});

app.get("/pineapple-express", function(req, res){
    sessionValue = req.session;
    if(sessionValue.email){
        res.sendFile(__dirname + "/views/logged-in/productpages/pineapple-expresslog.html");
    } else {
        res.sendFile(__dirname + "/views/productpages/pineapple-express.html");
    }
});

app.get("/white-widow", function(req, res){
    sessionValue = req.session;
    if(sessionValue.email){
        res.sendFile(__dirname + "/views/logged-in/productpages/white-widowlog.html");
    } else {
        res.sendFile(__dirname + "/views/productpages/white-widow.html");
    }
});


// Post-Requests

// Login
app.post("/anmeldung", function(req, res){
    const email = req.body.email;
    const pwd = req.body.pwd;

    db.all(`SELECT * FROM user WHERE email ='${email}'`,
        function(err, rows) {
            if (rows.length == 1) {
                const hash = rows[0].pass;
                const isValid = bcrypt.compareSync(pwd, hash);
                if (isValid == true) {
                    sessionValue = req.session;
                    sessionValue.email = email;
                    sessionValue.user = rows[0].vorname;
                    console.log(sessionValue)
                    // res.render("content", {"user": rows[0].vorname});
                    res.sendFile(__dirname + "/views/logged-in/homelog.html")
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
    const regVorname = req.body.regVorname;
    const regNachname = req.body.regNachname;

    const strasse = req.body.strasse;
    const hausnummer = req.body.hausnummer;
    const stadt = req.body.stadt;
    const postleitzahl = req.body.postleitzahl;

    const regBenutzername = req.body.regBenutzername;
    const regEmail = req.body.regEmail;

    const regPwd1 = req.body.regPwd1;
    const regPwd2 = req.body.regPwd2;

    db.all(`SELECT * FROM user WHERE email='${regEmail}'`,
    function(err, rows) {
        if (rows.length == 0 && regPwd1 == regPwd2) {
            const hash = bcrypt.hashSync(regPwd1, 10);
            db.run(
                `INSERT INTO user(vorname, nachname, strasse, hausnummer, stadt, postleitzahl, benutzername, email, pass) VALUES('${regVorname}', '${regNachname}', '${strasse}', '${hausnummer}','${stadt}', '${postleitzahl}', '${regBenutzername}', '${regEmail}', '${hash}')`,
                function(err) {6
                    res.sendFile(__dirname + "/views/regErfolg.html");
                }
            );
        }
        else {
            res.sendFile(__dirname + "/views/regFehler.html");
        }
    });
});
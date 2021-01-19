const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "join_us"
})

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) AS count FROM users", function(err, results, fields) {
        if(err) throw err;
        const {count} = results[0];
        res.render("home", {count});
    })
});

app.post("/", (req, res) => {
    connection.query("INSERT INTO users SET ?", req.body, function(err, results, fields) {
        if(err) throw err;
        res.redirect("/");
    })
})

app.listen(3000, function() {
    console.log("Server Running on Port 3000");
})
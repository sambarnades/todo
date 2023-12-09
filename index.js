const express = require("express");
const ejs = require("ejs");
const jQuery = require("jquery");
const bodyParser = require("body-parser");
const pg = require("pg");
const dbPort = 5432

const db = new pg.Client({
    host:"localhost",
    port:dbPort,
    user:"postgres",
    password:"postgres",
    database:"todolist"
})

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

let tasks = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        tasks: tasks,
    })
});

app.post("/", (req, res) => {
    let task = req.body.task;
    res.render("index.ejs", {
        tasks: tasks,
    })

});

app.post("/reset", (req, res) => {
    tasks = [];
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log("App listening on port " + port);
});
const express = require("express");
const ejs = require("ejs");
const jQuery = require("jquery");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

let tasks = [];

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/submit", (req, res) => {

    class task {
        constructor() {
            this.title = req.body.title,
            this.toDo = Date.now(),
            this.done = false
         }
    } 
    

    let newTask = new task()

    tasks.push(newTask)

    res.render("index.ejs", {
        tasks: tasks,
    })
    console.log(tasks);



});

app.post("/reset", (req, res) => {
    tasks = [];
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log("App listening on port " + port);
});
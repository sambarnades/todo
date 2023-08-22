const express = require("express");
const ejs = require("ejs");
const jQuery = require("jquery");
const bodyParser = require("body-parser");

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

app.post("/submit", (req, res) => {

    if (tasks != null) {                                    // Doesn't function from this part...
        for (let i = 0; i < tasks.length; i++) {

            let checkbox = "checkbox-" + i + "-done";

            if (req.body.checkbox) {
                tasks[i].done = false;
                console.log(tasks[i].title + " : " + tasks[i].done) 
            } else {
                tasks[i].done = true;
                console.log(tasks[i].title + " : " + tasks[i].done)
            }
        }
    }                                                       // To this part.

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

});

app.post("/reset", (req, res) => {
    tasks = [];
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log("App listening on port " + port);
});
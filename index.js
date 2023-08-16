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

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/", (req, res) => {
    let task = req.body.task;
    res.render("index.ejs", {
        task: task
    })
    console.log(task); // Doesn't function.
});
app.listen(port, () => {
    console.log("App listening on port " + port);
});
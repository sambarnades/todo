const express = require("express");
const ejs = require("ejs");
const jQuery = require("jquery");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: true })


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/", (req, res) => {
    console.log(req.body); // Doesn't function.
    res.render("index.ejs")
});
app.listen(port, () => {
    console.log("App listening on port " + port);
});
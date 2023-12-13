import express from "express";
import ejs from "ejs";
import jQuery from "jquery";
import bodyParser from "body-parser";
import pg from 'pg';

const client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todolist",
    password: "postgres",
    port: 5432,
});
client.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

app.get("/", async (req, res) => {

    const getTasks = await client.query('SELECT * FROM tasks');
    const tasks = getTasks.rows;

    // console.log(tasks);

    res.render("index.ejs", {
        tasks: tasks
    })
});

app.get("/today", async (req, res) => {

    const today = new Date().toJSON().slice(0,10);              // Get the today in database
    const queryArray = [today];                                 // Put it in array

    // console.log(today);                                          CONTROL

    const getTasks = await client.query('SELECT * FROM tasks WHERE to_do_date = ($1);', queryArray);    // Query
    const sortedTasks = getTasks.rows;

    res.render("index.ejs", {                                                                           // Rending
        tasks: sortedTasks
    })

});

app.post("/submit", async (req, res) => {

    let toDo = new Date(req.body.toDo);

    console.log(toDo);


    const newTask = [
        req.body.title,
        toDo,
        false
    ]
    
    const query = await client.query('INSERT INTO tasks (task_name, to_do_date, done) VALUES ($1, $2, $3);', newTask);

    res.redirect("/")

});

app.post("/reset", async (req, res) => {
    const query = await client.query('DELETE FROM tasks');
    console.log(query);
    res.redirect("/");
})

app.listen(port, () => {
    console.log("App listening on port " + port);
});
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

let getTasks = await client.query('SELECT * FROM tasks');
let tasks = getTasks.rows;

console.log(tasks);


app.get("/", (req, res) => {

    res.render("index.ejs", {
        tasks: tasks,
    })
});

app.get("/today", (req, res) => {

    let sortedTasks = []; // Create a blank array

    const todayLoop = () => { // Function to call the sort.
        if (tasks) {              // Check if array exists.

            tasks.forEach(taskToSort => { // Loop to check the dates.

                let deadline = taskToSort.toDo;         // Stock deadline & the date today 
                let today = new Date().toDateString();

                // console.log(deadline);
                // console.log(today);

                if (deadline == today) {              // Check if the deadline is the same as the date today
                    sortedTasks.push(taskToSort); // If it is, push it to the sortedTasks array.
                }

                else {

                }

            });
            sortedTasks.forEach(task => {
                console.log(task);
            });
        }

        else {
            console.log("No task array.")
        }
    }

    todayLoop();

    res.render("index.ejs", {
        tasks: sortedTasks,
        todayFirst: true
    })
});

app.post("/submit", async (req, res) => {

    let toDo = new Date(req.body.toDo).toDateString();

    const newTask = [
        req.body.title,
        toDo,
        false
    ]
    
    const query = await client.query('INSERT INTO tasks (task_name, to_do_date, done) VALUES ($1, $2, $3);', newTask);

    res.redirect("/")

});

app.post("/reset", (req, res) => {
    tasks = [];
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log("App listening on port " + port);
});
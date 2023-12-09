const express = require("express");
const ejs = require("ejs");
const jQuery = require("jquery");
const bodyParser = require("body-parser");
const pg = require("pg");

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

app.get("/today", (req, res) => {

let sortedTasks = []; // Create a blank array

const todayLoop = () => { // Function to call the sort.
    if(tasks){              // Check if array exists.
        
        tasks.forEach(taskToSort => { // Loop to check the dates.
            
            let deadline = taskToSort.toDo;         // Stock deadline & the date today 
            let today = new Date().toDateString();

            // console.log(deadline);
            // console.log(today);

            if(deadline == today){              // Check if the deadline is the same as the date today
                sortedTasks.push(taskToSort); // If it is, push it to the sortedTasks array.
            }

            else{

            }

    });
    sortedTasks.forEach(task => {
        console.log(task);
    });
    }
    
    else{
        console.log("No task array.")
    }
}

todayLoop();

    res.render("index.ejs", {
        tasks: sortedTasks,
        todayFirst: true
    })
});

app.post("/submit", (req, res) => {

    // if (tasks != null) {                                    // Doesn't function from this part...
    //     for (let i = 0; i < tasks.length; i++) {

    //         let checkbox = "checkbox-" + i + "-done";

    //         if (req.body.checkbox) {
    //             tasks[i].done = false;
    //             console.log(tasks[i].title + " : " + tasks[i].done) 
    //         } else {
    //             tasks[i].done = true;
    //             console.log(tasks[i].title + " : " + tasks[i].done)
    //         }
    //     }
    // }                                                       // To this part.

    let toDo = new Date(req.body.toDo).toDateString();
    console.log(toDo);

    class task {
        constructor() {
            this.title = req.body.title,
                this.toDo = toDo,
                this.done = false
        }
    }

    let newTask = new task()

    tasks.push(newTask)

    console.log(tasks);

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
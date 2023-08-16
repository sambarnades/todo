console.log("jQUery is on.");

const taskDone = () => {

$(".checkbox").on("click", (event) => {
    
    let checkboxId = event.target.id;
    $("#" + checkboxId).closest(".input-group").toggleClass("done")
})

}

taskDone();
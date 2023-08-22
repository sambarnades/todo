console.log("jQUery is on.");

const taskDone = () => {

    $(".checkbox").on("click", (event) => {

        let checkboxId = event.target.id;
        $("#" + checkboxId).closest(".input-group").toggleClass("done");

        if ($("#" + checkboxId).attr("name") === undefined) {
            $("#" + checkboxId).attr("name", checkboxId + "-done");
        } else {
            $("#" + checkboxId).removeAttr("name");
        }

    })

}

taskDone();
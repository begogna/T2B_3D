// var IndexController = function () {
$(document).ready(function () {

    console.log("aqui");

    //Submit form
    $("#btn_create").click(function () {
        var text = $("#inputText").val();

        if (validation())// Calling validation function
        {
            $(".form_create").submit();//form submission
            console.log(text);
        }
        console.log("alli 2");
    });


    //  Validate the fields of the form
    function validation() {
        var text = $("#inputText").val();

        if (text === '') {
            alert("Please fill all fields...!!!!!!");
            return false;
        }
        else {
            return true;
        }
    }


});
// }(); //IndexController

var IndexController = function () {

    // $(document).on("click", "button.detail", function () {
    //     var id = $(this).attr("data-id"); //on récupère la propriete du dataset qui s'appelle id

    // });


    //Submit form with id function
    $(".create").click(function () {
        var name = $("#name").val();
        var email = $("#email").val();

        if (validation())// Calling validation function
        {
            $("#form_id").submit();//form submission
            alert(" Name : " + name + " \n Email : " + email + " \n Form id : " + $("#form_id").attr('id') + "\n\n Form Submitted Successfully......");
        }
    });


    //  Creation form validation
    function validation() {
        // var name = $("#name").val();
        // var email = $("#email").val();
        // var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        // if (name === '' || email === '') {
        //     alert("Please fill all fields...!!!!!!");
        //     return false;
        // }
        // else if (!(email).match(emailReg)) {
        //     alert("Invalid Email...!!!!!!");
        //     return false;
        // }
        // else {
            return true;
        // }
    }



}();

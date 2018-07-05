$(function() {
    $(document).on('click','#signin_submit',signin_submit)
});



function signin_submit(){
    var username = $("#connection_form input[name='username']").val();
    var password = $("#connection_form input[name='password']").val();
    //TODO verify user in a database
    if (true){
        //TODO create secure connection session
        $.cookie("loggedas", username, { expires : 10 });
    }else{
        alert("Error in username or password. Try again");
    }
    window.location.replace("index.html");

}
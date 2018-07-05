
function create_user(){
    var cni_number = $("form#create_user input[name='idnumber']").val();
    var lastname = $("form#create_user input[name='lastname']").val();
    var firstname = $("form#create_user input[name='firstname']").val();

    if (! (cni_number && lastname && firstname) ) {
        alert("One field is not filled. Try again.");
    }else{
        $.ajax({
            url: server_url+"/admin/user/new/"+cni_number+"/"+lastname+"/"+firstname,
            type: 'POST',
            data: "",
            dataType: "xml",
            statusCode: {
                304: function (result,data,status) {
                    console.log(server_url+"/admin/user/new/"+cni_number+"/"+lastname+"/"+firstname);
                    alert("FAIL : "+result+" "+data+" "+status);

                },
                201: function (data,status) {
                    alert("SUCCESS : "+data+" "+status);
                    //TODO traiter le message d'erreur
                    console.log(server_url+"/admin/user/new/"+cni_number+"/"+lastname+"/"+firstname);
                    window.location.replace("index.html");
                },
                default: function () {
                    alert("Unexpected error");
                }
            }
        });
    }
}


$(function() {
    $(document).on('click','#create_user_submit',create_user)
});
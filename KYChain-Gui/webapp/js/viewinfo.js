function getinfo_submit() {
    var key = $("form#getinfo_form input[name='viewinfo_key']").val();
    $.ajax({
        url: server_url+"/user/get/"+key,
        type: 'GET',
        data: "",
        dataType: "xml",
        statusCode: {
            404: function (result,data,status) {
                console.log(server_url+"/user/get/"+key);
                alert("FAIL : "+result+" "+data+" "+status);

            },
            200: function (data,status) {
                    alert("SUCCESS : "+data+" "+status);
                //TODO traiter le message d'erreur
                console.log(server_url+"/user/get/"+key);
                window.location.replace("index.html");
            },
            default: function () {
                alert("Unexpected error");
            }
        }
    });
}


$(function() {
    $(document).on('click','#submit_viewinfo',getinfo_submit);
    list_keys();
});

function list_keys() {
    //TODO lister keys pour selection

}
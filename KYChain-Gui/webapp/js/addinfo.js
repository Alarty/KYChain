$(function() {
    $( "select" )
        .change(function () {
            update_form()
        })
        .change();

});
function addinfo_submit() {
    //TODO stylify option in HTML

    //TODO rest post data

    var chosen_option = $( "select option:selected" ).val();
    if(chosen_option == "address"){
        send_address();
    }else if(chosen_option == "identity"){
        send_identity();
    }

}

function send_address() {
    var street = $("#addinfo_form #filled input[name='street']").val();
    var postcode = $("#addinfo_form #filled input[name='postcode']").val();
    var city = $("#addinfo_form #filled input[name='city']").val();
    var country = $("#addinfo_form #filled input[name='country']").val();
    var principal = 0;
    if($("#addinfo_form #filled input[type='checkbox'][name='principal']").val() == "on"){
        principal = 1;
    }

    //TODO get key
    var key = 1;
    if(!(street && postcode && city && country)){
        alert("One field is not filled. Try again.");
    }else{
        var data = "<Adress><Adresse>"+street+"<%2FAdresse><CP>"+postcode+"<%2FCP><Ville>"+city+"<%2FVille><Pays>"+country+"<%2FPays><Principale>"+principal+"<%2FPrincipale><%2FAdress>";
        $.ajax({
            url: server_url+"/entity/advert/"+key+"/"+data,
            type: 'POST',
            data: "",
            dataType: "xml",
            statusCode: {
                304: function (result,data,status) {
                    console.log(data);
                    alert("FAIL : "+result+" "+data+" "+status);

                },
                201: function (data,status) {
                    alert("SUCCESS : "+data+" "+status);
                    //TODO traiter le message d'erreur
                    console.log(data);
                    window.location.replace("index.html");
                },
                default: function () {
                    alert("Unexpected error");
                }
            }
        });
    }
}

function send_identity() {
    var cni_number = $("#addinfo_form #filled input[name='cni']").val();
    var lastname = $("#addinfo_form #filled input[name='name']").val();
    var firstname = $("#addinfo_form #filled input[name='firstname']").val();
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

//display the right form for the selected data type
function update_form() {
    var chosen_option = $( "select option:selected" ).val();
    if(chosen_option == "address"){
        display_adress_form();
    }else if(chosen_option == "identity"){
        display_identity_form();
    }
}
function display_identity_form() {
    $("#addinfo_form #filled").empty();
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'N° de Carte d\'identité').attr('type', 'text').attr('name', 'cni'));
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'Nom').attr('type', 'text').attr('name', 'name'));
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'Prénom').attr('type', 'text').attr('name', 'firstname'));
    $("#addinfo_form #filled").append($("<button/>").addClass("form-submit btn btn-special").attr('id', 'addinfo_submit').attr('type', 'button').attr('name', 'information-submit').text("Envoyer"));

    $(document).on('click','#addinfo_submit',addinfo_submit);

}

function display_adress_form() {
    $("#addinfo_form #filled").empty();
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'N° et nom de rue').attr('type', 'text').attr('name', 'street'));
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'Code Postal').attr('type', 'number').attr('name', 'postcode'));
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'Ville').attr('type', 'text').attr('name', 'city'));
    $("#addinfo_form #filled").append($("<input/>").addClass("form-input check-value").attr('placeholder', 'Pays').attr('type', 'text').attr('name', 'country'));
    $("#addinfo_form #filled").append($("<label></label>").addClass("label").text("Adresse principale : ").append($("<input/>").addClass("checkbox").attr('type', 'checkbox').attr('name', 'principal')));
    $("#addinfo_form #filled").append($("<button/>").addClass("form-submit btn btn-special").attr('id', 'addinfo_submit').attr('type', 'button').attr('name', 'information-submit').text("Envoyer"));

    $(document).on('click','#addinfo_submit',addinfo_submit);

}

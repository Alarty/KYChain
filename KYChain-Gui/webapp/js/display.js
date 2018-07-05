$(document).ready( function() {

    var html_filename = location.pathname.split('/').slice(-1)[0].split('.')[0];
    var islogged = $.cookie("loggedas");

    if(islogged){
        $("#navbar").append($("<a></a>").addClass("btn btn-outlined").attr('id', 'disconnect').attr('href', '#').text("Déconnexion")).append("<br/>");
        var options = ["profil","viewinfo"];
        var options_val = ["Mon profil","Visionner une information"];
        if(islogged == "admin"){
            options.push("addinfo");
            options_val.push("Ajouter une information");
        }
        options.forEach(function(entry, i) {
            if(html_filename != entry) {
                $("#navbar").append($("<a></a>").addClass("btn btn-outlined").attr('id', entry).attr('href', entry + '.html').text(options_val[i])).append("<br/>");
            }
        });

        if(html_filename == "index"){
            $("#title").children().remove();
            $("#title").append("<h1>Bienvenue</h1><p>dans la KYChaine</p>");
        }


        $("#statistics").remove();

    }else{
        $("#navbar").append($("<a></a>").addClass("btn btn-outlined").attr('id', 'connect').attr('href', 'signin.html').text("Connexion")).append("<br/>");
    }

    if(islogged == "admin"){
        $("#navbar").append($("<a></a>").addClass("btn btn-outlined").attr('id', 'admin').attr('href', 'admin.html').text("Admin")).append("<br/>");
    }

});



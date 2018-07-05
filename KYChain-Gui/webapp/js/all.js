var server_url = 'http://localhost:8080/api';

function disconnect() {
    $.removeCookie("loggedas");
    window.location.replace("index.html");
}

$(function() {
    $(document).on('click','#disconnect',disconnect);
});

//TODO Cleaner code mort

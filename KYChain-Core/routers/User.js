var logger = require('log4js').getLogger("API/User")


// Get info depuis une key
// To test : localhost:8080/api/user/get/2/
module.exports.getUserInfo = function (req,res) {
    var key = req.params.key
    //TODO Create user in BC
    var data = "";

    // Return code
    if (data != ""){
        // key ok
        res.status(200).send(data);
        logger.debug("200 : getUserInfo { key = " + key + "; data = " + data + "}");
    }else{
        // Key not found
        res.status(404).send("<script>alert('testB');</script>");
        logger.error("404 : getUserInfo { key = " + key + "}");
    }
}
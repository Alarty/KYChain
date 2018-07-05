var logger = require('log4js').getLogger("API/Admin")



// Creation d'un nouvelle utilisateur
// to Test : localhost:8080/api/admin/user/new/1234/Ate/tom/
module.exports.newUser = function (req,res) {
    var CNI = req.params.CNI;
    var Nom = req.params.nom;
    var Prenom = req.params.prenom;

    //TODO Create user in BC
    var InsertOk = true;




    // Return code
    if (InsertOk){
        // Created
        res.status(201).send("<script>alert('testA');</script>");
        logger.debug("201 : newUser { CNI : " + CNI + "; Nom : " + Nom + "; Prenom : " + Prenom + "}");
    }else{
        // Not created
        res.status(304).send("<script>alert('testB');</script>");
        logger.error("304 : newUser { CNI : " + CNI + "; Nom : " + Nom + "; Prenom : " + Prenom + "}");
    }
};
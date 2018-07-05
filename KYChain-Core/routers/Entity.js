var logger = require('log4js').getLogger("API/Entity");
var libxml = require('libxmljs');
var fs = require('fs');

// Creation d'une information
// to Test : localhost:8080/api/entity/advert/2/<Adress....>
module.exports.setUserInfo = function (req,res) {
    var key = req.params.key;
    var data = req.params.data;

    var xsdPathFile = __dirname + "/../config/KYC_Verification.xsd";
    xsd_file = fs.readFileSync(xsdPathFile,"utf8");

    // TODO à supprimer après le test
    // var data = '<Adress><Adresse>69 rue du ricard</Adresse><CP>06951</CP><Ville>Marly Gomont</Ville><Pays>Mongolie</Pays><Principale>1</Principale></Adress>';

    // Validation des data par le xsd
    var xsdDoc = libxml.parseXml(xsd_file);
    var xmlDoc = libxml.parseXml(data);
    var xsdValidation = xmlDoc.validate(xsdDoc);

    // Vérification de la validation des data
    if (xsdValidation){
        logger.debug("Data validate by xsd");
    }else{
        logger.error(xmlDoc.validationErrors);
        res.status(304).send("Data not validate by xsd");
        logger.error("304 : setUserInfo { Key : " + key + "; Data : " + data + "}");
        return;
    }


    var InsertOk = false;
    //TODO Create info in BC

    // Return code
    if (InsertOk){
        // Created
        res.status(201).send("<script>alert('testA');</script>");
        logger.debug("201 : setUserInfo { Key : " + key + "; Data : " + data + "}");
    }else{
        // Not created
        res.status(304).send("<script>alert('testB');</script>");
        logger.error("304 : setUserInfo { Key : " + key + "; Data : " + data + "}");
    }
};
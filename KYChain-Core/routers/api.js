var logger = require('log4js').getLogger("api_dispatcher")
var express = require('express');
var router = express.Router();


var admin = require("./Admin");
var user = require("./User");
var entity = require("./Entity");
//TODO add some routes
router.route("/admin/user/new/:CNI/:nom/:prenom").post(admin.newUser);
router.route("/user/get/:key/").get(user.getUserInfo);
router.route("/entity/advert/:key/:data").post(entity.setUserInfo);


module.exports = router;

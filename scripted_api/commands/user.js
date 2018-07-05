var userAPI = require('../kychaine/user.js')

var rls = require('readline-sync');

module.exports.createUserGUI = function(multichain,cb){
    //TODO add other infos
    var name = rls.question("Name : ")
    userAPI.createUser(multichain,name,(PrivateKey)=>{
      console.log(PrivateKey);
      if(cb)
        cb()
    })

}


module.exports.getPublicKey = function(multichain,cb){
  var addr = rls.question("Address : ")
  userAPI.getPublicKey(multichain,addr,function(err,RSA_KEY){
    console.log(RSA_KEY.exportKey('public'));
    if(cb) cb(RSA_KEY)
  })
}


module.exports.getAllClientInfos = function(multichain,cb){
  var addr = rls.question("Client address : ")
  userAPI.getInfos(multichain,addr,function(err,infos){
    console.log(infos);
    if(cb) cb()
  })
}

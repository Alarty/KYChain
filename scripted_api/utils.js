var colors = require("colors")
var rls = require('readline-sync');

module.exports.printBan = function(){
  console.log(
  " KKKKKKKKK    KKKKKKKYYYYYYY       YYYYYYY        CCCCCCCCCCCCChhhhhhh                                 iiii                    \n".blue+
  " K:::::::K    K:::::KY:::::Y       Y:::::Y     CCC::::::::::::Ch:::::h                                i::::i                   \n".blue+
  " K:::::::K    K:::::KY:::::Y       Y:::::Y   CC:::::::::::::::Ch:::::h                                 iiii                    \n".blue+
  " K:::::::K   K::::::KY::::::Y     Y::::::Y  C:::::CCCCCCCC::::Ch:::::h                                                         \n".blue+
  " KK::::::K  K:::::KKKYYY:::::Y   Y:::::YYY C:::::C       CCCCCC h::::h hhhhh         aaaaaaaaaaaaa   iiiiiii nnnn  nnnnnnnn    \n".blue+
  " K:::::K K:::::K      Y:::::Y Y:::::Y   C:::::C               h::::hh:::::hhh      a::::::::::::a  i:::::i n:::nn::::::::nn  \n".blue+
  " K::::::K:::::K        Y:::::Y:::::Y    C:::::C               h::::::::::::::hh    aaaaaaaaa:::::a  i::::i n::::::::::::::nn \n".blue+
  " K:::::::::::K          Y:::::::::Y     C:::::C               h:::::::hhh::::::h            a::::a  i::::i nn:::::::::::::::n\n".blue+
  " K:::::::::::K           Y:::::::Y      C:::::C               h::::::h   h::::::h    aaaaaaa:::::a  i::::i   n:::::nnnn:::::n\n".blue+
  " K::::::K:::::K           Y:::::Y       C:::::C               h:::::h     h:::::h  aa::::::::::::a  i::::i   n::::n    n::::n\n".blue+
  " K:::::K K:::::K          Y:::::Y       C:::::C               h:::::h     h:::::h a::::aaaa::::::a  i::::i   n::::n    n::::n\n".blue+
  " KK::::::K  K:::::KKK       Y:::::Y        C:::::C       CCCCCC h:::::h     h:::::ha::::a    a:::::a  i::::i   n::::n    n::::n\n".blue+
  " K:::::::K   K::::::K       Y:::::Y         C:::::CCCCCCCC::::C h:::::h     h:::::ha::::a    a:::::a i::::::i  n::::n    n::::n\n".blue+
  " K:::::::K    K:::::K    YYYY:::::YYYY       CC:::::::::::::::C h:::::h     h:::::ha:::::aaaa::::::a i::::::i  n::::n    n::::n\n".blue+
  " K:::::::K    K:::::K    Y:::::::::::Y         CCC::::::::::::C h:::::h     h:::::h a::::::::::aa:::ai::::::i  n::::n    n::::n\n".blue+
  " KKKKKKKKK    KKKKKKK    YYYYYYYYYYYYY            CCCCCCCCCCCCC hhhhhhh     hhhhhhh  aaaaaaaaaa  aaaaiiiiiiii  nnnnnn    nnnnnn\n".blue);
}

module.exports.askMenu = function(){
  console.log("\n");
  console.log("#####################".green);
  console.log("### Commandes API ###".green);
  console.log("#####################".green);
  console.log()

  var pos = [
    "Show BC infos",
    "Show mining infos",
    "Get Public RSA Key",
    "List User infos",
    "Administration"
  ]

  return rls.keyInSelect(pos, "Choice :")+1
}


module.exports.askAdminMenu = function(){
  console.log("\nMenu Admin".underline.red);

  var pos = [
    'Create a stream',
    'List streams',
    'Suscribe to a stream',
    'Unsubscribe a stream',
    'List Keys',
    'List Items',
    'List Items per Keys',
    'Add User'
  ]

  return rls.keyInSelect(pos, "Choice :")+1
}


module.exports.printRPCcallback = function(err,info){
  if(err){
    if(err.message){
      console.log(err.message.red);
    }else{
      console.log(" > Errors ".red);
      console.log(err);
    }
  }
  if(info){
    console.log(" > Response ".cyan);
    console.log(info);
  }
}


/* temporary usefull function */
module.exports.toHex = function toHex(str) {
   return (new Buffer(str)).toString('hex')
 }

module.exports.toAscii = function toAscii(hex){
  return (new Buffer(hex,"hex").toString())
}

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr'

module.exports.encrypt = function encrypt(text, password){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports.decrypt = function decrypt(text, password){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports.generatePassword = function generatePassword(cb){
  crypto.randomBytes(48, function(ex, buf) {
    token = buf.toString('base64').replace(/\//g,'4').replace(/\+/g,'0');
    if(cb){
      cb(token)
    }
  });

}


// HEX DATA MANIPULATION

/* temporary usefull function */
module.exports.toHex = function toHex(str) {
   return (new Buffer(str)).toString('hex')
 }

module.exports.toAscii = function toAscii(hex){
  return (new Buffer(hex,"hex").toString())
}

// KYChaine Toolbox

module.exports.decryptInfo = function decryptInfo(RSAprivateKey, encryptedAESPassword, encryptedData){
  var AES_password = RSAprivateKey.decrypt(new Buffer(encryptedAESPassword, 'hex')).toString('utf8')
  return AESdecrypt(encryptedData,AES_password)
}


// AES Toolbox

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr'

module.exports.AESencrypt = function AESencrypt(content, password){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(content,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports.AESdecrypt = function AESdecrypt(encryptedContent, password){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(encryptedContent,'hex','utf8')
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


var rsaKeys = require("node-rsa")
var crypto = require("./crypto")
var as = require("async")

const PUBLIC_KEYS_STREAM = "pubkeys"
const ADVERTISMENT_STREAM = "advert"
const PASSWORD_STREAM = "passwords"

const RSA_KEYS_SIZE = 512

module.exports.advertInfo = advertInfo
module.exports.getPublicKey = getPublicKey
module.exports.createUser = createUser
module.exports.getInfos = getInfos

function getPublicKey(multichain, address, cb){
  multichain.listStreamPublisherItems({stream: PUBLIC_KEYS_STREAM, address:address,verbose:true},(err,info) => {
    if(err){
        console.error(err);
        if(cb) cb(err)
        return
    }

    if(info.length > 0){
      var str_key = crypto.toAscii(info[0].data)
      var t_key = new rsaKeys(str_key, 'pkcs8-public')
      cb(null,t_key)
    }
  })
}

function advertInfo(multichain, senderAddress, key, data, reveiverRSAkey, cb){

  crypto.generatePassword(function(AES_password){

    //Let's encrypting data using AES
    var str_data = JSON.stringify(data)
    var encrypted_hex_data = crypto.AESencrypt(str_data,AES_password)

    // And now store it in the BlockChain
    multichain.publishFrom({from:senderAddress, stream:ADVERTISMENT_STREAM, key:key, data:encrypted_hex_data}, (err, transactionId)=>{
      if(err){
        console.error(err);
        if(cb) cb(err)
        return
      }
      //We should now publish the encrypted AES password
      // Let's encrypt it with the public key of the user
      var encrypted_hex_password = reveiverRSAkey.encrypt(AES_password).toString('hex')

      //And finnaly publish it
      multichain.publishFrom({from:senderAddress, stream:'passwords', key:transactionId, data:encrypted_hex_password},(err,info) => {
        if(err){
          console.error(err);
          if(cb) cb(err)
          return
        }
        //We're done
        if(cb)
          cb()
      })
    })
  })
}

function createUser(multichain, identity, cb){

  multichain.listPermissions({permissions: "admin"}, (err,info) => {
    if(err){
      console.error(err);
      if(cb) cb(err)
      return
    }

    var admin_address = info[0].address

    // Creating a new address representig the user
    multichain.getNewAddress((err,address) => {
      if(err){
        console.error(err);
        if(cb) cb(err)
        return
      }
      // address contains the newly created address
      // Also creating a new RSA pair key for the user
      var key = new rsaKeys({b:RSA_KEYS_SIZE})
      // Publishing the freshly created key in the 'pubkeys' stream
      var hex_public_key = crypto.toHex(key.exportKey('public'))
      //publishFrom: ["from", "stream", "key", "data"],

      multichain.grant({addresses : address, permissions:'send'},(err,info) => {
        if(err){
          console.error(err);
          if(cb) cb(err)
          return
        }

        multichain.publishFrom({from:address, stream:PUBLIC_KEYS_STREAM, key:'key', data:hex_public_key},(err,info) => {
          if(err){
            console.error(err);
            if(cb) cb(err)
            return
          }

          // Generating a brand new password for data AES encryption
          advertInfo(multichain, admin_address, address+"/identity", identity, key, ()=>{
            if(cb)
              cb(key.exportKey('private'))
          })
        })
      })
    })
  })
}

function getAddressKeys(multichain, address, cb){
  multichain.listStreamKeys({stream:ADVERTISMENT_STREAM, key:"*"},function(err,keys){
    if(err){
      console.error(err);
      if(cb) cb(err)
      return
    }
    // Only keeping interesting keys
    var matching_keys = keys.filter((k) => {return k.key.startsWith(address)})

    cb(matching_keys)
}

function getInfos(multichain, key, cb){
  multichain.listStreamKeys({stream:ADVERTISMENT_STREAM, key:"*"},function(err,keys){
    if(err){
      console.error(err);
      if(cb) cb(err)
      return
    }
    // Only keeping interesting keys
    var matching_keys = keys.filter((k) => {return k.key.startsWith(key)})
    // Getting encrypted data from the blockchain
    as.parallel(matching_keys.map((k) => {
        return function(asyncCallback){
            multichain.listStreamKeyItems({stream:ADVERTISMENT_STREAM, key:k.key},asyncCallback)
        }
    }),function(err, result){
      // We will now get the passwords for theses data
      // We got a first array for each key we're looking for
      as.each(result, function(first_rank_item, first_rank_cb){
        // Then a second array for each value for the given key
        as.each(first_rank_item,function(multichain_item, second_cb){
          // Let's get the encrypted password
          multichain.listStreamItems({stream: PASSWORD_STREAM, key:multichain_item.txid},function(err,result){
            // Add it to the object
            multichain_item.password = result[0].data
            // TODO get the confirmation
            second_cb()
          })
        },first_rank_cb)
      }, function(){
        if(cb){
          // Return the augmented result
          cb(null,result)
        }
      })
    })
  })
}

function createPromiseArray(paramId){
  var t = []

}

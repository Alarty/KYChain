var utils = require('../utils.js')


module.exports = function(multichain,cb){
  multichain.getInfo((err, info) => {
      if(err){
          throw err;
      }
      console.log("\BlockChain infos :\n");
      utils.printRPCcallback(err,info)
      if(cb){
        cb()
      }
  })
}

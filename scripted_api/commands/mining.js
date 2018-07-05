var utils = require('../utils.js')


module.exports = function(multichain,cb){
  multichain.getMiningInfo((err, info) => {
      if(err){
          throw err;
      }
      console.log("\nMining infos :\n");
      utils.printRPCcallback(err,info)
      if(cb){
        cb()
      }
  })
}

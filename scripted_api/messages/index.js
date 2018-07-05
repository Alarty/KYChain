var utils = import("../utils.js")

var DECLARATION_STREAM = "announcment"

module.exports.addDeclaration = function(multichain,from,to,message,cb){
  multichain.publishFrom({
    stream: DECLARATION_STREAM,
    from : from,
    key: to,
    data:message
  },function(){
    if(cb)
      cb()
  })
}

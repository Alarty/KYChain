var colors = require("colors")
var rls = require('readline-sync');
var utils = require('../utils.js')

module.exports.guiCreateStream = function(multichain, cb){

  console.log("\nCreating a new stream");
  var stream_name = rls.question('Name : ')
  multichain.create({
          type:"stream",
          name:stream_name,
          open:true},(err,info) => {

    utils.printRPCcallback(err,info)

    if(cb)
      cb()
  })
}

module.exports.guiListStreams = function(multichain,cb){
  multichain.listStreams({
    stream  :"*",
    verbose : false,
    count: 1000,
    start: 0
  }, (err,info) => {
    console.log("\nExisting streams");
    utils.printRPCcallback(err,info)
    if(cb)
      cb()
  })
}

module.exports.guiSubscribe = function(multichain,cb){
  console.log("\nSubscribing to a stream");
  var stream_name = rls.question('Name : ')
  multichain.subscribe({
    stream  : stream_name,
  }, (err,info) => {
    utils.printRPCcallback(err,info)
    if(cb)
      cb()
  })
}

module.exports.guiUnsubscribe = function(multichain,cb){
  console.log("\nUnsubscribing from a stream");
  var stream_name = rls.question('Name : ')
  multichain.unsubscribe({
    stream  : stream_name,
  }, (err,info) => {
    utils.printRPCcallback(err,info)
    if(cb)
      cb()
  })
}

module.exports.guiListStreamKeyItems = function(multichain,cb){
  console.log("\n Listing stream items for key");
  var stream_name = rls.question('Stream name : ')
  var key = rls.question('Key : ')
  multichain.listStreamKeyItems({
    stream  : stream_name,
    key:key
  }, (err,info) => {
    utils.printRPCcallback(err,info)
    if(cb)
      cb()
  })
}

module.exports.guiListStreamItems = function(multichain,cb){
  console.log("\n Listing stream items");
  var stream_name = rls.question('Stream name :')
  multichain.listStreamItems({
    stream  : stream_name
  }, (err,info) => {
    utils.printRPCcallback(err,info)
    if(cb)
      cb()
  })
}

module.exports.guiListStreamKeys = function(multichain,cb){
  console.log("\n Listing stream keys");
  var stream_name = rls.question('Stream name :')
  multichain.listStreamKeys({
    stream  : stream_name
  }, (err,info) => {
    utils.printRPCcallback(err,info)
    if(cb)
      cb()
  })
}

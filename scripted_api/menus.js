var utils = require("./utils.js")
var streams = require("./commands/stream.js")
var user = require("./commands/user.js")

function adminMenu(){
  var m = module.exports.multichain
  var choice = utils.askAdminMenu()
  switch(choice){
    case 1 :
      streams.guiCreateStream(module.exports.multichain,adminMenu);break;
    case 2 :
      streams.guiListStreams(module.exports.multichain,adminMenu);break;
    case 3 :
      streams.guiSubscribe(m,adminMenu);break;
    case 4 :
      streams.guiUnsubscribe(m,adminMenu);break;
    case 5 :
      streams.guiListStreamKeys(m,adminMenu);break;
    case 6 :
      streams.guiListStreamItems(m,adminMenu);break;
    case 7 :
      streams.guiListStreamKeyItems(m,adminMenu);break;
    case 8 :
      user.createUserGUI(m,adminMenu);break;
    case 0:
      mainMenu()
      break;
   }
}

function mainMenu(){
  var choice = utils.askMenu()
  switch(choice){
    case 1 :
      require("./commands/infos.js")(module.exports.multichain,mainMenu)
      break;
    case 2 :
      require("./commands/mining.js")(module.exports.multichain,mainMenu)
      break;
    case 3:
      user.getPublicKey(module.exports.multichain,mainMenu)
      break;
    case 4:
      user.getAllClientInfos(module.exports.multichain,mainMenu)
      break;
    case 5 :
      adminMenu()
      break;
    case 0:
      return
      break;
   }
}

module.exports.multichain = null

module.exports.mainMenu = mainMenu
module.exports.adminMenu = adminMenu

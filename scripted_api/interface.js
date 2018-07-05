/*
  We're actually running over this API :
      https://github.com/scoin/multichain-node
  Reading line is from :
      https://www.npmjs.com/package/readline-sync
*/

var utils = require("./utils.js")
var menu = require("./menus.js")


if (process.argv.length < 5) {
  console.log("Invalid usage :");
  console.log(" > node interface.js <chain_name> <rpcpassword> <base_dir>");
}


SCRIPT_DIR = process.argv[4]

// Display some funny text
utils.printBan()

// Etablishing link with the BlockChain Via JSON RPC API
var multichain = require("multichain-node")({
    port: 6282,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: process.argv[3]
});

menu.multichain = multichain
menu.mainMenu()

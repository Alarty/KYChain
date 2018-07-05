/**
 * Created by KYChain on 18/03/17.
 */

var logger = require('log4js').getLogger("Serveur")
var express = require('express')
var compression = require('compression')

// Opening configuration
var web_config = require("./config/web_server_config.js")

var app = express();
var api_router = require("./routers/api.js")

// TODO Check for authentification right here
//app.use

// All calls to /api will be redirect to the REST API router
app.use("/api",api_router)

// Let's GZIP all of that
app.use(compression())

// Serving static file, the GUI app
app.use(express.static("../KYChain-Gui/webapp/"));

// Choosing for HTTPS
var HTTPS = false;
if(HTTPS) {
  //TODO
}
else{
  app.listen(web_config.http_config.port,function(){
    logger.warn("Server is running over HTTP unsecure connection");
    logger.info("Web service started, alvailable over port "+web_config.http_config.port)
  })
}

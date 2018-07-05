#!/bin/bash

cd KYChain-Core

mkdir -p Trace
if [ "$1" = "-d" ] || [ "$1" = "-v" ]; then
    nodejs KYChain_server.js | tee Trace/Server.log
else
    nodejs KYChain_server.js > Trace/Server.log
fi

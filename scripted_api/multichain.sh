#!/bin/bash

Yc='\033[1;33m'
Gc='\033[0;32m'
Nc='\033[0m' # No Color

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MULTICHAIN_PATH="$SCRIPT_DIR/../multichain_bin"
TEMP_PATH="$SCRIPT_DIR/../tmpdatas"

BLCHN="testing-chain"

init_needed=false

# Checking into the path for multichian binaries
echo -e $Yc"> Checking path ..."$Nc
if [ -z `echo $PATH | grep "multichain"` ] ; then
  echo "   - Adding multichain binaries to the PATH"
  export PATH="$PATH:$MULTICHAIN_PATH"
fi

# Creating a new block chain if needed
if [ ! -f "$TEMP_PATH/multichain.conf" ] ; then
  init_needed=true
  echo -e $Yc"> Creating a testing BlockChain : $BLCHN"$Nc
  if [ ! -d $TEMP_PATH ] ; then
    echo "   Creating temp directory"
    mkdir $TEMP_PATH
  fi
  multichain-util -datadir="$TEMP_PATH" create $BLCHN
  echo 'rpcport=6282' >> $TEMP_PATH/$BLCHN/multichain.conf
fi


echo -e $Gc"> Launching mining daemon"$Nc
multichaind $BLCHN --datadir="$TEMP_PATH" & #2&> /dev/null &
DAEMON_PID=$!

# That's ugly
sleep .5

if $init_needed ; then
  echo -e $Yc" > Initializing KYChaine Structure"$Nc
  sleep 3
  echo -e $Yc" > Creating <pubkeys> stream"$Nc
  multichain-cli $BLCHN --datadir="$TEMP_PATH" create stream pubkeys true 2>/dev/null
  echo -e $Yc" > Creating <advert> stream"$Nc
  multichain-cli $BLCHN --datadir="$TEMP_PATH" create stream advert true 2>/dev/null
  echo -e $Yc" > Creating <passwords> stream"$Nc
  multichain-cli $BLCHN --datadir="$TEMP_PATH" create stream passwords true 2>/dev/null
  echo -e $Yc" > Subscribing"$Nc
  multichain-cli $BLCHN --datadir="$TEMP_PATH" subscribe pubkeys false 2>/dev/null
  multichain-cli $BLCHN --datadir="$TEMP_PATH" subscribe advert false  2>/dev/null
  multichain-cli $BLCHN --datadir="$TEMP_PATH" subscribe passwords false  2>/dev/null
fi


echo -e $Gc"> Launching interface"$Nc
# Getting the RPC password to allow the node app to access the chain
password=`cat $TEMP_PATH/$BLCHN/multichain.conf | grep rpcpassword | cut -d '=' -f 2`


node $SCRIPT_DIR/interface.js $BLCHN $password $SCRIPT_DIR

echo -e $Yc"> Stopping daemon"$Nc
kill -s INT $DAEMON_PID

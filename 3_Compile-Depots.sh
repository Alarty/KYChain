#!/bin/bash

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# KYChain
	echo -e $YELLOW'KYChain ...'$NC
	echo -e $GREEN'KYChain OK.'$NC

# Core
	echo -e $YELLOW'KYChain-Core ...'$NC
	cd KYChain-Core/
	cd ..
	echo -e $GREEN'KYChain-Core OK.'$NC

#GUI
	echo -e $YELLOW'KYChain-Gui ...'$NC
	cd KYChain-Gui
	cd ..
	echo -e $GREEN'KYChain-Gui OK.'$NC


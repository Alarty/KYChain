#!/bin/bash

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo
echo " KKKKKKKKK    KKKKKKKYYYYYYY       YYYYYYY        CCCCCCCCCCCCChhhhhhh                                 iiii                    "
echo " K:::::::K    K:::::KY:::::Y       Y:::::Y     CCC::::::::::::Ch:::::h                                i::::i                   "
echo " K:::::::K    K:::::KY:::::Y       Y:::::Y   CC:::::::::::::::Ch:::::h                                 iiii                    "
echo " K:::::::K   K::::::KY::::::Y     Y::::::Y  C:::::CCCCCCCC::::Ch:::::h                                                         "
echo " KK::::::K  K:::::KKKYYY:::::Y   Y:::::YYY C:::::C       CCCCCC h::::h hhhhh         aaaaaaaaaaaaa   iiiiiii nnnn  nnnnnnnn    "
echo " K:::::K K:::::K      Y:::::Y Y:::::Y   C:::::C               h::::hh:::::hhh      a::::::::::::a  i:::::i n:::nn::::::::nn  "
echo " K::::::K:::::K        Y:::::Y:::::Y    C:::::C               h::::::::::::::hh    aaaaaaaaa:::::a  i::::i n::::::::::::::nn "
echo " K:::::::::::K          Y:::::::::Y     C:::::C               h:::::::hhh::::::h            a::::a  i::::i nn:::::::::::::::n"
echo " K:::::::::::K           Y:::::::Y      C:::::C               h::::::h   h::::::h    aaaaaaa:::::a  i::::i   n:::::nnnn:::::n"
echo " K::::::K:::::K           Y:::::Y       C:::::C               h:::::h     h:::::h  aa::::::::::::a  i::::i   n::::n    n::::n"
echo " K:::::K K:::::K          Y:::::Y       C:::::C               h:::::h     h:::::h a::::aaaa::::::a  i::::i   n::::n    n::::n"
echo " KK::::::K  K:::::KKK       Y:::::Y        C:::::C       CCCCCC h:::::h     h:::::ha::::a    a:::::a  i::::i   n::::n    n::::n"
echo " K:::::::K   K::::::K       Y:::::Y         C:::::CCCCCCCC::::C h:::::h     h:::::ha::::a    a:::::a i::::::i  n::::n    n::::n"
echo " K:::::::K    K:::::K    YYYY:::::YYYY       CC:::::::::::::::C h:::::h     h:::::ha:::::aaaa::::::a i::::::i  n::::n    n::::n"
echo " K:::::::K    K:::::K    Y:::::::::::Y         CCC::::::::::::C h:::::h     h:::::h a::::::::::aa:::ai::::::i  n::::n    n::::n"
echo " KKKKKKKKK    KKKKKKK    YYYYYYYYYYYYY            CCCCCCCCCCCCC hhhhhhh     hhhhhhh  aaaaaaaaaa  aaaaiiiiiiii  nnnnnn    nnnnnn"

echo

echo -e $GREEN"> Téléchargement des dépots git"$NC
echo -n '   Nom utilisateur gitlab : '
read User
echo -n '   Mot de passe : '
read -s Pass
echo

#GUI
	echo -e $YELLOW'> KYChain-Gui ...'$NC
	git clone http://$User:$Pass@tpth.dev-bs.com/gitlab/BlockChain/KYChain-Gui.git
	echo -e $GREEN'> KYChain-Gui OK.'$NC

#Core
	echo -e $YELLOW'> KYChain-Core ...'$NC
	git clone http://$User:$Pass@tpth.dev-bs.com/gitlab/BlockChain/KYChain-Core.git
	echo -e $YELLOW"   Installation des dépendances ..."$NC
	cd KYChain-Core
	npm install
	echo -e $GREEN'> KYChain-Core OK.'$NC
	cd ..

#MultiChain
	echo -e $YELLOW'> MultiChain ...'$NC
	echo -e $YELLOW"   Téléchargement de l'archive ..."$NC
	wget http://www.multichain.com/download/multichain-1.0-alpha-28.tar.gz
	echo -e $YELLOW"   Extraction ..."$NC
	tar -xvzf multichain-1.0-alpha-28.tar.gz -C multichain_bin
	echo -e $YELLOW"   Nettoyage ..."$NC
	rm multichain-1.0-alpha-28.tar.gz
	echo -e $GREEN'> MultiChain OK.'$NC

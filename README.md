KYChain
=======

**Back end :** https://tpth.dev-bs.com/gitlab/BlockChain/KYChain-Core

**Front end :** https://tpth.dev-bs.com/gitlab/BlockChain/KYChain-Gui

Dépendances
-----------

* `wget`
* `npm`

Initialisation du projet :
--------------------------

    git clone http://tpth.dev-bs.com/gitlab/BlockChain/KYChain.git
    cd KYChain
    ./1_Init.sh

Utils:
------

Pour mettre à jour tous vos dépôts :

    ./2_Pull-Depots.sh

Pour compiler tous les projets :

    ./3_Compile-Depots.sh

Lancer le serveur avec la commande suivante (rajouter -d pour afficher les logs):

    ./Start_Server.sh

Notes:
------

Pensez à rajouter les binaires `multichain/src` : `multichaind`, `multichain-cli` et `multitchain-util` dans votre `PATH`

var doc = $("document");
var tabplayer = $(".tabPlayer");
var tabPlayer = [];
var cellsPlayed = [];
var tabcpu = $(".tabCPU");
var tabCPU = [];
var tabCPUships = [];
var tabPlayerships = [];
var score = 0;
var scoreCPU = 0;
var missRest = 100; //Nombre de missile du joueur humain
var missCP = '∞'; //Nombre de missile de l'IA
var tirPrecedentReussi = "non";
var tirDessus = false;
var tirDessous = false;
var tirGauche = false;
var tirDroite = false;
var bonus = 3400;

///////////////////////////////////////////////////
// Génération du tableau Player avec ids
///////////////////////////////////////////////////
doc.ready(function createTabPlay() {
    tabplayer.append("<tr><td id='missile'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes
    for (var i = 65; i <= 74; i++) {
        tabplayer.append("<tr id='P" + String.fromCharCode(i) + "'><td>" + String.fromCharCode(i) + "</td>");
        for (var j = 1; j <= 10; j++) {
            $("#P" + String.fromCharCode(i)).append("<td id='P" + j + "-" + (i - 64) + "'><img class='img-responsive' src='img/sea.gif'></td>");
        }
        tabplayer.append("</tr>");
    }
});

/////////////////////////////////////////////////////
// Génération du tableau CPU avec ids
//////////////////////////////////////////////////////
doc.ready(function createTabCPU() {
    tabcpu.append("<tr><td id='missCP'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes
    for (var i = 65; i <= 74; i++) {// Création des 10 lignes de jeu
        tabcpu.append("<tr id='" + String.fromCharCode(i) + "'><td>" + String.fromCharCode(i) + "</td>");// La première case de chaque ligne est la lettre
        for (j = 1; j <= 10; j++) {
            $("#" + String.fromCharCode(i)).append("<td id='" + j + "-" + (i - 64) + "'><img class='img-responsive hoverLight' src='img/sea.gif'></td>");// création des cellules avec id perso de 1-1 à 10-10
        }
        tabcpu.append("</tr>");// fin de ligne, ajout du tag de clôture
    }
});

//////////////////////////////////////////////////////////////
// Fonction de récupération de l'id de la cellule cliquée
// + Génération du nombre de missiles
//////////////////////////////////////////////////////////////
function tdClicked() {
    $("#missCP").append("<img class='img-responsive' src='img/missile.png'/>" + missCP);
    $("#missile").append("<img class='img-responsive' src='img/missile.png'/>" + missRest);
    $(".tabCPU").on("click", "td", function () {
        $("#missile").empty();
        if (missRest > 0) {
            missRest -= 1; // A chaque clic sur une case ennemie, on enlève un missile
        }
        $("#missile").append("<img class='img-responsive' src='img/missile.png'/>" + missRest);
        if (missRest === 0) {
            alert("Plus de coup disponible");
        }
        if (missRest > 0) {
            if (tabCPUships.indexOf(this.id) !== -1) { // si l'ID de la cellule cliquée est dans la liste des cellules du tableau de jeu du CPU
                console.log(" PLAYER A TOUCHE ! " + this.id + " " + tabCPUships.indexOf(this.id));
                score += 100;
                $("#scorePlayer").html(score);
                $(this).html("<img class='img-responsive hoverLight' src='img/flammes.gif' style='background-color: darkred; opacity: 0.8'>");
            }
            else { // sinon le coup est raté
                console.log("RATE ! " + this.id + " " + tabCPUships.indexOf(this.id));
                $(this).html("<img class='img-responsive' src='img/sea.gif' style='opacity: 1'>");
            }
            cpuPlay(); // au tour du CPU de jouer
        }
    });
}

///////////////////////////////////////////////////////
// Fonction de jouer un coup CPU
//////////////////////////////////////////////////////
function cpuPlay() {
    if (tirPrecedentReussi !== "non") {
        seekAndDestroy(tirPrecedentReussi);
    }
    else {
        var coup = tabPlayer[Math.floor(Math.random() * tabPlayer.length)]; // récupération d'une cellule aléatoire dans le tableau de choix de cellules
        var coupStr = coup.toString();
        var indexTable = tabPlayer.indexOf(coup);
        var index = tabPlayerships.indexOf(coupStr); // récupération de l'index du tableau contenant cette cellule
        var cellule = "#P" + coupStr;
        if (index > -1) { // si l'index a bien été récupéré, le coup a touché !
            tir(cellule, coupStr, indexTable, "touche");
            tirPrecedentReussi = coupStr; // transmission de la cellule touchée à la fonction de recherche de cellules autour via cette var
        }
        else { // sinon le coup est raté
            tir(cellule, coupStr, indexTable, "manque");
        }
    }
}

///////////////////////////////////////////////////
// Fonction de recherche autour d'une cellule touchée
///////////////////////////////////////////////////
function seekAndDestroy(tirPrecedentReussi1) {
    var ligne = Number(tirPrecedentReussi1[2]);
    var colonne = Number(tirPrecedentReussi1[0]);
    var cellule;
    if ((tirDessus === false) && colonne >= 2 && (tabPlayer.indexOf(colonne + "-" + (ligne-1)) < 0)) { // si on a pas essayé de tirer au dessus et qu'il y a une cellule (qui est dispo dans le tableau des coups jouables)
        ligne -= 1;
        cellule = colonne + "-" + ligne;
        tir(cellule, cellule, 1, "seek");
        tirDessus = true;
    }
    else if ((tirDroite === false) && ligne <= 9 && (tabPlayer.indexOf((colonne+1) + "-" + ligne) < 0)) { // essai à droite
        colonne += 1;
        cellule = colonne + "-" + ligne;
        tir(cellule, cellule, 1, "seek");
        tirDroite = true;
    }
    else if ((tirDessous === false) && colonne <= 9 && (tabPlayer.indexOf(colonne + "-" + (ligne+1)) < 0)) { // essai en dessous
        ligne += 1;
        cellule = colonne + "-" + ligne;
        tir(cellule, cellule, 1, "seek");
        tirDessous = true;
    }
    else if ((tirGauche === false) && ligne >= 2 && (tabPlayer.indexOf((colonne-1) + "-" + ligne) < 0)) { // essai à gauche
        colonne -= 1;
        cellule = colonne + "-" + ligne;
        tir(cellule, cellule, 1, "seek");
        tirGauche = true;
    }
    else {
        tirPrecedentReussi = "non"; // si toutes les cellules alentour ont été jouées, tirer au hasard
        tirDessous = false;
        tirDessus = false;
        tirGauche = false;
        tirDroite = false;
        cpuPlay();
    }
}

////////////////////////////////////////////////////
// Fonction de tir CPU touché
///////////////////////////////////////////////////
function tir(cellule, coupStr, indexTable, action) {
    if (action === "touche") {
        $(cellule).html("<img class='img-responsive' src='img/bateau.png' style='background-color: red; opacity: 0.5'>");
        tabPlayer.splice(indexTable, 1); // suppression de cette cellule, elle ne pourra plus être jouée une 2ème fois
        bonus -= 200;
        console.log("CPU A TOUCHE ! " + coupStr + " " + indexTable);
        scoreCPU += 100;
        $("#scoreCPU").html(scoreCPU);
        $(cellule).html("<img class='img-responsive hoverLight' src='img/flammes.gif' style='background-color: darkred; opacity: 0.8'>");
    }
    else if (action === "manque") {
        console.log("CPU A RATE ! Cellule : " + coupStr);
        $(cellule).html("<img class='img-responsive' src='img/sea.gif' style='opacity: 0.6'>");
        tabPlayer.splice(indexTable, 1); // suppression de cette cellule, elle ne pourra plus être jouée une 2ème fois
    }
    else if (action === "seek") {
        var index = tabPlayerships.indexOf(coupStr); // récupération de l'index du tableau contenant cette cellule
        cellsPlayed.splice(index);
        var cellule2 = "#P" + coupStr;
        indexTable = tabPlayer.indexOf(cellule);
        if (index > -1) { // si l'index a bien été récupéré, le coup a touché !
            tir(cellule2, coupStr, indexTable, "touche");
            tirPrecedentReussi = coupStr; // transmission de la cellule touchée à la fonction de recherche de cellules autour via cette var
        }
        else { // sinon le coup est raté
            tir(cellule2, coupStr, indexTable, "manque");
        }
    }
}

///////////////////////////////////////////////////////
//Fonction de choix de cellules CPU
///////////////////////////////////////////////////////
function choixCPU() {
    var rand = Math.random();
    var lettre = rand.toString()[3]; // lettre aléatoire de A à J notée de 0 à 9 en récupérant un des chiffres après la virgule du nombre généré
    var chiffre = rand.toString()[2]; // chiffre aléatoire de 0 à 9 en récupérant un autre chiffre après la virgule du nombre généré
    return chiffre + lettre;
}

///////////////////////////////////////////////////////////
// Fonction vidage du tableau CPU
//////////////////////////////////////////////////////////
function vidageTabCPU() {
    for (var i = 1; i <= 10; i++) {
        for (var j = 1; j <= 10; j++) {
            tabCPU.push([i + "-" + j]); // début du jeu, vidage du tableau de mémorisation des bateaux du CPU
        }
    }
}

////////////////////////////////////////////////////////////
// Fonction vidage du tableau Player
////////////////////////////////////////////////////////////
function vidageTabPlayer() {
    for (var i = 1; i <= 10; i++) {
        for (var j = 1; j <= 10; j++) {
            tabPlayer.push([i + "-" + j]); // début du jeu, vidage du tableau de mémorisation des bateaux du player
        }
    }
}
////////////////////////////////////////////////////////////
// Fonction vidage du tableau  des coups joués par Player
////////////////////////////////////////////////////////////
function vidageCellsPlayed() {
    for (var i = 1; i <= 10; i++) {
        for (var j = 1; j <= 10; j++) {
            cellsPlayed.push([i + "-" + j]); // début du jeu, vidage du tableau de mémorisation des bateaux du player
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// Fonction d'initialisation du CPU
//////////////////////////////////////////////////////////////////////////////////////
function initialisation() {
    vidageTabCPU();
    vidageTabPlayer();
    vidageCellsPlayed();
    tdClicked();
    placer(5); // porteAvion
    placer(4); // croiseur
    placer(3); // contreTorpilleur
    placer(3); // sousMarin
    placer(2); // torpilleur
    //console.log(tabPlayer);
    //console.log(tabCPUships);
    playerShips(5);// porteAvion JOUEUR
    playerShips(4);// croiseur JOUEUR
    playerShips(3);// contreTorpilleur JOUEUR
    playerShips(3);// sousMarin JOUEUR
    playerShips(2);// torpilleur JOUEUR
    //console.log(tabPlayerships);
    $("#init").attr("class", " btn btn-danger disabled"); //après avoir cliqué sur le bouton jouer, le désactiver
    $("#init").text("Partie en cours !");
}

//////////////////////////////////////////
// Fonction de placement des bateaux CPU
//////////////////////////////////////////
function placer(taille) {
    var rand = Math.random();
    var horiz = true; // variable qui gère si le bateau sera placé à l'horizontale ou verticale
    var choix = choixCPU(); // génération d'un choix de case aléatoire
    var chiffre = Number(choix.charAt(0)) + 1; // chiffre généré, qui est le premier chiffre du nombre retourné par choixCPU, convertie en number étant donné que la fonction return un string
    var lettre = Number(choix.charAt(1)) + 1; // lettre générée, qui est le 2ème chiffre du nombre retourné par choix CPU, les 2 ont ensuite 1 d'ajouté pour aller de 1 à 10
    if (rand >= 0.5) {
        horiz = false; // utilisation d'un random, s'il est au dessus de 0.5 alors le bateau sera en position verticale
    }
    if (horiz) { // Si le bateau doit être placé à l'horizontal
        if (((chiffre + parseInt(taille)) <= 10) && (chiffre + parseInt(taille) >= 3) && (lettre <= 10) && (chiffre <= 10)) { // vérifier que le bateau tiendra bien dans le tableau
            for (var k = chiffre; k < (chiffre + parseInt(taille)); k++) {
                if (tabCPUships.indexOf(k + "-" + lettre) > -1) { // si le tableau comprends déjà une case occupée par la future position du bateau
                    placer(taille); // rechoisir une cellule de départ et recommencer
                }
                else {
                    for (var k = chiffre; k < (chiffre + parseInt(taille)); k++) { // pour case de départ jusqu'à case d'arrivée
                        tabCPUships.push(k + "-" + lettre); // ajout dans le tableau de la case occupée par la partie de bateau
                        if (tabCPUships.length === 17) { // quand tous les bateaux sont placés, sortir
                            return 1;
                        }
                    }
                }
            }
        }
        else {
            setTimeout(function(){
                placer(taille);
            }, 2000);
        }
    }
    else { // sinon le bateau sera placé à la verticale
        if (((lettre + parseInt(taille)) <= 10) && (lettre + parseInt(taille) >= 3) && (chiffre <= 10 && (lettre <= 10))) { // idem horizontal
            for (var k = lettre; k < (lettre + parseInt(taille)); k++) {
                if (tabCPUships.indexOf(chiffre + "-" + k) > -1) {
                    placer(taille);
                }
                else {
                    for (var k = lettre; k < (lettre + parseInt(taille)); k++) {
                        //var idV = "#" + chiffre + "-" + k;
                        tabCPUships.push(chiffre + "-" + k);
                        if (tabCPUships.length === 17) {
                            return 1;
                        }
                    }
                }
            }
        }
        else {
            setTimeout(function(){
                placer(taille);
            }, 2000);        }
    }
}

/////////////////////////////////////////////////////
//Fonction de placement des bateaux par le joueur
/////////////////////////////////////////////////////
function playerShips(taille) {
    var rand = Math.random();
    var horiz = true; // variable qui gère si le bateau sera placé à l'horizontale ou verticale
    var choix = choixCPU(); // génération d'un choix de case aléatoire --> utilisation de la fonction choixCPU au lieu de faire 2 fois la même fonction
    var chiffre = Number(choix.charAt(0)) + 1; // chiffre généré, qui est le premier chiffre du nombre retourné par choixCPU, convertie en number étant donné que la fonction return un string
    var lettre = Number(choix.charAt(1)) + 1; // lettre générée, qui est le 2ème chiffre du nombre retourné par choix CPU, les 2 ont ensuite 1 d'ajouté pour aller de 1 à 10
    if (rand >= 0.5) {
        horiz = false; // utilisation d'un random, s'il est au dessus de 0.5 alors le bateau sera en position verticale
    }
    if (horiz) { // Si le bateau doit être placé à l'horizontal
        if (((chiffre + parseInt(taille)) <= 10) && (chiffre + parseInt(taille) >= 3) && (lettre <= 10 && (chiffre <= 10))) { // vérifier que le bateau tiendra bien dans le tableau
            for (var k = chiffre; k < (chiffre + parseInt(taille)); k++) { // pour case de départ jusqu'à case d'arrivée
                if (tabPlayerships.indexOf(k + "-" + lettre) > -1) {
                    playerShips(taille);
                }
                else {
                    for (var k = chiffre; k < (chiffre + parseInt(taille)); k++) {
                        var id = "#P" + k + "-" + lettre;
                        tabPlayerships.push(k + "-" + lettre); // ajout dans le tableau de la case occupée par la partie de bateau
                        $(id).html("<img class='img-responsive' src='img/bateau.png'>"); //affiche la position des bateaux du joueur
                        if (tabPlayerships.length === 17) {
                            return 1;
                        }
                    }
                }
            }
        }
        else {
            setTimeout(function(){
                playerShips(taille);
            }, 2000);        }
    }
    else { // sinon le bateau sera placé à la verticale
        if (((chiffre + parseInt(taille)) <= 10) && (chiffre + parseInt(taille) >= 3) && (chiffre <= 10 && (lettre <= 10))) { // idem horizontal
            for (var k = lettre; k < (lettre + parseInt(taille)); k++) {
                if (tabPlayerships.indexOf(chiffre + "-" + k) > -1) {
                    playerShips(taille);
                }
                else {
                    for (var k = lettre; k < (lettre + parseInt(taille)); k++) {
                        var idV = "#P" + chiffre + "-" + k;
                        tabPlayerships.push(chiffre + "-" + k);
                        $(idV).html("<img class='img-responsive' src='img/bateau.png'>"); // affiche la position des bateaux du joueur
                        if (tabPlayerships.length === 17) {
                            return 1;
                        }
                    }
                }
            }
        }
        else {
            setTimeout(function(){
                playerShips(taille);
            }, 2000);        }
    }
}

////////////////////////////////////////////////////////////////
// Fonction de calcul du score
////////////////////////////////////////////////////////////////
function calculScore(){
    var player = prompt("Bravo ! \n Vous avez fait un score de : " + score.toString() + " + " + bonus + "pts de bonus ! \n Soit un score total de " + (score+bonus) + "pts !");

}

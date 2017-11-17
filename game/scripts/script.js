var doc = $("document");
var tabplayer = $(".tabPlayer");
var tabPlayer = [];
var tabcpu = $(".tabCPU");
var tabCPU = [];
var tabCPUships = [];
var score = 0;
var missRest = 35; //Nombre de missile du joueur humain
var missCP = '∞'; //Nombre de missile de l'IA

///////////////////////////////////////////////////
// Génération du tableau Player avec ids
///////////////////////////////////////////////////
doc.ready(function createTabPlay() {
    tabplayer.append("<tr><td id='missile'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes
    for (var i = 65; i <= 74; i++) {
        tabplayer.append("<tr id='P" + String.fromCharCode(i) + "'><td>" + String.fromCharCode(i) + "</td>");
        for (var j = 1; j <= 10; j++) {
            $("#P" + String.fromCharCode(i)).append("<td id='P" + (i - 64) + "-" + j + "'><img class='img-responsive' src='img/sea.gif'></td>");
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
doc.ready(function tdClicked() {
    $("#missCP").append("<img class='img-responsive' src='img/missile.png'/>" + missCP);
    $("#missile").append("<img class='img-responsive' src='img/missile.png'/>" + missRest);
    $(".tabCPU").on("click", "td", function () {
        $("#missile").empty();
        if (missRest > 0){
            missRest -= 1; // A chaque clic sur une case ennemie, on enlève un missile
        }
        $("#missile").append("<img class='img-responsive' src='img/missile.png'/>" + missRest);
        if (missRest === 0) {
            alert("Plus de coup disponible");
            //missRest = 1; // pour contrer la décrementation
        }
        if (missRest > 0) {
            if (tabCPUships.indexOf(this.id) !== -1) { // si l'ID de la cellule cliquée est dans la liste des cellules du tableau de jeu du CPU
                console.log("TOUCHE !");
                score += 100;
                $("#scorePlayer").html(score);
                $(this).html("<img class='img-responsive hoverLight' src='img/flammes.gif' style='background-color: darkred; opacity: 0.8'>");
            }
            else { // sinon le coup est raté
                console.log("RATE !");
                $(this).html("<img class='img-responsive' src='img/sea.gif' style='opacity: 1'>");
            }
            cpuPlay(); // au tour du CPU de jouer
        }
        //console.log(this.id);
    });
});

///////////////////////////////////////////////////////
// Fonction de jouer un coup CPU
//////////////////////////////////////////////////////
function cpuPlay() {
    var coup = tabPlayer[Math.floor(Math.random() * tabPlayer.length)]; // récupération d'une cellule aléatoire dans le tableau de choix de cellules
    var index = tabPlayer.indexOf(coup); // récupération de l'index du tableau contenant cette cellule
    if (index > -1) { // si l'index a bien été récupéré
        var cellule = "#P" + coup;
        $(cellule).html("<img class='img-responsive' src='img/bateau.png' style='background-color: red; opacity: 0.5'>");
        tabPlayer.splice(index, 1); // suppression de cette cellule, elle ne pourra plus être jouée une 2ème fois
    }
    //console.log(cellule);
}

///////////////////////////////////////////////////////
//Fonction de choix de cellules CPU
///////////////////////////////////////////////////////
function choixCPU() {
    var rand = Math.random();
    var lettre = rand.toString()[3]; // lettre aléatoire de A à J notée de 0 à 9 en récupérant un des chiffres après la virgule du nombre généré
    var chiffre = rand.toString()[2]; // chiffre aléatoire de 0 à 9 en récupérant un autre chiffre après la virgule du nombre généré
    //console.log("OOO "+chiffre+"/"+lettre);
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
            tabPlayer.push([i + "-" + j]); // début du jeu, vidage du tableau de mémorisation des bateaux du CPU
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////
// Fonction d'initialisation du CPU
//////////////////////////////////////////////////////////////////////////////////////
doc.ready(function initialisation() {
    vidageTabCPU();
    vidageTabPlayer();
    placer(5); // porteAvion
    placer(4); // croiseur
    placer(3); // contreTorpilleur
    placer(3); // sousMarin
    placer(2); // torpilleur
    //console.log(tabPlayer);
    console.log(tabCPUships);
});

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
        if (((chiffre + parseInt(taille)) <= 10) && (chiffre + parseInt(taille) >= 3)) { // vérifier que le bateau tiendra bien dans le tableau
            for (var k = chiffre; k < (chiffre + parseInt(taille)); k++) {
                if (tabCPUships.indexOf(k + "-" + lettre) > -1) { // si le tableau comprends déjà une case occupée par la future position du bateau
                    placer(taille); // rechoisir une cellule de départ et recommencer
                }
                else {
                    for (var k = chiffre; k < (chiffre + parseInt(taille)); k++) { // pour case de départ jusqu'à case d'arrivée
                        //var id = "#" + k + "-" + lettre;
                        tabCPUships.push(k + "-" + lettre); // ajout dans le tableau de la case occupée par la partie de bateau
                        //$(id).html("<img class='img-responsive hoverLight' src='img/bateau.png' style='opacity: 0.3'>"); // remplacement de l'image de fonds des cases occupées, pour DEBUG uniquement
                        //console.log(id);
                        if (tabCPUships.length === 17){ // quand tous les bateaux sont placés, sortir
                            return 1;
                        }
                    }
                }
            }
        }
        else {
            placer(taille);
        }
    }
    else { // sinon le bateau sera placé à la verticale
        if (((lettre + parseInt(taille)) <= 10) && (lettre + parseInt(taille) >= 3)) { // idem horizontal
            for (var k = lettre; k < (lettre + parseInt(taille)); k++) {
                if (tabCPUships.indexOf(chiffre + "-" + k) > -1){
                    placer(taille);
                }
            else {
                    for (var k = lettre; k < (lettre + parseInt(taille)); k++) {
                        //var idV = "#" + chiffre + "-" + k;
                        tabCPUships.push(chiffre + "-" + k);
                        //$(idV).html("<img class='img-responsive hoverLight' src='img/bateau.png'>"); // remplacement de l'image de fonds des cases occupées, pour DEBUG uniquement
                        if (tabCPUships.length === 17){
                            return 1;
                        }
                    }
                }
            }
        }
        else {
            placer(taille);
        }
    }
    // console.log("choix : " + chiffre + "-" + lettre);
}

/////////////////////////////////////////////////////
//Fonction de placement des bateaux par le joueur
/////////////////////////////////////////////////////
doc.ready(function placeShipsPLAYER() {
    //TODO
    var porteAvion = "5cases";
    var croiseur = "4cases";
    var contreTorpilleur = "3cases";
    var sousMarin = "3cases";
    var Torpilleur = "2cases";
    $(".tabPlayer").on("click", ".drop", function () {
        $(this).empty();
        $(this).append("<img class='img-responsive' src='img/bateau.png'/>");

    });
});

var doc = $("document");
var tabplayer = $(".tabPlayer");
var tabcpu = $(".tabCPU");
var tabCPU = [];

// Génération du tableau Player avec ids
doc.ready(function createTabPlay() {

    tabplayer.append("<tr><td id='missile'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes    
    for (i = 65; i <= 74; i++) {
        tabplayer.append("<tr id='P" + String.fromCharCode(i) + "'><td>" + String.fromCharCode(i) + "</td>");
        for (j = 1; j <= 10; j++) {
            $("#P" + String.fromCharCode(i)).append("<td class='drop' id='" + String.fromCharCode(i) + "-" + j + "'><img class='img-responsive' src='img/sea.gif'></td>");
        }
        tabplayer.append("</tr>");
    }
});

// Génération du tableau CPU avec ids
doc.ready(function createTabCPU() {

    tabcpu.append("<tr><td id='missCP'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes
    for (i = 65; i <= 74; i++) {// Création des 10 lignes de jeu
        tabcpu.append("<tr id='" + String.fromCharCode(i) + "'><td>" + String.fromCharCode(i) + "</td>");// La première case de chaque ligne est la lettre
        for (j = 1; j <= 10; j++) {
            $("#" + String.fromCharCode(i)).append("<td id='" + String.fromCharCode(i) + "-" + j + "'><img class='img-responsive hoverLight' src='img/sea.gif'></td>");// création des cellules avec id perso
        }
        tabcpu.append("</tr>");// fin de ligne, ajout du tag de clôture
    }
});
// Fonction de récupération de l'id de la cellule cliquée
// + Génération du nombre de missiles
doc.ready(function tdClicked() {
    missRest = 35; //Nombre de missile du joueur humain
    missCP = '∞'; //Nombre de missile de l'IA
    $("#missCP").append("<img class='img-responsive' src='img/missile.png'/>" + missCP);
    $("#missile").append("<img class='img-responsive' src='img/missile.png'/>" + missRest);
    $(".tabCPU").on("click", "td", function () {
        $("#missile").empty();
        missRest -= 1; // A chaque clic sur une case ennemie, on enlève un missile
        $("#missile").append("<img class='img-responsive' src='img/missile.png'/>" + missRest);
        if (missRest == 0) {
            alert("Plus de coup disponible");
            missRest = 1; // pour contrer la décrementation
        };
        console.log(this.id);
    });
});

//Fonction de choix de cellules CPU
function choixCPU() {
    var randC = Math.random();
    var randL = Math.random();
    var lettre = String.fromCharCode(Number(randL.toString()[3]) + 65); // génération d'une lettre aléatoire de A à J
    var chiffre = Number(randC.toString()[3]) + 1; // génération d'un chiffre aléatoire entre 1 et 10
    return chiffre + "-" + lettre;
}

// Fonction vidage du tableau CPU
function vidageTabCPU() {
    for (var i = 1; i <= 10; i++) {
        for (var j = 1; j <= 10; j++) {
            tabCPU.push([i, j, 0]); // début du jeu, vidage du tableau de mémorisation des bateaux du CPU
        }
    }
}

// Fonction d'initialisation du CPU à lancer une fois que le joueur clique sur "Prêt"
doc.ready(function initialisation() {
    vidageTabCPU();
    placer(5); // porteAvion
    placer(4); // croiseur
    placer(3); // contreTorpilleur
    placer(3); // sousMarin
    placer(2); // torpilleur
    console.log(tabCPU);
});

// Fonction de placement des bateaux CPU
function placer(taille) {
    var rand = Math.random();
    var horiz = true; // variable qui gère si le bateau sera placé à l'horizontale ou verticale
    var choix = choixCPU(); // génération d'un choix de case aléatoire
    var chiffre = choix.charAt(0); // chiffre généré
    var lettre = (choix.charCodeAt(2)) - 64; // lettre générée
    var k = 0;
    var l = 0;
    if (lettre >= 0 && lettre <= 10) {
        if (rand >= 0.5) {
            horiz = false; // utilisation d'un random, s'il est au dessus de 0.5 alors le bateau sera en position verticale
        }
        if (horiz) { // Si le bateau doit être placé à l'horizontal
            if ((parseInt(chiffre) + parseInt(taille)) <= 10) {
                for (k = chiffre; k < (parseInt(chiffre) + parseInt(taille)); k++) {
                    // tabCPU[k][parseInt(lettre)][0] = 1;
                }
            }
            else {
                placer(taille);
            }
        }
        else { // sinon le bateau sera placé à la verticale
            if ((parseInt(lettre) + parseInt(taille)) <= 10) {
                // TODO placer le bateau dans le tableau
                //console.log("placement bateau vertical en partant de " + choix + " sur " + taille + " cases de haut  <10 ?"+parseInt(chiffre) + "+" + parseInt(taille));
            }
            else {
                placer(taille);
            }
        }
    }
    else placer(taille)
    //console.log("choix : " + chiffre + "-" + lettre);
}

//Fonction de placement des bateaux par le joueur
doc.ready(function placeShipsPLAYER() {
    //TODO
    var porteAvion ="5cases";
    var croiseur = "4cases";
    var contreTorpilleur = "3cases";
    var sousMarin = "3cases";
    var Torpilleur = "2cases";
    $(".tabPlayer").on("click", ".drop", function () {
        $(this).empty();
        $(this).append("<img class='img-responsive' src='img/bateau.png'/>");
        
    });
});

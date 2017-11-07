// Génération du tableau Player avec ids
var doc = $("document");
var tabplayer = $(".tabPlayer");
var tabcpu = $(".tabCPU");
doc.ready(function createTabPlay(){
    for (i=65; i<=74; i++){
        tabplayer.append("<tr>");
        for (j=1; j<=10; j++){
            tabplayer.append("<td id='"+String.fromCharCode(i)+"-"+j+"'><img class='img-responsive' src='img/sea.gif'></td>");
        }
        tabplayer.append("</tr>");
    }
    tabplayer.append("</tbody>");
    
});

// Génération du tableau CPU avec ids
doc.ready(function createTabCPU(){
    tabcpu.append("<tr><td id='celvide'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes
    for (i=65; i<=74; i++){// Création des 10 lignes de jeu
        tabcpu.append("<tr id='"+String.fromCharCode(i)+"'><td>"+String.fromCharCode(i)+"</td>");// La première case de chaque ligne est la lettre
        for (j=1; j<=10; j++){
            $("#"+String.fromCharCode(i)).append("<td id='"+String.fromCharCode(i)+"-"+j+"'><img class='img-responsive hoverLight' src='img/sea.gif'></td>");// création des cellules avec id perso
        }
        tabcpu.append("</tr>");// fin de ligne, ajout du tag de clôture
    }
});

// Fonction de récupération de l'id de la cellule cliquée
doc.ready(function tdClicked(){
    $("#tabCPUConst").on("click", "td", function() {
        console.log(this.id);
    });
});

//Fonction de placement des bateaux par le CPU
doc.ready(function placeShipsCPU(){
    //TODO
});

//Fonction de placement des bateaux par le joueur
doc.ready(function placeShipsPLAYER(){
    //TODO
});

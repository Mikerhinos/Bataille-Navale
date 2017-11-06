// Génération du tableau Player avec ids
$("document").ready(function createTabPlay(){
    for (i=65; i<=74; i++){
        $(".tabPlayer").append("<tr>");
        for (j=1; j<=10; j++){
            $(".tabPlayer").append("<td id='"+String.fromCharCode(i)+"-"+j+"'><img class='img-responsive' src='img/sea.gif'></td>");
        }
        $(".tabPlayer").append("</tr>");
    }
    $(".tabPlayer").append("</tbody>");
    
});

// Génération du tableau CPU avec ids
$("document").ready(function createTabCPU(){
    $(".tabCPU").append("<tr><td id='celvide'></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>");// Header des numéros de colonnes
    for (i=65; i<=74; i++){// Création des 10 lignes de jeu
        $(".tabCPU").append("<tr id='"+String.fromCharCode(i)+"'><td>"+String.fromCharCode(i)+"</td>");// La première case de chaque ligne est la lettre
        for (j=1; j<=10; j++){
            $("#"+String.fromCharCode(i)).append("<td id='"+String.fromCharCode(i)+"-"+j+"'><img class='img-responsive hoverLight' src='img/sea.gif'></td>");// création des cellules avec id perso
        }
        $(".tabCPU").append("</tr>");// fin de ligne, ajout du tag de clôture
    }
});

// Fonction de récupération de l'id de la case cliquée
$("document").ready(function tdClicked(){
    $("#tabCPUConst").on("click", "td", function() {
        console.log(this.id);
    });
});

//Fonction de placement des bateaux par le CPU
$("document").ready(function placeShipsCPU(){
    //TODO
});

//Fonction de placement des bateaux par le joueur
$("document").ready(function placeShipsPLAYER(){
    //TODO
});

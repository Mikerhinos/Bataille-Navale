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
    for (i=65; i<=74; i++){
        $(".tabCPU").append("<tr>");
        for (j=1; j<=10; j++){
            $(".tabCPU").append("<td id='"+String.fromCharCode(i)+"-"+j+"'><img class='img-responsive hoverLight' src='img/sea.gif'></td>");
        }
        $(".tabCPU").append("</tr>");
    }
    $(".tabCPU").append("</tbody>");
});

$("document").ready(function tdClicked(){
    $("#tabCPUConst").on("click", "td", function() {
        console.log(this.id);
    });
});


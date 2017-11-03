var tab1 = [];

function createTab(){
    console.log("prout");
    for (i=65; i<=74; i++){
        $("#tabPlayer").append("<tr>");
        for (j=1; j<=10; j++){
            $("#tabPlayer").append("<td id='"+String.fromCharCode(i)+"-"+j+"'></td>");
        }
        $("#tabPlayer").append("</tr>");
    }
}


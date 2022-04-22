$(document).ready(function(){
    $("#btnOk").click(function(){
        var qtd = document.getElementById("qtd").value;
        switch(qtd){
            case "0":
                document.getElementById("slctAno2").style.display = "block";
                break;
            case "1":
                document.getElementById("slctCidades2").style.display = "block";
                break;
            case "2":
                document.getElementById("slctCidades2").style.display = "block";
                document.getElementById("slctCidades3").style.display = "block";
                break
            default:
                break;
        }

    })
})
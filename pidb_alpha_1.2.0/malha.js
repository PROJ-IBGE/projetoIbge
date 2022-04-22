$(document).ready(function(){
    // MALHA DO ESTADO
    $("#slctEstados").change(function(){
        if( $("#slctEstados option:selected").text() == "Selecione um estado" ){
            return
        } else {
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    document.getElementById("retMalhaE").style.display = "flex";
                    var malhaE = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/estados/"+$("#slctEstados").val()+"?formato=image/svg+xml&qualidade=maxima'>"
                    $("#retMalhaE").html(malhaE);
                }
            })
        }
    })

    // MALHA DO MUNICÍPIO
    $("#slctCidades").change(function(){       
        if($("#slctCidades option:selected").text() == "Selecione uma cidade"){
            return;
        } else {
            $("#btnConsultar").click(function(){
                var malhaC = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/municipios/"+$("#slctCidades").val()+"?formato=image/svg+xml&qualidade=maxima' title='Malha da cidade'>"
                $("#retMalhaC").html(malhaC);
            })
        }
    })
})
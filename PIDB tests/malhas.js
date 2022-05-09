$(document).ready(function(){
    // Retorna a malha do estado
    $("#slctEstados").change(function(){
        if( $("#slctEstados option:selected").text() == "Selecione um estado" ){
            return
        } else {
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    var malhaE = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/estados/"+$("#slctEstados").val()+"?formato=image/svg+xml&qualidade=maxima'>";
                    $("#retMalhaEstado").html(malhaE);
                }
            })
        }
    })
    // Retorna a malha da cidade
    $("#slctCidades").change(function(){
        if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
            return
        } else {
            $("#btnConsultar").click(function(){
                var malhaC = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/municipios/"+$("#slctCidades").val()+"?formato=image/svg+xml&qualidade=maxima'>";
                $("#retMalhaCidade").html(malhaC);
            })
        }
    })
})
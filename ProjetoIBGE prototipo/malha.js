$(document).ready(function(){
    // MALHA DO MUNICÍPIO
    $("#slctCidades").change(function(){       
        if($("#slctCidades option:selected").text() == "Selecione uma cidade"){
            return;
        } else {
            $("#btnConsultar").click(function(){
                var malha = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/municipios/"+$("#slctCidades").val()+"?formato=image/svg+xml&qualidade=maxima' title='Malha da cidade'>"
                $("#retMalha").html(malha);
            })
        }
    })
})
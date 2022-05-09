// Informações de outras opções selecionadas. Para comparações
$(document).ready(function(){
    // Quando um segundo ano é selecionado para slctCidades
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctAno2").change(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    switch($("#slctAno2").val()){
                        case "2007":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno2").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopCA2' value='"+populacao[0].resultados[0].series[0].serie['2007']+"'>";
                                    $("#retPopulacaoCA2").html(populacaoCidade);
                                }
                            })
                            break
                        case "2010":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno2").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopCA2' value='"+populacao[0].resultados[0].series[0].serie['2010']+"'>";
                                    $("#retPopulacaoCA2").html(populacaoCidade);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno2").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno2").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopCA2' value='"+populacao[0].resultados[0].series[0].serie[$("#slctAno2").val()]+"'>";
                                    $("#retPopulacaoCA2").html(populacaoCidade);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
    // População quando uma segunda cidade é selecionada
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    switch($("#slctAno").val()){
                        case "2007":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopC2A' value='"+populacao[0].resultados[0].series[0].serie['2007']+"'>";
                                    $("#retPopulacaoC2").html(populacaoCidade);
                                }
                            })
                            break
                        case "2010":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopC2A' value='"+populacao[0].resultados[0].series[0].serie['2010']+"'>";
                                    $("#retPopulacaoC2").html(populacaoCidade);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopC2A' value='"+populacao[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPopulacaoC2").html(populacaoCidade);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
    // Área Total quando uma segunda cidade é selecionada
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades2").val()+"]" ,
                        type: "GET",
                        data:{},
                        success: function(area){
                            var areaC = "Área Territorial: ";
                            areaC = areaC+"<input type='text' readonly id='inpAreaC2' value='"+area[0].resultados[0].series[0].serie['2010']+"'>km2";
                            $("#retAreaC2").html(areaC);
                        }
                    })
                }
            })
        }
    })
})
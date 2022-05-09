$(document).ready(function(){
    // Retorna o nome da cidade
    $("#slctCidades").change(function(){
        if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
            return
        } else {
            $("#btnConsultar").click(function(){
                var valueCidade = $("#slctCidades option:selected").text();
                $("#retNomeCidade").html(valueCidade);
            })
        }
    })
    // Retorna a Densidade Demográfica da cidade
    $("#slctDensidadeDmg").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else{
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N6["+$("#slctCidades").val()+"]",
                        type: "GET",
                        data:{},
                        success: function(densidadeDmg){
                            var densidadeDmgC = "Densidade Demográfica: ";
                            densidadeDmgC = densidadeDmgC + "<input type='text' readonly id='inpDensC' value='"+densidadeDmg[0].resultados[0].series[0].serie['2010']+"' > hab/km2";
                            $("#retDensidadeDmgC").html(densidadeDmgC);
                        }
                    })
                }
            })
        }
    })
    // Retorna o PIB da cidade
    $("#slctPib").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    switch($("#slctAno").val()){
                        case "2001":
                        case "2002":
                        case "2003":
                        case "2004":
                        case "2005":
                        case "2006":
                        case "2007":
                        case "2008":
                        case "2009":
                        case "2010":
                        case "2011":
                        case "2012":
                        case "2013":
                        case "2014":
                        case "2015":
                        case "2016":
                        case "2017":
                        case "2018":
                        case "2019":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/"+$("#slctAno").val()+"/variaveis/37?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(pib){
                                    var pibC = "PIB em "+$("#slctAno").val()+": R$";
                                    pibC = pibC+"<input type='text' readonly id='inpPibC' value='"+pib[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPibC").html(pibC);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2019/variaveis/37?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(pib){
                                    var pibC = "PIB em 2019: R$";
                                    pibC = pibC+"<input type='text' readonly id='inpPibC' value='"+pib[0].resultados[0].series[0].serie['2019']+"'>";
                                    $("#retPibC").html(pibC);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
    // Retorna população da cidade
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    switch($("#slctAno").val()){
                        case "2007":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopCA' value='"+populacao[0].resultados[0].series[0].serie['2007']+"'>";
                                    $("#retPopulacaoC").html(populacaoCidade);
                                }
                            })
                            break
                        case "2010":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopCA' value='"+populacao[0].resultados[0].series[0].serie['2010']+"'>";
                                    $("#retPopulacaoC").html(populacaoCidade);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoCidade = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade = populacaoCidade+"<input type='text' readonly id='inpPopCA' value='"+populacao[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPopulacaoC").html(populacaoCidade);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
    // Retorna a Área Total da cidade
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades").val()+"]" ,
                        type: "GET",
                        data:{},
                        success: function(area){
                            var areaC = "Área Territorial: ";
                            areaC = areaC+"<input type='text' readonly id='inpAreaC' value='"+area[0].resultados[0].series[0].serie['2010']+"'>km2";
                            $("#retAreaC").html(areaC);
                        }
                    })
                }
            })
        }
    })
    // Retorna a escolarização total das pessoas, de homens e de mulheres da cidade com mais de 10 anos
    $("#slctEscolarizacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    // Escolarização total %
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6["+$("#slctCidades").val()+"]&classificacao=2[6794]",
                        type: "GET",
                        data:{},
                        success: function(escolarTotal){
                            var escolarTotalC = "Alfabetização total de pessoas com 10 anos: ";
                            escolarTotalC = escolarTotalC+"<input type='text' readonly id='inpETC' value='"+escolarTotal[0].resultados[0].series[0].serie['2010']+"'>%";
                            $("#retEscolarizacaoCT").html(escolarTotalC);
                        }
                    })
                    // Escolarização de homens %
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6["+$("#slctCidades").val()+"]&classificacao=2[4]",
                        type: "GET",
                        data:{},
                        success: function(escolarHomens){
                            var escolarHomensC = "Alfabetização total de homens com 10 anos: ";
                            escolarHomensC = escolarHomensC+"<input type='text' readonly id='inpEHC' value='"+escolarHomens[0].resultados[0].series[0].serie['2010']+"'>%";
                            $("#retEscolarizacaoCH").html(escolarHomensC);
                        }
                    })
                    // Escolarização de mulheres %
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6["+$("#slctCidades").val()+"]&classificacao=2[5]",
                        type: "GET",
                        data:{},
                        success: function(escolarMulheres){
                            var escolarMulheresC = "Alfabetização total de mulheres com 10 anos: ";
                            escolarMulheresC = escolarMulheresC+"<input type='text' readonly id='inpEMC' value='"+escolarMulheres[0].resultados[0].series[0].serie['2010']+"'>%";
                            $("#retEscolarizacaoCM").html(escolarMulheresC);
                        }
                    })
                }
            })
        }
    })
})
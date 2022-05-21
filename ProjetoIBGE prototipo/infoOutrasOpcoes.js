$(document).ready(function(){  // Informações de outras opções selecionadas. Para comparações
    $("#slctPopulacao").change(function(){  //População quando um segundo ano é selecionado
        if( $(this).prop("checked") == true ){
            $("#slctAno2").change(function(){
                switch($("#slctAno2").val()){
                    case "2007":
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(popul){
                                var populacaoAno2 = "<td>População em "+$("#slctAno2").val()+":</td>";
                                populacaoAno2 = populacaoAno2+"<td><input class='restInp' type='text' readonly id='inpPopulacaoAno2' value='"+popul[0].resultados[0].series[0].serie['2007']+"'></td>";
                                $("#retPopulacaoAno2").html(populacaoAno2);
                            }
                        })
                        break
                    case "2010":
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(popul){
                                var populacaoAno2 = "<td>População em "+$("#slctAno2").val()+":</td>";
                                populacaoAno2 = populacaoAno2+"<td><input class='restInp' type='text' readonly id='inpPopulacaoAno2' value='"+popul[0].resultados[0].series[0].serie['2010']+"'></td>";
                                $("#retPopulacaoAno2").html(populacaoAno2);
                            }
                        })
                        break
                    default:
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno2").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(popul){
                                var populacaoAno2 = "<td>População em "+$("#slctAno2").val()+":</td>";
                                populacaoAno2 = populacaoAno2+"<td><input class='restInp' type='text' readonly id='inpPopulacaoAno2' value='"+popul[0].resultados[0].series[0].serie[$("#slctAno2").val()]+"'></td>";
                                $("#retPopulacaoAno2").html(populacaoAno2);
                            }
                        })
                        break
                }
            })
        }
    })
    
    $("#slctPib").change(function(){  //PIB quando um segundo ano é selecionado
        if( $(this).prop("checked") == true ){
            $("#slctAno2").change(function(){
                switch($("#slctAno2").val()){
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
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/"+$("#slctAno2").val()+"/variaveis/37?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(pibAno2){
                                var pib = "PIB em "+$("#slctAno2").val()+": R$";
                                pib = pib+"<input type='text' readonly id='inpPibAno2' value='"+pibAno2[0].resultados[0].series[0].serie[$("#slctAno2").val()]+"'>";
                                $("#retPibAno2").html(pib);
                            }
                        })
                        break
                    default:
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2019/variaveis/37?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(pibAno2){
                                var pib = "PIB em 2019: R$";
                                pib = pib+"<input type='text' readonly id='inpPibAno2' value='"+pibAno2[0].resultados[0].series[0].serie['2019']+"'>";
                                $("#retPibAno2").html(pib);
                            }
                        })
                        break
                }
            })
        }
    })
    
    $("#slctPopulacao").change(function(){  // População quando uma segunda cidade é selecionada
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                if( $("#slctCidades2 option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    switch($("#slctAno").val()){
                        case "2007":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(popul){
                                    var populacaoCidade2 = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade2 = populacaoCidade2+"<input type='text' readonly id='inpPopulacaoCidade2' value='"+popul[0].resultados[0].series[0].serie['2007']+"'>";
                                    $("#retPopulacaoCidade2").html(populacaoCidade2);
                                }
                            })
                            break
                        case "2010":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(popul){
                                    var populacaoCidade2 = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade2 = populacaoCidade2+"<input type='text' readonly id='inpPopulacaoCidade2' value='"+popul[0].resultados[0].series[0].serie['2010']+"'>";
                                    $("#retPopulacaoCidade2").html(populacaoCidade2);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(popul){
                                    var populacaoCidade2 = "População em "+$("#slctAno").val()+": ";
                                    populacaoCidade2 = populacaoCidade2+"<input type='text' readonly id='inpPopulacaoCidade2' value='"+popul[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPopulacaoCidade2").html(populacaoCidade2);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
    
    $("#slctAreaT").change(function(){  // Área Total quando uma segunda cidade é selecionada
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                if( $("#slctCidades2 option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades2").val()+"]" ,
                        type: "GET",
                        data:{},
                        success: function(area){
                            var areaCidade2 = "Área Territorial: ";
                            areaCidade2 = areaCidade2+"<input type='text' readonly id='inpAreaCidade2' value='"+area[0].resultados[0].series[0].serie['2010']+"'>km2";
                            $("#retAreaCidade2").html(areaCidade2);
                        }
                    })
                }
            })
        }
    })
    
    $("#slctPib").change(function(){  //PIB quando uma segunda cidade é selecionada
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                if( $("#slctCidades2 option:selected").text() == "Selecione uma cidade" ){
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
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/"+$("#slctAno").val()+"/variaveis/37?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(pib){
                                    var pibCidade2 = "PIB em "+$("#slctAno").val()+": R$";
                                    pibCidade2 = pibCidade2+"<input type='text' readonly id='inpPibCidade2' value='"+pib[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPibCidade2").html(pibCidade2);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2019/variaveis/37?localidades=N6["+$("#slctCidades2").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(pib){
                                    var pibCidade2 = "PIB em 2019: R$";
                                    pibCidade2 = pibCidade2+"<input type='text' readonly id='inpPibCidade2' value='"+pib[0].resultados[0].series[0].serie['2019']+"'>";
                                    $("#retPibCidade2").html(pibCidade2);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
    
    $("#slctDensidadeDmg").change(function(){  //Densidade Demográfica quando uma segunda cidade é selecionada
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                if( $("#slctCidades2 option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N6[" + $("#slctCidades2").val() + "]" ,
                        type: "GET" ,
                        data: {} ,
                        success: function(densidadeDmg){
                            var densidadeCidade2 = "<td>Densidade Demográfica[2010]:</td>"
                            densidadeCidade2 = densidadeCidade2 + "<td><input class='restInp' type='text' readonly id='inpDensidadeCidade2' value='"+densidadeDmg[0].resultados[0].series[0].serie['2010']+"'>hab/km2</td>";
                            $("#retDensidadeDmgCidade2").html(densidadeCidade2);
                        }
                    })
                }
            })
        }
    })

    $("#slctEscolarizacao").change(function(){ //Escolaridade quando uma segunda cidade é selecionada
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").click(function(){
                if( $("#slctCidades2 option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    $.ajax({  // Escolarização total %
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" + $("#slctCidades2").val() + "]&classificacao=2[6794]",
                        type: "GET",
                        data:{},
                        success: function(escolarTotal){
                            var escolarizacaoTotal = "<td>Alfabetização total de pessoas com 10 anos:</td>";
                            escolarizacaoTotal = escolarizacaoTotal + "<td><input class='restInp' type='text' readonly id='inpEscTotal2' value='" + escolarTotal[0].resultados[0].series[0].serie['2010'] + "'>%</td>";
                            $("#retEscolarizacaoTotal2").html(escolarizacaoTotal);
                        }
                    })
                    $.ajax({  // Escolarização de homens %
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" + $("#slctCidades2").val() + "]&classificacao=2[4]",
                        type: "GET",
                        data:{},
                        success: function(escolarHomens){
                            var escolarizacaoHomens = "<td>Alfabetização total de homens com 10 anos:</td>";
                            escolarizacaoHomens = escolarizacaoHomens + "<td><input class='restInp' type='text' readonly id='inpEscHomens2' value='" + escolarHomens[0].resultados[0].series[0].serie['2010'] + "'>%</td>";
                            $("#retEscolarizacaoHomens2").html(escolarizacaoHomens);
                        }
                    })
                    $.ajax({  // Escolarização de mulheres %
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" + $("#slctCidades2").val() + "]&classificacao=2[5]",
                        type: "GET",
                        data:{},
                        success: function(escolarMulheres){
                            var escolarizacaoMulheres = "<td>Alfabetização total de mulheres com 10 anos:</td>";
                            escolarizacaoMulheres = escolarizacaoMulheres + "<td><input class='restInp' type='text' readonly id='inpEscMulheres2' value='" + escolarMulheres[0].resultados[0].series[0].serie['2010'] + "'>%</td>";
                            $("#retEscolarizacaoMulheres2").html(escolarizacaoMulheres);
                        }
                    })
                }
            })
        }
    })
})
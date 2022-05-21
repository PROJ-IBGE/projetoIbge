$(document).ready(function(){  // TUDO RELACIONADO AOS MUNICÍPIOS
    $("#slctCidades").change(function(){  // Função que serve para retornar o nome da cidade selecionado
        if($("#slctCidades option:selected").text() == "Selecione uma cidade"){
            return;
        } else {
            $("#btnConsultar").click(function(){ // Quando o btnConsultar for clicado ele deve retornar a div resposta
                // A div resposta e comparação passam a ser visíveis
                document.getElementById("resposta").style.display = 'flex';
                document.getElementById("comparar").style.display = 'block';
                // Retorna o nome da cidade
                var valueCidade = $("#slctCidades option:selected").text();
                $("#retNomeCidade").html(valueCidade);
            })    
        }
    })
    
    $("#slctAreaT").change(function(){  // Retorna as informações da Área Territorial
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // link do agregado Área Territorial da unidade territorial (Área Total) do municipio selecionado
                $.ajax({  // Método de conexão
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6[" + $("#slctCidades").val() + "]" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(areaT){
                        var areaTerritorial = "<td>Área Territorial:</td>"
                        areaTerritorial = areaTerritorial + "<td><input class='restInp' type='text' readonly id='inpArea' value='" + areaT[0].resultados[0].series[0].serie['2010'] + "'>km2</td>";
                        $("#retAreaT").html(areaTerritorial);
                    }
                })
            })
        }
    })

    $("#slctDensidadeDmg").change(function(){  // Retorna as informações da Densidade Demográfica
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // link do agregado Densidade demográfica da unidade territorial (Densidade Demográfica) do periodo de 2010 do estado selecionado
                $.ajax({  // Método de conexão
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N6[" + $("#slctCidades").val() + "]" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(densidadeDmg){
                        var densidade = "<td>Densidade Demográfica[2010]:</td>"
                        densidade = densidade + "<td><input class='restInp' type='text' readonly id='inpDensidade' value='" + densidadeDmg[0].resultados[0].series[0].serie['2010'] + "'>hab/km2</td>";
                        $("#retDensidadeDmg").html(densidade);
                    }
                })
            })
        }
    })

    $("#slctPopulacao").change(function(){  // Retorna as informações da População
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                switch ($("#slctAno").val()){ // Existem diferentes links para a população: 2007, 2010 e demais anos
                    case "2007":  // ANO 2007
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6[" + $("#slctCidades").val() + "]",
                            type: "GET",
                            data:{},
                            success: function(popul){
                                var populacao = "<td>População em " + $("#slctAno").val() + ":</td>";
                                populacao = populacao + "<td><input class='restInp' type='text' readonly id='inpPopulacao' value='" + popul[0].resultados[0].series[0].serie['2007'] + "'></td>";
                                $("#retPopulacao").html(populacao);
                            }
                        })
                        break
                    case "2010":  // ANO 2010
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6[" + $("#slctCidades").val() + "]",
                            type: "GET",
                            data:{},
                            success: function(popul){
                                var populacao = "<td>População em " + $("#slctAno").val() + ":</td>";
                                populacao = populacao + "<td><input class='restInp' type='text' readonly id='inpPopulacao' value='" + popul[0].resultados[0].series[0].serie['2010'] + "'></td>";
                                $("#retPopulacao").html(populacao);
                            }
                        })
                        break
                    default:  // Demais anos. 
                        // Link do agregado Estimativas de população (população residente estimada) para o município
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" + $("#slctAno").val() + "/variaveis/9324?localidades=N6[" + $("#slctCidades").val() + "]" ,
                            type: "GET" ,
                            data: {} ,
                            success: function(popul){
                                var populacao = "<td>População em " + $("#slctAno").val() + ":</>";
                                populacao = populacao + "<td><input class='restInp' type='text' readonly id='inpPopulacao' value='" + popul[0].resultados[0].series[0].serie[$("#slctAno").val()] + "'></td>";
                                $("#retPopulacao").html(populacao);
                            }
                        })
                        break
                }
            })
        }
    })
   
    $("#slctEscolarizacao").change(function(){ // Retorna a escolarização total das pessoas, de homens e de mulheres da cidade com mais de 10 anos
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    return
                } else {
                    $.ajax({  // Escolarização total %
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" + $("#slctCidades").val() + "]&classificacao=2[6794]",
                        type: "GET",
                        data:{},
                        success: function(escolarTotal){
                            var escolarizacaoTotal = "<td>Alfabetização total de pessoas com 10 anos:</td>";
                            escolarizacaoTotal = escolarizacaoTotal + "<td><input class='restInp' type='text' readonly id='inpEscTotal' value='" + escolarTotal[0].resultados[0].series[0].serie['2010'] + "'>%</td>";
                            $("#retEscolarizacaoTotal").html(escolarizacaoTotal);
                        }
                    })
                    $.ajax({  // Escolarização de homens %
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" + $("#slctCidades").val() + "]&classificacao=2[4]",
                        type: "GET",
                        data:{},
                        success: function(escolarHomens){
                            var escolarizacaoHomens = "<td>Alfabetização total de homens com 10 anos:</td>";
                            escolarizacaoHomens = escolarizacaoHomens + "<td><input class='restInp' type='text' readonly id='inpEscHomens' value='" + escolarHomens[0].resultados[0].series[0].serie['2010'] + "'>%</td>";
                            $("#retEscolarizacaoHomens").html(escolarizacaoHomens);
                        }
                    })
                    $.ajax({  // Escolarização de mulheres %
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" + $("#slctCidades").val() + "]&classificacao=2[5]",
                        type: "GET",
                        data:{},
                        success: function(escolarMulheres){
                            var escolarizacaoMulheres = "<td>Alfabetização total de mulheres com 10 anos:</td>";
                            escolarizacaoMulheres = escolarizacaoMulheres + "<td><input class='restInp' type='text' readonly id='inpEscMulheres' value='" + escolarMulheres[0].resultados[0].series[0].serie['2010'] + "'>%</td>";
                            $("#retEscolarizacaoMulheres").html(escolarizacaoMulheres);
                        }
                    })
                }
            })
        }
    })

    $("#slctPib").change(function(){ // Retorna o PIB do município (AS INFORMAÇÕES VÃO ATÉ 2019)
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
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
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/" + $("#slctAno").val() + "/variaveis/37?localidades=N6[" + $("#slctCidades").val() + "]",
                            type: "GET",
                            data:{},
                            success: function(pibCidade){
                                var pib = "<td>PIB em " + $("#slctAno").val() + ":</td><td>R$";
                                pib = pib + "<input class='restInp' type='text' readonly id='inpPib' value='" + pibCidade[0].resultados[0].series[0].serie[$("#slctAno").val()] + "'></td>";
                                $("#retPib").html(pib);
                            }
                        })
                        break
                    default:
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2019/variaveis/37?localidades=N6[" + $("#slctCidades").val() + "]",
                            type: "GET",
                            data:{},
                            success: function(pibCidade){
                                var pib = "<td>PIB em 2019:</td><td>R$";
                                pib = pib + "<input class='restInp' type='text' readonly id='inpPib' value='" + pibCidade[0].resultados[0].series[0].serie['2019'] + "'></td>";
                                $("#retPib").html(pib);
                            }
                        })
                        break
                }
            })
        }
    })
})
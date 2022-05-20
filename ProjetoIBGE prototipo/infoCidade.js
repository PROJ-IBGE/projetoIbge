$(document).ready(function(){
    // TUDO RELACIONADO AOS MUNICÍPIOS
    // Função que serve para capturar a informação "MUNICÍPIO" quando um estado é selecionado
    // A captura é feita a cada vez que um município diferente é selecionado
    $("#slctCidades").change(function(){
        if($("#slctCidades option:selected").text() == "Selecione uma cidade"){
            return;
        } else {
            // Quando o btnConsultar for clicado ele deve retornar a div resposta
            $("#btnConsultar").click(function(){
                // A div resposta passa a ser visível
                document.getElementById("resposta").style.display = 'flex';
                document.getElementById("comparar").style.display = 'block';

                var valueCidade = $("#slctCidades option:selected").text();
                $("#retNomeCidade").html(valueCidade);
            })    
        }
    })

    // Caso o input do tipo checkbox relacionada a Área Territorial seja selecionado, retorna as informações da Área Territorial
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // link do agregado Área e Densidade demográfica da unidade territorial (Área Total) do periodo de 2010 do municipio selecionado
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades").val()+"]" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(areaT){
                        var areaTC = "<td>Área Territorial:</td>"
                        areaTC = areaTC + "<td><input class='restInp' type='text' readonly id='inpArea' value='"+areaT[0].resultados[0].series[0].serie['2010']+"'>km2</td>";
                        $("#retareaTC").html(areaTC);
                    }
                })
            })
        }
    })

    // Caso o input do tipo checkbox relacionada a Densidade Demográfica seja selecionado e for verdadeiro, retorna as informações da Densidade Demográfica
    $("#slctDensidadeDmg").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // link do agregado Área e Densidade demográfica da unidade territorial (Densidade Demográfica) do periodo de 2010 do estado selecionado
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N6[" + $("#slctCidades").val() + "]" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(densidadeDmg){
                        var densidadeDmgC = "<td>Densidade Demográfica[2010]:</td>"
                        densidadeDmgC = densidadeDmgC + "<td><input class='restInp' type='text' readonly value='"+densidadeDmg[0].resultados[0].series[0].serie['2010']+"'>hab/km2</td>";
                        $("#retDensidadeDmgC").html(densidadeDmgC);
                    }
                })
            })
        }
    })

    // Caso o input do tipo checkbox relacionada a População seja selecionado e for verdadeiro, retorna as informações da População
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                switch ($("#slctAno").val()){
                    case "2007":
                        // ANO 2007
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(populacao){
                                var populacaoC = "<td>População em " + $("#slctAno").val() + ":</td>";
                                populacaoC = populacaoC + "<td><input class='restInp' type='text' readonly id='inpPopC' value='"+populacao[0].resultados[0].series[0].serie['2007']+"'></td>";
                                $("#retPopulacaoC").html(populacaoC);
                            }
                        })
                        break
                    case "2010":
                        // ANO 2010
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{},
                            success: function(populacao){
                                var populacaoC = "<td>População em " + $("#slctAno").val() + ":</td>";
                                populacaoC = populacaoC + "<td><input class='restInp' type='text' readonly id='inpPopC' value='"+populacao[0].resultados[0].series[0].serie['2010']+"'></td>";
                                $("#retPopulacaoC").html(populacaoC);
                            }
                        })
                        break
                    default:
                        // link do agregado Estimativas de população (população residente estimada) para o município
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {} ,
                            success: function(populacao){
                                var populacaoC = "<td>População em " + $("#slctAno").val() + ":</>";
                                populacaoC = populacaoC + "<td><input class='restInp' type='text' readonly id='inpPopC' value='"+populacao[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'></td>";
                                $("#retPopulacaoC").html(populacaoC);
                            }
                        })
                        break
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
                            var escolarTotalC = "<td>Alfabetização total de pessoas com 10 anos:</td>";
                            escolarTotalC = escolarTotalC+"<td><input class='restInp' type='text' readonly id='inpETC' value='"+escolarTotal[0].resultados[0].series[0].serie['2010']+"'>%</td>";
                            $("#retEscolarizacaoCT").html(escolarTotalC);
                        }
                    })
                    // Escolarização de homens %
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6["+$("#slctCidades").val()+"]&classificacao=2[4]",
                        type: "GET",
                        data:{},
                        success: function(escolarHomens){
                            var escolarHomensC = "<td>Alfabetização total de homens com 10 anos:</td>";
                            escolarHomensC = escolarHomensC+"<td><input class='restInp' type='text' readonly id='inpEHC' value='"+escolarHomens[0].resultados[0].series[0].serie['2010']+"'>%</td>";
                            $("#retEscolarizacaoCH").html(escolarHomensC);
                        }
                    })
                    // Escolarização de mulheres %
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6["+$("#slctCidades").val()+"]&classificacao=2[5]",
                        type: "GET",
                        data:{},
                        success: function(escolarMulheres){
                            var escolarMulheresC = "<td>Alfabetização total de mulheres com 10 anos:</td>";
                            escolarMulheresC = escolarMulheresC+"<td><input class='restInp' type='text' readonly id='inpEMC' value='"+escolarMulheres[0].resultados[0].series[0].serie['2010']+"'>%</td>";
                            $("#retEscolarizacaoCM").html(escolarMulheresC);
                        }
                    })
                }
            })
        }
    })

    // Para o checkbox do PIB selecionado do municipio
    $("#slctPib").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                //PIB do município (AS INFORMAÇÕES VÃO ATÉ 2019)
                // Método de conexão
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
                                var pibC = "<td>PIB em "+$("#slctAno").val()+":</td><td>R$";
                                pibC = pibC+"<input class='restInp' type='text' readonly id='inpPibC' value='"+pib[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'></td>";
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
                                var pibC = "<td>PIB em 2019:</td><td>R$";
                                pibC = pibC+"<input class='restInp' type='text' readonly id='inpPibC' value='"+pib[0].resultados[0].series[0].serie['2019']+"'></td>";
                                $("#retPibC").html(pibC);
                            }
                        })
                        break
                }
            })
        }
    })
})
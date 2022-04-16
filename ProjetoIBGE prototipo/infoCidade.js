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

                var valueCidade = $("#slctCidades option:selected").text();
                $("#retNomeCidade").html(valueCidade);
            })    
        }
    })

    // Caso o input do tipo checkbox relacionada a Área Territorial seja selecionado e for verdadeiro, retorna as informações da Área Territorial
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // link do agregado Área e Densidade demográfica da unidade territorial (Área Total) do periodo de 2010 do municipio selecionado
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades").val()+"]" ,
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(areaT){
                        var areaTC = "<p>Área Territorial: "
                        areaTC = areaTC + "<input type='text' id='inpArea' value='"+areaT[0].resultados[0].series[0].serie['2010']+"'>km2";
                        areaTC = areaTC + "</p>"
                        $("#retareaTC").html(areaTC);
                    }
                })
            })
        } else {
            return;
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
                    data: {

                    } ,
                    success: function(densidadeDmg){
                        var densidadeDmgC = "<p>Densidade Demográfica[2010]: "
                        densidadeDmgC = densidadeDmgC + "<input type='text' value='"+densidadeDmg[0].resultados[0].series[0].serie['2010']+"'>hab/km2"
                        densidadeDmgC = densidadeDmgC + "</p>"
                        $("#retDensidadeDmgC").html(densidadeDmgC);
                    }
                })
            })
        } else {
            return;
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
                            data:{

                            },
                            success: function(populacao){
                                var populacaoC = "<p>População em " + $("#slctAno").val() + ": ";
                                populacaoC = populacaoC + "<input type='text' id='inpPopC' value='"+populacao[0].resultados[0].series[0].serie['2007']+"'>"
                                populacaoC = populacaoC + "</p>"
                                $("#retPopulacaoC").html(populacaoC);
                            }
                        })
                        break
                    case "2010":
                        // ANO 2010
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]",
                            type: "GET",
                            data:{

                            },
                            success: function(populacao){
                                var populacaoC = "<p>População em " + $("#slctAno").val() + ": ";
                                populacaoC = populacaoC + "<input type='text' id='inpPopC' value='"+populacao[0].resultados[0].series[0].serie['2010']+"'>"
                                populacaoC = populacaoC + "</p>"
                                $("#retPopulacaoC").html(populacaoC);
                            }
                        })
                        break
                    default:
                        // link do agregado Estimativas de população (população residente estimada) para o município
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {

                            } ,
                            success: function(populacao){
                                var populacaoC = "<p>População em " + $("#slctAno").val() + ": ";
                                populacaoC = populacaoC + "<input type='text' id='inpPopC' value='"+populacao[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>"
                                populacaoC = populacaoC + "</p>"
                                $("#retPopulacaoC").html(populacaoC);
                            }
                        })
                        break
                }
            })
        } else {
            return;
        }
    })

    // Para o checkbox de Escolarização selecionado retorna a alfabetização total das pessoas com 10anos
    $("#slctEscolarizacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // Taxa de alfabetização das pessoas 10 anos ou mais TOTAL (%)
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" +$("#slctCidades").val()+ "]&classificacao=2[6794]",
                    type: "GET",
                    data: {

                    },
                    success: function(escolarTotal){
                        var escolarizacaoTotal = "<p>Alfabetização total de pessoas com 10 anos: "
                        escolarizacaoTotal = escolarizacaoTotal + "<input type='text' value='"+escolarTotal[0].resultados[0].series[0].serie["2010"]+"'>%"
                        escolarizacaoTotal = escolarizacaoTotal + "</p>"
                        $("#retEscolarizacaoCT").html(escolarizacaoTotal);
                    }
                })
            })
        }
    })

    // Para o checkbox de Escolarização selecionado retorna a alfabetização total de homens com 10anos
    $("#slctEscolarizacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // Taxa de alfabetização das pessoas 10 anos ou mais de homens (%)
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" +$("#slctCidades").val()+ "]&classificacao=2[4]",
                    type: "GET",
                    data: {

                    },
                    success: function(escolarTotalH){
                        var escolarizacaoTotalH = "<p>Alfabetização total de homens com 10 anos: "
                        escolarizacaoTotalH = escolarizacaoTotalH + "<input type='text' value='"+ escolarTotalH[0].resultados[0].series[0].serie["2010"] +"'>%"
                        escolarizacaoTotalH = escolarizacaoTotalH + "</p>"
                        $("#retEscolarizacaoCH").html(escolarizacaoTotalH);
                    }
                })
            })
        }
    })

    // Para o checkbox de Escolarização selecionado retorna a alfabetização total de mulheres com 10anos
    $("#slctEscolarizacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // Taxa de alfabetização das pessoas 10 anos ou mais de mulheres (%)
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" +$("#slctCidades").val()+ "]&classificacao=2[5]",
                    type: "GET",
                    data: {

                    },
                    success: function(escolarTotalM){
                        var escolarizacaoTotalM = "<p>Alfabetização total de mulheres com 10 anos: "
                        escolarizacaoTotalM = escolarizacaoTotalM + "<input type='text' value='"+escolarTotalM[0].resultados[0].series[0].serie["2010"]+"'>%"
                        escolarizacaoTotalM = escolarizacaoTotalM + "</p>"
                        $("#retEscolarizacaoCM").html(escolarizacaoTotalM);
                    }
                })
            })
        }
    })

    // Para o checkbox do PIB selecionado do municipio
    $("#slctPib").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                //PIB do município (AS INFORMAÇÕES VÃO ATÉ 2019)
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/" + $("#slctAno").val() + "/variaveis/37?localidades=N6[" + $("#slctCidades").val() + "]",
                    type: "GET",
                    data: {

                    },
                    success: function(pib){
                        var pibC = "<p>PIB em " + $("#slctAno").val() + ": R$"
                        pibC = pibC + "<input type='text' value='"+pib[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>"
                        pibC = pibC + "</p>"
                        $("#retPibC").html(pibC);
                    }
                })
            })
        }
    })
})
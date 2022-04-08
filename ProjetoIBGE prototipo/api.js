$(document).ready(function(){

    // Cada vez que um estado for selecionado a select de município é atualizada
    $("#slctEstados").change(function(){
        var enderecoCidade = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+$("#slctEstados").val()+"/municipios";

        // Método de conexão com a API de municípios
        $.ajax({
            url: enderecoCidade ,
            type: "GET" ,
            data: {
                orderBy: "nome"
            } ,
            success: function(cidades){
                var i;
                var cidade = "<option>Selecione uma cidade</option>";
                for(i = 0; i < cidades.length; i++){
                    cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                }
                $("#slctCidades").html(cidade);
            }
        })
    })

    // Método de conexão com a API de estados
    $.ajax({
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados" ,
        type: "GET" ,
        data: {
            orderBy: "nome"
        } ,
        success: function(estados){
            var i;
            var estado = "<option value=''>Selecione um estado</option>";
            for(i = 0; i < estados.length; i++){

                estado = estado + "<option value='" + estados[i].id + "'>" + estados[i].nome + "</option>"
            }           

            $("#slctEstados").html(estado);
            $("#slctEstados").trigger("change");
        }
    })

    // TUDO RELACIONADO AOS ESTADOS
    // Função que serve para capturar a informação "ESTADO" quando um estado é selecionado
    // A captura é feita a cada vez que um estado diferente é selecionado
    $("#slctEstados").change(function(){       
        if($("#slctEstados option:selected").text() == "Selecione um estado"){
            return;
        } else {
            $("#btnConsultar").click(function(){
                document.getElementById("resposta").style.display = 'flex';

                var valueEstado = $("#slctEstados option:selected").text();
                $("#retNomeEstado").html(valueEstado);
            })
        }
    })

    // Caso o input do tipo checkbox relacionada a Densidade Demográfica seja selecionado e for verdadeiro, retorna as informações da Densidade Demográfica
    $("#slctDensidadeDmg").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                $("#btnConsultar").click(function(){
                    // link do agregado Área e Densidade demográfica da unidade territorial (Densidade Demográfica) do periodo de 2010 do estado selecionado
                    var desnsidadeEstado = "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N3[" +$("#slctEstados").val()+ "]";
                    $.ajax({
                        url: desnsidadeEstado ,
                        type: "GET" ,
                        data: {
    
                        } ,
                        success: function(densidadeDmg){
                            var densidadeDmgEst = ""
                            densidadeDmgEst = "<p>Densidade Demográfica[2010]: " + densidadeDmg[0].resultados[0].series[0].serie['2010'] + "hab/km2</p>"
                            $("#retDensidadeDmgE").html(densidadeDmgEst);
                        }
                    })
                })
            } else {
                return;
            }
        } else {
            return;
        }
    })

    // Caso o input do tipo checkbox relacionada a População seja selecionado e for verdadeiro, retorna as informações da População
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                $("#btnConsultar").click(function(){
                    // link do agregado Estimativas de população (população residente estimada) para o estado
                    // Não há informações para população estimada no ano de 2010. Será necessário recuperar a informação do censo de 2010
                    var populacaoEstado = "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" + $("#slctAno").val() + "/variaveis/9324?localidades=N3["+$("#slctEstados").val()+"]";
                    $.ajax({
                        url: populacaoEstado ,
                        type: "GET" ,
                        data: {
    
                        } ,
                        success: function(populacao){
                            var populacaoEst = ""
                            populacaoEst = "<p>População estimada em " + $("#slctAno").val() + ": " + populacao[0].resultados[0].series[0].serie[$("#slctAno").val()] + "</p>"
                            $("#retPopulacaoE").html(populacaoEst);
                        }
                    })
                })
            } else {
                return;
            }
        } else {
            return;
        }
    })

    // Para o checkbox do PIB selecionado do estado
    $("#slctPib").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                $("#btnConsultar").click(function(){
                    //PIB do estado (AS INFORMAÇÕES VÃO ATÉ 2019)
                    var pibE = "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/"+$("#slctAno").val()+"/variaveis/37?localidades=N3["+$("#slctEstados").val()+"]";
                    // Método de conexão
                    $.ajax({
                        url: pibE,
                        type: "GET",
                        data: {
    
                        },
                        success: function(pib){
                            var pibE = "";
                            pibE = "<p>PIB em " + $("#slctAno").val() + ": R$" + pib[0].resultados[0].series[0].serie[$("#slctAno").val()] + "</p>"
                            $("#retPibE").html(pibE);
                        }
                    })
                })
            }
        }
    })

    // MALHA DO ESTADO
    $("#slctEstados").change(function(){       
        if($("#slctEstados option:selected").text() == "Selecione um estado"){
            return;
        } else {
            $("#slctCidades").change(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    $("#btnConsultar").click(function(){
                        document.getElementById("retMalhaE").style.display = "flex";
                        var malhaE = "";
                        malhaE = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/estados/"+$("#slctEstados").val()+"?formato=image/svg+xml&qualidade=maxima' title='Malha do estado'>"
                        $("#retMalhaE").html(malhaE);
                    })
                } else {
                    return;
                }
            })
        }
    })

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

    // MALHA DO MUNICÍPIO
    $("#slctCidades").change(function(){       
        if($("#slctCidades option:selected").text() == "Selecione uma cidade"){
            return;
        } else {
            $("#btnConsultar").click(function(){
                var malhaC = "";
                malhaC = "<img src='https://servicodados.ibge.gov.br/api/v3/malhas/municipios/"+$("#slctCidades").val()+"?formato=image/svg+xml&qualidade=maxima' title='Malha da cidade'>"
                $("#retMalhaC").html(malhaC);
            })
        }
    })

    // Caso o input do tipo checkbox relacionada a Área Territorial seja selecionado e for verdadeiro, retorna as informações da Área Territorial
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                // link do agregado Área e Densidade demográfica da unidade territorial (Área Total) do periodo de 2010 do municipio selecionado
                // Vai retornar a Área Territorial
                var areaTCidade = "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades").val()+"]"
                // Método de conexão
                $.ajax({
                    url: areaTCidade ,
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(areaT){
                        var areaTC = ""
                        areaTC = "<p>Área Territorial: " + areaT[0].resultados[0].series[0].serie['2010'] + "km2</p>"
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
                var desnsidadeC = "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N6[" + $("#slctCidades").val() + "]";
                $.ajax({
                    url: desnsidadeC ,
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(densidadeDmg){
                        var densidadeDmgC = ""
                        densidadeDmgC = "<p>Densidade Demográfica[2010]: " + densidadeDmg[0].resultados[0].series[0].serie['2010'] + "hab/km2</p>"
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
                // link do agregado Estimativas de população (população residente estimada) para o município
                // Não há informações para população estimada no ano de 2010. Será necessário recuperar a informação do censo de 2010
                var populacaoCidade = "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]";
                
                // Método de conexão
                $.ajax({
                    url: populacaoCidade ,
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(populacao){
                        document.getElementById("slctAno2").style.display = "block";
                        var populacaoC = ""
                        populacaoC = "<p>População estimada em " + $("#slctAno").val() + ": " + populacao[0].resultados[0].series[0].serie[$("#slctAno").val()] + "</p>"
                        $("#retPopulacaoC").html(populacaoC);
                    }
                })

                // Caso o usuário deseje comparar com um outro ano
                $("#slctAno2").change(function(){
                    document.getElementById("compPopulacao").style.display = 'flex';
                    var compPopAno = "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" +$("#slctAno").val()+ "|" +$("#slctAno2").val()+ "/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]";

                    // Método de conexão
                    $.ajax({
                        url: compPopAno ,
                        type: "GET" ,
                        data: {

                        } ,
                        success: function(comparaAno){
                            var data = {
                                labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                datasets: [{
                                    label: "Gráfico de comparação da população de " + $("#slctCidades option:selected").text(),
                                    data: [ {id: $("#slctAno").val(), nested: {value: comparaAno[0].resultados[0].series[0].serie[$("#slctAno").val()]}},
                                            {id: $("#slctAno2").val(), nested: {value: comparaAno[0].resultados[0].series[0].serie[$("#slctAno2").val()]}}],
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgb(255, 99, 132)'
                                }]
                            };

                            var config = {
                                type: 'bar',
                                data: data,
                                options: {
                                    parsing: {
                                        xAxisKey: 'id',
                                        yAxisKey: 'nested.value'
                                    }
                                }
                            };

                            var barGraph = document.getElementById("garficoPopulacaoAno").getContext("2d");

                            var ctx = new Chart(barGraph, config);

                            $("#slctAno2").change(function(){
                                ctx.destroy();
                            })

                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){
                                    ctx.destroy();
                                })
                            })
                        }
                    })
                })
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
                var escolTotal = "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" +$("#slctCidades").val()+ "]&classificacao=2[6794]";
                // Método de conexão
                $.ajax({
                    url: escolTotal,
                    type: "GET",
                    data: {

                    },
                    success: function(escolarTotal){
                        var escolarizacaoTotal = "";
                        escolarizacaoTotal = "<p>Alfabetização total de pessoas com 10 anos: " + escolarTotal[0].resultados[0].series[0].serie["2010"] + "%</p>"
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
                // Taxa de alfabetização das pessoas 10 anos ou mais TOTAL (%)
                var escolTotalH = "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" +$("#slctCidades").val()+ "]&classificacao=2[4]";
                // Método de conexão
                $.ajax({
                    url: escolTotalH,
                    type: "GET",
                    data: {

                    },
                    success: function(escolarTotalH){
                        var escolarizacaoTotalH = "";
                        escolarizacaoTotalH = "<p>Alfabetização total de homens com 10 anos: " + escolarTotalH[0].resultados[0].series[0].serie["2010"] + "%</p>"
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
                // Taxa de alfabetização das pessoas 10 anos ou mais mulheres (%)
                var escolTotalM = "https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[" +$("#slctCidades").val()+ "]&classificacao=2[5]";
                // Método de conexão
                $.ajax({
                    url: escolTotalM,
                    type: "GET",
                    data: {

                    },
                    success: function(escolarTotalM){
                        var escolarizacaoTotalM = "";
                        escolarizacaoTotalM = "<p>Alfabetização total de mulheres com 10 anos: " + escolarTotalM[0].resultados[0].series[0].serie["2010"] + "%</p>"
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
                var pibC = "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/" + $("#slctAno").val() + "/variaveis/37?localidades=N6[" + $("#slctCidades").val() + "]";
                // Método de conexão
                $.ajax({
                    url: pibC,
                    type: "GET",
                    data: {

                    },
                    success: function(pib){
                        var pibC = "";
                        pibC = "<p>PIB em " + $("#slctAno").val() + ": R$" + pib[0].resultados[0].series[0].serie[$("#slctAno").val()] + "</p>"
                        $("#retPibC").html(pibC);
                    }
                })
            })
        }
    })

})
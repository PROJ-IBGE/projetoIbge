$(document).ready(function(){
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
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N3[" +$("#slctEstados").val()+ "]" ,
                        type: "GET" ,
                        data: {
    
                        } ,
                        success: function(densidadeDmg){
                            var densidadeDmgEst = "<p>Densidade Demográfica[2010]: " + densidadeDmg[0].resultados[0].series[0].serie['2010'] + "hab/km2</p>"
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
                    var ano = document.getElementById("slctAno").value;

                    switch(ano){
                        case "2007":
                            // ANO DE 2007
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N3[15]",
                                type: "GET",
                                data:{

                                },
                                success: function(populacao){
                                    var populacaoEst = "<p>População em "+$("#slctAno").val()+": " +populacao[0].resultados[0].series[0].serie['2007']+ "</p>";
                                    $("#retPopulacaoE").html(populacaoEst);
                                }
                            })
                            break
                        case "2010":
                            // ANO DE 2010
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/3332/periodos/2010/variaveis/93?localidades=N3["+$("#slctEstados").val()+"]&classificacao=58[0]",
                                type: "GET",
                                data:{

                                },
                                success: function(populacao){
                                    var populacaoEst = "<p>População em " + $("#slctAno").val() + ": " + populacao[0].resultados[0].series[0].serie['2010'] + "</p>"
                                    $("#retPopulacaoE").html(populacaoEst);
                                }
                            })
                            break
                        default:
                            // link do agregado Estimativas de população (população residente estimada) para o estado
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" + $("#slctAno").val() + "/variaveis/9324?localidades=N3["+$("#slctEstados").val()+"]" ,
                                type: "GET" ,
                                data: {

                                } ,
                                success: function(populacao){
                                    var populacaoEst = "<p>População estimada em " +$("#slctAno").val()+ ": " + populacao[0].resultados[0].series[0].serie[$("#slctAno").val()] + "</p>"
                                    $("#retPopulacaoE").html(populacaoEst);
                                }
                            })
                            break
                    }
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
                    // Método de conexão
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/"+$("#slctAno").val()+"/variaveis/37?localidades=N3["+$("#slctEstados").val()+"]",
                        type: "GET",
                        data: {
    
                        },
                        success: function(pib){
                            var pibE = "<p>PIB em " + $("#slctAno").val() + ": R$" + pib[0].resultados[0].series[0].serie[$("#slctAno").val()] + "</p>"
                            $("#retPibE").html(pibE);
                        }
                    })
                })
            }
        }
    })
})
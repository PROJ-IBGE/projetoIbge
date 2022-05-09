$(document).ready(function(){
    // Retorna o nome do estado
    $("#slctEstados").change(function(){
        if( $("#slctEstados option:selected").text() == "Selecione um estado" ){
            return
        } else {
            $("#btnConsultar").click(function(){
                var valueEstado = $("#slctEstados option:selected").text();
                $("#retNomeEstado").html(valueEstado);
            })
        }
    })
    // Retorna a Densidade Demográfica do estado
    $("#slctDensidadeDmg").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    $.ajax({
                        url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N3[" +$("#slctEstados").val()+ "]",
                        type: "GET",
                        data:{},
                        success: function(densidadeDmg){
                            var densidadeDmgE = "Densidade Demográfica: ";
                            densidadeDmgE = densidadeDmgE + "<input type='text' readonly id='inpDensE' value='"+densidadeDmg[0].resultados[0].series[0].serie['2010']+"' > hab/km2";
                            $("#retDensidadeDmgE").html(densidadeDmgE);
                        }
                    })
                }
            })
        }
    })
    // Retorna o PIB do estado
    $("#slctPib").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
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
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/"+$("#slctAno").val()+"/variaveis/37?localidades=N3["+$("#slctEstados").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(pib){
                                    var pibE = "PIB em "+$("#slctAno").val()+": R$";
                                    pibE = pibE+"<input type='text' readonly id='inpPibE' value='"+pib[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPibE").html(pibE);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2019/variaveis/37?localidades=N3["+$("#slctEstados").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(pib){
                                    var pibE = "PIB em 2019: R$";
                                    pibE = pibE+"<input type='text' readonly id='inpPibE' value='"+pib[0].resultados[0].series[0].serie['2019']+"'>";
                                    $("#retPibE").html(pibE);
                                }
                            })
                            break
                    }
                }
            })
        }
    })

    // Retorna população do estado
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#btnConsultar").click(function(){
                if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                    switch($("#slctAno").val()){
                        case "2007":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N3["+$("#slctEstados").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoEstado = "População em "+$("#slctAno").val()+": ";
                                    populacaoEstado = populacaoEstado+"<input type='text' readonly id='inpPopE' value='"+populacao[0].resultados[0].series[0].serie['2007']+"'>";
                                    $("#retPopulacaoE").html(populacaoEstado);
                                }
                            })
                            break
                        case "2010":
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/3332/periodos/2010/variaveis/93?localidades=N3["+$("#slctEstados").val()+"]&classificacao=58[0]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoEstado = "População em "+$("#slctAno").val()+": ";
                                    populacaoEstado = populacaoEstado+"<input type='text' readonly id='inpPopE' value='"+populacao[0].resultados[0].series[0].serie['2010']+"'>";
                                    $("#retPopulacaoE").html(populacaoEstado);
                                }
                            })
                            break
                        default:
                            $.ajax({
                                url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno").val()+"/variaveis/9324?localidades=N3["+$("#slctEstados").val()+"]",
                                type: "GET",
                                data:{},
                                success: function(populacao){
                                    var populacaoEstado = "População em "+$("#slctAno").val()+": ";
                                    populacaoEstado = populacaoEstado+"<input type='text' readonly id='inpPopE' value='"+populacao[0].resultados[0].series[0].serie[$("#slctAno").val()]+"'>";
                                    $("#retPopulacaoE").html(populacaoEstado);
                                }
                            })
                            break
                    }
                }
            })
        }
    })
})
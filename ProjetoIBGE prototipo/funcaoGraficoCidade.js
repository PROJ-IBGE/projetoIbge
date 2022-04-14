$(document).ready(function(){

    // Gráfico populacional
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            // Caso o usuário deseje comparar com um outro ano
            $("#slctAno2").change(function(){
                document.getElementById("compPopulacao").style.display = 'flex';
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" +$("#slctAno").val()+ "|" +$("#slctAno2").val()+ "/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]" ,
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(comparaAno){
                        var data = {
                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                            datasets: [{
                                label: "População de " + $("#slctCidades option:selected").text(),
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

                        var barGraph = document.getElementById("garficoPopulacaoAno");

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

            // Caso seja selecionado outro estado
            $("#slctCidades2").change(function(){
                document.getElementById("compPopulacao").style.display = 'flex';
                // Método de conexão
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" +$("#slctAno").val()+ "/variaveis/9324?localidades=N6["+$("#slctCidades").val()+","+$("#slctCidades2").val()+"]",
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(comparaCidades){
                        var data = {
                            labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                            datasets: [{
                                label: "População de " + $("#slctCidades option:selected").text() + " com " + $("#slctCidades2 option:selected").text() ,
                                data: [ {id: $("#slctCidades option:selected").text(), nested: {value: comparaCidades[0].resultados[0].series[0].serie[$("#slctAno").val()]}},
                                        {id: $("#slctCidades2 option:selected").text(), nested: {value: comparaCidades[0].resultados[0].series[1].serie[$("#slctAno").val()]}}],
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

                        var barGraph = document.getElementById("garficoPopulacaoCidades");

                        var ctx = new Chart(barGraph, config);

                        $("#slctCidades2").change(function(){
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
        }
    })
})
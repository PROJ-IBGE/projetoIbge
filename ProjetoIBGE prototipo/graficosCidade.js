$(document).ready(function(){
    // Gráfico da área total entre os municípios
    $("#slctAreaT").change(function(){
        if($(this).prop("checked") == true){
            $("#slctCidades2").change(function(){
                document.getElementById("graficoAreaCidades").style.display = "flex";
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades2").val()+"]" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(comapraArea){
                        switch($("#tipoGrafico").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                    datasets: [{
                                        label: 'Área Total',
                                        data: [ {id: $("#slctCidades").val(), nested: {value: $("#inpArea").val()}},
                                                {id: $("#slctCidades2").val(), nested: {value: comapraArea[0].resultados[0].series[0].serie['2010']}}],
                                        backgroundColor: `#f28705`,
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'bar',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico de comparação em áreas'
                                            }
                                        },
                                        parsing: {
                                            xAxisKey: 'id',
                                            yAxisKey: 'nested.value'
                                        }
                                    }
                                };
                                var barGraph = document.getElementById("graficoAreaCidades");
                                var ctx = new Chart(barGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    ctx.destroy();
                                })
                                break
                            // Gráfico de linha
                            case "linha":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'Área Total',
                                        data:[$("#inpArea").val(), comapraArea[0].resultados[0].series[0].serie['2010']],
                                        backgroundColor: `#f28705`,
                                        borderColor: `#04d9b2`,
                                        fill: false,
                                        tension: 0.4
                                    }]
                                };     
                                var config = {
                                    type: 'line',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico de comparação em áreas'
                                            }
                                        },
                                    }
                                };
                                var lineGraph = document.getElementById("graficoAreaCidades");
                                var ctx = new Chart(lineGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    ctx.destroy();
                                })
                                break
                            // Gráfico de pizza
                            case "pizza":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'Área Total',
                                        data:[$("#inpArea").val(), comapraArea[0].resultados[0].series[0].serie['2010']],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico de comparação em áreas'
                                            }
                                        }
                                    }
                                };
                                var pieGraph = document.getElementById("graficoAreaCidades");
                                var ctx = new Chart(pieGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    ctx.destroy();
                                })
                                break
                            // Gráfico polar
                            case "polar":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'Área Total',
                                        data: [ $("#inpArea").val(), comapraArea[0].resultados[0].series[0].serie['2010'] ],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'polarArea',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico de comparação em áreas'
                                            }
                                        }
                                    }
                                };
                                var polarGraph = document.getElementById("graficoAreaCidades");
                                var ctx = new Chart(polarGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    ctx.destroy();
                                })
                                break
                            // Gráfico de anel
                            case "anel":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'Área Total',
                                        data:[$("#inpArea").val(), comapraArea[0].resultados[0].series[0].serie['2010']],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'doughnut',
                                    data: data,
                                    options: {
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico de comparação em áreas'
                                            }
                                        }
                                    }
                                };
                                var doughnutGraph = document.getElementById("graficoAreaCidades");
                                var ctx = new Chart(doughnutGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    ctx.destroy();
                                })
                                break
                        }
                    }
                })
            })
        }
    })
})
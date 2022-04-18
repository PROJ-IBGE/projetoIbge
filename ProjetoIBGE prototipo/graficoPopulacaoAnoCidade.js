$(document).ready(function(){
    // Gráfico populacional entre anos do município
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctAno2").change(function(){
                document.getElementById("garficoPopulacaoAno").style.display = 'flex';
                switch($("#slctAno2").val()){
                    //Caso o segundo ano selecionado seja 2007
                    case "2007":
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {} ,
                            success: function(comparaAno){
                                switch($("#tipoGrafico").val()){
                                    // Gráfico de barra
                                    case "barra":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data: [ {id: $("#slctAno").val(), nested: {value: $("#inpPopC").val()}},
                                                        {id: $("#slctAno2").val(), nested: {value: comparaAno[0].resultados[0].series[0].serie['2007']}}],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                },
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
                                        break
                                    // Gráfico de linha
                                    case "linha":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data: [ $("#inpPopC").val(), comparaAno[0].resultados[0].series[0].serie['2007']],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                },
                                            }
                                        };
                                        var lineGraph = document.getElementById("garficoPopulacaoAno");
                                        var ctx = new Chart(lineGraph, config);
                                        $("#slctAno2").change(function(){
                                            ctx.destroy();
                                        })
                                        $("#slctCidades").change(function(){
                                            $("#slctAno").change(function(){
                                                ctx.destroy();
                                            })
                                        })
                                        break
                                    // Gráfico de pizza
                                    case "pizza":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data:[$("#inpPopC").val(), comparaAno[0].resultados[0].series[0].serie['2007']],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                }
                                            }
                                        };
                                        var pieGraph = document.getElementById("garficoPopulacaoAno");
                                        var ctx = new Chart(pieGraph, config);
                                        $("#slctAno2").change(function(){
                                            ctx.destroy();
                                        })
                                        $("#slctCidades").change(function(){
                                            $("#slctAno").change(function(){
                                                ctx.destroy();
                                            })
                                        })
                                        break
                                }
                            }
                        })
                        break
                    //Caso o segundo ano selecionado seja 2010
                    case "2010":
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {} ,
                            success: function(comparaAno){
                                switch($("#tipoGrafico").val()){
                                    // Gráfico de barra
                                    case "barra":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data: [ {id: $("#slctAno").val(), nested: {value: $("#inpPopC").val()}},
                                                        {id: $("#slctAno2").val(), nested: {value: comparaAno[0].resultados[0].series[0].serie['2010']}}],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                },
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
                                        break
                                    // Gráfico de linha
                                    case "linha":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data: [ $("#inpPopC").val(), comparaAno[0].resultados[0].series[0].serie[$('2010').val()]],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                },
                                            }
                                        };
                                        var lineGraph = document.getElementById("garficoPopulacaoAno");
                                        var ctx = new Chart(lineGraph, config);
                                        $("#slctAno2").change(function(){
                                            ctx.destroy();
                                        })
                                        $("#slctCidades").change(function(){
                                            $("#slctAno").change(function(){
                                                ctx.destroy();
                                            })
                                        })
                                        break
                                    // Gráfico de pizza
                                    case "pizza":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data:[$("#inpPopC").val(), comparaAno[0].resultados[0].series[0].serie['2010']],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                }
                                            }
                                        };
                                        var pieGraph = document.getElementById("garficoPopulacaoAno");
                                        var ctx = new Chart(pieGraph, config);
                                        $("#slctAno2").change(function(){
                                            ctx.destroy();
                                        })
                                        $("#slctCidades").change(function(){
                                            $("#slctAno").change(function(){
                                                ctx.destroy();
                                            })
                                        })
                                        break
                                }
                            }
                        })
                        break
                    //Caso o segundo ano selecionado seja qualquer outro
                    default:
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno2").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {} ,
                            success: function(comparaAno){
                                switch($("#tipoGrafico").val()){
                                    // Gráfico de barra
                                    case "barra":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data: [ {id: $("#slctAno").val(), nested: {value: $("#inpPopC").val()}},
                                                        {id: $("#slctAno2").val(), nested: {value: comparaAno[0].resultados[0].series[0].serie[$("#slctAno2").val()]}}],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                },
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
                                        break
                                    // Gráfico de linha
                                    case "linha":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data: [ $("#inpPopC").val(), comparaAno[0].resultados[0].series[0].serie[$("#slctAno2").val()]],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                },
                                            }
                                        };
                                        var lineGraph = document.getElementById("garficoPopulacaoAno");
                                        var ctx = new Chart(lineGraph, config);
                                        $("#slctAno2").change(function(){
                                            ctx.destroy();
                                        })
                                        $("#slctCidades").change(function(){
                                            $("#slctAno").change(function(){
                                                ctx.destroy();
                                            })
                                        })
                                        break
                                    // Gráfico de pizza
                                    case "pizza":
                                        var data = {
                                            labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                            datasets: [{
                                                label: 'População',
                                                data:[$("#inpPopC").val(), comparaAno[0].resultados[0].series[0].serie[$("#slctAno2").val()]],
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
                                                        text: 'Gráfico da População'
                                                    }
                                                }
                                            }
                                        };
                                        var pieGraph = document.getElementById("garficoPopulacaoAno");
                                        var ctx = new Chart(pieGraph, config);
                                        $("#slctAno2").change(function(){
                                            ctx.destroy();
                                        })
                                        $("#slctCidades").change(function(){
                                            $("#slctAno").change(function(){
                                                ctx.destroy();
                                            })
                                        })
                                        break
                                }
                            }
                        })
                        break
                }
            })
        }
    })
})
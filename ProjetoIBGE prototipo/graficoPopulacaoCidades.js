$(document).ready(function(){
    // Gráfico populacional entre municípios
    $("#slctCidades2").change(function(){
        document.getElementById("garficoPopulacaoCidades").style.display = 'flex';
        switch($("#slctAno").val()){
            // Caso o ano selecionado seja 2007
            case "2007":
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(comparaCidades){
                        switch($("#tipoGrafico").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                            data:[{id: $("#slctCidades option:selected").text(), nested: {value: $("#inpPopC").val()}},
                                                    {id: $("#slctCidades2 option:selected").text(), nested: {value: comparaCidades[0].resultados[0].series[0].serie['2007']}}],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'bar',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        },
                                        parsing: {
                                            xAxisKey: 'id',
                                            yAxisKey: 'nested.value'
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            }
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
                                break
                            // Gráfico de linha
                            case "linha":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[ $("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2007']],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            },
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            }
                                        }
                                    }
                                };
                                var lineGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(lineGraph, config);
                                $("#slctCidades2").change(function(){
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
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2007']],
                                            backgroundColor: [`#f28705`, `#00a000`],
                                            borderColor: `#04d9b2`
                                        }]
                                    };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var pieGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(pieGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    $("#slctAno").change(function(){
                                        ctx.destroy();
                                    })
                                })
                                break
                            // Gráfico polar
                            case "polar":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ $("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2007'] ],
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
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var polarGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(polarGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    $("#slctAno").change(function(){
                                        ctx.destroy();
                                    })
                                })
                                break
                            // Gráfico de anel
                            case "anel":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2007']],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'doughnut',
                                    data: data,
                                    options: {
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var doughnutGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(doughnutGraph, config);
                                $("#slctCidades2").change(function(){
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
            // Caso o ano selecionado seja 2010
            case "2010":
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"]" ,
                    type: "GET" ,
                    data: {} ,
                    success: function(comparaCidades){
                        switch($("#tipoGrafico").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[{id: $("#slctCidades option:selected").text(), nested: {value: $("#inpPopC").val()}},
                                                {id: $("#slctCidades2 option:selected").text(), nested: {value: comparaCidades[0].resultados[0].series[0].serie['2010']}}],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'bar',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        },
                                        parsing: {
                                            xAxisKey: 'id',
                                            yAxisKey: 'nested.value'
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            }
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
                                break
                            // Gráfico de linha
                            case "linha":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2010']],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            },
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            }
                                        }
                                    }
                                };
                                var lineGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(lineGraph, config);
                                $("#slctCidades2").change(function(){
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
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2010']],
                                            backgroundColor: [`#f28705`, `#00a000`],
                                            borderColor: `#04d9b2`
                                        }]
                                    };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var pieGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(pieGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    $("#slctAno").change(function(){
                                        ctx.destroy();
                                    })
                                })
                                break
                            // Gráfico polar
                            case "polar":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ $("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2010'] ],
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
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var polarGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(polarGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    $("#slctAno").change(function(){
                                        ctx.destroy();
                                    })
                                })
                                break
                             // Gráfico de anel
                             case "anel":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie['2010']],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'doughnut',
                                    data: data,
                                    options: {
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var doughnutGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(doughnutGraph, config);
                                $("#slctCidades2").change(function(){
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
            // Caso o ano selecionado seja qualquer outro
            default:
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" +$("#slctAno").val()+ "/variaveis/9324?localidades=N6["+$("#slctCidades2").val()+"]",
                    type: "GET" ,
                    data: {} ,
                    success: function(comparaCidades){
                        switch($("#tipoGrafico").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[{id: $("#slctCidades option:selected").text(), nested: {value: $("#inpPopC").val()}},
                                                {id: $("#slctCidades2 option:selected").text(), nested: {value: comparaCidades[0].resultados[0].series[0].serie[$("#slctAno").val()]}}],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'bar',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        },
                                        parsing: {
                                            xAxisKey: 'id',
                                            yAxisKey: 'nested.value'
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            }
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
                                break
                            // Gráfico de linha
                            case "linha":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie[$("#slctAno").val()]],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            },
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    color: "#fff"
                                                }
                                            }
                                        }
                                    }
                                };
                                var lineGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(lineGraph, config);
                                $("#slctCidades2").change(function(){
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
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie[$("#slctAno").val()]],
                                            backgroundColor: [`#f28705`, `#00a000`],
                                            borderColor: `#04d9b2`
                                        }]
                                    };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var pieGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(pieGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    $("#slctAno").change(function(){
                                        ctx.destroy();
                                    })
                                })
                                break
                            // Gráfico polar
                            case "polar":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ $("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie[$("#slctAno").val()] ],
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
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var polarGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(polarGraph, config);
                                $("#slctCidades2").change(function(){
                                    ctx.destroy();
                                })
                                $("#slctCidades").change(function(){
                                    $("#slctAno").change(function(){
                                        ctx.destroy();
                                    })
                                })
                                break
                             // Gráfico de anel
                             case "anel":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), comparaCidades[0].resultados[0].series[0].serie[$("#slctAno").val()]],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'doughnut',
                                    data: data,
                                    options: {
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: "#fff"
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val(),
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var doughnutGraph = document.getElementById("garficoPopulacaoCidades");
                                var ctx = new Chart(doughnutGraph, config);
                                $("#slctCidades2").change(function(){
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
})
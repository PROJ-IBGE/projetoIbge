$(document).ready(function(){  // Gráfico da área da cidade: Compração entre Cidades
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                $("#btnCompara").click(function(){
                    document.getElementById("graficoAreaCidades").style.display = "flex";
                    switch($("#tipoGrafico").val()){
                        case "barra":  // Gráfico de barra
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Área Total',
                                    data: [ {id: $("#slctCidades option:selected").text(), nested: {value: $("#inpArea").val()}},
                                            {id: $("#slctCidades2 option:selected").text(), nested: {value: $("#inpAreaCidade2").val()}} ],
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
                                        legend: {
                                            labels: {
                                                color: "#fff"
                                            },
                                        },
                                        title: {
                                            display: true,
                                            text: 'Gráfico de comparação em áreas',
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
                            var ctx = new Chart(document.getElementById("graficoAreaCidades"), config);
                            $("#slctCidades2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                ctx.destroy();
                            })
                            break
                        case "linha":  // Gráfico de linha
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Área Total',
                                    data: [ $("#inpArea").val(), $("#inpAreaCidade2").val() ],
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
                                            text: 'Gráfico de comparação em áreas',
                                            color: "#fff"
                                        },
                                        legend: {
                                            labels: {
                                                color: "#fff"
                                            }
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
                            var ctx = new Chart(document.getElementById("graficoAreaCidades"), config);
                            $("#slctCidades2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                ctx.destroy();
                            })
                            break
                        case "pizza":  // Gráfico de pizza
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Área Total',
                                    data:[ $("#inpArea").val(), $("#inpAreaCidade2").val() ],
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
                                            text: 'Gráfico de comparação em áreas',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var ctx = new Chart(document.getElementById("graficoAreaCidades"), config);
                            $("#slctCidades2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                ctx.destroy();
                            })
                            break
                        case "polar":  // Gráfico polar
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Área Total',
                                    data: [ $("#inpArea").val(), $("#inpAreaCidade2").val() ],
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
                                            text: 'Gráfico de comparação em áreas',
                                            color: "#fff"
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
                        case "anel":  // Gráfico de anel
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Área Total',
                                    data:[$("#inpArea").val(), $("#inpAreaCidade2").val()    ],
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
                                            text: 'Gráfico de comparação em áreas',
                                            color: "#fff"
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
                        default:
                            console.log("Opção inválida");
                            break
                    }
                })
            })
        }
    })
})
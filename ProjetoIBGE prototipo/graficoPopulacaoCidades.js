$(document).ready(function(){
    // Gráfico da população da cidade: Compração entre cidades
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                return
            } else {
                $("#slctCidades2").change(function(){
                    $("#btnCompara").click(function(){
                        document.getElementById("garficoPopulacaoCidades").style.display = "flex";
                        switch($("#tipoGrafico").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ {id: $("#slctCidades option:selected").text(), nested: {value: $("#inpPopC").val()}},
                                                {id: $("#slctCidades2 option:selected").text(), nested: {value: $("#inpPopC2A").val()}} ],
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
                                var ctx = new Chart(document.getElementById("garficoPopulacaoCidades"), config);
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
                                        data: [ $("#inpPopC").val(), $("#inpPopC2A").val() ],
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
                                var ctx = new Chart(document.getElementById("garficoPopulacaoCidades"), config);
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
                                        data:[ $("#inpPopC").val(), $("#inpPopC2A").val() ],
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
                                var ctx = new Chart(document.getElementById("garficoPopulacaoCidades"), config);
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
                                        data: [ $("#inpPopC").val(), $("#inpPopC2A").val() ],
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
                                        data:[$("#inpPopC").val(), $("#inpPopC2A").val()],
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
                            default:
                                console.log("Opção inválida");
                                break
                        }
                    })
                })
            }
        }
    })
})
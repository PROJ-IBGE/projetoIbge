$(document).ready(function(){
    // Gráfico da população da cidade: Compração entre anos
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                return
            } else {
                $("#slctAno2").change(function(){
                    $("#btnCompara").click(function(){
                        document.getElementById("garficoPopulacaoAno").style.display = "flex";
                        switch($("#tipoGrafico").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ {id: $("#slctAno").val(), nested: {value: $("#inpPopC").val()}},
                                                {id: $("#slctAno2").val(), nested: {value: $("#inpPopCA2").val()}} ],
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
                                                text: 'Gráfico da População',
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
                                var ctx = new Chart(document.getElementById("garficoPopulacaoAno"), config);
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
                                        data: [ $("#inpPopC").val(), $("#inpPopCA2").val() ],
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
                                                text: 'Gráfico da População',
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
                                var ctx = new Chart(document.getElementById("garficoPopulacaoAno"), config);
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
                                        data:[ $("#inpPopC").val(), $("#inpPopCA2").val() ],
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
                                                text: 'Gráfico da População',
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var ctx = new Chart(document.getElementById("garficoPopulacaoAno"), config);
                                $("#slctAno2").change(function(){
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
                                    labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ $("#inpPopC").val(), $("#inpPopCA2").val() ],
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
                                                text: 'Gráfico da População',
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var polarGraph = document.getElementById("garficoPopulacaoAno");
                                var ctx = new Chart(polarGraph, config);
                                $("#slctAno2").change(function(){
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
                                    labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                    datasets: [{
                                        label: 'População',
                                        data:[$("#inpPopC").val(), $("#inpPopCA2").val()],
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
                                                text: 'Gráfico da População',
                                                color: "#fff"
                                            }
                                        }
                                    }
                                };
                                var doughnutGraph = document.getElementById("garficoPopulacaoAno");
                                var ctx = new Chart(doughnutGraph, config);
                                $("#slctAno2").change(function(){
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
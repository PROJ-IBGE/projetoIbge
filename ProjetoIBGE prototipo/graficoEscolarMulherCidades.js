$(document).ready(function(){  // Gráfico de escolarização de mulheres: comparação entre cidades
    $("#slctEscolarizacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctCidades2").change(function(){
                $("#btnCompara").click(function(){
                    document.getElementById("graficoEscolarMulherCidades").style.display = "flex";
                    switch($("tipoGrafico").val()){
                        case "barra":  // Gráfico de barra
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Escolaridade de mulheres',
                                    data: [ {id: $("#slctCidades option:selected").text(), nested: {value: $("#inpEscMulheres").val()}},
                                            {id: $("#slctCidades2 option:selected").text(), nested: {value: $("#inpEscMulheres2").val()}} ],
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
                                            text: 'Gráfico de escolaridade de mulheres das cidades',
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
                            var ctx = new Chart(document.getElementById("graficoEscolarMulherCidades"), config);
                            $("#slctCidades2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){ 
                                    ctx.destroy();
                                })
                            })
                            break
                        case "linha":  // Gráfico de linha
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Escolaridade de mulheres',
                                    data: [ $("#inpEscMulheres").val(), $("#inpEscMulheres2").val() ],
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
                                            text: 'Gráfico de escolaridade de mulheres das cidades',
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
                            var ctx = new Chart(document.getElementById("graficoEscolarMulherCidades"), config);
                            $("#slctCidades2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){
                                    ctx.destroy();
                                })
                            })
                            break
                        case "pizza": // Gráfico de pizza
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Escolaridade de mulheres',
                                    data:[ $("#inpEscMulheres").val(), $("#inpEscMulheres2").val() ],
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
                                            text: 'Gráfico de escolaridade de mulheres das cidades',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var ctx = new Chart(document.getElementById("graficoEscolarMulherCidades"), config);
                            $("#slctCidades2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){
                                    ctx.destroy();
                                })
                            })
                            break
                        case "polar":  // Gráfico polar
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Escolaridade de mulheres',
                                    data: [ $("#inpEscMulheres").val(), $("#inpEscMulheres2").val() ],
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
                                            text: 'Gráfico de escolaridade de mulheres das cidades',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var polarGraph = document.getElementById("graficoEscolarMulherCidades");
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
                         case "anel":  // Gráfico de anel
                            var data = {
                                labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                datasets: [{
                                    label: 'Escolaridade de mulheres',
                                    data:[$("#inpEscMulheres").val(), $("#inpEscMulheres2").val()],
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
                                            text: 'Gráfico de escolaridade de mulheres das cidades',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var doughnutGraph = document.getElementById("graficoEscolarMulherCidades");
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
    })
})
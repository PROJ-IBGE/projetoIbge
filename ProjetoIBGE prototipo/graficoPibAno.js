$(document).ready(function(){  //Gráfico do PIB da cidade: Comparação entre anos
    $("#slctPib").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctAno2").change(function(){
                $("#btnCompara").click(function(){
                    document.getElementById("graficoPibAno").style.display = "flex";
                    switch($("#tipoGrafico").val()){
                        case "barra":  //Gráfico de Barra
                            var data = {
                                labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                datasets: [{
                                    label: 'PIB',
                                    data: [ {id: $("#slctAno").val(), nested: {value: $("#inpPib").val()}},
                                            {id: $("#slctAno2").val(), nested: {value: $("#inpPibAno2").val()}} ],
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
                                            text: 'Gráfico do PIB',
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
                            var ctx = new Chart(document.getElementById("graficoPibAno"), config);
                            $("#slctAno2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){ 
                                    ctx.destroy();
                                })
                            })
                            break
                        case "linha":  //Gráfico de Linha
                            var data = {
                                labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                datasets: [{
                                    label: 'PIB',
                                    data: [ $("#inpPib").val(), $("#inpPibAno2").val() ],
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
                                            text: 'Gráfico do PIB',
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
                            var ctx = new Chart(document.getElementById("graficoPibAno"), config);
                            $("#slctAno2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){
                                    ctx.destroy();
                                })
                            })
                            break
                        case "pizza":  //Gráfico de Pizza
                            var data = {
                                labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                datasets: [{
                                    label: 'PIB',
                                    data:[ $("#inpPib").val(), $("#inpPibAno2").val() ],
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
                                            text: 'Gráfico do PIB',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var ctx = new Chart(document.getElementById("graficoPibAno"), config);
                            $("#slctAno2").change(function(){
                                ctx.destroy();
                            })
                            $("#slctCidades").change(function(){
                                $("#slctAno").change(function(){
                                    ctx.destroy();
                                })
                            })
                            break
                        case "polar":  //Gráfico Polar
                            var data = {
                                labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                datasets: [{
                                    label: 'População',
                                    data: [ $("#inpPib").val(), $("#inpPibAno2").val() ],
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
                                            text: 'Gráfico do PIB',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var polarGraph = document.getElementById("graficoPibAno");
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
                        case "anel":  //Gráfico de Anel
                            var data = {
                                labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                datasets: [{
                                    label: 'PIB',
                                    data:[$("#inpPib").val(), $("#inpPibAno2").val()],
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
                                            text: 'Gráfico do PIB',
                                            color: "#fff"
                                        }
                                    }
                                }
                            };
                            var doughnutGraph = document.getElementById("graficoPibAno");
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
    })
})
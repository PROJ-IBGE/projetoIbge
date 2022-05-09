$(document).ready(function(){
    // Gráfico da população da cidade: Compração entre anos
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                return
            } else {
                $("#slctAno2").change(function(){
                    $("#btnCompara").click(function(){
                        document.getElementById("populacaoCAno").style.display = "flex";
                        switch($("#tipo").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctAno").val(), $("#slctAno2").val()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ {id: $("#slctAno").val(), nested: {value: $("#inpPopCA").val()}},
                                                {id: $("#slctAno2").val(), nested: {value: $("#inpPopCA2").val()}} ],
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
                                var ctx = new Chart(document.getElementById("populacaoCAno"), config);
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
                                        data: [ $("#inpPopCA").val(), $("#inpPopCA2").val() ],
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
                                var ctx = new Chart(document.getElementById("populacaoCAno"), config);
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
                                        data:[ $("#inpPopCA").val(), $("#inpPopCA2").val() ],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico da População'
                                            }
                                        }
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacaoCAno"), config);
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
                // Gráfico da população da cidade: Compração entre cidades
                $("#slctCidades2").change(function(){
                    $("#btnCompara").click(function(){
                        document.getElementById("populacoaCidades").style.display = "flex";
                        switch($("#tipo").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ {id: $("#slctCidades option:selected").text(), nested: {value: $("#inpPopCA").val()}},
                                                {id: $("#slctCidades2 option:selected").text(), nested: {value: $("#inpPopC2A").val()}} ],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
                                        parsing: {
                                            xAxisKey: 'id',
                                            yAxisKey: 'nested.value'
                                        }
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacoaCidades"), config);
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
                                        data: [ $("#inpPopCA").val(), $("#inpPopC2A").val() ],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacoaCidades"), config);
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
                                        data:[ $("#inpPopCA").val(), $("#inpPopC2A").val() ],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        }
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacoaCidades"), config);
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
    // Gráfico da população da cidade: Compração entre cidades
    /*$("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                return
            } else {
                $("#slctCidades2").change(function(){
                    $("#btnCompara").click(function(){
                        document.getElementById("populacoaCidades").style.display = "flex";
                        switch($("#tipo").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'População',
                                        data: [ {id: $("#slctCidades option:selected").text(), nested: {value: $("#inpPopCA").val()}},
                                                {id: $("#slctCidades2 option:selected").text(), nested: {value: $("#inpPopC2A").val()}} ],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
                                        parsing: {
                                            xAxisKey: 'id',
                                            yAxisKey: 'nested.value'
                                        }
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacoaCidades"), config);
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
                                        data: [ $("#inpPopCA").val(), $("#inpPopC2A").val() ],
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacoaCidades"), config);
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
                                        data:[ $("#inpPopCA").val(), $("#inpPopC2A").val() ],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'pie',
                                    data: data,
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        }
                                    }
                                };
                                var ctx = new Chart(document.getElementById("populacoaCidades"), config);
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
    })*/
    // Gráfico da área da cidade: Compração entre Cidades
    $("#slctAreaT").change(function(){
        if( $(this).prop("checked") == true ){
            if( $("#slctCidades option:selected").text() == "Selecione uma cidade" ){
                return
            } else {
                $("#slctCidades2").change(function(){
                    $("#btnCompara").click(function(){
                        document.getElementById("areaCidades").style.display = "flex";
                        switch($("#tipo").val()){
                            // Gráfico de barra
                            case "barra":
                                var data = {
                                    labels: [$("#slctCidades option:selected").text(), $("#slctCidades2 option:selected").text()],
                                    datasets: [{
                                        label: 'Área Total',
                                        data: [ {id: $("#slctCidades option:selected").text(), nested: {value: $("#inpAreaC").val()}},
                                                {id: $("#slctCidades2 option:selected").text(), nested: {value: $("#inpAreaC2").val()}} ],
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
                                var ctx = new Chart(document.getElementById("areaCidades"), config);
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
                                        data: [ $("#inpAreaC").val(), $("#inpAreaC2").val() ],
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
                                var ctx = new Chart(document.getElementById("areaCidades"), config);
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
                                        data:[ $("#inpAreaC").val(), $("#inpAreaC2").val() ],
                                        backgroundColor: [`#f28705`, `#00a000`],
                                        borderColor: `#04d9b2`
                                    }]
                                };
                                var config = {
                                    type: 'pie',
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
                                var ctx = new Chart(document.getElementById("areaCidades"), config);
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
        }
    })
})
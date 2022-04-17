$(document).ready(function(){

    // Gráfico populacional entre anos do município
    $("#slctPopulacao").change(function(){
        if( $(this).prop("checked") == true ){
            $("#slctAno2").change(function(){
                document.getElementById("garficoPopulacaoAno").style.display = 'flex';

                switch($("#slctAno2").val()){
                    case "2007":
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {

                            } ,
                            success: function(comparaAno){
                                switch($("#tipoGrafico").val()){
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
                    case "2010":
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {
        
                            } ,
                            success: function(comparaAno){
                                switch($("#tipoGrafico").val()){
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
                    default:
                        $.ajax({
                            url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/"+$("#slctAno2").val()+"/variaveis/9324?localidades=N6["+$("#slctCidades").val()+"]" ,
                            type: "GET" ,
                            data: {
        
                            } ,
                            success: function(comparaAno){
                                switch($("#tipoGrafico").val()){
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
    
    
    // Gráfico populacional entre municípios
    $("#slctCidades2").change(function(){
        document.getElementById("garficoPopulacaoCidades").style.display = 'flex';

        switch($("#slctAno").val()){
            case "2007":
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"" ,
                    type: "GET" ,
                    data: {

                    } ,
                    success: function(comparaCidades){
                        switch($("#tipoGrafico").val()){
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
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
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
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
                        }
                    }
                })
                break
            case "2010":
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6["+$("#slctCidades2").val()+"]" ,
                    type: "GET" ,
                    data: {
        
                    } ,
                    success: function(comparaCidades){
                        switch($("#tipoGrafico").val()){
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
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
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
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
                        }
                    }
                })
                break
            default:
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/" +$("#slctAno").val()+ "/variaveis/9324?localidades=N6["+$("#slctCidades2").val()+"]",
                    type: "GET" ,
                    data: {
        
                    } ,
                    success: function(comparaCidades){
                        switch($("#tipoGrafico").val()){
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
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
                                            }
                                        },
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
                                            title: {
                                                display: true,
                                                text: 'Gráfico das Populações das cidades em ' + $("#slctAno").val()
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
                        }
                    }
                })
                break
        }
    })

    // Gráfico da área total entre os municípios
    $("#slctAreaT").change(function(){
        if($(this).prop("checked") == true){
            $("#slctCidades2").change(function(){
                document.getElementById("graficoAreaCidades").style.display = "flex";
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6["+$("#slctCidades2").val()+"]" ,
                    type: "GET" ,
                    data: {
        
                    } ,
                    success: function(comapraArea){
                        switch($("#tipoGrafico").val()){
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
                        }
                    }
                })
            })
        }
    })

    // Gráfico de escolarização total da população entre os municípios
    //$("#slctEscolarizacao").change(function(){})
})
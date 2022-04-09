function visualizar(query = '', grafico = '', tabela = false, res) {
    if (tabela) {
        if (query != '') {
            let div = document.querySelector(query)
            let ano
            for (let i in res) {
                if (i != 'unidade' && i != 'variavel') {
                    ano = Object.keys(res[i])
                    break
                }
            }
            let cont = 0
            let html = '<table border="1" class="tabelaClass" id="tabelaId"><caption class="tituloClass" id="tituloId">'+res.variavel+' - '+res.unidade+'</caption><tr>'
            for (let i in ano) {
                if (cont === 0) {
                    cont++
                    html += '<th></th>'
                }
                html += '<th>'+ano[i]+'</th>'
            }
            cont = 0
            html += '</tr>'
            for (let i in res) {
                if (i != 'unidade' && i != 'variavel') {
                    html += '<tr><th>'+i+'</th>'
                    for (let i1 in res[i]) {
                        html += '<td>'+res[i][i1]+'</td>'
                    }
                    html += '</tr>'
                }
            }
            html += '</table>'
            div.innerHTML = html
        } else return "Erro: insira uma query!"
    }
    switch(grafico) {
        case 'linha':
            if(query != '') {
                let labels
                for (let i in res) {
                    if (i != 'unidade' && i != 'variavel') {
                        labels = Object.keys(res[i])
                        break
                    }
                }
                let inicio = [], final = []
                const lista = []
                for (let i in res){
                    if (i != 'unidade' && i != 'variavel') {
                        let datapoints = []
                        for (let i2 in res[i]) {
                            datapoints.push(res[i][i2])
                        }
                        lista.push({
                            label: i,
                            data: datapoints,
                            borderColor: `#${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`,
                            fill: false,
                            tension: 0.4
                        })
                    }
                }
                const data = {
                    labels: labels,
                    datasets: lista
                }
                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: res.variavel+' - '+res.unidade
                        },
                    },
                        interaction: {
                            intersect: false,
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Value'
                                },
                                suggestedMin: parseInt(inicio.sort()[0]),
                                suggestedMax: parseInt(final.sort()[final.length-1])
                            }
                        }
                    },
                }
                let div = document.querySelector(query)
                if (div.firstElementChild != null) {
                    div.removeChild(div.firstElementChild)
                    let canvas = document.createElement('canvas')
                    div.appendChild(canvas)
                    const myChart = new Chart(canvas, config)
                } else {
                    let canvas = document.createElement('canvas')
                    div.appendChild(canvas)
                    const myChart = new Chart(canvas, config)
                }
            } else return "Erro: insira uma query!"
            break
        default:
            console.log(`Erro: gráfico = '${grafico}' não existe!`)
    }
}
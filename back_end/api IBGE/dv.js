function visualizar(query, grafico, tabela, cor, res) {
    const div = document.querySelector(query)
    if (tabela != '') {
        switch (tabela) {
            case 'tabela matriz':
                if (query != '') {
                    let ano, local = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            ano = Object.keys(res[i])
                            break
                        }
                    }
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    let html = '<table border="1"><tread><tr><th colspan="' + (local.length + 1) + '">' + res.variavel + ' - ' + res.unidade + '</th></tr></tread>'
                    html += `<tr><td>Ano</td>`
                    for (let i in local) {
                        html += `<td>${local[i]}</td>`
                    }
                    html += `</tr>`
                    for (let i in ano) {
                        html += `<tr><td>${ano[i]}</td>`
                        for (let i1 in local) {
                            html += `<td>${res[local[i1]][ano[i]]}</td>`
                        }
                        html += `</tr>`
                    }
                    html += '</table>'
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    div.innerHTML = html
                } else return "Erro: insira uma query!"
                break
            case 'tabela linha':
                if (query != '') {
                    let local = [], ano = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    for (let i in res[local[0]]) {
                        ano.push(i)
                    }
                    let html = '<table border="1" class="tabelaClass" id="tabelaId"><tread><tr><td colspan="3">'+res.variavel+' - '+res.unidade+'</td></tr></tread>'
                    html += '<tbody>'
                    for (let a in ano) {
                        html += '<tr><td colspan="3"></td><tr/>'
                        html += `<tr><td rowspan="${local.length}">${ano[a]}</td>`
                        let cont = 0
                        for (let l in local) {
                            if (cont === 0) html += `<td>${local[l]}</td><td>${res[local[l]][ano[a]]}</td></tr>`
                            if (cont != 0) html += `<tr><td>${local[l]}</td><td>${res[local[l]][ano[a]]}</td></tr>`
                            cont++
                        }
                    }
                    html += '</tbody>'
                    html += '</table>'
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    div.innerHTML = html
                } else return "Erro: insira uma query!"
                break
            default:
                console.log(`Erro: tabela = '${tabela}' não existe!`)
        }
    }
    if (grafico != '') {
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
                    let color = [], contCor = 0, border
                    if (typeof cor === 'boolean'){
                        if (cor === true) {
                            color = ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(255, 159, 64, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)', 'rgba(114, 92, 24, 0.7)', 'rgba(201, 181, 29, 0.7)', 'rgba(130, 203, 167, 0.7)', 'rgba(126, 197, 220, 0.7)', 'rgba(35, 129, 12, 0.7)', 'rgba(179, 24, 25, 0.7)', 'rgba(200, 81, 251, 0.7)', 'rgba(113, 107, 56, 0.7)', 'rgba(131, 48, 55, 0.7)', 'rgba(127, 110, 178, 0.7)', 'rgba(193, 27, 200, 0.7)', 'rgba(133, 206, 221, 0.7)', 'rgba(36, 163, 253, 0.7)', 'rgba(227, 93, 21, 0.7)', 'rgba(89, 197, 193, 0.7)', 'rgba(13, 209, 213, 0.7)', 'rgba(24, 103, 34, 0.7)', 'rgba(114, 204, 151, 0.7)', 'rgba(251, 107, 173, 0.7)', 'rgba(248, 64, 218, 0.7)', 'rgba(207, 139, 79, 0.7)', 'rgba(213, 102, 48, 0.7)', 'rgba(229, 118, 154, 0.7)', 'rgba(139, 19, 4, 0.7)', 'rgba(152, 29, 237, 0.7)', 'rgba(250, 131, 244, 0.7)', 'rgba(226, 244, 154, 0.7)', 'rgba(53, 45, 105, 0.7)', 'rgba(15, 126, 64, 0.7)', 'rgba(114, 172, 117, 0.7)', 'rgba(142, 58, 166, 0.7)', 'rgba(201, 215, 58, 0.7)', 'rgba(148, 95, 61, 0.7)', 'rgba(176, 67, 29, 0.7)', 'rgba(192, 141, 25, 0.7)', 'rgba(179, 127, 115, 0.7)', 'rgba(141, 94, 96, 0.7)', 'rgba(244, 219, 42, 0.7)', 'rgba(23, 10, 252, 0.7)', 'rgba(52, 110, 79, 0.7)', 'rgba(167, 92, 44, 0.7)', 'rgba(236, 127, 88, 0.7)', 'rgba(199, 230, 67, 0.7)', 'rgba(67, 223, 112, 0.7)', 'rgba(87, 18, 126, 0.7)', 'rgba(72, 242, 28, 0.7)', 'rgba(176, 121, 160, 0.7)', 'rgba(55, 172, 60, 0.7)', 'rgba(220, 189, 204, 0.7)', 'rgba(202, 67, 29, 0.7)', 'rgba(146, 6, 170, 0.7)', 'rgba(40, 116, 70, 0.7)', 'rgba(100, 152, 15, 0.7)', 'rgba(72, 245, 94, 0.7)', 'rgba(180, 255, 19, 0.7)', 'rgba(47, 81, 64, 0.7)', 'rgba(1, 124, 83, 0.7)', 'rgba(199, 200, 107, 0.7)', 'rgba(189, 9, 229, 0.7)', 'rgba(30, 66, 136, 0.7)', 'rgba(43, 174, 12, 0.7)', 'rgba(111, 168, 193, 0.7)', 'rgba(115, 45, 104, 0.7)', 'rgba(15, 245, 4, 0.7)', 'rgba(223, 201, 135, 0.7)', 'rgba(181, 176, 14, 0.7)', 'rgba(205, 197, 141, 0.7)', 'rgba(232, 151, 1, 0.7)', 'rgba(251, 68, 65, 0.7)', 'rgba(30, 111, 8, 0.7)', 'rgba(34, 55, 194, 0.7)', 'rgba(119, 108, 194, 0.7)', 'rgba(196, 16, 29, 0.7)', 'rgba(4, 57, 65, 0.7)', 'rgba(77, 156, 255, 0.7)', 'rgba(201, 224, 91, 0.7)', 'rgba(88, 210, 89, 0.7)', 'rgba(180, 250, 159, 0.7)', 'rgba(138, 228, 50, 0.7)', 'rgba(135, 203, 163, 0.7)', 'rgba(215, 23, 18, 0.7)', 'rgba(235, 182, 154, 0.7)', 'rgba(155, 53, 181, 0.7)', 'rgba(27, 135, 104, 0.7)', 'rgba(253, 185, 113, 0.7)', 'rgba(48, 61, 42, 0.7)', 'rgba(0, 30, 253, 0.7)', 'rgba(215, 148, 127, 0.7)', 'rgba(192, 101, 60, 0.7)', 'rgba(229, 17, 96, 0.7)', 'rgba(216, 208, 187, 0.7)', 'rgba(119, 110, 61, 0.7)', 'rgba(210, 66, 149, 0.7)', 'rgba(109, 195, 216, 0.7)', 'rgba(51, 179, 90, 0.7)', 'rgba(92, 73, 95, 0.7)', 'rgba(235, 211, 61, 0.7)', 'rgba(156, 246, 170, 0.7)', 'rgba(58, 235, 201, 0.7)', 'rgba(7, 166, 210, 0.7)', 'rgba(150, 113, 42, 0.7)', 'rgba(193, 93, 135, 0.7)', 'rgba(159, 36, 254, 0.7)', 'rgba(106, 107, 11, 0.7)', 'rgba(150, 75, 208, 0.7)', 'rgba(108, 192, 21, 0.7)', 'rgba(83, 64, 174, 0.7)', 'rgba(54, 70, 255, 0.7)', 'rgba(250, 1, 245, 0.7)', 'rgba(11, 5, 197, 0.7)', 'rgba(168, 197, 148, 0.7)', 'rgba(125, 40, 63, 0.7)', 'rgba(231, 8, 121, 0.7)', 'rgba(187, 253, 118, 0.7)', 'rgba(54, 19, 182, 0.7)', 'rgba(36, 159, 168, 0.7)', 'rgba(26, 117, 7, 0.7)', 'rgba(95, 247, 177, 0.7)', 'rgba(73, 144, 30, 0.7)', 'rgba(14, 136, 145, 0.7)', 'rgba(181, 23, 78, 0.7)', 'rgba(89, 59, 93, 0.7)', 'rgba(158, 123, 5, 0.7)', 'rgba(5, 192, 145, 0.7)', 'rgba(145, 213, 117, 0.7)', 'rgba(216, 143, 72, 0.7)', 'rgba(81, 123, 226, 0.7)', 'rgba(224, 248, 78, 0.7)', 'rgba(218, 160, 67, 0.7)', 'rgba(96, 162, 202, 0.7)', 'rgba(105, 145, 105, 0.7)', 'rgba(72, 170, 89, 0.7)', 'rgba(181, 137, 86, 0.7)', 'rgba(15, 10, 201, 0.7)', 'rgba(210, 178, 30, 0.7)', 'rgba(227, 186, 202, 0.7)', 'rgba(183, 168, 68, 0.7)', 'rgba(65, 49, 103, 0.7)', 'rgba(8, 85, 4, 0.7)', 'rgba(202, 137, 11, 0.7)', 'rgba(75, 254, 234, 0.7)', 'rgba(117, 155, 34, 0.7)', 'rgba(46, 14, 189, 0.7)', 'rgba(209, 222, 198, 0.7)', 'rgba(7, 238, 172, 0.7)', 'rgba(71, 65, 113, 0.7)', 'rgba(227, 24, 248, 0.7)', 'rgba(58, 34, 92, 0.7)', 'rgba(207, 189, 43, 0.7)', 'rgba(223, 200, 208, 0.7)', 'rgba(135, 161, 44, 0.7)', 'rgba(32, 116, 26, 0.7)', 'rgba(76, 76, 81, 0.7)', 'rgba(112, 120, 94, 0.7)', 'rgba(98, 177, 96, 0.7)', 'rgba(25, 171, 65, 0.7)', 'rgba(83, 155, 63, 0.7)', 'rgba(132, 180, 37, 0.7)', 'rgba(204, 244, 142, 0.7)', 'rgba(222, 4, 215, 0.7)', 'rgba(54, 110, 135, 0.7)', 'rgba(243, 124, 141, 0.7)', 'rgba(201, 59, 49, 0.7)', 'rgba(71, 180, 252, 0.7)', 'rgba(17, 238, 68, 0.7)', 'rgba(154, 86, 148, 0.7)', 'rgba(48, 29, 104, 0.7)', 'rgba(202, 251, 91, 0.7)', 'rgba(157, 198, 103, 0.7)', 'rgba(84, 104, 85, 0.7)', 'rgba(36, 95, 124, 0.7)', 'rgba(235, 65, 8, 0.7)']
                        border = color
                        } else {
                            color = [`rgba(242,135,5,0.7)`]
                            border = [`#04d9b2`]
                        }
                    } else if (typeof cor === 'string') {
                        if (cor === 'random') {
                            for (let i in res) {
                                if (i != 'unidade' && i != 'variavel') {
                                    for (let i2 in res[i]) {
                                        color.push(`rgba(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, 0.7)`)
                                    }
                                }
                            }
                            border = color
                        } else {
                            console.log('Erro: valor não existe para cor = '+cor)
                            color = [`rgba(242,135,5,0.7)`]
                            border = [`#04d9b2`]
                        }
                    } else if (typeof cor === 'object') {
                        color = cor
                        border = [`#04d9b2`]
                    } else {
                        console.log('Erro: valor não existe para cor = '+cor)
                        color = [`rgba(242,135,5,0.7)`]
                        border = [`#04d9b2`]
                    }
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
                                borderColor: border[contCor],
                                backgroundColor: color[contCor],
                                fill: false,
                                tension: 0.4
                            })
                            contCor++
                            if (contCor === color.length) contCor = 0
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
                                    }
                                }
                            }
                        },
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    const canvas = document.createElement('canvas')
                    div.appendChild(canvas)
                    const myChart = new Chart(canvas, config)
                } else return "Erro: insira uma query!"
                break
            case 'barra1':
                if(query != '') {
                    let anos
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            anos = Object.keys(res[i])
                            break
                        }
                    }
                    let color = [], contCor = 0
                    if (typeof cor === 'boolean'){
                        if (cor === true) {
                            color = ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(255, 159, 64, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)', 'rgba(114, 92, 24, 0.7)', 'rgba(201, 181, 29, 0.7)', 'rgba(130, 203, 167, 0.7)', 'rgba(126, 197, 220, 0.7)', 'rgba(35, 129, 12, 0.7)', 'rgba(179, 24, 25, 0.7)', 'rgba(200, 81, 251, 0.7)', 'rgba(113, 107, 56, 0.7)', 'rgba(131, 48, 55, 0.7)', 'rgba(127, 110, 178, 0.7)', 'rgba(193, 27, 200, 0.7)', 'rgba(133, 206, 221, 0.7)', 'rgba(36, 163, 253, 0.7)', 'rgba(227, 93, 21, 0.7)', 'rgba(89, 197, 193, 0.7)', 'rgba(13, 209, 213, 0.7)', 'rgba(24, 103, 34, 0.7)', 'rgba(114, 204, 151, 0.7)', 'rgba(251, 107, 173, 0.7)', 'rgba(248, 64, 218, 0.7)', 'rgba(207, 139, 79, 0.7)', 'rgba(213, 102, 48, 0.7)', 'rgba(229, 118, 154, 0.7)', 'rgba(139, 19, 4, 0.7)', 'rgba(152, 29, 237, 0.7)', 'rgba(250, 131, 244, 0.7)', 'rgba(226, 244, 154, 0.7)', 'rgba(53, 45, 105, 0.7)', 'rgba(15, 126, 64, 0.7)', 'rgba(114, 172, 117, 0.7)', 'rgba(142, 58, 166, 0.7)', 'rgba(201, 215, 58, 0.7)', 'rgba(148, 95, 61, 0.7)', 'rgba(176, 67, 29, 0.7)', 'rgba(192, 141, 25, 0.7)', 'rgba(179, 127, 115, 0.7)', 'rgba(141, 94, 96, 0.7)', 'rgba(244, 219, 42, 0.7)', 'rgba(23, 10, 252, 0.7)', 'rgba(52, 110, 79, 0.7)', 'rgba(167, 92, 44, 0.7)', 'rgba(236, 127, 88, 0.7)', 'rgba(199, 230, 67, 0.7)', 'rgba(67, 223, 112, 0.7)', 'rgba(87, 18, 126, 0.7)', 'rgba(72, 242, 28, 0.7)', 'rgba(176, 121, 160, 0.7)', 'rgba(55, 172, 60, 0.7)', 'rgba(220, 189, 204, 0.7)', 'rgba(202, 67, 29, 0.7)', 'rgba(146, 6, 170, 0.7)', 'rgba(40, 116, 70, 0.7)', 'rgba(100, 152, 15, 0.7)', 'rgba(72, 245, 94, 0.7)', 'rgba(180, 255, 19, 0.7)', 'rgba(47, 81, 64, 0.7)', 'rgba(1, 124, 83, 0.7)', 'rgba(199, 200, 107, 0.7)', 'rgba(189, 9, 229, 0.7)', 'rgba(30, 66, 136, 0.7)', 'rgba(43, 174, 12, 0.7)', 'rgba(111, 168, 193, 0.7)', 'rgba(115, 45, 104, 0.7)', 'rgba(15, 245, 4, 0.7)', 'rgba(223, 201, 135, 0.7)', 'rgba(181, 176, 14, 0.7)', 'rgba(205, 197, 141, 0.7)', 'rgba(232, 151, 1, 0.7)', 'rgba(251, 68, 65, 0.7)', 'rgba(30, 111, 8, 0.7)', 'rgba(34, 55, 194, 0.7)', 'rgba(119, 108, 194, 0.7)', 'rgba(196, 16, 29, 0.7)', 'rgba(4, 57, 65, 0.7)', 'rgba(77, 156, 255, 0.7)', 'rgba(201, 224, 91, 0.7)', 'rgba(88, 210, 89, 0.7)', 'rgba(180, 250, 159, 0.7)', 'rgba(138, 228, 50, 0.7)', 'rgba(135, 203, 163, 0.7)', 'rgba(215, 23, 18, 0.7)', 'rgba(235, 182, 154, 0.7)', 'rgba(155, 53, 181, 0.7)', 'rgba(27, 135, 104, 0.7)', 'rgba(253, 185, 113, 0.7)', 'rgba(48, 61, 42, 0.7)', 'rgba(0, 30, 253, 0.7)', 'rgba(215, 148, 127, 0.7)', 'rgba(192, 101, 60, 0.7)', 'rgba(229, 17, 96, 0.7)', 'rgba(216, 208, 187, 0.7)', 'rgba(119, 110, 61, 0.7)', 'rgba(210, 66, 149, 0.7)', 'rgba(109, 195, 216, 0.7)', 'rgba(51, 179, 90, 0.7)', 'rgba(92, 73, 95, 0.7)', 'rgba(235, 211, 61, 0.7)', 'rgba(156, 246, 170, 0.7)', 'rgba(58, 235, 201, 0.7)', 'rgba(7, 166, 210, 0.7)', 'rgba(150, 113, 42, 0.7)', 'rgba(193, 93, 135, 0.7)', 'rgba(159, 36, 254, 0.7)', 'rgba(106, 107, 11, 0.7)', 'rgba(150, 75, 208, 0.7)', 'rgba(108, 192, 21, 0.7)', 'rgba(83, 64, 174, 0.7)', 'rgba(54, 70, 255, 0.7)', 'rgba(250, 1, 245, 0.7)', 'rgba(11, 5, 197, 0.7)', 'rgba(168, 197, 148, 0.7)', 'rgba(125, 40, 63, 0.7)', 'rgba(231, 8, 121, 0.7)', 'rgba(187, 253, 118, 0.7)', 'rgba(54, 19, 182, 0.7)', 'rgba(36, 159, 168, 0.7)', 'rgba(26, 117, 7, 0.7)', 'rgba(95, 247, 177, 0.7)', 'rgba(73, 144, 30, 0.7)', 'rgba(14, 136, 145, 0.7)', 'rgba(181, 23, 78, 0.7)', 'rgba(89, 59, 93, 0.7)', 'rgba(158, 123, 5, 0.7)', 'rgba(5, 192, 145, 0.7)', 'rgba(145, 213, 117, 0.7)', 'rgba(216, 143, 72, 0.7)', 'rgba(81, 123, 226, 0.7)', 'rgba(224, 248, 78, 0.7)', 'rgba(218, 160, 67, 0.7)', 'rgba(96, 162, 202, 0.7)', 'rgba(105, 145, 105, 0.7)', 'rgba(72, 170, 89, 0.7)', 'rgba(181, 137, 86, 0.7)', 'rgba(15, 10, 201, 0.7)', 'rgba(210, 178, 30, 0.7)', 'rgba(227, 186, 202, 0.7)', 'rgba(183, 168, 68, 0.7)', 'rgba(65, 49, 103, 0.7)', 'rgba(8, 85, 4, 0.7)', 'rgba(202, 137, 11, 0.7)', 'rgba(75, 254, 234, 0.7)', 'rgba(117, 155, 34, 0.7)', 'rgba(46, 14, 189, 0.7)', 'rgba(209, 222, 198, 0.7)', 'rgba(7, 238, 172, 0.7)', 'rgba(71, 65, 113, 0.7)', 'rgba(227, 24, 248, 0.7)', 'rgba(58, 34, 92, 0.7)', 'rgba(207, 189, 43, 0.7)', 'rgba(223, 200, 208, 0.7)', 'rgba(135, 161, 44, 0.7)', 'rgba(32, 116, 26, 0.7)', 'rgba(76, 76, 81, 0.7)', 'rgba(112, 120, 94, 0.7)', 'rgba(98, 177, 96, 0.7)', 'rgba(25, 171, 65, 0.7)', 'rgba(83, 155, 63, 0.7)', 'rgba(132, 180, 37, 0.7)', 'rgba(204, 244, 142, 0.7)', 'rgba(222, 4, 215, 0.7)', 'rgba(54, 110, 135, 0.7)', 'rgba(243, 124, 141, 0.7)', 'rgba(201, 59, 49, 0.7)', 'rgba(71, 180, 252, 0.7)', 'rgba(17, 238, 68, 0.7)', 'rgba(154, 86, 148, 0.7)', 'rgba(48, 29, 104, 0.7)', 'rgba(202, 251, 91, 0.7)', 'rgba(157, 198, 103, 0.7)', 'rgba(84, 104, 85, 0.7)', 'rgba(36, 95, 124, 0.7)', 'rgba(235, 65, 8, 0.7)']
                        } else {
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'string') {
                        if (cor === 'random') {
                            for (let i in res) {
                                if (i != 'unidade' && i != 'variavel') {
                                    for (let i2 in res[i]) {
                                        color.push(`rgba(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, 0.7)`)
                                    }
                                }
                            }
                        } else {
                            console.log('Erro: valor não existe para cor = '+cor)
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'object') {
                        color = cor
                    } else {
                        console.log('Erro: valor não existe para cor = '+cor)
                        color = [`rgba(242,135,5,0.7)`]
                    }
                    let datasets = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            let data = []
                            for (let i2 in res[i]) {
                                data.push(res[i][i2])
                            }
                            datasets.push({
                                label: i,
                                data,
                                borderColor: `#04d9b2`,
                                backgroundColor: color[contCor],
                                borderWidth: 3,
                                borderRadius: 30,
                                borderSkipped: false
                            })
                            contCor++
                            if (contCor === color.length) contCor = 0
                        }
                    }
                    const data = {
                        labels: anos,
                        datasets
                    }
                    const config = {
                        type: 'bar',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: res.variavel+' - '+res.unidade
                                }
                            }
                        }
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    let canvas = document.createElement('canvas')
                    div.appendChild(canvas)
                    const myChart = new Chart(canvas, config)
                } else return "Erro: insira uma query!"
                break
            case 'barra2':
                if(query != '') {
                    let local = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    let anos, contAno = 0
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            anos = Object.keys(res[i])
                            break
                        }
                    }
                    let dados = {}
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2] = []
                            }
                            break
                        }
                    }
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2].push(res[i][i2])
                            }
                        }
                    }
                    let d = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                d.push(parseInt(res[i][i2]))
                            }
                        }
                    }
                    let color = []
                    if (typeof cor === 'boolean'){
                        if (cor === true) {
                            color = ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(255, 159, 64, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)', 'rgba(114, 92, 24, 0.7)', 'rgba(201, 181, 29, 0.7)', 'rgba(130, 203, 167, 0.7)', 'rgba(126, 197, 220, 0.7)', 'rgba(35, 129, 12, 0.7)', 'rgba(179, 24, 25, 0.7)', 'rgba(200, 81, 251, 0.7)', 'rgba(113, 107, 56, 0.7)', 'rgba(131, 48, 55, 0.7)', 'rgba(127, 110, 178, 0.7)', 'rgba(193, 27, 200, 0.7)', 'rgba(133, 206, 221, 0.7)', 'rgba(36, 163, 253, 0.7)', 'rgba(227, 93, 21, 0.7)', 'rgba(89, 197, 193, 0.7)', 'rgba(13, 209, 213, 0.7)', 'rgba(24, 103, 34, 0.7)', 'rgba(114, 204, 151, 0.7)', 'rgba(251, 107, 173, 0.7)', 'rgba(248, 64, 218, 0.7)', 'rgba(207, 139, 79, 0.7)', 'rgba(213, 102, 48, 0.7)', 'rgba(229, 118, 154, 0.7)', 'rgba(139, 19, 4, 0.7)', 'rgba(152, 29, 237, 0.7)', 'rgba(250, 131, 244, 0.7)', 'rgba(226, 244, 154, 0.7)', 'rgba(53, 45, 105, 0.7)', 'rgba(15, 126, 64, 0.7)', 'rgba(114, 172, 117, 0.7)', 'rgba(142, 58, 166, 0.7)', 'rgba(201, 215, 58, 0.7)', 'rgba(148, 95, 61, 0.7)', 'rgba(176, 67, 29, 0.7)', 'rgba(192, 141, 25, 0.7)', 'rgba(179, 127, 115, 0.7)', 'rgba(141, 94, 96, 0.7)', 'rgba(244, 219, 42, 0.7)', 'rgba(23, 10, 252, 0.7)', 'rgba(52, 110, 79, 0.7)', 'rgba(167, 92, 44, 0.7)', 'rgba(236, 127, 88, 0.7)', 'rgba(199, 230, 67, 0.7)', 'rgba(67, 223, 112, 0.7)', 'rgba(87, 18, 126, 0.7)', 'rgba(72, 242, 28, 0.7)', 'rgba(176, 121, 160, 0.7)', 'rgba(55, 172, 60, 0.7)', 'rgba(220, 189, 204, 0.7)', 'rgba(202, 67, 29, 0.7)', 'rgba(146, 6, 170, 0.7)', 'rgba(40, 116, 70, 0.7)', 'rgba(100, 152, 15, 0.7)', 'rgba(72, 245, 94, 0.7)', 'rgba(180, 255, 19, 0.7)', 'rgba(47, 81, 64, 0.7)', 'rgba(1, 124, 83, 0.7)', 'rgba(199, 200, 107, 0.7)', 'rgba(189, 9, 229, 0.7)', 'rgba(30, 66, 136, 0.7)', 'rgba(43, 174, 12, 0.7)', 'rgba(111, 168, 193, 0.7)', 'rgba(115, 45, 104, 0.7)', 'rgba(15, 245, 4, 0.7)', 'rgba(223, 201, 135, 0.7)', 'rgba(181, 176, 14, 0.7)', 'rgba(205, 197, 141, 0.7)', 'rgba(232, 151, 1, 0.7)', 'rgba(251, 68, 65, 0.7)', 'rgba(30, 111, 8, 0.7)', 'rgba(34, 55, 194, 0.7)', 'rgba(119, 108, 194, 0.7)', 'rgba(196, 16, 29, 0.7)', 'rgba(4, 57, 65, 0.7)', 'rgba(77, 156, 255, 0.7)', 'rgba(201, 224, 91, 0.7)', 'rgba(88, 210, 89, 0.7)', 'rgba(180, 250, 159, 0.7)', 'rgba(138, 228, 50, 0.7)', 'rgba(135, 203, 163, 0.7)', 'rgba(215, 23, 18, 0.7)', 'rgba(235, 182, 154, 0.7)', 'rgba(155, 53, 181, 0.7)', 'rgba(27, 135, 104, 0.7)', 'rgba(253, 185, 113, 0.7)', 'rgba(48, 61, 42, 0.7)', 'rgba(0, 30, 253, 0.7)', 'rgba(215, 148, 127, 0.7)', 'rgba(192, 101, 60, 0.7)', 'rgba(229, 17, 96, 0.7)', 'rgba(216, 208, 187, 0.7)', 'rgba(119, 110, 61, 0.7)', 'rgba(210, 66, 149, 0.7)', 'rgba(109, 195, 216, 0.7)', 'rgba(51, 179, 90, 0.7)', 'rgba(92, 73, 95, 0.7)', 'rgba(235, 211, 61, 0.7)', 'rgba(156, 246, 170, 0.7)', 'rgba(58, 235, 201, 0.7)', 'rgba(7, 166, 210, 0.7)', 'rgba(150, 113, 42, 0.7)', 'rgba(193, 93, 135, 0.7)', 'rgba(159, 36, 254, 0.7)', 'rgba(106, 107, 11, 0.7)', 'rgba(150, 75, 208, 0.7)', 'rgba(108, 192, 21, 0.7)', 'rgba(83, 64, 174, 0.7)', 'rgba(54, 70, 255, 0.7)', 'rgba(250, 1, 245, 0.7)', 'rgba(11, 5, 197, 0.7)', 'rgba(168, 197, 148, 0.7)', 'rgba(125, 40, 63, 0.7)', 'rgba(231, 8, 121, 0.7)', 'rgba(187, 253, 118, 0.7)', 'rgba(54, 19, 182, 0.7)', 'rgba(36, 159, 168, 0.7)', 'rgba(26, 117, 7, 0.7)', 'rgba(95, 247, 177, 0.7)', 'rgba(73, 144, 30, 0.7)', 'rgba(14, 136, 145, 0.7)', 'rgba(181, 23, 78, 0.7)', 'rgba(89, 59, 93, 0.7)', 'rgba(158, 123, 5, 0.7)', 'rgba(5, 192, 145, 0.7)', 'rgba(145, 213, 117, 0.7)', 'rgba(216, 143, 72, 0.7)', 'rgba(81, 123, 226, 0.7)', 'rgba(224, 248, 78, 0.7)', 'rgba(218, 160, 67, 0.7)', 'rgba(96, 162, 202, 0.7)', 'rgba(105, 145, 105, 0.7)', 'rgba(72, 170, 89, 0.7)', 'rgba(181, 137, 86, 0.7)', 'rgba(15, 10, 201, 0.7)', 'rgba(210, 178, 30, 0.7)', 'rgba(227, 186, 202, 0.7)', 'rgba(183, 168, 68, 0.7)', 'rgba(65, 49, 103, 0.7)', 'rgba(8, 85, 4, 0.7)', 'rgba(202, 137, 11, 0.7)', 'rgba(75, 254, 234, 0.7)', 'rgba(117, 155, 34, 0.7)', 'rgba(46, 14, 189, 0.7)', 'rgba(209, 222, 198, 0.7)', 'rgba(7, 238, 172, 0.7)', 'rgba(71, 65, 113, 0.7)', 'rgba(227, 24, 248, 0.7)', 'rgba(58, 34, 92, 0.7)', 'rgba(207, 189, 43, 0.7)', 'rgba(223, 200, 208, 0.7)', 'rgba(135, 161, 44, 0.7)', 'rgba(32, 116, 26, 0.7)', 'rgba(76, 76, 81, 0.7)', 'rgba(112, 120, 94, 0.7)', 'rgba(98, 177, 96, 0.7)', 'rgba(25, 171, 65, 0.7)', 'rgba(83, 155, 63, 0.7)', 'rgba(132, 180, 37, 0.7)', 'rgba(204, 244, 142, 0.7)', 'rgba(222, 4, 215, 0.7)', 'rgba(54, 110, 135, 0.7)', 'rgba(243, 124, 141, 0.7)', 'rgba(201, 59, 49, 0.7)', 'rgba(71, 180, 252, 0.7)', 'rgba(17, 238, 68, 0.7)', 'rgba(154, 86, 148, 0.7)', 'rgba(48, 29, 104, 0.7)', 'rgba(202, 251, 91, 0.7)', 'rgba(157, 198, 103, 0.7)', 'rgba(84, 104, 85, 0.7)', 'rgba(36, 95, 124, 0.7)', 'rgba(235, 65, 8, 0.7)']
                        } else {
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'string') {
                        if (cor === 'random') {
                            for (let i in res) {
                                if (i != 'unidade' && i != 'variavel') {
                                    for (let i2 in res[i]) {
                                        color.push(`rgba(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, 0.7)`)
                                    }
                                }
                            }
                        } else {
                            console.log('Erro: valor não existe para cor = '+cor)
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'object') {
                        color = cor
                    } else {
                        console.log('Erro: valor não existe para cor = '+cor)
                        color = [`rgba(242,135,5,0.7)`]
                    }
                    const data = {
                        labels: local,
                        datasets: [{
                            label: res.unidade,
                            data: dados[anos[contAno]],
                            borderColor: `#04d9b2`,
                            backgroundColor: color,
                            borderWidth: 3,
                            borderRadius: 30,
                            borderSkipped: false
                        }]
                    }
                    const config = {
                        type: 'bar',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: res.variavel+' - '+res.unidade
                                }
                            },
                            scales: {
                                y: {
                                    suggestedMin: 0,
                                    suggestedMax: d.sort()[d.length-1]
                                }
                            }
                        }
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    const canvas = document.createElement('canvas')
                    const divBtn = document.createElement('div')
                    const btnEsquerdo = document.createElement('button')
                    const btnEsquerdoSuper = document.createElement('button')
                    btnEsquerdo.textContent = '<'
                    btnEsquerdoSuper.textContent = '<<'
                    const btnDireito = document.createElement('button')
                    const btnDireitoSuper = document.createElement('button')
                    btnDireito.textContent = '>'
                    btnDireitoSuper.textContent = '>>'
                    const label = document.createElement('label')
                    label.textContent = anos[contAno]
                    divBtn.appendChild(btnEsquerdoSuper)
                    divBtn.appendChild(btnEsquerdo)
                    divBtn.appendChild(label)
                    divBtn.appendChild(btnDireito)
                    divBtn.appendChild(btnDireitoSuper)
                    div.appendChild(canvas)
                    div.appendChild(divBtn)
                    const myChart = new Chart(canvas, config)
                    btnDireito.onclick = () => {
                        contAno++
                        if (contAno === anos.length) contAno = 0
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnEsquerdo.onclick = () => {
                        contAno--
                        if (contAno === -1) contAno = anos.length-1
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnDireitoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[anos.length-1]]
                        label.textContent = anos[anos.length-1]
                        myChart.update()
                    }
                    btnEsquerdoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[0]]
                        label.textContent = anos[0]
                        myChart.update()
                    }
                    
                } else return "Erro: insira uma query!"
                break
            case 'pizza':
                if(query != '') {
                    let local = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    let anos, contAno = 0
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            anos = Object.keys(res[i])
                            break
                        }
                    }
                    let dados = {}
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2] = []
                            }
                            break
                        }
                    }
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2].push(res[i][i2])
                            }
                        }
                    }
                    let color = []
                    if (typeof cor === 'boolean'){
                        if (cor === true) {
                            color = ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(255, 159, 64, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)', 'rgba(114, 92, 24, 0.7)', 'rgba(201, 181, 29, 0.7)', 'rgba(130, 203, 167, 0.7)', 'rgba(126, 197, 220, 0.7)', 'rgba(35, 129, 12, 0.7)', 'rgba(179, 24, 25, 0.7)', 'rgba(200, 81, 251, 0.7)', 'rgba(113, 107, 56, 0.7)', 'rgba(131, 48, 55, 0.7)', 'rgba(127, 110, 178, 0.7)', 'rgba(193, 27, 200, 0.7)', 'rgba(133, 206, 221, 0.7)', 'rgba(36, 163, 253, 0.7)', 'rgba(227, 93, 21, 0.7)', 'rgba(89, 197, 193, 0.7)', 'rgba(13, 209, 213, 0.7)', 'rgba(24, 103, 34, 0.7)', 'rgba(114, 204, 151, 0.7)', 'rgba(251, 107, 173, 0.7)', 'rgba(248, 64, 218, 0.7)', 'rgba(207, 139, 79, 0.7)', 'rgba(213, 102, 48, 0.7)', 'rgba(229, 118, 154, 0.7)', 'rgba(139, 19, 4, 0.7)', 'rgba(152, 29, 237, 0.7)', 'rgba(250, 131, 244, 0.7)', 'rgba(226, 244, 154, 0.7)', 'rgba(53, 45, 105, 0.7)', 'rgba(15, 126, 64, 0.7)', 'rgba(114, 172, 117, 0.7)', 'rgba(142, 58, 166, 0.7)', 'rgba(201, 215, 58, 0.7)', 'rgba(148, 95, 61, 0.7)', 'rgba(176, 67, 29, 0.7)', 'rgba(192, 141, 25, 0.7)', 'rgba(179, 127, 115, 0.7)', 'rgba(141, 94, 96, 0.7)', 'rgba(244, 219, 42, 0.7)', 'rgba(23, 10, 252, 0.7)', 'rgba(52, 110, 79, 0.7)', 'rgba(167, 92, 44, 0.7)', 'rgba(236, 127, 88, 0.7)', 'rgba(199, 230, 67, 0.7)', 'rgba(67, 223, 112, 0.7)', 'rgba(87, 18, 126, 0.7)', 'rgba(72, 242, 28, 0.7)', 'rgba(176, 121, 160, 0.7)', 'rgba(55, 172, 60, 0.7)', 'rgba(220, 189, 204, 0.7)', 'rgba(202, 67, 29, 0.7)', 'rgba(146, 6, 170, 0.7)', 'rgba(40, 116, 70, 0.7)', 'rgba(100, 152, 15, 0.7)', 'rgba(72, 245, 94, 0.7)', 'rgba(180, 255, 19, 0.7)', 'rgba(47, 81, 64, 0.7)', 'rgba(1, 124, 83, 0.7)', 'rgba(199, 200, 107, 0.7)', 'rgba(189, 9, 229, 0.7)', 'rgba(30, 66, 136, 0.7)', 'rgba(43, 174, 12, 0.7)', 'rgba(111, 168, 193, 0.7)', 'rgba(115, 45, 104, 0.7)', 'rgba(15, 245, 4, 0.7)', 'rgba(223, 201, 135, 0.7)', 'rgba(181, 176, 14, 0.7)', 'rgba(205, 197, 141, 0.7)', 'rgba(232, 151, 1, 0.7)', 'rgba(251, 68, 65, 0.7)', 'rgba(30, 111, 8, 0.7)', 'rgba(34, 55, 194, 0.7)', 'rgba(119, 108, 194, 0.7)', 'rgba(196, 16, 29, 0.7)', 'rgba(4, 57, 65, 0.7)', 'rgba(77, 156, 255, 0.7)', 'rgba(201, 224, 91, 0.7)', 'rgba(88, 210, 89, 0.7)', 'rgba(180, 250, 159, 0.7)', 'rgba(138, 228, 50, 0.7)', 'rgba(135, 203, 163, 0.7)', 'rgba(215, 23, 18, 0.7)', 'rgba(235, 182, 154, 0.7)', 'rgba(155, 53, 181, 0.7)', 'rgba(27, 135, 104, 0.7)', 'rgba(253, 185, 113, 0.7)', 'rgba(48, 61, 42, 0.7)', 'rgba(0, 30, 253, 0.7)', 'rgba(215, 148, 127, 0.7)', 'rgba(192, 101, 60, 0.7)', 'rgba(229, 17, 96, 0.7)', 'rgba(216, 208, 187, 0.7)', 'rgba(119, 110, 61, 0.7)', 'rgba(210, 66, 149, 0.7)', 'rgba(109, 195, 216, 0.7)', 'rgba(51, 179, 90, 0.7)', 'rgba(92, 73, 95, 0.7)', 'rgba(235, 211, 61, 0.7)', 'rgba(156, 246, 170, 0.7)', 'rgba(58, 235, 201, 0.7)', 'rgba(7, 166, 210, 0.7)', 'rgba(150, 113, 42, 0.7)', 'rgba(193, 93, 135, 0.7)', 'rgba(159, 36, 254, 0.7)', 'rgba(106, 107, 11, 0.7)', 'rgba(150, 75, 208, 0.7)', 'rgba(108, 192, 21, 0.7)', 'rgba(83, 64, 174, 0.7)', 'rgba(54, 70, 255, 0.7)', 'rgba(250, 1, 245, 0.7)', 'rgba(11, 5, 197, 0.7)', 'rgba(168, 197, 148, 0.7)', 'rgba(125, 40, 63, 0.7)', 'rgba(231, 8, 121, 0.7)', 'rgba(187, 253, 118, 0.7)', 'rgba(54, 19, 182, 0.7)', 'rgba(36, 159, 168, 0.7)', 'rgba(26, 117, 7, 0.7)', 'rgba(95, 247, 177, 0.7)', 'rgba(73, 144, 30, 0.7)', 'rgba(14, 136, 145, 0.7)', 'rgba(181, 23, 78, 0.7)', 'rgba(89, 59, 93, 0.7)', 'rgba(158, 123, 5, 0.7)', 'rgba(5, 192, 145, 0.7)', 'rgba(145, 213, 117, 0.7)', 'rgba(216, 143, 72, 0.7)', 'rgba(81, 123, 226, 0.7)', 'rgba(224, 248, 78, 0.7)', 'rgba(218, 160, 67, 0.7)', 'rgba(96, 162, 202, 0.7)', 'rgba(105, 145, 105, 0.7)', 'rgba(72, 170, 89, 0.7)', 'rgba(181, 137, 86, 0.7)', 'rgba(15, 10, 201, 0.7)', 'rgba(210, 178, 30, 0.7)', 'rgba(227, 186, 202, 0.7)', 'rgba(183, 168, 68, 0.7)', 'rgba(65, 49, 103, 0.7)', 'rgba(8, 85, 4, 0.7)', 'rgba(202, 137, 11, 0.7)', 'rgba(75, 254, 234, 0.7)', 'rgba(117, 155, 34, 0.7)', 'rgba(46, 14, 189, 0.7)', 'rgba(209, 222, 198, 0.7)', 'rgba(7, 238, 172, 0.7)', 'rgba(71, 65, 113, 0.7)', 'rgba(227, 24, 248, 0.7)', 'rgba(58, 34, 92, 0.7)', 'rgba(207, 189, 43, 0.7)', 'rgba(223, 200, 208, 0.7)', 'rgba(135, 161, 44, 0.7)', 'rgba(32, 116, 26, 0.7)', 'rgba(76, 76, 81, 0.7)', 'rgba(112, 120, 94, 0.7)', 'rgba(98, 177, 96, 0.7)', 'rgba(25, 171, 65, 0.7)', 'rgba(83, 155, 63, 0.7)', 'rgba(132, 180, 37, 0.7)', 'rgba(204, 244, 142, 0.7)', 'rgba(222, 4, 215, 0.7)', 'rgba(54, 110, 135, 0.7)', 'rgba(243, 124, 141, 0.7)', 'rgba(201, 59, 49, 0.7)', 'rgba(71, 180, 252, 0.7)', 'rgba(17, 238, 68, 0.7)', 'rgba(154, 86, 148, 0.7)', 'rgba(48, 29, 104, 0.7)', 'rgba(202, 251, 91, 0.7)', 'rgba(157, 198, 103, 0.7)', 'rgba(84, 104, 85, 0.7)', 'rgba(36, 95, 124, 0.7)', 'rgba(235, 65, 8, 0.7)']
                        } else {
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'string') {
                        if (cor === 'random') {
                            for (let i in res) {
                                if (i != 'unidade' && i != 'variavel') {
                                    for (let i2 in res[i]) {
                                        color.push(`rgba(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, 0.7)`)
                                    }
                                }
                            }
                        } else {
                            console.log('Erro: valor não existe para cor = '+cor)
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'object') {
                        color = cor
                    } else {
                        console.log('Erro: valor não existe para cor = '+cor)
                        color = [`rgba(242,135,5,0.7)`]
                    }
                    const data = {
                        labels: local,
                        datasets: [
                            {
                                label: 'Dataset 1',
                                data: dados[anos[contAno]],
                                borderColor: `#04d9b2`,
                                backgroundColor: color
                            }
                        ]
                    }
                    const config = {
                        type: 'pie',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: res.variavel+' - '+res.unidade
                                }
                            }
                        }
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    const canvas = document.createElement('canvas')
                    const divBtn = document.createElement('div')
                    const btnEsquerdo = document.createElement('button')
                    const btnEsquerdoSuper = document.createElement('button')
                    btnEsquerdo.textContent = '<'
                    btnEsquerdoSuper.textContent = '<<'
                    const btnDireito = document.createElement('button')
                    const btnDireitoSuper = document.createElement('button')
                    btnDireito.textContent = '>'
                    btnDireitoSuper.textContent = '>>'
                    const label = document.createElement('label')
                    label.textContent = anos[contAno]
                    divBtn.appendChild(btnEsquerdoSuper)
                    divBtn.appendChild(btnEsquerdo)
                    divBtn.appendChild(label)
                    divBtn.appendChild(btnDireito)
                    divBtn.appendChild(btnDireitoSuper)
                    div.appendChild(canvas)
                    div.appendChild(divBtn)
                    const myChart = new Chart(canvas, config)
                    btnDireito.onclick = () => {
                        contAno++
                        if (contAno === anos.length) contAno = 0
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnEsquerdo.onclick = () => {
                        contAno--
                        if (contAno === -1) contAno = anos.length-1
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnDireitoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[anos.length-1]]
                        label.textContent = anos[anos.length-1]
                        myChart.update()
                    }
                    btnEsquerdoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[0]]
                        label.textContent = anos[0]
                        myChart.update()
                    }
                } else return "Erro: insira uma query!"
                break
            case 'polar':
                if (query != '') {
                    let local = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    let anos, contAno = 0
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            anos = Object.keys(res[i])
                            break
                        }
                    }
                    let dados = {}
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2] = []
                            }
                            break
                        }
                    }
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2].push(res[i][i2])
                            }
                        }
                    }
                    let color = []
                    if (typeof cor === 'boolean'){
                        if (cor === true) {
                            color = ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(255, 159, 64, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)', 'rgba(114, 92, 24, 0.7)', 'rgba(201, 181, 29, 0.7)', 'rgba(130, 203, 167, 0.7)', 'rgba(126, 197, 220, 0.7)', 'rgba(35, 129, 12, 0.7)', 'rgba(179, 24, 25, 0.7)', 'rgba(200, 81, 251, 0.7)', 'rgba(113, 107, 56, 0.7)', 'rgba(131, 48, 55, 0.7)', 'rgba(127, 110, 178, 0.7)', 'rgba(193, 27, 200, 0.7)', 'rgba(133, 206, 221, 0.7)', 'rgba(36, 163, 253, 0.7)', 'rgba(227, 93, 21, 0.7)', 'rgba(89, 197, 193, 0.7)', 'rgba(13, 209, 213, 0.7)', 'rgba(24, 103, 34, 0.7)', 'rgba(114, 204, 151, 0.7)', 'rgba(251, 107, 173, 0.7)', 'rgba(248, 64, 218, 0.7)', 'rgba(207, 139, 79, 0.7)', 'rgba(213, 102, 48, 0.7)', 'rgba(229, 118, 154, 0.7)', 'rgba(139, 19, 4, 0.7)', 'rgba(152, 29, 237, 0.7)', 'rgba(250, 131, 244, 0.7)', 'rgba(226, 244, 154, 0.7)', 'rgba(53, 45, 105, 0.7)', 'rgba(15, 126, 64, 0.7)', 'rgba(114, 172, 117, 0.7)', 'rgba(142, 58, 166, 0.7)', 'rgba(201, 215, 58, 0.7)', 'rgba(148, 95, 61, 0.7)', 'rgba(176, 67, 29, 0.7)', 'rgba(192, 141, 25, 0.7)', 'rgba(179, 127, 115, 0.7)', 'rgba(141, 94, 96, 0.7)', 'rgba(244, 219, 42, 0.7)', 'rgba(23, 10, 252, 0.7)', 'rgba(52, 110, 79, 0.7)', 'rgba(167, 92, 44, 0.7)', 'rgba(236, 127, 88, 0.7)', 'rgba(199, 230, 67, 0.7)', 'rgba(67, 223, 112, 0.7)', 'rgba(87, 18, 126, 0.7)', 'rgba(72, 242, 28, 0.7)', 'rgba(176, 121, 160, 0.7)', 'rgba(55, 172, 60, 0.7)', 'rgba(220, 189, 204, 0.7)', 'rgba(202, 67, 29, 0.7)', 'rgba(146, 6, 170, 0.7)', 'rgba(40, 116, 70, 0.7)', 'rgba(100, 152, 15, 0.7)', 'rgba(72, 245, 94, 0.7)', 'rgba(180, 255, 19, 0.7)', 'rgba(47, 81, 64, 0.7)', 'rgba(1, 124, 83, 0.7)', 'rgba(199, 200, 107, 0.7)', 'rgba(189, 9, 229, 0.7)', 'rgba(30, 66, 136, 0.7)', 'rgba(43, 174, 12, 0.7)', 'rgba(111, 168, 193, 0.7)', 'rgba(115, 45, 104, 0.7)', 'rgba(15, 245, 4, 0.7)', 'rgba(223, 201, 135, 0.7)', 'rgba(181, 176, 14, 0.7)', 'rgba(205, 197, 141, 0.7)', 'rgba(232, 151, 1, 0.7)', 'rgba(251, 68, 65, 0.7)', 'rgba(30, 111, 8, 0.7)', 'rgba(34, 55, 194, 0.7)', 'rgba(119, 108, 194, 0.7)', 'rgba(196, 16, 29, 0.7)', 'rgba(4, 57, 65, 0.7)', 'rgba(77, 156, 255, 0.7)', 'rgba(201, 224, 91, 0.7)', 'rgba(88, 210, 89, 0.7)', 'rgba(180, 250, 159, 0.7)', 'rgba(138, 228, 50, 0.7)', 'rgba(135, 203, 163, 0.7)', 'rgba(215, 23, 18, 0.7)', 'rgba(235, 182, 154, 0.7)', 'rgba(155, 53, 181, 0.7)', 'rgba(27, 135, 104, 0.7)', 'rgba(253, 185, 113, 0.7)', 'rgba(48, 61, 42, 0.7)', 'rgba(0, 30, 253, 0.7)', 'rgba(215, 148, 127, 0.7)', 'rgba(192, 101, 60, 0.7)', 'rgba(229, 17, 96, 0.7)', 'rgba(216, 208, 187, 0.7)', 'rgba(119, 110, 61, 0.7)', 'rgba(210, 66, 149, 0.7)', 'rgba(109, 195, 216, 0.7)', 'rgba(51, 179, 90, 0.7)', 'rgba(92, 73, 95, 0.7)', 'rgba(235, 211, 61, 0.7)', 'rgba(156, 246, 170, 0.7)', 'rgba(58, 235, 201, 0.7)', 'rgba(7, 166, 210, 0.7)', 'rgba(150, 113, 42, 0.7)', 'rgba(193, 93, 135, 0.7)', 'rgba(159, 36, 254, 0.7)', 'rgba(106, 107, 11, 0.7)', 'rgba(150, 75, 208, 0.7)', 'rgba(108, 192, 21, 0.7)', 'rgba(83, 64, 174, 0.7)', 'rgba(54, 70, 255, 0.7)', 'rgba(250, 1, 245, 0.7)', 'rgba(11, 5, 197, 0.7)', 'rgba(168, 197, 148, 0.7)', 'rgba(125, 40, 63, 0.7)', 'rgba(231, 8, 121, 0.7)', 'rgba(187, 253, 118, 0.7)', 'rgba(54, 19, 182, 0.7)', 'rgba(36, 159, 168, 0.7)', 'rgba(26, 117, 7, 0.7)', 'rgba(95, 247, 177, 0.7)', 'rgba(73, 144, 30, 0.7)', 'rgba(14, 136, 145, 0.7)', 'rgba(181, 23, 78, 0.7)', 'rgba(89, 59, 93, 0.7)', 'rgba(158, 123, 5, 0.7)', 'rgba(5, 192, 145, 0.7)', 'rgba(145, 213, 117, 0.7)', 'rgba(216, 143, 72, 0.7)', 'rgba(81, 123, 226, 0.7)', 'rgba(224, 248, 78, 0.7)', 'rgba(218, 160, 67, 0.7)', 'rgba(96, 162, 202, 0.7)', 'rgba(105, 145, 105, 0.7)', 'rgba(72, 170, 89, 0.7)', 'rgba(181, 137, 86, 0.7)', 'rgba(15, 10, 201, 0.7)', 'rgba(210, 178, 30, 0.7)', 'rgba(227, 186, 202, 0.7)', 'rgba(183, 168, 68, 0.7)', 'rgba(65, 49, 103, 0.7)', 'rgba(8, 85, 4, 0.7)', 'rgba(202, 137, 11, 0.7)', 'rgba(75, 254, 234, 0.7)', 'rgba(117, 155, 34, 0.7)', 'rgba(46, 14, 189, 0.7)', 'rgba(209, 222, 198, 0.7)', 'rgba(7, 238, 172, 0.7)', 'rgba(71, 65, 113, 0.7)', 'rgba(227, 24, 248, 0.7)', 'rgba(58, 34, 92, 0.7)', 'rgba(207, 189, 43, 0.7)', 'rgba(223, 200, 208, 0.7)', 'rgba(135, 161, 44, 0.7)', 'rgba(32, 116, 26, 0.7)', 'rgba(76, 76, 81, 0.7)', 'rgba(112, 120, 94, 0.7)', 'rgba(98, 177, 96, 0.7)', 'rgba(25, 171, 65, 0.7)', 'rgba(83, 155, 63, 0.7)', 'rgba(132, 180, 37, 0.7)', 'rgba(204, 244, 142, 0.7)', 'rgba(222, 4, 215, 0.7)', 'rgba(54, 110, 135, 0.7)', 'rgba(243, 124, 141, 0.7)', 'rgba(201, 59, 49, 0.7)', 'rgba(71, 180, 252, 0.7)', 'rgba(17, 238, 68, 0.7)', 'rgba(154, 86, 148, 0.7)', 'rgba(48, 29, 104, 0.7)', 'rgba(202, 251, 91, 0.7)', 'rgba(157, 198, 103, 0.7)', 'rgba(84, 104, 85, 0.7)', 'rgba(36, 95, 124, 0.7)', 'rgba(235, 65, 8, 0.7)']
                        } else {
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'string') {
                        if (cor === 'random') {
                            for (let i in res) {
                                if (i != 'unidade' && i != 'variavel') {
                                    for (let i2 in res[i]) {
                                        color.push(`rgba(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, 0.7)`)
                                    }
                                }
                            }
                        } else {
                            console.log('Erro: valor não existe para cor = '+cor)
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'object') {
                        color = cor
                    } else {
                        console.log('Erro: valor não existe para cor = '+cor)
                        color = [`rgba(242,135,5,0.7)`]
                    }
                    const data = {
                        labels: local,
                        datasets: [{
                            label: res.unidade,
                            data: dados[anos[contAno]],
                            borderColor: `#04d9b2`,
                            backgroundColor: color
                        }]
                    }
                    const config = {
                        type: 'polarArea',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top'
                                },
                                title: {
                                    display: true,
                                    text: res.variavel+' - '+res.unidade
                                }
                            }
                        }
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    const canvas = document.createElement('canvas')
                    const divBtn = document.createElement('div')
                    const btnEsquerdo = document.createElement('button')
                    const btnEsquerdoSuper = document.createElement('button')
                    btnEsquerdo.textContent = '<'
                    btnEsquerdoSuper.textContent = '<<'
                    const btnDireito = document.createElement('button')
                    const btnDireitoSuper = document.createElement('button')
                    btnDireito.textContent = '>'
                    btnDireitoSuper.textContent = '>>'
                    const label = document.createElement('label')
                    label.textContent = anos[contAno]
                    divBtn.appendChild(btnEsquerdoSuper)
                    divBtn.appendChild(btnEsquerdo)
                    divBtn.appendChild(label)
                    divBtn.appendChild(btnDireito)
                    divBtn.appendChild(btnDireitoSuper)
                    div.appendChild(canvas)
                    div.appendChild(divBtn)
                    const myChart = new Chart(canvas, config)
                    btnDireito.onclick = () => {
                        contAno++
                        if (contAno === anos.length) contAno = 0
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnEsquerdo.onclick = () => {
                        contAno--
                        if (contAno === -1) contAno = anos.length-1
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnDireitoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[anos.length-1]]
                        label.textContent = anos[anos.length-1]
                        myChart.update()
                    }
                    btnEsquerdoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[0]]
                        label.textContent = anos[0]
                        myChart.update()
                    }
                } else return "Erro: insira uma query!"
                break
            case 'radar':
                if (query != '') {
                    let local = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    let anos, contAno = 0
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            anos = Object.keys(res[i])
                            break
                        }
                    }
                    let dados = {}
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2] = []
                            }
                            break
                        }
                    }
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2].push(res[i][i2])
                            }
                        }
                    }
                    const data = {
                        labels: local,
                        datasets: [
                          {
                            label: res.unidade,
                            data: dados[anos[contAno]],
                            borderColor: `#04d9b2`,
                            backgroundColor: `rgba(242,135,5,0.7)`
                          }
                        ]
                    }
                    const config = {
                        type: 'radar',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: res.variavel+' - '+res.unidade
                                }
                            }
                        },
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    const canvas = document.createElement('canvas')
                    const divBtn = document.createElement('div')
                    const btnEsquerdo = document.createElement('button')
                    const btnEsquerdoSuper = document.createElement('button')
                    btnEsquerdo.textContent = '<'
                    btnEsquerdoSuper.textContent = '<<'
                    const btnDireito = document.createElement('button')
                    const btnDireitoSuper = document.createElement('button')
                    btnDireito.textContent = '>'
                    btnDireitoSuper.textContent = '>>'
                    const label = document.createElement('label')
                    label.textContent = anos[contAno]
                    divBtn.appendChild(btnEsquerdoSuper)
                    divBtn.appendChild(btnEsquerdo)
                    divBtn.appendChild(label)
                    divBtn.appendChild(btnDireito)
                    divBtn.appendChild(btnDireitoSuper)
                    div.appendChild(canvas)
                    div.appendChild(divBtn)
                    const myChart = new Chart(canvas, config)
                    btnDireito.onclick = () => {
                        contAno++
                        if (contAno === anos.length) contAno = 0
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnEsquerdo.onclick = () => {
                        contAno--
                        if (contAno === -1) contAno = anos.length-1
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnDireitoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[anos.length-1]]
                        label.textContent = anos[anos.length-1]
                        myChart.update()
                    }
                    btnEsquerdoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[0]]
                        label.textContent = anos[0]
                        myChart.update()
                    }
                } else return "Erro: insira uma query!"
                break
            case 'anel':
                if (query != '') {
                    let local = []
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            local.push(i)
                        }
                    }
                    let anos, contAno = 0
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            anos = Object.keys(res[i])
                            break
                        }
                    }
                    let dados = {}
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2] = []
                            }
                            break
                        }
                    }
                    for (let i in res) {
                        if (i != 'unidade' && i != 'variavel') {
                            for (let i2 in res[i]) {
                                dados[i2].push(res[i][i2])
                            }
                        }
                    }
                    let color = []
                    if (typeof cor === 'boolean'){
                        if (cor === true) {
                            color = ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(255, 159, 64, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)', 'rgba(114, 92, 24, 0.7)', 'rgba(201, 181, 29, 0.7)', 'rgba(130, 203, 167, 0.7)', 'rgba(126, 197, 220, 0.7)', 'rgba(35, 129, 12, 0.7)', 'rgba(179, 24, 25, 0.7)', 'rgba(200, 81, 251, 0.7)', 'rgba(113, 107, 56, 0.7)', 'rgba(131, 48, 55, 0.7)', 'rgba(127, 110, 178, 0.7)', 'rgba(193, 27, 200, 0.7)', 'rgba(133, 206, 221, 0.7)', 'rgba(36, 163, 253, 0.7)', 'rgba(227, 93, 21, 0.7)', 'rgba(89, 197, 193, 0.7)', 'rgba(13, 209, 213, 0.7)', 'rgba(24, 103, 34, 0.7)', 'rgba(114, 204, 151, 0.7)', 'rgba(251, 107, 173, 0.7)', 'rgba(248, 64, 218, 0.7)', 'rgba(207, 139, 79, 0.7)', 'rgba(213, 102, 48, 0.7)', 'rgba(229, 118, 154, 0.7)', 'rgba(139, 19, 4, 0.7)', 'rgba(152, 29, 237, 0.7)', 'rgba(250, 131, 244, 0.7)', 'rgba(226, 244, 154, 0.7)', 'rgba(53, 45, 105, 0.7)', 'rgba(15, 126, 64, 0.7)', 'rgba(114, 172, 117, 0.7)', 'rgba(142, 58, 166, 0.7)', 'rgba(201, 215, 58, 0.7)', 'rgba(148, 95, 61, 0.7)', 'rgba(176, 67, 29, 0.7)', 'rgba(192, 141, 25, 0.7)', 'rgba(179, 127, 115, 0.7)', 'rgba(141, 94, 96, 0.7)', 'rgba(244, 219, 42, 0.7)', 'rgba(23, 10, 252, 0.7)', 'rgba(52, 110, 79, 0.7)', 'rgba(167, 92, 44, 0.7)', 'rgba(236, 127, 88, 0.7)', 'rgba(199, 230, 67, 0.7)', 'rgba(67, 223, 112, 0.7)', 'rgba(87, 18, 126, 0.7)', 'rgba(72, 242, 28, 0.7)', 'rgba(176, 121, 160, 0.7)', 'rgba(55, 172, 60, 0.7)', 'rgba(220, 189, 204, 0.7)', 'rgba(202, 67, 29, 0.7)', 'rgba(146, 6, 170, 0.7)', 'rgba(40, 116, 70, 0.7)', 'rgba(100, 152, 15, 0.7)', 'rgba(72, 245, 94, 0.7)', 'rgba(180, 255, 19, 0.7)', 'rgba(47, 81, 64, 0.7)', 'rgba(1, 124, 83, 0.7)', 'rgba(199, 200, 107, 0.7)', 'rgba(189, 9, 229, 0.7)', 'rgba(30, 66, 136, 0.7)', 'rgba(43, 174, 12, 0.7)', 'rgba(111, 168, 193, 0.7)', 'rgba(115, 45, 104, 0.7)', 'rgba(15, 245, 4, 0.7)', 'rgba(223, 201, 135, 0.7)', 'rgba(181, 176, 14, 0.7)', 'rgba(205, 197, 141, 0.7)', 'rgba(232, 151, 1, 0.7)', 'rgba(251, 68, 65, 0.7)', 'rgba(30, 111, 8, 0.7)', 'rgba(34, 55, 194, 0.7)', 'rgba(119, 108, 194, 0.7)', 'rgba(196, 16, 29, 0.7)', 'rgba(4, 57, 65, 0.7)', 'rgba(77, 156, 255, 0.7)', 'rgba(201, 224, 91, 0.7)', 'rgba(88, 210, 89, 0.7)', 'rgba(180, 250, 159, 0.7)', 'rgba(138, 228, 50, 0.7)', 'rgba(135, 203, 163, 0.7)', 'rgba(215, 23, 18, 0.7)', 'rgba(235, 182, 154, 0.7)', 'rgba(155, 53, 181, 0.7)', 'rgba(27, 135, 104, 0.7)', 'rgba(253, 185, 113, 0.7)', 'rgba(48, 61, 42, 0.7)', 'rgba(0, 30, 253, 0.7)', 'rgba(215, 148, 127, 0.7)', 'rgba(192, 101, 60, 0.7)', 'rgba(229, 17, 96, 0.7)', 'rgba(216, 208, 187, 0.7)', 'rgba(119, 110, 61, 0.7)', 'rgba(210, 66, 149, 0.7)', 'rgba(109, 195, 216, 0.7)', 'rgba(51, 179, 90, 0.7)', 'rgba(92, 73, 95, 0.7)', 'rgba(235, 211, 61, 0.7)', 'rgba(156, 246, 170, 0.7)', 'rgba(58, 235, 201, 0.7)', 'rgba(7, 166, 210, 0.7)', 'rgba(150, 113, 42, 0.7)', 'rgba(193, 93, 135, 0.7)', 'rgba(159, 36, 254, 0.7)', 'rgba(106, 107, 11, 0.7)', 'rgba(150, 75, 208, 0.7)', 'rgba(108, 192, 21, 0.7)', 'rgba(83, 64, 174, 0.7)', 'rgba(54, 70, 255, 0.7)', 'rgba(250, 1, 245, 0.7)', 'rgba(11, 5, 197, 0.7)', 'rgba(168, 197, 148, 0.7)', 'rgba(125, 40, 63, 0.7)', 'rgba(231, 8, 121, 0.7)', 'rgba(187, 253, 118, 0.7)', 'rgba(54, 19, 182, 0.7)', 'rgba(36, 159, 168, 0.7)', 'rgba(26, 117, 7, 0.7)', 'rgba(95, 247, 177, 0.7)', 'rgba(73, 144, 30, 0.7)', 'rgba(14, 136, 145, 0.7)', 'rgba(181, 23, 78, 0.7)', 'rgba(89, 59, 93, 0.7)', 'rgba(158, 123, 5, 0.7)', 'rgba(5, 192, 145, 0.7)', 'rgba(145, 213, 117, 0.7)', 'rgba(216, 143, 72, 0.7)', 'rgba(81, 123, 226, 0.7)', 'rgba(224, 248, 78, 0.7)', 'rgba(218, 160, 67, 0.7)', 'rgba(96, 162, 202, 0.7)', 'rgba(105, 145, 105, 0.7)', 'rgba(72, 170, 89, 0.7)', 'rgba(181, 137, 86, 0.7)', 'rgba(15, 10, 201, 0.7)', 'rgba(210, 178, 30, 0.7)', 'rgba(227, 186, 202, 0.7)', 'rgba(183, 168, 68, 0.7)', 'rgba(65, 49, 103, 0.7)', 'rgba(8, 85, 4, 0.7)', 'rgba(202, 137, 11, 0.7)', 'rgba(75, 254, 234, 0.7)', 'rgba(117, 155, 34, 0.7)', 'rgba(46, 14, 189, 0.7)', 'rgba(209, 222, 198, 0.7)', 'rgba(7, 238, 172, 0.7)', 'rgba(71, 65, 113, 0.7)', 'rgba(227, 24, 248, 0.7)', 'rgba(58, 34, 92, 0.7)', 'rgba(207, 189, 43, 0.7)', 'rgba(223, 200, 208, 0.7)', 'rgba(135, 161, 44, 0.7)', 'rgba(32, 116, 26, 0.7)', 'rgba(76, 76, 81, 0.7)', 'rgba(112, 120, 94, 0.7)', 'rgba(98, 177, 96, 0.7)', 'rgba(25, 171, 65, 0.7)', 'rgba(83, 155, 63, 0.7)', 'rgba(132, 180, 37, 0.7)', 'rgba(204, 244, 142, 0.7)', 'rgba(222, 4, 215, 0.7)', 'rgba(54, 110, 135, 0.7)', 'rgba(243, 124, 141, 0.7)', 'rgba(201, 59, 49, 0.7)', 'rgba(71, 180, 252, 0.7)', 'rgba(17, 238, 68, 0.7)', 'rgba(154, 86, 148, 0.7)', 'rgba(48, 29, 104, 0.7)', 'rgba(202, 251, 91, 0.7)', 'rgba(157, 198, 103, 0.7)', 'rgba(84, 104, 85, 0.7)', 'rgba(36, 95, 124, 0.7)', 'rgba(235, 65, 8, 0.7)']
                        } else {
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'string') {
                        if (cor === 'random') {
                            for (let i in res) {
                                if (i != 'unidade' && i != 'variavel') {
                                    for (let i2 in res[i]) {
                                        color.push(`rgba(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, 0.7)`)
                                    }
                                }
                            }
                        } else {
                            console.log('Erro: valor não existe para cor = '+cor)
                            color = [`rgba(242,135,5,0.7)`]
                        }
                    } else if (typeof cor === 'object') {
                        color = cor
                    } else {
                        console.log('Erro: valor não existe para cor = '+cor)
                        color = [`rgba(242,135,5,0.7)`]
                    }
                    const data = {
                        labels: local,
                        datasets: [{
                            label: res.unidade,
                            data: dados[anos[contAno]],
                            borderColor: `#04d9b2`,
                            backgroundColor: color,
                            cutout: '80%'
                        }]
                    }
                    const config = {
                        type: 'doughnut',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: res.variavel+' - '+res.unidade
                                }
                            }
                        },
                    }
                    while (div.firstElementChild != null) div.removeChild(div.firstElementChild)
                    const canvas = document.createElement('canvas')
                    const divBtn = document.createElement('div')
                    const btnEsquerdo = document.createElement('button')
                    const btnEsquerdoSuper = document.createElement('button')
                    btnEsquerdo.textContent = '<'
                    btnEsquerdoSuper.textContent = '<<'
                    const btnDireito = document.createElement('button')
                    const btnDireitoSuper = document.createElement('button')
                    btnDireito.textContent = '>'
                    btnDireitoSuper.textContent = '>>'
                    const label = document.createElement('label')
                    label.textContent = anos[contAno]
                    divBtn.appendChild(btnEsquerdoSuper)
                    divBtn.appendChild(btnEsquerdo)
                    divBtn.appendChild(label)
                    divBtn.appendChild(btnDireito)
                    divBtn.appendChild(btnDireitoSuper)
                    div.appendChild(canvas)
                    div.appendChild(divBtn)
                    const myChart = new Chart(canvas, config)
                    btnDireito.onclick = () => {
                        contAno++
                        if (contAno === anos.length) contAno = 0
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnEsquerdo.onclick = () => {
                        contAno--
                        if (contAno === -1) contAno = anos.length-1
                        myChart.data.datasets[0].data = dados[anos[contAno]]
                        label.textContent = anos[contAno]
                        myChart.update()
                    }
                    btnDireitoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[anos.length-1]]
                        label.textContent = anos[anos.length-1]
                        myChart.update()
                    }
                    btnEsquerdoSuper.onclick = () => {
                        myChart.data.datasets[0].data = dados[anos[0]]
                        label.textContent = anos[0]
                        myChart.update()
                    }
                } else return "Erro: insira uma query!"
                break
            default:
                console.log(`Erro: gráfico = '${grafico}' não existe!`)
        }
    }
}
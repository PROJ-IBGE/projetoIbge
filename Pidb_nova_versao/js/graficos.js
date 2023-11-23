function grafico(objA, objB, label, title, context){
    let tipo = document.getElementById('tipoGrafico').value;

    let cidade = nomeCidade(document.getElementById('slctCidade'));
    let cidade2 = nomeCidade(document.getElementById('slctCidade2'));

    let data = {
        labels: [cidade, cidade2],
        datasets: [{
            label: label,
            data: [objA, objB],
            backgroundColor: [`#f28705`, `#00a000`],
            borderColor: `#04d9b2`
        }]
    };

    let config = {};

    switch (tipo) {
        case `grafico`:
            document.getElementById('graficos').style.display = 'none';
            alert(`Opção inválida.`);
            break;
        case `bar`:
        case `line`:
            config = {
                type: tipo,
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {labels: {color: `#fff`}},
                        title: {
                            display: true,
                            text: title,
                            color: `#fff`
                        }
                    },
                    scales: {
                        x: {ticks: {color: `#fff`}},
                        y: {ticks: {color: `#fff`}}
                    }
                }
            };
            break;
        default:
            config = {
                type: tipo,
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {labels: {color: `#fff`}},
                        title: {
                            display: true,
                            text: title,
                            color: `#fff`
                        }
                    },
                }
            };
            break;
    }

    let ctx = new Chart(context, config);

    function destroy(){
        ctx.destroy();
    };

    document.getElementById('btnGerarGrafico').addEventListener('click', destroy);
}
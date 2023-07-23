function grafico(objCidade, objA, objCidade2, objB, label, title, context){
    let tipo = document.getElementById('tipoGrafico').value;

    let data = {
        labels: [objCidade, objCidade2],
        datasets: [{
            label: label,
            data: [objA, objB],
            backgroundColor: [`#f28705`, `#00a000`],
            borderColor: `#04d9b2`
        }]
    };

    let config = {};

    switch(tipo){
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

    function destroy() {
        ctx.destroy();
    };

    document.getElementById('tipoGrafico').addEventListener('change', destroy);
}
// Função que retorna todos os estados do Brasil.
const estados = async() => {
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
    let dados = await fetch(url);
    let resultado = await dados.json();

    // Ordena os estados por nome.
    resultado.sort(compara);
    let estado = `<option value="estado">ESTADO</option>`;
    for(var i = 0; i < resultado.length; i++){
        estado += `<option value="${resultado[i].id}">${resultado[i].nome}</option>`;
    }
    document.getElementById('slctEstado').innerHTML = estado;
    document.getElementById('slctEstado2').innerHTML = estado;
}

estados();

// Retorna as cidades do estado.
document.getElementById('slctEstado').addEventListener('change', function(){
    let estado = document.getElementById('slctEstado').value;
    cidades(estado);
});

// Retorna as cidades do segundo estado.
document.getElementById('slctEstado2').addEventListener('change', function(){
    let estado = document.getElementById('slctEstado2').value;
    outrasCidades(estado);
});

function nomeEstado(){
    // Retorna o nome do estado através de seu índice.
    let iEstado = document.getElementById('slctEstado').selectedIndex;
    let nomeEstado = document.getElementById('slctEstado').options;
    let estado = nomeEstado[iEstado].text;
    return estado;
}
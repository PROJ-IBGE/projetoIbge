const estados = async() => {
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
    let dados = await fetch(url);
    let resultado = await dados.json();

    resultado.sort(compara); // Ordena os estados por nome.
    let estado = `<option value="estado">ESTADO</option>`;
    for(var i = 0; i < resultado.length; i++){
        estado += `<option value="${resultado[i].id}">${resultado[i].nome}</option>`;
    }
    return estado;
} // Função que retorna todos os estados do Brasil.

function retornaCidades(estado, retorna){
    let cidade = '<option value="cidade">CIDADE</option>';
    estado.addEventListener('change', async() => {
        if (estado.value != 'estado') {
            cidade += await cidades(estado.value);
            document.getElementById(retorna).innerHTML = cidade;
        }
    })
    document.getElementById(retorna).innerHTML = cidade;
} // Retorna as cidades de um estado.

function nomeEstado(nomeEstado){
    let iEstado = nomeEstado.selectedIndex;
    let nome = nomeEstado.options;
    let estado = nome[iEstado].text;
    return estado;
} // Retorna o nome do estado através de seu índice.
const cidades = async(estado) => {
    if (estado != 'estado') {
        let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;
        let dados = await fetch(url);
        let resultado = await dados.json();

        resultado.sort(compara); // Ordena as cidades por nome.
        let cidade = ``;
        for(var i = 0; i < resultado.length; i++){
            cidade += `<option value="${resultado[i].id}">${resultado[i].nome}</option>`;
        }
        return cidade;
    } else alert(`Um estado precisa ser escolhido.`);
} // Retorna as cidades do estado.

function nomeCidade(nomeCidade){
    let iCidade = nomeCidade.selectedIndex;
    let nome = nomeCidade.options;
    let cidade = nome[iCidade].text;
    return cidade;
} // Retorna o nome da cidade através de seu índice.

const malha = async(cidade) => {
    if (cidade != 'cidade') {
        let malha = `<img src="https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${cidade}?formato=image/svg+xml&qualidade=maxima" alt="malha da cidade">`;
        return malha;
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a malha da cidade.

const area = async(cidade) => {
    if (cidade != 'cidade') {
        let url = `https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615?localidades=N6[${cidade}]`;
        let dados = await fetch(url);
        let resultado = await dados.json();
        let area = resultado[0].resultados[0].series[0].serie[2010];
        return area;
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a área territorial.

const densidade = async(cidade) => {
    if (cidade != 'cidade') {
        let url = `https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/616?localidades=N6[${cidade}]`;
        let dados = await fetch(url);
        let resultado = await dados.json();
        let densidade = resultado[0].resultados[0].series[0].serie[2010];
        return densidade;
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a densidade demográfica.

const escolaridadeTotal = async(cidade) => {
    if (cidade != 'cidade') {
        let url = `https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[${cidade}]&classificacao=2[6794]`;
        let dados = await fetch(url);
        let resultado = await dados.json();
        let escolaridade = resultado[0].resultados[0].series[0].serie[2010];
        return escolaridade;
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a escolaridade total em % dos municípios.

const escolaridadeHomens = async(cidade) => {
    if (cidade != 'cidade') {
        let url = `https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[${cidade}]&classificacao=2[4]`;
        let dados = await fetch(url);
        let resultado = await dados.json();
        let escolaridadeHomens = resultado[0].resultados[0].series[0].serie[2010]
        return escolaridadeHomens;
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a escolaridade de homens em % dos municípios.

const escolaridadeMulheres = async(cidade) => {
    if (cidade != 'cidade') {
        let url = `https://servicodados.ibge.gov.br/api/v3/agregados/1383/periodos/2010/variaveis/1646?localidades=N6[${cidade}]&classificacao=2[5]`;
        let dados = await fetch(url);
        let resultado = await dados.json();
        let escolaridadeMulheres = resultado[0].resultados[0].series[0].serie[2010];
        return escolaridadeMulheres;
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a escolaridade de mulheres em % dos municípios.

const pib = async(ano, cidade) => {
    if (cidade != 'cidade') {
        if (ano != 'ano') {
            let url = `https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/${ano}/variaveis/37?localidades=N6[${cidade}]`;
            let dados = await fetch(url);
            let resultado = await dados.json();
            let pib;

            if (resultado[0] != undefined) pib = resultado[0].resultados[0].series[0].serie[ano];
            return pib;
        } else alert(`Um ano precisa ser escolhido.`);
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna o PIB dos municípios por ano.

const populacao = async(ano, cidade) => {
    if (cidade != 'cidade') {
        if (ano != 'ano') {
            let url;
            let dados;
            let resultado;
            let populacao;

            switch (ano) {
                case `2007`:
                    url = `https://servicodados.ibge.gov.br/api/v3/agregados/793/periodos/2007/variaveis/93?localidades=N6[${cidade}]`;
                    dados = await fetch(url);
                    resultado = await dados.json();
                    populacao = resultado[0].resultados[0].series[0].serie[ano];
                    break;
                case `2010`:
                    url = `https://servicodados.ibge.gov.br/api/v3/agregados/3175/periodos/2010/variaveis/93?localidades=N6[${cidade}]`;
                    dados = await fetch(url);
                    resultado = await dados.json();
                    populacao = resultado[0].resultados[0].series[0].serie[ano];
                    break;
                default:
                    url = `https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/${ano}/variaveis/9324?localidades=N6[${cidade}]`;
                    dados = await fetch(url);
                    resultado = await dados.json();
                    if(resultado[0] != undefined) populacao = resultado[0].resultados[0].series[0].serie[ano];
                    break;
            }
            return populacao;
        } else alert(`Um ano precisa ser escolhido.`);
    } else alert(`Uma cidade precisa ser escolhido.`);
} // Retorna a população dos municípios por ano.
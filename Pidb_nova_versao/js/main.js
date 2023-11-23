const main = async() => {
    document.getElementById('info').style.display = 'block';

    let estado = nomeEstado(document.getElementById('slctEstado'));
    document.getElementById('retEstado').innerHTML = estado;

    let cidade = nomeCidade(document.getElementById('slctCidade'));
    document.getElementById('retCidade').innerHTML = cidade;

    let idCidade = document.getElementById('slctCidade').value;
    let idAno = document.getElementById('slctAno').value;

    document.getElementById('loading').style.display = 'block';

    let malhaCidade;
    let valArea;
    let valDensidade;
    let valEscolaridadeTotal;
    let valEscolaridadeHomens;
    let valEscolaridadeMulheres;
    let valPib;
    let valPopulacao;

    if (idCidade != 'cidade') {
        malhaCidade = await malha(idCidade);
        valArea = await area(idCidade);
        valDensidade = await densidade(idCidade);
        valEscolaridadeTotal = await escolaridadeTotal(idCidade);
        valEscolaridadeHomens = await escolaridadeHomens(idCidade);
        valEscolaridadeMulheres = await escolaridadeMulheres(idCidade);
        if (idAno != 'ano') {
            valPib = await pib(idAno, idCidade);
            valPopulacao = await populacao(idAno, idCidade);
        }
    }
    
    document.getElementById('malha_cidade').innerHTML = malhaCidade;

    // Área
    checkboxInfo(document.getElementById('slctArea'), valArea, 'Área Territorial:', 'retArea');

    // Densidade
    checkboxInfo(document.getElementById('slctDensidade'), valDensidade, 'Densidade Demográfica:', 'retDensidade');

    // Escolaridade
    checkboxInfo(document.getElementById('slctEscolaridade'), valEscolaridadeTotal, 'Percentual total de alfabeitização:', 'retEscolaridade');

    // Escolaridade de homens
    checkboxInfo(document.getElementById('slctEscolaridadeHomens'), valEscolaridadeHomens, 'Percentual de homens alfabeitizados:', 'retEscolaridadeHomens');

    // Escolaridade de mulheres
    checkboxInfo(document.getElementById('slctEscolaridadeMulheres'), valEscolaridadeMulheres, 'Percentual de mulheres alfabeitizadas:', 'retEscolaridadeMulheres');

    // PIB
    checkboxInfo(document.getElementById('slctPib'), valPib, `PIB no ano ${idAno}:`, 'retPib');

    // População
    checkboxInfo(document.getElementById('slctPopulacao'), valPopulacao, `População no ano ${idAno}:`, 'retPopulacao');

    document.getElementById('slctEstado2').innerHTML = await estados();
    retornaCidades(document.getElementById('slctEstado2'), 'slctCidade2');

    document.getElementById('slctAno2').innerHTML = ano();

    document.getElementById('loading').style.display = 'none';
    document.getElementById('comparacao').style.display = 'block';

    document.getElementById('btnGerarGrafico').addEventListener('click', async() => {
        document.getElementById('graficos').style.display = 'flex';
        document.getElementById('loading').style.display = 'block';

        let idCidade2 = document.getElementById('slctCidade2').value;
        let idAno2 = document.getElementById('slctAno2').value;

        let valArea2;
        let valDensidade2;
        let valEscolaridadeTotal2;
        let valEscolaridadeHomens2;
        let valEscolaridadeMulheres2;
        let valPib2;
        let valPopulacao2;

        if (idCidade2 != 'cidade') {
            valArea2 = await area(idCidade2);
            valDensidade2 = await densidade(idCidade2);
            valEscolaridadeTotal2 = await escolaridadeTotal(idCidade2);
            valEscolaridadeHomens2 = await escolaridadeHomens(idCidade2);
            valEscolaridadeMulheres2 = await escolaridadeMulheres(idCidade2);
            if (idAno2 != 'ano') {
                valPib2 = await pib(idAno2, idCidade2);
                valPopulacao2 = await populacao(idAno2, idCidade2);
            }
        }

        // Gráfico da área
        checkboxGrafico(document.getElementById('slctArea2'), valArea2, valArea, 'Área Total', 'Comparção de áreas', 'retGraficoArea');

        // Gráfico de densidade
        checkboxGrafico(document.getElementById('slctDensidade2'), valDensidade2, valDensidade, 'Densidade demográfica', 'Comparação de densidade', 'retGraficoDensidade');

        // Gráfico de escolaridade
        checkboxGrafico(document.getElementById('slctEscolaridade2'), valEscolaridadeTotal2, valEscolaridadeTotal, 'Escolaridade total', 'Comparação de escolaridade', 'retGraficoEscolaridade');

        // Gráfico de escolaridade de homens
        checkboxGrafico(document.getElementById('slctEscolaridadeHomens2'), valEscolaridadeHomens2, valEscolaridadeHomens, 'Escolaridade de homens', 'Comparação de escolaridade de homens', 'retGraficoEscolaridadeHomens');

        // Gráfico de escolaridade de mulheres
        checkboxGrafico(document.getElementById('slctEscolaridadeMulheres2'), valEscolaridadeMulheres2, valEscolaridadeMulheres, 'Escolaridade de mulheres', 'Comparação de escolarização de mulheres', 'retGraficoEscolaridadeMulheres');

        // Gráfico do PIB
        checkboxGrafico(document.getElementById('slctPib2'), valPib2, valPib, 'PIB', 'Comparação de PIB', 'retGraficoPib');

        // Gráfico da População
        checkboxGrafico(document.getElementById('slctPopulacao2'), valPopulacao2, valPopulacao, 'População' ,'Comparação de população', 'retGraficoPopulacao');

        document.getElementById('loading').style.display = 'none';
    });
}

document.getElementById('btnConsultar').addEventListener('click', main);
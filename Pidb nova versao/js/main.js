const main = async() => {
    document.getElementById('info').style.display = 'block';
    let estado = nomeEstado();
    document.getElementById('retEstado').innerHTML = estado;
    
    let cidade = nomeCidade();
    document.getElementById('retCidade').innerHTML = cidade;

    let idAno = document.getElementById('slctAno').value;
    let idCidade = document.getElementById('slctCidade').value;

    let input = ``;

    let width = 0;

    document.getElementById('loading').style.display = 'block';
    
    malha(idCidade);

    // Cadeia de condições que verificam se as checkbox foram ativadas.
    if(document.getElementById('slctArea').checked == true){
        let valArea = await area(idCidade);
        width = valArea.length - 2;
        input = `Área Territorial: `;
        input += `<input type="text" id="retArea" disabled value="${valArea}" size="${width}"> km`;
        document.getElementById('retArea').innerHTML = input;
        document.getElementById('retArea').style.display = 'block';
    } else document.getElementById('retArea').style.display = 'none';

    if(document.getElementById('slctDensidade').checked == true) {
        let valDensidade = await densidade(idCidade);
        width = valDensidade.length - 2;
        input = `Densidade Demográfica: `;
        input += `<input type="text" id="retDensidade" disabled value="${valDensidade}" size="${width}"> hab/km`;
        document.getElementById('retDensidade').innerHTML = input;
        document.getElementById('retDensidade').style.display = 'block';
    } else document.getElementById('retDensidade').style.display = 'none';

    if(document.getElementById('slctEscolaridade').checked == true){
        let valEscolaridadeTotal = await escolaridadeTotal(idCidade);
        width = valEscolaridadeTotal.length - 2;
        input = `Alfabetização total de pessoas: `;
        input += `<input type="text" id="retEscolaridade" disabled value="${valEscolaridadeTotal}" size="${width}">%`;
        document.getElementById('retEscolaridade').innerHTML = input;
        document.getElementById('retEscolaridade').style.display = 'block';
    } else document.getElementById('retEscolaridade').style.display = 'none';
    
    if(document.getElementById('slctEscolaridadeHomens').checked == true){
        let valEscolaridadeHomens = await escolaridadeHomens(idCidade);
        width = valEscolaridadeHomens.length - 2;
        input = `Alfabetização total de homens: `;
        input += `<input type="text" id="retEscolaridadeHomens" disabled value="${valEscolaridadeHomens}" size="${width}">%`;
        document.getElementById('retEscolaridadeHomens').innerHTML = input;
        document.getElementById('retEscolaridadeHomens').style.display = 'block';
    } else document.getElementById('retEscolaridadeHomens').style.display = 'none';

    if(document.getElementById('slctEscolaridadeMulheres').checked == true){
        let valEscolaridadeMulheres = await escolaridadeMulheres(idCidade);
        width = valEscolaridadeMulheres.length - 2;
        input = `Alfabetização total de mulheres: `;
        input += `<input type="text" id="retEscolaridadeMulheres" disabled value="${valEscolaridadeMulheres}" size="${width}">%`;
        document.getElementById('retEscolaridadeMulheres').innerHTML = input;
        document.getElementById('retEscolaridadeMulheres').style.display = 'block';
    } else document.getElementById('retEscolaridadeMulheres').style.display = 'none';

    if(document.getElementById('slctPib').checked == true) {
        let valPib = await pib(idAno, idCidade);
        if(valPib != undefined){
            width = valPib.length - 1;
            input = `PIB em ${idAno}: `;
            input += `R$<input type="text" id="retPib" disabled value="${valPib}" size="${width}">`;
        } else input = `Não há informações.`;
        document.getElementById('retPib').innerHTML = input;
        document.getElementById('retPib').style.display = 'block';
    } else document.getElementById('retPib').style.display = 'none';
    
    if(document.getElementById('slctPopulacao').checked == true) {
        let valPopulacao = await populacao(idAno, idCidade);
        if(valPopulacao != undefined){
            width = valPopulacao.length - 1;
            input = `População em ${idAno}: `;
            input += `<input type="text" id="retPopulacao" disabled value="${valPopulacao}" size="${width}">`;
        } else input = `Não há informações.`;
        document.getElementById('retPopulacao').innerHTML = input;
        document.getElementById('retPopulacao').style.display = 'block';
    } else document.getElementById('retPopulacao').style.display = 'none';

    document.getElementById('loading').style.display = 'none';
    document.getElementById('comparacao').style.display = 'block';

    document.getElementById('btnGerarGrafico').addEventListener('click', retornaGrafico = async() => {
        document.getElementById('graficos').style.display = 'flex';
        let tipo = document.getElementById('tipoGrafico').value;

        let label = ``;
        let title = ``;
        var ctx = ``;

        if(tipo != 'grafico'){
            let cidade2 = nomeSegundaCidade();
        
            let idAno2 = document.getElementById('slctAno2').value;
            let idCidade2 = document.getElementById('slctCidade2').value;

            if(document.getElementById('slctArea2').checked == true){
                let valArea = await area(idCidade);
                let valArea2 = await area(idCidade2);
                label = `Área total`;
                title = `Comparção de áreas`;
                ctx = document.getElementById('retGraficoArea');
                grafico(cidade, valArea, cidade2, valArea2, label, title, ctx);
                document.getElementById('retGraficoArea').style.display = 'block';
            } else document.getElementById('retGraficoArea').style.display = 'none';

            if(document.getElementById('slctDensidade2').checked == true){
                let valDensidade = await densidade(idCidade);
                let valDensidade2 = await densidade(idCidade2);
                label = `Densidade demográfica`,
                title = `Comparação de densidade`;
                ctx = document.getElementById('retGraficoDensidade');
                grafico(cidade, valDensidade, cidade2, valDensidade2, label, title, ctx);
                document.getElementById('retGraficoDensidade').style.display = 'block';
            } else document.getElementById('retGraficoDensidade').style.display	= 'none';

            if(document.getElementById('slctEscolaridade2').checked == true){
                let valEscolaridadeTotal = await escolaridadeTotal(idCidade);
                let valEscolaridadeTotal2 = await escolaridadeTotal(idCidade2);
                label = `Escolaridade total`;
                title = `Comparação de escolaridade`;
                ctx = document.getElementById('retGraficoEscolaridade');
                grafico(cidade, valEscolaridadeTotal, cidade2, valEscolaridadeTotal2, label, title, ctx);
                document.getElementById('retGraficoEscolaridade').style.display = 'block';
            } else document.getElementById('retGraficoEscolaridade').style.display = 'none';

            if(document.getElementById('slctEscolaridadeHomens2').checked == true){
                let valEscolaridadeHomens = await escolaridadeHomens(idCidade);
                let valEscolaridadeHomens2 = await escolaridadeHomens(idCidade2);
                label = `Escolaridade de homens`;
                title = `Comparação de escolaridade de homens`;
                ctx = document.getElementById('retGraficoEscolaridadeHomens');
                grafico(cidade, valEscolaridadeHomens, cidade2, valEscolaridadeHomens2, label, title, ctx);
                document.getElementById('retGraficoEscolaridadeHomens').style.display = 'block';
            } else document.getElementById('retGraficoEscolaridadeHomens').style.display = 'none';

            if(document.getElementById('slctEscolaridadeMulheres2').checked == true){
                let valEscolaridadeMulheres = await escolaridadeMulheres(idCidade);
                let valEscolaridadeMulheres2 = await escolaridadeMulheres(idCidade2);
                label = `Escolaridade de mulheres`;
                title = `Comparação de escolarização de mulheres`;
                ctx = document.getElementById('retGraficoEscolaridadeMulheres');
                grafico(cidade, valEscolaridadeMulheres, cidade2, valEscolaridadeMulheres2, label, title, ctx);
                document.getElementById('retGraficoEscolaridadeMulheres').style.display = 'block';
            } else document.getElementById('retGraficoEscolaridadeMulheres').style.display = 'none';

            if(document.getElementById('slctPib2').checked == true){
                let valPib = await pib(idAno, idCidade);
                let valPib2 = await pib(idAno2, idCidade2);
                if((valPib2 == undefined && valPib == undefined) || (valPib2 == undefined || valPib == undefined)){
                    alert('Dados dos PIBs insuficientes.');
                    document.getElementById('retGraficoPib').style.display = 'none';
                } else {
                    label = `PIB`;
                    title = `Comparação de PIB`;
                    ctx = document.getElementById('retGraficoPib');
                    grafico(cidade, valPib, cidade2, valPib2, label, title, ctx);
                    document.getElementById('retGraficoPib').style.display = 'block';
                }
            } else document.getElementById('retGraficoPib').style.display = 'none';

            if(document.getElementById('slctPopulacao2').checked == true){
                let valPopulacao = await populacao(idAno, idCidade);
                let valPopulacao2 = await populacao(idAno2, idCidade2);
                if((valPopulacao2 == undefined && valPopulacao == undefined) || (valPopulacao2 == undefined || valPopulacao == undefined)){
                    alert('Dados das populações insuficientes.');
                    document.getElementById('retGraficoPopulacao').style.display = 'none';
                } else {
                    label = `População`;
                    title = `Comparação de população`;
                    ctx = document.getElementById('retGraficoPopulacao');
                    grafico(cidade, valPopulacao, cidade2, valPopulacao2, label, title, ctx);
                    document.getElementById('retGraficoPopulacao').style.display = 'block';
                }
            } else document.getElementById('retGraficoPopulacao').style.display = 'none';
        } else {
            alert('Opção inválida.');
            document.getElementById('graficos').style.display = 'none';
        }
    });
}

document.getElementById('btnConsultar').addEventListener('click', main);
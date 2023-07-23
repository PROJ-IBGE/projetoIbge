// Retorna os anos de 2000 até o ano atual.
function ano(){
    const anoAtual = new Date();
    
    let ano = `<option value="ano">ANO</option>`;
    for(var i = 2000; i < anoAtual.getFullYear(); i++){
        ano += `<option value="${i}">${i}</option>`;
    }

    document.getElementById('slctAno').innerHTML = ano;
    document.getElementById('slctAno2').innerHTML = ano;
}

ano();
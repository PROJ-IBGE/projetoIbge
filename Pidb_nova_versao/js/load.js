const load = async() => {
    document.getElementById('slctAno').innerHTML = ano();
    document.getElementById('slctEstado').innerHTML = await estados();
    
    retornaCidades(document.getElementById('slctEstado'), 'slctCidade');
} // Carrega opções de ano, estado e cidade quando a página é exibida.
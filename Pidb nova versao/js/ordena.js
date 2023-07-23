// Função de comparação que ordena em ordem alfabética.
function compara(objA, objB){
    a = objA.nome.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c");
    b = objB.nome.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c");
    if(a < b) return -1;
    else return true;
}
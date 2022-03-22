function populacao(){
    const obj ={};

    obj.populacao = () => {
        const data = {};
        $.getJSON('http://servicodados.ibge.gov.br/api/v1/projecoes/populacao', (json1) => {
            data.populacao = json1.projecao.populacao;
            data.horario = json1.horario;
            data.nascimento = json1.projecao.periodoMedio.nascimento;
            data.obito = json1.projecao.periodoMedio.obito;
        });
        return data;
    };

    obj.esperancaDeVida = () => {
        const res = {}
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos/2000|2001|2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014/variaveis/2503?localidades=N1[all]', (data) => {
            res.unidade = data[0].unidade;
            res.localidade = data[0].resultados[0].series[0].localidade.nome;
            res.serie = data[0].resultados[0].series[0].serie;

        });
        return res;
    };

    obj.densidadeDemografica = () => {
        const res = {};
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615|616?localidades=N1[all]', (data) => {
            res[data[0].unidade] = data[0].resultados[0].series[0].serie["2010"];
            res[data[1].unidade] = data[1].resultados[0].series[0].serie["2010"];
        });
        return res;
    };
    
     return obj;
}
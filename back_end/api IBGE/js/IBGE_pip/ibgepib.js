function pibBrasil(){
    const obj = {};

    obj.pibBrasil = () => {  
        const res = {};
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019/variaveis/37?localidades=N1[all]', (data) => {
            res.variavel = data[0].variavel;
            res.unidade = data[0].unidade;
            res.localidade = data[0].resultados[0].series[0].localidade.nome;
            res.pibs = data[0].resultados[0].series[0].serie;
        });
        return res;
    };

    obj.pibEstado = () => {
        const res = {};
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019/variaveis/37?localidades=N3[all]', (data) => {
            res.unidade = data[0].unidade;
            data[0].resultados[0].series.map((d) => {
                res[d.localidade.nome] = d.serie;
            });
        });
        return res;
    };

    obj.pibMesorregiao = () => {
        const res = {};
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019/variaveis/37?localidades=N8[all]', (data) => {
            res.unidade = data[0].unidade;
            data[0].resultados[0].series.map((d) => {
                res[d.localidade.nome] = d.serie;
            });
        });
        return res;
    };

    obj.pibGrandeRegiao = () => {
        const res = {};
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019/variaveis/37?localidades=N2[all]', (data) => {
            res.unidade = data[0].unidade;
            data[0].resultados[0].series.map((d) => {
                res[d.localidade.nome] = d.serie;
            });
        });
        return res;
    };

    return obj;
};
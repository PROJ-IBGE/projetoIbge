function populacao(){
    const obj ={};

    obj.populacao = () => {
        const res = {};
        $.getJSON('http://servicodados.ibge.gov.br/api/v1/projecoes/populacao', (data) => {
            res.populacao = data.projecao.populacao;
            res.horario = data.horario;
            res.nascimento = data.projecao.periodoMedio.nascimento;
            res.obito = data.projecao.periodoMedio.obito;
        });
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2001|2002|2003|2004|2005|2006|2008|2009|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021/variaveis/9324?localidades=N1[all]|N2[all]|N3[all]', (data) => {
            data[0].resultados[0].series.map((d) => {
                res[d.localidade.nome] = d.serie;
            });
        });
        return res;
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
        res["Área de estados por quilômetro quadrado"] = {'Rondônia': 237765.347, 'Acre': 164173.431, 'Amazonas': 1559167.879, 'Roraima': 223644.527, 'Pará': 1245870.707, 'Amapá': 142470.762, 'Tocantins': 277423.63, 'Maranhão': 329651.495, 'Piauí': 251755.484, 'Ceará': 148894.441, 'Rio Grande do Norte': 52809.601, 'Paraíba': 56467.242, 'Pernambuco': 98067.879, 'Alagoas': 27830.657, 'Sergipe': 21938.185, 'Bahia': 564760.427, 'Minas Gerais': 586513.993, 'Espirito Santo': 46074.447, 'Rio de Janeiro': 43750.426, 'São Paulo': 248219.481, 'Paraná': 199298.982, 'Santa Catarina': 95730.685, 'Rio Grande do Sul': 281707.148, 'Mato Grosso do Sul': 357147.994, 'Mato Grosso': 903207.047, 'Goiás': 340242.859, 'Distrito Federal': 5760.784};
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/2010/variaveis/615|616?localidades=N1[all]', (data) => {
            res["Área do Brasil por quilômetro quadrado"] = parseFloat(data[0].resultados[0].series[0].serie["2010"]);
        });
        $.getJSON('https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos/1872|1890|1900|1920|1940|1950|1960|1970|1980|1991|2000|2010/variaveis/614?localidades=N1[all]|N2[all]|N3[all]', (data) => {
            data[0].resultados[0].series.map((d) => {
                res[d.localidade.nome] = d.serie;
            });
        });
        return res;
    };
    
     return obj;
}
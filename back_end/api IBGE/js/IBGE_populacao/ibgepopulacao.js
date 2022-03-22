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
            res["Área do Brasil por quilômetro quadrado"] = parseFloat(data[0].resultados[0].series[0].serie["2010"]);
            res[data[1].unidade] = parseFloat(data[1].resultados[0].series[0].serie["2010"]);
            res["Área de estados por quilômetro quadrado"] = {'Rondônia': 237765.347, 'Acre': 164173.431, 'Amazonas': 1559167.879, 'Roraima': 223644.527, 'Pará': 1245870.707, 'Amapá': 142470.762, 'Tocantins': 277423.63, 'Maranhão': 329651.495, 'Piauí': 251755.484, 'Ceará': 148894.441, 'Rio Grande do Norte': 52809.601, 'Paraíba': 56467.242, 'Pernambuco': 98067.879, 'Alagoas': 27830.657, 'Sergipe': 21938.185, 'Bahia': 564760.427, 'Minas Gerais': 586513.993, 'Espirito Santo': 46074.447, 'Rio de Janeiro': 43750.426, 'São Paulo': 248219.481, 'Paraná': 199298.982, 'Santa Catarina': 95730.685, 'Rio Grande do Sul': 281707.148, 'Mato Grosso do Sul': 357147.994, 'Mato Grosso': 903207.047, 'Goiás': 340242.859, 'Distrito Federal': 5760.784};
        });
        return res;
    };
    
     return obj;
}
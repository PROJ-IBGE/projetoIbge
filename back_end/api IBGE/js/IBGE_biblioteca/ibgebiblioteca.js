function biblioteca(){
    const obj = {};

    obj.biblioteca = (value = '') => {
        if (value === '') return "Erro: insira um tema, exemplo: biblioteca('saúde')"
        const data = [];
        fetch('http://servicodados.ibge.gov.br/api/v1/publicacoes/'+value)
            .then(d => d.json())
            .then(json => {
                json.items.forEach((i1) => {
                    data.push({
                        'titulo': i1.titulo,
                        'autor': i1.autor,
                        'ano': i1.ano,
                        'link': i1.link
                    });
                });
            });
        return data;
    };

    return obj;
};
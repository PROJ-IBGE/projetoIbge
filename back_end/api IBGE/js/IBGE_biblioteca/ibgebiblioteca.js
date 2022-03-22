function biblioteca(){
    const obj = {};

    obj.biblioteca = (value) => {
        const data = [];
        $.getJSON('http://servicodados.ibge.gov.br/api/v1/publicacoes/'+value, (json3) => {
            json3.items.forEach((i1) => {
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
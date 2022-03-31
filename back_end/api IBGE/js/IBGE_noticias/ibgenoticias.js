function noticias(){
    const obj = {};
    const date = new Date();
    let mes = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
    let dia = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let data = mes+'-'+dia+`-${date.getFullYear()}`;

    obj.noticiasPorTema = (value = '') => {
        if (value === '') return "Erro: insira um tema, exemplo: noticiasPorTema('saúde')"
        const data = [];
        fetch('http://servicodados.ibge.gov.br/api/v3/noticias/?busca='+value)
            .then(d => d.json())
            .then(json => {
                json.items.forEach((i1) => {
                    let img = '';
                    for(let i = 0; i <= i1.imagens.length-1; i++){
                        if(i1.imagens[i] != '\\') img += i1.imagens[i];
                    };
                    data.push({
                        'titulo': i1.titulo,
                        'introducao': i1.introducao,
                        'data_publicacao': i1.data_publicacao,
                        'editorias': i1.editorias,
                        'imagens': img,
                        'link': i1.link
                    });
                });
            });
        return data;
    };

    obj.noticiasPorData = (de=data) => {
        const data = [];
        fetch('http://servicodados.ibge.gov.br/api/v3/noticias/?de='+de)
            .then(d => d.json())
            .then(json => {
                json.items.forEach((i1) => {
                    let img = '';
                    for(let i = 0; i <= i1.imagens.length-1; i++){
                        if(i1.imagens[i] != '\\') img += i1.imagens[i];
                    };
                    data.push({
                        'titulo': i1.titulo,
                        'introducao': i1.introducao,
                        'data_publicacao': i1.data_publicacao,
                        'editorias': i1.editorias,
                        'imagens': img,
                        'link': i1.link
                    });
                });
            });
        return data;
    };
    
    return obj;
};
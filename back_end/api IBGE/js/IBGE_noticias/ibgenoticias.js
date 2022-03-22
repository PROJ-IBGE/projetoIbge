function noticias(){
    const obj = {};
    const date = new Date();
    let mes = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
    let dia = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let data = mes+'-'+dia+`-${date.getFullYear()}`;

    obj.noticiasPorTema = (value) => {
        const data = [];
        $.getJSON('http://servicodados.ibge.gov.br/api/v3/noticias/?busca='+value, (json2) => {
            json2.items.forEach((i1) => {
                let img = '';
                for(let i = 0; i <= i1.imagens.length-1; i++){
                    if(i1.imagens[i] != '\\') img += i1.imagens[i];
                };
                data.push({
                    'titulo': i1.titulo,
                    'introducao': i1.introducao,
                    'data_publicacao': i1.data_publicacao,
                    'editorias': i1.editorias,
                    'imagens': JSON.parse(img),
                    'link': i1.link
                });
            });
        });
        return data;
    };

    obj.noticiasPorData = (de=data) => {
        const data = [];
        $.getJSON('http://servicodados.ibge.gov.br/api/v3/noticias/?de='+de, (json3) => {
            json3.items.forEach((i1) => {
                let img = '';
                for(let i = 0; i <= i1.imagens.length-1; i++){
                    if(i1.imagens[i] != '\\') img += i1.imagens[i];
                };
                data.push({
                    'titulo': i1.titulo,
                    'introducao': i1.introducao,
                    'data_publicacao': i1.data_publicacao,
                    'editorias': i1.editorias,
                    'imagens': JSON.parse(img),
                    'link': i1.link
                });
            });
        });
        return data;
    };
    
    return obj;
};
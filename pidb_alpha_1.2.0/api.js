$(document).ready(function(){
    // Cada vez que um estado for selecionado a select de município é atualizada
    $("#slctEstados").change(function(){
        // Método de conexão com a API de municípios
        $.ajax({
            url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+$("#slctEstados").val()+"/municipios" ,
            type: "GET" ,
            data: {
                orderBy: "nome"
            } ,
            success: function(cidades){
                var cidade = "<option value=''>CIDADE</option>";
                for(var i = 0; i < cidades.length; i++){
                    cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                }
                $("#slctCidades").html(cidade);
            }
        })
    })

    // Método de conexão com a API de estados
    $.ajax({
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados" ,
        type: "GET" ,
        data: {
            orderBy: "nome"
        } ,
        success: function(estados){
            var estado = "<option value=''>ESTADO</option>";
            for(var i = 0; i < estados.length; i++){
                estado = estado + "<option value='" + estados[i].id + "'>" + estados[i].nome + "</option>"
            }           

            $("#slctEstados").html(estado);
            $("#slctEstados").trigger("change");
        }
    })

    $("#btnConsultar").click(function(){
        // Método de conexão com todos os municípios
        $.ajax({
            url: "https://servicodados.ibge.gov.br/api/v1/localidades/municipios" ,
            type: "GET" ,
            data: {
                orderBy: "nome"
            } ,
            success: function(cidades){    
                var i;
                var cidade = ""
                cidade = "<option value=''>CIDADE</option>";
                cidade = cidade + "<optgroup label='Acre'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 12){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Alagoas'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 27){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Amapá'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 16){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Amazonas'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 13){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Bahia'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 29){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Ceará'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 23){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Distrito Federal'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 53){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Espírito Santo'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 32){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Goiás'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 52){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Maranhão'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 21){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Mato Grosso'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 51){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Mato Grosso do Sul'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 50){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Minas Gerais'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 31){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Pará'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 15){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Paraíba'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 25){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Paraná'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 41){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Pernambuco'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 26){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Piauí'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 22){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Rio de Janeiro'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 33){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Rio Grande do Norte'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 24){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Rio Grande do Sul'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 43){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Rondônia'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 11){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Roraima'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 14){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Santa Catarina'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 42){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='São Paulo'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 35){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
    
                cidade = cidade + "<optgroup label='Sergipe'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 28){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                cidade = cidade + "<optgroup label='Tocantins'></optgroup>"
                for(i = 0; i < cidades.length; i++){
                    if(cidades[i].microrregiao.mesorregiao.UF.id == 17){     
                        cidade = cidade + "<option value='"+cidades[i].id+"'>"+cidades[i].nome+"</option>"
                    }
                }
                $("#slctCidades2").html(cidade);
                $("#slctCidades3").html(cidade);
            }
        })
    })
})
$(document).ready(function(){  // TUDO RELACIONADO AOS ESTADOS
    $("#slctEstados").change(function(){  // Função que serve para retornar o nome do estado selecionado 
        if($("#slctEstados option:selected").text() == "Selecione um estado"){
            return;
        } else {
            $("#btnConsultar").click(function(){
                var valueEstado = $("#slctEstados option:selected").text();
                $("#retNomeEstado").html(valueEstado);
            })
        }
    })
})
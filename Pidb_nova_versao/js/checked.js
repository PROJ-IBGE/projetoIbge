const checkboxInfo = async(obj, valObj, label, retorno) => {
    if (obj.checked == true) {
        let input = label;
        input += " ";

        if (valObj != undefined) {
            let width = valObj.length - 1;
            input += `<input type="text" id="${retorno}" value="${valObj}" size="${width} disable">`;
        } else input += 'Não há informações.';
        document.getElementById(retorno).innerHTML = input;
        document.getElementById(retorno).style.display = 'block';
    } else document.getElementById(retorno).style.display = 'none';
} // Verifica as checkboxs e retorna as informações.

const checkboxGrafico = async(obj, valObj, valObj2, label, title, ctx) => {
    if (obj.checked == true) {
        if (valObj == undefined || valObj2 == undefined) alert('Não há informações suficientes!'); 
        else {
            grafico(valObj2, valObj, label, title, ctx)
            document.getElementById(ctx).style.display = 'block';
        }
    } else document.getElementById(ctx).style.display = 'none';
} // Verifica as checkboxs e retorna os gráficos.
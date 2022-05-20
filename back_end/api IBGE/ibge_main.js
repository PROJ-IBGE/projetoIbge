function initIBGE() {
    /*
    const not = noticias()
    const pa = paises()
    const bib = biblioteca()
    */
    const pop = populacao()
    const pib = pibBrasil()

    const obj = {}

    /*
    obj.noticiasPorTema = not.noticiasPorTema
    obj.noticiasPorData = not.noticiasPorData
    obj.paises = pa.paises
    obj.biblioteca = bib.biblioteca
    */

    // funções sobre população
    obj.populacaoDoBrasil = pop.populacaoDoBrasil //1
    obj.populacaoPorGrandeRegiao = pop.populacaoPorGrandeRegiao //2
    obj.populacaoPorEstado = pop.populacaoPorEstado //3
    obj.populacaoPorMunicipio = pop.populacaoPorMunicipio //4
    obj.esperancaDeVidaDoBrasil = pop.esperancaDeVidaDoBrasil //5
    obj.esperancaDeVidaPorGrandeRegiao = pop.esperancaDeVidaPorGrandeRegiao //6
    obj.esperancaDeVidaPorEstado = pop.esperancaDeVidaPorEstado //7
    obj.densidadeDemograficaDoBrasil = pop.densidadeDemograficaDoBrasil //8
    obj.densidadeDemograficaPorGrandeRegiao = pop.densidadeDemograficaPorGrandeRegiao //9
    obj.densidadeDemograficaPorEstado = pop.densidadeDemograficaPorEstado //10
    obj.populacaoAssalariadaDoBrasil = pop.populacaoAssalariadaDoBrasil //17
    obj.populacaoAssalariadaPorGrandeRegiao = pop.populacaoAssalariadaPorGrandeRegiao //18
    obj.populacaoAssalariadaPorEstado = pop.populacaoAssalariadaPorEstado //19
    obj.projecaoDeDadosNoBrasil = pop.projecaoDeDadosNoBrasil // 20
    obj.projecaoDeDadosPorGrandeRegiao = pop.projecaoDeDadosPorGrandeRegiao // 21
    obj.projecaoDeDadosPorEstado = pop.projecaoDeDadosPorEstado //22

    // funções sobre o pib
    obj.pibDoBrasil = pib.pibDoBrasil //11
    obj.pibPorEstado = pib.pibPorEstado //12
    obj.pibPorGrandeRegiao = pib.pibPorGrandeRegiao //13
    obj.pibPorMesorregiao = pib.pibPorMesorregiao //14
    obj.pibPorMicrorregiao = pib.pibPorMicrorregiao //15
    obj.pibPorMunicipio = pib.pibPorMunicipio //16

    return obj
}

var ibge = initIBGE()

function IBGE(obj) {
    if (typeof obj === 'object') {
        let verifica = (obj) => {
            if (obj.op === undefined) {
                console.error('Erro: insira um valor para (op)!')
            } else if (typeof obj.op != 'number') {
                console.error('Erro: insira um valor NUMÉRICO para (op)!')
            } else if (obj.op < 1 || obj.op > 22) console.error(`Erro: op=${obj.op} não existe!`)
            if (obj.local === undefined) obj.local = 'all'
            if (obj.ano === undefined) obj.ano = 'all'
            if (obj.variavel === undefined) obj.variavel = 'populacao'
            if (obj.query === undefined) obj.query = 'body'
            if (obj.tabela === undefined && obj.grafico === undefined) {
                obj.tabela = 'tabela matriz'
                obj.grafico = 'linha'
            } else if (obj.tabela === true) obj.grafico = ''
            if (obj.gini === undefined) obj.gini = false
            if (obj.cor === undefined) obj.cor = true 
        }
        if (typeof obj.op === 'number') {
            switch (obj.op) {
                case 1:
                    verifica(obj)
                    ibge.populacaoDoBrasil(obj)
                    break
                case 2:
                    verifica(obj)
                    ibge.populacaoPorGrandeRegiao(obj)
                    break
                case 3:
                    verifica(obj)
                    ibge.populacaoPorEstado(obj)
                    break
                case 4:
                    verifica(obj)
                    ibge.populacaoPorMunicipio(obj)
                    break
                case 5:
                    verifica(obj)
                    ibge.esperancaDeVidaDoBrasil(obj)
                    break
                case 6:
                    verifica(obj)
                    ibge.esperancaDeVidaPorGrandeRegiao(obj)
                    break
                case 7:
                    verifica(obj)
                    ibge.esperancaDeVidaPorEstado(obj)
                    break
                case 8:
                    verifica(obj)
                    ibge.densidadeDemograficaDoBrasil(obj)
                    break
                case 9:
                    verifica(obj)
                    ibge.densidadeDemograficaPorGrandeRegiao(obj)
                    break
                case 10:
                    verifica(obj)
                    ibge.densidadeDemograficaPorEstado(obj)
                    break
                case 11:
                    verifica(obj)
                    ibge.pibDoBrasil(obj)
                    break
                case 12:
                    verifica(obj)
                    ibge.pibPorEstado(obj)
                    break
                case 13:
                    verifica(obj)
                    ibge.pibPorGrandeRegiao(obj)
                    break
                case 14:
                    verifica(obj)
                    ibge.pibPorMesorregiao(obj)
                    break
                case 15:
                    verifica(obj)
                    ibge.pibPorMicrorregiao(obj)
                    break
                case 16:
                    verifica(obj)
                    ibge.pibPorMunicipio(obj)
                    break
                case 17:
                    verifica(obj)
                    ibge.populacaoAssalariadaDoBrasil(obj)
                    break
                case 18:
                    verifica(obj)
                    ibge.populacaoAssalariadaPorGrandeRegiao(obj)
                    break
                case 19:
                    verifica(obj)
                    ibge.populacaoAssalariadaPorEstado(obj)
                    break
                case 20:
                    verifica(obj)
                    ibge.projecaoDeDadosNoBrasil(obj)
                    break
                case 21:
                    verifica(obj)
                    ibge.projecaoDeDadosPorGrandeRegiao(obj)
                    break
                case 22:
                    verifica(obj)
                    ibge.projecaoDeDadosPorEstado(obj)
                    break
                default:
                    console.log(`Erro: op = ${obj.op} não existe`)
            }
            delete obj.func
        } else return "Erro: insira um valor numérico de 1 a 16 na chave op!"
    } else return "Erro: insira um objeto com os parâmetros!"
}
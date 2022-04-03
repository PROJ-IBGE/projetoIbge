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
    obj.densidadeDemograficaPorEstado =pop.densidadeDemograficaPorEstado //10

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
/**
 * {
 *      op: numero,
 *      local: string,
 *      query: string,
 *      grafico: string,
 *      tabela: boolean,
 *      gini: boolean
 * }
 */
function IBGE(obj = null) {
    if (obj != null) {
        if (typeof obj.op === 'number') {
            switch (obj.op) {
                case 1:
                    ibge.populacaoDoBrasil(obj.query, obj.grafico, obj.tabela)
                    break
                case 2:
                    ibge.populacaoPorGrandeRegiao(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 3:
                    ibge.populacaoPorEstado(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 4:
                    ibge.populacaoPorMunicipio(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 5:
                    ibge.esperancaDeVidaDoBrasil(obj.query, obj.grafico, obj.tabela)
                    break
                case 6:
                    ibge.esperancaDeVidaPorGrandeRegiao(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 7:
                    ibge.esperancaDeVidaPorEstado(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 8:
                    ibge.densidadeDemograficaDoBrasil(obj.query, obj.grafico, obj.tabela)
                    break
                case 9:
                    ibge.densidadeDemograficaPorGrandeRegiao(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 10:
                    ibge.densidadeDemograficaPorEstado(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 11:
                    ibge.pibDoBrasil(obj.query, obj.grafico, obj.tabela, obj.gini)
                    break
                case 12:
                    ibge.pibPorEstado(obj.local, obj.query, obj.grafico, obj.tabela, obj.gini)
                    break
                case 13:
                    ibge.pibPorGrandeRegiao(obj.local, obj.query, obj.grafico, obj.tabela, obj.gini)
                    break
                case 14:
                    ibge.pibPorMesorregiao(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 15:
                    ibge.pibPorMicrorregiao(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
                case 16:
                    ibge.pibPorMunicipio(obj.local, obj.query, obj.grafico, obj.tabela)
                    break
            }
        } else return "Erro: insira um valor numérico de 1 a 16 na chave op!"
    } else return "Erro: insira um objeto com os parâmetros!"
}
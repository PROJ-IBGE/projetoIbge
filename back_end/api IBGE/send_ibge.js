// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
//import noticias from "./js/IBGE_noticias/ibgenoticias.js";

function initIBGE() {
    const not = noticias()
    const pa = paises()
    const bib = biblioteca()
    const pop = populacao()
    const pib = pibBrasil()

    const obj = {}

    obj.noticiasPorTema = not.noticiasPorTema
    obj.noticiasPorData = not.noticiasPorData
    obj.paises = pa.paises
    obj.biblioteca = bib.biblioteca

    // funções sobre população
    obj.populacaoDoBrasil = pop.populacaoDoBrasil
    obj.populacaoPorGrandeRegiao = pop.populacaoPorGrandeRegiao
    obj.populacaoPorEstado = pop.populacaoPorEstado
    obj.populacaoPorMunicipio = pop.populacaoPorMunicipio
    obj.esperancaDeVidaDoBrasil = pop.esperancaDeVidaDoBrasil
    obj.esperancaDeVidaPorGrandeRegiao = pop.esperancaDeVidaPorGrandeRegiao
    obj.esperancaDeVidaPorEstado = pop.esperancaDeVidaPorEstado
    obj.densidadeDemograficaDoBrasil = pop.densidadeDemograficaDoBrasil
    obj.densidadeDemograficaPorGrandeRegiao = pop.densidadeDemograficaPorGrandeRegiao
    obj.densidadeDemograficaPorEstado =pop.densidadeDemograficaPorEstado

    // funções sobre o pib
    obj.pibDoBrasil = pib.pibDoBrasil
    obj.pibPorEstado = pib.pibPorEstado
    obj.pibPorGrandeRegiao = pib.pibPorGrandeRegiao
    obj.pibPorMesorregiao = pib.pibPorMesorregiao
    obj.pibPorMicrorregiao = pib.pibPorMicrorregiao
    obj.pibPorMunicipio = pib.pibPorMunicipio

    return obj
}
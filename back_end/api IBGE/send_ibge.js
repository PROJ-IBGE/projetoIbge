// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
//import noticias from "./js/IBGE_noticias/ibgenoticias.js";

function initIBGE() {
    const not = noticias();
    const pa = paises();
    const bib = biblioteca();
    const pop = populacao();
    const pib = pibBrasil();

    const obj = {};

    obj.noticiasPorTema = not.noticiasPorTema;
    obj.noticiasPorData = not.noticiasPorData;
    obj.paises = pa.paises;
    obj.biblioteca = bib.biblioteca;
    obj.populacao = pop.populacao;
    obj.esperancaDeVida = pop.esperancaDeVida;
    obj.densidadeDemografica = pop.densidadeDemografica;
    obj.pibBrasil = pib.pibBrasil;
    obj.pibEstado = pib.pibEstado;
    obj.pibMesorregiao = pib.pibMesorregiao;
    obj.pibGrandeRegiao = pib.pibGrandeRegiao;

    return obj;
};
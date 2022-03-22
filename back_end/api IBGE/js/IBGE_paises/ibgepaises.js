function paises(){
    const obj = {};

    obj.paises = (pais) => {
        let paises_nomes = [['AF', 'Afeganistão'], ['ZA', 'ÁfricadoSul'], ['AL', 'Albânia'], ['DE', 'Alemanha'], ['AD', 'Andorra'], ['AO', 'Angola'], ['AG', 'AntíguaeBarbuda'], ['SA', 'ArábiaSaudita'], ['DZ', 'Argélia'], ['AR', 'Argentina'], ['AM', 'Armênia'], ['AU', 'Austrália'], ['AT', 'Áustria'], ['AZ', 'Azerbaijão'], ['BS', 'Bahamas'], ['BD', 'Bangladesh'], ['BB', 'Barbados'], ['BH', 'Barein'], ['BY', 'Belarus'], ['BE', 'Bélgica'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BO', 'Bolívia'], ['BA', 'BósniaeHerzegovina'], ['BW', 'Botsuana'], ['BR', 'Brasil'], ['BN', 'Brunei'], ['BG', 'Bulgária'], ['BF', 'BurkinaFaso'], ['BI', 'Burundi'], ['BT', 'Butão'], ['CV', 'CaboVerde'], ['CM', 'Camarões'], ['KH', 'Camboja'], ['CA', 'Canadá'], ['QA', 'Catar'], ['KZ', 'Cazaquistão'], ['TD', 'Chade'], ['CL', 'Chile'], ['CN', 'China'], ['CY', 'Chipre'], ['CO', 'Colômbia'], ['KM', 'Comores'], ['CG', 'Congo'], ['CI', 'CostadoMarfim'], ['CR', 'CostaRica'], ['HR', 'Croácia'], ['CU', 'Cuba'], ['DK', 'Dinamarca'], ['DJ', 'Djibouti'], ['DM', 'Dominica'], ['EG', 'Egito'], ['SV', 'ElSalvador'], ['AE', 'EmiradosÁrabesUnidos'], ['EC', 'Equador'], ['ER', 'Eritréia'], ['SK', 'Eslováquia'], ['SI', 'Eslovênia'], ['ES', 'Espanha'], ['US', 'EstadosUnidosdaAmérica'], ['EE', 'Estônia'], ['SZ', 'Eswatini'], ['ET', 'Etiópia'], ['FJ', 'Fiji'], ['PH', 'Filipinas'], ['FI', 'Finlândia'], ['FR', 'França'], ['GA', 'Gabão'], ['GM', 'Gâmbia'], ['GH', 'Gana'], ['GE', 'Geórgia'], ['GD', 'Granada'], ['GR', 'Grécia'], ['GT', 'Guatemala'], ['GY', 'Guiana'], ['GN', 'Guiné'], ['GQ', 'GuinéEquatorial'], ['GW', 'GuinéBissau'], ['HT', 'Haiti'], ['NL', 'Holanda'], ['HN', 'Honduras'], ['HU', 'Hungria'], ['YE', 'Iêmen'], ['MH', 'IlhasMarshall'], ['SB', 'IlhasSalomão'], ['IN', 'Índia'], ['ID', 'Indonésia'], ['IR', 'Irã'], ['IQ', 'Iraque'], ['IE', 'Irlanda'], ['IS', 'Islândia'], ['IL', 'Israel'], ['IT', 'Itália'], ['JM', 'Jamaica'], ['JP', 'Japão'], ['JO', 'Jordânia'], ['KI', 'Kiribati'], ['KW', 'Kuwait'], ['LA', 'Laos'], ['LS', 'Lesoto'], ['LV', 'Letônia'], ['LB', 'Líbano'], ['LR', 'Libéria'], ['LY', 'Líbia'], ['LI', 'Liechtenstein'], ['LT', 'Lituânia'], ['LU', 'Luxemburgo'], ['MK', 'MacedôniadoNorte'], ['MG', 'Madagáscar'], ['MY', 'Malásia'], ['MW', 'Malauí'], ['MV', 'Maldivas'], ['ML', 'Mali'], ['MT', 'Malta'], ['MA', 'Marrocos'], ['MU', 'Maurício'], ['MR', 'Mauritânia'], ['MX', 'México'], ['MM', 'Mianmar'], ['FM', 'Micronésia'], ['MZ', 'Moçambique'], ['MD', 'Moldávia'], ['MC', 'Mônaco'], ['MN', 'Mongólia'], ['ME', 'Montenegro'], ['NA', 'Namíbia'], ['NR', 'Nauru'], ['NP', 'Nepal'], ['NI', 'Nicarágua'], ['NE', 'Níger'], ['NG', 'Nigéria'], ['NO', 'Noruega'], ['NZ', 'NovaZelândia'], ['OM', 'Omã'], ['PW', 'Palau'], ['PA', 'Panamá'], ['PG', 'PapuaNovaGuiné'], ['PK', 'Paquistão'], ['PY', 'Paraguai'], ['PE', 'Peru'], ['PL', 'Polônia'], ['PT', 'Portugal'], ['KE', 'Quênia'], ['KG', 'Quirguistão'], ['GB', 'ReinoUnido'], ['CF', 'RepúblicaCentroAfricana'], ['KR', 'RepúblicadaCoréia'], ['CD', 'RepúblicaDemocráticadoCongo'], ['DO', 'RepúblicaDominicana'], ['KP', 'RepúblicaPopularDemocráticadaCoréia'], ['CZ', 'RepúblicaTcheca'], ['RO', 'Romênia'], ['RW', 'Ruanda'], ['RU', 'Rússia(FederaçãoRussa)'], ['WS', 'Samoa'], ['SM', 'SanMarino'], ['LC', 'SantaLúcia'], ['KN', 'SãoCristóvãoeNevis'], ['ST', 'SãoToméePríncipe'], ['VC', 'SãoVicenteeGranadinas'], ['SC', 'Seichelles'], ['SN', 'Senegal'], ['SL', 'SerraLeoa'], ['RS', 'Sérvia'], ['SG', 'Singapura'], ['SY', 'Síria'], ['SO', 'Somália'], ['LK', 'SriLanka'], ['SD', 'Sudão'], ['SS', 'SudãodoSul'], ['SE', 'Suécia'], ['CH', 'Suíça'], ['SR', 'Suriname'], ['TJ', 'Tadjiquistão'], ['TH', 'Tailândia'], ['TZ', 'Tanzânia'], ['TL', 'TimorLeste'], ['TG', 'Togo'], ['TO', 'Tonga'], ['TT', 'TrinidadeTobago'], ['TN', 'Tunísia'], ['TM', 'Turcomenistão'], ['TR', 'Turquia'], ['TV', 'Tuvalu'], ['UA', 'Ucrânia'], ['UG', 'Uganda'], ['UY', 'Uruguai'], ['UZ', 'Uzbequistão'], ['VU', 'Vanuatu'], ['VE', 'Venezuela'], ['VN', 'Vietnã'], ['ZM', 'Zâmbia'], ['ZW', 'Zimbábu']];
        let variavel = '';
        let cont = true;
        let data = [];
        paises_nomes.forEach((i) => {
            pais.split(' ').forEach((i1) => {
                if(i[0].toLowerCase() == i1.toLowerCase() || i[1].toLowerCase() == i1.toLowerCase()){
                    if(cont){
                        variavel += i[0];
                        cont = false;
                    }else{
                        variavel += '|'+i[0];
                    }
                }
            });
        });  
        $.getJSON('http://servicodados.ibge.gov.br/api/v1/paises/'+variavel, (json4) => {data.push(json4)});
        return data;
    };
    return obj;
};
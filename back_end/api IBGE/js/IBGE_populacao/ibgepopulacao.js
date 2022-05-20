function populacao(){
    const obj ={};

    obj.populacaoDoBrasil = (obj) => {
        let anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/${anosres}/variaveis/9324?localidades=N1[all]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                res.Brasil = json[0].resultados[0].series[0].serie

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/localidades/N1')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.populacaoPorGrandeRegiao = (obj) => {
        let numeroRegioes = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroRegioes += 'all'
        } else {
            const listaRegioes = {'Norte':'1', 'Nordeste':'2', 'Sudeste':'3', 'Sul':'4', 'CentroOeste':'5'}
            obj.local.split(' ').map(regiao => {
                if(numeroRegioes === '') numeroRegioes += listaRegioes[regiao]
                else numeroRegioes += `,${listaRegioes[regiao]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/${anosres}/variaveis/9324?localidades=N2[${numeroRegioes}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/localidades/N2')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.populacaoPorEstado = (obj) => {
        let numeroEstado = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroEstado = 'all'
        } else {
            const listaEstados = {'Rondônia': '11', 'Acre': '12', 'Amazonas': '13', 'Roraima': '14', 'Pará': '15', 'Amapá': '16', 'Tocantins': '17', 'Maranhão': '21', 'Piauí': '22', 'Ceará': '24', 'RioGrandeDoNorte': '24', 'Paraíba': '25', 'Pernambuco': '26', 'Alagoas': '27', 'Sergipe': '28', 'Bahia': '29', 'MinasGerais': '31', 'EspíritoSanto': '32', 'RioDeRaneiro': '33', 'SãoPaulo': '35', 'Paraná': '41', 'SantaCatarina': '42', 'RioGrandeDoSul': '43', 'MatoGrossoDoSul': '50', 'MatoGrosso': '51', 'Goiás': '52', 'DistritoFederal': '53'}
            obj.local.split(' ').map(estado => {
                if(numeroEstado === '') numeroEstado += listaEstados[estado]
                else numeroEstado += `,${listaEstados[estado]}`
        })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/${anosres}/variaveis/9324?localidades=N3[${numeroEstado}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/localidades/N3')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.populacaoPorMunicipio = (obj) => {
        let numeroMunicipio = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            obj.local = "AltaFlorestaD'Oeste/Ro Ariquemes/Ro"
        }
        if (obj.local != 'all'){
            const listaMunicipios = {"AltaFlorestaD'Oeste/Ro": '1100015', 'Ariquemes/Ro': '1100023', 'Cabixi/Ro': '1100031', 'Cacoal/Ro': '1100049', 'Cerejeiras/Ro': '1100056', 'ColoradoDoOeste/Ro': '1100064', 'Corumbiara/Ro': '1100072', 'CostaMarques/Ro': '1100080', "EspigãoD'Oeste/Ro": '1100098', 'GuajaráMirim/Ro': '1100106', 'Jaru/Ro': '1100114', 'JiParaná/Ro': '1100122', "MachadinhoD'Oeste/Ro": '1100130', "NovaBrasilândiaD'Oeste/Ro": '1100148', 'OuroPretoDoOeste/Ro': '1100155', 'PimentaBueno/Ro': '1100189', 'PortoVelho/Ro': '1100205', 'PresidenteMédici/Ro': '1100254', 'RioCrespo/Ro': '1100262', 'RolimDeMoura/Ro': '1100288', "SantaLuziaD'Oeste/Ro": '1100296', 'Vilhena/Ro': '1100304', 'SãoMiguelDoGuaporé/Ro': '1100320', 'NovaMamoré/Ro': '1100338', "AlvoradaD'Oeste/Ro": '1100346', 'AltoAlegreDosParecis/Ro': '1100379', 'AltoParaíso/Ro': '1100403', 'Buritis/Ro': '1100452', 'NovoHorizonteDoOeste/Ro': '1100502', 'Cacaulândia/Ro': '1100601', 'CampoNovoDeRondônia/Ro': '1100700', 'CandeiasDoJamari/Ro': '1100809', 'Castanheiras/Ro': '1100908', 'Chupinguaia/Ro': '1100924', 'Cujubim/Ro': '1100940', 'GovernadorJorgeTeixeira/Ro': '1101005', 'ItapuãDoOeste/Ro': '1101104', 'MinistroAndreazza/Ro': '1101203', 'MiranteDaSerra/Ro': '1101302', 'MonteNegro/Ro': '1101401', 'NovaUnião/Ro': '1101435', 'Parecis/Ro': '1101450', 'PimenteirasDoOeste/Ro': '1101468', 'PrimaveraDeRondônia/Ro': '1101476', "SãoFelipeD'Oeste/Ro": '1101484', 'SãoFranciscoDoGuaporé/Ro': '1101492', 'Seringueiras/Ro': '1101500', 'Teixeirópolis/Ro': '1101559', 'Theobroma/Ro': '1101609', 'Urupá/Ro': '1101708', 'ValeDoAnari/Ro': '1101757', 'ValeDoParaíso/Ro': '1101807', 'Acrelândia/Ac': '1200013', 'AssisBrasil/Ac': '1200054', 'Brasiléia/Ac': '1200104', 'Bujari/Ac': '1200138', 'Capixaba/Ac': '1200179', 'CruzeiroDoSul/Ac': '1200203', 'Epitaciolândia/Ac': '1200252', 'Feijó/Ac': '1200302', 'Jordão/Ac': '1200328', 'MâncioLima/Ac': '1200336', 'ManoelUrbano/Ac': '1200344', 'MarechalThaumaturgo/Ac': '1200351', 'PlácidoDeCastro/Ac': '1200385', 'PortoWalter/Ac': '1200393', 'RioBranco/Ac': '1200401', 'RodriguesAlves/Ac': '1200427', 'SantaRosaDoPurus/Ac': '1200435', 'SenadorGuiomard/Ac': '1200450', 'SenaMadureira/Ac': '1200500', 'Tarauacá/Ac': '1200609', 'Xapuri/Ac': '1200708', 'PortoAcre/Ac': '1200807', 'Alvarães/Am': '1300029', 'Amaturá/Am': '1300060', 'Anamã/Am': '1300086', 'Anori/Am': '1300102', 'Apuí/Am': '1300144', 'AtalaiaDoNorte/Am': '1300201', 'Autazes/Am': '1300300', 'Barcelos/Am': '1300409', 'Barreirinha/Am': '1300508', 'BenjaminConstant/Am': '1300607', 'Beruri/Am': '1300631', 'BoaVistaDoRamos/Am': '1300680', 'BocaDoAcre/Am': '1300706', 'Borba/Am': '1300805', 'Caapiranga/Am': '1300839', 'Canutama/Am': '1300904', 'Carauari/Am': '1301001', 'Careiro/Am': '1301100', 'CareiroDaVárzea/Am': '1301159', 'Coari/Am': '1301209', 'Codajás/Am': '1301308', 'Eirunepé/Am': '1301407', 'Envira/Am': '1301506', 'FonteBoa/Am': '1301605', 'Guajará/Am': '1301654', 'Humaitá/Am': '1301704', 'Ipixuna/Am': '1301803', 'Iranduba/Am': '1301852', 'Itacoatiara/Am': '1301902', 'Itamarati/Am': '1301951', 'Itapiranga/Am': '1302009', 'Japurá/Am': '1302108', 'Juruá/Am': '1302207', 'Jutaí/Am': '1302306', 'Lábrea/Am': '1302405', 'Manacapuru/Am': '1302504', 'Manaquiri/Am': '1302553', 'Manaus/Am': '1302603', 'Manicoré/Am': '1302702', 'Maraã/Am': '1302801', 'Maués/Am': '1302900', 'Nhamundá/Am': '1303007', 'NovaOlindaDoNorte/Am': '1303106', 'NovoAirão/Am': '1303205', 'NovoAripuanã/Am': '1303304', 'Parintins/Am': '1303403', 'Pauini/Am': '1303502', 'PresidenteFigueiredo/Am': '1303536', 'RioPretoDaEva/Am': '1303569', 'SantaIsabelDoRioNegro/Am': '1303601', 'SantoAntônioDoIçá/Am': '1303700', 'SãoGabrielDaCachoeira/Am': '1303809', 'SãoPauloDeOlivença/Am': '1303908', 'SãoSebastiãoDoUatumã/Am': '1303957', 'Silves/Am': '1304005', 'Tabatinga/Am': '1304062', 'Tapauá/Am': '1304104', 'Tefé/Am': '1304203', 'Tonantins/Am': '1304237', 'Uarini/Am': '1304260', 'Urucará/Am': '1304302', 'Urucurituba/Am': '1304401', 'Amajari/Rr': '1400027', 'AltoAlegre/Rr': '1400050', 'BoaVista/Rr': '1400100', 'Bonfim/Rr': '1400159', 'Cantá/Rr': '1400175', 'Caracaraí/Rr': '1400209', 'Caroebe/Rr': '1400233', 'Iracema/Rr': '1400282', 'Mucajaí/Rr': '1400308', 'Normandia/Rr': '1400407', 'Pacaraima/Rr': '1400456', 'Rorainópolis/Rr': '1400472', 'SãoJoãoDaBaliza/Rr': '1400506', 'SãoLuiz/Rr': '1400605', 'Uiramutã/Rr': '1400704', 'Abaetetuba/Pa': '1500107', 'AbelFigueiredo/Pa': '1500131', 'Acará/Pa': '1500206', 'Afuá/Pa': '1500305', 'ÁguaAzulDoNorte/Pa': '1500347', 'Alenquer/Pa': '1500404', 'Almeirim/Pa': '1500503', 'Altamira/Pa': '1500602', 'Anajás/Pa': '1500701', 'Ananindeua/Pa': '1500800', 'Anapu/Pa': '1500859', 'AugustoCorrêa/Pa': '1500909', 'AuroraDoPará/Pa': '1500958', 'Aveiro/Pa': '1501006', 'Bagre/Pa': '1501105', 'Baião/Pa': '1501204', 'Bannach/Pa': '1501253', 'Barcarena/Pa': '1501303', 'Belém/Pa': '1501402', 'Belterra/Pa': '1501451', 'Benevides/Pa': '1501501', 'BomJesusDoTocantins/Pa': '1501576', 'Bonito/Pa': '1501600', 'Bragança/Pa': '1501709', 'BrasilNovo/Pa': '1501725', 'BrejoGrandeDoAraguaia/Pa': '1501758', 'BreuBranco/Pa': '1501782', 'Breves/Pa': '1501808', 'Bujaru/Pa': '1501907', 'CachoeiraDoPiriá/Pa': '1501956', 'CachoeiraDoArari/Pa': '1502004', 'Cametá/Pa': '1502103', 'CanaãDosCarajás/Pa': '1502152', 'Capanema/Pa': '1502202', 'CapitãoPoço/Pa': '1502301', 'Castanhal/Pa': '1502400', 'Chaves/Pa': '1502509', 'Colares/Pa': '1502608', 'ConceiçãoDoAraguaia/Pa': '1502707', 'ConcórdiaDoPará/Pa': '1502756', 'CumaruDoNorte/Pa': '1502764', 'Curionópolis/Pa': '1502772', 'Curralinho/Pa': '1502806', 'Curuá/Pa': '1502855', 'Curuçá/Pa': '1502905', 'DomEliseu/Pa': '1502939', 'EldoradoDoCarajás/Pa': '1502954', 'Faro/Pa': '1503002', 'FlorestaDoAraguaia/Pa': '1503044', 'GarrafãoDoNorte/Pa': '1503077', 'GoianésiaDoPará/Pa': '1503093', 'Gurupá/Pa': '1503101', 'IgarapéAçu/Pa': '1503200', 'IgarapéMiri/Pa': '1503309', 'Inhangapi/Pa': '1503408', 'IpixunaDoPará/Pa': '1503457', 'Irituia/Pa': '1503507', 'Itaituba/Pa': '1503606', 'Itupiranga/Pa': '1503705', 'Jacareacanga/Pa': '1503754', 'Jacundá/Pa': '1503804', 'Juruti/Pa': '1503903', 'LimoeiroDoAjuru/Pa': '1504000', 'MãeDoRio/Pa': '1504059', 'MagalhãesBarata/Pa': '1504109', 'Marabá/Pa': '1504208', 'Maracanã/Pa': '1504307', 'Marapanim/Pa': '1504406', 'Marituba/Pa': '1504422', 'Medicilândia/Pa': '1504455', 'Melgaço/Pa': '1504505', 'Mocajuba/Pa': '1504604', 'Moju/Pa': '1504703', 'MojuíDosCampos/Pa': '1504752', 'MonteAlegre/Pa': '1504802', 'Muaná/Pa': '1504901', 'NovaEsperançaDoPiriá/Pa': '1504950', 'NovaIpixuna/Pa': '1504976', 'NovaTimboteua/Pa': '1505007', 'NovoProgresso/Pa': '1505031', 'NovoRepartimento/Pa': '1505064', 'Óbidos/Pa': '1505106', 'OeirasDoPará/Pa': '1505205', 'Oriximiná/Pa': '1505304', 'Ourém/Pa': '1505403', 'OurilândiaDoNorte/Pa': '1505437', 'Pacajá/Pa': '1505486', 'PalestinaDoPará/Pa': '1505494', 'Paragominas/Pa': '1505502', 'Parauapebas/Pa': '1505536', "PauD'Arco/Pa": '1505551', 'PeixeBoi/Pa': '1505601', 'Piçarra/Pa': '1505635', 'Placas/Pa': '1505650', 'PontaDePedras/Pa': '1505700', 'Portel/Pa': '1505809', 'PortoDeMoz/Pa': '1505908', 'Prainha/Pa': '1506005', 'Primavera/Pa': '1506104', 'Quatipuru/Pa': '1506112', 'Redenção/Pa': '1506138', 'RioMaria/Pa': '1506161', 'RondonDoPará/Pa': '1506187', 'Rurópolis/Pa': '1506195', 'Salinópolis/Pa': '1506203', 'Salvaterra/Pa': '1506302', 'SantaBárbaraDoPará/Pa': '1506351', 'SantaCruzDoArari/Pa': '1506401', 'SantaIzabelDoPará/Pa': '1506500', 'SantaLuziaDoPará/Pa': '1506559', 'SantaMariaDasBarreiras/Pa': '1506583', 'SantaMariaDoPará/Pa': '1506609', 'SantanaDoAraguaia/Pa': '1506708', 'Santarém/Pa': '1506807', 'SantarémNovo/Pa': '1506906', 'SantoAntônioDoTauá/Pa': '1507003', 'SãoCaetanoDeOdivelas/Pa': '1507102', 'SãoDomingosDoAraguaia/Pa': '1507151', 'SãoDomingosDoCapim/Pa': '1507201', 'SãoFélixDoXingu/Pa': '1507300', 'SãoFranciscoDoPará/Pa': '1507409', 'SãoGeraldoDoAraguaia/Pa': '1507458', 'SãoJoãoDaPonta/Pa': '1507466', 'SãoJoãoDePirabas/Pa': '1507474', 'SãoJoãoDoAraguaia/Pa': '1507508', 'SãoMiguelDoGuamá/Pa': '1507607', 'SãoSebastiãoDaBoaVista/Pa': '1507706', 'Sapucaia/Pa': '1507755', 'SenadorJoséPorfírio/Pa': '1507805', 'Soure/Pa': '1507904', 'Tailândia/Pa': '1507953', 'TerraAlta/Pa': '1507961', 'TerraSanta/Pa': '1507979', 'ToméAçu/Pa': '1508001', 'Tracuateua/Pa': '1508035', 'Trairão/Pa': '1508050', 'Tucumã/Pa': '1508084', 'Tucuruí/Pa': '1508100', 'Ulianópolis/Pa': '1508126', 'Uruará/Pa': '1508159', 'Vigia/Pa': '1508209', 'Viseu/Pa': '1508308', 'VitóriaDoXingu/Pa': '1508357', 'Xinguara/Pa': '1508407', 'SerraDoNavio/Ap': '1600055', 'Amapá/Ap': '1600105', 'PedraBrancaDoAmapari/Ap': '1600154', 'Calçoene/Ap': '1600204', 'Cutias/Ap': '1600212', 'FerreiraGomes/Ap': '1600238', 'Itaubal/Ap': '1600253', 'LaranjalDoJari/Ap': '1600279', 'Macapá/Ap': '1600303', 'Mazagão/Ap': '1600402', 'Oiapoque/Ap': '1600501', 'PortoGrande/Ap': '1600535', 'Pracuúba/Ap': '1600550', 'Santana/Ap': '1600600', 'Tartarugalzinho/Ap': '1600709', 'VitóriaDoJari/Ap': '1600808', 'Abreulândia/To': '1700251', 'Aguiarnópolis/To': '1700301', 'AliançaDoTocantins/To': '1700350', 'Almas/To': '1700400', 'Alvorada/To': '1700707', 'Ananás/To': '1701002', 'Angico/To': '1701051', 'AparecidaDoRioNegro/To': '1701101', 'Aragominas/To': '1701309', 'Araguacema/To': '1701903', 'Araguaçu/To': '1702000', 'Araguaína/To': '1702109', 'Araguanã/To': '1702158', 'Araguatins/To': '1702208', 'Arapoema/To': '1702307', 'Arraias/To': '1702406', 'Augustinópolis/To': '1702554', 'AuroraDoTocantins/To': '1702703', 'AxixáDoTocantins/To': '1702901', 'Babaçulândia/To': '1703008', 'BandeirantesDoTocantins/To': '1703057', 'BarraDoOuro/To': '1703073', 'Barrolândia/To': '1703107', 'BernardoSayão/To': '1703206', 'BomJesusDoTocantins/To': '1703305', 'BrasilândiaDoTocantins/To': '1703602', 'BrejinhoDeNazaré/To': '1703701', 'BuritiDoTocantins/To': '1703800', 'Cachoeirinha/To': '1703826', 'CamposLindos/To': '1703842', 'CaririDoTocantins/To': '1703867', 'Carmolândia/To': '1703883', 'CarrascoBonito/To': '1703891', 'Caseara/To': '1703909', 'Centenário/To': '1704105', 'ChapadaDeAreia/To': '1704600', 'ChapadaDaNatividade/To': '1705102', 'ColinasDoTocantins/To': '1705508', 'Combinado/To': '1705557', 'ConceiçãoDoTocantins/To': '1705607', 'CoutoMagalhães/To': '1706001', 'Cristalândia/To': '1706100', 'CrixásDoTocantins/To': '1706258', 'Darcinópolis/To': '1706506', 'Dianópolis/To': '1707009', 'DivinópolisDoTocantins/To': '1707108', 'DoisIrmãosDoTocantins/To': '1707207', 'Dueré/To': '1707306', 'Esperantina/To': '1707405', 'Fátima/To': '1707553', 'Figueirópolis/To': '1707652', 'Filadélfia/To': '1707702', 'FormosoDoAraguaia/To': '1708205', 'FortalezaDoTabocão/To': '1708254', 'Goianorte/To': '1708304', 'Goiatins/To': '1709005', 'Guaraí/To': '1709302', 'Gurupi/To': '1709500', 'Ipueiras/To': '1709807', 'Itacajá/To': '1710508', 'Itaguatins/To': '1710706', 'Itapiratins/To': '1710904', 'ItaporãDoTocantins/To': '1711100', 'JaúDoTocantins/To': '1711506', 'Juarina/To': '1711803', 'LagoaDaConfusão/To': '1711902', 'LagoaDoTocantins/To': '1711951', 'Lajeado/To': '1712009', 'Lavandeira/To': '1712157', 'Lizarda/To': '1712405', 'Luzinópolis/To': '1712454', 'MarianópolisDoTocantins/To': '1712504', 'Mateiros/To': '1712702', 'MaurilândiaDoTocantins/To': '1712801', 'MiracemaDoTocantins/To': '1713205', 'Miranorte/To': '1713304', 'MonteDoCarmo/To': '1713601', 'MonteSantoDoTocantins/To': '1713700', 'PalmeirasDoTocantins/To': '1713809', 'Muricilândia/To': '1713957', 'Natividade/To': '1714203', 'Nazaré/To': '1714302', 'NovaOlinda/To': '1714880', 'NovaRosalândia/To': '1715002', 'NovoAcordo/To': '1715101', 'NovoAlegre/To': '1715150', 'NovoJardim/To': '1715259', 'OliveiraDeFátima/To': '1715507', 'Palmeirante/To': '1715705', 'Palmeirópolis/To': '1715754', 'ParaísoDoTocantins/To': '1716109', 'Paranã/To': '1716208', "PauD'Arco/To": '1716307', 'PedroAfonso/To': '1716505', 'Peixe/To': '1716604', 'Pequizeiro/To': '1716653', 'Colméia/To': '1716703', 'PindoramaDoTocantins/To': '1717008', 'Piraquê/To': '1717206', 'Pium/To': '1717503', 'PonteAltaDoBomJesus/To': '1717800', 'PonteAltaDoTocantins/To': '1717909', 'PortoAlegreDoTocantins/To': '1718006', 'PortoNacional/To': '1718204', 'PraiaNorte/To': '1718303', 'PresidenteKennedy/To': '1718402', 'Pugmil/To': '1718451', 'Recursolândia/To': '1718501', 'Riachinho/To': '1718550', 'RioDaConceição/To': '1718659', 'RioDosBois/To': '1718709', 'RioSono/To': '1718758', 'Sampaio/To': '1718808', 'Sandolândia/To': '1718840', 'SantaFéDoAraguaia/To': '1718865', 'SantaMariaDoTocantins/To': '1718881', 'SantaRitaDoTocantins/To': '1718899', 'SantaRosaDoTocantins/To': '1718907', 'SantaTerezaDoTocantins/To': '1719004', 'SantaTerezinhaDoTocantins/To': '1720002', 'SãoBentoDoTocantins/To': '1720101', 'SãoFélixDoTocantins/To': '1720150', 'SãoMiguelDoTocantins/To': '1720200', 'SãoSalvadorDoTocantins/To': '1720259', 'SãoSebastiãoDoTocantins/To': '1720309', 'SãoValério/To': '1720499', 'Silvanópolis/To': '1720655', 'SítioNovoDoTocantins/To': '1720804', 'Sucupira/To': '1720853', 'Taguatinga/To': '1720903', 'TaipasDoTocantins/To': '1720937', 'Talismã/To': '1720978', 'Palmas/To': '1721000', 'Tocantínia/To': '1721109', 'Tocantinópolis/To': '1721208', 'Tupirama/To': '1721257', 'Tupiratins/To': '1721307', 'Wanderlândia/To': '1722081', 'Xambioá/To': '1722107', 'Açailândia/Ma': '2100055', 'AfonsoCunha/Ma': '2100105', 'ÁguaDoceDoMaranhão/Ma': '2100154', 'Alcântara/Ma': '2100204', 'AldeiasAltas/Ma': '2100303', 'AltamiraDoMaranhão/Ma': '2100402', 'AltoAlegreDoMaranhão/Ma': '2100436', 'AltoAlegreDoPindaré/Ma': '2100477', 'AltoParnaíba/Ma': '2100501', 'AmapáDoMaranhão/Ma': '2100550', 'AmaranteDoMaranhão/Ma': '2100600', 'Anajatuba/Ma': '2100709', 'Anapurus/Ma': '2100808', 'ApicumAçu/Ma': '2100832', 'Araguanã/Ma': '2100873', 'Araioses/Ma': '2100907', 'Arame/Ma': '2100956', 'Arari/Ma': '2101004', 'Axixá/Ma': '2101103', 'Bacabal/Ma': '2101202', 'Bacabeira/Ma': '2101251', 'Bacuri/Ma': '2101301', 'Bacurituba/Ma': '2101350', 'Balsas/Ma': '2101400', 'BarãoDeGrajaú/Ma': '2101509', 'BarraDoCorda/Ma': '2101608', 'Barreirinhas/Ma': '2101707', 'Belágua/Ma': '2101731', 'BelaVistaDoMaranhão/Ma': '2101772', 'BeneditoLeite/Ma': '2101806', 'Bequimão/Ma': '2101905', 'BernardoDoMearim/Ma': '2101939', 'BoaVistaDoGurupi/Ma': '2101970', 'BomJardim/Ma': '2102002', 'BomJesusDasSelvas/Ma': '2102036', 'BomLugar/Ma': '2102077', 'Brejo/Ma': '2102101', 'BrejoDeAreia/Ma': '2102150', 'Buriti/Ma': '2102200', 'BuritiBravo/Ma': '2102309', 'Buriticupu/Ma': '2102325', 'Buritirana/Ma': '2102358', 'CachoeiraGrande/Ma': '2102374', 'Cajapió/Ma': '2102408', 'Cajari/Ma': '2102507', 'CampestreDoMaranhão/Ma': '2102556', 'CândidoMendes/Ma': '2102606', 'Cantanhede/Ma': '2102705', 'CapinzalDoNorte/Ma': '2102754', 'Carolina/Ma': '2102804', 'Carutapera/Ma': '2102903', 'Caxias/Ma': '2103000', 'Cedral/Ma': '2103109', 'CentralDoMaranhão/Ma': '2103125', 'CentroDoGuilherme/Ma': '2103158', 'CentroNovoDoMaranhão/Ma': '2103174', 'Chapadinha/Ma': '2103208', 'Cidelândia/Ma': '2103257', 'Codó/Ma': '2103307', 'CoelhoNeto/Ma': '2103406', 'Colinas/Ma': '2103505', 'ConceiçãoDoLagoAçu/Ma': '2103554', 'Coroatá/Ma': '2103604', 'Cururupu/Ma': '2103703', 'Davinópolis/Ma': '2103752', 'DomPedro/Ma': '2103802', 'DuqueBacelar/Ma': '2103901', 'Esperantinópolis/Ma': '2104008', 'Estreito/Ma': '2104057', 'FeiraNovaDoMaranhão/Ma': '2104073', 'FernandoFalcão/Ma': '2104081', 'FormosaDaSerraNegra/Ma': '2104099', 'FortalezaDosNogueiras/Ma': '2104107', 'Fortuna/Ma': '2104206', 'GodofredoViana/Ma': '2104305', 'GonçalvesDias/Ma': '2104404', 'GovernadorArcher/Ma': '2104503', 'GovernadorEdisonLobão/Ma': '2104552', 'GovernadorEugênioBarros/Ma': '2104602', 'GovernadorLuizRocha/Ma': '2104628', 'GovernadorNewtonBello/Ma': '2104651', 'GovernadorNunesFreire/Ma': '2104677', 'GraçaAranha/Ma': '2104701', 'Grajaú/Ma': '2104800', 'Guimarães/Ma': '2104909', 'HumbertoDeCampos/Ma': '2105005', 'Icatu/Ma': '2105104', 'IgarapéDoMeio/Ma': '2105153', 'IgarapéGrande/Ma': '2105203', 'Imperatriz/Ma': '2105302', 'ItaipavaDoGrajaú/Ma': '2105351', 'ItapecuruMirim/Ma': '2105401', 'ItingaDoMaranhão/Ma': '2105427', 'Jatobá/Ma': '2105450', 'JenipapoDosVieiras/Ma': '2105476', 'JoãoLisboa/Ma': '2105500', 'Joselândia/Ma': '2105609', 'JuncoDoMaranhão/Ma': '2105658', 'LagoDaPedra/Ma': '2105708', 'LagoDoJunco/Ma': '2105807', 'LagoVerde/Ma': '2105906', 'LagoaDoMato/Ma': '2105922', 'LagoDosRodrigues/Ma': '2105948', 'LagoaGrandeDoMaranhão/Ma': '2105963', 'LajeadoNovo/Ma': '2105989', 'LimaCampos/Ma': '2106003', 'Loreto/Ma': '2106102', 'LuísDomingues/Ma': '2106201', 'MagalhãesDeAlmeida/Ma': '2106300', 'Maracaçumé/Ma': '2106326', 'MarajáDoSena/Ma': '2106359', 'Maranhãozinho/Ma': '2106375', 'MataRoma/Ma': '2106409', 'Matinha/Ma': '2106508', 'Matões/Ma': '2106607', 'MatõesDoNorte/Ma': '2106631', 'MilagresDoMaranhão/Ma': '2106672', 'Mirador/Ma': '2106706', 'MirandaDoNorte/Ma': '2106755', 'Mirinzal/Ma': '2106805', 'Monção/Ma': '2106904', 'MontesAltos/Ma': '2107001', 'Morros/Ma': '2107100', 'NinaRodrigues/Ma': '2107209', 'NovaColinas/Ma': '2107258', 'NovaIorque/Ma': '2107308', 'NovaOlindaDoMaranhão/Ma': '2107357', "OlhoD'ÁguaDasCunhãs/Ma": '2107407', 'OlindaNovaDoMaranhão/Ma': '2107456', 'PaçoDoLumiar/Ma': '2107506', 'Palmeirândia/Ma': '2107605', 'Paraibano/Ma': '2107704', 'Parnarama/Ma': '2107803', 'PassagemFranca/Ma': '2107902', 'PastosBons/Ma': '2108009', 'PaulinoNeves/Ma': '2108058', 'PauloRamos/Ma': '2108108', 'Pedreiras/Ma': '2108207', 'PedroDoRosário/Ma': '2108256', 'Penalva/Ma': '2108306', 'PeriMirim/Ma': '2108405', 'Peritoró/Ma': '2108454', 'PindaréMirim/Ma': '2108504', 'Pinheiro/Ma': '2108603', 'PioXii/Ma': '2108702', 'Pirapemas/Ma': '2108801', 'PoçãoDePedras/Ma': '2108900', 'PortoFranco/Ma': '2109007', 'PortoRicoDoMaranhão/Ma': '2109056', 'PresidenteDutra/Ma': '2109106', 'PresidenteJuscelino/Ma': '2109205', 'PresidenteMédici/Ma': '2109239', 'PresidenteSarney/Ma': '2109270', 'PresidenteVargas/Ma': '2109304', 'PrimeiraCruz/Ma': '2109403', 'Raposa/Ma': '2109452', 'Riachão/Ma': '2109502', 'RibamarFiquene/Ma': '2109551', 'Rosário/Ma': '2109601', 'Sambaíba/Ma': '2109700', 'SantaFilomenaDoMaranhão/Ma': '2109759', 'SantaHelena/Ma': '2109809', 'SantaInês/Ma': '2109908', 'SantaLuzia/Ma': '2110005', 'SantaLuziaDoParuá/Ma': '2110039', 'SantaQuitériaDoMaranhão/Ma': '2110104', 'SantaRita/Ma': '2110203', 'SantanaDoMaranhão/Ma': '2110237', 'SantoAmaroDoMaranhão/Ma': '2110278', 'SantoAntônioDosLopes/Ma': '2110302', 'SãoBeneditoDoRioPreto/Ma': '2110401', 'SãoBento/Ma': '2110500', 'SãoBernardo/Ma': '2110609', 'SãoDomingosDoAzeitão/Ma': '2110658', 'SãoDomingosDoMaranhão/Ma': '2110708', 'SãoFélixDeBalsas/Ma': '2110807', 'SãoFranciscoDoBrejão/Ma': '2110856', 'SãoFranciscoDoMaranhão/Ma': '2110906', 'SãoJoãoBatista/Ma': '2111003', 'SãoJoãoDoCarú/Ma': '2111029', 'SãoJoãoDoParaíso/Ma': '2111052', 'SãoJoãoDoSoter/Ma': '2111078', 'SãoJoãoDosPatos/Ma': '2111102', 'SãoJoséDeRibamar/Ma': '2111201', 'SãoJoséDosBasílios/Ma': '2111250', 'SãoLuís/Ma': '2111300', 'SãoLuísGonzagaDoMaranhão/Ma': '2111409', 'SãoMateusDoMaranhão/Ma': '2111508', 'SãoPedroDaÁguaBranca/Ma': '2111532', 'SãoPedroDosCrentes/Ma': '2111573', 'SãoRaimundoDasMangabeiras/Ma': '2111607', 'SãoRaimundoDoDocaBezerra/Ma': '2111631', 'SãoRoberto/Ma': '2111672', 'SãoVicenteFerrer/Ma': '2111706', 'Satubinha/Ma': '2111722', 'SenadorAlexandreCosta/Ma': '2111748', 'SenadorLaRocque/Ma': '2111763', 'SerranoDoMaranhão/Ma': '2111789', 'SítioNovo/Ma': '2111805', 'SucupiraDoNorte/Ma': '2111904', 'SucupiraDoRiachão/Ma': '2111953', 'TassoFragoso/Ma': '2112001', 'Timbiras/Ma': '2112100', 'Timon/Ma': '2112209', 'TrizidelaDoVale/Ma': '2112233', 'Tufilândia/Ma': '2112274', 'Tuntum/Ma': '2112308', 'Turiaçu/Ma': '2112407', 'Turilândia/Ma': '2112456', 'Tutóia/Ma': '2112506', 'UrbanoSantos/Ma': '2112605', 'VargemGrande/Ma': '2112704', 'Viana/Ma': '2112803', 'VilaNovaDosMartírios/Ma': '2112852', 'VitóriaDoMearim/Ma': '2112902', 'VitorinoFreire/Ma': '2113009', 'ZéDoca/Ma': '2114007', 'Acauã/Pi': '2200053', 'Agricolândia/Pi': '2200103', 'ÁguaBranca/Pi': '2200202', 'AlagoinhaDoPiauí/Pi': '2200251', 'AlegreteDoPiauí/Pi': '2200277', 'AltoLongá/Pi': '2200301', 'Altos/Pi': '2200400', 'AlvoradaDoGurguéia/Pi': '2200459', 'Amarante/Pi': '2200509', 'AngicalDoPiauí/Pi': '2200608', 'AnísioDeAbreu/Pi': '2200707', 'AntônioAlmeida/Pi': '2200806', 'Aroazes/Pi': '2200905', 'AroeirasDoItaim/Pi': '2200954', 'Arraial/Pi': '2201002', 'AssunçãoDoPiauí/Pi': '2201051', 'AvelinoLopes/Pi': '2201101', 'BaixaGrandeDoRibeiro/Pi': '2201150', "BarraD'Alcântara/Pi": '2201176', 'Barras/Pi': '2201200', 'BarreirasDoPiauí/Pi': '2201309', 'BarroDuro/Pi': '2201408', 'Batalha/Pi': '2201507', 'BelaVistaDoPiauí/Pi': '2201556', 'BelémDoPiauí/Pi': '2201572', 'Beneditinos/Pi': '2201606', 'Bertolínia/Pi': '2201705', 'BetâniaDoPiauí/Pi': '2201739', 'BoaHora/Pi': '2201770', 'Bocaina/Pi': '2201804', 'BomJesus/Pi': '2201903', 'BomPrincípioDoPiauí/Pi': '2201919', 'BonfimDoPiauí/Pi': '2201929', 'BoqueirãoDoPiauí/Pi': '2201945', 'Brasileira/Pi': '2201960', 'BrejoDoPiauí/Pi': '2201988', 'BuritiDosLopes/Pi': '2202000', 'BuritiDosMontes/Pi': '2202026', 'CabeceirasDoPiauí/Pi': '2202059', 'CajazeirasDoPiauí/Pi': '2202075', 'CajueiroDaPraia/Pi': '2202083', 'CaldeirãoGrandeDoPiauí/Pi': '2202091', 'CampinasDoPiauí/Pi': '2202109', 'CampoAlegreDoFidalgo/Pi': '2202117', 'CampoGrandeDoPiauí/Pi': '2202133', 'CampoLargoDoPiauí/Pi': '2202174', 'CampoMaior/Pi': '2202208', 'Canavieira/Pi': '2202251', 'CantoDoBuriti/Pi': '2202307', 'CapitãoDeCampos/Pi': '2202406', 'CapitãoGervásioOliveira/Pi': '2202455', 'Caracol/Pi': '2202505', 'CaraúbasDoPiauí/Pi': '2202539', 'CaridadeDoPiauí/Pi': '2202554', 'CasteloDoPiauí/Pi': '2202604', 'Caxingó/Pi': '2202653', 'Cocal/Pi': '2202703', 'CocalDeTelha/Pi': '2202711', 'CocalDosAlves/Pi': '2202729', 'Coivaras/Pi': '2202737', 'ColôniaDoGurguéia/Pi': '2202752', 'ColôniaDoPiauí/Pi': '2202778', 'ConceiçãoDoCanindé/Pi': '2202802', 'CoronelJoséDias/Pi': '2202851', 'Corrente/Pi': '2202901', 'CristalândiaDoPiauí/Pi': '2203008', 'CristinoCastro/Pi': '2203107', 'Curimatá/Pi': '2203206', 'Currais/Pi': '2203230', 'Curralinhos/Pi': '2203255', 'CurralNovoDoPiauí/Pi': '2203271', 'DemervalLobão/Pi': '2203305', 'DirceuArcoverde/Pi': '2203354', 'DomExpeditoLopes/Pi': '2203404', 'DomingosMourão/Pi': '2203420', 'DomInocêncio/Pi': '2203453', 'ElesbãoVeloso/Pi': '2203503', 'EliseuMartins/Pi': '2203602', 'Esperantina/Pi': '2203701', 'FarturaDoPiauí/Pi': '2203750', 'FloresDoPiauí/Pi': '2203800', 'FlorestaDoPiauí/Pi': '2203859', 'Floriano/Pi': '2203909', 'Francinópolis/Pi': '2204006', 'FranciscoAyres/Pi': '2204105', 'FranciscoMacedo/Pi': '2204154', 'FranciscoSantos/Pi': '2204204', 'Fronteiras/Pi': '2204303', 'Geminiano/Pi': '2204352', 'Gilbués/Pi': '2204402', 'Guadalupe/Pi': '2204501', 'Guaribas/Pi': '2204550', 'HugoNapoleão/Pi': '2204600', 'IlhaGrande/Pi': '2204659', 'Inhuma/Pi': '2204709', 'IpirangaDoPiauí/Pi': '2204808', 'IsaíasCoelho/Pi': '2204907', 'Itainópolis/Pi': '2205003', 'Itaueira/Pi': '2205102', 'JacobinaDoPiauí/Pi': '2205151', 'Jaicós/Pi': '2205201', 'JardimDoMulato/Pi': '2205250', 'JatobáDoPiauí/Pi': '2205276', 'Jerumenha/Pi': '2205300', 'JoãoCosta/Pi': '2205359', 'JoaquimPires/Pi': '2205409', 'JocaMarques/Pi': '2205458', 'JoséDeFreitas/Pi': '2205508', 'JuazeiroDoPiauí/Pi': '2205516', 'JúlioBorges/Pi': '2205524', 'Jurema/Pi': '2205532', 'LagoinhaDoPiauí/Pi': '2205540', 'LagoaAlegre/Pi': '2205557', 'LagoaDoBarroDoPiauí/Pi': '2205565', 'LagoaDeSãoFrancisco/Pi': '2205573', 'LagoaDoPiauí/Pi': '2205581', 'LagoaDoSítio/Pi': '2205599', 'LandriSales/Pi': '2205607', 'LuísCorreia/Pi': '2205706', 'Luzilândia/Pi': '2205805', 'Madeiro/Pi': '2205854', 'ManoelEmídio/Pi': '2205904', 'Marcolândia/Pi': '2205953', 'MarcosParente/Pi': '2206001', 'MassapêDoPiauí/Pi': '2206050', 'MatiasOlímpio/Pi': '2206100', 'MiguelAlves/Pi': '2206209', 'MiguelLeão/Pi': '2206308', 'MiltonBrandão/Pi': '2206357', 'MonsenhorGil/Pi': '2206407', 'MonsenhorHipólito/Pi': '2206506', 'MonteAlegreDoPiauí/Pi': '2206605', 'MorroCabeçaNoTempo/Pi': '2206654', 'MorroDoChapéuDoPiauí/Pi': '2206670', 'MuriciDosPortelas/Pi': '2206696', 'NazaréDoPiauí/Pi': '2206704', 'Nazária/Pi': '2206720', 'NossaSenhoraDeNazaré/Pi': '2206753', 'NossaSenhoraDosRemédios/Pi': '2206803', 'NovoOrienteDoPiauí/Pi': '2206902', 'NovoSantoAntônio/Pi': '2206951', 'Oeiras/Pi': '2207009', "OlhoD'ÁguaDoPiauí/Pi": '2207108', 'PadreMarcos/Pi': '2207207', 'PaesLandim/Pi': '2207306', 'PajeúDoPiauí/Pi': '2207355', 'PalmeiraDoPiauí/Pi': '2207405', 'Palmeirais/Pi': '2207504', 'Paquetá/Pi': '2207553', 'Parnaguá/Pi': '2207603', 'Parnaíba/Pi': '2207702', 'PassagemFrancaDoPiauí/Pi': '2207751', 'PatosDoPiauí/Pi': '2207777', "PauD'ArcoDoPiauí/Pi": '2207793', 'Paulistana/Pi': '2207801', 'Pavussu/Pi': '2207850', 'PedroIi/Pi': '2207900', 'PedroLaurentino/Pi': '2207934', 'NovaSantaRita/Pi': '2207959', 'Picos/Pi': '2208007', 'Pimenteiras/Pi': '2208106', 'PioIx/Pi': '2208205', 'Piracuruca/Pi': '2208304', 'Piripiri/Pi': '2208403', 'Porto/Pi': '2208502', 'PortoAlegreDoPiauí/Pi': '2208551', 'PrataDoPiauí/Pi': '2208601', 'QueimadaNova/Pi': '2208650', 'RedençãoDoGurguéia/Pi': '2208700', 'Regeneração/Pi': '2208809', 'RiachoFrio/Pi': '2208858', 'RibeiraDoPiauí/Pi': '2208874', 'RibeiroGonçalves/Pi': '2208908', 'RioGrandeDoPiauí/Pi': '2209005', 'SantaCruzDoPiauí/Pi': '2209104', 'SantaCruzDosMilagres/Pi': '2209153', 'SantaFilomena/Pi': '2209203', 'SantaLuz/Pi': '2209302', 'SantanaDoPiauí/Pi': '2209351', 'SantaRosaDoPiauí/Pi': '2209377', 'SantoAntônioDeLisboa/Pi': '2209401', 'SantoAntônioDosMilagres/Pi': '2209450', 'SantoInácioDoPiauí/Pi': '2209500', 'SãoBrazDoPiauí/Pi': '2209559', 'SãoFélixDoPiauí/Pi': '2209609', 'SãoFranciscoDeAssisDoPiauí/Pi': '2209658', 'SãoFranciscoDoPiauí/Pi': '2209708', 'SãoGonçaloDoGurguéia/Pi': '2209757', 'SãoGonçaloDoPiauí/Pi': '2209807', 'SãoJoãoDaCanabrava/Pi': '2209856', 'SãoJoãoDaFronteira/Pi': '2209872', 'SãoJoãoDaSerra/Pi': '2209906', 'SãoJoãoDaVarjota/Pi': '2209955', 'SãoJoãoDoArraial/Pi': '2209971', 'SãoJoãoDoPiauí/Pi': '2210003', 'SãoJoséDoDivino/Pi': '2210052', 'SãoJoséDoPeixe/Pi': '2210102', 'SãoJoséDoPiauí/Pi': '2210201', 'SãoJulião/Pi': '2210300', 'SãoLourençoDoPiauí/Pi': '2210359', 'SãoLuisDoPiauí/Pi': '2210375', 'SãoMiguelDaBaixaGrande/Pi': '2210383', 'SãoMiguelDoFidalgo/Pi': '2210391', 'SãoMiguelDoTapuio/Pi': '2210409', 'SãoPedroDoPiauí/Pi': '2210508', 'SãoRaimundoNonato/Pi': '2210607', 'SebastiãoBarros/Pi': '2210623', 'SebastiãoLeal/Pi': '2210631', 'SigefredoPacheco/Pi': '2210656', 'Simões/Pi': '2210706', 'SimplícioMendes/Pi': '2210805', 'SocorroDoPiauí/Pi': '2210904', 'Sussuapara/Pi': '2210938', 'TamborilDoPiauí/Pi': '2210953', 'TanqueDoPiauí/Pi': '2210979', 'Teresina/Pi': '2211001', 'União/Pi': '2211100', 'Uruçuí/Pi': '2211209', 'ValençaDoPiauí/Pi': '2211308', 'VárzeaBranca/Pi': '2211357', 'VárzeaGrande/Pi': '2211407', 'VeraMendes/Pi': '2211506', 'VilaNovaDoPiauí/Pi': '2211605', 'WallFerraz/Pi': '2211704', 'Abaiara/Ce': '2300101', 'Acarape/Ce': '2300150', 'Acaraú/Ce': '2300200', 'Acopiara/Ce': '2300309', 'Aiuaba/Ce': '2300408', 'Alcântaras/Ce': '2300507', 'Altaneira/Ce': '2300606', 'AltoSanto/Ce': '2300705', 'Amontada/Ce': '2300754', 'AntoninaDoNorte/Ce': '2300804', 'Apuiarés/Ce': '2300903', 'Aquiraz/Ce': '2301000', 'Aracati/Ce': '2301109', 'Aracoiaba/Ce': '2301208', 'Ararendá/Ce': '2301257', 'Araripe/Ce': '2301307', 'Aratuba/Ce': '2301406', 'Arneiroz/Ce': '2301505', 'Assaré/Ce': '2301604', 'Aurora/Ce': '2301703', 'Baixio/Ce': '2301802', 'Banabuiú/Ce': '2301851', 'Barbalha/Ce': '2301901', 'Barreira/Ce': '2301950', 'Barro/Ce': '2302008', 'Barroquinha/Ce': '2302057', 'Baturité/Ce': '2302107', 'Beberibe/Ce': '2302206', 'BelaCruz/Ce': '2302305', 'BoaViagem/Ce': '2302404', 'BrejoSanto/Ce': '2302503', 'Camocim/Ce': '2302602', 'CamposSales/Ce': '2302701', 'Canindé/Ce': '2302800', 'Capistrano/Ce': '2302909', 'Caridade/Ce': '2303006', 'Cariré/Ce': '2303105', 'Caririaçu/Ce': '2303204', 'Cariús/Ce': '2303303', 'Carnaubal/Ce': '2303402', 'Cascavel/Ce': '2303501', 'Catarina/Ce': '2303600', 'Catunda/Ce': '2303659', 'Caucaia/Ce': '2303709', 'Cedro/Ce': '2303808', 'Chaval/Ce': '2303907', 'Choró/Ce': '2303931', 'Chorozinho/Ce': '2303956', 'Coreaú/Ce': '2304004', 'Crateús/Ce': '2304103', 'Crato/Ce': '2304202', 'Croatá/Ce': '2304236', 'Cruz/Ce': '2304251', 'DeputadoIrapuanPinheiro/Ce': '2304269', 'Ererê/Ce': '2304277', 'Eusébio/Ce': '2304285', 'FariasBrito/Ce': '2304301', 'Forquilha/Ce': '2304350', 'Fortaleza/Ce': '2304400', 'Fortim/Ce': '2304459', 'Frecheirinha/Ce': '2304509', 'GeneralSampaio/Ce': '2304608', 'Graça/Ce': '2304657', 'Granja/Ce': '2304707', 'Granjeiro/Ce': '2304806', 'Groaíras/Ce': '2304905', 'Guaiúba/Ce': '2304954', 'GuaraciabaDoNorte/Ce': '2305001', 'Guaramiranga/Ce': '2305100', 'Hidrolândia/Ce': '2305209', 'Horizonte/Ce': '2305233', 'Ibaretama/Ce': '2305266', 'Ibiapina/Ce': '2305308', 'Ibicuitinga/Ce': '2305332', 'Icapuí/Ce': '2305357', 'Icó/Ce': '2305407', 'Iguatu/Ce': '2305506', 'Independência/Ce': '2305605', 'Ipaporanga/Ce': '2305654', 'Ipaumirim/Ce': '2305704', 'Ipu/Ce': '2305803', 'Ipueiras/Ce': '2305902', 'Iracema/Ce': '2306009', 'Irauçuba/Ce': '2306108', 'Itaiçaba/Ce': '2306207', 'Itaitinga/Ce': '2306256', 'Itapajé/Ce': '2306306', 'Itapipoca/Ce': '2306405', 'Itapiúna/Ce': '2306504', 'Itarema/Ce': '2306553', 'Itatira/Ce': '2306603', 'Jaguaretama/Ce': '2306702', 'Jaguaribara/Ce': '2306801', 'Jaguaribe/Ce': '2306900', 'Jaguaruana/Ce': '2307007', 'Jardim/Ce': '2307106', 'Jati/Ce': '2307205', 'JijocaDeJericoacoara/Ce': '2307254', 'JuazeiroDoNorte/Ce': '2307304', 'Jucás/Ce': '2307403', 'LavrasDaMangabeira/Ce': '2307502', 'LimoeiroDoNorte/Ce': '2307601', 'Madalena/Ce': '2307635', 'Maracanaú/Ce': '2307650', 'Maranguape/Ce': '2307700', 'Marco/Ce': '2307809', 'Martinópole/Ce': '2307908', 'Massapê/Ce': '2308005', 'Mauriti/Ce': '2308104', 'Meruoca/Ce': '2308203', 'Milagres/Ce': '2308302', 'Milhã/Ce': '2308351', 'Miraíma/Ce': '2308377', 'MissãoVelha/Ce': '2308401', 'Mombaça/Ce': '2308500', 'MonsenhorTabosa/Ce': '2308609', 'MoradaNova/Ce': '2308708', 'Moraújo/Ce': '2308807', 'Morrinhos/Ce': '2308906', 'Mucambo/Ce': '2309003', 'Mulungu/Ce': '2309102', 'NovaOlinda/Ce': '2309201', 'NovaRussas/Ce': '2309300', 'NovoOriente/Ce': '2309409', 'Ocara/Ce': '2309458', 'Orós/Ce': '2309508', 'Pacajus/Ce': '2309607', 'Pacatuba/Ce': '2309706', 'Pacoti/Ce': '2309805', 'Pacujá/Ce': '2309904', 'Palhano/Ce': '2310001', 'Palmácia/Ce': '2310100', 'Paracuru/Ce': '2310209', 'Paraipaba/Ce': '2310258', 'Parambu/Ce': '2310308', 'Paramoti/Ce': '2310407', 'PedraBranca/Ce': '2310506', 'Penaforte/Ce': '2310605', 'Pentecoste/Ce': '2310704', 'Pereiro/Ce': '2310803', 'Pindoretama/Ce': '2310852', 'PiquetCarneiro/Ce': '2310902', 'PiresFerreira/Ce': '2310951', 'Poranga/Ce': '2311009', 'Porteiras/Ce': '2311108', 'Potengi/Ce': '2311207', 'Potiretama/Ce': '2311231', 'Quiterianópolis/Ce': '2311264', 'Quixadá/Ce': '2311306', 'Quixelô/Ce': '2311355', 'Quixeramobim/Ce': '2311405', 'Quixeré/Ce': '2311504', 'Redenção/Ce': '2311603', 'Reriutaba/Ce': '2311702', 'Russas/Ce': '2311801', 'Saboeiro/Ce': '2311900', 'Salitre/Ce': '2311959', 'SantanaDoAcaraú/Ce': '2312007', 'SantanaDoCariri/Ce': '2312106', 'SantaQuitéria/Ce': '2312205', 'SãoBenedito/Ce': '2312304', 'SãoGonçaloDoAmarante/Ce': '2312403', 'SãoJoãoDoJaguaribe/Ce': '2312502', 'SãoLuísDoCuru/Ce': '2312601', 'SenadorPompeu/Ce': '2312700', 'SenadorSá/Ce': '2312809', 'Sobral/Ce': '2312908', 'Solonópole/Ce': '2313005', 'TabuleiroDoNorte/Ce': '2313104', 'Tamboril/Ce': '2313203', 'Tarrafas/Ce': '2313252', 'Tauá/Ce': '2313302', 'Tejuçuoca/Ce': '2313351', 'Tianguá/Ce': '2313401', 'Trairi/Ce': '2313500', 'Tururu/Ce': '2313559', 'Ubajara/Ce': '2313609', 'Umari/Ce': '2313708', 'Umirim/Ce': '2313757', 'Uruburetama/Ce': '2313807', 'Uruoca/Ce': '2313906', 'Varjota/Ce': '2313955', 'VárzeaAlegre/Ce': '2314003', 'ViçosaDoCeará/Ce': '2314102', 'Acari/Rn': '2400109', 'Açu/Rn': '2400208', 'AfonsoBezerra/Rn': '2400307', 'ÁguaNova/Rn': '2400406', 'Alexandria/Rn': '2400505', 'AlminoAfonso/Rn': '2400604', 'AltoDoRodrigues/Rn': '2400703', 'Angicos/Rn': '2400802', 'AntônioMartins/Rn': '2400901', 'Apodi/Rn': '2401008', 'AreiaBranca/Rn': '2401107', 'Arês/Rn': '2401206', 'AugustoSevero/Rn': '2401305', 'BaíaFormosa/Rn': '2401404', 'Baraúna/Rn': '2401453', 'Barcelona/Rn': '2401503', 'BentoFernandes/Rn': '2401602', 'Bodó/Rn': '2401651', 'BomJesus/Rn': '2401701', 'Brejinho/Rn': '2401800', 'CaiçaraDoNorte/Rn': '2401859', 'CaiçaraDoRioDoVento/Rn': '2401909', 'Caicó/Rn': '2402006', 'CampoRedondo/Rn': '2402105', 'Canguaretama/Rn': '2402204', 'Caraúbas/Rn': '2402303', 'CarnaúbaDosDantas/Rn': '2402402', 'Carnaubais/Rn': '2402501', 'CearáMirim/Rn': '2402600', 'CerroCorá/Rn': '2402709', 'CoronelEzequiel/Rn': '2402808', 'CoronelJoãoPessoa/Rn': '2402907', 'Cruzeta/Rn': '2403004', 'CurraisNovos/Rn': '2403103', 'DoutorSeveriano/Rn': '2403202', 'Parnamirim/Rn': '2403251', 'Encanto/Rn': '2403301', 'Equador/Rn': '2403400', 'EspíritoSanto/Rn': '2403509', 'Extremoz/Rn': '2403608', 'FelipeGuerra/Rn': '2403707', 'FernandoPedroza/Rn': '2403756', 'Florânia/Rn': '2403806', 'FranciscoDantas/Rn': '2403905', 'FrutuosoGomes/Rn': '2404002', 'Galinhos/Rn': '2404101', 'Goianinha/Rn': '2404200', 'GovernadorDixSeptRosado/Rn': '2404309', 'Grossos/Rn': '2404408', 'Guamaré/Rn': '2404507', 'IelmoMarinho/Rn': '2404606', 'Ipanguaçu/Rn': '2404705', 'Ipueira/Rn': '2404804', 'Itajá/Rn': '2404853', 'Itaú/Rn': '2404903', 'Jaçanã/Rn': '2405009', 'Jandaíra/Rn': '2405108', 'Janduís/Rn': '2405207', 'JanuárioCicco/Rn': '2405306', 'Japi/Rn': '2405405', 'JardimDeAngicos/Rn': '2405504', 'JardimDePiranhas/Rn': '2405603', 'JardimDoSeridó/Rn': '2405702', 'JoãoCâmara/Rn': '2405801', 'JoãoDias/Rn': '2405900', 'JoséDaPenha/Rn': '2406007', 'Jucurutu/Rn': '2406106', 'Jundiá/Rn': '2406155', "LagoaD'Anta/Rn": '2406205', 'LagoaDePedras/Rn': '2406304', 'LagoaDeVelhos/Rn': '2406403', 'LagoaNova/Rn': '2406502', 'LagoaSalgada/Rn': '2406601', 'Lajes/Rn': '2406700', 'LajesPintadas/Rn': '2406809', 'Lucrécia/Rn': '2406908', 'LuísGomes/Rn': '2407005', 'Macaíba/Rn': '2407104', 'Macau/Rn': '2407203', 'MajorSales/Rn': '2407252', 'MarcelinoVieira/Rn': '2407302', 'Martins/Rn': '2407401', 'Maxaranguape/Rn': '2407500', 'MessiasTargino/Rn': '2407609', 'Montanhas/Rn': '2407708', 'MonteAlegre/Rn': '2407807', 'MonteDasGameleiras/Rn': '2407906', 'Mossoró/Rn': '2408003', 'Natal/Rn': '2408102', 'NísiaFloresta/Rn': '2408201', 'NovaCruz/Rn': '2408300', "OlhoD'ÁguaDoBorges/Rn": '2408409', 'OuroBranco/Rn': '2408508', 'Paraná/Rn': '2408607', 'Paraú/Rn': '2408706', 'Parazinho/Rn': '2408805', 'Parelhas/Rn': '2408904', 'RioDoFogo/Rn': '2408953', 'PassaEFica/Rn': '2409100', 'Passagem/Rn': '2409209', 'Patu/Rn': '2409308', 'SantaMaria/Rn': '2409332', 'PauDosFerros/Rn': '2409407', 'PedraGrande/Rn': '2409506', 'PedraPreta/Rn': '2409605', 'PedroAvelino/Rn': '2409704', 'PedroVelho/Rn': '2409803', 'Pendências/Rn': '2409902', 'Pilões/Rn': '2410009', 'PoçoBranco/Rn': '2410108', 'Portalegre/Rn': '2410207', 'PortoDoMangue/Rn': '2410256', 'SerraCaiada/Rn': '2410306', 'Pureza/Rn': '2410405', 'RafaelFernandes/Rn': '2410504', 'RafaelGodeiro/Rn': '2410603', 'RiachoDaCruz/Rn': '2410702', 'RiachoDeSantana/Rn': '2410801', 'Riachuelo/Rn': '2410900', 'RodolfoFernandes/Rn': '2411007', 'Tibau/Rn': '2411056', 'RuyBarbosa/Rn': '2411106', 'SantaCruz/Rn': '2411205', 'SantanaDoMatos/Rn': '2411403', 'SantanaDoSeridó/Rn': '2411429', 'SantoAntônio/Rn': '2411502', 'SãoBentoDoNorte/Rn': '2411601', 'SãoBentoDoTrairí/Rn': '2411700', 'SãoFernando/Rn': '2411809', 'SãoFranciscoDoOeste/Rn': '2411908', 'SãoGonçaloDoAmarante/Rn': '2412005', 'SãoJoãoDoSabugi/Rn': '2412104', 'SãoJoséDeMipibu/Rn': '2412203', 'SãoJoséDoCampestre/Rn': '2412302', 'SãoJoséDoSeridó/Rn': '2412401', 'SãoMiguel/Rn': '2412500', 'SãoMiguelDoGostoso/Rn': '2412559', 'SãoPauloDoPotengi/Rn': '2412609', 'SãoPedro/Rn': '2412708', 'SãoRafael/Rn': '2412807', 'SãoTomé/Rn': '2412906', 'SãoVicente/Rn': '2413003', 'SenadorElóiDeSouza/Rn': '2413102', 'SenadorGeorginoAvelino/Rn': '2413201', 'SerraDeSãoBento/Rn': '2413300', 'SerraDoMel/Rn': '2413359', 'SerraNegraDoNorte/Rn': '2413409', 'Serrinha/Rn': '2413508', 'SerrinhaDosPintos/Rn': '2413557', 'SeverianoMelo/Rn': '2413607', 'SítioNovo/Rn': '2413706', 'TaboleiroGrande/Rn': '2413805', 'Taipu/Rn': '2413904', 'Tangará/Rn': '2414001', 'TenenteAnanias/Rn': '2414100', 'TenenteLaurentinoCruz/Rn': '2414159', 'TibauDoSul/Rn': '2414209', 'TimbaúbaDosBatistas/Rn': '2414308', 'Touros/Rn': '2414407', 'TriunfoPotiguar/Rn': '2414456', 'Umarizal/Rn': '2414506', 'Upanema/Rn': '2414605', 'Várzea/Rn': '2414704', 'VenhaVer/Rn': '2414753', 'VeraCruz/Rn': '2414803', 'Viçosa/Rn': '2414902', 'VilaFlor/Rn': '2415008', 'ÁguaBranca/Pb': '2500106', 'Aguiar/Pb': '2500205', 'AlagoaGrande/Pb': '2500304', 'AlagoaNova/Pb': '2500403', 'Alagoinha/Pb': '2500502', 'Alcantil/Pb': '2500536', 'AlgodãoDeJandaíra/Pb': '2500577', 'Alhandra/Pb': '2500601', 'SãoJoãoDoRioDoPeixe/Pb': '2500700', 'Amparo/Pb': '2500734', 'Aparecida/Pb': '2500775', 'Araçagi/Pb': '2500809', 'Arara/Pb': '2500908', 'Araruna/Pb': '2501005', 'Areia/Pb': '2501104', 'AreiaDeBaraúnas/Pb': '2501153', 'Areial/Pb': '2501203', 'Aroeiras/Pb': '2501302', 'Assunção/Pb': '2501351', 'BaíaDaTraição/Pb': '2501401', 'Bananeiras/Pb': '2501500', 'Baraúna/Pb': '2501534', 'BarraDeSantana/Pb': '2501575', 'BarraDeSantaRosa/Pb': '2501609', 'BarraDeSãoMiguel/Pb': '2501708', 'Bayeux/Pb': '2501807', 'Belém/Pb': '2501906', 'BelémDoBrejoDoCruz/Pb': '2502003', 'BernardinoBatista/Pb': '2502052', 'BoaVentura/Pb': '2502102', 'BoaVista/Pb': '2502151', 'BomJesus/Pb': '2502201', 'BomSucesso/Pb': '2502300', 'BonitoDeSantaFé/Pb': '2502409', 'Boqueirão/Pb': '2502508', 'Igaracy/Pb': '2502607', 'Borborema/Pb': '2502706', 'BrejoDoCruz/Pb': '2502805', 'BrejoDosSantos/Pb': '2502904', 'Caaporã/Pb': '2503001', 'Cabaceiras/Pb': '2503100', 'Cabedelo/Pb': '2503209', 'CachoeiraDosÍndios/Pb': '2503308', 'CacimbaDeAreia/Pb': '2503407', 'CacimbaDeDentro/Pb': '2503506', 'Cacimbas/Pb': '2503555', 'Caiçara/Pb': '2503605', 'Cajazeiras/Pb': '2503704', 'Cajazeirinhas/Pb': '2503753', 'CaldasBrandão/Pb': '2503803', 'Camalaú/Pb': '2503902', 'CampinaGrande/Pb': '2504009', 'Capim/Pb': '2504033', 'Caraúbas/Pb': '2504074', 'Carrapateira/Pb': '2504108', 'Casserengue/Pb': '2504157', 'Catingueira/Pb': '2504207', 'CatoléDoRocha/Pb': '2504306', 'Caturité/Pb': '2504355', 'Conceição/Pb': '2504405', 'Condado/Pb': '2504504', 'Conde/Pb': '2504603', 'Congo/Pb': '2504702', 'Coremas/Pb': '2504801', 'Coxixola/Pb': '2504850', 'CruzDoEspíritoSanto/Pb': '2504900', 'Cubati/Pb': '2505006', 'Cuité/Pb': '2505105', 'Cuitegi/Pb': '2505204', 'CuitéDeMamanguape/Pb': '2505238', 'CurralDeCima/Pb': '2505279', 'CurralVelho/Pb': '2505303', 'Damião/Pb': '2505352', 'Desterro/Pb': '2505402', 'VistaSerrana/Pb': '2505501', 'Diamante/Pb': '2505600', 'DonaInês/Pb': '2505709', 'DuasEstradas/Pb': '2505808', 'Emas/Pb': '2505907', 'Esperança/Pb': '2506004', 'Fagundes/Pb': '2506103', 'FreiMartinho/Pb': '2506202', 'GadoBravo/Pb': '2506251', 'Guarabira/Pb': '2506301', 'Gurinhém/Pb': '2506400', 'Gurjão/Pb': '2506509', 'Ibiara/Pb': '2506608', 'Imaculada/Pb': '2506707', 'Ingá/Pb': '2506806', 'Itabaiana/Pb': '2506905', 'Itaporanga/Pb': '2507002', 'Itapororoca/Pb': '2507101', 'Itatuba/Pb': '2507200', 'Jacaraú/Pb': '2507309', 'Jericó/Pb': '2507408', 'JoãoPessoa/Pb': '2507507', 'JuarezTávora/Pb': '2507606', 'Juazeirinho/Pb': '2507705', 'JuncoDoSeridó/Pb': '2507804', 'Juripiranga/Pb': '2507903', 'Juru/Pb': '2508000', 'Lagoa/Pb': '2508109', 'LagoaDeDentro/Pb': '2508208', 'LagoaSeca/Pb': '2508307', 'Lastro/Pb': '2508406', 'Livramento/Pb': '2508505', 'Logradouro/Pb': '2508554', 'Lucena/Pb': '2508604', "MãeD'Água/Pb": '2508703', 'Malta/Pb': '2508802', 'Mamanguape/Pb': '2508901', 'Manaíra/Pb': '2509008', 'Marcação/Pb': '2509057', 'Mari/Pb': '2509107', 'Marizópolis/Pb': '2509156', 'Massaranduba/Pb': '2509206', 'Mataraca/Pb': '2509305', 'Matinhas/Pb': '2509339', 'MatoGrosso/Pb': '2509370', 'Maturéia/Pb': '2509396', 'Mogeiro/Pb': '2509404', 'Montadas/Pb': '2509503', 'MonteHorebe/Pb': '2509602', 'Monteiro/Pb': '2509701', 'Mulungu/Pb': '2509800', 'Natuba/Pb': '2509909', 'Nazarezinho/Pb': '2510006', 'NovaFloresta/Pb': '2510105', 'NovaOlinda/Pb': '2510204', 'NovaPalmeira/Pb': '2510303', "OlhoD'Água/Pb": '2510402', 'Olivedos/Pb': '2510501', 'OuroVelho/Pb': '2510600', 'Parari/Pb': '2510659', 'Passagem/Pb': '2510709', 'Patos/Pb': '2510808', 'Paulista/Pb': '2510907', 'PedraBranca/Pb': '2511004', 'PedraLavrada/Pb': '2511103', 'PedrasDeFogo/Pb': '2511202', 'Piancó/Pb': '2511301', 'Picuí/Pb': '2511400', 'Pilar/Pb': '2511509', 'Pilões/Pb': '2511608', 'Pilõezinhos/Pb': '2511707', 'Pirpirituba/Pb': '2511806', 'Pitimbu/Pb': '2511905', 'Pocinhos/Pb': '2512002', 'PoçoDantas/Pb': '2512036', 'PoçoDeJoséDeMoura/Pb': '2512077', 'Pombal/Pb': '2512101', 'Prata/Pb': '2512200', 'PrincesaIsabel/Pb': '2512309', 'Puxinanã/Pb': '2512408', 'Queimadas/Pb': '2512507', 'Quixaba/Pb': '2512606', 'Remígio/Pb': '2512705', 'PedroRégis/Pb': '2512721', 'Riachão/Pb': '2512747', 'RiachãoDoBacamarte/Pb': '2512754', 'RiachãoDoPoço/Pb': '2512762', 'RiachoDeSantoAntônio/Pb': '2512788', 'RiachoDosCavalos/Pb': '2512804', 'RioTinto/Pb': '2512903', 'Salgadinho/Pb': '2513000', 'SalgadoDeSãoFélix/Pb': '2513109', 'SantaCecília/Pb': '2513158', 'SantaCruz/Pb': '2513208', 'SantaHelena/Pb': '2513307', 'SantaInês/Pb': '2513356', 'SantaLuzia/Pb': '2513406', 'SantanaDeMangueira/Pb': '2513505', 'SantanaDosGarrotes/Pb': '2513604', 'JocaClaudino/Pb': '2513653', 'SantaRita/Pb': '2513703', 'SantaTeresinha/Pb': '2513802', 'SantoAndré/Pb': '2513851', 'SãoBento/Pb': '2513901', 'SãoBentinho/Pb': '2513927', 'SãoDomingosDoCariri/Pb': '2513943', 'SãoDomingos/Pb': '2513968', 'SãoFrancisco/Pb': '2513984', 'SãoJoãoDoCariri/Pb': '2514008', 'SãoJoãoDoTigre/Pb': '2514107', 'SãoJoséDaLagoaTapada/Pb': '2514206', 'SãoJoséDeCaiana/Pb': '2514305', 'SãoJoséDeEspinharas/Pb': '2514404', 'SãoJoséDosRamos/Pb': '2514453', 'SãoJoséDePiranhas/Pb': '2514503', 'SãoJoséDePrincesa/Pb': '2514552', 'SãoJoséDoBonfim/Pb': '2514602', 'SãoJoséDoBrejoDoCruz/Pb': '2514651', 'SãoJoséDoSabugi/Pb': '2514701', 'SãoJoséDosCordeiros/Pb': '2514800', 'SãoMamede/Pb': '2514909', 'SãoMiguelDeTaipu/Pb': '2515005', 'SãoSebastiãoDeLagoaDeRoça/Pb': '2515104', 'SãoSebastiãoDoUmbuzeiro/Pb': '2515203', 'Sapé/Pb': '2515302', 'SãoVicenteDoSeridó/Pb': '2515401', 'SerraBranca/Pb': '2515500', 'SerraDaRaiz/Pb': '2515609', 'SerraGrande/Pb': '2515708', 'SerraRedonda/Pb': '2515807', 'Serraria/Pb': '2515906', 'Sertãozinho/Pb': '2515930', 'Sobrado/Pb': '2515971', 'Solânea/Pb': '2516003', 'Soledade/Pb': '2516102', 'Sossêgo/Pb': '2516151', 'Sousa/Pb': '2516201', 'Sumé/Pb': '2516300', 'Tacima/Pb': '2516409', 'Taperoá/Pb': '2516508', 'Tavares/Pb': '2516607', 'Teixeira/Pb': '2516706', 'Tenório/Pb': '2516755', 'Triunfo/Pb': '2516805', 'Uiraúna/Pb': '2516904', 'Umbuzeiro/Pb': '2517001', 'Várzea/Pb': '2517100', 'Vieirópolis/Pb': '2517209', 'Zabelê/Pb': '2517407', 'AbreuELima/Pe': '2600054', 'AfogadosDaIngazeira/Pe': '2600104', 'Afrânio/Pe': '2600203', 'Agrestina/Pe': '2600302', 'ÁguaPreta/Pe': '2600401', 'ÁguasBelas/Pe': '2600500', 'Alagoinha/Pe': '2600609', 'Aliança/Pe': '2600708', 'Altinho/Pe': '2600807', 'Amaraji/Pe': '2600906', 'Angelim/Pe': '2601003', 'Araçoiaba/Pe': '2601052', 'Araripina/Pe': '2601102', 'Arcoverde/Pe': '2601201', 'BarraDeGuabiraba/Pe': '2601300', 'Barreiros/Pe': '2601409', 'BelémDeMaria/Pe': '2601508', 'BelémDoSãoFrancisco/Pe': '2601607', 'BeloJardim/Pe': '2601706', 'Betânia/Pe': '2601805', 'Bezerros/Pe': '2601904', 'Bodocó/Pe': '2602001', 'BomConselho/Pe': '2602100', 'BomJardim/Pe': '2602209', 'Bonito/Pe': '2602308', 'Brejão/Pe': '2602407', 'Brejinho/Pe': '2602506', 'BrejoDaMadreDeDeus/Pe': '2602605', 'BuenosAires/Pe': '2602704', 'Buíque/Pe': '2602803', 'CaboDeSantoAgostinho/Pe': '2602902', 'Cabrobó/Pe': '2603009', 'Cachoeirinha/Pe': '2603108', 'Caetés/Pe': '2603207', 'Calçado/Pe': '2603306', 'Calumbi/Pe': '2603405', 'Camaragibe/Pe': '2603454', 'CamocimDeSãoFélix/Pe': '2603504', 'Camutanga/Pe': '2603603', 'Canhotinho/Pe': '2603702', 'Capoeiras/Pe': '2603801', 'Carnaíba/Pe': '2603900', 'CarnaubeiraDaPenha/Pe': '2603926', 'Carpina/Pe': '2604007', 'Caruaru/Pe': '2604106', 'Casinhas/Pe': '2604155', 'Catende/Pe': '2604205', 'Cedro/Pe': '2604304', 'ChãDeAlegria/Pe': '2604403', 'ChãGrande/Pe': '2604502', 'Condado/Pe': '2604601', 'Correntes/Pe': '2604700', 'Cortês/Pe': '2604809', 'Cumaru/Pe': '2604908', 'Cupira/Pe': '2605004', 'Custódia/Pe': '2605103', 'Dormentes/Pe': '2605152', 'Escada/Pe': '2605202', 'Exu/Pe': '2605301', 'FeiraNova/Pe': '2605400', 'FernandoDeNoronha/Pe': '2605459', 'Ferreiros/Pe': '2605509', 'Flores/Pe': '2605608', 'Floresta/Pe': '2605707', 'FreiMiguelinho/Pe': '2605806', 'Gameleira/Pe': '2605905', 'Garanhuns/Pe': '2606002', 'GlóriaDoGoitá/Pe': '2606101', 'Goiana/Pe': '2606200', 'Granito/Pe': '2606309', 'Gravatá/Pe': '2606408', 'Iati/Pe': '2606507', 'Ibimirim/Pe': '2606606', 'Ibirajuba/Pe': '2606705', 'Igarassu/Pe': '2606804', 'Iguaracy/Pe': '2606903', 'Inajá/Pe': '2607000', 'Ingazeira/Pe': '2607109', 'Ipojuca/Pe': '2607208', 'Ipubi/Pe': '2607307', 'Itacuruba/Pe': '2607406', 'Itaíba/Pe': '2607505', 'IlhaDeItamaracá/Pe': '2607604', 'Itambé/Pe': '2607653', 'Itapetim/Pe': '2607703', 'Itapissuma/Pe': '2607752', 'Itaquitinga/Pe': '2607802', 'JaboatãoDosGuararapes/Pe': '2607901', 'Jaqueira/Pe': '2607950', 'Jataúba/Pe': '2608008', 'Jatobá/Pe': '2608057', 'JoãoAlfredo/Pe': '2608107', 'JoaquimNabuco/Pe': '2608206', 'Jucati/Pe': '2608255', 'Jupi/Pe': '2608305', 'Jurema/Pe': '2608404', 'LagoaDoCarro/Pe': '2608453', 'LagoaDeItaenga/Pe': '2608503', 'LagoaDoOuro/Pe': '2608602', 'LagoaDosGatos/Pe': '2608701', 'LagoaGrande/Pe': '2608750', 'Lajedo/Pe': '2608800', 'Limoeiro/Pe': '2608909', 'Macaparana/Pe': '2609006', 'Machados/Pe': '2609105', 'Manari/Pe': '2609154', 'Maraial/Pe': '2609204', 'Mirandiba/Pe': '2609303', 'Moreno/Pe': '2609402', 'NazaréDaMata/Pe': '2609501', 'Olinda/Pe': '2609600', 'Orobó/Pe': '2609709', 'Orocó/Pe': '2609808', 'Ouricuri/Pe': '2609907', 'Palmares/Pe': '2610004', 'Palmeirina/Pe': '2610103', 'Panelas/Pe': '2610202', 'Paranatama/Pe': '2610301', 'Parnamirim/Pe': '2610400', 'Passira/Pe': '2610509', 'Paudalho/Pe': '2610608', 'Paulista/Pe': '2610707', 'Pedra/Pe': '2610806', 'Pesqueira/Pe': '2610905', 'Petrolândia/Pe': '2611002', 'Petrolina/Pe': '2611101', 'Poção/Pe': '2611200', 'Pombos/Pe': '2611309', 'Primavera/Pe': '2611408', 'Quipapá/Pe': '2611507', 'Quixaba/Pe': '2611533', 'Recife/Pe': '2611606', 'RiachoDasAlmas/Pe': '2611705', 'Ribeirão/Pe': '2611804', 'RioFormoso/Pe': '2611903', 'Sairé/Pe': '2612000', 'Salgadinho/Pe': '2612109', 'Salgueiro/Pe': '2612208', 'Saloá/Pe': '2612307', 'Sanharó/Pe': '2612406', 'SantaCruz/Pe': '2612455', 'SantaCruzDaBaixaVerde/Pe': '2612471', 'SantaCruzDoCapibaribe/Pe': '2612505', 'SantaFilomena/Pe': '2612554', 'SantaMariaDaBoaVista/Pe': '2612604', 'SantaMariaDoCambucá/Pe': '2612703', 'SantaTerezinha/Pe': '2612802', 'SãoBeneditoDoSul/Pe': '2612901', 'SãoBentoDoUna/Pe': '2613008', 'SãoCaitano/Pe': '2613107', 'SãoJoão/Pe': '2613206', 'SãoJoaquimDoMonte/Pe': '2613305', 'SãoJoséDaCoroaGrande/Pe': '2613404', 'SãoJoséDoBelmonte/Pe': '2613503', 'SãoJoséDoEgito/Pe': '2613602', 'SãoLourençoDaMata/Pe': '2613701', 'SãoVicenteFérrer/Pe': '2613800', 'SerraTalhada/Pe': '2613909', 'Serrita/Pe': '2614006', 'Sertânia/Pe': '2614105', 'Sirinhaém/Pe': '2614204', 'Moreilândia/Pe': '2614303', 'Solidão/Pe': '2614402', 'Surubim/Pe': '2614501', 'Tabira/Pe': '2614600', 'Tacaimbó/Pe': '2614709', 'Tacaratu/Pe': '2614808', 'Tamandaré/Pe': '2614857', 'TaquaritingaDoNorte/Pe': '2615003', 'Terezinha/Pe': '2615102', 'TerraNova/Pe': '2615201', 'Timbaúba/Pe': '2615300', 'Toritama/Pe': '2615409', 'Tracunhaém/Pe': '2615508', 'Trindade/Pe': '2615607', 'Triunfo/Pe': '2615706', 'Tupanatinga/Pe': '2615805', 'Tuparetama/Pe': '2615904', 'Venturosa/Pe': '2616001', 'Verdejante/Pe': '2616100', 'VertenteDoLério/Pe': '2616183', 'Vertentes/Pe': '2616209', 'Vicência/Pe': '2616308', 'VitóriaDeSantoAntão/Pe': '2616407', 'Xexéu/Pe': '2616506', 'ÁguaBranca/Al': '2700102', 'Anadia/Al': '2700201', 'Arapiraca/Al': '2700300', 'Atalaia/Al': '2700409', 'BarraDeSantoAntônio/Al': '2700508', 'BarraDeSãoMiguel/Al': '2700607', 'Batalha/Al': '2700706', 'Belém/Al': '2700805', 'BeloMonte/Al': '2700904', 'BocaDaMata/Al': '2701001', 'Branquinha/Al': '2701100', 'Cacimbinhas/Al': '2701209', 'Cajueiro/Al': '2701308', 'Campestre/Al': '2701357', 'CampoAlegre/Al': '2701407', 'CampoGrande/Al': '2701506', 'Canapi/Al': '2701605', 'Capela/Al': '2701704', 'Carneiros/Al': '2701803', 'ChãPreta/Al': '2701902', 'CoitéDoNóia/Al': '2702009', 'ColôniaLeopoldina/Al': '2702108', 'CoqueiroSeco/Al': '2702207', 'Coruripe/Al': '2702306', 'Craíbas/Al': '2702355', 'DelmiroGouveia/Al': '2702405', 'DoisRiachos/Al': '2702504', 'EstrelaDeAlagoas/Al': '2702553', 'FeiraGrande/Al': '2702603', 'FelizDeserto/Al': '2702702', 'Flexeiras/Al': '2702801', 'GirauDoPonciano/Al': '2702900', 'Ibateguara/Al': '2703007', 'Igaci/Al': '2703106', 'IgrejaNova/Al': '2703205', 'Inhapi/Al': '2703304', 'JacaréDosHomens/Al': '2703403', 'Jacuípe/Al': '2703502', 'Japaratinga/Al': '2703601', 'Jaramataia/Al': '2703700', 'JequiáDaPraia/Al': '2703759', 'JoaquimGomes/Al': '2703809', 'Jundiá/Al': '2703908', 'Junqueiro/Al': '2704005', 'LagoaDaCanoa/Al': '2704104', 'LimoeiroDeAnadia/Al': '2704203', 'Maceió/Al': '2704302', 'MajorIsidoro/Al': '2704401', 'Maragogi/Al': '2704500', 'Maravilha/Al': '2704609', 'MarechalDeodoro/Al': '2704708', 'Maribondo/Al': '2704807', 'MarVermelho/Al': '2704906', 'MataGrande/Al': '2705002', 'MatrizDeCamaragibe/Al': '2705101', 'Messias/Al': '2705200', 'MinadorDoNegrão/Al': '2705309', 'Monteirópolis/Al': '2705408', 'Murici/Al': '2705507', 'NovoLino/Al': '2705606', "OlhoD'ÁguaDasFlores/Al": '2705705', "OlhoD'ÁguaDoCasado/Al": '2705804', "OlhoD'ÁguaGrande/Al": '2705903', 'Olivença/Al': '2706000', 'OuroBranco/Al': '2706109', 'Palestina/Al': '2706208', 'PalmeiraDosÍndios/Al': '2706307', 'PãoDeAçúcar/Al': '2706406', 'Pariconha/Al': '2706422', 'Paripueira/Al': '2706448', 'PassoDeCamaragibe/Al': '2706505', 'PauloJacinto/Al': '2706604', 'Penedo/Al': '2706703', 'Piaçabuçu/Al': '2706802', 'Pilar/Al': '2706901', 'Pindoba/Al': '2707008', 'Piranhas/Al': '2707107', 'PoçoDasTrincheiras/Al': '2707206', 'PortoCalvo/Al': '2707305', 'PortoDePedras/Al': '2707404', 'PortoRealDoColégio/Al': '2707503', 'Quebrangulo/Al': '2707602', 'RioLargo/Al': '2707701', 'Roteiro/Al': '2707800', 'SantaLuziaDoNorte/Al': '2707909', 'SantanaDoIpanema/Al': '2708006', 'SantanaDoMundaú/Al': '2708105', 'SãoBrás/Al': '2708204', 'SãoJoséDaLaje/Al': '2708303', 'SãoJoséDaTapera/Al': '2708402', 'SãoLuísDoQuitunde/Al': '2708501', 'SãoMiguelDosCampos/Al': '2708600', 'SãoMiguelDosMilagres/Al': '2708709', 'SãoSebastião/Al': '2708808', 'Satuba/Al': '2708907', 'SenadorRuiPalmeira/Al': '2708956', "TanqueD'Arca/Al": '2709004', 'Taquarana/Al': '2709103', 'TeotônioVilela/Al': '2709152', 'Traipu/Al': '2709202', 'UniãoDosPalmares/Al': '2709301', 'Viçosa/Al': '2709400', 'AmparoDoSãoFrancisco/Se': '2800100', 'Aquidabã/Se': '2800209', 'Aracaju/Se': '2800308', 'Arauá/Se': '2800407', 'AreiaBranca/Se': '2800506', 'BarraDosCoqueiros/Se': '2800605', 'Boquim/Se': '2800670', 'BrejoGrande/Se': '2800704', 'CampoDoBrito/Se': '2801009', 'Canhoba/Se': '2801108', 'CanindéDeSãoFrancisco/Se': '2801207', 'Capela/Se': '2801306', 'Carira/Se': '2801405', 'Carmópolis/Se': '2801504', 'CedroDeSãoJoão/Se': '2801603', 'Cristinápolis/Se': '2801702', 'Cumbe/Se': '2801900', 'DivinaPastora/Se': '2802007', 'Estância/Se': '2802106', 'FeiraNova/Se': '2802205', 'FreiPaulo/Se': '2802304', 'Gararu/Se': '2802403', 'GeneralMaynard/Se': '2802502', 'GrachoCardoso/Se': '2802601', 'IlhaDasFlores/Se': '2802700', 'Indiaroba/Se': '2802809', 'Itabaiana/Se': '2802908', 'Itabaianinha/Se': '2803005', 'Itabi/Se': '2803104', "ItaporangaD'Ajuda/Se": '2803203', 'Japaratuba/Se': '2803302', 'Japoatã/Se': '2803401', 'Lagarto/Se': '2803500', 'Laranjeiras/Se': '2803609', 'Macambira/Se': '2803708', 'MalhadaDosBois/Se': '2803807', 'Malhador/Se': '2803906', 'Maruim/Se': '2804003', 'MoitaBonita/Se': '2804102', 'MonteAlegreDeSergipe/Se': '2804201', 'Muribeca/Se': '2804300', 'Neópolis/Se': '2804409', 'NossaSenhoraAparecida/Se': '2804458', 'NossaSenhoraDaGlória/Se': '2804508', 'NossaSenhoraDasDores/Se': '2804607', 'NossaSenhoraDeLourdes/Se': '2804706', 'NossaSenhoraDoSocorro/Se': '2804805', 'Pacatuba/Se': '2804904', 'PedraMole/Se': '2805000', 'Pedrinhas/Se': '2805109', 'Pinhão/Se': '2805208', 'Pirambu/Se': '2805307', 'PoçoRedondo/Se': '2805406', 'PoçoVerde/Se': '2805505', 'PortoDaFolha/Se': '2805604', 'Propriá/Se': '2805703', 'RiachãoDoDantas/Se': '2805802', 'Riachuelo/Se': '2805901', 'Ribeirópolis/Se': '2806008', 'RosárioDoCatete/Se': '2806107', 'Salgado/Se': '2806206', 'SantaLuziaDoItanhy/Se': '2806305', 'SantanaDoSãoFrancisco/Se': '2806404', 'SantaRosaDeLima/Se': '2806503', 'SantoAmaroDasBrotas/Se': '2806602', 'SãoCristóvão/Se': '2806701', 'SãoDomingos/Se': '2806800', 'SãoFrancisco/Se': '2806909', 'SãoMiguelDoAleixo/Se': '2807006', 'SimãoDias/Se': '2807105', 'Siriri/Se': '2807204', 'Telha/Se': '2807303', 'TobiasBarreto/Se': '2807402', 'TomarDoGeru/Se': '2807501', 'Umbaúba/Se': '2807600', 'Abaíra/Ba': '2900108', 'Abaré/Ba': '2900207', 'Acajutiba/Ba': '2900306', 'Adustina/Ba': '2900355', 'ÁguaFria/Ba': '2900405', 'ÉricoCardoso/Ba': '2900504', 'Aiquara/Ba': '2900603', 'Alagoinhas/Ba': '2900702', 'Alcobaça/Ba': '2900801', 'Almadina/Ba': '2900900', 'Amargosa/Ba': '2901007', 'AméliaRodrigues/Ba': '2901106', 'AméricaDourada/Ba': '2901155', 'Anagé/Ba': '2901205', 'Andaraí/Ba': '2901304', 'Andorinha/Ba': '2901353', 'Angical/Ba': '2901403', 'Anguera/Ba': '2901502', 'Antas/Ba': '2901601', 'AntônioCardoso/Ba': '2901700', 'AntônioGonçalves/Ba': '2901809', 'Aporá/Ba': '2901908', 'Apuarema/Ba': '2901957', 'Aracatu/Ba': '2902005', 'Araçás/Ba': '2902054', 'Araci/Ba': '2902104', 'Aramari/Ba': '2902203', 'Arataca/Ba': '2902252', 'Aratuípe/Ba': '2902302', 'AurelinoLeal/Ba': '2902401', 'Baianópolis/Ba': '2902500', 'BaixaGrande/Ba': '2902609', 'Banzaê/Ba': '2902658', 'Barra/Ba': '2902708', 'BarraDaEstiva/Ba': '2902807', 'BarraDoChoça/Ba': '2902906', 'BarraDoMendes/Ba': '2903003', 'BarraDoRocha/Ba': '2903102', 'Barreiras/Ba': '2903201', 'BarroAlto/Ba': '2903235', 'Barrocas/Ba': '2903276', 'BarroPreto/Ba': '2903300', 'Belmonte/Ba': '2903409', 'BeloCampo/Ba': '2903508', 'Biritinga/Ba': '2903607', 'BoaNova/Ba': '2903706', 'BoaVistaDoTupim/Ba': '2903805', 'BomJesusDaLapa/Ba': '2903904', 'BomJesusDaSerra/Ba': '2903953', 'Boninal/Ba': '2904001', 'Bonito/Ba': '2904050', 'Boquira/Ba': '2904100', 'Botuporã/Ba': '2904209', 'Brejões/Ba': '2904308', 'Brejolândia/Ba': '2904407', 'BrotasDeMacaúbas/Ba': '2904506', 'Brumado/Ba': '2904605', 'Buerarema/Ba': '2904704', 'Buritirama/Ba': '2904753', 'Caatiba/Ba': '2904803', 'CabaceirasDoParaguaçu/Ba': '2904852', 'Cachoeira/Ba': '2904902', 'Caculé/Ba': '2905008', 'Caém/Ba': '2905107', 'Caetanos/Ba': '2905156', 'Caetité/Ba': '2905206', 'Cafarnaum/Ba': '2905305', 'Cairu/Ba': '2905404', 'CaldeirãoGrande/Ba': '2905503', 'Camacan/Ba': '2905602', 'Camaçari/Ba': '2905701', 'Camamu/Ba': '2905800', 'CampoAlegreDeLourdes/Ba': '2905909', 'CampoFormoso/Ba': '2906006', 'Canápolis/Ba': '2906105', 'Canarana/Ba': '2906204', 'Canavieiras/Ba': '2906303', 'Candeal/Ba': '2906402', 'Candeias/Ba': '2906501', 'Candiba/Ba': '2906600', 'CândidoSales/Ba': '2906709', 'Cansanção/Ba': '2906808', 'Canudos/Ba': '2906824', 'CapelaDoAltoAlegre/Ba': '2906857', 'CapimGrosso/Ba': '2906873', 'Caraíbas/Ba': '2906899', 'Caravelas/Ba': '2906907', 'CardealDaSilva/Ba': '2907004', 'Carinhanha/Ba': '2907103', 'CasaNova/Ba': '2907202', 'CastroAlves/Ba': '2907301', 'Catolândia/Ba': '2907400', 'Catu/Ba': '2907509', 'Caturama/Ba': '2907558', 'Central/Ba': '2907608', 'Chorrochó/Ba': '2907707', 'CíceroDantas/Ba': '2907806', 'Cipó/Ba': '2907905', 'Coaraci/Ba': '2908002', 'Cocos/Ba': '2908101', 'ConceiçãoDaFeira/Ba': '2908200', 'ConceiçãoDoAlmeida/Ba': '2908309', 'ConceiçãoDoCoité/Ba': '2908408', 'ConceiçãoDoJacuípe/Ba': '2908507', 'Conde/Ba': '2908606', 'Condeúba/Ba': '2908705', 'ContendasDoSincorá/Ba': '2908804', 'CoraçãoDeMaria/Ba': '2908903', 'Cordeiros/Ba': '2909000', 'Coribe/Ba': '2909109', 'CoronelJoãoSá/Ba': '2909208', 'Correntina/Ba': '2909307', 'Cotegipe/Ba': '2909406', 'Cravolândia/Ba': '2909505', 'Crisópolis/Ba': '2909604', 'Cristópolis/Ba': '2909703', 'CruzDasAlmas/Ba': '2909802', 'Curaçá/Ba': '2909901', 'DárioMeira/Ba': '2910008', "DiasD'Ávila/Ba": '2910057', 'DomBasílio/Ba': '2910107', 'DomMacedoCosta/Ba': '2910206', 'ElísioMedrado/Ba': '2910305', 'Encruzilhada/Ba': '2910404', 'EntreRios/Ba': '2910503', 'Esplanada/Ba': '2910602', 'EuclidesDaCunha/Ba': '2910701', 'Eunápolis/Ba': '2910727', 'Fátima/Ba': '2910750', 'FeiraDaMata/Ba': '2910776', 'FeiraDeSantana/Ba': '2910800', 'Filadélfia/Ba': '2910859', 'FirminoAlves/Ba': '2910909', 'FlorestaAzul/Ba': '2911006', 'FormosaDoRioPreto/Ba': '2911105', 'Gandu/Ba': '2911204', 'Gavião/Ba': '2911253', 'GentioDoOuro/Ba': '2911303', 'Glória/Ba': '2911402', 'Gongogi/Ba': '2911501', 'GovernadorMangabeira/Ba': '2911600', 'Guajeru/Ba': '2911659', 'Guanambi/Ba': '2911709', 'Guaratinga/Ba': '2911808', 'Heliópolis/Ba': '2911857', 'Iaçu/Ba': '2911907', 'Ibiassucê/Ba': '2912004', 'Ibicaraí/Ba': '2912103', 'Ibicoara/Ba': '2912202', 'Ibicuí/Ba': '2912301', 'Ibipeba/Ba': '2912400', 'Ibipitanga/Ba': '2912509', 'Ibiquera/Ba': '2912608', 'Ibirapitanga/Ba': '2912707', 'Ibirapuã/Ba': '2912806', 'Ibirataia/Ba': '2912905', 'Ibitiara/Ba': '2913002', 'Ibititá/Ba': '2913101', 'Ibotirama/Ba': '2913200', 'Ichu/Ba': '2913309', 'Igaporã/Ba': '2913408', 'Igrapiúna/Ba': '2913457', 'Iguaí/Ba': '2913507', 'Ilhéus/Ba': '2913606', 'Inhambupe/Ba': '2913705', 'Ipecaetá/Ba': '2913804', 'Ipiaú/Ba': '2913903', 'Ipirá/Ba': '2914000', 'Ipupiara/Ba': '2914109', 'Irajuba/Ba': '2914208', 'Iramaia/Ba': '2914307', 'Iraquara/Ba': '2914406', 'Irará/Ba': '2914505', 'Irecê/Ba': '2914604', 'Itabela/Ba': '2914653', 'Itaberaba/Ba': '2914703', 'Itabuna/Ba': '2914802', 'Itacaré/Ba': '2914901', 'Itaeté/Ba': '2915007', 'Itagi/Ba': '2915106', 'Itagibá/Ba': '2915205', 'Itagimirim/Ba': '2915304', 'ItaguaçuDaBahia/Ba': '2915353', 'ItajuDoColônia/Ba': '2915403', 'Itajuípe/Ba': '2915502', 'Itamaraju/Ba': '2915601', 'Itamari/Ba': '2915700', 'Itambé/Ba': '2915809', 'Itanagra/Ba': '2915908', 'Itanhém/Ba': '2916005', 'Itaparica/Ba': '2916104', 'Itapé/Ba': '2916203', 'Itapebi/Ba': '2916302', 'Itapetinga/Ba': '2916401', 'Itapicuru/Ba': '2916500', 'Itapitanga/Ba': '2916609', 'Itaquara/Ba': '2916708', 'Itarantim/Ba': '2916807', 'Itatim/Ba': '2916856', 'Itiruçu/Ba': '2916906', 'Itiúba/Ba': '2917003', 'Itororó/Ba': '2917102', 'Ituaçu/Ba': '2917201', 'Ituberá/Ba': '2917300', 'Iuiu/Ba': '2917334', 'Jaborandi/Ba': '2917359', 'Jacaraci/Ba': '2917409', 'Jacobina/Ba': '2917508', 'Jaguaquara/Ba': '2917607', 'Jaguarari/Ba': '2917706', 'Jaguaripe/Ba': '2917805', 'Jandaíra/Ba': '2917904', 'Jequié/Ba': '2918001', 'Jeremoabo/Ba': '2918100', 'Jiquiriçá/Ba': '2918209', 'Jitaúna/Ba': '2918308', 'JoãoDourado/Ba': '2918357', 'Juazeiro/Ba': '2918407', 'Jucuruçu/Ba': '2918456', 'Jussara/Ba': '2918506', 'Jussari/Ba': '2918555', 'Jussiape/Ba': '2918605', 'LafaieteCoutinho/Ba': '2918704', 'LagoaReal/Ba': '2918753', 'Laje/Ba': '2918803', 'Lajedão/Ba': '2918902', 'Lajedinho/Ba': '2919009', 'LajedoDoTabocal/Ba': '2919058', 'Lamarão/Ba': '2919108', 'Lapão/Ba': '2919157', 'LauroDeFreitas/Ba': '2919207', 'Lençóis/Ba': '2919306', 'LicínioDeAlmeida/Ba': '2919405', 'LivramentoDeNossaSenhora/Ba': '2919504', 'LuísEduardoMagalhães/Ba': '2919553', 'Macajuba/Ba': '2919603', 'Macarani/Ba': '2919702', 'Macaúbas/Ba': '2919801', 'Macururé/Ba': '2919900', 'MadreDeDeus/Ba': '2919926', 'Maetinga/Ba': '2919959', 'Maiquinique/Ba': '2920007', 'Mairi/Ba': '2920106', 'Malhada/Ba': '2920205', 'MalhadaDePedras/Ba': '2920304', 'ManoelVitorino/Ba': '2920403', 'Mansidão/Ba': '2920452', 'Maracás/Ba': '2920502', 'Maragogipe/Ba': '2920601', 'Maraú/Ba': '2920700', 'MarcionílioSouza/Ba': '2920809', 'Mascote/Ba': '2920908', 'MataDeSãoJoão/Ba': '2921005', 'Matina/Ba': '2921054', 'MedeirosNeto/Ba': '2921104', 'MiguelCalmon/Ba': '2921203', 'Milagres/Ba': '2921302', 'Mirangaba/Ba': '2921401', 'Mirante/Ba': '2921450', 'MonteSanto/Ba': '2921500', 'Morpará/Ba': '2921609', 'MorroDoChapéu/Ba': '2921708', 'Mortugaba/Ba': '2921807', 'Mucugê/Ba': '2921906', 'Mucuri/Ba': '2922003', 'MulunguDoMorro/Ba': '2922052', 'MundoNovo/Ba': '2922102', 'MunizFerreira/Ba': '2922201', 'MuquémDoSãoFrancisco/Ba': '2922250', 'Muritiba/Ba': '2922300', 'Mutuípe/Ba': '2922409', 'Nazaré/Ba': '2922508', 'NiloPeçanha/Ba': '2922607', 'Nordestina/Ba': '2922656', 'NovaCanaã/Ba': '2922706', 'NovaFátima/Ba': '2922730', 'NovaIbiá/Ba': '2922755', 'NovaItarana/Ba': '2922805', 'NovaRedenção/Ba': '2922854', 'NovaSoure/Ba': '2922904', 'NovaViçosa/Ba': '2923001', 'NovoHorizonte/Ba': '2923035', 'NovoTriunfo/Ba': '2923050', 'Olindina/Ba': '2923100', 'OliveiraDosBrejinhos/Ba': '2923209', 'Ouriçangas/Ba': '2923308', 'Ourolândia/Ba': '2923357', 'PalmasDeMonteAlto/Ba': '2923407', 'Palmeiras/Ba': '2923506', 'Paramirim/Ba': '2923605', 'Paratinga/Ba': '2923704', 'Paripiranga/Ba': '2923803', 'PauBrasil/Ba': '2923902', 'PauloAfonso/Ba': '2924009', 'PéDeSerra/Ba': '2924058', 'Pedrão/Ba': '2924108', 'PedroAlexandre/Ba': '2924207', 'Piatã/Ba': '2924306', 'PilãoArcado/Ba': '2924405', 'Pindaí/Ba': '2924504', 'Pindobaçu/Ba': '2924603', 'Pintadas/Ba': '2924652', 'PiraíDoNorte/Ba': '2924678', 'Piripá/Ba': '2924702', 'Piritiba/Ba': '2924801', 'Planaltino/Ba': '2924900', 'Planalto/Ba': '2925006', 'Poções/Ba': '2925105', 'Pojuca/Ba': '2925204', 'PontoNovo/Ba': '2925253', 'PortoSeguro/Ba': '2925303', 'Potiraguá/Ba': '2925402', 'Prado/Ba': '2925501', 'PresidenteDutra/Ba': '2925600', 'PresidenteJânioQuadros/Ba': '2925709', 'PresidenteTancredoNeves/Ba': '2925758', 'Queimadas/Ba': '2925808', 'Quijingue/Ba': '2925907', 'Quixabeira/Ba': '2925931', 'RafaelJambeiro/Ba': '2925956', 'Remanso/Ba': '2926004', 'Retirolândia/Ba': '2926103', 'RiachãoDasNeves/Ba': '2926202', 'RiachãoDoJacuípe/Ba': '2926301', 'RiachoDeSantana/Ba': '2926400', 'RibeiraDoAmparo/Ba': '2926509', 'RibeiraDoPombal/Ba': '2926608', 'RibeirãoDoLargo/Ba': '2926657', 'RioDeContas/Ba': '2926707', 'RioDoAntônio/Ba': '2926806', 'RioDoPires/Ba': '2926905', 'RioReal/Ba': '2927002', 'Rodelas/Ba': '2927101', 'RuyBarbosa/Ba': '2927200', 'SalinasDaMargarida/Ba': '2927309', 'Salvador/Ba': '2927408', 'SantaBárbara/Ba': '2927507', 'SantaBrígida/Ba': '2927606', 'SantaCruzCabrália/Ba': '2927705', 'SantaCruzDaVitória/Ba': '2927804', 'SantaInês/Ba': '2927903', 'Santaluz/Ba': '2928000', 'SantaLuzia/Ba': '2928059', 'SantaMariaDaVitória/Ba': '2928109', 'Santana/Ba': '2928208', 'Santanópolis/Ba': '2928307', 'SantaRitaDeCássia/Ba': '2928406', 'SantaTerezinha/Ba': '2928505', 'SantoAmaro/Ba': '2928604', 'SantoAntônioDeJesus/Ba': '2928703', 'SantoEstêvão/Ba': '2928802', 'SãoDesidério/Ba': '2928901', 'SãoDomingos/Ba': '2928950', 'SãoFélix/Ba': '2929008', 'SãoFélixDoCoribe/Ba': '2929057', 'SãoFelipe/Ba': '2929107', 'SãoFranciscoDoConde/Ba': '2929206', 'SãoGabriel/Ba': '2929255', 'SãoGonçaloDosCampos/Ba': '2929305', 'SãoJoséDaVitória/Ba': '2929354', 'SãoJoséDoJacuípe/Ba': '2929370', 'SãoMiguelDasMatas/Ba': '2929404', 'SãoSebastiãoDoPassé/Ba': '2929503', 'Sapeaçu/Ba': '2929602', 'SátiroDias/Ba': '2929701', 'Saubara/Ba': '2929750', 'Saúde/Ba': '2929800', 'Seabra/Ba': '2929909', 'SebastiãoLaranjeiras/Ba': '2930006', 'SenhorDoBonfim/Ba': '2930105', 'SerraDoRamalho/Ba': '2930154', 'SentoSé/Ba': '2930204', 'SerraDourada/Ba': '2930303', 'SerraPreta/Ba': '2930402', 'Serrinha/Ba': '2930501', 'Serrolândia/Ba': '2930600', 'SimõesFilho/Ba': '2930709', 'SítioDoMato/Ba': '2930758', 'SítioDoQuinto/Ba': '2930766', 'Sobradinho/Ba': '2930774', 'SoutoSoares/Ba': '2930808', 'TabocasDoBrejoVelho/Ba': '2930907', 'Tanhaçu/Ba': '2931004', 'TanqueNovo/Ba': '2931053', 'Tanquinho/Ba': '2931103', 'Taperoá/Ba': '2931202', 'Tapiramutá/Ba': '2931301', 'TeixeiraDeFreitas/Ba': '2931350', 'TeodoroSampaio/Ba': '2931400', 'Teofilândia/Ba': '2931509', 'Teolândia/Ba': '2931608', 'TerraNova/Ba': '2931707', 'Tremedal/Ba': '2931806', 'Tucano/Ba': '2931905', 'Uauá/Ba': '2932002', 'Ubaíra/Ba': '2932101', 'Ubaitaba/Ba': '2932200', 'Ubatã/Ba': '2932309', 'Uibaí/Ba': '2932408', 'Umburanas/Ba': '2932457', 'Una/Ba': '2932507', 'Urandi/Ba': '2932606', 'Uruçuca/Ba': '2932705', 'Utinga/Ba': '2932804', 'Valença/Ba': '2932903', 'Valente/Ba': '2933000', 'VárzeaDaRoça/Ba': '2933059', 'VárzeaDoPoço/Ba': '2933109', 'VárzeaNova/Ba': '2933158', 'Varzedo/Ba': '2933174', 'VeraCruz/Ba': '2933208', 'Vereda/Ba': '2933257', 'VitóriaDaConquista/Ba': '2933307', 'Wagner/Ba': '2933406', 'Wanderley/Ba': '2933455', 'WenceslauGuimarães/Ba': '2933505', 'XiqueXique/Ba': '2933604', 'AbadiaDosDourados/Mg': '3100104', 'Abaeté/Mg': '3100203', 'AbreCampo/Mg': '3100302', 'Acaiaca/Mg': '3100401', 'Açucena/Mg': '3100500', 'ÁguaBoa/Mg': '3100609', 'ÁguaComprida/Mg': '3100708', 'Aguanil/Mg': '3100807', 'ÁguasFormosas/Mg': '3100906', 'ÁguasVermelhas/Mg': '3101003', 'Aimorés/Mg': '3101102', 'Aiuruoca/Mg': '3101201', 'Alagoa/Mg': '3101300', 'Albertina/Mg': '3101409', 'AlémParaíba/Mg': '3101508', 'Alfenas/Mg': '3101607', 'AlfredoVasconcelos/Mg': '3101631', 'Almenara/Mg': '3101706', 'Alpercata/Mg': '3101805', 'Alpinópolis/Mg': '3101904', 'Alterosa/Mg': '3102001', 'AltoCaparaó/Mg': '3102050', 'AltoRioDoce/Mg': '3102100', 'Alvarenga/Mg': '3102209', 'Alvinópolis/Mg': '3102308', 'AlvoradaDeMinas/Mg': '3102407', 'AmparoDoSerra/Mg': '3102506', 'Andradas/Mg': '3102605', 'CachoeiraDePajeú/Mg': '3102704', 'Andrelândia/Mg': '3102803', 'Angelândia/Mg': '3102852', 'AntônioCarlos/Mg': '3102902', 'AntônioDias/Mg': '3103009', 'AntônioPradoDeMinas/Mg': '3103108', 'Araçaí/Mg': '3103207', 'Aracitaba/Mg': '3103306', 'Araçuaí/Mg': '3103405', 'Araguari/Mg': '3103504', 'Arantina/Mg': '3103603', 'Araponga/Mg': '3103702', 'Araporã/Mg': '3103751', 'Arapuá/Mg': '3103801', 'Araújos/Mg': '3103900', 'Araxá/Mg': '3104007', 'Arceburgo/Mg': '3104106', 'Arcos/Mg': '3104205', 'Areado/Mg': '3104304', 'Argirita/Mg': '3104403', 'Aricanduva/Mg': '3104452', 'Arinos/Mg': '3104502', 'AstolfoDutra/Mg': '3104601', 'Ataléia/Mg': '3104700', 'AugustoDeLima/Mg': '3104809', 'Baependi/Mg': '3104908', 'Baldim/Mg': '3105004', 'Bambuí/Mg': '3105103', 'Bandeira/Mg': '3105202', 'BandeiraDoSul/Mg': '3105301', 'BarãoDeCocais/Mg': '3105400', 'BarãoDeMonteAlto/Mg': '3105509', 'Barbacena/Mg': '3105608', 'BarraLonga/Mg': '3105707', 'Barroso/Mg': '3105905', 'BelaVistaDeMinas/Mg': '3106002', 'BelmiroBraga/Mg': '3106101', 'BeloHorizonte/Mg': '3106200', 'BeloOriente/Mg': '3106309', 'BeloVale/Mg': '3106408', 'Berilo/Mg': '3106507', 'Bertópolis/Mg': '3106606', 'Berizal/Mg': '3106655', 'Betim/Mg': '3106705', 'BiasFortes/Mg': '3106804', 'Bicas/Mg': '3106903', 'Biquinhas/Mg': '3107000', 'BoaEsperança/Mg': '3107109', 'BocainaDeMinas/Mg': '3107208', 'Bocaiúva/Mg': '3107307', 'BomDespacho/Mg': '3107406', 'BomJardimDeMinas/Mg': '3107505', 'BomJesusDaPenha/Mg': '3107604', 'BomJesusDoAmparo/Mg': '3107703', 'BomJesusDoGalho/Mg': '3107802', 'BomRepouso/Mg': '3107901', 'BomSucesso/Mg': '3108008', 'Bonfim/Mg': '3108107', 'BonfinópolisDeMinas/Mg': '3108206', 'BonitoDeMinas/Mg': '3108255', 'BordaDaMata/Mg': '3108305', 'Botelhos/Mg': '3108404', 'Botumirim/Mg': '3108503', 'BrasilândiaDeMinas/Mg': '3108552', 'BrasíliaDeMinas/Mg': '3108602', 'BrásPires/Mg': '3108701', 'Braúnas/Mg': '3108800', 'Brazópolis/Mg': '3108909', 'Brumadinho/Mg': '3109006', 'BuenoBrandão/Mg': '3109105', 'Buenópolis/Mg': '3109204', 'Bugre/Mg': '3109253', 'Buritis/Mg': '3109303', 'Buritizeiro/Mg': '3109402', 'CabeceiraGrande/Mg': '3109451', 'CaboVerde/Mg': '3109501', 'CachoeiraDaPrata/Mg': '3109600', 'CachoeiraDeMinas/Mg': '3109709', 'CachoeiraDourada/Mg': '3109808', 'Caetanópolis/Mg': '3109907', 'Caeté/Mg': '3110004', 'Caiana/Mg': '3110103', 'Cajuri/Mg': '3110202', 'Caldas/Mg': '3110301', 'Camacho/Mg': '3110400', 'Camanducaia/Mg': '3110509', 'Cambuí/Mg': '3110608', 'Cambuquira/Mg': '3110707', 'Campanário/Mg': '3110806', 'Campanha/Mg': '3110905', 'Campestre/Mg': '3111002', 'CampinaVerde/Mg': '3111101', 'CampoAzul/Mg': '3111150', 'CampoBelo/Mg': '3111200', 'CampoDoMeio/Mg': '3111309', 'CampoFlorido/Mg': '3111408', 'CamposAltos/Mg': '3111507', 'CamposGerais/Mg': '3111606', 'Canaã/Mg': '3111705', 'Canápolis/Mg': '3111804', 'CanaVerde/Mg': '3111903', 'Candeias/Mg': '3112000', 'Cantagalo/Mg': '3112059', 'Caparaó/Mg': '3112109', 'CapelaNova/Mg': '3112208', 'Capelinha/Mg': '3112307', 'Capetinga/Mg': '3112406', 'CapimBranco/Mg': '3112505', 'Capinópolis/Mg': '3112604', 'CapitãoAndrade/Mg': '3112653', 'CapitãoEnéas/Mg': '3112703', 'Capitólio/Mg': '3112802', 'Caputira/Mg': '3112901', 'Caraí/Mg': '3113008', 'Caranaíba/Mg': '3113107', 'Carandaí/Mg': '3113206', 'Carangola/Mg': '3113305', 'Caratinga/Mg': '3113404', 'Carbonita/Mg': '3113503', 'Careaçu/Mg': '3113602', 'CarlosChagas/Mg': '3113701', 'Carmésia/Mg': '3113800', 'CarmoDaCachoeira/Mg': '3113909', 'CarmoDaMata/Mg': '3114006', 'CarmoDeMinas/Mg': '3114105', 'CarmoDoCajuru/Mg': '3114204', 'CarmoDoParanaíba/Mg': '3114303', 'CarmoDoRioClaro/Mg': '3114402', 'CarmópolisDeMinas/Mg': '3114501', 'Carneirinho/Mg': '3114550', 'Carrancas/Mg': '3114600', 'Carvalhópolis/Mg': '3114709', 'Carvalhos/Mg': '3114808', 'CasaGrande/Mg': '3114907', 'CascalhoRico/Mg': '3115003', 'Cássia/Mg': '3115102', 'ConceiçãoDaBarraDeMinas/Mg': '3115201', 'Cataguases/Mg': '3115300', 'CatasAltas/Mg': '3115359', 'CatasAltasDaNoruega/Mg': '3115409', 'Catuji/Mg': '3115458', 'Catuti/Mg': '3115474', 'Caxambu/Mg': '3115508', 'CedroDoAbaeté/Mg': '3115607', 'CentralDeMinas/Mg': '3115706', 'Centralina/Mg': '3115805', 'Chácara/Mg': '3115904', 'Chalé/Mg': '3116001', 'ChapadaDoNorte/Mg': '3116100', 'ChapadaGaúcha/Mg': '3116159', 'Chiador/Mg': '3116209', 'Cipotânea/Mg': '3116308', 'Claraval/Mg': '3116407', 'ClaroDosPoções/Mg': '3116506', 'Cláudio/Mg': '3116605', 'Coimbra/Mg': '3116704', 'Coluna/Mg': '3116803', 'ComendadorGomes/Mg': '3116902', 'Comercinho/Mg': '3117009', 'ConceiçãoDaAparecida/Mg': '3117108', 'ConceiçãoDasPedras/Mg': '3117207', 'ConceiçãoDasAlagoas/Mg': '3117306', 'ConceiçãoDeIpanema/Mg': '3117405', 'ConceiçãoDoMatoDentro/Mg': '3117504', 'ConceiçãoDoPará/Mg': '3117603', 'ConceiçãoDoRioVerde/Mg': '3117702', 'ConceiçãoDosOuros/Mg': '3117801', 'CônegoMarinho/Mg': '3117836', 'Confins/Mg': '3117876', 'Congonhal/Mg': '3117900', 'Congonhas/Mg': '3118007', 'CongonhasDoNorte/Mg': '3118106', 'Conquista/Mg': '3118205', 'ConselheiroLafaiete/Mg': '3118304', 'ConselheiroPena/Mg': '3118403', 'Consolação/Mg': '3118502', 'Contagem/Mg': '3118601', 'Coqueiral/Mg': '3118700', 'CoraçãoDeJesus/Mg': '3118809', 'Cordisburgo/Mg': '3118908', 'Cordislândia/Mg': '3119005', 'Corinto/Mg': '3119104', 'Coroaci/Mg': '3119203', 'Coromandel/Mg': '3119302', 'CoronelFabriciano/Mg': '3119401', 'CoronelMurta/Mg': '3119500', 'CoronelPacheco/Mg': '3119609', 'CoronelXavierChaves/Mg': '3119708', 'CórregoDanta/Mg': '3119807', 'CórregoDoBomJesus/Mg': '3119906', 'CórregoFundo/Mg': '3119955', 'CórregoNovo/Mg': '3120003', 'CoutoDeMagalhãesDeMinas/Mg': '3120102', 'Crisólita/Mg': '3120151', 'Cristais/Mg': '3120201', 'Cristália/Mg': '3120300', 'CristianoOtoni/Mg': '3120409', 'Cristina/Mg': '3120508', 'Crucilândia/Mg': '3120607', 'CruzeiroDaFortaleza/Mg': '3120706', 'Cruzília/Mg': '3120805', 'Cuparaque/Mg': '3120839', 'CurralDeDentro/Mg': '3120870', 'Curvelo/Mg': '3120904', 'Datas/Mg': '3121001', 'DelfimMoreira/Mg': '3121100', 'Delfinópolis/Mg': '3121209', 'Delta/Mg': '3121258', 'Descoberto/Mg': '3121308', 'DesterroDeEntreRios/Mg': '3121407', 'DesterroDoMelo/Mg': '3121506', 'Diamantina/Mg': '3121605', 'DiogoDeVasconcelos/Mg': '3121704', 'Dionísio/Mg': '3121803', 'Divinésia/Mg': '3121902', 'Divino/Mg': '3122009', 'DivinoDasLaranjeiras/Mg': '3122108', 'DivinolândiaDeMinas/Mg': '3122207', 'Divinópolis/Mg': '3122306', 'DivisaAlegre/Mg': '3122355', 'DivisaNova/Mg': '3122405', 'Divisópolis/Mg': '3122454', 'DomBosco/Mg': '3122470', 'DomCavati/Mg': '3122504', 'DomJoaquim/Mg': '3122603', 'DomSilvério/Mg': '3122702', 'DomViçoso/Mg': '3122801', 'DonaEusébia/Mg': '3122900', 'DoresDeCampos/Mg': '3123007', 'DoresDeGuanhães/Mg': '3123106', 'DoresDoIndaiá/Mg': '3123205', 'DoresDoTurvo/Mg': '3123304', 'Doresópolis/Mg': '3123403', 'Douradoquara/Mg': '3123502', 'Durandé/Mg': '3123528', 'ElóiMendes/Mg': '3123601', 'EngenheiroCaldas/Mg': '3123700', 'EngenheiroNavarro/Mg': '3123809', 'EntreFolhas/Mg': '3123858', 'EntreRiosDeMinas/Mg': '3123908', 'Ervália/Mg': '3124005', 'Esmeraldas/Mg': '3124104', 'EsperaFeliz/Mg': '3124203', 'Espinosa/Mg': '3124302', 'EspíritoSantoDoDourado/Mg': '3124401', 'Estiva/Mg': '3124500', 'EstrelaDalva/Mg': '3124609', 'EstrelaDoIndaiá/Mg': '3124708', 'EstrelaDoSul/Mg': '3124807', 'Eugenópolis/Mg': '3124906', 'EwbankDaCâmara/Mg': '3125002', 'Extrema/Mg': '3125101', 'Fama/Mg': '3125200', 'FariaLemos/Mg': '3125309', 'FelícioDosSantos/Mg': '3125408', 'SãoGonçaloDoRioPreto/Mg': '3125507', 'Felisburgo/Mg': '3125606', 'Felixlândia/Mg': '3125705', 'FernandesTourinho/Mg': '3125804', 'Ferros/Mg': '3125903', 'Fervedouro/Mg': '3125952', 'Florestal/Mg': '3126000', 'Formiga/Mg': '3126109', 'Formoso/Mg': '3126208', 'FortalezaDeMinas/Mg': '3126307', 'FortunaDeMinas/Mg': '3126406', 'FranciscoBadaró/Mg': '3126505', 'FranciscoDumont/Mg': '3126604', 'FranciscoSá/Mg': '3126703', 'Franciscópolis/Mg': '3126752', 'FreiGaspar/Mg': '3126802', 'FreiInocêncio/Mg': '3126901', 'FreiLagonegro/Mg': '3126950', 'Fronteira/Mg': '3127008', 'FronteiraDosVales/Mg': '3127057', 'FrutaDeLeite/Mg': '3127073', 'Frutal/Mg': '3127107', 'Funilândia/Mg': '3127206', 'Galiléia/Mg': '3127305', 'Gameleiras/Mg': '3127339', 'Glaucilândia/Mg': '3127354', 'Goiabeira/Mg': '3127370', 'Goianá/Mg': '3127388', 'Gonçalves/Mg': '3127404', 'Gonzaga/Mg': '3127503', 'Gouveia/Mg': '3127602', 'GovernadorValadares/Mg': '3127701', 'GrãoMogol/Mg': '3127800', 'Grupiara/Mg': '3127909', 'Guanhães/Mg': '3128006', 'Guapé/Mg': '3128105', 'Guaraciaba/Mg': '3128204', 'Guaraciama/Mg': '3128253', 'Guaranésia/Mg': '3128303', 'Guarani/Mg': '3128402', 'Guarará/Mg': '3128501', 'GuardaMor/Mg': '3128600', 'Guaxupé/Mg': '3128709', 'Guidoval/Mg': '3128808', 'Guimarânia/Mg': '3128907', 'Guiricema/Mg': '3129004', 'Gurinhatã/Mg': '3129103', 'Heliodora/Mg': '3129202', 'Iapu/Mg': '3129301', 'Ibertioga/Mg': '3129400', 'Ibiá/Mg': '3129509', 'Ibiaí/Mg': '3129608', 'Ibiracatu/Mg': '3129657', 'Ibiraci/Mg': '3129707', 'Ibirité/Mg': '3129806', 'IbitiúraDeMinas/Mg': '3129905', 'Ibituruna/Mg': '3130002', 'IcaraíDeMinas/Mg': '3130051', 'Igarapé/Mg': '3130101', 'Igaratinga/Mg': '3130200', 'Iguatama/Mg': '3130309', 'Ijaci/Mg': '3130408', 'Ilicínea/Mg': '3130507', 'ImbéDeMinas/Mg': '3130556', 'Inconfidentes/Mg': '3130606', 'Indaiabira/Mg': '3130655', 'Indianópolis/Mg': '3130705', 'Ingaí/Mg': '3130804', 'Inhapim/Mg': '3130903', 'Inhaúma/Mg': '3131000', 'Inimutaba/Mg': '3131109', 'Ipaba/Mg': '3131158', 'Ipanema/Mg': '3131208', 'Ipatinga/Mg': '3131307', 'Ipiaçu/Mg': '3131406', 'Ipuiúna/Mg': '3131505', 'IraíDeMinas/Mg': '3131604', 'Itabira/Mg': '3131703', 'Itabirinha/Mg': '3131802', 'Itabirito/Mg': '3131901', 'Itacambira/Mg': '3132008', 'Itacarambi/Mg': '3132107', 'Itaguara/Mg': '3132206', 'Itaipé/Mg': '3132305', 'Itajubá/Mg': '3132404', 'Itamarandiba/Mg': '3132503', 'ItamaratiDeMinas/Mg': '3132602', 'Itambacuri/Mg': '3132701', 'ItambéDoMatoDentro/Mg': '3132800', 'Itamogi/Mg': '3132909', 'Itamonte/Mg': '3133006', 'Itanhandu/Mg': '3133105', 'Itanhomi/Mg': '3133204', 'Itaobim/Mg': '3133303', 'Itapagipe/Mg': '3133402', 'Itapecerica/Mg': '3133501', 'Itapeva/Mg': '3133600', 'Itatiaiuçu/Mg': '3133709', 'ItaúDeMinas/Mg': '3133758', 'Itaúna/Mg': '3133808', 'Itaverava/Mg': '3133907', 'Itinga/Mg': '3134004', 'Itueta/Mg': '3134103', 'Ituiutaba/Mg': '3134202', 'Itumirim/Mg': '3134301', 'Iturama/Mg': '3134400', 'Itutinga/Mg': '3134509', 'Jaboticatubas/Mg': '3134608', 'Jacinto/Mg': '3134707', 'Jacuí/Mg': '3134806', 'Jacutinga/Mg': '3134905', 'Jaguaraçu/Mg': '3135001', 'Jaíba/Mg': '3135050', 'Jampruca/Mg': '3135076', 'Janaúba/Mg': '3135100', 'Januária/Mg': '3135209', 'Japaraíba/Mg': '3135308', 'Japonvar/Mg': '3135357', 'Jeceaba/Mg': '3135407', 'JenipapoDeMinas/Mg': '3135456', 'Jequeri/Mg': '3135506', 'Jequitaí/Mg': '3135605', 'Jequitibá/Mg': '3135704', 'Jequitinhonha/Mg': '3135803', 'Jesuânia/Mg': '3135902', 'Joaíma/Mg': '3136009', 'Joanésia/Mg': '3136108', 'JoãoMonlevade/Mg': '3136207', 'JoãoPinheiro/Mg': '3136306', 'JoaquimFelício/Mg': '3136405', 'Jordânia/Mg': '3136504', 'JoséGonçalvesDeMinas/Mg': '3136520', 'JoséRaydan/Mg': '3136553', 'Josenópolis/Mg': '3136579', 'NovaUnião/Mg': '3136603', 'Juatuba/Mg': '3136652', 'JuizDeFora/Mg': '3136702', 'Juramento/Mg': '3136801', 'Juruaia/Mg': '3136900', 'Juvenília/Mg': '3136959', 'Ladainha/Mg': '3137007', 'Lagamar/Mg': '3137106', 'LagoaDaPrata/Mg': '3137205', 'LagoaDosPatos/Mg': '3137304', 'LagoaDourada/Mg': '3137403', 'LagoaFormosa/Mg': '3137502', 'LagoaGrande/Mg': '3137536', 'LagoaSanta/Mg': '3137601', 'Lajinha/Mg': '3137700', 'Lambari/Mg': '3137809', 'Lamim/Mg': '3137908', 'Laranjal/Mg': '3138005', 'Lassance/Mg': '3138104', 'Lavras/Mg': '3138203', 'LeandroFerreira/Mg': '3138302', 'LemeDoPrado/Mg': '3138351', 'Leopoldina/Mg': '3138401', 'Liberdade/Mg': '3138500', 'LimaDuarte/Mg': '3138609', 'LimeiraDoOeste/Mg': '3138625', 'Lontra/Mg': '3138658', 'Luisburgo/Mg': '3138674', 'Luislândia/Mg': '3138682', 'Luminárias/Mg': '3138708', 'Luz/Mg': '3138807', 'Machacalis/Mg': '3138906', 'Machado/Mg': '3139003', 'MadreDeDeusDeMinas/Mg': '3139102', 'Malacacheta/Mg': '3139201', 'Mamonas/Mg': '3139250', 'Manga/Mg': '3139300', 'Manhuaçu/Mg': '3139409', 'Manhumirim/Mg': '3139508', 'Mantena/Mg': '3139607', 'Maravilhas/Mg': '3139706', 'MarDeEspanha/Mg': '3139805', 'MariaDaFé/Mg': '3139904', 'Mariana/Mg': '3140001', 'Marilac/Mg': '3140100', 'MárioCampos/Mg': '3140159', 'MaripáDeMinas/Mg': '3140209', 'Marliéria/Mg': '3140308', 'Marmelópolis/Mg': '3140407', 'MartinhoCampos/Mg': '3140506', 'MartinsSoares/Mg': '3140530', 'MataVerde/Mg': '3140555', 'Materlândia/Mg': '3140605', 'MateusLeme/Mg': '3140704', 'MatiasBarbosa/Mg': '3140803', 'MatiasCardoso/Mg': '3140852', 'Matipó/Mg': '3140902', 'MatoVerde/Mg': '3141009', 'Matozinhos/Mg': '3141108', 'Matutina/Mg': '3141207', 'Medeiros/Mg': '3141306', 'Medina/Mg': '3141405', 'MendesPimentel/Mg': '3141504', 'Mercês/Mg': '3141603', 'Mesquita/Mg': '3141702', 'MinasNovas/Mg': '3141801', 'Minduri/Mg': '3141900', 'Mirabela/Mg': '3142007', 'Miradouro/Mg': '3142106', 'Miraí/Mg': '3142205', 'Miravânia/Mg': '3142254', 'Moeda/Mg': '3142304', 'Moema/Mg': '3142403', 'Monjolos/Mg': '3142502', 'MonsenhorPaulo/Mg': '3142601', 'Montalvânia/Mg': '3142700', 'MonteAlegreDeMinas/Mg': '3142809', 'MonteAzul/Mg': '3142908', 'MonteBelo/Mg': '3143005', 'MonteCarmelo/Mg': '3143104', 'MonteFormoso/Mg': '3143153', 'MonteSantoDeMinas/Mg': '3143203', 'MontesClaros/Mg': '3143302', 'MonteSião/Mg': '3143401', 'Montezuma/Mg': '3143450', 'MoradaNovaDeMinas/Mg': '3143500', 'MorroDaGarça/Mg': '3143609', 'MorroDoPilar/Mg': '3143708', 'Munhoz/Mg': '3143807', 'Muriaé/Mg': '3143906', 'Mutum/Mg': '3144003', 'Muzambinho/Mg': '3144102', 'NacipRaydan/Mg': '3144201', 'Nanuque/Mg': '3144300', 'Naque/Mg': '3144359', 'Natalândia/Mg': '3144375', 'Natércia/Mg': '3144409', 'Nazareno/Mg': '3144508', 'Nepomuceno/Mg': '3144607', 'Ninheira/Mg': '3144656', 'NovaBelém/Mg': '3144672', 'NovaEra/Mg': '3144706', 'NovaLima/Mg': '3144805', 'NovaMódica/Mg': '3144904', 'NovaPonte/Mg': '3145000', 'NovaPorteirinha/Mg': '3145059', 'NovaResende/Mg': '3145109', 'NovaSerrana/Mg': '3145208', 'NovoCruzeiro/Mg': '3145307', 'NovoOrienteDeMinas/Mg': '3145356', 'Novorizonte/Mg': '3145372', 'Olaria/Mg': '3145406', "OlhosD'Água/Mg": '3145455', 'OlímpioNoronha/Mg': '3145505', 'Oliveira/Mg': '3145604', 'OliveiraFortes/Mg': '3145703', 'OnçaDePitangui/Mg': '3145802', 'Oratórios/Mg': '3145851', 'Orizânia/Mg': '3145877', 'OuroBranco/Mg': '3145901', 'OuroFino/Mg': '3146008', 'OuroPreto/Mg': '3146107', 'OuroVerdeDeMinas/Mg': '3146206', 'PadreCarvalho/Mg': '3146255', 'PadreParaíso/Mg': '3146305', 'Paineiras/Mg': '3146404', 'Pains/Mg': '3146503', 'PaiPedro/Mg': '3146552', 'Paiva/Mg': '3146602', 'Palma/Mg': '3146701', 'Palmópolis/Mg': '3146750', 'Papagaios/Mg': '3146909', 'Paracatu/Mg': '3147006', 'ParáDeMinas/Mg': '3147105', 'Paraguaçu/Mg': '3147204', 'Paraisópolis/Mg': '3147303', 'Paraopeba/Mg': '3147402', 'Passabém/Mg': '3147501', 'PassaQuatro/Mg': '3147600', 'PassaTempo/Mg': '3147709', 'PassaVinte/Mg': '3147808', 'Passos/Mg': '3147907', 'Patis/Mg': '3147956', 'PatosDeMinas/Mg': '3148004', 'Patrocínio/Mg': '3148103', 'PatrocínioDoMuriaé/Mg': '3148202', 'PaulaCândido/Mg': '3148301', 'Paulistas/Mg': '3148400', 'Pavão/Mg': '3148509', 'Peçanha/Mg': '3148608', 'PedraAzul/Mg': '3148707', 'PedraBonita/Mg': '3148756', 'PedraDoAnta/Mg': '3148806', 'PedraDoIndaiá/Mg': '3148905', 'PedraDourada/Mg': '3149002', 'Pedralva/Mg': '3149101', 'PedrasDeMariaDaCruz/Mg': '3149150', 'Pedrinópolis/Mg': '3149200', 'PedroLeopoldo/Mg': '3149309', 'PedroTeixeira/Mg': '3149408', 'Pequeri/Mg': '3149507', 'Pequi/Mg': '3149606', 'Perdigão/Mg': '3149705', 'Perdizes/Mg': '3149804', 'Perdões/Mg': '3149903', 'Periquito/Mg': '3149952', 'Pescador/Mg': '3150000', 'Piau/Mg': '3150109', 'PiedadeDeCaratinga/Mg': '3150158', 'PiedadeDePonteNova/Mg': '3150208', 'PiedadeDoRioGrande/Mg': '3150307', 'PiedadeDosGerais/Mg': '3150406', 'Pimenta/Mg': '3150505', "PingoD'Água/Mg": '3150539', 'Pintópolis/Mg': '3150570', 'Piracema/Mg': '3150604', 'Pirajuba/Mg': '3150703', 'Piranga/Mg': '3150802', 'Piranguçu/Mg': '3150901', 'Piranguinho/Mg': '3151008', 'Pirapetinga/Mg': '3151107', 'Pirapora/Mg': '3151206', 'Piraúba/Mg': '3151305', 'Pitangui/Mg': '3151404', 'Piumhi/Mg': '3151503', 'Planura/Mg': '3151602', 'PoçoFundo/Mg': '3151701', 'PoçosDeCaldas/Mg': '3151800', 'Pocrane/Mg': '3151909', 'Pompéu/Mg': '3152006', 'PonteNova/Mg': '3152105', 'PontoChique/Mg': '3152131', 'PontoDosVolantes/Mg': '3152170', 'Porteirinha/Mg': '3152204', 'PortoFirme/Mg': '3152303', 'Poté/Mg': '3152402', 'PousoAlegre/Mg': '3152501', 'PousoAlto/Mg': '3152600', 'Prados/Mg': '3152709', 'Prata/Mg': '3152808', 'Pratápolis/Mg': '3152907', 'Pratinha/Mg': '3153004', 'PresidenteBernardes/Mg': '3153103', 'PresidenteJuscelino/Mg': '3153202', 'PresidenteKubitschek/Mg': '3153301', 'PresidenteOlegário/Mg': '3153400', 'AltoJequitibá/Mg': '3153509', 'PrudenteDeMorais/Mg': '3153608', 'QuartelGeral/Mg': '3153707', 'Queluzito/Mg': '3153806', 'Raposos/Mg': '3153905', 'RaulSoares/Mg': '3154002', 'Recreio/Mg': '3154101', 'Reduto/Mg': '3154150', 'ResendeCosta/Mg': '3154200', 'Resplendor/Mg': '3154309', 'Ressaquinha/Mg': '3154408', 'Riachinho/Mg': '3154457', 'RiachoDosMachados/Mg': '3154507', 'RibeirãoDasNeves/Mg': '3154606', 'RibeirãoVermelho/Mg': '3154705', 'RioAcima/Mg': '3154804', 'RioCasca/Mg': '3154903', 'RioDoce/Mg': '3155009', 'RioDoPrado/Mg': '3155108', 'RioEspera/Mg': '3155207', 'RioManso/Mg': '3155306', 'RioNovo/Mg': '3155405', 'RioParanaíba/Mg': '3155504', 'RioPardoDeMinas/Mg': '3155603', 'RioPiracicaba/Mg': '3155702', 'RioPomba/Mg': '3155801', 'RioPreto/Mg': '3155900', 'RioVermelho/Mg': '3156007', 'Ritápolis/Mg': '3156106', 'RochedoDeMinas/Mg': '3156205', 'Rodeiro/Mg': '3156304', 'Romaria/Mg': '3156403', 'RosárioDaLimeira/Mg': '3156452', 'Rubelita/Mg': '3156502', 'Rubim/Mg': '3156601', 'Sabará/Mg': '3156700', 'Sabinópolis/Mg': '3156809', 'Sacramento/Mg': '3156908', 'Salinas/Mg': '3157005', 'SaltoDaDivisa/Mg': '3157104', 'SantaBárbara/Mg': '3157203', 'SantaBárbaraDoLeste/Mg': '3157252', 'SantaBárbaraDoMonteVerde/Mg': '3157278', 'SantaBárbaraDoTugúrio/Mg': '3157302', 'SantaCruzDeMinas/Mg': '3157336', 'SantaCruzDeSalinas/Mg': '3157377', 'SantaCruzDoEscalvado/Mg': '3157401', 'SantaEfigêniaDeMinas/Mg': '3157500', 'SantaFéDeMinas/Mg': '3157609', 'SantaHelenaDeMinas/Mg': '3157658', 'SantaJuliana/Mg': '3157708', 'SantaLuzia/Mg': '3157807', 'SantaMargarida/Mg': '3157906', 'SantaMariaDeItabira/Mg': '3158003', 'SantaMariaDoSalto/Mg': '3158102', 'SantaMariaDoSuaçuí/Mg': '3158201', 'SantanaDaVargem/Mg': '3158300', 'SantanaDeCataguases/Mg': '3158409', 'SantanaDePirapama/Mg': '3158508', 'SantanaDoDeserto/Mg': '3158607', 'SantanaDoGarambéu/Mg': '3158706', 'SantanaDoJacaré/Mg': '3158805', 'SantanaDoManhuaçu/Mg': '3158904', 'SantanaDoParaíso/Mg': '3158953', 'SantanaDoRiacho/Mg': '3159001', 'SantanaDosMontes/Mg': '3159100', 'SantaRitaDeCaldas/Mg': '3159209', 'SantaRitaDeJacutinga/Mg': '3159308', 'SantaRitaDeMinas/Mg': '3159357', 'SantaRitaDeIbitipoca/Mg': '3159407', 'SantaRitaDoItueto/Mg': '3159506', 'SantaRitaDoSapucaí/Mg': '3159605', 'SantaRosaDaSerra/Mg': '3159704', 'SantaVitória/Mg': '3159803', 'SantoAntônioDoAmparo/Mg': '3159902', 'SantoAntônioDoAventureiro/Mg': '3160009', 'SantoAntônioDoGrama/Mg': '3160108', 'SantoAntônioDoItambé/Mg': '3160207', 'SantoAntônioDoJacinto/Mg': '3160306', 'SantoAntônioDoMonte/Mg': '3160405', 'SantoAntônioDoRetiro/Mg': '3160454', 'SantoAntônioDoRioAbaixo/Mg': '3160504', 'SantoHipólito/Mg': '3160603', 'SantosDumont/Mg': '3160702', 'SãoBentoAbade/Mg': '3160801', 'SãoBrásDoSuaçuí/Mg': '3160900', 'SãoDomingosDasDores/Mg': '3160959', 'SãoDomingosDoPrata/Mg': '3161007', 'SãoFélixDeMinas/Mg': '3161056', 'SãoFrancisco/Mg': '3161106', 'SãoFranciscoDePaula/Mg': '3161205', 'SãoFranciscoDeSales/Mg': '3161304', 'SãoFranciscoDoGlória/Mg': '3161403', 'SãoGeraldo/Mg': '3161502', 'SãoGeraldoDaPiedade/Mg': '3161601', 'SãoGeraldoDoBaixio/Mg': '3161650', 'SãoGonçaloDoAbaeté/Mg': '3161700', 'SãoGonçaloDoPará/Mg': '3161809', 'SãoGonçaloDoRioAbaixo/Mg': '3161908', 'SãoGonçaloDoSapucaí/Mg': '3162005', 'SãoGotardo/Mg': '3162104', 'SãoJoãoBatistaDoGlória/Mg': '3162203', 'SãoJoãoDaLagoa/Mg': '3162252', 'SãoJoãoDaMata/Mg': '3162302', 'SãoJoãoDaPonte/Mg': '3162401', 'SãoJoãoDasMissões/Mg': '3162450', 'SãoJoãoDelRei/Mg': '3162500', 'SãoJoãoDoManhuaçu/Mg': '3162559', 'SãoJoãoDoManteninha/Mg': '3162575', 'SãoJoãoDoOriente/Mg': '3162609', 'SãoJoãoDoPacuí/Mg': '3162658', 'SãoJoãoDoParaíso/Mg': '3162708', 'SãoJoãoEvangelista/Mg': '3162807', 'SãoJoãoNepomuceno/Mg': '3162906', 'SãoJoaquimDeBicas/Mg': '3162922', 'SãoJoséDaBarra/Mg': '3162948', 'SãoJoséDaLapa/Mg': '3162955', 'SãoJoséDaSafira/Mg': '3163003', 'SãoJoséDaVarginha/Mg': '3163102', 'SãoJoséDoAlegre/Mg': '3163201', 'SãoJoséDoDivino/Mg': '3163300', 'SãoJoséDoGoiabal/Mg': '3163409', 'SãoJoséDoJacuri/Mg': '3163508', 'SãoJoséDoMantimento/Mg': '3163607', 'SãoLourenço/Mg': '3163706', 'SãoMiguelDoAnta/Mg': '3163805', 'SãoPedroDaUnião/Mg': '3163904', 'SãoPedroDosFerros/Mg': '3164001', 'SãoPedroDoSuaçuí/Mg': '3164100', 'SãoRomão/Mg': '3164209', 'SãoRoqueDeMinas/Mg': '3164308', 'SãoSebastiãoDaBelaVista/Mg': '3164407', 'SãoSebastiãoDaVargemAlegre/Mg': '3164431', 'SãoSebastiãoDoAnta/Mg': '3164472', 'SãoSebastiãoDoMaranhão/Mg': '3164506', 'SãoSebastiãoDoOeste/Mg': '3164605', 'SãoSebastiãoDoParaíso/Mg': '3164704', 'SãoSebastiãoDoRioPreto/Mg': '3164803', 'SãoSebastiãoDoRioVerde/Mg': '3164902', 'SãoTiago/Mg': '3165008', 'SãoTomásDeAquino/Mg': '3165107', 'SãoThoméDasLetras/Mg': '3165206', 'SãoVicenteDeMinas/Mg': '3165305', 'SapucaíMirim/Mg': '3165404', 'Sardoá/Mg': '3165503', 'Sarzedo/Mg': '3165537', 'Setubinha/Mg': '3165552', 'SemPeixe/Mg': '3165560', 'SenadorAmaral/Mg': '3165578', 'SenadorCortes/Mg': '3165602', 'SenadorFirmino/Mg': '3165701', 'SenadorJoséBento/Mg': '3165800', 'SenadorModestinoGonçalves/Mg': '3165909', 'SenhoraDeOliveira/Mg': '3166006', 'SenhoraDoPorto/Mg': '3166105', 'SenhoraDosRemédios/Mg': '3166204', 'Sericita/Mg': '3166303', 'Seritinga/Mg': '3166402', 'SerraAzulDeMinas/Mg': '3166501', 'SerraDaSaudade/Mg': '3166600', 'SerraDosAimorés/Mg': '3166709', 'SerraDoSalitre/Mg': '3166808', 'Serrania/Mg': '3166907', 'SerranópolisDeMinas/Mg': '3166956', 'Serranos/Mg': '3167004', 'Serro/Mg': '3167103', 'SeteLagoas/Mg': '3167202', 'Silveirânia/Mg': '3167301', 'Silvianópolis/Mg': '3167400', 'SimãoPereira/Mg': '3167509', 'Simonésia/Mg': '3167608', 'Sobrália/Mg': '3167707', 'SoledadeDeMinas/Mg': '3167806', 'Tabuleiro/Mg': '3167905', 'Taiobeiras/Mg': '3168002', 'Taparuba/Mg': '3168051', 'Tapira/Mg': '3168101', 'Tapiraí/Mg': '3168200', 'TaquaraçuDeMinas/Mg': '3168309', 'Tarumirim/Mg': '3168408', 'Teixeiras/Mg': '3168507', 'TeófiloOtoni/Mg': '3168606', 'Timóteo/Mg': '3168705', 'Tiradentes/Mg': '3168804', 'Tiros/Mg': '3168903', 'Tocantins/Mg': '3169000', 'TocosDoMoji/Mg': '3169059', 'Toledo/Mg': '3169109', 'Tombos/Mg': '3169208', 'TrêsCorações/Mg': '3169307', 'TrêsMarias/Mg': '3169356', 'TrêsPontas/Mg': '3169406', 'Tumiritinga/Mg': '3169505', 'Tupaciguara/Mg': '3169604', 'Turmalina/Mg': '3169703', 'Turvolândia/Mg': '3169802', 'Ubá/Mg': '3169901', 'Ubaí/Mg': '3170008', 'Ubaporanga/Mg': '3170057', 'Uberaba/Mg': '3170107', 'Uberlândia/Mg': '3170206', 'Umburatiba/Mg': '3170305', 'Unaí/Mg': '3170404', 'UniãoDeMinas/Mg': '3170438', 'UruanaDeMinas/Mg': '3170479', 'Urucânia/Mg': '3170503', 'Urucuia/Mg': '3170529', 'VargemAlegre/Mg': '3170578', 'VargemBonita/Mg': '3170602', 'VargemGrandeDoRioPardo/Mg': '3170651', 'Varginha/Mg': '3170701', 'VarjãoDeMinas/Mg': '3170750', 'VárzeaDaPalma/Mg': '3170800', 'Varzelândia/Mg': '3170909', 'Vazante/Mg': '3171006', 'Verdelândia/Mg': '3171030', 'Veredinha/Mg': '3171071', 'Veríssimo/Mg': '3171105', 'VermelhoNovo/Mg': '3171154', 'Vespasiano/Mg': '3171204', 'Viçosa/Mg': '3171303', 'Vieiras/Mg': '3171402', 'MathiasLobato/Mg': '3171501', 'VirgemDaLapa/Mg': '3171600', 'Virgínia/Mg': '3171709', 'Virginópolis/Mg': '3171808', 'Virgolândia/Mg': '3171907', 'ViscondeDoRioBranco/Mg': '3172004', 'VoltaGrande/Mg': '3172103', 'WenceslauBraz/Mg': '3172202', 'AfonsoCláudio/Es': '3200102', 'ÁguiaBranca/Es': '3200136', 'ÁguaDoceDoNorte/Es': '3200169', 'Alegre/Es': '3200201', 'AlfredoChaves/Es': '3200300', 'AltoRioNovo/Es': '3200359', 'Anchieta/Es': '3200409', 'Apiacá/Es': '3200508', 'Aracruz/Es': '3200607', 'AtílioVivácqua/Es': '3200706', 'BaixoGuandu/Es': '3200805', 'BarraDeSãoFrancisco/Es': '3200904', 'BoaEsperança/Es': '3201001', 'BomJesusDoNorte/Es': '3201100', 'Brejetuba/Es': '3201159', 'CachoeiroDeItapemirim/Es': '3201209', 'Cariacica/Es': '3201308', 'Castelo/Es': '3201407', 'Colatina/Es': '3201506', 'ConceiçãoDaBarra/Es': '3201605', 'ConceiçãoDoCastelo/Es': '3201704', 'DivinoDeSãoLourenço/Es': '3201803', 'DomingosMartins/Es': '3201902', 'DoresDoRioPreto/Es': '3202009', 'Ecoporanga/Es': '3202108', 'Fundão/Es': '3202207', 'GovernadorLindenberg/Es': '3202256', 'Guaçuí/Es': '3202306', 'Guarapari/Es': '3202405', 'Ibatiba/Es': '3202454', 'Ibiraçu/Es': '3202504', 'Ibitirama/Es': '3202553', 'Iconha/Es': '3202603', 'Irupi/Es': '3202652', 'Itaguaçu/Es': '3202702', 'Itapemirim/Es': '3202801', 'Itarana/Es': '3202900', 'Iúna/Es': '3203007', 'Jaguaré/Es': '3203056', 'JerônimoMonteiro/Es': '3203106', 'JoãoNeiva/Es': '3203130', 'LaranjaDaTerra/Es': '3203163', 'Linhares/Es': '3203205', 'Mantenópolis/Es': '3203304', 'Marataízes/Es': '3203320', 'MarechalFloriano/Es': '3203346', 'Marilândia/Es': '3203353', 'MimosoDoSul/Es': '3203403', 'Montanha/Es': '3203502', 'Mucurici/Es': '3203601', 'MunizFreire/Es': '3203700', 'Muqui/Es': '3203809', 'NovaVenécia/Es': '3203908', 'Pancas/Es': '3204005', 'PedroCanário/Es': '3204054', 'Pinheiros/Es': '3204104', 'Piúma/Es': '3204203', 'PontoBelo/Es': '3204252', 'PresidenteKennedy/Es': '3204302', 'RioBananal/Es': '3204351', 'RioNovoDoSul/Es': '3204401', 'SantaLeopoldina/Es': '3204500', 'SantaMariaDeJetibá/Es': '3204559', 'SantaTeresa/Es': '3204609', 'SãoDomingosDoNorte/Es': '3204658', 'SãoGabrielDaPalha/Es': '3204708', 'SãoJoséDoCalçado/Es': '3204807', 'SãoMateus/Es': '3204906', 'SãoRoqueDoCanaã/Es': '3204955', 'Serra/Es': '3205002', 'Sooretama/Es': '3205010', 'VargemAlta/Es': '3205036', 'VendaNovaDoImigrante/Es': '3205069', 'Viana/Es': '3205101', 'VilaPavão/Es': '3205150', 'VilaValério/Es': '3205176', 'VilaVelha/Es': '3205200', 'Vitória/Es': '3205309', 'AngraDosReis/Rj': '3300100', 'Aperibé/Rj': '3300159', 'Araruama/Rj': '3300209', 'Areal/Rj': '3300225', 'ArmaçãoDosBúzios/Rj': '3300233', 'ArraialDoCabo/Rj': '3300258', 'BarraDoPiraí/Rj': '3300308', 'BarraMansa/Rj': '3300407', 'BelfordRoxo/Rj': '3300456', 'BomJardim/Rj': '3300506', 'BomJesusDoItabapoana/Rj': '3300605', 'CaboFrio/Rj': '3300704', 'CachoeirasDeMacacu/Rj': '3300803', 'Cambuci/Rj': '3300902', 'Carapebus/Rj': '3300936', 'ComendadorLevyGasparian/Rj': '3300951', 'CamposDosGoytacazes/Rj': '3301009', 'Cantagalo/Rj': '3301108', 'CardosoMoreira/Rj': '3301157', 'Carmo/Rj': '3301207', 'CasimiroDeAbreu/Rj': '3301306', 'ConceiçãoDeMacabu/Rj': '3301405', 'Cordeiro/Rj': '3301504', 'DuasBarras/Rj': '3301603', 'DuqueDeCaxias/Rj': '3301702', 'EngenheiroPauloDeFrontin/Rj': '3301801', 'Guapimirim/Rj': '3301850', 'IguabaGrande/Rj': '3301876', 'Itaboraí/Rj': '3301900', 'Itaguaí/Rj': '3302007', 'Italva/Rj': '3302056', 'Itaocara/Rj': '3302106', 'Itaperuna/Rj': '3302205', 'Itatiaia/Rj': '3302254', 'Japeri/Rj': '3302270', 'LajeDoMuriaé/Rj': '3302304', 'Macaé/Rj': '3302403', 'Macuco/Rj': '3302452', 'Magé/Rj': '3302502', 'Mangaratiba/Rj': '3302601', 'Maricá/Rj': '3302700', 'Mendes/Rj': '3302809', 'Mesquita/Rj': '3302858', 'MiguelPereira/Rj': '3302908', 'Miracema/Rj': '3303005', 'Natividade/Rj': '3303104', 'Nilópolis/Rj': '3303203', 'Niterói/Rj': '3303302', 'NovaFriburgo/Rj': '3303401', 'NovaIguaçu/Rj': '3303500', 'Paracambi/Rj': '3303609', 'ParaíbaDoSul/Rj': '3303708', 'Paraty/Rj': '3303807', 'PatyDoAlferes/Rj': '3303856', 'Petrópolis/Rj': '3303906', 'Pinheiral/Rj': '3303955', 'Piraí/Rj': '3304003', 'Porciúncula/Rj': '3304102', 'PortoReal/Rj': '3304110', 'Quatis/Rj': '3304128', 'Queimados/Rj': '3304144', 'Quissamã/Rj': '3304151', 'Resende/Rj': '3304201', 'RioBonito/Rj': '3304300', 'RioClaro/Rj': '3304409', 'RioDasFlores/Rj': '3304508', 'RioDasOstras/Rj': '3304524', 'RioDeJaneiro/Rj': '3304557', 'SantaMariaMadalena/Rj': '3304607', 'SantoAntônioDePádua/Rj': '3304706', 'SãoFranciscoDeItabapoana/Rj': '3304755', 'SãoFidélis/Rj': '3304805', 'SãoGonçalo/Rj': '3304904', 'SãoJoãoDaBarra/Rj': '3305000', 'SãoJoãoDeMeriti/Rj': '3305109', 'SãoJoséDeUbá/Rj': '3305133', 'SãoJoséDoValeDoRioPreto/Rj': '3305158', 'SãoPedroDaAldeia/Rj': '3305208', 'SãoSebastiãoDoAlto/Rj': '3305307', 'Sapucaia/Rj': '3305406', 'Saquarema/Rj': '3305505', 'Seropédica/Rj': '3305554', 'SilvaJardim/Rj': '3305604', 'Sumidouro/Rj': '3305703', 'Tanguá/Rj': '3305752', 'Teresópolis/Rj': '3305802', 'TrajanoDeMoraes/Rj': '3305901', 'TrêsRios/Rj': '3306008', 'Valença/Rj': '3306107', 'VarreSai/Rj': '3306156', 'Vassouras/Rj': '3306206', 'VoltaRedonda/Rj': '3306305', 'Adamantina/Sp': '3500105', 'Adolfo/Sp': '3500204', 'Aguaí/Sp': '3500303', 'ÁguasDaPrata/Sp': '3500402', 'ÁguasDeLindóia/Sp': '3500501', 'ÁguasDeSantaBárbara/Sp': '3500550', 'ÁguasDeSãoPedro/Sp': '3500600', 'Agudos/Sp': '3500709', 'Alambari/Sp': '3500758', 'AlfredoMarcondes/Sp': '3500808', 'Altair/Sp': '3500907', 'Altinópolis/Sp': '3501004', 'AltoAlegre/Sp': '3501103', 'Alumínio/Sp': '3501152', 'ÁlvaresFlorence/Sp': '3501202', 'ÁlvaresMachado/Sp': '3501301', 'ÁlvaroDeCarvalho/Sp': '3501400', 'Alvinlândia/Sp': '3501509', 'Americana/Sp': '3501608', 'AméricoBrasiliense/Sp': '3501707', 'AméricoDeCampos/Sp': '3501806', 'Amparo/Sp': '3501905', 'Analândia/Sp': '3502002', 'Andradina/Sp': '3502101', 'Angatuba/Sp': '3502200', 'Anhembi/Sp': '3502309', 'Anhumas/Sp': '3502408', 'Aparecida/Sp': '3502507', "AparecidaD'Oeste/Sp": '3502606', 'Apiaí/Sp': '3502705', 'Araçariguama/Sp': '3502754', 'Araçatuba/Sp': '3502804', 'AraçoiabaDaSerra/Sp': '3502903', 'Aramina/Sp': '3503000', 'Arandu/Sp': '3503109', 'Arapeí/Sp': '3503158', 'Araraquara/Sp': '3503208', 'Araras/Sp': '3503307', 'ArcoÍris/Sp': '3503356', 'Arealva/Sp': '3503406', 'Areias/Sp': '3503505', 'Areiópolis/Sp': '3503604', 'Ariranha/Sp': '3503703', 'ArturNogueira/Sp': '3503802', 'Arujá/Sp': '3503901', 'Aspásia/Sp': '3503950', 'Assis/Sp': '3504008', 'Atibaia/Sp': '3504107', 'Auriflama/Sp': '3504206', 'Avaí/Sp': '3504305', 'Avanhandava/Sp': '3504404', 'Avaré/Sp': '3504503', 'BadyBassitt/Sp': '3504602', 'Balbinos/Sp': '3504701', 'Bálsamo/Sp': '3504800', 'Bananal/Sp': '3504909', 'BarãoDeAntonina/Sp': '3505005', 'Barbosa/Sp': '3505104', 'Bariri/Sp': '3505203', 'BarraBonita/Sp': '3505302', 'BarraDoChapéu/Sp': '3505351', 'BarraDoTurvo/Sp': '3505401', 'Barretos/Sp': '3505500', 'Barrinha/Sp': '3505609', 'Barueri/Sp': '3505708', 'Bastos/Sp': '3505807', 'Batatais/Sp': '3505906', 'Bauru/Sp': '3506003', 'Bebedouro/Sp': '3506102', 'BentoDeAbreu/Sp': '3506201', 'BernardinoDeCampos/Sp': '3506300', 'Bertioga/Sp': '3506359', 'Bilac/Sp': '3506409', 'Birigui/Sp': '3506508', 'BiritibaMirim/Sp': '3506607', 'BoaEsperançaDoSul/Sp': '3506706', 'Bocaina/Sp': '3506805', 'Bofete/Sp': '3506904', 'Boituva/Sp': '3507001', 'BomJesusDosPerdões/Sp': '3507100', 'BomSucessoDeItararé/Sp': '3507159', 'Borá/Sp': '3507209', 'Boracéia/Sp': '3507308', 'Borborema/Sp': '3507407', 'Borebi/Sp': '3507456', 'Botucatu/Sp': '3507506', 'BragançaPaulista/Sp': '3507605', 'Braúna/Sp': '3507704', 'BrejoAlegre/Sp': '3507753', 'Brodowski/Sp': '3507803', 'Brotas/Sp': '3507902', 'Buri/Sp': '3508009', 'Buritama/Sp': '3508108', 'Buritizal/Sp': '3508207', 'CabráliaPaulista/Sp': '3508306', 'Cabreúva/Sp': '3508405', 'Caçapava/Sp': '3508504', 'CachoeiraPaulista/Sp': '3508603', 'Caconde/Sp': '3508702', 'Cafelândia/Sp': '3508801', 'Caiabu/Sp': '3508900', 'Caieiras/Sp': '3509007', 'Caiuá/Sp': '3509106', 'Cajamar/Sp': '3509205', 'Cajati/Sp': '3509254', 'Cajobi/Sp': '3509304', 'Cajuru/Sp': '3509403', 'CampinaDoMonteAlegre/Sp': '3509452', 'Campinas/Sp': '3509502', 'CampoLimpoPaulista/Sp': '3509601', 'CamposDoJordão/Sp': '3509700', 'CamposNovosPaulista/Sp': '3509809', 'Cananéia/Sp': '3509908', 'Canas/Sp': '3509957', 'CândidoMota/Sp': '3510005', 'CândidoRodrigues/Sp': '3510104', 'Canitar/Sp': '3510153', 'CapãoBonito/Sp': '3510203', 'CapelaDoAlto/Sp': '3510302', 'Capivari/Sp': '3510401', 'Caraguatatuba/Sp': '3510500', 'Carapicuíba/Sp': '3510609', 'Cardoso/Sp': '3510708', 'CasaBranca/Sp': '3510807', 'CássiaDosCoqueiros/Sp': '3510906', 'Castilho/Sp': '3511003', 'Catanduva/Sp': '3511102', 'Catiguá/Sp': '3511201', 'Cedral/Sp': '3511300', 'CerqueiraCésar/Sp': '3511409', 'Cerquilho/Sp': '3511508', 'CesárioLange/Sp': '3511607', 'Charqueada/Sp': '3511706', 'Clementina/Sp': '3511904', 'Colina/Sp': '3512001', 'Colômbia/Sp': '3512100', 'Conchal/Sp': '3512209', 'Conchas/Sp': '3512308', 'Cordeirópolis/Sp': '3512407', 'Coroados/Sp': '3512506', 'CoronelMacedo/Sp': '3512605', 'Corumbataí/Sp': '3512704', 'Cosmópolis/Sp': '3512803', 'Cosmorama/Sp': '3512902', 'Cotia/Sp': '3513009', 'Cravinhos/Sp': '3513108', 'CristaisPaulista/Sp': '3513207', 'Cruzália/Sp': '3513306', 'Cruzeiro/Sp': '3513405', 'Cubatão/Sp': '3513504', 'Cunha/Sp': '3513603', 'Descalvado/Sp': '3513702', 'Diadema/Sp': '3513801', 'DirceReis/Sp': '3513850', 'Divinolândia/Sp': '3513900', 'Dobrada/Sp': '3514007', 'DoisCórregos/Sp': '3514106', 'Dolcinópolis/Sp': '3514205', 'Dourado/Sp': '3514304', 'Dracena/Sp': '3514403', 'Duartina/Sp': '3514502', 'Dumont/Sp': '3514601', 'Echaporã/Sp': '3514700', 'Eldorado/Sp': '3514809', 'EliasFausto/Sp': '3514908', 'Elisiário/Sp': '3514924', 'Embaúba/Sp': '3514957', 'EmbuDasArtes/Sp': '3515004', 'EmbuGuaçu/Sp': '3515103', 'Emilianópolis/Sp': '3515129', 'EngenheiroCoelho/Sp': '3515152', 'EspíritoSantoDoPinhal/Sp': '3515186', 'EspíritoSantoDoTurvo/Sp': '3515194', "EstrelaD'Oeste/Sp": '3515202', 'EstrelaDoNorte/Sp': '3515301', 'EuclidesDaCunhaPaulista/Sp': '3515350', 'Fartura/Sp': '3515400', 'Fernandópolis/Sp': '3515509', 'FernandoPrestes/Sp': '3515608', 'Fernão/Sp': '3515657', 'FerrazDeVasconcelos/Sp': '3515707', 'FloraRica/Sp': '3515806', 'Floreal/Sp': '3515905', 'FlóridaPaulista/Sp': '3516002', 'Florínea/Sp': '3516101', 'Franca/Sp': '3516200', 'FranciscoMorato/Sp': '3516309', 'FrancoDaRocha/Sp': '3516408', 'GabrielMonteiro/Sp': '3516507', 'Gália/Sp': '3516606', 'Garça/Sp': '3516705', 'GastãoVidigal/Sp': '3516804', 'GaviãoPeixoto/Sp': '3516853', 'GeneralSalgado/Sp': '3516903', 'Getulina/Sp': '3517000', 'Glicério/Sp': '3517109', 'Guaiçara/Sp': '3517208', 'Guaimbê/Sp': '3517307', 'Guaíra/Sp': '3517406', 'Guapiaçu/Sp': '3517505', 'Guapiara/Sp': '3517604', 'Guará/Sp': '3517703', 'Guaraçaí/Sp': '3517802', 'Guaraci/Sp': '3517901', "GuaraniD'Oeste/Sp": '3518008', 'Guarantã/Sp': '3518107', 'Guararapes/Sp': '3518206', 'Guararema/Sp': '3518305', 'Guaratinguetá/Sp': '3518404', 'Guareí/Sp': '3518503', 'Guariba/Sp': '3518602', 'Guarujá/Sp': '3518701', 'Guarulhos/Sp': '3518800', 'Guatapará/Sp': '3518859', 'Guzolândia/Sp': '3518909', 'Herculândia/Sp': '3519006', 'Holambra/Sp': '3519055', 'Hortolândia/Sp': '3519071', 'Iacanga/Sp': '3519105', 'Iacri/Sp': '3519204', 'Iaras/Sp': '3519253', 'Ibaté/Sp': '3519303', 'Ibirá/Sp': '3519402', 'Ibirarema/Sp': '3519501', 'Ibitinga/Sp': '3519600', 'Ibiúna/Sp': '3519709', 'Icém/Sp': '3519808', 'Iepê/Sp': '3519907', 'IgaraçuDoTietê/Sp': '3520004', 'Igarapava/Sp': '3520103', 'Igaratá/Sp': '3520202', 'Iguape/Sp': '3520301', 'Ilhabela/Sp': '3520400', 'IlhaComprida/Sp': '3520426', 'IlhaSolteira/Sp': '3520442', 'Indaiatuba/Sp': '3520509', 'Indiana/Sp': '3520608', 'Indiaporã/Sp': '3520707', 'InúbiaPaulista/Sp': '3520806', 'Ipaussu/Sp': '3520905', 'Iperó/Sp': '3521002', 'Ipeúna/Sp': '3521101', 'Ipiguá/Sp': '3521150', 'Iporanga/Sp': '3521200', 'Ipuã/Sp': '3521309', 'Iracemápolis/Sp': '3521408', 'Irapuã/Sp': '3521507', 'Irapuru/Sp': '3521606', 'Itaberá/Sp': '3521705', 'Itaí/Sp': '3521804', 'Itajobi/Sp': '3521903', 'Itaju/Sp': '3522000', 'Itanhaém/Sp': '3522109', 'Itaoca/Sp': '3522158', 'ItapecericaDaSerra/Sp': '3522208', 'Itapetininga/Sp': '3522307', 'Itapeva/Sp': '3522406', 'Itapevi/Sp': '3522505', 'Itapira/Sp': '3522604', 'ItapirapuãPaulista/Sp': '3522653', 'Itápolis/Sp': '3522703', 'Itaporanga/Sp': '3522802', 'Itapuí/Sp': '3522901', 'Itapura/Sp': '3523008', 'Itaquaquecetuba/Sp': '3523107', 'Itararé/Sp': '3523206', 'Itariri/Sp': '3523305', 'Itatiba/Sp': '3523404', 'Itatinga/Sp': '3523503', 'Itirapina/Sp': '3523602', 'Itirapuã/Sp': '3523701', 'Itobi/Sp': '3523800', 'Itu/Sp': '3523909', 'Itupeva/Sp': '3524006', 'Ituverava/Sp': '3524105', 'Jaborandi/Sp': '3524204', 'Jaboticabal/Sp': '3524303', 'Jacareí/Sp': '3524402', 'Jaci/Sp': '3524501', 'Jacupiranga/Sp': '3524600', 'Jaguariúna/Sp': '3524709', 'Jales/Sp': '3524808', 'Jambeiro/Sp': '3524907', 'Jandira/Sp': '3525003', 'Jardinópolis/Sp': '3525102', 'Jarinu/Sp': '3525201', 'Jaú/Sp': '3525300', 'Jeriquara/Sp': '3525409', 'Joanópolis/Sp': '3525508', 'JoãoRamalho/Sp': '3525607', 'JoséBonifácio/Sp': '3525706', 'JúlioMesquita/Sp': '3525805', 'Jumirim/Sp': '3525854', 'Jundiaí/Sp': '3525904', 'Junqueirópolis/Sp': '3526001', 'Juquiá/Sp': '3526100', 'Juquitiba/Sp': '3526209', 'Lagoinha/Sp': '3526308', 'LaranjalPaulista/Sp': '3526407', 'Lavínia/Sp': '3526506', 'Lavrinhas/Sp': '3526605', 'Leme/Sp': '3526704', 'LençóisPaulista/Sp': '3526803', 'Limeira/Sp': '3526902', 'Lindóia/Sp': '3527009', 'Lins/Sp': '3527108', 'Lorena/Sp': '3527207', 'Lourdes/Sp': '3527256', 'Louveira/Sp': '3527306', 'Lucélia/Sp': '3527405', 'Lucianópolis/Sp': '3527504', 'LuísAntônio/Sp': '3527603', 'Luiziânia/Sp': '3527702', 'Lupércio/Sp': '3527801', 'Lutécia/Sp': '3527900', 'Macatuba/Sp': '3528007', 'Macaubal/Sp': '3528106', 'Macedônia/Sp': '3528205', 'Magda/Sp': '3528304', 'Mairinque/Sp': '3528403', 'Mairiporã/Sp': '3528502', 'Manduri/Sp': '3528601', 'MarabáPaulista/Sp': '3528700', 'Maracaí/Sp': '3528809', 'Marapoama/Sp': '3528858', 'Mariápolis/Sp': '3528908', 'Marília/Sp': '3529005', 'Marinópolis/Sp': '3529104', 'Martinópolis/Sp': '3529203', 'Matão/Sp': '3529302', 'Mauá/Sp': '3529401', 'Mendonça/Sp': '3529500', 'Meridiano/Sp': '3529609', 'Mesópolis/Sp': '3529658', 'Miguelópolis/Sp': '3529708', 'MineirosDoTietê/Sp': '3529807', 'Miracatu/Sp': '3529906', 'MiraEstrela/Sp': '3530003', 'Mirandópolis/Sp': '3530102', 'MiranteDoParanapanema/Sp': '3530201', 'Mirassol/Sp': '3530300', 'Mirassolândia/Sp': '3530409', 'Mococa/Sp': '3530508', 'MogiDasCruzes/Sp': '3530607', 'MogiGuaçu/Sp': '3530706', 'MogiMirim/Sp': '3530805', 'Mombuca/Sp': '3530904', 'Monções/Sp': '3531001', 'Mongaguá/Sp': '3531100', 'MonteAlegreDoSul/Sp': '3531209', 'MonteAlto/Sp': '3531308', 'MonteAprazível/Sp': '3531407', 'MonteAzulPaulista/Sp': '3531506', 'MonteCastelo/Sp': '3531605', 'MonteiroLobato/Sp': '3531704', 'MonteMor/Sp': '3531803', 'MorroAgudo/Sp': '3531902', 'Morungaba/Sp': '3532009', 'Motuca/Sp': '3532058', 'MurutingaDoSul/Sp': '3532108', 'Nantes/Sp': '3532157', 'Narandiba/Sp': '3532207', 'NatividadeDaSerra/Sp': '3532306', 'NazaréPaulista/Sp': '3532405', 'NevesPaulista/Sp': '3532504', 'Nhandeara/Sp': '3532603', 'Nipoã/Sp': '3532702', 'NovaAliança/Sp': '3532801', 'NovaCampina/Sp': '3532827', 'NovaCanaãPaulista/Sp': '3532843', 'NovaCastilho/Sp': '3532868', 'NovaEuropa/Sp': '3532900', 'NovaGranada/Sp': '3533007', 'NovaGuataporanga/Sp': '3533106', 'NovaIndependência/Sp': '3533205', 'Novais/Sp': '3533254', 'NovaLuzitânia/Sp': '3533304', 'NovaOdessa/Sp': '3533403', 'NovoHorizonte/Sp': '3533502', 'Nuporanga/Sp': '3533601', 'Ocauçu/Sp': '3533700', 'Óleo/Sp': '3533809', 'Olímpia/Sp': '3533908', 'OndaVerde/Sp': '3534005', 'Oriente/Sp': '3534104', 'Orindiúva/Sp': '3534203', 'Orlândia/Sp': '3534302', 'Osasco/Sp': '3534401', 'OscarBressane/Sp': '3534500', 'OsvaldoCruz/Sp': '3534609', 'Ourinhos/Sp': '3534708', 'Ouroeste/Sp': '3534757', 'OuroVerde/Sp': '3534807', 'Pacaembu/Sp': '3534906', 'Palestina/Sp': '3535002', 'PalmaresPaulista/Sp': '3535101', "PalmeiraD'Oeste/Sp": '3535200', 'Palmital/Sp': '3535309', 'Panorama/Sp': '3535408', 'ParaguaçuPaulista/Sp': '3535507', 'Paraibuna/Sp': '3535606', 'Paraíso/Sp': '3535705', 'Paranapanema/Sp': '3535804', 'Paranapuã/Sp': '3535903', 'Parapuã/Sp': '3536000', 'Pardinho/Sp': '3536109', 'PariqueraAçu/Sp': '3536208', 'Parisi/Sp': '3536257', 'PatrocínioPaulista/Sp': '3536307', 'Paulicéia/Sp': '3536406', 'Paulínia/Sp': '3536505', 'Paulistânia/Sp': '3536570', 'PauloDeFaria/Sp': '3536604', 'Pederneiras/Sp': '3536703', 'PedraBela/Sp': '3536802', 'Pedranópolis/Sp': '3536901', 'Pedregulho/Sp': '3537008', 'Pedreira/Sp': '3537107', 'PedrinhasPaulista/Sp': '3537156', 'PedroDeToledo/Sp': '3537206', 'Penápolis/Sp': '3537305', 'PereiraBarreto/Sp': '3537404', 'Pereiras/Sp': '3537503', 'Peruíbe/Sp': '3537602', 'Piacatu/Sp': '3537701', 'Piedade/Sp': '3537800', 'PilarDoSul/Sp': '3537909', 'Pindamonhangaba/Sp': '3538006', 'Pindorama/Sp': '3538105', 'Pinhalzinho/Sp': '3538204', 'Piquerobi/Sp': '3538303', 'Piquete/Sp': '3538501', 'Piracaia/Sp': '3538600', 'Piracicaba/Sp': '3538709', 'Piraju/Sp': '3538808', 'Pirajuí/Sp': '3538907', 'Pirangi/Sp': '3539004', 'PiraporaDoBomJesus/Sp': '3539103', 'Pirapozinho/Sp': '3539202', 'Pirassununga/Sp': '3539301', 'Piratininga/Sp': '3539400', 'Pitangueiras/Sp': '3539509', 'Planalto/Sp': '3539608', 'Platina/Sp': '3539707', 'Poá/Sp': '3539806', 'Poloni/Sp': '3539905', 'Pompéia/Sp': '3540002', 'Pongaí/Sp': '3540101', 'Pontal/Sp': '3540200', 'Pontalinda/Sp': '3540259', 'PontesGestal/Sp': '3540309', 'Populina/Sp': '3540408', 'Porangaba/Sp': '3540507', 'PortoFeliz/Sp': '3540606', 'PortoFerreira/Sp': '3540705', 'Potim/Sp': '3540754', 'Potirendaba/Sp': '3540804', 'Pracinha/Sp': '3540853', 'Pradópolis/Sp': '3540903', 'PraiaGrande/Sp': '3541000', 'Pratânia/Sp': '3541059', 'PresidenteAlves/Sp': '3541109', 'PresidenteBernardes/Sp': '3541208', 'PresidenteEpitácio/Sp': '3541307', 'PresidentePrudente/Sp': '3541406', 'PresidenteVenceslau/Sp': '3541505', 'Promissão/Sp': '3541604', 'Quadra/Sp': '3541653', 'Quatá/Sp': '3541703', 'Queiroz/Sp': '3541802', 'Queluz/Sp': '3541901', 'Quintana/Sp': '3542008', 'Rafard/Sp': '3542107', 'Rancharia/Sp': '3542206', 'RedençãoDaSerra/Sp': '3542305', 'RegenteFeijó/Sp': '3542404', 'Reginópolis/Sp': '3542503', 'Registro/Sp': '3542602', 'Restinga/Sp': '3542701', 'Ribeira/Sp': '3542800', 'RibeirãoBonito/Sp': '3542909', 'RibeirãoBranco/Sp': '3543006', 'RibeirãoCorrente/Sp': '3543105', 'RibeirãoDoSul/Sp': '3543204', 'RibeirãoDosÍndios/Sp': '3543238', 'RibeirãoGrande/Sp': '3543253', 'RibeirãoPires/Sp': '3543303', 'RibeirãoPreto/Sp': '3543402', 'Riversul/Sp': '3543501', 'Rifaina/Sp': '3543600', 'Rincão/Sp': '3543709', 'Rinópolis/Sp': '3543808', 'RioClaro/Sp': '3543907', 'RioDasPedras/Sp': '3544004', 'RioGrandeDaSerra/Sp': '3544103', 'Riolândia/Sp': '3544202', 'Rosana/Sp': '3544251', 'Roseira/Sp': '3544301', 'Rubiácea/Sp': '3544400', 'Rubinéia/Sp': '3544509', 'Sabino/Sp': '3544608', 'Sagres/Sp': '3544707', 'Sales/Sp': '3544806', 'SalesOliveira/Sp': '3544905', 'Salesópolis/Sp': '3545001', 'Salmourão/Sp': '3545100', 'Saltinho/Sp': '3545159', 'Salto/Sp': '3545209', 'SaltoDePirapora/Sp': '3545308', 'SaltoGrande/Sp': '3545407', 'Sandovalina/Sp': '3545506', 'SantaAdélia/Sp': '3545605', 'SantaAlbertina/Sp': '3545704', "SantaBárbaraD'Oeste/Sp": '3545803', 'SantaBranca/Sp': '3546009', "SantaClaraD'Oeste/Sp": '3546108', 'SantaCruzDaConceição/Sp': '3546207', 'SantaCruzDaEsperança/Sp': '3546256', 'SantaCruzDasPalmeiras/Sp': '3546306', 'SantaCruzDoRioPardo/Sp': '3546405', 'SantaErnestina/Sp': '3546504', 'SantaFéDoSul/Sp': '3546603', 'SantaGertrudes/Sp': '3546702', 'SantaIsabel/Sp': '3546801', 'SantaLúcia/Sp': '3546900', 'SantaMariaDaSerra/Sp': '3547007', 'SantaMercedes/Sp': '3547106', 'SantanaDaPontePensa/Sp': '3547205', 'SantanaDeParnaíba/Sp': '3547304', "SantaRitaD'Oeste/Sp": '3547403', 'SantaRitaDoPassaQuatro/Sp': '3547502', 'SantaRosaDeViterbo/Sp': '3547601', 'SantaSalete/Sp': '3547650', 'SantoAnastácio/Sp': '3547700', 'SantoAndré/Sp': '3547809', 'SantoAntônioDaAlegria/Sp': '3547908', 'SantoAntônioDePosse/Sp': '3548005', 'SantoAntônioDoAracanguá/Sp': '3548054', 'SantoAntônioDoJardim/Sp': '3548104', 'SantoAntônioDoPinhal/Sp': '3548203', 'SantoExpedito/Sp': '3548302', 'SantópolisDoAguapeí/Sp': '3548401', 'Santos/Sp': '3548500', 'SãoBentoDoSapucaí/Sp': '3548609', 'SãoBernardoDoCampo/Sp': '3548708', 'SãoCaetanoDoSul/Sp': '3548807', 'SãoCarlos/Sp': '3548906', 'SãoFrancisco/Sp': '3549003', 'SãoJoãoDaBoaVista/Sp': '3549102', 'SãoJoãoDasDuasPontes/Sp': '3549201', 'SãoJoãoDeIracema/Sp': '3549250', "SãoJoãoDoPauD'Alho/Sp": '3549300', 'SãoJoaquimDaBarra/Sp': '3549409', 'SãoJoséDaBelaVista/Sp': '3549508', 'SãoJoséDoBarreiro/Sp': '3549607', 'SãoJoséDoRioPardo/Sp': '3549706', 'SãoJoséDoRioPreto/Sp': '3549805', 'SãoJoséDosCampos/Sp': '3549904', 'SãoLourençoDaSerra/Sp': '3549953', 'SãoLuizDoParaitinga/Sp': '3550001', 'SãoManuel/Sp': '3550100', 'SãoMiguelArcanjo/Sp': '3550209', 'SãoPaulo/Sp': '3550308', 'SãoPedro/Sp': '3550407', 'SãoPedroDoTurvo/Sp': '3550506', 'SãoRoque/Sp': '3550605', 'SãoSebastião/Sp': '3550704', 'SãoSebastiãoDaGrama/Sp': '3550803', 'SãoSimão/Sp': '3550902', 'SãoVicente/Sp': '3551009', 'Sarapuí/Sp': '3551108', 'Sarutaiá/Sp': '3551207', 'SebastianópolisDoSul/Sp': '3551306', 'SerraAzul/Sp': '3551405', 'Serrana/Sp': '3551504', 'SerraNegra/Sp': '3551603', 'Sertãozinho/Sp': '3551702', 'SeteBarras/Sp': '3551801', 'Severínia/Sp': '3551900', 'Silveiras/Sp': '3552007', 'Socorro/Sp': '3552106', 'Sorocaba/Sp': '3552205', 'SudMennucci/Sp': '3552304', 'Sumaré/Sp': '3552403', 'Suzano/Sp': '3552502', 'Suzanápolis/Sp': '3552551', 'Tabapuã/Sp': '3552601', 'Tabatinga/Sp': '3552700', 'TaboãoDaSerra/Sp': '3552809', 'Taciba/Sp': '3552908', 'Taguaí/Sp': '3553005', 'Taiaçu/Sp': '3553104', 'Taiúva/Sp': '3553203', 'Tambaú/Sp': '3553302', 'Tanabi/Sp': '3553401', 'Tapiraí/Sp': '3553500', 'Tapiratiba/Sp': '3553609', 'Taquaral/Sp': '3553658', 'Taquaritinga/Sp': '3553708', 'Taquarituba/Sp': '3553807', 'Taquarivaí/Sp': '3553856', 'Tarabai/Sp': '3553906', 'Tarumã/Sp': '3553955', 'Tatuí/Sp': '3554003', 'Taubaté/Sp': '3554102', 'Tejupá/Sp': '3554201', 'TeodoroSampaio/Sp': '3554300', 'TerraRoxa/Sp': '3554409', 'Tietê/Sp': '3554508', 'Timburi/Sp': '3554607', 'TorreDePedra/Sp': '3554656', 'Torrinha/Sp': '3554706', 'Trabiju/Sp': '3554755', 'Tremembé/Sp': '3554805', 'TrêsFronteiras/Sp': '3554904', 'Tuiuti/Sp': '3554953', 'Tupã/Sp': '3555000', 'TupiPaulista/Sp': '3555109', 'Turiúba/Sp': '3555208', 'Turmalina/Sp': '3555307', 'Ubarana/Sp': '3555356', 'Ubatuba/Sp': '3555406', 'Ubirajara/Sp': '3555505', 'Uchoa/Sp': '3555604', 'UniãoPaulista/Sp': '3555703', 'Urânia/Sp': '3555802', 'Uru/Sp': '3555901', 'Urupês/Sp': '3556008', 'ValentimGentil/Sp': '3556107', 'Valinhos/Sp': '3556206', 'Valparaíso/Sp': '3556305', 'Vargem/Sp': '3556354', 'VargemGrandeDoSul/Sp': '3556404', 'VargemGrandePaulista/Sp': '3556453', 'VárzeaPaulista/Sp': '3556503', 'VeraCruz/Sp': '3556602', 'Vinhedo/Sp': '3556701', 'Viradouro/Sp': '3556800', 'VistaAlegreDoAlto/Sp': '3556909', 'VitóriaBrasil/Sp': '3556958', 'Votorantim/Sp': '3557006', 'Votuporanga/Sp': '3557105', 'Zacarias/Sp': '3557154', 'Chavantes/Sp': '3557204', 'EstivaGerbi/Sp': '3557303', 'Abatiá/Pr': '4100103', 'Adrianópolis/Pr': '4100202', 'AgudosDoSul/Pr': '4100301', 'AlmiranteTamandaré/Pr': '4100400', 'AltamiraDoParaná/Pr': '4100459', 'Altônia/Pr': '4100509', 'AltoParaná/Pr': '4100608', 'AltoPiquiri/Pr': '4100707', 'AlvoradaDoSul/Pr': '4100806', 'Amaporã/Pr': '4100905', 'Ampére/Pr': '4101002', 'Anahy/Pr': '4101051', 'Andirá/Pr': '4101101', 'Ângulo/Pr': '4101150', 'Antonina/Pr': '4101200', 'AntônioOlinto/Pr': '4101309', 'Apucarana/Pr': '4101408', 'Arapongas/Pr': '4101507', 'Arapoti/Pr': '4101606', 'Arapuã/Pr': '4101655', 'Araruna/Pr': '4101705', 'Araucária/Pr': '4101804', 'AriranhaDoIvaí/Pr': '4101853', 'Assaí/Pr': '4101903', 'AssisChateaubriand/Pr': '4102000', 'Astorga/Pr': '4102109', 'Atalaia/Pr': '4102208', 'BalsaNova/Pr': '4102307', 'Bandeirantes/Pr': '4102406', 'BarbosaFerraz/Pr': '4102505', 'Barracão/Pr': '4102604', 'BarraDoJacaré/Pr': '4102703', 'BelaVistaDaCaroba/Pr': '4102752', 'BelaVistaDoParaíso/Pr': '4102802', 'Bituruna/Pr': '4102901', 'BoaEsperança/Pr': '4103008', 'BoaEsperançaDoIguaçu/Pr': '4103024', 'BoaVenturaDeSãoRoque/Pr': '4103040', 'BoaVistaDaAparecida/Pr': '4103057', 'BocaiúvaDoSul/Pr': '4103107', 'BomJesusDoSul/Pr': '4103156', 'BomSucesso/Pr': '4103206', 'BomSucessoDoSul/Pr': '4103222', 'Borrazópolis/Pr': '4103305', 'Braganey/Pr': '4103354', 'BrasilândiaDoSul/Pr': '4103370', 'Cafeara/Pr': '4103404', 'Cafelândia/Pr': '4103453', 'CafezalDoSul/Pr': '4103479', 'Califórnia/Pr': '4103503', 'Cambará/Pr': '4103602', 'Cambé/Pr': '4103701', 'Cambira/Pr': '4103800', 'CampinaDaLagoa/Pr': '4103909', 'CampinaDoSimão/Pr': '4103958', 'CampinaGrandeDoSul/Pr': '4104006', 'CampoBonito/Pr': '4104055', 'CampoDoTenente/Pr': '4104105', 'CampoLargo/Pr': '4104204', 'CampoMagro/Pr': '4104253', 'CampoMourão/Pr': '4104303', 'CândidoDeAbreu/Pr': '4104402', 'Candói/Pr': '4104428', 'Cantagalo/Pr': '4104451', 'Capanema/Pr': '4104501', 'CapitãoLeônidasMarques/Pr': '4104600', 'Carambeí/Pr': '4104659', 'Carlópolis/Pr': '4104709', 'Cascavel/Pr': '4104808', 'Castro/Pr': '4104907', 'Catanduvas/Pr': '4105003', 'CentenárioDoSul/Pr': '4105102', 'CerroAzul/Pr': '4105201', 'CéuAzul/Pr': '4105300', 'Chopinzinho/Pr': '4105409', 'Cianorte/Pr': '4105508', 'CidadeGaúcha/Pr': '4105607', 'Clevelândia/Pr': '4105706', 'Colombo/Pr': '4105805', 'Colorado/Pr': '4105904', 'Congonhinhas/Pr': '4106001', 'ConselheiroMairinck/Pr': '4106100', 'Contenda/Pr': '4106209', 'Corbélia/Pr': '4106308', 'CornélioProcópio/Pr': '4106407', 'CoronelDomingosSoares/Pr': '4106456', 'CoronelVivida/Pr': '4106506', 'CorumbataíDoSul/Pr': '4106555', 'CruzeiroDoIguaçu/Pr': '4106571', 'CruzeiroDoOeste/Pr': '4106605', 'CruzeiroDoSul/Pr': '4106704', 'CruzMachado/Pr': '4106803', 'Cruzmaltina/Pr': '4106852', 'Curitiba/Pr': '4106902', 'Curiúva/Pr': '4107009', 'DiamanteDoNorte/Pr': '4107108', 'DiamanteDoSul/Pr': '4107124', "DiamanteD'Oeste/Pr": '4107157', 'DoisVizinhos/Pr': '4107207', 'Douradina/Pr': '4107256', 'DoutorCamargo/Pr': '4107306', 'EnéasMarques/Pr': '4107405', 'EngenheiroBeltrão/Pr': '4107504', 'EsperançaNova/Pr': '4107520', 'EntreRiosDoOeste/Pr': '4107538', 'EspigãoAltoDoIguaçu/Pr': '4107546', 'Farol/Pr': '4107553', 'Faxinal/Pr': '4107603', 'FazendaRioGrande/Pr': '4107652', 'Fênix/Pr': '4107702', 'FernandesPinheiro/Pr': '4107736', 'Figueira/Pr': '4107751', 'Floraí/Pr': '4107801', 'FlorDaSerraDoSul/Pr': '4107850', 'Floresta/Pr': '4107900', 'Florestópolis/Pr': '4108007', 'Flórida/Pr': '4108106', 'FormosaDoOeste/Pr': '4108205', 'FozDoIguaçu/Pr': '4108304', 'FranciscoAlves/Pr': '4108320', 'FranciscoBeltrão/Pr': '4108403', 'FozDoJordão/Pr': '4108452', 'GeneralCarneiro/Pr': '4108502', 'GodoyMoreira/Pr': '4108551', 'Goioerê/Pr': '4108601', 'Goioxim/Pr': '4108650', 'GrandesRios/Pr': '4108700', 'Guaíra/Pr': '4108809', 'Guairaçá/Pr': '4108908', 'Guamiranga/Pr': '4108957', 'Guapirama/Pr': '4109005', 'Guaporema/Pr': '4109104', 'Guaraci/Pr': '4109203', 'Guaraniaçu/Pr': '4109302', 'Guarapuava/Pr': '4109401', 'Guaraqueçaba/Pr': '4109500', 'Guaratuba/Pr': '4109609', 'HonórioSerpa/Pr': '4109658', 'Ibaiti/Pr': '4109708', 'Ibema/Pr': '4109757', 'Ibiporã/Pr': '4109807', 'Icaraíma/Pr': '4109906', 'Iguaraçu/Pr': '4110003', 'Iguatu/Pr': '4110052', 'Imbaú/Pr': '4110078', 'Imbituva/Pr': '4110102', 'InácioMartins/Pr': '4110201', 'Inajá/Pr': '4110300', 'Indianópolis/Pr': '4110409', 'Ipiranga/Pr': '4110508', 'Iporã/Pr': '4110607', 'IracemaDoOeste/Pr': '4110656', 'Irati/Pr': '4110706', 'Iretama/Pr': '4110805', 'Itaguajé/Pr': '4110904', 'Itaipulândia/Pr': '4110953', 'Itambaracá/Pr': '4111001', 'Itambé/Pr': '4111100', "ItapejaraD'Oeste/Pr": '4111209', 'Itaperuçu/Pr': '4111258', 'ItaúnaDoSul/Pr': '4111308', 'Ivaí/Pr': '4111407', 'Ivaiporã/Pr': '4111506', 'Ivaté/Pr': '4111555', 'Ivatuba/Pr': '4111605', 'Jaboti/Pr': '4111704', 'Jacarezinho/Pr': '4111803', 'Jaguapitã/Pr': '4111902', 'Jaguariaíva/Pr': '4112009', 'JandaiaDoSul/Pr': '4112108', 'Janiópolis/Pr': '4112207', 'Japira/Pr': '4112306', 'Japurá/Pr': '4112405', 'JardimAlegre/Pr': '4112504', 'JardimOlinda/Pr': '4112603', 'Jataizinho/Pr': '4112702', 'Jesuítas/Pr': '4112751', 'JoaquimTávora/Pr': '4112801', 'JundiaíDoSul/Pr': '4112900', 'Juranda/Pr': '4112959', 'Jussara/Pr': '4113007', 'Kaloré/Pr': '4113106', 'Lapa/Pr': '4113205', 'Laranjal/Pr': '4113254', 'LaranjeirasDoSul/Pr': '4113304', 'Leópolis/Pr': '4113403', 'Lidianópolis/Pr': '4113429', 'Lindoeste/Pr': '4113452', 'Loanda/Pr': '4113502', 'Lobato/Pr': '4113601', 'Londrina/Pr': '4113700', 'Luiziana/Pr': '4113734', 'Lunardelli/Pr': '4113759', 'Lupionópolis/Pr': '4113809', 'Mallet/Pr': '4113908', 'Mamborê/Pr': '4114005', 'Mandaguaçu/Pr': '4114104', 'Mandaguari/Pr': '4114203', 'Mandirituba/Pr': '4114302', 'Manfrinópolis/Pr': '4114351', 'Mangueirinha/Pr': '4114401', 'ManoelRibas/Pr': '4114500', 'MarechalCândidoRondon/Pr': '4114609', 'MariaHelena/Pr': '4114708', 'Marialva/Pr': '4114807', 'MarilândiaDoSul/Pr': '4114906', 'Marilena/Pr': '4115002', 'Mariluz/Pr': '4115101', 'Maringá/Pr': '4115200', 'Mariópolis/Pr': '4115309', 'Maripá/Pr': '4115358', 'Marmeleiro/Pr': '4115408', 'Marquinho/Pr': '4115457', 'Marumbi/Pr': '4115507', 'Matelândia/Pr': '4115606', 'Matinhos/Pr': '4115705', 'MatoRico/Pr': '4115739', 'MauáDaSerra/Pr': '4115754', 'Medianeira/Pr': '4115804', 'Mercedes/Pr': '4115853', 'Mirador/Pr': '4115903', 'Miraselva/Pr': '4116000', 'Missal/Pr': '4116059', 'MoreiraSales/Pr': '4116109', 'Morretes/Pr': '4116208', 'MunhozDeMelo/Pr': '4116307', 'NossaSenhoraDasGraças/Pr': '4116406', 'NovaAliançaDoIvaí/Pr': '4116505', 'NovaAméricaDaColina/Pr': '4116604', 'NovaAurora/Pr': '4116703', 'NovaCantu/Pr': '4116802', 'NovaEsperança/Pr': '4116901', 'NovaEsperançaDoSudoeste/Pr': '4116950', 'NovaFátima/Pr': '4117008', 'NovaLaranjeiras/Pr': '4117057', 'NovaLondrina/Pr': '4117107', 'NovaOlímpia/Pr': '4117206', 'NovaSantaBárbara/Pr': '4117214', 'NovaSantaRosa/Pr': '4117222', 'NovaPrataDoIguaçu/Pr': '4117255', 'NovaTebas/Pr': '4117271', 'NovoItacolomi/Pr': '4117297', 'Ortigueira/Pr': '4117305', 'Ourizona/Pr': '4117404', 'OuroVerdeDoOeste/Pr': '4117453', 'Paiçandu/Pr': '4117503', 'Palmas/Pr': '4117602', 'Palmeira/Pr': '4117701', 'Palmital/Pr': '4117800', 'Palotina/Pr': '4117909', 'ParaísoDoNorte/Pr': '4118006', 'Paranacity/Pr': '4118105', 'Paranaguá/Pr': '4118204', 'Paranapoema/Pr': '4118303', 'Paranavaí/Pr': '4118402', 'PatoBragado/Pr': '4118451', 'PatoBranco/Pr': '4118501', 'PaulaFreitas/Pr': '4118600', 'PauloFrontin/Pr': '4118709', 'Peabiru/Pr': '4118808', 'Perobal/Pr': '4118857', 'Pérola/Pr': '4118907', "PérolaD'Oeste/Pr": '4119004', 'Piên/Pr': '4119103', 'Pinhais/Pr': '4119152', 'Pinhalão/Pr': '4119202', 'PinhalDeSãoBento/Pr': '4119251', 'Pinhão/Pr': '4119301', 'PiraíDoSul/Pr': '4119400', 'Piraquara/Pr': '4119509', 'Pitanga/Pr': '4119608', 'Pitangueiras/Pr': '4119657', 'PlanaltinaDoParaná/Pr': '4119707', 'Planalto/Pr': '4119806', 'PontaGrossa/Pr': '4119905', 'PontalDoParaná/Pr': '4119954', 'Porecatu/Pr': '4120002', 'PortoAmazonas/Pr': '4120101', 'PortoBarreiro/Pr': '4120150', 'PortoRico/Pr': '4120200', 'PortoVitória/Pr': '4120309', 'PradoFerreira/Pr': '4120333', 'Pranchita/Pr': '4120358', 'PresidenteCasteloBranco/Pr': '4120408', 'PrimeiroDeMaio/Pr': '4120507', 'Prudentópolis/Pr': '4120606', 'QuartoCentenário/Pr': '4120655', 'Quatiguá/Pr': '4120705', 'QuatroBarras/Pr': '4120804', 'QuatroPontes/Pr': '4120853', 'QuedasDoIguaçu/Pr': '4120903', 'QuerênciaDoNorte/Pr': '4121000', 'QuintaDoSol/Pr': '4121109', 'Quitandinha/Pr': '4121208', 'Ramilândia/Pr': '4121257', 'RanchoAlegre/Pr': '4121307', "RanchoAlegreD'Oeste/Pr": '4121356', 'Realeza/Pr': '4121406', 'Rebouças/Pr': '4121505', 'Renascença/Pr': '4121604', 'Reserva/Pr': '4121703', 'ReservaDoIguaçu/Pr': '4121752', 'RibeirãoClaro/Pr': '4121802', 'RibeirãoDoPinhal/Pr': '4121901', 'RioAzul/Pr': '4122008', 'RioBom/Pr': '4122107', 'RioBonitoDoIguaçu/Pr': '4122156', 'RioBrancoDoIvaí/Pr': '4122172', 'RioBrancoDoSul/Pr': '4122206', 'RioNegro/Pr': '4122305', 'Rolândia/Pr': '4122404', 'Roncador/Pr': '4122503', 'Rondon/Pr': '4122602', 'RosárioDoIvaí/Pr': '4122651', 'Sabáudia/Pr': '4122701', 'SalgadoFilho/Pr': '4122800', 'SaltoDoItararé/Pr': '4122909', 'SaltoDoLontra/Pr': '4123006', 'SantaAmélia/Pr': '4123105', 'SantaCecíliaDoPavão/Pr': '4123204', 'SantaCruzDeMonteCastelo/Pr': '4123303', 'SantaFé/Pr': '4123402', 'SantaHelena/Pr': '4123501', 'SantaInês/Pr': '4123600', 'SantaIsabelDoIvaí/Pr': '4123709', 'SantaIzabelDoOeste/Pr': '4123808', 'SantaLúcia/Pr': '4123824', 'SantaMariaDoOeste/Pr': '4123857', 'SantaMariana/Pr': '4123907', 'SantaMônica/Pr': '4123956', 'SantanaDoItararé/Pr': '4124004', 'SantaTerezaDoOeste/Pr': '4124020', 'SantaTerezinhaDeItaipu/Pr': '4124053', 'SantoAntônioDaPlatina/Pr': '4124103', 'SantoAntônioDoCaiuá/Pr': '4124202', 'SantoAntônioDoParaíso/Pr': '4124301', 'SantoAntônioDoSudoeste/Pr': '4124400', 'SantoInácio/Pr': '4124509', 'SãoCarlosDoIvaí/Pr': '4124608', 'SãoJerônimoDaSerra/Pr': '4124707', 'SãoJoão/Pr': '4124806', 'SãoJoãoDoCaiuá/Pr': '4124905', 'SãoJoãoDoIvaí/Pr': '4125001', 'SãoJoãoDoTriunfo/Pr': '4125100', "SãoJorgeD'Oeste/Pr": '4125209', 'SãoJorgeDoIvaí/Pr': '4125308', 'SãoJorgeDoPatrocínio/Pr': '4125357', 'SãoJoséDaBoaVista/Pr': '4125407', 'SãoJoséDasPalmeiras/Pr': '4125456', 'SãoJoséDosPinhais/Pr': '4125506', 'SãoManoelDoParaná/Pr': '4125555', 'SãoMateusDoSul/Pr': '4125605', 'SãoMiguelDoIguaçu/Pr': '4125704', 'SãoPedroDoIguaçu/Pr': '4125753', 'SãoPedroDoIvaí/Pr': '4125803', 'SãoPedroDoParaná/Pr': '4125902', 'SãoSebastiãoDaAmoreira/Pr': '4126009', 'SãoTomé/Pr': '4126108', 'Sapopema/Pr': '4126207', 'Sarandi/Pr': '4126256', 'SaudadeDoIguaçu/Pr': '4126272', 'Sengés/Pr': '4126306', 'SerranópolisDoIguaçu/Pr': '4126355', 'Sertaneja/Pr': '4126405', 'Sertanópolis/Pr': '4126504', 'SiqueiraCampos/Pr': '4126603', 'Sulina/Pr': '4126652', 'Tamarana/Pr': '4126678', 'Tamboara/Pr': '4126702', 'Tapejara/Pr': '4126801', 'Tapira/Pr': '4126900', 'TeixeiraSoares/Pr': '4127007', 'TelêmacoBorba/Pr': '4127106', 'TerraBoa/Pr': '4127205', 'TerraRica/Pr': '4127304', 'TerraRoxa/Pr': '4127403', 'Tibagi/Pr': '4127502', 'TijucasDoSul/Pr': '4127601', 'Toledo/Pr': '4127700', 'Tomazina/Pr': '4127809', 'TrêsBarrasDoParaná/Pr': '4127858', 'TunasDoParaná/Pr': '4127882', 'TuneirasDoOeste/Pr': '4127908', 'Tupãssi/Pr': '4127957', 'Turvo/Pr': '4127965', 'Ubiratã/Pr': '4128005', 'Umuarama/Pr': '4128104', 'UniãoDaVitória/Pr': '4128203', 'Uniflor/Pr': '4128302', 'Uraí/Pr': '4128401', 'WenceslauBraz/Pr': '4128500', 'Ventania/Pr': '4128534', 'VeraCruzDoOeste/Pr': '4128559', 'Verê/Pr': '4128609', 'AltoParaíso/Pr': '4128625', 'DoutorUlysses/Pr': '4128633', 'Virmond/Pr': '4128658', 'Vitorino/Pr': '4128708', 'Xambrê/Pr': '4128807', 'AbdonBatista/Sc': '4200051', 'AbelardoLuz/Sc': '4200101', 'Agrolândia/Sc': '4200200', 'Agronômica/Sc': '4200309', 'ÁguaDoce/Sc': '4200408', 'ÁguasDeChapecó/Sc': '4200507', 'ÁguasFrias/Sc': '4200556', 'ÁguasMornas/Sc': '4200606', 'AlfredoWagner/Sc': '4200705', 'AltoBelaVista/Sc': '4200754', 'Anchieta/Sc': '4200804', 'Angelina/Sc': '4200903', 'AnitaGaribaldi/Sc': '4201000', 'Anitápolis/Sc': '4201109', 'AntônioCarlos/Sc': '4201208', 'Apiúna/Sc': '4201257', 'Arabutã/Sc': '4201273', 'Araquari/Sc': '4201307', 'Araranguá/Sc': '4201406', 'Armazém/Sc': '4201505', 'ArroioTrinta/Sc': '4201604', 'Arvoredo/Sc': '4201653', 'Ascurra/Sc': '4201703', 'Atalanta/Sc': '4201802', 'Aurora/Sc': '4201901', 'BalneárioArroioDoSilva/Sc': '4201950', 'BalneárioCamboriú/Sc': '4202008', 'BalneárioBarraDoSul/Sc': '4202057', 'BalneárioGaivota/Sc': '4202073', 'Bandeirante/Sc': '4202081', 'BarraBonita/Sc': '4202099', 'BarraVelha/Sc': '4202107', 'BelaVistaDoToldo/Sc': '4202131', 'Belmonte/Sc': '4202156', 'BeneditoNovo/Sc': '4202206', 'Biguaçu/Sc': '4202305', 'Blumenau/Sc': '4202404', 'BocainaDoSul/Sc': '4202438', 'Bombinhas/Sc': '4202453', 'BomJardimDaSerra/Sc': '4202503', 'BomJesus/Sc': '4202537', 'BomJesusDoOeste/Sc': '4202578', 'BomRetiro/Sc': '4202602', 'Botuverá/Sc': '4202701', 'BraçoDoNorte/Sc': '4202800', 'BraçoDoTrombudo/Sc': '4202859', 'Brunópolis/Sc': '4202875', 'Brusque/Sc': '4202909', 'Caçador/Sc': '4203006', 'Caibi/Sc': '4203105', 'Calmon/Sc': '4203154', 'Camboriú/Sc': '4203204', 'CapãoAlto/Sc': '4203253', 'CampoAlegre/Sc': '4203303', 'CampoBeloDoSul/Sc': '4203402', 'CampoErê/Sc': '4203501', 'CamposNovos/Sc': '4203600', 'Canelinha/Sc': '4203709', 'Canoinhas/Sc': '4203808', 'Capinzal/Sc': '4203907', 'CapivariDeBaixo/Sc': '4203956', 'Catanduvas/Sc': '4204004', 'CaxambuDoSul/Sc': '4204103', 'CelsoRamos/Sc': '4204152', 'CerroNegro/Sc': '4204178', 'ChapadãoDoLageado/Sc': '4204194', 'Chapecó/Sc': '4204202', 'CocalDoSul/Sc': '4204251', 'Concórdia/Sc': '4204301', 'CordilheiraAlta/Sc': '4204350', 'CoronelFreitas/Sc': '4204400', 'CoronelMartins/Sc': '4204459', 'Corupá/Sc': '4204509', 'CorreiaPinto/Sc': '4204558', 'Criciúma/Sc': '4204608', 'CunhaPorã/Sc': '4204707', 'Cunhataí/Sc': '4204756', 'Curitibanos/Sc': '4204806', 'Descanso/Sc': '4204905', 'DionísioCerqueira/Sc': '4205001', 'DonaEmma/Sc': '4205100', 'DoutorPedrinho/Sc': '4205159', 'EntreRios/Sc': '4205175', 'Ermo/Sc': '4205191', 'ErvalVelho/Sc': '4205209', 'FaxinalDosGuedes/Sc': '4205308', 'FlorDoSertão/Sc': '4205357', 'Florianópolis/Sc': '4205407', 'FormosaDoSul/Sc': '4205431', 'Forquilhinha/Sc': '4205456', 'Fraiburgo/Sc': '4205506', 'FreiRogério/Sc': '4205555', 'Galvão/Sc': '4205605', 'Garopaba/Sc': '4205704', 'Garuva/Sc': '4205803', 'Gaspar/Sc': '4205902', 'GovernadorCelsoRamos/Sc': '4206009', 'GrãoPará/Sc': '4206108', 'Gravatal/Sc': '4206207', 'Guabiruba/Sc': '4206306', 'Guaraciaba/Sc': '4206405', 'Guaramirim/Sc': '4206504', 'GuarujáDoSul/Sc': '4206603', 'Guatambú/Sc': '4206652', "HervalD'Oeste/Sc": '4206702', 'Ibiam/Sc': '4206751', 'Ibicaré/Sc': '4206801', 'Ibirama/Sc': '4206900', 'Içara/Sc': '4207007', 'Ilhota/Sc': '4207106', 'Imaruí/Sc': '4207205', 'Imbituba/Sc': '4207304', 'Imbuia/Sc': '4207403', 'Indaial/Sc': '4207502', 'Iomerê/Sc': '4207577', 'Ipira/Sc': '4207601', 'IporãDoOeste/Sc': '4207650', 'Ipuaçu/Sc': '4207684', 'Ipumirim/Sc': '4207700', 'Iraceminha/Sc': '4207759', 'Irani/Sc': '4207809', 'Irati/Sc': '4207858', 'Irineópolis/Sc': '4207908', 'Itá/Sc': '4208005', 'Itaiópolis/Sc': '4208104', 'Itajaí/Sc': '4208203', 'Itapema/Sc': '4208302', 'Itapiranga/Sc': '4208401', 'Itapoá/Sc': '4208450', 'Ituporanga/Sc': '4208500', 'Jaborá/Sc': '4208609', 'JacintoMachado/Sc': '4208708', 'Jaguaruna/Sc': '4208807', 'JaraguáDoSul/Sc': '4208906', 'Jardinópolis/Sc': '4208955', 'Joaçaba/Sc': '4209003', 'Joinville/Sc': '4209102', 'JoséBoiteux/Sc': '4209151', 'Jupiá/Sc': '4209177', 'Lacerdópolis/Sc': '4209201', 'Lages/Sc': '4209300', 'Laguna/Sc': '4209409', 'LajeadoGrande/Sc': '4209458', 'Laurentino/Sc': '4209508', 'LauroMüller/Sc': '4209607', 'LebonRégis/Sc': '4209706', 'LeobertoLeal/Sc': '4209805', 'LindóiaDoSul/Sc': '4209854', 'Lontras/Sc': '4209904', 'LuizAlves/Sc': '4210001', 'Luzerna/Sc': '4210035', 'Macieira/Sc': '4210050', 'Mafra/Sc': '4210100', 'MajorGercino/Sc': '4210209', 'MajorVieira/Sc': '4210308', 'Maracajá/Sc': '4210407', 'Maravilha/Sc': '4210506', 'Marema/Sc': '4210555', 'Massaranduba/Sc': '4210605', 'MatosCosta/Sc': '4210704', 'Meleiro/Sc': '4210803', 'MirimDoce/Sc': '4210852', 'Modelo/Sc': '4210902', 'Mondaí/Sc': '4211009', 'MonteCarlo/Sc': '4211058', 'MonteCastelo/Sc': '4211108', 'MorroDaFumaça/Sc': '4211207', 'MorroGrande/Sc': '4211256', 'Navegantes/Sc': '4211306', 'NovaErechim/Sc': '4211405', 'NovaItaberaba/Sc': '4211454', 'NovaTrento/Sc': '4211504', 'NovaVeneza/Sc': '4211603', 'NovoHorizonte/Sc': '4211652', 'Orleans/Sc': '4211702', 'OtacílioCosta/Sc': '4211751', 'Ouro/Sc': '4211801', 'OuroVerde/Sc': '4211850', 'Paial/Sc': '4211876', 'Painel/Sc': '4211892', 'Palhoça/Sc': '4211900', 'PalmaSola/Sc': '4212007', 'Palmeira/Sc': '4212056', 'Palmitos/Sc': '4212106', 'Papanduva/Sc': '4212205', 'Paraíso/Sc': '4212239', 'PassoDeTorres/Sc': '4212254', 'PassosMaia/Sc': '4212270', 'PauloLopes/Sc': '4212304', 'PedrasGrandes/Sc': '4212403', 'Penha/Sc': '4212502', 'Peritiba/Sc': '4212601', 'PescariaBrava/Sc': '4212650', 'Petrolândia/Sc': '4212700', 'BalneárioPiçarras/Sc': '4212809', 'Pinhalzinho/Sc': '4212908', 'PinheiroPreto/Sc': '4213005', 'Piratuba/Sc': '4213104', 'PlanaltoAlegre/Sc': '4213153', 'Pomerode/Sc': '4213203', 'PonteAlta/Sc': '4213302', 'PonteAltaDoNorte/Sc': '4213351', 'PonteSerrada/Sc': '4213401', 'PortoBelo/Sc': '4213500', 'PortoUnião/Sc': '4213609', 'PousoRedondo/Sc': '4213708', 'PraiaGrande/Sc': '4213807', 'PresidenteCastelloBranco/Sc': '4213906', 'PresidenteGetúlio/Sc': '4214003', 'PresidenteNereu/Sc': '4214102', 'Princesa/Sc': '4214151', 'Quilombo/Sc': '4214201', 'RanchoQueimado/Sc': '4214300', 'RioDasAntas/Sc': '4214409', 'RioDoCampo/Sc': '4214508', 'RioDoOeste/Sc': '4214607', 'RioDosCedros/Sc': '4214706', 'RioDoSul/Sc': '4214805', 'RioFortuna/Sc': '4214904', 'RioNegrinho/Sc': '4215000', 'RioRufino/Sc': '4215059', 'Riqueza/Sc': '4215075', 'Rodeio/Sc': '4215109', 'Romelândia/Sc': '4215208', 'Salete/Sc': '4215307', 'Saltinho/Sc': '4215356', 'SaltoVeloso/Sc': '4215406', 'Sangão/Sc': '4215455', 'SantaCecília/Sc': '4215505', 'SantaHelena/Sc': '4215554', 'SantaRosaDeLima/Sc': '4215604', 'SantaRosaDoSul/Sc': '4215653', 'SantaTerezinha/Sc': '4215679', 'SantaTerezinhaDoProgresso/Sc': '4215687', 'SantiagoDoSul/Sc': '4215695', 'SantoAmaroDaImperatriz/Sc': '4215703', 'SãoBernardino/Sc': '4215752', 'SãoBentoDoSul/Sc': '4215802', 'SãoBonifácio/Sc': '4215901', 'SãoCarlos/Sc': '4216008', 'SãoCristóvãoDoSul/Sc': '4216057', 'SãoDomingos/Sc': '4216107', 'SãoFranciscoDoSul/Sc': '4216206', 'SãoJoãoDoOeste/Sc': '4216255', 'SãoJoãoBatista/Sc': '4216305', 'SãoJoãoDoItaperiú/Sc': '4216354', 'SãoJoãoDoSul/Sc': '4216404', 'SãoJoaquim/Sc': '4216503', 'SãoJosé/Sc': '4216602', 'SãoJoséDoCedro/Sc': '4216701', 'SãoJoséDoCerrito/Sc': '4216800', 'SãoLourençoDoOeste/Sc': '4216909', 'SãoLudgero/Sc': '4217006', 'SãoMartinho/Sc': '4217105', 'SãoMiguelDaBoaVista/Sc': '4217154', 'SãoMiguelDoOeste/Sc': '4217204', 'SãoPedroDeAlcântara/Sc': '4217253', 'Saudades/Sc': '4217303', 'Schroeder/Sc': '4217402', 'Seara/Sc': '4217501', 'SerraAlta/Sc': '4217550', 'Siderópolis/Sc': '4217600', 'Sombrio/Sc': '4217709', 'SulBrasil/Sc': '4217758', 'Taió/Sc': '4217808', 'Tangará/Sc': '4217907', 'Tigrinhos/Sc': '4217956', 'Tijucas/Sc': '4218004', 'TimbéDoSul/Sc': '4218103', 'Timbó/Sc': '4218202', 'TimbóGrande/Sc': '4218251', 'TrêsBarras/Sc': '4218301', 'Treviso/Sc': '4218350', 'TrezeDeMaio/Sc': '4218400', 'TrezeTílias/Sc': '4218509', 'TrombudoCentral/Sc': '4218608', 'Tubarão/Sc': '4218707', 'Tunápolis/Sc': '4218756', 'Turvo/Sc': '4218806', 'UniãoDoOeste/Sc': '4218855', 'Urubici/Sc': '4218905', 'Urupema/Sc': '4218954', 'Urussanga/Sc': '4219002', 'Vargeão/Sc': '4219101', 'Vargem/Sc': '4219150', 'VargemBonita/Sc': '4219176', 'VidalRamos/Sc': '4219200', 'Videira/Sc': '4219309', 'VitorMeireles/Sc': '4219358', 'Witmarsum/Sc': '4219408', 'Xanxerê/Sc': '4219507', 'Xavantina/Sc': '4219606', 'Xaxim/Sc': '4219705', 'Zortéa/Sc': '4219853', 'BalneárioRincão/Sc': '4220000', 'Aceguá/Rs': '4300034', 'ÁguaSanta/Rs': '4300059', 'Agudo/Rs': '4300109', 'Ajuricaba/Rs': '4300208', 'Alecrim/Rs': '4300307', 'Alegrete/Rs': '4300406', 'Alegria/Rs': '4300455', 'AlmiranteTamandaréDoSul/Rs': '4300471', 'Alpestre/Rs': '4300505', 'AltoAlegre/Rs': '4300554', 'AltoFeliz/Rs': '4300570', 'Alvorada/Rs': '4300604', 'AmaralFerrador/Rs': '4300638', 'AmetistaDoSul/Rs': '4300646', 'AndréDaRocha/Rs': '4300661', 'AntaGorda/Rs': '4300703', 'AntônioPrado/Rs': '4300802', 'Arambaré/Rs': '4300851', 'Araricá/Rs': '4300877', 'Aratiba/Rs': '4300901', 'ArroioDoMeio/Rs': '4301008', 'ArroioDoSal/Rs': '4301057', 'ArroioDoPadre/Rs': '4301073', 'ArroioDosRatos/Rs': '4301107', 'ArroioDoTigre/Rs': '4301206', 'ArroioGrande/Rs': '4301305', 'Arvorezinha/Rs': '4301404', 'AugustoPestana/Rs': '4301503', 'Áurea/Rs': '4301552', 'Bagé/Rs': '4301602', 'BalneárioPinhal/Rs': '4301636', 'Barão/Rs': '4301651', 'BarãoDeCotegipe/Rs': '4301701', 'BarãoDoTriunfo/Rs': '4301750', 'Barracão/Rs': '4301800', 'BarraDoGuarita/Rs': '4301859', 'BarraDoQuaraí/Rs': '4301875', 'BarraDoRibeiro/Rs': '4301909', 'BarraDoRioAzul/Rs': '4301925', 'BarraFunda/Rs': '4301958', 'BarrosCassal/Rs': '4302006', 'BenjaminConstantDoSul/Rs': '4302055', 'BentoGonçalves/Rs': '4302105', 'BoaVistaDasMissões/Rs': '4302154', 'BoaVistaDoBuricá/Rs': '4302204', 'BoaVistaDoCadeado/Rs': '4302220', 'BoaVistaDoIncra/Rs': '4302238', 'BoaVistaDoSul/Rs': '4302253', 'BomJesus/Rs': '4302303', 'BomPrincípio/Rs': '4302352', 'BomProgresso/Rs': '4302378', 'BomRetiroDoSul/Rs': '4302402', 'BoqueirãoDoLeão/Rs': '4302451', 'Bossoroca/Rs': '4302501', 'Bozano/Rs': '4302584', 'Braga/Rs': '4302600', 'Brochier/Rs': '4302659', 'Butiá/Rs': '4302709', 'CaçapavaDoSul/Rs': '4302808', 'Cacequi/Rs': '4302907', 'CachoeiraDoSul/Rs': '4303004', 'Cachoeirinha/Rs': '4303103', 'CaciqueDoble/Rs': '4303202', 'Caibaté/Rs': '4303301', 'Caiçara/Rs': '4303400', 'Camaquã/Rs': '4303509', 'Camargo/Rs': '4303558', 'CambaráDoSul/Rs': '4303608', 'CampestreDaSerra/Rs': '4303673', 'CampinaDasMissões/Rs': '4303707', 'CampinasDoSul/Rs': '4303806', 'CampoBom/Rs': '4303905', 'CampoNovo/Rs': '4304002', 'CamposBorges/Rs': '4304101', 'Candelária/Rs': '4304200', 'CândidoGodói/Rs': '4304309', 'Candiota/Rs': '4304358', 'Canela/Rs': '4304408', 'Canguçu/Rs': '4304507', 'Canoas/Rs': '4304606', 'CanudosDoVale/Rs': '4304614', 'CapãoBonitoDoSul/Rs': '4304622', 'CapãoDaCanoa/Rs': '4304630', 'CapãoDoCipó/Rs': '4304655', 'CapãoDoLeão/Rs': '4304663', 'CapivariDoSul/Rs': '4304671', 'CapelaDeSantana/Rs': '4304689', 'Capitão/Rs': '4304697', 'Carazinho/Rs': '4304705', 'Caraá/Rs': '4304713', 'CarlosBarbosa/Rs': '4304804', 'CarlosGomes/Rs': '4304853', 'Casca/Rs': '4304903', 'Caseiros/Rs': '4304952', 'Catuípe/Rs': '4305009', 'CaxiasDoSul/Rs': '4305108', 'Centenário/Rs': '4305116', 'Cerrito/Rs': '4305124', 'CerroBranco/Rs': '4305132', 'CerroGrande/Rs': '4305157', 'CerroGrandeDoSul/Rs': '4305173', 'CerroLargo/Rs': '4305207', 'Chapada/Rs': '4305306', 'Charqueadas/Rs': '4305355', 'Charrua/Rs': '4305371', 'Chiapetta/Rs': '4305405', 'Chuí/Rs': '4305439', 'Chuvisca/Rs': '4305447', 'Cidreira/Rs': '4305454', 'Ciríaco/Rs': '4305504', 'Colinas/Rs': '4305587', 'Colorado/Rs': '4305603', 'Condor/Rs': '4305702', 'Constantina/Rs': '4305801', 'CoqueiroBaixo/Rs': '4305835', 'CoqueirosDoSul/Rs': '4305850', 'CoronelBarros/Rs': '4305871', 'CoronelBicaco/Rs': '4305900', 'CoronelPilar/Rs': '4305934', 'Cotiporã/Rs': '4305959', 'Coxilha/Rs': '4305975', 'Crissiumal/Rs': '4306007', 'Cristal/Rs': '4306056', 'CristalDoSul/Rs': '4306072', 'CruzAlta/Rs': '4306106', 'Cruzaltense/Rs': '4306130', 'CruzeiroDoSul/Rs': '4306205', 'DavidCanabarro/Rs': '4306304', 'Derrubadas/Rs': '4306320', 'DezesseisDeNovembro/Rs': '4306353', 'DilermandoDeAguiar/Rs': '4306379', 'DoisIrmãos/Rs': '4306403', 'DoisIrmãosDasMissões/Rs': '4306429', 'DoisLajeados/Rs': '4306452', 'DomFeliciano/Rs': '4306502', 'DomPedroDeAlcântara/Rs': '4306551', 'DomPedrito/Rs': '4306601', 'DonaFrancisca/Rs': '4306700', 'DoutorMaurícioCardoso/Rs': '4306734', 'DoutorRicardo/Rs': '4306759', 'EldoradoDoSul/Rs': '4306767', 'Encantado/Rs': '4306809', 'EncruzilhadaDoSul/Rs': '4306908', 'EngenhoVelho/Rs': '4306924', 'EntreIjuís/Rs': '4306932', 'EntreRiosDoSul/Rs': '4306957', 'Erebango/Rs': '4306973', 'Erechim/Rs': '4307005', 'Ernestina/Rs': '4307054', 'Herval/Rs': '4307104', 'ErvalGrande/Rs': '4307203', 'ErvalSeco/Rs': '4307302', 'Esmeralda/Rs': '4307401', 'EsperançaDoSul/Rs': '4307450', 'Espumoso/Rs': '4307500', 'Estação/Rs': '4307559', 'EstânciaVelha/Rs': '4307609', 'Esteio/Rs': '4307708', 'Estrela/Rs': '4307807', 'EstrelaVelha/Rs': '4307815', 'EugênioDeCastro/Rs': '4307831', 'FagundesVarela/Rs': '4307864', 'Farroupilha/Rs': '4307906', 'FaxinalDoSoturno/Rs': '4308003', 'Faxinalzinho/Rs': '4308052', 'FazendaVilanova/Rs': '4308078', 'Feliz/Rs': '4308102', 'FloresDaCunha/Rs': '4308201', 'FlorianoPeixoto/Rs': '4308250', 'FontouraXavier/Rs': '4308300', 'Formigueiro/Rs': '4308409', 'Forquetinha/Rs': '4308433', 'FortalezaDosValos/Rs': '4308458', 'FredericoWestphalen/Rs': '4308508', 'Garibaldi/Rs': '4308607', 'Garruchos/Rs': '4308656', 'Gaurama/Rs': '4308706', 'GeneralCâmara/Rs': '4308805', 'Gentil/Rs': '4308854', 'GetúlioVargas/Rs': '4308904', 'Giruá/Rs': '4309001', 'Glorinha/Rs': '4309050', 'Gramado/Rs': '4309100', 'GramadoDosLoureiros/Rs': '4309126', 'GramadoXavier/Rs': '4309159', 'Gravataí/Rs': '4309209', 'Guabiju/Rs': '4309258', 'Guaíba/Rs': '4309308', 'Guaporé/Rs': '4309407', 'GuaraniDasMissões/Rs': '4309506', 'Harmonia/Rs': '4309555', 'Herveiras/Rs': '4309571', 'Horizontina/Rs': '4309605', 'HulhaNegra/Rs': '4309654', 'Humaitá/Rs': '4309704', 'Ibarama/Rs': '4309753', 'Ibiaçá/Rs': '4309803', 'Ibiraiaras/Rs': '4309902', 'Ibirapuitã/Rs': '4309951', 'Ibirubá/Rs': '4310009', 'Igrejinha/Rs': '4310108', 'Ijuí/Rs': '4310207', 'Ilópolis/Rs': '4310306', 'Imbé/Rs': '4310330', 'Imigrante/Rs': '4310363', 'Independência/Rs': '4310405', 'Inhacorá/Rs': '4310413', 'Ipê/Rs': '4310439', 'IpirangaDoSul/Rs': '4310462', 'Iraí/Rs': '4310504', 'Itaara/Rs': '4310538', 'Itacurubi/Rs': '4310553', 'Itapuca/Rs': '4310579', 'Itaqui/Rs': '4310603', 'Itati/Rs': '4310652', 'ItatibaDoSul/Rs': '4310702', 'Ivorá/Rs': '4310751', 'Ivoti/Rs': '4310801', 'Jaboticaba/Rs': '4310850', 'Jacuizinho/Rs': '4310876', 'Jacutinga/Rs': '4310900', 'Jaguarão/Rs': '4311007', 'Jaguari/Rs': '4311106', 'Jaquirana/Rs': '4311122', 'Jari/Rs': '4311130', 'Jóia/Rs': '4311155', 'JúlioDeCastilhos/Rs': '4311205', 'LagoaBonitaDoSul/Rs': '4311239', 'Lagoão/Rs': '4311254', 'LagoaDosTrêsCantos/Rs': '4311270', 'LagoaVermelha/Rs': '4311304', 'Lajeado/Rs': '4311403', 'LajeadoDoBugre/Rs': '4311429', 'LavrasDoSul/Rs': '4311502', 'LiberatoSalzano/Rs': '4311601', 'LindolfoCollor/Rs': '4311627', 'LinhaNova/Rs': '4311643', 'Machadinho/Rs': '4311700', 'Maçambará/Rs': '4311718', 'Mampituba/Rs': '4311734', 'ManoelViana/Rs': '4311759', 'Maquiné/Rs': '4311775', 'Maratá/Rs': '4311791', 'Marau/Rs': '4311809', 'MarcelinoRamos/Rs': '4311908', 'MarianaPimentel/Rs': '4311981', 'MarianoMoro/Rs': '4312005', 'MarquesDeSouza/Rs': '4312054', 'Mata/Rs': '4312104', 'MatoCastelhano/Rs': '4312138', 'MatoLeitão/Rs': '4312153', 'MatoQueimado/Rs': '4312179', 'MaximilianoDeAlmeida/Rs': '4312203', 'MinasDoLeão/Rs': '4312252', 'Miraguaí/Rs': '4312302', 'Montauri/Rs': '4312351', 'MonteAlegreDosCampos/Rs': '4312377', 'MonteBeloDoSul/Rs': '4312385', 'Montenegro/Rs': '4312401', 'Mormaço/Rs': '4312427', 'MorrinhosDoSul/Rs': '4312443', 'MorroRedondo/Rs': '4312450', 'MorroReuter/Rs': '4312476', 'Mostardas/Rs': '4312500', 'Muçum/Rs': '4312609', 'MuitosCapões/Rs': '4312617', 'Muliterno/Rs': '4312625', 'NãoMeToque/Rs': '4312658', 'NicolauVergueiro/Rs': '4312674', 'Nonoai/Rs': '4312708', 'NovaAlvorada/Rs': '4312757', 'NovaAraçá/Rs': '4312807', 'NovaBassano/Rs': '4312906', 'NovaBoaVista/Rs': '4312955', 'NovaBréscia/Rs': '4313003', 'NovaCandelária/Rs': '4313011', 'NovaEsperançaDoSul/Rs': '4313037', 'NovaHartz/Rs': '4313060', 'NovaPádua/Rs': '4313086', 'NovaPalma/Rs': '4313102', 'NovaPetrópolis/Rs': '4313201', 'NovaPrata/Rs': '4313300', 'NovaRamada/Rs': '4313334', 'NovaRomaDoSul/Rs': '4313359', 'NovaSantaRita/Rs': '4313375', 'NovoCabrais/Rs': '4313391', 'NovoHamburgo/Rs': '4313409', 'NovoMachado/Rs': '4313425', 'NovoTiradentes/Rs': '4313441', 'NovoXingu/Rs': '4313466', 'NovoBarreiro/Rs': '4313490', 'Osório/Rs': '4313508', 'PaimFilho/Rs': '4313607', 'PalmaresDoSul/Rs': '4313656', 'PalmeiraDasMissões/Rs': '4313706', 'Palmitinho/Rs': '4313805', 'Panambi/Rs': '4313904', 'PantanoGrande/Rs': '4313953', 'Paraí/Rs': '4314001', 'ParaísoDoSul/Rs': '4314027', 'PareciNovo/Rs': '4314035', 'Parobé/Rs': '4314050', 'PassaSete/Rs': '4314068', 'PassoDoSobrado/Rs': '4314076', 'PassoFundo/Rs': '4314100', 'PauloBento/Rs': '4314134', 'Paverama/Rs': '4314159', 'PedrasAltas/Rs': '4314175', 'PedroOsório/Rs': '4314209', 'Pejuçara/Rs': '4314308', 'Pelotas/Rs': '4314407', 'PicadaCafé/Rs': '4314423', 'Pinhal/Rs': '4314456', 'PinhalDaSerra/Rs': '4314464', 'PinhalGrande/Rs': '4314472', 'PinheirinhoDoVale/Rs': '4314498', 'PinheiroMachado/Rs': '4314506', 'PintoBandeira/Rs': '4314548', 'Pirapó/Rs': '4314555', 'Piratini/Rs': '4314605', 'Planalto/Rs': '4314704', 'PoçoDasAntas/Rs': '4314753', 'Pontão/Rs': '4314779', 'PontePreta/Rs': '4314787', 'Portão/Rs': '4314803', 'PortoAlegre/Rs': '4314902', 'PortoLucena/Rs': '4315008', 'PortoMauá/Rs': '4315057', 'PortoVeraCruz/Rs': '4315073', 'PortoXavier/Rs': '4315107', 'PousoNovo/Rs': '4315131', 'PresidenteLucena/Rs': '4315149', 'Progresso/Rs': '4315156', 'ProtásioAlves/Rs': '4315172', 'Putinga/Rs': '4315206', 'Quaraí/Rs': '4315305', 'QuatroIrmãos/Rs': '4315313', 'Quevedos/Rs': '4315321', 'QuinzeDeNovembro/Rs': '4315354', 'Redentora/Rs': '4315404', 'Relvado/Rs': '4315453', 'RestingaSêca/Rs': '4315503', 'RioDosÍndios/Rs': '4315552', 'RioGrande/Rs': '4315602', 'RioPardo/Rs': '4315701', 'Riozinho/Rs': '4315750', 'RocaSales/Rs': '4315800', 'RodeioBonito/Rs': '4315909', 'Rolador/Rs': '4315958', 'Rolante/Rs': '4316006', 'RondaAlta/Rs': '4316105', 'Rondinha/Rs': '4316204', 'RoqueGonzales/Rs': '4316303', 'RosárioDoSul/Rs': '4316402', 'SagradaFamília/Rs': '4316428', 'SaldanhaMarinho/Rs': '4316436', 'SaltoDoJacuí/Rs': '4316451', 'SalvadorDasMissões/Rs': '4316477', 'SalvadorDoSul/Rs': '4316501', 'Sananduva/Rs': '4316600', 'SantaBárbaraDoSul/Rs': '4316709', 'SantaCecíliaDoSul/Rs': '4316733', 'SantaClaraDoSul/Rs': '4316758', 'SantaCruzDoSul/Rs': '4316808', 'SantaMaria/Rs': '4316907', 'SantaMariaDoHerval/Rs': '4316956', 'SantaMargaridaDoSul/Rs': '4316972', 'SantanaDaBoaVista/Rs': '4317004', "Sant'AnaDoLivramento/Rs": '4317103', 'SantaRosa/Rs': '4317202', 'SantaTereza/Rs': '4317251', 'SantaVitóriaDoPalmar/Rs': '4317301', 'Santiago/Rs': '4317400', 'SantoÂngelo/Rs': '4317509', 'SantoAntônioDoPalma/Rs': '4317558', 'SantoAntônioDaPatrulha/Rs': '4317608', 'SantoAntônioDasMissões/Rs': '4317707', 'SantoAntônioDoPlanalto/Rs': '4317756', 'SantoAugusto/Rs': '4317806', 'SantoCristo/Rs': '4317905', 'SantoExpeditoDoSul/Rs': '4317954', 'SãoBorja/Rs': '4318002', 'SãoDomingosDoSul/Rs': '4318051', 'SãoFranciscoDeAssis/Rs': '4318101', 'SãoFranciscoDePaula/Rs': '4318200', 'SãoGabriel/Rs': '4318309', 'SãoJerônimo/Rs': '4318408', 'SãoJoãoDaUrtiga/Rs': '4318424', 'SãoJoãoDoPolêsine/Rs': '4318432', 'SãoJorge/Rs': '4318440', 'SãoJoséDasMissões/Rs': '4318457', 'SãoJoséDoHerval/Rs': '4318465', 'SãoJoséDoHortêncio/Rs': '4318481', 'SãoJoséDoInhacorá/Rs': '4318499', 'SãoJoséDoNorte/Rs': '4318507', 'SãoJoséDoOuro/Rs': '4318606', 'SãoJoséDoSul/Rs': '4318614', 'SãoJoséDosAusentes/Rs': '4318622', 'SãoLeopoldo/Rs': '4318705', 'SãoLourençoDoSul/Rs': '4318804', 'SãoLuizGonzaga/Rs': '4318903', 'SãoMarcos/Rs': '4319000', 'SãoMartinho/Rs': '4319109', 'SãoMartinhoDaSerra/Rs': '4319125', 'SãoMiguelDasMissões/Rs': '4319158', 'SãoNicolau/Rs': '4319208', 'SãoPauloDasMissões/Rs': '4319307', 'SãoPedroDaSerra/Rs': '4319356', 'SãoPedroDasMissões/Rs': '4319364', 'SãoPedroDoButiá/Rs': '4319372', 'SãoPedroDoSul/Rs': '4319406', 'SãoSebastiãoDoCaí/Rs': '4319505', 'SãoSepé/Rs': '4319604', 'SãoValentim/Rs': '4319703', 'SãoValentimDoSul/Rs': '4319711', 'SãoValérioDoSul/Rs': '4319737', 'SãoVendelino/Rs': '4319752', 'SãoVicenteDoSul/Rs': '4319802', 'Sapiranga/Rs': '4319901', 'SapucaiaDoSul/Rs': '4320008', 'Sarandi/Rs': '4320107', 'Seberi/Rs': '4320206', 'SedeNova/Rs': '4320230', 'Segredo/Rs': '4320263', 'Selbach/Rs': '4320305', 'SenadorSalgadoFilho/Rs': '4320321', 'SentinelaDoSul/Rs': '4320354', 'SerafinaCorrêa/Rs': '4320404', 'Sério/Rs': '4320453', 'Sertão/Rs': '4320503', 'SertãoSantana/Rs': '4320552', 'SeteDeSetembro/Rs': '4320578', 'SeverianoDeAlmeida/Rs': '4320602', 'SilveiraMartins/Rs': '4320651', 'Sinimbu/Rs': '4320677', 'Sobradinho/Rs': '4320701', 'Soledade/Rs': '4320800', 'Tabaí/Rs': '4320859', 'Tapejara/Rs': '4320909', 'Tapera/Rs': '4321006', 'Tapes/Rs': '4321105', 'Taquara/Rs': '4321204', 'Taquari/Rs': '4321303', 'TaquaruçuDoSul/Rs': '4321329', 'Tavares/Rs': '4321352', 'TenentePortela/Rs': '4321402', 'TerraDeAreia/Rs': '4321436', 'Teutônia/Rs': '4321451', 'TioHugo/Rs': '4321469', 'TiradentesDoSul/Rs': '4321477', 'Toropi/Rs': '4321493', 'Torres/Rs': '4321501', 'Tramandaí/Rs': '4321600', 'Travesseiro/Rs': '4321626', 'TrêsArroios/Rs': '4321634', 'TrêsCachoeiras/Rs': '4321667', 'TrêsCoroas/Rs': '4321709', 'TrêsDeMaio/Rs': '4321808', 'TrêsForquilhas/Rs': '4321832', 'TrêsPalmeiras/Rs': '4321857', 'TrêsPassos/Rs': '4321907', 'TrindadeDoSul/Rs': '4321956', 'Triunfo/Rs': '4322004', 'Tucunduva/Rs': '4322103', 'Tunas/Rs': '4322152', 'TupanciDoSul/Rs': '4322186', 'Tupanciretã/Rs': '4322202', 'Tupandi/Rs': '4322251', 'Tuparendi/Rs': '4322301', 'Turuçu/Rs': '4322327', 'Ubiretama/Rs': '4322343', 'UniãoDaSerra/Rs': '4322350', 'Unistalda/Rs': '4322376', 'Uruguaiana/Rs': '4322400', 'Vacaria/Rs': '4322509', 'ValeVerde/Rs': '4322525', 'ValeDoSol/Rs': '4322533', 'ValeReal/Rs': '4322541', 'Vanini/Rs': '4322558', 'VenâncioAires/Rs': '4322608', 'VeraCruz/Rs': '4322707', 'Veranópolis/Rs': '4322806', 'VespasianoCorrêa/Rs': '4322855', 'Viadutos/Rs': '4322905', 'Viamão/Rs': '4323002', 'VicenteDutra/Rs': '4323101', 'VictorGraeff/Rs': '4323200', 'VilaFlores/Rs': '4323309', 'VilaLângaro/Rs': '4323358', 'VilaMaria/Rs': '4323408', 'VilaNovaDoSul/Rs': '4323457', 'VistaAlegre/Rs': '4323507', 'VistaAlegreDoPrata/Rs': '4323606', 'VistaGaúcha/Rs': '4323705', 'VitóriaDasMissões/Rs': '4323754', 'Westfália/Rs': '4323770', 'XangriLá/Rs': '4323804', 'ÁguaClara/Ms': '5000203', 'Alcinópolis/Ms': '5000252', 'Amambai/Ms': '5000609', 'Anastácio/Ms': '5000708', 'Anaurilândia/Ms': '5000807', 'Angélica/Ms': '5000856', 'AntônioJoão/Ms': '5000906', 'AparecidaDoTaboado/Ms': '5001003', 'Aquidauana/Ms': '5001102', 'AralMoreira/Ms': '5001243', 'Bandeirantes/Ms': '5001508', 'Bataguassu/Ms': '5001904', 'Batayporã/Ms': '5002001', 'BelaVista/Ms': '5002100', 'Bodoquena/Ms': '5002159', 'Bonito/Ms': '5002209', 'Brasilândia/Ms': '5002308', 'Caarapó/Ms': '5002407', 'Camapuã/Ms': '5002605', 'CampoGrande/Ms': '5002704', 'Caracol/Ms': '5002803', 'Cassilândia/Ms': '5002902', 'ChapadãoDoSul/Ms': '5002951', 'Corguinho/Ms': '5003108', 'CoronelSapucaia/Ms': '5003157', 'Corumbá/Ms': '5003207', 'CostaRica/Ms': '5003256', 'Coxim/Ms': '5003306', 'Deodápolis/Ms': '5003454', 'DoisIrmãosDoBuriti/Ms': '5003488', 'Douradina/Ms': '5003504', 'Dourados/Ms': '5003702', 'Eldorado/Ms': '5003751', 'FátimaDoSul/Ms': '5003801', 'Figueirão/Ms': '5003900', 'GlóriaDeDourados/Ms': '5004007', 'GuiaLopesDaLaguna/Ms': '5004106', 'Iguatemi/Ms': '5004304', 'Inocência/Ms': '5004403', 'Itaporã/Ms': '5004502', 'Itaquiraí/Ms': '5004601', 'Ivinhema/Ms': '5004700', 'Japorã/Ms': '5004809', 'Jaraguari/Ms': '5004908', 'Jardim/Ms': '5005004', 'Jateí/Ms': '5005103', 'Juti/Ms': '5005152', 'Ladário/Ms': '5005202', 'LagunaCarapã/Ms': '5005251', 'Maracaju/Ms': '5005400', 'Miranda/Ms': '5005608', 'MundoNovo/Ms': '5005681', 'Naviraí/Ms': '5005707', 'Nioaque/Ms': '5005806', 'NovaAlvoradaDoSul/Ms': '5006002', 'NovaAndradina/Ms': '5006200', 'NovoHorizonteDoSul/Ms': '5006259', 'ParaísoDasÁguas/Ms': '5006275', 'Paranaíba/Ms': '5006309', 'Paranhos/Ms': '5006358', 'PedroGomes/Ms': '5006408', 'PontaPorã/Ms': '5006606', 'PortoMurtinho/Ms': '5006903', 'RibasDoRioPardo/Ms': '5007109', 'RioBrilhante/Ms': '5007208', 'RioNegro/Ms': '5007307', 'RioVerdeDeMatoGrosso/Ms': '5007406', 'Rochedo/Ms': '5007505', 'SantaRitaDoPardo/Ms': '5007554', 'SãoGabrielDoOeste/Ms': '5007695', 'SeteQuedas/Ms': '5007703', 'Selvíria/Ms': '5007802', 'Sidrolândia/Ms': '5007901', 'Sonora/Ms': '5007935', 'Tacuru/Ms': '5007950', 'Taquarussu/Ms': '5007976', 'Terenos/Ms': '5008008', 'TrêsLagoas/Ms': '5008305', 'Vicentina/Ms': '5008404', 'Acorizal/Mt': '5100102', 'ÁguaBoa/Mt': '5100201', 'AltaFloresta/Mt': '5100250', 'AltoAraguaia/Mt': '5100300', 'AltoBoaVista/Mt': '5100359', 'AltoGarças/Mt': '5100409', 'AltoParaguai/Mt': '5100508', 'AltoTaquari/Mt': '5100607', 'Apiacás/Mt': '5100805', 'Araguaiana/Mt': '5101001', 'Araguainha/Mt': '5101209', 'Araputanga/Mt': '5101258', 'Arenápolis/Mt': '5101308', 'Aripuanã/Mt': '5101407', 'BarãoDeMelgaço/Mt': '5101605', 'BarraDoBugres/Mt': '5101704', 'BarraDoGarças/Mt': '5101803', 'BomJesusDoAraguaia/Mt': '5101852', 'Brasnorte/Mt': '5101902', 'Cáceres/Mt': '5102504', 'Campinápolis/Mt': '5102603', 'CampoNovoDoParecis/Mt': '5102637', 'CampoVerde/Mt': '5102678', 'CamposDeJúlio/Mt': '5102686', 'CanabravaDoNorte/Mt': '5102694', 'Canarana/Mt': '5102702', 'Carlinda/Mt': '5102793', 'Castanheira/Mt': '5102850', 'ChapadaDosGuimarães/Mt': '5103007', 'Cláudia/Mt': '5103056', 'Cocalinho/Mt': '5103106', 'Colíder/Mt': '5103205', 'Colniza/Mt': '5103254', 'Comodoro/Mt': '5103304', 'Confresa/Mt': '5103353', "ConquistaD'Oeste/Mt": '5103361', 'Cotriguaçu/Mt': '5103379', 'Cuiabá/Mt': '5103403', 'Curvelândia/Mt': '5103437', 'Denise/Mt': '5103452', 'Diamantino/Mt': '5103502', 'DomAquino/Mt': '5103601', 'FelizNatal/Mt': '5103700', "FigueirópolisD'Oeste/Mt": '5103809', 'GaúchaDoNorte/Mt': '5103858', 'GeneralCarneiro/Mt': '5103908', "GlóriaD'Oeste/Mt": '5103957', 'GuarantãDoNorte/Mt': '5104104', 'Guiratinga/Mt': '5104203', 'Indiavaí/Mt': '5104500', 'IpirangaDoNorte/Mt': '5104526', 'Itanhangá/Mt': '5104542', 'Itaúba/Mt': '5104559', 'Itiquira/Mt': '5104609', 'Jaciara/Mt': '5104807', 'Jangada/Mt': '5104906', 'Jauru/Mt': '5105002', 'Juara/Mt': '5105101', 'Juína/Mt': '5105150', 'Juruena/Mt': '5105176', 'Juscimeira/Mt': '5105200', "LambariD'Oeste/Mt": '5105234', 'LucasDoRioVerde/Mt': '5105259', 'Luciara/Mt': '5105309', 'VilaBelaDaSantíssimaTrindade/Mt': '5105507', 'Marcelândia/Mt': '5105580', 'Matupá/Mt': '5105606', "MirassolD'Oeste/Mt": '5105622', 'Nobres/Mt': '5105903', 'Nortelândia/Mt': '5106000', 'NossaSenhoraDoLivramento/Mt': '5106109', 'NovaBandeirantes/Mt': '5106158', 'NovaNazaré/Mt': '5106174', 'NovaLacerda/Mt': '5106182', 'NovaSantaHelena/Mt': '5106190', 'NovaBrasilândia/Mt': '5106208', 'NovaCanaãDoNorte/Mt': '5106216', 'NovaMutum/Mt': '5106224', 'NovaOlímpia/Mt': '5106232', 'NovaUbiratã/Mt': '5106240', 'NovaXavantina/Mt': '5106257', 'NovoMundo/Mt': '5106265', 'NovoHorizonteDoNorte/Mt': '5106273', 'NovoSãoJoaquim/Mt': '5106281', 'Paranaíta/Mt': '5106299', 'Paranatinga/Mt': '5106307', 'NovoSantoAntônio/Mt': '5106315', 'PedraPreta/Mt': '5106372', 'PeixotoDeAzevedo/Mt': '5106422', 'PlanaltoDaSerra/Mt': '5106455', 'Poconé/Mt': '5106505', 'PontalDoAraguaia/Mt': '5106653', 'PonteBranca/Mt': '5106703', 'PontesELacerda/Mt': '5106752', 'PortoAlegreDoNorte/Mt': '5106778', 'PortoDosGaúchos/Mt': '5106802', 'PortoEsperidião/Mt': '5106828', 'PortoEstrela/Mt': '5106851', 'Poxoréu/Mt': '5107008', 'PrimaveraDoLeste/Mt': '5107040', 'Querência/Mt': '5107065', 'SãoJoséDosQuatroMarcos/Mt': '5107107', 'ReservaDoCabaçal/Mt': '5107156', 'RibeirãoCascalheira/Mt': '5107180', 'Ribeirãozinho/Mt': '5107198', 'RioBranco/Mt': '5107206', 'SantaCarmem/Mt': '5107248', 'SantoAfonso/Mt': '5107263', 'SãoJoséDoPovo/Mt': '5107297', 'SãoJoséDoRioClaro/Mt': '5107305', 'SãoJoséDoXingu/Mt': '5107354', 'SãoPedroDaCipa/Mt': '5107404', 'Rondolândia/Mt': '5107578', 'Rondonópolis/Mt': '5107602', 'RosárioOeste/Mt': '5107701', 'SantaCruzDoXingu/Mt': '5107743', 'SaltoDoCéu/Mt': '5107750', 'SantaRitaDoTrivelato/Mt': '5107768', 'SantaTerezinha/Mt': '5107776', 'SantoAntônioDoLeste/Mt': '5107792', 'SantoAntônioDoLeverger/Mt': '5107800', 'SãoFélixDoAraguaia/Mt': '5107859', 'Sapezal/Mt': '5107875', 'SerraNovaDourada/Mt': '5107883', 'Sinop/Mt': '5107909', 'Sorriso/Mt': '5107925', 'Tabaporã/Mt': '5107941', 'TangaráDaSerra/Mt': '5107958', 'Tapurah/Mt': '5108006', 'TerraNovaDoNorte/Mt': '5108055', 'Tesouro/Mt': '5108105', 'Torixoréu/Mt': '5108204', 'UniãoDoSul/Mt': '5108303', 'ValeDeSãoDomingos/Mt': '5108352', 'VárzeaGrande/Mt': '5108402', 'Vera/Mt': '5108501', 'VilaRica/Mt': '5108600', 'NovaGuarita/Mt': '5108808', 'NovaMarilândia/Mt': '5108857', 'NovaMaringá/Mt': '5108907', 'NovaMonteVerde/Mt': '5108956', 'AbadiaDeGoiás/Go': '5200050', 'Abadiânia/Go': '5200100', 'Acreúna/Go': '5200134', 'Adelândia/Go': '5200159', 'ÁguaFriaDeGoiás/Go': '5200175', 'ÁguaLimpa/Go': '5200209', 'ÁguasLindasDeGoiás/Go': '5200258', 'Alexânia/Go': '5200308', 'Aloândia/Go': '5200506', 'AltoHorizonte/Go': '5200555', 'AltoParaísoDeGoiás/Go': '5200605', 'AlvoradaDoNorte/Go': '5200803', 'Amaralina/Go': '5200829', 'AmericanoDoBrasil/Go': '5200852', 'Amorinópolis/Go': '5200902', 'Anápolis/Go': '5201108', 'Anhanguera/Go': '5201207', 'Anicuns/Go': '5201306', 'AparecidaDeGoiânia/Go': '5201405', 'AparecidaDoRioDoce/Go': '5201454', 'Aporé/Go': '5201504', 'Araçu/Go': '5201603', 'Aragarças/Go': '5201702', 'Aragoiânia/Go': '5201801', 'Araguapaz/Go': '5202155', 'Arenópolis/Go': '5202353', 'Aruanã/Go': '5202502', 'Aurilândia/Go': '5202601', 'Avelinópolis/Go': '5202809', 'Baliza/Go': '5203104', 'BarroAlto/Go': '5203203', 'BelaVistaDeGoiás/Go': '5203302', 'BomJardimDeGoiás/Go': '5203401', 'BomJesusDeGoiás/Go': '5203500', 'Bonfinópolis/Go': '5203559', 'Bonópolis/Go': '5203575', 'Brazabrantes/Go': '5203609', 'Britânia/Go': '5203807', 'BuritiAlegre/Go': '5203906', 'BuritiDeGoiás/Go': '5203939', 'Buritinópolis/Go': '5203962', 'Cabeceiras/Go': '5204003', 'CachoeiraAlta/Go': '5204102', 'CachoeiraDeGoiás/Go': '5204201', 'CachoeiraDourada/Go': '5204250', 'Caçu/Go': '5204300', 'Caiapônia/Go': '5204409', 'CaldasNovas/Go': '5204508', 'Caldazinha/Go': '5204557', 'CampestreDeGoiás/Go': '5204607', 'Campinaçu/Go': '5204656', 'Campinorte/Go': '5204706', 'CampoAlegreDeGoiás/Go': '5204805', 'CampoLimpoDeGoiás/Go': '5204854', 'CamposBelos/Go': '5204904', 'CamposVerdes/Go': '5204953', 'CarmoDoRioVerde/Go': '5205000', 'Castelândia/Go': '5205059', 'Catalão/Go': '5205109', 'Caturaí/Go': '5205208', 'Cavalcante/Go': '5205307', 'Ceres/Go': '5205406', 'Cezarina/Go': '5205455', 'ChapadãoDoCéu/Go': '5205471', 'CidadeOcidental/Go': '5205497', 'CocalzinhoDeGoiás/Go': '5205513', 'ColinasDoSul/Go': '5205521', 'CórregoDoOuro/Go': '5205703', 'CorumbáDeGoiás/Go': '5205802', 'Corumbaíba/Go': '5205901', 'Cristalina/Go': '5206206', 'Cristianópolis/Go': '5206305', 'Crixás/Go': '5206404', 'Cromínia/Go': '5206503', 'Cumari/Go': '5206602', 'Damianópolis/Go': '5206701', 'Damolândia/Go': '5206800', 'Davinópolis/Go': '5206909', 'Diorama/Go': '5207105', 'Doverlândia/Go': '5207253', 'Edealina/Go': '5207352', 'Edéia/Go': '5207402', 'EstrelaDoNorte/Go': '5207501', 'Faina/Go': '5207535', 'FazendaNova/Go': '5207600', 'Firminópolis/Go': '5207808', 'FloresDeGoiás/Go': '5207907', 'Formosa/Go': '5208004', 'Formoso/Go': '5208103', 'GameleiraDeGoiás/Go': '5208152', 'DivinópolisDeGoiás/Go': '5208301', 'Goianápolis/Go': '5208400', 'Goiandira/Go': '5208509', 'Goianésia/Go': '5208608', 'Goiânia/Go': '5208707', 'Goianira/Go': '5208806', 'Goiás/Go': '5208905', 'Goiatuba/Go': '5209101', 'Gouvelândia/Go': '5209150', 'Guapó/Go': '5209200', 'Guaraíta/Go': '5209291', 'GuaraniDeGoiás/Go': '5209408', 'Guarinos/Go': '5209457', 'Heitoraí/Go': '5209606', 'Hidrolândia/Go': '5209705', 'Hidrolina/Go': '5209804', 'Iaciara/Go': '5209903', 'Inaciolândia/Go': '5209937', 'Indiara/Go': '5209952', 'Inhumas/Go': '5210000', 'Ipameri/Go': '5210109', 'IpirangaDeGoiás/Go': '5210158', 'Iporá/Go': '5210208', 'Israelândia/Go': '5210307', 'Itaberaí/Go': '5210406', 'Itaguari/Go': '5210562', 'Itaguaru/Go': '5210604', 'Itajá/Go': '5210802', 'Itapaci/Go': '5210901', 'Itapirapuã/Go': '5211008', 'Itapuranga/Go': '5211206', 'Itarumã/Go': '5211305', 'Itauçu/Go': '5211404', 'Itumbiara/Go': '5211503', 'Ivolândia/Go': '5211602', 'Jandaia/Go': '5211701', 'Jaraguá/Go': '5211800', 'Jataí/Go': '5211909', 'Jaupaci/Go': '5212006', 'Jesúpolis/Go': '5212055', 'Joviânia/Go': '5212105', 'Jussara/Go': '5212204', 'LagoaSanta/Go': '5212253', 'LeopoldoDeBulhões/Go': '5212303', 'Luziânia/Go': '5212501', 'Mairipotaba/Go': '5212600', 'Mambaí/Go': '5212709', 'MaraRosa/Go': '5212808', 'Marzagão/Go': '5212907', 'Matrinchã/Go': '5212956', 'Maurilândia/Go': '5213004', 'MimosoDeGoiás/Go': '5213053', 'Minaçu/Go': '5213087', 'Mineiros/Go': '5213103', 'Moiporá/Go': '5213400', 'MonteAlegreDeGoiás/Go': '5213509', 'MontesClarosDeGoiás/Go': '5213707', 'Montividiu/Go': '5213756', 'MontividiuDoNorte/Go': '5213772', 'Morrinhos/Go': '5213806', 'MorroAgudoDeGoiás/Go': '5213855', 'Mossâmedes/Go': '5213905', 'Mozarlândia/Go': '5214002', 'MundoNovo/Go': '5214051', 'Mutunópolis/Go': '5214101', 'Nazário/Go': '5214408', 'Nerópolis/Go': '5214507', 'Niquelândia/Go': '5214606', 'NovaAmérica/Go': '5214705', 'NovaAurora/Go': '5214804', 'NovaCrixás/Go': '5214838', 'NovaGlória/Go': '5214861', 'NovaIguaçuDeGoiás/Go': '5214879', 'NovaRoma/Go': '5214903', 'NovaVeneza/Go': '5215009', 'NovoBrasil/Go': '5215207', 'NovoGama/Go': '5215231', 'NovoPlanalto/Go': '5215256', 'Orizona/Go': '5215306', 'OuroVerdeDeGoiás/Go': '5215405', 'Ouvidor/Go': '5215504', 'PadreBernardo/Go': '5215603', 'PalestinaDeGoiás/Go': '5215652', 'PalmeirasDeGoiás/Go': '5215702', 'Palmelo/Go': '5215801', 'Palminópolis/Go': '5215900', 'Panamá/Go': '5216007', 'Paranaiguara/Go': '5216304', 'Paraúna/Go': '5216403', 'Perolândia/Go': '5216452', 'PetrolinaDeGoiás/Go': '5216809', 'PilarDeGoiás/Go': '5216908', 'Piracanjuba/Go': '5217104', 'Piranhas/Go': '5217203', 'Pirenópolis/Go': '5217302', 'PiresDoRio/Go': '5217401', 'Planaltina/Go': '5217609', 'Pontalina/Go': '5217708', 'Porangatu/Go': '5218003', 'Porteirão/Go': '5218052', 'Portelândia/Go': '5218102', 'Posse/Go': '5218300', 'ProfessorJamil/Go': '5218391', 'Quirinópolis/Go': '5218508', 'Rialma/Go': '5218607', 'Rianápolis/Go': '5218706', 'RioQuente/Go': '5218789', 'RioVerde/Go': '5218805', 'Rubiataba/Go': '5218904', 'Sanclerlândia/Go': '5219001', 'SantaBárbaraDeGoiás/Go': '5219100', 'SantaCruzDeGoiás/Go': '5219209', 'SantaFéDeGoiás/Go': '5219258', 'SantaHelenaDeGoiás/Go': '5219308', 'SantaIsabel/Go': '5219357', 'SantaRitaDoAraguaia/Go': '5219407', 'SantaRitaDoNovoDestino/Go': '5219456', 'SantaRosaDeGoiás/Go': '5219506', 'SantaTerezaDeGoiás/Go': '5219605', 'SantaTerezinhaDeGoiás/Go': '5219704', 'SantoAntônioDaBarra/Go': '5219712', 'SantoAntônioDeGoiás/Go': '5219738', 'SantoAntônioDoDescoberto/Go': '5219753', 'SãoDomingos/Go': '5219803', 'SãoFranciscoDeGoiás/Go': '5219902', "SãoJoãoD'Aliança/Go": '5220009', 'SãoJoãoDaParaúna/Go': '5220058', 'SãoLuísDeMontesBelos/Go': '5220108', 'SãoLuizDoNorte/Go': '5220157', 'SãoMiguelDoAraguaia/Go': '5220207', 'SãoMiguelDoPassaQuatro/Go': '5220264', 'SãoPatrício/Go': '5220280', 'SãoSimão/Go': '5220405', 'SenadorCanedo/Go': '5220454', 'Serranópolis/Go': '5220504', 'Silvânia/Go': '5220603', 'Simolândia/Go': '5220686', "SítioD'Abadia/Go": '5220702', 'TaquaralDeGoiás/Go': '5221007', 'TeresinaDeGoiás/Go': '5221080', 'TerezópolisDeGoiás/Go': '5221197', 'TrêsRanchos/Go': '5221304', 'Trindade/Go': '5221403', 'Trombas/Go': '5221452', 'Turvânia/Go': '5221502', 'Turvelândia/Go': '5221551', 'Uirapuru/Go': '5221577', 'Uruaçu/Go': '5221601', 'Uruana/Go': '5221700', 'Urutaí/Go': '5221809', 'ValparaísoDeGoiás/Go': '5221858', 'Varjão/Go': '5221908', 'Vianópolis/Go': '5222005', 'Vicentinópolis/Go': '5222054', 'VilaBoa/Go': '5222203', 'VilaPropício/Go': '5222302', 'Brasília/Df': '5300108'}
            obj.local.split(' ').map(municipio => {
                if (municipio.length === 2) {
                    for (let i in listaMunicipios) {
                        if (i[i.length-2]+i[i.length-1] == municipio) {
                            if (numeroMunicipio === '') numeroMunicipio += listaMunicipios[i]
                            else numeroMunicipio += `,${listaMunicipios[i]}`
                        }
                    }
                } else {
                    if (numeroMunicipio === '') numeroMunicipio += listaMunicipios[municipio]
                    else numeroMunicipio += `,${listaMunicipios[municipio]}`
                }
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/${anosres}/variaveis/9324?localidades=N6[${numeroMunicipio}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)
                
                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/localidades/N6')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.esperancaDeVidaDoBrasil = (obj) => {
        let anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos/${anosres}/variaveis/2503?localidades=N1[all]`)
        .then(data => data.json())
        .then(json => {
            res.variavel = json[0].variavel
            res.unidade = json[0].unidade
            res.Brasil = json[0].resultados[0].series[0].serie

            let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1174/localidades/N1')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
        })
        return res
    }

    obj.esperancaDeVidaPorGrandeRegiao = (obj) => {
        let numeroRegioes = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroRegioes += 'all'
        } else {
            const listaRegioes = {'Norte':'1', 'Nordeste':'2', 'Sudeste':'3', 'Sul':'4', 'CentroOeste':'5'}
            obj.local.split(' ').map(regiao => {
                if(numeroRegioes === '') numeroRegioes += listaRegioes[regiao]
                else numeroRegioes += `,${listaRegioes[regiao]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos/${anosres}/variaveis/2503?localidades=N2[${numeroRegioes}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1174/localidades/N2')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.esperancaDeVidaPorEstado = (obj) => {
        let numeroEstado = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroEstado += 'all'
        } else {
            const listaEstados = {'Rondônia': '11', 'Acre': '12', 'Amazonas': '13', 'Roraima': '14', 'Pará': '15', 'Amapá': '16', 'Tocantins': '17', 'Maranhão': '21', 'Piauí': '22', 'Ceará': '24', 'RioGrandeDoNorte': '24', 'Paraíba': '25', 'Pernambuco': '26', 'Alagoas': '27', 'Sergipe': '28', 'Bahia': '29', 'MinasGerais': '31', 'EspíritoSanto': '32', 'RioDeRaneiro': '33', 'SãoPaulo': '35', 'Paraná': '41', 'SantaCatarina': '42', 'RioGrandeDoSul': '43', 'MatoGrossoDoSul': '50', 'MatoGrosso': '51', 'Goiás': '52', 'DistritoFederal': '53'}
            obj.local.split(' ').map(estado => {
                if(numeroEstado === '') numeroEstado += listaEstados[estado]
                else numeroEstado += `,${listaEstados[estado]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos/${anosres}/variaveis/2503?localidades=N3[${numeroEstado}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1174/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1174/localidades/N3')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.densidadeDemograficaDoBrasil = (obj) => {
        let anosres = ''
        /*
        res["Área de estados por quilômetro quadrado"] = {'Rondônia': 237765.347, 'Acre': 164173.431, 'Amazonas': 1559167.879, 'Roraima': 223644.527, 'Pará': 1245870.707, 'Amapá': 142470.762, 'Tocantins': 277423.63, 'Maranhão': 329651.495, 'Piauí': 251755.484, 'Ceará': 148894.441, 'Rio Grande do Norte': 52809.601, 'Paraíba': 56467.242, 'Pernambuco': 98067.879, 'Alagoas': 27830.657, 'Sergipe': 21938.185, 'Bahia': 564760.427, 'Minas Gerais': 586513.993, 'Espirito Santo': 46074.447, 'Rio de Janeiro': 43750.426, 'São Paulo': 248219.481, 'Paraná': 199298.982, 'Santa Catarina': 95730.685, 'Rio Grande do Sul': 281707.148, 'Mato Grosso do Sul': 357147.994, 'Mato Grosso': 903207.047, 'Goiás': 340242.859, 'Distrito Federal': 5760.784}
        */
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos/${anosres}/variaveis/614?localidades=N1[all]`)
        .then(data => data.json())
        .then(json => {
            res.variavel = json[0].variavel
            res.unidade = json[0].unidade
            res[json[0].resultados[0].series[0].localidade.nome] = json[0].resultados[0].series[0].serie

            let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1298/localidades/N1')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
        })
        return res
    }

    obj.densidadeDemograficaPorGrandeRegiao = (obj) => {
        let numeroRegioes = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroRegioes += 'all'
        } else {
            const listaRegioes = {'Norte':'1', 'Nordeste':'2', 'Sudeste':'3', 'Sul':'4', 'CentroOeste':'5'}
            obj.local.split(' ').map(regiao => {
                if(numeroRegioes === '') numeroRegioes += listaRegioes[regiao]
                else numeroRegioes += `,${listaRegioes[regiao]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos/${anosres}/variaveis/614?localidades=N2[${numeroRegioes}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1298/localidades/N2')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.densidadeDemograficaPorEstado = (obj) => {
        let numeroEstado = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroEstado += 'all'
        } else {
            const listaEstados = {'Rondônia': '11', 'Acre': '12', 'Amazonas': '13', 'Roraima': '14', 'Pará': '15', 'Amapá': '16', 'Tocantins': '17', 'Maranhão': '21', 'Piauí': '22', 'Ceará': '24', 'RioGrandeDoNorte': '24', 'Paraíba': '25', 'Pernambuco': '26', 'Alagoas': '27', 'Sergipe': '28', 'Bahia': '29', 'MinasGerais': '31', 'EspíritoSanto': '32', 'RioDeRaneiro': '33', 'SãoPaulo': '35', 'Paraná': '41', 'SantaCatarina': '42', 'RioGrandeDoSul': '43', 'MatoGrossoDoSul': '50', 'MatoGrosso': '51', 'Goiás': '52', 'DistritoFederal': '53'}
            obj.local.split(' ').map(estado => {
                if(numeroEstado === '') numeroEstado += listaEstados[estado]
                else numeroEstado += `,${listaEstados[estado]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos/${anosres}/variaveis/614?localidades=N3[${numeroEstado}]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1298/localidades/N3')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.populacaoAssalariadaDoBrasil = (obj) => {
        let anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/2722/periodos/${anosres}/variaveis/484?localidades=N1[all]&classificacao=12762[117897]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)
                
                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/2722/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/2722/localidades/N1')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.populacaoAssalariadaPorGrandeRegiao = (obj) => {
        let numeroRegioes = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroRegioes += 'all'
        } else {
            const listaRegioes = {'Norte':'1', 'Nordeste':'2', 'Sudeste':'3', 'Sul':'4', 'CentroOeste':'5'}
            obj.local.split(' ').map(regiao => {
                if(numeroRegioes === '') numeroRegioes += listaRegioes[regiao]
                else numeroRegioes += `,${listaRegioes[regiao]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/2722/periodos/${anosres}/variaveis/484?localidades=N2[${numeroRegioes}]&classificacao=12762[117897]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/2722/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/2722/localidades/N2')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
        return res
    }

    obj.populacaoAssalariadaPorEstado = (obj) => {
        let numeroEstado = '', anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += ano
                else anosres += `|${ano}`
            })
        }
        if (obj.local === 'all') {
            numeroEstado += 'all'
        } else {
            const listaEstados = {'Rondônia': '11', 'Acre': '12', 'Amazonas': '13', 'Roraima': '14', 'Pará': '15', 'Amapá': '16', 'Tocantins': '17', 'Maranhão': '21', 'Piauí': '22', 'Ceará': '24', 'RioGrandeDoNorte': '24', 'Paraíba': '25', 'Pernambuco': '26', 'Alagoas': '27', 'Sergipe': '28', 'Bahia': '29', 'MinasGerais': '31', 'EspíritoSanto': '32', 'RioDeRaneiro': '33', 'SãoPaulo': '35', 'Paraná': '41', 'SantaCatarina': '42', 'RioGrandeDoSul': '43', 'MatoGrossoDoSul': '50', 'MatoGrosso': '51', 'Goiás': '52', 'DistritoFederal': '53'}
            obj.local.split(' ').map(estado => {
                if(numeroEstado === '') numeroEstado += listaEstados[estado]
                else numeroEstado += `,${listaEstados[estado]}`
            })
        }
        let func = obj.func
        const res = {}
        fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/2722/periodos/${anosres}/variaveis/484?localidades=N3[${numeroEstado}]&classificacao=12762[117897]`)
            .then(data => data.json())
            .then(json => {
                res.variavel = json[0].variavel
                res.unidade = json[0].unidade
                json[0].resultados[0].series.map(d => res[d.localidade.nome] = d.serie)

                let list = [], list_sub = []
                if (typeof func === 'object') {
                    list_sub = func.map(f => f(res))
                    list = [...new Set(list_sub)]
                    for (let i in list) {
                        if (list[i] === 'ano') {
                            obj.anoRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/2722/periodos')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.anoRes.push(j.id)))
                        }
                        if (list[i] === 'local') {
                            obj.localRes = []
                            fetch('https://servicodados.ibge.gov.br/api/v3/agregados/2722/localidades/N3')
                                .then(data => data.json())
                                .then(json => json.map(j => obj.localRes.push(j.nome)))
                        }
                        if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                        if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                        if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                        if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                        if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                        if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                        if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                        if (list[i] === 'grafico-desligado') obj.grafico = ''
                        if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                        if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                        if (list[i] === 'tabela-desligado') obj.tabela = ''
                    }
                }
                delete list_sub
                visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
            })
    }

    obj.projecaoDeDadosNoBrasil = (obj) => {
        let agregado, va, classificacao, anosres = ''
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            const listaAno = {'2000': '116338', '2001': '116336', '2002': '116335', '2003': '116334', '2004': '116332', '2005': '116331', '2006': '116330', '2007': '116329', '2008': '116327', '2009': '119270', '2010': '4336', '2011': '12037', '2012': '13242', '2013': '49029', '2014': '49030', '2015': '49031', '2016': '49032', '2017': '49033', '2018': '49034', '2019': '49035', '2020': '49036', '2021': '49037', '2022': '49038', '2023': '49039', '2024': '49040', '2025': '49041', '2026': '49042', '2027': '49043', '2028': '49044', '2029': '49045', '2030': '49046', '2031': '49047', '2032': '49048', '2033': '49049', '2034': '49050', '2035': '49051', '2036': '49052', '2037': '49053', '2038': '49054', '2039': '49055', '2040': '49056', '2041': '49057', '2042': '49058', '2043': '49059', '2044': '49060', '2045': '49061', '2046': '49062', '2047': '49063', '2048': '49064', '2049': '49065', '2050': '49066', '2051': '49067', '2052': '49068', '2053': '49069', '2054': '49070', '2055': '49071', '2056': '49072', '2057': '49073', '2058': '49074', '2059': '49075', '2060': '49076'}
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += listaAno[ano]
                else anosres += `,${listaAno[ano]}`
            })
        }
        if (obj.variavel != '') {
            switch(obj.variavel){
                case 'esperanca de vida':
                    agregado = 7362
                    va = 2503
                    classificacao = `classificacao=2[6794]|1933[${anosres}]`
                    break
                case 'taxa de mortalidade':
                    agregado = 7362
                    va = 1940
                    classificacao = `classificacao=2[6794]|1933[${anosres}]`
                    break
                case 'nascimentos':
                    agregado = 7360
                    va = 10600
                    classificacao = `classificacao=1933[${anosres}]`
                    break
                case 'obitos':
                    agregado = 7360
                    va = 10601
                    classificacao = `classificacao=1933[${anosres}]`
                    break
                case 'populacao':
                    agregado = 7358
                    va = 606
                    classificacao = `classificacao=2[6794]|287[100362]|1933[${anosres}]`
                    break
                default:
                    return `Erro: variavel=${obj.variavel} não existe!`
            }
        }
        let func = obj.func
        const res = {}
        if (obj.variavel === 'esperanca de vida' || obj.variavel === 'taxa de mortalidade') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N1[all]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    res.Brasil = {}
                    json[0].resultados.map(d => {
                        for (let i in d.classificacoes[1].categoria) {
                            res.Brasil[d.classificacoes[1].categoria[i]] = d.series[0].serie['2018']
                        }
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N1`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        } else if (obj.variavel === 'nascimentos' || obj.variavel === 'obitos') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N1[all]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    res.Brasil = {}
                    json[0].resultados.map(d => {
                        for (let i in d.classificacoes[0].categoria) {
                            res.Brasil[d.classificacoes[0].categoria[i]] = d.series[0].serie['2018']
                        }
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N1`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        } else if (obj.variavel === 'populacao') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N1[all]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    res.Brasil = {}
                    json[0].resultados.map(d => {
                        for (let i in d.classificacoes[2].categoria) {
                            res.Brasil[d.classificacoes[2].categoria[i]] = d.series[0].serie['2018']
                        }
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N1`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        }
        return res
    }

    obj.projecaoDeDadosPorGrandeRegiao = (obj) => {
        let numeroRegioes = '', anosres = ''
        if (obj.local === 'all') {
            numeroRegioes += 'all'
        } else {
            const listaRegioes = {'Norte':'1', 'Nordeste':'2', 'Sudeste':'3', 'Sul':'4', 'CentroOeste':'5'}
            obj.local.split(' ').map(regiao => {
                if(numeroRegioes === '') numeroRegioes += listaRegioes[regiao]
                else numeroRegioes += `,${listaRegioes[regiao]}`
            })
        }
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            const listaAno = {'2000': '116338', '2001': '116336', '2002': '116335', '2003': '116334', '2004': '116332', '2005': '116331', '2006': '116330', '2007': '116329', '2008': '116327', '2009': '119270', '2010': '4336', '2011': '12037', '2012': '13242', '2013': '49029', '2014': '49030', '2015': '49031', '2016': '49032', '2017': '49033', '2018': '49034', '2019': '49035', '2020': '49036', '2021': '49037', '2022': '49038', '2023': '49039', '2024': '49040', '2025': '49041', '2026': '49042', '2027': '49043', '2028': '49044', '2029': '49045', '2030': '49046', '2031': '49047', '2032': '49048', '2033': '49049', '2034': '49050', '2035': '49051', '2036': '49052', '2037': '49053', '2038': '49054', '2039': '49055', '2040': '49056', '2041': '49057', '2042': '49058', '2043': '49059', '2044': '49060', '2045': '49061', '2046': '49062', '2047': '49063', '2048': '49064', '2049': '49065', '2050': '49066', '2051': '49067', '2052': '49068', '2053': '49069', '2054': '49070', '2055': '49071', '2056': '49072', '2057': '49073', '2058': '49074', '2059': '49075', '2060': '49076'}
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += listaAno[ano]
                else anosres += `,${listaAno[ano]}`
            })
        }
        if (obj.variavel != '') {
            switch(obj.variavel){
                case 'esperanca de vida':
                    agregado = 7362
                    va = 2503
                    classificacao = `classificacao=2[6794]|1933[${anosres}]`
                    break
                case 'taxa de mortalidade':
                    agregado = 7362
                    va = 1940
                    classificacao = `classificacao=2[6794]|1933[${anosres}]`
                    break
                case 'nascimentos':
                    agregado = 7360
                    va = 10600
                    classificacao = `classificacao=1933[${anosres}]`
                    break
                case 'obitos':
                    agregado = 7360
                    va = 10601
                    classificacao = `classificacao=1933[${anosres}]`
                    break
                case 'populacao':
                    agregado = 7358
                    va = 606
                    classificacao = `classificacao=2[6794]|287[100362]|1933[${anosres}]`
                    break
                default:
                    return `Erro: variavel=${obj.variavel} não existe!`
            }
        }
        let func = obj.func
        const res = {}
        if (obj.variavel === 'esperanca de vida' || obj.variavel === 'taxa de mortalidade') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N2[${numeroRegioes}]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    json[0].resultados[0].series.map(d => res[d.localidade.nome] = {})
                    json[0].resultados.map(d => {
                        let ano
                        for (let i in d.classificacoes[1].categoria) {
                            ano = d.classificacoes[1].categoria[i]
                        }
                        d.series.map(d2 => res[d2.localidade.nome][ano] = d2.serie['2018'])
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N2`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        } else if (obj.variavel === 'nascimentos' || obj.variavel === 'obitos') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N2[${numeroRegioes}]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    json[0].resultados[0].series.map(d => res[d.localidade.nome] = {})
                    json[0].resultados.map(d => {
                        let ano
                        for (let i in d.classificacoes[0].categoria) {
                            ano = d.classificacoes[0].categoria[i]
                        }
                        d.series.map(d2 => res[d2.localidade.nome][ano] = d2.serie['2018'])
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N2`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        } else if (obj.variavel === 'populacao') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N2[${numeroRegioes}]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    json[0].resultados[0].series.map(d => res[d.localidade.nome] = {})
                    json[0].resultados.map(d => {
                        let ano 
                        for (let i in d.classificacoes[2].categoria) {
                            ano = d.classificacoes[2].categoria[i]
                        }
                        d.series.map(d2 => res[d2.localidade.nome][ano] = d2.serie['2018'])
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N2`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        }
        return res
    }

    obj.projecaoDeDadosPorEstado = (obj) => {
        let numeroEstado = '', anosres = '', agregado, va, classificacao
        if (obj.local === 'all') {
            numeroEstado += 'all'
        } else {
            const listaEstados = {'Rondônia': '11', 'Acre': '12', 'Amazonas': '13', 'Roraima': '14', 'Pará': '15', 'Amapá': '16', 'Tocantins': '17', 'Maranhão': '21', 'Piauí': '22', 'Ceará': '24', 'RioGrandeDoNorte': '24', 'Paraíba': '25', 'Pernambuco': '26', 'Alagoas': '27', 'Sergipe': '28', 'Bahia': '29', 'MinasGerais': '31', 'EspíritoSanto': '32', 'RioDeRaneiro': '33', 'SãoPaulo': '35', 'Paraná': '41', 'SantaCatarina': '42', 'RioGrandeDoSul': '43', 'MatoGrossoDoSul': '50', 'MatoGrosso': '51', 'Goiás': '52', 'DistritoFederal': '53'}
            obj.local.split(' ').map(estado => {
                if(numeroEstado === '') numeroEstado += listaEstados[estado]
                else numeroEstado += `,${listaEstados[estado]}`
            })
        }
        if (obj.ano === 'all') {
            anosres += 'all'
        } else {
            const listaAno = {'2000': '116338', '2001': '116336', '2002': '116335', '2003': '116334', '2004': '116332', '2005': '116331', '2006': '116330', '2007': '116329', '2008': '116327', '2009': '119270', '2010': '4336', '2011': '12037', '2012': '13242', '2013': '49029', '2014': '49030', '2015': '49031', '2016': '49032', '2017': '49033', '2018': '49034', '2019': '49035', '2020': '49036', '2021': '49037', '2022': '49038', '2023': '49039', '2024': '49040', '2025': '49041', '2026': '49042', '2027': '49043', '2028': '49044', '2029': '49045', '2030': '49046', '2031': '49047', '2032': '49048', '2033': '49049', '2034': '49050', '2035': '49051', '2036': '49052', '2037': '49053', '2038': '49054', '2039': '49055', '2040': '49056', '2041': '49057', '2042': '49058', '2043': '49059', '2044': '49060', '2045': '49061', '2046': '49062', '2047': '49063', '2048': '49064', '2049': '49065', '2050': '49066', '2051': '49067', '2052': '49068', '2053': '49069', '2054': '49070', '2055': '49071', '2056': '49072', '2057': '49073', '2058': '49074', '2059': '49075', '2060': '49076'}
            obj.ano.split(' ').map(ano => {
                if (anosres === '') anosres += listaAno[ano]
                else anosres += `,${listaAno[ano]}`
            })
        }
        if (obj.variavel != '') {
            switch(obj.variavel){
                case 'esperanca de vida':
                    agregado = 7362
                    va = 2503
                    classificacao = `classificacao=2[6794]|1933[${anosres}]`
                    break
                case 'taxa de mortalidade':
                    agregado = 7362
                    va = 1940
                    classificacao = `classificacao=2[6794]|1933[${anosres}]`
                    break
                case 'nascimentos':
                    agregado = 7360
                    va = 10600
                    classificacao = `classificacao=1933[${anosres}]`
                    break
                case 'obitos':
                    agregado = 7360
                    va = 10601
                    classificacao = `classificacao=1933[${anosres}]`
                    break
                case 'populacao':
                    agregado = 7358
                    va = 606
                    classificacao = `classificacao=2[6794]|287[100362]|1933[${anosres}]`
                    break
                default:
                    return `Erro: variavel=${obj.variavel} não existe!`
            }
        }
        let func = obj.func
        const res = {}
        if (obj.variavel === 'esperanca de vida' || obj.variavel === 'taxa de mortalidade') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N3[${numeroEstado}]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    json[0].resultados[0].series.map(d => res[d.localidade.nome] = {})
                    json[0].resultados.map(d => {
                        let ano
                        for (let i in d.classificacoes[1].categoria) {
                            ano = d.classificacoes[1].categoria[i]
                        }
                        d.series.map(d2 => res[d2.localidade.nome][ano] = d2.serie['2018'])
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N3`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        } else if (obj.variavel === 'nascimentos' || obj.variavel === 'obitos') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N3[${numeroEstado}]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    json[0].resultados[0].series.map(d => res[d.localidade.nome] = {})
                    json[0].resultados.map(d => {
                        let ano
                        for (let i in d.classificacoes[0].categoria) {
                            ano = d.classificacoes[0].categoria[i]
                        }
                        d.series.map(d2 => res[d2.localidade.nome][ano] = d2.serie['2018'])
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N3`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        } else if (obj.variavel === 'populacao') {
            fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos/2018/variaveis/${va}?localidades=N3[${numeroEstado}]&${classificacao}`)
                .then(data => data.json())
                .then(json => {
                    res.variavel = json[0].variavel
                    res.unidade = json[0].unidade
                    json[0].resultados[0].series.map(d => res[d.localidade.nome] = {})
                    json[0].resultados.map(d => {
                        let ano
                        for (let i in d.classificacoes[2].categoria) {
                            ano = d.classificacoes[2].categoria[i]
                        }
                        d.series.map(d2 => res[d2.localidade.nome][ano] = d2.serie['2018'])
                    })

                    let list = [], list_sub = []
                    if (typeof func === 'object') {
                        list_sub = func.map(f => f(res))
                        list = [...new Set(list_sub)]
                        for (let i in list) {
                            if (list[i] === 'ano') {
                                obj.anoRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/periodos`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.anoRes.push(j.id)))
                            }
                            if (list[i] === 'local') {
                                obj.localRes = []
                                fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/localidades/N3`)
                                    .then(data => data.json())
                                    .then(json => json.map(j => obj.localRes.push(j.nome)))
                            }
                            if (list[i] === 'grafico-linha') obj.grafico = 'linha'
                            if (list[i] === 'grafico-barra1') obj.grafico = 'barra1'
                            if (list[i] === 'grafico-barra2') obj.grafico = 'barra2'
                            if (list[i] === 'grafico-pizza') obj.grafico = 'pizza'
                            if (list[i] === 'grafico-anel') obj.grafico = 'anel'
                            if (list[i] === 'grafico-polar') obj.grafico = 'polar'
                            if (list[i] === 'grafico-radar') obj.grafico = 'radar'
                            if (list[i] === 'grafico-desligado') obj.grafico = ''
                            if (list[i] === 'tabela-matriz') obj.tabela = 'tabela matriz'
                            if (list[i] === 'tabela-linha') obj.tabela = 'tabela linha'
                            if (list[i] === 'tabela-desligado') obj.tabela = ''
                        }
                    }
                    delete list_sub
                    visualizar(obj.query, obj.grafico, obj.tabela, obj.cor, res)
                })
        }
        return res
    }
     return obj
}
if (typeof (i3GEOF) === 'undefined') {
    var i3GEOF = {};
}
/*
 * Classe: i3GEOF.tabela
 */
i3GEOF.tabela =
{
        /**
         * Controla se o evento de atualizacao da lista de registros esta ativo ou nao E utilizado quando os graficos sao recuperados de um
         * mapa que foi salvo
         */
        LISTAREGATIVO : true,
        /**
         * Array com os ids das janelas ja criadas
         */
        janelas : [],
        /**
         * Objeto com as propriedades de cada janela. A chave e o id da janela armazenado em i3GEO.tabela.janelas
         */
        propJanelas : {},
        /**
         * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
         */
        MUSTACHE : "",
        MUSTACHELISTA : "",
        MUSTACHEVINCULO: "",
        /**
         * Susbtitutos para o template
         */
        mustacheHash : function(idjanela) {
            var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.tabela.dicionario);
            dicionario["idjanela"] = idjanela;
            dicionario["idjanelaA"] = '"' + idjanela + '"';
            dicionario["locaplic"] = i3GEO.configura.locaplic;
            dicionario["propriedades"] = $trad('p13');
            dicionario["ini"] = $inputText("", "", idjanela + 'i3GEOtabelainicio', "", 5, "1");
            dicionario["fim"] = $inputText("", "", idjanela + 'i3GEOtabelafim', "", 5, "20");
            return dicionario;
        },
        /**
         * Configura a tabela conforme um objeto contendo parametros. Alguns parametros possuem definicoes padrao, usadas quando o valor nao
         * e passado
         *
         * Qualquer outro campo de formulario pode ter seu valor passado como parametro, desde que use o mesmo ID, excluindo-se do nome do
         * ID o prefixo (codigo da janela)
         *
         * parametros {objeto} com os seguintes elementos:
         *
         * idjanela - id da tabela. Usado como prefixo para inserir os identificadores dos elementos DOM que fazem parte da interface do
         * tabela. Se existir um elemento dom esse id, a tabela sera inserido nesse elemento
         *
         * tema - codigo do tema existente no mapa e que sera a fonte para os dados
         *
         * atualiza true|false - a janela sera atualizada na navegacao do mapa ou nao
         *
         */
        configura : function(parametros) {
            var idjanela;
            if (!parametros.idjanela) {
                idjanela = "tabela" + parseInt(Math.random() * 1000000, 10);
            } else {
                idjanela = parametros.idjanela;
            }
            i3GEOF.tabela.janelas.push(idjanela);
            if (parametros) {
                i3GEOF.tabela.propJanelas[idjanela] = parametros;
            } else {
                i3GEOF.tabela.propJanelas[idjanela] = {};
            }
            if (!parametros.tema || parametros.tema == undefined) {
                i3GEOF.tabela.propJanelas[idjanela].tema = i3GEO.temaAtivo;
            }
            if (!parametros.atualiza || parametros.atualiza == undefined) {
                i3GEOF.tabela.propJanelas[idjanela].atualiza = true;
            }
            // guarda para essa tabela alguns valores default obtidos dos
            // parametros gerais da ferramenta
            if (!parametros.w || parametros.w == undefined) {
                i3GEOF.tabela.propJanelas[idjanela].w = i3GEOF.tabela.w;
            }
            if (!parametros.h || parametros.h == undefined) {
                i3GEOF.tabela.propJanelas[idjanela].h = i3GEOF.tabela.h;
            }
            i3GEOF.tabela.propJanelas[idjanela].colunas = {
                    "itens" : [],
                    "alias" : []
            };
            i3GEOF.tabela.propJanelas[idjanela].registros = [];
            return idjanela;
        },
        /**
         * Aplica a tabela os parametros de configuracao definidos para cada interface que controla a tabela. Os parametros de configuracao
         * sao obtidos na inicializacao, passados como parametros. Essa funcao deve ser executada apos os elementos html terem sido
         * renderizados
         */
        aplicaConfig : function(idjanela) {
            var config, nomesIds, i, o, n, j;
            config = i3GEOF.tabela.propJanelas[idjanela];
            nomesIds = i3GEO.util.listaChaves(config);
            n = nomesIds.length;
            for (j = 0; j < n; j++) {
                i = nomesIds[j];
                if (config[i]) {
                    o = $i(i);
                    if (o && o.type) {
                        if (o.type.toLowerCase() === "radio" || o.type.toLowerCase() === "checkbox") {
                            o.checked = config[i];
                        } else {
                            o.value = config[i];
                        }
                    }
                }
            }
        },
        /*
         * Function: inicia
         *
         * Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante
         *
         * Parametro:
         *
         * iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
         */
        inicia : function(iddiv, idjanela) {
            if(i3GEOF.tabela.MUSTACHE == ""){
                var t1 = i3GEO.configura.locaplic + "/ferramentas/tabela/template_mst.html",
                t2 = i3GEO.configura.locaplic + "/ferramentas/tabela/templateLista_mst.html",
                t3 = i3GEO.configura.locaplic + "/ferramentas/tabela/templateVinculo_mst.html";

                $.when( $.get(t1),$.get(t2),$.get(t3) ).done(function(r1,r2,r3) {
                    i3GEOF.tabela.MUSTACHE = r1[0];
                    i3GEOF.tabela.MUSTACHELISTA = r2[0];
                    i3GEOF.tabela.MUSTACHEVINCULO = r3[0];
                    i3GEOF.tabela.inicia(iddiv, idjanela);
                }).fail(function() {
                    i3GEO.janela.closeMsg($trad("erroTpl"));
                    return;
                });
                return;
            }
            $i(iddiv).innerHTML = i3GEOF.tabela.html(idjanela);

            //i3GEO.janela.applyScrollBar(iddiv,".customScrollBar",{advanced:{ autoExpandHorizontalScroll: 2 }});

            var b, onButtonClick = function(evt) {
                var botao = evt.target;
                if (botao) {
                    if (botao.value != "") {
                        i3GEO.mapa.ativaTema(botao.value);
                        i3GEOF.tabela.propJanelas[idjanela].tema = botao.value;
                        i3GEOF.tabela.inicia(iddiv, idjanela);
                    }
                }
            };
            if (!$i(idjanela + "i3GEOFtabelaComboCabecaSel")) {
                i3GEO.janela.comboCabecalhoTemasBs(
                        idjanela + "i3GEOFtabelaComboCabeca",
                        idjanela + "i3GEOFtabelaComboCabecaSel",
                        "tabela",
                        "comTabela",
                        onButtonClick);
            }
            i3GEO.guias.mostraGuiaFerramenta(idjanela + "i3GEOtabelaguia1", idjanela + "i3GEOtabelaguia");
            // eventos das guias
            $i(idjanela + "i3GEOtabelaguia6").onclick = function() {
                i3GEO.guias.mostraGuiaFerramenta(idjanela + "i3GEOtabelaguia6", idjanela + "i3GEOtabelaguia");
            };
            $i(idjanela + "i3GEOtabelaguia1").onclick = function() {
                i3GEO.guias.mostraGuiaFerramenta(idjanela + "i3GEOtabelaguia1", idjanela + "i3GEOtabelaguia");
            };
            $i(idjanela + "i3GEOtabelaguia3").onclick = function() {
                i3GEO.guias.mostraGuiaFerramenta(idjanela + "i3GEOtabelaguia3", idjanela + "i3GEOtabelaguia");
                if (!$i(idjanela + "i3GEOtabelaComboItensGuia3")) {
                    i3GEOF.tabela.comboItensEstat(idjanela);
                }
            };
            // relatorio
            $i(idjanela + "i3GEOtabelaguia5").onclick =
                function() {
                i3GEO.guias.mostraGuiaFerramenta(idjanela + "i3GEOtabelaguia5", idjanela + "i3GEOtabelaguia");
                i3GEO.util.checkItensEditaveis(i3GEOF.tabela.propJanelas[idjanela].tema, function(retorno) {
                    if (retorno.tipo === "dados") {
                        $i(idjanela + "i3GEOtabelaitensrelatorio").innerHTML = retorno.dados;
                    }
                }, idjanela + "i3GEOtabelaitensrelatorio", "320px", "", "sim");
                i3GEO.util.comboItens(idjanela + "i3GEOtabelaagrupaItem", i3GEOF.tabela.propJanelas[idjanela].tema, function(
                        retorno) {
                    if (retorno.tipo === "erro") {
                        i3GEO.janela.closeMsg('<div class="alert alert-danger" role="alert">' + $trad('erroTemaOrigem',i3GEOF.tabela.dicionario) + '</div>');
                    } else {
                        $i(idjanela + "i3GEOtabelaagrupamento").innerHTML = retorno.dados;
                    }
                }, idjanela + "i3GEOtabelaagrupamento", "","sim","","form-control");
            };


            if (i3GEO.parametros.r.toLowerCase() !== "sim") {
                $i(idjanela + "i3GEOtabelaguia4obj").innerHTML = $trad("x22");
            }
            i3GEOF.tabela.pegaRegistros(idjanela);
            i3GEO.guias.ajustaGuiaFerramenta(idjanela, idjanela + "i3GEOtabela");
            //
            // Apos todos os elementos HTML da ferramenta terem sido renderizados
            // aplicam-se os parametros armazenados nas propriedades da janela atual
            // Isso e necessario pois os parametros podem ter sido enviados na inicializacao da ferramenta,
            // por exemplo, quando um mapa e salvo, os parametros sao armazenados e depois recuperados
            //
            i3GEOF.tabela.aplicaConfig(idjanela);
            if ($i(idjanela)) {
                $i(idjanela).style.visibility = "visible";
            }
        },
        /*
         * Function: html
         *
         * Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta
         *
         * Retorno:
         *
         * String com o c&oacute;digo html
         */
        html : function(idjanela) {
            var ins = Mustache.render(i3GEOF.tabela.MUSTACHE, i3GEOF.tabela.mustacheHash(idjanela));
            return ins;
        },
        /*
         * Function: criaJanelaFlutuante
         *
         * Cria a janela flutuante para controle da ferramenta.
         */
        iniciaJanelaFlutuante : function(parametros) {
            var duplica, minimiza, cabecalho, janela, divid, temp, titulo, id;
            if (!parametros) {
                parametros = {};
            }
            //
            // configura a tabela baseado no objeto parametros
            // se em parametros existir um idjanela, o mesmo e retornado, caso contrario, e criado
            //
            id = i3GEOF.tabela.configura(parametros);
            //
            // se existir um elemento HTML com o mesmo ID da janela, a renderizacao ocorrera
            // nesse elemento, caso contrario, sera criada uma janela flutuante
            //
            if (!$i(id) && !$i(id + "_corpo")) {
                cabecalho = function() {
                    i3GEOF.tabela.ativaFoco(id);
                };
                minimiza = function() {
                    i3GEO.janela.minimiza(id,200);
                };
                duplica = function() {
                    i3GEOF.tabela.iniciaJanelaFlutuante();
                };
                // cria a janela flutuante
                titulo = "<span class='i3GeoTituloJanelaBsNolink' >"
                    + $trad('tabela', i3GEOF.tabela.dicionario)
                    + " (" + id + " )"
                    + "</span></div>";

                janela = i3GEO.janela.cria(
                        "610px",
                        "400px",
                        "",
                        "",
                        "",
                        titulo,
                        id,
                        false,
                        "hd",
                        cabecalho,
                        minimiza,
                        function() { i3GEO.guias.ajustaGuiaFerramenta(id, id + "i3GEOtabela");},
                        true,
                        "",
                        duplica,
                        "",
                        "",
                        "39"
                );
                divid = janela[2].id;
                if (i3GEOF.tabela.janelas.length > 1) {
                    temp = janela[0].cfg.config;
                    janela[0]
                    .moveTo(temp.x.value + (i3GEOF.tabela.janelas.length * 50), temp.y.value + (i3GEOF.tabela.janelas.length * 15));
                }
                $i(id + "_corpo").style.backgroundColor = "white";

                temp = function() {
                    i3GEOF.tabela.janelas.remove(id);
                    i3GEOF.tabela.propJanelas[id] = null;
                    if (i3GEOF.tabela.janelas.length === 0) {
                        if (i3GEO.Interface.ATUAL === "openlayers") {
                            i3GEO.eventos.removeEventos("NAVEGAMAPA", [
                                                                       "i3GEOF.tabela.atualizaListaDeRegistros()"
                                                                       ]);
                        }
                        if (i3GEO.Interface.ATUAL === "googlemaps") {
                            google.maps.event.removeListener(tabelaDragend);
                            google.maps.event.removeListener(tabelaZoomend);
                        }
                    }
                };
                YAHOO.util.Event.addListener(janela[0].close, "click", temp);
                janela[0].bringToTop();
            } else {
                // sera renderizado em $i(id)
                temp = 'i3GEOF.tabela.propJanelas["' + id + '"].atualiza = this.checked';
                $i(id + "_corpo").innerHTML =
                    "<img src='../imagens/aguarde2.gif' style='visibility: hidden;' class='i3GeoAguardeJanela' id='" + id
                    + "_imagemCabecalho'>"
                    + "<div style=background-color:#F2F2F2; >"
                    + "<input class='inputsb' checked style='cursor:pointer;position:relative;top:2px;' onclick='"
                    + temp
                    + "' type=checkbox />&nbsp;"
                    + $trad("atualizaNavegacao", i3GEOF.tabela.dicionario)
                    + " ("
                    + id
                    + ")</div>";

                divid = id + "_corpo";
            }
            if ($i(id + "_imagemCabecalho")) {
                i3GEOF.tabela.aguarde = $i(id + "_imagemCabecalho").style;
                i3GEOF.tabela.propJanelas[id].aguarde = $i(id + "_imagemCabecalho").style;
                i3GEOF.tabela.propJanelas[id].atualiza = true;
            }
            i3GEOF.tabela.inicia(divid, id);
            // inicia os eventos
            if (i3GEO.Interface.ATUAL === "openlayers") {
                i3GEO.eventos.adicionaEventos("NAVEGAMAPA", [
                                                             "i3GEOF.tabela.atualizaListaDeRegistros()"
                                                             ]);
            }
            if (i3GEO.Interface.ATUAL === "googlemaps" && !tabelaDragend) {
                tabelaDragend = google.maps.event.addListener(i3GeoMap, "dragend", function() {
                    i3GEOF.tabela.atualizaListaDeRegistros();
                });
                tabelaZoomend = google.maps.event.addListener(i3GeoMap, "zoomend", function() {
                    i3GEOF.tebela.atualizaListaDeRegistros();
                });
            }
        },
        /**
         * Obtem os parametros de cada janela e converte em base64. Cada janela e inserida como um item em um objeto A compactacao e
         * utilizada para salvar as configuracoes no mapfile atual
         */
        compactaConfig : function() {
            var c, g, par, janelas, i, n, novoid;
            par = [];
            janelas = i3GEOF.tabela.janelas;
            n = janelas.length;
            for (i = 0; i < n; i++) {
                novoid = window.prompt($trad('idDaTabela', i3GEOF.tabela.dicionario), janelas[i]);
                c = i3GEOF.tabela.retornaConfig(janelas[i], novoid);
                par.push(c);
            }
            g = YAHOO.lang.JSON.stringify(par);
            return i3GEO.util.base64encode(g);
        },
        restauraTabelas : function(par) {
            i3GEOF.tabela.LISTAREGATIVO = false;
            var n, i;
            par = i3GEO.util.base64decode(par);
            par = JSON.parse(par);
            n = par.length;
            for (i = 0; i < n; i++) {
                i3GEOF.tabela.iniciaJanelaFlutuante(par[i]);
            }
        },
        /**
         * Retorna um objeto contendo os valores de todos os parametros utilizados na tabela de tal forma que possa ser renderizado
         * novamente
         *
         * A funcao que salva o mapa no banco utiliza retornaConfig e cria um objeto que ira armazenar os parametros de cada janela
         */
        retornaConfig : function(idjanela, novoid) {
            // as chaves do objeto correspondem ao ID de cada elemento
            var c, par;

            par = i3GEOF.tabela.propJanelas[idjanela];
            c = $i(idjanela);
            // p = $i(idjanela+"i3GEOtabelaguia6obj");
            if (!novoid) {
                novoid = idjanela;
            }
            // pega todos os elementos do tipo input
            /*
             * objs = p.getElementsByTagName("input"); for (obj in objs) { if (objs[obj].id && objs[obj].id != "") { tmpid =
             * objs[obj].id.replace(idjanela,novoid); if (objs[obj].type === "text") { par[tmpid] = objs[obj].value; } else { par[tmpid] =
             * objs[obj].checked; } } } // pega todos os elementos do tipo select objs = p.getElementsByTagName("select"); for (obj in objs) {
             * if (objs[obj].id && objs[obj].id != "") { tmpid = objs[obj].id.replace(idjanela,novoid); par[tmpid] = objs[obj].value; } }
             */
            par.dados = "";
            try {
                par["i3GEOtabelainicio"] = $i(idjanela + "i3GEOtabelainicio").value;
                par["i3GEOtabelafim"] = $i(idjanela + "i3GEOtabelafim").value;
                par["idjanela"] = novoid;
                par["w"] = c.style.width;
                par["h"] = c.style.height;
            } catch (e) {
            }
            return par;
        },
        /*
         * Function: ativaFoco
         *
         * Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
         */
        ativaFoco : function(id) {

        },
        vinculos : {
            ligacoes : [],
            /**
             * Susbtitutos para o template
             */
            mustacheHash : function() {
                var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.tabela.dicionario);
                dicionario["locaplic"] = i3GEO.configura.locaplic;
                dicionario["comboJanelas1"] = i3GEOF.tabela.comboJanelas("i3GEOFTabelaOpcoesAdicionaVinculoT1", "i3GEOF.tabela.vinculos.comboColunasT1()");
                dicionario["comboJanelas2"] = i3GEOF.tabela.comboJanelas("i3GEOFTabelaOpcoesAdicionaVinculoT2", "i3GEOF.tabela.vinculos.comboColunasT2()");
                return dicionario;
            },
            iniciaJanelaFlutuante : function() {
                var janela, titulo;
                // cria a janela flutuante
                titulo = "<span class='i3GeoTituloJanelaBsNolink' >"
                    + $trad('vinculos', i3GEOF.tabela.dicionario)
                    + "</span></div>";
                janela =
                    i3GEO.janela.cria(
                            "400px",
                            "350px",
                            "",
                            "",
                            "",
                            titulo,
                            "i3GEOFtabelaVinculos",
                            false,
                            "hd",
                            "",
                            "",
                            "",
                            true,
                            "",
                            "",
                            "",
                            "",
                            "120"
                    );
                divid = janela[2].id;
                if (i3GEOF.tabela.janelas.length > 1) {
                    temp = janela[0].cfg.config;
                    janela[0]
                    .moveTo(temp.x.value + (i3GEOF.tabela.janelas.length * 50), temp.y.value + (i3GEOF.tabela.janelas.length * 15));
                }
                $i("i3GEOFtabelaVinculos_corpo").style.backgroundColor = "white";
                i3GEOF.tabela.vinculos.inicia();
            },
            html : function() {
                var ins = Mustache.render(i3GEOF.tabela.MUSTACHEVINCULO, i3GEOF.tabela.vinculos.mustacheHash());
                return ins;
            },
            vincular: function(){
                var t1 = $i("i3GEOFTabelaOpcoesAdicionaVinculoT1").value, t2 =
                    $i("i3GEOFTabelaOpcoesAdicionaVinculoT2").value, c1 =
                        $i("i3GEOFTabelaOpcoesAdicionaVinculoColunaT1").value, c2 =
                            $i("i3GEOFTabelaOpcoesAdicionaVinculoColunaT1").value;
                if (t1 != "" && t2 != "" && c1 != "" && c2 != "") {
                    i3GEOF.tabela.vinculos.ligacoes.push({
                        "t1" : t1,
                        "t2" : t2,
                        "c1" : c1,
                        "c2" : c2
                    });
                }
                i3GEOF.tabela.vinculos.lista();
            },
            inicia : function() {
                var ins = i3GEOF.tabela.vinculos.html();
                $i("i3GEOFtabelaVinculos_corpo").innerHTML = ins;
                i3GEOF.tabela.vinculos.lista();
            },
            comboColunasT1 : function() {
                var colunas = "";
                if($i("i3GEOFTabelaOpcoesAdicionaVinculoT1").value != ""){
                    colunas = i3GEOF.tabela.comboColunas($i("i3GEOFTabelaOpcoesAdicionaVinculoT1").value, "i3GEOFTabelaOpcoesAdicionaVinculoColunaT1");
                }
                $i("i3GEOFTabelaVinculoT1Colunas").innerHTML = colunas;
            },
            comboColunasT2 : function() {
                var colunas = "";
                if($i("i3GEOFTabelaOpcoesAdicionaVinculoT2").value != ""){
                    colunas = i3GEOF.tabela.comboColunas($i("i3GEOFTabelaOpcoesAdicionaVinculoT2").value, "i3GEOFTabelaOpcoesAdicionaVinculoColunaT2");
                }
                $i("i3GEOFTabelaVinculoT2Colunas").innerHTML = colunas;
            },
            lista : function() {
                var v = i3GEOF.tabela.vinculos.ligacoes, n = v.length, ins =
                    "<h5>" + $trad('vinculos', i3GEOF.tabela.dicionario) + "</h5>", i;
                for (i = 0; i < n; i++) {
                    ins += '<button title="excluir" onclick="i3GEOF.tabela.vinculos.excluir(\''
                        + i + '\')"'
                        + ' class="btn btn-xs" style="vertical-align:top;margin: 2px; padding: 2px; display:inline-block;"><span class="material-icons">clear</span></button>'
                        + "<h5 style='display:inline-block;vertical-align:top;'>" + v[i].t1
                        + " "
                        + v[i].c1
                        + " -> <br>"
                        + v[i].t2
                        + " "
                        + v[i].c2
                        + "</h5>";
                }
                $i("i3GEOFtabelaVinculosLista").innerHTML = ins;
            },
            excluir : function(i) {
                i3GEOF.tabela.vinculos.ligacoes.splice(parseInt(i, 10), 1);
                i3GEOF.tabela.vinculos.lista();
            },
            atualizaVinculos : function(tabelaOrigem, registro, marcado) {
                var v = i3GEOF.tabela.vinculos.ligacoes, n = v.length, i, valor;
                if (n > 0) {
                    for (i = 0; i < n; i++) {
                        // verifica se o vinculo existe
                        if (v[i].t1 === tabelaOrigem) {
                            // pega o valor do registro na tabela origem
                            valor = i3GEOF.tabela.vinculos.pegaValorRegistro(v[i].t1, v[i].c1, registro);
                            // marca o registro na tabela destino
                            i3GEOF.tabela.vinculos.registro(v[i].t2, v[i].c2, valor, marcado);
                        }
                        if (v[i].t2 === tabelaOrigem) {
                            // pega o valor do registro na tabela origem
                            valor = i3GEOF.tabela.vinculos.pegaValorRegistro(v[i].t2, v[i].c2, registro);
                            // marca o registro na tabela destino
                            i3GEOF.tabela.vinculos.registro(v[i].t1, v[i].c1, valor, marcado);
                        }
                    }
                }
            },
            // verifica qtas colunas devem ser puladas em cada linha
            colunasVazias : function(idjanela) {
                var tabela = $i(idjanela + "i3GEOtabelatabelai"), linhas = tabela.getElementsByTagName("tr"), pular = 0, colunas, n, i;
                colunas = linhas[0].getElementsByTagName("td");
                n = colunas.length;
                for (i = 0; i < n; i++) {
                    if (colunas[i].innerHTML == "") {
                        pular++;
                    }
                }
                return pular;
            },
            // pega o indice de uma coluna em uma tabela buscando no cabecalho
            // no valor de title em cada celula
            indiceColuna : function(idjanela, t) {
                var tabela = $i(idjanela + "i3GEOtabelatabelai"), linhas = tabela.getElementsByTagName("tr"), linha = linhas[0], colunas =
                    linha.getElementsByTagName("td"), indice = 0, n = colunas.length, i, s;
                for (i = 0; i < n; i++) {
                    s = colunas[i].getElementsByTagName("span");
                    if (s && s[0] && s[0].title && s[0].title == t) {
                        return i;
                    }
                }
                return indice;
            },
            // retorna o indice de uma coluna que contem a tag input na tabela
            // com a lista de valores
            indiceColunaInput : function(idjanela) {
                var tabela = $i(idjanela + "i3GEOtabelatabelai"), linhas = tabela.getElementsByTagName("tr"), linha = linhas[1], colunas =
                    linha.getElementsByTagName("td"), indice = 0, n = colunas.length, i;
                for (i = 0; i < n; i++) {
                    if (colunas[i].getElementsByTagName("input").length > 0) {
                        return i;
                    }
                }
                return indice;
            },
            // pega o valor da coluna em uma tabela com a lista de valores com
            // base no codigo do registro
            pegaValorRegistro : function(idjanela, coluna, registro) {
                var tabela = $i(idjanela + "i3GEOtabelatabelai"), linhas = tabela.getElementsByTagName("tr"), n = linhas.length, indiceColuna =
                    i3GEOF.tabela.vinculos.indiceColuna(idjanela, coluna), indiceColunaInput =
                        i3GEOF.tabela.vinculos.indiceColunaInput(idjanela), i, linha, colunas;
                for (i = 1; i < n; i++) {
                    linha = linhas[i];
                    colunas = linha.getElementsByTagName("td");
                    if (colunas[indiceColunaInput].getElementsByTagName("input")[0].name == registro) {
                        return colunas[indiceColuna].innerHTML;
                    }
                }
                return "";
            },
            registro : function(idjanela, coluna, valor, marcado) {
                var tabela = $i(idjanela + "i3GEOtabelatabelai"), linhas = tabela.getElementsByTagName("tr"), n = linhas.length, indiceColuna =
                    i3GEOF.tabela.vinculos.indiceColuna(idjanela, coluna), indiceColunaInput =
                        i3GEOF.tabela.vinculos.indiceColunaInput(idjanela), i, linha, colunas, reg;
                for (i = 1; i < n; i++) {
                    linha = linhas[i];
                    colunas = linha.getElementsByTagName("td");
                    if (colunas[indiceColuna].innerHTML == valor) {
                        reg = colunas[indiceColunaInput].getElementsByTagName("input")[0];
                        reg.checked = marcado;
                        i3GEOF.tabela.propJanelas[idjanela].registros[reg.name] = marcado;
                    }
                }
            },
        },
        comboJanelas : function(idcombo, funcao, w) {
            var i, n = i3GEOF.tabela.janelas.length;
            if (!funcao) {
                funcao = "";
            }
            if (!w) {
                w = 260;
            }
            ins =
                "" + "	<select class='form-control' style='width:"
                + w
                + "px;' id='"
                + idcombo
                + "' onchange='"
                + funcao
                + "'>"
                + "	<option value='' >---</option>";
            for (i = 0; i < n; i++) {
                ins += "<option value='" + i3GEOF.tabela.janelas[i] + "' >" + i3GEOF.tabela.janelas[i] + "</option>";
            }
            ins += "</select>";
            return ins;
        },
        comboColunas : function(idJanela, idcombo, funcao) {
            var i, c = i3GEOF.tabela.propJanelas[idJanela].colunas, n = c.itens.length;
            if (!funcao) {
                funcao = "";
            }
            ins = "<select class='form-control' id='"
                + idcombo
                + "' onchange='"
                + funcao
                + "'>"
                + "	<option value='' >---</option>";
            for (i = 0; i < n; i++) {
                ins += "<option value='" + c.itens[i] + "' >" + c.alias[i] + "</option>";
            }
            ins += "</select>";
            return ins;
        },
        /*
         * Function: ativaAutoAtualiza
         *
         * Ativa ou desativa a atualiza&ccedil;&atilde;o autom&aacute;tica da tabela quando o usu&aacute;rio navega no mapa
         */
        atualizaListaDeRegistros : function() {
            var i, janelas = i3GEOF.tabela.janelas, propJanelas = i3GEOF.tabela.propJanelas, n = janelas.length;
            for (i = 0; i < n; i++) {
                if (propJanelas[janelas[i]].atualiza === true) {
                    i3GEOF.tabela.pegaRegistros(janelas[i]);
                }
            }
        },
        /*
         * Function: pegaRegistros
         *
         * Pega os registros da tabela de atributos do tema
         *
         * Veja:
         *
         * <LISTAREGISTROS>
         */
        pegaRegistros : function(idjanela, tipolista, dadosDaClasse, inicio, fim, funcao) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            if (!idjanela) {
                idjanela = "";
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            $i(idjanela + "i3GEOtabelaregistros").innerHTML = "";
            var p, ext, tiporeg = "brasil", cp = new cpaint();
            // verifica se esta no modo de atualizacao automatica
            if (i3GEOF.tabela.propJanelas[idjanela].atualiza === true) {
                tiporeg = "mapa";
            }
            if (!tipolista) {
                if ($i(idjanela + "i3GEOtabelatipolista").checked) {
                    tipolista = "selecionados";
                } else {
                    tipolista = "tudo";
                }
            }
            if (!dadosDaClasse) {
                if ($i(idjanela + "i3GEOtabelalegenda").checked) {
                    dadosDaClasse = "sim";
                } else {
                    dadosDaClasse = "nao";
                }
            }
            if (!inicio) {
                inicio = $i(idjanela + "i3GEOtabelainicio").value - 1;
            } else {
                inicio = "";
            }
            if (!fim) {
                fim = $i(idjanela + "i3GEOtabelafim").value - 1;
            } else {
                fim = "";
            }
            if (!funcao) {
                funcao = function(retorno) {
                    i3GEOF.tabela.propJanelas[idjanela].registros = [];
                    i3GEOF.tabela.montaTabela(retorno, idjanela);
                };
            }
            ext = i3GEO.parametros.mapexten;
            ext = i3GEO.util.extOSM2Geo(ext);
            p =
                i3GEO.configura.locaplic + "/classesphp/mapa_controle.php?g_sid="
                + i3GEO.configura.sid
                + "&funcao=listaregistros"
                + "&inicio="
                + inicio
                + "&fim="
                + fim
                + "&tema="
                + i3GEOF.tabela.propJanelas[idjanela].tema
                + "&tipo="
                + tiporeg
                + "&tipolista="
                + tipolista
                + "&ext="
                + ext
                + "&dadosDaClasse="
                + dadosDaClasse;
            cp.set_response_type("JSON");
            cp.call(p, "listaRegistros", funcao);
        },
        /*
         * Function: montaTabela
         *
         * Monta a visualiza&ccedil;&atilde;o da tabela de atributos
         */
        montaTabela : function(retorno, idjanela) {
            if (retorno.data !== undefined) {
                var mustache = {
                        "idjanela": "",
                        "cabecalho": [{"classe":"hidden"},{"classe":"hidden"},{"classe":"hidden"},{"classe":"hidden"}], //4 colunas com icones
                        "linhas": [],
                        "ordena": $trad('ordena', i3GEOF.tabela.dicionario),
                        "excluir": $trad("t12")
                },
                linha = {
                        "classezoom": "",
                        "ext": "",
                        "indice": "",
                        "idjanela": ""
                },
                ins, i, vals, cor, j, n, stat, imagem, registros = i3GEOF.tabela.propJanelas[idjanela].registros, i3GEOtabelalegenda =
                    $i(idjanela + "i3GEOtabelalegenda").checked;
                // cabecalho da tabela
                mustache["idjanela"] = idjanela;
                i3GEOF.tabela.propJanelas[idjanela].colunas = {
                        "itens" : retorno.data[0].itens,
                        "alias" : retorno.data[0].alias
                };
                n = retorno.data[0].itens.length;
                for (i = 0; i < n; i++) {
                    mustache.cabecalho.push({
                        "idcoluna": i * 1 + 4, //pq tem 3 colunas com icones
                        "idjanela": idjanela,
                        "item": retorno.data[0].itens[i],
                        "alias": retorno.data[0].alias[i],
                        "classe": ""
                    });
                }
                n = retorno.data[1].registros.length;
                if ($i(idjanela + "i3GEOtabelafim").value === "") {
                    $i(idjanela + "i3GEOtabelafim").value = n - 1;
                }
                for (i = 0; i < n; i++) {
                    linha = {};
                    linha.classezoom = "hidden";
                    linha.ext = "";
                    linha.idjanela = idjanela;
                    linha.indice = retorno.data[1].registros[i].indice;
                    if (retorno.data[1].registros[i].ext && retorno.data[1].registros[i].ext != "") {
                        linha.classezoom = "";
                        linha.ext = retorno.data[1].registros[i].ext;
                    }
                    linha.stat = "";
                    if (retorno.data[1].registros[i].status === "CHECKED") {
                        linha.stat = "CHECKED";
                    }
                    if (registros[retorno.data[1].registros[i].indice]) {
                        if (registros[retorno.data[1].registros[i].indice] === true) {
                            linha.stat = "CHECKED";
                        } else {
                            linha.stat = "";
                        }
                    }
                    if (i3GEOtabelalegenda == true) {
                        linha.classelegenda = "";
                        linha.nomeClasse = retorno.data[1].registros[i].classe["nome"];
                        linha.imagemClasse = retorno.data.legenda[retorno.data[1].registros[i].classe["indice"]];
                        imagem = retorno.data.legenda[retorno.data[1].registros[i].classe["indice"]];
                    } else {
                        linha.classelegenda = "hidden";
                        linha.nomeClasse = "";
                        linha.imagemClasse = "";
                    }
                    if (linha.stat === "CHECKED") {
                        registros[retorno.data[1].registros[i].indice] = true;
                    }
                    vals = retorno.data[1].registros[i].valores;
                    linha.colunas = "";
                    for (j = 0; j < vals.length; j++) {
                        linha.colunas += "<td style='min-width: 150px;' title='" + vals[j].item + "' >" + vals[j].valor + "</td>";
                    }
                    mustache.linhas.push(linha);
                }
                ins = Mustache.render(i3GEOF.tabela.MUSTACHELISTA, mustache);
                $i(idjanela + "i3GEOtabelaregistros").innerHTML = ins;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
        },
        /*
         * Function: mais
         *
         * Avan&ccedil;a o contador de registros para a listagem
         */
        mais : function(idjanela) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            var i = $i(idjanela + "i3GEOtabelainicio").value * 1, f = $i(idjanela + "i3GEOtabelafim").value * 1, d = f - i;
            $i(idjanela + "i3GEOtabelainicio").value = f + 1;
            $i(idjanela + "i3GEOtabelafim").value = f + d + 1;
            i3GEOF.tabela.pegaRegistros(idjanela);
        },
        /*
         * Function: todos
         *
         * Avan&ccedil;a o contador de registros para o fim da listagem
         */
        todos : function(idjanela) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            $i(idjanela + "i3GEOtabelainicio").value = 1;
            $i(idjanela + "i3GEOtabelafim").value = "";
            i3GEOF.tabela.pegaRegistros(idjanela, false, false, false, 1, false);
        },
        /*
         * Function: menos
         *
         * Retrocede o contador de registros para a listagem
         */
        menos : function(idjanela) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            var i = $i(idjanela + "i3GEOtabelainicio").value * 1, f = $i(idjanela + "i3GEOtabelafim").value * 1, d = f - i;
            $i(idjanela + "i3GEOtabelainicio").value = i - d - 1;
            $i(idjanela + "i3GEOtabelafim").value = i - 1;
            if ($i(idjanela + "i3GEOtabelainicio").value < 1) {
                $i(idjanela + "i3GEOtabelainicio").value = 1;
                $i(idjanela + "i3GEOtabelafim").value = 1 + d;
            }
            i3GEOF.tabela.pegaRegistros(idjanela);
        },
        /*
         * Function: excluiColuna
         *
         * Exclui uma coluna da visualiza&ccedil;&atilde;o da tabela
         */
        excluiColuna : function(coluna, cid, idjanela) {
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            try {
                var tabela = $i(idjanela + "i3GEOtabelatabelai"), trs, tds, i, t, nt, ni;
                // pega o indice correto
                tds = coluna.parentNode.parentNode.getElementsByTagName("td");
                nt = tds.length;
                for (t = 0; t < nt; t++) {
                    if (tds[t].accessKey == cid) {
                        cid = t;
                        break;
                    }
                }
                trs = tabela.getElementsByTagName("tr");
                nt = trs.length;
                for (t = 0; t < nt; t++) {
                    i = trs[t];
                    if (i.getElementsByTagName("td")[cid]) {
                        ni = i.getElementsByTagName("td")[cid];
                        i.removeChild(ni);
                    }
                }
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
            } catch (e) {
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                if (typeof (console) !== 'undefined') {
                    console.error(e);
                }
            }
        },
        /*
         * Function: ordenaColuna
         *
         * Ordena uma coluna da tabela
         */
        ordenaColuna : function(coluna, cid, idjanela) {
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            try {
                var numero = false,tabela = $i(idjanela + "i3GEOtabelatabelai"), trs = tabela.getElementsByTagName("tr"),
                ntrs = trs.length, tds, nt, psort = [], t, psortfim, npsortfim, ins, p, e, c;

                // pega o indice correto
                tds = coluna.parentNode.parentNode.getElementsByTagName("td");
                nt = tds.length;
                for (t = 0; t < nt; t++) {
                    if (tds[t].accessKey == cid) {
                        cid = t;
                        break;
                    }
                }
                for (t = 1; t < ntrs; t++) {
                    c = trs[t].getElementsByTagName("td")[cid].innerHTML;
                    psort.push( c + "@$" + t);
                    if (c * 1) {
                        numero = true;
                    }
                }
                // recosntroi a tabela
                if(numero){
                    psortfim = psort.sort(function(a, b) {
                        return a.split("@$")[0]*1 - b.split("@$")[0]*1;
                    });
                } else {
                    psortfim = psort.sort();
                }

                ins = "<table id=" + idjanela + "i3GEOtabelatabelai class=lista8 >";
                ins += "<tr>" + trs[0].innerHTML + "</tr>";
                npsortfim = psortfim.length;
                for (p = 0; p < npsortfim; p++) {
                    e = psortfim[p].split("@$")[1] * 1;
                    if (trs[e] !== undefined) {
                        ins += "<tr>" + trs[e].innerHTML + "</tr>";
                    }
                }
                $i(idjanela + "i3GEOtabelaregistros").innerHTML = ins + "</table>";
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
            } catch (e) {
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                if (typeof (console) !== 'undefined') {
                    console.error(e);
                }
            }
        },
        excluiLinha : function(celula) {
            var p = celula.parentNode.parentNode;
            do {
                p.removeChild(p.childNodes[0]);
            } while (p.childNodes.length > 0);
            p.parentNode.removeChild(p);
        },
        zoomExt : function(ext, idjanela) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            var funcao = function() {
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                i3GEOF.tabela.pegaRegistros(idjanela);
                i3GEO.atualiza();
            };
            i3GEO.php.mudaext(funcao, "nenhum", ext);
        },
        registraLinha : function(linha, idjanela) {
            i3GEOF.tabela.propJanelas[idjanela].registros[linha.name] = linha.checked;
            i3GEOF.tabela.vinculos.atualizaVinculos(idjanela, linha.name, linha.checked);
        },
        /*
         * Function: listaMarcados
         *
         * Retorna um array com os &iacute;ndices dos registros que est&atilde;o marcados.
         */
        listaMarcados : function(idjanela) {
            var lista = [], registros = i3GEOF.tabela.propJanelas[idjanela].registros, i, n = registros.length;
            for (i = 0; i < n; i++) {
                if (registros[i] === true) {
                    lista.push(i);
                }
            }
            return lista;
        },
        /*
         * Function: ativaSelecao
         *
         * Seleciona no mapa os elementos que estiverem marcados na guia 2
         *
         * Veja:
         *
         * <INCLUISEL>
         */
        ativaSelecao : function(idjanela) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            var lista = i3GEOF.tabela.listaMarcados(idjanela), p, cp, temp = function(retorno) {
                if (retorno) {
                    i3GEO.Interface.atualizaTema(retorno, i3GEOF.tabela.propJanelas[idjanela].tema);
                    i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                }
            };
            p =
                i3GEO.configura.locaplic + "/ferramentas/tabela/exec.php?g_sid="
                + i3GEO.configura.sid
                + "&funcao=incluisel&tema="
                + i3GEOF.tabela.propJanelas[idjanela].tema
                + "&ids="
                + lista.toString();
            cp = new cpaint();
            cp.set_response_type("JSON");
            cp.call(p, "incluiSel", temp);
        },
        /*
         * Function: limpaSelecao
         *
         * Limpa a sele&ccedil;&atilde;o do tema da tabela
         */
        limpaSelecao : function(idjanela) {
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            i3GEO.tema.limpasel(i3GEOF.tabela.propJanelas[idjanela].tema);
            i3GEOF.tabela.propJanelas[idjanela].registros = [];
            var lista = $i(idjanela + "i3GEOtabelatabelai").getElementsByTagName("input"), n = lista.length, i;
            for (i = 0; i < n; i++) {
                lista[i].checked = false;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
        },
        /*
         * Function: criaNovoTema
         *
         * Cria um novo tema contendo a sele&ccedil;&atilde;o existente
         */
        criaNovoTema : function(idjanela) {
            var camada = i3GEO.arvoreDeCamadas.pegaTema(i3GEOF.tabela.propJanelas[idjanela].tema);
            if(camada.nsel == 0){
                i3GEO.janela.tempoMsg($trad("selUmReg",i3GEOF.tabela.dicionario));
                return;
            }

            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            var temp = function(retorno) {
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                i3GEO.atualiza(retorno);
            };
            i3GEO.php.criatemaSel(temp, i3GEOF.tabela.propJanelas[idjanela].tema);
        },
        /*
         * Function: comboItens
         *
         * Cria um combo para selecionar um item do tema escolhido
         */
        comboItensEstat : function(idjanela) {
            var tema = i3GEOF.tabela.propJanelas[idjanela].tema;
            i3GEO.util.comboItens(idjanela + "i3GEOtabelaComboItensGuia3", tema, function(retorno) {
                if (retorno.tipo === "erro") {
                    $i(idjanela + "i3GEOtabelaitensGuia3").innerHTML =
                        i3GEO.janela.closeMsg('<div class="alert alert-danger" role="alert">' + $trad('erroTemaOrigem2',i3GEOF.tabela.dicionario) + '</div>');
                } else {
                    $i(idjanela + "i3GEOtabelaitensGuia3").innerHTML = retorno.dados;
                }
            }, idjanela + "i3GEOtabelaitensGuia3", "","sim","","form-control");
        },
        estatistica : function(idjanela) {
            if ($i(idjanela + "i3GEOtabelaComboItensGuia3").value === "") {
                i3GEO.janela.tempoMsg("Escolha um item!");
                return;
            }
            if (i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility === "visible") {
                return;
            }
            i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "visible";
            try {
                var monta = function(retorno) {
                    var ins = "", nome, valor, i, n;
                    if (retorno.data.indices !== undefined) {
                        if (retorno.data.indices) {
                            n = retorno.data.indices.length;
                            for (i = 0; i < n; i++) {
                                nome =retorno.data.variaveis[retorno.data.indices[i]];
                                valor = retorno.data.valores[retorno.data.indices[i]];
                                ins += '<div class="row-content"><h4 class="list-group-item-heading">'+nome+'</h4><p class="list-group-item-text">'+valor+'</p></div>';
                                ins += '<div class="list-group-separator">&nbsp;</div>';
                            }
                        }
                    } else {
                        ins = retorno.data;
                    }
                    $i(idjanela + "i3GEOtabelaoperacoes").innerHTML = ins + "<br>";
                    i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                }, exclui = "", cp = new cpaint(), p;
                if ($i(idjanela + "i3GEOtabelafiltro1").value !== "") {
                    exclui = $i("i3GEOtabelafiltro1").value;
                }
                p =
                    i3GEO.configura.locaplic + "/ferramentas/tabela/exec.php?g_sid="
                    + i3GEO.configura.sid
                    + "&funcao=estatistica&item="
                    + $i(idjanela + "i3GEOtabelaComboItensGuia3").value
                    + "&tema="
                    + i3GEOF.tabela.propJanelas[idjanela].tema
                    + "&exclui="
                    + exclui
                    + "&ext="
                    + i3GEO.parametros.mapexten;
                cp.set_response_type("JSON");
                cp.call(p, "estatDescritivas", monta);
            } catch (e) {
                i3GEOF.tabela.propJanelas[idjanela].aguarde.visibility = "hidden";
                $i("operacoes").innerHTML = "Ocorreu um erro: " + e;
            }
        },
        tabelaTexto : function() {
        },
        /*
         * Function: relatorioTabela
         *
         * Monta o relat&oacute;rio padr&atilde;o em uma nova janela
         */
        relatorioTabela : function(idjanela) {
            try {
                $i(idjanela + "i3GEOtabelatiporelh").value = "";
                $i(idjanela + "i3GEOtabelaarearelh").value = $i(idjanela + "i3GEOtabelacalculaarea").checked;
                $i(idjanela + "i3GEOtabelastatrelh").value = $i(idjanela + "i3GEOtabelacalculaestat").checked;
                $i(idjanela + "i3GEOtabelaexcluirvalorh").value = $i(idjanela + "i3GEOtabelaexcestat").value;
                $i(idjanela + "i3GEOtabelatemarelh").value = i3GEOF.tabela.propJanelas[idjanela].tema;
                $i(idjanela + "i3GEOtabelag_sidh").value = i3GEO.configura.sid;
                $i(idjanela + "i3GEOtabelaitemagruparelh").value = $i(idjanela + "i3GEOtabelaagrupaItem").value;
                var inputs = $i(idjanela + "i3GEOtabelaitensrelatorio").getElementsByTagName("input"), listai = [], listaordem = [], listanomes =
                    [], nome, ordem, i, temp, n = inputs.length;
                for (i = 0; i < n; i++) {
                    if (inputs[i].type === "checkbox" && inputs[i].checked == true) {
                        listai.push(inputs[i].id + "|" + inputs[i].name);
                        nome = $i(inputs[i].id + inputs[i].name).value;
                        listanomes.push(nome);
                        ordem = $i("ordem_" + inputs[i].id + inputs[i].name).value;
                        if (ordem === "") {
                            ordem = 0;
                        }
                        listaordem.push(ordem);
                    }
                }
                $i(idjanela + "i3GEOtabelaordemrel").value = listaordem;
                $i(idjanela + "i3GEOtabelanomesrelh").value = listanomes;
                $i(idjanela + "i3GEOtabelaitensrelh").value = listai;
                temp = $i(idjanela + "i3GEOtabelarelatorio").action;
                $i(idjanela + "i3GEOtabelarelatorio").action += "?ext=" + i3GEO.parametros.mapexten;
                $i(idjanela + "i3GEOtabelarelatorio").submit();
                $i(idjanela + "i3GEOtabelarelatorio").action = temp;
            } catch (e) {
                i3GEO.janela.tempoMsg(e);
            }
        },
        /*
         * Function: relatorioTexto
         *
         * Gera o relat&oacute;rio no formato CSV
         */
        relatorioTexto : function(idjanela) {
            $i(idjanela + "i3GEOtabelaarearelh").value = $i(idjanela + "i3GEOtabelacalculaarea").checked;
            $i(idjanela + "i3GEOtabelastatrelh").value = $i(idjanela + "i3GEOtabelacalculaestat").checked;
            $i(idjanela + "i3GEOtabelaexcluirvalorh").value = $i(idjanela + "i3GEOtabelaexcestat").value;
            $i(idjanela + "i3GEOtabelatemarelh").value = i3GEOF.tabela.propJanelas[idjanela].tema;
            $i(idjanela + "i3GEOtabelag_sidh").value = i3GEO.configura.sid;
            $i(idjanela + "i3GEOtabelaitemagruparelh").value = $i(idjanela + "i3GEOtabelaagrupaItem").value;
            $i(idjanela + "i3GEOtabelatiporelh").value = "csv";
            var inputs = $i(idjanela + "i3GEOtabelaitensrelatorio").getElementsByTagName("input"), listai = [], listanomes = [], nome, i, temp, n =
                inputs.length;
            for (i = 0; i < n; i++) {
                if (inputs[i].checked === true) {
                    listai.push(inputs[i].id + "|" + inputs[i].name);
                    nome = $i(inputs[i].id + inputs[i].name).value;
                    listanomes.push(nome);
                }
            }
            $i(idjanela + "i3GEOtabelanomesrelh").value = listanomes;
            $i(idjanela + "i3GEOtabelaitensrelh").value = listai;
            temp = $i(idjanela + "i3GEOtabelarelatorio").action;
            $i(idjanela + "i3GEOtabelarelatorio").action += "?ext=" + i3GEO.parametros.mapexten;
            $i(idjanela + "i3GEOtabelarelatorio").submit();
            $i(idjanela + "i3GEOtabelarelatorio").action = temp;
        }
};
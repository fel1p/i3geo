/*
Title: TME

Cria um arquivo KML com a representa&ccedil;&atilde;o em mapa tem&aacute;tico baseado no pacote TME

<i3GEO.tema.dialogo.tme>

Arquivo:

i3geo/ferramentas/tme/index.js.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
 */
if (typeof (i3GEOF) === 'undefined') {
	var i3GEOF = {};
}

/*
 * Classe: i3GEOF.tme
 *
 * Camadas podem ter as definicoes default de parametros armazenadas no metadata TME Esse metadata e mantido no objeto
 * i3GEO.arvoreDeCamadas.CAMADAS
 *
 * Os campos definidos pelo usuario podem ser salvos no mapfile caso o usuario esteja logado
 *
 * Veja tambem i3geo/ferramentas/atalhosedicao
 */
i3GEOF.tme =
	{
		// opcional - nome do item da tabela de atributos que contem os nomes dos elementos
		// utilizado para definir o valor do combo i3GEOTMEregioes
		ITEMNOMEREGIOES : "",
		// opcional - nome do item da tabela de atributos que contem os dados dos elementos
		// utilizado para definir item que iniciara marcado na lista de itens que indica a coluna que contem os dados
		ITEMDADOS : "",
		TITULO : "",
		OUTLINECOLOR : "-1,-1,-1",
		NUMVERTICES : 8,
		LMAX : 5000,
		AMAX : 2000000,
		/*
		 * Variavel: tema
		 *
		 * Tema que ser&aacute; utilizado
		 *
		 * Type: {string}
		 */
		tema : i3GEO.temaAtivo,
		/*
		 * Variavel: aguarde
		 *
		 * Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
		 */
		aguarde : "",
		/*
		 * Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n&atilde;o tinha dicion&aacute;rio
		 */
		criaJanelaFlutuante : function() {
			i3GEOF.tme.iniciaDicionario();
		},
		/**
		 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
		 */
		MUSTACHE : "",
		MUSTACHELISTA : "",
		/**
		 * Susbtitutos para o template
		 */
		mustacheHash : function() {
			var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.tme.dicionario);
			return dicionario;
		},
		/*
		 * Function: iniciaDicionario
		 *
		 * Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta
		 *
		 * O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script
		 */
		iniciaDicionario : function() {
			if (typeof (i3GEOF.tme.dicionario) === 'undefined') {
				i3GEO.util.scriptTag(
					i3GEO.configura.locaplic + "/ferramentas/tme/dicionario.js",
					"i3GEOF.tme.iniciaJanelaFlutuante()",
					"i3GEOF.tme.dicionario_script");
			} else {
				i3GEOF.tme.iniciaJanelaFlutuante();
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
		inicia : function(iddiv) {
			if(i3GEOF.tme.MUSTACHE == ""){
				var t1 = i3GEO.configura.locaplic + "/ferramentas/tme/template_mst.html",
				t2 = i3GEO.configura.locaplic + "/ferramentas/tme/templateLista_mst.html";

				$.when( $.get(t1),$.get(t2) ).done(function(r1,r2) {
					i3GEOF.tme.MUSTACHE = r1[0];
					i3GEOF.tme.MUSTACHELISTA = r2[0];
					i3GEOF.tme.inicia(iddiv);
				}).fail(function() {
				    i3GEO.janela.closeMsg($trad("erroTpl"));
				    return;
				});
				return;
			}
			var camada = "";

			if(i3GEOF.tme.tema === ""){
				return;
			}
			$i(iddiv).innerHTML = i3GEOF.tme.html();
			if (!$i("i3GEOFtmeComboCabecaSel")) {
				i3GEO.janela.comboCabecalhoTemasBs("i3GEOFtmeComboCabeca", "i3GEOFtmeComboCabecaSel", "tme", "ligadosComTabela",function(evt){
					var botao = evt.target;
					if (botao) {
						if (botao.value != "") {
							i3GEO.mapa.ativaTema(botao.value);
							i3GEOF.tme.tema = botao.value;
							$i(iddiv).innerHTML = "";
							i3GEOF.tme.inicia(iddiv);
						} else {
							$i(iddiv).innerHTML = "";
						}
					}
				});
			}
			if (i3GEO.login.verificaCookieLogin() === true && i3GEO.parametros.editor === "sim") {
				$(".i3GEOTME").find(".hidden").removeClass("hidden");
			}
			try {
				//
				// verifica se a camada possui definicao dos parametros
				//
				if (i3GEO.arvoreDeCamadas) {
					camada = i3GEO.arvoreDeCamadas.pegaTema(i3GEOF.tme.tema);
					if (camada != "" && camada.ferramentas.tme) {
						i3GEOF.tme.ITEMNOMEREGIOES = camada.ferramentas.tme.colnome;
						i3GEOF.tme.AMAX = camada.ferramentas.tme.amax;
						i3GEOF.tme.LMAX = camada.ferramentas.tme.lmax;
						i3GEOF.tme.ITEMDADOS = camada.ferramentas.tme.colsdata.join(",");
						i3GEOF.tme.TITULO = camada.ferramentas.tme.titulo;
						i3GEOF.tme.OUTLINECOLOR = camada.ferramentas.tme.outlinecolor;
						i3GEOF.tme.NUMVERTICES = camada.ferramentas.tme.numvertices;
						if(camada.ferramentas.tme.auto === "sim"){
							$i("ativaAoAdic").checked = true;
						}
						if(camada.ferramentas.tme.exec === "sim"){
							$i("execAoAdic").checked = true;
						}
					} else if (camada != "") {
						i3GEOF.tme.TITULO = camada.tema;
					}
				}
				$i("i3GEOTMEbarSize").value = i3GEOF.tme.AMAX;
				$i("i3GEOTMEmaxHeight").value = i3GEOF.tme.LMAX;
				$i("i3GEOTMEtitulo").value = i3GEOF.tme.TITULO;
				$i("i3GEOTMEoutlinecolor").value = i3GEOF.tme.OUTLINECOLOR;
				$i("i3GEOTMEnumvertices").value = i3GEOF.tme.NUMVERTICES;
				// combo para escolher a coluna com os nomes das regioes
				i3GEO.util.comboItens(
					"i3GEOTMEregioes",
					i3GEOF.tme.tema,
					function(retorno) {
						if ($i("i3GEOTMEregioeslista")) {
							$i("i3GEOTMEregioeslista").innerHTML = retorno.dados;
						}
						if (i3GEOF.tme.ITEMNOMEREGIOES != "") {
							$i("i3GEOTMEregioes").value = i3GEOF.tme.ITEMNOMEREGIOES;
						}
						// lista para escolher as colunas com os valores
						var temp = function(r) {
							i3GEOF.tme.montaListaItens(r);
							// se os parametros da ferramenta estiverem definidos na camada
							if (camada != "" && camada.ferramentas.tme && camada.ferramentas.tme.exec === "sim") {
								i3GEOF.tme.ativa();
							}
						};
						i3GEO.php.listaItensTema(temp, i3GEOF.tme.tema);
					},
					"i3GEOTMEregioeslista",
					"",
					"sim",
					"",
					"form-control"
				);

				i3GEOF.tme.ativaFoco();
			} catch (erro) {
				i3GEO.janela.tempoMsg(erro);
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
		html : function() {
			var ins = Mustache.render(i3GEOF.tme.MUSTACHE, i3GEOF.tme.mustacheHash());
			return ins;
		},
		/*
		 * Function: iniciaJanelaFlutuante
		 *
		 * Cria a janela flutuante para controle da ferramenta.
		 */
		iniciaJanelaFlutuante : function(tema) {
			if(tema && tema != ""){
				i3GEOF.tme.tema = tema;
				i3GEO.temaAtivo = tema;
			} else {
				i3GEOF.tme.tema = i3GEO.temaAtivo;
			}
			var minimiza, cabecalho, janela, divid, temp, titulo;
			if ($i("i3GEOF.tme")) {
				i3GEOF.tme.inicia("i3GEOF.tme_corpo");
				return;
			}
			cabecalho = function() {
				i3GEOF.tme.ativaFoco();
			};
			minimiza = function() {
				i3GEO.janela.minimiza("i3GEOF.tme");
			};
			// cria a janela flutuante
			titulo = "<span class='i3GeoTituloJanelaBsNolink' >TME</span></div>";
			janela = i3GEO.janela.cria(
				"380px",
				"320px",
				"",
				"",
				"",
				titulo,
				"i3GEOF.tme",
				false,
				"hd",
				cabecalho,
				minimiza,
				"",
				true,
				"",
				"",
				"",
				"",
				"108"
			);
			divid = janela[2].id;
			i3GEOF.tme.aguarde = $i("i3GEOF.tme_imagemCabecalho").style;
			$i("i3GEOF.tme_corpo").style.backgroundColor = "white";
			i3GEOF.tme.inicia(divid);
		},
		/*
		 * Function: ativaFoco
		 *
		 * Refaz a interface da ferramenta quando a janela flutuante tem seu foco ativado
		 */
		ativaFoco : function() {
		},
		salvaParametros: function(){
			if(i3GEOF.tme.aguarde.visibility == "visible"){
				return;
			}
			//monta a string JSON que sera enviada para gravacao
			//'{"titulo":"População","colnome":"CNTRY_NAME","colsdata":["POP_CNTRY"],"lmax":"100000","amax":"2000000","auto":"sim","exec":"sim"}'
			var j, colsdata = i3GEOF.tme.pegaItensMarcados(), auto = "nao", exec = "nao";
			if($i("ativaAoAdic").checked === true){
				auto = "sim";
			}
			if($i("execAoAdic").checked === true){
				exec = "sim";
			}

			j = '{"titulo":"'
				+ $i("i3GEOTMEtitulo").value
				+ '","colnome":"'
				+ $i("i3GEOTMEregioes").value
				+ '","colsdata":['
				+ '"' + colsdata.join('","') + '"'
				+ '],"lmax":"'
				+ $i("i3GEOTMEmaxHeight").value
				+ '","amax":"'
				+ $i("i3GEOTMEbarSize").value
				+ '","outlinecolor":"'
				+ $i("i3GEOTMEoutlinecolor").value
				+ '","numvertices":"'
				+ $i("i3GEOTMEnumvertices").value
				+ '","auto":"'
				+ auto
				+ '","exec":"'
				+ exec
				+ '"}';

				p = i3GEO.configura.locaplic + "/ferramentas/tme/manutencao.php";
				par = "&g_sid=" + i3GEO.configura.sid
					+ "&tema=" + i3GEOF.tme.tema
					+ "&tme=" + i3GEO.util.base64encode(j)
					+ "&funcao=incluitme";

				retorno =
					function(retorno) {
					i3GEOF.tme.aguarde.visibility = "hidden";
					};
				i3GEOF.tme.aguarde.visibility = "visible";
				cpJSON.call(p, "foo", retorno, par);

		},
		removeParametros: function(){
			if(i3GEOF.tme.aguarde.visibility == "visible"){
				return;
			}
			p = i3GEO.configura.locaplic + "/ferramentas/tme/manutencao.php";
			par = "&g_sid=" + i3GEO.configura.sid
				+ "&tema=" + i3GEOF.tme.tema
				+ "&funcao=removetme";

			retorno =
				function(retorno) {
				i3GEOF.tme.aguarde.visibility = "hidden";
				};
			i3GEOF.tme.aguarde.visibility = "visible";
			cpJSON.call(p, "foo", retorno, par);
		},
		/*
		 * Function: montaListaItens
		 *
		 * Monta a lista de itens que poder&atilde;o ser escolhidos para compor o mapa.
		 *
		 * A lista &eacute; inserida no elemento html com id "i3GEOtmelistai"
		 */
		montaListaItens : function(retorno) {
			var ins, i, n, item, litens,temp = {}, mustache = [];
			try {
				ins = [];
				ins.push("<table>");
				n = retorno.data.valores.length;
				for (i = 0; i < n; i++) {
					temp = {};
					temp.item = retorno.data.valores[i].item;
					mustache.push(temp);
				}

				ins = Mustache.render(
						i3GEOF.tme.MUSTACHELISTA,
						$.extend(
								{},
								{
									"linhas" :  mustache,
								},
								i3GEOF.tme.DICIONARIO
						)
				);
				$i("i3GEOtmelistai").innerHTML = ins;
				//
				// marca as colunas default
				//
				litens = i3GEOF.tme.ITEMDADOS.split(",");
				n = litens.length;
				for (i = 0; i < n; i++) {
					if ($i("i3GEOtme" + litens[i])) {
						$i("i3GEOtme" + litens[i]).checked = true;
					}
				}
			} catch (e) {
				$i("i3GEOtmelistai").innerHTML = "<p style=color:red >Erro<br>" + e;
			}
		},
		/*
		 * Function: pegaItensMarcados
		 *
		 * Recupera os itens que foram marcados e monta uma lista para enviar como parametro para a fun&ccedil;&atilde;o de
		 * gera&ccedil;&atilde;o dos gr&aacute;ficos
		 */
		pegaItensMarcados : function() {
			var listadeitens = [], inputs = $i("i3GEOtmelistai").getElementsByTagName("input"), i, it, n;
			n = inputs.length;
			for (i = 0; i < n; i++) {
				if (inputs[i].checked === true) {
					it = inputs[i].id;
					listadeitens.push(it.replace("i3GEOtme", ""));
				}
			}
			return (listadeitens);
		},
		/*
		 * Function: ativa
		 *
		 * Cria o arquivo KML com os itens marcados
		 *
		 * Veja:
		 *
		 * <ATIVAtme>
		 */
		ativa : function() {
			try {
				if (i3GEOF.tme.aguarde.visibility === "visible") {
					return;
				}
				var lista = i3GEOF.tme.pegaItensMarcados(), cp = new cpaint(), temp, p, colunanomeregiao = $i("i3GEOTMEregioes").value;
				if (lista.length === 0) {
					i3GEO.janela.tempoMsg("selecione um item");
					return;
				}
				if (colunanomeregiao === 0) {
					i3GEO.janela.tempoMsg($trad('selecionaItemRegiao', i3GEOF.tme.dicionario));
					return;
				}
				i3GEOF.tme.aguarde.visibility = "visible";
				temp =
					function(retorno) {
						i3GEOF.tme.aguarde.visibility = "hidden";
						var ext, url, ins =
							"<h5>" + $trad('arquivoDownload', i3GEOF.tme.dicionario)
								+ "</h5><a href='"
								+ retorno.data.url
								+ "' target=new >"
								+ retorno.data.url
								+ "</a>";
						ext = i3GEO.parametros.mapexten;
						ext = i3GEO.util.extOSM2Geo(ext);
						url =
							i3GEO.configura.locaplic + "/ferramentas/cesium/kml3d.php?kmlurl="
								+ retorno.data.url
								+ "&legenda="
								+ retorno.data.legenda
								+ "&mapext=" + ext;
						ins +=
							"<<h5>" + $trad('abreNoCesium', i3GEOF.tme.dicionario)
								+ "</h5><a href='"
								+ url
								+ "' target='new' >"
								+ url
								+ "</a>";

						$("#i3GEOTMEresultado").removeClass("hidden").html(ins);
						$i("i3GEOTMEresultado").scrollIntoView(true);

					};
				p =
					i3GEO.configura.locaplic + "/pacotes/tme/TME_i3geo.php?maxHeight="
						+ $i("i3GEOTMEbarSize").value
						+ "&barSize="
						+ $i("i3GEOTMEmaxHeight").value
						+ "&sid="
						+ i3GEO.configura.sid
						+ "&nomelayer="
						+ i3GEOF.tme.tema
						+ "&colunasvalor="
						+ lista.toString(",")
						+ "&colunanomeregiao="
						+ colunanomeregiao
						+ "&titulo="
						+ $i("i3GEOTMEtitulo").value
						+ "&descricao="
						+ $i("i3GEOTMEdesc").value
						+ "&outlinecolor="
						+ $i("i3GEOTMEoutlinecolor").value
						+ "&numvertices="
						+ $i("i3GEOTMEnumvertices").value;
				cp.set_response_type("JSON");
				cp.call(p, "tme", temp);
			} catch (e) {
				i3GEO.janela.tempoMsg("Erro: " + e);
				i3GEOF.tme.aguarde.visibility = "hidden";
			}
		}
	};

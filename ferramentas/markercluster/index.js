/**
 * Title: markercluster
 *
 * Gera um mapa de pontos agrupados baseado em uma camada existente no mapa.
 *
 * Veja em classesjs/classe_plugini3geo.js
 *
 * A ferramenta altera o mapfile em uso clonando o mapfile escolhido e
 * adicionando os metadados necess&aacute;rios ao uso do markercluster
 *
 * Veja:
 *
 * <i3GEO.analise.dialogo.markercluster>
 *
 * Arquivo:
 *
 * i3geo/ferramentas/markercluster/index.js.php
 *
 * Licenca:
 *
 * GPL2
 *
 * i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet
 *
 * Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente
 * Brasil Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com
 *
 * Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
 * e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
 * GNU conforme publicada pela Free Software Foundation;
 *
 * Este programa &eacute; distribu&iacute;do na expectativa de que seja
 * &uacute;til, por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia
 * impl&iacute;cita de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA
 * FINALIDADE ESPEC&Iacute;FICA. Consulte a Licen&ccedil;a P&uacute;blica Geral
 * do GNU para mais detalhes. Voc&ecirc; deve ter recebido uma c&oacute;pia da
 * Licen&ccedil;a P&uacute;blica Geral do GNU junto com este programa; se
 * n&atilde;o, escreva para a Free Software Foundation, Inc., no endere&ccedil;o
 * 59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
 */
if (typeof (i3GEOF) === 'undefined') {
	var i3GEOF = {};
}
i3GEOF.markercluster = {
	/**
	 * Variavel: aguarde
	 *
	 * Objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da
	 * janela.
	 */
	aguarde : "",
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.markercluster.dicionario);
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		return dicionario;
	},
	/**
	 * Function: inicia
	 *
	 * Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante
	 *
	 * Parametro:
	 *
	 * iddiv {String} - id do div que receber&aacute; o conteudo HTML da
	 * ferramenta
	 */
	inicia : function(iddiv) {
		if(i3GEOF.markercluster.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/markercluster/template_mst.html", function(template) {
				i3GEOF.markercluster.MUSTACHE = template;
				i3GEOF.markercluster.inicia(iddiv);
			});
			return;
		}
		$i(iddiv).innerHTML = i3GEOF.markercluster.html();
		i3GEO.util.aplicaAquarela("i3GEOF.markercluster_corpo");
		i3GEOF.markercluster.t0();
	},
	/**
	 * Function: html
	 *
	 * Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das
	 * op&ccedil;&otilde;es da ferramenta
	 *
	 * Retorno:
	 *
	 * String com o c&oacute;digo html
	 */
	html : function() {
		var ins = Mustache.render(i3GEOF.markercluster.MUSTACHE, i3GEOF.markercluster.mustacheHash());
		return ins;
	},
	/**
	 * Function: iniciaJanelaFlutuante
	 *
	 * Cria a janela flutuante para controle da ferramenta.
	 */
	iniciaJanelaFlutuante : function() {
		var janela, divid, temp, titulo;
		if ($i("i3GEOF.markercluster")) {
			return;
		}
		// cria a janela flutuante
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >" + $trad("x104") + "</span></div>";
		cabecalho = function() {
		};
		janela = i3GEO.janela.cria(
				"400px",
				"250px",
				"",
				"",
				"",
				titulo,
				"i3GEOF.markercluster",
				false,
				"hd",
				function() {
				},
				function() {
					i3GEO.janela.minimiza("i3GEOF.markercluster",200);
				},
				"",
				false,
				"",
				"",
				"",
				"",
				"122"
			);
		divid = janela[2].id;
		janela[0].setFooter("<div id=i3GEOF.markercluster_rodape class='i3GeoRodapeJanela' ></div>");
		i3GEOF.markercluster.aguarde = $i("i3GEOF.markercluster_imagemCabecalho").style;
		i3GEOF.markercluster.inicia(divid);
		temp = function() {
			i3GEO.eventos.removeEventos("ATUALIZAARVORECAMADAS",["i3GEOF.markercluster.t0()"]);
		};
		YAHOO.util.Event.addListener(
				janela[0].close,
				"click",
				temp);
		i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS",["i3GEOF.markercluster.t0()"]);
	},
	t0 : function() {
		i3GEO.util.proximoAnterior(
				"",
				"i3GEOF.markercluster.t1()",
				"",
				"i3GEOFgradeDePontost0",
				"i3GEOmarkerclusterresultado",
				true,
				"i3GEOF.markercluster_rodape");
	},
	t1 : function() {
		i3GEO.util.proximoAnterior(
				"i3GEOF.markercluster.t0()",
				"i3GEOF.markercluster.t2()",
				"",
				"i3GEOF.markercluster.t1",
				"i3GEOmarkerclusterresultado",
				true,
				"i3GEOF.markercluster_rodape");
		i3GEOF.markercluster.comboTemasSel();
	},
	t2 : function() {
		i3GEO.util.proximoAnterior(
				"i3GEOF.markercluster.t1()",
				"i3GEOF.markercluster.t3()",
				"",
				"i3GEOF.markercluster.t2",
				"i3GEOmarkerclusterresultado",
				true,
				"i3GEOF.markercluster_rodape");
		//i3GEOF.markercluster.comboItens();
	},
	t3 : function() {
		i3GEO.util.proximoAnterior(
				"i3GEOF.markercluster.t2()",
				"",
				"",
				"i3GEOF.markercluster.t3",
				"i3GEOmarkerclusterresultado",
				true,
				"i3GEOF.markercluster_rodape");
	},
	/**
	 * Function: criamarkercluster
	 *
	 * Executa a opera&ccedil;&atilde;o de gera&ccedil;&atilde;o do markercluster
	 *
	 */
	criamarkercluster : function() {
		try {
			if (i3GEOF.markercluster.aguarde.visibility === "visible") {
				return;
			}
			var p, fim, cp;

			i3GEOF.markercluster.aguarde.visibility = "visible";
			fim = function(retorno) {
				i3GEOF.markercluster.aguarde.visibility = "hidden";
				if (retorno.data === undefined) {
					$i("i3GEOmarkerclusterfim").innerHTML = $trad(
							'erroTempo',
							i3GEOF.markercluster.dicionario);
				} else {
					i3GEO.atualiza();
				}
			};
			p = i3GEO.configura.locaplic
					+ "/ferramentas/markercluster/exec.php?g_sid="
					+ i3GEO.configura.sid
					+ "&funcao=criamarkercluster"
					+ "&tema="
					+ $i("i3GEOmarkerclustertemasComSel").value
					+ "&titulo="
					+ $i("i3GEOmarkerclusterTitulo").value
					+ "&opacidade="
					+ $i("i3GEOmarkerclusterOpacidade").value
					+ "&gridSize="
					+ $i("i3GEOmarkerclusterRaio").value
					+ "&color="
					+ i3GEO.util.rgb2hex($i("i3GEOmarkerclusterColor").value)
					+ "&strokecolor="
					+ i3GEO.util.rgb2hex($i("i3GEOmarkerclusterStrokecolor").value)
					+ "&textcolor="
					+ $i("i3GEOmarkerclusterTextcolor").value;

			cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(
					p,
					"criamarkercluster",
					fim);
		} catch (e) {
			$i("i3GEOmarkerclusterfim").innerHTML = "<p class='paragrafo' >Erro. "
					+ e;
			i3GEOF.markercluster.aguarde.visibility = "hidden";
		}
	},
	/**
	 * Function: comboTemasSel
	 *
	 * Cria um combo com a lista de temas
	 *
	 * Veja:
	 *
	 * <i3GEO.util.comboTemas>
	 */
	comboTemasSel : function() {
		i3GEO.util.comboTemas(
				"i3GEOmarkerclustertemasComSel",
				function(retorno) {
					$i("i3GEOmarkerclusterSelTemas").innerHTML = retorno.dados;
					$i("i3GEOmarkerclusterSelTemas").style.display = "block";
					if ($i("i3GEOmarkerclustertemasComSel")) {
						$i("i3GEOmarkerclustertemasComSel").onchange = function() {
							i3GEO.mapa.ativaTema($i("i3GEOmarkerclustertemasComSel").value);
						};
					}
					if (i3GEO.temaAtivo !== "") {
						$i("i3GEOmarkerclustertemasComSel").value = i3GEO.temaAtivo;
						$i("i3GEOmarkerclustertemasComSel").onchange.call();
					}
				},
				"i3GEOmarkerclusterSelTemas",
				"",
				false,
				"ligados",
				" ",
				false,
				true,
				"form-control comboTema"
			);
	},
	/**
	 * Function: comboItens
	 *
	 * Cria um combo para escolha de um item do tema
	 *
	 * Veja:
	 *
	 * <i3GEO.util.comboItens>
	 *
	 */
	comboItens : function() {
		i3GEO.util.comboItens(
				"i3GEOmarkerclustertemasItem",
				$i("i3GEOmarkerclustertemasComSel").value,
				function(retorno) {
					$i("i3GEOmarkerclusterondeItens").innerHTML = retorno.dados;
					$i("i3GEOmarkerclusterondeItens").style.display = "block";
				},
				"i3GEOmarkerclusterondeItens",
				"",
				"",
				"",
				"form-control comboTema"
		);
	}
};
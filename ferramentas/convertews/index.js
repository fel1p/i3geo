/*
Title: Converte um mapa em WMS

Transforma o mapfile atual em um WMS permitindo que o usu&aacute;rio acesse o mapa de outras aplica&ccedil;&otilde;es.
O WMS &eacute; armazenado no diret&oacute;rio tempor&aacute;rio do i3Geo.

Veja:

<i3GEO.mapa.dialogo.convertews>

Arquivo:

i3geo/ferramentas/convertews/index.js.php

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
if(typeof(i3GEOF) === 'undefined'){
	var i3GEOF = {};
}
/*
Classe: i3GEOF.converteMapaWS
*/
i3GEOF.converteMapaWS = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function(enderecowms,enderecowmc) {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.converteMapaWS.dicionario);
		dicionario["nomewms"] = enderecowms;
		dicionario["nomewmc"] = enderecowmc;
		dicionario["bbox"] = i3GEO.parametros.mapexten.split(" ").join(",");
		dicionario["w"] = i3GEO.parametros.w;
		dicionario["h"] = i3GEO.parametros.h;
		return dicionario;
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Parametros:

	divid {String} - id do div que receber&aacute; o conteudo HTML da ferramenta

	*/
	html:function(enderecowms,enderecowmc){
		var ins = Mustache.render(i3GEOF.converteMapaWS.MUSTACHE, i3GEOF.converteMapaWS.mustacheHash(enderecowms,enderecowmc));
		return ins;
	},
	inicia: function(divid){
		if(i3GEOF.converteMapaWS.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/convertews/template_mst.html", function(template) {
				i3GEOF.converteMapaWS.MUSTACHE = template;
				i3GEOF.converteMapaWS.inicia(divid);
			});
			return;
		}
		var temp = function(retorno){
			var enderecowms = $trad('erroWms',i3GEOF.converteMapaWS.dicionario),
				enderecowmc = $trad('erroWms',i3GEOF.converteMapaWS.dicionario);
			if (retorno.data != undefined){
				enderecowms = i3GEO.configura.locaplic+retorno.data.wms+"&";
				enderecowmc = window.location.protocol+"//"+window.location.host+retorno.data.wmc+"&";
			}
			$i(divid).innerHTML = i3GEOF.converteMapaWS.html(enderecowms,enderecowmc);
		};
		var p = i3GEO.configura.locaplic+"/ferramentas/convertews/exec.php?g_sid="+i3GEO.configura.sid+"&funcao=convertewmswmc";
		var cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"converteWMSWMC",temp);
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.

	Veja:

	<CONVERTEWMSWMC>
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,temp,titulo,p,cp;
		if($i("i3GEOF.converteMapaWS")){
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.converteMapaWS");
		};
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >WMS</span></div>";
		janela = i3GEO.janela.cria(
			"440px",
			"310px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.converteMapaWS",
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
			"12"
		);
		divid = janela[2].id;
		i3GEOF.converteMapaWS.inicia(divid);
	}
};
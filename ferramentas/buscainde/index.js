/*
Title: Busca metadados na INDE

Experimental

Veja:

<i3GEO.arvoredetemas.dialogo.buscainde>

Arquivo:

i3geo/ferramentas/buscainde/index.js.php

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
Classe: i3GEOF.buscainde

Veja as configuracoes de inicializacao em i3GEO.configura.ferramentas.buscainde

*/
i3GEOF.buscainde = {
	csw : "http://www.metadados.inde.gov.br/geonetwork/srv/br",
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
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.buscainde.dicionario);
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		dicionario["csw"] = i3GEOF.buscainde.csw;
		return dicionario;
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		if(i3GEOF.buscainde.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/buscainde/template_mst.html", function(template) {
				i3GEOF.buscainde.MUSTACHE = template;
				$i(iddiv).innerHTML = i3GEOF.buscainde.html();
			});
			return;
		}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function() {
		var ins = Mustache.render(i3GEOF.buscainde.MUSTACHE, i3GEOF.buscainde.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		if($i("i3GEOF.buscainde")){
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.buscainde",200);
		};
		//cria a janela flutuante
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >CSW</span></div>";
		janela = i3GEO.janela.cria(
			"550px",
			"350px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.buscainde",
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
			"8"
		);
		divid = janela[2].id;
		$i("i3GEOF.buscainde_corpo").style.backgroundColor = "white";
		$i("i3GEOF.buscainde_corpo").style.textAlign = "left";
		i3GEOF.buscainde.inicia(divid);
	},
};
//aplica ao codigo i3GEOF definicoes feitas na interface do mapa
//isso permite a substituicao de funcoes e parametros
if(i3GEO.configura.ferramentas.hasOwnProperty("buscainde")){
  jQuery.each( i3GEO.configura.ferramentas.buscainde, function(index, value) {
      i3GEOF.buscainde[index] = i3GEO.configura.ferramentas.buscainde[index];
  });
}

/*
Title: Upload KML

Envia para o servidor um arquivo no formato KML local e insere como novas camadas no mapa.

Veja:

<i3GEO.arvoreDeTemas.dialogo.uploadkml>

Arquivo:

i3geo/ferramentas/uploadkml/index.js.php

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
Classe: i3GEOF.uploadkml
*/
i3GEOF.uploadkml = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.uploadkml.dicionario);
		dicionario["sid"] = i3GEO.configura.sid;
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		return dicionario;
	},
	MUSTACHE: "",
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		if(i3GEOF.uploadkml.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/uploadkml/template_mst.html", function(template) {
				i3GEOF.uploadkml.MUSTACHE = template;
				i3GEOF.uploadkml.inicia(iddiv);
			});
			return;
		}
		try{
			$i(iddiv).innerHTML = i3GEOF.uploadkml.html();

			i3GEO.util.radioEpsg(
				function(retorno)
				{$i("i3GEOuploadkmlListaepsg").innerHTML = retorno.dados;},
				"i3GEOuploadkmlListaepsg",
				"uploadkml"
			);
		}
		catch(erro){i3GEO.janela.tempoMsg(erro);}
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function() {
		var ins = Mustache.render(i3GEOF.uploadkml.MUSTACHE, i3GEOF.uploadkml.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		if ($i("i3GEOF.uploadkml")) {
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.uploadkml",200);
		};
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >KML</span></div>";
		janela = i3GEO.janela.cria(
			"450px",
			"460px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.uploadkml",
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
			"104"
		);
		divid = janela[2].id;
		$i("i3GEOF.uploadkml_corpo").style.backgroundColor = "white";
		i3GEOF.uploadkml.aguarde = $i("i3GEOF.uploadkml_imagemCabecalho").style;
		i3GEOF.uploadkml.inicia(divid);
	},
	/*
	Function: submete

	Submete o arquivo ao servidor.
	*/
	submete: function(){
		if($i("layerkml").value == ""){
			i3GEO.janela.tempoMsg($trad("nomeLayerKml",i3GEOF.uploadkml.dicionario));
			return;
		}
		if(i3GEOF.uploadkml.aguarde.visibility==="visible"){
			return;
		}
		i3GEOF.uploadkml.aguarde.visibility="visible";
		$i("i3GEOuploadkmlf").submit();
	}
};

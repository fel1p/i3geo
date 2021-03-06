/*
Title: Grade de hex&aacute;gonos

Cria e adiciona um novo tema ao mapa contendo uma grade de hex&aacute;gonos com espa&ccedil;amento regular.

Veja:

<i3GEO.analise.dialogo.gradeHex>

Arquivo:

i3geo/ferramentas/gradehex/index.js.php

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
Classe: i3GEOF.gradeDeHex

*/
i3GEOF.gradeDeHex = {
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
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.gradeDeHex.dicionario);
		dicionario["locaplic"] = i3GEO.configura.locaplic;
		return dicionario;
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		if(i3GEOF.gradeDeHex.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/gradehex/template_mst.html", function(template) {
				i3GEOF.gradeDeHex.MUSTACHE = template;
				i3GEOF.gradeDeHex.inicia(iddiv);
			});
			return;
		}
			$i(iddiv).innerHTML = i3GEOF.gradeDeHex.html();
			i3GEOF.gradeDeHex.t0();
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function(){
		var ins = Mustache.render(i3GEOF.gradeDeHex.MUSTACHE, i3GEOF.gradeDeHex.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,titulo,temp;
		if($i("i3GEOF.gradeDeHex")){
			return;
		}
		//cria a janela flutuante
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >" + $trad("u9") + "</span></div>";
		cabecalho = function(){
			i3GEO.navega.ativaPan();
		};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.gradeDeHex",200);
		};
		janela = i3GEO.janela.cria(
			"400px",
			"240px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.gradeDeHex",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			false,
			"",
			"",
			"",
			""
		);
		divid = janela[2].id;
		janela[0].setFooter("<div id=i3GEOF.gradeDeHex_rodape class='i3GeoRodapeJanela' ></div>");
		i3GEOF.gradeDeHex.aguarde = $i("i3GEOF.gradeDeHex_imagemCabecalho").style;
		i3GEOF.gradeDeHex.inicia(divid);
		i3GEO.eventos.cliquePerm.desativa();
		temp = function(){
			i3GEO.eventos.removeEventos("MOUSECLIQUE",["i3GEOF.gradeDeHex.capturaPonto()"]);
			i3GEO.eventos.cliquePerm.ativa();
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
	},
	t0: function(){
		var ins = $i("i3GEOgradedehexT0").innerHTML;
		i3GEO.util.proximoAnterior("","i3GEOF.gradeDeHex.t1()",ins,"i3GEOF.gradeDeHex.t0","i3GEOgradedehexresultado",true,"i3GEOF.gradeDeHex_rodape");
	},
	t1: function(){
		var ins = "";
		//false para nao criar dois ids iguais
		if($i("i3GEOgradedehexProj").checked){
			ins = $i("i3GEOgradedehexT1a").innerHTML;
			i3GEO.util.proximoAnterior("i3GEOF.gradeDeHex.t0()","i3GEOF.gradeDeHex.t2()",ins,"i3GEOF.gradeDeHex.t1a","i3GEOgradedehexresultado",false,"i3GEOF.gradeDeHex_rodape");
		}
		else{
			ins = $i("i3GEOgradedehexT1b").innerHTML;
			i3GEO.util.proximoAnterior("i3GEOF.gradeDeHex.t0()","i3GEOF.gradeDeHex.t2()",ins,"i3GEOF.gradeDeHex.t1b","i3GEOgradedehexresultado",false,"i3GEOF.gradeDeHex_rodape");
		}
	},
	t2: function(){
		var ins = $i("i3GEOgradedehexT2").innerHTML;
		i3GEO.util.proximoAnterior("i3GEOF.gradeDeHex.t1()","i3GEOF.gradeDeHex.t3()",ins,"i3GEOF.gradeDeHex.t2","i3GEOgradedehexresultado",true,"i3GEOF.gradeDeHex_rodape");
		i3GEO.eventos.cliquePerm.desativa();
		i3GEO.eventos.adicionaEventos("MOUSECLIQUE",["i3GEOF.gradeDeHex.capturaPonto()"]);
	},
	t3: function(){
		var ins = $i("i3GEOgradedehexT3").innerHTML;
		i3GEO.util.proximoAnterior("i3GEOF.gradeDeHex.t2()","i3GEOF.gradeDeHex.t4()",ins,"i3GEOF.gradeDeHex.t3","i3GEOgradedehexresultado",true,"i3GEOF.gradeDeHex_rodape");
	},
	t4: function(){
		var ins = $i("i3GEOgradedehexT4").innerHTML;
		i3GEO.util.proximoAnterior("i3GEOF.gradeDeHex.t3()","",ins,"i3GEOF.gradeDeHex.t4","i3GEOgradedehexresultado",true,"i3GEOF.gradeDeHex_rodape");
	},
	/*
	Function: criaGrade

	Cria a grade e adiciona um novo tema ao mapa

	Veja:

	<GRADEDEHEX>
	*/
	criaGrade: function(){
		try{
			if(i3GEOF.gradeDeHex.aguarde.visibility === "visible")
			{return;}
			i3GEOF.gradeDeHex.aguarde.visibility = "visible";
			var dx,ix,iy,nptx,npty,fim,p,cp,proj = "nao";
			if(!$i("i3GEOgradedehexProj").checked){
				dx = i3GEO.calculo.dms2dd($i("i3GEOgradedehexxg").value,$i("i3GEOgradedehexxm").value,$i("i3GEOgradedehexxs").value);
			}
			else{
				proj = "sim";
				dx = $i("i3GEOgradedehexxg").value;
			}
			ix = i3GEO.calculo.dms2dd($i("i3GEOgradedehexixg").value,$i("i3GEOgradedehexixm").value,$i("i3GEOgradedehexixs").value);
			iy = i3GEO.calculo.dms2dd($i("i3GEOgradedehexiyg").value,$i("i3GEOgradedehexiym").value,$i("i3GEOgradedehexiys").value);
			nptx = $i("i3GEOgradedehexnptx").value;
			npty = $i("i3GEOgradedehexnpty").value;
			if ((dx == 0))
			{i3GEO.janela.tempoMsg($trad('msg',i3GEOF.gradeDeHex.dicionario));return;}
			if ((nptx == 0) || (npty == 0))
			{i3GEO.janela.tempoMsg($trad('msg2',i3GEOF.gradeDeHex.dicionario));return;}
			if (nptx * npty > 10000)
			{i3GEO.janela.tempoMsg($trad('msg2',i3GEOF.gradeDeHex.dicionario));return;}
			fim = function(retorno)
			{
				i3GEOF.gradeDeHex.aguarde.visibility = "hidden";
				if (retorno.data == undefined )
				{$i("i3GEOgradedehexfim").innerHTML = "<p class='paragrafo'>Erro. ";}
				else{
					i3GEO.atualiza();
				}
			};

			p = i3GEO.configura.locaplic+"/ferramentas/gradehex/exec.php?g_sid="+i3GEO.configura.sid+"&proj="+proj+"&funcao=gradedehex&dd="+dx+"&px="+ix+"&py="+iy+"&nptx="+nptx+"&npty="+npty;
			cp = new cpaint();
			cp.set_response_type("JSON");
			cp.call(p,"gradeDeHex",fim);
		}
		catch(e){$i("i3GEOgradedehexfim").innerHTML = "<p class='paragrafo' >Erro. "+e;i3GEOF.gradeDeHex.aguarde.visibility = "hidden";}
	},
	/*
	Function: capturaPonto

	Captura um ponto no mapa e preenche os campos de coordenadas de in&iacute;cio da grade
	*/
	capturaPonto: function(){
		i3GEO.eventos.cliqueCapturaPt(
			"i3GEOgradedehexixg",
			"i3GEOgradedehexixm",
			"i3GEOgradedehexixs",
			"i3GEOgradedehexiyg",
			"i3GEOgradedehexiym",
			"i3GEOgradedehexiys"
		);
	}
};

/*
Title: Ponto em pol&iacute;gono

Gera o cruzamento entre um tema de pontos e um tema de pol&iacute;gonos ou raster.
Um novo tema do tipo poligonal &eacute; criado contendo os atributos do tema cruzado.

Veja:

<i3GEO.analise.dialogo.pontoempoligono>

Arquivo:

i3geo/ferramentas/pontoempoligono/index.js.php

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
Classe: i3GEOF.pontoEmPoligono

*/
i3GEOF.pontoEmPoligono = {
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
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.pontoEmPoligono.dicionario);
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
		if(i3GEOF.pontoEmPoligono.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/pontoempoligono/template_mst.html", function(template) {
				i3GEOF.pontoEmPoligono.MUSTACHE = template;
				i3GEOF.pontoEmPoligono.inicia(iddiv);
			});
			return;
		}
			$i(iddiv).innerHTML = i3GEOF.pontoEmPoligono.html();
			i3GEOF.pontoEmPoligono.t0();
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html: function() {
		var ins = Mustache.render(i3GEOF.pontoEmPoligono.MUSTACHE, i3GEOF.pontoEmPoligono.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var minimiza,cabecalho,janela,divid,temp,titulo;
		if ($i("i3GEOF.pontoEmPoligono")) {
			return;
		}
		//cria a janela flutuante
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >" + $trad("u13") + "</span></div>";
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.pontoEmPoligono",200);
		};
		janela = i3GEO.janela.cria(
			"400px",
			"250px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.pontoEmPoligono",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			false,
			"",
			"",
			"",
			"",
			"18"
		);
		divid = janela[2].id;
		janela[0].setFooter("<div id=i3GEOF.pontoEmPoligono_rodape class='i3GeoRodapeJanela' ></div>");
		i3GEOF.pontoEmPoligono.aguarde = $i("i3GEOF.pontoEmPoligono_imagemCabecalho").style;
		i3GEOF.pontoEmPoligono.inicia(divid);
		temp = function(){
			i3GEO.eventos.removeEventos("ATUALIZAARVORECAMADAS",["i3GEOF.pontoEmPoligono.t0()"]);
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
		i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS",["i3GEOF.pontoEmPoligono.t0()"]);
	},
	t0: function()
	{
		i3GEO.util.proximoAnterior("","i3GEOF.pontoEmPoligono.t1()","","i3GEOFgradeDePontost0","i3GEOpontoEmPoligonoresultado",true,"i3GEOF.pontoEmPoligono_rodape");
	},
	t1: function(){
		i3GEO.util.proximoAnterior("i3GEOF.pontoEmPoligono.t0()","i3GEOF.pontoEmPoligono.t2()","","i3GEOF.pontoEmPoligono.t1","i3GEOpontoEmPoligonoresultado",true,"i3GEOF.pontoEmPoligono_rodape");
		i3GEOF.pontoEmPoligono.comboTemasSelPt();
	},
	t2: function(){
		var erro = function(){
			i3GEO.janela.tempoMsg($trad('msgSelecionaTema',i3GEOF.pontoEmPoligono.dicionario));
			i3GEO.util.proximoAnterior("i3GEOF.pontoEmPoligono.t1()","","","i3GEOF.pontoEmPoligono.t2","i3GEOpontoEmPoligonoresultado",true,"i3GEOF.pontoEmPoligono_rodape");
		};
		if($i("i3GEOpontoEmPoligonotemasComSelPt"))
		{
			if ($i("i3GEOpontoEmPoligonotemasComSelPt").value == ""){
				erro();
			}
			else{
				i3GEO.util.proximoAnterior("i3GEOF.pontoEmPoligono.t1()","i3GEOF.pontoEmPoligono.t3()","","i3GEOF.pontoEmPoligono.t2","i3GEOpontoEmPoligonoresultado",true,"i3GEOF.pontoEmPoligono_rodape");
				i3GEOF.pontoEmPoligono.comboTemasSelPo();
			}
		}
		else{
			erro();
		}
	},
	t3: function(){
		i3GEO.util.proximoAnterior("i3GEOF.pontoEmPoligono.t2()","","","i3GEOF.pontoEmPoligono.t3","i3GEOpontoEmPoligonoresultado",true,"i3GEOF.pontoEmPoligono_rodape");
	},
	/*
	Function: executa

	Executa a opera&ccedil;&atilde;o de cruzamento

	Veja:

	<PONTOEMPOLIGONO>
	*/
	executa: function(){
		try{
			if(i3GEOF.pontoEmPoligono.aguarde.visibility === "visible")
			{return;}
			var t,tsl,p,cp,i,n,temapt,fim;
			temapt = $i("i3GEOpontoEmPoligonotemasComSelPt").value;
			t = $i("i3GEOpontoEmPoligonoSelTemasPo").getElementsByTagName("input");
			tsl = []; //temas poligonais
			n = t.length;
			for (i=0;i<n; i++){
				if (t[i].type == "checkbox"){
					if (t[i].checked == true)
					{tsl.push(t[i].value);}
				}
			}
			if (tsl == 0)
			{i3GEO.janela.tempoMsg($trad('msgRasterPoligono',i3GEOF.pontoEmPoligono.dicionario));}
			else
			{
				i3GEOF.pontoEmPoligono.aguarde.visibility = "visible";
				fim = function(retorno){
					i3GEOF.pontoEmPoligono.aguarde.visibility = "hidden";
					if (retorno.data==undefined )
					{i3GEO.janela.tempoMsg("Erro.");}
					else{
						i3GEO.atualiza();
						i3GEO.janela.mensagemSimples(retorno.data,$trad('colunas',i3GEOF.pontoEmPoligono.dicionario));
					}
				};
				p = i3GEO.configura.locaplic+"/ferramentas/pontoempoligono/exec.php?g_sid="+i3GEO.configura.sid+"&funcao=pontoEmPoligono&temaPt="+temapt+"&temasPo="+tsl.join(",")+"&ext="+i3GEO.parametros.mapexten;
				cp = new cpaint();
				cp.set_response_type("JSON");
				cp.call(p,"pontoEmPoligono",fim);
			}
		}
		catch(e){$i("i3GEOpontoEmPoligonofim").innerHTML = "<p class='paragrafo' >Erro. "+e;i3GEO.janela.fechaAguarde();i3GEOF.pontoEmPoligono.aguarde.visibility = "hidden";}
	},
	/*
	Function: comboTemasSelPt

	Cria um combo com a lista de temas do tipo pontos

	Veja:

	<i3GEO.util.comboTemas>
	*/
	comboTemasSelPt: function(){
		i3GEO.util.comboTemas(
			"i3GEOpontoEmPoligonotemasComSelPt",
			function(retorno){
				$i("i3GEOpontoEmPoligonoSelTemasPt").innerHTML = retorno.dados;
				if ($i("i3GEOpontoEmPoligonotemasComSelPt")){
					$i("i3GEOpontoEmPoligonotemasComSelPt").onchange = function(){
						i3GEO.mapa.ativaTema($i("i3GEOpontoEmPoligonotemasComSelPt").value);
					};
				}
				if(i3GEO.temaAtivo !== ""){
					$i("i3GEOpontoEmPoligonotemasComSelPt").value = i3GEO.temaAtivo;
					$i("i3GEOpontoEmPoligonotemasComSelPt").onchange.call();
				}
			},
			"i3GEOpontoEmPoligonoSelTemasPt",
			"",
			false,
			"pontos",
			" ",
			false,
			true,
			"form-control comboTema"
		);
	},
	/*
	Function: comboTemasSelPo

	Cria uma lista de temas do tipo poligonal ou raster

	Veja:

	<i3GEO.util.checkTemas>
	*/
	comboTemasSelPo: function(){
		i3GEO.util.checkTemas(
			"i3GEOpontoEmPoligonotemasComSelPo",
			function(retorno,listaNomes,listaValores){
				var r = i3GEO.util.checkCombo("", listaNomes, listaValores);
				$i("i3GEOpontoEmPoligonoSelTemasPo").innerHTML = r;
			},
			"",
			"",
			"polraster",
			"i3GEOpontoEmPoligono",
			"260px"
		);
	}
};

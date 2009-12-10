<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Class: i3GEOF.opcoesEscala

Altera as propriedades da barra de escala do mapa.
*/
i3GEOF.opcoesEscala = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			$i(iddiv).innerHTML += i3GEOF.opcoesEscala.html();
			new YAHOO.widget.Button(
				"i3GEOopcoesEscalabotao1",
				{onclick:{fn: i3GEOF.opcoesEscala.executa}}
			);
			new YAHOO.widget.Button(
				"i3GEOopcoesEscalabotao2",
				{onclick:{fn: i3GEOF.opcoesEscala.testa}}
			);
			i3GEOF.opcoesEscala.parametrosAtuais();
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '<table summary="" class=lista >' +
			'<tr><td>Largura:</td><td>' +
			$inputText("","","i3GEOopcoesEscalaw","",4,"") +
			'</td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Altura:</td><td>' +
			$inputText("","","i3GEOopcoesEscalah","",4,"") +
			'</td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Unidade:</td><td>' +
			'	<select id=i3GEOopcoesEscalaunidade >' +
			'		<option value=3 selected >Metros</option>' +
			'		<option value=4 >Km</option>' +
			'	</select>' +
			'<td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Estilo:</td><td>' +
			'	<select id=i3GEOopcoesEscalaestilo >' +
			'		<option value=0 selected >Bloco</option>' +
			'		<option value=1 >Linear</option>' +
			'		<option value=2 >Sem barra</option>' +
			'	</select>' +
			'</td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Intervalos:</td><td>' +
			$inputText("","","i3GEOopcoesEscalaintervalos","",4,"") +
			'</td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Cor:</td><td>' +
			$inputText("","","i3GEOopcoesEscalacor","",12,"") +
			'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.opcoesEscala.corj(\'i3GEOopcoesEscalacor\')" />' +
			'</td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Fundo:</td><td>' +
			$inputText("","","i3GEOopcoesEscalabcor","",12,"") +
			'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.opcoesEscala.corj(\'i3GEOopcoesEscalabcor\')" />' +
			'</td></tr>' +
			'<tr><td>&nbsp;</td><td></td></tr>' +
			'<tr><td>Contorno:</td><td>' +
			$inputText("","","i3GEOopcoesEscalaocor","",12,"") +
			'<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.opcoesEscala.corj(\'i3GEOopcoesEscalaocor\')" />' +
			'</td></tr></table><br>'+
			'<p class=paragrafo >' +
			'<input id=i3GEOopcoesEscalabotao1 size=20  type=button value="Aplicar" />' +
			'<input id=i3GEOopcoesEscalabotao2 size=20 type=button value="Testar" />' +
			'</p><br><img src="" id=i3GEOopcoesEscalateste />';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo,cabecalho,minimiza;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.opcoesEscala");
		};
		//cria a janela flutuante
		titulo = "Barra de escala <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=3' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"250px",
			"300px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opcoesEscala",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.opcoesEscala_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opcoesEscala_corpo").style.textAlign = "left";
		i3GEOF.opcoesEscala.aguarde = $i("i3GEOF.opcoesEscala_imagemCabecalho").style;
		i3GEOF.opcoesEscala.inicia(divid);
	},
	/*
	Function: corj
	
	Abre a janela para o usu�rio selecionar uma cor interativamente
	*/
	corj: function(obj)
	{i3GEO.util.abreCor("",obj);},
	/*
	Function: executa
	
	Altera a legenda
	*/
	executa: function(){
		if(i3GEOF.opcoesEscala.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesEscala.aguarde.visibility = "visible";
		var temp = function(){
				i3GEOF.opcoesEscala.aguarde.visibility = "hidden";
				i3GEO.atualiza();
			},
			par = i3GEOF.opcoesEscala.parametrosFormulario(),
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=mudaescalagrafica"+par,
			cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"mudaEscalaGrafica",temp);
	},
	/*
	Function: parametrosAtuais
	
	Pega os par�metros atuais da legenda
	*/
	parametrosAtuais: function(){
		i3GEOF.opcoesEscala.aguarde.visibility = "visible";
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=escalaparametros",
			cp = new cpaint(),
			temp = function(retorno){
				try{
					if(retorno.data !== ""){
						eval(retorno.data);
						$i("i3GEOopcoesEscalaw").value = w;
						$i("i3GEOopcoesEscalah").value = h;
						$i("i3GEOopcoesEscalaestilo").value = estilo;
						$i("i3GEOopcoesEscalaintervalos").value = intervalos;
						$i("i3GEOopcoesEscalaunidade").value = unidade;
						$i("i3GEOopcoesEscalacor").value = cor;
						$i("i3GEOopcoesEscalabcor").value = bcor;
						$i("i3GEOopcoesEscalaocor").value = ocor;
					}
					i3GEOF.opcoesEscala.aguarde.visibility = "hidden";
					i3GEOF.opcoesEscala.testa();
				}catch(e){
					alert("Erro. "+e);
					i3GEOF.opcoesEscala.aguarde.visibility = "hidden";
				}
			};
		cp.set_response_type("JSON");
		cp.call(p,"pegaParametrosLegImg",temp);
	},
	/*
	Function: parametrosFormulario
	
	Pega os valores do formul�rio atual
	*/
	parametrosFormulario: function(){
		var par = "&w=" + $i("i3GEOopcoesEscalaw").value +
		"&h=" + $i("i3GEOopcoesEscalah").value +
		"&estilo=" + $i("i3GEOopcoesEscalaestilo").value +
		"&intervalos=" + $i("i3GEOopcoesEscalaintervalos").value +
		"&unidade=" + $i("i3GEOopcoesEscalaunidade").value +
		"&cor=" + $i("i3GEOopcoesEscalacor").value +
		"&bcor=" + $i("i3GEOopcoesEscalabcor").value +
		"&ocor=" + $i("i3GEOopcoesEscalaocor").value;
		return(par);
	},
	/*
	Function: testa
	
	Testa a legenda, mostrando uma imagem tempor�ria
	*/
	testa: function(){
		if(i3GEOF.opcoesEscala.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesEscala.aguarde.visibility = "visible";
		var temp = function(retorno){
				i3GEOF.opcoesEscala.aguarde.visibility = "hidden";
				$i("i3GEOopcoesEscalateste").src = retorno.data;
			},
			par = i3GEOF.opcoesEscala.parametrosFormulario(),
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=testaescalagrafica"+par,
			cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"testaescalagrafica",temp);
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>
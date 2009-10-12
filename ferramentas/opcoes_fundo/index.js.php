<?php if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
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
Class: i3GEOF.opcoesFundo

Altera as propriedades do fundo do mapa.
*/
i3GEOF.opcoesFundo = {
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
			i3GEOF.opcoesFundo.aguarde.visibility = "visible";
			$i(iddiv).innerHTML += i3GEOF.opcoesFundo.html();
			new YAHOO.widget.Button(
				"i3GEOopcoesFundobotao1",
				{onclick:{fn: i3GEOF.opcoesFundo.executa}}
			);
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=pegacorfundo",
				cp = new cpaint(),
				retorno = function(retorno){
					i3GEOF.opcoesFundo.aguarde.visibility = "hidden";
					if(retorno.data.erro){alert("Ocorreu um erro");return;}
					$i("i3GEOopcoesFundocor").value = retorno.data;
				};
			cp.set_response_type("JSON");
			cp.call(p,"corQM",retorno);
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
		var ins = $inputText("","","i3GEOopcoesFundocor","",12,"") +
		'<img alt="aquarela.gif" style=cursor:pointer '+
		'src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEOF.opcoesFundo.corj(\'i3GEOopcoesFundocor\')" /> ' +
		'<br><br><p class=paragrafo ><input size=20 id=i3GEOopcoesFundobotao1 type=button value="Aplica"  />';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo;
		//cria a janela flutuante
		titulo = "Cor do fundo <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=1&idajuda=6' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"210px",
			"80px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.opcoesFundo",
			true,
			"hd"
		);
		divid = janela[2].id;
		$i("i3GEOF.opcoesFundo_corpo").style.backgroundColor = "white";
		$i("i3GEOF.opcoesFundo_corpo").style.textAlign = "left";
		i3GEOF.opcoesFundo.aguarde = $i("i3GEOF.opcoesFundo_imagemCabecalho").style;
		i3GEOF.opcoesFundo.inicia(divid);
	},
	/*
	Function: corj
	
	Abre a janela para o usu�rio selecionar uma cor interativamente
	*/
	corj: function(obj)
	{i3GEO.util.abreCor("",obj);},
	/*
	Function: executa
	
	Insere a grade no mapa
	*/
	executa: function(){
		if(i3GEOF.opcoesFundo.aguarde.visibility === "visible")
		{return;}
		i3GEOF.opcoesFundo.aguarde.visibility = "visible";
		var temp = function(){
				i3GEOF.opcoesFundo.aguarde.visibility = "hidden";
				i3GEO.atualiza();
			},
			cor = $i("i3GEOopcoesFundocor").value,
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=corfundo&cor="+cor,
			cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"corQM",temp);
	}
};
<?php if(extension_loaded('zlib')){ob_end_flush();}?>
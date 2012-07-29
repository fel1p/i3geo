
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Salva as defini&ccedil;&otilde;es de uma camada no arquivo mapfile correspondente

Veja:

<i3GEO.tema.dialogo.salvamapfile>

Arquivo:

i3geo/ferramentas/salvamapfile/index.js.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEOF) === 'undefined'){
	var i3GEOF = {};
}
/*
Classe: i3GEOF.salvamapfile
*/
i3GEOF.salvamapfile = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/*
		Para efeitos de compatibilidade antes da vers&atilde;o 4.7 que n�o tinha dicion&aacute;rio
	*/
	criaJanelaFlutuante: function(){
		i3GEOF.salvamapfile.iniciaDicionario();
	},
	/*
	Function: iniciaDicionario

	Carrega o dicion&aacute;rio e chama a fun&ccedil;&atilde;o que inicia a ferramenta

	O Javascript &eacute; carregado com o id i3GEOF.nomedaferramenta.dicionario_script
	*/
	iniciaDicionario: function(){
		if(typeof(i3GEOF.salvamapfile.dicionario) === 'undefined'){
			i3GEO.util.scriptTag(
				i3GEO.configura.locaplic+"/ferramentas/salvamapfile/dicionario.js",
				"i3GEOF.salvamapfile.iniciaJanelaFlutuante()",
				"i3GEOF.salvamapfile.dicionario_script"
			);
		}
		else{
			i3GEOF.salvamapfile.iniciaJanelaFlutuante();
		}
	},
	/*
	Variavel: tema

	c&oacute;digo do tema
	*/
	tema: i3GEO.temaAtivo,
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		try{
			i3GEOF.salvamapfile.aguarde.visibility = "visible";
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=peganomelayer&tema="+i3GEOF.salvamapfile.tema,
				cp = new cpaint(),
				retorno = function(retorno){
					i3GEOF.salvamapfile.aguarde.visibility = "hidden";
					var nome = retorno.data.nomeoriginal;
					if(nome == ""){
						$i(iddiv).innerHTML = "<p class=paragrafo >N�o existe um arquivo mapfile cadastrado para essa camada. Utilize o sistema de administra&ccedil;�o para <a href='"+i3GEO.configura.locaplic+"/admin/html/editormapfile.html' target=_blank >criar um</a>";
					}
					else{
						var ins = "<p class=paragrafo >Apenas usu&aacute;rios cadastrados como editores podem salvar um mapfile. O tema ("+nome+") ativo possui um mapfile j&aacute; criado. Ao salvar, as defini&ccedil;&otilde;es originais  de legenda, filtros e outras, ser�o substitu&iacute;das pelas atuais" +
						'<span id="i3GEOsalvamapconcluido" style=display:none;color:red  > Conclu&iacute;do!</span></p>' +
						'<br><p class=paragrafo ><input size=20 id=i3GEOsalvamapfilebotao1 type=button value="Salvar"  />&nbsp;&nbsp;<input size=20 id=i3GEOsalvamapfilebotao2 type=button value="Testar"  />';
						$i(iddiv).innerHTML = ins;
						new YAHOO.widget.Button(
							"i3GEOsalvamapfilebotao1",
							{onclick:{fn: function(){i3GEOF.salvamapfile.salva(nome,retorno.data.mapfile,retorno.data.nomelayer);}}}
						);
						new YAHOO.widget.Button(
							"i3GEOsalvamapfilebotao2",
							{onclick:{fn: function(){window.open(i3GEO.configura.locaplic+"/testamapfile.php?map="+nome);}}}
						);
					}
				};
			cp.set_response_type("JSON");
			cp.call(p,"",retorno);
		}
		catch(erro){alert(erro);}
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.salvamapfile");
		};
		//cria a janela flutuante
		titulo = "Salva o tema <i>"+i3GEO.temaAtivo+"</i> <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=92' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"330px",
			"130px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.salvamapfile",
			false,
			"hd",
			cabecalho,
			minimiza
		);
		divid = janela[2].id;
		$i("i3GEOF.salvamapfile_corpo").style.backgroundColor = "white";
		$i("i3GEOF.salvamapfile_corpo").style.textAlign = "left";
		i3GEOF.salvamapfile.aguarde = $i("i3GEOF.salvamapfile_imagemCabecalho").style;
		i3GEOF.salvamapfile.inicia(divid);
	},
	/*
	Function: salva

	Salva o mapfile
	*/
	salva: function(nome,mapfile,nomelayer){
		if(i3GEOF.salvamapfile.aguarde.visibility === "visible")
		{return;}
		i3GEOF.salvamapfile.aguarde.visibility = "visible";
		var temp = function(){
				i3GEOF.salvamapfile.aguarde.visibility = "hidden";
				$i("i3GEOsalvamapconcluido").style.display = "block";
			},
			p = i3GEO.configura.locaplic+"/admin/php/editormapfile.php?funcao=REFAZERLAYER&codigomap="+nome+"&maporigem="+mapfile+"&nomelayer="+nomelayer,
			cp = new cpaint();
		cp.set_response_type("JSON");
		cp.call(p,"",temp);
	}
};

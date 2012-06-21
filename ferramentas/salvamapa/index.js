
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Salva mapa

Faz o download do mapfile atualmente em uso. Posteriormente, o mapfile pode ser enviado de volta ao servidor para restaurar o mapa

Veja:

<i3GEO.mapa.dialogo.salvaMapa>

Arquivo: i3geo/ferramentas/salvamapa/index.js.php

About: Licen�a

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;

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
Classe: i3GEOF.carregaMapa
*/
i3GEOF.salvaMapa = {
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
		var temp = function(){
			try{
				var teste,
					map_file = i3GEO.parametros.mapfile,
					local = map_file.split("ms_tmp");
				teste = i3GEO.configura.locaplic+"/testamapfile.php?map="+map_file;	
				local = i3GEO.util.protocolo()+"://"+window.location.host+"/ms_tmp"+local[1];
				$i(iddiv).innerHTML += i3GEOF.salvaMapa.html()+"<a href='"+local+"' target='_blank' >Clique aqui para baixar o arquivo</a><br>";
				$i(iddiv).innerHTML += "<a href='"+teste+"' target='_blank' >Clique aqui para testar</a>";
			}
			catch(erro){alert(erro);}
		},
		atualiza = true,
		geo = false;
		if(i3GEO.Interface.ATUAL === "googlemaps" || i3GEO.Interface.ATUAL === "googleearth"){
			atualiza = false;
			geo = true;
		}
		i3GEO.php.mudaext(temp,"nenhum",i3GEO.parametros.mapexten,i3GEO.configura.locaplic,i3GEO.configura.sid,atualiza,geo);
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = '';
		ins += '<p class="paragrafo" >Salvando o mapa atual, voc&ecirc; poder&aacute; carreg&aacute;-lo novamente. Clique no link abaixo com o bot&atilde;o direito do mouse e salve o arquivo em seu computador.';
		ins += '<p class="paragrafo" >Para carregar o mapa salvo anteriormente, utilize a op&ccedil;&atilde;o de carregar mapa.';
		ins += '<p class="paragrafo" >';
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	*/	
	criaJanelaFlutuante: function(){
		var janela,divid,temp,titulo;
		titulo = "Salva o mapa <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=2&idajuda=10' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"300px",
			"180px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.salvaMapa",
			true,
			"hd"
		);
		divid = janela[2].id;
		i3GEOF.salvaMapa.aguarde = $i("i3GEOF.salvaMapa_imagemCabecalho").style;
		i3GEOF.salvaMapa.inicia(divid);
	}
};

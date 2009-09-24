/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Utilit�rios

Arquivo:

i3geo/classesjs/classe_util.js

Licenca:

GPL2

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
if(typeof(i3GEO) === 'undefined'){
	i3GEO = [];
}
/*
Propriedade: navm

Verdadeiro (true) se o navegador for o Internet Explorer

Tipo:
{boolean}

Default:
{false}
*/
navm = false;
/*
Propriedade: navn

Verdadeiro (true) se o navegador for o Firefox

Tipo:
{boolean}

Default:
{false}

*/
navn = false;
//seta as vari�veis navn e navm
var app = navigator.appName.substring(0,1);
if (app==='N'){navn=true;}else{navm=true;}
/*
Variavel: g_operacao

Nome da �ltima opera��o que foi executada.

Dependendo do tipo de opera��o s�o aplicadas as atualiza��es necess�rias aos componentes do mapa. Por exemplo, redesenha o corpo do mapa, atualiza a lista de temas, etc.

Essas opera��es s�o controladas pela fun��o ajaxiniciaparametros.
*/
g_operacao = "";
/*
Variavel: g_tipoacao

Tipo de a��o que est� sendo executada.
Quando o usu�rio clica no mapa, essa vari�vel � pesquisada para definir o tipo de opera��o que deve ser executada.
� definida quando o usu�rio seleciona uma determinada ferramenta do i3Geo.
*/
g_tipoacao = "zoomli";

g_postpx = "px";
g_tipotop = "top";
g_tipoleft = "left";
if (navm)
{
	g_postpx = "";  //utilizado para crossbrowser
	g_tipotop = "pixelTop"; //utilizado para crossbrowser
	g_tipoleft = "pixelLeft"; //utilizado para crossbrowser
}

/*
Function: $i

Obt�m um elemento DOM a partir de seu id
  
Parametros:

id - {String} ID do elemento.
    
Returns:

{Object} Objeto.
*/
$i = function(id)
{return document.getElementById(id);};
/*
Function: Array.remove()

Extende os m�todos de um objeto Array, permitindo remover um elemento.

*/
Array.prototype.remove=function(s){
	try{
		var i = this.indexOf(s);
		if(i !== -1){this.splice(i, 1);}
	}catch(e){}
};

/*
Classe: i3GEO.util

Utilit�rios.
*/
i3GEO.util = {
	/*
	Variavel: PINS
	
	Elementos IMG criados na fun��o criaPin
	
	Tipo:
	{Array}
	*/
	PINS: [],
	/*
	Variavel:BOXES
	
	Elementos DIV criados na fun��o criaBox
	
	Tipo:
	{Array}
	*/
	BOXES: [],
	/*
	Function: escapeURL
	
	Converte uma string em uma url v�lida
	
	Parametros:
	
	sUrl {String} - url que ser� convertida
	
	Return:
	
	Tipo:
	{String}
	*/
	escapeURL: function(sUrl){
		var re;
		sUrl = escape(sUrl);
		re = new RegExp("%3F", "g");
		sUrl = sUrl.replace(re,'?');
		re = new RegExp("%3D", "g");
		sUrl = sUrl.replace(re,'=');
		re = new RegExp("%26", "g");
		sUrl = sUrl.replace(re,'&');
		return sUrl;
	},
	/*
	Function: insereCookie

	Cria um novo cookie. 
   
	Parametros:

	nome - {String} Nome do cookie.
	
	valor - (String) Valor do cookie
	*/
	insereCookie: function(nome,valor) {
		document.cookie = nome+"="+valor+";path=/";
	},
	/*
	Function: pegaCookie

	Pega o valor de um cookie. 
   
	Parametros:

	nome - {String} Nome do cookie.

	Returns:

	(String) - valor do cookie
	*/
	pegaCookie: function(nome){
		var cookies,i,fim;
		cookies = document.cookie;
		i = cookies.indexOf(nome);
		if(i === -1)
		{return null;}
		fim = cookies.indexOf(";",i);
		if (fim === -1)
		{fim = cookies.length;}
		return (unescape(cookies.substring(i,fim))).split("=")[1];
	},
	/*
	Function: listaChaves

	Lista as chaves de um objeto. 
   
	Parametros:

	obj - {Object}

	Return:

	(Array) - array com as chaves.
	*/
	listaChaves: function (obj) {
		var keys,key;
		keys = [];
		for(key in obj){
   			if(obj[key])
   			{keys.push(key);}
		}
		return keys;
	},
	/*
	Function: criaBotaoAplicar

	Cria um bot�o flutuante do tipo aplicar.
	
	O novo bot�o � adicionado no DOM com ID "i3geo_aplicar" e posicionado sobre o objeto definido
   
	Parametros:
	
	nomeFuncao - {String} Nome da fun��o que ser� executada quando o bot�o for cllicado
	
	titulo - (opcional) {String} T�tulo que ser� mostrado no bot�o
	
	classe - (opcional) {String} Nome da classe (estilo) que ser� aplicado ao bot�o.
	
	obj - (opcional) {Objeto} Objeto DOM que foi clicado para provocar a cria��o do bot�o.

	Return:

	(Object) - Objeto DOM criado.

	*/
	criaBotaoAplicar: function (nomeFuncao,titulo,classe,obj) {
		try
		{clearTimeout(tempoBotaoAplicar);}
		catch(e){}
		var novoel,xy;
		tempoBotaoAplicar = eval("setTimeout('"+nomeFuncao+"\(\)',(i3GEO.configura.tempoAplicar))");
		autoRedesenho("reinicia");
		if(arguments.length === 1)
		{titulo = "Aplicar";}
		if(arguments.length === 1 || arguments.length === 2)
		{classe = "i3geoBotaoAplicar";}
		if (!document.getElementById("i3geo_aplicar"))
		{
			novoel = document.createElement("input");
			novoel.id = 'i3geo_aplicar';
			novoel.type = 'button';
			novoel.value = titulo;
			novoel.style.cursor="pointer";
			novoel.style.fontSize="10px";
			novoel.style.zIndex = 15000;
			novoel.style.position="absolute";
			novoel.style.display="none";
			novoel.onmouseover = function(){this.style.display="block";};
			novoel.onmouseout = function(){this.style.display="none";};
			novoel.className = classe;
			document.body.appendChild(novoel);
		}
		else
		{novoel = document.getElementById("i3geo_aplicar");}
		novoel.onclick = function(){
			clearTimeout(i3GEO.parametros.tempo);
			i3GEO.parametros.tempo = "";
			this.style.display='none';
			eval(nomeFuncao+"\(\)");
		};
		//reposiciona o botao
		if(arguments.length === 4){
			novoel.style.display="block";
			xy = YAHOO.util.Dom.getXY(obj);
			YAHOO.util.Dom.setXY(novoel,xy);
		}
		return (novoel);
	},
	/*
	Function: arvore
	
	Cria uma �rvore com base em um objeto contendo aspropriedades.
	
	Parametros:
	
	titulo - {String} cabe�aljo da �rvore
	
	onde - {String} nome do id doelemento que conter� a �rvore
	
	obj - {Object} objeto contendo os par�metros, exemplo
	
		g_listaPropriedades = {
	
		"propriedades": [
	
		{ text: "p2", url: "javascript:tipoimagem()" }
	
		]}
	
	*/
	arvore: function(titulo,onde,obj){
		//YAHOO.log("arvore", "i3geo");
		var arvore,root,tempNode,currentIconMode,d,c,i,linha,conteudo;
		if(!$i(onde)){return;}
		try{
			arvore = new YAHOO.widget.TreeView(onde);
			root = arvore.getRoot();
			tempNode = new YAHOO.widget.TextNode('', root, false);
			tempNode.isLeaf = false;
			tempNode.enableHighlight = false;
		}
		catch(e){}
		titulo = "<table><tr><td><b>"+titulo+"</b></td><td></td></tr></table>";
		d = {html:titulo};
		tempNode = new YAHOO.widget.HTMLNode(d, root, true,true);
		tempNode.enableHighlight = false;
		c = obj.propriedades.length;
		for (i=0, j=c; i<j; i++){
			linha = obj.propriedades[i];
			conteudo = "<a href='#' onclick='"+linha.url+"'>"+$trad(linha.text)+"</a>";
			d = {html:conteudo};
			temaNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
			temaNode.enableHighlight = false;
		}
		arvore.collapseAll();
   		arvore.draw();
   		//YAHOO.log("Fim arvore", "i3geo");
	},
	/*
	Function: removeAcentos

	Remove acentos de uma palavra ou frase

	Parametros:

	palavra {String}
	
	Return:
	
	{String}
	*/
	removeAcentos: function(palavra) {
		var re;
		re = /�|�|�|�/gi;
		palavra = palavra.replace(re,"a");
		re = /�/gi;
		palavra = palavra.replace(re,"e");
		re = /�/gi;
		palavra = palavra.replace(re,"i");
		re = /�|�/gi;
		palavra = palavra.replace(re,"o");
		re = /�/gi;
		palavra = palavra.replace(re,"c");
		re = /�/gi;
		palavra = palavra.replace(re,"u");
		return(palavra);
	},
	/*
	Function: protocolo
	
	Obt�m o protocolo utilizado na URL atual
	
	Return:
	
	{String} - protocolo
	*/
	protocolo: function(){
		var u = window.location.href;
		u = u.split(":");
		return (u[0]);	
	},
	/*
	Function: pegaPosicaoObjeto

	Retorna a posi��o x,y de um objeto em rela��o a tela do navegador
	
	Parametros:
	
	obj {Object} - objeto dom
	
	Return:
	
	{Array} - array com a posi��o [x,y]
	*/
	pegaPosicaoObjeto: function(obj){
		if(obj)
		{
			if(!obj.style)
			{return [0,0];}
			if(obj.style.position === "absolute")
			{return [(parseInt(obj.style.left,10)),(parseInt(obj.style.top,10))];}
			else{
				var curleft = 0,curtop = 0;
				if(obj){
					if (obj.offsetParent) {
						do {
							curleft += obj.offsetLeft-obj.scrollLeft;
							curtop += obj.offsetTop-obj.scrollTop;
						} while (obj = obj.offsetParent);
					}
				}
				return [curleft+document.body.scrollLeft,curtop+document.body.scrollTop];
			}
		}
		else
		{return [0,0];}
	},
	/*
		Function: pegaElementoPai

		Pega o elemento pai de um elemento clicado para identificar o c�digo do tema.

		Parametros:

		e - elemento do DOM.
		
		Return:
		
		{Node} - objeto DOM
	*/
	pegaElementoPai: function(e){
		var targ;
		if (!e)
		{e = window.event;}
		if (e.target)
		{targ = e.target;}
		else
		if (e.srcElement)
		{targ = e.srcElement;}
		if (targ.nodeType === 3)
   		{targ = targ.parentNode;}
		tparent=targ.parentNode;
		return(tparent);
	},
	/*
	Function: mudaCursor
	
	Altera o cursor do ponteiro do mouse.
	
	Os cursores dispon�veis s�o definidos por default em classe_configura.js
	
	Parametros:
	
	cursores {i3GEO.configura.cursores} - objeto JSON com as URIs de cada cursor (veja i3GEO.configura.cursores)
	
	tipo {String} - tipo de cursor dispon�vel em cursores
	
	idobjeto {String} - id do objeto que ter� o estilo alterado para o cursor desejado
	
	locaplic {String} - onde est� instalado o i3Geo
	*/
	mudaCursor: function(cursores,tipo,idobjeto,locaplic){
		var o,c;
		o = document.getElementById(idobjeto);
		c = eval("cursores."+tipo+".ie");
		if(c === "default" || c === "pointer" || c === "crosshair" || c === "help" || c === "move" || c === "text")
		{o.style.cursor = c;}
		else{
			if(o){
				if(navm){
					o.style.cursor = "URL(\""+locaplic+eval("cursores."+tipo+".ie")+"\"),auto";
				}
				else{
					o.style.cursor = "URL(\""+locaplic+eval("cursores."+tipo+".ff")+"\"),auto";
				}			
			}
		}
	},
	/*
	Function: criaBox
	
	Cria um elemento div na p�gina atual.
	
	Esse elemento pode ser utilizado para desenhar ret�ngulos sobre o mapa
	
	Parametros:
	
	id {String} - id do elemento que ser� criado. Por default, ser� 'boxg'
	*/
	criaBox: function(id){
		if(arguments.length === 0)
		{id = "boxg";}
		if (!$i(id))
		{
			var novoel = document.createElement("div");
			novoel.id = id;
			novoel.style.zIndex=1;
			novoel.innerHTML = '<font face="Arial" size=0></font>';
			document.body.appendChild(novoel);
			novoel.onmouseover = function(){novoel.style.display='none';};
			novoel.onmouseout = function(){novoel.style.display='block';};
			i3GEO.util.BOXES.push(id);
		}
		else
		{$i(id).style.display="block";}
	},
	/*
	Function: escondeBox
	
	Esconde os BOXES com IDs registrados em i3GEO.util.BOXES
	
	Os ids s�o criado pela fun��o criaBox
	*/
	escondeBox: function(){
		var l,i;
		l = i3GEO.util.BOXES.length;
		for (i=0; i<l; i++){
			if($i(i3GEO.util.BOXES[i]))
			{$i(i3GEO.util.BOXES[i]).style.display = "none";}
		}
	},
	/*
	Function: criaPin
	
	Cria um elemento imagem na p�gina atual.
	
	Esse elemento pode ser utilizado para desenhar pontos sobre o mapa
	
	Parametros:
	
	id {String} - (opcional) id do elemento que ser� criado. Por default, ser� 'boxpin'

	imagem {URL} - (opcional) endere�o da imagem
	
	w {String} - (opcional) largura da imagem
	
	h {String} - (opcional) altura da imagem
	*/
	criaPin: function(id,imagem,w,h){
		if(arguments.length < 1 || id === ""){
			id = "boxpin";
		}
		if(arguments.length < 2 || imagem === ""){
			imagem = i3GEO.configura.locaplic+'/imagens/marker.png';
		}
		if(arguments.length < 3 || w === ""){
			w = "21px";
		}
		if(arguments.length < 4 || h === ""){
			h = "25px";
		}
		if (!$i(id))
		{
			var novoel = document.createElement("img");
			novoel.id = id;
			novoel.style.zIndex=10000;
			novoel.style.position="absolute";
			novoel.style.width=w;
			novoel.style.height=h;
			novoel.src = imagem;
			if(id === "boxpin")
			{novoel.onmouseover = function(){$i("boxpin").style.display="none";};}
			document.body.appendChild(novoel);
			i3GEO.util.PINS.push(id);
		}	
	},
	/*
	Function: posicionaImagemNoMapa
	
	Posiciona uma imagem no mapa no local onde o mouse est� posicionado sobre o mapa
	
	Parametros:
	
	id {string} - id do elemento que ser� posicionado
	*/
	posicionaImagemNoMapa: function(id){
		var i,mx,my;
		i = $i(id);
		mx = parseInt(i.style.width,10) / 2;
		my = parseInt(i.style.height,10) / 2;
		i.style.position = "absolute";
		i.style.top = objposicaocursor.telay - my;
		i.style.left = objposicaocursor.telax - mx;	
	},
	/*
	Function: escondePin
	
	Esconde os PINS com IDs registrados em i3GEO.util.PINS
	
	Os ids s�o criado pela fun��o criaPin
	*/
	escondePin: function(){
		var l,i;
		l = i3GEO.util.PINS.length;
		for (i=0; i<l; i++){
			if($i(i3GEO.util.PINS[i]))
			{$i(i3GEO.util.PINS[i]).style.display = "none";}
		}
	},
	/*
	Function: $im ou nome curto $im

	Retorna o caminho correto de uma imagem incluindo o endere�o da aplica��o e do visual em uso.

	Exemplo: $im("imagem.png")

	Parametros:

	g {String} - nome da imagem

	Retorno:

	string - caminho para a imagem
	*/
	$im: function(g){
		return i3GEO.configura.locaplic+"/imagens/visual/"+i3GEO.configura.visual+"/"+g;
	},
	/*
	Function $inputText ou nome curto $inputText

	Cria um elemento html do tipo input text com formata��o especial.

	Parametros:

	idPai {String} - id do elemento pai do input

	larguraIdPai {Integer} - largura em pixel

	idInput {String} - id do objeto input

	titulo {String} - texto que vai no title

	digitos {Integer} - numero de d�gitos do input

	valor {String} - valor do input
	*/
	$inputText: function(idPai,larguraIdPai,idInput,titulo,digitos,valor) {
		if(idPai !== "")
		{
			if(larguraIdPai !== "")
			{$i(idPai).style.width=larguraIdPai+"px";}
			$i(idPai).style.padding="3";
			$i(idPai).style.textAlign="center";
			$i(idPai).onmouseover = function()
			{this.className = "digitarMouseover";};
			$i(idPai).onmouseout = function()
			{this.className = "";};	
		}
		return "<input tabindex='0' onmouseover='javascript:this.className=\"digitarOver\";' onmouseout='javascript:this.className=\"digitar\";' onclick='javascript:this.select();this.className=\"digitarMouseclick\";' id="+idInput+" title='"+titulo+"' type=text size="+digitos+" class=digitar value='"+valor+"' />";
	},
	/*
	Function: $top ou nome curto $top

	Muda a posi��o (superior) de um objeto tanto no IE como no Firefox.

	Exemplo: $top("imagem",100)

	Parametros:

	id - identificador do objeto

	valor - posi��o em rela��o ao topo.
	*/
	$top: function(id,valor){
		if (document.getElementById(id).style){
			if (document.getElementById(id).style.pixelTop)
			{document.getElementById(id).style.pixelTop=valor;}
			else
			{document.getElementById(id).style.top=valor+"px";}
		}
	},
	/*
	Function: $left ou nome curto $left

	Muda a posi��o (esquerda) de um objeto tanto no IE como no Firefox.

	Exemplo: $left("imagem",100)

	Parametros:

	id - identificador do objeto

	valor - posi��o em rela��o a esquerda.
	*/
	$left: function(id,valor){
		if (document.getElementById(id).style){
			if (document.getElementById(id).style.pixelLeft)
			{document.getElementById(id).style.pixelLeft=valor;}
			else
			{document.getElementById(id).style.left=valor+"px";}
		}
	},
	/*
	Function: insereMarca

	Insere ou remove pontos no mapa.
	*/
	insereMarca:{
		/*
		Armazena o valor do ID do div criado para inserir pontos
		
		Tipo:
		{Array}
		*/
		CONTAINER: [],
		/*
		Function: cria
		
		Insere um ponto no mapa
		
		Os pontos s�o inseridos em um contaier de pontos e mostrados tempor�riamente

		Parametros:

		xi {Numeric} - coordenada x.

		yi {Numeric} - coordenada y.

		funcaoOnclick {String} - funcao que sera executada quando a marca 
		for clicada, se for "", o container ser� esvaziado ao ser clicado na marca
	
		container {String} - id do container que receber� os pontos
		*/
		cria:function(xi,yi,funcaoOnclick,container){
			try{
				var novoel,i,novoimg,temp;
				if(i3GEO.util.insereMarca.CONTAINER.toString().search(container) < 0)
				{i3GEO.util.insereMarca.CONTAINER.push(container);}
				//verifica se existe o container para os pontos
				if (!$i(container)){
					novoel = document.createElement("div");
					novoel.id = container;
					i = novoel.style;
					i.position = "absolute";
					i.top = parseInt($i(i3GEO.Interface.IDCORPO).style.top,10);
					i.left = parseInt($i(i3GEO.Interface.IDCORPO).style.left,10);
					document.body.appendChild(novoel);
				}
				container = $i(container);
				novoel = document.createElement("div");
				i = novoel.style;
				i.position = "absolute";
				i.zIndex=2000;
				i.top=(yi - 4)+"px";
				i.left=(xi - 4)+"px";
				i.width="4px";
				i.height="4px";
				novoimg = document.createElement("img");
				if (funcaoOnclick !== "")
				{novoimg.onclick = funcaoOnclick;}
				else
				{novoimg.onclick=function(){i3GEO.util.insereMarca.limpa();};}
				novoimg.src=i3GEO.configura.locaplic+"/imagens/dot1.gif";
				temp = novoimg.style;
				temp.width="6px";
				temp.height="6px";
				temp.zIndex=2000;
				novoel.appendChild(novoimg);
				container.appendChild(novoel);
				if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.util.insereMarca.limpa()") < 0)
				{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.util.insereMarca.limpa()");}					
			}
			catch(e){alert("Ocorreu um erro. inseremarca"+e);}
		},
		limpa: function(){
			try{
				var n,i;
				n = i3GEO.util.insereMarca.CONTAINER.length;
				for(i=0;i<n;i++){
					if($i(i3GEO.util.insereMarca.CONTAINER[i]))
					{$i(i3GEO.util.insereMarca.CONTAINER[i]).innerHTML = "";}
				}
				i3GEO.util.insereMarca.CONTAINER = [];
				i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.util.insereMarca.limpa()");					
			}
			catch(e){}
		}
	},
	/*
	Function: adicionaSHP

	Inclui um arquivo shapefile no mapa atual como uma nova camada

	Parametros:

	path {String} - caminho completo do shapefile
	*/	
	adicionaSHP: function(path){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		var temp = path.split(".");
		i3GEO.contadorAtualiza++;
		if ((temp[1] === "SHP") || (temp[1] === "shp"))
		{i3GEO.php.adicionaTemaSHP(i3GEO.atualiza,path);}
		else
		{i3GEO.php.adicionaTemaIMG(i3GEO.atualiza,path);}
	},
	/*
	Function: abreCor
	
	Abre a janela flutuante para escolha de uma cor
	
	Parametros:
	
	janela {String} - id do conte�do da janela flutuante que chamou a fun��o. Pode ser "" caso elemento exista em document
	
	elemento {String} - id do elemento que receber� os valores da cor selecionada
	*/
	abreCor: function(janela,elemento){
		//i3GEO.janela.cria("400","240",i3GEO.configura.locaplic+"/ferramentas/colorpicker/index.htm?doc="+janela+"&elemento="+elemento,"","","Cor","i3geo_janelaCor",true);
		var ins,
			temp,
			novoel,
			wdocaiframe,
			fix = false,
			wlargura = "400",
			waltura = "240",
			wsrc = i3GEO.configura.locaplic+"/ferramentas/colorpicker/index.htm?doc="+janela+"&elemento="+elemento,
			nx = "",
			ny = "",
			texto = "Cor",
			id = "i3geo_janelaCor",
			modal = true,
			classe = "hd",
			wlargura_ = "400px";
		YAHOO.namespace("janelaCor.xp");
		if ($i(id))
		{YAHOO.janelaCor.xp.panel.destroy();}
		ins = '<div id="'+id+'_cabecalho" class="hd">';
		ins += "<span><img id='i3geo_janelaCor_imagemCabecalho' style='visibility:hidden;' src=\'"+i3GEO.configura.locaplic+"/imagens/aguarde.gif\' /></span>";
		ins += texto;
		ins += '</div><div id="i3geo_janelaCor_corpo" class="bd" style="padding:5px">';
		if(wsrc !== "")
		{ins += '<iframe name="'+id+'i" id="i3geo_janelaCori" valign="top" style="border:0px white solid"></iframe>';}
		ins += '</div>';
		novoel = document.createElement("div");
		novoel.id = "i3geo_janelaCor";
		novoel.style.display="block";
		novoel.innerHTML = ins;
		if($i("i3geo"))
		{$i("i3geo").appendChild(novoel);}
		else
		{document.body.appendChild(novoel);}
		wdocaiframe = $i("i3geo_janelaCori");
		if (wdocaiframe)
		{
			temp = wdocaiframe.style;
			temp.width = parseInt(wlargura,10)-12;
			temp.height=waltura;
			wdocaiframe.style.display = "block";
			wdocaiframe.src = wsrc;
		}
		if(nx === "" || nx === "center"){fix = true;}
		YAHOO.janelaCor.xp.panel = new YAHOO.widget.ResizePanel(id, { zIndex:5000, modal:modal, width: wlargura_, fixedcenter: fix, constraintoviewport: false, visible: true, iframe:false} );
		YAHOO.janelaCor.xp.panel.render();
		$i(id+'_cabecalho').className = classe;
	},
	/*
	Function: ajaxhttp
	
	Cria o objeto XMLHttpRequest para uso com fun��es pr�prias de chamada em ajax
	
	O uso dessa fun��o n�o � recomendado. D� prefer�ncia para uso da chamada ajax via YUI
	
	Return:
	
	{XMLHttpRequest}
	*/
	ajaxhttp: function(){
		var objhttp1;
		try
		{objhttp1 = new XMLHttpRequest();}
		catch(ee){
			try{objhttp1 = new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){
				try{objhttp1 = new ActiveXObject("Microsoft.XMLHTTP");}
				catch(E)
				{objhttp1 = false;}
			}
		}
		return(objhttp1);
	},
	/*
	Function: ajaxexecASXml

	Executa uma chamada ajax no modo ass�ncrono retornando o resultado em XML.

	Parametros:

	programa {String} - URL do programa que ser� executado no servidor.
	funcao {funcao} - fun��o que tratar� o resultado.

	Returns:

	O resultado em um objeto DOM. Se o retorno contiver a palavra "Erro", � gerado um alert.
	*/
	ajaxexecASXml: function(programa,funcao){
		var h,ohttp,retorno;
		if (programa.search("http") === 0){
			h = window.location.host;
			if (programa.search(h) < 0){
				alert("OOps! Nao e possivel chamar um XML de outro host.\nContacte o administrador do sistema.\nConfigure corretamente o ms_configura.php");
				return;
			}
		}	
		ohttp = i3GEO.util.ajaxhttp();
		ohttp.open("GET",programa,true);
		retorno = "";
		ohttp.onreadystatechange=function(){
			var retorno,parser,dom;
			if (ohttp.readyState === 4){
				retorno = ohttp.responseText;
				if (retorno !== undefined){
					if (document.implementation.createDocument){
						parser = new DOMParser();
						dom = parser.parseFromString(retorno, "text/xml");
					}
					else{
						dom = new ActiveXObject("Microsoft.XMLDOM");
						dom.async="false";
						dom.load(programa);
					}
				}
				else
				{dom = "erro";}
				if (funcao !== "volta")
				{eval(funcao+'(dom)');}
				else
				{return dom;}
			}
		};
		ohttp.send(null);
	},
	/*
	Function: aparece
	
	Aplica efeito de aparecimento suave de um objetov
	
	Parametros:
	
	id {String} - id do objeto
	
	tempo {Integer} - tempo em milesegundos que levar� o efeito
	
	intervalo {Integer} - intervalo entre uma imagem e outra
	*/
	aparece: function(id,tempo,intervalo){
		var n,obj,opacidade,fadei,tempoFadei;
		n = parseInt(tempo / intervalo,10);
		obj = $i(id);
		if(n === 1){
			obj.style.display = "block";
			if (navm)
			{obj.style.filter='alpha(opacity=100)';}
			else
			{obj.style.opacity= 1;}
		}
		tempo = n * intervalo;
		intervalo = (intervalo * 100) / tempo;
		opacidade = 0;
		if (navm)
		{obj.style.filter='alpha(opacity=0)';}
		else
		{obj.style.opacity= 0;}
		obj.style.display = "block";
		fadei = function(){
			opacidade += intervalo;
			if (navm)
			{obj.style.filter='alpha(opacity='+opacidade+')';}
			else
			{obj.style.opacity= opacidade/100;}
			if(opacidade < 100)
			{tempoFadei = setTimeout(fadei, tempo);}
			else{
				clearTimeout(tempoFadei);
				if (navm)
				{obj.style.filter='alpha(opacity=100)';}
				else
				{obj.style.opacity= 1;}
			}
		};
		tempoFadei = setTimeout(fadei, tempo);	
	},
	/*
	Function: desaparece
	
	Aplica efeito de desaparecimento suave de um objeto
	
	Parametros:
	
	id {String} - id do objeto
	
	tempo {Integer} - tempo em milesegundos que levar� o efeito
	
	intervalo {Integer} - intervalo entre uma imagem e outra
	
	removeobj {Boolean} - remove ou n�o o objeto no final
	*/
	desaparece: function(id,tempo,intervalo,removeobj){
		var n,obj,opacidade,fade,p,tempoFade;
		n = parseInt(tempo / intervalo,10);
		obj = $i(id);
		if(n === 1){
			obj.style.display = "none";
			if(removeobj){
				p = obj.parentNode;
				if(p)
				{p.removeChild(obj);}
			}
			return;
		}
		tempo = n * intervalo;
		intervalo = (intervalo * 100) / tempo;
		opacidade = 100;
		if (navm)
		{obj.style.filter='alpha(opacity=100)';}
		else
		{obj.style.opacity= 1;}
		obj.style.display = "block";
		fade = function(){
			opacidade -= intervalo;
			if (navm)
			{obj.style.filter='alpha(opacity='+opacidade+')';}
			else
			{obj.style.opacity= opacidade/100;}
			if(opacidade > 0){
				tempoFade = setTimeout(fade, tempo);
			}
			else{
				clearTimeout(tempoFade);
				obj.style.display = "none";
				if (navm)
				{obj.style.filter='alpha(opacity=100)';}
				else
				{obj.style.opacity= 1;}
				if(removeobj){
					p = obj.parentNode;
					if(p)
					{p.removeChild(obj);}
				}
			}
		};
		tempoFade = setTimeout(fade, tempo);	
	},
	/*
	Function: wkt2ext
	
	Calcula a extens�o geogr�fica de uma geometria fornecida no formato WKT
	
	Parametros:
	
	wkt {String} - geometria no formato wkt
	
	tipo {String} - tipo de geometria (polygon,point,line)
	
	Return:
	
	{String} - extens�o geogr�fica (xmin ymin xmax ymax)
	*/
	wkt2ext:function(wkt,tipo){
		var re,x,y,w,xMin,xMax,yMin,yMax,temp;
		tipo = tipo.toLowerCase();
		ext = false;
		if(tipo === "polygon"){
			try{
				re = new RegExp("POLYGON", "g");
				wkt = wkt.replace(re,"");
				wkt = wkt.split("(")[2].split(")")[0];
				wkt = wkt.split(",");
				x = [];
				y = [];
				for (w=0;w<wkt.length; w++){
 					temp = wkt[w].split(" ");
 					x.push(temp[0]);
 					y.push(temp[1]);
				}
				x.sort(i3GEO.util.sortNumber);
				xMin = x[0];
				xMax = x[(x.length)-1];
				y.sort(i3GEO.util.sortNumber);
				yMin = y[0];
				yMax = y[(y.length)-1];
				return xMin+" "+yMin+" "+xMax+" "+yMax;
			}
			catch(e){}
		}
		return ext;
	},
	/*
	Function: sortNumber
	
	Ordena um array contendo n�meros. Deve ser usado como par�metro do m�todo "sort", exemplo
	
	y.sort(i3GEO.util.sortNumber), onde y � um array de n�meros
	*/
	sortNumber: function(a,b){
		return a - b;
	},
	/*
	Function: getScrollerWidth
	
	Calcula o tamanho da barra de rolagem, permitindo calcular o tamanho correto da �rea �til do navegador
	
	http://www.fleegix.org/articles/2006-05-30-getting-the-scrollbar-width-in-pixels
	
	Return:
	
	altura
	*/
	getScrollerWidth: function() {
    	var scr = null,
    		inn = null,
    		wNoScroll = 0,
    		wScroll = 0;
    	// Outer scrolling div
    	scr = document.createElement('div');
    	scr.style.position = 'absolute';
    	scr.style.top = '-1000px';
    	scr.style.left = '-1000px';
    	scr.style.width = '100px';
    	scr.style.height = '50px';
    	// Start with no scrollbar
    	scr.style.overflow = 'hidden';
    	// Inner content div
    	inn = document.createElement('div');
    	inn.style.width = '100%';
   		inn.style.height = '200px';
	    // Put the inner div in the scrolling div
    	scr.appendChild(inn);
    	// Append the scrolling div to the doc
    	document.body.appendChild(scr);
    	// Width of the inner div sans scrollbar
    	wNoScroll = inn.offsetWidth;
    	// Add the scrollbar
    	scr.style.overflow = 'auto';
    	// Width of the inner div width scrollbar
    	wScroll = inn.offsetWidth;
    	// Remove the scrolling div from the doc
   		document.body.removeChild(document.body.lastChild);
    	// Pixel width of the scroller
    	return (wNoScroll - wScroll);
	},
	scriptTag: function(js,ini,id){
		var head,script;
		if(id === "")
		{id = "loadscriptI3GEO";}
		head= document.getElementsByTagName('head')[0];
		script= document.createElement('script');
		script.type= 'text/javascript';
		if(navm){
			script.onreadystatechange = function(){
				if(this.readyState === 'loaded' || this.readyState === 'complete')
				{eval(ini);}
			};
		}
		else
		{script.onload=function(){eval(ini);};}
		script.src= js;
		script.id = id;
		head.appendChild(script);
	},
	/*
	Function: mensagemAjuda
	
	Formata uma mensagem de texto com �cone de ?
	
	Parametros:
	
	onde {String} - id do elemento que receber� a mensagem
	
	texto {String} - texto da mensagem
	*/
	mensagemAjuda: function(onde,texto){
		var ins = "<table style='width:100%;padding:2;vertical-align:top;background-color:#ffffff;' ><tr><th style='background-color: #cedff2; font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 8pt; border: 1px solid #B1CDEB; text-align: left; padding-left: 7px;padding-right: 11px;'>";
		ins += '<div style="float:right"><img src="'+i3GEO.configura.locaplic+'/imagens/question.gif" /></div>';
		ins += '<div style="text-align:left;">';
		if (texto == "")
		{texto = $i(onde).innerHTML;}
		ins += texto;
		ins += '</div></th></tr></table>';
		if (onde != "")
		{$i(onde).innerHTML = ins;}
		else
		{return(ins);}
	},
	/*
	Function: randomRGB
	
	Gera uma cor RGB de forma aleat�ria
	
	Return:
	{String} - r,g,b
	*/
	randomRGB: function(){
		var v = Math.random(),
			r = parseInt(255*v),
			v = Math.random(),
			g = parseInt(255*v),
			v = Math.random(),
			b = parseInt(255*v);
		return (r+","+g+","+b);		
	}
};
//
//alias
//
$im = function(g){
	return i3GEO.util.$im(g);
};
$inputText = function(idPai,larguraIdPai,idInput,titulo,digitos,valor){
	return i3GEO.util.$inputText(idPai,larguraIdPai,idInput,titulo,digitos,valor);
};
$top = function(id,valor){
	i3GEO.util.$top(id,valor);
};
$left = function(id,valor){
	i3GEO.util.$left(id,valor);
};
//YAHOO.log("carregou classe util", "Classes i3geo");
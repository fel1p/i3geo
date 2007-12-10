/*
Title: Inicializa��o do i3geo.

Cria o objeto objmapa e inicializa o i3geo.

Define as opera��es das funcionalidades principais.

O I3Geo utiliza vari�veis (veja o item espec�fico na documenta��o) globais que possibilitam alterar algumas das caracter�sticas da interface.
Essas vari�veis recebem valores default quando o I3Geo � iniciado mas podem ser alterados antes da inicializa��o do mapa (m�todo inicializa()).
No arquivo aplicmapa/geral.htm existem exemplos de como fazer isso.
As vari�veis globais podem tamb�m ser alteradas em tempo de execu��o.

Exemplo:

g_janelaMen = "nao"

objmapa = new Mapa()

objmapa.inicializa()

File: i3geo/classesjs/iniciamma.js

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
/*
Section: vari�veis de configura��o calculadas na inicializa��o do mapa
*/
/*
Variable: g_sid

Id da se��o atual no servidor.
Na inicializa��o o ID pode ser passado na URL logo ap�s a ?, por exemplo, http://localhost/i3geo/aplicmap/geral.htm?xxxxxxxxxxxx
Se o id n�o for definido, significa que o I3Geo dever� criar os arquivos tempor�rios necess�rios ao seu funcionamento, o que � feito via ajax.
*/
if (window.location.href.split("?")[1])
{
	g_sid = window.location.href.split("?")[1];
	//
	//a biblioteca YUI, por algum motivo, acrescenta # na URL. O # precisa ser removido, caso contr�rio, a op��o de reload da p�gina pelo browser as vezes n�o funciona
	//
	if (g_sid.split("#")[0])
	{g_sid = g_sid.split("#")[0];}
}
else 
{g_sid = "";}
/*
Variable: imagemxi

Inicializa��o da vari�vel de c�lculo de posicionamento que indica a posi��o em x do corpo do mapa.
� calculada na inicialliza��o e indica a posi��o em pixels do corpo do mapa na p�gina. Muitos elementos da interface s�o posicionados em fun��o desse valor.
*/
imagemxi = 0;
/*
Variable: imagemyi

Inicializa��o da vari�vel de c�lculo de posicionamento que indica a posi��o em x do corpo do mapa
� calculada na inicialliza��o e indica a posi��o em pixels do corpo do mapa na p�gina. Muitos elementos da interface s�o posicionados em fun��o desse valor.

*/
imagemyi = 0;
/*
Variable: navm

Verdadeiro (true) se o navegador for o Internet Explorer
*/
navm = false;
/*
Variable: navn

Verdadeiro (true) se o navegador for o Firefox
*/
navn = false;
//seta as vari�veis navn e navm
var app = navigator.appName.substring(0,1);
if (app=='N') navn=true; else navm=true;
/*
Section: vari�veis que s�o definidas para controle de processos das fun��es do I3Geo. S�o definidas aqui para n�o gerarem erros nas fun��es que as utilizam.
*/
/*
Variable: atuaLeg

Vari�vel interna que define se a legenda doc�vel deve ser atualizada.
Quando a legenda � colocada em uma janela m�vel, essa vari�vel � utilizada para demonstrar seu status.
Se sim, a legenda m�vel � atualizada quando o mapa � alterado.
*/
atuaLeg="nao";
/*
Variable: g_mashuppar

Par�metros de inicializa��o que podem ser utilizados na interface mashup.

Os par�metros s�o os mesmos que podem ser utilizados quando o i3geo � inicializado pelo ms_criamapa.php.

Exemplo: g_mashuppar = "&pontos=-54 -12&temasa=biomas&layers=biomas"

A inicializa��o do I3Geo como Mashup possibilita que o I3Geo funcione dentro de uma p�gina web qualquer, como um componente.
*/
g_mashuppar = "";
/*
Variable: g_operacao

Nome da �ltima opera��o que foi executada.

Dependendo do tipo de opera��o s�o aplicadas as atualiza��es necess�rias aos componentes do mapa. Por exemplo, redesenha o corpo do mapa, atualiza a lista de temas, etc.

Essas opera��es s�o controladas pela fun��o ajaxiniciaparametros.
*/
g_operacao = "";
/*
Variable: g_nomepin

Nome do tema atual que ir� receber dados pontuais ou toponimia.

*/
g_nomepin = "";
/*
Variable: g_arvoreClick (depreciado)

Item da �rvore de temas que foi clicado por �ltimo. Guarda o identificador do n� da �rvore de temas.
Essa vari�vel permite que as fun��es lembrem qual foi o �ltimo tema sobre o qual o usu�rio fez alguma opera��o.
*/
g_arvoreClick = "";
g_arvoreClicks = "";
/*
Variable: g_tipoacao

Tipo de a��o que est� sendo executada.
Quando o usu�rio clica no mapa, essa vari�vel � pesquisada para definir o tipo de opera��o que deve ser executada.
� definida quando o usu�rio seleciona uma determinada ferramenta do i3Geo.
*/
g_tipoacao = "zoomli";
/*
Variable: g_realca

Define se o realce do mapa deve ficar ativo.
O realce � um box que segue o mouse, por ter uma colora��o diferente, provoca um efeito de destaque.
*/
g_realca = "nao";
/*
Variable: g_destaca

Armazena o c�digo do tema que est� em destaque.
Um tema em destaque � mostrado em um ret�ngulo que segue o mouse.
O tema destacado � selecionado nas op��es de cada tema.
*/
g_destaca = "";
/*
Variable: g_lenteaberta

Indica se a lente de aumento est� ou n�o aberta.
� definida quando o usu�rio clica no �cone "lente".
Quando o mapa � redesenhado, essa vari�vel � checada para verificar se a lente deve ser refeita.
*/
g_lenteaberta = "nao";
/*
Variable: g_panM

Indica se o mapa deve ou n�o ser deslocado.
� utilizada no controle da fun��o "pan".
*/
g_panM = "nao";
/*
Variable: quadrofilme

Array que guarda os objetos do quadro de anima��o.
Cada elemento guarda um objeto com par�metros espec�ficos da classe quadrofilme
*/
quadrosfilme = new Array();
/*
Variable: g_quadrooriginal

Guarda a URL da imagem do mapa atual.
� utilizada para recuperar a imagem correta do corpo do mapa atual, uma vez que ao mover de um objeto quadofilme para outro, a imagem do corpo do mapa � alterada.
*/
g_quadrooriginal = "";
/*
Variable: g_r

Indica se o software R esta instalado (sim ou nao). � preenchida na inicializa��o do mapa via AJAX.
*/
g_r = "nao";
/*
Variable: cpObj

Objeto cpaint que pode ser reutilizado.

O objeto cpaint permite executar uma chamada ajax.
*/
cpObj = new cpaint();
cpObj.set_async("true");
cpObj.set_response_type("JSON");

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
Class: Mapa

Objeto mapa (objmapa).

Executa os programas ajax que geram o corpo do mapa, o mapa de refer�ncia, a barra de escala e a legenda.
Preenche os elementos HTML necess�rios para visualiza��o do mapa.

Parameters:

e - (opcional, se n�o existir, o valor ser� buscado na URL) extens�o geogr�fica do mapa com valores separados por espa�o

m - (opcional, se n�o existir, o valor ser� buscado na URL) nome do mapfile criado para o mapa

return:

objmapa - objeto mapa do i3geo

Constructor: 

objmapa = New Mapa()
*/
function Mapa(e,m)
{
	//
	//se o div listapropriedades n�o existir, as propriedades do mapa s�o inclu�das no menu suspenso
	//
	//if (!$i("listaPropriedades"))
	//{
	//	oMenuData.propriedades = g_listaPropriedades;
	//}
	objaguarde = new aguarde();
	objposicaocursor = new posicaocursor();
	objposicaomouse = new posicaomouse();
	//faz o cache das imagens para desenhar mais r�pido
	imgBranco = new Image();
	imgBranco.src = g_locaplic+"/imagens/branco.gif";
	var temp = new Image();
	temp.src = g_locaplic+"/classesjs/jsobjects/jsUI-Treeview/plus.gif";
	temp.src = g_locaplic+"/classesjs/jsobjects/jsUI-Treeview/minus.gif";
	//calcula o tamanho do mapa
	var diminuix = (navm) ? g_diminuixM : g_diminuixN;
	var diminuiy = (navm) ? g_diminuiyM : g_diminuiyN;
	/*
	Variable: objmapa.w
	
	Largura do mapa criado

	� calculado em fun��o do tamanho da tela. No caso do corpo do mapa possuir a propridedade de largura em seu estilo, � utilizado esse tamanho.
	*/
	/*
	Variable: objmapa.h
	
	Altura do mapa criado

	� calculado em fun��o do tamanho da tela. No caso do corpo do mapa possuir a propridedade de largura em seu estilo, � utilizado esse tamanho.
	*/
	if (e == undefined)
	{
		var menos = 0;
		if ($i("contemFerramentas"))
		{menos = menos + parseInt($i("contemFerramentas").style.width);}
		//if ($i("encolheFerramentas"))
		//{menos = menos + parseInt($i("encolheFerramentas").style.width);}
		if ($i("ferramentas"))
		{menos = menos + parseInt($i("ferramentas").style.width);}
		var novow = screen.availWidth - diminuix;
		var novoh = screen.availHeight - diminuiy;
		if (novow >= 1024)
		{
			novow = 1000;
		}
		if (novoh >= 700)
		{
			novoh = 700;
		}
		if (document.body.style.width < 400)
		{
			var novow = screen.availWidth - diminuix;
			var novoh = screen.availHeight - diminuiy;
			window.resizeTo(screen.availWidth,screen.availHeight);
			window.moveTo(0,0);
		}
		document.body.style.width = novow;
		document.body.style.height = novoh;
		this.w = novow - menos - diminuix;
		this.h = novoh - diminuiy;
		if (document.getElementById("corpoMapa"))
		{
			if (document.getElementById("corpoMapa").style.width)
			{
				this.w = parseInt(document.getElementById("corpoMapa").style.width);
				this.h = parseInt(document.getElementById("corpoMapa").style.width);
			}
			if (document.getElementById("corpoMapa").style.height)
			{this.h = parseInt(document.getElementById("corpoMapa").style.height);}
		}
	}
	else
	{
		this.w = document.body.offsetWidth - parseInt($i("contemFerramentas").style.width) - diminuix;
		this.h = document.body.offsetHeight - diminuiy;
	}
	if ($i("openlayers"))
	{
		$i("openlayers").style.width = this.w;
		$i("openlayers").style.height = this.h;
	}
	/*
	Variable: objmapa.navegacaoDir
	
	Indica se deve ser incluida a op��o de navega��o nos diret�rios do servidor.

	A indica��o sim|nao � obtida na inicializa��o do i3geo, e � definido no ms_configura.php
	*/
	this.navegacaoDir = "nao";	
	/*
	Variable: objmapa.listavisual
	
	String com a lista de visuais dispon�veis no i3geo.

	A lista � obtida na inicializa��o do i3geo, lendo-se os diret�rios dispon�veis em imagens/visual
	*/
	this.listavisual = "";
	/*
	Variable: objmapa.visualatual
	
	Indica qual o visual atualmente em uso.
	*/
	this.visualatual = "default";
	/*
	Variable: objmapa.funcoesClickMapa
	
	Array com a lista de fun��es que ser�o executadas quando o usu�rio clica no mapa

	� utilizado quando o i3geo � customizado, acrescentando outras funcionalidades al� do padr�o.
	
	Na customiza��o, deve ser definida ap�s a inicializa��o do mapa.
	*/
	this.funcoesClickMapa = new Array();
	/*
	Variable: objmapa.objtips
	
	Array que guarda os objetos tips fixos na tela.
	
	Os objetos s�o acrescentados � essa vari�vel quando um tip � fixado na tela pelo usu�rio.
	
	Quando o mapa � redesenhado, essa vari�vel � limpa.
	*/
	this.objtips = new Array(); //
	/*
	Variable: objmapa.tempo
	
	Inicia o temporizador para redesenhar o mapa.
	
	*/
	this.tempo = ""; //
	/*
	Variable: objmapa.autoRedesenho
	
	Inicia o temporizador para redesenhar o mapa automaticamente.
	
	*/
	this.tempoRedesenho = ""; //
	this.contaTempoRedesenho = ""; //
	/*
	Variable: objmapa.temaAtivo
	
	Tema que esta ativo.
	
	Utilizado em varias operacoes onde o tema e selecionado de um combo
	*/	
	this.temaAtivo = ""; 
	/*
	Variable: objmapa.pinmarca
	
	Simbolo utilizado para insercao de pontos.
	
	A inser��o � utilizada em algumas ferramentas, como a digitaliza��o de elementos.
	*/
	this.pinmarca = "marca"; //
	/*
	Variable: objmapa.pintamanho
	
	Tamanho da marca utilizada na inclus�o de pontos
	*/
	this.pintamanho= "5";
	/*
	Variable: objmapa.escala
	
	Escala do mapa atual.
	
	� sempre redefinida quando o mapa � redesenhado.
	*/
	this.scale = 50000;
	/*
	Variable: objmapa.temas
	
	Temas dispon�veis no mapa atual.
	
	Guarda a lista de temas e suas caracter�sticas. � definida quando o mapa � inicializado ou redesenhado.
	*/
	this.temas = "";
	/*
	Variable: objmapa.legenda
	
	Legenda HTML do mapa atual.
	
	Guarda o HTML que apresenta a legenda no mapa.
	*/
	this.legenda="";
	/*
	Variable: objmapa.finaliza
	
	Fun��o que ser� executada no final do processo de montagem do mapa.
	
	Pode ser utilizada quando se deseja customizar o I3Geo.
	*/
	this.finaliza="";
	/*
	Variable: objmapa.guiaTemas
	
	Define qual a guia para listar os temas do mapa
	*/
	this.guiaTemas = "guia1";
	/*
	Variable: objmapa.guiaMenu
	
	Define qual a guia que receber� o menu de sele��o de temas
	*/
	this.guiaMenu = "guia2";
	/*
	Variable: objmapa.guiaLegenda
	
	Define qual a guia receber� a legenda do mapa
	*/
	this.guiaLegenda = "guia4";
	/*
	Variable: objmapa.guiaListaMapas
	
	Define a guia que receber� a lista de mapas
	*/
	this.guiaListaMapas = "guia5";
	/*
	Variable: objmapa.cgi
	
	Indica a localiza��o do mapserver cgi. � definida pelo i3geo na inicializa��o do mapa e configurada no arquivo ms_configura.php.
	*/
	this.cgi = "";
	/*
	Variable: objmapa.utilizacgi
	
	Indica se o mapserver est� operando no modo cgi. � definida pelo i3geo na inicializa��o do mapa e configurada no arquivo ms_configura.php.
	*/
	this.utilizacgi = "";	
	/*
	Function: inicializa
	
	Inicializa o mapa
	
	Paremeters:
	
	void
	*/
	this.inicializa= function()
	{
		//
		//se n�o for encontrado nenhum div com o id i3geo, o corpo do html recebe esse identificador
		//
		if (!$i("i3geo"))
		{document.body.id = "i3geo";}
		//altera a classe do corpo do HTML. Utilizada pelo YUI.
		$i("i3geo").className = "yui-skin-sam";
		$i("i3geo").onmouseover = function()
		{
			this.onmousemove=function(exy1)
			{
				//
				//quando o mouse � movido sobre a tela, a posi��o de x e y s�o guardadas em objposicaomouse
				//
				if (navn)
				{
					objposicaomouse.x = exy1.clientX;
					objposicaomouse.y = exy1.clientY;
				}
				else
				{
					objposicaomouse.x = window.event.clientX;
					objposicaomouse.y = window.event.clientY;
				}
			};
		};
		//
		//se g_sid="", o html foi aberto diretamente
		//ent�o, � necess�rio criar os arquivos tempor�rios do mapa
		//essa opera��o deve ser ass�ncrona
		//
		if (g_sid=="")
		{
			var mashup = function (retorno)
			{
				g_sid = retorno.data;
				objmapa.inicializa();
			};
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa"+g_mashuppar;
			cpObj.call(p,"",mashup);
			return;
		}
		//	
		//testa se os javascripts foram carregados
		//
		if (!window.testafuncoes)
		{alert("funcoes.js com problemas");}
		if (!window.testamenususpenso)
		{alert("menususpenso.js com problemas");}
		if (!window.testaferramentas)
		{alert("ferramentas.js com problemas");}
		if (!window.testaajax)
		{alert("redesenho.js com problemas");}
		//
		//inicia o mapa
		//
		objaguarde.abre("montaMapa",$trad("o5"));
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inicia&embedLegenda="+g_embedLegenda+"&w="+this.w+"&h="+this.h+"&g_sid="+g_sid;
		cpObj.call(p,"iniciaMapa",this.montaMapa);
	};
	/*
	Function: montaMapa
	
	Processa os resultados da inicializa��o e monta o mapa
	
	Parameters:
	
	Resultado da fun��o inicia retornado pela chamada em ajax
	*/
	this.montaMapa = function (retorno)
	{
		if (retorno.data.search(" erro.") > -1)
		{
			alert(retorno.data);
		}
		if (retorno.data == "linkquebrado")
		{
			objaguarde.fecha("montaMapa");
			document.body.style.backgroundColor="white";
			document.body.innerHTML = "<br>Para abrir o mapa utilize o link:<br><a href="+g_locaplic+"/ms_criamapa.php >"+g_locaplic+"/ms_criamapa.php</a>";
			return("linkquebrado");
		}
		else
		{
			if ((retorno.data != "erro") && (retorno.data != undefined))
			{
				//
				//executa com eval a string que � retornada pelo servidor (fun��o inicia do mapa_controle.php
				//
				eval(retorno.data);
				//
				//insere botao dinamico de aplicar
				//
				if (!$i("aplicari"))
				{
					var novoel = document.createElement("input");
					novoel.id = 'aplicari';
					novoel.type = 'button';
					novoel.value = 'Aplicar';
					novoel.style.cursor="pointer";
					novoel.style.fontSize="10px";
					novoel.style.zIndex = 15000;
					novoel.style.position="absolute";
					novoel.style.display="none";
					novoel.onclick=function()
					{
						remapaf();
						this.style.display="none"
					};
					novoel.onmouseover = function(){this.style.display="block";};
					novoel.onmouseout = function(){this.style.display="none";};
					document.body.appendChild(novoel);
				}
				//
				//gera os �cones para anima��o
				//
				gerafilmef(10);
				//
				//inicia as barras de ferramentas
				//
				if (g_barraFerramentas1 == "sim")
				{initJanelaZoom(1);}
				if (g_barraFerramentas2 == "sim")
				{initJanelaZoom(2);}				
				//
				//gera a lista de temas da guia temas
				//
				objmapa.atualizaListaTemas(temas);
				//
				//gera o mapa de referencia e outros elementos do mapa
				//
				objmapa.atualizaReferencia(mapexten);
				objmapa.scale = parseInt(mapscale);
				objmapa.temas = temas;
				objmapa.cellsize = g_celula;
				objmapa.extent = mapexten;
				objmapa.extentTotal = mapexten;
				objmapa.criaCorpoMapa();
				ajaxCorpoMapa(retorno);
				objmapa.criaEscalaGrafica();
				objmapa.atualizaEscalaGrafica();
				objmapa.ativaListaPropriedades("listaPropriedades");
				//
				//ativa os bot�es  das fun��es
				//
				var l = g_listaFuncoesBotoes.botoes;
				var lle = l.length;
				var b = l.length-1;
				do
				{
					if ($i(l[b].iddiv))
					{
						if(l[b].conteudo)
						{eval('$i(l[b].iddiv).innerHTML = "'+l[b].conteudo+'"');}
						if(l[b].dica)
						{
							eval('$i("'+l[b].iddiv+'").onmouseover = function(){mostradicasf(this,"'+l[b].dica+'","");}');
							eval('$i("'+l[b].iddiv+'").onmouseout = function(){mostradicasf(this,"");};');
						}
						if(l[b].funcaoonclick)
						{
							$i(l[b].iddiv).onclick = l[b].funcaoonclick;
						}
						if(l[b].constroiconteudo)
						{eval(l[b].constroiconteudo);}
					}
				}
				while (b--);
				//
				//ativa as guias
				//
				ativaGuias();
				//
				//calcula a posicao do mapa no browser
				//
				calcposf();
				g_leftinicial = imagemxi;
				if ($i("corpoMapa"))
				{
					var i = $i("img").style;
					i.width=objmapa.w +"px";
					i.height=objmapa.h +"px";
					var i = $i("corpoMapa").style;
					i.width=objmapa.w +"px";
					i.height=objmapa.h +"px";
					i.clip = 'rect('+0+" "+(objmapa.w)+" "+(objmapa.h)+" "+0+')';
				}
				var temp = 0;
				if ($i("contemFerramentas")){temp = temp + parseInt($i("contemFerramentas").style.width);}
				//if ($i("encolheFerramentas")){temp = temp + parseInt($i("encolheFerramentas").style.width);}
				if ($i("ferramentas")){temp = temp + parseInt($i("ferramentas").style.width);}
				$i("mst").style.width=objmapa.w + temp + "px";
				var i = $i("contemImg").style;
				i.height=objmapa.h + "px";
				i.width=objmapa.w + "px";
				calcposf();
				//reposiciona a janela de botoes
				if(navn){var desloca = 40;}else{var desloca = 40;}
				if ($i("maisBotoes1")){YAHOO.janelaBotoes1.xp.panel.moveTo(imagemxi+desloca,imagemyi+10);}
				if ($i("maisBotoes2")){YAHOO.janelaBotoes2.xp.panel.moveTo(imagemxi,imagemyi+10);}
				mudaiconf("pan"); //inicia no icone de zoom por box
				if (g_entorno == "sim")
				{
					geraURLentorno();
					var letras=["L","O","N","S"];
					for (var l=0;l<4; l++)
					{
						if ($i("img"+letras[l]))
						{
							$i("img"+letras[l]).style.width = objmapa.w;
							$i("img"+letras[l]).style.height = objmapa.h;
							$i("img"+letras[l]).style.display = "block";
						}
					}
					ajustaEntorno();
				}
				autoRedesenho("ativa");
				if ($i("escalanum")){$i("escalanum").value = objmapa.scale;}
				if (objmapa.geoip == "nao"){$i(id).style.display="none";}
			}
			else
			{alert("Erro. Impossivel criar o mapa "+retorno.data);return;}
			//ativa a guia correta
			var temp = g_guiaativa.split("guia");
			mostraguiaf(temp[1]);
			//verifica se a guia5 (mapas) deve ou n�o ser mostrada
			if ($i(objmapa.guiaListaMapas))
			{
				if (g_locmapas == ""){$i(objmapa.guiaListaMapas).style.display = "none"}
			}
			if (pCookie("g_janelaMen")){g_janelaMen = pCookie("g_janelaMen");}
			if (g_janelaMen == "sim"){initJanelaMen();}
			if (pCookie("g_mapaRefDisplay")){g_mapaRefDisplay = pCookie("g_mapaRefDisplay");}
			if (g_mapaRefDisplay == "block"){initJanelaRef();}
			if($i("img")){g_quadrooriginal = $i("img").src;}
			objaguarde.fecha("montaMapa");
			if (g_docaguias == "sim"){docaguias();}
			if (document.getElementById("botao3d"))
			{
				if (g_3dmap == ""){document.getElementById("botao3d").style.display="none";}
			}
		}
		//
		//zera os quadros de anima��o
		//
		rebobinaf();
	};
	/*
	Function: ativaListaPropriedades
	
	Mostra a lista de propriedades do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaListaPropriedades = function(id)
	{
		if ($i(id))
		{
			listaPr = new Object();
			listaPr = treeviewNew("listaPr", "default", id, null);
			listaPr.createItem("propriedadesRaiz", "<b>"+$trad("p13")+"</b>", g_locaplic+"/imagens/visual/"+g_visual+"/foldermapa1.gif", true, false, true, null);
			var im = "";
			if (navn)
			{var im = "<img src='"+g_locaplic+"/imagens/branco.gif' width=0 height=13 />";}
			var l = g_listaPropriedades.propriedades.length-1;
			do
			{
				var temp = g_listaPropriedades.propriedades[l].text;
				var temp = eval("g_traducao."+temp+"[0]."+g_linguagem);
				tnome = "<span onclick='"+g_listaPropriedades.propriedades[l].url+"'>"+im+"<img  src='"+g_locaplic+"/imagens/visual/"+g_visual+"/tic.png' />&nbsp;"+temp+" </span>";
				listaPr.createItem("propriedadesMapa"+l, tnome, imgBranco, false, true, false, "propriedadesRaiz");
			}
			while(l--)
			listaPr.createItem("","", imgBranco, false, true, false, "propriedadesRaiz");				
		}
	};
	/*
	Function: criaEscalaGrafica
	
	Cria a escala gr�fica como um lemento HTML se existir o id escalaGrafica
	*/
	this.criaEscalaGrafica = function()
	{
		if ( ($i("escalaGrafica")) && (!$i("imagemEscalaGrafica")) )
		{$i("escalaGrafica").innerHTML = "<img src=\""+g_localimg+"/icon_menuarrow.gif\" title='op&ccedil;&otilde;es' onclick='opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />";}
	};
	/*
	Function: atualizaEscalaGrafica
	
	Atualilza a escala gr�fica
	*/
	this.atualizaEscalaGrafica = function()
	{
		if ($i("escalaGrafica"))
		{
			//objaguarde.abre("ajaxEscalaGrafica","Aguarde...criando escala gr&aacute;fica");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=escalagrafica&g_sid="+g_sid;
			cpObj.call(p,"retornaBarraEscala",ajaxEscalaGrafica);
		}
	};
	/*
	Function: atualizaReferencia
	
	Atualiza o mapa de refer�ncia.
	
	Se o modo cgi estiver ativado, o mapa de refer�ncia � desenhado utilizando-se como src da imagem o programa cgi do Mapserver.
	
	No modo din�mico, a imagem � gerada de forma diferenciada. Nesse caso, o modo cgi � desabilitado.
	
	O atualizaReferencia � sempre chamado ap�s o mapa ser redesenhado.
	
	Se houve altera��o na extens�o, � preciso refazer o mapa de refer�ncia se n�o, a imagem atual � armazenada no quado de anima��o

	Parameters:
	
	mapexten - extens�o geogr�fica do ret�ngulo que ser� desenhado no mapa de refer�ncia. 
	Esse valor � utilizado apenas para comparar a extens�o geogr�fica do mapa atual com a extens�o geogr�fica do mapa seguinte.
	*/
	this.atualizaReferencia = function(mapexten)
	{
		var dinamico = false;
		if ($i("refDinamico"))
		{var dinamico = $i("refDinamico").checked;}
		if ($i("mapaReferencia") && objmapa.extent != mapexten)
		{
			if(dinamico)
			{
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=referenciadinamica&g_sid="+g_sid;
				cpObj.call(p,"retornaReferenciaDinamica",ajaxReferencia);
			}
			else
			{
				if(($i("imagemReferencia").src == "") || (objmapa.cgi != "sim"))
				{
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=referencia&g_sid="+g_sid;
					cpObj.call(p,"retornaReferencia",ajaxReferencia);
				}
				else
				{
					var re = new RegExp("&mode=map", "g");
					$i("imagemReferencia").src = $i("img").src.replace(re,'&mode=reference');
					gravaQuadro("referencia",$i("imagemReferencia").src);
				}
			}
		}
		else
		{
			if($i("imagemReferencia"))
			gravaQuadro("referencia",$i("imagemReferencia").src);
		}		
	};
	/*
	Function: atualizaLegendaHTML
	
	Atualiza a legenda, em HTML, nos ids legenda e moveLegi
	*/
	this.atualizaLegendaHTML = function()
	{
		if  (($i("moveLegi")) || ($i("legenda") && $i(objmapa.guiaLegenda+"obj") && $i(objmapa.guiaLegenda+"obj").style.display == "block"))
		{
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&g_sid="+g_sid;
			cpObj.call(p,"criaLegenda",ajaxLegendaHTML);
		}
	};
	/*
	Function: atualizaLegendaImagem
	
	Atualiza a legenda no formato de uma imagem
	*/
	this.atualizaLegendaImagem = function()
	{
		if ($i("legenda"))
		{
			//objaguarde.abre("ajaxLegenda","Aguarde...atualizando a legenda");
			var p =g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaImagem&g_sid="+g_sid;
			cpObj.call(p,"legendaGrafica",ajaxLegendaImagem);
		}
	};
	/*
	Function: atualizaListaTemas
	
	Atualiza a lista de temas dispon�veis no mapa (guia com a lista de temas)
	
	Parameters:
	
	temas - lista de temas. Se vazio, utiliza o objeto objmapa.temas
	*/
	this.atualizaListaTemas = function(temas)
	{
		if ( (($i("listaTemas")) && (objmapa.temas != temas)) || (!$i("listaTemas").hasChildNodes()) )
		{
			$i("listaTemas").innerHTML = "";
			var lista = temas.split(";");
			mytreeview1 = new Object();
			mytreeview1 = treeviewNew("mytreeview1", "default", "listaTemas", null);
			var titulo = "<b>"+$trad("t1")+"</b><img id='lixeira' style='position:relative;top:5px' title='"+$trad("t2")+"'  src='"+$im("gnome-fs-trash-full.png")+"' />";
			mytreeview1.createItem("g1",titulo, g_locaplic+"/imagens/foldermapa.gif", true, true, true, null);
			mytreeview1.itemExpand = expandeTema;
			var cor = "rgb(250,250,250)";
			//codigo,status,nome,transparencia,tipo,selecao,escala,download,tem features,conexao,tem wfs
			var lle = lista.length;
			var l = 0;
			do
			{
				var ltema = lista[l].split("*");
				var ck = "";
				if(ltema[1] == 2){ck = 'CHECKED';}
				//ltema[8]==sim indica que e um tema com features
				if (ltema[8] == undefined){ltema[8] = "nao";}
				tnome = "<span id='arrastar_"+ltema[0]+"'><input class=inputsb style='cursor:pointer' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t3")+"','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" type='checkbox' name=\"layer\" value='"+ltema[0]+"' "+ ck +" onclick='mudaboxnf(\"ligadesliga\")'/>";
				if (ltema[5] == "sim") //o tema tem selecao
				{tnome += "&nbsp;<img src="+$im("estasel.png")+" title='"+$trad("t4")+"' onclick='limpaseltemaf(this)' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t5")+"','limpasel')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				//verifica se e um wms que tem wfs
				if ((ltema[10] == "sim") || (ltema[10] == "SIM"))
				{tnome += "&nbsp;<img src="+$im("down1.gif") +" title='download' onclick='download(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t6")+"','download')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				if ((ltema[7] == "sim") || (ltema[7] == "SIM"))
				{tnome += "&nbsp;<img src="+$im("down1.gif") +" title='download' onclick='download(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'"+$trad("t7")+"','download')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				if (navm)
				{tnome += "<span title='"+$trad("t7")+"' style='background-color:"+cor+"' id=nometema"+ltema[0]+">&nbsp;" + ltema[2]+"</span></span>";}
				else
				{tnome += "<span title='"+$trad("t8")+"' style='background-color:"+cor+"' id=nometema"+ltema[0]+">&nbsp;" +"<img src='"+g_locaplic+"/imagens/branco.gif' width=0 height=15 />" +ltema[2]+"</span></div>";}
				mytreeview1.createItem(ltema[0], tnome, null, true, true, true, "g1");
				tnome = "<img width=0px src="+$im("branco.gif") + " />";
				mytreeview1.createItem("", tnome, imgBranco, false, true, false, ltema[0]);
				if (cor == "rgb(250,250,250)"){var cor = "none";}
				else
				{var cor = "rgb(250,250,250)";}
				l++;
			}
			while(l<lle)
		}
		ativaDragDrop();
	};
	/*
	Function: atualizaFarol
	
	Atualiza o farol de cada tema.
	
	O farol identifica a compatibilidade da escala do mapa com a escala de cada tema
	
	Parameters:
	
	mapscale - escala de compara��o com a escala de cada tema
	*/
	this.atualizaFarol = function(mapscale)
	{
		//mapscale � o valor da escala do novo mapa
		if (objmapa.scale != mapscale)
		{
			var lista = (objmapa.temas).split(";");
			var farol = "maisamarelo.png";
			var l = lista.length-1;
			do
			{
				var ltema = lista[l].split("*");
				if (ltema[6]*1 < mapscale*1)
				{var farol = "maisverde.png";}
				if (ltema[6]*1 > mapscale*1)
				{var farol = "maisvermelho.png";}
				if (ltema[6]*1 == 0)
				{var farol = "maisamarelo.png";}
				if ($i("farol"+ltema[0]))
				{
					$i("farol"+ltema[0]).src = g_locaplic+"/imagens/"+farol;
				}
			}
			while(l--)
		}
	};
	/*
	Function: criaCorpoMapa
	
	Cria os objetos para preenchimento com a imagem do corpo do mapa.
	
	*/
	this.criaCorpoMapa = function()
	{
		if ($i("corpoMapa"))
		{
			var ins = "<table>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgN' /></td><td class=verdeclaro ></td></tr>";
			ins += "<tr><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgL' /></td><td class=verdeclaro ><input style='position:relative;top:0px;left:0px'' type=image src='' id='img' /></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgO' /></td></tr>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgS' /></td><td class=verdeclaro ></td></tr>";
			ins += "</table>";
			$i("corpoMapa").innerHTML = ins;
		}
		//insere a figura que segue o mouse
		var novoel = document.createElement("div");
		novoel.style.zIndex=1000;
		novoel.id="obj";
		var novoimg = document.createElement("img");
		novoimg.src= g_locaplic+"/imagens/pan.gif";
		novoimg.name="imgh";
		novoimg.id='imgh';
		novoimg.style.width = "15px";
		novoimg.style.height = "15px";
		novoel.appendChild(novoimg);
		novoel.onmouseover = function()
		{this.style.display = "none";};
		novoel.onmouseout = function()
		{this.style.display = "block";};
		document.body.appendChild(novoel);
		var docMapa = "";
		if (document.getElementById("openlayers_OpenLayers_Container"))
		{
			var docMapa = $i("openlayers_OpenLayers_Container");
		}
		if (document.getElementById("img"))
		{
			var docMapa = $i("img");
			//insere box de zoom
			var novoel = document.createElement("div");
			novoel.style.width = "0px";
			novoel.style.height = "0px";
			novoel.id = "box1";
			novoel.display = "none";
			document.body.appendChild(novoel);
			if (navm)
			{
				$i("box1").style.filter = "alpha(opacity=25)";
			}
			$i("box1").onmousemove = function()
			{
				var wb = parseInt($i("box1").style.width);
				var hb = parseInt($i("box1").style.height);
				if (navm)
				{
					if(wb > 2)
					{$i("box1").style.width = wb - 2;}
					if(hb > 2)
					{$i("box1").style.height = hb - 2;}
				}
				else
				{
					with(this.style){width = wb - 10 + "px";}
					with(this.style){height = hb - 10 + "px";}
				}
			};
			$i("box1").onmouseup = function(){zoomboxf("termina")};
			//funcoes que operam sobre o mapa
			this.parado = "nao"; //utilizado para verificar se o mouse esta parado
		}
		if (docMapa != "")
		{
			ativaClicks(docMapa);
		}
		this.atualizaCorpoMapa = function()
		{
			objaguarde.abre("ajaxCorpoMapa",$trad("o1"));
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=corpo&g_sid="+g_sid;
			cpObj.call(p,"redesenhaCorpo",ajaxCorpoMapa);
		};
		if (objmapa.finaliza)
		{eval(objmapa.finaliza);}
		//
		//altera o tamanho das guias
		//
		var temp = new Array("guiaTemas","guiaMenu","guiaLegenda");
		var i = temp.length-1;
		do
		{
			eval("var s = objmapa."+temp[i]+"obj"); 
			if ($i(s))
			{
				var d = $i(s).style;
				d.style.overflow="auto";
				d.style.height = objmapa.h-13;
				d.style.width = "100%";
			}
		}
		while(i--)
	};
	/*
	Function: verificaClickMapa
	
	Verifica se existem fun��es adicionais que devem ser executadas quando o usu�rio clica no mapa.
	*/
	this.verificaClickMapa = function()
	{
		if (this.funcoesClickMapa.length > 0)
		{
			var f = this.funcoesClickMapa.length-1;
			do
			{
				eval(this.funcoesClickMapa[f]);
			}
			while(f--)
		}
		if (g_funcoesClickMapaDefault.length > 0)
		{
			var lle = g_funcoesClickMapaDefault.length;
			for (var f=0;f<lle; f++)
			{
				eval(g_funcoesClickMapaDefault[f]);
			}
		}
	};
	/*
	Function: verificaMousemoveMapa
	
	Verifica se existem fun��es adicionais que devem ser executadas quando o usu�rio mover o mouse sobre o mapa.
	*/
	this.verificaMousemoveMapa = function()
	{
		if (g_funcoesMousemoveMapaDefault.length > 0)
		{
			var f = g_funcoesMousemoveMapaDefault.length-1;
			do
			{
				eval(g_funcoesMousemoveMapaDefault[f]);
			}
			while(f--)
		}
	};
	/*
	Function: verificaNavegaMapa
	
	Verifica se existem fun��es adicionais que devem ser executadas quando o usu�rio mover o mouse sobre o mapa.
	*/
	this.verificaNavegaMapa = function()
	{
		if (g_funcoesNevegaMapaDefault.length > 0)
		{
			var f = g_funcoesNevegaMapaDefault.length-1;
			do
			{
				eval(g_funcoesNevegaMapaDefault[f]);
			}
			while(f--)
		}
	};
}

/*
function loopDoWhileReverse3() {
var i=iter;
do 
{
  // do something here
}
while (--i);
}
*/
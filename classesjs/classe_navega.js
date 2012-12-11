/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */
/*
Title: Navega&ccedil;&atilde;o sobre o mapa

Arquivo:

i3geo/classesjs/classe_navega.js

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
de COMERCIABILIDADE OU ADEQUAC&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) === 'undefined'){
	var i3GEO = {};
}
/*
Classe: i3GEO.navega

Realiza opera&ccedil;&otilde;es de navega&ccedil;&atilde;o do mapa, como zoom, pan, etc..

Quando todos os argumentos da fun&ccedil;&atilde;o forem opcionais, basta usar nomeFuncao(),
nos casos em que os primeiros argumentos forem opcionais e os demais obrigat&oacute;rios,
utilize "" no lugar do argumento que se quer usar o default, exemplo,
nomeFuncao("","",10)
*/
i3GEO.navega = {
	/*
	Propriedade: TEMPONAVEGAR

	Tempo em milisegundos que ser&aacute; esperado para executar uma opera&ccedil;&atilde;o de navega&ccedil;&atilde;o sobre o mapa.

	Controla o lapso de tempo utilizado para disparar as fun&ccedil;&otilde;es do tipo navega&ccedil;&atilde;o

	Tipo:
	{Numeric}

	Default:
	{1500}
	*/
	TEMPONAVEGAR: 600,
	/*
	Propriedade: FATORZOOM

	Valor utilizado nas opera&ccedil;&otilde;es de zoom in e out. Fator de zoom.

	Default:
	{2}

	Tipo:
	{Numeric}
	*/
	FATORZOOM: 2,
	/*
	Variavel: timerNavega

	Objeto do tipo timer utilizado no contador de tempo para o delay de execu&ccedil;&atilde;o das fun&ccedil;&otilde;es de navega&ccedil;&atilde;o
	*/
	timerNavega: null,
	/*
	Function: centroDoMapa

	Obt&eacute;m as coordenadas geogr&aacute;ficas do centro do mapa

	Retorno:

	{array|false} - false se falhar ou [x,y] se n&atilde;o falhar
	*/
	centroDoMapa: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.centroDoMapa()");}
		var xy;
		switch(i3GEO.Interface.ATUAL)
		{
			case "openlayers":
				xy = i3geoOL.getCenter();
				if(xy)
				{return [xy.lon,xy.lat];}
				else
				{return false;}
				break;
			case "googlemaps":
				xy = i3GeoMap.getCenter();
				if(xy)
				{return [xy.lng(),xy.lat()];}
				else
				{return false;}
				break;
			default:
				return false;
		}
	},
	marcaCentroDoMapa: function(xy){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.marcaCentroDoMapa()");}
		if(xy != false){
			xy = i3GEO.calculo.dd2tela(xy[0]*1,xy[1]*1,$i(i3GEO.Interface.IDMAPA),i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
			i3GEO.util.criaPin("i3GeoCentroDoMapa",i3GEO.configura.locaplic+'/imagens/alvo.png','30px','30px');
			i3GEO.util.posicionaImagemNoMapa("i3GeoCentroDoMapa",xy[0],xy[1]);
		}
	},
	/*
	Function: zoomin

	Aproxima o mapa aplicando um fator de modifica&ccedil;&atilde;o da escala

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo
	*/
	zoomin: function(locaplic,sid){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomin()");}
		if(i3GEO.Interface.ATUAL === "openlayers"){
			i3geoOL.zoomIn();
			return;
		}
		if(sid){
			i3GEO.configura.locaplic = locaplic;
			i3GEO.configura.sid = sid;
		}
		i3GEO.php.aproxima(i3GEO.atualiza,i3GEO.navega.FATORZOOM);
	},
	/*
	Function: zoomout

	Afasta o mapa aplicando um fator de modifica&ccedil;&atilde;o da escala

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo
	*/
	zoomout: function(locaplic,sid){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomout()");}
		if(i3GEO.Interface.ATUAL === "openlayers"){
			i3geoOL.zoomOut();
			return;
		}
		if(sid){
			i3GEO.configura.locaplic = locaplic;
			i3GEO.configura.sid = sid;
		}
		i3GEO.php.afasta(i3GEO.atualiza,i3GEO.navega.FATORZOOM);
	},
	/*
	Function: zoomponto

	Centraliza o mapa em um ponto e acrescenta o ponto como uma nova camada no mapa

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo

	x {Numeric} - coordenada em d&eacute;cimos de grau da longitude

	y {Numeric} - coordenada em d&eacute;cimos de grau da latitude

	tamanho {Numeric} - opcional, tamanho do s&iacute;mbolo do ponto que ser&aacute; inserido no mapa

	simbolo {String} - opcional, nome do s&iacute;mbolo para o ponto

	cor {String} - opcional, cor em r g b (p.ex. "255 0 0")
	*/
	zoomponto: function(locaplic,sid,x,y,tamanho,simbolo,cor){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomponto()");}
		if(!simbolo)
		{simbolo = "ponto";}
		if(!tamanho)
		{tamanho = 15;}
		if(!cor)
		{cor = "255 0 0";}
		if(locaplic !== ""){i3GEO.configura.locaplic = locaplic;}
		if(sid !== ""){i3GEO.configura.sid = sid;}
		var f = "i3GEO.navega.timerNavega = null;"+
			"i3GEO.php.zoomponto(i3GEO.atualiza,"+x+","+y+","+tamanho+",'"+simbolo+"','"+cor+"');";
		if(i3GEO.navega.timerNavega !== undefined)
		{clearTimeout(i3GEO.navega.timerNavega);}
		i3GEO.navega.timerNavega = setTimeout(f,i3GEO.navega.TEMPONAVEGAR);
	},
	/*
	Function: zoompontoIMG

	Centraliza o mapa em um ponto de coordenadas medidas na imagem do mapa

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo

	x {Numeric} - coordenada x da imagem

	y {Numeric} - coordenada y da imagem
	*/
	zoompontoIMG: function(locaplic,sid,x,y){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoompontoIMG()");}
		if(locaplic !== "")
		{i3GEO.configura.locaplic = locaplic;}
		if(sid !== "")
		{i3GEO.configura.sid = sid;}
		i3GEO.php.pan(i3GEO.atualiza,'','',x,y);
	},
	/*
	Function: xy2xy

	Desloca o mapa de um ponto de coordenadas xy para um segundo ponto

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo

	xi {Numeric} - coordenada x inicial

	yi {Numeric} - coordenada y inicial

	xf {Numeric} - coordenada x final

	yf {Numeric} - coordenada y final

	ext {String} - extens&atilde;o geogr&aacute;fica do mapa

	tipoimagem {String} - tipo de imagem atual do mapa (sepia,nenhum,cinza)
	*/
	xy2xy: function(locaplic,sid,xi,yi,xf,yf,ext,tipoimagem){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.xy2xy()");}
		var disty,distx,ex,novoxi,novoxf,novoyf,nex;
		if(locaplic !== "")
		{i3GEO.configura.locaplic = locaplic;}
		if(sid !== "")
		{i3GEO.configura.sid = sid;}
		disty = (yi * -1) + yf;
		distx = (xi * -1) + xf;
		ex = ext.split(" ");
		novoxi = (ex[0] * 1) - distx;
		novoxf = (ex[2] * 1) - distx;
		novoyi = (ex[1] * 1) - disty;
		novoyf = (ex[3] * 1) - disty;
		if ((distx === 0)&&(disty === 0))
		{return false;}
		else{
			nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
			i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,tipoimagem,nex);
			return true;
		}
	},
	/*
	Function: localizaIP

	Localiza as coordenadas baseadas no n&uacute;mero IP do usu&aacute;rio.

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo

	funcao {Function} - fun&ccedil;&atilde;o que ser&aacute; executada ao concluir a chamada AJAX. Essa fun&ccedil;&atilde;o receber&aacute; o objeto JSON obtido.
	*/
	localizaIP: function(locaplic,sid,funcao){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.localizaIP()");}
		if(locaplic !== "")
		{i3GEO.configura.locaplic = locaplic;}
		if(sid !== "")
		{i3GEO.configura.sid = sid;}
		i3GEO.php.localizaIP(funcao);
	},
	/*
	Function: zoomIP

	Mostra no mapa um ponto baseado na localiza&ccedil;&atilde;o do usu&aacute;rio.

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo
	*/
	zoomIP: function(locaplic,sid){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomIP()");}
		try
		{
			if(arguments.length > 0){
				i3GEO.configura.locaplic = locaplic;
				i3GEO.configura.sid = sid;
			}
			var mostraIP = function(retorno)
			{
				if (retorno.data.latitude !== null)
				{i3GEO.navega.zoomponto(locaplic,sid,retorno.data.longitude,retorno.data.latitude);}
				else
				{i3GEO.janela.tempoMsg("Nao foi possivel identificar a localizacao.");}
			};
			i3GEO.navega.localizaIP(locaplic,sid,mostraIP);
		}
		catch(e){
			if(typeof(console) !== 'undefined'){console.error(e);}
		}
	},
	/*
	Function: zoomExt

	Aplica uma nova extens&atilde;o geogr&aacute;fica ao mapa.

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo

	tipoimagem {String} - Utlize "" para aplicar o default. Tipo de imagem que ser&aacute; retornada na imagem do mapa que ser&aacute; criada

	ext {String} - Extens&atilde;o geogr&aacute;fica no formato xmin ymin xmax ymax
	*/
	zoomExt: function(locaplic,sid,tipoimagem,ext){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomExt()");}
		//YAHOO.log("zoomExt", "i3geo");
		if(locaplic !== "")
		{i3GEO.configura.locaplic = locaplic;}
		if(sid !== "")
		{i3GEO.configura.sid = sid;}
		if(tipoimagem === "")
		{tipoimagem = "nenhum";}
		var f = "i3GEO.navega.timerNavega = null;"+
			"i3GEO.php.mudaext(i3GEO.atualiza,'"+tipoimagem+"','"+ext+"');";
		if(i3GEO.navega.timerNavega !== undefined)
		{clearTimeout(i3GEO.navega.timerNavega);}
		i3GEO.navega.timerNavega = setTimeout(f,i3GEO.navega.TEMPONAVEGAR);
	},
	/*
	Function: aplicaEscala

	Aplica ao mapa um novo valor de escala tendo como base o valor do denminador

	Utilize "" caso vc queira usar locaplic e sid default.

	Parametros:

	locaplic {String} - endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX. Pode ser ""

	sid {String} - c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo. pode ser ""

	escala {Numeric} - denominador da escala
	*/
	aplicaEscala: function(locaplic,sid,escala){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.aplicaEscala()");}
		//YAHOO.log("aplicaescala", "i3geo");
		if(i3GEO.Interface.ATUAL === "googlemaps"){
			i3GeoMap.setZoom(i3GEO.Interface.googlemaps.escala2nzoom(escala));
		}
		if(i3GEO.Interface.ATUAL === "openlayers"){
			i3geoOL.zoomToScale(escala,true);
		}
	},
	/*
	Function: panFixo

	Desloca o mapa para uma determinada dire&ccedil;&atilde;o com uma dist�ncia fixa.

	Parametros:

	locaplic {String} - (opcional) endere&ccedil;o do i3geo utilizado na gera&ccedil;&atilde;o da URL para fazer a chamada AJAX

	sid {String} - (opcional) c&oacute;digo da se&ccedil;&atilde;o aberta no servidor pelo i3geo

	direcao {String} - norte,sul,leste,oeste,sudeste,sudoeste,nordeste,noroeste

	w {Numeric} - largura da imagem do mapa em pixels

	h {Numeric} - altura da imagem do mapa em pixels

	escala {Numeric} - escala do mapa
	*/
	panFixo: function(locaplic,sid,direcao,w,h,escala){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.panFixo()");}
		//YAHOO.log("panfixo", "i3geo");
		var x = 0,y = 0,f;
		if(locaplic !== "")
		{i3GEO.configura.locaplic = locaplic;}
		if(sid !== "")
		{i3GEO.configura.sid = sid;}
		if(w === "")
		{w = i3GEO.parametros.w;}
		if(h === "")
		{h = i3GEO.parametros.h;}
		if(escala === "")
		{escala = i3GEO.parametros.mapscale;}
		switch(direcao)
		{
			case "norte":
				y = h / 6;
				x = w / 2;
				break;
			case "sul":
				y = h - (h / 6);
				x = w / 2;
				break;
			case "leste":
				x = w - (w / 6);
				y = h / 2;
				break;
			case "oeste":
				x = w / 6;
				y = h / 2;
				break;
			case "nordeste":
				y = h / 6;
				x = w - (w / 6);
				break;
			case "sudeste":
				y = h - (h / 6);
				x = w - (w / 6);
				break;
			case "noroeste":
				y = h / 6;
				x = w / 6;
				break;
			case "sudoeste":
				y = h - (h / 6);
				x = w / 6;
				break;
		}
		if(i3GEO.Interface.ATUAL === "openlayers"){
			i3geoOL.pan(x,y);
			return;
		}
		f = "i3GEO.navega.timerNavega = null;"+
			"i3GEO.php.pan(i3GEO.atualiza,"+escala+",'',"+x+","+y+");";
		try
		{clearTimeout(i3GEO.navega.timerNavega);}
		catch(e){
			if(typeof(console) !== 'undefined'){console.error(e);}
		}
		i3GEO.navega.timerNavega = setTimeout(f,i3GEO.navega.TEMPONAVEGAR);
	},
	/*
	Function: panFixoNorte

	Desloca o mapa para o norte
	*/
	panFixoNorte: function(){
		i3GEO.navega.panFixo('','','norte','','','');
	},
	/*
	Function: panFixoSul

	Desloca o mapa para o sul
	*/
	panFixoSul: function(){
		i3GEO.navega.panFixo('','','sul','','','');
	},
	/*
	Function: panFixoOeste

	Desloca o mapa para o oeste
	*/
	panFixoOeste: function(){
		i3GEO.navega.panFixo('','','oeste','','','');
	},
	/*
	Function: panFixoLeste

	Desloca o mapa para o leste
	*/
	panFixoLeste: function(){
		i3GEO.navega.panFixo('','','leste','','','');
	},
	/*
	Function: mostraRosaDosVentos

	Mostra sobre o mapa a rosa dos ventos.

	A rosa permite que o usu&aacute;rio navegue no mapa sem ter de alterar a op&ccedil;&atilde;o atual de navega&ccedil;&atilde;o.

	A rosa &eacute; mostrada apenas se a vari&aacute;vel i3GEO.configura.mostraRosaDosVentos for = a "sim".<b>

	Para que a rosa seja mostrada, &eacute; necess&aacute;rio que esta fun&ccedil;&atilde;o esteja registrada em

	i3GEO.eventos.MOUSEPARADO
	*/
	mostraRosaDosVentos: function(){
		var novoel,setas,i;
		try{
			if(i3GEO.configura.mostraRosaDosVentos === "nao")
			{return;}
			if(g_tipoacao === "area")
			{return;}
		}
		catch(e){
			if(typeof(console) !== 'undefined'){console.error(e);}
		}
		if(objposicaocursor.imgx < 10 || objposicaocursor.imgy < 10 || objposicaocursor.imgy > (i3GEO.parametros.h - 10))
		{return;}
		if (!$i("i3geo_rosa")){
			novoel = document.createElement("div");
			novoel.id = "i3geo_rosa";
			novoel.style.position="absolute";
			novoel.style.zIndex=5000;
			if(navn)
			{novoel.style.opacity=".7";}
			else
			{novoel.style.filter = "alpha(opacity=70)";}
			document.body.appendChild(novoel);
		}
		setas = "<table id='rosaV' >";
		setas += "<tr onclick=\"javascript:i3GEO.configura.mostraRosaDosVentos='nao'\"><td></td><td></td><td style=cursor:pointer >x</td></tr><tr>";
		setas += "<td><img class='rosanoroeste' title='noroeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','noroeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosanorte' title='norte' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','norte','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosanordeste' title='nordeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','nordeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr>";
		setas += "<tr><td><img class='rosaoeste' title='oeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','oeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><table><tr>";
		setas += "<td><img class='rosamais' title='aproxima' onclick=\"i3GEO.navega.zoomin('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"')\" src='"+$im("branco.gif")+"' </td>";
		setas += "<td><img class='rosamenos' title='afasta' onclick=\"i3GEO.navega.zoomout('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"')\" src='"+$im("branco.gif")+"' </td>";
		setas += "</tr></table></td>";
		setas += "<td><img class='rosaleste' title='leste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','leste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr>";
		setas += "<tr><td><img class='rosasudoeste' title='sudoeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sudoeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosasul' title='sul' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sul','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosasudeste' title='sudeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sudeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr></table>";
		i = $i("i3geo_rosa");
		i.innerHTML = setas;
		i.style.top = objposicaocursor.telay - 27 + "px";
		i.style.left = objposicaocursor.telax - 27 + "px";
		i.style.display="block";
		if($i("img")){
			YAHOO.util.Event.addListener(
				$i("img"),
				"mousemove",
				function(){
					var i = $i("i3geo_rosa");
					i.style.display="none";
					YAHOO.util.Event.removeListener(escondeRosa);
				}
			);
		}
		i3GEO.ajuda.mostraJanela('Clique nas pontas da rosa para navegar no mapa. Clique em x para parar de mostrar essa op&ccedil;&atilde;o.');
	},
	/*
	Classe: i3GEO.navega.autoRedesenho

	Controla o redesenho autom&aacute;tico do mapa por meio de um temporizador
	*/
	autoRedesenho: {
		/*
		Propriedade: INTERVALO

		Intervalo de tempo, em milisegundos, que ser&aacute; utilizado para disparar o desenho do mapa

		Tipo:
		{Integer}

		Default:
		{0}
		*/
		INTERVALO: 0,
		/*
		Variavel: ID

		Guarda o valor do ID do elemento HTML que receber&aacute; o contador de tempo

		Tipo:
		{String}
		*/
		ID: "tempoRedesenho",
		/*
		Function: ativa

		Ativa o auto-redesenho do mapa

		Parametros:

		id {String} - id do elemento onde o contador de tempo ser&aacute; mostrado no mapa. Por default, utiliza "tempoRedesenho".
		*/
		ativa: function(id){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.autoRedesenho.ativa()");}
			if(arguments.length === 0)
			{id = "tempoRedesenho";}
			i3GEO.navega.autoRedesenho.ID = id;
			if (($i(id)) && i3GEO.navega.autoRedesenho.INTERVALO > 0)
			{$i(id).style.display = "block";}
			if (i3GEO.navega.autoRedesenho.INTERVALO > 0)
			{i3GEO.navega.tempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.redesenha()',i3GEO.navega.autoRedesenho.INTERVALO);}
			if (($i(id)) && (i3GEO.navega.autoRedesenho.INTERVALO > 0)){
				$i(id).innerHTML = i3GEO.navega.autoRedesenho.INTERVALO/1000;
				i3GEO.navega.contaTempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.contagem()',1000);
			}
		},
		/*
		Function: desativa

		Desativa o auto-redesenho do mapa
		*/
		desativa:function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.autoRedesenho.desativa()");}
			i3GEO.navega.autoRedesenho.INTERVALO = 0;
			clearTimeout(i3GEO.navega.tempoRedesenho);
			clearTimeout(i3GEO.navega.contaTempoRedesenho);
			i3GEO.navega.tempoRedesenho = "";
			i3GEO.navega.contaTempoRedesenho = "";
			if ($i(i3GEO.navega.autoRedesenho.ID))
			{$i(i3GEO.navega.autoRedesenho.ID).style.display = "none";}
		},
		/*
		Function: redesenha

		Redesenha o mapa quando o contador de tempo chegar a zero
		*/
		redesenha: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.autoRedesenho.redesenha()");}
			clearTimeout(i3GEO.navega.tempoRedesenho);
			clearTimeout(i3GEO.navega.contaTempoRedesenho);
			switch(i3GEO.Interface.ATUAL)
			{
				case "openlayers":
					i3GEO.Interface.openlayers.atualizaMapa();
					break;
				case "googlemaps":
					i3GEO.Interface.googlemaps.redesenha();
					break;
				default:
					i3GEO.atualiza("");
			}
			i3GEO.navega.autoRedesenho.ativa(i3GEO.navega.autoRedesenho.ID);
		},
		/*
		Function: contagem

		Faz a contagem do tempo
		*/
		contagem: function(){
			if ($i(i3GEO.navega.autoRedesenho.ID))
			{$i(i3GEO.navega.autoRedesenho.ID).innerHTML = parseInt($i(i3GEO.navega.autoRedesenho.ID).innerHTML,10) - 1;}
			i3GEO.navega.contaTempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.contagem()',1000);
		}
	},
	/*
	Classe: i3GEO.navega.zoomBox

	Controla o desenho de um box na tela para executar o zoom por box
	*/
	zoomBox: {
		/*
		Function: inicia

		Marca o in&iacute;cio do desenho do box, capturando a posi&ccedil;&atilde;o do mouse
		*/
		inicia: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomBox.inicia()");}
			if(i3GEO.navega.timerNavega !== null)
			{return;}
			if(g_tipoacao !== 'zoomli')
			{return;}
			if(!$i("i3geoboxZoom"))
			{i3GEO.navega.zoomBox.criaBox();}
			var i = $i("i3geoboxZoom").style;
			i.width=0 + "px";
			i.height=0 + "px";
			i.visibility="visible";
			i.display="block";
			i.left = objposicaocursor.telax + "px";
			i.top = objposicaocursor.telay + "px";
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.zoomBox.desloca()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.zoomBox.desloca()");}
			if(i3GEO.eventos.MOUSEUP.toString().search("i3GEO.navega.zoomBox.termina()") < 0)
			{i3GEO.eventos.MOUSEUP.push("i3GEO.navega.zoomBox.termina()");}
		},
		/*
		Function: criaBox

		Cria o DIV que ser&aacute; utilizado para desenhar o box no mapa
		*/
		criaBox: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomBox.criaBox()");}
			if(i3GEO.navega.timerNavega !== null){return;}
			if(!$i("i3geoboxZoom")){
				var novoel;
				novoel = document.createElement("div");
				novoel.style.width = "0px";
				novoel.style.height = "0px";
				novoel.id = "i3geoboxZoom";
				novoel.style.display = "none";
				novoel.style.fontSize = "0px";
				if(navn)
				{novoel.style.opacity = 0.25;}
				novoel.style.backgroundColor = "gray";
				novoel.style.position="absolute";
				novoel.style.border = "2px solid #ff0000";
				if (navm)
				{novoel.style.filter = "alpha(opacity=25)";}
				novoel.onmousemove = function(){
					var b,wb,hb;
					b = $i("i3geoboxZoom").style;
					wb = parseInt(b.width,10);
					hb = parseInt(b.height,10);
					if (navm){
						if(wb > 2)
						{b.width = wb - 2 + "px";}
						if(hb > 2)
						{b.height = hb - 2 + "px";}
					}
					else{
						b.width = wb - 2 + "px";
						b.height = hb - 2 + "px";
					}
				};
				novoel.onmouseup = function()
				{i3GEO.navega.zoomBox.termina();};
				document.body.appendChild(novoel);
			}
		},
		/*
		Function: desloca

		Desloca o box conforme o mouse &eacute; movimentado
		*/
		desloca: function(){
			var bxs,ppx,py;
			if(i3GEO.navega.timerNavega !== null)
			{return;}
			if(g_tipoacao !== 'zoomli')
			{return;}
			bxs = $i("i3geoboxZoom").style;
			if(bxs.display !== "block")
			{return;}
			ppx = objposicaocursor.telax;
			py = objposicaocursor.telay;
			if (navm){
				if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
				{bxs.width = ppx - boxxini - 2 + "px";}
				if ((py > boxyini) && ((py - boxyini - 2) > 0))
				{bxs.height = py - boxyini - 2 + "px";}
				if (ppx < boxxini)
				{bxs.left = ppx;bxs.width = boxxini - ppx + 2 + "px";}
				if (py < boxyini)
				{bxs.top = py;bxs.height = boxyini - py + 2 + "px";}
			}
			else{
				if (ppx > boxxini)
				{bxs.width = ppx - boxxini + "px";}
				if (py > boxyini)
				{bxs.height = py - boxyini + "px";}
				if (ppx < boxxini)
				{bxs.left = ppx + "px";bxs.width = boxxini - ppx + "px";}
				if (py < boxyini)
				{bxs.top = py + "px";bxs.height = boxyini - py + "px";}
			}
		},
		/*
		Function: termina

		Para o desenho do box, captura seu tamanho e faz o zoom no mapa
		*/
		termina: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.zoomBox.termina()");}
			var valor,v,x1,y1,x2,y2,f,
				limpa = function(){};
			if(g_tipoacao !== 'zoomli'){
				i3GEO.eventos.MOUSEDOWN.remove("i3GEO.navega.zoomBox.inicia()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.navega.zoomBox.termina()");
				return;
			}
			try{
				if(i3GEO.navega.timerNavega !== null)
				{return;}
				valor = i3GEO.calculo.rect2ext("i3geoboxZoom",i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
				v = valor[0];
				x1 = valor[1];
				y1 = valor[2];
				x2 = valor[3];
				y2 = valor[4];
				limpa = function(){
					var bxs = $i("i3geoboxZoom");
					if(bxs){
						bxs.style.display="none";
						bxs.style.visibility="hidden";
						bxs.style.width = 0 + "px";
						bxs.style.height = 0 + "px";
					}
				};
				if((x1 === x2) || (y1 === y2))
				{limpa.call();return;}
				// se o retangulo for negativo pula essa parte para n� gerar erro
				i3GEO.parametros.mapexten=v;
				limpa.call();
				i3GEO.eventos.MOUSEMOVE.remove("i3GEO.navega.zoomBox.desloca()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.navega.zoomBox.termina()");
				if(i3GEO.Interface.ATUAL === "googlemaps"){
					i3GEO.Interface.googlemaps.zoom2extent(v);
					return;
				}

				f = "i3GEO.navega.timerNavega = null;i3GEO.navega.zoomExt('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','"+i3GEO.configura.tipoimagem+"','"+v+"')";
				if(i3GEO.navega.timerNavega !== undefined)
				{clearTimeout(i3GEO.navega.timerNavega);}
				i3GEO.navega.timerNavega = setTimeout(f,i3GEO.navega.TEMPONAVEGAR);
			}
			catch(e){limpa.call();return;}
		}
	},
	/*
	Classe: i3GEO.navega.lente

	Ativa e controla a lente de aumento.

	A lente de aumento &eacute; um box que pode ser ativado sobre o mapa
	mostrando uma imagem ampliada da regi&atilde;o onde est&aacute; o mouse
	*/
	lente:{
		/*
		Propriedade: POSICAOX

		Define a posi&ccedil;&atilde;o em x da lente em rela&ccedil;&atilde;o ao corpo do mapa

		Tipo:
		{numeric}

		Default:
		{0}
		*/
		POSICAOX: 0,
		/*
		Propriedade: POSICAOY

		Define a posi&ccedil;&atilde;o em y da lente em rela&ccedil;&atilde;o ao corpo do mapa

		Tipo:
		{numeric}

		Default:
		{0}
		*/
		POSICAOY:0,
		/*
		Variavel: ESTAATIVA

		Indica se a lente foi ou n&atilde;o aberta
		*/
		ESTAATIVA: "nao",
		/*
		Function: inicia

		Ativa a lente de aumento criando os elementos gr&aacute;ficos
		necess&aacute;rios e ativando os eventos que controlam a apresenta&ccedil;&atilde;o
		da lente
		*/
		inicia: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.lente.inicia()");}
			//insere lente de aumento
			var novoel,novoimg,temp;
			if (!$i("lente")){
				novoel = document.createElement("div");
				novoel.id = 'lente';
				novoel.style.clip='rect(0px,0px,0px,0px)';
				novoimg = document.createElement("img");
				novoimg.src="";
				novoimg.id='lenteimg';
				novoel.appendChild(novoimg);
				document.body.appendChild(novoel);
				novoel = document.createElement("div");
				novoel.id = 'boxlente';
				document.body.appendChild(novoel);
			}
			temp = $i('boxlente').style;
			temp.borderWidth = '1';
			temp.borderColor = "red";
			temp.display = "block";
			$i("lente").style.display = "block";
			i3GEO.navega.lente.ESTAATIVA = "sim";
			i3GEO.navega.lente.atualiza();
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.navega.lente.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.navega.lente.atualiza()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.lente.movimenta()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.lente.movimenta()");}
		},
		/*
		Function: atualiza

		Atualiza a imagem da lente aberta
		*/
		atualiza: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.lente.atualiza()");}
			var temp = function(retorno){
				try{
					var pos,volta,nimg,olente,oboxlente,olenteimg;
					retorno = retorno.data;
					if (retorno === "erro")
					{i3GEO.janela.tempoMsg("A lente nao pode ser criada");return;}
					volta = retorno.split(",");
					nimg = volta[2];
					olente = $i('lente');
					oboxlente = $i('boxlente');
					olenteimg = $i('lenteimg');
					olenteimg.src = nimg;
					olenteimg.style.width=volta[0] * 1.5 +"px";
					olenteimg.style.height=volta[1] * 1.5 +"px";
					olente.style.zIndex=1000;
					olenteimg.style.zIndex=1000;
					oboxlente.style.zIndex=1000;
					pos = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDMAPA));
					olente.style.left = pos[0] + i3GEO.navega.lente.POSICAOX + "px";
					olente.style.top = pos[1] + i3GEO.navega.lente.POSICAOY + "px";
					oboxlente.style.left = pos[0] + i3GEO.navega.lente.POSICAOX + "px";
					oboxlente.style.top = pos[1] + i3GEO.navega.lente.POSICAOY + "px";
					oboxlente.style.display='block';
					oboxlente.style.visibility='visible';
					olente.style.display='block';
					olente.style.visibility='visible';
					i3GEO.janela.fechaAguarde("ajaxabrelente");
				}
				catch(e){
					i3GEO.janela.fechaAguarde();
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
			};
			if(i3GEO.navega.lente.ESTAATIVA === "sim"){
				i3GEO.php.aplicaResolucao(temp,1.5);
			}
			else{
				i3GEO.navega.lente.desativa();
			}
		},
		/*
		Function: desativa

		Desativa alente aberta
		*/
		desativa: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.lente.desativa()");}
			$i("lente").style.display = "none";
			$i("boxlente").style.display = "none";
			$i('boxlente').style.borderWidth = 0;
			i3GEO.navega.lente.ESTAATIVA = "nao";
			i3GEO.eventos.MOUSEMOVE.remove("i3GEO.navega.lente.movimenta()");
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.navega.lente.atualiza()");
		},
		/*
		Function: movimenta

		Movimenta a imagem dentro da lente para refletir a posi&ccedil;&atilde;o do mouse
		*/
		movimenta: function(){
			try{
				if(i3GEO.navega.lente.ESTAATIVA === "sim"){
					var pos = [0,0],
						esq,topo,clipt,i;
					if ($i("lente").style.visibility === "visible")
					{pos = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDMAPA));}
					esq = (objposicaocursor.telax - pos[0]) * 2.25;
					topo = (objposicaocursor.telay - pos[1]) * 2.25;
					clipt = "rect("+ (topo - 120) + "px " + (esq + 120) + "px " + (topo + 120) + "px " + (esq - 120) +"px)";
					i = $i("lente").style;
					i.clip = clipt;
					i.top = pos[1] - (topo - 120) + "px";
					i.left = pos[0] - (esq - 120) + "px";
					//eval("i." + g_tipotop + "= (pos[1] - (topo - 40))");
					//eval("i." + g_tipoleft +  "= (pos[0] - (esq - 40)");
				}
			}
			catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
			}
		}
	},
	/*
	Classe: i3GEO.navega.destacaTema

	Destaca um tema mostrando-o sobre os outros em um box que segue o mouse
	*/
	destacaTema:{
		/*
		Propriedade: TAMANHO

		Tamanho do box

		Tipo:
		{Integer}

		Default:
		{75}
		*/
		TAMANHO: 75,
		/*
		Indica se o destaque est&aacute; ou n&atilde;o ativo

		Tipo:
		{sim|nao}
		*/
		ESTAATIVO: "nao",
		/*
		Tema que est&aacute; sendo destacado

		Tipo:
		{C&oacute;digo do tema}
		*/
		TEMA: "",
		/*
		Function: inicia

		Inicia o destaque de um tema

		Parametros:

		tema {String} - c&oacute;digo do tema
		*/
		inicia: function(tema){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.destacaTema.inicia()");}
			var novoel,novoeli,janela,pos;
			if (!$i("img_d")){
				pos = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDMAPA));
				novoel = document.createElement("div");
				novoel.id = "div_d";
				novoel.style.zIndex = 5000;
				document.body.appendChild(novoel);
				$i("div_d").innerHTML = "<input style='position:relative;top:0px;left:0px'' type=image src='' id='img_d' />";
				$i("div_d").style.left = parseInt(pos[0],10) + "px";
				$i("div_d").style.top = parseInt(pos[1],10) + "px";
				$i("img_d").style.left = 0 + "px";
				$i("img_d").style.top = 0 + "px";
				$i("img_d").style.width = i3GEO.parametros.w + "px";
				$i("img_d").style.height = i3GEO.parametros.h + "px";
				$i("div_d").style.clip = 'rect(0 75 75 0)';
				novoeli = document.createElement("div");
				novoeli.id = "div_di";
				novoel.appendChild(novoeli);
				$i("div_di").innerHTML = "<p style='position:absolute;top:0px;left:0px'>+-</p>";
			}
			i3GEO.navega.destacaTema.TEMA = tema;
			i3GEO.navega.destacaTema.ESTAATIVO = "sim";
			i3GEO.navega.destacaTema.atualiza();
			janela = i3GEO.janela.cria(160,0,"","center","center",$trad("x50")+"&nbsp;&nbsp;","ativadesativaDestaque");
			YAHOO.util.Event.addListener(janela[0].close, "click", i3GEO.navega.destacaTema.desativa);
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.navega.destacaTema.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.navega.destacaTema.atualiza()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.destacaTema.movimenta()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.destacaTema.movimenta()");}
		},
		/*
		Function: atualiza

		Atualiza o destaque

		&Eacute; definido para o evento de navega&ccedil;&atilde;o do mapa
		*/
		atualiza: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.destacaTema.atualiza()");}
			if(i3GEO.navega.destacaTema.ESTAATIVO === "nao")
			{return;}
			var temp = function(retorno){
				var m,novoel;
				retorno = retorno.data;
				m = new Image();
				m.src = retorno;
				$i("div_d").innerHTML = "";
				$i("div_d").style.display="block";
				novoel = document.createElement("input");
				novoel.id = "img_d";
				novoel.style.position = "relative";
				novoel.style.top = "0px";
				novoel.style.left = "0px";
				novoel.type = "image";
				novoel.src = m.src;
				novoel.style.display = "block";
				$i("div_d").appendChild(novoel);
				i3GEO.janela.fechaAguarde("ajaxdestaca");
			};
			i3GEO.php.geradestaque(temp,i3GEO.navega.destacaTema.TEMA,i3GEO.parametros.mapexten);
		},
		/*
		Function: desativa

		Desativa o destaque
		*/
		desativa: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.destacaTema.desativa()");}
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.navega.destacaTema.atualiza()");
			i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.destacaTema.movimenta()");
			i3GEO.navega.destacaTema.ESTAATIVO = "nao";
			document.body.removeChild($i("div_d"));
		},
		/*
		Function: movimenta

		Movimenta o destaque conforme o mouse move

		&Eacute; definido para o evento de deslocamento do mouse
		*/
		movimenta: function(){
			if(i3GEO.navega.destacaTema.ESTAATIVO === "sim")
			{$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - i3GEO.navega.destacaTema.TAMANHO)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - i3GEO.navega.destacaTema.TAMANHO)+')';}
		}
	},
	/*
	Classe: i3GEO.navega.barraDeZoom

	Controla a barra (slide) de zoom
	*/
	barraDeZoom: {
		/*
		Function: cria

		Cria os elementos HTML para a barra de zoom

		Return:
		{string} - c&oacute;digo html
		*/
		cria: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.barraDeZoom.cria()");}
			var temp = "",estilo;
			if (navn)
			{temp += '<div style="text-align:center;position:relative;left:9px" >';}
			estilo = "top:4px;";
			if(navm)
			{estilo = "top:4px;left:-2px;";}
			temp += '<div id="vertMaisZoom" style="'+estilo+'"></div><div id="vertBGDiv" name="vertBGDiv" tabindex="0" x2:role="role:slider" state:valuenow="0" state:valuemin="0" state:valuemax="200" title="Zoom" >';
			temp += '<div id="vertHandleDivZoom" ><img alt="" class="slider" src="'+i3GEO.util.$im("branco.gif")+'" /></div></div>';
			if(navm)
			{temp += '<div id=vertMenosZoom style="left:-1px;" ></div>';}
			else
			{temp += '<div id=vertMenosZoom ></div>';}
			if (navn){temp += '</div>';}
			return temp;
		},
		/*
		Function: ativa

		Ativa os bot&otilde;es da barra de zoom
		*/
		ativa: function(){
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.barraDeZoom.ativa()");}
			var temp;
			$i("vertMaisZoom").onmouseover = function(){
				i3GEO.ajuda.mostraJanela('Amplia o mapa mantendo o centro atual.');
			};
			$i("vertMaisZoom").onclick = function(){
				if (!$i("imgtemp")){
					$i("vertHandleDivZoom").onmousedown.call();
					g_fatordezoom = 0;
					$i("vertHandleDivZoom").onmousemove.call();
					g_fatordezoom = -1;
				}
				$i("vertHandleDivZoom").onmousemove.call();
				i3GEO.barraDeBotoes.BOTAOCLICADO = 'zoomin';
				try{
					clearTimeout(i3GEO.navega.timerNavega);
				}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
				i3GEO.navega.timerNavega = setTimeout("$i('vertBGDiv').onmouseup.call();",i3GEO.navega.TEMPONAVEGAR);
				if(g_fatordezoom < -6){
					$i("vertBGDiv").onmouseup.call();
				}
			};
			$i("vertMenosZoom").onmouseover = function(){
				i3GEO.ajuda.mostraJanela('Reduz o mapa mantendo o centro atual.');
			};
			$i("vertMenosZoom").onclick = function(){
				if (!$i("imgtemp")){
					$i("vertHandleDivZoom").onmousedown.call();
					g_fatordezoom = 0;
					$i("vertHandleDivZoom").onmousemove.call();
					g_fatordezoom = 1;
				}
				$i("vertHandleDivZoom").onmousemove.call();
				i3GEO.barraDeBotoes.BOTAOCLICADO = 'zoomout';
				try{
					clearTimeout(i3GEO.navega.timerNavega);
				}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
				i3GEO.navega.timerNavega = setTimeout("$i('vertBGDiv').onmouseup.call();",i3GEO.navega.TEMPONAVEGAR);
				if(g_fatordezoom > 6){
					$i("vertBGDiv").onmouseup.call();
				}
			};
			verticalSlider = YAHOO.widget.Slider.getVertSlider("vertBGDiv","vertHandleDivZoom", 0, 70);
			verticalSlider.onChange = function(offsetFromStart)
			{g_fatordezoom = (offsetFromStart - 35) / 5;};
			verticalSlider.setValue(35,true);
			if($i("vertBGDiv")){
				$i("vertBGDiv").onmouseup = function(){
					verticalSlider.setValue(35,true);
					if(g_fatordezoom !== 0){
						temp = i3GEO.navega.TEMPONAVEGAR;
						i3GEO.navega.TEMPONAVEGAR = 0;
						i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,i3geo_ns);
						i3GEO.navega.TEMPONAVEGAR = temp;
					}
					g_fatordezoom = 0;
				};
			}
			if($i("vertHandleDivZoom")){
				$i("vertHandleDivZoom").onmousedown = function(){
					var iclone,corpo;
					$i("vertHandleDivZoom").onmouseout = function(e){
						if (!e) {e = window.event;}
						if (g_fatordezoom !== 0)
						{$i("vertBGDiv").onmouseup.call();}
						e.onmouseup.returnValue = false;
						e.onmouseout.returnValue = false;
					};
					i3GEO.barraDeBotoes.BOTAOCLICADO='slidezoom';
					if (!$i("imgtemp")){
						iclone=document.createElement('IMG');
						iclone.style.position = "absolute";
						iclone.id = "imgtemp";
						iclone.style.border="1px solid blue";
						$i("img").parentNode.appendChild(iclone);
						iclone = $i("imgtemp");
						corpo = $i("img");
						if(!corpo)
						{return;}
						iclone.src = corpo.src;
						iclone.style.width = i3GEO.parametros.w + "px";
						iclone.style.height = i3GEO.parametros.h + "px";
						iclone.style.top = corpo.style.top + "px";
						iclone.style.left = corpo.style.left + "px";
						$i("img").style.display = "none";
						iclone.style.display = "block";
					}
				};
			}
			if($i("vertHandleDivZoom")){
				$i("vertHandleDivZoom").onmousemove = function(){
					try{
						var iclone,corpo,nt,nl,velhoh,velhow,
							nh = 0,nw = 0,
							t,l,fatorEscala;
						iclone = $i("imgtemp");
						corpo = $i("img");
						if(!corpo)
						{return;}
						nt = 0;
						nl = 0;
						i3geo_ns = parseInt(i3GEO.parametros.mapscale,10);
						if ((g_fatordezoom > 0) && (g_fatordezoom < 7)){
							g_fatordezoom = g_fatordezoom + 1;
							velhoh = i3GEO.parametros.h;
							velhow = i3GEO.parametros.w;
							nh = velhoh / g_fatordezoom;
							nw = velhow / g_fatordezoom;
							t = parseInt(corpo.style.top,10);
							l = parseInt(corpo.style.left,10);
							nt = t + ((velhoh - nh) * 0.5);
							nl = l + ((velhow - nw) * 0.5);
							fatorEscala = nh/i3GEO.parametros.h;
							i3geo_ns=parseInt(i3GEO.parametros.mapscale / fatorEscala,10);
						}
						if ((g_fatordezoom < 0) && (g_fatordezoom > -7)){
							g_fatordezoom = g_fatordezoom - 1;
							velhoh = i3GEO.parametros.h;
							velhow = i3GEO.parametros.w;
							nh = velhoh * g_fatordezoom * -1;
							nw = velhow * g_fatordezoom * -1;
							t = parseInt(corpo.style.top,10);
							l = parseInt(corpo.style.left,10);
							nt = t - ((nh - velhoh) * 0.5);
							nl = l - ((nw - velhow) * 0.5);
							fatorEscala = nh/i3GEO.parametros.h;
							i3geo_ns=parseInt(i3GEO.parametros.mapscale / fatorEscala,10);
						}
						if(iclone){
							iclone.style.width = nw + "px";
							iclone.style.height = nh + "px";
							if (iclone.style.pixelTop)
							{iclone.style.pixelTop=nt;}
							else
							{iclone.style.top=nt+"px";}
							if (iclone.style.pixelLeft)
							{iclone.style.pixelLeft=nl;}
							else
							{iclone.style.left=nl+"px";}
						}

						if ($i("i3geo_escalanum"))
						{$i("i3geo_escalanum").value=i3geo_ns;}
					}
					catch(e){
						if(typeof(console) !== 'undefined'){console.error(e);}
					}
				};
			}
		}
	},
	/*
	Classe: i3GEO.navega.dialogo

	Abre as telas de di&aacute;logo das op&ccedil;&otilde;es de navega&ccedil;&atilde;o no mapa atual
	*/
	dialogo:{
		/*
		Function: wiki

		Abre a janela de di&aacute;logo da ferramenta wiki permitindo a navega&ccedil;&atilde;o integrada com a Wikip&eacute;dia
		*/
		wiki: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.navega.dialogo.wiki()","wiki","wiki");
		},
		/*
		Function: metar

		Abre a janela de di&aacute;logo da ferramenta metar permitindo a navega&ccedil;&atilde;o integrada com a rede de dados meteorol&oacute;gicos
		*/
		metar: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.navega.dialogo.metar()","metar","metar");
		},
		/*
		Function: buscaFotos

		Abre a janela de di&aacute;logo da ferramenta metar permitindo a navega&ccedil;&atilde;o integrada com servi&ccedil;os de armazenamento de fotografias
		*/
		buscaFotos: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.navega.dialogo.buscaFotos()","buscafotos","buscaFotos");
		},
		/*
		Function: google

		Abre a janela de di&aacute;logo da ferramenta google permitindo a navega&ccedil;&atilde;o integrada com o GoogleMaps

		Parametros:

		coordenadas {array} - array com os pares de coordenadas x,y que ser&atilde;o adicionados ao mapa do google (opcional)
		*/
		google: function(coordenadas){
			i3GEO.navega.dialogo.google.coordenadas = coordenadas;
			if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.dialogo.google()");}
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizagoogle()") > 0)
			{i3GEO.eventos.NAVEGAMAPA.remove("atualizagoogle()");}
			i3GEO.util.criaBox();
			g_operacao = "navega";
			var idgoogle = "googlemaps"+Math.random();
			i3GEO.janela.cria((i3GEO.parametros.w/2)+25+"px",(i3GEO.parametros.h/2)+18+"px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=7&idajuda=68' >&nbsp;&nbsp;&nbsp;</a>",idgoogle);
			atualizagoogle = function(){
				try{
					parent.frames[idgoogle+"i"].panTogoogle();
				}
				catch(e){
					i3GEO.eventos.NAVEGAMAPA.remove("atualizagoogle()");
				}
			};
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizagoogle()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizagoogle()");}
		},
		/*
		Function: confluence

		Abre a janela de di&aacute;logo da ferramenta confluence permitindo a navega&ccedil;&atilde;o integrada com a localiza&ccedil;&atilde;o de conflu&ecirc;ncias
		*/
		confluence: function(){
			i3GEO.util.dialogoFerramenta("i3GEO.navega.dialogo.confluence()","confluence","confluence");
		}
	}
};
//YAHOO.log("carregou classe navega", "Classes i3geo");
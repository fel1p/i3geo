// incluir balao de informacoes como um elemento grafico de desenho
// incluir caixas de texto
// incluir undo na edicao

/*
Title: Editor vetorial para OpenLayers

i3GEO.editorOL

Fun&ccedil;&otilde;es utilizadas pelo OpenLayers nas op&ccedil;&otilde;es de edi&ccedil;&atilde;o de dados vetoriais.
&Eacute; utilizado tamb&eacute;m pelo mashup com navega&ccedil;&atilde;o via OpenLayers e com OSM.

Para adicionar novos botoes, modifique tamb&eacute;m i3GEO.editorOL.botoes existente em i3GEO.barraDeBotoes.openlayers.ativaPainel

Mesmo em interfaces de debug, esse javascript s&oacute; &eacute; carregado depois de cmpactado

Arquivo: i3geo/classesjs/classe_editorol.js

Licen&ccedil;a:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUACAtilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/


if(!i3GEO || typeof(i3GEO) === 'undefined'){
	var i3GEO = {
	};
	i3GEO.Interface = {};
	navn = false;
	navm = false;
	$i = function(id){
		return document.getElementById(id);
	};
	app = navigator.appName.substring(0,1);
	if (app==='N'){
		navn=true;
	}
	else{
		navm=true;
	}
	OpenLayers.ImgPath = "../pacotes/openlayers/img/";
	OpenLayers.Lang.setCode("pt-BR");
}
i3GEO.editorOL = {
	layerDefault: "",
	simbologia: {
		opacidade: 0.8,
		texto: "",
		fillColor: "250,180,15",
		strokeWidth: 2,
		strokeColor: "250,150,0",
		pointRadius: 4,
		graphicName: "square",
		fontSize: "12px",
		fontColor: "0,0,0",
		externalGraphic: "",
		graphicHeight: 25,
		graphicWidth: 25
	},
	backup: new OpenLayers.Layer.Vector("Backup",{displayInLayerSwitcher:false,visibility:false}),
	nomeFuncaoSalvar: "i3GEO.editorOL.salvaGeo()",
	e_oce: new OpenLayers.Layer.ArcGIS93Rest(
		"ESRI Ocean Basemap",
		"http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/export",
		{format:"jpeg"},
		{
			isBaseLayer:true,
			visibility:false,
			attribution: 'Tiles &copy; <a href="http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer">ArcGIS</a>'
		}
	),
	e_ims: new OpenLayers.Layer.ArcGIS93Rest(
		"ESRI Imagery World 2D",
		"http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/export",
		{format:"jpeg"},
		{
			isBaseLayer:true,
			visibility:false,
			attribution : 'Tiles &copy; <a href="http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer">ArcGIS</a>'
		}
	),
	e_wsm: new OpenLayers.Layer.ArcGIS93Rest(
		"ESRI World Street Map",
		"http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer/export",
		{format:"jpeg"},
		{
			isBaseLayer:true,
			visibility:false,
			attribution : 'Tiles &copy; <a href="http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer">ArcGIS</a>'
		}
	),
	ol_mma: new OpenLayers.Layer.WMS(
		"Base cartogr&aacute;fica",
		"http://mapas.mma.gov.br/cgi-bin/mapserv?map=/opt/www/html/webservices/baseraster.map&",
		{layers:'baseraster',SRS:'EPSG:4618',FORMAT:'image/png'},
		{singleTile:false}
	),
	top_wms: new OpenLayers.Layer.WMS(
		"Topon&iacute;mia MMA",
		"http://mapas.mma.gov.br/cgi-bin/mapserv?map=/opt/www/html/webservices/baseref.map&",
		{layers: "base",FORMAT:'image/png'}
	),
	est_wms: new OpenLayers.Layer.WMS(
		"Estados do Brasil",
		"http://mapas.mma.gov.br/i3geo/ogc.php?tema=estadosl&",
		{layers: "estadosl",FORMAT:'image/png'}
	),
	osm: new OpenLayers.Layer.OSM("OSM",
		"http://tile.openstreetmap.org/${z}/${x}/${y}.png", {
			isBaseLayer : true,
			visibility : false
		}
	),
	fundo: "e_ims,e_wsm,ol_mma,ol_wms,top_wms,est_wms,e_oce",
	kml: [],
	layersIniciais: [],
	botoes: {
		'imprimir': true,
		'grid': true,
		'pan':true,
		'zoombox':true,
		'zoomtot':true,
		'zoomin': true,
		'zoomout': true,
		'distancia':true,
		'area':true,
		'identifica':true,
		'linha':true,
		'ponto':true,
		'poligono':true,
		'texto':true,
		'edita':true,
		'listag':true,
		'corta': true,
		'apaga':true,
		'procura':true,
		'selecao':true,
		'selecaotudo':true,
		'salva':true,
		'ajuda':true,
		'propriedades':true,
		'fecha':false,
		'tools':true,
		'undo':false,
		'frente':false,
		'legenda':true,
		'rodadomouse':true,
		'novaaba':false
	},
	pontos: [],
	marca: "../pacotes/openlayers/img/marker-gold.png",
	controles: [
		new OpenLayers.Control.Navigation(),
		new OpenLayers.Control.PanZoomBar(),
		new OpenLayers.Control.LayerSwitcher({'ascending':false}),
		new OpenLayers.Control.ScaleLine(),
		new OpenLayers.Control.MousePosition({'separator':' '}),
		new OpenLayers.Control.OverviewMap(),
		new OpenLayers.Control.KeyboardDefaults(),
		new OpenLayers.Control.Attribution()
	],
	gridProperties: {"autoActivate": false,"intervals": [60,40,20,10,2,1],"targetSize":600},
	tiles: true,
	incluilayergrafico: true,
	ativalayerswitcher: false,
	ativarodadomouse: true,
	legendahtml: false,
	numzoom: 12,
	minresolution: 0.703125,
	maxext: "",
	mapext: new OpenLayers.Bounds(-76.5125927,-39.3925675209,-29.5851853,9.49014852081),
	mapa: "",
	inicia: function(){
		//ativabotoes e boolean
		var alayers = [],
			fundo = (i3GEO.editorOL.fundo).split(","),
			nfundo = fundo.length,
			ncontroles = i3GEO.editorOL.controles.length,
			i,
			n,
			temp;
		//if(i3GEO.editorOL.tiles === false || i3GEO.editorOL.tiles === "false"){
		//	single = true;
		//}
		if(i3GEO.editorOL.ativalayerswitcher === "false"){
			i3GEO.editorOL.ativalayerswitcher = false;
		}
		if(i3GEO.editorOL.ativalayerswitcher === "true"){
			i3GEO.editorOL.ativalayerswitcher = true;
		}
		if(i3GEO.editorOL.ativarodadomouse === "false"){
			i3GEO.editorOL.ativarodadomouse = false;
		}
		if(i3GEO.editorOL.ativarodadomouse === "true"){
			i3GEO.editorOL.ativarodadomouse = true;
		}
		if(i3GEO.editorOL.legendahtml === "false"){
			i3GEO.editorOL.legendahtml = false;
		}
		if(i3GEO.editorOL.legendahtml === "true"){
			i3GEO.editorOL.legendahtml = true;
		}

		if(i3GEO.editorOL.incluilayergrafico === "false"){
			i3GEO.editorOL.incluilayergrafico = false;
		}
		if(i3GEO.editorOL.incluilayergrafico === "true"){
			i3GEO.editorOL.incluilayergrafico = true;
		}
		if(i3GEO.editorOL.incluilayergrafico === true){
			if(!i3GEO.desenho.layergrafico){
				i3GEO.editorOL.criaLayerGrafico();
			}
		}
		else{
			i3GEO.desenho.layergrafico = "";
			i3GEO.editorOL.botoes.linha=false;
			i3GEO.editorOL.botoes.ponto=false;
			i3GEO.editorOL.botoes.poligono=false;
			i3GEO.editorOL.botoes.texto=false;
			i3GEO.editorOL.botoes.edita=false;
			i3GEO.editorOL.botoes.listag=false;
			i3GEO.editorOL.botoes.corta= false;
			i3GEO.editorOL.botoes.apaga=false;
			i3GEO.editorOL.botoes.selecao=false;
			i3GEO.editorOL.botoes.selecaotudo=false;
			i3GEO.editorOL.botoes.salva=false;
			i3GEO.editorOL.botoes.propriedades=false;
			i3GEO.editorOL.botoes.fecha=false;
			i3GEO.editorOL.botoes.tools=false;
			i3GEO.editorOL.botoes.undo=false;
			i3GEO.editorOL.botoes.frente=false;
			i3GEO.editorOL.botoes.novaaba=false;
		}
		if(i3GEO.editorOL.mapa === ""){
			alert("O objeto i3GEO.editorOL.mapa nao existe. Precisa ser criado com new OpenLayers.Map()");
			return;
		}
		for(i=0;i<ncontroles;i++){
			i3GEO.editorOL.mapa.addControl(i3GEO.editorOL.controles[i]);
		}
		if(i3GEO.editorOL.fundo != ""){
			for(i=nfundo-1;i>=0;i--){
				if(fundo[i] != ""){
					try{
						i3GEO.editorOL[fundo[i]].transitionEffect = 'resize';
						i3GEO.editorOL[fundo[i]].setVisibility(false);
						i3GEO.editorOL[fundo[i]].singleTile = false;
						alayers.push(i3GEO.editorOL[fundo[i]]);
					}
					catch(e){
						if(alayers[0])
						{alayers[0].setVisibility(true);}
					}
				}
			}
		}
		i3GEO.editorOL.mapa.addLayers(alayers);
		if(i3GEO.editorOL.layersIniciais !== ""){
			n = i3GEO.editorOL.layersIniciais.length;
			for(i=0;i<n;i++){
				//singleTile deve ser definido em cada layer
				//i3GEO.editorOL.layersIniciais[i].singleTile = single;
				i3GEO.editorOL.mapa.addLayer(i3GEO.editorOL.layersIniciais[i]);
			}
		}
		if(!i3GEO.desenho.layergrafico && i3GEO.editorOL.incluilayergrafico === true){
			i3GEO.editorOL.mapa.addLayers([i3GEO.desenho.layergrafico]);
		}
		i3GEO.editorOL.adicionaKml();
		i3GEO.editorOL.adicionaMarcas();

		i3GEO.editorOL.coordenadas();
		i3GEO.editorOL.criaJanelaBusca();
		i3GEO.editorOL.criaBotoes(i3GEO.editorOL.botoes);
		if(i3GEO.editorOL.ativalayerswitcher === true)
		{i3GEO.editorOL.ativaLayerSwitcher();}
		if(i3GEO.editorOL.ativarodadomouse === false)
		{i3GEO.editorOL.desativaRodaDoMouse();}

		if(i3GEO.editorOL.numzoom !== ""){
			i3GEO.editorOL.mapa.setOptions({
				numZoomLevels: i3GEO.editorOL.numzoom
			});
		}
		if(i3GEO.editorOL.maxext !== ""){
			i3GEO.editorOL.mapa.setOptions({
				maxExtent: i3GEO.editorOL.maxext
			});
		}
		if(i3GEO.editorOL.mapext != ""){
			var m = i3GEO.util.extGeo2OSM(i3GEO.editorOL.mapext);
			i3GEO.editorOL.mapa.zoomToExtent(m);
		}
		else{
			i3GEO.editorOL.mapa.zoomToMaxExtent();
		}
		i3GEO.editorOL.sobeLayersGraficos();
		//evita que botoes de opcoes propaguem
		//o mashup utiliza esse tipo de botal junto ao nome do layer
		temp = i3GEO.editorOL.pegaControle("OpenLayers.Control.LayerSwitcher");
		if(temp){
			temp = temp.dataLayersDiv.getElementsByTagName("label");
			n = temp.length;
			for(i = 0; i < n; i++){
				//YAHOO.util.Event.addListener(temp[i], "click", YAHOO.util.Event.stopEvent);
				temp[i].onclick = "";
			}
		}
	},
	criaLayerGrafico: function(){
		i3GEO.desenho.openlayers.criaLayerGrafico();
	},
	layersLigados: function(){
		var layers = i3GEO.editorOL.mapa.layers,
			nlayers = layers.length,
			ins = [],i;
		for(i=0;i<nlayers;i++){
			if(layers[i].visibility === true){
				ins.push(layers[i]);
			}
		}
		return ins;
	},
	layerPorParametro: function(parametro,valor){
		var layers = i3GEO.editorOL.mapa.layers,
			nlayers = layers.length,
			ins = [],i;
		for(i=0;i<nlayers;i++){
			if(layers[i][parametro] || layers[i][parametro.toLowerCase()]){
				if(layers[i][parametro] === valor || layers[i][parametro.toLowerCase()] === valor){
					ins.push(layers[i]);
				}
			} else {
				if(layers[i].params && layers[i].params[parametro] && layers[i].params[parametro] === valor){
					ins.push(layers[i]);
				}
			}
		}
		return ins;
	},
	//layers clonados sao copias WMS de layers TMS necessarios para realizar o getfeature
	//sao criados quando o layer e adicionado
	layersClonados: function(paramsLayers){
		var layers = i3GEO.editorOL.mapa.layers,
			nlayers = layers.length,i;
		for(i=0;i<nlayers;i++){
			if(layers[i].params && layers[i].params.CLONETMS === paramsLayers){
				return(layers[i]);
			}
		}
		return false;
	},
	layertms2wms: function(tms){
		var layer,url;
		url = tms.url.replace("&cache=sim","&DESLIGACACHE=sim");
		url = url.replace("&Z=${z}&X=${x}&Y=${y}","");
		url = url.replace("Z=${z}&X=${x}&Y=${y}","");
		layer = new OpenLayers.Layer.WMS(
			tms.layername+"_clone",
			url,
			{
				layers:tms.name,
				transparent:true
			},
			{
				gutter:0,
				isBaseLayer:false,
				displayInLayerSwitcher:false,
				opacity: 1,
				visibility:true,
				singleTile: true
			}
		);
		//i3GEO.editorOL.mapa.addLayer(layer);
		return layer;
	},
	//remove o layer clonado com layertms2wms
	removeClone: function(){
		var nome = i3GEO.editorOL.layerAtivo().layername+"_clone",
			busca = i3GEO.editorOL.mapa.getLayersByName(nome);
		if(busca.length > 0){
			i3GEO.editorOL.mapa.removeLayer(i3GEO.editorOL.mapa.getLayersByName(camada.name)[0],false);
		}
	},
	coordenadas: function(){
		//
		//substitui o controle que mostra as coordenadas
		//
		var idcoord = i3GEO.editorOL.mapa.getControlsBy("separator"," ");
		if(idcoord[0]){
			i3GEO.editorOL.mapa.events.register("mousemove", i3GEO.editorOL.mapa, function(e){
				var p,lonlat,d;
				if (navm)
				{p = new OpenLayers.Pixel(e.x,e.y);}
				else
				{p = e.xy;}
				//altera o indicador de localizacao
				lonlat = i3GEO.editorOL.mapa.getLonLatFromPixel(p);
				lonlat = i3GEO.util.projOSM2Geo(lonlat);
				d = i3GEO.calculo.dd2dms(lonlat.lon,lonlat.lat);
				try{
					$i(idcoord[0].id).innerHTML = "Long: "+d[0]+"<br>Lat: "+d[1];
				}
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
			});
		}
	},
	criaJanelaBusca: function(){
		var layers = i3GEO.editorOL.layersLigados(),
			nlayers = layers.length,
			i,
			ins,
			combo = "<select id=i3GEOOLlistaTemasBusca ><option value=''>----</option>";
		for(i=0;i<nlayers;i++){
			combo += "<option value='"+i+"' >"+layers[i].name+"</option>";
		}
		combo += "</select>";
		ins = "<div class=paragrafo >" + $trad("a7") + ":<br>"+combo;
		ins += "<br>" + $trad("x64") + ":<br><span id=i3GEOOLcomboitens ></span>";
		ins += "<br>" + $trad("t23") + ":<br><input type=text size=20 id=i3GEOOLpalavraBusca >";
		ins += "<br><br><input type=button value='" + $trad("t23") + "' id='i3GEOOLbotaoBusca' ></div>";
		ins += "<br>'" + $trad("result") + "':<br><span id=i3GEOOLcomboresultado ></span>";
		try{
			YAHOO.namespace("procura.container");
			YAHOO.procura.container.panel = new YAHOO.widget.Panel("panelprocura", {zIndex:2000, iframe:false, width:"250px", visible:false, draggable:true, close:true } );
			YAHOO.procura.container.panel.setHeader("Encontre no mapa");
			YAHOO.procura.container.panel.setBody(ins);
			YAHOO.procura.container.panel.setFooter("");
			YAHOO.procura.container.panel.render(document.body);
			YAHOO.procura.container.panel.center();

			document.getElementById("i3GEOOLbotaoBusca").onclick = function(){
				var layer = i3GEO.editorOL.layerAtivo(),
					item = document.getElementById("i3GEOOLbuscaItem").value,
					palavra = document.getElementById("i3GEOOLpalavraBusca").value;
				if(item === "" || palavra === "")
				{alert("Escolha o item e o texto de busca");return;}
				i3GEO.editorOL.busca(layer,item,palavra,"i3GEOOLcomboresultado");
			};
			document.getElementById("i3GEOOLlistaTemasBusca").onchange = function(){
				i3GEO.editorOL.ativaTema(this.value);
				document.getElementById("i3GEOOLcomboitens").innerHTML = "...";
				i3GEO.editorOL.listaItens(i3GEO.editorOL.layerAtivo(),"i3GEOOLcomboitens","i3GEOOLbuscaItem");
			};
		}
		catch(e){}
	},
	criaComboTemas: function(){
		var layers = i3GEO.editorOL.layersLigados(),
			nlayers = layers.length,
			i,nometema = "",temp,
			combo = "<select id=i3GEOOLlistaTemasAtivos style=width:235px; >";
		//i3GEO.desenho.layergrafico.setLayerIndex(i3GEO.editorOL.getNumLayers() + 1);
		for(i=0;i<nlayers;i++){
			//pega o nome do tema
			nometema = "";
			if(i3GEO.arvoreDeCamadas && i3GEO.arvoreDeCamadas.CAMADAS){
				temp = i3GEO.arvoreDeCamadas.pegaTema(layers[i].name,"","name");
				if(temp != ""){
					nometema = temp.tema+" - ";
				}
			}
			combo += "<option value='"+i+"' >"+nometema + layers[i].name+"</option>";
		}
		combo += "</select>";
		return combo;
	},
	atualizaJanelaAtivaTema: function(){
		var combo = i3GEO.editorOL.criaComboTemas();
		YAHOO.temaativo.container.panel.setBody(combo);
		document.getElementById("i3GEOOLlistaTemasAtivos").onchange = function(){
			if(botaoIdentifica){
				if(i3GEO.editorOL.layerDefault && i3GEO.editorOL.layerDefault != ""){
					botaoIdentifica.layers = [i3GEO.editorOL.layersLigados()[i3GEO.editorOL.layerDefault]];
				} else {
					botaoIdentifica.layers = [i3GEO.editorOL.layersLigados()[this.value]];
				}
			}
		};
	},
	criaJanelaAtivaTema: function(){
		var temp;
		if(!document.getElementById("paneltemaativo")){
			YAHOO.namespace("temaativo.container");
			YAHOO.temaativo.container.panel = new YAHOO.widget.Panel("paneltemaativo", {zIndex:20000, iframe:true, width:"250px", visible:false, draggable:true, close:true } );
			YAHOO.temaativo.container.panel.setBody("");
			if(i3GEO && typeof i3GEO != undefined && i3GEO != "")
			{YAHOO.temaativo.container.panel.setHeader("Tema ativo<div id='paneltemaativo_minimizaCabecalho' class='container-minimiza'></div>");}
			else
			{YAHOO.temaativo.container.panel.setHeader($trad("tativo"));}
			YAHOO.temaativo.container.panel.setFooter("");
			YAHOO.temaativo.container.panel.render(document.body);
			YAHOO.temaativo.container.panel.show();
			YAHOO.temaativo.container.panel.center();
			i3GEO.editorOL.atualizaJanelaAtivaTema();
			YAHOO.util.Event.addListener(YAHOO.temaativo.container.panel.close, "click", function(){
				i3GEOpanelEditor.deactivate();
				i3GEOpanelEditor.activate();
				if(i3GEO.eventos){
					i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS",["i3GEO.editorOL.atualizaJanelaAtivaTema()"]);
				}
			});
			if(i3GEO && typeof i3GEO != undefined && i3GEO != ""){
				if(i3GEO.eventos){
					i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS",["i3GEO.editorOL.atualizaJanelaAtivaTema()"]);
				}
			}
			temp = $i("paneltemaativo_minimizaCabecalho");
			if(temp){
				temp.onclick = function(){i3GEO.janela.minimiza("paneltemaativo");};
			}
		}
		else{
			YAHOO.temaativo.container.panel.show();
			i3GEO.editorOL.atualizaJanelaAtivaTema();
		}
	},
	ativaTema: function(id){
		document.getElementById("i3GEOOLlistaTemasAtivos").value = id;
	},
	layerAtivo: function(){
		if(i3GEO.editorOL.layerDefault && i3GEO.editorOL.layerDefault != ""){
			return i3GEO.editorOL.layerPorParametro("LAYERS",i3GEO.editorOL.layerDefault);
		} else {
			var id = document.getElementById("i3GEOOLlistaTemasAtivos");
			if(id)
			{id = id.value;}
			else
			{id = i3GEO.temaAtivo;}
			if(id == ""){
				return [];
			}
			else{
				return i3GEO.editorOL.layersLigados()[id];
			}
		}
	},
	listaItens: function(layer,idonde,idobj){
			if(!layer){return;}
			if(!layer.params){return;}
			var u = layer.url+"&request=describefeaturetype&service=wfs&version=1.0.0";
			u += "&typename="+layer.params.LAYERS;
		document.body.style.cursor="wait";
		document.getElementById("i3geoMapa").style.cursor = "wait";
		OpenLayers.Request.issue({
			method: "GET",
			url: u,
			callback: function(retorno){
				document.body.style.cursor="default";
				document.getElementById("i3geoMapa").style.cursor = "default";
				var fromgml = new OpenLayers.Format.WFSDescribeFeatureType({
					geometryName: "msGeometry"
				}),
					gml = fromgml.read(retorno.responseText),
					prop = gml.featureTypes[0].properties,
					nprop = prop.length,
					i,
					combo = "<select id="+idobj+" ><option value=''>----</option>";
				for(i = 0;i < nprop; i++){
					combo += "<option value="+prop[i].name+" >"+prop[i].name+"</option>";
				}
				combo += "</select>";
				document.getElementById(idonde).innerHTML = combo;
			},
			failure: function(){
				document.body.style.cursor="default";
				document.getElementById("i3geoMapa").style.cursor = "default";
				alert("Erro");
			}
		});
	},
	busca: function(layer,item,palavra,onde){
		document.body.style.cursor="wait";
		document.getElementById("i3geoMapa").style.cursor = "wait";
			var u = layer.url+"&request=getfeature&service=wfs&version=1.0.0";
			u = u.replace("Z=${z}&X=${x}&Y=${y}","");
			u += "&OUTPUTFORMAT=gml2&typename="+layer.params.LAYERS;
			u += "&filter=<Filter><PropertyIsLike wildcard=* singleChar=. escape=! ><PropertyName>"+item+"</PropertyName><Literal>*"+palavra+"*</Literal></PropertyIsLike></Filter>";
			document.body.style.cursor="wait";
		document.getElementById("i3geoMapa").style.cursor = "wait";
		document.getElementById(onde).innerHTML = "...";
		OpenLayers.Request.issue({
			method: "GET",
			url: u,
			callback: function(retorno){
				document.body.style.cursor="default";
				document.getElementById("i3geoMapa").style.cursor = "default";
				var fromgml = new OpenLayers.Format.GML({
					geometryName: "msGeometry"
				}),
					gml = fromgml.read(retorno.responseText),
					ngml = gml.length,
					i,
					ins = "<select onchange='i3GEO.editorOL.zoomPara(this.value)'>";
				ins += "<option value=''>---</option>";
				for(i=0;i<ngml;i++){
					eval("var valor = gml[i].data."+item);
					var bounds = gml[i].geometry.getBounds();
					bounds = bounds.toBBOX();
					ins += "<option value='"+bounds+"'>"+valor+"</option>";
				}
				ins += "</select>";
				document.getElementById(onde).innerHTML = ins;
			},
			failure: function(){
				document.body.style.cursor="default";
				document.getElementById("i3geoMapa").style.cursor = "default";
				alert("Erro");
			}
		});
	},
	zoomPara: function(bbox){
		var b = new OpenLayers.Bounds.fromString(bbox);
		i3GEO.editorOL.mapa.zoomToExtent(b);
	},
	mostraLegenda: function(){
		var layers = i3GEO.editorOL.layersLigados(),
			nlayers = layers.length,
			ins = "",i, icone = "",
			url, fers, f="", fer = "", fonte = "";
		for(i=0;i<nlayers;i++){
			try{
				if(layers[i].isBaseLayer === false){
					url = layers[i].getFullRequestString({"request":"getlegendgraphic"});
					icone = "";
					url = url.replace("LAYERS","LAYER");
					url = url.replace("&Z=${z}&X=${x}&Y=${y}","");
					url = url.replace("Z=${z}&X=${x}&Y=${y}","");
					if(i3GEO.editorOL.legendahtml === true){
						//os parametros FORMAT e SERVICE sao inseridos de forma redundante para grantir
						//caso seja um TMS
						url = url.replace("image%2Fpng","text/html")
							+ "&FORMAT=text/html&SERVICE=WMS";
						//
						//verifica se a camada veio de um plugin de classe_plugini3geo
						//e insere o icone se for necessario
						//
						if(layers[i].options.plugini3geo){
							if(layers[i].params.LAYERS){
								//wms
								icone = i3GEO.pluginI3geo[layers[i].options.plugini3geo].iconeArvoreDeCamadas(layers[i].params.LAYERS);
							}
							else{
								//tms
								icone = i3GEO.pluginI3geo[layers[i].options.plugini3geo].iconeArvoreDeCamadas(layers[i].layers);
							}
						}
						//
						//verifica se a camada tem ferramentas parametrizadas
						//insere o icone
						//
						fers = layers[i].options.ferramentas;
						for(fer in fers){
							if(i3GEO.configura.ferramentasLayers[fer]){
								icone += i3GEO.configura.ferramentasLayers[fer].icone(layers[i]);
							}
						}
						fonte = "";
						if(layers[i].link_tema != ""){
							fonte = "&nbsp;<a class='i3GeoLinkFonte' href='" + layers[i].link_tema + "' target='_blank' >link</a>";
						}
						ins += icone + layers[i].name + fonte + "<br><div id=legendaL_"+i+" ></div><br>";
						//necessario pq nao e sincrono
						eval ("var f = function(retorno){document.getElementById('legendaL_"+i+"').innerHTML = retorno.responseText;};");
						var config = {
							method: "GET",
							url: url,
							callback: f
						};
						OpenLayers.Request.issue(config);
					}
					else{
						ins += layers[i].name+"<br><img src='"+url+"&SERVICE=wms' /><br>";
					}
				}
			}
			catch(e){}
		}
		//var w = window.open();
		//w.document.write(ins);
		//w.document.close();
		if(!document.getElementById("panellegendaeditorOL")){
			YAHOO.namespace("legendaeditorOL.container");
			YAHOO.legendaeditorOL.container.panel = new YAHOO.widget.Panel("panellegendaeditorOL", {zIndex:20000, iframe:true, width:"auto", visible:false, draggable:true, close:true } );
			YAHOO.legendaeditorOL.container.panel.setBody(ins);
			YAHOO.legendaeditorOL.container.panel.setHeader($trad("p3"));
			YAHOO.legendaeditorOL.container.panel.setFooter("");

			YAHOO.legendaeditorOL.container.panel.render(document.body);
			YAHOO.legendaeditorOL.container.panel.show();
			YAHOO.legendaeditorOL.container.panel.center();

			YAHOO.legendaeditorOL.container.panel.body.style.maxHeight = (parseInt(i3GEO.editorOL.mapa.size.h,10) / 1.2) - 20 + "px";
			YAHOO.legendaeditorOL.container.panel.body.style.overflow = "auto";

			YAHOO.util.Event.addListener(YAHOO.legendaeditorOL.container.panel.close, "click", function(){
				YAHOO.legendaeditorOL.container.panel.destroy();
			});
		}
		else{
			YAHOO.legendaeditorOL.container.panel.setBody(ins);
			YAHOO.legendaeditorOL.container.panel.show();
		}
	},
	captura: function(lonlat){
		//if(i3GEO.desenho.layergrafico !== ""){return;}

		var d = 0.1,
			layers = [i3GEO.editorOL.layerAtivo()],
			xy = lonlat.split(","),
			u = layers[0].url+"&REQUEST=getfeature&service=wfs&version=1.0.0";
			u += "&OUTPUTFORMAT=gml2&typename="+layers[0].params.LAYERS;
			if(i3GEO.Interface.openlayers.googleLike === true){
				u += "&SRS=EPSG:3857";
			}
			//remove parametros nao desejados
			u = u.replace("&cache=sim","&DESLIGACACHE=sim");
			u = u.replace("&Z=${z}&X=${x}&Y=${y}","");
			u = u.replace("Z=${z}&X=${x}&Y=${y}","");
			//u += "&filter=<Filter><Intersects><PropertyName>Geometry</PropertyName><gml:Point><gml:coordinates>"+lonlat+"</gml:coordinates></gml:Point></Intersects></Filter>";

		xy[0] = xy[0] * 1;
		xy[1] = xy[1] * 1;
		var poligono = (xy[0] - d)+","+(xy[1] + d) + " "+(xy[0] + d)+","+(xy[1] + d)+" " + (xy[0] + d)+","+(xy[1] - d)+" " + (xy[0] - d)+","+(xy[1] - d)+" "+(xy[0] - d)+","+(xy[1] + d);
		u += "&filter=<Filter><Intersects><PropertyName>Geometry</PropertyName><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:posList>"+poligono+"</gml:posList></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></Intersects></Filter>";

		document.body.style.cursor="wait";
		if(document.getElementById("i3geoMapa")){
			document.getElementById("i3geoMapa").style.cursor = "wait";
		}
		OpenLayers.Request.issue({
			method: "GET",
			url: u,
			callback: function(retorno){
				document.body.style.cursor="default";
				if(document.getElementById("i3geoMapa"))
				{document.getElementById("i3geoMapa").style.cursor = "default";}
				var i,n,f,
					fromgml = new OpenLayers.Format.GML({
						geometryName: "msGeometry"
					}),
					gml = fromgml.read(retorno.responseText);
				n = gml.length;
				for(i=0;i<n;i++){
					f = gml[i];
					f["attributes"] = {
						opacidade: i3GEO.editorOL.simbologia.opacidade,
						texto: i3GEO.editorOL.simbologia.texto,
						fillColor: i3GEO.editorOL.simbologia.fillColor,
						strokeWidth: i3GEO.editorOL.simbologia.strokeWidth,
						strokeColor: i3GEO.editorOL.simbologia.strokeColor,
						pointRadius: i3GEO.editorOL.simbologia.pointRadius,
						graphicName: i3GEO.editorOL.simbologia.graphicName,
						registros: f["attributes"]
					};
				}
				i3GEO.desenho.layergrafico.addFeatures(gml);
			},
			failure: function(){
				document.body.style.cursor="default";
				if(document.getElementById("i3geoMapa"))
				{document.getElementById("i3geoMapa").style.cursor = "default";}
				alert("Erro");
			}
		});
	},
	salvaGeometrias: function(){
		var geos = i3GEO.desenho.layergrafico.selectedFeatures,
			n = geos.length,
			ins = "";
		if(n > 0){
			if($i("panelsalvageometrias")){
				if(YAHOO.i3GEO){
					YAHOO.salvaGeometrias.container.panel = YAHOO.i3GEO.janela.manager.find("panelsalvageometrias");
				}
				YAHOO.salvaGeometrias.container.panel.show();
				YAHOO.salvaGeometrias.container.panel.bringToTop();
			}
			else{
				try{
					YAHOO.namespace("salvaGeometrias.container");
					YAHOO.salvaGeometrias.container.panel = new YAHOO.widget.Panel("panelsalvageometrias", {zIndex:2000, iframe:false, width:"250px", visible:false, draggable:true, close:true } );
					YAHOO.salvaGeometrias.container.panel.setHeader($trad("u6"));
					YAHOO.salvaGeometrias.container.panel.setBody("");
					YAHOO.salvaGeometrias.container.panel.setFooter("");
					YAHOO.salvaGeometrias.container.panel.render(document.body);
					YAHOO.salvaGeometrias.container.panel.center();
					if(YAHOO.i3GEO && YAHOO.i3GEO.janela){
						YAHOO.i3GEO.janela.manager.register(YAHOO.salvaGeometrias.container.panel);
					}
					YAHOO.salvaGeometrias.container.panel.show();
				}
				catch(e){}
			}
			ins += "<p class=paragrafo >"+n+" "+$trad("geosel")+"</p>";
			ins += "<p class=paragrafo ><a href='#' onclick='i3GEO.editorOL.listaGeometriasSel()' >"+$trad("listar")+"</a>&nbsp;&nbsp;";
			if(i3GEO.editorOL.nomeFuncaoSalvar && i3GEO.editorOL.nomeFuncaoSalvar != ""){
				ins += "<a href='#' onclick='"+i3GEO.editorOL.nomeFuncaoSalvar+"' >" + $trad("sdados") + "</a>&nbsp;&nbsp;";
			}
			if(typeof i3geoOL !== "undefined"){
				ins += "<a href='#' onclick='i3GEO.editorOL.incorporar()' >"+$trad("incorpo")+"</a></p>";
				ins += "<p class=paragrafo>"+ $trad("ajudaEditorOlSalva") +"</p>";
			}
			YAHOO.salvaGeometrias.container.panel.setBody(ins);
		}
		else{
			i3GEO.janela.tempoMsg($trad("selum"));
		}
	},
	exportarSHP: function(){
		i3GEO.editorOL.processageo("converteSHP");
	},
	incorporar: function(){
		i3GEO.editorOL.processageo("incorporar");
	},
	listaGeometriasSel: function(){
		var geos = i3GEO.desenho.layergrafico.selectedFeatures,
			n = geos.length,
			ins = "",i,a,w,g;
		for(i=0;i<n;i++){
			g = geos[i];
			ins += "<b>"+$trad("u6")+": "+i+"</b><br>"+i3GEO.editorOL.google2wgs(g.geometry)+"<br><br>";
			ins += "<b>"+$trad("atrib")+": "+i+"</b><br>";
			a = g.attributes;
			for(key in a){
				if(a[key]){
					ins += key+" = "+a[key]+"<br>";
				}
			}
			//lista os registros se for fruto de uma captura
			if(g.attributes.registros){
				ins += "<b>"+$trad("reg")+": "+i+"</b><br>";
				a = g.attributes.registros;
				for(key in a){
					if(a[key]){
						ins += key+" = "+a[key]+"<br>";
					}
				}
			}
			ins += "<br>";
		}
		w = window.open();
		w.document.write(ins);
		w.document.close();
	},
	testeSalvar: function(){
		alert("Funcao nao disponivel. Defina o nome da funcao em i3GEO.editorOL.nomeFuncaoSalvar ");
	},
	salvaGeo: function(){
		//i3GEO.editorOL.testeSalvar();
		//return;
		var geos = i3GEO.desenho.layergrafico.selectedFeatures,
			n = geos.length,
			funcaoOK = function(){
				//verifica se a geometria contem o atributo que indica a coluna ou codigo unico
				if(geos[0].geometry){
					var registros = "",
						valorunico = "",
						nometema = $i("editorOLcomboTemaEditavel").value,
						key="",tema,redesenha,p,
						g = i3GEO.editorOL.google2wgs(geos[0].geometry);
					if(nometema == ""){
						return;
					}
					tema = i3GEO.arvoreDeCamadas.pegaTema(nometema,"","name");
					//o tema contem o indicador de qual e a coluna que contem o identificador unico
					if(geos[0].attributes.registros){
						registros = geos[0].attributes.registros;
						for(key in registros){
							if(registros[key] && key == tema.colunaidunico){
								valorunico = registros[key];
							}
						}
					}
					redesenha = function(retorno){
						i3GEO.janela.fechaAguarde("aguardeSalvaPonto");
						i3GEO.desenho.layergrafico.removeFeatures(i3GEO.desenho.layergrafico.selectedFeatures);
						i3GEO.Interface.atualizaTema("",nometema);
					};
					i3GEO.janela.AGUARDEMODAL = true;
					i3GEO.janela.abreAguarde("aguardeSalvaPonto",$trad("adic")+"...");
					i3GEO.janela.AGUARDEMODAL = false;

					//cria um novo registro
					if(valorunico == ""){
						p = i3GEO.configura.locaplic+"/ferramentas/editortema/exec.php?funcao=adicionaGeometria&g_sid="+i3GEO.configura.sid;
						cpJSON.call(p,"foo",redesenha,"&tema="+nometema+"&wkt="+g);
					}
					else{
						//atualiza a geometria
						p = i3GEO.configura.locaplic+"/ferramentas/editortema/exec.php?funcao=atualizaGeometria&g_sid="+i3GEO.configura.sid;
						cpJSON.call(p,"foo",redesenha,"&idunico="+valorunico+"&tema="+nometema+"&wkt="+g);
					}
				}
			},
			funcaoCombo = function(obj){
				$i("editorOLondeComboTemaEditavel").innerHTML = obj.dados;
			},
			texto = $trad("stema") + ":<br><div id=editorOLondeComboTemaEditavel  ></div><br><br>";
		if(n != 1){
			i3GEO.janela.tempoMsg($trad("seluma"));
		}
		else{
			i3GEO.janela.confirma(texto,300,$trad("salva"),$trad("canc"),funcaoOK);
			i3GEO.util.comboTemas("editorOLcomboTemaEditavel",funcaoCombo,"editorOLondeComboTemaEditavel","",false,"editavel");
		}
	},
	criaBotoes: function(botoes){
		var sketchSymbolizers = {
				"Point": {
						pointRadius: 4,
						graphicName: "square",
						fillColor: "white",
						fillOpacity: 1,
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#333333"
				},
				"Line": {
						strokeWidth: 3,
						strokeOpacity: 1,
						strokeColor: "#666666",
						strokeDashstyle: "dash"
				},
				"Polygon": {
						strokeWidth: 2,
						strokeOpacity: 1,
						strokeColor: "#666666",
						fillColor: "white",
						fillOpacity: 0.3
				}
		},
		style = new OpenLayers.Style(),
		styleMap = new OpenLayers.StyleMap(
			{
				"default": style,
				"vertex": {
							strokeOpacity: 1,
							strokeWidth: 1,
							fillColor: "white",
							fillOpacity: 0.45,
							pointRadius: 3
					}
			},
			{
				extendDefault: false
			}
		),
		adiciona = false,
		button,
		controles = [];
		style.addRules([
				new OpenLayers.Rule({symbolizer: sketchSymbolizers})
		]);
		i3GEOpanelEditor = new OpenLayers.Control.Panel({
			displayClass: "olControlEditingToolbar1 noprint",
			saveState: false,
			activateControl: function(c){
				this.deactivate();
				this.activate();
				try{
					i3GEO.editorOL.ModifyFeature.deactivate();
					if(i3GEO && i3GEO.barraDeBotoes){
						i3GEO.barraDeBotoes.ativaPadrao();
					}
				}
				catch(e){ }
				if(!c.trigger)
				{c.activate();}
				else
				{c.trigger.call();}
			}
		});
		if(botoes.novaaba===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLnovaaba",
				trigger: function(){
					window.open(window.location, '_blank');
				},
				title: $trad("novaaba"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.procura===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLprocura",
				trigger: function(){YAHOO.procura.container.panel.show();},
				title: $trad("t23"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.pan===true){
			controles.push(new OpenLayers.Control.Navigation({
				title: "pan",
				displayClass:"editorOLpan",
				type: OpenLayers.Control.TYPE_TOOL
			}));
			adiciona = true;
		}
		if(botoes.zoombox===true){
			controles.push(new OpenLayers.Control.ZoomBox({
				title: "zoombox",
				displayClass: "editorOLzoombox",
				type: OpenLayers.Control.TYPE_TOOL
			}));
			adiciona = true;
		}
		if(botoes.zoomtot===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLzoomtot",
				trigger: function(){
					if(i3GEO.editorOL.mapext && i3GEO.editorOL.mapext != ""){
						i3GEO.editorOL.mapa.zoomToExtent(i3GEO.editorOL.mapext);
					}
					else{
						i3GEO.editorOL.mapa.zoomToMaxExtent();
					}
				},
				title: $trad("d2t"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.zoomin===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLzoomin",
				trigger: function(){i3GEO.editorOL.mapa.zoomIn();},
				title: $trad("d5t"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.zoomout===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLzoomout",
				trigger: function(){i3GEO.editorOL.mapa.zoomOut();},
				title: $trad("d6t"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.legenda===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLlegenda",
				trigger: function(){i3GEO.editorOL.mostraLegenda();},
				title: $trad("p3"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.distancia===true){
			button = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Path,
				{
					handlerOptions: {layerOptions: {styleMap: styleMap}},
					persist: true,
					displayClass: "editorOLdistancia",
					title: $trad("d21t"),
					type: OpenLayers.Control.TYPE_TOOL
				}
			);
			button.events.on({
				"measure": function(event){
						var units = event.units,
							measure = event.measure;
						alert(measure.toFixed(3) + " " + units);
				}
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.area===true){
			button = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Polygon,
				{
					handlerOptions: {layerOptions: {styleMap: styleMap}},
					persist: true,
					displayClass: "editorOLarea",
					title: $trad("d21at"),
					type: OpenLayers.Control.TYPE_TOOL
				}
			);
			button.events.on({
				"measure": function(event){
						var units = event.units;
						var measure = event.measure;
						alert(measure.toFixed(3) + " " + units + "2");
				}
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.identifica===true){
			botaoIdentifica = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures:1,
				infoFormat:'text/plain', //'application/vnd.ogc.gml',
				layers: [i3GEO.editorOL.layerAtivo()],
				queryVisible: true,
				title: $trad("d7t"),
				type: OpenLayers.Control.TYPE_TOOL,
				displayClass: "editorOLidentifica",
				eventListeners: {
					getfeatureinfo: function(event) {
						var lonlat = i3GEO.editorOL.mapa.getLonLatFromPixel(event.xy),
							lonlattexto = "<hr>",
							formata;
						if(	botoes.linha === true || botoes.ponto === true || botoes.poligono === true || botoes.edita === true){
							lonlattexto += "<pre><span style=font-size:12px;color:blue;cursor:pointer onclick='i3GEO.editorOL.captura(\""+lonlat.lon+","+lonlat.lat+"\")'>edita geometria</span></pre><br>";
						}
						formata = function(texto){
							var temp,
								temp1,
								n,
								i,
								f = [],
								textoN = texto.split(":");
							try{
								if(textoN.length > 1){
									textoN.shift();
									textoN.shift();
									temp = textoN.join(":");
									temp = temp.replace(/\n\r/g, "");
									temp = temp.replace(/'/g, "");
									temp = temp.replace(/\n/g, "|");
									temp = temp.replace(/_/g, " ");
									//temp = temp.replace(/=/g, ":");
									temp = temp.split("|");
									n = temp.length;
									for(i=0;i<n;i++){
										temp1 = temp[i].replace(/^\s+/,"");
										temp1 = temp1.replace(/\s+$/,"");
										if(temp1 != "")
										f.push(temp1);
									}
									texto = f.join("<br><br>");
								}
							}
							catch(e){}
							return texto;
						};
						i3GEO.editorOL.mapa.addPopup(new OpenLayers.Popup.FramedCloud(
							"chicken",
							i3GEO.editorOL.mapa.getLonLatFromPixel(event.xy),
							null,
							"<div style=text-align:left >"+lonlattexto+"<pre>"+formata(event.text)+"</pre></div>",
							null,
							true
						));
						i3GEO.editorOL.removeClone();
					},
					beforegetfeatureinfo: function(event){
						var ativo = [];
						if(i3GEO.editorOL.layerDefault && i3GEO.editorOL.layerDefault != ""){
							ativo = i3GEO.editorOL.layerPorParametro("LAYERS",i3GEO.editorOL.layerDefault);
						} else {
							ativo = [i3GEO.editorOL.layerAtivo()];
						}
						//se for TMS tem de pegar o clone wms
						if(ativo[0].serviceVersion === "&tms=" || ativo[0].CLASS_NAME == "OpenLayers.Layer.TMS" || ativo[0].CLASS_NAME == "OpenLayers.Layer.OSM"){
							ativo = [i3GEO.editorOL.layertms2wms(ativo[0])];
						}
						ativo[0].projection = new OpenLayers.Projection("EPSG:4326");
						event.object.layers = ativo;
						botaoIdentifica.layers = ativo;
						botaoIdentifica.url = ativo[0].url;
					},
					activate: function(){
						if(i3GEO.editorOL.layerDefault && i3GEO.editorOL.layerDefault != ""){
							return;
						}
						i3GEO.editorOL.criaJanelaAtivaTema();
					}
				}
			});
			//button.events.register("getfeatureinfo", this, showInfo);
			controles.push(botaoIdentifica);
			adiciona = true;
		}
		if(botoes.linha===true){
			button = new OpenLayers.Control.DrawFeature(
				i3GEO.desenho.layergrafico,
				OpenLayers.Handler.Path,
				{
					displayClass: "editorOLlinha",
					title: $trad("dlinha"),
					type: OpenLayers.Control.TYPE_TOOL,
					callbacks:{
						done: function(feature){
							var f = new OpenLayers.Feature.Vector(feature);
							f["attributes"] = {
								opacidade: i3GEO.editorOL.simbologia.opacidade,
								texto: i3GEO.editorOL.simbologia.texto,
								fillColor: i3GEO.editorOL.simbologia.fillColor,
								strokeWidth: i3GEO.editorOL.simbologia.strokeWidth,
								strokeColor: i3GEO.editorOL.simbologia.strokeColor,
								pointRadius: i3GEO.editorOL.simbologia.pointRadius,
								graphicName: i3GEO.editorOL.simbologia.graphicName
							};
							i3GEO.desenho.layergrafico.addFeatures([f]);
							if(document.getElementById("panellistagEditor"))
							{i3GEO.editorOL.listaGeometrias();}
							i3GEO.editorOL.sobeLayersGraficos();
						}
					}
				}
			);
			controles.push(button);
			adiciona = true;
		}
		if(botoes.ponto===true){
			button = new OpenLayers.Control.DrawFeature(
				i3GEO.desenho.layergrafico,
				OpenLayers.Handler.Point,
				{
					displayClass: "editorOLponto",
					title: $trad("dponto"),
					type: OpenLayers.Control.TYPE_TOOL,
					callbacks:{
						done: function(feature){
							var f,style_mark;
							if(i3GEO.editorOL.simbologia.externalGraphic != ""){
								style_mark = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
								style_mark.externalGraphic = i3GEO.editorOL.simbologia.externalGraphic;
								style_mark.graphicWidth = i3GEO.editorOL.simbologia.graphicWidth;
								style_mark.graphicHeight = i3GEO.editorOL.simbologia.graphicHeight;
								style_mark.fillOpacity = i3GEO.editorOL.simbologia.opacidade;
								f = new OpenLayers.Feature.Vector(feature,null,style_mark);
							}
							else{
								f = new OpenLayers.Feature.Vector(feature);
							}
							f["attributes"] = {
								opacidade: i3GEO.editorOL.simbologia.opacidade,
								texto: i3GEO.editorOL.simbologia.texto,
								fillColor: i3GEO.editorOL.simbologia.fillColor,
								strokeWidth: i3GEO.editorOL.simbologia.strokeWidth,
								strokeColor: i3GEO.editorOL.simbologia.strokeColor,
								pointRadius: i3GEO.editorOL.simbologia.pointRadius,
								graphicName: i3GEO.editorOL.simbologia.graphicName,
								externalGraphic: i3GEO.editorOL.simbologia.externalGraphic,
								graphicHeight: i3GEO.editorOL.simbologia.graphicHeight,
								graphicWidth: i3GEO.editorOL.simbologia.graphicWidth
							};
							i3GEO.desenho.layergrafico.addFeatures([f]);
							if(document.getElementById("panellistagEditor"))
							{i3GEO.editorOL.listaGeometrias();}
							i3GEO.editorOL.sobeLayersGraficos();
						}
					}
				}
			);
			controles.push(button);
			adiciona = true;
		}
		if(botoes.poligono===true){
			button = new OpenLayers.Control.DrawFeature(
				i3GEO.desenho.layergrafico,
				OpenLayers.Handler.Polygon,
				{
					displayClass: "editorOLpoligono",
					title: $trad("dpol"),
					type: OpenLayers.Control.TYPE_TOOL,
					//handlerOptions: {holeModifier: "altKey"},
					callbacks:{
						done: function(feature){
							var f = new OpenLayers.Feature.Vector(feature);
							f["attributes"] = {
								opacidade: i3GEO.editorOL.simbologia.opacidade,
								texto: i3GEO.editorOL.simbologia.texto,
								fillColor: i3GEO.editorOL.simbologia.fillColor,
								strokeWidth: i3GEO.editorOL.simbologia.strokeWidth,
								strokeColor: i3GEO.editorOL.simbologia.strokeColor,
								pointRadius: i3GEO.editorOL.simbologia.pointRadius,
								graphicName: i3GEO.editorOL.simbologia.graphicName
							};
							i3GEO.desenho.layergrafico.addFeatures([f]);
							if(document.getElementById("panellistagEditor"))
							{i3GEO.editorOL.listaGeometrias();}
							i3GEO.editorOL.sobeLayersGraficos();
						}
					}
				}
			);
			controles.push(button);
			adiciona = true;
		}
		if(botoes.texto===true){
			button = new OpenLayers.Control.DrawFeature(
				i3GEO.desenho.layergrafico,
				OpenLayers.Handler.Point,
				{
					displayClass: "editorOLtexto",
					title: $trad("dtexto"),
					type: OpenLayers.Control.TYPE_TOOL,
					persist: true,
					callbacks:{
						done: function(feature){
							var texto = window.prompt("Texto",""),
								label = new OpenLayers.Feature.Vector(feature);
							label["attributes"] = {
								opacidade: 0.1,
								fillColor: "white",
								strokeWidth: i3GEO.editorOL.simbologia.strokeWidth,
								texto: texto,
								pointRadius: 2,
								graphicName: "square",
								strokeColor: "black",
								fontColor: i3GEO.editorOL.simbologia.fontColor,
								fontSize: i3GEO.editorOL.simbologia.fontSize,
								fontFamily: "Arial",
								fontWeight: "bold",
								labelAlign: "rt"
							};
							if(texto && texto !== "")
							{i3GEO.desenho.layergrafico.addFeatures([label]);}
							i3GEO.editorOL.sobeLayersGraficos();
						}
					}
				}
			);
			controles.push(button);
			adiciona = true;
		}
		if(botoes.edita===true && botoes.corta===true && i3GEO.php){
			i3GEO.editorOL.CortaFeature = new OpenLayers.Control.DrawFeature(
				i3GEO.desenho.layergrafico,
				OpenLayers.Handler.Polygon,
				{
					displayClass: "editorOLcorta",
					title: $trad("cortaf"),
					type: OpenLayers.Control.TYPE_TOOL,
					clickout: true,
					toggle: true,
					trigger: function(){
						if(i3GEO.desenho.layergrafico.selectedFeatures.length != 1){
							alert("Selecione primeiro um elemento para ser cortado");
							i3GEO.editorOL.CortaFeature.deactivate();
						}
						else{
							i3GEO.editorOL.CortaFeature.activate();
						}
					},
					callbacks:{
						done: function(feature){
							var temp,
								sel = i3GEO.desenho.layergrafico.selectedFeatures[0].geometry,
								corta = feature;
							temp = function(retorno){
								i3GEO.janela.fechaAguarde("i3GEO.cortador");
								if(retorno != "" && retorno.data && retorno.data != "")
								{i3GEO.editorOL.substituiFeaturesSel(retorno.data);}
							};
							i3GEO.janela.abreAguarde("i3GEO.cortador","Cortando");
							i3GEO.php.funcoesGeometriasWkt(temp,sel+"|"+corta,"difference");
						}
					}
				}
			);
			controles.push(i3GEO.editorOL.CortaFeature);
			adiciona = true;
		}
		if(botoes.edita===true){
			i3GEO.editorOL.ModifyFeature = new OpenLayers.Control.ModifyFeature(
				i3GEO.desenho.layergrafico,
				{
					displayClass: "editorOLedita",
					title: $trad("modf"),
					type: OpenLayers.Control.TYPE_TOOL,
					clickout: true,
					toggle: true,
					mode: OpenLayers.Control.ModifyFeature.RESHAPE,
					standalone: false,
					createVertices: true,
					styleMap: "default",
					vertexRenderIntent: "vertex"
				}
			);
			controles.push(i3GEO.editorOL.ModifyFeature);
			adiciona = true;
		}
		if(botoes.edita===true && botoes.listag===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLlistag",
				trigger: function(){
					i3GEO.editorOL.listaGeometrias();
				},
				title: $trad("listag"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.frente===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLfrente",
				trigger: function(){
					i3GEO.editorOL.trazParaFrente();
					if(document.getElementById("panellistagEditor"))
					{i3GEO.editorOL.listaGeometrias();}
				},
				title: $trad("frente"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.tools===true && i3GEO.php){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLtools",
				trigger: function(){
					//fora do i3geo, usa o jsts
					if(i3GEO.php)
					{i3GEO.editorOL.ferramentas();}
					else
					{i3GEO.editorOL.carregajts("i3GEO.editorOL.ferramentas()");}

				},
				title: $trad("u15a"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		//botao de sele&ccedil;&atilde;o
		if(botoes.selecao===true){
			i3GEO.editorOL.selbutton = new OpenLayers.Control.SelectFeature(
				i3GEO.desenho.layergrafico,
				{
					displayClass: "editorOLselecao",
					title: $trad("d24t"),
					type: OpenLayers.Control.TYPE_TOOL,
					clickout: true,
					toggle: true,
					multiple: false,
					hover: false,
					toggleKey: "ctrlKey", // ctrl key removes from selection
					multipleKey: "shiftKey", // shift key adds to selection
					box: false
				}
			);
			controles.push(i3GEO.editorOL.selbutton);
			adiciona = true;
		}
		//botao de selecionar tudo
		if(botoes.selecaotudo===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLselecaoTudo",
				trigger: function(){
					var fs = i3GEO.desenho.layergrafico.features,
						n = fs.length,
						i;
					for(i = 0; i < n; i++){
						i3GEO.editorOL.selbutton.select(fs[i]);
					}
				},
				title: $trad("studo"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.apaga===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLapaga",
				trigger: function(){
					if(i3GEO.desenho.layergrafico.selectedFeatures.length > 0){
						var x = window.confirm($trad("excsel")+"?");
						if(x){
							i3GEO.editorOL.guardaBackup();
							i3GEO.desenho.layergrafico.removeFeatures(i3GEO.desenho.layergrafico.selectedFeatures);
							if(document.getElementById("panellistagEditor")){
								i3GEO.editorOL.listaGeometrias();
							}
							if(typeof i3geoOL !== "undefined"){
								i3GEO.janela.tempoMsg($trad("meneditor1"));
							}
						}
					}
					else{
						i3GEO.janela.tempoMsg($trad("seluma"));
					}
				},
				title: $trad("excsel"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		//n&atilde;o dispon&iacute;vel ainda
		/*
		if(botoes.undo===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLundo",
				trigger: function(){i3GEO.editorOL.restauraBackup();},
				title: "recupera"
			});
			controles.push(button);
			adiciona = true;
		}
		*/
		if(botoes.propriedades===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLpropriedades",
				trigger: function(){i3GEO.editorOL.propriedades();},
				title: $trad("p13"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.salva===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLsalva",
				trigger: function(){i3GEO.editorOL.salvaGeometrias();},
				title: $trad("salva"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.ajuda===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLajuda",
				trigger: function(){
					try
					{window.open(i3GEO.configura.locaplic+"/mashups/openlayers_ajuda.php");}
					catch(e)
					{window.open("openlayers_ajuda.php");}
				},
				title: $trad("s1"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.fecha===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLfecha",
				trigger: function(){
					var temp = window.confirm($trad("x94"));
					if(i3GEO.eventos){
						i3GEO.eventos.cliquePerm.ativa();
					}
					i3GEOpanelEditor.destroy();
					try{YAHOO.temaativo.container.panel.destroy();}catch(e){}
					try{YAHOO.procura.container.panel.destroy();}catch(e){}
					try{YAHOO.editorOL.container.panel.destroy();}catch(e){}
					try{YAHOO.editorOL.listaGeometrias.panel.destroy();}catch(e){}
					//try{YAHOO.panelpropriedadesEditor.panel.destroy();}catch(e){}
					//try{YAHOO.editorOL.panellistagEditor.panel.destroy();}catch(e){}
					try{YAHOO.editorOL.ferramentas.panel.destroy();}catch(e){}
					//try{YAHOO.panelprocura.panel.destroy();}catch(e){}
					try{YAHOO.legendaeditorOL.container.panel.destroy();}catch(e){}
					try{YAHOO.salvaGeometrias.container.panel.destroy();}catch(e){}
					if(temp === true){
						try{
							if(i3GEO.desenho.layergrafico){
								i3GEO.editorOL.mapa.removeLayer(i3GEO.desenho.layergrafico);
								delete(i3GEO.desenho.layergrafico);
							}
							if(i3GEO.editorOL.backup){
								i3GEO.editorOL.mapa.removeLayer(i3GEO.editorOL.backup);
								delete(i3GEO.editorOL.backup);
							}
						}
						catch(e){}
					}
				},
				title: $trad("x74"),
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		if(botoes.grid===true){
			i3GEO.editorOL.gridbutton = new OpenLayers.Control.Graticule(i3GEO.editorOL.gridProperties);
			i3GEO.editorOL.mapa.addControl(i3GEO.editorOL.gridbutton);
			button = new OpenLayers.Control.Button({
					displayClass: "editorOLgrid",
					title: $trad("p10"),
					type: OpenLayers.Control.TYPE_BUTTON,
					trigger: function(){
						if(i3GEO.editorOL.gridbutton.active == true){
							i3GEO.editorOL.gridbutton.deactivate();
						} else {
							i3GEO.editorOL.gridbutton.activate();
						}
					}
				}
			);
			controles.push(button);
			adiciona = true;
		}
		if(botoes.imprimir===true){
			button = new OpenLayers.Control.Button({
				displayClass: "editorOLimprimir",
				trigger: function(){window.print();},
				type: OpenLayers.Control.TYPE_BUTTON
			});
			controles.push(button);
			adiciona = true;
		}
		//
		//controle que permite o snap
		//
		i3GEOOLsnap = new OpenLayers.Control.Snapping({
			layer: i3GEO.desenho.layergrafico
		});
		i3GEOOLsplit = new OpenLayers.Control.Split({
			layer: i3GEO.desenho.layergrafico,
			source: i3GEO.desenho.layergrafico,
			tolerance: 0.0001,
			eventListeners: {
				beforesplit: function(event){i3GEO.editorOL.guardaBackup();},
				aftersplit: function(event) {
					i3GEO.editorOL.flashFeatures(event.features);
					if(document.getElementById("panellistagEditor"))
					{i3GEO.editorOL.listaGeometrias();}
				}
			}
		});
		//
		//adiciona o painel ao mapa se alguma opcao foi inserida
		//
		if(adiciona === true){
			i3GEOpanelEditor.addControls(controles);
			i3GEO.editorOL.mapa.addControl(i3GEOpanelEditor);
		}
	},
	mudaSimbolo: function(estilo,id){
		var valor = $i(id).value,
			geos = i3GEO.desenho.layergrafico.selectedFeatures,
			n = geos.length,
			i;
		i3GEO.editorOL.simbologia[estilo] = valor;
		for(i=0;i<n;i++){
			geos[i].attributes[estilo] = valor;
			geos[i].style[estilo] = valor;
		}
	},
	adicionaMarcas: function(){
		if(i3GEO.editorOL.pontos.length === 0)
		{return;}
		var f,
			SHADOW_Z_INDEX = 10,
			MARKER_Z_INDEX = 11,
			layer = new OpenLayers.Layer.Vector(
					"pontos",
					{
							styleMap: new OpenLayers.StyleMap({
									externalGraphic: i3GEO.editorOL.marca,
									backgroundGraphic: "../pacotes/openlayers/img/marker_shadow.png",
									backgroundXOffset: 0,
									backgroundYOffset: -7,
									graphicZIndex: MARKER_Z_INDEX,
									backgroundGraphicZIndex: SHADOW_Z_INDEX,
									pointRadius: 10
							}),
							isBaseLayer: false,
							rendererOptions: {yOrdering: true},
							displayInLayerSwitcher:true,
							visibility:true
					}
			),
			index,
			x = [],
			y = [],
			features = [];
		for (index = 0; index < i3GEO.editorOL.pontos.length; index = index + 2){
			x.push(i3GEO.editorOL.pontos[index]);
			y.push(i3GEO.editorOL.pontos[index+1]);
		}
		for (index = 0; index < x.length; index++) {
			f = new OpenLayers.Geometry.Point(x[index], y[index]);
			f = i3GEO.util.projGeo2OSM(f);
			f = new OpenLayers.Feature.Vector(
					f
			);
			features.push(
				f
			);
		}
		layer.addFeatures(features);
		i3GEO.editorOL.mapa.addLayer(layer);
	},
	adicionaKml: function(){
		var temp,n,i,id,url;
		n = i3GEO.editorOL.kml.length;
		for(i=0;i<n;i++){
			id = "kml"+i;
			url = i3GEO.editorOL.kml[i];
			eval(id+" = new OpenLayers.Layer.Vector('"+id+"', {displayOutsideMaxExtent:true,displayInLayerSwitcher:false,visibility:true, strategies: [new OpenLayers.Strategy.Fixed()],protocol: new OpenLayers.Protocol.HTTP({url: '"+url+"',format: new OpenLayers.Format.KML({extractStyles: true,extractAttributes: true,maxDepth: 5})})})");
			eval("i3GEO.editorOL.mapa.addLayer("+id+");");
			eval("temp = "+id+".div;");
			temp.onclick = function(e){
				var targ = "",id,temp,features,n,i,g,html="";
				if (!e){e = window.event;}
				if (e.target)
				{targ = e.target;}
				else{
					if (e.srcElement)
					{targ = e.srcElement;}
				}
				if(targ.id){
					temp = targ.id.split("_");
					if(temp[0] === "OpenLayers.Geometry.Point"){
						id = targ.id;
						temp = i3GEO.editorOL.mapa.getLayer(this.id);
						features = temp.features;
						n = features.length;
						for(i=0;i<n;i++){
							if(features[i].geometry.id === id){
								for (var j in features[i].attributes) {
									html += j+": "+features[i].attributes[j];
								}
								g = features[i].geometry;
								i3GEO.editorOL.mapa.addPopup(new OpenLayers.Popup.FramedCloud(
									"kml",
									new OpenLayers.LonLat(g.x,g.y),
									null,
									html,
									null,
									true
								));
							}
						}
					}
				}
			};
		}
	},
	//obtido de openlayers.org
	propriedades: function(){
		if(!document.getElementById("panelpropriedadesEditor")){
			YAHOO.namespace("editorOL.container");
			YAHOO.editorOL.container.panel = new YAHOO.widget.Panel("panelpropriedadesEditor", {zIndex:20000, iframe:true, width:"350px", height:"250px",visible:false, draggable:true, close:true } );
			var ins = "" +
			'<p class=paragrafo ><b>Estilos (utilize a cor no formato r,g,b):</b></p>' +
			'<table class=lista7 >' +
			'	<tr>' +
			'		<td>Cor do contorno</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'strokeColor\',\'i3GEOEditorOLcorContorno\')" type="text" style="cursor:text" id="i3GEOEditorOLcorContorno" size="12" value="'+i3GEO.editorOL.simbologia.strokeColor+'" /></td><td>';
			if(i3GEO.configura)
			{ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEO.util.abreCor(\'\',\'i3GEOEditorOLcorContorno\');" />';}
			ins += "" +
			'		</td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Cor do preenchimento</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'fillColor\',\'i3GEOEditorOLcorPre\')" type="text" style="cursor:text" id="i3GEOEditorOLcorPre" size="12" value="'+i3GEO.editorOL.simbologia.fillColor+'" /></td><td>';
			if(i3GEO.configura)
			{ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEO.util.abreCor(\'\',\'i3GEOEditorOLcorPre\');" />';}
			ins += "" +
			'		</td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Cor da fonte</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'fontColor\',\'i3GEOEditorOLcorFonte\')" type="text" style="cursor:text" id="i3GEOEditorOLcorFonte" size="12" value="'+i3GEO.editorOL.simbologia.fontColor+'" /></td><td>';
			if(i3GEO.configura)
			{ins += '<img alt="aquarela.gif" style=cursor:pointer src="'+i3GEO.configura.locaplic+'/imagens/aquarela.gif" onclick="i3GEO.util.abreCor(\'\',\'i3GEOEditorOLcorFonte\');" />';}
			ins += "" +
			'		</td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Tamanho da fonte</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'fontSize\',\'i3GEOEditorOLfontsize\')" type="text" style="cursor:text" id="i3GEOEditorOLfontsize" size="3" value="'+i3GEO.editorOL.simbologia.fontSize+'" /></td><td></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Opacidade (de 0 a 1)</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'opacidade\',\'i3GEOEditorOLopacidade\')" type="text" style="cursor:text" id="i3GEOEditorOLopacidade" size="3" value="'+i3GEO.editorOL.simbologia.opacidade+'" /></td><td></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Largura da linha/contorno</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'strokeWidth\',\'i3GEOEditorOLlarguraLinha\')" type="text" style="cursor:text" id="i3GEOEditorOLlarguraLinha" size="2" value="'+i3GEO.editorOL.simbologia.strokeWidth+'" /></td><td></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Url de uma figura</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'externalGraphic\',\'i3GEOEditorOLexternalGraphic\')" type="text" style="cursor:text" id="i3GEOEditorOLexternalGraphic" size="22" value="'+i3GEO.editorOL.simbologia.externalGraphic+'" /></td><td></td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td>Largura e altura</td><td><input onchange="i3GEO.editorOL.mudaSimbolo(\'graphicWidth\',\'i3GEOEditorOLgraphicWidth\')" type="text" style="cursor:text" id="i3GEOEditorOLgraphicWidth" size="4" value="'+i3GEO.editorOL.simbologia.graphicWidth+'" />&nbsp;<input onchange="i3GEO.editorOL.mudaSimbolo(\'graphicHeight\',\'i3GEOEditorOLgraphicHeight\')" type="text" style="cursor:text" id="i3GEOEditorOLgraphicHeight" size="4" value="'+i3GEO.editorOL.simbologia.graphicHeight+'" /></td><td></td>' +
			'	</tr>' +
			'</table>' +
			'<br />' +
			'<p class=paragrafo ><b>Ajusta n&oacute; em edi&ccedil;&atilde;o para o(a):</b></p>' +
			'<table class=lista7 >' +
			'	<tr>' +
			'		<td></td><td>n&oacute</td><td></td><td>v&eacute;rtice</td><td></td><td>borda</td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.snap()" type="checkbox" id="target_node" /></td><td><input onchange="i3GEO.editorOL.snap()" id="target_nodeTolerance" type="text" size="3" value=15 /></td>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.snap()" type="checkbox" id="target_vertex" /></td><td><input onchange="i3GEO.editorOL.snap()" id="target_vertexTolerance" type="text" size="3" value=15 /></td>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.snap()" type="checkbox" id="target_edge" /></td><td><input onchange="i3GEO.editorOL.snap()" id="target_edgeTolerance" type="text" size="3" value=15 /></td>' +
			'	</tr>' +
			'</table>' +
			'<br />' +
			'<p class=paragrafo ><b>Divide intersec&ccedil;&atilde;o ao digitalizar</b></p>' +
			'<table class=lista7 >' +
			'	<tr>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.split()" type="checkbox" id="edge_split_toggle" /></td><td>borda</td>' +
			'	</tr>' +
			'</table>' +
			'<br />' +
			'<p class=paragrafo ><b>Opera&ccedil;&atilde;o ativada pelo bot&atilde;o de modifica&ccedil;&atilde;o da figura</b></p>' +
			'<table class=lista7 >' +
			'	<tr>' +
			'		<td><input checked style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.RESHAPE;" type="radio" name=i3geoOLtipoEdita /></td><td>altera figura</td>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.RESIZE;" type="radio" name=i3geoOLtipoEdita /></td><td>altera tamanho</td>' +
			'	</tr>' +
			'	<tr>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.ROTATE;" type="radio" name=i3geoOLtipoEdita /></td><td>rotaciona</td>' +
			'		<td><input style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.DRAG;" type="radio" name=i3geoOLtipoEdita /></td><td>desloca</td>' +
			'	</tr>' +
			'</table>';
			YAHOO.editorOL.container.panel.setBody(ins);
			if(i3GEO && typeof i3GEO != undefined && i3GEO != "")
			{YAHOO.editorOL.container.panel.setHeader("Propriedades<div id='panelpropriedadesEditor_minimizaCabecalho' class='container-minimiza'></div>");}
			else
			{YAHOO.editorOL.container.panel.setHeader("Propriedades");}

			YAHOO.editorOL.container.panel.setFooter("");
			YAHOO.editorOL.container.panel.render(document.body);

			YAHOO.editorOL.container.panel.center();
			YAHOO.util.Event.addListener(YAHOO.editorOL.container.panel.close, "click", function(){});
			temp = $i("panelpropriedadesEditor_minimizaCabecalho");
			if(temp){
				temp.onclick = function(){i3GEO.janela.minimiza("panelpropriedadesEditor");};
			}
		}
		YAHOO.editorOL.container.panel.show();
		temp = $i("panelpropriedadesEditor").getElementsByTagName("div");
		if(temp && temp[2]){
			temp[2].style.overflow = "auto";
		}
	},
	listaGeometrias: function(){
		if(!document.getElementById("panellistagEditor")){
			YAHOO.namespace("editorOL.listaGeometrias");
			YAHOO.editorOL.listaGeometrias.panel = new YAHOO.widget.Panel("panellistagEditor", {zIndex:20000, iframe:true, width:"320px", visible:false, draggable:true, close:true } );
			if(i3GEO && typeof i3GEO != undefined && i3GEO != "")
			{YAHOO.editorOL.listaGeometrias.panel.setHeader($trad("u6")+" <div id='panellistagEditor_minimizaCabecalho' class='container-minimiza'></div>");}
			else
			{YAHOO.editorOL.listaGeometrias.panel.setHeader($trad("u6"));}
			YAHOO.editorOL.listaGeometrias.panel.setFooter("");
			YAHOO.editorOL.listaGeometrias.panel.render(document.body);
			YAHOO.editorOL.listaGeometrias.panel.center();
			YAHOO.util.Event.addListener(YAHOO.editorOL.listaGeometrias.panel.close, "click", function(){
				YAHOO.editorOL.listaGeometrias.panel.destroy();
			});
			temp = $i("panellistagEditor_minimizaCabecalho");
			if(temp){
				temp.onclick = function(){i3GEO.janela.minimiza("panellistagEditor");};
			}
		}
		else{
			YAHOO.editorOL.listaGeometrias.panel.render(document.body);
		}
		var g,temp,
			geos = i3GEO.desenho.layergrafico.features,
			n = geos.length,
			ins = "<table class=lista4 >";
		ins += "<tr><td><i>"+$trad("u6")+"</i></td><td><i>"+$trad("opcoes")+"</i></td><td></td><td></td></tr>";

		while(n > 0){
			n -= 1;
			g = geos[n].geometry;
			ins += "<tr><td>"+g.CLASS_NAME+"</td><td style='cursor:pointer;color:blue' onclick='javascript:i3GEO.editorOL.selFeature("+n+")'>seleciona</td><td style='cursor:pointer;color:blue' onclick='javascript:i3GEO.editorOL.unselFeature("+n+")'>limpa</td><td style='cursor:pointer;color:blue' onclick='javascript:i3GEO.editorOL.flashFeaturesI("+n+")'>brilha</td></tr>";
		}
		ins += "</table>";
		if(geos.length === 0){
			ins = $trad("meneditor2");
		}
		YAHOO.editorOL.listaGeometrias.panel.show();
		if(i3GEO.configura)
		{temp = $i("panellistagEditor").getElementsByTagName("div")[2];}
		else
		{temp = $i("panellistagEditor").getElementsByTagName("div")[1];}
		temp.style.overflow = "auto";
		temp.style.height = "100px";
		temp.innerHTML = ins;
	},
	ferramentas: function(){
		if(!document.getElementById("panelferramentasEditor")){
			YAHOO.namespace("editorOL.ferramentas");
			YAHOO.editorOL.ferramentas.panel = new YAHOO.widget.Panel("panelferramentasEditor", {zIndex:20000, iframe:true, width:"300px", visible:false, draggable:true, close:true } );
			var ins = "" +
			'<p class=paragrafo >'+$trad("opsel")+':</p>' +
			'<select onchange="i3GEO.editorOL.processageo(this.value);this.value = \'\'" >' +
			'	<option value="">---</option>' +
			'	<option value=union >Uni&atilde;o</option>';
			if(i3GEO.php){
				ins += '	<option value=intersection >Intersec&ccedil;&atilde;o</option>' +
				'	<option value=convexhull >Convex hull</option>' +
				'	<option value=boundary >Bordas</option>' +
				'	<option value=difference >Diferen&ccedil;a</option>' +
				'	<option value=symdifference >Diferen&ccedil;a sim&eacute;trica</option>';
			}
			ins += '</select>'+
			'<br><br><a class=paragrafo href=# onclick="i3GEO.desenho.layergrafico.destroyFeatures()" >Apaga tudo</a>';

			YAHOO.editorOL.ferramentas.panel.setBody(ins);
			if(i3GEO && typeof i3GEO != undefined && i3GEO != "")
			{YAHOO.editorOL.ferramentas.panel.setHeader("Ferramentas <div id='panelferramentasEditor_minimizaCabecalho' class='container-minimiza'></div>");}
			else
			{YAHOO.editorOL.ferramentas.panel.setHeader("Ferramentas");}

			YAHOO.editorOL.ferramentas.panel.setFooter("");
			YAHOO.editorOL.ferramentas.panel.render(document.body);
			YAHOO.editorOL.ferramentas.panel.center();
			YAHOO.util.Event.addListener(YAHOO.editorOL.ferramentas.panel.close, "click", function(){
			});
			temp = $i("panelferramentasEditor_minimizaCabecalho");
			if(temp){
				temp.onclick = function(){i3GEO.janela.minimiza("panelferramentasEditor");};
			}
		}
		else{
			YAHOO.editorOL.ferramentas.panel.render(document.body);
		}
		YAHOO.editorOL.ferramentas.panel.show();
	},
	snap: function(){
		var target = i3GEOOLsnap.targets[0],
			tipos = ["node","vertex","edge"],
			ntipos = tipos.length,
			i,
			temp,
			ativa = false;
		i3GEOOLsnap.deactivate();
		for(i=0;i<ntipos;i++){
			temp = $i("target_"+tipos[i]);
			target[tipos[i]] = temp.checked;
			if(temp.checked === true)
			{ativa = true;}
			temp = $i("target_"+tipos[i]+"Tolerance");
			target[tipos[i]+"Tolerance"] = temp.value;
		}
		if(ativa === true)
		{i3GEOOLsnap.activate();}
	},
	split: function(){
		i3GEOOLsplit.deactivate();
		var temp = $i("edge_split_toggle");
		if(temp.checked === true)
		{i3GEOOLsplit.activate();}
	},
	processageo: function(operacao){
		if(operacao === ""){return;}
		var geosel = i3GEO.desenho.layergrafico.selectedFeatures,
			polis,linhas,pontos,temp;
		if(geosel.length > 0){
			polis = i3GEO.editorOL.retornaGeometriasTipo(geosel,"OpenLayers.Geometry.Polygon");
			linhas = i3GEO.editorOL.retornaGeometriasTipo(geosel,"OpenLayers.Geometry.LineString");
			pontos = i3GEO.editorOL.retornaGeometriasTipo(geosel,"OpenLayers.Geometry.Point");
			temp = function(retorno){
				if(i3GEO.janela){
					i3GEO.janela.fechaAguarde("i3GEO.editorPoli");
					i3GEO.janela.fechaAguarde("i3GEO.editorLinhas");
					i3GEO.janela.fechaAguarde("i3GEO.editorPontos");
				}
				if(retorno != "" && retorno.data && retorno.data != "" && operacao != "converteSHP")
				{i3GEO.editorOL.substituiFeaturesSel(retorno.data);}
				if(operacao === "converteSHP"){
					i3GEO.atualiza();
					i3GEO.janela.minimiza("paneltemaativo");
				}
			};
			if(operacao === "incorporar"){
				if(polis.length > 0){
					temp = i3GEO.editorOL.merge(polis);
				}
				if(linhas.length > 0){
					temp = i3GEO.editorOL.merge(linhas);
				}
				if(pontos.length > 0){
					temp = i3GEO.editorOL.merge(pontos);
				}
				if(i3GEO.mapa){
					i3GEO.mapa.dialogo.wkt2layer(temp);
				}
				return;
			}
			if(operacao === "union" && !i3GEO.php ){
				if(polis.length > 0){
					temp = i3GEO.editorOL.uniaojts(polis);
					i3GEO.editorOL.substituiFeaturesSel(temp);
				}
				if(linhas.length > 0){
					temp = i3GEO.editorOL.uniaojts(linhas);
					i3GEO.editorOL.substituiFeaturesSel(temp);
				}
				if(pontos.length > 0){
					temp = i3GEO.editorOL.uniaojts(pontos);
					i3GEO.editorOL.substituiFeaturesSel(temp);
				}
			}
			else{
				if(polis.length > 0){
					i3GEO.janela.abreAguarde("i3GEO.editorPoli","Poligonos");
					i3GEO.php.funcoesGeometriasWkt(temp,polis.join("|"),operacao);
				}
				if(linhas.length > 0){
					i3GEO.janela.abreAguarde("i3GEO.editorLinhas","Linhas");
					i3GEO.php.funcoesGeometriasWkt(temp,linhas.join("|"),operacao);
				}
				if(pontos.length > 0){
					i3GEO.janela.abreAguarde("i3GEO.editorPontos","Pontos");
					i3GEO.php.funcoesGeometriasWkt(temp,pontos.join("|"),operacao);
				}
			}
			return;
		}
		else{
			i3GEO.janela.tempoMsg("Selecione pelo menos dois elementos");
		}
	},
	merge: function(geoms){
		var n = geoms.length,
		w = new Wkt.Wkt(),
		g,
		m,
		i;
		w.read(geoms[0].toString());
		if(n > 1){
			for(i=1;i < n;i++){
				g = geoms[i].toString();
				m = new Wkt.Wkt();
				m.read(g);
				w.merge(m);
			}
		}
		return w.write();
	},
	uniaojts: function(geoms){
		var n = geoms.length,
				rwkt = new jsts.io.WKTReader(),
				wwkt = new jsts.io.WKTWriter(),
				fwkt = new OpenLayers.Format.WKT(),
				g,
				i,uniao;
		if(n > 1){
			uniao = (fwkt.read(geoms[0]).geometry).toString();
			uniao = rwkt.read(uniao);
			for(i=1;i <= n;i++){
				g = (fwkt.read(geoms[i]).geometry).toString();
				uniao = uniao.union(rwkt.read(g));
			}
			uniao = wwkt.write(uniao);
			return [fwkt.read(uniao)];
		}
		else
		{return false;}
	},
	retornaGeometriasTipo: function(features,tipo){
		var n = features.length,
			lista = [],
			i,temp;
		for(i=0;i<n;i++){
			temp = features[i].geometry;
			if(temp.CLASS_NAME == tipo){
				lista.push(temp);
			}
		}
		return lista;
	},
	guardaBackup: function(){
		return;
		//if(!i3GEO.editorOL.backup)
		//{i3GEO.editorOL.backup = new OpenLayers.Layer.Vector("Backup",{displayInLayerSwitcher:false,visibility:false});}
		//else
		//{i3GEO.editorOL.backup.removeFeatures(i3GEO.editorOL.backup.features);}
		//i3GEO.editorOL.backup.addFeatures(i3GEO.desenho.layergrafico.features);
	},
	unselTodos:function(){
		var n,i;
		n = i3GEO.desenho.layergrafico.features.length;
		for(i=0;i<n;i++){
			i3GEO.desenho.layergrafico.features[i].renderIntent = "default";
			i3GEO.editorOL.selbutton.unselect(i3GEO.desenho.layergrafico.features[i]);
		}
	},
	unselTodosBackup:function(){
		var n,i;
		n = i3GEO.editorOL.backup.features.length;
		for(i=0;i<n;i++){
			i3GEO.editorOL.backup.features[i].renderIntent = "default";
			i3GEO.editorOL.selbutton.unselect(i3GEO.editorOL.backup.features[i]);
		}
	},
	restauraBackup: function(){
		if(i3GEO.editorOL.backup.features.length > 0){
			i3GEO.desenho.layergrafico.removeFeatures(i3GEO.desenho.layergrafico.features);
			i3GEO.desenho.layergrafico.addFeatures(i3GEO.editorOL.backup.features);
		}
		if(document.getElementById("panellistagEditor"))
		{i3GEO.editorOL.listaGeometrias();}
		//i3GEO.editorOL.backup.removeFeatures(i3GEO.editorOL.backup.features);
	},
	substituiFeaturesSel: function(wkt){
		i3GEO.editorOL.guardaBackup();
		try{
			var f,fwkt = new OpenLayers.Format.WKT();
			i3GEO.desenho.layergrafico.removeFeatures(i3GEO.desenho.layergrafico.selectedFeatures);
			f = fwkt.read(wkt);
			f["attributes"] = {
				opacidade: i3GEO.editorOL.simbologia.opacidade,
				texto: i3GEO.editorOL.simbologia.texto,
				fillColor: i3GEO.editorOL.simbologia.fillColor,
				strokeWidth: i3GEO.editorOL.simbologia.strokeWidth,
				strokeColor: i3GEO.editorOL.simbologia.strokeColor,
				pointRadius: i3GEO.editorOL.simbologia.pointRadius,
				graphicName: i3GEO.editorOL.simbologia.graphicName
			};
			i3GEO.desenho.layergrafico.addFeatures([f]);
			if(document.getElementById("panellistagEditor"))
			{i3GEO.editorOL.listaGeometrias();}
		}
		catch(e)
		{i3GEO.editorOL.restauraBackup();}
	},
	adicionaFeatureWkt: function(wkt,atributos){
		var f,fwkt = new OpenLayers.Format.WKT();

		if(atributos.externalGraphic && atributos.externalGraphic != ""){
			var style_mark = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
			style_mark.externalGraphic = atributos.externalGraphic;
			style_mark.graphicWidth = atributos.graphicWidth;
			style_mark.graphicHeight = atributos.graphicHeight;
			style_mark.fillOpacity = atributos.opacidade;
			f = fwkt.read(wkt);
			f["attributes"] = atributos;
			f["style"] = style_mark;
		}
		else{
			f = fwkt.read(wkt);
			f["attributes"] = atributos;
		}
		i3GEO.desenho.layergrafico.addFeatures([f]);
		if(document.getElementById("panellistagEditor"))
		{i3GEO.editorOL.listaGeometrias();}
	},
	flashFeaturesI: function(index){
		i3GEO.editorOL.flashFeatures([i3GEO.desenho.layergrafico.features[index]],0);
	},
	flashFeatures: function(features, index) {
		if(!index) {
			index = 0;
		}
		var current = features[index];
		if(current && current.layer === i3GEO.desenho.layergrafico) {
			i3GEO.desenho.layergrafico.drawFeature(features[index], "select");
		}
		var prev = features[index-1];
		if(prev && prev.layer === i3GEO.desenho.layergrafico) {
			i3GEO.desenho.layergrafico.drawFeature(prev, "default");
		}
		++index;
		if(index <= features.length) {
			window.setTimeout(function() {i3GEO.editorOL.flashFeatures(features, index);}, 75);
		}
	},
	selFeature: function(index) {
		i3GEO.editorOL.selbutton.select(i3GEO.desenho.layergrafico.features[index]);
	},
	unselFeature: function(index) {
		i3GEO.editorOL.selbutton.unselect(i3GEO.desenho.layergrafico.features[index]);
	},
	carregajts: function(funcao){
		if(i3GEO.configura)
		{i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/pacotes/jsts/lib/jsts.js",funcao,"i3GEOjts",true);}
		else
		{i3GEO.util.scriptTag("../pacotes/jsts/lib/jsts.js",funcao,"i3GEOjts",true);}
	},
	trazParaFrente: function(){
		var features = i3GEO.desenho.layergrafico.selectedFeatures;
		if(features.length > 0){
			i3GEO.editorOL.backup = new OpenLayers.Layer.Vector("Backup",{displayInLayerSwitcher:false,visibility:false});
			i3GEO.editorOL.backup.addFeatures(features);
			i3GEO.editorOL.unselTodosBackup();
			i3GEO.desenho.layergrafico.removeFeatures(features);
			i3GEO.desenho.layergrafico.addFeatures(i3GEO.editorOL.backup.features);
			if(document.getElementById("panellistagEditor"))
			{i3GEO.editorOL.listaGeometrias();}
		}
		else{
			i3GEO.janela.tempoMsg("Selecione pelo menos um elemento");
		}
	},
	pegaControle: function(classe){
		var n = i3GEO.editorOL.controles.length,
			i;
		for(i=0;i<n;i++){
			if(i3GEO.editorOL.controles[i].CLASS_NAME === classe)
			{return i3GEO.editorOL.controles[i];}
		}
		return false;
	},
	ativaLayerSwitcher: function(){
		var ls = i3GEO.editorOL.pegaControle("OpenLayers.Control.LayerSwitcher");
		if(ls){
			ls.maximizeDiv.click();
		}
	},
	desativaRodaDoMouse: function(){
		var controls = i3GEO.editorOL.mapa.getControlsByClass('OpenLayers.Control.Navigation');
		for(var i = 0; i<controls.length; ++i){controls[i].disableZoomWheel();}
	},
	google2wgs: function(obj){
		if(i3GEO.Interface.openlayers.googleLike === true){
			var projWGS84 = new OpenLayers.Projection("EPSG:4326"),
				proj900913 = new OpenLayers.Projection("EPSG:900913");
			return obj.transform(proj900913, projWGS84);
		}
		else{
			return obj;
		}
	},
	sobeLayersGraficos : function() {
		var nlayers = i3GEO.editorOL.mapa.getNumLayers(), layers = i3GEO.editorOL.mapa.layers, i;
		for (i = 0; i < nlayers; i++) {
			if (layers[i].CLASS_NAME == "OpenLayers.Layer.Vector"
					&& layers[i].name != "Nenhum") {
				i3GEO.editorOL.mapa.raiseLayer(i3GEO.editorOL.mapa.layers[i], nlayers);
			}
		}
	}
};

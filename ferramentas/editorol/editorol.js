//TODO incluir balao de informacoes como um elemento grafico de desenho
//TODO incluir caixas de texto
//TODO incluir undo na edicao
//TODO incluir opção para digitar coordenadas do novo ponto ou vertice

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

if (!i3GEO || typeof (i3GEO) === 'undefined') {
	var i3GEO = {};
	i3GEO.Interface = {};
	navn = false;
	navm = false;
	$i = function(id) {
		return document.getElementById(id);
	};
	app = navigator.appName.substring(0, 1);
	if (app === 'N') {
		navn = true;
	} else {
		navm = true;
	}
}
i3GEO.editorOL = {
		interacoes: "",
		MUSTACHESALVAGEOMETRIAS: "",
		MUSTACHEFERRAMENTAS: "",
		MUSTACHEPROPRIEDADES: "",
		layerDefault: "",
		simbologia : {
			opacidade : 0.8,
			texto : "",
			fillColor : "250,180,15",
			strokeWidth : 5,
			strokeColor : "250,150,0",
			pointRadius : 6,
			graphicName : "square",
			fontSize : "12px",
			fontColor : "0,0,0",
			externalGraphic : "",
			graphicHeight : 25,
			graphicWidth : 25
		},
		backup : new ol.layer.Vector({
			source : new ol.source.Vector({
				features : new ol.Collection(),
				useSpatialIndex : false,
				name : "Backup"
			}),
			//map : i3geoOL,
			visible : false
		}),
		fundo: "",
		nomeFuncaoSalvar : "i3GEO.editorOL.salvaGeo()",
		kml : [],
		layersIniciais : [],
		//essa configuracao dos botoes afeta apenas o mashup
		//para a configuração do editor dentro de um mapa normal, veja i3GEO.editor.ativaPainel()
		botoes : {},
		pontos : [],
		marca : "../pacotes/openlayers/img/marker-gold.png",
		controles : [],
		tiles : true,
		incluilayergrafico : true,
		ativalayerswitcher : false,
		ativarodadomouse : true,
		legendahtml : false,
		numzoom : 12,
		minresolution : 0.703125,
		maxext : "",
		mapext : [-76.5125927, -39.3925675209, -29.5851853, 9.49014852081],
		mapa : "",
		//ids das features graficas selecionadas
		idsSelecionados : [],
		//backup das features
		featuresBackup : [],
		resolutions : [],
		matrixIds : [],
		//utilizado pelo mashup
		inicia : function() {
			var projectionExtent, size,resolutions,matrixIds,z;
			if (i3GEO.Interface.openlayers.googleLike === true) {
				projectionExtent = ol.proj.get('EPSG:3857').getExtent();
			} else {
				projectionExtent = ol.proj.get('EPSG:4326').getExtent();
			}
			size = ol.extent.getWidth(projectionExtent) / 256;
			resolutions = new Array(40);
			matrixIds = new Array(40);
			for (z = 0; z < 40; ++z) {
				resolutions[z] = size / Math.pow(2, z);
				matrixIds[z] = z;
			}
			i3GEO.editorOL.resolutions = resolutions;
			i3GEO.editorOL.matrixIds = matrixIds;

			i3GEO.editorOL.incluilayergrafico = true;

			i3GEO.Interface.openlayers.parametrosView = {
					projection : "EPSG:4326",
					resolutions: resolutions,
					minResolution: i3GEO.editorOL.minresolution,
					maxResolution: resolutions[i3GEO.editorOL.numzoom]
			};
			i3GEO.Interface.openlayers.parametrosMap = {
					target : "i3geoMapa",
					layers : [],
					controls : []
			};

			i3GEO.Interface.openlayers.cria();
			i3GEO.editorOL.mapa = i3geoOL;
		},
		criaLayerGrafico : function() {
			i3GEO.desenho.openlayers.criaLayerGrafico();
		},
		layersLigados : function() {
			var l, layers = i3GEO.editorOL.mapa.getLayers(), nlayers = layers.getLength(), ins = [], i;
			for (i = 0; i < nlayers; i++) {
				l = layers.item(i);
				if (l.getVisible() === true) {
					ins.push(l);
				}
			}
			return ins;
		},
		layerPorParametro : function(parametro, valor) {
			var layers = i3GEO.editorOL.mapa.layers, nlayers = layers.length, ins = [], i;
			for (i = 0; i < nlayers; i++) {
				if (layers[i][parametro] || layers[i][parametro.toLowerCase()]) {
					if (layers[i][parametro] === valor || layers[i][parametro.toLowerCase()] === valor) {
						ins.push(layers[i]);
					}
				} else {
					if (layers[i].params && layers[i].params[parametro] && layers[i].params[parametro] === valor) {
						ins.push(layers[i]);
					}
				}
			}
			return ins;
		},
		// layers clonados sao copias WMS de layers TMS necessarios para realizar o getfeature
		// sao criados quando o layer e adicionado
		layersClonados : function(paramsLayers) {
			var layers = i3GEO.editorOL.mapa.layers, nlayers = layers.length, i;
			for (i = 0; i < nlayers; i++) {
				if (layers[i].params && layers[i].params.CLONETMS === paramsLayers) {
					return (layers[i]);
				}
			}
			return false;
		},
		layertms2wms : function(tms) {
			var layer, url;
			url = tms.url.replace("&cache=sim", "&DESLIGACACHE=sim");
			url = url.replace("&Z=${z}&X=${x}&Y=${y}", "");
			url = url.replace("Z=${z}&X=${x}&Y=${y}", "");
			layer = new OpenLayers.Layer.WMS(tms.layername + "_clone", url, {
				layers : tms.name,
				transparent : true
			}, {
				gutter : 0,
				isBaseLayer : false,
				displayInLayerSwitcher : false,
				opacity : 1,
				visibility : true,
				singleTile : true
			});
			// i3GEO.editorOL.mapa.addLayer(layer);
			return layer;
		},
		// remove o layer clonado com layertms2wms
		removeClone : function() {
			var nome = i3GEO.editorOL.layerAtivo().layername + "_clone", busca = i3GEO.editorOL.mapa.getLayersByName(nome);
			if (busca.length > 0) {
				i3GEO.editorOL.mapa.removeLayer(i3GEO.editorOL.mapa.getLayersByName(camada.name)[0], false);
			}
		},
		coordenadas : function() {
			//
			// substitui o controle que mostra as coordenadas
			//
			var idcoord = i3GEO.editorOL.mapa.getControlsBy("separator", " ");
			if (idcoord[0]) {
				i3GEO.editorOL.mapa.events.register("mousemove", i3GEO.editorOL.mapa, function(e) {
					var p, lonlat, d;
					if (navm) {
						p = new OpenLayers.Pixel(e.x, e.y);
					} else {
						p = e.xy;
					}
					// altera o indicador de localizacao
					lonlat = i3GEO.editorOL.mapa.getLonLatFromPixel(p);
					lonlat = i3GEO.util.projOSM2Geo(lonlat);
					d = i3GEO.calculo.dd2dms(lonlat.lon, lonlat.lat);
					try {
						$i(idcoord[0].id).innerHTML = "Long: " + d[0] + "<br>Lat: " + d[1];
					} catch (e) {
						if (typeof (console) !== 'undefined') {
							console.error(e);
						}
					}
				});
			}
		},
		criaJanelaBusca : function() {
			var layers = i3GEO.editorOL.layersLigados(), nlayers = layers.length, i, ins, combo =
				"<select id=i3GEOOLlistaTemasBusca ><option value=''>----</option>";
			for (i = 0; i < nlayers; i++) {
				combo += "<option value='" + i + "' >" + layers[i].getProperties().name + "</option>";
			}
			combo += "</select>";
			ins = "<div class=paragrafo >" + $trad("a7") + ":<br>" + combo;
			ins += "<br>" + $trad("x64") + ":<br><span id=i3GEOOLcomboitens ></span>";
			ins += "<br>" + $trad("t23") + ":<br><input type=text size=20 id=i3GEOOLpalavraBusca >";
			ins += "<br><br><input type=button value='" + $trad("t23") + "' id='i3GEOOLbotaoBusca' ></div>";
			ins += "<br>'" + $trad("result") + "':<br><span id=i3GEOOLcomboresultado ></span>";

			YAHOO.namespace("procura.container");
			YAHOO.procura.container.panel = new YAHOO.widget.Panel("panelprocura", {
				zIndex : 2000,
				iframe : false,
				width : "250px",
				visible : false,
				draggable : true,
				close : true,
				strings: {close: "<span class='material-icons'>cancel</span>"}
			});
			YAHOO.procura.container.panel.setHeader("Encontre no mapa");
			YAHOO.procura.container.panel.setBody(ins);
			YAHOO.procura.container.panel.setFooter("");
			YAHOO.procura.container.panel.render(document.body);
			YAHOO.procura.container.panel.center();

			document.getElementById("i3GEOOLbotaoBusca").onclick =
				function() {
				var layer = i3GEO.editorOL.layerAtivo(), item = document.getElementById("i3GEOOLbuscaItem").value, palavra =
					document.getElementById("i3GEOOLpalavraBusca").value;
				if (item === "" || palavra === "") {
					alert("Escolha o item e o texto de busca");
					return;
				}
				i3GEO.editorOL.busca(layer, item, palavra, "i3GEOOLcomboresultado");
			};
			document.getElementById("i3GEOOLlistaTemasBusca").onchange = function() {
				i3GEO.editorOL.ativaTema(this.value);
				document.getElementById("i3GEOOLcomboitens").innerHTML = "...";
				i3GEO.editorOL.listaItens(i3GEO.editorOL.layerAtivo(), "i3GEOOLcomboitens", "i3GEOOLbuscaItem");
			};

		},
		criaComboTemas : function() {
			var layers = i3GEO.editorOL.layersLigados(), nlayers = layers.length, i, nometema = "", combo =
				"<select id=i3GEOOLlistaTemasAtivos style=width:235px; >";
			// i3GEO.desenho.layergrafico.setLayerIndex(i3GEO.editorOL.getNumLayers() + 1);
			for (i = 0; i < nlayers; i++) {
				// pega o nome do tema
				nometema = layers[i].getProperties().title;
				combo += "<option value='" + layers[i].getProperties().name + "' >" + nometema + "</option>";
			}
			combo += "</select>";
			return combo;
		},
		atualizaJanelaAtivaTema : function() {
			var combo = i3GEO.editorOL.criaComboTemas();
			YAHOO.temaativo.container.panel.setBody(combo);
		},
		criaJanelaAtivaTema : function() {
			var temp;
			if (!document.getElementById("paneltemaativo")) {
				YAHOO.namespace("temaativo.container");
				YAHOO.temaativo.container.panel = new YAHOO.widget.Panel("paneltemaativo", {
					zIndex : 20000,
					iframe : true,
					width : "250px",
					visible : false,
					draggable : true,
					close : true,
					strings: {close: "<span class='material-icons'>cancel</span>"}
				});
				YAHOO.temaativo.container.panel.setBody("");
				if (i3GEO && typeof i3GEO != undefined && i3GEO != "") {
					YAHOO.temaativo.container.panel
					.setHeader("Tema ativo<div id='paneltemaativo_minimizaCabecalho' class='container-minimiza'></div>");
				} else {
					YAHOO.temaativo.container.panel.setHeader($trad("tativo"));
				}
				YAHOO.temaativo.container.panel.setFooter("");
				YAHOO.temaativo.container.panel.render(document.body);
				YAHOO.temaativo.container.panel.show();
				YAHOO.temaativo.container.panel.center();
				i3GEO.editorOL.atualizaJanelaAtivaTema();
				YAHOO.util.Event.addListener(YAHOO.temaativo.container.panel.close, "click", function() {
					i3GEO.editorOL.marcaBotao();
					if (i3GEO.eventos) {
						i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS", [
							"i3GEO.editorOL.atualizaJanelaAtivaTema()"
							]);
					}
				});
				if (i3GEO && typeof i3GEO != undefined && i3GEO != "") {
					if (i3GEO.eventos) {
						i3GEO.eventos.adicionaEventos("ATUALIZAARVORECAMADAS", [
							"i3GEO.editorOL.atualizaJanelaAtivaTema()"
							]);
					}
				}
				temp = $i("paneltemaativo_minimizaCabecalho");
				if (temp) {
					temp.onclick = function() {
						i3GEO.janela.minimiza("paneltemaativo");
					};
				}
			} else {
				YAHOO.temaativo.container.panel.show();
				i3GEO.editorOL.atualizaJanelaAtivaTema();
			}
		},
		ativaTema : function(id) {
			document.getElementById("i3GEOOLlistaTemasAtivos").value = id;
		},
		layerAtivo : function() {
			if(i3GEO.editorOL.layerDefault && i3GEO.editorOL.layerDefault != ""){
				return i3GEO.editorOL.layerPorParametro("LAYERS",i3GEO.editorOL.layerDefault);
			} else {
				var id = document.getElementById("i3GEOOLlistaTemasAtivos");
				if (id) {
					id = id.value;
				} else {
					id = i3GEO.temaAtivo;
				}
				if (id == "") {
					return [];
				} else {
					return i3GEO.editorOL.layersLigados()[id];
				}
			}
		},
		listaItens : function(layer, idonde, idobj) {
			if (!layer) {
				return;
			}
			if (!layer.params) {
				return;
			}
			var u = layer.url + "&request=describefeaturetype&service=wfs&version=1.0.0";
			u += "&typename=" + layer.params.LAYERS;
			document.body.style.cursor = "wait";
			document.getElementById("i3geoMapa").style.cursor = "wait";
			OpenLayers.Request.issue({
				method : "GET",
				url : u,
				callback : function(retorno) {
					document.body.style.cursor = "default";
					document.getElementById("i3geoMapa").style.cursor = "default";
					var fromgml = new OpenLayers.Format.WFSDescribeFeatureType({
						geometryName : "msGeometry"
					}), gml = fromgml.read(retorno.responseText), prop = gml.featureTypes[0].properties, nprop = prop.length, i, combo =
						"<select id=" + idobj + " ><option value=''>----</option>";
					for (i = 0; i < nprop; i++) {
						combo += "<option value=" + prop[i].name + " >" + prop[i].name + "</option>";
					}
					combo += "</select>";
					document.getElementById(idonde).innerHTML = combo;
				},
				failure : function() {
					document.body.style.cursor = "default";
					document.getElementById("i3geoMapa").style.cursor = "default";
					alert("Erro");
				}
			});
		},
		busca : function(layer, item, palavra, onde) {
			document.body.style.cursor = "wait";
			document.getElementById("i3geoMapa").style.cursor = "wait";
			var u = layer.url + "&request=getfeature&service=wfs&version=1.0.0";
			u = u.replace("Z=${z}&X=${x}&Y=${y}", "");
			u += "&OUTPUTFORMAT=gml2&typename=" + layer.params.LAYERS;
			u +=
				"&filter=<Filter><PropertyIsLike wildcard=* singleChar=. escape=! ><PropertyName>" + item
				+ "</PropertyName><Literal>*"
				+ palavra
				+ "*</Literal></PropertyIsLike></Filter>";
			document.body.style.cursor = "wait";
			document.getElementById("i3geoMapa").style.cursor = "wait";
			document.getElementById(onde).innerHTML = "...";
			OpenLayers.Request.issue({
				method : "GET",
				url : u,
				callback : function(retorno) {
					document.body.style.cursor = "default";
					document.getElementById("i3geoMapa").style.cursor = "default";
					var fromgml = new OpenLayers.Format.GML({
						geometryName : "msGeometry"
					}), gml = fromgml.read(retorno.responseText), ngml = gml.length, i, ins =
						"<select onchange='i3GEO.editorOL.zoomPara(this.value)'>";
					ins += "<option value=''>---</option>";
					for (i = 0; i < ngml; i++) {
						eval("var valor = gml[i].data." + item);
						var bounds = gml[i].geometry.getBounds();
						bounds = bounds.toBBOX();
						ins += "<option value='" + bounds + "'>" + valor + "</option>";
					}
					ins += "</select>";
					document.getElementById(onde).innerHTML = ins;
				},
				failure : function() {
					document.body.style.cursor = "default";
					document.getElementById("i3geoMapa").style.cursor = "default";
					alert("Erro");
				}
			});
		},
		zoomPara : function(bbox) {
			var b = new OpenLayers.Bounds.fromString(bbox);
			i3GEO.editorOL.mapa.zoomToExtent(b);
		},
		mostraLegenda : function() {
			var prop, layer, layers = i3GEO.editorOL.mapa.getLayers(), nlayers = layers.getLength(), ins = "", i, icone = "", url, f = "", fonte = "";
			for (i = 0; i < nlayers; i++) {
				layer = layers.item(i);
				prop = layer.getProperties();
				//monta a url para fazer a requisicao da legenda
				//para os temas que nao sao baselayers
				if(prop.source.getUrls){
					url = prop.source.getUrls()[0];
					url = url.replace("&cache=sim", "&DESLIGACACHE=sim");
					url = url.replace("&Z=${z}&X=${x}&Y=${y}", "");
					url = url.replace("Z=${z}&X=${x}&Y=${y}", "");
					url += "&REQUEST=getlegendgraphic&service=wms&version=1.0.0";
					if (i3GEO.Interface.openlayers.googleLike === true) {
						url += "&SRS=EPSG:3857";
					}
					icone = "";
					//TODO criar a legenda para uso no mashup
					//caso do mashup
					if (i3GEO.editorOL.legendahtml === true) {
						// os parametros FORMAT e SERVICE sao inseridos de forma redundante para grantir
						// caso seja um TMS
						url = url.replace("image%2Fpng", "text/html") + "&FORMAT=text/html&SERVICE=WMS";
						// verifica se a camada veio de um plugin de classe_plugini3geo
						// e insere o icone se for necessario
						/*
						if (layers[i].options.plugini3geo) {
							if (layers[i].params.LAYERS) {
								// wms
								icone = i3GEO.pluginI3geo[layers[i].options.plugini3geo].iconeArvoreDeCamadas(layers[i].params.LAYERS);
							} else {
								// tms
								icone = i3GEO.pluginI3geo[layers[i].options.plugini3geo].iconeArvoreDeCamadas(layers[i].layers);
							}
						}
						//
						// verifica se a camada tem ferramentas parametrizadas
						// insere o icone
						//
						fers = layers[i].options.ferramentas;
						for (fer in fers) {
							if (i3GEO.configura.ferramentasLayers[fer]) {
								icone = i3GEO.configura.ferramentasLayers[fer].icone(layers[i]);
							}
						}
						 */

						fonte = "";
						if(prop.link_tema != ""){
							fonte = "&nbsp;<a class='i3GeoLinkFonte' href='" + prop.link_tema + "' target='_blank' >link</a>";
						}

						ins += icone + prop.name + fonte + "<br><div id=legendaL_" + i + " ></div><br>";
						// necessario pq nao e sincrono
						eval("var f = function(retorno){document.getElementById('legendaL_" + i
								+ "').innerHTML = retorno.responseText;};");
						url = url.replace("LAYERS", "LAYER");
						var config = {
								method : "GET",
								url : url,
								callback : f
						};
						//OpenLayers.Request.issue(config);
					} else if (prop.isBaseLayer === false && prop.visible === true) {
						//caso a legenda seja aberta dentro do i3Geo
						url = url.replace("LAYERS", "LAYER");
						url += "&FORMAT=image/png";
						ins += prop.title + "<br><img src='" + url + "' /><br>";
					}
				}
			}
			if (!document.getElementById("panellegendaeditorOL")) {
				YAHOO.namespace("legendaeditorOL.container");
				YAHOO.legendaeditorOL.container.panel = new YAHOO.widget.Panel("panellegendaeditorOL", {
					zIndex : 20000,
					iframe : true,
					width : "auto",
					visible : false,
					draggable : true,
					close : true,
					strings: {close: "<span class='material-icons'>cancel</span>"}
				});
				YAHOO.legendaeditorOL.container.panel.setBody(ins);
				YAHOO.legendaeditorOL.container.panel.setHeader($trad("p3"));
				YAHOO.legendaeditorOL.container.panel.setFooter("");
				YAHOO.legendaeditorOL.container.panel.render(document.body);
				YAHOO.legendaeditorOL.container.panel.show();
				YAHOO.legendaeditorOL.container.panel.center();

				YAHOO.util.Event.addListener(YAHOO.legendaeditorOL.container.panel.close, "click", function() {
					YAHOO.legendaeditorOL.container.panel.destroy();
				});
			} else {
				YAHOO.legendaeditorOL.container.panel.setBody(ins);
				YAHOO.legendaeditorOL.container.panel.show();
			}
		},
		captura : function(x,y,tema,idunico) {
			var d = 0.001,
			layer = i3geoOL.getLayersByName(tema)[0],
			xy = [x,y],
			u = layer.getSource().getUrls()[0],
			poligono, retorno;

			u += "&REQUEST=getfeature&service=wfs&version=1.0.0";
			u += "&OUTPUTFORMAT=gml2&typename=undefined";

			// remove parametros nao desejados
			if (i3GEO.Interface.openlayers.googleLike === true) {
				u += "&SRS=EPSG:3857";
			}
			u = u.replace("&cache=sim", "&DESLIGACACHE=sim");
			u = u.replace("&Z=${z}&X=${x}&Y=${y}", "");
			u = u.replace("Z=${z}&X=${x}&Y=${y}", "");

			xy[0] = xy[0] * 1;
			xy[1] = xy[1] * 1;
			poligono =
				(xy[0] - d) + ","
				+ (xy[1] + d)
				+ " "
				+ (xy[0] + d)
				+ ","
				+ (xy[1] + d)
				+ " "
				+ (xy[0] + d)
				+ ","
				+ (xy[1] - d)
				+ " "
				+ (xy[0] - d)
				+ ","
				+ (xy[1] - d)
				+ " "
				+ (xy[0] - d)
				+ ","
				+ (xy[1] + d);
			u +=
				"&filter=<Filter><Intersects><PropertyName>Geometry</PropertyName><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:posList>" + poligono
				+ "</gml:posList></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></Intersects></Filter>";
			retorno = function(r){
				var fs,c,format, f, n, i, idunico;
				format = new ol.format.WKT();
				fs = format.readFeatures(r[0]);
				n = fs.length;
				c = i3GEO.desenho.layergrafico.getSource();
				for(i=0; i<n; i++){
					f = fs[i];
					f.setStyle(
							new ol.style.Style({
								stroke: new ol.style.Stroke({
									color: 'rgba(' + i3GEO.editorOL.simbologia.strokeColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
									width: i3GEO.editorOL.simbologia.strokeWidth
								}),
								fill: new ol.style.Fill({
									color: 'rgba(' + i3GEO.editorOL.simbologia.fillColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')'
								})
							})
					);
					idunico = i3GEO.util.uid();
					f.setId(idunico);
					f.setProperties({
						idUnico : idunico
					});
					c.addFeature(f);
				}
			};
			u = i3GEO.configura.locaplic + "/classesphp/proxy.php?"
			+ u
			+ "&tipoRetornoProxy=gml2wkt";
			cpJSON.call(u, "foo", retorno, "");
		},
		salvaGeometrias : function() {
			if(i3GEO.editorOL.MUSTACHESALVAGEOMETRIAS == ""){
				$.get(i3GEO.configura.locaplic + "/ferramentas/editorol/templateSalvaGeometrias_mst.html", function(template) {
					i3GEO.editorOL.MUSTACHESALVAGEOMETRIAS = template;
					i3GEO.editorOL.salvaGeometrias();
				});
				return;
			}
			var n = i3GEO.editorOL.idsSelecionados.length,
			ins = "";
			if (n > 0) {
				if ($i("panelsalvageometrias")) {
					if (YAHOO.i3GEO) {
						YAHOO.salvaGeometrias.container.panel = YAHOO.i3GEO.janela.manager.find("panelsalvageometrias");
					}
					YAHOO.salvaGeometrias.container.panel.show();
					YAHOO.salvaGeometrias.container.panel.bringToTop();
				} else {
					try {
						YAHOO.namespace("salvaGeometrias.container");
						YAHOO.salvaGeometrias.container.panel = new YAHOO.widget.Panel("panelsalvageometrias", {
							zIndex : 2000,
							iframe : false,
							width : "350px",
							visible : false,
							draggable : true,
							close : true,
							strings: {close: "<span class='material-icons'>cancel</span>"}
						});
						YAHOO.salvaGeometrias.container.panel.setHeader("<span class='i3GeoTituloJanelaBsNolink' >" + $trad("u6") + "</span>");
						YAHOO.salvaGeometrias.container.panel.setBody("");
						YAHOO.salvaGeometrias.container.panel.setFooter("");
						YAHOO.salvaGeometrias.container.panel.render(document.body);
						YAHOO.salvaGeometrias.container.panel.center();
						if (YAHOO.i3GEO && YAHOO.i3GEO.janela) {
							YAHOO.i3GEO.janela.manager.register(YAHOO.salvaGeometrias.container.panel);
						}
						YAHOO.salvaGeometrias.container.panel.show();
					} catch (e) {
					}
				}
				var hash = {
						"n" : n,
						"geosel" : $trad("geosel"),
						"listar" : $trad("listar"),
						"nomeFuncaoSalvarHidden" : "hidden",
						"incorpoHidden": "hidden"
				};
				if (i3GEO.editorOL.nomeFuncaoSalvar && i3GEO.editorOL.nomeFuncaoSalvar != "") {
					hash.nomeFuncaoSalvar = i3GEO.editorOL.nomeFuncaoSalvar;
					hash.sdados = $trad("sdados");
					hash.nomeFuncaoSalvarHidden = "";
				}
				if (typeof i3geoOL !== "undefined") {
					hash.incorpo = $trad("incorpo");
					hash.ajudaEditorOlSalva =  $trad("ajudaEditorOlSalva");
					hash.incorpoHidden = "";
				}
				ins = Mustache.render(i3GEO.editorOL.MUSTACHESALVAGEOMETRIAS, hash);

				YAHOO.salvaGeometrias.container.panel.setBody(ins);
			} else {
				i3GEO.janela.tempoMsg($trad("selum"));
			}
		},
		exportarSHP : function() {
			i3GEO.editorOL.processageo("converteSHP");
		},
		incorporar : function() {
			i3GEO.editorOL.processageo("incorporar");
		},
		listaGeometriasSel : function() {
			var n = i3GEO.editorOL.idsSelecionados.length,
			ins = "",
			s = i3GEO.desenho.layergrafico.getSource(),
			i, w, g,f, format = new ol.format.WKT();
			for (i = 0; i < n; i++) {
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]).clone();
				g = i3GEO.editorOL.google2wgs(f.getGeometry());
				f.setGeometry(g);
				g = format.writeFeatures([f])
				ins += "<b>" + $trad("u6") + ": #" + i + "</b><br>" + g + "<br><br>";
			}
			w = window.open();
			w.document.write(ins);
			w.document.close();
		},
		testeSalvar : function() {
			alert("Funcao nao disponivel. Defina o nome da funcao em i3GEO.editorOL.nomeFuncaoSalvar ");
		},
		salvaGeo : function() {
			if(i3GEO.parametros.editor == "nao"){
				i3GEO.janela.tempoMsg($trad("meneditor3"));
				return;
			}
			var s = i3GEO.desenho.layergrafico.getSource(),
			n = i3GEO.editorOL.idsSelecionados.length,
			funcaoOK = function() {
				// verifica se a geometria contem o atributo que indica a coluna ou codigo unico
				var f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[0]),
				g = f.getGeometry(),
				tema = $i("editorOLcomboTemaEditavel").value,
				redesenha, p, format;

				g = i3GEO.editorOL.google2wgs(g);
				format = new ol.format.WKT();
				f.setGeometry(g);
				if (tema == "") {
					return;
				}
				redesenha = function(retorno) {
					i3GEO.janela.fechaAguarde("aguardeSalvaPonto");
					i3GEO.editorOL.removeFeaturesSel();
					i3GEO.Interface.atualizaTema("", tema);
				};
				i3GEO.janela.AGUARDEMODAL = true;
				i3GEO.janela.abreAguarde("aguardeSalvaPonto", $trad("adic") + "...");
				i3GEO.janela.AGUARDEMODAL = false;

				// cria um novo registro
				if(!f.getProperties().idUnico || f.getProperties().idUnico == ""){
					p = i3GEO.configura.locaplic
					+ "/ferramentas/editortema/exec.php?funcao=adicionaGeometria&g_sid="
					+ i3GEO.configura.sid;
					cpJSON.call(p, "foo", redesenha, "&tema=" + tema + "&wkt=" + format.writeFeatures([f]));
				} else {
					// atualiza a geometria
					p = i3GEO.configura.locaplic
					+ "/ferramentas/editortema/exec.php?funcao=atualizaGeometria&g_sid="
					+ i3GEO.configura.sid;
					cpJSON.call(
							p,
							"foo",
							redesenha,
							"&idunico=" + f.getProperties().idUnico + "&tema=" + tema + "&wkt=" + format.writeFeatures([f])
					);
				}
			},
			funcaoCombo = function(obj) {
				$i("editorOLondeComboTemaEditavel").innerHTML = obj.dados;
			},
			texto = $trad("stema")
			+ "<div style='width: 100%;' class='form-group label-fixed condensed'><label class='control-label' for=''>"
			+ $trad("salvaDadosEditor")
			+ "</label><div style='width: 100%;' class='input-group'><div id='editorOLondeComboTemaEditavel'></div></div></div>";

			//monta a janela para o usuario escolher em qual camada os dados serao salvos
			if (n != 1) {
				i3GEO.janela.tempoMsg($trad("seluma"));
			} else {
				i3GEO.janela.confirma(texto, 300, $trad("salva"), "", funcaoOK);
				i3GEO.util.comboTemas(
						"editorOLcomboTemaEditavel",
						funcaoCombo,
						"editorOLondeComboTemaEditavel",
						"",
						false,
						"editavel",
						" ",
						false,
						true,
						"form-control comboTema"
				);
			}
		},
		//muda a classe do botao para marca-lo como ativo
		marcaBotao : function(classeBotao){
			//desmarca todos os botoes
			if($i("i3GEObarraEdicao")){
				var i, n, botoes = $i("i3GEObarraEdicao").getElementsByTagName("div");
				n = botoes.length;
				for(i = 0; i < n; i++){
					botoes[i].className = botoes[i].className.replace("ItemActive","ItemInactive");
					if(classeBotao){
						botoes[i].className = botoes[i].className.replace(classeBotao+"ItemInactive",classeBotao+"ItemActive");
					}
				}
			}
			i3GEO.editorOL.removeInteracoes();
		},
		removeInteracoes: function(){
			i3geoOL.removeInteraction(i3GEO.editorOL.interacoes);
			i3GEO.editorOL.interacoes = "";
		},
		botaoProcura : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLprocuraItemInactive olButton";
			temp.title = $trad("t23");
			temp.onclick = function(){
				i3GEO.editorOL.criaJanelaBusca();
				YAHOO.procura.container.panel.show();
			};
			return temp;
		},
		botaoPan : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLpanItemInactive olButton";
			temp.title = "pan";
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao("editorOLpan");
			};
			return temp;
		},
		botaoZoomBox : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLzoomboxItemInactive olButton";
			temp.title = "zoombox";
			temp.onclick = function(){
				i3GEO.navega.zoomli();
			};
			return temp;
		},
		botaoZoomTot : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLzoomtotItemInactive olButton";
			temp.title = $trad("d2t");
			temp.onclick = function(){
				if (i3GEO.editorOL.mapext && i3GEO.editorOL.mapext != "") {
					i3GEO.Interface.openlayers.zoom2ext(i3GEO.editorOL.mapext.join(" "));
				} else {
					i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.extentTotal);
				}
			};
			return temp;
		},
		botaoZoomIn : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLzoominItemInactive olButton";
			temp.title = $trad("d5t");
			temp.onclick = function(){
				var v = i3GEO.editorOL.mapa.getView();
				v.setZoom(v.getZoom() + 1);
			};
			return temp;
		},
		botaoZoomOut : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLzoomoutItemInactive olButton";
			temp.title = $trad("d5t");
			temp.onclick = function(){
				var v = i3GEO.editorOL.mapa.getView();
				v.setZoom(v.getZoom() - 1);
			};
			return temp;
		},
		botaoLegenda : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLlegendaItemInactive olButton";
			temp.title = $trad("p3");
			temp.onclick = function(){
				i3GEO.editorOL.mostraLegenda();
			};
			return temp;
		},
		botaoDistancia : function(){
			var temp = document.createElement("div");
			temp.className = "editorOLdistanciaItemInactive olButton";
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao("editorOLdistancia");
				i3GEO.analise.medeDistancia.inicia();
			};
			return temp;
		},
		botaoArea: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLareaItemInactive olButton";
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao("editorOLarea");
				i3GEO.analise.medeArea.inicia();
			};
			return temp;
		},
		desenhaLinha: function(drawendcallback){
			i3GEO.editorOL.removeInteracoes();
			var draw = new ol.interaction.Draw({
				type : "LineString"
			});
			//adiciona a interacao para poder ser removida
			i3GEO.editorOL.interacoes = draw;
			//desativa ol.interaction.DoubleClickZoom
			i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
			draw.on("drawend", function(evt) {
				evt.feature.setStyle(
						new ol.style.Style({
							stroke: new ol.style.Stroke({
								color: 'rgba(' + i3GEO.editorOL.simbologia.strokeColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
								width: i3GEO.editorOL.simbologia.strokeWidth
							}),
							fill: new ol.style.Fill({
								color: 'rgba(' + i3GEO.editorOL.simbologia.fillColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')'
							})
						})
				);
				evt.feature.setId(i3GEO.util.uid());
				i3GEO.desenho.layergrafico.getSource().addFeature(evt.feature);
				draw.setActive(false);
				draw.setActive(true);
				if (document.getElementById("panellistagEditor")) {
					i3GEO.editorOL.listaGeometrias();
				}
			});
			if(drawendcallback){
				draw.on("drawend",drawendcallback);
			}
			i3geoOL.addInteraction(draw);
		},
		botaoLinha: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLlinhaItemInactive olButton";
			temp.title = $trad("dlinha");
			temp.onclick = function(){
				i3GEO.eventos.cliquePerm.desativa();
				i3GEO.editorOL.marcaBotao("editorOLlinha");
				i3GEO.editorOL.desenhaLinha();
			};
			return temp;
		},
		desenhaPonto: function(drawendcallback){
			i3GEO.editorOL.removeInteracoes();
			var draw = new ol.interaction.Draw({
				type : "Point"
			});
			//adiciona a interacao para poder ser removida
			i3GEO.editorOL.interacoes = draw;
			i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
			draw.on("drawend", function(evt) {
				var simbolo, url;
				url = i3GEO.editorOL.simbologia.externalGraphic;

				if(url === ""){
					simbolo = new ol.style.Circle({
						radius: i3GEO.editorOL.simbologia.pointRadius,
						fill: new ol.style.Fill({
							color: 'rgba(' + i3GEO.editorOL.simbologia.fillColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(' + i3GEO.editorOL.simbologia.strokeColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
							width: i3GEO.editorOL.simbologia.pointRadius / 3
						})
					});
				}
				else{
					simbolo = new ol.style.Icon({
						src : url,
						size : [i3GEO.editorOL.simbologia.graphicWidth,i3GEO.editorOL.simbologia.graphicHeight]
					});
				}
				evt.feature.setStyle(
						new ol.style.Style({
							image: simbolo
						})
				);

				evt.feature.setId(i3GEO.util.uid());
				i3GEO.desenho.layergrafico.getSource().addFeature(evt.feature);
				draw.setActive(false);
				draw.setActive(true);
				if (document.getElementById("panellistagEditor")) {
					i3GEO.editorOL.listaGeometrias();
				}
			});
			if(drawendcallback){
				draw.on("drawend",drawendcallback);
			}
			i3geoOL.addInteraction(draw);
		},
		botaoPonto: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLpontoItemInactive olButton";
			temp.title = $trad("dponto");
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao("editorOLponto");
				i3GEO.editorOL.desenhaPonto();
			};
			return temp;
		},
		desenhaPoligono: function(drawendcallback){
			i3GEO.editorOL.removeInteracoes();
			var draw = new ol.interaction.Draw({
				type : "Polygon"
			});
			//adiciona a interacao para poder ser removida
			i3GEO.editorOL.interacoes = draw;
			i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
			draw.on("drawend", function(evt) {
				evt.feature.setStyle(
						new ol.style.Style({
							stroke: new ol.style.Stroke({
								color: 'rgba(' + i3GEO.editorOL.simbologia.strokeColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
								width: i3GEO.editorOL.simbologia.strokeWidth
							}),
							fill: new ol.style.Fill({
								color: 'rgba(' + i3GEO.editorOL.simbologia.fillColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')'
							})
						})
				);
				evt.feature.setId(i3GEO.util.uid());
				i3GEO.desenho.layergrafico.getSource().addFeature(evt.feature);
				draw.setActive(false);
				draw.setActive(true);
				if (document.getElementById("panellistagEditor")) {
					i3GEO.editorOL.listaGeometrias();
				}
			});
			if(drawendcallback){
				draw.on("drawend",drawendcallback);
			}
			i3geoOL.addInteraction(draw);
		},
		botaoPoligono: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLpoligonoItemInactive olButton";
			temp.title = $trad("dpol");
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao("editorOLpoligono");
				i3GEO.editorOL.desenhaPoligono();
			};
			return temp;
		},
		botaoTexto: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLtextoItemInactive olButton";
			temp.title = $trad("dtexto");
			temp.onclick = function(){
				i3GEO.eventos.cliquePerm.desativa();
				i3GEO.editorOL.removeInteracoes();
				i3GEO.editorOL.marcaBotao("editorOLtexto");
				var draw = new ol.interaction.Draw({
					type : "Point"
				});
				//adiciona a interacao para poder ser removida
				i3GEO.editorOL.interacoes = draw;
				i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
				draw.on("drawend", function(evt) {
					var texto = window.prompt("Texto", "");
					evt.feature.setStyle(
							new ol.style.Style({
								text: new ol.style.Text({
									text: texto,
									font: 'Bold ' + parseInt(i3GEO.editorOL.simbologia.fontSize,10) + 'px Arial',
									textAlign: 'left',
									stroke: new ol.style.Stroke({
										color: 'white',
										width: i3GEO.editorOL.simbologia.strokeWidth
									}),
									fill: new ol.style.Fill({
										color: i3GEO.editorOL.simbologia.fontColor
									}),
									zIndex: 2000
								})
							})
					);
					evt.feature.setId(i3GEO.util.uid());
					i3GEO.desenho.layergrafico.getSource().addFeature(evt.feature);
					draw.setActive(false);
					draw.setActive(true);
					i3GEO.editorOL.marcaBotao();
				});
				i3geoOL.addInteraction(draw);
			};
			return temp;
		},
		botaoSelecao: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLselecaoItemInactive olButton";
			temp.title = $trad("d24t");
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao("editorOLselecao");
				i3GEO.editorOL.removeInteracoes();
				var sel = new ol.interaction.Select();
				//adiciona a interacao para poder ser removida
				i3GEO.editorOL.interacoes = sel;
				i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
				sel.on("select", function(evt) {
					var s,i, n, id, f;
					n = evt.selected.length;
					for(i=0; i<n; i++){
						f = evt.selected[i];
						id = f.getId();
						if(id && i3GEO.util.in_array(id,i3GEO.editorOL.idsSelecionados)){
							i3GEO.editorOL.unselFeature(id);
						}
						else{
							id = i3GEO.util.uid();
							i3GEO.editorOL.idsSelecionados.push(id);
							f.setId(id);
							s = f.getStyle();

							if(s.getImage()){
								f.setStyle(
										new ol.style.Style({
											image: new ol.style.Circle({
												radius: i3GEO.editorOL.simbologia.pointRadius,
												fill: new ol.style.Fill({
													color: 'rgba(255, 255, 255, 0.5)'
												}),
												stroke: new ol.style.Stroke({
													color: 'blue',
													width: i3GEO.editorOL.simbologia.pointRadius / 3
												})
											})
										})
								);
								if(!s.getImage().getSrc){
									f.setProperties({
										fillColor: s.getImage().getFill().getColor(),
										strokeColor: s.getImage().getStroke().getColor(),
										externalGraphic: "",
										graphicHeight : 25,
										graphicWidth : 25
									});
								}
								else{
									f.setProperties({
										fillColor: "",
										strokeColor: "",
										externalGraphic: s.getImage().getSrc(),
										graphicHeight : s.getImage().getSize()[1],
										graphicWidth : s.getImage().getSize()[0]
									});
								}
							}
							else{
								f.setProperties({
									fillColor: s.getFill().getColor(),
									strokeColor: s.getStroke().getColor(),
									externalGraphic: "",
									graphicHeight : 25,
									graphicWidth : 25
								});
								s.getFill().setColor('rgba(255, 255, 255, 0.5)');
								s.getStroke().setColor('blue');
							}
						}
					}
					if (n === 0){
						i3GEO.editorOL.unselTodos();
					}
				});
				i3geoOL.addInteraction(sel);
			};
			return temp;
		},
		botaoSelecaoTudo: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLselecaoTudoItemInactive olButton";
			temp.title = $trad("studo");
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao();
				i3GEO.editorOL.selTodos();
			};
			return temp;
		},
		botaoUnselTodos: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLunselecaoTudoItemInactive olButton";
			temp.title = $trad("ustudo");
			temp.onclick = function(){
				i3GEO.editorOL.marcaBotao();
				i3GEO.editorOL.unselTodos();
			};
			return temp;
		},
		botaoApaga: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLapagaItemInactive olButton";
			temp.title = $trad("excsel");
			temp.onclick = function(){
				var x, nsel = i3GEO.editorOL.idsSelecionados.length;
				i3GEO.editorOL.featuresBackup = [];
				i3GEO.editorOL.marcaBotao();
				if(nsel > 0){
					x = window.confirm($trad("excsel") + "?");
					if(x){
						i3GEO.editorOL.removeFeaturesSel();
						i3GEO.desenho.layergrafico.getSource().changed();
					}
				}
				else{
					i3GEO.janela.tempoMsg($trad("selum"));
				}
			};
			return temp;
		},
		botaoFrente: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLfrenteItemInactive olButton";
			temp.title = $trad("frente");
			temp.onclick = function(){
				var nsel = i3GEO.editorOL.idsSelecionados.length;
				if(nsel > 0){
					i3GEO.editorOL.marcaBotao();
					i3GEO.editorOL.trazParaFrente();
				}
				else{
					i3GEO.janela.tempoMsg($trad("selum"));
				}
			};
			return temp;
		},
		//FIXME Translate nao funciona nessa versao do openlayers 3x precisa atualizar
		botaoEdita: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLeditaItemInactive olButton";
			temp.title = $trad("modf");
			temp.onclick = function(){
				i3GEO.editorOL.featuresBackup = [];
				var draw, nsel, f, c;
				nsel = i3GEO.editorOL.idsSelecionados.length;
				if(nsel == 1){
					i3GEO.editorOL.removeInteracoes();
					i3GEO.editorOL.marcaBotao("editorOLedita");
					f = i3GEO.desenho.layergrafico.getSource().getFeatureById(i3GEO.editorOL.idsSelecionados[nsel - 1]);
					i3GEO.editorOL.featuresBackup.push(f.clone());
					c = new ol.Collection();
					c.push(f);
					draw = new ol.interaction.Modify({
						features: c
					});
					//adiciona a interacao para poder ser removida
					i3GEO.editorOL.interacoes = draw;
					i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
					i3geoOL.addInteraction(draw);
				}
				else{
					i3GEO.janela.tempoMsg($trad("seluma"));
				}
			};
			return temp;
		},
		botaoCorta: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLcortaItemInactive olButton";
			temp.title = $trad("cortaf");
			temp.onclick = function(){
				var nsel = i3GEO.editorOL.idsSelecionados.length;
				if (nsel != 1) {
					alert("Selecione primeiro um elemento para ser cortado");
				} else {
					i3GEO.editorOL.removeInteracoes();
					i3GEO.janela.tempoMsg("Desenhe um pol&iacute;gono");
					i3GEO.editorOL.marcaBotao("editorOLcorta");
					var draw = new ol.interaction.Draw({
						type : "Polygon"
					});
					//adiciona a interacao para poder ser removida
					i3GEO.editorOL.interacoes = draw;
					i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
					draw.on("drawend", function(evt) {
						var temp, f, c, format, fwkt, cwkt;
						f = evt.feature;
						c = i3GEO.desenho.layergrafico.getSource().getFeatureById(i3GEO.editorOL.idsSelecionados[nsel - 1]);
						i3GEO.editorOL.featuresBackup.push(c.clone());
						i3GEO.editorOL.marcaBotao();
						//corta
						format = new ol.format.WKT();
						if(f && c){
							fwkt = format.writeFeatures([f]);
							cwkt = format.writeFeatures([c]);
							if(fwkt && cwkt){
								temp = function(retorno) {
									i3GEO.janela.fechaAguarde("i3GEO.cortador");
									if (retorno != "" && retorno.data && retorno.data != "") {
										i3GEO.janela.fechaAguarde("i3GEO.cortador");
										c.setGeometry(format.readGeometry(retorno.data));
										if (document.getElementById("panellistagEditor")) {
											i3GEO.editorOL.listaGeometrias();
										}
									}
								};
								i3GEO.janela.abreAguarde("i3GEO.cortador", "Cortando");
								i3GEO.php.funcoesGeometriasWkt(temp, cwkt + "|" + fwkt, "difference");
							}
						}
					});
					i3geoOL.addInteraction(draw);
				}
			};
			return temp;
		},
		botaoListaGeometrias: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLlistagItemInactive olButton";
			temp.title = $trad("listag");
			temp.onclick = function(){
				i3GEO.editorOL.listaGeometrias();
			};
			return temp;
		},
		botaoNovaaba: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLnovaabaItemInactive olButton";
			temp.title = $trad("novaaba");
			temp.onclick = function(){
				window.open(window.location, '_blank');
			};
			return temp;
		},
		botaoAjuda: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLajudaItemInactive olButton";
			temp.title = $trad("s1");
			temp.onclick = function(){
				if(i3GEO.configura && i3GEO.configura.locaplic){
					i3GEO.janela.cria("400px", "200px", i3GEO.configura.locaplic
							+ "/ferramentas/editorol/openlayers_ajuda.php?completo=none", "", "", "<span class='i3GeoTituloJanelaBsNolink' >"+$trad("s1")+"</span></div>", "editorOlAjuda");
				}
				else{
					window.open("openlayers_ajuda.php");
				}
			};
			return temp;
		},
		botaoFecha: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLfechaItemInactive olButton";
			temp.title = $trad("x74");
			temp.onclick = function(){
				i3GEO.editorOL.unselTodos();
				i3GEO.editorOL.featuresBackup = [];
				i3GEO.editorOL.marcaBotao();
				i3GEO.eventos.cliquePerm.ativa();
				$i("i3GEObarraEdicao").style.display = "none";
			};
			return temp;
		},
		botaoTools: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLtoolsItemInactive olButton";
			temp.title = $trad("u15a");
			temp.onclick = function(){
				// fora do i3geo, usa o jsts
				if (i3GEO.php) {
					i3GEO.editorOL.ferramentas();
				} else {
					i3GEO.editorOL.carregajts("i3GEO.editorOL.ferramentas()");
				}
			};
			return temp;
		},
		botaoPropriedades: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLpropriedadesItemInactive olButton";
			temp.title = $trad("p13");
			temp.onclick = function(){
				i3GEO.editorOL.propriedades();
			};
			return temp;
		},
		botaoImprimir: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLimprimirItemInactive olButton";
			temp.onclick = function(){
				window.print();
			};
			return temp;
		},
		botaoGrid: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLgridItemInactive olButton";
			temp.onclick = function(){
				var p = {"map": i3GEO.editorOL.mapa,"targetSize": 200};
				if(!i3GEO.editorOL.grid){
					i3GEO.editorOL.grid = new ol.Graticule(p);
				} else {
					if(i3GEO.editorOL.grid.getMap() == null){
						i3GEO.editorOL.grid.setMap(i3GEO.editorOL.mapa);
					} else {
						i3GEO.editorOL.grid.setMap(null);
					}
				}
			};
			return temp;
		},
		botaoIdentifica: function(){
			i3GEO.eventos.cliquePerm.desativa();
			var temp = document.createElement("div");
			temp.className = "editorOLidentificaItemInactive olButton";
			temp.title = $trad("d7t");
			temp.onclick = function(){

				if(i3GEO.editorOL.layerDefault == ""){
					i3GEO.editorOL.criaJanelaAtivaTema();
				}
				i3GEO.eventos.cliquePerm.desativa();
				i3GEO.editorOL.removeInteracoes();
				i3GEO.editorOL.marcaBotao("editorOLidentifica");
				var draw = new ol.interaction.Draw({
					type : "Point"
				});
				//adiciona a interacao para poder ser removida
				i3GEO.editorOL.interacoes = draw;
				i3GEO.Interface.openlayers.parametrosMap.interactions[0].setActive(false);
				draw.on("drawend", function(evt) {
					var xy, p, retorno, url, layer, tema = $i("i3GEOOLlistaTemasAtivos");
					if(tema){
						layer = i3geoOL.getLayersByName(tema.value)[0];
						if(layer.getSource().getUrls){
							url = layer.getSource().getUrls()[0];
						}
						else{
							url = layer.getSource().getUrl();
						}

						//xy = evt.target.downPx_;
						xy = evt.feature.getGeometry().getFirstCoordinate();
						retorno = function(r){
							var valorunico = "", camada = null, texto = "", lonlattexto, xy, temp, temp1, n, i, f = [], textoN = r.split(":");
							if(i3GEO.arvoreDeCamadas){
								camada = i3GEO.arvoreDeCamadas.pegaTema(tema.value, "", "name");
							}
							xy = evt.feature.getGeometry().getFirstCoordinate();
							i3GEO.eventos.cliquePerm.ativo = true;
							try {
								if (textoN.length > 1) {
									textoN.shift();
									textoN.shift();
									temp = textoN.join(":");
									temp = temp.replace(/'/g, "");
									temp = temp.replace(/\n/g, "|");
									temp = temp.replace(/_/g, " ");
									//temp = temp.replace(/=/g, ":");
									temp = temp.split("|");
									n = temp.length;
									for (i = 0; i < n; i++) {
										temp1 = temp[i].replace(/^\s+/, "");
										temp1 = temp1.replace(/\s+$/, "");
										if (temp1 != ""){
											//verifica se a coluna eh o idunico e pega o valor
											if(camada && camada.colunaidunico != "" && temp1.split("=")[0].trim() == camada.colunaidunico){
												valorunico = temp1.split("=")[1].trim();
												temp1 = "(*) "+temp1;
											}
											f.push(temp1);
										}
									}
									texto = "<pre>" + f.join("<br>") + "</pre>";
								}
							} catch (e) {}
							//funcao para capturar a geometria
							lonlattexto =
								"<span style=font-size:12px;color:blue;cursor:pointer onclick='i3GEO.editorOL.captura(" + xy[0]
							+ ","
							+ xy[1]
							+ ",\""
							+ tema.value
							+ "\""
							+ ",\""
							+ valorunico
							+ "\")'>edita geometria</span><br>";
							i3GEO.Interface.openlayers.balao("<div style='text-align:left' >" + lonlattexto + texto + "</div>","", xy[0], xy[1], false, false);
							i3GEO.eventos.cliquePerm.ativo = false;
						};
						p = i3GEO.configura.locaplic + "/classesphp/proxy.php?"
						+ url
						+ "&tipoRetornoProxy=string&REQUEST=GetFeatureInfo&TIPOIMAGEM=nenhum&DESLIGACACHE=sim&STYLES=&SERVICE=WMS&VERSION=1.1.1&FEATURE_COUNT=1"
						+ "&FORMAT=image/png&INFO_FORMAT=text/plain&SRS=EPSG:4326"
						+ "&LAYERS=" + tema.value
						+ "&layer=" + tema.value
						+ "&QUERY_LAYERS=" + tema.value
						+ "&HEIGHT=" + i3geoOL.getSize()[1]
						+ "&WIDTH=" + i3geoOL.getSize()[0]
						+ "&BBOX=" + i3geoOL.getExtent().toBBOX().split(",").join(" ")
						+ "&X=" + xy[0] + "&Y=" + xy[1];
						cpJSON.call(p, "foo", retorno, "");
					}
				});
				i3geoOL.addInteraction(draw);
			};
			return temp;
		},
		botaoSalva: function(){
			var temp = document.createElement("div");
			temp.className = "editorOLsalvaItemInactive olButton";
			temp.title = $trad("salva");
			temp.onclick = function(){
				i3GEO.editorOL.salvaGeometrias();
			};
			return temp;
		},
		criaBotoes : function(botoes,onde) {
			if(onde){
				i3GEOpanelEditor = $i(onde);
			} else {
				if($i("i3GEObarraEdicao")){
					$i("i3GEObarraEdicao").style.display = "block";
					return;
				}
				//cria o painel onde entrarao os icones
				i3GEOpanelEditor =  document.createElement("div");
				i3GEOpanelEditor.id = "i3GEObarraEdicao";
				i3GEOpanelEditor.className = "olControlEditingToolbar1 noprint";
			}
			//cria os icones
			if (botoes.imprimir === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoImprimir());
			}
			if (botoes.grid === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoGrid());
			}
			if (botoes.novaaba === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoNovaaba());
			}
			if (botoes.procura === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoProcura());
			}
			if (botoes.pan === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoPan());
			}
			if (botoes.zoombox === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoZoomBox());
			}
			if (botoes.zoomtot === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoZoomTot());
			}
			if (botoes.zoomin === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoZoomIn());
			}
			if (botoes.zoomout === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoZoomOut());
			}
			if (botoes.legenda === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoLegenda());
			}
			if (botoes.distancia === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoDistancia());
			}
			if (botoes.area === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoArea());
			}
			if (botoes.identifica === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoIdentifica());
			}
			if (botoes.linha === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoLinha());
			}
			if (botoes.ponto === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoPonto());
			}
			if (botoes.poligono === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoPoligono());
			}
			if (botoes.texto === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoTexto());
			}
			if (botoes.edita === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoEdita());
			}
			if (botoes.selecao === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoSelecao());
			}
			if (botoes.selecaotudo === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoSelecaoTudo());
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoUnselTodos());
			}
			if (botoes.apaga === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoApaga());
			}
			if (botoes.frente === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoFrente());
			}
			if (botoes.edita === true && botoes.corta === true && i3GEO.php) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoCorta());
			}
			if (botoes.edita === true && botoes.listag === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoListaGeometrias());
			}
			if (botoes.tools === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoTools());
			}
			if (botoes.propriedades === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoPropriedades());
			}
			if (botoes.salva === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoSalva());
			}
			if (botoes.ajuda === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoAjuda());
			}
			if (botoes.fecha === true) {
				i3GEOpanelEditor.appendChild(i3GEO.editorOL.botaoFecha());
			}
			if(!onde){
				i3GEOpanelEditor.style.width = i3GEOpanelEditor.getElementsByTagName("div").length * 33 + "px";
				i3GEO.editorOL.mapa.getViewport().getElementsByClassName("ol-overlaycontainer-stopevent")[0].appendChild(i3GEOpanelEditor);
			}
		},
		removeFeaturesSel : function(){
			var s, i, nsel, f;
			nsel = i3GEO.editorOL.idsSelecionados.length;
			s = i3GEO.desenho.layergrafico.getSource();
			for(i=0; i<nsel; i++){
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]);
				if(f){
					i3GEO.editorOL.featuresBackup.push(f.clone());
					s.removeFeature(f);
				}
			}
			i3GEO.editorOL.idsSelecionados = [];
		},
		mudaSimbolo : function(estilo, obj) {
			var s, i, nsel, f;
			i3GEO.editorOL.simbologia[estilo] = obj.value;
			nsel = i3GEO.editorOL.idsSelecionados.length;
			s = i3GEO.desenho.layergrafico.getSource();
			for(i=0; i<nsel; i++){
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]);
				if(f){
					if(estilo === "externalGraphic" || estilo === "graphicWidth" || estilo === "graphicHeight"){
						f.setProperties({
							src: i3GEO.editorOL.simbologia.externalGraphic,
							size: [
								i3GEO.editorOL.simbologia.graphicWidth,
								i3GEO.editorOL.simbologia.graphicHeight
								]
						});
					}
					else{
						f.setProperties({
							fillColor: 'rgba(' + i3GEO.editorOL.simbologia.fillColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
							strokeColor: 'rgba(' + i3GEO.editorOL.simbologia.strokeColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
							width: i3GEO.editorOL.simbologia.strokeWidth,
							fontSize: i3GEO.editorOL.simbologia.fontSize,
							fontColor: i3GEO.editorOL.simbologia.fontColor,
						});
					}
				}
			}
		},
		adicionaMarcas : function() {
			if (i3GEO.editorOL.pontos.length === 0) {
				return;
			}
			var x,y,index = 0;
			for (index = 0; index < i3GEO.editorOL.pontos.length; index = index + 2) {
				x = i3GEO.editorOL.pontos[index];
				y = i3GEO.editorOL.pontos[index + 1];
				i3GEO.desenho.addPin(x, y, 27, 27, i3GEO.editorOL.marca);
				//x, y, w, h, imagem, namespace, centro, funcaoclick
			}
		},
		adicionaKml : function() {
			var temp, n, i, id, url;
			n = i3GEO.editorOL.kml.length;
			for (i = 0; i < n; i++) {
				id = "kml" + i;
				url = i3GEO.editorOL.kml[i];
				var layerkml = new ol.layer.Vector({
					name : id,
					isBaseLayer : false,
					source : new ol.source.Vector({
						url : url,
						format : new ol.format.KML(),
						tipoServico : "kml"
					})
				});
				i3geoOL.addLayer(layerkml);
				/*
				temp = function(pixel) {
					var feature, chaves, c, i = 0, html = "", prop, g;
					feature = i3geoOL.forEachFeatureAtPixel(pixel, function(feature, layer) {
						return feature;
					});
					if (feature) {
						i3GEO.Interface.openlayers.BALAOPROP.removeAoAdicionar = false;
						i3GEO.Interface.openlayers.BALAOPROP.classeCadeado = "i3GEOiconeFechado";
						chaves = feature.getKeys();
						prop = feature.getProperties();
						c = chaves.length;
						for (i = 0; i < c; i++) {
							if (chaves[i] != "geometry" && chaves[i] != "styleUrl") {
								html += chaves[i] + ": " + prop[chaves[i]];
							}
						}
						g = feature.getGeometry().getCoordinates();
						i3GEO.Interface.openlayers.balao(html, "", g[0], g[1], "kml");
					}
				};
				i3geoOL.on('click', function(evt) {
					evt.stopPropagation();
					evt.preventDefault();
					if (evt.dragging) {
						return;
					}
					temp(i3geoOL.getEventPixel(evt.originalEvent));
				});
				*/
			}
		},
		// obtido de openlayers.org
		propriedades : function() {
			if(i3GEO.editorOL.MUSTACHEPROPRIEDADES == ""){
				$.get(i3GEO.configura.locaplic + "/ferramentas/editorol/templatePropriedades_mst.html", function(template) {
					i3GEO.editorOL.MUSTACHEPROPRIEDADES = template;
					i3GEO.editorOL.propriedades();
				});
				return;
			}
			if (!document.getElementById("panelpropriedadesEditor")) {
				YAHOO.namespace("editorOL.container");
				YAHOO.editorOL.container.panel = new YAHOO.widget.Panel("panelpropriedadesEditor", {
					iframe : true,
					width : "350px",
					height : "300px",
					overflow: "auto",
					visible : false,
					draggable : true,
					close : true,
					strings: {close: "<span class='material-icons'>cancel</span>"}
				});

				var ins = Mustache.render(i3GEO.editorOL.MUSTACHEPROPRIEDADES, i3GEO.editorOL.simbologia);
				//TODO traduzir
				YAHOO.editorOL.container.panel.setBody(ins);


				//TODO implementar ao atualizar OL3
				/*
						+ '<br />'
						+ '<p class=paragrafo ><b>Ajusta n&oacute; em edi&ccedil;&atilde;o para o(a):</b></p>'
						+ '<table class=lista7 >'
						+ '	<tr>'
						+ '		<td></td><td>n&oacute</td><td></td><td>v&eacute;rtice</td><td></td><td>borda</td>'
						+ '	</tr>'
						+ '	<tr>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.snap()" type="checkbox" id="target_node" /></td><td><input onchange="i3GEO.editorOL.snap()" id="target_nodeTolerance" type="text" size="3" value=15 /></td>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.snap()" type="checkbox" id="target_vertex" /></td><td><input onchange="i3GEO.editorOL.snap()" id="target_vertexTolerance" type="text" size="3" value=15 /></td>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.snap()" type="checkbox" id="target_edge" /></td><td><input onchange="i3GEO.editorOL.snap()" id="target_edgeTolerance" type="text" size="3" value=15 /></td>'
						+ '	</tr>'
						+ '</table>'

						+ '<br />'
						+ '<p class=paragrafo ><b>Divide intersec&ccedil;&atilde;o ao digitalizar</b></p>'
						+ '<table class=lista7 >'
						+ '	<tr>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.split()" type="checkbox" id="edge_split_toggle" /></td><td>borda</td>'
						+ '	</tr>'
						+ '</table>'
						+ '<br />'
						+ '<p class=paragrafo ><b>Opera&ccedil;&atilde;o ativada pelo bot&atilde;o de modifica&ccedil;&atilde;o da figura</b></p>'
						+ '<table class=lista7 >'
						+ '	<tr>'
						+ '		<td><input checked style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.RESHAPE;" type="radio" name=i3geoOLtipoEdita /></td><td>altera figura</td>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.RESIZE;" type="radio" name=i3geoOLtipoEdita /></td><td>altera tamanho</td>'
						+ '	</tr>'
						+ '	<tr>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.ROTATE;" type="radio" name=i3geoOLtipoEdita /></td><td>rotaciona</td>'
						+ '		<td><input style=cursor:pointer onclick="i3GEO.editorOL.ModifyFeature.mode = OpenLayers.Control.ModifyFeature.DRAG;" type="radio" name=i3geoOLtipoEdita /></td><td>desloca</td>'
						+ '	</tr>'
						+ '</table>';
				 */


				if (i3GEO && typeof i3GEO != undefined && i3GEO != "") {
					YAHOO.editorOL.container.panel
					.setHeader("<span class='i3GeoTituloJanelaBsNolink'>Propriedades</span>");
				} else {
					YAHOO.editorOL.container.panel.setHeader("Propriedades");
				}

				YAHOO.editorOL.container.panel.setFooter("");
				YAHOO.editorOL.container.panel.render(document.body);

				YAHOO.editorOL.container.panel.center();
				YAHOO.util.Event.addListener(YAHOO.editorOL.container.panel.close, "click", function() {
				});
				i3GEO.util.aplicaAquarela("panelpropriedadesEditor");
			}
			YAHOO.editorOL.container.panel.show();
			temp = $i("panelpropriedadesEditor").getElementsByTagName("div");
			if (temp && temp[2]) {
				temp[2].style.overflow = "auto";
			}
		},
		listaGeometrias : function() {
			if (!document.getElementById("panellistagEditor")) {
				YAHOO.namespace("editorOL.listaGeometrias");
				YAHOO.editorOL.listaGeometrias.panel = new YAHOO.widget.Panel("panellistagEditor", {
					iframe : true,
					width : "380px",
					height : "300px",
					overflow: "auto",
					visible : false,
					draggable : true,
					close : true,
					strings: {close: "<span class='material-icons'>cancel</span>"}
				});
				if (i3GEO && typeof i3GEO != undefined && i3GEO != "") {
					YAHOO.editorOL.listaGeometrias.panel
					.setHeader("<span class='i3GeoTituloJanelaBsNolink' >" + $trad("u6") + "</span>" );
				} else {
					YAHOO.editorOL.listaGeometrias.panel.setHeader($trad("u6"));
				}
				YAHOO.editorOL.listaGeometrias.panel.setFooter("");
				YAHOO.editorOL.listaGeometrias.panel.render(document.body);
				YAHOO.editorOL.listaGeometrias.panel.center();
				YAHOO.util.Event.addListener(YAHOO.editorOL.listaGeometrias.panel.close, "click", function() {
					YAHOO.editorOL.listaGeometrias.panel.destroy();
				});
			} else {
				YAHOO.editorOL.listaGeometrias.panel.render(document.body);
			}
			var id, temp, geos = i3GEO.desenho.layergrafico.getSource().getFeatures(), n = geos.length, ins = "";
			ins += '<div class="container-fluid" style="height:210px;overflow:auto">';
			while (n > 0) {
				n -= 1;
				id = geos[n].getId();
				if(id){
					ins += '<h5>'
						+ '<button title="Unsel" onclick="i3GEO.editorOL.unselFeature(\'' + id + '\')" class="btn btn-xs" style="margin:2px;padding:2px;"><span class="material-icons">clear</span></button>'
						+ '<a title="Sel" onclick="i3GEO.editorOL.selFeature(\'' + id + '\')" href="javascript:void(0)">'
						+ id + "</a></h5>";
				}
			}
			ins += "</div>";
			if (geos.length === 0) {
				ins = '<div class="container-fluid" >' + $trad("meneditor2") + "</div>";
			}
			YAHOO.editorOL.listaGeometrias.panel.setBody(ins);
			YAHOO.editorOL.listaGeometrias.panel.show();

		},
		ferramentas : function() {
			if(i3GEO.editorOL.MUSTACHEFERRAMENTAS == ""){
				$.get(i3GEO.configura.locaplic + "/ferramentas/editorol/templateFerramentas_mst.html", function(template) {
					i3GEO.editorOL.MUSTACHEFERRAMENTAS = template;
					i3GEO.editorOL.ferramentas();
				});
				return;
			}
			var b, ins;
			if (!document.getElementById("panelferramentasEditor")) {
				YAHOO.namespace("editorOL.ferramentas");
				YAHOO.editorOL.ferramentas.panel = new YAHOO.widget.Panel("panelferramentasEditor", {
					zIndex : 20000,
					iframe : true,
					width : "300px",
					visible : false,
					draggable : true,
					close : true,
					strings: {close: "<span class='material-icons'>cancel</span>"}
				});
				var hash = {
						"opsel": $trad("opsel"),
						"p14": $trad("p14"),
						"hidden": "hidden"
				};
				if (i3GEO.php) {
					hash.hidden = "";
				}
				ins = Mustache.render(i3GEO.editorOL.MUSTACHEFERRAMENTAS, hash);
				YAHOO.editorOL.ferramentas.panel.setBody(ins);
				YAHOO.editorOL.ferramentas.panel.setHeader("<span class='i3GeoTituloJanelaBsNolink' >Ferramentas</span>");

				YAHOO.editorOL.ferramentas.panel.setFooter("");
				YAHOO.editorOL.ferramentas.panel.render(document.body);
				YAHOO.editorOL.ferramentas.panel.center();
				YAHOO.util.Event.addListener(YAHOO.editorOL.ferramentas.panel.close, "click", function() {
				});

			} else {
				YAHOO.editorOL.ferramentas.panel.render(document.body);
			}
			YAHOO.editorOL.ferramentas.panel.show();
		},
		//TODO implementar ao atualizar OL3
		snap : function() {
			var target = i3GEOOLsnap.targets[0], tipos = [
				"node", "vertex", "edge"
				], ntipos = tipos.length, i, temp, ativa = false;
			i3GEOOLsnap.deactivate();
			for (i = 0; i < ntipos; i++) {
				temp = $i("target_" + tipos[i]);
				target[tipos[i]] = temp.checked;
				if (temp.checked === true) {
					ativa = true;
				}
				temp = $i("target_" + tipos[i] + "Tolerance");
				target[tipos[i] + "Tolerance"] = temp.value;
			}
			if (ativa === true) {
				i3GEOOLsnap.activate();
			}
		},
		split : function() {
			i3GEOOLsplit.deactivate();
			var temp = $i("edge_split_toggle");
			if (temp.checked === true) {
				i3GEOOLsplit.activate();
			}
		},
		processageo : function(operacao) {
			if (operacao === "") {
				return;
			}
			var polis, linhas, pontos, temp, nsel = i3GEO.editorOL.idsSelecionados.length;
			if (nsel > 0) {
				temp = function(retorno) {
					if (i3GEO.janela) {
						i3GEO.janela.fechaAguarde("i3GEO.editorPoli");
						i3GEO.janela.fechaAguarde("i3GEO.editorLinhas");
						i3GEO.janela.fechaAguarde("i3GEO.editorPontos");
					}
					if (retorno != "" && retorno.data && retorno.data != "" && operacao != "converteSHP") {
						i3GEO.editorOL.substituiFeaturesSel(retorno.data);
					}
					if (operacao === "converteSHP") {
						i3GEO.atualiza();
						i3GEO.janela.minimiza("paneltemaativo");
					}
				};
				if (operacao === "incorporar") {
					polis = i3GEO.editorOL.retornaFeaturesTipo("Polygon");
					linhas = i3GEO.editorOL.retornaFeaturesTipo("LineString");
					pontos = i3GEO.editorOL.retornaFeaturesTipo("Point");
					if (polis.length > 0) {
						temp = i3GEO.editorOL.merge(polis);
					}
					if (linhas.length > 0) {
						temp = i3GEO.editorOL.merge(linhas);
					}
					if (pontos.length > 0) {
						temp = i3GEO.editorOL.desagrupa(pontos);
					}
					if (i3GEO.mapa) {
						i3GEO.mapa.dialogo.wkt2layer(temp);
					}
					return;
				}
				if (operacao === "union" && !i3GEO.php) {
					polis = i3GEO.editorOL.retornaFeaturesTipo("Polygon");
					linhas = i3GEO.editorOL.retornaFeaturesTipo("LineString");
					pontos = i3GEO.editorOL.retornaFeaturesTipo("Point");
					if (polis.length > 0) {
						temp = i3GEO.editorOL.uniaojts(polis);
						i3GEO.editorOL.substituiFeaturesSel(temp);
					}
					if (linhas.length > 0) {
						temp = i3GEO.editorOL.uniaojts(linhas);
						i3GEO.editorOL.substituiFeaturesSel(temp);
					}
					if (pontos.length > 0) {
						temp = i3GEO.editorOL.uniaojts(pontos);
						i3GEO.editorOL.substituiFeaturesSel(temp);
					}
				} else {
					polis = i3GEO.editorOL.retornaGeometriasTipo("Polygon");
					linhas = i3GEO.editorOL.retornaGeometriasTipo("LineString");
					pontos = i3GEO.editorOL.retornaGeometriasTipo("Point");
					if (polis.length > 0) {
						i3GEO.janela.abreAguarde("i3GEO.editorPoli", "Poligonos");
						i3GEO.php.funcoesGeometriasWkt(temp, polis.join("|"), operacao);
					}
					if (linhas.length > 0) {
						i3GEO.janela.abreAguarde("i3GEO.editorLinhas", "Linhas");
						i3GEO.php.funcoesGeometriasWkt(temp, linhas.join("|"), operacao);
					}
					if (pontos.length > 0) {
						i3GEO.janela.abreAguarde("i3GEO.editorPontos", "Pontos");
						i3GEO.php.funcoesGeometriasWkt(temp, pontos.join("|"), operacao);
					}
				}
				i3GEO.desenho.layergrafico.getSource().changed();
				return;
			} else {
				i3GEO.janela.tempoMsg("Selecione pelo menos dois elementos");
			}
		},
		desagrupa : function(geoms) {
			var n = geoms.length,
			w = [],
			g, m, i,
			format = new ol.format.WKT();
			for (i = 0; i < n; i++) {
				g = format.writeFeatures([geoms[i]]);
				m = new Wkt.Wkt();
				m.read(g);
				w.push(m);
			}
			return w.join("\n");
		},
		merge : function(geoms) {
			var n = geoms.length,
			w = new Wkt.Wkt(),
			g, m, i,f,
			format = new ol.format.WKT();
			f = format.writeFeatures([geoms[0]]);
			w.read(f);
			if (n > 1) {
				for (i = 1; i < n; i++) {
					g = format.writeFeatures([geoms[i]]);
					m = new Wkt.Wkt();
					m.read(g);
					w.merge(m);
				}
			}
			return w.write();
		},
		uniaojts : function(geoms) {
			var n = geoms.length,
			fwkt = new ol.format.WKT(),
			rwkt = new jsts.io.WKTReader(),
			wwkt = new jsts.io.WKTWriter(),
			g, i, uniao;
			if (n > 1) {
				//converte em wkt
				uniao = fwkt.writeFeatures([geoms[0]]);
				//le na jsts
				uniao = rwkt.read(uniao);
				for (i = 1; i <= n; i++) {
					g = fwkt.writeFeatures([geoms[i]]);
					uniao = uniao.union(rwkt.read(g));
				}
				//gera em wkt
				uniao = wwkt.write(uniao);
				return [
					fwkt.readFeatures(uniao)
					];
			} else {
				return false;
			}
		},
		retornaGeometriasTipo : function(tipo) {
			var n = i3GEO.editorOL.idsSelecionados.length, lista = [], i,
			s = i3GEO.desenho.layergrafico.getSource(),
			fwkt = new ol.format.WKT();
			for (i = 0; i < n; i++) {
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]);
				if (f.getGeometry().getType() == tipo) {
					lista.push(fwkt.writeFeatures([f]));
				}
			}
			return lista;
		},
		retornaFeaturesTipo : function(tipo) {
			var n = i3GEO.editorOL.idsSelecionados.length, lista = [], i,
			s = i3GEO.desenho.layergrafico.getSource();
			for (i = 0; i < n; i++) {
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]);
				if (f.getGeometry().getType() == tipo) {
					lista.push(f);
				}
			}
			return lista;
		},
		guardaBackup : function() {
			return;
			// if(!i3GEO.editorOL.backup)
			// {i3GEO.editorOL.backup = new OpenLayers.Layer.Vector("Backup",{displayInLayerSwitcher:false,visibility:false});}
			// else
			// {i3GEO.editorOL.backup.removeFeatures(i3GEO.editorOL.backup.features);}
			// i3GEO.editorOL.backup.addFeatures(i3GEO.desenho.layergrafico.features);
		},
		selTodos : function(idfeature) {
			if(!idfeature){
				i3GEO.editorOL.unselTodos();
			}
			var features, n, f, i, id, st;
			features = i3GEO.desenho.layergrafico.getSource().getFeatures();
			n = features.length;
			for (i = 0; i < n; i++) {
				f = features[i];
				id = f.getId();
				if(idfeature && idfeature != id){
					continue;
				}
				if(!id){
					id = i3GEO.util.uid();
					f.setId(id);
				}
				if(i3GEO.editorOL.idsSelecionados.indexOf(id) < 0){
					i3GEO.editorOL.idsSelecionados.push(id);
				}
				st = f.getStyle();
				//para o caso de pontos
				if(st && st.getImage()){
					f.setStyle(
							new ol.style.Style({
								image: new ol.style.Circle({
									radius: i3GEO.editorOL.simbologia.pointRadius,
									fill: new ol.style.Fill({
										color: 'rgba(255, 255, 255, 0.5)'
									}),
									stroke: new ol.style.Stroke({
										color: 'blue',
										width: i3GEO.editorOL.simbologia.pointRadius / 3
									})
								})
							})
					);
					if(st.getImage().getSrc){
						f.setProperties({
							fillColor: "",
							strokeColor: "",
							externalGraphic: st.getImage().getSrc(),
							graphicHeight : st.getImage().getSize()[1],
							graphicWidth : st.getImage().getSize()[0]
						});
					}
					else{
						f.setProperties({
							fillColor: st.getImage().getFill().getColor(),
							strokeColor: st.getImage().getStroke().getColor(),
							externalGraphic: "",
							graphicHeight: "",
							graphicWidth: ""
						});
					}
				}
				else if (st){
					f.setProperties({
						fillColor: st.getFill().getColor(),
						strokeColor: st.getStroke().getColor()
					});
					st.getFill().setColor('rgba(255, 255, 255, 0.5)');
					st.getStroke().setColor('blue');
				}
			}
			i3GEO.desenho.layergrafico.getSource().changed();
		},
		unselTodos : function(id) {
			var i, n, f, s, st;
			s = i3GEO.desenho.layergrafico.getSource();
			n = i3GEO.editorOL.idsSelecionados.length;
			for(i=0; i<n; i++){
				if(id && id != i3GEO.editorOL.idsSelecionados[i]){
					continue;
				}
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]);
				if(f){
					st = f.getStyle();
					//caso de ponto
					if(st && st.getImage()){
						if(st.getImage().getSrc || f.getProperties().externalGraphic != ""){
							f.setStyle(
									new ol.style.Style({
										image: new ol.style.Icon({
											src : f.getProperties().externalGraphic,
											size : [f.getProperties().graphicWidth,f.getProperties().graphicHeight]
										})
									})
							);
						}
						else{
							f.setStyle(
									new ol.style.Style({
										image: new ol.style.Circle({
											radius: i3GEO.editorOL.simbologia.pointRadius,
											fill: new ol.style.Fill({
												color: f.getProperties().fillColor
											}),
											stroke: new ol.style.Stroke({
												color: f.getProperties().strokeColor,
												width: i3GEO.editorOL.simbologia.pointRadius / 3
											})
										})
									})
							);
						}
					}
					else if(st){
						st.getFill().setColor(f.getProperties().fillColor);
						st.getStroke().setColor(f.getProperties().strokeColor);
					}
				}
			}
			if(id){
				i3GEO.editorOL.idsSelecionados.remove(id);
			} else {
				i3GEO.editorOL.idsSelecionados = [];
			}
			i3GEO.desenho.layergrafico.getSource().changed();
		},
		unselTodosBackup : function() {
			var n, i;
			n = i3GEO.editorOL.backup.features.length;
			for (i = 0; i < n; i++) {
				i3GEO.editorOL.backup.features[i].renderIntent = "default";
				i3GEO.editorOL.selbutton.unselect(i3GEO.editorOL.backup.features[i]);
			}
		},
		unselFeature : function(id) {
			i3GEO.editorOL.unselTodos(id);
			/*
			var f, s;
			s = i3GEO.desenho.layergrafico.getSource();
			f = s.getFeatureById(id);
			if(f && f.getStyle()){
				if(f.getStyle().getSrc){
					f.getStyle().setSrc(f.getProperties().externalGraphic);
					f.getStyle().setSize([f.getProperties().graphicWidth,f.getProperties().graphicHeight]);
				}
				else{
					if(f.getStyle().getFill()){
						f.getStyle().getFill().setColor(f.getProperties().fillColor);
					}
					if(f.getStyle().getStroke()){
						f.getStyle().getStroke().setColor(f.getProperties().strokeColor);
					}
				}
			}
			i3GEO.editorOL.idsSelecionados.remove(id);
			i3GEO.desenho.layergrafico.getSource().changed();
			*/
		},
		restauraBackup : function() {
			if (i3GEO.editorOL.backup.features.length > 0) {
				i3GEO.desenho.layergrafico.removeFeatures(i3GEO.desenho.layergrafico.features);
				i3GEO.desenho.layergrafico.addFeatures(i3GEO.editorOL.backup.features);
			}
			if (document.getElementById("panellistagEditor")) {
				i3GEO.editorOL.listaGeometrias();
			}
			// i3GEO.editorOL.backup.removeFeatures(i3GEO.editorOL.backup.features);
		},
		substituiFeaturesSel : function(f) {
			i3GEO.editorOL.removeFeaturesSel();
			var fwkt = new ol.format.WKT();
			f = fwkt.readFeatures(f)[0];
			f.setStyle(
					new ol.style.Style({
						stroke: new ol.style.Stroke({
							color: 'rgba(' + i3GEO.editorOL.simbologia.strokeColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')',
							width: i3GEO.editorOL.simbologia.strokeWidth
						}),
						fill: new ol.style.Fill({
							color: 'rgba(' + i3GEO.editorOL.simbologia.fillColor + ',' + i3GEO.editorOL.simbologia.opacidade + ')'
						})
					})
			);
			f.setId(i3GEO.util.uid());
			i3GEO.desenho.layergrafico.getSource().addFeature(f);
		},
		adicionaFeatureWkt : function(wkt, atributos) {
			var f, fwkt = new OpenLayers.Format.WKT();

			if (atributos.externalGraphic && atributos.externalGraphic != "") {
				var style_mark = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
				style_mark.externalGraphic = atributos.externalGraphic;
				style_mark.graphicWidth = atributos.graphicWidth;
				style_mark.graphicHeight = atributos.graphicHeight;
				style_mark.fillOpacity = atributos.opacidade;
				f = fwkt.read(wkt);
				f["attributes"] = atributos;
				f["style"] = style_mark;
			} else {
				f = fwkt.read(wkt);
				f["attributes"] = atributos;
			}
			i3GEO.desenho.layergrafico.addFeatures([
				f
				]);
			if (document.getElementById("panellistagEditor")) {
				i3GEO.editorOL.listaGeometrias();
			}
		},
		flashFeaturesI : function(index) {
			i3GEO.editorOL.flashFeatures([
				i3GEO.desenho.layergrafico.features[index]
				], 0);
		},
		flashFeatures : function(features, index) {
			if (!index) {
				index = 0;
			}
			var current = features[index];
			if (current && current.layer === i3GEO.desenho.layergrafico) {
				i3GEO.desenho.layergrafico.drawFeature(features[index], "select");
			}
			var prev = features[index - 1];
			if (prev && prev.layer === i3GEO.desenho.layergrafico) {
				i3GEO.desenho.layergrafico.drawFeature(prev, "default");
			}
			++index;
			if (index <= features.length) {
				window.setTimeout(function() {
					i3GEO.editorOL.flashFeatures(features, index);
				}, 75);
			}
		},
		selFeature : function(id) {
			if(console){
				console.info("selFeature");
			}
			if(i3GEO.editorOL.idsSelecionados.indexOf(id) < 0){
				i3GEO.editorOL.selTodos(id);
			}
			/*
			var s,f,st,prop = {externalGraphic: ""};
			s = i3GEO.desenho.layergrafico.getSource();
			f = s.getFeatureById(id);
			st = f.getStyle();

			if(st.getImage()){
				st = st.getImage();
			}
			if(!i3GEO.util.in_array(id,i3GEO.editorOL.idsSelecionados)){
				i3GEO.editorOL.idsSelecionados.push(id);
				if(st.getFill()){
					prop.fillColor = st.getFill().getColor();
				}
				if(st.getStroke()){
					prop.strokeColor = st.getStroke().getColor();
				}
				f.setProperties(prop);
				if(st.getFill()){
					st.getFill().setColor('rgba(255, 255, 255, 0.5)');
				}
				if(st.getStroke()){
					st.getStroke().setColor('blue');
				}
				s.changed();
			}
			*/
		},
		carregajts : function(funcao) {
			if (i3GEO.configura) {
				i3GEO.util.scriptTag(i3GEO.configura.locaplic + "/pacotes/jsts/lib/jsts.js", funcao, "i3GEOjts", true);
			} else {
				i3GEO.util.scriptTag("../pacotes/jsts/lib/jsts.js", funcao, "i3GEOjts", true);
			}
		},
		trazParaFrente : function() {
			var s, i, nsel, id, clone;
			s = i3GEO.desenho.layergrafico.getSource();
			nsel = i3GEO.editorOL.idsSelecionados.length;
			for(i=0; i<nsel; i++){
				f = s.getFeatureById(i3GEO.editorOL.idsSelecionados[i]);
				if(f){
					clone = f.clone();
					id = f.getId();
					s.removeFeature(f);
					clone.setId(id);
					s.addFeature(clone);
				}
			}
			s.changed();
		},
		pegaControle : function(classe) {
			var n = i3GEO.editorOL.controles.length, i;
			for (i = 0; i < n; i++) {
				if (i3GEO.editorOL.controles[i].CLASS_NAME === classe) {
					return i3GEO.editorOL.controles[i];
				}
			}
			return false;
		},
		ativaLayerSwitcher : function() {
			var ls = i3GEO.editorOL.pegaControle("OpenLayers.Control.LayerSwitcher");
			if (ls) {
				ls.maximizeDiv.click();
			}
		},
		desativaRodaDoMouse : function() {
			var controls = i3GEO.editorOL.mapa.getControlsByClass('OpenLayers.Control.Navigation');
			for ( var i = 0; i < controls.length; ++i) {
				controls[i].disableZoomWheel();
			}
		},
		google2wgs : function(obj) {
			if (i3GEO.Interface.openlayers.googleLike === true) {
				return obj.transform("EPSG:900913","EPSG:4326");
			} else {
				return obj;
			}
		},
		sobeLayersGraficos : function() {
			/*
			var nlayers = i3GEO.editorOL.mapa.getNumLayers(), layers = i3GEO.editorOL.mapa.layers, i;
			for (i = 0; i < nlayers; i++) {
				if (layers[i].CLASS_NAME == "OpenLayers.Layer.Vector" && layers[i].name != "Nenhum") {
					i3GEO.editorOL.mapa.raiseLayer(i3GEO.editorOL.mapa.layers[i], nlayers);
				}
			}
			 */
		}
};

//para compatibilidade com OpenLayers 2x
i3GEO.editorOL.backup.getFeatures = function() {
	return i3GEO.editorOL.backup.getSource().getFeatures();
};
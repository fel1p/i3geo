if (typeof (i3GEO) === 'undefined') {
	var i3GEO = {};
}
i3GEO.busca = {
	PALAVRA: "",
	BOX: "",
	SERVICO : "http://mapas.mma.gov.br/webservices/geonames.php",
	SERVICOWMS : "http://mapas.mma.gov.br/webservices/geonameswms.php",
	config : {
		"ondeConteiner":"",
		"inputOndePalavra": "",
		"ondeServicosExternos": "",
		"inputServicosExternos": "",
		"inputTemasMapa": "",
		"ondeTemasMapa": "",
		"inputGoogle": "",
		"ondeGoogle": "",
		"templateTemasMapa":"",
		"templateServico": "",
		"templateGoogle":""
	},
	nget: 0,
	carregaTemplates: function(){
		if(i3GEO.busca.nget == 0){
			i3GEO.busca.nget = 2;
			if(!i3GEO.template.buscaEmTemas){
				$.get(i3GEO.busca.config.templateTemasMapa, function(template) {
					i3GEO.template.buscaEmTemas = template;
					i3GEO.busca.nget = i3GEO.busca.nget - 1;
					if(i3GEO.busca.nget == 0){
						i3GEO.busca.inicia();
					}
				});
			} else {
				i3GEO.busca.nget = i3GEO.busca.nget - 1;
			}
			if(!i3GEO.template.buscaEmServico){
				$.get(i3GEO.busca.config.templateServico, function(template) {
					i3GEO.template.buscaEmServico = template;
					i3GEO.busca.nget = i3GEO.busca.nget - 1;
					if(i3GEO.busca.nget == 0){
						i3GEO.busca.inicia();
					}
				});
			} else {
				i3GEO.busca.nget = i3GEO.busca.nget - 1;
			}
		}
	},
	aguarde: function(){
		return '<div class="alert alert-warning" role="alert">' + $trad("o1") + '</div>';
	},
	inicia: function(obj){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.busca.inicia");

		var palavra="", config = i3GEO.busca.config;
		if(obj){
			obj = $(obj);
			if(obj.attr("data-ondeConteiner") != undefined){
				config.ondeConteiner = obj.attr("data-ondeConteiner");
			}
			if(obj.attr("data-ondeServicosExternos") != undefined){
				config.ondeServicosExternos = obj.attr("data-ondeServicosExternos");
			}
			if(obj.attr("data-inputServicosExternos") != undefined){
				config.inputServicosExternos = obj.attr("data-inputServicosExternos");
			}
			if(obj.attr("data-inputTemasMapa") != undefined){
				config.inputTemasMapa = obj.attr("data-inputTemasMapa");
			}
			if(obj.attr("data-inputTemasMapa") != undefined){
				config.ondeTemasMapa = obj.attr("data-ondeTemasMapa");
			}
			if(obj.attr("data-inputGoogle") != undefined){
				config.inputGoogle = obj.attr("data-inputGoogle");
			}
			if(obj.attr("data-inputGoogle") != undefined){
				config.ondeGoogle = obj.attr("data-ondeGoogle");
			}
			if(obj.attr("data-inputOndePalavra") != undefined){
				config.inputOndePalavra = obj.attr("data-inputOndePalavra");
			}
			if(obj.attr("data-templateGoogle") != undefined){
				config.templateGoogle = obj.attr("data-templateGoogle");
			}
			if(obj.attr("data-templateTemasMapa") != undefined){
				config.templateTemasMapa = obj.attr("data-templateTemasMapa");
			}
			if(obj.attr("data-templateServico") != undefined){
				config.templateServico = obj.attr("data-templateServico");
			}
		}
		if(!i3GEO.template.buscaEmTemas || !i3GEO.template.buscaEmServico){
			i3GEO.busca.carregaTemplates();
			return;
		} else {
			var palavra = $(config.ondeConteiner).find(config.inputOndePalavra).val();
			if(palavra != ""){
				i3GEO.busca.PALAVRA = i3GEO.util.removeAcentos(palavra);
			} else {
				i3GEO.busca.PALAVRA = "";
				return false;
			}
			//faz as buscas
			if($(config.ondeConteiner).find(config.inputServicosExternos)[0].checked == true){
				$(config.ondeConteiner).find(config.ondeServicosExternos).html(i3GEO.busca.aguarde());
				i3GEO.php.buscaRapida(i3GEO.busca.resultadoServico, i3GEO.configura.locaplic, i3GEO.busca.SERVICO, i3GEO.busca.PALAVRA);
			}
			if($(config.ondeConteiner).find(config.inputTemasMapa)[0].checked == true){
				$(config.ondeConteiner).find(config.inputTemasMapa).html(i3GEO.busca.aguarde());
				i3GEO.php.buscaRapida(i3GEO.busca.resultadoTemas, i3GEO.configura.locaplic, "temas", i3GEO.busca.PALAVRA);
			}
			if($(config.ondeConteiner).find(config.inputGoogle)[0].checked == true){
				$(config.ondeConteiner).find(config.inputGoogle).html(i3GEO.busca.aguarde());
				i3GEO.busca.google(i3GEO.busca.PALAVRA);
			}
		}
	},
	resultadoTemas : function(retorno) {
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.busca.resultadoTemasMapa ");

		var t,config = i3GEO.busca.config;
		try {
			if (retorno.data) {
				t = Mustache.to_html(
						"{{#data}}" + i3GEO.template.buscaEmTemas + "{{/data}}",
						{"data":retorno.data}
					);
				$(config.ondeConteiner).find(config.ondeTemasMapa).html(t);
			}
		} catch (e) {
			$(config.ondeConteiner).find(config.ondeTemasMapa).html("");
		}
	},
	resultadoGoogle : function(retorno) {
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.busca.resultadoGoogle ");

		var t,config = i3GEO.busca.config;
		try {
			if (retorno.data) {
				t = Mustache.to_html(
						"{{#data}}" + i3GEO.template.buscaEmTemas + "{{/data}}",
						{"data":retorno.data}
					);
				$(config.ondeConteiner).find(config.ondeGoogle).html(t);
			}
		} catch (e) {
			$(config.ondeConteiner).find(config.ondeGoogle).html("");
		}
	},
	resultadoServico: function(retorno){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.busca.resultadoServico " + i3GEO.busca.SERVICO);

		var t,config = i3GEO.busca.config;
		try {
			if (retorno.data) {
				t = Mustache.to_html(
						"{{#data}}" + i3GEO.template.buscaEmServico + "{{/data}}",
						{"data":retorno.data.geonames}
					);
				$(config.ondeConteiner).find(config.ondeServicosExternos).html(t);
			}
		} catch (e) {
			$(config.ondeConteiner).find(config.ondeServicosExternos).html("");
		}
	},
	google: function(palavra){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'address' : palavra
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
					// compatibiliza com montaResultadoTemas
					if (results) {
						var b, bo, n = results.length, i = 0, resultado = {
							"data" : []
						};
						for (i = 0; i < n; i++) {
							if (results[i] && results[i].formatted_address && results[i].geometry && results[i].geometry.viewport) {
								bo = results[i].geometry.bounds;
								b =
									bo.getSouthWest().lng() + " " + bo.getSouthWest().lat() + " " + bo.getNorthEast().lng() + " "
										+ bo.getNorthEast().lat();
								resultado.data.push({
									"valor" : results[i].formatted_address,
									"box" : b
								});
							}
						}
						i3GEO.busca.resultadoGoogle(resultado);
					}
				}
			}
		});
	},
	zoom : function(wkt, layer, gid, nm) {
		var adicionaCamada =
			function(layer, gid, nm, ext) {
				if (i3GEO.Interface.openlayers.googleLike === false) {
					var s = i3GEO.busca.SERVICOWMS + "?gid=" + gid + "&";
					i3GEO.php.adicionaTemaWMS(i3GEO.atualiza, s, layer, "default", "EPSG:4618", "image/png", "1.1.0", nm
						+ " - " + layer, "", "nao", "", i3GEO.configura.locaplic, i3GEO.configura.sid);
				}
				i3GEO.busca.zoomExt(ext);
			};
		var ext = i3GEO.util.wkt2ext(wkt, "polygon");
		if (ext == false) {
				return;
		}

		i3GEO.php.mudaext(
			adicionaCamada(layer, gid, nm, ext),
			i3GEO.configura.tipoimagem,
			ext,
			i3GEO.configura.locaplic,
			i3GEO.configura.sid);
	},
	mostraxy : function mostraxy(texto, tipo) {
		var ext,b;
		if (tipo === "wkt") {
			ext = i3GEO.util.wkt2ext(texto, "polygon");
		} else {
			ext = texto;
		}
		if (ext == false) {
			return;
		}
		b = ext.split(" ");
		//OL 3
		if (i3GEO.Interface["ATUAL"] === "openlayers" && typeof OpenLayers.Control == "undefined") {
			i3GEO.busca.BOX = false;
		}

		if(i3GEO.busca.BOX === false){
			i3GEO.busca.BOX = i3GEO.desenho.addBox(b[0], b[1], b[2], b[3], "boxOndeBusca");
		}
		else{
			i3GEO.busca.BOX = i3GEO.desenho.moveBox(i3GEO.busca.BOX,b[0], b[1], b[2], b[3]);
		}
	},
	/*
	 * Function: escondexy
	 *
	 * Esconde o box criado com mostraxy
	 */
	escondexy : function() {
		i3GEO.desenho.removeBox("boxOndeBusca");
	},
	zoomExt : function(ext) {
		if (i3GEO.Interface.ATUAL == "googlemaps") {
			i3GEO.Interface.googlemaps.zoom2extent(ext);
		}
		if (i3GEO.Interface.ATUAL == "openlayers") {
			i3GEO.Interface.openlayers.zoom2ext(ext);
		}
	}
};
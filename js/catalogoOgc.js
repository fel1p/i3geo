i3GEO.catalogoOgc = {
	WMS: "",
	MIGALHA: [],
	config: {
		'seletorTemplateDir': '#guia2objTemplateDir',
		'seletorTemplateTema': '#guia2objTemplateTema',
		'idCatalogoPrincipal': 'catalogoPrincipal',
		'idCatalogoNavegacao': 'catalogoNavegacao',
		'idOndeMigalha': 'catalogoMigalha'
	},
	aguarde: function(){
		$("#" + i3GEO.catalogoOgc.config.idCatalogoNavegacao).html($trad("o1"));
	},
	atualizaMigalha: function(){
		var migalha = i3GEO.catalogoOgc.MIGALHA;
		var n = migalha.length;

		var nome = migalha[n - 1].nome;
		var onclick = migalha[n - 2].onclick;

		var t = Mustache.to_html(
				$($("#" + i3GEO.catalogoOgc.config.idOndeMigalha).attr("data-template")).html(),
				{"nome":nome,"onclick":"i3GEO.catalogoOgc.MIGALHA.pop();i3GEO.catalogoOgc.MIGALHA.pop();" + onclick}
			);

		$("#" + i3GEO.catalogoOgc.config.idOndeMigalha).html(t);
		$("#i3GEOguiaMovelConteudo").scrollTop(0);
	},
	escondeCatalogoPrincipal: function(){
		$("#" + i3GEO.catalogoOgc.config.idCatalogoPrincipal).hide();
	},
	mostraCatalogoPrincipal: function(){
		$("#" + i3GEO.catalogoOgc.config.idCatalogoNavegacao).fadeOut( "fast", function(){
			$("#" + i3GEO.catalogoOgc.config.idOndeMigalha).hide();
			$("#" + i3GEO.catalogoOgc.config.idCatalogoPrincipal).show();
		});
	},
	adicionaTema : function(tid) {
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoOgc.adicionaTema");

		// confirma se o tema existe no mapa
		if (i3GEO.arvoreDeCamadas.pegaTema(tid) !== "") {
			i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid, true);
		} else {
			i3GEO.arvoreDeTemas.adicionaTemas([ tid ]);
		}
	},
	inicia: function(config){
		i3GEO.catalogoOgc.MIGALHA = [
		{"nome":"","onclick":"i3GEO.catalogoOgc.mostraCatalogoPrincipal()"},
		{"nome":"OGC-WMS","onclick":"i3GEO.catalogoOgc.inicia()"}
		];
		i3GEO.catalogoOgc.atualizaMigalha();

		if(config){
			$.each( config, function( i,v ) {
				i3GEO.catalogoOgc.config[i] = v;
			});
		}
		config = i3GEO.catalogoOgc.config;

		i3GEO.catalogoOgc.escondeCatalogoPrincipal();

		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoOgc.inicia");

		var t = Mustache.to_html(
				$($("#" + i3GEO.catalogoOgc.config.idOndeMigalha).attr("data-template")).html(),
				{"nome":'OGC-WMS',"onclick":"i3GEO.catalogoOgc.mostraCatalogoPrincipal()"}
			);

		i3GEO.catalogoOgc.aguarde();
		i3GEO.catalogoOgc.config = config;
		var lista = function(retorno){
			var dados = retorno.data.canais,
				clone = [],
				t;

			//ajusta o nome
			//verifica se o menu esta na lista de ids definidos em i3GEO.catalogoOgc.IDSMENUS
			$.each( dados, function( i,v ) {
				v.nome = v.title;
				v.descricao = v.description;
				v.onclick = "i3GEO.catalogoOgc.listaCamadas('" + v.nome + "'," + v.id_ws + ",'" + v.nome + "','" + v.link + "',0" + ",'" + v.tipo_ws + "','" + v.layer + "')";
				clone.push(v);
			});
			t = Mustache.to_html(
				"{{#data}}" + $(config.seletorTemplateDir).html() + "{{/data}}",
				{"data":clone}
			);
			$("#" + config.idCatalogoNavegacao).html(t);

			$("#" + i3GEO.catalogoOgc.config.idCatalogoPrincipal).fadeOut( "fast", function(){
				$("#" + i3GEO.catalogoOgc.config.idOndeMigalha).show();
				$("#" + i3GEO.catalogoOgc.config.idCatalogoNavegacao).show();
			});

		};
		i3GEO.php.listaRSSwsARRAY(lista, "WMS");
	},
	listaCamadas: function(nomeMigalha, id_ws, nome, url, nivel, tipo_ws, layer){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoOgc.listaCamadas");

		i3GEO.catalogoOgc.MIGALHA.push({"nome": nome,"onclick":"i3GEO.catalogoOgc.listaCamadas('" + nome + "','" + id_ws + "','" + nome + "','" + url + "'," + nivel + ",'" + tipo_ws + "','" + layer + "')"});
		i3GEO.catalogoOgc.atualizaMigalha();

		i3GEO.catalogoOgc.aguarde();

		var monta = function(dados){
			var data = dados.data,
				clone = [],
				g = "",
				temas;

			//monta a lista com proximo nivel
			$.each( data, function( i,v ) {
				if (v.nome + " - " + v.titulo !== "undefined - undefined") {
					v.descricao = v.titulo;
					if (!v.estilos) {
						v.onclick = "i3GEO.catalogoOgc.listaCamadas('" + nome + "'," + id_ws + ",'" + v.nome + "','" + url + "'," + (nivel*1 + 1) + ",'" + tipo_ws + "','" + v.titulo + "')";
						clone.push(v);
					} else {
						i3GEO.catalogoOgc.temas({
							"estilos": v.estilos,
							"servico": url,
							"layer": v.nome,
							"proj": v.srs.toString(),
							"formatoimg": v.formats.toString(),
							"versao": v.version.toString(),
							"formatoinfo": v.formatsinfo.toString()
						});
					}
				}
			});
			if(clone.length > 0){
				g = Mustache.to_html(
					"{{#data}}" + $(i3GEO.catalogoOgc.config.seletorTemplateDir).html() + "{{/data}}",
					{"data":clone}
				);
				$("#" + i3GEO.catalogoOgc.config.idCatalogoNavegacao).html(g);
			}

		};
		i3GEO.php.listaLayersWMS(monta, url, (nivel * 1) + 1, id_ws, layer,
				tipo_ws);
	},
	temas: function(config){
		var clone = [],
			estilos = config.estilos;

		$.each( estilos, function( i,v ) {
			v.onclick = "i3GEO.php.adicionaTemaWMS('','"
				+ config.servico + "','"
				+ config.layer + "','"
				+ v.nome + "','"
				+ config.proj + "','"
				+ config.formatoimg + "','"
				+ config.versao + "','"
				+ v.titulo + "','','nao','"
				+ config.formatoinfo + "','','',"
				+ "true)";
			v.nome = estilos[i].nome + " - " + estilos[i].titulo;
			clone.push(v);
		});
		var t = Mustache.to_html(
			"{{#data}}" + $(i3GEO.catalogoOgc.config.seletorTemplateTema).html() + "{{/data}}",
			{"data":clone}
		);
		$("#" + i3GEO.catalogoOgc.config.idCatalogoNavegacao).html(t);
	}
};
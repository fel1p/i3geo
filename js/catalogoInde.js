i3GEO.catalogoInde = {
	config: {
		'seletorTemplateDir': '#guia2objTemplateDir',
		'seletorTemplateTema': '#guia2objTemplateTema',
		'idCatalogoPrincipal': 'catalogoPrincipal',
		'idCatalogoNavegacao': 'catalogoNavegacao',
		'idOndeMigalha': 'catalogoMigalha'
	},
	DADOS: "",
	aguarde: function(){
		$("#" + i3GEO.catalogoInde.config.idCatalogoNavegacao).html($trad("o1"));
	},
	atualizaMigalha: function(){
		var migalha = i3GEO.catalogoInde.MIGALHA;
		var n = migalha.length;

		var nome = migalha[n - 1].nome;
		var onclick = migalha[n - 2].onclick;

		var t = Mustache.to_html(
				$($("#" + i3GEO.catalogoInde.config.idOndeMigalha).attr("data-template")).html(),
				{"nome":nome,"onclick":"i3GEO.catalogoInde.MIGALHA.pop();i3GEO.catalogoInde.MIGALHA.pop();" + onclick}
			);
		$("#" + i3GEO.catalogoInde.config.idOndeMigalha).html(t);
		$("#i3GEOguiaMovelConteudo").scrollTop(0);

	},
	escondeCatalogoPrincipal: function(){
		$("#" + i3GEO.catalogoInde.config.idCatalogoPrincipal).hide();
	},
	mostraCatalogoPrincipal: function(){
		$("#" + i3GEO.catalogoInde.config.idCatalogoNavegacao).fadeOut( "fast", function(){
			$("#" + i3GEO.catalogoInde.config.idOndeMigalha).hide();
			$("#" + i3GEO.catalogoInde.config.idCatalogoPrincipal).show();
		});
		i3GEO.catalogoInde.DADOS = "";
	},
	adicionaTema : function(tid) {
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoInde.adicionaTema");

		// confirma se o tema existe no mapa
		if (i3GEO.arvoreDeCamadas.pegaTema(tid) !== "") {
			i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid, true);
		} else {
			var layer = i3GEO.catalogoInde.DADOS.layers[tid][1];

			i3GEO.php.adicionaTemaWMS(
					'',
					layer.url,
					layer.layers,
					i3GEO.catalogoInde.DADOS.layers[tid][0],
					'EPSG:4326',
					layer.format,
					'1.1.1',
					i3GEO.catalogoInde.DADOS.layers[tid][0],
					'',
					'nao',
					"text/plain",
					'',
					'',
					true
			);
		}
	},
	inicia: function(config){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoInde.inicia");

		i3GEO.catalogoInde.DADOS = "";

		i3GEO.catalogoInde.MIGALHA = [
		{"nome":"","onclick":"i3GEO.catalogoInde.mostraCatalogoPrincipal()"},
		{"nome":"INDE-Br","onclick":"i3GEO.catalogoInde.inicia()"}
		];
		i3GEO.catalogoInde.atualizaMigalha();

		if(config){
			$.each( config, function( i,v ) {
				i3GEO.catalogoInde.config[i] = v;
			});
		}
		config = i3GEO.catalogoInde.config;

		i3GEO.catalogoInde.escondeCatalogoPrincipal();
		i3GEO.catalogoInde.aguarde();
		$("#" + i3GEO.catalogoInde.config.idCatalogoNavegacao).show();

		var lista = function(dados){
			i3GEO.catalogoInde.DADOS = dados;
			var clone = [],
				t;

			dados = dados.arvore;
			//ajusta o nome
			//verifica se o menu esta na lista de ids definidos em i3GEO.catalogoInde.IDSMENUS
			$.each( dados, function( i,v ) {
				clone.push({
					"nome": i,
					"onclick": "i3GEO.catalogoInde.listaTemas('" + i + "')"
				});
			});
			t = Mustache.to_html(
				"{{#data}}" + $(config.seletorTemplateDir).html() + "{{/data}}",
				{"data":clone}
			);
			$("#" + config.idCatalogoNavegacao).html(t);

			$("#" + i3GEO.catalogoInde.config.idCatalogoPrincipal).fadeOut( "fast", function(){
				$("#" + i3GEO.catalogoInde.config.idOndeMigalha).show();
				$("#" + i3GEO.catalogoInde.config.idCatalogoNavegacao).show();
			});

		};
		if(i3GEO.catalogoInde.DADOS == ""){
			i3GEO.php.inde(lista);
		} else {
			lista(i3GEO.catalogoInde.DADOS);
		}
	},
	listaTemas: function(sigla){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoInde.listaGrupos");

		var clone = [],
			temp;

		i3GEO.catalogoInde.MIGALHA.push({"nome": sigla,"onclick":"i3GEO.catalogoInde.listaTemas('" + sigla + "')"});
		i3GEO.catalogoInde.atualizaMigalha();

		i3GEO.catalogoInde.aguarde();
		var estilos = i3GEO.catalogoInde.DADOS.arvore[sigla];
		$.each( estilos, function( i,v ) {
			temp = v.split("#");
			clone.push({
				"nome": temp[0],
				"onclick": "i3GEO.catalogoInde.adicionaTema('" + temp[1] + "')",
				"link": "<a href='" + i3GEO.catalogoInde.DADOS.layers[temp[1]][1].metadataURL + "' target='_blank' >Metadata</a>"
			});
		});
		var t = Mustache.to_html(
			"{{#data}}" + $(i3GEO.catalogoInde.config.seletorTemplateTema).html() + "{{/data}}",
			{"data":clone}
		);
		$("#" + i3GEO.catalogoInde.config.idCatalogoNavegacao).html(t);
	}
};
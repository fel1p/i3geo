i3GEO.catalogoMapas={MIGALHA:[],config:{'seletorTemplateDir':'#guia2objTemplateDir','seletorTemplateTema':'#guia2objTemplateTema','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'},aguarde:function(){$("#"+i3GEO.catalogoMapas.config.idCatalogoNavegacao).html($trad("o1"))},atualizaMigalha:function(){var migalha=i3GEO.catalogoMapas.MIGALHA;var n=migalha.length;var nome=migalha[n-1].nome;var onclick=migalha[n-2].onclick;var t=Mustache.to_html($($("#"+i3GEO.catalogoMapas.config.idOndeMigalha).attr("data-template")).html(),{"nome":nome,"onclick":"i3GEO.catalogoMapas.MIGALHA.pop();i3GEO.catalogoMapas.MIGALHA.pop();"+onclick});$("#"+i3GEO.catalogoMapas.config.idOndeMigalha).html(t);$("#i3GEOguiaMovelConteudo").scrollTop(0)},escondeCatalogoPrincipal:function(){$("#"+i3GEO.catalogoMapas.config.idCatalogoPrincipal).hide()},mostraCatalogoPrincipal:function(){$("#"+i3GEO.catalogoMapas.config.idCatalogoNavegacao).fadeOut("fast",function(){$("#"+i3GEO.catalogoMapas.config.idOndeMigalha).hide();$("#"+i3GEO.catalogoMapas.config.idCatalogoPrincipal).show()})},adicionaTema:function(tid){if(i3GEO.arvoreDeCamadas.pegaTema(tid)!==""){i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid,true)}else{i3GEO.arvoreDeTemas.adicionaTemas([tid])}},inicia:function(config){i3GEO.catalogoMapas.MIGALHA=[{"nome":"","onclick":"i3GEO.catalogoMapas.mostraCatalogoPrincipal()"},{"nome":$trad("x90"),"onclick":"i3GEO.catalogoMapas.inicia()"}];i3GEO.catalogoMapas.atualizaMigalha();if(config){$.each(config,function(i,v){i3GEO.catalogoMapas.config[i]=v})}config=i3GEO.catalogoMapas.config;i3GEO.catalogoMapas.escondeCatalogoPrincipal();var t=Mustache.to_html($($("#"+i3GEO.catalogoMapas.config.idOndeMigalha).attr("data-template")).html(),{"nome":$trad("x57"),"onclick":"i3GEO.catalogoMapas.mostraCatalogoPrincipal()"});i3GEO.catalogoMapas.aguarde();i3GEO.catalogoMapas.config=config;var lista=function(dados){var clone=[],t;dados=dados.data.mapas;$.each(dados,function(i,v){v.onclick="i3GEO.catalogoMapas.adiciona("+v.ID_MAPA+",'"+v.NOME+"')";if(v.PUBLICADO.toLowerCase()=="nao"){v.nome=v.NOME+" <small>("+$trad("naoPublicado")+")<small>"}else{v.nome=v.NOME}if(i3GEO.configura.optUsuarioLogado==true||v.PUBLICADO.toLowerCase()!="nao"){clone.push(v)}});t=Mustache.to_html("{{#data}}"+$(config.seletorTemplateTema).html()+"{{/data}}",{"data":clone});$("#"+config.idCatalogoNavegacao).html(t);$("#"+i3GEO.catalogoMapas.config.idCatalogoPrincipal).fadeOut("fast",function(){$("#"+i3GEO.catalogoMapas.config.idOndeMigalha).show();$("#"+i3GEO.catalogoMapas.config.idCatalogoNavegacao).show()})};i3GEO.php.pegaMapas(lista)},adiciona:function(ID_MAPA,NOME){i3GEO.php.adtema(i3GEO.atualiza,"mapaCadastrado_"+ID_MAPA)}};
if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.configura={optUsuarioLogado:true,guardaExtensao:true,grupoLayers:"",tipoimagem:"nenhum",ajustaDocType:false,tipotip:"balao",alturatip:"100px",larguratip:"200px",funcaoTip:"i3GEO.mapa.dialogo.verificaTipDefault()",funcaoIdentifica:"i3GEO.mapa.dialogo.cliqueIdentificaDefault()",diminuixM:0,diminuixN:0,diminuiyM:0,diminuiyN:0,autotamanho:false,map3d:"",embedLegenda:"nao",templateLegenda:"legenda11.htm",mashuppar:"",sid:"",locaplic:"",mapaRefDisplay:"block",visual:"default",cursores:{"identifica":{ff:"pointer",ie:"pointer"},"pan":{ff:"/imagens/cursores/pan.png",ie:"/imagens/cursores/pan.cur"},"area":{ff:"crosshair",ie:"crosshair"},"distancia":{ff:"crosshair",ie:"crosshair"},"zoom":{ff:"/imagens/cursores/zoom.png",ie:"/imagens/cursores/zoom.cur"},"contexto":{ff:"/imagens/cursores/contexto.png",ie:"/imagens/cursores/contexto.cur"},"identifica_contexto":{ff:"pointer",ie:"pointer"},"pan_contexto":{ff:"/imagens/cursores/pan_contexto.png",ie:"/imagens/cursores/pan_contexto.cur"},"zoom_contexto":{ff:"/imagens/cursores/zoom_contexto.png",ie:"/imagens/cursores/zoom_contexto.cur"}},listaDePropriedadesDoMapa:{"propriedades":[{text:"p2",url:"javascript:i3GEO.mapa.dialogo.tipoimagem()"},{text:"p3",url:"javascript:i3GEO.mapa.dialogo.opcoesLegenda()"},{text:"p4",url:"javascript:i3GEO.mapa.dialogo.opcoesEscala()"},{text:"p5",url:"javascript:i3GEO.mapa.dialogo.tamanho()"},{text:"p7",url:"javascript:i3GEO.mapa.ativaLogo()"},{text:"p8",url:"javascript:i3GEO.mapa.dialogo.queryMap()"},{text:"p9",url:"javascript:i3GEO.mapa.dialogo.corFundo()"},{text:"p10",url:"javascript:i3GEO.mapa.dialogo.gradeCoord()"},{text:"p12",url:"javascript:i3GEO.mapa.dialogo.autoredesenha()"}]},tempoAplicar:4000,tempoMouseParado:1800,iniciaJanelaMensagens:false,funcoesBotoes:{"botoes":[{iddiv:"historicozoom",tipo:"",dica:"",constroiconteudo:'i3GEO.gadgets.mostraHistoricoZoom()'},{iddiv:"zoomtot",tipo:"",dica:$trad("d2"),titulo:$trad("d2t"),funcaoonclick:function(){if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.extentTotal);return}if(i3GEO.Interface.ATUAL==="googlemaps"){i3GEO.Interface.googlemaps.zoom2extent(i3GEO.parametros.extentTotal);return}}},{iddiv:"localizar",tipo:"",dica:$trad("dicaBuscaRapida"),titulo:$trad("o2"),funcaoonclick:function(){if(!$i("janelaBuscaRapida")){var janela=i3GEO.janela.cria("258px","30px","","","","<div class='i3GeoTituloJanela'>"+$trad("o2")+"</div>","janelaBuscaRapida",false,"hd","","","",true,i3GEO.configura.locaplic+"/imagens/oxygen/16x16/edit-find.png");$i("janelaBuscaRapida_corpo").style.backgroundColor="white";i3GEO.gadgets.mostraBuscaRapida(janela[2].id)}}},{iddiv:"zoomli",tipo:"dinamico",dica:$trad("d3"),titulo:$trad("d3t"),funcaoonclick:function(){if(DetectaMobile("DetectMobileLong")){i3GEO.janela.tempoMsg($trad("x70"))}else{i3GEO.janela.tempoMsg($trad("x69"))}if(i3GEO.Interface.ATUAL==="googlemaps"){i3GEO.barraDeBotoes.ativaIcone("pan");i3GEO.barraDeBotoes.BOTAOPADRAO="pan";i3GeoMap.setOptions({draggable:true});i3GEO.util.mudaCursor(i3GEO.configura.cursores,"pointer",i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic)}if(i3GEO.Interface.ATUAL==="openlayers"){}}},{iddiv:"zoomanterior",tipo:"dinamico",dica:"",titulo:"",funcaoonclick:function(){i3GEO.navega.extensaoAnterior()}},{iddiv:"zoomproximo",tipo:"dinamico",dica:"",titulo:"",funcaoonclick:function(){i3GEO.navega.extensaoProximo()}},{iddiv:"pan",tipo:"dinamico",dica:$trad("d4"),titulo:$trad("d4t"),funcaoonclick:function(){i3GEO.barraDeBotoes.ativaIcone("pan");i3GEO.barraDeBotoes.BOTAOPADRAO="pan";if(i3GEO.Interface.ATUAL==="googlemaps"){i3GeoMap.setOptions({draggable:true});i3GEO.util.mudaCursor(i3GEO.configura.cursores,"pointer",i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic);return}if($i(i3GEO.Interface.IDMAPA)){i3GEO.util.mudaCursor(i3GEO.configura.cursores,"pointer",i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic)}marcadorZoom="";if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.OLpanel.activateControl(i3GEO.Interface.openlayers.OLpan);return}}},{iddiv:"zoomiauto",tipo:"",dica:$trad("d5"),titulo:$trad("d5t"),funcaoonclick:function(){i3GEO.navega.zoomin(i3GEO.configura.locaplic,i3GEO.configura.sid);marcadorZoom=''}},{iddiv:"zoomoauto",tipo:"",dica:$trad("d6"),titulo:$trad("d6t"),funcaoonclick:function(){i3GEO.navega.zoomout(i3GEO.configura.locaplic,i3GEO.configura.sid);marcadorZoom=""}},{iddiv:"identifica",tipo:"dinamico",dica:$trad("d7"),titulo:$trad("d7t"),funcaoonclick:function(){var temp;if($i(i3GEO.Interface.IDMAPA)){$i(i3GEO.Interface.IDMAPA).title="";temp="identifica";i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic)}i3GEO.barraDeBotoes.ativaIcone("identifica");i3GEO.eventos.cliquePerm.desativa();if(i3GEO.eventos.cliquePerm.ativo===false){if(i3GEO.eventos.MOUSECLIQUE.toString().search(i3GEO.configura.funcaoIdentifica)>=0){i3GEO.eventos.MOUSECLIQUE.remove(i3GEO.configura.funcaoIdentifica);return}i3GEO.eventos.MOUSECLIQUE=[i3GEO.configura.funcaoIdentifica]}else{i3GEO.eventos.removeEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoTip]);i3GEO.eventos.adicionaEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoIdentifica])}}},{iddiv:"identificaBalao",tipo:"dinamico",dica:$trad("d7a"),titulo:$trad("d7at"),funcaoonclick:function(){if(i3GEO.arvoreDeCamadas.filtraCamadas("etiquetas","","diferente",i3GEO.arvoreDeCamadas.CAMADAS)===""){i3GEO.janela.tempoMsg($trad("d31"));return}var temp;if($i(i3GEO.Interface.IDMAPA)){$i(i3GEO.Interface.IDMAPA).title="";temp="identifica";i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,i3GEO.Interface.IDMAPA,i3GEO.configura.locaplic)}i3GEO.barraDeBotoes.ativaIcone("identificaBalao");if(i3GEO.eventos.cliquePerm.ativo===false){i3GEO.eventos.MOUSECLIQUE=[i3GEO.configura.funcaoTip]}else{i3GEO.eventos.removeEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoIdentifica]);i3GEO.eventos.adicionaEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoTip])}i3GEO.eventos.cliquePerm.ativa()}},{iddiv:"exten",tipo:"",dica:$trad("d8"),titulo:$trad("d8t"),funcaoonclick:function(){i3GEO.mapa.dialogo.mostraExten()}},{iddiv:"referencia",tipo:"",dica:$trad("d9"),titulo:$trad("d9t"),funcaoonclick:function(){i3GEO.maparef.inicia()}},{iddiv:"wiki",tipo:"",dica:$trad("d11"),titulo:$trad("d11t"),funcaoonclick:function(){i3GEO.navega.dialogo.wiki()}},{iddiv:"metar",tipo:"",dica:$trad("d29"),titulo:$trad("d29"),funcaoonclick:function(){i3GEO.navega.dialogo.metar()}},{iddiv:"buscafotos",tipo:"",dica:"Fotos",titulo:"fotos",funcaoonclick:function(){i3GEO.navega.dialogo.buscaFotos()}},{iddiv:"imprimir",tipo:"",dica:$trad("d12"),titulo:$trad("d12"),funcaoonclick:function(){i3GEO.mapa.dialogo.imprimir()}},{iddiv:"ondeestou",tipo:"",dica:$trad("d13"),funcaoonclick:function(){i3GEO.navega.zoomIP(i3GEO.configura.locaplic,i3GEO.configura.sid)}},{iddiv:"v3d",tipo:"",dica:$trad("d14"),titulo:$trad("d14"),funcaoonclick:function(){i3GEO.mapa.dialogo.t3d()}},{iddiv:"google",tipo:"",dica:$trad("d15"),titulo:$trad("d15t"),funcaoonclick:function(){i3GEO.navega.dialogo.google()}},{iddiv:"scielo",tipo:"",dica:$trad("d16"),titulo:$trad("d16t"),funcaoonclick:function(){}},{iddiv:"confluence",tipo:"",dica:$trad("d17"),titulo:$trad("d17t"),funcaoonclick:function(){i3GEO.navega.dialogo.confluence()}},{iddiv:"lentei",tipo:"",dica:$trad("d18"),titulo:$trad("d18t"),funcaoonclick:function(){if(i3GEO.navega.lente.ESTAATIVA==="nao"){i3GEO.navega.lente.inicia()}else{i3GEO.navega.lente.desativa()}}},{iddiv:"encolheFerramentas",tipo:"",dica:$trad("d19"),funcaoonclick:function(){i3GEO.guias.libera()}},{iddiv:"reinicia",tipo:"",dica:$trad("d20"),titulo:$trad("d20t"),funcaoonclick:function(){var temp=function(){var url=window.location.href;url=url.replace("#","");url=url.split("?");window.location.href=url[0]+"?"+i3GEO.configura.sid};i3GEO.php.reiniciaMapa(temp)}},{iddiv:"mede",tipo:"dinamico",dica:$trad("d21"),titulo:$trad("d21t"),funcaoonclick:function(){i3GEO.analise.medeDistancia.inicia()}},{iddiv:"area",tipo:"dinamico",dica:$trad("d21a"),titulo:$trad("d21at"),funcaoonclick:function(){i3GEO.analise.medeArea.inicia()}},{iddiv:"barraedicao",tipo:"",dica:$trad("u29"),titulo:$trad("u29"),funcaoonclick:function(){i3GEO.barraDeBotoes.editor.inicia()}},{iddiv:"inserexy",tipo:"dinamico",dica:$trad("d22"),titulo:$trad("d22t"),funcaoonclick:function(){i3GEO.barraDeBotoes.ativaIcone("inserexy");i3GEO.mapa.dialogo.cliquePonto()}},{iddiv:"inseregrafico",tipo:"dinamico",dica:$trad("d23"),funcaoonclick:function(){i3GEO.mapa.dialogo.cliqueGrafico()}},{iddiv:"selecao",tipo:"dinamico",dica:$trad("d24"),titulo:$trad("d24t"),funcaoonclick:function(){i3GEO.barraDeBotoes.ativaIcone("selecao");i3GEO.mapa.dialogo.selecao()}},{iddiv:"textofid",tipo:"dinamico",dica:$trad("d25"),titulo:$trad("d25t"),funcaoonclick:function(){i3GEO.barraDeBotoes.ativaIcone("textofid");i3GEO.mapa.dialogo.cliqueTexto()}},{iddiv:"rota",tipo:"",dica:"Rota",titulo:"roteamento",funcaoonclick:function(){if(i3GEO.Interface.ATUAL!=="googlemaps"){alert("Operacao disponivel apenas na interface Google Maps");return}counterClick=1;var parametrosRota=function(overlay,latlng){var temp,janela;if(counterClick===1){counterClick++;alert("Clique o ponto de destino da rota");pontoRota1=latlng;return}if(counterClick===2){pontoRota2=latlng;counterClick=0;GEvent.removeListener(rotaEvento);janela=i3GEO.janela.cria("300px","300px","","center","","<div class='i3GeoTituloJanela'>"+$trad("x48")+"</div>");janela[2].style.overflow="auto";janela[2].style.height="300px";directions=new GDirections(i3GeoMap,janela[2]);temp=function(){$i("wdoca_corpo").innerHTML="N&atilde;o foi poss&iacute;vel criar a rota"};GEvent.addListener(directions,"error",temp);directions.load("from: "+pontoRota1.lat()+","+pontoRota1.lng()+" to: "+pontoRota2.lat()+","+pontoRota2.lng())}};rotaEvento=GEvent.addListener(i3GeoMap,"click",parametrosRota);i3GEO.janela.tempoMsg("Clique o ponto de origem da rota")}},{iddiv:"abreJanelaLegenda",tipo:"",dica:$trad("p3"),titulo:$trad("p3"),funcaoonclick:function(){i3GEO.mapa.legendaHTML.libera("sim")}}]},iniciaFerramentas:{executa:function(){var q=i3GEO.configura.iniciaFerramentas.quais,i=0;for(i in q){if(q[i].ativa===true){q[i].funcao.call()}}},"quais":{legenda:{ativa:false,largura:302,altura:300,topo:50,esquerda:100,funcao:function(){var q=i3GEO.configura.iniciaFerramentas.quais.legenda;i3GEO.mapa.legendaHTML.libera("sim",q.largura,q.altura,q.topo,q.esquerda)}},locregiao:{ativa:false,largura:215,altura:"",topo:150,esquerda:150,funcao:function(){var q=i3GEO.configura.iniciaFerramentas.quais.locregiao;i3GEO.mapa.dialogo.locregiao(q.largura,q.altura,q.topo,q.esquerda)}},metaestat:{ativa:false,largura:215,altura:"",topo:150,esquerda:150,funcao:function(){var q=i3GEO.configura.iniciaFerramentas.quais.metaestat;i3GEO.mapa.dialogo.metaestat(q.largura,q.altura,q.topo,q.esquerda)}}}},ferramentasLayers:{param:["tme","storymap","animagif"],"tme":{"arvoreDeCamadas":true,"metadata":"tme","classe":"i3GEOiconeTme",init:function(codigo){window.open(i3GEO.configura.locaplic+"/ferramentas/tme/cesium.php?&tema="+codigo)},icone:function(layer){var l,icone;if(typeof layer!="string"){if(layer.params.LAYERS){l=layer.params.LAYERS}else{l=layer.layername}}else{l=layer}icone="<img class='i3GEOiconeTme' onclick='i3GEO.util.animaClique(this);"+"i3GEO.configura.ferramentasLayers.tme.init(\""+l+"\");return false;'"+"title='3d' "+"src='"+i3GEO.configura.locaplic+"/imagens/branco.gif' />";return icone}},"storymap":{"arvoreDeCamadas":true,"metadata":"storymap","classe":"i3GEOiconeStorymap",init:function(codigo){window.open(i3GEO.configura.locaplic+"/ferramentas/storymap/default.php?&tema="+codigo)},icone:function(layer){var l,icone;if(typeof layer!="string"){if(layer.params.LAYERS){l=layer.params.LAYERS}else{l=layer.layername}}else{l=layer}icone="<img class='i3GEOiconeStorymap' onclick='i3GEO.util.animaClique(this);"+"i3GEO.configura.ferramentasLayers.storymap.init(\""+l+"\");return false;'"+"title='StoryMap' "+"src='"+i3GEO.configura.locaplic+"/imagens/branco.gif' />";return icone}},"animagif":{"arvoreDeCamadas":true,"metadata":"animagif","classe":"i3GEOiconeAnimagif",init:function(codigo){window.open(i3GEO.configura.locaplic+"/ferramentas/animagif/index.php?&tema="+codigo)},icone:function(layer){var l,icone;if(typeof layer!="string"){if(layer.params.LAYERS){l=layer.params.LAYERS}else{l=layer.layername}}else{l=layer}icone="<img class='i3GEOiconeAnimagif' onclick='i3GEO.util.animaClique(this);"+"i3GEO.configura.ferramentasLayers.animagif.init(\""+l+"\");return false;'"+"title='Animagif' "+"src='"+i3GEO.configura.locaplic+"/imagens/branco.gif' />";return icone}}},ferramentas:{"buscainde":{"csw":"http://www.metadados.inde.gov.br/geonetwork/srv/br"}}};
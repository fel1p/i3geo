if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.barraDeBotoes={BARRAS:[],BOTAOCLICADO:"",ATIVA:true,TIPO:"yui",OFFSET:-205,POSICAO:"bottom",MAXBOTOES:13,AJUDA:true,ORIENTACAO:"vertical",HORIZONTALW:350,TIPOAJUDA:"balao",AUTOALTURA:false,PERMITEFECHAR:false,PERMITEDESLOCAR:true,ATIVAMENUCONTEXTO:false,AUTO:false,LISTABOTOES:i3GEO.configura.funcoesBotoes.botoes,INCLUIBOTAO:{abreJanelaLegenda:false,localizar:false,zoomanterior:true,zoomli:true,zoomproximo:true,zoomiauto:false,zoomoauto:false,pan:true,zoomtot:true,identifica:true,identificaBalao:true,mede:true,area:true,selecao:false,barraedicao:false,imprimir:false,google:false,referencia:false,exten:false,inserexy:false,textofid:false,reinicia:false,buscafotos:false,wiki:false,metar:false,lentei:false,confluence:false,inseregrafico:false,v3d:false},ICONEBOTAO:{zoomli:"/imagens/gisicons/eudock/zoom-region.png",zoomproximo:"/imagens/gisicons/eudock/zoom-next.png",zoomanterior:"/imagens/gisicons/eudock/zoom-last.png",zoomiauto:"/imagens/gisicons/eudock/zoom-in.png",zoomoauto:"/imagens/gisicons/eudock/zoom-out.png",pan:"/imagens/gisicons/eudock/pan.png",zoomtot:"/imagens/gisicons/eudock/zoom-extent.png",identifica:"/imagens/gisicons/eudock/identify.png",identificaBalao:"/imagens/gisicons/eudock/tips.png",mede:"/imagens/gisicons/eudock/length-measure.png",area:"/imagens/gisicons/eudock/area-measure.png",imprimir:"/imagens/gisicons/eudock/print.png",reinicia:"/imagens/gisicons/eudock/redraw.png",exten:"/imagens/gisicons/eudock/map-extent-info.png",referencia:"/imagens/gisicons/eudock/map-reference.png",inserexy:"/imagens/gisicons/eudock/point-create.png",textofid:"/imagens/gisicons/eudock/text-add.png",selecao:"/imagens/gisicons/eudock/select.png",google:"/imagens/gisicons/eudock/google-map.png",buscafotos:"/imagens/gisicons/eudock/fotos.png",wiki:"/imagens/gisicons/eudock/wiki.png",metar:"/imagens/gisicons/eudock/metar.png",lentei:"/imagens/gisicons/eudock/lente.png",confluence:"/imagens/gisicons/eudock/confluence.png",inseregrafico:"/imagens/gisicons/eudock/grafico.png",v3d:"/imagens/gisicons/eudock/v3d.png",barraedicao:"/imagens/gisicons/eudock/editopen.png",localizar:"/imagens/gisicons/eudock/search.png",abreJanelaLegenda:"/imagens/gisicons/eudock/show-legend.png"},TEMPLATEBOTAO:"",BOTAOPADRAO:"pan",adicionaBotao:function(obj){i3GEO.barraDeBotoes.LISTABOTOES.push(obj);i3GEO.barraDeBotoes.ICONEBOTAO[obj.iddiv]="/imagens/oxygen/22x22/user-online.png";i3GEO.barraDeBotoes.INCLUIBOTAO[obj.iddiv]=true},ativaPadrao:function(){if(i3GEO.barraDeBotoes.ATIVA===true){try{var botao=i3GEO.barraDeBotoes.defBotao(i3GEO.barraDeBotoes.BOTAOPADRAO);if(botao.funcaoonclick){botao.funcaoonclick.call()}}catch(e){}}},ativaIcone:function(icone){},ativaBotoes:function(padrao){var atrib,l,b,temp;if(arguments.length===0){padrao=this.BOTAOPADRAO}this.BOTAOCLICADO=padrao;l=this.LISTABOTOES;b=l.length-1;if(b>=0){do{temp=$i(l[b].iddiv);if(temp){atrib=document.createAttribute("indxBotao");atrib.value=b;temp.setAttributeNode(atrib);if(l[b].conteudo){temp.innerHTML=l[b].conteudo}if(l[b]&&l[b].funcaoonclick){temp.onclick=l[b].funcaoonclick;if(l[b].iddiv==padrao){l[b].funcaoonclick()}}if(l[b]&&l[b].constroiconteudo){eval(l[b].constroiconteudo)}}}while(b--)}if(padrao===""){this.ativaIcone("")}},execBotao:function(id,x,y,posX,posY){if(i3GEO.barraDeBotoes.ATIVA===false){return}var botao=i3GEO.barraDeBotoes.defBotao(id);i3GEO.barraDeBotoes.BOTAOCLICADO=id;if(botao===false){return}try{if(botao.funcaoonclick){botao.funcaoonclick.call()}}catch(e){}},defBotao:function(iddiv){var l=i3GEO.barraDeBotoes.LISTABOTOES,b=l.length-1;if(b>=0){do{if(l[b].iddiv===iddiv){return l[b]}}while(b--)}return false},inicializaBarraOP:function(onde,numBotoes){},inicializaBarra:function(idconteudo,idconteudonovo,barraZoom,x,y,onde){},reativa:function(indice){if(i3GEO.barraDeBotoes.ATIVA===false){return}var abre=function(){var i,n=i3GEO.barraDeBotoes.BARRAS.length;for(i=0;i<n;i+=1){if(i3GEO.barraDeBotoes.BARRAS[i]){i3GEO.barraDeBotoes.BARRAS[i].show()}}};try{if(arguments.length===1){i3GEO.barraDeBotoes.BARRAS[indice].show()}else{abre.call()}}catch(e){abre.call()}},recria:function(id){},fecha:function(id){var i,n=this.BARRAS.length;for(i=0;i<n;i+=1){if(this.BARRAS[i]&&this.BARRAS[i].id===id){$i(id+"_c").style.visibility="hidden"}}},editor:{inicia:function(){i3GEO.eventos.cliquePerm.desativa();i3GEO.barraDeBotoes.editor[i3GEO.Interface.ATUAL].inicia("janelaEditorVetorial")},googlemaps:{inicia:function(idjanela){var temp=function(){var cabecalho,minimiza,fecha,janela=YAHOO.i3GEO.janela.manager.find("i3GEOjanelaEditor");if(janela){janela.destroy()}cabecalho=function(){};minimiza=function(){i3GEO.janela.minimiza("i3GEOjanelaEditor")};janela=i3GEO.janela.cria("350px","100px","","","","<div class='i3GeoTituloJanela'>Editor</div>","i3GEOjanelaEditor",false,"hd",cabecalho,minimiza);$i("i3GEOjanelaEditor_corpo").style.backgroundColor="white";i3GEO.editorGM.inicia("i3GEOjanelaEditor_corpo");fecha=function(){var temp=window.confirm($trad("x94"));if(i3GEO.eventos){i3GEO.eventos.cliquePerm.ativa()}if(temp===true){i3GEO.desenho.googlemaps.destroyFeatures(i3GEO.desenho.googlemaps.shapes)}};$(janela[0].close).click(fecha)};if(!i3GEO.editorGM){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/editorgm/editorgm_compacto.js",temp,"editorgm.js",true)}else{temp.call()}}},openlayers:{inicia:function(idjanela){if(!i3GEO.editorOL){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/editorol/editorol.js","i3GEO.barraDeBotoes.editor.openlayers.ativaPainel('"+idjanela+"')","editorol.js",true)}else{if(!i3GEO.desenho.layergrafico){i3GEO.desenho.openlayers.criaLayerGrafico();i3GEO.editorOL.mapa.addLayers([i3GEO.desenho.layergrafico])}if(!i3GEO.editorOL.backup){i3GEO.editorOL.backup=new ol.layer.Vector({source:new ol.source.Vector({features:new ol.Collection(),useSpatialIndex:false,name:"Backup"}),visible:false});i3GEO.editorOL.backup.setMap(i3geoOL);i3GEO.editorOL.backup.getFeatures=function(){return i3GEO.editorOL.backup.getSource().getFeatures()}}i3GEO.editorOL.criaBotoes(i3GEO.editorOL.botoes)}},criaJanela:function(){if($i("i3GEOjanelaEditor")){return"i3GEOjanelaEditor"}var janela,divid,titulo,cabecalho,minimiza;cabecalho=function(){};minimiza=function(){i3GEO.janela.minimiza("i3GEOjanelaEditor")};titulo="<div class='i3GeoTituloJanela'>"+$trad("u29")+"</div>";janela=i3GEO.janela.cria("300px","200px","","","",titulo,"i3GEOjanelaEditor",false,"hd",cabecalho,minimiza);divid=janela[2].id;$i("i3GEOjanelaEditor_corpo").style.backgroundColor="white";$i("i3GEOjanelaEditor_corpo").style.textAlign="left";return divid},ativaPainel:function(idjanela){i3GEO.editorOL.fundo="";i3GEO.editorOL.mapa=i3geoOL;i3GEO.editorOL.maxext="";i3GEO.editorOL.controles=[];i3GEO.editorOL.botoes={'zoomin':true,'zoomout':true,'pan':true,'zoombox':true,'zoomtot':true,'legenda':true,'distancia':true,'area':true,'identifica':true,'linha':true,'ponto':true,'poligono':true,'texto':true,'corta':true,'edita':true,'listag':true,'selecao':true,'selecaotudo':true,'apaga':true,'procura':false,'propriedades':true,'salva':true,'ajuda':true,'fecha':true,'tools':true,'undo':true,'frente':true};if(!i3GEO.desenho.layergrafico){i3GEO.desenho.openlayers.criaLayerGrafico()}if(idjanela){i3GEO.editorOL.criaBotoes(i3GEO.editorOL.botoes)}}}}};
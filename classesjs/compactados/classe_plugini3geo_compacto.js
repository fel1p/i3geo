if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.pluginI3geo={OBJETOS:{},PLUGINS:[{"classe":"heatmap","nome":"Mapa de calor","editor":true},{"classe":"markercluster","nome":"Agrupamento de pontos (cluster)","editor":true},{"classe":"layerkml","nome":"Camada Kml","editor":true},{"classe":"parametrossql","nome":"SQL parametrizado","editor":true}],inicia:function(camada){if(i3GEO.janela){i3GEO.janela.AGUARDEMODAL=true;i3GEO.janela.abreAguarde("aguardePlugin","Plugin...");i3GEO.janela.AGUARDEMODAL=false}i3GEO.pluginI3geo[camada.plugini3geo.plugin][i3GEO.Interface.ATUAL].inicia(camada)},formAdmin:function(plugin,configString){return i3GEO.pluginI3geo[plugin].formAdmin(configString)},linkAjuda:function(plugin){return i3GEO.pluginI3geo[plugin].linkAjuda()},ligaCamada:function(nomecamada){if(i3GEO.pluginI3geo.OBJETOS[nomecamada]&&i3GEO.pluginI3geo.OBJETOS[nomecamada].ligaCamada){i3GEO.pluginI3geo.OBJETOS[nomecamada].ligaCamada();return true}return false},desligaCamada:function(nomecamada){if(i3GEO.pluginI3geo.OBJETOS[nomecamada]&&i3GEO.pluginI3geo.OBJETOS[nomecamada].desLigaCamada){i3GEO.pluginI3geo.OBJETOS[nomecamada].desLigaCamada();return true}return false},removeCamada:function(nomecamada){if(i3GEO.pluginI3geo.OBJETOS[nomecamada]&&i3GEO.pluginI3geo.OBJETOS[nomecamada].removeCamada){i3GEO.pluginI3geo.OBJETOS[nomecamada].removeCamada();delete(i3GEO.pluginI3geo.OBJETOS[nomecamada]);return true}return false},atualizaCamada:function(nomecamada){if(i3GEO.pluginI3geo.OBJETOS[nomecamada]&&i3GEO.pluginI3geo.OBJETOS[nomecamada].atualizaCamada){i3GEO.pluginI3geo.OBJETOS[nomecamada].atualizaCamada();return true}return false},existeObjeto:function(nomecamada){if(i3GEO.pluginI3geo.OBJETOS[nomecamada]&&i3GEO.pluginI3geo.OBJETOS[nomecamada].atualizaCamada){return true}return false},aplicaPropriedades:function(camada){if(camada.plugini3geo&&camada.plugini3geo!=""){camada=i3GEO.pluginI3geo[camada.plugini3geo.plugin][i3GEO.Interface.ATUAL].aplicaPropriedades(camada)}return camada},heatmap:{linkAjuda:function(){return i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=121"},formAdmin:function(config){var parametros,ins="",configDefault='{"plugin":"heatmap","parametros":{"tipoGradiente": "default","valorPonto":1,"coluna":"","radius":15}}';if(config===""){config=configDefault}config=YAHOO.lang.JSON.parse(config);if(config.plugin!="heatmap"){config=YAHOO.lang.JSON.parse(configDefault)}parametros=config.parametros;ins+=""+"<p>Coluna que cont&eacute;m os dados:"+"<br><input name='coluna' type='text' value='"+parametros.coluna+"' size='30'></p>"+"<p>Ou valor num&eacute;rico para cada ponto:"+"<br><input name='valorPonto' type='text' value='"+parametros.valorPonto+"' size='30'></p>"+"<p>Raio de cada ponto em pixels:"+"<br><input name='radius' type='text' value='"+parametros.radius+"' size='30'></p>"+"<p>Tipo de gradiente (deixe vazio para utilizar as classes definidas no Layer ou escreva 'default' para usar o normal):"+"<br><input name='tipoGradiente' type='text' value='"+parametros.tipoGradiente+"' size='30'></p>"+"<p>Para definir os cortes no gradiente de cores utilize valores entre 0 e 1."+" As cores s&atilde;o definidas nas classes do LAYER, sendo que o nome define o valor superior do gradiente e COLOR define a cor."+" Veja o exemplo utilizado no tema _lmapadecalor.map</p>";return ins},googlemaps:{aplicaPropriedades:function(camada){camada.sel="nao";camada.download="nao";camada.AGUARDALEGENDA=false;camada.temporizador="";camada.copia=false;camada.procurar=false;camada.toponimia=false;camada.etiquetas=false;camada.tabela=false;camada.grafico=false;camada.destacar=false;camada.wms=false;camada.classe="NAO";return camada},inicia:function(camada){var nomeScript="heatmap_script",p=i3GEO.configura.locaplic+"/ferramentas/heatmap/googlemaps_js.php",carregaJs="nao",criaLayer;criaLayer=function(){var heatmap,pontos;heatmap=new HeatmapOverlay(i3GeoMap,camada.name,{"radius":camada.plugini3geo.parametros.radius,"visible":true,"opacity":camada.transparency,"gradient":heatmap_config.gradient,"legend":{"title":camada.tema,"position":"bl","offset":[5,50]}});pontos={max:camada.plugini3geo.parametros.max,data:heatmap_dados};i3GEO.janela.fechaAguarde("aguardePlugin");heatmap.setDataSet(pontos);heatmap.ligaCamada=function(){this.liga()};heatmap.desLigaCamada=function(){this.desliga()};heatmap.removeCamada=function(){this.destroy()};heatmap.atualizaCamada=function(){this.draw()};i3GEO.pluginI3geo.OBJETOS[camada.name]=heatmap;heatmap_dados=null};if(!$i(nomeScript)){carregaJs="sim"}else{nomeScript=""}p+="?carregajs="+carregaJs+"&layer="+camada.name+"&coluna="+camada.plugini3geo.parametros.coluna+"&tipoGradiente="+camada.plugini3geo.parametros.tipoGradiente+"&g_sid="+i3GEO.configura.sid+"&nomevariavel=heatmap_dados&nomevariavelConfig=heatmap_config";i3GEO.util.scriptTag(p,criaLayer,nomeScript)}},openlayers:{aplicaPropriedades:function(camada){camada.sel="nao";camada.download="nao";camada.AGUARDALEGENDA=false;camada.temporizador="";camada.copia=false;camada.procurar=false;camada.toponimia=false;camada.etiquetas=false;camada.tabela=false;camada.grafico=false;camada.destacar=false;camada.wms=false;camada.classe="NAO";return camada},inicia:function(camada,objMapa){var nomeScript="heatmap_script",p=i3GEO.configura.locaplic+"/ferramentas/heatmap/openlayers_js.php",carregaJs="nao",criaLayer;criaLayer=function(){var temp,heatmap,transformedTestData={max:1,data:[]},data=heatmap_dados,datalen=heatmap_dados.length,nudata=[],max=0;if(!objMapa){objMapa=i3geoOL}while(datalen--){temp=heatmap_dados[datalen].count;nudata.push({lonlat:new OpenLayers.LonLat(data[datalen].lng,heatmap_dados[datalen].lat),count:temp});max=Math.max(max,temp)}transformedTestData.max=max;transformedTestData.data=nudata;heatmap=new OpenLayers.Layer.Heatmap(camada.name,objMapa,objMapa.baseLayer,{"visible":true,"opacity":camada.transparency,"radius":camada.plugini3geo.parametros.radius,"gradient":heatmap_config.gradient,"legend":{"title":camada.tema,"position":"bl","offset":[5,50]}},{isBaseLayer:false,projection:new OpenLayers.Projection("EPSG:4326"),displayInLayerSwitcher:true});heatmap.ligaCamada=function(){this.toggle();this.updateLayer()};heatmap.desLigaCamada=function(){this.toggle();this.updateLayer()};heatmap.removeCamada=function(){this.destroy()};heatmap.atualizaCamada=function(){this.updateLayer()};i3GEO.pluginI3geo.OBJETOS[camada.name]=heatmap;objMapa.addLayer(heatmap);heatmap.setDataSet(transformedTestData);heatmap_dados=null;if(i3GEO.janela){i3GEO.janela.fechaAguarde("aguardePlugin")}};if(!$i(nomeScript)){carregaJs="sim"}else{nomeScript=""}if(!i3GEO.configura||!i3GEO.configura.sid){i3GEO.configura.sid=""}p+="?carregajs="+carregaJs+"&layer="+camada.name+"&coluna="+camada.plugini3geo.parametros.coluna+"&tipoGradiente="+camada.plugini3geo.parametros.tipoGradiente+"&g_sid="+i3GEO.configura.sid+"&nomevariavel=heatmap_dados&nomevariavelConfig=heatmap_config";i3GEO.util.scriptTag(p,criaLayer,nomeScript)}},googleearth:{inicia:function(){alert("Plugin nao disponivel")}}},markercluster:{linkAjuda:function(){return i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=121"},formAdmin:function(config){var parametros,ins="",configDefault='{"plugin":"markercluster","parametros":{"tipoEstilos": "default","gridSize":50}}';if(config===""){config=configDefault}config=YAHOO.lang.JSON.parse(config);if(config.plugin!="markercluster"){config=YAHOO.lang.JSON.parse(configDefault)}parametros=config.parametros;ins+=""+"<p>Dist&acirc;ncia m&aacute;xima entre ponto em pixels:"+"<br><input name='gridSize' type='text' value='"+parametros.gridSize+"' size='30'></p>"+"<p>Tipo de estilos (deixe vazio para utilizar as classes definidas no Layer ou escreva 'default' para usar o normal):"+"<br><input name='tipoEstilos' type='text' value='"+parametros.tipoEstilos+"' size='30'></p>"+"<p>Os s&iacute;mbolos utilizados podem ser customizados alterando-se as classes do Mapfile</p>"+"<p>Veja o exemplo utilizado no tema _lmapadecluster.map</p>";return ins},googlemaps:{aplicaPropriedades:function(camada){camada.sel="nao";camada.download="nao";camada.AGUARDALEGENDA=false;camada.temporizador="";camada.copia=false;camada.procurar=false;camada.toponimia=false;camada.etiquetas=false;camada.tabela=false;camada.grafico=false;camada.destacar=false;camada.wms=false;camada.classe="NAO";return camada},inicia:function(camada){var nomeScript="markercluster_script",p=i3GEO.configura.locaplic+"/ferramentas/markercluster/googlemaps_js.php",carregaJs="nao",criaLayer;criaLayer=function(){var markercluster,marcas,latLng,marker,n,i;n=markercluster_dados.length;marcas=[];for(i=0;i<n;i++){latLng=new google.maps.LatLng(markercluster_dados[i].lat,markercluster_dados[i].lng);marker=new google.maps.Marker({'position':latLng,icon:{url:markercluster_config.ponto.url,scaledSize:new google.maps.Size(markercluster_config.ponto.width,markercluster_config.ponto.height)}});marcas.push(marker)}markercluster=new MarkerClusterer(i3GeoMap,marcas,{"gridSize":parseInt(camada.plugini3geo.parametros.gridSize,10),"visible":true,"opacity":camada.transparency,"name":camada.name,"styles":markercluster_config.estilos});i3GEO.janela.fechaAguarde("aguardePlugin");i3GEO.eventos.cliquePerm.ativo=false;markercluster.ligaCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].ready_=true;i3GEO.pluginI3geo.OBJETOS[camada.name].redraw();i3GEO.eventos.cliquePerm.ativo=false};markercluster.desLigaCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].resetViewport(true);i3GEO.pluginI3geo.OBJETOS[camada.name].ready_=false;i3GEO.eventos.cliquePerm.ativo=true};markercluster.removeCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].clearMarkers();i3GEO.eventos.cliquePerm.ativo=true};markercluster.atualizaCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].ready_=true;i3GEO.pluginI3geo.OBJETOS[camada.name].redraw();i3GEO.eventos.cliquePerm.ativo=false};i3GEO.pluginI3geo.OBJETOS[camada.name]=markercluster;markercluster_dados=null};if(!$i(nomeScript)){carregaJs="sim"}else{nomeScript=""}p+="?carregajs="+carregaJs+"&layer="+camada.name+"&g_sid="+i3GEO.configura.sid+"&tipoEstilos="+camada.plugini3geo.parametros.tipoEstilos+"&nomevariavel=markercluster_dados&nomevariavelConfig=markercluster_config";i3GEO.util.scriptTag(p,criaLayer,nomeScript)}},openlayers:{aplicaPropriedades:function(camada){camada.sel="nao";camada.download="nao";camada.AGUARDALEGENDA=false;camada.temporizador="";camada.copia=false;camada.procurar=false;camada.toponimia=false;camada.etiquetas=false;camada.tabela=false;camada.grafico=false;camada.destacar=false;camada.wms=false;camada.classe="NAO";return camada},inicia:function(camada,objMapa){var nomeScript="markercluster_script",p=i3GEO.configura.locaplic+"/ferramentas/markercluster/openlayers_js.php",carregaJs="nao",criaLayer;criaLayer=function(){var layerListeners,logMax,logMin,classes,min,max,markercluster,marcas,lonlat,n,i,style,nestilos,intervalo,regra,regras=[];nestilos=markercluster_config.estilos.length;n=markercluster_dados.length;classes=Array();logMax=Math.log(n)/Math.LN10; logMin=Math.log(1)/Math.LN10;intervalo=(logMax-logMin)/nestilos;for(i=0;i<nestilos;i++){if(i==0){classes[i]=logMin}else{classes[i]=classes[i-1]+intervalo}}classes=classes.map(function(x){return Math.pow(10,x)});classes.push(n);regra=new OpenLayers.Rule({filter:new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.LESS_THAN,property:"count",value:2}),symbolizer:{externalGraphic:markercluster_config.ponto.url,graphicWidth:markercluster_config.ponto.width,graphicHeight:markercluster_config.ponto.height,graphicYOffset:(markercluster_config.ponto.height/2)*-1}});regras.push(regra);min=2;for(i=0;i<nestilos;i++){max=classes[i+1];regra=new OpenLayers.Rule({filter:new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.BETWEEN,property:"count",lowerBoundary:min,upperBoundary:max}),symbolizer:{externalGraphic:markercluster_config.estilos[i].url,graphicWidth:markercluster_config.estilos[i].width,graphicHeight:markercluster_config.estilos[i].height,label:"${count}",labelOutlineWidth:1,fontColor:"#000000",fontOpacity:1,fontSize:"12px"}});regras.push(regra);min=max}style=new OpenLayers.Style(null,{rules:regras});if(!objMapa){objMapa=i3geoOL}layerListeners={featureclick:function(e){if(e.feature.cluster.length>1){objMapa.setCenter([e.feature.geometry.x,e.feature.geometry.y],objMapa.getZoom()+1,false,false)}return false}};markercluster=new OpenLayers.Layer.Vector(camada.name,{renderers:['Canvas','SVG'],strategies:[new OpenLayers.Strategy.AnimatedCluster({distance:parseInt(camada.plugini3geo.parametros.gridSize,10)})],styleMap:new OpenLayers.StyleMap(style),eventListeners:layerListeners});objMapa.addLayer(markercluster);marcas=[];for(i=0;i<n;i++){lonlat=new OpenLayers.LonLat(markercluster_dados[i].lng,markercluster_dados[i].lat);if(i3GEO.Interface.openlayers.googleLike===true){lonlat.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"))}marcas.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat)))}markercluster.addFeatures(marcas);i3GEO.janela.fechaAguarde("aguardePlugin");i3GEO.eventos.cliquePerm.ativo=false;markercluster.ligaCamada=function(){i3GEO.eventos.cliquePerm.ativo=false};markercluster.desLigaCamada=function(){i3GEO.eventos.cliquePerm.ativo=true};markercluster.removeCamada=function(){i3GEO.eventos.cliquePerm.ativo=true};markercluster.atualizaCamada=function(){i3GEO.eventos.cliquePerm.ativo=false};i3GEO.pluginI3geo.OBJETOS[camada.name]=markercluster;markercluster_dados=null};if(!$i(nomeScript)){carregaJs="sim"}else{nomeScript=""}p+="?carregajs="+carregaJs+"&layer="+camada.name+"&g_sid="+i3GEO.configura.sid+"&tipoEstilos="+camada.plugini3geo.parametros.tipoEstilos+"&nomevariavel=markercluster_dados&nomevariavelConfig=markercluster_config";i3GEO.util.scriptTag(p,criaLayer,nomeScript)}}},layerkml:{linkAjuda:function(){return i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=121"},formAdmin:function(config){var parametros,ins="",configDefault='{"plugin":"layerkml","parametros":{"url": ""}}';if(config===""){config=configDefault}config=YAHOO.lang.JSON.parse(config);if(config.plugin!="layerkml"){config=YAHOO.lang.JSON.parse(configDefault)}parametros=config.parametros;ins+="<p>Url do arquivo Kml:<br><input name='url' type='text' value='"+parametros.url+"'/></p>"+"<p>Veja o exemplo utilizado no tema _lmapakml.map</p>";return ins},googlemaps:{aplicaPropriedades:function(camada){camada.sel="nao";camada.download="nao";camada.AGUARDALEGENDA=false;camada.temporizador="";camada.copia=false;camada.procurar=false;camada.toponimia=false;camada.etiquetas=false;camada.tabela=false;camada.grafico=false;camada.destacar=false;camada.wms=false;camada.classe="NAO";return camada},inicia:function(camada){var layerkml=new google.maps.KmlLayer(camada.plugini3geo.parametros.url,{map:i3GeoMap,preserveViewport:true,name:camada.name});i3GEO.janela.fechaAguarde("aguardePlugin");layerkml.ligaCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(i3GeoMap)};layerkml.desLigaCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(null)};layerkml.removeCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(null);i3GEO.pluginI3geo.OBJETOS[camada.name].resetViewport(true)};layerkml.atualizaCamada=function(){i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(null);i3GEO.pluginI3geo.OBJETOS[camada.name].resetViewport(true);i3GEO.pluginI3geo.OBJETOS[camada.name].setMap(i3GeoMap)};i3GEO.pluginI3geo.OBJETOS[camada.name]=layerkml}},openlayers:{aplicaPropriedades:function(camada){camada.sel="nao";camada.download="nao";camada.AGUARDALEGENDA=false;camada.temporizador="";camada.copia=false;camada.procurar=false;camada.toponimia=false;camada.etiquetas=false;camada.tabela=false;camada.grafico=false;camada.destacar=false;camada.wms=false;camada.classe="NAO";return camada},inicia:function(camada,objMapa){var layerkml;url=i3GEO.configura.locaplic+"/classesphp/proxy.php?url="+camada.plugini3geo.parametros.url;layerkml=new OpenLayers.Layer.Vector(camada.name,{displayOutsideMaxExtent:true,displayInLayerSwitcher:false,visibility:true,strategies:[new OpenLayers.Strategy.Fixed()],protocol:new OpenLayers.Protocol.HTTP({url:url,format:new OpenLayers.Format.KML({extractStyles:true,extractAttributes:true,maxDepth:5})})});i3geoOL.addLayer(layerkml);if(!objMapa){objMapa=i3geoOL}layerkml.div.onclick=function(e){var targ="",id,temp,features,n,i,j="",html="";if(!e){e=window.event}if(e.target){targ=e.target}else if(e.srcElement){targ=e.srcElement}if(targ.id){temp=targ.id.split("_Point");if(temp[0]==="OpenLayers_Geometry"){id=targ.id;temp=i3geoOL.getLayer(this.id);features=temp.features;n=features.length;for(i=0;i<n;i++){if(features[i].geometry.id===id){for(j in features[i].attributes){html+=j+": "+features[i].attributes[j]}g=features[i].geometry;i3geoOL.addPopup(new OpenLayers.Popup.FramedCloud("kml",new OpenLayers.LonLat(g.x,g.y),null,html,null,true))}}}}};i3GEO.janela.fechaAguarde("aguardePlugin");i3GEO.eventos.cliquePerm.ativo=false;layerkml.ligaCamada=function(){i3GEO.eventos.cliquePerm.ativo=false};layerkml.desLigaCamada=function(){i3GEO.eventos.cliquePerm.ativo=true};layerkml.removeCamada=function(){i3GEO.eventos.cliquePerm.ativo=true};layerkml.atualizaCamada=function(){i3GEO.eventos.cliquePerm.ativo=false};i3GEO.pluginI3geo.OBJETOS[camada.name]=layerkml}}},parametrossql:{linkAjuda:function(){return i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=127"},formAdmin:function(config){var n,i,parametros,ins="",configDefault='{"plugin":"parametrossql","parametros":[{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""},{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""},{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""},{"titulo":"","tipo":"input","valores":[],"chave":"","prog":""}]}';if(config===""){config=configDefault}config=YAHOO.lang.JSON.parse(config);if(config.plugin!="parametrossql"){config=YAHOO.lang.JSON.parse(configDefault)}parametros=config.parametros;n=4;ins+="<table><tr><td>T&iacute;tulo</td><td>Chave</td><td>Tipo (input ou select)</td><td>Valores</td><td>PHP  que retorna os valores (opcional)</td></tr>";for(i=0;i<n;i++){ins+="<tr><td><input name='titulo' type=text size=20 value='"+parametros[i].titulo+"' /></td>"+"<td><input name='chave' type=text size=20 value='"+parametros[i].chave+"' /></td>"+"<td><input name='tipo' type=text size=20 value='"+parametros[i].tipo+"' /></td> "+"<td><input name='valores' type=text size=20 value='"+parametros[i].valores+"' /></td> "+"<td><input name='prog' type=text size=20 value='"+parametros[i].prog+"' /></td></tr>"}ins+="</table>"+"<p class='paragrafo'>As chaves s&atilde;o palavras que devem existir no SQL definido em DATA e/ou no filtro (FILTER)."+"<br>O usu&aacute;rio ir&aacute; fornecer os valores que ser&atilde;o ent&atilde;o utilizados para substituir as chaves de forma din&acirc;mica"+"<br>Ser&aacute; mostrado ao usu&aacute;rio um formul&aacute;rio com op&ccedil;&otilde;es. Cada op&ccedil;&atilde;o conter&aacute; um t&iacute;tulo e um campo de formul&aacute;rio"+"<br>Cada campo de formul&aacute;rio pode ser dos tipos input (para digitar um valor) ou select (caixa de op&ccedil;&otilde;es)."+"<br>Em valores deve ser definida a lista ou o valor default que ser&aacute; mostrado. No caso de listas, utilize v&iacute;rgula para separar os valores."+"<br>Como opcional, pode ser definido o endere&ccedil;o de um programa PHP que retorna a lista de nomes e valores que ser&atilde;o utilizados para preencher "+"o campo de escolha. Para mais informa&ccedil;&otilde;es, veja o mapfile i3geo/temas/_llocaliphp.map. O caminho desse arquivo PHP &eacute; relativo &agrave; pasta i3geo.";return ins},parametrosFormAdmin:function(onde){var campo=0,nlinhas=4,ncampos=5,campos=onde.getElementsByTagName("input"),par=[],temp=[],i,j;for(j=0;j<nlinhas;j++){temp=[];for(i=0;i<ncampos;i++){if(campos[campo]){temp.push('"'+campos[campo].name+'" : "'+campos[campo].value+'"')}campo++}par.push("{"+temp.join(",")+"}")}return'{"plugin":"parametrossql","parametros":['+par.join(",")+']}'},inicia:function(camada){i3GEO.janela.fechaAguarde("aguardePlugin");var iniciaform=function(){i3GEOF.parametrossql.iniciaJanelaFlutuante(camada)};i3GEO.util.scriptTag((i3GEO.configura.locaplic+"/ferramentas/parametrossql/dependencias.php"),iniciaform,"parametrossql_script")},googlemaps:{inicia:function(camada){i3GEO.pluginI3geo.parametrossql.inicia(camada)},aplicaPropriedades:function(camada){return camada}},openlayers:{inicia:function(camada){i3GEO.pluginI3geo.parametrossql.inicia(camada)},aplicaPropriedades:function(camada){return camada}}}};
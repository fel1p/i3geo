if(typeof(i3GEO)=='undefined'){i3GEO=new Array()}i3GEO.mapa={GEOXML:new Array(),ajustaPosicao:function(elemento){if(arguments.length==0){return}try{imagemxi=0;imagemyi=0;imagemxref=0;imagemyref=0;var dc=$i("i3geo");if(!dc){return}if(dc.style.left){imagemxi+=parseInt(dc.style.left)}if(dc.style.top){imagemyi+=parseInt(dc.style.top)}var dc=$i(elemento);while((dc.offsetParent)&&(dc.offsetParent.id!="i3geo")){dc=dc.offsetParent;imagemxi=imagemxi+dc.offsetLeft;imagemyi=imagemyi+dc.offsetTop}var c=$i(i3GEO.interface.IDCORPO);if(c){c.style.position="absolute";$left(i3GEO.interface.IDCORPO,imagemxi);$top(i3GEO.interface.IDCORPO,imagemyi);if($i("i3geo").style.left){$left(i3GEO.interface.IDCORPO,imagemxi-parseInt($i("i3geo").style.left))}if($i("i3geo").style.top){$top(i3GEO.interface.IDCORPO,imagemyi-parseInt($i("i3geo").style.top))}}}catch(e){alert("Ocorreu um erro. i3GEO.mapa.ajustaPosicao"+e)}},ativaLogo:function(){i3GEO.php.ativalogo(i3GEO.atualiza)},insereToponimo:function(){if(g_tipoacao=="textofid"){var doc=(navm)?document.frames("wdocai").document:$i("wdocai").contentDocument;texto=doc.getElementById("texto").value;var f=doc.getElementById("fonte").value;var t=doc.getElementById("tamanho").value;var a=doc.getElementById("angulo").value;var cf=doc.getElementById("fundoc").value;if(cf==""){cf="off"}var cs=doc.getElementById("sombra").value;if(cs==""){cs="off"}var xs=doc.getElementById("sombrax").value;var ys=doc.getElementById("sombray").value;var c=doc.getElementById("frente").value;var m=doc.getElementById("mascara").value;if(m==""){m="off"}var fcs=doc.getElementById("frentes").value;if(fcs==""){fcs="off"}var fxs=doc.getElementById("frentex").value;var fys=doc.getElementById("frentey").value;var forca=doc.getElementById("force").value;var md=doc.getElementById("mindistance").value;var mf=doc.getElementById("minfeaturesize").value;var ox=doc.getElementById("offsetx").value;var oy=doc.getElementById("offsety").value;var pl=doc.getElementById("partials").value;var pos=doc.getElementById("position").value;var digi=function(retorno){if(texto==""){i3GEO.janela.fechaAguarde("i3GEO.atualiza");texto=retorno.data}if(texto!=" "){i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.php.insereAnnotation(i3GEO.atualiza,g_nomepin+"topo",objposicaocursor.ddx+" "+objposicaocursor.ddy,texto,pos,pl,ox,oy,mf,md,forca,fcs,fxs,fys,m,c,ys,xs,cs,cf,a,t,f)}};if(doc.getElementById("tipoInsere").value=="digitando"){digi.call()}else{texto="";if((doc.getElementById("temasLigados"))&&(doc.getElementById("itemsel"))){var tema=doc.getElementById("temasLigados").value;var item=doc.getElementById("itemsel").value;i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.php.identificaunico(digi,objposicaocursor.ddx+","+objposicaocursor.ddy,tema,item)}}}else{i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.insereToponimo()")}},insereKml:function(pan,url){if(arguments.length==1){var i=$i("i3geo_urlkml");if(i){var url=i.value}else{var url=""}}if(url==""){return}var ngeoxml="geoXml_"+i3GEO.mapa.GEOXML.length;i3GEO.mapa.GEOXML.push(ngeoxml);var zoom=function(){if(pan){eval("var ll = "+ngeoxml+".getDefaultCenter()");eval(ngeoxml+".gotoDefaultViewport(i3GeoMap)")}};eval(ngeoxml+" = new GGeoXml(url,zoom)");eval("i3GeoMap.addOverlay("+ngeoxml+")");i3GEO.mapa.criaNoArvoreGoogle(ngeoxml)},criaNoArvoreGoogle:function(nomeOverlay){var root=i3GEO.arvoreDeCamadas.ARVORE.getRoot();var node=i3GEO.arvoreDeCamadas.ARVORE.getNodeByProperty("idkml","raiz");if(!node){var titulo="<table><tr><td><b>Google Maps</b></td></tr></table>";var d={html:titulo,idkml:"raiz"};var node=new YAHOO.widget.HTMLNode(d,root,true,true)}html="<input onclick='i3GEO.mapa.ativaDesativaOverlayGoogle(this)' class=inputsb style='cursor:pointer;' type='checkbox' value='"+ngeoxml+"' checked />";html+="&nbsp;<span style='cursor:move'>"+url+"</span>";var d={html:html};var nodekml=new YAHOO.widget.HTMLNode(d,node,true,true);nodekml.isleaf=true;i3GEO.arvoreDeCamadas.ARVORE.draw();i3GEO.arvoreDeCamadas.ARVORE.collapseAll();node.expand()},ativaDesativaOverlayGoogle:function(obj){if(!obj.checked){eval("i3GeoMap.removeOverlay("+obj.value+")")}else eval("i3GeoMap.addOverlay("+obj.value+")")},inserePonto:function(){if(g_tipoacao=="inserexy"){var doc=(navm)?document.frames("wdocai").document:$i("wdocai").contentDocument;if(doc.getElementById("resultado")){var ins=doc.getElementById("resultado").innerHTML;ins=ins+"<div style='font-size:12px' >"+objposicaocursor.ddx+" "+objposicaocursor.ddy+"</div><br>";doc.getElementById("resultado").innerHTML=ins}var item="";var valoritem="";if((doc.getElementById("valorItem"))&&(doc.getElementById("itemtema"))){var item=doc.getElementById("itemtema").value;var valoritem=doc.getElementById("valorItem").value}if(g_nomepin==""){alert("Nenhum tema definido para editar")}else{i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.php.insereSHP(i3GEO.atualiza,g_nomepin,item,valoritem,objposicaocursor.ddx+" "+objposicaocursor.ddy)}}},insereGrafico:function(){if(g_tipoacao=="inseregrafico"){var doc=(navm)?document.frames("wdocai").document:$i("wdocai").contentDocument;var tema=doc.getElementById("temasLigados").value;var width=doc.getElementById("w").value;var inclinacao=doc.getElementById("inclinacao").value;var shadow_height=doc.getElementById("sombra").value;if(tema==""){alert("Nenhum tema definido para pegar os dados")}else{var listadeitens=new Array();var g=doc.getElementById("listai");var iguias=g.getElementsByTagName("input");var i=iguias.length-1;if(i>=0){do{if(iguias[i].checked==true){var it=iguias[i].id;var c=doc.getElementById("cor"+it).value;listadeitens.push(it+","+c)}}while(i--)}var itens=listadeitens.join("*");if(itens==""){alert("Nenhum item foi escolhido")}else{i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.php.insereSHPgrafico(i3GEO.atualiza,tema,objposicaocursor.ddx,objposicaocursor.ddy,itens,shadow_height,width,inclinacao)}}}},recupera:{TENTATIVA:0,inicia:function(){i3GEO.mapa.ajustaPosicao();i3GEO.janela.fechaAguarde();if(i3GEO.mapa.recupera.TENTATIVA==0){i3GEO.mapa.recupera.TENTATIVA++;i3GEO.mapa.recupera.restaura()}},restaura:function(){i3GEO.php.recuperamapa(i3GEO.atualiza)}},legendaHTML:{ID:"",cria:function(id){if(arguments.length==0){var id=""}i3GEO.mapa.legendaHTML.ID=id;if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.mapa.legendaHTML.atualiza()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.mapa.legendaHTML.atualiza()")}i3GEO.mapa.legendaHTML.atualiza()},atualiza:function(){var temp=function(retorno){if(i3GEO.mapa.legendaHTML.ID!=""&&$i(i3GEO.mapa.legendaHTML.ID)){if((retorno.data!="erro")&&(retorno.data!=undefined)){var s=i3GEO.configura.locaplic+"/imagens/solta.gif";$i(i3GEO.mapa.legendaHTML.ID).innerHTML="<img onclick='i3GEO.mapa.legendaHTML.libera()' id=soltaLeg src="+s+" title='clique para liberar'/><br><div id='corpoLegi' >"+retorno.data.legenda+"</div>"}}if($i("wlegenda")){$i("wlegenda").innerHTML=retorno.data.legenda;var elementos=$i("wlegenda").getElementsByTagName("input");for(i=0;i<elementos.length;i++){elementos[i].style.display="none"}}};i3GEO.mapa.legendaHTML.obtem(temp)},obtem:function(funcao){i3GEO.php.criaLegendaHTML(funcao,"",i3GEO.configura.templateLegenda)},libera:function(){var temp=function(retorno){if(!$i("moveLegi")){var novoel=document.createElement("div");novoel.id="moveLegi";novoel.style.display="block";var temp='<div class="hd">Legenda</div>';temp+='<div id="wlegenda" style="text-align:left;background-color:white" ></div>';novoel.innerHTML=temp;document.body.appendChild(novoel);YAHOO.namespace("moveLegi.xp");YAHOO.moveLegi.xp.panel=new YAHOO.widget.Panel("moveLegi",{width:"300px",fixedcenter:true,constraintoviewport:false,underlay:"none",close:true,visible:true,draggable:true,modal:false});YAHOO.moveLegi.xp.panel.render()}$i("wlegenda").innerHTML=retorno.data.legenda;var temp=$i("wlegenda").getElementsByTagName("input");var n=temp.length;for(i=0;i<n;i++){temp[i].style.display="none"}YAHOO.moveLegi.xp.panel.show()}i3GEO.mapa.legendaHTML.obtem(temp)}},legendaIMAGEM:{obtem:function(funcao){i3GEO.php.criaLegendaImagem(funcao)}},dialogo:{autoredesenha:function(){i3GEO.janela.cria("300px","180px",i3GEO.configura.locaplic+"/ferramentas/opcoes_autoredesenha/index.htm","","","Temporizador")},salvaMapa:function(){if(i3GEO.parametros==""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}i3GEO.janela.cria("300px","180px",i3GEO.configura.locaplic+"/ferramentas/salvamapa/index.htm","","","Salva mapa")},carregaMapa:function(){i3GEO.janela.cria("300px","150px",i3GEO.configura.locaplic+"/ferramentas/carregamapa/index.htm?urlatual="+window.location,"","","Carrega mapa")},convertews:function(){if(i3GEO.parametros.mapfile==""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}i3GEO.janela.cria("440px","280px",i3GEO.configura.locaplic+"/ferramentas/convertews/index.htm","","","Web service")},convertekml:function(){if(i3GEO.parametros.mapfile==""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}i3GEO.janela.cria("440px","280px",i3GEO.configura.locaplic+"/ferramentas/convertemapakml/index.htm","","","Kml")},queryMap:function(){i3GEO.janela.cria("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_querymap/index.htm","","","Querymap")},template:function(){i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template")},tamanho:function(){i3GEO.janela.cria("150px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_tamanho/index.htm","","","Tamanho")},tipoimagem:function(){i3GEO.janela.cria("300px","260px",i3GEO.configura.locaplic+"/ferramentas/tipoimagem/index.htm","","","Tipo de imagem")},corFundo:function(){i3GEO.janela.cria("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_fundo/index.htm","","","Fundo")},opcoesEscala:function(){i3GEO.janela.cria("250px","300px",i3GEO.configura.locaplic+"/ferramentas/opcoes_escala/index.htm","center","center","Escala")},opcoesLegenda:function(){i3GEO.janela.cria("320px","300px",i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/index.htm","","","Legenda")},gradeCoord:function(){i3GEO.janela.cria("350px","330px",i3GEO.configura.locaplic+"/ferramentas/gradecoord/index.htm","","","Grade de coordenadas")},cliqueTexto:function(){if(g_tipoacao!="textofid"){var temp=Math.random()+"b";temp=temp.split(".");g_nomepin="pin"+temp[1];g_tipoacao="textofid";var janela=i3GEO.janela.cria("360px","250px",i3GEO.configura.locaplic+"/ferramentas/inseretxt/index.htm","","","Texto");if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.insereToponimo()")<0){i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.insereToponimo()")}var temp=function(){i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.insereToponimo()");i3GEO.barraDeBotoes.ativaBotoes()};YAHOO.util.Event.addListener(janela[0].close,"click",temp)}},cliquePonto:function(){if(g_tipoacao!="inserexy"){g_tipoacao="inserexy";var temp=Math.random()+"a";temp=temp.split(".");g_nomepin="pin"+temp[1];var janela=i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+'/ferramentas/inserexy2/index.htm',"","","Insere");if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.inserePonto()")<0){i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.inserePonto()")}var temp=function(){i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.inserePonto()");i3GEO.barraDeBotoes.ativaBotoes()};YAHOO.util.Event.addListener(janela[0].close,"click",temp)}},cliqueGrafico:function(){if(g_tipoacao!="inseregrafico"){g_tipoacao="inseregrafico";var temp=Math.random()+"a";temp=temp.split(".");g_nomepin="pin"+temp[1];var janela=i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+'/ferramentas/inseregrafico/index.htm',"","","Insere");if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.insereGrafico()")<0){i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.insereGrafico()")}var temp=function(){i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.insereGrafico()");i3GEO.barraDeBotoes.ativaBotoes()};YAHOO.util.Event.addListener(janela[0].close,"click",temp)}}},corpo:{verifica:function(retorno){try{i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o3"));if(retorno.data){var retorno=retorno.data}if(retorno.variaveis){var retorno=retorno.variaveis}if((retorno=="erro")||(retorno==undefined)){i3GEO.mapa.ajustaPosicao();i3GEO.janela.fechaAguarde();i3GEO.mapa.recupera.inicia()}i3GEO.mapa.recupera.TENTATIVA=0}catch(e){if(i3GEO.interface.ATUAL=="openlayers"){i3GEO.janela.fechaAguarde();return}if(i3GEO.mapa.recupera.TENTATIVA==0){alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");i3GEO.mapa.recupera.inicia()}else{alert("Recuperacao impossivel. Sera feita uma tentativa de reiniciar o mapa.");if(i3GEO.mapa.recupera.TENTATIVA==1){i3GEO.mapa.recupera.TENTATIVA=2;i3GEO.php.reiniciaMapa(i3GEO.atualiza)}}}}}};
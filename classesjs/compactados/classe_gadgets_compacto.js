if(typeof(i3GEO)==='undefined'){i3GEO=[]}i3GEO.gadgets={PARAMETROS:{"mostraInserirKml":{idhtml:"inserirKml"},"mostraEscalaNumerica":{idhtml:"escala"},"mostraEscalaGrafica":{idhtml:"escalaGrafica"},"mostraBuscaRapida":{idhtml:"buscaRapida"},"mostraVisual":{idhtml:"visual"},"mostraQuadros":{idhtml:"lugarquadros"},"mostraHistoricoZoom":{idhtml:"historicozoom"},"mostraMenuSuspenso":{idhtml:"menus",deslocaEsquerda:0},"mostraMenuLista":{idhtml:"menuLista"},"mostraVersao":{idhtml:"versaoi3geo"}},mostraVersao:function(id){if(arguments.length===0||id===""){id=i3GEO.gadgets.PARAMETROS.mostraVersao.idhtml}else{i3GEO.gadgets.PARAMETROS.mostraVersao.idhtml=id}i3GEO.util.defineValor(id,"innerHTML",i3GEO.parametros.mensageminicia)},mostraCoordenadasUTM:function(id){try{i3GEO.coordenadas.mostraCoordenadasUTM.idhtml=i3GEO.gadgets.mostraCoordenadasUTM.idhtml}catch(e){}i3GEO.coordenadas.mostraCoordenadasUTM(id)},mostraCoordenadasGEO:function(id){try{i3GEO.coordenadas.mostraCoordenadasGEO.idhtml=i3GEO.gadgets.mostraCoordenadasGEO.idhtml}catch(e){}i3GEO.coordenadas.mostraCoordenadasGEO(id)},mostraInserirKml:function(id){var i,ins,temp;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraInserirKml.idhtml}if($i(id)){if(!$i("i3geo_urlkml")){i=$inputText(id,"290","i3geo_urlkml","kml url","40","");ins="<table><tr><td>Kml: "+i;temp='i3GEO.Interface.adicionaKml();';ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='"+temp+"' /></td></tr></table>";$i(id).innerHTML=ins}}},mostraEscalaNumerica:function(id){var i,ins,temp,onde;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraEscalaNumerica.idhtml}onde=$i(id);if(onde){if(onde.style.display=="none"){onde.style.display="block"}atualizaEscalaNumerica=function(escala){var e=$i("i3geo_escalanum");if(!e){i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaNumerica()");return}if(arguments.length===1){e.value=escala}else{if(i3GEO.parametros.mapscale!==""){e.value=parseInt(i3GEO.parametros.mapscale,10)}else{e.value=0}}};if(!$i("i3geo_escalanum")){i=$inputText(id,"100","i3geo_escalanum",$trad("d10"),"9",parseInt(i3GEO.parametros.mapscale,10));ins="<table><tr><td>"+i;temp='var nova = document.getElementById("i3geo_escalanum").value;';temp+='i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,nova);';ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='"+temp+"' /></td></tr></table>";onde.innerHTML=ins}if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaNumerica()")<0){i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaNumerica()")}}else{atualizaEscalaNumerica=function(){}}},mostraEscalaGrafica:function(id){if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraEscalaGrafica.idhtml}var e,temp,ins;if($i(id)){atualizaEscalaGrafica=function(){e=$i("imagemEscalaGrafica");if(!e){i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaGrafica()");return}temp=function(retorno){eval(retorno.data);i3GEO.gadgets.quadros.grava("escala",scaimagem);$i("imagemEscalaGrafica").src=scaimagem};i3GEO.php.escalagrafica(temp)};if(!$i("imagemEscalaGrafica")){ins="<img class='menuarrow' src=\""+i3GEO.configura.locaplic+"/imagens/branco.gif\" title='op&ccedil;&otilde;es' onclick='i3GEO.mapa.dialogo.opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />";$i(id).innerHTML=ins}atualizaEscalaGrafica();if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaGrafica()")<0){i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaGrafica()")}}},mostraBuscaRapida:function(id){var i,ins,temp;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.idhtml}if($i(id)){i3geo_buscaRapida=function(){if($i("valorBuscaRapida").value===""){alert("Digite uma palavra para busca!");return}wdocaf("300px","280px",i3GEO.configura.locaplic+"/ferramentas/buscarapida/index.htm","","","Busca rapida")};i=$inputText(id,"210","valorBuscaRapida","Munic�pio, cidade, UC, endere�o...","30",$trad("o2"));ins="<table><tr><td><a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=8&idajuda=71' >&nbsp;&nbsp;&nbsp;</a></td><td>"+i;ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='i3geo_buscaRapida()' /></td></tr></table>";temp=$i(id);if(temp){temp.innerHTML=ins}}},mostraHistoricoZoom:function(id){if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraHistoricoZoom.idhtml}if($i(id)){marcadorZoom="";var ins="<table style='text-align:center;position:relative;left:";if(navm){ins+="0px;'>"}else{ins+="6px;'>"}ins+="<tr><td><img  id='i3geo_zoomanterior' class='zoomAnterior' title='anterior' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";ins+="<td>&nbsp;</td>";ins+="<td><img  id='i3geo_zoomproximo' class='zoomProximo' title='proximo' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";ins+="</tr></table>";$i(id).innerHTML=ins;$i("i3geo_zoomanterior").onclick=function(){if(marcadorZoom===""){marcadorZoom=i3GEO.gadgets.quadros.quadroatual}if(i3GEO.gadgets.quadros.quadroatual>0){marcadorZoom=marcadorZoom-1;if(marcadorZoom>=0){i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[marcadorZoom].extensao)}else{marcadorZoom=0}}};$i("i3geo_zoomproximo").onclick=function(){if(marcadorZoom===""){marcadorZoom=i3GEO.gadgets.quadros.quadroatual}if(i3GEO.gadgets.quadros.quadroatual<i3GEO.gadgets.quadros.quadrosfilme.length){marcadorZoom=marcadorZoom+1;if(marcadorZoom<i3GEO.gadgets.quadros.quadrosfilme.length){i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[marcadorZoom].extensao)}}else{marcadorZoom=i3GEO.gadgets.quadros.quadrosfilme.length}}}},visual:{inicia:function(id){var l,visuais,li;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraVisual.idhtml}if($i(id)){if(i3GEO.parametros.listavisual!==""){l=i3GEO.parametros.listavisual.split(",");visuais="";li=l.length-1;if(li>=0){do{visuais+="<img title='"+l[li]+"' style=cursor:pointer onclick='i3GEO.gadgets.visual.troca(\""+l[li]+"\")' src='"+i3GEO.configura.locaplic+"/imagens/visual/"+l[li]+".png' />&nbsp;"}while(li--)}$i(id).innerHTML=visuais;$i(id).onmouseover=function(){i3GEO.ajuda.mostraJanela($trad("d26"))};$i(id).onmouseout=function(){i3GEO.ajuda.mostraJanela("")}}}},troca:function(visual){var monta=function(retorno){var imgstemp,imgs,i,temp,elementos,elt,caminho,j,busca,nimagem;try{i3GEO.janela.fechaAguarde("i3GEO.atualiza");imgstemp=retorno.data.arquivos;imgs=[];i=imgstemp.length-1;if(i>=0){do{temp=imgstemp[i].split(".");if((temp[1]==="png")||(temp[1]==="gif")||(temp[1]==="jpg")){imgs.push(imgstemp[i])}}while(i--)}elementos=document.getElementsByTagName("img");elt=elementos.length;caminho=i3GEO.configura.locaplic+"/imagens/visual/"+visual+"/";j=imgs.length-1;if(j>=0){do{for(i=0;i<elt;i++){if((elementos[i].src.search("branco")>-1)&&((elementos[i].className!=="")||(elementos[i].id!==""))){elementos[i].src=caminho+"branco.gif"}if(elementos[i].src.search("visual")>-1){elementos[i].style.backgroundImage="url('"+caminho+"sprite.png')"}}}while(j--)}j=imgs.length-1;if(j>=0){do{busca=imgs[j].split(".");if($i(busca[0])){$i(busca[0]).src=caminho+imgs[j]}}while(j--)}elementos=["barraSuperior","barraInferior","vertMaisZoom","vertMenosZoom","foldermapa","foldermapa1","tic"];i=elementos.length-1;if(i>=0){do{if($i(elementos[i])){nimagem=$i(elementos[i]).style.backgroundImage.replace(i3GEO.configura.visual,visual);$i(elementos[i]).style.backgroundImage=nimagem}}while(i--)}i3GEO.configura.visual=visual}catch(e){alert("Ocorreu um erro. mudaVisual"+e);i3GEO.janela.fechaAguarde("i3GEO.atualiza")}};i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.php.listaarquivos(monta,"imagens/visual/"+visual)}},quadros:{quadrosfilme:[],quadroatual:0,geraLegenda:false,inicia:function(qs,lugarquadros){if(i3GEO.Interface.ATUAL!=="padrao"){return}if(arguments.length===1){lugarquadros=i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml}var q,i,temp,p;q="<table class=tablefilme ><tr><td><div class='menuarrow'  title='op&ccedil;&otilde;es' onclick='i3GEO.gadgets.quadros.opcoes(this)' style='cursor:pointer'></div></td>";for(i=0;i<qs;i++){q+="<td><img class='quadro' src=\""+i3GEO.configura.locaplic+"/imagens/branco.gif\" id='quadro"+i+"' ";q+="onmouseover='i3GEO.gadgets.quadros.trocaMapa(this.id);i3GEO.ajuda.mostraJanela(\"Clique para aplicar a extens�o geogr�fica do quadro ao mapa\")' ";q+="onclick='i3GEO.gadgets.quadros.zoom(this.id)' /></td>";i3GEO.gadgets.quadros.quadrosfilme[i]=[]}q+="</tr></table>";if($i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml)){document.getElementById(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml).innerHTML=q;$i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml).onmouseout=function(){$i("img").style.display="block";if($i("imgClone")){temp=$i("imgClone");p=temp.parentNode;p.removeChild(temp);i3GEO.ajuda.mostraJanela('')}}}i3GEO.gadgets.quadros.quadroatual=0;if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.gadgets.quadros.avanca()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.gadgets.quadros.avanca()")}},grava:function(variavel,valor){if(i3GEO.Interface.ATUAL!=="padrao"){return}eval("i3GEO.gadgets.quadros.quadrosfilme["+i3GEO.gadgets.quadros.quadroatual+"]."+variavel+" = '"+valor+"'");if($i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml)){$i("quadro"+i3GEO.gadgets.quadros.quadroatual).className="quadro1"}},avanca:function(){if(i3GEO.Interface.ATUAL!=="padrao"){return}try{var nquadros=i3GEO.gadgets.quadros.quadrosfilme.length;if((nquadros-1)===(i3GEO.gadgets.quadros.quadroatual)){i3GEO.gadgets.quadros.inicia(nquadros)}else{i3GEO.gadgets.quadros.quadroatual++}}catch(e){}},zoom:function(quadro){var indice=quadro.replace("quadro","");i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[indice].extensao)},trocaMapa:function(quadro){var indice,i,c,iclone;indice=quadro.replace("quadro","");i=$i(i3GEO.Interface.IDMAPA);c=$i("imgClone");if(i){if(!c){iclone=document.createElement('IMG');iclone.style.position="relative";iclone.id="imgClone";iclone.style.border="1px solid blue";i.parentNode.appendChild(iclone);iclone.src=i.src;iclone.style.width=i3GEO.parametros.w;iclone.style.heigth=i3GEO.parametros.h;iclone.style.top=i.style.top;iclone.style.left=i.style.left;c=$i("imgClone")}try{if(!i3GEO.gadgets.quadros.quadrosfilme[indice].imagem){return}c.src=i3GEO.gadgets.quadros.quadrosfilme[indice].imagem;c.style.display="block";i.style.display="none"}catch(e){}}},opcoes:function(obj){var js,volta;if(i3GEO.parametros.utilizacgi==="sim"){i3GEO.parametros.utilizacgi="nao";volta=function(){alert("Armazenamento de imagens ativado. As proximas imagens ficarao disponiveis")};i3GEO.php.desativacgi(volta)}else{if(typeof(i3GEOF.opcoesQuadros)==='undefined'){js=i3GEO.configura.locaplic+"/ferramentas/opcoes_quadros/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesQuadros.criaJanelaFlutuante()","i3GEOF.opcoesQuadros_script")}}},anima:function(Qanima,t){var doc;if(arguments.length===0){Qanima=0;doc=(navm)?document.frames("wdocai").document:$i("wdocai").contentDocument;t=doc.getElementById("tempoanima").value}if(Qanima>i3GEO.gadgets.quadros.quadrosfilme.length){clearTimeout(tAnima);$i("imgClone").style.display="none";$i("img").style.display="block";return}i3GEO.gadgets.quadros.trocaMapa("quadro"+Qanima);Qanima++;tAnima=setTimeout('i3GEO.gadgets.quadros.anima('+Qanima+','+t+')',t)},listaImagens:function(){var volta,wi,mensagem,i;if(i3GEO.parametros.utilizacgi==="sim"){i3GEO.parametros.utilizacgi="nao";volta=function(){alert("Armazenamento de imagens ativado. As proximas imagens ficarao disponiveis")};i3GEO.php.desativacgi(volta)}else{wi=window.open("");mensagem="<br><b>N&atilde;o existem imagens guardadas.";wi.document.write("<html><body><p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Click com o bot&atilde;o da direita do mouse sobre a imagem para fazer o download<br>");i=i3GEO.gadgets.quadros.quadrosfilme.length-1;if(i>=0){do{if(i3GEO.gadgets.quadros.quadrosfilme[i].imagem){wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Imagem: "+i+"<br>");wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Abrang�ncia: "+i3GEO.gadgets.quadros.quadrosfilme[i].extensao+"<br>");wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].imagem+"' />");wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].referencia+"' />");if(i3GEO.gadgets.quadros.geraLegenda===true){wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].legenda+"' />")}}i--}while(i>=0)}wi.document.write("<br>Fim</body></html>");wi.document.close()}}},mostraMenuSuspenso:function(id){var objid,sobe,n,i,estilo,t,onMenuBarBeforeRender,temp,ifr,MM=YAHOO.widget.MenuManager,ms=i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso,confm=i3GEO.configura.oMenuData,ins="",alinhamento="";if(arguments.length===0){id=ms.idhtml}else{ms.idhtml=id}objid=$i(id);if(objid){objid.className="yuimenubar";temp=$i("contemMenu");if(temp){temp.className="yui-navset"}if(ms.deslocaEsquerda){alinhamento="left:"+ms.deslocaEsquerda*-1+"px;"}ins+='<div class="bd" style="top:0px;'+alinhamento+'display:block;align:right;border: 0px solid white;z-index:6000;line-height:1.4" >'+'<ul class="first-of-type" style="display:block;border:0px solid white;top:10px;">';n=confm.menu.length;estilo="padding-bottom:3px;top:0px;border: 0px solid white;";for(i=0;i<n;i+=1){t="";if(confm.menu[i].target){t="target="+confm.menu[i].target}ins+='<li class="yuimenubaritem" style="padding-top:2px;"><a style="'+estilo+'" href="#" class="yuimenubaritemlabel" '+t+'id="menu'+confm.menu[i].id+'" >&nbsp;'+confm.menu[i].nome+'</a></li>'}ins+='</ul>';ins+='</div>';objid.innerHTML=ins;onMenuBarBeforeRender=function(p_sType,p_sArgs){var conta,nomeMenu,nomeSub,subs=i3GEO.configura.oMenuData.submenus,conta=0;for(nomeMenu in subs){if($i("menu"+nomeMenu)){nomeSub=subs[nomeMenu];if(nomeSub!==""){i3GEOoMenuBar.getItem(conta).cfg.setProperty('submenu',{id:nomeMenu,itemdata:nomeSub})}conta+=1}}};if(i3GEO.Interface.ATUAL==="googleearth"||i3GEO.Interface.ATUAL==="flamingo"){ifr=true}else{ifr=false}i3GEOoMenuBar=new YAHOO.widget.MenuBar(id,{iframe:ifr,autosubmenudisplay:true,showdelay:100,hidedelay:500,lazyload:false});MM.addMenu(i3GEOoMenuBar);i3GEOoMenuBar.beforeRenderEvent.subscribe(onMenuBarBeforeRender);i3GEOoMenuBar.render();try{if(i3GEO.Interface.ATUAL==="padrao"){MM.getMenuItem("omenudataInterface1").cfg.setProperty("checked",true)}if(i3GEO.Interface.ATUAL==="openlayers"){MM.getMenuItem("omenudataInterface2").cfg.setProperty("checked",true)}if(i3GEO.Interface.ATUAL==="flamingo"){MM.getMenuItem("omenudataInterface3").cfg.setProperty("checked",true)}if(i3GEO.Interface.ATUAL==="googlemaps"){MM.getMenuItem("omenudataInterface4").cfg.setProperty("checked",true)}if(i3GEO.Interface.ATUAL==="googleearth"){MM.getMenuItem("omenudataInterface5").cfg.setProperty("checked",true)}}catch(e){}if(i3GEO.Interface.ATUAL!=="padrao"&&$i("omenudataArquivos3")){MM.getMenuItem("omenudataArquivos3").cfg.setProperty("disabled",true)}if(i3GEO.Interface.ATUAL==="googleearth"&&$i("omenudataJanelas1")){MM.getMenuItem("omenudataJanelas1").cfg.setProperty("disabled",true)}temp=objid.style;temp.backgroundPosition="0px -1px";if(navn){temp.border="0px solid white"}else{temp.border="1px dotted white"}if(navm&&i3GEO.Interface.ATUAL==="googlemaps"){temp.border="2px dotted white"}}},mostraMenuLista:function(id){var objid,n,i,estilo,t,temp,nomeMenu,sub,ms=i3GEO.gadgets.PARAMETROS.mostraMenuLista,confm=i3GEO.configura.oMenuData,ins="",subs=i3GEO.configura.oMenuData.submenus;if(arguments.length===0){id=ms.idhtml}else{ms.idhtml=id}objid=$i(id);if(objid){n=confm.menu.length;for(i=0;i<n;i+=1){ins+='<div class="listaMenuTitulo" id=menulista_'+confm.menu[i].id+'>'+confm.menu[i].nome+'</div>'}objid.innerHTML=ins;for(nomeMenu in subs){if($i("menulista_"+nomeMenu)){sub=subs[nomeMenu];n=sub.length;ins="";for(i=0;i<n;i++){ins+="<p class='listaMenuItem' ><a href='"+sub[i].url+"' target='_blank'>"+sub[i].text+"</a>"}$i("menulista_"+nomeMenu).innerHTML+=ins}}}}};
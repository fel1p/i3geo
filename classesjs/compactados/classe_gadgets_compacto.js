if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.gadgets={PARAMETROS:{"mostraInserirKml":{idhtml:"inserirKml"},"mostraEscalaNumerica":{idhtml:"escala"},"mostraEscalaGrafica":{idhtml:"escalaGrafica"},"mostraBuscaRapida":{idhtml:"buscaRapida",servicosexternos:true,temasmapa:false,google:true},"mostraVisual":{idhtml:""},"mostraHistoricoZoom":{idhtml:"historicozoom"},"mostraMenuSuspenso":{permiteLogin:true,idhtml:"menus",deslocaEsquerda:0,parametrosYUI:{iframe:false,autosubmenudisplay:false,showdelay:200,hidedelay:500,lazyload:false}},"mostraMenuLista":{idhtml:"menuLista"},"mostraVersao":{idhtml:"versaoi3geo"},"mostraEmail":{idhtml:"emailInstituicao"}},mostraEmail:function(id){if(arguments.length===0||id===""){id=i3GEO.gadgets.PARAMETROS.mostraEmail.idhtml}else{i3GEO.gadgets.PARAMETROS.mostraEmail.idhtml=id}i3GEO.util.defineValor(id,"innerHTML",i3GEO.parametros.emailInstituicao)},mostraVersao:function(id){if(arguments.length===0||id===""){id=i3GEO.gadgets.PARAMETROS.mostraVersao.idhtml}else{i3GEO.gadgets.PARAMETROS.mostraVersao.idhtml=id}i3GEO.util.defineValor(id,"innerHTML",i3GEO.parametros.mensageminicia)},mostraCoordenadasUTM:function(id){try{i3GEO.coordenadas.mostraCoordenadasUTM.idhtml=i3GEO.gadgets.mostraCoordenadasUTM.idhtml}catch(e){}i3GEO.coordenadas.mostraCoordenadasUTM(id)},mostraCoordenadasGEO:function(id){try{i3GEO.coordenadas.mostraCoordenadasGEO.idhtml=i3GEO.gadgets.mostraCoordenadasGEO.idhtml}catch(e){}i3GEO.coordenadas.mostraCoordenadasGEO(id)},mostraInserirKml:function(id){var i,ins,temp;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraInserirKml.idhtml}if($i(id)){if(!$i("i3geo_urlkml")){i=$inputText(id,"290","i3geo_urlkml","kml url","40","");ins="<table><tr><td>Kml: "+i;temp='i3GEO.Interface.adicionaKml();';ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='"+temp+"' /></td></tr></table>";$i(id).innerHTML=ins}}},mostraEscalaNumerica:function(id){var i,ins,temp,onde;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraEscalaNumerica.idhtml}onde=$i(id);if(onde){if(onde.style.display=="none"){onde.style.display="block"}if(!$i("i3geo_escalanum")){i="<form id='i3GEOescalanumForm' >"+$inputText(id,"100","i3geo_escalanum",$trad("d10"),"10",parseInt(i3GEO.parametros.mapscale,10))+"</form>";ins="<table style='width:120px;'><tr><td>"+i;temp='var nova = document.getElementById("i3geo_escalanum").value;';temp+='i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,nova);';ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='"+temp+"' /></td></tr></table>";onde.innerHTML=ins;$i("i3GEOescalanumForm").onsubmit=function(){i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,document.getElementById("i3geo_escalanum").value);return false}}if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.gadgets.atualizaEscalaNumerica()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.gadgets.atualizaEscalaNumerica()")}}},atualizaEscalaNumerica:function(escala){var e=$i("i3geo_escalanum");if(!e){i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.gadgets.atualizaEscalaNumerica()");return}if(arguments.length===1){e.value=escala}else{if(i3GEO.parametros.mapscale!==""){e.value=parseInt(i3GEO.parametros.mapscale,10)}else{e.value=0}}},mostraEscalaGrafica:function(id){if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraEscalaGrafica.idhtml}var e,temp,ins;if($i(id)){atualizaEscalaGrafica=function(){e=$i("imagemEscalaGrafica");if(!e){i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaGrafica()");return}temp=function(retorno){eval(retorno.data);$i("imagemEscalaGrafica").src=scaimagem};i3GEO.php.escalagrafica(temp)};if(!$i("imagemEscalaGrafica")){ins="<img class='menuarrow' src=\""+i3GEO.configura.locaplic+"/imagens/branco.gif\" title='op&ccedil;&otilde;es' onclick='i3GEO.mapa.dialogo.opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />";$i(id).innerHTML=ins}atualizaEscalaGrafica();if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaGrafica()")<0){i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaGrafica()")}}},mostraBuscaRapida:function(id){var i,ins,temp,fbusca;if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.idhtml}i3GEO.gadgets.mostraBuscaRapida.id=id;if($i(id)){i="<form id=i3GEObotaoFormBuscaRapida"+id+" >"+$inputText(id,"256","valorBuscaRapida"+id,$trad("x34"),"20",$trad("o2"))+"</form>";ins="<table><tr><td><a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=8&idajuda=71' >&nbsp;&nbsp;&nbsp;&nbsp;</a></td><td>"+i+"</td>";ins+="<td><img src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("p13")+"' class='ticPropriedades2' id=i3GEObotaoPropriedadesBuscaRapida"+id+" style='margin-right:5px;margin-left:5px;'/></td>";ins+="<td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' id=i3GEObotaoBuscaRapida"+id+" /></td></tr></table>";temp=$i(id);if(temp){fbusca=function(){if(i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.google===false&&i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.servicosexternos===false&&i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.temasmapa===false){i3GEO.janela.tempoMsg($trad("x35"));return}if($i("valorBuscaRapida"+id).value===""){i3GEO.janela.tempoMsg($trad("x36"));return}i3GEO.janela.cria("300px","280px",i3GEO.configura.locaplic+"/ferramentas/buscarapida/index.htm","","",$trad("o2"));return false};temp.innerHTML=ins;$i("i3GEObotaoBuscaRapida"+id).onclick=fbusca;$i("i3GEObotaoFormBuscaRapida"+id).onsubmit=fbusca;$i("i3GEObotaoPropriedadesBuscaRapida"+id).onclick=function(){var ins,interno="",externo="",google="";i3GEO.janela.cria("300px","150px","","","",$trad("s5"),"i3GEOpropriedadesBuscaRapida"+id);if(i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.servicosexternos){externo="checked"}if(i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.temasmapa){interno="checked"}ins="<p class=paragrafo >"+$trad("x37")+":</p>"+"<table class=lista3 >"+"<tr><td><input style=cursor:pointer onclick='i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.servicosexternos = this.checked' type=checkbox "+externo+" ></td><td> "+$trad("x38")+"</td></tr>"+"<tr><td><input style=cursor:pointer onclick='i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.temasmapa = this.checked' type=checkbox "+interno+" ></td><td>"+$trad("x39")+"</td></tr>";if(i3GEO.Interface.ATUAL==="googlemaps"){if(i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.google){google="checked"}ins+="<tr><td><input style=cursor:pointer onclick='i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.google = this.checked' type=checkbox "+google+" ></td><td>Google</td></tr>"}else{i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.google=false}ins+="</table><br>"+"<p class=paragrafo >"+$trad("x40")+"</p>";$i("i3GEOpropriedadesBuscaRapida"+id+"_corpo").innerHTML=ins}}}},mostraHistoricoZoom:function(id){if(arguments.length===0){id=i3GEO.gadgets.PARAMETROS.mostraHistoricoZoom.idhtml}if($i(id)){marcadorZoom="";var ins="<table style='text-align:center;position:relative;left:";if(navm){ins+="0px;'>"}else{ins+="6px;'>"}ins+="<tr><td><img  id='i3geo_zoomanterior' class='zoomAnterior' title='anterior' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";ins+="<td>&nbsp;</td>";ins+="<td><img  id='i3geo_zoomproximo' class='zoomProximo' title='proximo' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";ins+="</tr></table>";$i(id).innerHTML=ins}},visual:{inicia:function(id){alert("A i3GEO.gadgets.visual foi depreciado")},troca:function(visual){alert("A i3GEO.gadgets.visual foi depreciado")}},mostraMenuSuspenso:function(id){var objid,n,i,estilo,t,onMenuBarBeforeRender,temp,i3GEOoMenuBarLocal,ms=i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso,confm=i3GEO.configura.oMenuData,ins="",alinhamento="";if(arguments.length===0){id=ms.idhtml}else{ms.idhtml=id}objid=$i(id);if(!objid){return}if(objid&&objid.innerHTML===""){try{if(ms.permiteLogin===true||i3GEO.parametros.editor==="sim"){i3GEO.configura.oMenuData.menu.push({nome:"Admin/Login",id:"i3GeoAdmin"});i3GEO.configura.oMenuData.submenus.i3GeoAdmin=[];if(ms.permiteLogin===true){i3GEO.configura.oMenuData.submenus.i3GeoAdmin.push({id:"omenudataAdminu1",text:"Login",url:"javascript:i3GEO.login.dialogo.abreLogin()"},{id:"omenudataAdminu2",text:"Logout",url:"javascript:i3GEO.login.dialogo.abreLogout()"})}if(i3GEO.login.verificaCookieLogin()){i3GEO.configura.oMenuData.submenus.i3GeoAdmin.push({id:"omenudataAdmin1",text:$trad("x1"),url:"javascript:var w = window.open(i3GEO.configura.locaplic+'/admin/index.html')"},{id:"omenudataAdmin2",text:$trad("g1a"),url:"javascript:var w = window.open(i3GEO.configura.locaplic+'/admin/html/arvore.html')"},{id:"omenudataAdmin3",text:$trad("x10"),url:"javascript:i3GEO.arvoreDeTemas.abrejanelaIframe('900','700','"+i3GEO.configura.locaplic+"/admin/html/menus.html\')"},{id:"omenudataAdmin4",text:$trad("t44"),url:"javascript:i3GEO.janela.tempoMsg($trad('x63'))"})}}}catch(e){}i3GEOoMenuBar=YAHOO.widget.MenuManager;if(objid){objid.className="yuimenubar";temp=$i("contemMenu");if(temp){temp.className="yui-navset"}if(ms.deslocaEsquerda){alinhamento="left:"+ms.deslocaEsquerda*-1+"px;"}if(!objid.style.height||parseInt(objid.style.height,10)===0){objid.style.height="21px"}else{if(!temp.style.height||parseInt(temp.style.height)===0){temp.style.height="21px"}}ins+='<div class="bd" style="top:0px;'+alinhamento+'display:block;align:right;border: 0px solid white;z-index:3;line-height:1.4" >'+'<ul class="first-of-type" style="display:block;border:0px solid white;top:10px;">';n=confm.menu.length;estilo="padding-bottom:3px;top:0px;border: 0px solid white;";for(i=0;i<n;i+=1){t="";if(confm.menu[i].target){t="target="+confm.menu[i].target}if(confm.submenus[confm.menu[i].id].length>0){ins+='<li class="yuimenubaritem" style="padding-top:2px;"><a style="'+estilo+'" href="#" class="yuimenubaritemlabel" '+t+'id="menu'+confm.menu[i].id+'" >&nbsp;'+confm.menu[i].nome+'</a></li>'}}ins+='</ul>';ins+='</div>';objid.innerHTML=ins;if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso.parametrosYUI.iframe=true}i3GEOoMenuBarLocal=new YAHOO.widget.MenuBar(id,i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso.parametrosYUI);onMenuBarBeforeRender=function(p_sType,p_sArgs){var nomeMenu="",nomeSub,subs=i3GEO.configura.oMenuData.submenus,conta=0;for(nomeMenu in subs){if($i("menu"+nomeMenu)){nomeSub=subs[nomeMenu];if(nomeSub!==""){i3GEOoMenuBarLocal.getItem(conta).cfg.setProperty('submenu',{id:nomeMenu,itemdata:nomeSub})}conta+=1}}};temp=$i("contemMenu");if(temp){i3GEOoMenuBarLocal.subscribe("beforeShow",function(){$i("contemMenu").style.zIndex=5000;return},i3GEO.configura.oMenuData.submenus);i3GEOoMenuBarLocal.subscribe("beforeHide",function(){$i("contemMenu").style.zIndex=1;return},i3GEO.configura.oMenuData.submenus)}i3GEOoMenuBar.addMenu(i3GEOoMenuBarLocal);i3GEOoMenuBarLocal.beforeRenderEvent.subscribe(onMenuBarBeforeRender);i3GEOoMenuBarLocal.render()}}temp=["omenudataInterface1","omenudataInterface2","omenudataInterface3","omenudataInterface4","omenudataInterface5"];n=temp.length;while(n>0){n-=1;i=i3GEOoMenuBar.getMenuItem(temp[n]);if(i){i.cfg.setProperty("checked",false)}}try{temp="";switch(i3GEO.Interface.ATUAL){case"openlayers":temp="omenudataInterface2";break;case"googlemaps":temp="omenudataInterface4";break;case"googleearth":temp="omenudataInterface5";break}if(temp!=""&&$i(temp)){i3GEOoMenuBar.getMenuItem(temp).cfg.setProperty("checked",true)}}catch(e){}temp=["omenudataFerramentas7b","omenudataArquivos3","omenudataJanelas1","omenudataJanelas3","omenudataFerramentas2a"];n=temp.length;while(n>0){n-=1;i=i3GEOoMenuBar.getMenuItem(temp[n]);if(i){i.cfg.setProperty("disabled",false)}}try{temp=[];switch(i3GEO.Interface.ATUAL){case"openlayers":temp=["omenudataArquivos3","omenudataJanelas1"];break;case"googlemaps":temp=["omenudataArquivos3","omenudataJanelas1","omenudataJanelas3"];break;case"googleearth":temp=["omenudataFerramentas7b","omenudataArquivos3","omenudataJanelas3","omenudataFerramentas2a"];break};n=temp.length;while(n>0){n-=1;i=i3GEOoMenuBar.getMenuItem(temp[n]);if(i){i.cfg.setProperty("disabled",true)}}}catch(e){}temp=objid.style;temp.backgroundPosition="0px -1px";temp.border="0px solid white";if(ms.finaliza&&ms.finaliza!=""){eval(ms.finaliza)}},mostraMenuLista:function(id){var objid,n,i,sub,nomeMenu="",ms=i3GEO.gadgets.PARAMETROS.mostraMenuLista,confm=i3GEO.configura.oMenuData,ins="",subs=i3GEO.configura.oMenuData.submenus;if(arguments.length===0){id=ms.idhtml}else{ms.idhtml=id}objid=$i(id);if(objid){n=confm.menu.length;for(i=0;i<n;i+=1){ins+='<div class="listaMenuTitulo" id=menulista_'+confm.menu[i].id+'>'+confm.menu[i].nome+'</div>'}objid.innerHTML=ins;for(nomeMenu in subs){if($i("menulista_"+nomeMenu)){sub=subs[nomeMenu];n=sub.length;ins="";for(i=0;i<n;i++){ins+="<p class='listaMenuItem' ><a href='"+sub[i].url+"' target='_blank'>"+sub[i].text+"</a>"}$i("menulista_"+nomeMenu).innerHTML+=ins}}}}};
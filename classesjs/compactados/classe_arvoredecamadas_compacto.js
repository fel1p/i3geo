if(typeof(i3GEO)=='undefined'){i3GEO=new Array()}i3GEO.arvoreDeCamadas={EXPANDIDA:false,LEGENDAEXPANDIDA:false,ATIVATEMA:"",OPCOESICONES:true,OPCOESTEMAS:true,OPCOESLEGENDA:true,AGUARDALEGENDA:true,CAMADAS:"",ARVORE:null,IDHTML:null,SID:null,LOCAPLIC:null,cria:function(onde,temas,g_sid,g_locaplic,funcaoTema){if(arguments.length==5){i3GEO.arvoreDeCamadas.ATIVATEMA=funcaoTema}this.SID=g_sid;this.LOCAPLIC=g_locaplic;if(onde!="")this.IDHTML=onde;if(this.IDHTML==""){return}this.atualiza(temas)},atualiza:function(temas){if(this.comparaTemas(temas,this.CAMADAS)){return}if(!document.getElementById(i3GEO.arvoreDeCamadas.IDHTML)){return}document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).innerHTML="";this.CAMADAS=temas;var currentIconMode;YAHOO.example.treeExample=new function(){function changeIconMode(){var newVal=parseInt(this.value);if(newVal!=currentIconMode){currentIconMode=newVal}buildTree()}function buildTree(){i3GEO.arvoreDeCamadas.ARVORE=new YAHOO.widget.TreeView(i3GEO.arvoreDeCamadas.IDHTML);var root=i3GEO.arvoreDeCamadas.ARVORE.getRoot();var tempNode=new YAHOO.widget.TextNode('',root,false);tempNode.isLeaf=false}buildTree()}();var root=i3GEO.arvoreDeCamadas.ARVORE.getRoot();var titulo="<table><tr><td><b>"+$trad("a7")+"</b></td><td><img id='i3geo_lixeira' title='"+$trad("t2")+"'  src='"+i3GEO.util.$im("branco.gif")+"' /></td></tr></table>";var d={html:titulo};var tempNode=new YAHOO.widget.HTMLNode(d,root,true,true);var c=temas.length;for(var i=0,j=c;i<j;i++){var ltema=temas[i];var d={html:i3GEO.arvoreDeCamadas.montaTextoTema(ltema),id:temas[i].name,tipo:"tema"};var temaNode=new YAHOO.widget.HTMLNode(d,tempNode,i3GEO.arvoreDeCamadas.EXPANDIDA,true);temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes,currentIconMode)}document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).style.textAlign="left";i3GEO.arvoreDeCamadas.ARVORE.draw();this.ativaDragDrop()},ativaDragDrop:function(){var Dom=YAHOO.util.Dom;var Event=YAHOO.util.Event;var DDM=YAHOO.util.DragDropMgr;YAHOO.example.DDList="";YAHOO.example.DDApp={init:function(){if($i("i3geo_lixeira")){new YAHOO.util.DDTarget("i3geo_lixeira")}var lista=i3GEO.arvoreDeCamadas.CAMADAS;var i=lista.length-1;if(i>=0){do{var ltema=lista[i];if($i("arrastar_"+ltema.name)){new YAHOO.example.DDList("arrastar_"+ltema.name)}}while(i--)}}};YAHOO.example.DDList=function(id,sGroup,config){YAHOO.example.DDList.superclass.constructor.call(this,id,sGroup,config);this.logger=this.logger||YAHOO;var el=this.getDragEl();Dom.setStyle(el,"opacity",0.67);this.goingUp=false;this.lastY=0};YAHOO.extend(YAHOO.example.DDList,YAHOO.util.DDProxy,{startDrag:function(x,y){this.logger.log(this.id+" startDrag");var dragEl=this.getDragEl();var clickEl=this.getEl();Dom.setStyle(clickEl,"visibility","hidden");dragEl.innerHTML=clickEl.innerHTML;Dom.setStyle(dragEl,"color",Dom.getStyle(clickEl,"color"));Dom.setStyle(dragEl,"backgroundColor",Dom.getStyle(clickEl,"backgroundColor"));Dom.setStyle(dragEl,"border","4px solid gray");Dom.setStyle(dragEl,"z-index","5000")},endDrag:function(e){var srcEl=this.getEl();var proxy=this.getDragEl();Dom.setStyle(proxy,"visibility","");var a=new YAHOO.util.Motion(proxy,{points:{to:Dom.getXY(srcEl)}},0.2,YAHOO.util.Easing.easeOut);var proxyid=proxy.id;var thisid=this.id;a.onComplete.subscribe(function(){Dom.setStyle(proxyid,"visibility","hidden");Dom.setStyle(thisid,"visibility","")});a.animate();if($i("i3geo_lixeira")){$i("i3geo_lixeira").style.border="0px solid blue"}},onDragDrop:function(e,id){if(DDM.interactionInfo.drop.length===1){var pt=DDM.interactionInfo.point;var region=DDM.interactionInfo.sourceRegion;if(!region.intersect(pt)){DDM.refreshCache();if(DDM.getDDById(id).id=="i3geo_lixeira"){i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o1"));var tema=(this.getEl()).id.split("arrastar_")[1];i3GEO.php.excluitema(i3GEO.atualiza,tema);i3GEO.temaAtivo=""}else{i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));var destEl=Dom.get(id);var noid=id.split("arrastar_")[1];destEl.appendChild(this.getEl());var els=i3GEO.arvoreDeCamadas.listaLigadosDesligados();var lista=els[2].join(",");i3GEO.php.reordenatemas(i3GEO.atualiza,lista)}}}},onDrag:function(e){var y=Event.getPageY(e);if(y<this.lastY){this.goingUp=true}else if(y>this.lastY){this.goingUp=false}this.lastY=y},onDragOver:function(e,id){var srcEl=this.getEl();var destEl=Dom.get(id);if($i("i3geo_lixeira")&&id=="i3geo_lixeira"){$i("i3geo_lixeira").style.border="1px solid red"}else{destEl.style.textDecoration="underline"}},onDragOut:function(e,id){$i(id).style.textDecoration="none"}});Event.onDOMReady(YAHOO.example.DDApp.init,YAHOO.example.DDApp,true)},montaOpcoes:function(node){var idtema=node.data.id;var ltema=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(i3GEO.arvoreDeCamadas.OPCOESICONES==true){var farol="maisamarelo.png";if(ltema.escala*1<i3GEO.parametros.mapscale*1){var farol="maisverde.png";var mfarol=$trad("t9")}if(ltema.escala*1>i3GEO.parametros.mapscale*1){var farol="maisvermelho.png";var mfarol=$trad("t10")}if(ltema.escala==0){var farol="maisamarelo.png";var mfarol=$trad("t11")}tnome="&nbsp;<img id='farol"+ltema.name+"' src='"+i3GEO.util.$im(farol)+"' title='"+mfarol+"' \>";tnome+="&nbsp;<img  id='idx"+ltema.name+"' class='x' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("t12")+"' onclick='i3GEO.tema.exclui(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t12a")+"','exclui')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";tnome+="&nbsp;<img class='sobe' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("t13")+"' onclick='i3GEO.tema.sobe(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t14")+"','sobe')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";tnome+="&nbsp;<img class='desce' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("t15")+"' onclick='i3GEO.tema.desce(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t16")+"','desce')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";tnome+="&nbsp;<img class='fonte' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("a9")+"' onclick='i3GEO.tema.fonte(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("a9")+"','fonte')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";if((ltema.zoomtema=="sim")&&(!$i("flamingo"))){tnome+="&nbsp;<img class='extent' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("t17")+"' onclick='i3GEO.tema.zoom(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t18")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>"}var d={html:tnome};var iconesNode=new YAHOO.widget.HTMLNode(d,node,false,true);iconesNode.isLeaf=true}if(i3GEO.arvoreDeCamadas.OPCOESTEMAS==true){var conteudo=$trad("t18a");var d={html:conteudo,idopcoes:ltema.name};var opcoesNode=new YAHOO.widget.HTMLNode(d,node,false,true);opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraOpcoes,1)}if(i3GEO.arvoreDeCamadas.OPCOESLEGENDA==true){var conteudo=$trad("p3");var d={html:conteudo,idlegenda:ltema.name};var opcoesNode=new YAHOO.widget.HTMLNode(d,node,i3GEO.arvoreDeCamadas.LEGENDAEXPANDIDA,true);opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraLegenda,1)}node.loadComplete()},mostraOpcoes:function(node){var idtema=node.data.idopcoes;var ltema=i3GEO.arvoreDeCamadas.pegaTema(idtema);var tnome="<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t19")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+$trad("t20")+"</span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=42' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","tr"+ltema.name,"","3",ltema.transparency)+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudatransp(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;var tnome="<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t21a")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />"+$trad("t21")+" </span> <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=43' >&nbsp;&nbsp;&nbsp;</a>"+$inputText("","","nn"+ltema.name,"","10","")+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudanome(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;if((ltema.type<3)&&(ltema.connectiontype!=7)){var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t22")+"','');\" onclick='i3GEO.tema.dialogo.procuraratrib(\""+ltema.name+"\")'>"+$trad("t23")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t24")+"','');\" onclick='i3GEO.tema.dialogo.toponimia(\""+ltema.name+"\")'>"+$trad("t25")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t26")+"','');\" onclick='i3GEO.tema.dialogo.etiquetas(\""+ltema.name+"\")'>"+$trad("t27")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t28")+"','');\" onclick='i3GEO.tema.dialogo.filtro(\""+ltema.name+"\")'>"+$trad("t29")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t30")+"','');\" onclick='i3GEO.tema.dialogo.tabela(\""+ltema.name+"\")'>"+$trad("t31")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;if(i3GEO.parametros.versaoms>4){var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t37")+"','');\" onclick='i3GEO.tema.dialogo.graficotema(\""+ltema.name+"\")'>"+$trad("t37")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true}}if(ltema.type<4){var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t32")+"','');\" onclick='i3GEO.tema.dialogo.editaLegenda(\""+ltema.name+"\")'>"+$trad("t33")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true}var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t34")+"','');\" onclick='i3GEO.navega.destacaTema.inicia(\""+ltema.name+"\")'>"+$trad("t35")+" </a><a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=44' >&nbsp;&nbsp;&nbsp;</a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;var tnome="<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t38")+"','');\" onclick='i3GEO.tema.dialogo.sld(\""+ltema.name+"\")'>"+$trad("t39")+" </a>";var d={html:tnome};var n=new YAHOO.widget.HTMLNode(d,node,false,true);n.isLeaf=true;node.loadComplete()},mostraLegenda:function(node){var idtema=node.data.idlegenda;var ltema=i3GEO.arvoreDeCamadas.pegaTema(idtema);var retorna=function(retorno){if(retorno.data.legenda){var original=retorno;var retorno=retorno.data.legenda;if(retorno[0]){if((navn)&&(!retorno[0].imagem)){var tabela=retorno}else{var i=retorno[0].imagem;var re=new RegExp("tiff","g");var i=i.replace(re,'png');var tabela="<img src='"+i+"' />"}retorno=""}else{var linhas=retorno.split("#");if(linhas.length>1){var linhas=retorno.split("|");var tabela="<table >";var linha=linhas.length-1;if(linha>=0){do{var colunas=linhas[linha].split("#");var id=colunas[0]+"-"+colunas[1];var re=new RegExp("'","g");var exp=colunas[3].replace(re,'"');tabela+="<tr style='border-top:1px solid rgb(240,240,240);'><td><img src='"+colunas[4]+"' </td><td style='text-align:left'>"+colunas[2]+"</td></tr>"}while(linha--)}tabela+="</table><br>"}else{tabela=retorno}}}else{var tabela="<img src='"+retorno.data[0].imagem+"' />"}var incluir="<div style='text-align:left' id='"+idtema+"verdiv"+"'>"+tabela+"</div>";var d={html:incluir};var nodeLeg=new YAHOO.widget.HTMLNode(d,node,false,false);node.loadComplete();var elementos=document.getElementById(idtema+"verdiv").getElementsByTagName("input");var nelementos=elementos.length;var inputs=new Array();var i=0;if(nelementos>0){do{if(elementos[i].type=="checkbox"){inputs.push(elementos[i])}i++}while(i<nelementos)}if(original.data.desativar){var desativar=original.data.desativar;var nindices=desativar.length;var i=0;if(nindices>0){do{inputs[desativar[i]].checked=false;i++}while(i<nindices)}}};if(i3GEO.configura.templateLegenda!="")i3GEO.php.criaLegendaHTML(retorna,idtema,i3GEO.configura.templateLegenda);else i3GEO.php.criaLegendaHTML(retorna,idtema)},atualizaLegenda:function(idtema){if(document.getElementById(idtema+"verdiv")){var node=i3GEO.arvoreDeCamadas.ARVORE.getNodeByProperty("idlegenda",idtema);if(node){i3GEO.arvoreDeCamadas.ARVORE.removeChildren(node);this.mostraLegenda(node);if($i("janelaLegenda"+idtema+"_corpo")){i3GEO.tema.mostralegendajanela(idtema,"","abrejanela")}}}},inverteStatusClasse:function(leg){var temp=function(){i3GEO.atualiza("")};i3GEO.php.inverteStatusClasse(temp,leg.name,leg.value)},montaTextoTema:function(tema){var ck="";if(tema.status==2){var ck=' CHECKED '}var html="";html+="<p id='arrastar_"+tema.name+"' style='text-align:left;font-size:11px;' ><input class=inputsb style='cursor:pointer;' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t3")+"','ligadesliga')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" type='checkbox' name=\"layer\" value='"+tema.name+"' "+ck;if(i3GEO.arvoreDeCamadas.ATIVATEMA!="")html+="onclick=\""+i3GEO.arvoreDeCamadas.ATIVATEMA+"\"";else html+="onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeCamadas.aplicaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicarCamadas\",this)'";html+=" />";if(tema.contextoescala=="sim"){html+="&nbsp;<img src="+i3GEO.util.$im("contextoescala.png")+" title='"+$trad("t36")+"' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t36")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>"}if(tema.sel=="sim"){html+="&nbsp;<img src="+i3GEO.util.$im("estasel.png")+" title='"+$trad("t4")+"' onclick='i3GEO.tema.limpasel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','limpasel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";html+="&nbsp;<img src="+i3GEO.util.$im("zoomsel.gif")+" title='"+$trad("t4a")+"' onclick='i3GEO.tema.zoomsel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','zoomsel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>"}if((tema.download=="sim")||(tema.download=="SIM")){html+="&nbsp;<img src="+i3GEO.util.$im("down1.gif")+" title='download' onclick='i3GEO.tema.dialogo.download(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t6")+"','download')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>"}if(i3GEO.arvoreDeCamadas.AGUARDALEGENDA)html+="&nbsp;<span style='cursor:move' onclick=\"i3GEO.tema.mostralegendajanela('"+tema.name+"','"+tema.tema+"','abrejanela');\" onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7a")+"','');i3GEO.tema.mostralegendajanela('"+tema.name+"','"+tema.tema+"','ativatimer');\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('');i3GEO.tema.mostralegendajanela('"+tema.name+"','','desativatimer');\" >"+tema.tema+"</span>";else html+="&nbsp;<span style='cursor:move' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+tema.tema+"</span>";html+="</p>";return(html)},atualizaFarol:function(mapscale){var farol="maisamarelo.png";var l=i3GEO.arvoreDeCamadas.CAMADAS.length-1;if(l>=0){do{var ltema=i3GEO.arvoreDeCamadas.CAMADAS[l];var escala=ltema.escala;if(escala*1<mapscale*1){var farol="maisverde.png"}if(escala*1>mapscale*1){var farol="maisvermelho.png"}if(escala*1==0){var farol="maisamarelo.png"}if($i("farol"+ltema.name)){$i("farol"+ltema.name).src=g_locaplic+"/imagens/"+farol}}while(l--)}},aplicaTemas:function(){var t=i3GEO.arvoreDeCamadas.listaLigadosDesligados();var temp=function(){i3GEO.atualiza();i3GEO.janela.fechaAguarde("redesenha")};clearTimeout(tempoBotaoAplicar);tempoBotaoAplicar="";i3GEO.janela.abreAguarde("redesenha",$trad("o1"));i3GEO.php.ligatemas(temp,t[1].toString(),t[0].toString())},listaLigadosDesligados:function(){var nos=i3GEO.arvoreDeCamadas.ARVORE.getNodesByProperty("tipo","tema");var ligados=new Array();var desligados=new Array();var todos=new Array();var n=nos.length;var i=0;do{try{var no=nos[i].getEl();var cs=no.getElementsByTagName("input");var csn=cs.length;for(j=0;j<csn;j++){var c=cs[j];if(c.name=="layer"){if(c.checked==true){ligados.push(c.value)}else{desligados.push(c.value)}todos.push(c.value)}}i++}catch(e){i++}}while(i<n)var lista=new Array(ligados,desligados,todos);return(lista)},comparaTemas:function(novo,atual){try{var novon=novo.length;if(novon!=atual.length){return(false)}for(i=0;i<novon;i++){if(novo[i].name!=atual[i].name){return(false)}if(novo[i].tema!=atual[i].tema){return(false)}if(novo[i].sel!=atual[i].sel){return(false)}}return(true)}catch(e){return true}},pegaTema:function pegatema(idtema){var c=i3GEO.arvoreDeCamadas.CAMADAS.length;for(i=0;i<c;i++){if(i3GEO.arvoreDeCamadas.CAMADAS[i].name==idtema){var ltema=i3GEO.arvoreDeCamadas.CAMADAS[i];return(ltema)}}}};i3GEO.arvoreDeCamadas.IDHTML="listaTemas";
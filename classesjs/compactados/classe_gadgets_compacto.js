if(typeof(i3GEO)=='undefined'){i3GEO=new Array()}i3GEO.gadgets={PARAMETROS:{"mostraCoordenadasUTM":{idhtml:"mostraUTM"},"mostraCoordenadasGEO":{idhtml:"localizarxy"},"mostraEscalaNumerica":{idhtml:"escala"},"mostraBuscaRapida":{idhtml:"buscaRapida"},"mostraVisual":{idhtml:"visual"},"mostraQuadros":{idhtml:"lugarquadros"}},mostraCoordenadasUTM:function(locaplic,id,sid){if(objposicaocursor.imgx<10||objposicaocursor.imgy<10){return}if(arguments.length==0||locaplic==""){var locaplic=i3GEO.configura.locaplic}if(arguments.length<2||locaplic==""||id==""){var id=i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml}if(arguments.length<3||locaplic==""||id==""||sid==""){var sid=i3GEO.configura.sid}var temp=$i(id);if(!temp){return}if(temp.style.display=="block"){return}var mostra=function(retorno){if(retorno.data){temp.style.display="block";temp.innerHTML="UTM: x="+retorno.data.x+" y="+retorno.data.y+" zona="+retorno.data.zona+" datum="+retorno.data.datum;tempoUTM=setTimeout("$i(i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml).style.display='none';clearTimeout(tempoUTM)",3400);return(retorno.data)}};var p=locaplic+"/classesphp/mapa_controle.php?funcao=geo2utm&x="+objposicaocursor.ddx+"&y="+objposicaocursor.ddy+"&g_sid="+sid;var cp=new cpaint();cp.set_persistent_connection(true);cp.set_response_type("JSON");cp.call(p,"geo2utm",mostra)},mostraCoordenadasGEO:function(id){try{if(arguments.length==0){var id=i3GEO.gadgets.PARAMETROS.mostraCoordenadasGEO.idhtml}if($i(id)){if(!$i("xm")){var ins="<table style='text-align:center'><tr>";ins+="<td>localiza X:&nbsp;</td>";ins+="<td>"+$inputText(id,"315","xg","grau","3","-00")+"&nbsp;</td>";ins+="<td>"+$inputText("","","xm","minuto","3","00")+"&nbsp;</td>";ins+="<td>"+$inputText("","","xs","segundo","5","00.00")+"&nbsp;</td>";ins+="<td>Y:"+$inputText("","","yg","grau","3","-00")+"&nbsp;</td>";ins+="<td>"+$inputText("","","ym","minuto","3","00")+"&nbsp;</td>";ins+="<td>"+$inputText("","","ys","segundo","5","00.00")+"</td>";var temp='var xxx = i3GEO.calculo.dms2dd($i("xg").value,$i("xm").value,$i("xs").value);';temp+='var yyy = i3GEO.util.dms2dd($i("yg").value,$i("ym").value,$i("ys").value);';temp+='i3GEO.navega.zoomponto(i3GEO.configura.locaplic,i3GEO.configura.sid,xxx,yyy);';ins+="<td><img  class='tic' title='zoom' onclick='"+temp+"' src='"+i3GEO.util.$im("branco.gif")+"' id=procurarxy /></td>";ins+="</tr></table>";$i(id).innerHTML=ins;$i3geo_temp_xg=$i("xg");$i3geo_temp_xm=$i("xm");$i3geo_temp_xs=$i("xs");$i3geo_temp_yg=$i("yg");$i3geo_temp_ym=$i("ym");$i3geo_temp_ys=$i("ys");atualizaLocalizarxy=function(){try{var x=objposicaocursor.dmsx.split(" ");var y=objposicaocursor.dmsy.split(" ");$i3geo_temp_xg.value=x[0];$i3geo_temp_xm.value=x[1];$i3geo_temp_xs.value=x[2];$i3geo_temp_yg.value=y[0];$i3geo_temp_ym.value=y[1];$i3geo_temp_ys.value=y[2]}catch(m){}};if($i("img")){YAHOO.util.Event.addListener($i("img"),"mousemove",atualizaLocalizarxy)}}}}catch(e){alert("mostraCoordenadasGeo: "+e.description)}},mostraEscalaNumerica:function(id){if(arguments.length==0){var id=i3GEO.gadgets.PARAMETROS.mostraEscalaNumerica.idhtml}if($i(id)){atualizaEscalaNumerica=function(escala){if(arguments.length==1)$i("i3geo_escalanum").value=escala;else $i("i3geo_escalanum").value=parseInt(objmapa.scale)};if(!$i("i3geo_escalanum")){var i=$inputText(id,"138","i3geo_escalanum",$trad("d10"),"19","");var ins="<table><tr><td>1:"+i;var temp='var nova = document.getElementById("i3geo_escalanum").value;';temp+='i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,nova);';ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='"+temp+"' /></td></tr></table>";$i(id).innerHTML=ins}if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaNumerica()")<0){i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaNumerica()")}}},mostraBuscaRapida:function(id){if(arguments.length==0){var id=i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.idhtml}if($i(id)){i3geo_buscaRapida=function(){if($i("valorBuscaRapida").value==""){alert("Digite uma palavra para busca!");return}wdocaf("300px","280px",i3GEO.configura.locaplic+"/ferramentas/buscarapida/index.htm","","","Busca rapida")}var i=$inputText(id,"180","valorBuscaRapida","digite o texto para busca","30",$trad("o2"));var ins="<table><tr><td>"+i;ins+="</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='i3geo_buscaRapida()' /></td></tr></table>";$i(id).innerHTML=ins}},visual:{inicia:function(id){if(arguments.length==0){var id=i3GEO.gadgets.PARAMETROS.mostraVisual.idhtml}if($i(id)){if(objmapa.listavisual!=""){var l=objmapa.listavisual.split(",");var visuais="";var li=l.length-1;if(li>=0){do{visuais+="<img title='"+l[li]+"' style=cursor:pointer onclick='i3GEO.gadgets.visual.troca(\""+l[li]+"\")' src='"+i3GEO.configura.locaplic+"/imagens/visual/"+l[li]+".png' />&nbsp;"}while(li--)}$i(id).innerHTML=visuais;$i(id).onmouseover=function(){i3GEO.ajuda.mostraJanela($trad("d26"))};$i(id).onmouseout=function(){i3GEO.ajuda.mostraJanela("")}}}},troca:function(visual){var monta=function(retorno){try{i3GEO.janela.fechaAguarde("ajaxredesenha");var imgstemp=retorno.data.arquivos;var imgs=new Array();var i=imgstemp.length-1;if(i>=0){do{var temp=imgstemp[i].split(".");if((temp[1]=="png")||(temp[1]=="gif")||(temp[1]=="jpg")){imgs.push(imgstemp[i])}}while(i--)}var elementos=document.getElementsByTagName("img");var elt=elementos.length;var caminho=i3GEO.configura.locaplic+"/imagens/visual/"+visual+"/";var j=imgs.length-1;if(j>=0){do{for(var i=0;i<elt;i++){if((elementos[i].src.search("branco")>-1)&&((elementos[i].className!="")||(elementos[i].id!=""))){elementos[i].src=caminho+"branco.gif"}if(elementos[i].src.search("visual")>-1){elementos[i].style.backgroundImage="url('"+caminho+imgs[j]+"')"}}}while(j--)}var j=imgs.length-1;if(j>=0){do{var busca=imgs[j].split(".");if($i(busca[0])){$i(busca[0]).src=caminho+imgs[j]}}while(j--)}var elementos=new Array("barraSuperior","barraInferior","vertMaisZoom","vertMenosZoom","foldermapa","foldermapa1","tic");var i=elementos.length-1;if(i>=0){do{if($i(elementos[i])){var nimagem=$i(elementos[i]).style.backgroundImage.replace(i3GEO.configura.visual,visual);$i(elementos[i]).style.backgroundImage=nimagem}}while(i--)}i3GEO.configura.visual=visual}catch(e){alert("Ocorreu um erro. mudaVisual"+e);i3GEO.janela.fechaAguarde("ajaxredesenha")}};i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=listaArquivos&g_sid="+i3GEO.configura.sid+"&diretorio=imagens/visual/"+visual;var cp=new cpaint();cp.set_response_type("JSON");cp.call(p,"mudaVisual",monta)}},quadros:{quadrosfilme:new Array(),quadroatual:0,inicia:function(qs,lugarquadros){if(arguments.length==1){var lugarquadros=i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml}var q="<table class=tablefilme ><tr><td><div class='menuarrow'  title='op&ccedil;&otilde;es' onclick='i3GEO.gadgets.quadros.opcoes(this)' style='cursor:pointer'></div></td>";for(var i=0;i<qs;i++){q+="<td><img class='quadro' src=\""+i3GEO.configura.locaplic+"/imagens/branco.gif\" id='quadro"+i+"' ";q+="onmouseover='i3GEO.gadgets.quadros.trocaMapa(this.id);i3GEO.ajuda.mostraJanela(\"Clique para aplicar a extensão geográfica do quadro ao mapa\")' ";q+="onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" ";q+="onclick='i3GEO.gadgets.quadros.zoom(this.id)' /></td>";i3GEO.gadgets.quadros.quadrosfilme[i]=new Array()}q+="</tr></table>";if($i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml)){document.getElementById(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml).innerHTML=q;$i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml).onmouseout=function(){if($i("imgClone")){$i("imgClone").style.display="none";$i("img").style.display="block"}}}i3GEO.gadgets.quadros.quadroatual=0},grava:function(variavel,valor){eval("i3GEO.gadgets.quadros.quadrosfilme["+i3GEO.gadgets.quadros.quadroatual+"]."+variavel+" = '"+valor+"'");if($i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml)){$i("quadro"+i3GEO.gadgets.quadros.quadroatual).className="quadro1"}},avanca:function(){try{var nquadros=i3GEO.gadgets.quadros.quadrosfilme.length;if((nquadros-1)==(i3GEO.gadgets.quadros.quadroatual)){i3GEO.gadgets.quadros.inicia(nquadros)}else{i3GEO.gadgets.quadros.quadroatual++}}catch(e){var e=""}},zoom:function(quadro){var indice=quadro.replace("quadro","");i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[indice].extensao)},trocaMapa:function(quadro){var indice=quadro.replace("quadro","");var i=$i("img");var c=$i("imgClone");if(i){if(!c){var iclone=document.createElement('IMG');iclone.style.position="relative";iclone.id="imgClone";iclone.style.border="1px solid blue";i.parentNode.appendChild(iclone);iclone.src=corpo.src;iclone.style.width=objmapa.w;iclone.style.heigth=objmapa.h;iclone.style.top=corpo.style.top;iclone.style.left=corpo.style.left}try{if(!i3GEO.gadgets.quadros.quadrosfilme[indice].imagem){return}c.src=i3GEO.gadgets.quadros.quadrosfilme[indice].imagem;c.style.display="block";i.style.display="none"}catch(e){var e=""}}},opcoes:function(obj){if(objmapa.utilizacgi=="sim"){objmapa.utilizacgi="nao";var volta=function(){alert("Armazenamento de imagens ativado. As proximas imagens ficarao disponiveis")};var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=desativacgi&g_sid="+i3GEO.configura.sid;var cp=new cpaint();cp.set_response_type("JSON");cp.call(p,"desativacgi",volta)}else{i3GEO.janela.cria("150px","150px",i3GEO.configura.locaplic+"/ferramentas/opcoes_quadros/index.htm","center","","Quadros")}},anima:function(Qanima,t){if(arguments.length==0){Qanima=0;var doc=(navm)?document.frames("wdocai").document:$i("wdocai").contentDocument;var t=doc.getElementById("tempoanima").value}if(Qanima>i3GEO.gadgets.quadros.quadrosfilme.length){clearTimeout(tAnima);$i("imgClone").style.display="none";$i("img").style.display="block";return}i3GEO.gadgets.quadros.trocaMapa("quadro"+Qanima);Qanima++;tAnima=setTimeout('i3GEO.gadgets.quadros.anima('+Qanima+','+t+')',t)},listaImagens:function(){if(objmapa.utilizacgi=="sim"){objmapa.utilizacgi="nao";var volta=function(){alert("Armazenamento de imagens ativado. As proximas imagens ficarao disponiveis")};var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=desativacgi&g_sid="+i3GEO.configura.sid;var cp=new cpaint();cp.set_response_type("JSON");cp.call(p,"desativacgi",volta)}else{var wi=window.open("");var mensagem="<br><b>N&atilde;o existem imagens guardadas.";wi.document.write("<html><body><p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Click com o bot&atilde;o da direita do mouse sobre a imagem para fazer o download<br>");var i=i3GEO.gadgets.quadros.quadrosfilme.length-1;if(i>=0){do{if(i3GEO.gadgets.quadros.quadrosfilme[i].imagem){wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Imagem: "+i+"<br>");wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Abrangência: "+i3GEO.gadgets.quadros.quadrosfilme[i].extensao+"<br>");wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].imagem+"' />");wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].referencia+"' />");wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].legenda+"' />")}i--}while(i>=0)}wi.document.write("<br>Fim</body></html>")}}}};
if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.analise={dialogo:{graficoInterativo:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.graficoInterativo()","graficointerativo","graficointerativo")},graficoInterativo1:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.graficoInterativo1()","graficointerativo1","graficointerativo1")},linhaDoTempo:function(){i3GEO.janela.cria("450px","350px",i3GEO.configura.locaplic+"/ferramentas/linhadotempo/index.php","","","Linha do tempo <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=88' >&nbsp;&nbsp;&nbsp;</a>");atualizaLinhaDoTempo=function(){var doc="",ifr="";try{ifr=$i("wdocai");if(navn){if(ifr){doc=ifr.contentDocument}}else{if(document.frames("wdocai")){doc=document.frames("wdocai").document}}doc.getElementById("tl")?window.parent.wdocai.carregaDados():i3GEO.eventos.NAVEGAMAPA.remove("atualizaLinhaDoTempo()")}catch(e){i3GEO.eventos.NAVEGAMAPA.remove("atualizaLinhaDoTempo()")}};if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaLinhaDoTempo()")<0){i3GEO.eventos.NAVEGAMAPA.push("atualizaLinhaDoTempo()")}var ifr=$i("wdocai");ifr.style.width="100%"},perfil:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.perfil()","perfil","perfil")},gradePontos:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.gradePontos()","gradepontos","gradeDePontos")},gradePol:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.gradePol()","gradepol","gradeDePoligonos")},gradeHex:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.gradeHex()","gradehex","gradeDeHex")},analisaGeometrias:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.analisaGeometrias()","analisageometrias","analisaGeometrias")},pontosdistri:function(){i3GEO.parametros.r==="nao"?i3GEO.janela.tempoMsg($trad("x22")):i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.pontosdistri()","pontosdistri","pontosDistri")},pontoempoligono:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.pontoempoligono()","pontoempoligono","pontoEmPoligono")},centromassa:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.centromassa()","centromassa","centromassa")},nptPol:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.nptPol()","nptpol","nptpol")},buffer:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.buffer()","buffer","buffer")},distanciaptpt:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.distanciaptpt()","distanciaptpt","distanciaptpt")},centroide:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.centroide()","centroide","centroide")},dissolve:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.dissolve()","dissolve","dissolve")},agrupaElementos:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.agrupaElementos()","agrupaelementos","agrupaElementos")}},medeDistancia:{inicia:function(){i3GEO.eventos.cliquePerm.desativa();pontosdistobj={xpt:[],ypt:[],dist:[],distV:[],xtela:[],ytela:[],ximg:[],yimg:[],linhas:[],linhastemp:[]};i3GEO.analise.medeDistancia.criaJanela();if(g_tipoacao!=="mede"){if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.analise.medeDistancia.clique()")<0){i3GEO.eventos.MOUSECLIQUE.push("i3GEO.analise.medeDistancia.clique()")}if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.analise.medeDistancia.movimento()")<0){i3GEO.eventos.MOUSEMOVE.push("i3GEO.analise.medeDistancia.movimento()")}if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.analise.medeDistancia.fechaJanela()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.analise.medeDistancia.fechaJanela()")}$i("mostradistancia").style.display="block";if(i3GEO.Interface.ATUAL!=="googleearth"){i3GEO.desenho.criaContainerRichdraw();i3GEO.desenho.richdraw.lineColor="black";i3GEO.desenho.richdraw.lineWidth="2px"}g_tipoacao="mede"}else{if(i3GEO.Interface.ATUAL!=="googleearth"){i3GEO.desenho.richdraw.fecha()}var Dom=YAHOO.util.Dom;Dom.setStyle("mostradistancia","display","none");Dom.setStyle("pontosins","display","none")}},criaJanela:function(){var novoel,ins,imagemxy,janela;if(!$i("mostradistancia")){novoel=document.createElement("div");novoel.id="mostradistancia";ins='<div class="hd" style="font-size:11px">&nbsp;Dist&acirc;ncia aproximada <a class=ajuda_usuario target=_blank href="'+i3GEO.configura.locaplic+'/ajuda_usuario.php?idcategoria=6&idajuda=50" >&nbsp;&nbsp;&nbsp;</a></div>'+'<div class="bd" style="text-align:left;padding:3px;" >'+'<div style="text-align:left;padding:3px;" id="mostradistancia_calculo" ></div>'+'<div style="text-align:left;font-size:10px" >'+'<span style="color:navy;cursor:pointer;text-align:left;" >'+'<table class=lista7 ><tr><td><input style="cursor:pointer" type="checkbox" id="pararraios" checked /></td><td>Raios</td><td>&nbsp;</td>'+'<td>'+'<input style="cursor:pointer" type="checkbox" id="parartextos" checked />'+'</td><td>Textos<td>'+'<td>&nbsp;Estilo:</td><td>'+i3GEO.desenho.caixaEstilos()+'</td>'+'<td>&nbsp;<input id=i3GEObotaoPerfil size="22" type="button" value="perfil"></td>'+'</tr></table></span>'+'</div>'+'</div>';novoel.innerHTML=ins;novoel.style.borderColor="gray";document.body.appendChild(novoel);janela=new YAHOO.widget.Panel("mostradistancia",{iframe:true,width:"330px",fixedcenter:false,constraintoviewport:true,underlay:"none",close:true,visible:true,draggable:true,modal:false});YAHOO.i3GEO.janela.manager.register(janela);janela.render();YAHOO.util.Event.addListener(janela.close,"click",i3GEO.analise.medeDistancia.fechaJanela)}else{i3GEO.util.defineValor("mostradistancia_calculo","innerHTML","");janela=YAHOO.i3GEO.janela.manager.find("mostradistancia")}janela.show();imagemxy=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));janela.moveTo(imagemxy[0]+150,imagemxy[1]);if(navm&&i3GEO.Interface.ATUAL==="googleearth"){janela.moveTo(0,0)}new YAHOO.widget.Button("i3GEObotaoPerfil",{onclick:{fn:function(){var js=i3GEO.configura.locaplic+"/ferramentas/perfil/index.js";i3GEO.util.scriptTag(js,"i3GEOF.perfil.criaJanelaFlutuante(pontosdistobj)","i3GEOF.perfil_script")}}})},fechaJanela:function(){var janela;i3GEO.eventos.cliquePerm.ativa();i3GEO.Interface.ATUAL!=="googleearth"?i3GEO.desenho.richdraw.fecha():i3GEO.Interface.googleearth.removePlacemark("divGeometriasTemp");i3GEO.util.removeChild("pontosins");if($i("divGeometriasTemp")){i3GEO.desenho.richdraw.fecha()}i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.analise.medeDistancia.clique()");i3GEO.eventos.MOUSEMOVE.remove("i3GEO.analise.medeDistancia.movimento()");i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.analise.medeDistancia.fechaJanela()");i3GEO.barraDeBotoes.ativaBotoes();janela=YAHOO.i3GEO.janela.manager.find("mostradistancia");if(janela){YAHOO.i3GEO.janela.manager.remove(janela);janela.destroy()}i3GEO.barraDeBotoes.ativaIcone("pointer")},clique:function(){var n,d,decimal,dd;if(g_tipoacao==="mede"){n=pontosdistobj.xpt.length;pontosdistobj.xpt[n]=objposicaocursor.ddx;pontosdistobj.ypt[n]=objposicaocursor.ddy;pontosdistobj.xtela[n]=objposicaocursor.telax;pontosdistobj.ytela[n]=objposicaocursor.telay;pontosdistobj.ximg[n]=objposicaocursor.imgx;pontosdistobj.yimg[n]=objposicaocursor.imgy;pontosdistobj.dist[n]=0;if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["openlayers","googlemaps"])){try{pontosdistobj.linhas[n]=i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode,i3GEO.desenho.richdraw.fillColor,i3GEO.desenho.richdraw.lineColor,i3GEO.desenho.richdraw.lineWidth,(pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1),(pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1))}catch(e){}}if(n>0){d=i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);decimal=0;d=d+"";d=d.split(".");decimal=d[1].substr(0,5);d=d[0]+"."+decimal;d=d*1;pontosdistobj.dist[n]=d+pontosdistobj.dist[n-1];if(navm){i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode,i3GEO.desenho.richdraw.fillColor,i3GEO.desenho.richdraw.lineColor,i3GEO.desenho.richdraw.lineWidth,(pontosdistobj.ximg[n-1]),pontosdistobj.yimg[n-1],(pontosdistobj.ximg[n]),pontosdistobj.yimg[n])}if($i("pararraios")&&$i("pararraios").checked===true){if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["openlayers","googlemaps"])){i3GEO.desenho.aplica("insereCirculo","",n)}if(i3GEO.Interface.ATUAL==="googleearth"){dd=Math.sqrt(((Math.pow((pontosdistobj.xpt[n]-pontosdistobj.xpt[n-1]),2))+(Math.pow((pontosdistobj.ypt[n]-pontosdistobj.ypt[n-1]),2))));i3GEO.Interface.googleearth.insereCirculo(pontosdistobj.xpt[n],pontosdistobj.ypt[n],dd,"","divGeometriasTemp")}}if($i("parartextos")&&$i("parartextos").checked===true){if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["openlayers","googlemaps"])){i3GEO.desenho.aplica("insereTexto","",n+1,d+" km")}if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.Interface.googleearth.insereMarca(d+" km",objposicaocursor.ddx,objposicaocursor.ddy,"","divGeometriasTemp")}}if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.Interface.googleearth.insereLinha(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],pontosdistobj.xpt[n],pontosdistobj.ypt[n],"","divGeometriasTemp")}}if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["openlayers","googlemaps"])){i3GEO.util.insereMarca.cria(objposicaocursor.imgx,objposicaocursor.imgy,i3GEO.analise.medeDistancia.paraCalculo,"divGeometriasTemp","",i3GEO.configura.locaplic+"/imagens/estasel.png",6,6);i3GEO.desenho.insereCirculo(objposicaocursor.imgx,objposicaocursor.imgy,3,"white")}}},paraCalculo:function(){var botaoPan=$i("pan");g_tipoacao="";botaoPan?botaoPan.onclick.call():i3GEO.barraDeBotoes.ativaBotoes()},movimento:function(){var n,d,r,decimal,da,mostra,texto,calculo=i3GEO.calculo;if(g_tipoacao==="mede"){YAHOO.util.Dom.setStyle("mostradistancia","display","block");n=pontosdistobj.xpt.length;try{if(n>0){d=calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);r=calculo.direcao(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);r=calculo.dd2dms(r,r);r=r[0];d=d+"";d=d.split(".");decimal=d[1].substr(0,5);d=d[0]+"."+decimal;d=d*1;da=d+pontosdistobj.dist[n-1];da=da+"";da=da.split(".");decimal=da[1].substr(0,5);da=da[0]+"."+decimal;da=da*1;mostra=$i("mostradistancia_calculo");if(mostra){texto=" Dist acum.= "+da+" km <br>atual= "+d+" km <br> "+$trad("x23")+" (DMS)= "+r;texto+="<br>"+$trad("x25")+": "+calculo.metododistancia;mostra.innerHTML=texto}if(i3GEO.Interface.ATUAL!=="googleearth"&&navn){i3GEO.desenho.aplica("resizeLinha",pontosdistobj.linhas[n-1],n)}}}catch(e){}}}},medeArea:{inicia:function(){i3GEO.eventos.cliquePerm.desativa();pontosdistobj={xpt:[],ypt:[],dist:[],distV:[],xtela:[],ytela:[],ximg:[],yimg:[],linhas:[],linhastemp:[]};var x,y,ll1,ll2,d,calculo=i3GEO.calculo,montacontainer=function(){var desenho=i3GEO.desenho;$i("mostraarea_calculo").innerHTML="Clique no mapa para desenhar o poligono. Clique duas vezes para concluir";i3GEO.barraDeBotoes.ativaIcone("area");g_tipoacao="area";desenho.criaContainerRichdraw();desenho.richdraw.lineColor="green";desenho.richdraw.lineWidth="2px"};i3GEO.analise.medeArea.criaJanela();if(g_tipoacao!=="area"){$i("mostraarea_calculo").innerHTML="";if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.analise.medeArea.clique()")<0){i3GEO.eventos.MOUSECLIQUE.push("i3GEO.analise.medeArea.clique()")}if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.analise.medeArea.movimento()")<0){i3GEO.eventos.MOUSEMOVE.push("i3GEO.analise.medeArea.movimento()")}if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.analise.medeArea.fechaJanela()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.analise.medeArea.fechaJanela()")}if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["openlayers","googlemaps"])){x=parseInt(i3GEO.parametros.w/2,10);y=parseInt(i3GEO.parametros.h/2,10);ll1=calculo.tela2dd(x,y,"","");ll2=calculo.tela2dd(x+1,y,"","");d=calculo.distancia(ll1[0],ll1[1],ll2[0],ll2[1]);d=d*1000;g_areapixel=d*d;g_areapixel<0?i3GEO.janela.tempoMsg("Nao e possivel calcular a area. Entre em contato com o administrador do sistema."):montacontainer()}}else{i3GEO.desenho.richdraw.fecha()}},criaJanela:function(){var novoel,ins,imagemxy,janela;if(!$i("mostraarea")){novoel=document.createElement("div");novoel.id="mostraarea";ins='<div class="hd" >&Aacute;rea aproximada <a class=ajuda_usuario target=_blank href="'+i3GEO.configura.locaplic+'"/ajuda_usuario.php?idcategoria=6&idajuda=51" >&nbsp;&nbsp;&nbsp;</a></div>'+'<div class="bd" style="text-align:left;padding:3px;font-size:10px" >'+'Estilo: '+i3GEO.desenho.caixaEstilos()+'<br>'+'<div style="text-align:left;padding:3px;font-size:10px" id="mostraarea_calculo" ></div>'+'</div>';novoel.innerHTML=ins;novoel.style.borderColor="gray";document.body.appendChild(novoel);janela=new YAHOO.widget.Panel("mostraarea",{width:"220px",fixedcenter:false,constraintoviewport:true,underlay:"none",close:true,visible:true,draggable:true,modal:false});YAHOO.i3GEO.janela.manager.register(janela);janela.render();YAHOO.util.Event.addListener(janela.close,"click",i3GEO.analise.medeArea.fechaJanela)}else{janela=YAHOO.i3GEO.janela.manager.find("mostraarea")}janela.show();imagemxy=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));janela.moveTo(imagemxy[0]+150,imagemxy[1])},fechaJanela:function(){var janela;i3GEO.eventos.cliquePerm.ativa();i3GEO.desenho.richdraw.fecha();i3GEO.util.removeChild("pontosArea",document.body);i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.analise.medeArea.clique()");i3GEO.eventos.MOUSEMOVE.remove("i3GEO.analise.medeArea.movimento()");i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.analise.medeArea.fechaJanela()");i3GEO.barraDeBotoes.ativaBotoes();janela=YAHOO.i3GEO.janela.manager.find("mostraarea");if(janela){YAHOO.i3GEO.janela.manager.remove(janela);janela.destroy()}i3GEO.barraDeBotoes.ativaIcone("pointer")},clique:function(){var n,m;if(g_tipoacao==="area"){n=pontosdistobj.xpt.length;pontosdistobj.xpt[n]=objposicaocursor.ddx;pontosdistobj.ypt[n]=objposicaocursor.ddy;pontosdistobj.xtela[n]=objposicaocursor.telax;pontosdistobj.ytela[n]=objposicaocursor.telay;pontosdistobj.ximg[n]=objposicaocursor.imgx;pontosdistobj.yimg[n]=objposicaocursor.imgy;pontosdistobj.dist[n]=0;if(n===0){try{pontosdistobj.linhastemp=i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode,i3GEO.desenho.richdraw.fillColor,i3GEO.desenho.richdraw.lineColor,i3GEO.desenho.richdraw.lineWidth,pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[0]-1,pontosdistobj.yimg[0]-1)}catch(e){}}else{if(navm){i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode,i3GEO.desenho.richdraw.fillColor,i3GEO.desenho.richdraw.lineColor,i3GEO.desenho.richdraw.lineWidth,(pontosdistobj.ximg[n-1]),pontosdistobj.yimg[n-1],(pontosdistobj.ximg[n]),pontosdistobj.yimg[n])}}try{pontosdistobj.linhas[n]=i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode,i3GEO.desenho.richdraw.fillColor,i3GEO.desenho.richdraw.lineColor,i3GEO.desenho.richdraw.lineWidth,pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1)}catch(men){}m=i3GEO.calculo.area(pontosdistobj,g_areapixel);i3GEO.util.defineValor("mostraarea_calculo","innerHTML","<br>m2</b>= "+m.toFixed(2)+"<br><b>km2</b>= "+(m/1000000).toFixed(2)+"<br><b>ha</b>= "+(m/10000).toFixed(2));if(i3GEO.util.in_array(i3GEO.Interface.ATUAL,["openlayers","googlemaps"])){i3GEO.util.insereMarca.cria(objposicaocursor.imgx,objposicaocursor.imgy,i3GEO.analise.medeArea.paraCalculo,"divGeometriasTemp","",i3GEO.configura.locaplic+"/imagens/estasel.png",6,6);i3GEO.desenho.insereCirculo(objposicaocursor.imgx,objposicaocursor.imgy,3,"white")}if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.util.insereMarca.cria(objposicaocursor.ddx,objposicaocursor.ddy,i3GEO.analise.medeArea.paraCalculo,"divGeometriasTemp","")}}},paraCalculo:function(){var botaoPan=$i("pan");g_tipoacao="";botaoPan?botaoPan.onclick.call():i3GEO.barraDeBotoes.ativaBotoes()},movimento:function(){var n;if(g_tipoacao==="area"){n=pontosdistobj.xpt.length;if(n>0){i3GEO.desenho.aplica("resizePoligono",pontosdistobj.linhastemp,1);i3GEO.desenho.aplica("resizeLinha",pontosdistobj.linhas[n-1],n)}}}}};
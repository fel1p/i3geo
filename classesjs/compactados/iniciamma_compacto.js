g_recupera=0;imagemxi=0;imagemyi=0;navm=false;navn=false;var app=navigator.appName.substring(0,1);if(app=='N')navn=true;else navm=true;atuaLeg="nao";g_zoomRefDinamico=-3;g_mashuppar="";g_operacao="";g_zoomProximo=new Array();g_nomepin="";g_arvoreClick="";g_arvoreClicks="";g_tipoacao="zoomli";g_realca="nao";g_destaca="";g_lenteaberta="nao";g_panM="nao";g_r="nao";cpObj=new cpaint();cpObj.set_async("true");cpObj.set_response_type("JSON");g_postpx="px";g_tipotop="top";g_tipoleft="left";if(navm){g_postpx="";g_tipotop="pixelTop";g_tipoleft="pixelLeft"}function Mapa(e,m){try{i3GEO.configura.locaplic=g_locaplic}catch(e){g_locaplic=i3GEO.configura.locaplic};objaguarde=new aguarde();objposicaocursor=new posicaocursor();objposicaomouse=new posicaomouse();var diminuix=(navm)?g_diminuixM:g_diminuixN;var diminuiy=(navm)?g_diminuiyM:g_diminuiyN;if(e==undefined){var menos=0;if($i("contemFerramentas")){menos=menos+parseInt($i("contemFerramentas").style.width)}if($i("ferramentas")){menos=menos+parseInt($i("ferramentas").style.width)}var novow=parseInt(screen.availWidth)-diminuix;var novoh=parseInt(screen.availHeight)-diminuiy;if(novow>=1024){novow=1000}if(novoh>=700){novoh=700}try{if(document.body.style.width<400){var novow=parseInt(screen.availWidth)-diminuix;var novoh=parseInt(screen.availHeight)-diminuiy;window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0)}}catch(e){var e=""}document.body.style.width=novow;document.body.style.height=novoh;this.w=novow-menos-diminuix;this.h=novoh-diminuiy;if(document.getElementById("corpoMapa")){if(document.getElementById("corpoMapa").style.width){this.w=parseInt(document.getElementById("corpoMapa").style.width);this.h=parseInt(document.getElementById("corpoMapa").style.width)}if(document.getElementById("corpoMapa").style.height){this.h=parseInt(document.getElementById("corpoMapa").style.height)}}}else{this.w=document.body.offsetWidth-parseInt($i("contemFerramentas").style.width)-diminuix;this.h=document.body.offsetHeight-diminuiy}YAHOO.log("Reposicionou a janela do navegador","i3geo");if($i("openlayers")){$i("openlayers").style.width=this.w;$i("openlayers").style.height=this.h}if($i("flamingo")){$i("flamingo").style.width=this.w;$i("flamingo").style.height=this.h}this.navegacaoDir="nao";this.listavisual="";this.visualatual="default";this.funcoesClickMapa=new Array();this.objtips=new Array();this.tempo="";this.tempoRedesenho="";this.contaTempoRedesenho="";this.temaAtivo="";this.pinmarca="marca";this.pintamanho="5";this.scale=50000;this.legenda="";this.finaliza="";this.guiaTemas="guia1";this.guiaMenu="guia2";this.guiaLegenda="guia4";this.guiaListaMapas="guia5";this.cgi="";this.utilizacgi="";this.versaoms="";this.inicializa=function(){if(!$i("tip")){var novoel=document.createElement("div");novoel.id="tip";novoel.style.position="absolute";novoel.style.zIndex=5000;if(navm){novoel.style.filter="alpha(opacity=90)"}document.body.appendChild(novoel)}YAHOO.log("Inicializando o i3geo","i3geo");if(!$i("i3geo")){document.body.id="i3geo"}$i("i3geo").className="yui-skin-sam";if($i("mst"))$i("mst").style.visibility="hidden";if(i3GEO.configura.sid==""){var mashup=function(retorno){i3GEO.configura.sid=retorno.data;objmapa.inicializa()};var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa&"+g_mashuppar;cpObj.call(p,"",mashup)}else{YAHOO.log("Chamada AJAX para obter o mapa inicial","i3geo");i3GEO.janela.abreAguarde("montaMapa",$trad("o5"));var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=inicia&embedLegenda="+g_embedLegenda+"&w="+this.w+"&h="+this.h+"&g_sid="+i3GEO.configura.sid;cpObj.call(p,"iniciaMapa",this.montaMapa)}};this.montaMapa=function(retorno){YAHOO.log("Mapa obtido","i3geo");if(retorno.data.erro){i3GEO.janela.fechaAguarde("montaMapa");document.body.style.backgroundColor="white";document.body.innerHTML="<br>Para abrir o mapa utilize o link:<br><a href="+i3GEO.configura.locaplic+"/ms_criamapa.php >"+i3GEO.configura.locaplic+"/ms_criamapa.php</a>";return("linkquebrado")}else{if(retorno.data.variaveis){var tempo="";var titulo="";eval(retorno.data.variaveis);try{if(titulo!=""){top.document.title=titulo}}catch(e){var e=""}mostradicasf("","Tempo de desenho em segundos: "+tempo,"");i3GEO.gadgets.quadros.inicia(10);i3GEO.gadgets.quadros.grava("extensao",mapexten);i3GEO.arvoreDeCamadas.cria("",retorno.data.temas,i3GEO.configura.sid,i3GEO.configura.locaplic);i3GEO.maparef.atualiza();objmapa.scale=parseInt(mapscale);objmapa.cellsize=g_celula;objmapa.extent=mapexten;objmapa.extentTotal=mapexten;objmapa.criaCorpoMapa();ajaxCorpoMapa(retorno);objmapa.criaEscalaGrafica();objmapa.atualizaEscalaGrafica();objmapa.ativaListaPropriedades("listaPropriedades");YAHOO.log("Ativando os bot�es","i3geo");i3GEO.gadgets.mostraCoordenadasGEO();i3GEO.gadgets.mostraEscalaNumerica();i3GEO.gadgets.mostraBuscaRapida();i3GEO.gadgets.visual.inicia();ativaGuias();if($i("arvoreAdicionaTema"))i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,"");if($i("corpoMapa")){var i=$i("img").style;i.width=objmapa.w+"px";i.height=objmapa.h+"px";var i=$i("corpoMapa").style;i.width=objmapa.w+"px";i.height=objmapa.h+"px";i.clip='rect('+0+" "+(objmapa.w)+" "+(objmapa.h)+" "+0+')'}i3GEO.ajuda.ativaLetreiro(i3GEO.configura.locaplic,i3GEO.configura.sid);var temp=0;if($i("contemFerramentas")){temp=temp+parseInt($i("contemFerramentas").style.width)}if($i("ferramentas")){temp=temp+parseInt($i("ferramentas").style.width)}if($i("mst")){$i("mst").style.width=objmapa.w+temp+"px"}if($i("contemImg")){var i=$i("contemImg").style;i.height=objmapa.h+"px";i.width=objmapa.w+"px"}calcposf();var imagemxy=i3GEO.util.pegaPosicaoObjeto($i("corpoMapa"));if($i("barraDeBotoes1")){var x1=imagemxy[0]+40;var y1=imagemxy[1]+10}if($i("barraDeBotoes2")){var x2=imagemxy[0];var y2=imagemxy[1]+10}else{if($i("barraDeBotoes1")){var x1=imagemxy[0];var x2=imagemxy[1]+10}}if($i("barraDeBotoes1"))i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes1","i3geo_barra1",true,x1,y1);if($i("barraDeBotoes2"))i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes2","i3geo_barra2",false,x2,y2);i3GEO.barraDeBotoes.ativaBotoes();if(g_entorno=="sim"){geraURLentorno();var letras=["L","O","N","S"];for(var l=0;l<4;l++){if($i("img"+letras[l])){$i("img"+letras[l]).style.width=objmapa.w;$i("img"+letras[l]).style.height=objmapa.h;$i("img"+letras[l]).style.display="block"}}ajustaEntorno()}autoRedesenho("ativa");if($i("i3geo_escalanum")){$i("i3geo_escalanum").value=objmapa.scale}if((objmapa.geoip=="nao")&&($i("ondeestou"))){$i("ondeestou").style.display="none"}}else{alert("Erro. Impossivel criar o mapa "+retorno.data);return}var temp=g_guiaativa.split("guia");mostraguiaf(temp[1]);if(document.getElementById("ajuda")){i3GEO.ajuda.DIVAJUDA="ajuda"}var abreJM="sim";if(i3GEO.util.pegaCookie("g_janelaMen")){var abreJM=i3GEO.util.pegaCookie("g_janelaMen");if(abreJM=="sim")i3GEO.configura.iniciaJanelaMensagens=true;else i3GEO.configura.iniciaJanelaMensagens=false}if(i3GEO.configura.iniciaJanelaMensagens==true){i3GEO.ajuda.abreJanela()}if(i3GEO.configura.mapaRefDisplay!="none"){if(i3GEO.util.pegaCookie("i3GEO.configura.mapaRefDisplay")){i3GEO.configura.mapaRefDisplay=i3GEO.util.pegaCookie("i3GEO.configura.mapaRefDisplay")}if(i3GEO.configura.mapaRefDisplay=="block"){i3GEO.maparef.inicia()}}i3GEO.janela.fechaAguarde("montaMapa");if(g_docaguias=="sim"){docaguias()}if(document.getElementById("botao3d")){if(g_3dmap==""){document.getElementById("botao3d").style.display="none"}}}rebobinaf();if($i("mst"))$i("mst").style.visibility="visible";YAHOO.log("Fim objmapa.inicializa","i3geo")};this.ativaListaPropriedades=function(id){if($i(id)){i3GEO.util.arvore("<b>"+$trad("p13")+"</b>",id,i3GEO.configura.listaDePropriedadesDoMapa)}};this.criaEscalaGrafica=function(){if(($i("escalaGrafica"))&&(!$i("imagemEscalaGrafica"))){$i("escalaGrafica").innerHTML="<img class='menuarrow' src=\""+g_localimg+"/branco.gif\" title='op&ccedil;&otilde;es' onclick='opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />"}};this.atualizaEscalaGrafica=function(){if($i("escalaGrafica")){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=escalagrafica&g_sid="+i3GEO.configura.sid;cpObj.call(p,"retornaBarraEscala",ajaxEscalaGrafica)}};this.atualizaLegendaHTML=function(){if(($i("moveLegi"))||($i("legenda")&&$i(objmapa.guiaLegenda+"obj")&&$i(objmapa.guiaLegenda+"obj").style.display=="block")){YAHOO.log("Iniciando atualiza��o da legenda HTML","i3geo");var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&templateLegenda="+g_templateLegenda+"&g_sid="+i3GEO.configura.sid;cpObj.call(p,"criaLegenda",ajaxLegendaHTML)}};this.atualizaLegendaImagem=function(){if($i("legenda")){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaImagem&g_sid="+i3GEO.configura.sid;cpObj.call(p,"legendaGrafica",ajaxLegendaImagem)}};this.atualizaListaTemas=function(temas){alert("atualizaListaTemas foi depreciado. Utilize i3GEO.arvoreDeCamadas")};this.criaCorpoMapa=function(){YAHOO.log("Criando o corpo do mapa","i3geo");if($i("corpoMapa")){var ins="<table>";ins+="<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgN' /></td><td class=verdeclaro ></td></tr>";ins+="<tr><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgL' /></td><td class=verdeclaro ><input style='position:relative;top:0px;left:0px'' type=image src='' id='img' /></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgO' /></td></tr>";ins+="<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgS' /></td><td class=verdeclaro ></td></tr>";ins+="</table>";$i("corpoMapa").innerHTML=ins}var docMapa="";if(document.getElementById("openlayers")){ativaClicks($i("openlayers"))}if(document.getElementById("img")){var novoel=document.createElement("div");novoel.style.width="0px";novoel.style.height="0px";novoel.id="box1";novoel.display="none";document.body.appendChild(novoel);i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","box1",i3GEO.configura.locaplic);if(navm){$i("box1").style.filter="alpha(opacity=25)"}$i("box1").onmousemove=function(){var b=$i("box1").style;var wb=parseInt(b.width);var hb=parseInt(b.height);if(navm){if(wb>2){b.width=wb-2}if(hb>2){b.height=hb-2}}else{b.width=wb-2+"px";b.height=hb-2+"px"}};$i("box1").onmouseup=function(){zoomboxf("termina")};this.parado="nao";ativaClicks($i("img"))}this.atualizaCorpoMapa=function(){i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o1"));var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=corpo&g_sid="+i3GEO.configura.sid+"&tipoimagem="+g_tipoimagem;cpObj.call(p,"redesenhaCorpo",ajaxCorpoMapa)};if(objmapa.finaliza){eval(objmapa.finaliza)}var temp=new Array("guiaTemas","guiaMenu","guiaLegenda");var i=temp.length-1;if(i>=0){do{eval("var s = objmapa."+temp[i]+"obj");if($i(s)){var d=$i(s).style;d.style.overflow="auto";d.style.height=objmapa.h-13;d.style.width="100%"}}while(i--)}YAHOO.log("Conclu�do o corpo do mapa","i3geo")};this.verificaClickMapa=function(){YAHOO.log("Verificando clicks no mapa","i3geo");if(this.funcoesClickMapa.length>0){var f=this.funcoesClickMapa.length-1;if(f>=0){do{eval(this.funcoesClickMapa[f])}while(f--)}}if(g_funcoesClickMapaDefault.length>0){var lle=g_funcoesClickMapaDefault.length;for(var f=0;f<lle;f++){eval(g_funcoesClickMapaDefault[f])}}YAHOO.log("Fim verificando clicks no mapa","i3geo")};this.verificaMousemoveMapa=function(){if(g_funcoesMousemoveMapaDefault.length>0){var f=g_funcoesMousemoveMapaDefault.length-1;if(f>=0){do{var temp=g_funcoesMousemoveMapaDefault[f].replace("()","");if(eval('typeof '+temp)=='function')eval(g_funcoesMousemoveMapaDefault[f])}while(f--)}}};this.verificaNavegaMapa=function(){YAHOO.log("Verificando navega��o","i3geo");if(g_funcoesNavegaMapaDefault.length>0){var f=g_funcoesNavegaMapaDefault.length-1;if(f>=0){do{var temp=g_funcoesNavegaMapaDefault[f].replace("()","");if(eval('typeof '+temp)=='function')eval(g_funcoesNavegaMapaDefault[f])}while(f--)}}YAHOO.log("Conclu�do verificando navega��o","i3geo")}}
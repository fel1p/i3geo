if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.mapa={TEMASINICIAISLIGADOS:"",TEMASINICIAIS:"",AUTORESIZE:false,RESOLUCAOTIP:12,GEOXML:[],insereDobraPagina:function(tipo,imagem){var novoel=$i("i3GEOdobraPagina");if(!novoel){novoel=document.createElement("img")}novoel.src=imagem;novoel.id="i3GEOdobraPagina";if(tipo==="googlemaps"){novoel.onclick=function(evt){i3GEO.Interface.atual2gm.inicia()}}if(tipo==="openlayers"){novoel.onclick=function(evt){i3GEO.Interface.atual2ol.inicia()}}novoel.style.cursor="pointer";novoel.style.position="absolute";novoel.style.top=i3GEO.parametros.h-35+"px";novoel.style.zIndex="5000000";novoel.style.left=i3GEO.parametros.w-35+"px";$i(i3GEO.Interface.IDMAPA).appendChild(novoel);YAHOO.util.Event.addListener("i3GEOdobraPagina","click",YAHOO.util.Event.stopPropagation);YAHOO.util.Event.addListener("i3GEOdobraPagina","click",YAHOO.util.Event.preventDefault)},reposicionaDobraPagina:function(){var novoel=$i("i3GEOdobraPagina");if(!novoel){return}novoel.style.top=i3GEO.parametros.h-35+"px";novoel.style.left=i3GEO.parametros.w-35+"px"},ativaAutoResize:function(){var ativo=true;window.onresize=function(){var Dw,Dh,r=false;Dw=YAHOO.util.Dom.getViewportWidth();Dh=YAHOO.util.Dom.getViewportHeight();if(Math.abs(Dw-i3GEO.tamanhodoc[0])>50){r=true}if(Math.abs(Dh-i3GEO.tamanhodoc[1])>50){r=true}if(r===false){}i3GEO.tamanhodoc=[Dw,Dh];if(ativo===true){setTimeout(function(){i3GEO.reCalculaTamanho();i3GEO.barraDeBotoes.recria("i3geo_barra2");if(i3GEO.Interface.TABLET===true){i3GEO.guias.escondeGuias();return}if(i3GEO.guias.TIPO==="movel"){i3GEO.guias.guiaMovel.reposiciona();i3GEO.guias.guiaMovel.abreFecha("fecha")}else{i3GEO.guias.ajustaAltura()}i3GEO.mapa.reposicionaDobraPagina();ativo=true},2000)}ativo=false}},ajustaPosicao:function(elemento){if(arguments.length===0){return}var imagemxi=0,imagemyi=0,dc=$i(elemento),c;if(!dc){return}try{while((dc.offsetParent)&&(dc.offsetParent.id!=="i3geo")){dc=dc.offsetParent;imagemxi+=dc.offsetLeft;imagemyi+=dc.offsetTop}c=$i(i3GEO.Interface.IDCORPO);if(c){c.style.position="absolute";if(navm){$left(i3GEO.Interface.IDCORPO,imagemxi-1)}else{$left(i3GEO.Interface.IDCORPO,imagemxi)}$top(i3GEO.Interface.IDCORPO,imagemyi)}}catch(e){i3GEO.janela.tempoMsg("Ocorreu um erro. i3GEO.mapa.ajustaPosicao "+e)}},ativaTema:function(codigo){if(codigo){if(codigo===""){return}if(i3GEO.temaAtivo!==""){i3GEO.util.defineValor("ArvoreTituloTema"+i3GEO.temaAtivo,"style.color","")}i3GEO.temaAtivo=codigo;i3GEO.util.defineValor("ArvoreTituloTema"+codigo,"style.color","brown")}},ativaLogo:function(){if(i3GEO.Interface.ATUAL==="googlemaps"){alert($trad("x21"));return}i3GEO.php.ativalogo(i3GEO.atualiza);var cr=$i("i3GEOcopyright");if(cr){if(cr.style.display==="block"){cr.style.display="none"}else{cr.style.display="block"}}},verifica:function(retorno){try{if(retorno.data){retorno=retorno.data}if(retorno.variaveis){retorno=retorno.variaveis}if((retorno==="erro")||(typeof(retorno)==='undefined')){i3GEO.mapa.ajustaPosicao();i3GEO.janela.fechaAguarde();i3GEO.mapa.recupera.inicia()}i3GEO.mapa.recupera.TENTATIVA=0}catch(e){if(i3GEO.Interface.ATUAL==="openlayers"||i3GEO.Interface.ATUAL==="googlemaps"){i3GEO.janela.fechaAguarde();return}if(this.recupera.TENTATIVA===0){i3GEO.janela.tempoMsg("Erro no mapa. Sera feita uma tentativa de recuperacao.");i3GEO.mapa.recupera.inicia()}else{i3GEO.janela.tempoMsg("Recuperacao impossivel. Sera feita uma tentativa de reiniciar o mapa.");if(this.recupera.TENTATIVA===1){this.recupera.TENTATIVA=2;i3GEO.php.reiniciaMapa(i3GEO.atualiza)}}}},recupera:{TENTATIVA:0,inicia:function(){i3GEO.mapa.ajustaPosicao();i3GEO.janela.fechaAguarde();if(this.recupera.TENTATIVA===0){this.recupera.TENTATIVA++;this.recupera.restaura()}},restaura:function(){i3GEO.php.recuperamapa(i3GEO.atualiza)}},legendaIMAGEM:{obtem:function(funcao){i3GEO.php.criaLegendaImagem(funcao)}},compactaLayerGrafico:function(){var geos=false,geometrias=[],n=0,i,g;if(i3GEO.editorOL&&i3GEO.desenho.layergrafico&&i3GEO.desenho.layergrafico.features){geos=i3GEO.desenho.layergrafico.features;n=geos.length;for(i=0;i<n;i++){g={"atributos":geos[i].attributes,"geometria":geos[i].geometry.toString()};geometrias.push(g)}}g=YAHOO.lang.JSON.stringify(geometrias);return i3GEO.util.base64encode(g)},desCompactaLayerGrafico:function(geometrias){geometrias=YAHOO.lang.JSON.parse(geometrias);if(geometrias.length>0){var inicia=function(){i3GEO.barraDeBotoes.editor.ativaPainel();var n=geometrias.length,i;for(i=0;i<n;i++){i3GEO.editorOL.adicionaFeatureWkt(geometrias[i].geometria,geometrias[i].atributos)}$i(i3GEO.editorOL.layergrafico.id).style.zIndex=5000};i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/mashups/openlayers.js",inicia,"openlayers.js",true)}},restauraGraficos:function(graficos){if(graficos.length>0){var inicia=function(){i3GEOF.graficointerativo1.restauraGraficos(graficos)};i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/graficointerativo1/dependencias.php",inicia,"graficointerativo1",true)}},aplicaPreferencias:function(cookies){var props,nprops,i,temp=[],pint;if(!cookies){cookies=i3GEO.util.pegaDadosLocal("preferenciasDoI3Geo")}if(cookies){props=cookies.split("::");nprops=props.length;for(i=0;i<nprops;i++){try{temp=props[i].split("|");pint=parseInt(temp[1],10);if(temp[1]==='true'||temp[1]==='false'){if(temp[1]==='true'){temp[1]=true}if(temp[1]==='false'){temp[1]=false}eval(temp[0]+" = "+temp[1]+";")}else if(pint+"px"==temp[1]){eval(temp[0]+" = '"+temp[1]+"';")}else if(YAHOO.lang.isNumber(pint)){eval(temp[0]+" = "+temp[1]+";")}else{eval(temp[0]+" = '"+temp[1]+"';")}if(temp[0]=="i3GEO.configura.mapaRefDisplay"){i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay",temp[1])}}catch(e){}}}},legendaHTML:{incluiBotaoLibera:false,ID:"",CAMADASSEMLEGENDA:[],cria:function(id){if(arguments.length===0){id=""}i3GEO.mapa.legendaHTML.ID=id;if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.mapa.legendaHTML.atualiza()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.mapa.legendaHTML.atualiza()")}i3GEO.mapa.legendaHTML.atualiza()},atualiza:function(){var idleg=$i("wlegenda_corpo"),temp=function(retorno){var legenda="",ins,re,desativar,tema="",classe="";re=new RegExp();if(retorno.data!=="erro"&&retorno.data!==undefined){re=new RegExp("legendack_","g");retorno.data.legenda=retorno.data.legenda.replace(re,"liblegendack_");legenda="<div class=legendaMostraTodosTemas onclick='i3GEO.mapa.legendaHTML.mostraTodosOsTemas()' style=cursor:pointer;font-size:10px;text-align:left; >Mostra tudo</div><br>"+retorno.data.legenda}if(legenda!=""&&idleg){ins="";if(i3GEO.mapa.legendaHTML.incluiBotaoLibera===true){ins+='<div style="cursor: pointer; text-align: left; font-size: 10px; display: block; height: 35px;" onclick="i3GEO.mapa.legendaHTML.libera()"><img id="soltaLeg" src="../imagens/branco.gif" title="clique para liberar" style="margin: 5px; position: relative;"> <p style="position: relative; left: -35px; top: -22px;">'+$trad("x11")+'</p></div>'}re=new RegExp("<img src='' />","g");legenda=legenda.replace(re,"");ins+="<div id='corpoLegi' >"+legenda+"</div>";idleg.innerHTML="<div style='padding:5px;' >"+ins+"</div>"}i3GEO.mapa.legendaHTML.escondeTemasMarcados();desativar=retorno.data.desativar;for(tema in desativar){for(classe in desativar[tema]){ins=$i("liblegendack_"+tema+"_"+desativar[tema][classe]);if(ins){ins.checked=false}}}};if(idleg&&idleg.style.display==="block"){if(i3GEO.mapa.legendaHTML.ID!==""){idleg=$i(i3GEO.mapa.legendaHTML.ID);if(idleg){idleg.innerHTML=""}}idleg=$i("wlegenda_corpo");i3GEO.mapa.legendaHTML.obtem(temp)}else{if(idleg){idleg.innerHTML=""}if(i3GEO.mapa.legendaHTML.ID!==""){idleg=$i(i3GEO.mapa.legendaHTML.ID);if(idleg&&idleg.style.display==="block"){i3GEO.mapa.legendaHTML.obtem(temp)}}}},obtem:function(funcao){i3GEO.php.criaLegendaHTML(funcao,"",i3GEO.configura.templateLegenda)},ativaDesativaTema:function(inputbox){var temp=function(){i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);i3GEO.arvoreDeCamadas.atualiza("");i3GEO.janela.fechaAguarde("redesenha")};if(!inputbox.checked){i3GEO.php.ligatemas(temp,inputbox.value,"")}else{i3GEO.php.ligatemas(temp,"",inputbox.value)}},escondeTema:function(tema){var d=$i("legendaLayer_"+tema);if(d){d.style.display="none";i3GEO.mapa.legendaHTML.CAMADASSEMLEGENDA.push(tema)}},escondeTemasMarcados:function(){var temas=i3GEO.mapa.legendaHTML.CAMADASSEMLEGENDA,n=temas.length,i,temp;for(i=0;i<n;i++){temp=$i(temas[i]);if(temp){temp.style.display="none"}}},mostraTodosOsTemas:function(){i3GEO.mapa.legendaHTML.CAMADASSEMLEGENDA=[];i3GEO.mapa.legendaHTML.atualiza()},libera:function(ck,largura,altura,topo,esquerda){if(!ck){ck="nao"}if(!largura){largura=302}if(!altura){altura=300}var cabecalho,minimiza,janela,titulo;if(!$i("wlegenda")){cabecalho=function(){};minimiza=function(){var t=i3GEO.janela.minimiza("wlegenda","100px");if(t==="min"){$i("legendaTituloI").style.display="none"}else{$i("legendaTituloI").style.display="block"}};titulo="<span class='i3GEOconeFerramenta i3GEOiconeLegenda' title='"+$trad("P3")+"'></span>"+"<div id='legendaTituloI' style='display:block;' >"+$trad("p3")+"</div>";janela=i3GEO.janela.cria(largura+"px",altura+"px","","","",titulo,"wlegenda",false,"hd",cabecalho,minimiza)}else{janela=YAHOO.i3GEO.janela.manager.find("wlegenda");janela.show()}$i("wlegenda_corpo").style.backgroundColor="white";if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.mapa.legendaHTML.atualiza()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.mapa.legendaHTML.atualiza()")}i3GEO.mapa.legendaHTML.atualiza();if(topo&&esquerda){janela=YAHOO.i3GEO.janela.manager.find("wlegenda");janela.moveTo(esquerda,topo)}}},dialogo:{wkt2layer:function(wkt,texto){var temp=function(){i3GEOF.wkt2layer.iniciaJanelaFlutuante(wkt,texto)};i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.wkt2layer()","wkt2layer","wkt2layer","dependencias.php",temp)},atalhosedicao:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.atalhosedicao()","atalhosedicao","atalhosedicao","dependencias.php","i3GEOF.atalhosedicao.iniciaJanelaFlutuante()")},geolocal:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.geolocal()","geolocal","geolocal","dependencias.php","i3GEOF.geolocal.iniciaJanelaFlutuante()")},listaDeMapasBanco:function(){if(i3GEO.guias.CONFIGURA["mapas"]){var janela,divid;janela=i3GEO.janela.cria("200px","450px","","","","","i3GEOFsalvaMapaLista",false,"hd");divid=janela[2].id;i3GEO.guias.CONFIGURA["mapas"].click.call(this,divid)}else{window.open(i3GEO.configura.locaplic+"/admin/rssmapas.php","_blank")}},congelaMapa:function(){var url="",idjanela=YAHOO.util.Dom.generateId(),cabecalho=function(){},titulo,minimiza=function(){i3GEO.janela.minimiza(idjanela)};if(i3GEO.Interface.ATUAL==="openlayers"||i3GEO.Interface.ATUAL==="googlemaps"){url=i3GEO.configura.locaplic+"/ferramentas/congelamapa/openlayers.php?g_sid="+i3GEO.configura.sid+"&ext="+i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten);titulo="<span class='i3GEOconeFerramenta i3GEOiconeCongela'></span>"+"Mapa"+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=6&idajuda=123' >&nbsp;&nbsp;&nbsp;</a>";i3GEO.janela.cria("500px","350px",url,"","",titulo,idjanela,false,"hd",cabecalho,minimiza)}},metaestat:function(){var temp=function(){i3GEOF.metaestat.MULTIPARAMETROS=true;i3GEOF.metaestat.inicia()};i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.metaestat()","metaestat","metaestat","index.js",temp)},metaestatListaMapas:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.metaestatListaMapas()","metaestat","listamapas","listamapas.js","i3GEOF.listamapas.iniciaJanelaFlutuante()")},preferencias:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.preferencias()","preferencias","preferencias")},locregiao:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.locregiao()","metaestat","locregiao","locregiao.js")},filtraregiao:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.filtraregiao()","metaestat","locregiao","locregiao.js","i3GEOF.locregiao.abreComFiltro()")},animacao:function(){i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.animacao()","animacao","animacao","dependencias.php","i3GEOF.animacao.iniciaJanelaFlutuante()")},opacidade:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.opacidade()","opacidademapa","opacidademapa")},telaRemota:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.telaremota()","telaremota","telaremota")},t3d:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.t3d()","3d","t3d")},imprimir:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.imprimir()","imprimir","imprimir","dependencias.php","i3GEOF.imprimir.iniciaJanelaFlutuante()")},mostraExten:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.mostraExten()","mostraexten","mostraExten","dependencias.php","i3GEOF.mostraExten.iniciaJanelaFlutuante()")},outputformat:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.outputformat()","outputformat","outputformat","dependencias.php","i3GEOF.outputformat.iniciaJanelaFlutuante()")},autoredesenha:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.autoredesenha()","opcoes_autoredesenha","opcoesTempo","dependencias.php","i3GEOF.opcoesTempo.iniciaJanelaFlutuante()")},salvaMapa:function(){if(i3GEO.parametros===""){i3GEO.janela.tempoMsg("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.salvaMapa()","salvamapa","salvaMapa","dependencias.php","i3GEOF.salvaMapa.iniciaJanelaFlutuante()")},carregaMapa:function(){i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.carregaMapa()","carregamapa","carregaMapa","dependencias.php","i3GEOF.carregaMapa.iniciaJanelaFlutuante()")},convertews:function(){if(i3GEO.parametros.mapfile===""){i3GEO.janela.tempoMsg("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.convertews()","convertews","converteMapaWS","dependencias.php","i3GEOF.converteMapaWS.iniciaJanelaFlutuante()")},convertekml:function(){if(i3GEO.parametros.mapfile===""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.convertekml()","convertemapakml","converteMapaKml","dependencias.php","i3GEOF.converteMapaKml.iniciaJanelaFlutuante()")},queryMap:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.queryMap()","opcoes_querymap","opcoesQuery","dependencias.php","i3GEOF.opcoesQuery.iniciaJanelaFlutuante()")},template:function(){i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=1&idajuda=8' >&nbsp;&nbsp;&nbsp;</a>")},tamanho:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.tamanho()","opcoes_tamanho","opcoesTamanho","dependencias.php","i3GEOF.opcoesTamanho.iniciaJanelaFlutuante()")},tipoimagem:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.tipoimagem()","tipoimagem","tipoimagem","dependencias.php","i3GEOF.tipoimagem.iniciaJanelaFlutuante()")},corFundo:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.corFundo()","opcoes_fundo","opcoesFundo","dependencias.php","i3GEOF.opcoesFundo.iniciaJanelaFlutuante()")},opcoesEscala:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.opcoesEscala()","opcoes_escala","opcoesEscala","dependencias.php","i3GEOF.opcoesEscala.iniciaJanelaFlutuante()")},opcoesLegenda:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.opcoesLegenda()","opcoes_legenda","opcoesLegenda","dependencias.php","i3GEOF.opcoesLegenda.iniciaJanelaFlutuante()")},gradeCoord:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.gradeCoord()","gradecoord","gradeCoord","dependencias.php","i3GEOF.gradeCoord.iniciaJanelaFlutuante()")},cliqueTexto:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.cliqueTexto()","inseretxt","inseretxt","dependencias.php","i3GEOF.inseretxt.iniciaJanelaFlutuante()")},selecao:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.selecao()","selecao","selecao")},cliquePonto:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.cliquePonto()","inserexy2","inserexy","dependencias.php","i3GEOF.inserexy.iniciaJanelaFlutuante()")},cliqueGrafico:function(){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.cliqueGrafico()","inseregrafico","insereGrafico","dependencias.php","i3GEOF.insereGrafico.iniciaJanelaFlutuante()")},cliqueIdentificaDefault:function(x,y){if(objposicaocursor.imgx<70){return}if(i3GEO.barraDeBotoes.BOTAOCLICADO!=="identifica"&&i3GEO.eventos.cliquePerm.ativo===false){return}i3GEO.eventos.MOUSEPARADO.remove("verificaTip()");if(i3GEO.Interface.ATUAL==="googleearth"&&i3GEO.eventos.MOUSECLIQUE.length>1){return}if(typeof(i3GEOF.identifica)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/identifica/dependencias.php",temp=function(){if(x){i3GEOF.identifica.criaJanelaFlutuante(x,y)}else{i3GEOF.identifica.criaJanelaFlutuante(objposicaocursor.ddx,objposicaocursor.ddy)}};i3GEO.util.scriptTag(js,temp,"i3GEOF.identifica_script")}else{if(x){i3GEOF.identifica.buscaDadosTema(i3GEO.temaAtivo,x,y)}else{i3GEOF.identifica.buscaDadosTema(i3GEO.temaAtivo,objposicaocursor.ddx,objposicaocursor.ddy)}return}},verificaTipDefault:function(e){if(objposicaocursor.imgx<70){return}if(i3GEO.barraDeBotoes.BOTAOCLICADO!=="identificaBalao"&&i3GEO.eventos.cliquePerm.ativo===false){return}if(i3GEO.Interface.ATUAL==="googleearth"&&i3GEO.eventos.MOUSECLIQUE.length>1){return}var ntemas,etiquetas,j,retorna,targ="";if(!e){e=window.event}try{if(e.target){targ=e.target}else{if(e.srcElement){targ=e.srcElement}}if(targ.parentNode){container=targ.parentNode.id}}catch(erro){targ=null}ntemas=i3GEO.arvoreDeCamadas.CAMADAS.length;etiquetas=false;for(j=0;j<ntemas;j+=1){if(i3GEO.arvoreDeCamadas.CAMADAS[j].etiquetas!==""){etiquetas=true}}if(etiquetas===false){return}if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.Interface.googleearth.aguarde.visibility="visible"}retorna=function(retorno){var classeCor,pos,temp,n,i,mostra,res,temas,ntemas,titulo,tips,j,ntips,ins,r,ds,nds,s,balloon,configura=i3GEO.configura,tipotip=configura.tipotip;i=$i("i3geo_rosa");if(i){i.style.display="none"}mostra=false;retorno=retorno.data;if(retorno!==""){res="";temas=retorno;if(!temas){return}ntemas=temas.length;for(j=0;j<ntemas;j+=1){titulo=temas[j].nome;if(tipotip==="completo"||tipotip==="balao"){titulo="<span class='toolTipBalaoTitulo'><b>"+titulo+"</b></span><br>"}else{titulo=""}tips=(temas[j].resultado.tips).split(",");ntips=tips.length;ins="";ds=temas[j].resultado.dados;if(ds!==" "&&ds[0]&&ds[0]!=" "){try{nds=ds.length;classeCor="toolTipBalaoTexto";for(s=0;s<nds;s+=1){ins+="<div class='"+classeCor+"'>";for(r=0;r<ntips;r+=1){try{eval("var alias = ds[s]."+tips[r]+".alias");eval("var valor = ds[s]."+tips[r]+".valor");eval("var link = ds[s]."+tips[r]+".link");eval("var img = ds[s]."+tips[r]+".img");if(tipotip==="completo"||tipotip==="balao"){if(valor!==""&&link===""){ins+="<span>"+alias+" :"+valor+"</span><br>"}if(valor!==""&&link!==""){ins+="<span>"+alias+" : <a style='color:blue;cursor:pointer' target=_blanck href='"+link+"' >"+valor+"</a></span><br>"}if(img!==""){ins+=img+"<br>"}mostra=true}else{ins+="<span>"+valor+"</span><br>";mostra=true}}catch(e){}}if(classeCor==="toolTipBalaoTexto"){classeCor="toolTipBalaoTexto1"}else{classeCor="toolTipBalaoTexto"}ins+="</div>"}}catch(e){}}if(ins!==""){res+=titulo+ins}}if(!mostra){if($i("tip")){$i("tip").style.display="none"}}else{if(tipotip!=="balao"){n=i3GEO.janela.tip();$i(n).style.textAlign="left";$i(n).innerHTML+=res}else{if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.Interface.googleearth.balao(res,objposicaocursor.ddx,objposicaocursor.ddy);i3GEO.Interface.googleearth.aguarde.visibility="hidden"}else{hideAllTooltips();if(balloonIsVisible&&balloonIsVisible===true){return}temp=i3GEO.util.criaPin('marcaIdentifica',configura.locaplic+"/imagens/grabber.gif","12px","12px");i3GEO.janela.TIPS.remove("marcaIdentifica");i3GEO.janela.TIPS.push('marcaIdentifica');pos=i3GEO.util.posicionaImagemNoMapa("marcaIdentifica");balloon=new Balloon();BalloonConfig(balloon,'GBox');balloon.delayTime=0;res="<div style=text-align:left;overflow:auto;height:"+configura.alturatip+";width:"+configura.larguratip+"; >"+res+"</div>";if(temp[1]){balloon.showTooltip(temp[1],res,null,null,null,pos[1],pos[0]);balloon.addCloseButton();temp[1].onclick=function(e){if(!e){e=window.event}document.body.removeChild(balloon.getEventTarget(e));balloon.hideTooltip()}}}}}}if($i(i3GEO.Interface.IDMAPA)){$i(i3GEO.Interface.IDMAPA).title="";temp="identifica";if(i3GEO.Interface.ATIVAMENUCONTEXTO){temp="identifica_contexto"}i3GEO.util.mudaCursor(configura.cursores,temp,i3GEO.Interface.IDMAPA,configura.locaplic)}};xy=i3GEO.navega.centroDoMapa();i3GEO.php.identifica3(retorna,objposicaocursor.ddx,objposicaocursor.ddy,i3GEO.mapa.RESOLUCAOTIP,"tip",i3GEO.configura.locaplic,i3GEO.configura.sid,"ligados",i3GEO.parametros.mapexten)}}};
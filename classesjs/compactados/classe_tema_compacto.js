if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.tema={TEMPORIZADORESID:{},exclui:function(tema){g_operacao="excluitema";try{try{i3GEO.pluginI3geo.removeCamada(tema)}catch(r){}var p=document.getElementById("idx"+tema).parentNode.parentNode.parentNode;do{p.removeChild(p.childNodes[0])}while(p.childNodes.length>0);p.parentNode.removeChild(p);var ck=i3GEO.arvoreDeTemas.buscaCheckbox(tema);if(ck){ck.checked=false}}catch(e){}i3GEO.php.excluitema(i3GEO.atualiza,[tema]);i3GEO.mapa.ativaTema("");i3GEO.temaAtivo=""},fonte:function(tema,popup){i3GEO.mapa.ativaTema(tema);if(!popup){window.open(i3GEO.configura.locaplic+"/admin/abrefontemapfile.php?tema="+tema)}else{i3GEO.janela.cria((i3GEO.parametros.w/2)+25+"px",(i3GEO.parametros.h/2)+18+"px",i3GEO.configura.locaplic+"/admin/abrefontemapfile.php?tema="+tema,"","","Metadata","metadata"+tema)}},sobe:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.sobetema(function(retorno){i3GEO.atualiza(retorno);if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.ordenaLayers()}},tema)},desce:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.descetema(function(retorno){i3GEO.atualiza(retorno);if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.ordenaLayers()}},tema)},zoom:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.zoomtema(i3GEO.atualiza,tema)},zoomsel:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.zoomsel(i3GEO.atualiza,tema)},limpasel:function(tema){i3GEO.mapa.ativaTema(tema);g_operacao="limpasel";i3GEO.php.limpasel(function(retorno){i3GEO.atualiza(retorno);i3GEO.Interface.atualizaTema(retorno,tema)},tema)},mudatransp:function(idtema,valor){i3GEO.mapa.ativaTema(idtema);g_operacao="transparencia";if(!valor){if($i("tr"+idtema)){valor=$i("tr"+idtema).value}}if(valor!==""){i3GEO.php.mudatransp(function(retorno){i3GEO.atualiza(retorno);i3GEO.Interface.atualizaTema(retorno,idtema)},idtema,valor)}else{i3GEO.janela.tempoMsg($trad("x16"))}},invertestatuslegenda:function(idtema){i3GEO.janela.tempoMsg($trad("x17"));i3GEO.mapa.ativaTema(idtema);g_operacao="transparencia";i3GEO.php.invertestatuslegenda(function(retorno){i3GEO.atualiza(retorno);i3GEO.arvoreDeCamadas.atualiza()},idtema)},alteracorclasse:function(idtema,idclasse,rgb){i3GEO.mapa.ativaTema(idtema);i3GEO.php.aplicaCorClasseTema(temp=function(){i3GEO.atualiza();i3GEO.Interface.atualizaTema("",idtema);i3GEO.arvoreDeCamadas.atualizaLegenda(idtema)},idtema,idclasse,rgb)},mudanome:function(idtema){i3GEO.mapa.ativaTema(idtema);g_operacao="mudanome";var valor="";if($i("nn"+idtema)){valor=$i("nn"+idtema).value}if(valor!==""){i3GEO.php.mudanome(i3GEO.atualiza,idtema,valor)}else{i3GEO.janela.tempoMsg($trad("x18"))}},copia:function(idtema){i3GEO.php.copiatema(i3GEO.atualiza,idtema)},mostralegendajanela:function(idtema,nome,tipoOperacao){if(tipoOperacao==="ativatimer"){mostralegendajanelaTimer=setTimeout("i3GEO.tema.mostralegendajanela('"+idtema+"','"+nome+"','abrejanela')",4000)}if(tipoOperacao==="abrejanela"){try{clearTimeout(mostralegendajanelaTimer)}catch(e){}if(!$i("janelaLegenda"+idtema)){var janela=i3GEO.janela.cria("250px","","","","",nome,"janelaLegenda"+idtema,false);janela[2].style.textAlign="left";janela[2].style.background="white";janela[2].innerHTML=$trad("o1")}i3GEO.php.criaLegendaHTML(function(retorno){$i("janelaLegenda"+idtema+"_corpo").innerHTML=retorno.data.legenda},idtema,"legenda3.htm")}if(tipoOperacao==="desativatimer"){clearTimeout(mostralegendajanelaTimer)}},temporizador:function(idtema,tempo){if(!tempo){tempo=$i("temporizador"+idtema).value}if(tempo!=""&&parseInt(tempo,10)>0){eval('i3GEO.tema.TEMPORIZADORESID.'+idtema+' = {tempo: '+tempo+',idtemporizador: setInterval(function('+idtema+'){if(!$i("arrastar_'+idtema+'")){delete(i3GEO.tema.TEMPORIZADORESID.'+idtema+');return;}i3GEO.Interface.atualizaTema("",idtema);},parseInt('+tempo+',10)*1000)};')}else{try{window.clearInterval(i3GEO.tema.TEMPORIZADORESID[idtema].idtemporizador);delete(i3GEO.tema.TEMPORIZADORESID[idtema])}catch(e){}}},dialogo:{tme:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tme()","tme","tme")},mostraWms:function(tema){i3GEO.janela.mensagemSimples(i3GEO.configura.locaplic+"/ogc.php?tema="+tema,"WMS url")},comentario:function(tema){i3GEO.janela.cria("530px","330px",i3GEO.configura.locaplic+"/ferramentas/comentarios/index.php?tema="+tema+"&g_sid="+i3GEO.configura.sid+"&locaplic="+i3GEO.configura.locaplic,"","","<img src='"+i3GEO.configura.locaplic+"/imagens/player_volta.png' style=cursor:pointer onclick='javascript:history.go(-1)'><span style=position:relative;top:-2px; > "+$trad("x19")+" "+tema+" </span><a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=7&idajuda=68' >&nbsp;&nbsp;&nbsp;</a>","comentario"+Math.random())},cortina:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.cortina()","cortina","cortina","dependencias.php","i3GEOF.cortina.iniciaJanelaFlutuante()")},abreKml:function(tema,tipo){if(arguments.lenght===1){tipo="kml"}if(typeof(i3GEOF.converteKml)==='undefined'){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/convertekml/index.js","i3GEOF.converteKml.criaJanelaFlutuante('"+tema+"','"+tipo+"')","i3GEOF.converteKml_script")}else{i3GEOF.converteKml.criaJanelaFlutuante(tema,tipo)}},salvaMapfile:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.salvaMapfile()","salvamapfile","salvamapfile")},graficotema:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.graficotema()","graficotema","graficoTema")},toponimia:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.toponimia()","toponimia","toponimia")},filtro:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.filtro()","filtro","filtro","dependencias.php","i3GEOF.filtro.iniciaJanelaFlutuante()")},procuraratrib:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.procuraratrib()","busca","busca","dependencias.php","i3GEOF.busca.iniciaJanelaFlutuante()")},tabela:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tabela()","tabela","tabela","dependencias.php","i3GEOF.tabela.iniciaJanelaFlutuante()")},etiquetas:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.etiquetas()","etiqueta","etiqueta")},editaLegenda:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editaLegenda()","legenda","legenda")},download:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.download()","download","download")},sld:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.janela.cria("500px","350px",i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=tema2sld&tema="+idtema+"&g_sid="+i3GEO.configura.sid,"","","SLD <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=41' >&nbsp;&nbsp;&nbsp;</a>")},aplicarsld:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.aplicarsld()","aplicarsld","aplicarsld","dependencias.php","i3GEOF.aplicarsld.iniciaJanelaFlutuante()")},editorsql:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editorsql()","editorsql","editorsql","dependencias.php","i3GEOF.editorsql.iniciaJanelaFlutuante()")}}};
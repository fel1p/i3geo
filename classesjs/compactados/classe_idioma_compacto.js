if(typeof(i3GEO)==='undefined'){i3GEO=[]}i3GEO.idioma={MOSTRASELETOR:true,IDSELETOR:"",SELETORES:["pt","en","es"],DICIONARIO:g_traducao,define:function(codigo){i3GEO.idioma.ATUAL=codigo;i3GEO.util.insereCookie("i3geolingua",codigo)},retornaAtual:function(){return(i3GEO.idioma.ATUAL)},defineDicionario:function(obj){i3GEO.idioma.DICIONARIO=obj},alteraDicionario:function(id,novo){i3GEO.idioma.DICIONARIO[id][0][i3GEO.idioma.ATUAL]=novo},traduzir:function(id){if(i3GEO.idioma.DICIONARIO[id]){var t=i3GEO.idioma.DICIONARIO[id][0];return t[i3GEO.idioma.ATUAL]}else{return}},adicionaDicionario:function(novodic){for(var k in novodic){if(novodic.hasOwnProperty(k)){i3GEO.idioma.DICIONARIO[k]=novodic[k]}}},mostraDicionario:function(){var w,k;w=window.open();for(k in i3GEO.idioma.DICIONARIO){if(i3GEO.idioma.DICIONARIO.hasOwnProperty(k)){w.document.write(k+" = "+i3GEO.idioma.traduzir(k)+"<br>")}}},trocaIdioma:function(codigo){i3GEO.util.insereCookie("i3geolingua",codigo);window.location.reload(true)},listaIdiomas:function(){for(var k in i3GEO.idioma.DICIONARIO){if(i3GEO.idioma.DICIONARIO.hasOwnProperty(k)){return(i3GEO.util.listaChaves(i3GEO.idioma.DICIONARIO[k][0]))}}},mostraSeletor:function(){if(!i3GEO.idioma.MOSTRASELETOR){return}var ins,n,w,i,pos,novoel,temp,iu=i3GEO.util;ins="";n=i3GEO.idioma.SELETORES.length;if($i("i3geo")&&i3GEO.parametros.w<550){w="width:12px;"}else{w=""}for(i=0;i<n;i++){temp=i3GEO.idioma.SELETORES[i];ins+='<img  style="'+w+'padding:0 0px;top:-7px;padding-right:0px;border: 1px solid white;" src="'+iu.$im("branco.gif")+'" onclick="i3GEO.idioma.trocaIdioma(\''+temp+'\')" ';if(temp==="en"){ins+='alt="Ingles" id="uk" />'}if(temp==="pt"){ins+='alt="Portugues" id="brasil" />'}if(temp==="es"){ins+='alt="Espanhol" id="espanhol" />'}if(temp==="it"){ins+='alt="Italiano" id="italiano" />'}}if(i3GEO.idioma.IDSELETOR!==""&&$i(i3GEO.idioma.IDSELETOR)){$i(i3GEO.idioma.IDSELETOR).innerHTML=ins}else{pos=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));if(!$i("i3geoseletoridiomas")){novoel=document.createElement("div");novoel.innerHTML=ins;novoel.id="i3geoseletoridiomas";document.body.appendChild(novoel)}else{novoel=$i("i3geoseletoridiomas")}novoel.style.position="absolute";novoel.style.top=pos[1]-17+"px";novoel.style.left=pos[0]+"px";novoel.style.zIndex=5000}}};var $trad=function(id){return(i3GEO.idioma.traduzir(id))};(function(){try{var c=i3GEO.util.pegaCookie("i3geolingua");if(c){i3GEO.idioma.define(c);g_linguagem=c}else{if(typeof(g_linguagem)!=="undefined"){i3GEO.idioma.define(g_linguagem)}else{g_linguagem="pt";i3GEO.idioma.define("pt")}}if(typeof('g_traducao')!=="undefined"){i3GEO.idioma.defineDicionario(g_traducao)}}catch(e){alert("Problemas com idiomas "+e)}})();
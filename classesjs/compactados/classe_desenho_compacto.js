if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.desenho={richdraw:"",estilos:{"normal":{fillcolor:'red',linecolor:'black',linewidth:'1',circcolor:'white',textcolor:'gray'},"palido":{fillcolor:'gray',linecolor:'gray',linewidth:'1',circcolor:'gray',textcolor:'gray'},"vermelho":{fillcolor:'gray',linecolor:'red',linewidth:'1',circcolor:'pink',textcolor:'brown'},"verde":{fillcolor:'gray',linecolor:'green',linewidth:'1',circcolor:'DarkGreen',textcolor:'GreenYellow'}},estiloPadrao:"normal",criaContainerRichdraw:function(){pontosdistobj={xpt:[],ypt:[],dist:[],distV:[],xtela:[],ytela:[],ximg:[],yimg:[],linhas:[]};if(i3GEO.Interface.ATUAL==="googleearth"){return}try{var divgeo,renderer;divgeo=i3GEO.desenho.criaDivContainer();divgeo.innerHTML="";try{renderer=new VMLRenderer();i3GEO.desenho.richdraw=new RichDrawEditor(divgeo,renderer)}catch(erro){renderer=new SVGRenderer();i3GEO.desenho.richdraw=new RichDrawEditor(divgeo,renderer);renderer.svgRoot.style.width=divgeo.style.width;renderer.svgRoot.style.height=divgeo.style.height}i3GEO.desenho.definePadrao(i3GEO.desenho.estiloPadrao);i3GEO.desenho.richdraw.editCommand('mode','line');divgeo.style.display="block";i3GEO.eventos.ativa(divgeo);if($i("localizarxygeoProjxg")){var temp=function(){i3GEO.coordenadas.atualizaGeo(objposicaocursor.dmsx,objposicaocursor.dmsy,"localizarxygeoProj")};YAHOO.util.Event.addListener(divgeo,"mousemove",temp)}}catch(men){alert("Erro ao tentar criar container richdraw "+men)}},criaDivContainer:function(){desenhoUltimaLinha="";desenhoUltimaLinhaPol="";if(!$i("divGeometriasTemp")){var pos,novoel,ne;pos=[0,0];pos=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));novoel=document.createElement("div");novoel.id="divGeometriasTemp";ne=novoel.style;ne.cursor="crosshair";ne.zIndex=0;if(i3GEO.Interface.TABLET===true){ne.zIndex=5000}ne.position="absolute";ne.width=i3GEO.parametros.w+"px";ne.height=i3GEO.parametros.h+"px";ne.border="0px solid black";ne.display="none";ne.top=pos[1]+"px";ne.left=pos[0]+"px";document.body.appendChild(novoel)}return($i("divGeometriasTemp"))},aplica:function(tipo,objeto,n,texto){var dy,dx,w;if(i3GEO.desenho.richdraw&&$i(i3GEO.Interface.IDCORPO)){if((tipo==="resizeLinha")||(tipo==="resizePoligono")){try{i3GEO.desenho.richdraw.renderer.resize(objeto,0,0,objposicaocursor.imgx,objposicaocursor.imgy)}catch(erro){}}if(tipo==="insereCirculo"){dx=Math.pow(((pontosdistobj.xtela[n])*1)-((pontosdistobj.xtela[n-1])*1),2);dy=Math.pow(((pontosdistobj.ytela[n])*1)-((pontosdistobj.ytela[n-1])*1),2);w=Math.sqrt(dx+dy);i3GEO.desenho.insereCirculo(pontosdistobj.ximg[n-1],pontosdistobj.yimg[n-1],w)}if(tipo==="insereTexto"){try{i3GEO.desenho.richdraw.renderer.create('text','',i3GEO.desenho.richdraw.textColor,i3GEO.desenho.richdraw.lineWidth,pontosdistobj.ximg[n-1],pontosdistobj.yimg[n-1],"","",texto)}catch(men){}}}},insereCirculo:function(x,y,w){try{i3GEO.desenho.richdraw.renderer.create('circ','',i3GEO.desenho.richdraw.circColor,i3GEO.desenho.richdraw.lineWidth,x,y,w,w)}catch(men){}},definePadrao:function(padrao){padrao=i3GEO.desenho.estilos[padrao];i3GEO.desenho.richdraw.editCommand('fillcolor',padrao.fillcolor);i3GEO.desenho.richdraw.editCommand('linecolor',padrao.linecolor);i3GEO.desenho.richdraw.editCommand('linewidth',padrao.linewidth);i3GEO.desenho.richdraw.editCommand('circcolor',padrao.circcolor);i3GEO.desenho.richdraw.editCommand('textcolor',padrao.textcolor)},caixaEstilos:function(){var lista=i3GEO.util.listaChaves(i3GEO.desenho.estilos),n=lista.length,i,caixa,sel;caixa="<select onchange='i3GEO.desenho.definePadrao(this.value)'>";for(i=0;i<n;i+=1){sel="";if(lista[i]===i3GEO.desenho.estiloPadrao){sel="select"}caixa+="<option value='"+lista[i]+"'"+sel+">"+lista[i]+"</option>"}caixa+="</select>";return caixa}};
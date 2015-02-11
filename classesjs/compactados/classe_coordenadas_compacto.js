if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.coordenadas={formato:"bloco",padrao:"geoProj",defOrigem:"+proj=longlat +ellps=GRS67 +no_defs",config:{"geoProj":{idhtml:"localizarxy",tipo:"geo",titulo:"Geo",ativo:true,defepsg:""},"dd":{idhtml:"localizarxy",tipo:"metrica",titulo:"D&eacute;c. de grau",ativo:true,defepsg:""},"geohash":{idhtml:"localizarxy",tipo:"codigo",tipoCodigo:"geohash",titulo:"GeoHash",ativo:true},"policonicaSad69":{idhtml:"localizarxy",tipo:"metrica",titulo:"Polic SAD-69",ativo:true,defepsg:"+proj=poly +lat_0=0 +lon_0=-54 +x_0=5000000 +y_0=10000000 +ellps=aust_SA +units=m +no_defs"},"utmSad69Proj":{idhtml:"localizarxy",tipo:"utm",titulo:"UTM Sad-69",ativo:true,defepsg:"",zona:{"19N":"+proj=utm +zone=19 +ellps=aust_SA +units=m +no_defs","20N":"+proj=utm +zone=20 +ellps=aust_SA +units=m +no_defs","21N":"+proj=utm +zone=21 +ellps=aust_SA +units=m +no_defs","22N":"+proj=utm +zone=22 +ellps=aust_SA +units=m +no_defs","17S":"+proj=utm +zone=17 +south +ellps=aust_SA +units=m +no_defs","18S":"+proj=utm +zone=18 +south +ellps=aust_SA +units=m +no_defs","19S":"+proj=utm +zone=19 +south +ellps=aust_SA +units=m +no_defs","20S":"+proj=utm +zone=20 +south +ellps=aust_SA +units=m +no_defs","21S":"+proj=utm +zone=21 +south +ellps=aust_SA +units=m +no_defs","22S":"+proj=utm +zone=22 +south +ellps=aust_SA +units=m +no_defs","23S":"+proj=utm +zone=23 +south +ellps=aust_SA +units=m +no_defs","24S":"+proj=utm +zone=24 +south +ellps=aust_SA +units=m +no_defs","25S":"+proj=utm +zone=25 +south +ellps=aust_SA +units=m +no_defs"}},"utmSirgas2000Proj":{idhtml:"localizarxy",tipo:"utm",titulo:"UTM Sirgas",ativo:true,defepsg:"",zona:{"11N":"+proj=utm +zone=11 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","12N":"+proj=utm +zone=12 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","13N":"+proj=utm +zone=13 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","14N":"+proj=utm +zone=14 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","15N":"+proj=utm +zone=15 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","16N":"+proj=utm +zone=16 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","17N":"+proj=utm +zone=17 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","18N":"+proj=utm +zone=18 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","19N":"+proj=utm +zone=19 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","20N":"+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","21N":"+proj=utm +zone=21 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","22N":"+proj=utm +zone=22 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","17S":"+proj=utm +zone=17 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","18S":"+proj=utm +zone=18 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","19S":"+proj=utm +zone=19 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","20S":"+proj=utm +zone=20 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","21S":"+proj=utm +zone=21 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","22S":"+proj=utm +zone=22 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","23S":"+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","24S":"+proj=utm +zone=24 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs","25S":"+proj=utm +zone=25 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"}}},PARAMETROS:{"mostraCoordenadasUTM":{idhtml:"localizarxy"},"mostraCoordenadasGEO":{idhtml:"localizarxy"},"mostraCoordenadasGeohash":{idhtml:"localizarxy"}},MODOTEXTO:"",mostraCoordenadasGEO:function(id){try{if(arguments.length===0||id===""||typeof(id)==='undefined'){id=this.PARAMETROS.mostraCoordenadasGEO.idhtml}else{this.PARAMETROS.mostraCoordenadasGEO.idhtml=id}if($i(id)){if(!$i("coordgeotabela")){$i(id).innerHTML=i3GEO.coordenadas.criaMascaraDMS("coordgeotabela");if(i3GEO.Interface.TABLET===true){i3GEO.eventos.adicionaEventos("MOUSECLIQUE",["i3GEO.coordenadas.atualizaLocalizarGeo()"])}else{i3GEO.eventos.adicionaEventos("MOUSEMOVE",["i3GEO.coordenadas.atualizaLocalizarGeo()"])}}}}catch(e){i3GEO.janela.tempoMsg("mostraCoordenadasGeo: "+e.description)}},atualizaLocalizarGeo:function(id,x,y){if(!id){id="coordgeotabela"}if(typeof(x)==='undefined'){x=objposicaocursor.dmsx}if(typeof(y)==='undefined'){y=objposicaocursor.dmsy}var temp=$i(id);if(temp&&temp.style.display==="block"){i3GEO.coordenadas.atualizaGeo(x,y,id)}},geo2zonaUtm:function(long){long=(long*1)+180;long=long/6;return parseInt(long,10)+1},criaMascaraDMS:function(prefixo,titulo,caixa){var ins='<table class="i3GeoMascaraCoord" id='+prefixo+' ><tr>'+"<td>"+caixa+"&nbsp;</td>"+'<td style=width:10px;text-align:right >&nbsp;X:&nbsp;</td>'+'<td>'+$inputText('','',prefixo+'xg','grau','3','-00')+'</td>'+'<td>'+$inputText('','',prefixo+'xm','minuto','2','00')+'</td>'+'<td>'+$inputText('','',prefixo+'xs','segundo','5','00.00')+'</td>'+'<td>&nbsp;Y:&nbsp;'+$inputText('','',prefixo+'yg','grau','3','-00')+'</td>'+'<td>'+$inputText('','',prefixo+'ym','minuto','2','00')+'</td>'+'<td>'+$inputText('','',prefixo+'ys','segundo','5','00.00')+'</td>',temp='var '+prefixo+'xxx = i3GEO.calculo.dms2dd($i(\''+prefixo+'xg\').value,$i(\''+prefixo+'xm\').value,$i(\''+prefixo+'xs\').value);'+'var '+prefixo+'yyy = i3GEO.calculo.dms2dd($i(\''+prefixo+'yg\').value,$i(\''+prefixo+'ym\').value,$i(\''+prefixo+'ys\').value);'+'i3GEO.navega.zoomponto(i3GEO.configura.locaplic,i3GEO.configura.sid,'+prefixo+'xxx,'+prefixo+'yyy);';ins+='<td><img class=tic title=zoom onclick="'+temp+'" src="'+i3GEO.configura.locaplic+"/imagens/branco.gif"+'" /></td>'+"</tr></table>";return ins},atualizaGeo:function(dmsx,dmsy,prefixo){var x=dmsx.split(" "),y=dmsy.split(" ");if($i(prefixo+"xg")){$i(prefixo+"xg").value=x[0];$i(prefixo+"xm").value=x[1];$i(prefixo+"xs").value=x[2];$i(prefixo+"yg").value=y[0];$i(prefixo+"ym").value=y[1];$i(prefixo+"ys").value=y[2]}i3GEO.coordenadas.MODOTEXTO+="DMS - Latitude: "+y[0]+" "+y[1]+" "+y[2]+" Longitude: "+x[0]+" "+x[1]+" "+x[2]+"<br><br>"},criaMascaraMetrica:function(prefixo,titulo,caixa){var ins="<table id="+prefixo+" class='i3GeoMascaraCoord' ><tr>"+"<td>"+caixa+"&nbsp;<td>"+"<td style=width:100px;text-align:right >"+titulo+" X:&nbsp;</td>"+"<td>"+$inputText("","",prefixo+"X","X","12","00")+"&nbsp;</td>"+"<td>Y:"+$inputText("","",prefixo+"Y","Y","12","00")+"&nbsp;</td>"+"<td>Zn:"+$inputText("","",prefixo+"ZN","Zona","2","--")+"&nbsp;</td>"+"</tr></table>";return ins},criaMascaraCodigo:function(prefixo,titulo,caixa,tipoCodigo){var funcao="",ins="";if(tipoCodigo==="geohash"){funcao="i3GEO.coordenadas.geohash.zoomCodigo(\'"+prefixo+"Codigo\')"}ins="<table id="+prefixo+" class='i3GeoMascaraCoord' ><tr>"+"<td>"+caixa+"&nbsp;<td>"+"<td style=width:100px;text-align:right >"+titulo+" :&nbsp;</td>"+"<td>"+$inputText("","",prefixo+"Codigo","Cod","12","00")+"&nbsp;</td>"+'<td><img class=tic title=zoom onclick="'+funcao+'" src="'+i3GEO.configura.locaplic+"/imagens/branco.gif"+'" /></td>'+"</tr></table>";return ins},atualizaCodigo:function(onde,configProj,x,y){var ondeValor=$i(onde+configProj+"Codigo");onde=$i(onde),temp=i3GEO.coordenadas.config[configProj],codigo="";if(onde&&onde.style.display==="none"){return}if(typeof(x)==='undefined'){x=objposicaocursor.ddx}if(typeof(y)==='undefined'){y=objposicaocursor.ddy}if(temp.tipoCodigo==="geohash"){codigo=i3GEO.coordenadas.geohash.encodeGeoHash(y,x)}i3GEO.coordenadas.MODOTEXTO+=temp.titulo+" : "+codigo+"<br><br>";if(ondeValor){ondeValor.value=codigo}},atualizaProj4:function(onde,configProj,x,y){var zona,temp,p,destino="",iu=i3GEO.util;try{if(!$i(onde+configProj+"ZN")){return}}catch(e){return}temp=i3GEO.coordenadas.config[configProj];try{if($i(onde+configProj).style.display==="none"){return}}catch(men){}if(temp.tipo==="metrica"){destino=temp.defepsg}if(typeof(x)==='undefined'){x=objposicaocursor.ddx}if(typeof(y)==='undefined'){y=objposicaocursor.ddy}if(temp.tipo==="utm"){zona=i3GEO.coordenadas.geo2zonaUtm(x);$i(onde+configProj+"ZN").value=zona;if(objposicaocursor.ddy*1>0){destino=temp.zona[zona+"N"]}else{destino=temp.zona[zona+"S"]}if(typeof(destino)==='undefined'){iu.defineValor(onde+configProj+"X","value","?");iu.defineValor(onde+configProj+"Y","value","?");return}}if(temp.defepsg===""&&temp.tipo==="metrica"){p={x:x,y:y}}else{p=i3GEO.coordenadas.calculaProj4(i3GEO.coordenadas.defOrigem,destino,x,y)}iu.defineValor(onde+configProj+"X","value",p.x);iu.defineValor(onde+configProj+"Y","value",p.y);i3GEO.coordenadas.MODOTEXTO+=temp.titulo+" - X: "+p.x+" Y: "+p.y+"<br><br>"},calculaProj4:function(origem,destino,x,y){Proj4js.defs={'ORIGEM':origem,'DESTINO':destino};Proj4js.getScriptLocation=function(){return i3GEO.configura.locaplic+"/pacotes/proj4js/lib/"};var source=new Proj4js.Proj("ORIGEM"),dest=new Proj4js.Proj("DESTINO"),p=new Proj4js.Point(x,y);Proj4js.transform(source,dest,p);return p},ativaBloco:function(prefixo){var tipos=i3GEO.util.listaChaves(i3GEO.coordenadas.config),n=tipos.length,temp,i=0;for(i=0;i<n;i++){temp=i3GEO.coordenadas.config[tipos[i]];if(temp.ativo===true){if(tipos[i]===this.padrao){$i(prefixo+tipos[i]).style.display="block"}else{$i(prefixo+tipos[i]).style.display="none"}}}},mudaTipo:function(obj,onde){if(obj.value==="janela"){this.formato="janela";this.mostraCoordenadas();return}this.padrao=obj.value;obj.selectedIndex=0;i3GEO.coordenadas.ativaBloco(onde)},mostraCoordenadas:function(ativaMovimento,onde,x,y){try{var tipos=i3GEO.util.listaChaves(i3GEO.coordenadas.config),n=tipos.length,temp,ins="",i=0,caixa,janela,nomeFunc;i3GEO.coordenadas.MODOTEXTO="";if(arguments.length===0){ativaMovimento=true;onde=""}if(onde===""){onde=i3GEO.coordenadas.config[tipos[0]].idhtml}caixa="<select onchange='javascript:i3GEO.coordenadas.mudaTipo(this,\""+onde+"\");' class='i3geoCoordenadasComboTipo' ><option>---</option><option value='janela' >janela</option>";for(i=0;i<n;i+=1){temp=i3GEO.coordenadas.config[tipos[i]];if(temp.ativo===true){caixa+="<option value='"+tipos[i]+"'>"+temp.titulo+"</option>"}}caixa+="</select>";if(i3GEO.coordenadas.formato!=="bloco"){caixa=""}for(i=0;i<n;i+=1){temp=i3GEO.coordenadas.config[tipos[i]];if(temp.ativo===true){if(temp.tipo==="geo"){ins+=i3GEO.coordenadas.criaMascaraDMS(onde+tipos[i],temp.titulo,caixa);if(i3GEO.coordenadas.formato==="separado"){try{$i(temp.idhtml).innerHTML=ins}catch(e){}ins=""}}else{if(temp.tipo==="codigo"){ins+=i3GEO.coordenadas.criaMascaraCodigo(onde+tipos[i],temp.titulo,caixa,temp.tipoCodigo)}else{ins+=i3GEO.coordenadas.criaMascaraMetrica(onde+tipos[i],temp.titulo,caixa)}}}}if(this.formato==="janela"){janela=i3GEO.janela.cria("450px","120px","","","",$trad("x49"),"i3GEOJanelaCoordenadas",false,"hd","","");YAHOO.util.Event.addListener(janela[0].close,"click",function(){i3GEO.coordenadas.formato="bloco",i3GEO.coordenadas.mostraCoordenadas()});temp=$i("i3GEOJanelaCoordenadas_corpo");temp.style.backgroundColor="white";temp.style.textAlign="left";temp=$i("i3GEOJanelaCoordenadas");temp.onmouseover="";temp.onmouseout="";if($i(onde)){$i(onde).innerHTML=""}onde="i3GEOJanelaCoordenadas_corpo";ins+="<br><a href='#' style='cursor:pointer;color:blue' onclick='new YAHOO.util.KeyListener(document.body,{alt:true,keys:67},{fn: function(type, args, obj){i3GEO.janela.tempoMsg(i3GEO.coordenadas.MODOTEXTO);}}).enable();' >"+"Clique aqui para ativar Alt+C para poder capturar as coordenadas</a>"}if(onde!==""&&$i(onde)){$i(onde).innerHTML=ins}for(i=0;i<n;i+=1){temp=i3GEO.coordenadas.config[tipos[i]];if(temp.ativo===true){if(temp.tipo==="geo"){if(ativaMovimento===true){if(i3GEO.Interface.TABLET===true){i3GEO.eventos.adicionaEventos("MOUSECLIQUE",["i3GEO.coordenadas.atualizaLocalizarGeo('"+onde+tipos[i]+"')"])}else{i3GEO.eventos.adicionaEventos("MOUSEMOVE",["i3GEO.coordenadas.atualizaLocalizarGeo('"+onde+tipos[i]+"')"])}}if(typeof(x)!=='undefined'){i3GEO.coordenadas.atualizaLocalizarGeo(onde+tipos[i],i3GEO.calculo.dd2dms(x)[0],i3GEO.calculo.dd2dms(y)[0])}}else{nomeFunc="i3GEO.coordenadas.atualizaProj4";if(temp.tipo==="codigo"){nomeFunc="i3GEO.coordenadas.atualizaCodigo"}if(ativaMovimento===true){if(i3GEO.Interface.TABLET===true){i3GEO.eventos.adicionaEventos("MOUSECLIQUE",[nomeFunc+"('"+onde+"','"+tipos[i]+"')"])}else{i3GEO.eventos.adicionaEventos("MOUSEMOVE",[nomeFunc+"('"+onde+"','"+tipos[i]+"')"])}}if(typeof(x)!=='undefined'){eval(nomeFunc+"(onde,tipos[i],x,y);")}}}}if(ativaMovimento===true){if(i3GEO.Interface.TABLET===true){i3GEO.eventos.adicionaEventos("MOUSECLIQUE",["i3GEO.coordenadas.limpaModoTexto()"])}else{i3GEO.eventos.adicionaEventos("MOUSEMOVE",["i3GEO.coordenadas.limpaModoTexto()"])}}if(i3GEO.coordenadas.formato==="bloco"){i3GEO.coordenadas.ativaBloco(onde)}}catch(men){}},limpaModoTexto:function(){i3GEO.coordenadas.MODOTEXTO=""},geohash:{BITS:[16,8,4,2,1],BASE32:"0123456789bcdefghjkmnpqrstuvwxyz",refine_interval:function(interval,cd,mask){if(cd&mask)interval[0]=(interval[0]+interval[1])/2;else interval[1]=(interval[0]+interval[1])/2},decodeGeoHash:function(geohash){var is_even=1,lat=[],lon=[],i,j,x,y;lat[0]=-90.0;lat[1]=90.0;lon[0]=-180.0;lon[1]=180.0;lat_err=90.0;lon_err=180.0;for(i=0;i<geohash.length;i++){c=geohash[i];cd=i3GEO.coordenadas.geohash.BASE32.indexOf(c);for(j=0;j<5;j++){mask=i3GEO.coordenadas.geohash.BITS[j];if(is_even){lon_err/=2;i3GEO.coordenadas.geohash.refine_interval(lon,cd,mask)}else{lat_err/=2;i3GEO.coordenadas.geohash.refine_interval(lat,cd,mask)}is_even=!is_even}}lat[2]=(lat[0]+lat[1])/2;lon[2]=(lon[0]+lon[1])/2;y=(lat[0]+lat[1])/2;x=(lon[0]+lon[1])/2;return{latitude:y,longitude:x}},encodeGeoHash:function(latitude,longitude){var is_even=1,lat=[],lon=[],bit=0,ch=0,precision=12,geohash="";lat[0]=-90.0;lat[1]=90.0;lon[0]=-180.0;lon[1]=180.0;while(geohash.length<precision){if(is_even){mid=(lon[0]+lon[1])/2;if(longitude>mid){ch|=i3GEO.coordenadas.geohash.BITS[bit];lon[0]=mid}else lon[1]=mid}else{mid=(lat[0]+lat[1])/2;if(latitude>mid){ch|=i3GEO.coordenadas.geohash.BITS[bit];lat[0]=mid}else lat[1]=mid}is_even=!is_even;if(bit<4)bit++;else{geohash+=i3GEO.coordenadas.geohash.BASE32[ch];bit=0;ch=0}}return geohash},zoomCodigo:function(idobj){var codigo;if($i(idobj)){codigo=$i(idobj).value}else{codigo=idobj}codigo=i3GEO.coordenadas.geohash.decodeGeoHash(codigo);i3GEO.navega.zoomponto(i3GEO.configura.locaplic,i3GEO.configura.sid,codigo.longitude,codigo.latitude)}}};
if(typeof(i3GEO)==='undefined'){i3GEO=[]}i3GEO.calculo={metododistancia:"vicenty",dms2dd:function(cd,cm,cs){try{var sinal,spm,mpg,dd;sinal='positivo';if(cd<0){cd=cd*-1;sinal='negativo'}spm=cs/3600;mpg=cm/60;dd=(cd*1)+(mpg*1)+(spm*1);if(sinal==='negativo'){dd=dd*-1}return(dd)}catch(e){return(0)}},dd2tela:function(vx,vy,docmapa,ext,cellsize){try{var pos,xyn,dc,imgext,c,xy;if(i3GEO.Interface.ATUAL==="googlemaps"&&docmapa.id!=="mapaReferencia"){pos=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));xyn=i3GeoMapOverlay.getProjection().fromLatLngToContainerPixel(new google.maps.LatLng(vy,vx));xy=[];return[(xyn.x)+pos[0],(xyn.y)+pos[1]]}if(i3GEO.Interface.ATUAL==="openlayers"&&docmapa.id!=="mapaReferencia"){pos=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));xy=i3geoOL.getViewPortPxFromLonLat(new OpenLayers.LonLat(vx,vy));return[(xy.x)+pos[0],(xy.y)+pos[1]]}if(arguments.length===3){ext=i3GEO.parametros.mapexten;cellsize=i3GEO.parametros.pixelsize}if(arguments.length===4){cellsize=i3GEO.parametros.pixelsize}if(!docmapa){docmapa=window.document}dc=docmapa;pos=i3GEO.util.pegaPosicaoObjeto(dc);imgext=ext.split(" ");vx=(vx*1)-(imgext[0]*1);vy=(vy*-1)+(imgext[3]*1);c=cellsize*1;return[(vx/c)+pos[0],(vy/c)+pos[1]]}catch(e){return([])}},dd2dms:function(x,y){var restod=0,sx="00.00",sy="00.00",mx,mm,restos,my,s,dx,dy;dx=parseInt(x,10);if(dx>0){restod=x-dx}if(dx<0){restod=(x*-1)-(dx*-1)}if(restod!==0){mm=restod*60;mx=parseInt(restod*60,10);restos=mm-mx;if(restos!==0){s=restos*60;s=(s+"_").substring(0,5);sx=s}}else{mx="00";sx="00.00"}dy=parseInt(y,10);if(dy>0){restod=y-dy}if(dy<0){restod=(y*-1)-(dy*-1)}if(restod!==0){mm=restod*60;my=parseInt(restod*60,10);restos=mm-my;if(restos!==0){s=restos*60;s=(s+"_").substring(0,5);sy=s}}else{my="00";sy="00.00"}return[dx+" "+mx+" "+sx,dy+" "+my+" "+sy]},tela2dd:function(xfign,yfign,g_celula,imgext,idorigem){try{var amext,longdd,latdd;if(i3GEO.Interface.ATUAL==="googlemaps"&&arguments.length===4){amext=i3GeoMapOverlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point(xfign,yfign));return[amext.lng(),amext.lat()]}if(i3GEO.Interface.ATUAL==="openlayers"&&arguments.length===4){amext=i3geoOL.getLonLatFromPixel(new OpenLayers.Pixel(xfign,yfign));return[amext.lon,amext.lat]}if(navm){xfign=xfign-2.2;yfign=yfign-2.7}else{xfign=xfign-0.12;yfign=yfign-1.05}amext=imgext.split(" ");longdd=(amext[0]*1)+(g_celula*xfign);latdd=(amext[3]*1)-(g_celula*yfign);return[longdd,latdd]}catch(e){return(0)}},area:function(pontos,pixel){var $polygon_area,$i,$array_length;try{if(pontos.xpt.length>2){$array_length=pontos.xpt.length;pontos.xtela.push(pontos.xtela[0]);pontos.ytela.push(pontos.ytela[0]);$polygon_area=0;for($i=0;$i<$array_length;$i+=1){$polygon_area+=((pontos.xtela[$i]*pontos.ytela[$i+1])-(pontos.ytela[$i]*pontos.xtela[$i+1]))}$polygon_area=Math.abs($polygon_area)/2}else{$polygon_area=0}return $polygon_area*pixel}catch(e){return(0)}},distancia:function(lon1,lat1,lon2,lat2){if(i3GEO.calculo.metododistancia==="haversine"){return i3GEO.calculo.distHaversine(lon1,lat1,lon2,lat2)}if(i3GEO.calculo.metododistancia==="vicenty"){return i3GEO.calculo.distVincenty(lon1,lat1,lon2,lat2)}},distHaversine:function(lon1,lat1,lon2,lat2){var dLat,dLon,a,c,d;dLat=((lat2-lat1))*Math.PI/180;dLon=((lon2-lon1))*Math.PI/180;a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));d=6378.137*c;return d},distVincenty:function(lon1,lat1,lon2,lat2){var rad=function(x){return x*Math.PI/180},ct={a:6378137,b:6356752.3142,f:1/298.257223563},p1={lat:lat1,lon:lon1},p2={lat:lat2,lon:lon2},a=ct.a,b=ct.b,f=ct.f,L=rad(p2.lon-p1.lon),U1=Math.atan((1-f)*Math.tan(rad(p1.lat))),U2=Math.atan((1-f)*Math.tan(rad(p2.lat))),sinU1=Math.sin(U1),cosU1=Math.cos(U1),sinU2=Math.sin(U2),cosU2=Math.cos(U2),lambda=L,lambdaP=2*Math.PI,iterLimit=20,sinLambda,cosLambda,sinSigma=0,cosSigma=0,sigma=0,alpha,cosSqAlpha=0,cos2SigmaM=0,C,uSq,A,B,s,d,deltaSigma;while(Math.abs(lambda-lambdaP)>1e-12&&--iterLimit>0){sinLambda=Math.sin(lambda);cosLambda=Math.cos(lambda);sinSigma=Math.sqrt((cosU2*sinLambda)*(cosU2*sinLambda)+(cosU1*sinU2-sinU1*cosU2*cosLambda)*(cosU1*sinU2-sinU1*cosU2*cosLambda));if(sinSigma===0){return 0}cosSigma=sinU1*sinU2+cosU1*cosU2*cosLambda;sigma=Math.atan2(sinSigma,cosSigma);alpha=Math.asin(cosU1*cosU2*sinLambda/sinSigma);cosSqAlpha=Math.cos(alpha)*Math.cos(alpha);cos2SigmaM=cosSigma-2*sinU1*sinU2/cosSqAlpha;C=f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));lambdaP=lambda;lambda=L+(1-C)*f*Math.sin(alpha)*(sigma+C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)))}if(iterLimit===0){return NaN}uSq=cosSqAlpha*(a*a-b*b)/(b*b);A=1+uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));B=uSq/1024*(256+uSq*(-128+uSq*(74-47*uSq)));deltaSigma=B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));s=b*A*(sigma-deltaSigma);d=s.toFixed(3)/1000;return d},direcao:function(lon1,lat1,lon2,lat2){var dLon,y,x,r;lat1=lat1*(Math.PI/180);lat2=lat2*(Math.PI/180);dLon=(lon2-lon1)*(Math.PI/180);y=Math.sin(dLon)*Math.cos(lat2);x=Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);r=Math.atan2(y,x);r=r*180/Math.PI;r=r+360;return r%360},destinoDD:function(lon,lat,d,direcao){var R,lat1,lon1,brng,lat2,lon2;R=6371;lat1=lat*(Math.PI/180);lon1=lon*(Math.PI/180);brng=direcao*(Math.PI/180);lat2=Math.asin(Math.sin(lat1)*Math.cos(d/R)+Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng));lon2=lon1+Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1),Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));lon2=(lon2+Math.PI)%(2*Math.PI)-Math.PI;if(isNaN(lat2)||isNaN(lon2)){return null}return[(lon2*180/Math.PI),(lat2*180/Math.PI)]},rect2ext:function(idrect,mapext,pixel){var bx,bxs,xfig,yfig,nx,ny,pos,amext,dy,x1,y1,x2,y2,pix=parseInt(document.getElementById(idrect).style.left,10),piy=parseInt(document.getElementById(idrect).style.top,10);if($i(idrect)){bx=$i(idrect);bxs=bx.style}else{alert("Box nao encontrado");return}pos=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));xfig=pix+(parseInt(bxs.width,10))-pos[0];yfig=piy+(parseInt(bxs.height,10))-pos[1];amext=mapext.split(" ");dy=((amext[1]*1)-(amext[3]*1))/-1;if(dy<0){dy=dy*-1}nx=pixel*xfig;ny=pixel*yfig;x1=(amext[0]*1)+nx;y1=(amext[3]*1)-ny;xfig=pix-pos[0];yfig=piy-pos[1];if(dy<0){dy=dy*-1}nx=pixel*xfig;ny=pixel*yfig;x2=(amext[0]*1)+nx;y2=(amext[3]*1)-ny;return[x2+" "+y2+" "+x1+" "+y1,x1,y1,x2,y2]},ext2rect:function(idrect,mapext,boxext,pixel,documento){var rectbox,xyMin,xyMax,w,h,tl,pos,t,l,d,box;rectbox=boxext.split(" ");xyMin=i3GEO.calculo.dd2tela(rectbox[0],rectbox[1],documento,boxext,pixel);xyMax=i3GEO.calculo.dd2tela(rectbox[2],rectbox[3],documento,boxext,pixel);w=xyMax[0]-xyMin[0];h=xyMin[1]-xyMax[1];tl=i3GEO.calculo.dd2tela(rectbox[0],rectbox[3],documento,mapext,pixel);pos=i3GEO.util.pegaPosicaoObjeto(documento);t=tl[1]-pos[1];l=tl[0]-pos[0];d="block";if($i(idrect)){box=$i(idrect);box.style.width=w+"px";box.style.height=h+"px";box.style.top=t+"px";box.style.left=l+"px";box.style.display=d}return[w,h,xyMax[1],xyMin[0]]}};
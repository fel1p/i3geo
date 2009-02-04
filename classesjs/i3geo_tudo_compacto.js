$i = function(id){return document.getElementById(id);};
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){for(var D=0;D<C.length;D=D+1){var H=C[D],G=E[H];if(A.isFunction(G)&&G!=Object.prototype[H]){F[H]=G;}}}:function(){},extend:function(H,I,G){if(!I||!H){throw new Error("extend failed, please check that "+"all dependencies are included.");}var E=function(){};E.prototype=I.prototype;H.prototype=new E();H.prototype.constructor=H;H.superclass=I.prototype;if(I.prototype.constructor==Object.prototype.constructor){I.prototype.constructor=I;}if(G){for(var D in G){if(A.hasOwnProperty(G,D)){H.prototype[D]=G[D];}}A._IEEnumFix(H.prototype,G);}},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}A._IEEnumFix(H,G);}},augmentProto:function(G,F){if(!F||!G){throw new Error("Augment failed, verify dependencies.");}var D=[G.prototype,F.prototype];for(var E=2;E<arguments.length;E=E+1){D.push(arguments[E]);}A.augmentObject.apply(this,D);},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},substitute:function(S,E,L){var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";for(;;){I=S.lastIndexOf(D);if(I<0){break;}H=S.indexOf(Q,I);if(I+1>=H){break;}F=S.substring(I+1,H);O=F;R=null;G=O.indexOf(M);if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}P=E[O];if(L){P=L(O,P,R);}if(A.isObject(P)){if(A.isArray(P)){P=A.dump(P,parseInt(R,10));}else{R=R||"";var K=R.indexOf(J);if(K>-1){R=R.substring(4);}if(P.toString===Object.prototype.toString||K>-1){P=A.dump(P,parseInt(R,10));}else{P=P.toString();}}}else{if(!A.isString(P)&&!A.isNumber(P)){P="~-"+N.length+"-~";N[N.length]=F;}}S=S.substring(0,I)+P+S.substring(H+1);}for(I=N.length-1;I>=0;I=I-1){S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");}return S;},trim:function(D){try{return D.replace(/^\s+|\s+$/g,"");}catch(E){return D;}},merge:function(){var G={},E=arguments;for(var F=0,D=E.length;F<D;F=F+1){A.augmentObject(G,E[F],true);}return G;},later:function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=G,I,D;if(A.isString(L)){F=E[L];}if(!F){throw new TypeError("method undefined");}if(!A.isArray(J)){J=[G];}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){for(var D=0;D<C.length;D=D+1){var H=C[D],G=E[H];if(A.isFunction(G)&&G!=Object.prototype[H]){F[H]=G;}}}:function(){},extend:function(H,I,G){if(!I||!H){throw new Error("extend failed, please check that "+"all dependencies are included.");}var E=function(){};E.prototype=I.prototype;H.prototype=new E();H.prototype.constructor=H;H.superclass=I.prototype;if(I.prototype.constructor==Object.prototype.constructor){I.prototype.constructor=I;}if(G){for(var D in G){if(A.hasOwnProperty(G,D)){H.prototype[D]=G[D];}}A._IEEnumFix(H.prototype,G);}},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}A._IEEnumFix(H,G);}},augmentProto:function(G,F){if(!F||!G){throw new Error("Augment failed, verify dependencies.");}var D=[G.prototype,F.prototype];for(var E=2;E<arguments.length;E=E+1){D.push(arguments[E]);}A.augmentObject.apply(this,D);},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},substitute:function(S,E,L){var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";for(;;){I=S.lastIndexOf(D);if(I<0){break;}H=S.indexOf(Q,I);if(I+1>=H){break;}F=S.substring(I+1,H);O=F;R=null;G=O.indexOf(M);if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}P=E[O];if(L){P=L(O,P,R);}if(A.isObject(P)){if(A.isArray(P)){P=A.dump(P,parseInt(R,10));}else{R=R||"";var K=R.indexOf(J);if(K>-1){R=R.substring(4);}if(P.toString===Object.prototype.toString||K>-1){P=A.dump(P,parseInt(R,10));}else{P=P.toString();}}}else{if(!A.isString(P)&&!A.isNumber(P)){P="~-"+N.length+"-~";N[N.length]=F;}}S=S.substring(0,I)+P+S.substring(H+1);}for(I=N.length-1;I>=0;I=I-1){S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");}return S;},trim:function(D){try{return D.replace(/^\s+|\s+$/g,"");}catch(E){return D;}},merge:function(){var G={},E=arguments;for(var F=0,D=E.length;F<D;F=F+1){A.augmentObject(G,E[F],true);}return G;},later:function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=G,I,D;if(A.isString(L)){F=E[L];}if(!F){throw new TypeError("method undefined");}if(!A.isArray(J)){J=[G];}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.5.2",build:"1076"});(function(){var B=YAHOO.util,K,I,J={},F={},M=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var N=function(P){if(!E.HYPHEN.test(P)){return P;}if(J[P]){return J[P];}var Q=P;while(E.HYPHEN.exec(Q)){Q=Q.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[P]=Q;return Q;};var O=function(Q){var P=F[Q];if(!P){P=new RegExp("(?:^|\\s+)"+Q+"(?:\\s+|$)");F[Q]=P;}return P;};if(M.defaultView&&M.defaultView.getComputedStyle){K=function(P,S){var R=null;if(S=="float"){S="cssFloat";}var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){R=Q[N(S)];}return P.style[S]||R;};}else{if(M.documentElement.currentStyle&&G){K=function(P,R){switch(N(R)){case"opacity":var T=100;try{T=P.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(S){try{T=P.filters("alpha").opacity;}catch(S){}}return T/100;case"float":R="styleFloat";default:var Q=P.currentStyle?P.currentStyle[R]:null;return(P.style[R]||Q);}};}else{K=function(P,Q){return P.style[Q];};}}if(G){I=function(P,Q,R){switch(Q){case"opacity":if(YAHOO.lang.isString(P.style.filter)){P.style.filter="alpha(opacity="+R*100+")";if(!P.currentStyle||!P.currentStyle.hasLayout){P.style.zoom=1;}}break;case"float":Q="styleFloat";default:P.style[Q]=R;}};}else{I=function(P,Q,R){if(Q=="float"){Q="cssFloat";}P.style[Q]=R;};}var D=function(P,Q){return P&&P.nodeType==1&&(!Q||Q(P));};YAHOO.util.Dom={get:function(R){if(R&&(R.nodeType||R.item)){return R;}if(YAHOO.lang.isString(R)||!R){return M.getElementById(R);}if(R.length!==undefined){var S=[];for(var Q=0,P=R.length;Q<P;++Q){S[S.length]=B.Dom.get(R[Q]);}return S;}return R;},getStyle:function(P,R){R=N(R);var Q=function(S){return K(S,R);};return B.Dom.batch(P,Q,B.Dom,true);},setStyle:function(P,R,S){R=N(R);var Q=function(T){I(T,R,S);};B.Dom.batch(P,Q,B.Dom,true);},getXY:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}return H(R);};return B.Dom.batch(P,Q,B.Dom,true);},getX:function(P){var Q=function(R){return B.Dom.getXY(R)[0];};return B.Dom.batch(P,Q,B.Dom,true);},getY:function(P){var Q=function(R){return B.Dom.getXY(R)[1];};return B.Dom.batch(P,Q,B.Dom,true);},setXY:function(P,S,R){var Q=function(V){var U=this.getStyle(V,"position");if(U=="static"){this.setStyle(V,"position","relative");U="relative";}var X=this.getXY(V);if(X===false){return false;}var W=[parseInt(this.getStyle(V,"left"),10),parseInt(this.getStyle(V,"top"),10)];if(isNaN(W[0])){W[0]=(U=="relative")?0:V.offsetLeft;}if(isNaN(W[1])){W[1]=(U=="relative")?0:V.offsetTop;}if(S[0]!==null){V.style.left=S[0]-X[0]+W[0]+"px";}if(S[1]!==null){V.style.top=S[1]-X[1]+W[1]+"px";}if(!R){var T=this.getXY(V);if((S[0]!==null&&T[0]!=S[0])||(S[1]!==null&&T[1]!=S[1])){this.setXY(V,S,true);}}};B.Dom.batch(P,Q,B.Dom,true);},setX:function(Q,P){B.Dom.setXY(Q,[P,null]);},setY:function(P,Q){B.Dom.setXY(P,[null,Q]);},getRegion:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}var S=B.Region.getRegion(R);return S;};return B.Dom.batch(P,Q,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(T,X,U,V){X=X||"*";U=(U)?B.Dom.get(U):null||M;if(!U){return[];}var Q=[],P=U.getElementsByTagName(X),W=O(T);for(var R=0,S=P.length;R<S;++R){if(W.test(P[R].className)){Q[Q.length]=P[R];if(V){V.call(P[R],P[R]);}}}return Q;},hasClass:function(R,Q){var P=O(Q);var S=function(T){return P.test(T.className);};return B.Dom.batch(R,S,B.Dom,true);},addClass:function(Q,P){var R=function(S){if(this.hasClass(S,P)){return false;}S.className=YAHOO.lang.trim([S.className,P].join(" "));return true;};return B.Dom.batch(Q,R,B.Dom,true);},removeClass:function(R,Q){var P=O(Q);var S=function(T){if(!Q||!this.hasClass(T,Q)){return false;}var U=T.className;T.className=U.replace(P," ");if(this.hasClass(T,Q)){this.removeClass(T,Q);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},replaceClass:function(S,Q,P){if(!P||Q===P){return false;}var R=O(Q);var T=function(U){if(!this.hasClass(U,Q)){this.addClass(U,P);return true;}U.className=U.className.replace(R," "+P+" ");if(this.hasClass(U,Q)){this.replaceClass(U,Q,P);}U.className=YAHOO.lang.trim(U.className);return true;};return B.Dom.batch(S,T,B.Dom,true);},generateId:function(P,R){R=R||"yui-gen";var Q=function(S){if(S&&S.id){return S.id;}var T=R+YAHOO.env._id_counter++;if(S){S.id=T;}return T;};return B.Dom.batch(P,Q,B.Dom,true)||Q.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);Q=B.Dom.get(Q);if(!P||!Q){return false;}if(P.contains&&Q.nodeType&&!L){return P.contains(Q);}else{if(P.compareDocumentPosition&&Q.nodeType){return !!(P.compareDocumentPosition(Q)&16);}else{if(Q.nodeType){return !!this.getAncestorBy(Q,function(R){return R==P;});}}}return false;},inDocument:function(P){return this.isAncestor(M.documentElement,P);},getElementsBy:function(W,Q,R,T){Q=Q||"*";R=(R)?B.Dom.get(R):null||M;if(!R){return[];}var S=[],V=R.getElementsByTagName(Q);for(var U=0,P=V.length;U<P;++U){if(W(V[U])){S[S.length]=V[U];if(T){T(V[U]);}}}return S;},batch:function(T,W,V,R){T=(T&&(T.tagName||T.item))?T:B.Dom.get(T);if(!T||!W){return false;}var S=(R)?V:window;if(T.tagName||T.length===undefined){return W.call(S,T,V);}var U=[];for(var Q=0,P=T.length;Q<P;++Q){U[U.length]=W.call(S,T[Q],V);}return U;},getDocumentHeight:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollHeight:M.documentElement.scrollHeight;var P=Math.max(Q,B.Dom.getViewportHeight());return P;},getDocumentWidth:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollWidth:M.documentElement.scrollWidth;var P=Math.max(Q,B.Dom.getViewportWidth());return P;},getViewportHeight:function(){var P=self.innerHeight;
var Q=M.compatMode;if((Q||G)&&!C){P=(Q=="CSS1Compat")?M.documentElement.clientHeight:M.body.clientHeight;}return P;},getViewportWidth:function(){var P=self.innerWidth;var Q=M.compatMode;if(Q||G){P=(Q=="CSS1Compat")?M.documentElement.clientWidth:M.body.clientWidth;}return P;},getAncestorBy:function(P,Q){while(P=P.parentNode){if(D(P,Q)){return P;}}return null;},getAncestorByClassName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return B.Dom.hasClass(S,P);};return B.Dom.getAncestorBy(Q,R);},getAncestorByTagName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return S.tagName&&S.tagName.toUpperCase()==P.toUpperCase();};return B.Dom.getAncestorBy(Q,R);},getPreviousSiblingBy:function(P,Q){while(P){P=P.previousSibling;if(D(P,Q)){return P;}}return null;},getPreviousSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getPreviousSiblingBy(P);},getNextSiblingBy:function(P,Q){while(P){P=P.nextSibling;if(D(P,Q)){return P;}}return null;},getNextSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getNextSiblingBy(P);},getFirstChildBy:function(P,R){var Q=(D(P.firstChild,R))?P.firstChild:null;return Q||B.Dom.getNextSiblingBy(P.firstChild,R);},getFirstChild:function(P,Q){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getFirstChildBy(P);},getLastChildBy:function(P,R){if(!P){return null;}var Q=(D(P.lastChild,R))?P.lastChild:null;return Q||B.Dom.getPreviousSiblingBy(P.lastChild,R);},getLastChild:function(P){P=B.Dom.get(P);return B.Dom.getLastChildBy(P);},getChildrenBy:function(Q,S){var R=B.Dom.getFirstChildBy(Q,S);var P=R?[R]:[];B.Dom.getNextSiblingBy(R,function(T){if(!S||S(T)){P[P.length]=T;}return false;});return P;},getChildren:function(P){P=B.Dom.get(P);if(!P){}return B.Dom.getChildrenBy(P);},getDocumentScrollLeft:function(P){P=P||M;return Math.max(P.documentElement.scrollLeft,P.body.scrollLeft);},getDocumentScrollTop:function(P){P=P||M;return Math.max(P.documentElement.scrollTop,P.body.scrollTop);},insertBefore:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}return P.parentNode.insertBefore(Q,P);},insertAfter:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}if(P.nextSibling){return P.parentNode.insertBefore(Q,P.nextSibling);}else{return P.parentNode.appendChild(Q);}},getClientRegion:function(){var R=B.Dom.getDocumentScrollTop(),Q=B.Dom.getDocumentScrollLeft(),S=B.Dom.getViewportWidth()+Q,P=B.Dom.getViewportHeight()+R;return new B.Region(R,S,P,Q);}};var H=function(){if(M.documentElement.getBoundingClientRect){return function(Q){var R=Q.getBoundingClientRect();var P=Q.ownerDocument;return[R.left+B.Dom.getDocumentScrollLeft(P),R.top+B.Dom.getDocumentScrollTop(P)];};}else{return function(R){var S=[R.offsetLeft,R.offsetTop];var Q=R.offsetParent;var P=(L&&B.Dom.getStyle(R,"position")=="absolute"&&R.offsetParent==R.ownerDocument.body);if(Q!=R){while(Q){S[0]+=Q.offsetLeft;S[1]+=Q.offsetTop;if(!P&&L&&B.Dom.getStyle(Q,"position")=="absolute"){P=true;}Q=Q.offsetParent;}}if(P){S[0]-=R.ownerDocument.body.offsetLeft;S[1]-=R.ownerDocument.body.offsetTop;}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(Q.scrollTop||Q.scrollLeft){if(!E.OP_SCROLL.test(B.Dom.getStyle(Q,"display"))){if(!C||B.Dom.getStyle(Q,"overflow")!=="visible"){S[0]-=Q.scrollLeft;S[1]-=Q.scrollTop;}}}Q=Q.parentNode;}return S;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.2",build:"1076"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){for(var A=this.subscribers.length-1;A>-1;A--){this._delete(A);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var K=this;var L=function(){K._tryPreloadAttach();};this._interval=setInterval(L,this.POLL_INTERVAL);}},onAvailable:function(P,M,Q,O,N){var K=(YAHOO.lang.isString(P))?[P]:P;for(var L=0;L<K.length;L=L+1){F.push({id:K[L],fn:M,obj:Q,override:O,checkReady:N});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(M,K,N,L){this.onAvailable(M,K,N,L,true);},onDOMReady:function(K,M,L){if(this.DOMReady){setTimeout(function(){var N=window;if(L){if(L===true){N=M;}else{N=L;}}K.call(N,"DOMReady",[],M);},0);}else{this.DOMReadyEvent.subscribe(K,M,L);}},addListener:function(M,K,V,Q,L){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var R=0,T=M.length;R<T;++R){W=this.on(M[R],K,V,Q,L)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var P=this.getEl(M);if(P){M=P;}else{this.onAvailable(M,function(){YAHOO.util.Event.on(M,K,V,Q,L);});return true;}}}if(!M){return false;}if("unload"==K&&Q!==this){J[J.length]=[M,K,V,Q,L];return true;}var Y=M;if(L){if(L===true){Y=Q;}else{Y=L;}}var N=function(Z){return V.call(Y,YAHOO.util.Event.getEvent(Z,M),Q);};var X=[M,K,V,N,Y,Q,L];var S=I.length;I[S]=X;if(this.useLegacyEvent(M,K)){var O=this.getLegacyIndex(M,K);if(O==-1||M!=G[O][0]){O=G.length;B[M.id+K]=O;G[O]=[M,K,M["on"+K]];E[O]=[];M["on"+K]=function(Z){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(Z),O);};}E[O].push(X);}else{try{this._simpleAdd(M,K,N,false);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}}return true;},fireLegacyEvent:function(O,M){var Q=true,K,S,R,T,P;S=E[M].slice();for(var L=0,N=S.length;L<N;++L){R=S[L];if(R&&R[this.WFN]){T=R[this.ADJ_SCOPE];P=R[this.WFN].call(T,O);Q=(Q&&P);}}K=G[M];if(K&&K[2]){K[2](O);}return Q;},getLegacyIndex:function(L,M){var K=this.generateId(L)+M;if(typeof B[K]=="undefined"){return -1;}else{return B[K];}},useLegacyEvent:function(L,M){if(this.webkit&&("click"==M||"dblclick"==M)){var K=parseInt(this.webkit,10);if(!isNaN(K)&&K<418){return true;}}return false;},removeListener:function(L,K,T){var O,R,V;if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var U=true;for(O=L.length-1;O>-1;O--){U=(this.removeListener(L[O],K,T)&&U);}return U;}}if(!T||!T.call){return this.purgeElement(L,false,K);}if("unload"==K){for(O=J.length-1;O>-1;O--){V=J[O];if(V&&V[0]==L&&V[1]==K&&V[2]==T){J.splice(O,1);return true;}}return false;}var P=null;var Q=arguments[3];if("undefined"===typeof Q){Q=this._getCacheIndex(L,K,T);}if(Q>=0){P=I[Q];}if(!L||!P){return false;}if(this.useLegacyEvent(L,K)){var N=this.getLegacyIndex(L,K);var M=E[N];if(M){for(O=0,R=M.length;O<R;++O){V=M[O];if(V&&V[this.EL]==L&&V[this.TYPE]==K&&V[this.FN]==T){M.splice(O,1);break;}}}}else{try{this._simpleRemove(L,K,P[this.WFN],false);}catch(S){this.lastError=S;return false;}}delete I[Q][this.WFN];delete I[Q][this.FN];I.splice(Q,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;
},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;if(!K){if(L.type=="mouseout"){K=L.toElement;}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in D)){K=D[K];}return K;},_getCacheIndex:function(O,P,N){for(var M=0,L=I.length;M<L;M=M+1){var K=I[M];if(K&&K[this.FN]==N&&K[this.EL]==O&&K[this.TYPE]==P){return M;}}return -1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+A;++A;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(L){if(!H){H=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;clearInterval(this._interval);this._interval=null;return ;}if(this.locked){return ;}if(this.isIE){if(!this.DOMReady){this.startInterval();return ;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0&&F.length>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=F.length;L<K;L=L+1){O=F[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(H||N.nextSibling||!Q){M.push(O);F[L]=null;}}else{R(N,O);F[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}C--;if(Q){for(L=F.length-1;L>-1;L--){O=F[L];if(!O||!O.id){F.splice(L,1);}}this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[I,J];}else{if(K==="unload"){L=[J];}else{L=[I];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(Q){var K=YAHOO.util.Event,N,M,L,P,O,R=J.slice();for(N=0,P=J.length;N<P;++N){L=R[N];if(L){var S=window;if(L[K.ADJ_SCOPE]){if(L[K.ADJ_SCOPE]===true){S=L[K.UNLOAD_OBJ];}else{S=L[K.ADJ_SCOPE];}}L[K.FN].call(S,K.getEvent(Q,L[K.EL]),L[K.UNLOAD_OBJ]);R[N]=null;L=null;S=null;}}J=null;if(I){for(M=I.length-1;M>-1;M--){L=I[M];if(L){K.removeListener(L[K.EL],L[K.TYPE],L[K.FN],M);}}L=null;}G=null;K._simpleRemove(window,"unload",K._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;
if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(J,I){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){var G;if(F.keys instanceof Array){for(var H=0;H<F.keys.length;H++){G=F.keys[H];if(G==J.charCode){D.fire(J.charCode,J);break;}else{if(G==J.keyCode){D.fire(J.keyCode,J);break;}}}}else{G=F.keys;if(G==J.charCode){D.fire(J.charCode,J);}else{if(G==J.keyCode){D.fire(J.keyCode,J);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.5.2",build:"1076"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.5.2", build: "1076"});

/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){var B=YAHOO.util,K,I,J={},F={},M=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var N=function(P){if(!E.HYPHEN.test(P)){return P;}if(J[P]){return J[P];}var Q=P;while(E.HYPHEN.exec(Q)){Q=Q.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[P]=Q;return Q;};var O=function(Q){var P=F[Q];if(!P){P=new RegExp("(?:^|\\s+)"+Q+"(?:\\s+|$)");F[Q]=P;}return P;};if(M.defaultView&&M.defaultView.getComputedStyle){K=function(P,S){var R=null;if(S=="float"){S="cssFloat";}var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){R=Q[N(S)];}return P.style[S]||R;};}else{if(M.documentElement.currentStyle&&G){K=function(P,R){switch(N(R)){case"opacity":var T=100;try{T=P.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(S){try{T=P.filters("alpha").opacity;}catch(S){}}return T/100;case"float":R="styleFloat";default:var Q=P.currentStyle?P.currentStyle[R]:null;return(P.style[R]||Q);}};}else{K=function(P,Q){return P.style[Q];};}}if(G){I=function(P,Q,R){switch(Q){case"opacity":if(YAHOO.lang.isString(P.style.filter)){P.style.filter="alpha(opacity="+R*100+")";if(!P.currentStyle||!P.currentStyle.hasLayout){P.style.zoom=1;}}break;case"float":Q="styleFloat";default:P.style[Q]=R;}};}else{I=function(P,Q,R){if(Q=="float"){Q="cssFloat";}P.style[Q]=R;};}var D=function(P,Q){return P&&P.nodeType==1&&(!Q||Q(P));};YAHOO.util.Dom={get:function(R){if(R&&(R.nodeType||R.item)){return R;}if(YAHOO.lang.isString(R)||!R){return M.getElementById(R);}if(R.length!==undefined){var S=[];for(var Q=0,P=R.length;Q<P;++Q){S[S.length]=B.Dom.get(R[Q]);}return S;}return R;},getStyle:function(P,R){R=N(R);var Q=function(S){return K(S,R);};return B.Dom.batch(P,Q,B.Dom,true);},setStyle:function(P,R,S){R=N(R);var Q=function(T){I(T,R,S);};B.Dom.batch(P,Q,B.Dom,true);},getXY:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}return H(R);};return B.Dom.batch(P,Q,B.Dom,true);},getX:function(P){var Q=function(R){return B.Dom.getXY(R)[0];};return B.Dom.batch(P,Q,B.Dom,true);},getY:function(P){var Q=function(R){return B.Dom.getXY(R)[1];};return B.Dom.batch(P,Q,B.Dom,true);},setXY:function(P,S,R){var Q=function(V){var U=this.getStyle(V,"position");if(U=="static"){this.setStyle(V,"position","relative");U="relative";}var X=this.getXY(V);if(X===false){return false;}var W=[parseInt(this.getStyle(V,"left"),10),parseInt(this.getStyle(V,"top"),10)];if(isNaN(W[0])){W[0]=(U=="relative")?0:V.offsetLeft;}if(isNaN(W[1])){W[1]=(U=="relative")?0:V.offsetTop;}if(S[0]!==null){V.style.left=S[0]-X[0]+W[0]+"px";}if(S[1]!==null){V.style.top=S[1]-X[1]+W[1]+"px";}if(!R){var T=this.getXY(V);if((S[0]!==null&&T[0]!=S[0])||(S[1]!==null&&T[1]!=S[1])){this.setXY(V,S,true);}}};B.Dom.batch(P,Q,B.Dom,true);},setX:function(Q,P){B.Dom.setXY(Q,[P,null]);},setY:function(P,Q){B.Dom.setXY(P,[null,Q]);},getRegion:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}var S=B.Region.getRegion(R);return S;};return B.Dom.batch(P,Q,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(T,X,U,V){X=X||"*";U=(U)?B.Dom.get(U):null||M;if(!U){return[];}var Q=[],P=U.getElementsByTagName(X),W=O(T);for(var R=0,S=P.length;R<S;++R){if(W.test(P[R].className)){Q[Q.length]=P[R];if(V){V.call(P[R],P[R]);}}}return Q;},hasClass:function(R,Q){var P=O(Q);var S=function(T){return P.test(T.className);};return B.Dom.batch(R,S,B.Dom,true);},addClass:function(Q,P){var R=function(S){if(this.hasClass(S,P)){return false;}S.className=YAHOO.lang.trim([S.className,P].join(" "));return true;};return B.Dom.batch(Q,R,B.Dom,true);},removeClass:function(R,Q){var P=O(Q);var S=function(T){if(!Q||!this.hasClass(T,Q)){return false;}var U=T.className;T.className=U.replace(P," ");if(this.hasClass(T,Q)){this.removeClass(T,Q);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},replaceClass:function(S,Q,P){if(!P||Q===P){return false;}var R=O(Q);var T=function(U){if(!this.hasClass(U,Q)){this.addClass(U,P);return true;}U.className=U.className.replace(R," "+P+" ");if(this.hasClass(U,Q)){this.replaceClass(U,Q,P);}U.className=YAHOO.lang.trim(U.className);return true;};return B.Dom.batch(S,T,B.Dom,true);},generateId:function(P,R){R=R||"yui-gen";var Q=function(S){if(S&&S.id){return S.id;}var T=R+YAHOO.env._id_counter++;if(S){S.id=T;}return T;};return B.Dom.batch(P,Q,B.Dom,true)||Q.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);Q=B.Dom.get(Q);if(!P||!Q){return false;}if(P.contains&&Q.nodeType&&!L){return P.contains(Q);}else{if(P.compareDocumentPosition&&Q.nodeType){return !!(P.compareDocumentPosition(Q)&16);}else{if(Q.nodeType){return !!this.getAncestorBy(Q,function(R){return R==P;});}}}return false;},inDocument:function(P){return this.isAncestor(M.documentElement,P);},getElementsBy:function(W,Q,R,T){Q=Q||"*";R=(R)?B.Dom.get(R):null||M;if(!R){return[];}var S=[],V=R.getElementsByTagName(Q);for(var U=0,P=V.length;U<P;++U){if(W(V[U])){S[S.length]=V[U];if(T){T(V[U]);}}}return S;},batch:function(T,W,V,R){T=(T&&(T.tagName||T.item))?T:B.Dom.get(T);if(!T||!W){return false;}var S=(R)?V:window;if(T.tagName||T.length===undefined){return W.call(S,T,V);}var U=[];for(var Q=0,P=T.length;Q<P;++Q){U[U.length]=W.call(S,T[Q],V);}return U;},getDocumentHeight:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollHeight:M.documentElement.scrollHeight;var P=Math.max(Q,B.Dom.getViewportHeight());return P;},getDocumentWidth:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollWidth:M.documentElement.scrollWidth;var P=Math.max(Q,B.Dom.getViewportWidth());return P;},getViewportHeight:function(){var P=self.innerHeight;
var Q=M.compatMode;if((Q||G)&&!C){P=(Q=="CSS1Compat")?M.documentElement.clientHeight:M.body.clientHeight;}return P;},getViewportWidth:function(){var P=self.innerWidth;var Q=M.compatMode;if(Q||G){P=(Q=="CSS1Compat")?M.documentElement.clientWidth:M.body.clientWidth;}return P;},getAncestorBy:function(P,Q){while(P=P.parentNode){if(D(P,Q)){return P;}}return null;},getAncestorByClassName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return B.Dom.hasClass(S,P);};return B.Dom.getAncestorBy(Q,R);},getAncestorByTagName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return S.tagName&&S.tagName.toUpperCase()==P.toUpperCase();};return B.Dom.getAncestorBy(Q,R);},getPreviousSiblingBy:function(P,Q){while(P){P=P.previousSibling;if(D(P,Q)){return P;}}return null;},getPreviousSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getPreviousSiblingBy(P);},getNextSiblingBy:function(P,Q){while(P){P=P.nextSibling;if(D(P,Q)){return P;}}return null;},getNextSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getNextSiblingBy(P);},getFirstChildBy:function(P,R){var Q=(D(P.firstChild,R))?P.firstChild:null;return Q||B.Dom.getNextSiblingBy(P.firstChild,R);},getFirstChild:function(P,Q){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getFirstChildBy(P);},getLastChildBy:function(P,R){if(!P){return null;}var Q=(D(P.lastChild,R))?P.lastChild:null;return Q||B.Dom.getPreviousSiblingBy(P.lastChild,R);},getLastChild:function(P){P=B.Dom.get(P);return B.Dom.getLastChildBy(P);},getChildrenBy:function(Q,S){var R=B.Dom.getFirstChildBy(Q,S);var P=R?[R]:[];B.Dom.getNextSiblingBy(R,function(T){if(!S||S(T)){P[P.length]=T;}return false;});return P;},getChildren:function(P){P=B.Dom.get(P);if(!P){}return B.Dom.getChildrenBy(P);},getDocumentScrollLeft:function(P){P=P||M;return Math.max(P.documentElement.scrollLeft,P.body.scrollLeft);},getDocumentScrollTop:function(P){P=P||M;return Math.max(P.documentElement.scrollTop,P.body.scrollTop);},insertBefore:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}return P.parentNode.insertBefore(Q,P);},insertAfter:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}if(P.nextSibling){return P.parentNode.insertBefore(Q,P.nextSibling);}else{return P.parentNode.appendChild(Q);}},getClientRegion:function(){var R=B.Dom.getDocumentScrollTop(),Q=B.Dom.getDocumentScrollLeft(),S=B.Dom.getViewportWidth()+Q,P=B.Dom.getViewportHeight()+R;return new B.Region(R,S,P,Q);}};var H=function(){if(M.documentElement.getBoundingClientRect){return function(Q){var R=Q.getBoundingClientRect();var P=Q.ownerDocument;return[R.left+B.Dom.getDocumentScrollLeft(P),R.top+B.Dom.getDocumentScrollTop(P)];};}else{return function(R){var S=[R.offsetLeft,R.offsetTop];var Q=R.offsetParent;var P=(L&&B.Dom.getStyle(R,"position")=="absolute"&&R.offsetParent==R.ownerDocument.body);if(Q!=R){while(Q){S[0]+=Q.offsetLeft;S[1]+=Q.offsetTop;if(!P&&L&&B.Dom.getStyle(Q,"position")=="absolute"){P=true;}Q=Q.offsetParent;}}if(P){S[0]-=R.ownerDocument.body.offsetLeft;S[1]-=R.ownerDocument.body.offsetTop;}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(Q.scrollTop||Q.scrollLeft){if(!E.OP_SCROLL.test(B.Dom.getStyle(Q,"display"))){if(!C||B.Dom.getStyle(Q,"overflow")!=="visible"){S[0]-=Q.scrollLeft;S[1]-=Q.scrollTop;}}}Q=Q.parentNode;}return S;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F,E;for(F in this.config){E=this.config[F];if(E&&E.event){D[F]=E.value;}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(D,G){var F,E;if(G){E={};for(F in D){if(B.hasOwnProperty(D,F)){E[F.toLowerCase()]=D[F];}}this.initialConfig=E;}for(F in D){if(B.hasOwnProperty(D,F)){this.queueProperty(F,D[F]);}}},refresh:function(){var D;for(D in this.config){this.refireEvent(D);}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(E,F,H,D){var G=this.config[E.toLowerCase()];if(G&&G.event){if(!A.alreadySubscribed(G.event,F,H)){G.event.subscribe(F,H,D);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(Q,P){if(Q){this.init(Q,P);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,M=YAHOO.util.Event,L=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,H,O,N,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},I={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.textResizeEvent=new L("textResize");function K(){if(!H){H=document.createElement("div");H.innerHTML=('<div class="'+G.CSS_HEADER+'"></div>'+'<div class="'+G.CSS_BODY+'"></div><div class="'+G.CSS_FOOTER+'"></div>');O=H.firstChild;N=O.nextSibling;E=N.nextSibling;}return H;}function J(){if(!O){K();}return(O.cloneNode(false));}function B(){if(!N){K();}return(N.cloneNode(false));}function C(){if(!E){K();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var P=L.LIST;this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=P;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=P;this.appendEvent=this.createEvent(A.APPEND);
this.appendEvent.signature=P;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=P;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=P;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=P;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=P;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=P;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=P;this.destroyEvent=this.createEvent(A.DESTORY);this.destroyEvent.signature=P;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=P;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=P;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=P;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=P;},platform:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("windows")!=-1||P.indexOf("win32")!=-1){return"windows";}else{if(P.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("opera")!=-1){return"opera";}else{if(P.indexOf("msie 7")!=-1){return"ie7";}else{if(P.indexOf("msie")!=-1){return"ie";}else{if(P.indexOf("safari")!=-1){return"safari";}else{if(P.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(I.VISIBLE.key,{handler:this.configVisible,value:I.VISIBLE.value,validator:I.VISIBLE.validator});this.cfg.addProperty(I.EFFECT.key,{suppressEvent:I.EFFECT.suppressEvent,supercedes:I.EFFECT.supercedes});this.cfg.addProperty(I.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:I.MONITOR_RESIZE.value});this.cfg.addProperty(I.APPEND_TO_DOCUMENT_BODY.key,{value:I.APPEND_TO_DOCUMENT_BODY.value});},init:function(U,T){var R,V;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof U=="string"){R=U;U=document.getElementById(U);if(!U){U=(K()).cloneNode(false);U.id=R;}}this.element=U;if(U.id){this.id=U.id;}V=this.element.firstChild;if(V){var Q=false,P=false,S=false;do{if(1==V.nodeType){if(!Q&&F.hasClass(V,G.CSS_HEADER)){this.header=V;Q=true;}else{if(!P&&F.hasClass(V,G.CSS_BODY)){this.body=V;P=true;}else{if(!S&&F.hasClass(V,G.CSS_FOOTER)){this.footer=V;S=true;}}}}}while((V=V.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(T){this.cfg.applyConfig(T,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var Q=(YAHOO.env.ua.gecko&&this.platform=="windows");if(Q){var P=this;setTimeout(function(){P._initResizeMonitor();},0);}else{this._initResizeMonitor();}},_initResizeMonitor:function(){var P,R,T;function V(){G.textResizeEvent.fire();}if(!YAHOO.env.ua.opera){R=F.get("_yuiResizeMonitor");var U=this._supportsCWResize();if(!R){R=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){R.src=G.RESIZE_MONITOR_SECURE_URL;}if(!U){T=["<html><head><script ",'type="text/javascript">',"window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","/script></head>","<body></body></html>"].join("");R.src="data:text/html;charset=utf-8,"+encodeURIComponent(T);}R.id="_yuiResizeMonitor";R.style.position="absolute";R.style.visibility="hidden";var Q=document.body,S=Q.firstChild;if(S){Q.insertBefore(R,S);}else{Q.appendChild(R);}R.style.width="10em";R.style.height="10em";R.style.top=(-1*R.offsetHeight)+"px";R.style.left=(-1*R.offsetWidth)+"px";R.style.borderWidth="0";R.style.visibility="visible";if(YAHOO.env.ua.webkit){P=R.contentWindow.document;P.open();P.close();}}if(R&&R.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(U){if(!M.on(R.contentWindow,"resize",V)){M.on(R,"resize",V);}}G.textResizeInitialized=true;}this.resizeMonitor=R;}}},_supportsCWResize:function(){var P=true;if(YAHOO.env.ua.gecko&&YAHOO.env.ua.gecko<=1.8){P=false;}return P;},onDomResize:function(S,R){var Q=-1*this.resizeMonitor.offsetWidth,P=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=P+"px";this.resizeMonitor.style.left=Q+"px";},setHeader:function(Q){var P=this.header||(this.header=J());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},appendToHeader:function(Q){var P=this.header||(this.header=J());P.appendChild(Q);this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},setBody:function(Q){var P=this.body||(this.body=B());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},appendToBody:function(Q){var P=this.body||(this.body=B());P.appendChild(Q);this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},setFooter:function(Q){var P=this.footer||(this.footer=C());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},appendToFooter:function(Q){var P=this.footer||(this.footer=C());P.appendChild(Q);this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},render:function(R,P){var S=this,T;function Q(U){if(typeof U=="string"){U=document.getElementById(U);}if(U){S._addToParent(U,S.element);S.appendEvent.fire();}}this.beforeRenderEvent.fire();if(!P){P=this.element;}if(R){Q(R);}else{if(!F.inDocument(this.element)){return false;}}if(this.header&&!F.inDocument(this.header)){T=P.firstChild;if(T){P.insertBefore(this.header,T);}else{P.appendChild(this.header);}}if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){P.insertBefore(this.body,this.footer);
}else{P.appendChild(this.body);}}if(this.footer&&!F.inDocument(this.footer)){P.appendChild(this.footer);}this.renderEvent.fire();return true;},destroy:function(){var P,Q;if(this.element){M.purgeElement(this.element,true);P=this.element.parentNode;}if(P){P.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(Q in this){if(Q instanceof L){Q.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(Q,P,R){var S=P[0];if(S){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(R,Q,S){var P=Q[0];if(P){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(P,Q){if(!this.cfg.getProperty("appendtodocumentbody")&&P===document.body&&P.firstChild){P.insertBefore(Q,P.firstChild);}else{P.appendChild(Q);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(L,K){YAHOO.widget.Overlay.superclass.constructor.call(this,L,K);};var F=YAHOO.lang,I=YAHOO.util.CustomEvent,E=YAHOO.widget.Module,J=YAHOO.util.Event,D=YAHOO.util.Dom,C=YAHOO.util.Config,B=YAHOO.widget.Overlay,G,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},H={"X":{key:"x",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:F.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:F.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:F.isBoolean,supercedes:["zindex"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.VIEWPORT_OFFSET=10;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.CSS_OVERLAY="yui-overlay";B.windowScrollEvent=new I("windowScroll");B.windowResizeEvent=new I("windowResize");B.windowScrollHandler=function(K){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}};B.windowResizeHandler=function(K){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){J.on(window,"scroll",B.windowScrollHandler);J.on(window,"resize",B.windowResizeHandler);B._initialized=true;}YAHOO.extend(B,E,{init:function(L,K){B.superclass.init.call(this,L);this.beforeInitEvent.fire(B);D.addClass(this.element,B.CSS_OVERLAY);if(K){this.cfg.applyConfig(K,true);}if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!C.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!C.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var K=I.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=K;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=K;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.X.key,{handler:this.configX,validator:H.X.validator,suppressEvent:H.X.suppressEvent,supercedes:H.X.supercedes});this.cfg.addProperty(H.Y.key,{handler:this.configY,validator:H.Y.validator,suppressEvent:H.Y.suppressEvent,supercedes:H.Y.supercedes});this.cfg.addProperty(H.XY.key,{handler:this.configXY,suppressEvent:H.XY.suppressEvent,supercedes:H.XY.supercedes});this.cfg.addProperty(H.CONTEXT.key,{handler:this.configContext,suppressEvent:H.CONTEXT.suppressEvent,supercedes:H.CONTEXT.supercedes});this.cfg.addProperty(H.FIXED_CENTER.key,{handler:this.configFixedCenter,value:H.FIXED_CENTER.value,validator:H.FIXED_CENTER.validator,supercedes:H.FIXED_CENTER.supercedes});this.cfg.addProperty(H.WIDTH.key,{handler:this.configWidth,suppressEvent:H.WIDTH.suppressEvent,supercedes:H.WIDTH.supercedes});this.cfg.addProperty(H.HEIGHT.key,{handler:this.configHeight,suppressEvent:H.HEIGHT.suppressEvent,supercedes:H.HEIGHT.supercedes});this.cfg.addProperty(H.ZINDEX.key,{handler:this.configzIndex,value:H.ZINDEX.value});this.cfg.addProperty(H.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:H.CONSTRAIN_TO_VIEWPORT.value,validator:H.CONSTRAIN_TO_VIEWPORT.validator,supercedes:H.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(H.IFRAME.key,{handler:this.configIframe,value:H.IFRAME.value,validator:H.IFRAME.validator,supercedes:H.IFRAME.supercedes});},moveTo:function(K,L){this.cfg.setProperty("xy",[K,L]);},hideMacGeckoScrollbars:function(){D.removeClass(this.element,"show-scrollbars");D.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){D.removeClass(this.element,"hide-scrollbars");D.addClass(this.element,"show-scrollbars");},configVisible:function(N,K,T){var M=K[0],O=D.getStyle(this.element,"visibility"),U=this.cfg.getProperty("effect"),R=[],Q=(this.platform=="mac"&&YAHOO.env.ua.gecko),b=C.alreadySubscribed,S,L,a,Y,X,W,Z,V,P;
if(O=="inherit"){a=this.element.parentNode;while(a.nodeType!=9&&a.nodeType!=11){O=D.getStyle(a,"visibility");if(O!="inherit"){break;}a=a.parentNode;}if(O=="inherit"){O="visible";}}if(U){if(U instanceof Array){V=U.length;for(Y=0;Y<V;Y++){S=U[Y];R[R.length]=S.effect(this,S.duration);}}else{R[R.length]=U.effect(this,U.duration);}}if(M){if(Q){this.showMacGeckoScrollbars();}if(U){if(M){if(O!="visible"||O===""){this.beforeShowEvent.fire();P=R.length;for(X=0;X<P;X++){L=R[X];if(X===0&&!b(L.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){L.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}L.animateIn();}}}}else{if(O!="visible"||O===""){this.beforeShowEvent.fire();D.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(Q){this.hideMacGeckoScrollbars();}if(U){if(O=="visible"){this.beforeHideEvent.fire();P=R.length;for(W=0;W<P;W++){Z=R[W];if(W===0&&!b(Z.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){Z.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}Z.animateOut();}}else{if(O===""){D.setStyle(this.element,"visibility","hidden");}}}else{if(O=="visible"||O===""){this.beforeHideEvent.fire();D.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(O,M,P){var Q=M[0],L=C.alreadySubscribed,N=B.windowResizeEvent,K=B.windowScrollEvent;if(Q){this.center();if(!L(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}if(!L(N,this.doCenterOnDOMEvent,this)){N.subscribe(this.doCenterOnDOMEvent,this,true);}if(!L(K,this.doCenterOnDOMEvent,this)){K.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);N.unsubscribe(this.doCenterOnDOMEvent,this);K.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(N,L,O){var K=L[0],M=this.element;D.setStyle(M,"height",K);this.cfg.refireEvent("iframe");},configWidth:function(N,K,O){var M=K[0],L=this.element;D.setStyle(L,"width",M);this.cfg.refireEvent("iframe");},configzIndex:function(M,K,N){var O=K[0],L=this.element;if(!O){O=D.getStyle(L,"zIndex");if(!O||isNaN(O)){O=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(O<=0){O=1;}}D.setStyle(L,"zIndex",O);this.cfg.setProperty("zIndex",O,true);if(this.iframe){this.stackIframe();}},configXY:function(M,L,N){var P=L[0],K=P[0],O=P[1];this.cfg.setProperty("x",K);this.cfg.setProperty("y",O);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configX:function(M,L,N){var K=L[0],O=this.cfg.getProperty("y");this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setX(this.element,K,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configY:function(M,L,N){var K=this.cfg.getProperty("x"),O=L[0];this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setY(this.element,O,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},showIframe:function(){var L=this.iframe,K;if(L){K=this.element.parentNode;if(K!=L.parentNode){this._addToParent(K,L);}L.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var K=this.iframe,M=this.element,O=B.IFRAME_OFFSET,L=(O*2),N;if(K){K.style.width=(M.offsetWidth+L+"px");K.style.height=(M.offsetHeight+L+"px");N=this.cfg.getProperty("xy");if(!F.isArray(N)||(isNaN(N[0])||isNaN(N[1]))){this.syncPosition();N=this.cfg.getProperty("xy");}D.setXY(K,[(N[0]-O),(N[1]-O)]);}},stackIframe:function(){if(this.iframe){var K=D.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(K)&&!isNaN(K)){D.setStyle(this.iframe,"zIndex",(K-1));}}},configIframe:function(N,M,O){var K=M[0];function P(){var R=this.iframe,S=this.element,T;if(!R){if(!G){G=document.createElement("iframe");if(this.isSecure){G.src=B.IFRAME_SRC;}if(YAHOO.env.ua.ie){G.style.filter="alpha(opacity=0)";G.frameBorder=0;}else{G.style.opacity="0";}G.style.position="absolute";G.style.border="none";G.style.margin="0";G.style.padding="0";G.style.display="none";}R=G.cloneNode(false);T=S.parentNode;var Q=T||document.body;this._addToParent(Q,R);this.iframe=R;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function L(){P.call(this);this.beforeShowEvent.unsubscribe(L);this._iframeDeferred=false;}if(K){if(this.cfg.getProperty("visible")){P.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(L);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},_primeXYFromDOM:function(){if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){this.syncPosition();this.cfg.refireEvent("xy");this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);}},configConstrainToViewport:function(L,K,M){var N=K[0];if(N){if(!C.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}if(!C.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){this.beforeShowEvent.subscribe(this._primeXYFromDOM);}}else{this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(M,L,O){var Q=L[0],N,P,K;if(Q){N=Q[0];P=Q[1];
K=Q[2];if(N){if(typeof N=="string"){this.cfg.setProperty("context",[document.getElementById(N),P,K],true);}if(P&&K){this.align(P,K);}}}},align:function(L,K){var Q=this.cfg.getProperty("context"),P=this,O,N,R;function M(S,T){switch(L){case B.TOP_LEFT:P.moveTo(T,S);break;case B.TOP_RIGHT:P.moveTo((T-N.offsetWidth),S);break;case B.BOTTOM_LEFT:P.moveTo(T,(S-N.offsetHeight));break;case B.BOTTOM_RIGHT:P.moveTo((T-N.offsetWidth),(S-N.offsetHeight));break;}}if(Q){O=Q[0];N=this.element;P=this;if(!L){L=Q[1];}if(!K){K=Q[2];}if(N&&O){R=D.getRegion(O);switch(K){case B.TOP_LEFT:M(R.top,R.left);break;case B.TOP_RIGHT:M(R.top,R.right);break;case B.BOTTOM_LEFT:M(R.bottom,R.left);break;case B.BOTTOM_RIGHT:M(R.bottom,R.right);break;}}}},enforceConstraints:function(L,K,M){var O=K[0];var N=this.getConstrainedXY(O[0],O[1]);this.cfg.setProperty("x",N[0],true);this.cfg.setProperty("y",N[1],true);this.cfg.setProperty("xy",N,true);},getConstrainedXY:function(V,T){var N=B.VIEWPORT_OFFSET,U=D.getViewportWidth(),Q=D.getViewportHeight(),M=this.element.offsetHeight,S=this.element.offsetWidth,Y=D.getDocumentScrollLeft(),W=D.getDocumentScrollTop();var P=V;var L=T;if(S+N<U){var R=Y+N;var X=Y+U-S-N;if(V<R){P=R;}else{if(V>X){P=X;}}}else{P=N+Y;}if(M+N<Q){var O=W+N;var K=W+Q-M-N;if(T<O){L=O;}else{if(T>K){L=K;}}}else{L=N+W;}return[P,L];},center:function(){var N=B.VIEWPORT_OFFSET,O=this.element.offsetWidth,M=this.element.offsetHeight,L=D.getViewportWidth(),P=D.getViewportHeight(),K,Q;if(O<L){K=(L/2)-(O/2)+D.getDocumentScrollLeft();}else{K=N+D.getDocumentScrollLeft();}if(M<P){Q=(P/2)-(M/2)+D.getDocumentScrollTop();}else{Q=N+D.getDocumentScrollTop();}this.cfg.setProperty("xy",[parseInt(K,10),parseInt(Q,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var K=D.getXY(this.element);this.cfg.setProperty("x",K[0],true);this.cfg.setProperty("y",K[1],true);this.cfg.setProperty("xy",K,true);},onDomResize:function(M,L){var K=this;B.superclass.onDomResize.call(this,M,L);setTimeout(function(){K.syncPosition();K.cfg.refireEvent("iframe");K.cfg.refireEvent("context");},0);},bringToTop:function(){var O=[],N=this.element;function R(V,U){var X=D.getStyle(V,"zIndex"),W=D.getStyle(U,"zIndex"),T=(!X||isNaN(X))?0:parseInt(X,10),S=(!W||isNaN(W))?0:parseInt(W,10);if(T>S){return -1;}else{if(T<S){return 1;}else{return 0;}}}function M(U){var S=D.hasClass(U,B.CSS_OVERLAY),T=YAHOO.widget.Panel;if(S&&!D.isAncestor(N,S)){if(T&&D.hasClass(U,T.CSS_PANEL)){O[O.length]=U.parentNode;}else{O[O.length]=U;}}}D.getElementsBy(M,"DIV",document.body);O.sort(R);var K=O[0],Q;if(K){Q=D.getStyle(K,"zIndex");if(!isNaN(Q)){var P=false;if(K!=N){P=true;}else{if(O.length>1){var L=D.getStyle(O[1],"zIndex");if(!isNaN(L)&&(Q==L)){P=true;}}}if(P){this.cfg.setProperty("zindex",(parseInt(Q,10)+2));}}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){if(H!=K){if(H){H.blur();}this.bringToTop(K);H=K;E.addClass(H.element,A.CSS_FOCUSED);K.focusEvent.fire();}}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}M.focusEvent.unsubscribeAll();M.blurEvent.unsubscribeAll();M.focusEvent=null;M.blurEvent=null;M.focus=null;M.blur=null;}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._onOverlayBlur=function(K,J){H=null;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},register:function(G){var K=this,L,I,H,J;if(G instanceof D){G.cfg.addProperty("manager",{value:this});G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focus=function(){K.focus(this);};G.blur=function(){if(K.getActive()==this){E.removeClass(this.element,A.CSS_FOCUSED);this.blurEvent.fire();}};G.blurEvent.subscribe(K._onOverlayBlur);G.hideEvent.subscribe(G.blur);G.destroyEvent.subscribe(this._onOverlayDestroy,G,this);C.on(G.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,G);L=E.getStyle(G.element,"zIndex");if(!isNaN(L)){G.cfg.setProperty("zIndex",parseInt(L,10));}else{G.cfg.setProperty("zIndex",0);}this.overlays.push(G);this.bringToTop(G);return true;}else{if(G instanceof Array){I=0;J=G.length;for(H=0;H<J;H++){if(this.register(G[H])){I++;}}if(I>0){return true;}}else{return false;}}},bringToTop:function(M){var I=this.find(M),L,G,J;if(I){J=this.overlays;J.sort(this.compareZIndexDesc);G=J[0];if(G){L=E.getStyle(G.element,"zIndex");
if(!isNaN(L)){var K=false;if(G!==I){K=true;}else{if(J.length>1){var H=E.getStyle(J[1].element,"zIndex");if(!isNaN(H)&&(L==H)){K=true;}}}if(K){I.cfg.setProperty("zindex",(parseInt(L,10)+2));}}J.sort(this.compareZIndexDesc);}}},find:function(G){var I=this.overlays,J=I.length,H;if(J>0){H=J-1;if(G instanceof D){do{if(I[H]==G){return I[H];}}while(H--);}else{if(typeof G=="string"){do{if(I[H].id==G){return I[H];}}while(H--);}}return null;}},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].show();}while(G--);}},hideAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].hide();}while(G--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.ContainerEffect=function(F,I,H,E,G){if(!G){G=YAHOO.util.Anim;}this.overlay=F;this.attrIn=I;this.attrOut=H;this.targetElement=E||F.element;this.animClass=G;};var B=YAHOO.util.Dom,D=YAHOO.util.CustomEvent,C=YAHOO.util.Easing,A=YAHOO.widget.ContainerEffect;A.FADE=function(E,G){var I={attributes:{opacity:{from:0,to:1}},duration:G,method:C.easeIn};var F={attributes:{opacity:{to:0}},duration:G,method:C.easeOut};var H=new A(E,I,F,E.element);H.handleUnderlayStart=function(){var K=this.overlay.underlay;if(K&&YAHOO.env.ua.ie){var J=(K.filters&&K.filters.length>0);if(J){B.addClass(E.element,"yui-effect-fade");}}};H.handleUnderlayComplete=function(){var J=this.overlay.underlay;if(J&&YAHOO.env.ua.ie){B.removeClass(E.element,"yui-effect-fade");}};H.handleStartAnimateIn=function(K,J,L){B.addClass(L.overlay.element,"hide-select");if(!L.overlay.underlay){L.overlay.cfg.refireEvent("underlay");}L.handleUnderlayStart();B.setStyle(L.overlay.element,"visibility","visible");B.setStyle(L.overlay.element,"opacity",0);};H.handleCompleteAnimateIn=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateInCompleteEvent.fire();};H.handleStartAnimateOut=function(K,J,L){B.addClass(L.overlay.element,"hide-select");L.handleUnderlayStart();};H.handleCompleteAnimateOut=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}B.setStyle(L.overlay.element,"visibility","hidden");B.setStyle(L.overlay.element,"opacity",1);L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateOutCompleteEvent.fire();};H.init();return H;};A.SLIDE=function(G,I){var F=G.cfg.getProperty("x")||B.getX(G.element),K=G.cfg.getProperty("y")||B.getY(G.element),J=B.getClientWidth(),H=G.element.offsetWidth,E=new A(G,{attributes:{points:{to:[F,K]}},duration:I,method:C.easeIn},{attributes:{points:{to:[(J+25),K]}},duration:I,method:C.easeOut},G.element,YAHOO.util.Motion);E.handleStartAnimateIn=function(M,L,N){N.overlay.element.style.left=((-25)-H)+"px";N.overlay.element.style.top=K+"px";};E.handleTweenAnimateIn=function(O,N,P){var Q=B.getXY(P.overlay.element),M=Q[0],L=Q[1];if(B.getStyle(P.overlay.element,"visibility")=="hidden"&&M<F){B.setStyle(P.overlay.element,"visibility","visible");}P.overlay.cfg.setProperty("xy",[M,L],true);P.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateIn=function(M,L,N){N.overlay.cfg.setProperty("xy",[F,K],true);N.startX=F;N.startY=K;N.overlay.cfg.refireEvent("iframe");N.animateInCompleteEvent.fire();};E.handleStartAnimateOut=function(M,L,P){var N=B.getViewportWidth(),Q=B.getXY(P.overlay.element),O=Q[1];P.animOut.attributes.points.to=[(N+25),O];};E.handleTweenAnimateOut=function(N,M,O){var Q=B.getXY(O.overlay.element),L=Q[0],P=Q[1];O.overlay.cfg.setProperty("xy",[L,P],true);O.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateOut=function(M,L,N){B.setStyle(N.overlay.element,"visibility","hidden");N.overlay.cfg.setProperty("xy",[F,K]);N.animateOutCompleteEvent.fire();};E.init();return E;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=D.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=D.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=D.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=D.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(F,E,G){},handleTweenAnimateIn:function(F,E,G){},handleCompleteAnimateIn:function(F,E,G){},handleStartAnimateOut:function(F,E,G){},handleTweenAnimateOut:function(F,E,G){},handleCompleteAnimateOut:function(F,E,G){},toString:function(){var E="ContainerEffect";if(this.overlay){E+=" ["+this.overlay.toString()+"]";}return E;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("containercore",YAHOO.widget.Module,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event;YAHOO.widget.MenuManager=function(){var N=false,F={},Q={},J={},E={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent"},K=null;function D(S){var R;if(S&&S.tagName){switch(S.tagName.toUpperCase()){case"DIV":R=S.parentNode;if((B.hasClass(S,"hd")||B.hasClass(S,"bd")||B.hasClass(S,"ft"))&&R&&R.tagName&&R.tagName.toUpperCase()=="DIV"){return R;}else{return S;}break;case"LI":return S;default:R=S.parentNode;if(R){return D(R);}break;}}}function G(V){var R=A.getTarget(V),S=D(R),X,T,U,Z,Y;if(S){T=S.tagName.toUpperCase();if(T=="LI"){U=S.id;if(U&&J[U]){Z=J[U];Y=Z.parent;}}else{if(T=="DIV"){if(S.id){Y=F[S.id];}}}}if(Y){X=E[V.type];if(Z&&!Z.cfg.getProperty("disabled")){Z[X].fire(V);if(V.type=="keyup"||V.type=="mousedown"){if(K!=Z){if(K){K.blurEvent.fire();}Z.focusEvent.fire();}}}Y[X].fire(V,Z);}else{if(V.type=="mousedown"){if(K){K.blurEvent.fire();K=null;}for(var W in Q){if(YAHOO.lang.hasOwnProperty(Q,W)){Y=Q[W];if(Y.cfg.getProperty("clicktohide")&&!(Y instanceof YAHOO.widget.MenuBar)&&Y.cfg.getProperty("position")=="dynamic"){Y.hide();}else{if(Y.cfg.getProperty("showdelay")>0){Y._cancelShowDelay();}if(Y.activeItem){Y.activeItem.blur();Y.activeItem.cfg.setProperty("selected",false);Y.activeItem=null;}}}}}else{if(V.type=="keyup"){if(K){K.blurEvent.fire();K=null;}}}}}function P(S,R,T){if(F[T.id]){this.removeMenu(T);}}function M(S,R){var T=R[0];if(T){K=T;}}function H(S,R){K=null;}function C(T,S){var R=S[0],U=this.id;if(R){Q[U]=this;}else{if(Q[U]){delete Q[U];}}}function L(S,R){O(this);}function O(S){var R=S.id;if(R&&J[R]){if(K==S){K=null;}delete J[R];S.destroyEvent.unsubscribe(L);}}function I(S,R){var U=R[0],T;if(U instanceof YAHOO.widget.MenuItem){T=U.id;if(!J[T]){J[T]=U;U.destroyEvent.subscribe(L);}}}return{addMenu:function(S){var R;if(S instanceof YAHOO.widget.Menu&&S.id&&!F[S.id]){F[S.id]=S;if(!N){R=document;A.on(R,"mouseover",G,this,true);A.on(R,"mouseout",G,this,true);A.on(R,"mousedown",G,this,true);A.on(R,"mouseup",G,this,true);A.on(R,"click",G,this,true);A.on(R,"keydown",G,this,true);A.on(R,"keyup",G,this,true);A.on(R,"keypress",G,this,true);N=true;}S.cfg.subscribeToConfigEvent("visible",C);S.destroyEvent.subscribe(P,S,this);S.itemAddedEvent.subscribe(I);S.focusEvent.subscribe(M);S.blurEvent.subscribe(H);}},removeMenu:function(U){var S,R,T;if(U){S=U.id;if(F[S]==U){R=U.getItems();if(R&&R.length>0){T=R.length-1;do{O(R[T]);}while(T--);}delete F[S];if(Q[S]==U){delete Q[S];}if(U.cfg){U.cfg.unsubscribeFromConfigEvent("visible",C);}U.destroyEvent.unsubscribe(P,U);U.itemAddedEvent.unsubscribe(I);U.focusEvent.unsubscribe(M);U.blurEvent.unsubscribe(H);}}},hideVisible:function(){var R;for(var S in Q){if(YAHOO.lang.hasOwnProperty(Q,S)){R=Q[S];if(!(R instanceof YAHOO.widget.MenuBar)&&R.cfg.getProperty("position")=="dynamic"){R.hide();}}}},getVisible:function(){return Q;},getMenus:function(){return F;},getMenu:function(S){var R=F[S];if(R){return R;}},getMenuItem:function(R){var S=J[R];if(S){return S;}},getMenuItemGroup:function(U){var S=B.get(U),R,W,V,T;if(S&&S.tagName&&S.tagName.toUpperCase()=="UL"){W=S.firstChild;if(W){R=[];do{T=W.id;if(T){V=this.getMenuItem(T);if(V){R[R.length]=V;}}}while((W=W.nextSibling));if(R.length>0){return R;}}}},getFocusedMenuItem:function(){return K;},getFocusedMenu:function(){if(K){return(K.parent.getRoot());}},toString:function(){return"MenuManager";}};}();})();(function(){YAHOO.widget.Menu=function(O,N){if(N){this.parent=N.parent;this.lazyLoad=N.lazyLoad||N.lazyload;this.itemData=N.itemData||N.itemdata;}YAHOO.widget.Menu.superclass.constructor.call(this,O,N);};function I(N){if(typeof N=="string"){return("dynamic,static".indexOf((N.toLowerCase()))!=-1);}}var C=YAHOO.util.Dom,M=YAHOO.util.Event,D=YAHOO.widget.Module,B=YAHOO.widget.Overlay,F=YAHOO.widget.Menu,K=YAHOO.widget.MenuManager,L=YAHOO.util.CustomEvent,E=YAHOO.lang,H=YAHOO.env.ua,G,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","FOCUS":"focus","BLUR":"blur","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved"},J={"VISIBLE":{key:"visible",value:false,validator:E.isBoolean},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:true,validator:E.isBoolean,supercedes:["iframe","x","y","xy"]},"POSITION":{key:"position",value:"dynamic",validator:I,supercedes:["visible","iframe"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","tr"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:true,validator:E.isBoolean,suppressEvent:true},"SHOW_DELAY":{key:"showdelay",value:250,validator:E.isNumber,suppressEvent:true},"HIDE_DELAY":{key:"hidedelay",value:0,validator:E.isNumber,suppressEvent:true},"SUBMENU_HIDE_DELAY":{key:"submenuhidedelay",value:250,validator:E.isNumber,suppressEvent:true},"CLICK_TO_HIDE":{key:"clicktohide",value:true,validator:E.isBoolean,suppressEvent:true},"CONTAINER":{key:"container",suppressEvent:true},"SCROLL_INCREMENT":{key:"scrollincrement",value:1,validator:E.isNumber,supercedes:["maxheight"],suppressEvent:true},"MIN_SCROLL_HEIGHT":{key:"minscrollheight",value:90,validator:E.isNumber,supercedes:["maxheight"],suppressEvent:true},"MAX_HEIGHT":{key:"maxheight",value:0,validator:E.isNumber,supercedes:["iframe"],suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:E.isString,suppressEvent:true},"DISABLED":{key:"disabled",value:false,validator:E.isBoolean,suppressEvent:true}};YAHOO.lang.extend(F,B,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",OFF_SCREEN_POSITION:[-10000,-10000],_nHideDelayId:null,_nShowDelayId:null,_nSubmenuHideDelayId:null,_nBodyScrollId:null,_bHideDelayEventHandlersAssigned:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,itemAddedEvent:null,itemRemovedEvent:null,init:function(P,O){this._aItemGroups=[];
this._aListElements=[];this._aGroupTitleElements=[];if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuItem;}var N;if(typeof P=="string"){N=document.getElementById(P);}else{if(P.tagName){N=P;}}if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":this.srcElement=N;if(!N.id){N.setAttribute("id",C.generateId());}F.superclass.init.call(this,N);this.beforeInitEvent.fire(F);break;case"SELECT":this.srcElement=N;F.superclass.init.call(this,C.generateId());this.beforeInitEvent.fire(F);break;}}else{F.superclass.init.call(this,P);this.beforeInitEvent.fire(F);}if(this.element){C.addClass(this.element,this.CSS_CLASS_NAME);this.initEvent.subscribe(this._onInit);this.beforeRenderEvent.subscribe(this._onBeforeRender);this.renderEvent.subscribe(this._onRender);this.renderEvent.subscribe(this.onRender);this.beforeShowEvent.subscribe(this._onBeforeShow);this.hideEvent.subscribe(this.positionOffScreen);this.showEvent.subscribe(this._onShow);this.beforeHideEvent.subscribe(this._onBeforeHide);this.mouseOverEvent.subscribe(this._onMouseOver);this.mouseOutEvent.subscribe(this._onMouseOut);this.clickEvent.subscribe(this._onClick);this.keyDownEvent.subscribe(this._onKeyDown);this.keyPressEvent.subscribe(this._onKeyPress);if(H.gecko||H.webkit){this.cfg.subscribeToConfigEvent("y",this._onYChange);}if(O){this.cfg.applyConfig(O,true);}K.addMenu(this);this.initEvent.fire(F);}},_initSubTree:function(){var O=this.srcElement,N,Q,T,U,S,R,P;if(O){N=(O.tagName&&O.tagName.toUpperCase());if(N=="DIV"){U=this.body.firstChild;if(U){Q=0;T=this.GROUP_TITLE_TAG_NAME.toUpperCase();do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case T:this._aGroupTitleElements[Q]=U;break;case"UL":this._aListElements[Q]=U;this._aItemGroups[Q]=[];Q++;break;}}}while((U=U.nextSibling));if(this._aListElements[0]){C.addClass(this._aListElements[0],"first-of-type");}}}U=null;if(N){switch(N){case"DIV":S=this._aListElements;R=S.length;if(R>0){P=R-1;do{U=S[P].firstChild;if(U){do{if(U&&U.tagName&&U.tagName.toUpperCase()=="LI"){this.addItem(new this.ITEM_TYPE(U,{parent:this}),P);}}while((U=U.nextSibling));}}while(P--);}break;case"SELECT":U=O.firstChild;do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case"OPTGROUP":case"OPTION":this.addItem(new this.ITEM_TYPE(U,{parent:this}));break;}}}while((U=U.nextSibling));break;}}}},_getFirstEnabledItem:function(){var N=this.getItems(),Q=N.length,P;for(var O=0;O<Q;O++){P=N[O];if(P&&!P.cfg.getProperty("disabled")&&P.element.style.display!="none"){return P;}}},_addItemToGroup:function(S,T,W){var U,X,Q,V,R,O,P;function N(Y,Z){return(Y[Z]||N(Y,(Z+1)));}if(T instanceof this.ITEM_TYPE){U=T;U.parent=this;}else{if(typeof T=="string"){U=new this.ITEM_TYPE(T,{parent:this});}else{if(typeof T=="object"){T.parent=this;U=new this.ITEM_TYPE(T.text,T);}}}if(U){if(U.cfg.getProperty("selected")){this.activeItem=U;}X=typeof S=="number"?S:0;Q=this._getItemGroup(X);if(!Q){Q=this._createItemGroup(X);}if(typeof W=="number"){R=(W>=Q.length);if(Q[W]){Q.splice(W,0,U);}else{Q[W]=U;}V=Q[W];if(V){if(R&&(!V.element.parentNode||V.element.parentNode.nodeType==11)){this._aListElements[X].appendChild(V.element);}else{O=N(Q,(W+1));if(O&&(!V.element.parentNode||V.element.parentNode.nodeType==11)){this._aListElements[X].insertBefore(V.element,O.element);}}V.parent=this;this._subscribeToItemEvents(V);this._configureSubmenu(V);this._updateItemProperties(X);this.itemAddedEvent.fire(V);this.changeContentEvent.fire();return V;}}else{P=Q.length;Q[P]=U;V=Q[P];if(V){if(!C.isAncestor(this._aListElements[X],V.element)){this._aListElements[X].appendChild(V.element);}V.element.setAttribute("groupindex",X);V.element.setAttribute("index",P);V.parent=this;V.index=P;V.groupIndex=X;this._subscribeToItemEvents(V);this._configureSubmenu(V);if(P===0){C.addClass(V.element,"first-of-type");}this.itemAddedEvent.fire(V);this.changeContentEvent.fire();return V;}}}},_removeItemFromGroupByIndex:function(Q,O){var P=typeof Q=="number"?Q:0,R=this._getItemGroup(P),T,S,N;if(R){T=R.splice(O,1);S=T[0];if(S){this._updateItemProperties(P);if(R.length===0){N=this._aListElements[P];if(this.body&&N){this.body.removeChild(N);}this._aItemGroups.splice(P,1);this._aListElements.splice(P,1);N=this._aListElements[0];if(N){C.addClass(N,"first-of-type");}}this.itemRemovedEvent.fire(S);this.changeContentEvent.fire();return S;}}},_removeItemFromGroupByValue:function(P,N){var R=this._getItemGroup(P),S,Q,O;if(R){S=R.length;Q=-1;if(S>0){O=S-1;do{if(R[O]==N){Q=O;break;}}while(O--);if(Q>-1){return(this._removeItemFromGroupByIndex(P,Q));}}}},_updateItemProperties:function(O){var P=this._getItemGroup(O),S=P.length,R,Q,N;if(S>0){N=S-1;do{R=P[N];if(R){Q=R.element;R.index=N;R.groupIndex=O;Q.setAttribute("groupindex",O);Q.setAttribute("index",N);C.removeClass(Q,"first-of-type");}}while(N--);if(Q){C.addClass(Q,"first-of-type");}}},_createItemGroup:function(O){var N;if(!this._aItemGroups[O]){this._aItemGroups[O]=[];N=document.createElement("ul");this._aListElements[O]=N;return this._aItemGroups[O];}},_getItemGroup:function(O){var N=((typeof O=="number")?O:0);return this._aItemGroups[N];},_configureSubmenu:function(N){var O=N.cfg.getProperty("submenu");if(O){this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,O,true);this.renderEvent.subscribe(this._onParentMenuRender,O,true);O.beforeShowEvent.subscribe(this._onSubmenuBeforeShow);}},_subscribeToItemEvents:function(N){N.focusEvent.subscribe(this._onMenuItemFocus);N.blurEvent.subscribe(this._onMenuItemBlur);N.destroyEvent.subscribe(this._onMenuItemDestroy,N,this);N.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,N,this);},_onVisibleChange:function(P,O){var N=O[0];if(N){C.addClass(this.element,"visible");}else{C.removeClass(this.element,"visible");}},_cancelHideDelay:function(){var N=this.getRoot();if(N._nHideDelayId){window.clearTimeout(N._nHideDelayId);}},_execHideDelay:function(){this._cancelHideDelay();var O=this.getRoot(),P=this;function N(){if(O.activeItem){O.clearActiveItem();}if(O==P&&!(P instanceof YAHOO.widget.MenuBar)&&P.cfg.getProperty("position")=="dynamic"){P.hide();
}}O._nHideDelayId=window.setTimeout(N,O.cfg.getProperty("hidedelay"));},_cancelShowDelay:function(){var N=this.getRoot();if(N._nShowDelayId){window.clearTimeout(N._nShowDelayId);}},_execShowDelay:function(P){var O=this.getRoot();function N(){if(P.parent.cfg.getProperty("selected")){P.show();}}O._nShowDelayId=window.setTimeout(N,O.cfg.getProperty("showdelay"));},_execSubmenuHideDelay:function(Q,O,N){var P=this;Q._nSubmenuHideDelayId=window.setTimeout(function(){if(P._nCurrentMouseX>(O+10)){Q._nSubmenuHideDelayId=window.setTimeout(function(){Q.hide();},N);}else{Q.hide();}},50);},_disableScrollHeader:function(){if(!this._bHeaderDisabled){C.addClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=true;}},_disableScrollFooter:function(){if(!this._bFooterDisabled){C.addClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=true;}},_enableScrollHeader:function(){if(this._bHeaderDisabled){C.removeClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=false;}},_enableScrollFooter:function(){if(this._bFooterDisabled){C.removeClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=false;}},_onMouseOver:function(W,R){if(this._bStopMouseEventHandlers){return false;}var X=R[0],V=R[1],N=M.getTarget(X),O,Q,U,P,T,S;if(!this._bHandledMouseOverEvent&&(N==this.element||C.isAncestor(this.element,N))){this._nCurrentMouseX=0;M.on(this.element,"mousemove",this._onMouseMove,this,true);this.clearActiveItem();if(this.parent&&this._nSubmenuHideDelayId){window.clearTimeout(this._nSubmenuHideDelayId);this.parent.cfg.setProperty("selected",true);O=this.parent.parent;O._bHandledMouseOutEvent=true;O._bHandledMouseOverEvent=false;}this._bHandledMouseOverEvent=true;this._bHandledMouseOutEvent=false;}if(V&&!V.handledMouseOverEvent&&!V.cfg.getProperty("disabled")&&(N==V.element||C.isAncestor(V.element,N))){Q=this.cfg.getProperty("showdelay");U=(Q>0);if(U){this._cancelShowDelay();}P=this.activeItem;if(P){P.cfg.setProperty("selected",false);}T=V.cfg;T.setProperty("selected",true);if(this.hasFocus()){V.focus();}if(this.cfg.getProperty("autosubmenudisplay")){S=T.getProperty("submenu");if(S){if(U){this._execShowDelay(S);}else{S.show();}}}V.handledMouseOverEvent=true;V.handledMouseOutEvent=false;}},_onMouseOut:function(V,P){if(this._bStopMouseEventHandlers){return false;}var W=P[0],T=P[1],Q=M.getRelatedTarget(W),U=false,S,R,N,O;if(T&&!T.cfg.getProperty("disabled")){S=T.cfg;R=S.getProperty("submenu");if(R&&(Q==R.element||C.isAncestor(R.element,Q))){U=true;}if(!T.handledMouseOutEvent&&((Q!=T.element&&!C.isAncestor(T.element,Q))||U)){if(!U){T.cfg.setProperty("selected",false);if(R){N=this.cfg.getProperty("submenuhidedelay");O=this.cfg.getProperty("showdelay");if(!(this instanceof YAHOO.widget.MenuBar)&&N>0&&O>=N){this._execSubmenuHideDelay(R,M.getPageX(W),N);}else{R.hide();}}}T.handledMouseOutEvent=true;T.handledMouseOverEvent=false;}}if(!this._bHandledMouseOutEvent&&((Q!=this.element&&!C.isAncestor(this.element,Q))||U)){M.removeListener(this.element,"mousemove",this._onMouseMove);this._nCurrentMouseX=M.getPageX(W);this._bHandledMouseOutEvent=true;this._bHandledMouseOverEvent=false;}},_onMouseMove:function(O,N){if(this._bStopMouseEventHandlers){return false;}this._nCurrentMouseX=M.getPageX(O);},_onClick:function(W,P){var X=P[0],S=P[1],U=false,Q,O,N,R,T,V;if(S){if(S.cfg.getProperty("disabled")){M.preventDefault(X);}else{Q=S.cfg.getProperty("submenu");R=S.cfg.getProperty("url");if(R){T=R.indexOf("#");V=R.length;if(T!=-1){R=R.substr(T,V);V=R.length;if(V>1){N=R.substr(1,V);U=C.isAncestor(this.element,N);}else{if(V===1){U=true;}}}}if(U&&!S.cfg.getProperty("target")){M.preventDefault(X);if(H.webkit){S.focus();}else{S.focusEvent.fire();}}if(!Q){if((H.gecko&&this.platform=="windows")&&X.button>0){return ;}O=this.getRoot();if(O instanceof YAHOO.widget.MenuBar||O.cfg.getProperty("position")=="static"){O.clearActiveItem();}else{O.hide();}}}}},_onKeyDown:function(b,V){var Y=V[0],X=V[1],f=this,U,Z,O,S,c,N,e,R,a,Q,W,d,T;function P(){f._bStopMouseEventHandlers=true;window.setTimeout(function(){f._bStopMouseEventHandlers=false;},10);}if(X&&!X.cfg.getProperty("disabled")){Z=X.cfg;O=this.parent;switch(Y.keyCode){case 38:case 40:c=(Y.keyCode==38)?X.getPreviousEnabledSibling():X.getNextEnabledSibling();if(c){this.clearActiveItem();c.cfg.setProperty("selected",true);c.focus();if(this.cfg.getProperty("maxheight")>0){N=this.body;e=N.scrollTop;R=N.offsetHeight;a=this.getItems();Q=a.length-1;W=c.element.offsetTop;if(Y.keyCode==40){if(W>=(R+e)){N.scrollTop=W-R;}else{if(W<=e){N.scrollTop=0;}}if(c==a[Q]){N.scrollTop=c.element.offsetTop;}}else{if(W<=e){N.scrollTop=W-c.element.offsetHeight;}else{if(W>=(e+R)){N.scrollTop=W;}}if(c==a[0]){N.scrollTop=0;}}e=N.scrollTop;d=N.scrollHeight-N.offsetHeight;if(e===0){this._disableScrollHeader();this._enableScrollFooter();}else{if(e==d){this._enableScrollHeader();this._disableScrollFooter();}else{this._enableScrollHeader();this._enableScrollFooter();}}}}M.preventDefault(Y);P();break;case 39:U=Z.getProperty("submenu");if(U){if(!Z.getProperty("selected")){Z.setProperty("selected",true);}U.show();U.setInitialFocus();U.setInitialSelection();}else{S=this.getRoot();if(S instanceof YAHOO.widget.MenuBar){c=S.activeItem.getNextEnabledSibling();if(c){S.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");if(U){U.show();}c.focus();}}}M.preventDefault(Y);P();break;case 37:if(O){T=O.parent;if(T instanceof YAHOO.widget.MenuBar){c=T.activeItem.getPreviousEnabledSibling();if(c){T.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");if(U){U.show();}c.focus();}}else{this.hide();O.focus();}}M.preventDefault(Y);P();break;}}if(Y.keyCode==27){if(this.cfg.getProperty("position")=="dynamic"){this.hide();if(this.parent){this.parent.focus();}}else{if(this.activeItem){U=this.activeItem.cfg.getProperty("submenu");if(U&&U.cfg.getProperty("visible")){U.hide();this.activeItem.focus();}else{this.activeItem.blur();this.activeItem.cfg.setProperty("selected",false);
}}}M.preventDefault(Y);}},_onKeyPress:function(P,O){var N=O[0];if(N.keyCode==40||N.keyCode==38){M.preventDefault(N);}},_onYChange:function(O,N){var Q=this.parent,S,P,R;if(Q){S=Q.parent.body.scrollTop;if(S>0){R=(this.cfg.getProperty("y")-S);C.setY(this.element,R);P=this.iframe;if(P){C.setY(P,R);}this.cfg.setProperty("y",R,true);}}},_onScrollTargetMouseOver:function(T,W){this._cancelHideDelay();var P=M.getTarget(T),R=this.body,V=this,Q=this.cfg.getProperty("scrollincrement"),N,O;function U(){var X=R.scrollTop;if(X<N){R.scrollTop=(X+Q);V._enableScrollHeader();}else{R.scrollTop=N;window.clearInterval(V._nBodyScrollId);V._disableScrollFooter();}}function S(){var X=R.scrollTop;if(X>0){R.scrollTop=(X-Q);V._enableScrollFooter();}else{R.scrollTop=0;window.clearInterval(V._nBodyScrollId);V._disableScrollHeader();}}if(C.hasClass(P,"hd")){O=S;}else{N=R.scrollHeight-R.offsetHeight;O=U;}this._nBodyScrollId=window.setInterval(O,10);},_onScrollTargetMouseOut:function(O,N){window.clearInterval(this._nBodyScrollId);this._cancelHideDelay();},_onInit:function(O,N){this.cfg.subscribeToConfigEvent("visible",this._onVisibleChange);var P=!this.parent,Q=this.lazyLoad;if(((P&&!Q)||(P&&(this.cfg.getProperty("visible")||this.cfg.getProperty("position")=="static"))||(!P&&!Q))&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){this.addItems(this.itemData);}}else{if(Q){this.cfg.fireQueue();}}},_onBeforeRender:function(Q,P){var R=this.element,U=this._aListElements.length,O=true,T=0,N,S;if(U>0){do{N=this._aListElements[T];if(N){if(O){C.addClass(N,"first-of-type");O=false;}if(!C.isAncestor(R,N)){this.appendToBody(N);}S=this._aGroupTitleElements[T];if(S){if(!C.isAncestor(R,S)){N.parentNode.insertBefore(S,N);}C.addClass(N,"hastitle");}}T++;}while(T<U);}},_onRender:function(O,N){if(this.cfg.getProperty("position")=="dynamic"){if(!this.cfg.getProperty("visible")){this.positionOffScreen();}}},_onBeforeShow:function(W,R){var V,O,S,Q,T;if(this.lazyLoad&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()=="SELECT"){V=this.itemData.length;for(O=0;O<V;O++){if(this.itemData[O].tagName){this.addItem((new this.ITEM_TYPE(this.itemData[O])));}}}else{this.addItems(this.itemData);}}T=this.srcElement;if(T){if(T.tagName.toUpperCase()=="SELECT"){if(C.inDocument(T)){this.render(T.parentNode);}else{this.render(this.cfg.getProperty("container"));}}else{this.render();}}else{if(this.parent){this.render(this.parent.element);}else{this.render(this.cfg.getProperty("container"));}}}var P=this.cfg.getProperty("maxheight"),N=this.cfg.getProperty("minscrollheight"),U=this.cfg.getProperty("position")=="dynamic";if(!this.parent&&U){this.cfg.refireEvent("xy");}function X(){this.cfg.setProperty("maxheight",0);this.hideEvent.unsubscribe(X);}if(!(this instanceof YAHOO.widget.MenuBar)&&U){if(P===0){S=C.getViewportHeight();if(this.parent&&this.parent.parent instanceof YAHOO.widget.MenuBar){Q=YAHOO.util.Region.getRegion(this.parent.element);S=(S-Q.bottom);}if(this.element.offsetHeight>=S){P=(S-(B.VIEWPORT_OFFSET*2));if(P<N){P=N;}this.cfg.setProperty("maxheight",P);this.hideEvent.subscribe(X);}}}},_onShow:function(Q,P){var T=this.parent,S,N,O;function R(V){var U;if(V.type=="mousedown"||(V.type=="keydown"&&V.keyCode==27)){U=M.getTarget(V);if(U!=S.element||!C.isAncestor(S.element,U)){S.cfg.setProperty("autosubmenudisplay",false);M.removeListener(document,"mousedown",R);M.removeListener(document,"keydown",R);}}}if(T){S=T.parent;N=S.cfg.getProperty("submenualignment");O=this.cfg.getProperty("submenualignment");if((N[0]!=O[0])&&(N[1]!=O[1])){this.cfg.setProperty("submenualignment",[N[0],N[1]]);}if(!S.cfg.getProperty("autosubmenudisplay")&&(S instanceof YAHOO.widget.MenuBar||S.cfg.getProperty("position")=="static")){S.cfg.setProperty("autosubmenudisplay",true);M.on(document,"mousedown",R);M.on(document,"keydown",R);}}},_onBeforeHide:function(P,O){var N=this.activeItem,R,Q;if(N){R=N.cfg;R.setProperty("selected",false);Q=R.getProperty("submenu");if(Q){Q.hide();}}if(this.getRoot()==this){this.blur();}},_onParentMenuConfigChange:function(O,N,R){var P=N[0][0],Q=N[0][1];switch(P){case"iframe":case"constraintoviewport":case"hidedelay":case"showdelay":case"submenuhidedelay":case"clicktohide":case"effect":case"classname":case"scrollincrement":case"minscrollheight":R.cfg.setProperty(P,Q);break;}},_onParentMenuRender:function(O,N,S){var P=S.parent.parent.cfg,Q={constraintoviewport:P.getProperty("constraintoviewport"),xy:[0,0],clicktohide:P.getProperty("clicktohide"),effect:P.getProperty("effect"),showdelay:P.getProperty("showdelay"),hidedelay:P.getProperty("hidedelay"),submenuhidedelay:P.getProperty("submenuhidedelay"),classname:P.getProperty("classname"),scrollincrement:P.getProperty("scrollincrement"),minscrollheight:P.getProperty("minscrollheight"),iframe:P.getProperty("iframe")},R;S.cfg.applyConfig(Q);if(!this.lazyLoad){R=this.parent.element;if(this.element.parentNode==R){this.render();}else{this.render(R);}}},_onSubmenuBeforeShow:function(P,O){var Q=this.parent,N=Q.parent.cfg.getProperty("submenualignment");if(!this.cfg.getProperty("context")){this.cfg.setProperty("context",[Q.element,N[0],N[1]]);}else{this.align();}},_onMenuItemFocus:function(O,N){this.parent.focusEvent.fire(this);},_onMenuItemBlur:function(O,N){this.parent.blurEvent.fire(this);},_onMenuItemDestroy:function(P,O,N){this._removeItemFromGroupByValue(N.groupIndex,N);},_onMenuItemConfigChange:function(P,O,N){var R=O[0][0],S=O[0][1],Q;switch(R){case"selected":if(S===true){this.activeItem=N;}break;case"submenu":Q=O[0][1];if(Q){this._configureSubmenu(N);}break;}},enforceConstraints:function(P,N,T){YAHOO.widget.Menu.superclass.enforceConstraints.apply(this,arguments);var S=this.parent,O,R,Q,U;if(S){O=S.parent;if(!(O instanceof YAHOO.widget.MenuBar)){R=O.cfg.getProperty("x");U=this.cfg.getProperty("x");if(U<(R+S.element.offsetWidth)){Q=(R-this.element.offsetWidth);
this.cfg.setProperty("x",Q,true);this.cfg.setProperty("xy",[Q,(this.cfg.getProperty("y"))],true);}}}},configVisible:function(P,O,Q){var N,R;if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configVisible.call(this,P,O,Q);}else{N=O[0];R=C.getStyle(this.element,"display");C.setStyle(this.element,"visibility","visible");if(N){if(R!="block"){this.beforeShowEvent.fire();C.setStyle(this.element,"display","block");this.showEvent.fire();}}else{if(R=="block"){this.beforeHideEvent.fire();C.setStyle(this.element,"display","none");this.hideEvent.fire();}}}},configPosition:function(P,O,S){var R=this.element,Q=O[0]=="static"?"static":"absolute",T=this.cfg,N;C.setStyle(R,"position",Q);if(Q=="static"){C.setStyle(R,"display","block");T.setProperty("visible",true);}else{C.setStyle(R,"visibility","hidden");}if(Q=="absolute"){N=T.getProperty("zindex");if(!N||N===0){N=this.parent?(this.parent.parent.cfg.getProperty("zindex")+1):1;T.setProperty("zindex",N);}}},configIframe:function(O,N,P){if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configIframe.call(this,O,N,P);}},configHideDelay:function(O,N,R){var T=N[0],S=this.mouseOutEvent,P=this.mouseOverEvent,Q=this.keyDownEvent;if(T>0){if(!this._bHideDelayEventHandlersAssigned){S.subscribe(this._execHideDelay);P.subscribe(this._cancelHideDelay);Q.subscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=true;}}else{S.unsubscribe(this._execHideDelay);P.unsubscribe(this._cancelHideDelay);Q.unsubscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=false;}},configContainer:function(O,N,Q){var P=N[0];if(typeof P=="string"){this.cfg.setProperty("container",document.getElementById(P),true);}},_setMaxHeight:function(O,N,P){this.cfg.setProperty("maxheight",P);this.renderEvent.unsubscribe(this._setMaxHeight);},configMaxHeight:function(a,U,X){var T=U[0],Q=this.element,R=this.body,Y=this.header,O=this.footer,W=this._onScrollTargetMouseOver,b=this._onScrollTargetMouseOut,N=this.cfg.getProperty("minscrollheight"),V,S,P;if(T!==0&&T<N){T=N;}if(this.lazyLoad&&!R){this.renderEvent.unsubscribe(this._setMaxHeight);if(T>0){this.renderEvent.subscribe(this._setMaxHeight,T,this);}return ;}C.setStyle(R,"height","");C.removeClass(R,"yui-menu-body-scrolled");var Z=((H.gecko&&this.parent&&this.parent.parent&&this.parent.parent.cfg.getProperty("position")=="dynamic")||H.ie);if(Z){if(!this.cfg.getProperty("width")){S=Q.offsetWidth;Q.style.width=S+"px";P=(S-(Q.offsetWidth-S))+"px";this.cfg.setProperty("width",P);}}if(!Y&&!O){this.setHeader("&#32;");this.setFooter("&#32;");Y=this.header;O=this.footer;C.addClass(Y,"topscrollbar");C.addClass(O,"bottomscrollbar");Q.insertBefore(Y,R);Q.appendChild(O);}V=(T-(Y.offsetHeight+Y.offsetHeight));if(V>0&&(R.offsetHeight>T)){C.addClass(R,"yui-menu-body-scrolled");C.setStyle(R,"height",(V+"px"));M.on(Y,"mouseover",W,this,true);M.on(Y,"mouseout",b,this,true);M.on(O,"mouseover",W,this,true);M.on(O,"mouseout",b,this,true);this._disableScrollHeader();this._enableScrollFooter();}else{if(Y&&O){if(Z){this.cfg.setProperty("width","");}this._enableScrollHeader();this._enableScrollFooter();M.removeListener(Y,"mouseover",W);M.removeListener(Y,"mouseout",b);M.removeListener(O,"mouseover",W);M.removeListener(O,"mouseout",b);Q.removeChild(Y);Q.removeChild(O);this.header=null;this.footer=null;}}this.cfg.refireEvent("iframe");},configClassName:function(P,O,Q){var N=O[0];if(this._sClassName){C.removeClass(this.element,this._sClassName);}C.addClass(this.element,N);this._sClassName=N;},_onItemAdded:function(O,N){var P=N[0];if(P){P.cfg.setProperty("disabled",true);}},configDisabled:function(P,O,S){var R=O[0],N=this.getItems(),T,Q;if(E.isArray(N)){T=N.length;if(T>0){Q=T-1;do{N[Q].cfg.setProperty("disabled",R);}while(Q--);}if(R){this.clearActiveItem(true);C.addClass(this.element,"disabled");this.itemAddedEvent.subscribe(this._onItemAdded);}else{C.removeClass(this.element,"disabled");this.itemAddedEvent.unsubscribe(this._onItemAdded);}}},onRender:function(R,Q){function S(){var W=this.element,V=this._shadow;if(V&&W){if(V.style.width&&V.style.height){V.style.width="";V.style.height="";}V.style.width=(W.offsetWidth+6)+"px";V.style.height=(W.offsetHeight+1)+"px";}}function U(){this.element.appendChild(this._shadow);}function O(){C.addClass(this._shadow,"yui-menu-shadow-visible");}function N(){C.removeClass(this._shadow,"yui-menu-shadow-visible");}function T(){var W=this._shadow,V,X;if(!W){V=this.element;X=this;if(!G){G=document.createElement("div");G.className="yui-menu-shadow yui-menu-shadow-visible";}W=G.cloneNode(false);V.appendChild(W);this._shadow=W;this.beforeShowEvent.subscribe(O);this.beforeHideEvent.subscribe(N);if(H.ie){window.setTimeout(function(){S.call(X);X.syncIframe();},0);this.cfg.subscribeToConfigEvent("width",S);this.cfg.subscribeToConfigEvent("height",S);this.cfg.subscribeToConfigEvent("maxheight",S);this.changeContentEvent.subscribe(S);D.textResizeEvent.subscribe(S,X,true);this.destroyEvent.subscribe(function(){D.textResizeEvent.unsubscribe(S,X);});}this.cfg.subscribeToConfigEvent("maxheight",U);}}function P(){T.call(this);this.beforeShowEvent.unsubscribe(P);}if(this.cfg.getProperty("position")=="dynamic"){if(this.cfg.getProperty("visible")){T.call(this);}else{this.beforeShowEvent.subscribe(P);}}},initEvents:function(){F.superclass.initEvents.call(this);var N=L.LIST;this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);this.mouseOverEvent.signature=N;this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);this.mouseOutEvent.signature=N;this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);this.mouseDownEvent.signature=N;this.mouseUpEvent=this.createEvent(A.MOUSE_UP);this.mouseUpEvent.signature=N;this.clickEvent=this.createEvent(A.CLICK);this.clickEvent.signature=N;this.keyPressEvent=this.createEvent(A.KEY_PRESS);this.keyPressEvent.signature=N;this.keyDownEvent=this.createEvent(A.KEY_DOWN);this.keyDownEvent.signature=N;this.keyUpEvent=this.createEvent(A.KEY_UP);this.keyUpEvent.signature=N;this.focusEvent=this.createEvent(A.FOCUS);
this.focusEvent.signature=N;this.blurEvent=this.createEvent(A.BLUR);this.blurEvent.signature=N;this.itemAddedEvent=this.createEvent(A.ITEM_ADDED);this.itemAddedEvent.signature=N;this.itemRemovedEvent=this.createEvent(A.ITEM_REMOVED);this.itemRemovedEvent.signature=N;},positionOffScreen:function(){var O=this.iframe,N=this.OFF_SCREEN_POSITION;C.setXY(this.element,N);if(O){C.setXY(O,N);}},getRoot:function(){var O=this.parent,N;if(O){N=O.parent;return N?N.getRoot():this;}else{return this;}},toString:function(){var O="Menu",N=this.id;if(N){O+=(" "+N);}return O;},setItemGroupTitle:function(S,R){var Q,P,O,N;if(typeof S=="string"&&S.length>0){Q=typeof R=="number"?R:0;P=this._aGroupTitleElements[Q];if(P){P.innerHTML=S;}else{P=document.createElement(this.GROUP_TITLE_TAG_NAME);P.innerHTML=S;this._aGroupTitleElements[Q]=P;}O=this._aGroupTitleElements.length-1;do{if(this._aGroupTitleElements[O]){C.removeClass(this._aGroupTitleElements[O],"first-of-type");N=O;}}while(O--);if(N!==null){C.addClass(this._aGroupTitleElements[N],"first-of-type");}this.changeContentEvent.fire();}},addItem:function(N,O){if(N){return this._addItemToGroup(O,N);}},addItems:function(Q,P){var S,N,R,O;if(E.isArray(Q)){S=Q.length;N=[];for(O=0;O<S;O++){R=Q[O];if(R){if(E.isArray(R)){N[N.length]=this.addItems(R,O);}else{N[N.length]=this._addItemToGroup(P,R);}}}if(N.length){return N;}}},insertItem:function(N,O,P){if(N){return this._addItemToGroup(P,N,O);}},removeItem:function(N,O){var P;if(typeof N!="undefined"){if(N instanceof YAHOO.widget.MenuItem){P=this._removeItemFromGroupByValue(O,N);}else{if(typeof N=="number"){P=this._removeItemFromGroupByIndex(O,N);}}if(P){P.destroy();return P;}}},getItems:function(){var P=this._aItemGroups,O,N=[];if(E.isArray(P)){O=P.length;return((O==1)?P[0]:(Array.prototype.concat.apply(N,P)));}},getItemGroups:function(){return this._aItemGroups;},getItem:function(N,O){var P;if(typeof N=="number"){P=this._getItemGroup(O);if(P){return P[N];}}},getSubmenus:function(){var O=this.getItems(),S=O.length,N,P,R,Q;if(S>0){N=[];for(Q=0;Q<S;Q++){R=O[Q];if(R){P=R.cfg.getProperty("submenu");if(P){N[N.length]=P;}}}}return N;},clearContent:function(){var R=this.getItems(),O=R.length,P=this.element,Q=this.body,V=this.header,N=this.footer,U,T,S;if(O>0){S=O-1;do{U=R[S];if(U){T=U.cfg.getProperty("submenu");if(T){this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,T);this.renderEvent.unsubscribe(this._onParentMenuRender,T);}this.removeItem(U);}}while(S--);}if(V){M.purgeElement(V);P.removeChild(V);}if(N){M.purgeElement(N);P.removeChild(N);}if(Q){M.purgeElement(Q);Q.innerHTML="";}this.activeItem=null;this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];this.cfg.setProperty("width",null);},destroy:function(){this.clearContent();this._aItemGroups=null;this._aListElements=null;this._aGroupTitleElements=null;F.superclass.destroy.call(this);},setInitialFocus:function(){var N=this._getFirstEnabledItem();if(N){N.focus();}},setInitialSelection:function(){var N=this._getFirstEnabledItem();if(N){N.cfg.setProperty("selected",true);}},clearActiveItem:function(P){if(this.cfg.getProperty("showdelay")>0){this._cancelShowDelay();}var N=this.activeItem,Q,O;if(N){Q=N.cfg;if(P){N.blur();}Q.setProperty("selected",false);O=Q.getProperty("submenu");if(O){O.hide();}this.activeItem=null;}},focus:function(){if(!this.hasFocus()){this.setInitialFocus();}},blur:function(){var N;if(this.hasFocus()){N=K.getFocusedMenuItem();if(N){N.blur();}}},hasFocus:function(){return(K.getFocusedMenu()==this.getRoot());},subscribe:function(){function Q(V,U,X){var Y=U[0],W=Y.cfg.getProperty("submenu");if(W){W.subscribe.apply(W,X);}}function T(V,U,X){var W=this.cfg.getProperty("submenu");if(W){W.subscribe.apply(W,X);}}F.superclass.subscribe.apply(this,arguments);F.superclass.subscribe.call(this,"itemAdded",Q,arguments);var N=this.getItems(),S,R,O,P;if(N){S=N.length;if(S>0){P=S-1;do{R=N[P];O=R.cfg.getProperty("submenu");if(O){O.subscribe.apply(O,arguments);}else{R.cfg.subscribeToConfigEvent("submenu",T,arguments);}}while(P--);}}},initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);var N=this.cfg;N.addProperty(J.VISIBLE.key,{handler:this.configVisible,value:J.VISIBLE.value,validator:J.VISIBLE.validator});N.addProperty(J.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:J.CONSTRAIN_TO_VIEWPORT.value,validator:J.CONSTRAIN_TO_VIEWPORT.validator,supercedes:J.CONSTRAIN_TO_VIEWPORT.supercedes});N.addProperty(J.POSITION.key,{handler:this.configPosition,value:J.POSITION.value,validator:J.POSITION.validator,supercedes:J.POSITION.supercedes});N.addProperty(J.SUBMENU_ALIGNMENT.key,{value:J.SUBMENU_ALIGNMENT.value,suppressEvent:J.SUBMENU_ALIGNMENT.suppressEvent});N.addProperty(J.AUTO_SUBMENU_DISPLAY.key,{value:J.AUTO_SUBMENU_DISPLAY.value,validator:J.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:J.AUTO_SUBMENU_DISPLAY.suppressEvent});N.addProperty(J.SHOW_DELAY.key,{value:J.SHOW_DELAY.value,validator:J.SHOW_DELAY.validator,suppressEvent:J.SHOW_DELAY.suppressEvent});N.addProperty(J.HIDE_DELAY.key,{handler:this.configHideDelay,value:J.HIDE_DELAY.value,validator:J.HIDE_DELAY.validator,suppressEvent:J.HIDE_DELAY.suppressEvent});N.addProperty(J.SUBMENU_HIDE_DELAY.key,{value:J.SUBMENU_HIDE_DELAY.value,validator:J.SUBMENU_HIDE_DELAY.validator,suppressEvent:J.SUBMENU_HIDE_DELAY.suppressEvent});N.addProperty(J.CLICK_TO_HIDE.key,{value:J.CLICK_TO_HIDE.value,validator:J.CLICK_TO_HIDE.validator,suppressEvent:J.CLICK_TO_HIDE.suppressEvent});N.addProperty(J.CONTAINER.key,{handler:this.configContainer,value:document.body,suppressEvent:J.CONTAINER.suppressEvent});N.addProperty(J.SCROLL_INCREMENT.key,{value:J.SCROLL_INCREMENT.value,validator:J.SCROLL_INCREMENT.validator,supercedes:J.SCROLL_INCREMENT.supercedes,suppressEvent:J.SCROLL_INCREMENT.suppressEvent});N.addProperty(J.MIN_SCROLL_HEIGHT.key,{value:J.MIN_SCROLL_HEIGHT.value,validator:J.MIN_SCROLL_HEIGHT.validator,supercedes:J.MIN_SCROLL_HEIGHT.supercedes,suppressEvent:J.MIN_SCROLL_HEIGHT.suppressEvent});
N.addProperty(J.MAX_HEIGHT.key,{handler:this.configMaxHeight,value:J.MAX_HEIGHT.value,validator:J.MAX_HEIGHT.validator,suppressEvent:J.MAX_HEIGHT.suppressEvent,supercedes:J.MAX_HEIGHT.supercedes});N.addProperty(J.CLASS_NAME.key,{handler:this.configClassName,value:J.CLASS_NAME.value,validator:J.CLASS_NAME.validator,supercedes:J.CLASS_NAME.supercedes});N.addProperty(J.DISABLED.key,{handler:this.configDisabled,value:J.DISABLED.value,validator:J.DISABLED.validator,suppressEvent:J.DISABLED.suppressEvent});}});})();(function(){YAHOO.widget.MenuItem=function(K,J){if(K){if(J){this.parent=J.parent;this.value=J.value;this.id=J.id;}this.init(K,J);}};var B=YAHOO.util.Dom,C=YAHOO.widget.Module,E=YAHOO.widget.Menu,H=YAHOO.widget.MenuItem,I=YAHOO.util.CustomEvent,F=YAHOO.lang,D,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved","FOCUS":"focus","BLUR":"blur","DESTROY":"destroy"},G={"TEXT":{key:"text",value:"",validator:F.isString,suppressEvent:true},"HELP_TEXT":{key:"helptext",supercedes:["text"],suppressEvent:true},"URL":{key:"url",value:"#",suppressEvent:true},"TARGET":{key:"target",suppressEvent:true},"EMPHASIS":{key:"emphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"STRONG_EMPHASIS":{key:"strongemphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"CHECKED":{key:"checked",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["disabled","selected"]},"SUBMENU":{key:"submenu",suppressEvent:true,supercedes:["disabled","selected"]},"DISABLED":{key:"disabled",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text","selected"]},"SELECTED":{key:"selected",value:false,validator:F.isBoolean,suppressEvent:true},"ONCLICK":{key:"onclick",suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:F.isString,suppressEvent:true}};H.prototype={CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:H,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,browser:C.prototype.browser,id:null,destroyEvent:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,focusEvent:null,blurEvent:null,init:function(J,R){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=E;}this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();var O=I.LIST,N=this.cfg,P="#",Q,K,M,L;if(F.isString(J)){this._createRootNodeStructure();N.queueProperty("text",J);}else{if(J&&J.tagName){switch(J.tagName.toUpperCase()){case"OPTION":this._createRootNodeStructure();N.queueProperty("text",J.text);N.queueProperty("disabled",J.disabled);this.value=J.value;this.srcElement=J;break;case"OPTGROUP":this._createRootNodeStructure();N.queueProperty("text",J.label);N.queueProperty("disabled",J.disabled);this.srcElement=J;this._initSubTree();break;case"LI":Q=B.getFirstChild(J);if(Q){P=Q.getAttribute("href",2);K=Q.getAttribute("target");M=Q.innerHTML;}this.srcElement=J;this.element=J;this._oAnchor=Q;N.setProperty("text",M,true);N.setProperty("url",P,true);N.setProperty("target",K,true);this._initSubTree();break;}}}if(this.element){L=(this.srcElement||this.element).id;if(!L){L=this.id||B.generateId();this.element.id=L;}this.id=L;B.addClass(this.element,this.CSS_CLASS_NAME);B.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);this.mouseOverEvent.signature=O;this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);this.mouseOutEvent.signature=O;this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);this.mouseDownEvent.signature=O;this.mouseUpEvent=this.createEvent(A.MOUSE_UP);this.mouseUpEvent.signature=O;this.clickEvent=this.createEvent(A.CLICK);this.clickEvent.signature=O;this.keyPressEvent=this.createEvent(A.KEY_PRESS);this.keyPressEvent.signature=O;this.keyDownEvent=this.createEvent(A.KEY_DOWN);this.keyDownEvent.signature=O;this.keyUpEvent=this.createEvent(A.KEY_UP);this.keyUpEvent.signature=O;this.focusEvent=this.createEvent(A.FOCUS);this.focusEvent.signature=O;this.blurEvent=this.createEvent(A.BLUR);this.blurEvent.signature=O;this.destroyEvent=this.createEvent(A.DESTROY);this.destroyEvent.signature=O;if(R){N.applyConfig(R);}N.fireQueue();}},_createRootNodeStructure:function(){var J,K;if(!D){D=document.createElement("li");D.innerHTML='<a href="#"></a>';}J=D.cloneNode(true);J.className=this.CSS_CLASS_NAME;K=J.firstChild;K.className=this.CSS_LABEL_CLASS_NAME;this.element=J;this._oAnchor=K;},_initSubTree:function(){var P=this.srcElement,L=this.cfg,N,M,K,J,O;if(P.childNodes.length>0){if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()=="SELECT"){L.setProperty("submenu",{id:B.generateId(),itemdata:P.childNodes});}else{N=P.firstChild;M=[];do{if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":L.setProperty("submenu",N);break;case"OPTION":M[M.length]=N;break;}}}while((N=N.nextSibling));K=M.length;if(K>0){J=new this.SUBMENU_TYPE(B.generateId());L.setProperty("submenu",J);for(O=0;O<K;O++){J.addItem((new J.ITEM_TYPE(M[O])));}}}}},configText:function(S,L,N){var K=L[0],M=this.cfg,Q=this._oAnchor,J=M.getProperty("helptext"),R="",O="",P="";if(K){if(J){R='<em class="helptext">'+J+"</em>";}if(M.getProperty("emphasis")){O="<em>";P="</em>";}if(M.getProperty("strongemphasis")){O="<strong>";P="</strong>";}Q.innerHTML=(O+K+P+R);}},configHelpText:function(L,K,J){this.cfg.refireEvent("text");},configURL:function(L,K,J){var N=K[0];if(!N){N="#";}var M=this._oAnchor;if(YAHOO.env.ua.opera){M.removeAttribute("href");}M.setAttribute("href",N);},configTarget:function(M,L,K){var J=L[0],N=this._oAnchor;if(J&&J.length>0){N.setAttribute("target",J);}else{N.removeAttribute("target");}},configEmphasis:function(L,K,J){var N=K[0],M=this.cfg;
if(N&&M.getProperty("strongemphasis")){M.setProperty("strongemphasis",false);}M.refireEvent("text");},configStrongEmphasis:function(M,L,K){var J=L[0],N=this.cfg;if(J&&N.getProperty("emphasis")){N.setProperty("emphasis",false);}N.refireEvent("text");},configChecked:function(S,M,O){var R=M[0],K=this.element,Q=this._oAnchor,N=this.cfg,J="-checked",L=this.CSS_CLASS_NAME+J,P=this.CSS_LABEL_CLASS_NAME+J;if(R){B.addClass(K,L);B.addClass(Q,P);}else{B.removeClass(K,L);B.removeClass(Q,P);}N.refireEvent("text");if(N.getProperty("disabled")){N.refireEvent("disabled");}if(N.getProperty("selected")){N.refireEvent("selected");}},configDisabled:function(X,R,a){var Z=R[0],L=this.cfg,P=L.getProperty("submenu"),O=L.getProperty("checked"),S=this.element,V=this._oAnchor,U="-disabled",W="-checked"+U,Y="-hassubmenu"+U,M=this.CSS_CLASS_NAME+U,N=this.CSS_LABEL_CLASS_NAME+U,T=this.CSS_CLASS_NAME+W,Q=this.CSS_LABEL_CLASS_NAME+W,K=this.CSS_CLASS_NAME+Y,J=this.CSS_LABEL_CLASS_NAME+Y;if(Z){if(L.getProperty("selected")){L.setProperty("selected",false);}B.addClass(S,M);B.addClass(V,N);if(P){B.addClass(S,K);B.addClass(V,J);}if(O){B.addClass(S,T);B.addClass(V,Q);}}else{B.removeClass(S,M);B.removeClass(V,N);if(P){B.removeClass(S,K);B.removeClass(V,J);}if(O){B.removeClass(S,T);B.removeClass(V,Q);}}},configSelected:function(X,R,a){var L=this.cfg,Y=R[0],S=this.element,V=this._oAnchor,O=L.getProperty("checked"),P=L.getProperty("submenu"),U="-selected",W="-checked"+U,Z="-hassubmenu"+U,M=this.CSS_CLASS_NAME+U,N=this.CSS_LABEL_CLASS_NAME+U,T=this.CSS_CLASS_NAME+W,Q=this.CSS_LABEL_CLASS_NAME+W,K=this.CSS_CLASS_NAME+Z,J=this.CSS_LABEL_CLASS_NAME+Z;if(YAHOO.env.ua.opera){V.blur();}if(Y&&!L.getProperty("disabled")){B.addClass(S,M);B.addClass(V,N);if(P){B.addClass(S,K);B.addClass(V,J);}if(O){B.addClass(S,T);B.addClass(V,Q);}}else{B.removeClass(S,M);B.removeClass(V,N);if(P){B.removeClass(S,K);B.removeClass(V,J);}if(O){B.removeClass(S,T);B.removeClass(V,Q);}}if(this.hasFocus()&&YAHOO.env.ua.opera){V.focus();}},_onSubmenuBeforeHide:function(M,L){var N=this.parent,J;function K(){N._oAnchor.blur();J.beforeHideEvent.unsubscribe(K);}if(N.hasFocus()){J=N.parent;J.beforeHideEvent.subscribe(K);}},configSubmenu:function(V,O,R){var Q=O[0],P=this.cfg,K=this.element,T=this._oAnchor,N=this.parent&&this.parent.lazyLoad,J="-hassubmenu",L=this.CSS_CLASS_NAME+J,S=this.CSS_LABEL_CLASS_NAME+J,U,W,M;if(Q){if(Q instanceof E){U=Q;U.parent=this;U.lazyLoad=N;}else{if(typeof Q=="object"&&Q.id&&!Q.nodeType){W=Q.id;M=Q;M.lazyload=N;M.parent=this;U=new this.SUBMENU_TYPE(W,M);P.setProperty("submenu",U,true);}else{U=new this.SUBMENU_TYPE(Q,{lazyload:N,parent:this});P.setProperty("submenu",U,true);}}if(U){B.addClass(K,L);B.addClass(T,S);this._oSubmenu=U;if(YAHOO.env.ua.opera){U.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);}}}else{B.removeClass(K,L);B.removeClass(T,S);if(this._oSubmenu){this._oSubmenu.destroy();}}if(P.getProperty("disabled")){P.refireEvent("disabled");}if(P.getProperty("selected")){P.refireEvent("selected");}},configOnClick:function(L,K,J){var M=K[0];if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=M)){this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);this._oOnclickAttributeValue=null;}if(!this._oOnclickAttributeValue&&typeof M=="object"&&typeof M.fn=="function"){this.clickEvent.subscribe(M.fn,((!YAHOO.lang.isUndefined(M.obj))?M.obj:this),M.scope);this._oOnclickAttributeValue=M;}},configClassName:function(M,L,K){var J=L[0];if(this._sClassName){B.removeClass(this.element,this._sClassName);}B.addClass(this.element,J);this._sClassName=J;},initDefaultConfig:function(){var J=this.cfg;J.addProperty(G.TEXT.key,{handler:this.configText,value:G.TEXT.value,validator:G.TEXT.validator,suppressEvent:G.TEXT.suppressEvent});J.addProperty(G.HELP_TEXT.key,{handler:this.configHelpText,supercedes:G.HELP_TEXT.supercedes,suppressEvent:G.HELP_TEXT.suppressEvent});J.addProperty(G.URL.key,{handler:this.configURL,value:G.URL.value,suppressEvent:G.URL.suppressEvent});J.addProperty(G.TARGET.key,{handler:this.configTarget,suppressEvent:G.TARGET.suppressEvent});J.addProperty(G.EMPHASIS.key,{handler:this.configEmphasis,value:G.EMPHASIS.value,validator:G.EMPHASIS.validator,suppressEvent:G.EMPHASIS.suppressEvent,supercedes:G.EMPHASIS.supercedes});J.addProperty(G.STRONG_EMPHASIS.key,{handler:this.configStrongEmphasis,value:G.STRONG_EMPHASIS.value,validator:G.STRONG_EMPHASIS.validator,suppressEvent:G.STRONG_EMPHASIS.suppressEvent,supercedes:G.STRONG_EMPHASIS.supercedes});J.addProperty(G.CHECKED.key,{handler:this.configChecked,value:G.CHECKED.value,validator:G.CHECKED.validator,suppressEvent:G.CHECKED.suppressEvent,supercedes:G.CHECKED.supercedes});J.addProperty(G.DISABLED.key,{handler:this.configDisabled,value:G.DISABLED.value,validator:G.DISABLED.validator,suppressEvent:G.DISABLED.suppressEvent});J.addProperty(G.SELECTED.key,{handler:this.configSelected,value:G.SELECTED.value,validator:G.SELECTED.validator,suppressEvent:G.SELECTED.suppressEvent});J.addProperty(G.SUBMENU.key,{handler:this.configSubmenu,supercedes:G.SUBMENU.supercedes,suppressEvent:G.SUBMENU.suppressEvent});J.addProperty(G.ONCLICK.key,{handler:this.configOnClick,suppressEvent:G.ONCLICK.suppressEvent});J.addProperty(G.CLASS_NAME.key,{handler:this.configClassName,value:G.CLASS_NAME.value,validator:G.CLASS_NAME.validator,suppressEvent:G.CLASS_NAME.suppressEvent});},getNextEnabledSibling:function(){var L,O,J,N,M;function K(P,Q){return P[Q]||K(P,(Q+1));}if(this.parent instanceof E){L=this.groupIndex;O=this.parent.getItemGroups();if(this.index<(O[L].length-1)){J=K(O[L],(this.index+1));}else{if(L<(O.length-1)){N=L+1;}else{N=0;}M=K(O,N);J=K(M,0);}return(J.cfg.getProperty("disabled")||J.element.style.display=="none")?J.getNextEnabledSibling():J;}},getPreviousEnabledSibling:function(){var N,P,K,J,M;function O(Q,R){return Q[R]||O(Q,(R-1));}function L(Q,R){return Q[R]?R:L(Q,(R+1));}if(this.parent instanceof E){N=this.groupIndex;P=this.parent.getItemGroups();if(this.index>L(P[N],0)){K=O(P[N],(this.index-1));
}else{if(N>L(P,0)){J=N-1;}else{J=P.length-1;}M=O(P,J);K=O(M,(M.length-1));}return(K.cfg.getProperty("disabled")||K.element.style.display=="none")?K.getPreviousEnabledSibling():K;}},focus:function(){var N=this.parent,M=this._oAnchor,J=N.activeItem,L=this;function K(){try{if(YAHOO.env.ua.ie&&!document.hasFocus()){return ;}if(J){J.blurEvent.fire();}M.focus();L.focusEvent.fire();}catch(O){}}if(!this.cfg.getProperty("disabled")&&N&&N.cfg.getProperty("visible")&&this.element.style.display!="none"){window.setTimeout(K,0);}},blur:function(){var K=this.parent;if(!this.cfg.getProperty("disabled")&&K&&K.cfg.getProperty("visible")){var J=this;window.setTimeout(function(){try{J._oAnchor.blur();J.blurEvent.fire();}catch(L){}},0);}},hasFocus:function(){return(YAHOO.widget.MenuManager.getFocusedMenuItem()==this);},destroy:function(){var L=this.element,K,J;if(L){K=this.cfg.getProperty("submenu");if(K){K.destroy();}this.mouseOverEvent.unsubscribeAll();this.mouseOutEvent.unsubscribeAll();this.mouseDownEvent.unsubscribeAll();this.mouseUpEvent.unsubscribeAll();this.clickEvent.unsubscribeAll();this.keyPressEvent.unsubscribeAll();this.keyDownEvent.unsubscribeAll();this.keyUpEvent.unsubscribeAll();this.focusEvent.unsubscribeAll();this.blurEvent.unsubscribeAll();this.cfg.configChangedEvent.unsubscribeAll();J=L.parentNode;if(J){J.removeChild(L);this.destroyEvent.fire();}this.destroyEvent.unsubscribeAll();}},toString:function(){var K="MenuItem",J=this.id;if(J){K+=(" "+J);}return K;}};F.augmentProto(H,YAHOO.util.EventProvider);})();(function(){YAHOO.widget.ContextMenu=function(G,F){YAHOO.widget.ContextMenu.superclass.constructor.call(this,G,F);};var B=YAHOO.util.Event,E=YAHOO.widget.ContextMenu,D={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(YAHOO.env.ua.opera?"mousedown":"contextmenu"),"CLICK":"click"},C={"TRIGGER":{key:"trigger",suppressEvent:true}};function A(G,F,H){this.cfg.setProperty("xy",H);this.beforeShowEvent.unsubscribe(A,H);}YAHOO.lang.extend(E,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(G,F){E.superclass.init.call(this,G);this.beforeInitEvent.fire(E);if(F){this.cfg.applyConfig(F,true);}this.initEvent.fire(E);},initEvents:function(){E.superclass.initEvents.call(this);this.triggerContextMenuEvent=this.createEvent(D.TRIGGER_CONTEXT_MENU);this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;},cancel:function(){this._bCancelled=true;},_removeEventHandlers:function(){var F=this._oTrigger;if(F){B.removeListener(F,D.CONTEXT_MENU,this._onTriggerContextMenu);if(YAHOO.env.ua.opera){B.removeListener(F,D.CLICK,this._onTriggerClick);}}},_onTriggerClick:function(G,F){if(G.ctrlKey){B.stopEvent(G);}},_onTriggerContextMenu:function(H,F){if(H.type=="mousedown"&&!H.ctrlKey){return ;}var G;B.stopEvent(H);this.contextEventTarget=B.getTarget(H);this.triggerContextMenuEvent.fire(H);YAHOO.widget.MenuManager.hideVisible();if(!this._bCancelled){G=B.getXY(H);if(!YAHOO.util.Dom.inDocument(this.element)){this.beforeShowEvent.subscribe(A,G);}else{this.cfg.setProperty("xy",G);}this.show();}this._bCancelled=false;},toString:function(){var G="ContextMenu",F=this.id;if(F){G+=(" "+F);}return G;},initDefaultConfig:function(){E.superclass.initDefaultConfig.call(this);this.cfg.addProperty(C.TRIGGER.key,{handler:this.configTrigger,suppressEvent:C.TRIGGER.suppressEvent});},destroy:function(){this._removeEventHandlers();E.superclass.destroy.call(this);},configTrigger:function(G,F,I){var H=F[0];if(H){if(this._oTrigger){this._removeEventHandlers();}this._oTrigger=H;B.on(H,D.CONTEXT_MENU,this._onTriggerContextMenu,this,true);if(YAHOO.env.ua.opera){B.on(H,D.CLICK,this._onTriggerClick,this,true);}}else{this._removeEventHandlers();}}});}());YAHOO.widget.ContextMenuItem=YAHOO.widget.MenuItem;(function(){YAHOO.widget.MenuBar=function(F,E){YAHOO.widget.MenuBar.superclass.constructor.call(this,F,E);};function D(E){if(typeof E=="string"){return("dynamic,static".indexOf((E.toLowerCase()))!=-1);}}var B=YAHOO.util.Event,A=YAHOO.widget.MenuBar,C={"POSITION":{key:"position",value:"static",validator:D,supercedes:["visible"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","bl"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:false,validator:YAHOO.lang.isBoolean,suppressEvent:true}};YAHOO.lang.extend(A,YAHOO.widget.Menu,{init:function(F,E){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuBarItem;}A.superclass.init.call(this,F);this.beforeInitEvent.fire(A);if(E){this.cfg.applyConfig(E,true);}this.initEvent.fire(A);},CSS_CLASS_NAME:"yuimenubar",_onKeyDown:function(G,F,K){var E=F[0],L=F[1],I,J,H;if(L&&!L.cfg.getProperty("disabled")){J=L.cfg;switch(E.keyCode){case 37:case 39:if(L==this.activeItem&&!J.getProperty("selected")){J.setProperty("selected",true);}else{H=(E.keyCode==37)?L.getPreviousEnabledSibling():L.getNextEnabledSibling();if(H){this.clearActiveItem();H.cfg.setProperty("selected",true);if(this.cfg.getProperty("autosubmenudisplay")){I=H.cfg.getProperty("submenu");if(I){I.show();}}H.focus();}}B.preventDefault(E);break;case 40:if(this.activeItem!=L){this.clearActiveItem();J.setProperty("selected",true);L.focus();}I=J.getProperty("submenu");if(I){if(I.cfg.getProperty("visible")){I.setInitialSelection();I.setInitialFocus();}else{I.show();}}B.preventDefault(E);break;}}if(E.keyCode==27&&this.activeItem){I=this.activeItem.cfg.getProperty("submenu");if(I&&I.cfg.getProperty("visible")){I.hide();this.activeItem.focus();}else{this.activeItem.cfg.setProperty("selected",false);this.activeItem.blur();}B.preventDefault(E);}},_onClick:function(L,G,J){A.superclass._onClick.call(this,L,G,J);var K=G[1],M,E,F,H,I;if(K&&!K.cfg.getProperty("disabled")){M=G[0];E=B.getTarget(M);F=this.activeItem;H=this.cfg;if(F&&F!=K){this.clearActiveItem();}K.cfg.setProperty("selected",true);I=K.cfg.getProperty("submenu");if(I){if(I.cfg.getProperty("visible")){I.hide();}else{I.show();}}}},toString:function(){var F="MenuBar",E=this.id;if(E){F+=(" "+E);}return F;
},initDefaultConfig:function(){A.superclass.initDefaultConfig.call(this);var E=this.cfg;E.addProperty(C.POSITION.key,{handler:this.configPosition,value:C.POSITION.value,validator:C.POSITION.validator,supercedes:C.POSITION.supercedes});E.addProperty(C.SUBMENU_ALIGNMENT.key,{value:C.SUBMENU_ALIGNMENT.value,suppressEvent:C.SUBMENU_ALIGNMENT.suppressEvent});E.addProperty(C.AUTO_SUBMENU_DISPLAY.key,{value:C.AUTO_SUBMENU_DISPLAY.value,validator:C.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:C.AUTO_SUBMENU_DISPLAY.suppressEvent});}});}());YAHOO.widget.MenuBarItem=function(B,A){YAHOO.widget.MenuBarItem.superclass.constructor.call(this,B,A);};YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(B,A){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.Menu;}YAHOO.widget.MenuBarItem.superclass.init.call(this,B);var C=this.cfg;if(A){C.applyConfig(A,true);}C.fireQueue();},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){var A="MenuBarItem";if(this.cfg&&this.cfg.getProperty("text")){A+=(": "+this.cfg.getProperty("text"));}return A;}});YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.widget.LogMsg=function(A){this.msg=this.time=this.category=this.source=this.sourceDetail=null;if(A&&(A.constructor==Object)){for(var B in A){this[B]=A[B];}}};YAHOO.widget.LogWriter=function(A){if(!A){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return ;}this._source=A;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(A,B){YAHOO.widget.Logger.log(A,B,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._sSource;};YAHOO.widget.LogWriter.prototype.setSource=function(A){if(!A){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return ;}else{this._sSource=A;}};YAHOO.widget.LogWriter.prototype._source=null;YAHOO.widget.LogReader=function(B,A){this._sName=YAHOO.widget.LogReader._index;YAHOO.widget.LogReader._index++;this._buffer=[];this._filterCheckboxes={};this._lastTime=YAHOO.widget.Logger.getStartTime();if(A&&(A.constructor==Object)){for(var C in A){this[C]=A[C];}}this._initContainerEl(B);if(!this._elContainer){YAHOO.log("Could not instantiate LogReader due to an invalid container element "+B,"error",this.toString());return ;}this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initDragDrop();this._initCategories();this._initSources();YAHOO.widget.Logger.newLogEvent.subscribe(this._onNewLog,this);YAHOO.widget.Logger.logResetEvent.subscribe(this._onReset,this);YAHOO.widget.Logger.categoryCreateEvent.subscribe(this._onCategoryCreate,this);YAHOO.widget.Logger.sourceCreateEvent.subscribe(this._onSourceCreate,this);this._filterLogs();YAHOO.log("LogReader initialized",null,this.toString());};YAHOO.lang.augmentObject(YAHOO.widget.LogReader,{_index:0,ENTRY_TEMPLATE:(function(){var A=document.createElement("pre");YAHOO.util.Dom.addClass(A,"yui-log-entry");return A;})(),VERBOSE_TEMPLATE:"<span class='{category}'>{label}</span>{totalTime}ms (+{elapsedTime}) {localTime}:</p><p>{sourceAndDetail}</p><p>{message}</p>",BASIC_TEMPLATE:"<p><span class='{category}'>{label}</span>{totalTime}ms (+{elapsedTime}) {localTime}: {sourceAndDetail}: {message}</p>"});YAHOO.widget.LogReader.prototype={logReaderEnabled:true,width:null,height:null,top:null,left:null,right:null,bottom:null,fontSize:null,footerEnabled:true,verboseOutput:true,entryFormat:null,newestOnTop:true,outputBuffer:100,thresholdMax:500,thresholdMin:100,isCollapsed:false,isPaused:false,draggable:true,toString:function(){return"LogReader instance"+this._sName;},pause:function(){this.isPaused=true;this._btnPause.value="Resume";this._timeout=null;this.logReaderEnabled=false;},resume:function(){this.isPaused=false;this._btnPause.value="Pause";this.logReaderEnabled=true;this._printBuffer();},hide:function(){this._elContainer.style.display="none";},show:function(){this._elContainer.style.display="block";},collapse:function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}this._btnCollapse.value="Expand";this.isCollapsed=true;},expand:function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}this._btnCollapse.value="Collapse";this.isCollapsed=false;},getCheckbox:function(A){return this._filterCheckboxes[A];},getCategories:function(){return this._categoryFilters;},showCategory:function(B){var D=this._categoryFilters;if(D.indexOf){if(D.indexOf(B)>-1){return ;}}else{for(var A=0;A<D.length;A++){if(D[A]===B){return ;}}}this._categoryFilters.push(B);this._filterLogs();var C=this.getCheckbox(B);if(C){C.checked=true;}},hideCategory:function(B){var D=this._categoryFilters;for(var A=0;A<D.length;A++){if(B==D[A]){D.splice(A,1);break;}}this._filterLogs();var C=this.getCheckbox(B);if(C){C.checked=false;}},getSources:function(){return this._sourceFilters;},showSource:function(A){var D=this._sourceFilters;if(D.indexOf){if(D.indexOf(A)>-1){return ;}}else{for(var B=0;B<D.length;B++){if(A==D[B]){return ;}}}D.push(A);this._filterLogs();var C=this.getCheckbox(A);if(C){C.checked=true;}},hideSource:function(A){var D=this._sourceFilters;for(var B=0;B<D.length;B++){if(A==D[B]){D.splice(B,1);break;}}this._filterLogs();var C=this.getCheckbox(A);if(C){C.checked=false;}},clearConsole:function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var A=this._elConsole;A.innerHTML="";},setTitle:function(A){this._title.innerHTML=this.html2Text(A);},getLastTime:function(){return this._lastTime;},formatMsg:function(C){var B=YAHOO.widget.LogReader,A=this.entryFormat||(this.verboseOutput?B.VERBOSE_TEMPLATE:B.BASIC_TEMPLATE),D={category:C.category,label:C.category.substring(0,4).toUpperCase(),sourceAndDetail:C.sourceDetail?C.source+" "+C.sourceDetail:C.source,message:this.html2Text(C.msg||C.message||"")};if(C.time&&C.time.getTime){D.localTime=C.time.toLocaleTimeString?C.time.toLocaleTimeString():C.time.toString();D.elapsedTime=C.time.getTime()-this.getLastTime();D.totalTime=C.time.getTime()-YAHOO.widget.Logger.getStartTime();}var E=B.ENTRY_TEMPLATE.cloneNode(true);if(this.verboseOutput){E.className+=" yui-log-verbose";}E.innerHTML=YAHOO.lang.substitute(A,D);return E;},html2Text:function(A){if(A){A+="";return A.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");}return"";},_sName:null,_buffer:null,_consoleMsgCount:0,_lastTime:null,_timeout:null,_filterCheckboxes:null,_categoryFilters:null,_sourceFilters:null,_elContainer:null,_elHd:null,_elCollapse:null,_btnCollapse:null,_title:null,_elConsole:null,_elFt:null,_elBtns:null,_elCategoryFilters:null,_elSourceFilters:null,_btnPause:null,_btnClear:null,_initContainerEl:function(B){B=YAHOO.util.Dom.get(B);if(B&&B.tagName&&(B.tagName.toLowerCase()=="div")){this._elContainer=B;YAHOO.util.Dom.addClass(this._elContainer,"yui-log");}else{this._elContainer=document.body.appendChild(document.createElement("div"));YAHOO.util.Dom.addClass(this._elContainer,"yui-log");YAHOO.util.Dom.addClass(this._elContainer,"yui-log-container");var A=this._elContainer.style;
if(this.width){A.width=this.width;}if(this.right){A.right=this.right;}if(this.top){A.top=this.top;}if(this.left){A.left=this.left;A.right="auto";}if(this.bottom){A.bottom=this.bottom;A.top="auto";}if(this.fontSize){A.fontSize=this.fontSize;}if(navigator.userAgent.toLowerCase().indexOf("opera")!=-1){document.body.style+="";}}},_initHeaderEl:function(){var A=this;if(this._elHd){YAHOO.util.Event.purgeElement(this._elHd,true);this._elHd.innerHTML="";}this._elHd=this._elContainer.appendChild(document.createElement("div"));this._elHd.id="yui-log-hd"+this._sName;this._elHd.className="yui-log-hd";this._elCollapse=this._elHd.appendChild(document.createElement("div"));this._elCollapse.className="yui-log-btns";this._btnCollapse=document.createElement("input");this._btnCollapse.type="button";this._btnCollapse.className="yui-log-button";this._btnCollapse.value="Collapse";this._btnCollapse=this._elCollapse.appendChild(this._btnCollapse);YAHOO.util.Event.addListener(A._btnCollapse,"click",A._onClickCollapseBtn,A);this._title=this._elHd.appendChild(document.createElement("h4"));this._title.innerHTML="Logger Console";},_initConsoleEl:function(){if(this._elConsole){YAHOO.util.Event.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}this._elConsole=this._elContainer.appendChild(document.createElement("div"));this._elConsole.className="yui-log-bd";if(this.height){this._elConsole.style.height=this.height;}},_initFooterEl:function(){var A=this;if(this.footerEnabled){if(this._elFt){YAHOO.util.Event.purgeElement(this._elFt,true);this._elFt.innerHTML="";}this._elFt=this._elContainer.appendChild(document.createElement("div"));this._elFt.className="yui-log-ft";this._elBtns=this._elFt.appendChild(document.createElement("div"));this._elBtns.className="yui-log-btns";this._btnPause=document.createElement("input");this._btnPause.type="button";this._btnPause.className="yui-log-button";this._btnPause.value="Pause";this._btnPause=this._elBtns.appendChild(this._btnPause);YAHOO.util.Event.addListener(A._btnPause,"click",A._onClickPauseBtn,A);this._btnClear=document.createElement("input");this._btnClear.type="button";this._btnClear.className="yui-log-button";this._btnClear.value="Clear";this._btnClear=this._elBtns.appendChild(this._btnClear);YAHOO.util.Event.addListener(A._btnClear,"click",A._onClickClearBtn,A);this._elCategoryFilters=this._elFt.appendChild(document.createElement("div"));this._elCategoryFilters.className="yui-log-categoryfilters";this._elSourceFilters=this._elFt.appendChild(document.createElement("div"));this._elSourceFilters.className="yui-log-sourcefilters";}},_initDragDrop:function(){if(YAHOO.util.DD&&this.draggable&&this._elHd){var A=new YAHOO.util.DD(this._elContainer);A.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}},_initCategories:function(){this._categoryFilters=[];var C=YAHOO.widget.Logger.categories;for(var A=0;A<C.length;A++){var B=C[A];this._categoryFilters.push(B);if(this._elCategoryFilters){this._createCategoryCheckbox(B);}}},_initSources:function(){this._sourceFilters=[];var C=YAHOO.widget.Logger.sources;for(var B=0;B<C.length;B++){var A=C[B];this._sourceFilters.push(A);if(this._elSourceFilters){this._createSourceCheckbox(A);}}},_createCategoryCheckbox:function(B){var A=this;if(this._elFt){var E=this._elCategoryFilters;var D=E.appendChild(document.createElement("span"));D.className="yui-log-filtergrp";var C=document.createElement("input");C.id="yui-log-filter-"+B+this._sName;C.className="yui-log-filter-"+B;C.type="checkbox";C.category=B;C=D.appendChild(C);C.checked=true;YAHOO.util.Event.addListener(C,"click",A._onCheckCategory,A);var F=D.appendChild(document.createElement("label"));F.htmlFor=C.id;F.className=B;F.innerHTML=B;this._filterCheckboxes[B]=C;}},_createSourceCheckbox:function(A){var D=this;if(this._elFt){var F=this._elSourceFilters;var E=F.appendChild(document.createElement("span"));E.className="yui-log-filtergrp";var C=document.createElement("input");C.id="yui-log-filter"+A+this._sName;C.className="yui-log-filter"+A;C.type="checkbox";C.source=A;C=E.appendChild(C);C.checked=true;YAHOO.util.Event.addListener(C,"click",D._onCheckSource,D);var B=E.appendChild(document.createElement("label"));B.htmlFor=C.id;B.className=A;B.innerHTML=A;this._filterCheckboxes[A]=C;}},_filterLogs:function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(YAHOO.widget.Logger.getStack());}},_printBuffer:function(){this._timeout=null;if(this._elConsole!==null){var B=this.thresholdMax;B=(B&&!isNaN(B))?B:500;if(this._consoleMsgCount<B){var A=[];for(var C=0;C<this._buffer.length;C++){A[C]=this._buffer[C];}this._buffer=[];this._printToConsole(A);}else{this._filterLogs();}if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}},_printToConsole:function(I){var B=I.length,M=document.createDocumentFragment(),P=[],Q=this.thresholdMin,C=this._sourceFilters.length,N=this._categoryFilters.length,K,H,G,F,L;if(isNaN(Q)||(Q>this.thresholdMax)){Q=0;}K=(B>Q)?(B-Q):0;for(H=K;H<B;H++){var E=false;var J=false;var O=I[H];var A=O.source;var D=O.category;for(G=0;G<C;G++){if(A==this._sourceFilters[G]){J=true;break;}}if(J){for(G=0;G<N;G++){if(D==this._categoryFilters[G]){E=true;break;}}}if(E){F=this.formatMsg(O);if(typeof F==="string"){P[P.length]=F;}else{M.insertBefore(F,this.newestOnTop?M.firstChild||null:null);}this._consoleMsgCount++;this._lastTime=O.time.getTime();}}if(P.length){P.splice(0,0,this._elConsole.innerHTML);this._elConsole.innerHTML=this.newestOnTop?P.reverse().join(""):P.join("");}else{if(M.firstChild){this._elConsole.insertBefore(M,this.newestOnTop?this._elConsole.firstChild||null:null);}}},_onCategoryCreate:function(D,C,A){var B=C[0];A._categoryFilters.push(B);if(A._elFt){A._createCategoryCheckbox(B);}},_onSourceCreate:function(D,C,A){var B=C[0];A._sourceFilters.push(B);if(A._elFt){A._createSourceCheckbox(B);}},_onCheckCategory:function(A,B){var C=this.category;if(!this.checked){B.hideCategory(C);}else{B.showCategory(C);}},_onCheckSource:function(A,B){var C=this.source;
if(!this.checked){B.hideSource(C);}else{B.showSource(C);}},_onClickCollapseBtn:function(A,B){if(!B.isCollapsed){B.collapse();}else{B.expand();}},_onClickPauseBtn:function(A,B){if(!B.isPaused){B.pause();}else{B.resume();}},_onClickClearBtn:function(A,B){B.clearConsole();},_onNewLog:function(D,C,A){var B=C[0];A._buffer.push(B);if(A.logReaderEnabled===true&&A._timeout===null){A._timeout=setTimeout(function(){A._printBuffer();},A.outputBuffer);}},_onReset:function(C,B,A){A._filterLogs();}};if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null,_windowErrorsHandled:false,_origOnWindowError:null};YAHOO.widget.Logger.log=function(B,F,G){if(this.loggerEnabled){if(!F){F="info";}else{F=F.toLocaleLowerCase();if(this._isNewCategory(F)){this._createNewCategory(F);}}var C="global";var A=null;if(G){var D=G.indexOf(" ");if(D>0){C=G.substring(0,D);A=G.substring(D,G.length);}else{C=G;}if(this._isNewSource(C)){this._createNewSource(C);}}var H=new Date();var J=new YAHOO.widget.LogMsg({msg:B,time:H,category:F,source:C,sourceDetail:A});var I=this._stack;var E=this.maxStackEntries;if(E&&!isNaN(E)&&(I.length>=E)){I.shift();}I.push(J);this.newLogEvent.fire(J);if(this._browserConsoleEnabled){this._printToBrowserConsole(J);}return true;}else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.handleWindowErrors=function(){if(!YAHOO.widget.Logger._windowErrorsHandled){if(window.error){YAHOO.widget.Logger._origOnWindowError=window.onerror;}window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger._windowErrorsHandled=true;YAHOO.log("Logger handling of window.onerror has been enabled.");}else{YAHOO.log("Logger handling of window.onerror had already been enabled.");}};YAHOO.widget.Logger.unhandleWindowErrors=function(){if(YAHOO.widget.Logger._windowErrorsHandled){if(YAHOO.widget.Logger._origOnWindowError){window.onerror=YAHOO.widget.Logger._origOnWindowError;YAHOO.widget.Logger._origOnWindowError=null;}else{window.onerror=null;}YAHOO.widget.Logger._windowErrorsHandled=false;YAHOO.log("Logger handling of window.onerror has been disabled.");}else{YAHOO.log("Logger handling of window.onerror had already been disabled.");}};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(A){this.categories.push(A);this.categoryCreateEvent.fire(A);};YAHOO.widget.Logger._isNewCategory=function(B){for(var A=0;A<this.categories.length;A++){if(B==this.categories[A]){return false;}}return true;};YAHOO.widget.Logger._createNewSource=function(A){this.sources.push(A);this.sourceCreateEvent.fire(A);};YAHOO.widget.Logger._isNewSource=function(A){if(A){for(var B=0;B<this.sources.length;B++){if(A==this.sources[B]){return false;}}return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(C){if(window.console&&console.log){var E=C.category;var D=C.category.substring(0,4).toUpperCase();var G=C.time;var F;if(G.toLocaleTimeString){F=G.toLocaleTimeString();}else{F=G.toString();}var H=G.getTime();var B=(YAHOO.widget.Logger._lastTime)?(H-YAHOO.widget.Logger._lastTime):0;YAHOO.widget.Logger._lastTime=H;var A=F+" ("+B+"ms): "+C.source+": ";console.log(A,C.msg);}};YAHOO.widget.Logger._onWindowError=function(A,C,B){try{YAHOO.widget.Logger.log(A+" ("+C+", line "+B+")","window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}catch(D){return false;}};YAHOO.widget.Logger.log("Logger initialized");}YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(D,C){for(var E in this.ids){for(var B in this.ids[E]){var F=this.ids[E][B];if(!this.isTypeOfDD(F)){continue;}F[D].apply(F,C);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(B){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(C,B){if(!this.initialized){this.init();}if(!this.ids[B]){this.ids[B]={};}this.ids[B][C.id]=C;},removeDDFromGroup:function(D,B){if(!this.ids[B]){this.ids[B]={};}var C=this.ids[B];if(C&&C[D.id]){delete C[D.id];}},_remove:function(C){for(var B in C.groups){if(B&&this.ids[B][C.id]){delete this.ids[B][C.id];}}delete this.handleIds[C.id];},regHandle:function(C,B){if(!this.handleIds[C]){this.handleIds[C]={};}this.handleIds[C][B]=B;},isDragDrop:function(B){return(this.getDDById(B))?true:false;},getRelated:function(G,C){var F=[];for(var E in G.groups){for(var D in this.ids[E]){var B=this.ids[E][D];if(!this.isTypeOfDD(B)){continue;}if(!C||B.isTarget){F[F.length]=B;}}}return F;},isLegalTarget:function(F,E){var C=this.getRelated(F,true);for(var D=0,B=C.length;D<B;++D){if(C[D].id==E.id){return true;}}return false;},isTypeOfDD:function(B){return(B&&B.__ygDragDrop);},isHandle:function(C,B){return(this.handleIds[C]&&this.handleIds[C][B]);},getDDById:function(C){for(var B in this.ids){if(this.ids[B][C]){return this.ids[B][C];}}return null;},handleMouseDown:function(D,C){this.currentTarget=YAHOO.util.Event.getTarget(D);this.dragCurrent=C;var B=C.getEl();this.startX=YAHOO.util.Event.getPageX(D);this.startY=YAHOO.util.Event.getPageY(D);this.deltaX=this.startX-B.offsetLeft;this.deltaY=this.startY-B.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var E=YAHOO.util.DDM;E.startDrag(E.startX,E.startY);E.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(B,D){clearTimeout(this.clickTimeout);var C=this.dragCurrent;if(C&&C.events.b4StartDrag){C.b4StartDrag(B,D);C.fireEvent("b4StartDragEvent",{x:B,y:D});}if(C&&C.events.startDrag){C.startDrag(B,D);C.fireEvent("startDragEvent",{x:B,y:D});}this.dragThreshMet=true;},handleMouseUp:function(B){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(B);}this.fromTimeout=false;this.fireEvents(B,true);}else{}this.stopDrag(B);this.stopEvent(B);}},stopEvent:function(B){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(B);}if(this.preventDefault){YAHOO.util.Event.preventDefault(B);}},stopDrag:function(D,C){var B=this.dragCurrent;if(B&&!C){if(this.dragThreshMet){if(B.events.b4EndDrag){B.b4EndDrag(D);B.fireEvent("b4EndDragEvent",{e:D});}if(B.events.endDrag){B.endDrag(D);B.fireEvent("endDragEvent",{e:D});}}if(B.events.mouseUp){B.onMouseUp(D);B.fireEvent("mouseUpEvent",{e:D});}}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(E){var B=this.dragCurrent;if(B){if(YAHOO.util.Event.isIE&&!E.button){this.stopEvent(E);return this.handleMouseUp(E);}else{if(E.clientX<0||E.clientY<0){}}if(!this.dragThreshMet){var D=Math.abs(this.startX-YAHOO.util.Event.getPageX(E));var C=Math.abs(this.startY-YAHOO.util.Event.getPageY(E));if(D>this.clickPixelThresh||C>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(B&&B.events.b4Drag){B.b4Drag(E);B.fireEvent("b4DragEvent",{e:E});}if(B&&B.events.drag){B.onDrag(E);B.fireEvent("dragEvent",{e:E});}if(B){this.fireEvents(E,false);}}this.stopEvent(E);}},fireEvents:function(U,K){var Z=this.dragCurrent;if(!Z||Z.isLocked()||Z.dragOnly){return ;}var M=YAHOO.util.Event.getPageX(U),L=YAHOO.util.Event.getPageY(U),O=new YAHOO.util.Point(M,L),J=Z.getTargetCoord(O.x,O.y),E=Z.getDragEl(),D=["out","over","drop","enter"],T=new YAHOO.util.Region(J.y,J.x+E.offsetWidth,J.y+E.offsetHeight,J.x),H=[],C={},P=[],a={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var R in this.dragOvers){var c=this.dragOvers[R];if(!this.isTypeOfDD(c)){continue;}if(!this.isOverTarget(O,c,this.mode,T)){a.outEvts.push(c);}H[R]=true;delete this.dragOvers[R];}for(var Q in Z.groups){if("string"!=typeof Q){continue;}for(R in this.ids[Q]){var F=this.ids[Q][R];if(!this.isTypeOfDD(F)){continue;}if(F.isTarget&&!F.isLocked()&&F!=Z){if(this.isOverTarget(O,F,this.mode,T)){C[Q]=true;if(K){a.dropEvts.push(F);}else{if(!H[F.id]){a.enterEvts.push(F);}else{a.overEvts.push(F);}this.dragOvers[F.id]=F;}}}}}this.interactionInfo={out:a.outEvts,enter:a.enterEvts,over:a.overEvts,drop:a.dropEvts,point:O,draggedRegion:T,sourceRegion:this.locationCache[Z.id],validDrop:K};for(var B in C){P.push(B);}if(K&&!a.dropEvts.length){this.interactionInfo.validDrop=false;if(Z.events.invalidDrop){Z.onInvalidDrop(U);Z.fireEvent("invalidDropEvent",{e:U});}}for(R=0;R<D.length;R++){var X=null;if(a[D[R]+"Evts"]){X=a[D[R]+"Evts"];}if(X&&X.length){var G=D[R].charAt(0).toUpperCase()+D[R].substr(1),W="onDrag"+G,I="b4Drag"+G,N="drag"+G+"Event",V="drag"+G;if(this.mode){if(Z.events[I]){Z[I](U,X,P);Z.fireEvent(I+"Event",{event:U,info:X,group:P});}if(Z.events[V]){Z[W](U,X,P);Z.fireEvent(N,{event:U,info:X,group:P});}}else{for(var Y=0,S=X.length;Y<S;++Y){if(Z.events[I]){Z[I](U,X[Y].id,P[0]);Z.fireEvent(I+"Event",{event:U,info:X[Y].id,group:P[0]});}if(Z.events[V]){Z[W](U,X[Y].id,P[0]);Z.fireEvent(N,{event:U,info:X[Y].id,group:P[0]});
}}}}}},getBestMatch:function(D){var F=null;var C=D.length;if(C==1){F=D[0];}else{for(var E=0;E<C;++E){var B=D[E];if(this.mode==this.INTERSECT&&B.cursorIsOver){F=B;break;}else{if(!F||!F.overlap||(B.overlap&&F.overlap.getArea()<B.overlap.getArea())){F=B;}}}}return F;},refreshCache:function(C){var E=C||this.ids;for(var B in E){if("string"!=typeof B){continue;}for(var D in this.ids[B]){var F=this.ids[B][D];if(this.isTypeOfDD(F)){var G=this.getLocation(F);if(G){this.locationCache[F.id]=G;}else{delete this.locationCache[F.id];}}}}},verifyEl:function(C){try{if(C){var B=C.offsetParent;if(B){return true;}}}catch(D){}return false;},getLocation:function(G){if(!this.isTypeOfDD(G)){return null;}var E=G.getEl(),J,D,C,L,K,M,B,I,F;try{J=YAHOO.util.Dom.getXY(E);}catch(H){}if(!J){return null;}D=J[0];C=D+E.offsetWidth;L=J[1];K=L+E.offsetHeight;M=L-G.padding[0];B=C+G.padding[1];I=K+G.padding[2];F=D-G.padding[3];return new YAHOO.util.Region(M,B,I,F);},isOverTarget:function(J,B,D,E){var F=this.locationCache[B.id];if(!F||!this.useCache){F=this.getLocation(B);this.locationCache[B.id]=F;}if(!F){return false;}B.cursorIsOver=F.contains(J);var I=this.dragCurrent;if(!I||(!D&&!I.constrainX&&!I.constrainY)){return B.cursorIsOver;}B.overlap=null;if(!E){var G=I.getTargetCoord(J.x,J.y);var C=I.getDragEl();E=new YAHOO.util.Region(G.y,G.x+C.offsetWidth,G.y+C.offsetHeight,G.x);}var H=E.intersect(F);if(H){B.overlap=H;return(D)?true:B.cursorIsOver;}else{return false;}},_onUnload:function(C,B){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(C){var B=this.elementCache[C];if(!B||!B.el){B=this.elementCache[C]=new this.ElementWrapper(YAHOO.util.Dom.get(C));}return B;},getElement:function(B){return YAHOO.util.Dom.get(B);},getCss:function(C){var B=YAHOO.util.Dom.get(C);return(B)?B.style:null;},ElementWrapper:function(B){this.el=B||null;this.id=this.el&&B.id;this.css=this.el&&B.style;},getPosX:function(B){return YAHOO.util.Dom.getX(B);},getPosY:function(B){return YAHOO.util.Dom.getY(B);},swapNode:function(D,B){if(D.swapNode){D.swapNode(B);}else{var E=B.parentNode;var C=B.nextSibling;if(C==D){E.insertBefore(D,B);}else{if(B==D.nextSibling){E.insertBefore(B,D);}else{D.parentNode.replaceChild(B,D);E.insertBefore(D,C);}}}},getScroll:function(){var D,B,E=document.documentElement,C=document.body;if(E&&(E.scrollTop||E.scrollLeft)){D=E.scrollTop;B=E.scrollLeft;}else{if(C){D=C.scrollTop;B=C.scrollLeft;}else{}}return{top:D,left:B};},getStyle:function(C,B){return YAHOO.util.Dom.getStyle(C,B);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(B,D){var C=YAHOO.util.Dom.getXY(D);YAHOO.util.Dom.setXY(B,C);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(C,B){return(C-B);},_timeoutCount:0,_addListeners:function(){var B=YAHOO.util.DDM;if(YAHOO.util.Event&&document){B._onLoad();}else{if(B._timeoutCount>2000){}else{setTimeout(B._addListeners,10);if(document&&document.body){B._timeoutCount+=1;}}}},handleWasClicked:function(B,D){if(this.isHandle(D,B.id)){return true;}else{var C=B.parentNode;while(C){if(this.isHandle(D,C.id)){return true;}else{C=C.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);
},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}else{}return ;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(H,G){var D=H.which||H.button;if(this.primaryButtonOnly&&D>1){return ;}if(this.isLocked()){return ;}var C=this.b4MouseDown(H);if(this.events.b4MouseDown){C=this.fireEvent("b4MouseDownEvent",H);}var E=this.onMouseDown(H);if(this.events.mouseDown){E=this.fireEvent("mouseDownEvent",H);}if((C===false)||(E===false)){return ;}this.DDM.refreshCache(this.groups);var F=new YAHOO.util.Point(A.getPageX(H),A.getPageY(H));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(F,this)){}else{if(this.clickValidator(H)){this.setStartPosition();this.DDM.handleMouseDown(H,this);this.DDM.stopEvent(H);}else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y];
}else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return ;}var G=this.getDragEl(),E=YAHOO.util.Dom;if(!G){G=document.createElement("div");G.id=this.dragElId;var D=G.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");G.appendChild(C);if(YAHOO.env.ua.ie){var F=document.createElement("iframe");F.setAttribute("src","javascript:");F.setAttribute("scrolling","no");F.setAttribute("frameborder","0");G.insertBefore(F,G.firstChild);E.setStyle(F,"height","100%");E.setStyle(F,"width","100%");E.setStyle(F,"position","absolute");E.setStyle(F,"top","0");E.setStyle(F,"left","0");E.setStyle(F,"opacity","0");E.setStyle(F,"zIndex","-1");E.setStyle(F.nextSibling,"zIndex","2");}A.insertBefore(G,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.widget.Slider=function(C,A,B,D){YAHOO.widget.Slider.ANIM_AVAIL=(!YAHOO.lang.isUndefined(YAHOO.util.Anim));if(C){this.init(C,A,true);this.initSlider(D);this.initThumb(B);}};YAHOO.widget.Slider.getHorizSlider=function(B,C,E,D,A){return new YAHOO.widget.Slider(B,B,new YAHOO.widget.SliderThumb(C,B,E,D,0,0,A),"horiz");};YAHOO.widget.Slider.getVertSlider=function(C,D,A,E,B){return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,0,0,A,E,B),"vert");};YAHOO.widget.Slider.getSliderRegion=function(C,D,F,E,A,G,B){return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,F,E,A,G,B),"region");};YAHOO.widget.Slider.ANIM_AVAIL=false;YAHOO.extend(YAHOO.widget.Slider,YAHOO.util.DragDrop,{dragOnly:true,initSlider:function(A){this.type=A;this.createEvent("change",this);this.createEvent("slideStart",this);this.createEvent("slideEnd",this);this.isTarget=false;this.animate=YAHOO.widget.Slider.ANIM_AVAIL;this.backgroundEnabled=true;this.tickPause=40;this.enableKeys=true;this.keyIncrement=20;this.moveComplete=true;this.animationDuration=0.2;this.SOURCE_UI_EVENT=1;this.SOURCE_SET_VALUE=2;this.valueChangeSource=0;this._silent=false;this.lastOffset=[0,0];},initThumb:function(B){var A=this;this.thumb=B;B.cacheBetweenDrags=true;if(B._isHoriz&&B.xTicks&&B.xTicks.length){this.tickPause=Math.round(360/B.xTicks.length);}else{if(B.yTicks&&B.yTicks.length){this.tickPause=Math.round(360/B.yTicks.length);}}B.onAvailable=function(){return A.setStartSliderState();};B.onMouseDown=function(){return A.focus();};B.startDrag=function(){A._slideStart();};B.onDrag=function(){A.fireEvents(true);};B.onMouseUp=function(){A.thumbMouseUp();};},onAvailable:function(){var A=YAHOO.util.Event;A.on(this.id,"keydown",this.handleKeyDown,this,true);A.on(this.id,"keypress",this.handleKeyPress,this,true);},handleKeyPress:function(C){if(this.enableKeys){var A=YAHOO.util.Event;var B=A.getCharCode(C);switch(B){case 37:case 38:case 39:case 40:case 36:case 35:A.preventDefault(C);break;default:}}},handleKeyDown:function(E){if(this.enableKeys){var G=YAHOO.util.Event;var C=G.getCharCode(E),I=this.thumb;var B=this.getXValue(),F=this.getYValue();var H=false;var D=true;switch(C){case 37:B-=this.keyIncrement;break;case 38:F-=this.keyIncrement;break;case 39:B+=this.keyIncrement;break;case 40:F+=this.keyIncrement;break;case 36:B=I.leftConstraint;F=I.topConstraint;break;case 35:B=I.rightConstraint;F=I.bottomConstraint;break;default:D=false;}if(D){if(I._isRegion){this.setRegionValue(B,F,true);}else{var A=(I._isHoriz)?B:F;this.setValue(A,true);}G.stopEvent(E);}}},setStartSliderState:function(){this.setThumbCenterPoint();this.baselinePos=YAHOO.util.Dom.getXY(this.getEl());this.thumb.startOffset=this.thumb.getOffsetFromParent(this.baselinePos);if(this.thumb._isRegion){if(this.deferredSetRegionValue){this.setRegionValue.apply(this,this.deferredSetRegionValue,true);this.deferredSetRegionValue=null;}else{this.setRegionValue(0,0,true,true,true);}}else{if(this.deferredSetValue){this.setValue.apply(this,this.deferredSetValue,true);this.deferredSetValue=null;}else{this.setValue(0,true,true,true);}}},setThumbCenterPoint:function(){var A=this.thumb.getEl();if(A){this.thumbCenterPoint={x:parseInt(A.offsetWidth/2,10),y:parseInt(A.offsetHeight/2,10)};}},lock:function(){this.thumb.lock();this.locked=true;},unlock:function(){this.thumb.unlock();this.locked=false;},thumbMouseUp:function(){if(!this.isLocked()&&!this.moveComplete){this.endMove();}},onMouseUp:function(){if(!this.isLocked()&&!this.moveComplete){this.endMove();}},getThumb:function(){return this.thumb;},focus:function(){this.valueChangeSource=this.SOURCE_UI_EVENT;var A=this.getEl();if(A.focus){try{A.focus();}catch(B){}}this.verifyOffset();if(this.isLocked()){return false;}else{this._slideStart();return true;}},onChange:function(A,B){},onSlideStart:function(){},onSlideEnd:function(){},getValue:function(){return this.thumb.getValue();},getXValue:function(){return this.thumb.getXValue();},getYValue:function(){return this.thumb.getYValue();},handleThumbChange:function(){},setValue:function(G,C,D,A){this._silent=A;this.valueChangeSource=this.SOURCE_SET_VALUE;if(!this.thumb.available){this.deferredSetValue=arguments;return false;}if(this.isLocked()&&!D){return false;}if(isNaN(G)){return false;}var B=this.thumb;B.lastOffset=[G,G];var F,E;this.verifyOffset(true);if(B._isRegion){return false;}else{if(B._isHoriz){this._slideStart();F=B.initPageX+G+this.thumbCenterPoint.x;this.moveThumb(F,B.initPageY,C);}else{this._slideStart();E=B.initPageY+G+this.thumbCenterPoint.y;this.moveThumb(B.initPageX,E,C);}}return true;},setRegionValue:function(H,A,D,E,B){this._silent=B;this.valueChangeSource=this.SOURCE_SET_VALUE;if(!this.thumb.available){this.deferredSetRegionValue=arguments;return false;}if(this.isLocked()&&!E){return false;}if(isNaN(H)){return false;}var C=this.thumb;C.lastOffset=[H,A];this.verifyOffset(true);if(C._isRegion){this._slideStart();var G=C.initPageX+H+this.thumbCenterPoint.x;var F=C.initPageY+A+this.thumbCenterPoint.y;this.moveThumb(G,F,D);return true;}return false;},verifyOffset:function(B){var A=YAHOO.util.Dom.getXY(this.getEl());if(A){if(A[0]!=this.baselinePos[0]||A[1]!=this.baselinePos[1]){this.thumb.resetConstraints();this.baselinePos=A;return false;}}return true;},moveThumb:function(G,F,E,D){var H=this.thumb;var I=this;if(!H.available){return ;}H.setDelta(this.thumbCenterPoint.x,this.thumbCenterPoint.y);var B=H.getTargetCoord(G,F);var C=[B.x,B.y];this._slideStart();if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&H._graduated&&!E){this.lock();this.curCoord=YAHOO.util.Dom.getXY(this.thumb.getEl());setTimeout(function(){I.moveOneTick(C);},this.tickPause);}else{if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&!E){this.lock();var A=new YAHOO.util.Motion(H.id,{points:{to:C}},this.animationDuration,YAHOO.util.Easing.easeOut);A.onComplete.subscribe(function(){I.endMove();});A.animate();}else{H.setDragElPos(G,F);if(!D){this.endMove();}}}},_slideStart:function(){if(!this._sliding){if(!this._silent){this.onSlideStart();
this.fireEvent("slideStart");}this._sliding=true;}},_slideEnd:function(){if(this._sliding&&this.moveComplete){if(!this._silent){this.onSlideEnd();this.fireEvent("slideEnd");}this._sliding=false;this._silent=false;this.moveComplete=false;}},moveOneTick:function(B){var E=this.thumb,D;var F=null;if(E._isRegion){F=this._getNextX(this.curCoord,B);var A=(F)?F[0]:this.curCoord[0];F=this._getNextY([A,this.curCoord[1]],B);}else{if(E._isHoriz){F=this._getNextX(this.curCoord,B);}else{F=this._getNextY(this.curCoord,B);}}if(F){this.curCoord=F;this.thumb.alignElWithMouse(E.getEl(),F[0],F[1]);if(!(F[0]==B[0]&&F[1]==B[1])){var C=this;setTimeout(function(){C.moveOneTick(B);},this.tickPause);}else{this.endMove();}}else{this.endMove();}},_getNextX:function(A,B){var D=this.thumb;var F;var C=[];var E=null;if(A[0]>B[0]){F=D.tickSize-this.thumbCenterPoint.x;C=D.getTargetCoord(A[0]-F,A[1]);E=[C.x,C.y];}else{if(A[0]<B[0]){F=D.tickSize+this.thumbCenterPoint.x;C=D.getTargetCoord(A[0]+F,A[1]);E=[C.x,C.y];}else{}}return E;},_getNextY:function(A,B){var D=this.thumb;var F;var C=[];var E=null;if(A[1]>B[1]){F=D.tickSize-this.thumbCenterPoint.y;C=D.getTargetCoord(A[0],A[1]-F);E=[C.x,C.y];}else{if(A[1]<B[1]){F=D.tickSize+this.thumbCenterPoint.y;C=D.getTargetCoord(A[0],A[1]+F);E=[C.x,C.y];}else{}}return E;},b4MouseDown:function(A){this.thumb.autoOffset();this.thumb.resetConstraints();},onMouseDown:function(B){if(!this.isLocked()&&this.backgroundEnabled){var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.focus();this.moveThumb(A,C);}},onDrag:function(B){if(!this.isLocked()){var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.moveThumb(A,C,true,true);this.fireEvents();}},endMove:function(){this.unlock();this.moveComplete=true;this.fireEvents();},fireEvents:function(C){var B=this.thumb;if(!C){B.cachePosition();}if(!this.isLocked()){if(B._isRegion){var E=B.getXValue();var D=B.getYValue();if(E!=this.previousX||D!=this.previousY){if(!this._silent){this.onChange(E,D);this.fireEvent("change",{x:E,y:D});}}this.previousX=E;this.previousY=D;}else{var A=B.getValue();if(A!=this.previousVal){if(!this._silent){this.onChange(A);this.fireEvent("change",A);}}this.previousVal=A;}this._slideEnd();}},toString:function(){return("Slider ("+this.type+") "+this.id);}});YAHOO.augment(YAHOO.widget.Slider,YAHOO.util.EventProvider);YAHOO.widget.SliderThumb=function(G,B,E,D,A,F,C){if(G){YAHOO.widget.SliderThumb.superclass.constructor.call(this,G,B);this.parentElId=B;}this.isTarget=false;this.tickSize=C;this.maintainOffset=true;this.initSlider(E,D,A,F,C);this.scroll=false;};YAHOO.extend(YAHOO.widget.SliderThumb,YAHOO.util.DD,{startOffset:null,dragOnly:true,_isHoriz:false,_prevVal:0,_graduated:false,getOffsetFromParent0:function(C){var A=YAHOO.util.Dom.getXY(this.getEl());var B=C||YAHOO.util.Dom.getXY(this.parentElId);return[(A[0]-B[0]),(A[1]-B[1])];},getOffsetFromParent:function(H){var A=this.getEl(),E;if(!this.deltaOffset){var I=YAHOO.util.Dom.getXY(A);var F=H||YAHOO.util.Dom.getXY(this.parentElId);E=[(I[0]-F[0]),(I[1]-F[1])];var B=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);var K=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);var D=B-E[0];var C=K-E[1];if(isNaN(D)||isNaN(C)){}else{this.deltaOffset=[D,C];}}else{var J=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);var G=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);E=[J+this.deltaOffset[0],G+this.deltaOffset[1]];}return E;},initSlider:function(D,C,A,E,B){this.initLeft=D;this.initRight=C;this.initUp=A;this.initDown=E;this.setXConstraint(D,C,B);this.setYConstraint(A,E,B);if(B&&B>1){this._graduated=true;}this._isHoriz=(D||C);this._isVert=(A||E);this._isRegion=(this._isHoriz&&this._isVert);},clearTicks:function(){YAHOO.widget.SliderThumb.superclass.clearTicks.call(this);this.tickSize=0;this._graduated=false;},getValue:function(){return(this._isHoriz)?this.getXValue():this.getYValue();},getXValue:function(){if(!this.available){return 0;}var A=this.getOffsetFromParent();if(YAHOO.lang.isNumber(A[0])){this.lastOffset=A;return(A[0]-this.startOffset[0]);}else{return(this.lastOffset[0]-this.startOffset[0]);}},getYValue:function(){if(!this.available){return 0;}var A=this.getOffsetFromParent();if(YAHOO.lang.isNumber(A[1])){this.lastOffset=A;return(A[1]-this.startOffset[1]);}else{return(this.lastOffset[1]-this.startOffset[1]);}},toString:function(){return"SliderThumb "+this.id;},onChange:function(A,B){}});YAHOO.widget.DualSlider=function(E,B,D,A){var C=this,G=YAHOO.lang;this.minSlider=E;this.maxSlider=B;this.activeSlider=E;this.isHoriz=E.thumb._isHoriz;A=YAHOO.lang.isArray(A)?A:[0,D];A[0]=Math.min(Math.max(parseInt(A[0],10)|0,0),D);A[1]=Math.max(Math.min(parseInt(A[1],10)|0,D),0);if(A[0]>A[1]){A.splice(0,2,A[1],A[0]);}var F={min:false,max:false};this.minSlider.thumb.onAvailable=function(){E.setStartSliderState();F.min=true;if(F.max){E.setValue(A[0],true,true,true);B.setValue(A[1],true,true,true);C.updateValue(true);C.fireEvent("ready",C);}};this.maxSlider.thumb.onAvailable=function(){B.setStartSliderState();F.max=true;if(F.min){E.setValue(A[0],true,true,true);B.setValue(A[1],true,true,true);C.updateValue(true);C.fireEvent("ready",C);}};E.onMouseDown=function(H){C._handleMouseDown(H);};B.onMouseDown=function(H){YAHOO.util.Event.stopEvent(H);};E.onDrag=B.onDrag=function(H){C._handleDrag(H);};E.subscribe("change",this._handleMinChange,E,this);E.subscribe("slideStart",this._handleSlideStart,E,this);E.subscribe("slideEnd",this._handleSlideEnd,E,this);B.subscribe("change",this._handleMaxChange,B,this);B.subscribe("slideStart",this._handleSlideStart,B,this);B.subscribe("slideEnd",this._handleSlideEnd,B,this);this.createEvent("ready",this);this.createEvent("change",this);this.createEvent("slideStart",this);this.createEvent("slideEnd",this);};YAHOO.widget.DualSlider.prototype={minVal:-1,maxVal:-1,minRange:0,_handleSlideStart:function(B,A){this.fireEvent("slideStart",A);},_handleSlideEnd:function(B,A){this.fireEvent("slideEnd",A);},_handleDrag:function(A){YAHOO.widget.Slider.prototype.onDrag.call(this.activeSlider,A);
},_handleMinChange:function(){this.activeSlider=this.minSlider;this.updateValue();},_handleMaxChange:function(){this.activeSlider=this.maxSlider;this.updateValue();},setValues:function(E,H,F,B,G){var C=this.minSlider,J=this.maxSlider,A=C.thumb,I=J.thumb,K=this,D={min:false,max:false};if(A._isHoriz){A.setXConstraint(A.leftConstraint,I.rightConstraint,A.tickSize);I.setXConstraint(A.leftConstraint,I.rightConstraint,I.tickSize);}else{A.setYConstraint(A.topConstraint,I.bottomConstraint,A.tickSize);I.setYConstraint(A.topConstraint,I.bottomConstraint,I.tickSize);}this._oneTimeCallback(C,"slideEnd",function(){D.min=true;if(D.max){K.updateValue(G);setTimeout(function(){K._cleanEvent(C,"slideEnd");K._cleanEvent(J,"slideEnd");},0);}});this._oneTimeCallback(J,"slideEnd",function(){D.max=true;if(D.min){K.updateValue(G);setTimeout(function(){K._cleanEvent(C,"slideEnd");K._cleanEvent(J,"slideEnd");},0);}});C.setValue(E,F,B,G);J.setValue(H,F,B,G);},setMinValue:function(C,E,F,B){var D=this.minSlider;this.activeSlider=D;var A=this;this._oneTimeCallback(D,"slideEnd",function(){A.updateValue(B);setTimeout(function(){A._cleanEvent(D,"slideEnd");},0);});D.setValue(C,E,F,B);},setMaxValue:function(A,E,F,C){var D=this.maxSlider;this.activeSlider=D;var B=this;this._oneTimeCallback(D,"slideEnd",function(){B.updateValue(C);setTimeout(function(){B._cleanEvent(D,"slideEnd");},0);});D.setValue(A,E,F,C);},updateValue:function(F){var B=this.minSlider.getValue(),G=this.maxSlider.getValue(),C=false;if(B!=this.minVal||G!=this.maxVal){C=true;var A=this.minSlider.thumb;var I=this.maxSlider.thumb;var D=this.minSlider.thumbCenterPoint.x+this.maxSlider.thumbCenterPoint.x;var E=Math.max(G-D-this.minRange,0);var H=Math.min(-B-D-this.minRange,0);if(this.isHoriz){E=Math.min(E,I.rightConstraint);A.setXConstraint(A.leftConstraint,E,A.tickSize);I.setXConstraint(H,I.rightConstraint,I.tickSize);}else{E=Math.min(E,I.bottomConstraint);A.setYConstraint(A.leftConstraint,E,A.tickSize);I.setYConstraint(H,I.bottomConstraint,I.tickSize);}}this.minVal=B;this.maxVal=G;if(C&&!F){this.fireEvent("change",this);}},selectActiveSlider:function(C){var B=this.minSlider.getValue(),A=this.maxSlider.getValue(),D;if(this.isHoriz){D=YAHOO.util.Event.getPageX(C)-this.minSlider.initPageX-this.minSlider.thumbCenterPoint.x;}else{D=YAHOO.util.Event.getPageY(C)-this.minSlider.initPageY-this.minSlider.thumbCenterPoint.y;}if(D<B){this.activeSlider=this.minSlider;}else{if(D>A){this.activeSlider=this.maxSlider;}else{this.activeSlider=D*2>A+B?this.maxSlider:this.minSlider;}}},_handleMouseDown:function(A){this.selectActiveSlider(A);YAHOO.widget.Slider.prototype.onMouseDown.call(this.activeSlider,A);},_oneTimeCallback:function(C,A,B){C.subscribe(A,function(){C.unsubscribe(A,arguments.callee);B.apply({},[].slice.apply(arguments));});},_cleanEvent:function(H,B){if(H.__yui_events&&H.events[B]){var G,F,A;for(F=H.__yui_events.length;F>=0;--F){if(H.__yui_events[F].type===B){G=H.__yui_events[F];break;}}if(G){var E=G.subscribers,C=[],D=0;for(F=0,A=E.length;F<A;++F){if(E[F]){C[D++]=E[F];}}G.subscribers=C;}}}};YAHOO.augment(YAHOO.widget.DualSlider,YAHOO.util.EventProvider);YAHOO.widget.Slider.getHorizDualSlider=function(F,C,K,G,H,B){var A,J;var D=YAHOO.widget,E=D.Slider,I=D.SliderThumb;A=new I(C,F,0,G,0,0,H);J=new I(K,F,0,G,0,0,H);return new D.DualSlider(new E(F,F,A,"horiz"),new E(F,F,J,"horiz"),G,B);};YAHOO.widget.Slider.getVertDualSlider=function(F,C,K,G,H,B){var A,J;var D=YAHOO.widget,E=D.Slider,I=D.SliderThumb;A=new I(C,F,0,0,0,G,H);J=new I(K,F,0,0,0,G,H);return new D.DualSlider(new E(F,F,A,"vert"),new E(F,F,J,"vert"),G,B);};YAHOO.register("slider",YAHOO.widget.Slider,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){var B=YAHOO.util;var A=function(D,C,E,F){if(!D){}this.init(D,C,E,F);};A.NAME="Anim";A.prototype={toString:function(){var C=this.getEl()||{};var D=C.id||C.tagName;return(this.constructor.NAME+": "+D);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(C,E,D){return this.method(this.currentFrame,E,D-E,this.totalFrames);},setAttribute:function(C,E,D){if(this.patterns.noNegatives.test(C)){E=(E>0)?E:0;}B.Dom.setStyle(this.getEl(),C,E+D);},getAttribute:function(C){var E=this.getEl();var G=B.Dom.getStyle(E,C);if(G!=="auto"&&!this.patterns.offsetUnit.test(G)){return parseFloat(G);}var D=this.patterns.offsetAttribute.exec(C)||[];var H=!!(D[3]);var F=!!(D[2]);if(F||(B.Dom.getStyle(E,"position")=="absolute"&&H)){G=E["offset"+D[0].charAt(0).toUpperCase()+D[0].substr(1)];}else{G=0;}return G;},getDefaultUnit:function(C){if(this.patterns.defaultUnit.test(C)){return"px";}return"";},setRuntimeAttribute:function(D){var I;var E;var F=this.attributes;this.runtimeAttributes[D]={};var H=function(J){return(typeof J!=="undefined");};if(!H(F[D]["to"])&&!H(F[D]["by"])){return false;}I=(H(F[D]["from"]))?F[D]["from"]:this.getAttribute(D);if(H(F[D]["to"])){E=F[D]["to"];}else{if(H(F[D]["by"])){if(I.constructor==Array){E=[];for(var G=0,C=I.length;G<C;++G){E[G]=I[G]+F[D]["by"][G]*1;}}else{E=I+F[D]["by"]*1;}}}this.runtimeAttributes[D].start=I;this.runtimeAttributes[D].end=E;this.runtimeAttributes[D].unit=(H(F[D].unit))?F[D]["unit"]:this.getDefaultUnit(D);return true;},init:function(E,J,I,C){var D=false;var F=null;var H=0;E=B.Dom.get(E);this.attributes=J||{};this.duration=!YAHOO.lang.isUndefined(I)?I:1;this.method=C||B.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=B.AnimMgr.fps;this.setEl=function(M){E=B.Dom.get(M);};this.getEl=function(){return E;};this.isAnimated=function(){return D;};this.getStartTime=function(){return F;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(B.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}B.AnimMgr.registerElement(this);return true;};this.stop=function(M){if(!this.isAnimated()){return false;}if(M){this.currentFrame=this.totalFrames;this._onTween.fire();}B.AnimMgr.stop(this);};var L=function(){this.onStart.fire();this.runtimeAttributes={};for(var M in this.attributes){this.setRuntimeAttribute(M);}D=true;H=0;F=new Date();};var K=function(){var O={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};O.toString=function(){return("duration: "+O.duration+", currentFrame: "+O.currentFrame);};this.onTween.fire(O);var N=this.runtimeAttributes;for(var M in N){this.setAttribute(M,this.doMethod(M,N[M].start,N[M].end),N[M].unit);}H+=1;};var G=function(){var M=(new Date()-F)/1000;var N={duration:M,frames:H,fps:H/M};N.toString=function(){return("duration: "+N.duration+", frames: "+N.frames+", fps: "+N.fps);};D=false;H=0;this.onComplete.fire(N);};this._onStart=new B.CustomEvent("_start",this,true);this.onStart=new B.CustomEvent("start",this);this.onTween=new B.CustomEvent("tween",this);this._onTween=new B.CustomEvent("_tween",this,true);this.onComplete=new B.CustomEvent("complete",this);this._onComplete=new B.CustomEvent("_complete",this,true);this._onStart.subscribe(L);this._onTween.subscribe(K);this._onComplete.subscribe(G);}};B.Anim=A;})();YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start();};this.unRegister=function(G,F){F=F||E(G);if(!G.isAnimated()||F==-1){return false;}G._onComplete.fire();B.splice(F,1);A-=1;if(A<=0){this.stop();}return true;};this.start=function(){if(C===null){C=setInterval(this.run,this.delay);}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){this.unRegister(B[0],0);}B=[];C=null;A=0;}else{this.unRegister(H);}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue;}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G);}G._onTween.fire();}else{YAHOO.util.AnimMgr.stop(G,H);}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G;}}return -1;};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame);}else{K=J-(I+1);}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1);}G.currentFrame+=K;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]];}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];}}return[C[0][0],C[0][1]];};};(function(){var A=function(F,E,G,H){A.superclass.constructor.call(this,F,E,G,H);};A.NAME="ColorAnim";var C=YAHOO.util;YAHOO.extend(A,C.Anim);var D=A.superclass;var B=A.prototype;B.patterns.color=/color$/i;B.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;B.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;B.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;B.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;B.parseColor=function(E){if(E.length==3){return E;}var F=this.patterns.hex.exec(E);if(F&&F.length==4){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)];}F=this.patterns.rgb.exec(E);if(F&&F.length==4){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)];}F=this.patterns.hex3.exec(E);if(F&&F.length==4){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)];}return null;};B.getAttribute=function(E){var G=this.getEl();if(this.patterns.color.test(E)){var H=YAHOO.util.Dom.getStyle(G,E);
if(this.patterns.transparent.test(H)){var F=G.parentNode;H=C.Dom.getStyle(F,E);while(F&&this.patterns.transparent.test(H)){F=F.parentNode;H=C.Dom.getStyle(F,E);if(F.tagName.toUpperCase()=="HTML"){H="#fff";}}}}else{H=D.getAttribute.call(this,E);}return H;};B.doMethod=function(F,J,G){var I;if(this.patterns.color.test(F)){I=[];for(var H=0,E=J.length;H<E;++H){I[H]=D.doMethod.call(this,F,J[H],G[H]);}I="rgb("+Math.floor(I[0])+","+Math.floor(I[1])+","+Math.floor(I[2])+")";}else{I=D.doMethod.call(this,F,J,G);}return I;};B.setRuntimeAttribute=function(F){D.setRuntimeAttribute.call(this,F);if(this.patterns.color.test(F)){var H=this.attributes;var J=this.parseColor(this.runtimeAttributes[F].start);var G=this.parseColor(this.runtimeAttributes[F].end);if(typeof H[F]["to"]==="undefined"&&typeof H[F]["by"]!=="undefined"){G=this.parseColor(H[F].by);for(var I=0,E=J.length;I<E;++I){G[I]=J[I]+G[I];}}this.runtimeAttributes[F].start=J;this.runtimeAttributes[F].end=G;}};C.ColorAnim=A;})();
/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A;},easeIn:function(B,A,D,C){return D*(B/=C)*B+A;},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},elasticIn:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},elasticOut:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;}};(function(){var A=function(H,G,I,J){if(H){A.superclass.constructor.call(this,H,G,I,J);}};A.NAME="Motion";var E=YAHOO.util;YAHOO.extend(A,E.ColorAnim);var F=A.superclass;var C=A.prototype;C.patterns.points=/^points$/i;C.setAttribute=function(G,I,H){if(this.patterns.points.test(G)){H=H||"px";F.setAttribute.call(this,"left",I[0],H);F.setAttribute.call(this,"top",I[1],H);}else{F.setAttribute.call(this,G,I,H);}};C.getAttribute=function(G){if(this.patterns.points.test(G)){var H=[F.getAttribute.call(this,"left"),F.getAttribute.call(this,"top")];}else{H=F.getAttribute.call(this,G);}return H;};C.doMethod=function(G,K,H){var J=null;if(this.patterns.points.test(G)){var I=this.method(this.currentFrame,0,100,this.totalFrames)/100;J=E.Bezier.getPosition(this.runtimeAttributes[G],I);}else{J=F.doMethod.call(this,G,K,H);}return J;};C.setRuntimeAttribute=function(P){if(this.patterns.points.test(P)){var H=this.getEl();var J=this.attributes;var G;var L=J["points"]["control"]||[];var I;var M,O;if(L.length>0&&!(L[0] instanceof Array)){L=[L];}else{var K=[];for(M=0,O=L.length;M<O;++M){K[M]=L[M];}L=K;}if(E.Dom.getStyle(H,"position")=="static"){E.Dom.setStyle(H,"position","relative");}if(D(J["points"]["from"])){E.Dom.setXY(H,J["points"]["from"]);}else{E.Dom.setXY(H,E.Dom.getXY(H));}G=this.getAttribute("points");if(D(J["points"]["to"])){I=B.call(this,J["points"]["to"],G);
var N=E.Dom.getXY(this.getEl());for(M=0,O=L.length;M<O;++M){L[M]=B.call(this,L[M],G);}}else{if(D(J["points"]["by"])){I=[G[0]+J["points"]["by"][0],G[1]+J["points"]["by"][1]];for(M=0,O=L.length;M<O;++M){L[M]=[G[0]+L[M][0],G[1]+L[M][1]];}}}this.runtimeAttributes[P]=[G];if(L.length>0){this.runtimeAttributes[P]=this.runtimeAttributes[P].concat(L);}this.runtimeAttributes[P][this.runtimeAttributes[P].length]=I;}else{F.setRuntimeAttribute.call(this,P);}};var B=function(G,I){var H=E.Dom.getXY(this.getEl());G=[G[0]-H[0]+I[0],G[1]-H[1]+I[1]];return G;};var D=function(G){return(typeof G!=="undefined");};E.Motion=A;})();(function(){var D=function(F,E,G,H){if(F){D.superclass.constructor.call(this,F,E,G,H);}};D.NAME="Scroll";var B=YAHOO.util;YAHOO.extend(D,B.ColorAnim);var C=D.superclass;var A=D.prototype;A.doMethod=function(E,H,F){var G=null;if(E=="scroll"){G=[this.method(this.currentFrame,H[0],F[0]-H[0],this.totalFrames),this.method(this.currentFrame,H[1],F[1]-H[1],this.totalFrames)];}else{G=C.doMethod.call(this,E,H,F);}return G;};A.getAttribute=function(E){var G=null;var F=this.getEl();if(E=="scroll"){G=[F.scrollLeft,F.scrollTop];}else{G=C.getAttribute.call(this,E);}return G;};A.setAttribute=function(E,H,G){var F=this.getEl();if(E=="scroll"){F.scrollLeft=H[0];F.scrollTop=H[1];}else{C.setAttribute.call(this,E,H,G);}};B.Scroll=D;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F,E;for(F in this.config){E=this.config[F];if(E&&E.event){D[F]=E.value;}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(D,G){var F,E;if(G){E={};for(F in D){if(B.hasOwnProperty(D,F)){E[F.toLowerCase()]=D[F];}}this.initialConfig=E;}for(F in D){if(B.hasOwnProperty(D,F)){this.queueProperty(F,D[F]);}}},refresh:function(){var D;for(D in this.config){this.refireEvent(D);}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(E,F,H,D){var G=this.config[E.toLowerCase()];if(G&&G.event){if(!A.alreadySubscribed(G.event,F,H)){G.event.subscribe(F,H,D);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(Q,P){if(Q){this.init(Q,P);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,M=YAHOO.util.Event,L=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,H,O,N,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},I={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.textResizeEvent=new L("textResize");function K(){if(!H){H=document.createElement("div");H.innerHTML=('<div class="'+G.CSS_HEADER+'"></div>'+'<div class="'+G.CSS_BODY+'"></div><div class="'+G.CSS_FOOTER+'"></div>');O=H.firstChild;N=O.nextSibling;E=N.nextSibling;}return H;}function J(){if(!O){K();}return(O.cloneNode(false));}function B(){if(!N){K();}return(N.cloneNode(false));}function C(){if(!E){K();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var P=L.LIST;this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=P;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=P;this.appendEvent=this.createEvent(A.APPEND);
this.appendEvent.signature=P;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=P;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=P;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=P;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=P;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=P;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=P;this.destroyEvent=this.createEvent(A.DESTORY);this.destroyEvent.signature=P;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=P;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=P;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=P;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=P;},platform:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("windows")!=-1||P.indexOf("win32")!=-1){return"windows";}else{if(P.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("opera")!=-1){return"opera";}else{if(P.indexOf("msie 7")!=-1){return"ie7";}else{if(P.indexOf("msie")!=-1){return"ie";}else{if(P.indexOf("safari")!=-1){return"safari";}else{if(P.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(I.VISIBLE.key,{handler:this.configVisible,value:I.VISIBLE.value,validator:I.VISIBLE.validator});this.cfg.addProperty(I.EFFECT.key,{suppressEvent:I.EFFECT.suppressEvent,supercedes:I.EFFECT.supercedes});this.cfg.addProperty(I.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:I.MONITOR_RESIZE.value});this.cfg.addProperty(I.APPEND_TO_DOCUMENT_BODY.key,{value:I.APPEND_TO_DOCUMENT_BODY.value});},init:function(U,T){var R,V;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof U=="string"){R=U;U=document.getElementById(U);if(!U){U=(K()).cloneNode(false);U.id=R;}}this.element=U;if(U.id){this.id=U.id;}V=this.element.firstChild;if(V){var Q=false,P=false,S=false;do{if(1==V.nodeType){if(!Q&&F.hasClass(V,G.CSS_HEADER)){this.header=V;Q=true;}else{if(!P&&F.hasClass(V,G.CSS_BODY)){this.body=V;P=true;}else{if(!S&&F.hasClass(V,G.CSS_FOOTER)){this.footer=V;S=true;}}}}}while((V=V.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(T){this.cfg.applyConfig(T,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var Q=(YAHOO.env.ua.gecko&&this.platform=="windows");if(Q){var P=this;setTimeout(function(){P._initResizeMonitor();},0);}else{this._initResizeMonitor();}},_initResizeMonitor:function(){var P,R,T;function V(){G.textResizeEvent.fire();}if(!YAHOO.env.ua.opera){R=F.get("_yuiResizeMonitor");var U=this._supportsCWResize();if(!R){R=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){R.src=G.RESIZE_MONITOR_SECURE_URL;}if(!U){T=["<html><head><script ",'type="text/javascript">',"window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","/script></head>","<body></body></html>"].join("");R.src="data:text/html;charset=utf-8,"+encodeURIComponent(T);}R.id="_yuiResizeMonitor";R.style.position="absolute";R.style.visibility="hidden";var Q=document.body,S=Q.firstChild;if(S){Q.insertBefore(R,S);}else{Q.appendChild(R);}R.style.width="10em";R.style.height="10em";R.style.top=(-1*R.offsetHeight)+"px";R.style.left=(-1*R.offsetWidth)+"px";R.style.borderWidth="0";R.style.visibility="visible";if(YAHOO.env.ua.webkit){P=R.contentWindow.document;P.open();P.close();}}if(R&&R.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(U){if(!M.on(R.contentWindow,"resize",V)){M.on(R,"resize",V);}}G.textResizeInitialized=true;}this.resizeMonitor=R;}}},_supportsCWResize:function(){var P=true;if(YAHOO.env.ua.gecko&&YAHOO.env.ua.gecko<=1.8){P=false;}return P;},onDomResize:function(S,R){var Q=-1*this.resizeMonitor.offsetWidth,P=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=P+"px";this.resizeMonitor.style.left=Q+"px";},setHeader:function(Q){var P=this.header||(this.header=J());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},appendToHeader:function(Q){var P=this.header||(this.header=J());P.appendChild(Q);this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},setBody:function(Q){var P=this.body||(this.body=B());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},appendToBody:function(Q){var P=this.body||(this.body=B());P.appendChild(Q);this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},setFooter:function(Q){var P=this.footer||(this.footer=C());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},appendToFooter:function(Q){var P=this.footer||(this.footer=C());P.appendChild(Q);this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},render:function(R,P){var S=this,T;function Q(U){if(typeof U=="string"){U=document.getElementById(U);}if(U){S._addToParent(U,S.element);S.appendEvent.fire();}}this.beforeRenderEvent.fire();if(!P){P=this.element;}if(R){Q(R);}else{if(!F.inDocument(this.element)){return false;}}if(this.header&&!F.inDocument(this.header)){T=P.firstChild;if(T){P.insertBefore(this.header,T);}else{P.appendChild(this.header);}}if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){P.insertBefore(this.body,this.footer);
}else{P.appendChild(this.body);}}if(this.footer&&!F.inDocument(this.footer)){P.appendChild(this.footer);}this.renderEvent.fire();return true;},destroy:function(){var P,Q;if(this.element){M.purgeElement(this.element,true);P=this.element.parentNode;}if(P){P.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(Q in this){if(Q instanceof L){Q.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(Q,P,R){var S=P[0];if(S){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(R,Q,S){var P=Q[0];if(P){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(P,Q){if(!this.cfg.getProperty("appendtodocumentbody")&&P===document.body&&P.firstChild){P.insertBefore(Q,P.firstChild);}else{P.appendChild(Q);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(L,K){YAHOO.widget.Overlay.superclass.constructor.call(this,L,K);};var F=YAHOO.lang,I=YAHOO.util.CustomEvent,E=YAHOO.widget.Module,J=YAHOO.util.Event,D=YAHOO.util.Dom,C=YAHOO.util.Config,B=YAHOO.widget.Overlay,G,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},H={"X":{key:"x",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:F.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:F.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:F.isBoolean,supercedes:["zindex"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.VIEWPORT_OFFSET=10;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.CSS_OVERLAY="yui-overlay";B.windowScrollEvent=new I("windowScroll");B.windowResizeEvent=new I("windowResize");B.windowScrollHandler=function(K){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}};B.windowResizeHandler=function(K){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){J.on(window,"scroll",B.windowScrollHandler);J.on(window,"resize",B.windowResizeHandler);B._initialized=true;}YAHOO.extend(B,E,{init:function(L,K){B.superclass.init.call(this,L);this.beforeInitEvent.fire(B);D.addClass(this.element,B.CSS_OVERLAY);if(K){this.cfg.applyConfig(K,true);}if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!C.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!C.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var K=I.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=K;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=K;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.X.key,{handler:this.configX,validator:H.X.validator,suppressEvent:H.X.suppressEvent,supercedes:H.X.supercedes});this.cfg.addProperty(H.Y.key,{handler:this.configY,validator:H.Y.validator,suppressEvent:H.Y.suppressEvent,supercedes:H.Y.supercedes});this.cfg.addProperty(H.XY.key,{handler:this.configXY,suppressEvent:H.XY.suppressEvent,supercedes:H.XY.supercedes});this.cfg.addProperty(H.CONTEXT.key,{handler:this.configContext,suppressEvent:H.CONTEXT.suppressEvent,supercedes:H.CONTEXT.supercedes});this.cfg.addProperty(H.FIXED_CENTER.key,{handler:this.configFixedCenter,value:H.FIXED_CENTER.value,validator:H.FIXED_CENTER.validator,supercedes:H.FIXED_CENTER.supercedes});this.cfg.addProperty(H.WIDTH.key,{handler:this.configWidth,suppressEvent:H.WIDTH.suppressEvent,supercedes:H.WIDTH.supercedes});this.cfg.addProperty(H.HEIGHT.key,{handler:this.configHeight,suppressEvent:H.HEIGHT.suppressEvent,supercedes:H.HEIGHT.supercedes});this.cfg.addProperty(H.ZINDEX.key,{handler:this.configzIndex,value:H.ZINDEX.value});this.cfg.addProperty(H.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:H.CONSTRAIN_TO_VIEWPORT.value,validator:H.CONSTRAIN_TO_VIEWPORT.validator,supercedes:H.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(H.IFRAME.key,{handler:this.configIframe,value:H.IFRAME.value,validator:H.IFRAME.validator,supercedes:H.IFRAME.supercedes});},moveTo:function(K,L){this.cfg.setProperty("xy",[K,L]);},hideMacGeckoScrollbars:function(){D.removeClass(this.element,"show-scrollbars");D.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){D.removeClass(this.element,"hide-scrollbars");D.addClass(this.element,"show-scrollbars");},configVisible:function(N,K,T){var M=K[0],O=D.getStyle(this.element,"visibility"),U=this.cfg.getProperty("effect"),R=[],Q=(this.platform=="mac"&&YAHOO.env.ua.gecko),b=C.alreadySubscribed,S,L,a,Y,X,W,Z,V,P;
if(O=="inherit"){a=this.element.parentNode;while(a.nodeType!=9&&a.nodeType!=11){O=D.getStyle(a,"visibility");if(O!="inherit"){break;}a=a.parentNode;}if(O=="inherit"){O="visible";}}if(U){if(U instanceof Array){V=U.length;for(Y=0;Y<V;Y++){S=U[Y];R[R.length]=S.effect(this,S.duration);}}else{R[R.length]=U.effect(this,U.duration);}}if(M){if(Q){this.showMacGeckoScrollbars();}if(U){if(M){if(O!="visible"||O===""){this.beforeShowEvent.fire();P=R.length;for(X=0;X<P;X++){L=R[X];if(X===0&&!b(L.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){L.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}L.animateIn();}}}}else{if(O!="visible"||O===""){this.beforeShowEvent.fire();D.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(Q){this.hideMacGeckoScrollbars();}if(U){if(O=="visible"){this.beforeHideEvent.fire();P=R.length;for(W=0;W<P;W++){Z=R[W];if(W===0&&!b(Z.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){Z.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}Z.animateOut();}}else{if(O===""){D.setStyle(this.element,"visibility","hidden");}}}else{if(O=="visible"||O===""){this.beforeHideEvent.fire();D.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(O,M,P){var Q=M[0],L=C.alreadySubscribed,N=B.windowResizeEvent,K=B.windowScrollEvent;if(Q){this.center();if(!L(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}if(!L(N,this.doCenterOnDOMEvent,this)){N.subscribe(this.doCenterOnDOMEvent,this,true);}if(!L(K,this.doCenterOnDOMEvent,this)){K.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);N.unsubscribe(this.doCenterOnDOMEvent,this);K.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(N,L,O){var K=L[0],M=this.element;D.setStyle(M,"height",K);this.cfg.refireEvent("iframe");},configWidth:function(N,K,O){var M=K[0],L=this.element;D.setStyle(L,"width",M);this.cfg.refireEvent("iframe");},configzIndex:function(M,K,N){var O=K[0],L=this.element;if(!O){O=D.getStyle(L,"zIndex");if(!O||isNaN(O)){O=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(O<=0){O=1;}}D.setStyle(L,"zIndex",O);this.cfg.setProperty("zIndex",O,true);if(this.iframe){this.stackIframe();}},configXY:function(M,L,N){var P=L[0],K=P[0],O=P[1];this.cfg.setProperty("x",K);this.cfg.setProperty("y",O);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configX:function(M,L,N){var K=L[0],O=this.cfg.getProperty("y");this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setX(this.element,K,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configY:function(M,L,N){var K=this.cfg.getProperty("x"),O=L[0];this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setY(this.element,O,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},showIframe:function(){var L=this.iframe,K;if(L){K=this.element.parentNode;if(K!=L.parentNode){this._addToParent(K,L);}L.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var K=this.iframe,M=this.element,O=B.IFRAME_OFFSET,L=(O*2),N;if(K){K.style.width=(M.offsetWidth+L+"px");K.style.height=(M.offsetHeight+L+"px");N=this.cfg.getProperty("xy");if(!F.isArray(N)||(isNaN(N[0])||isNaN(N[1]))){this.syncPosition();N=this.cfg.getProperty("xy");}D.setXY(K,[(N[0]-O),(N[1]-O)]);}},stackIframe:function(){if(this.iframe){var K=D.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(K)&&!isNaN(K)){D.setStyle(this.iframe,"zIndex",(K-1));}}},configIframe:function(N,M,O){var K=M[0];function P(){var R=this.iframe,S=this.element,T;if(!R){if(!G){G=document.createElement("iframe");if(this.isSecure){G.src=B.IFRAME_SRC;}if(YAHOO.env.ua.ie){G.style.filter="alpha(opacity=0)";G.frameBorder=0;}else{G.style.opacity="0";}G.style.position="absolute";G.style.border="none";G.style.margin="0";G.style.padding="0";G.style.display="none";}R=G.cloneNode(false);T=S.parentNode;var Q=T||document.body;this._addToParent(Q,R);this.iframe=R;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function L(){P.call(this);this.beforeShowEvent.unsubscribe(L);this._iframeDeferred=false;}if(K){if(this.cfg.getProperty("visible")){P.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(L);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},_primeXYFromDOM:function(){if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){this.syncPosition();this.cfg.refireEvent("xy");this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);}},configConstrainToViewport:function(L,K,M){var N=K[0];if(N){if(!C.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}if(!C.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){this.beforeShowEvent.subscribe(this._primeXYFromDOM);}}else{this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(M,L,O){var Q=L[0],N,P,K;if(Q){N=Q[0];P=Q[1];
K=Q[2];if(N){if(typeof N=="string"){this.cfg.setProperty("context",[document.getElementById(N),P,K],true);}if(P&&K){this.align(P,K);}}}},align:function(L,K){var Q=this.cfg.getProperty("context"),P=this,O,N,R;function M(S,T){switch(L){case B.TOP_LEFT:P.moveTo(T,S);break;case B.TOP_RIGHT:P.moveTo((T-N.offsetWidth),S);break;case B.BOTTOM_LEFT:P.moveTo(T,(S-N.offsetHeight));break;case B.BOTTOM_RIGHT:P.moveTo((T-N.offsetWidth),(S-N.offsetHeight));break;}}if(Q){O=Q[0];N=this.element;P=this;if(!L){L=Q[1];}if(!K){K=Q[2];}if(N&&O){R=D.getRegion(O);switch(K){case B.TOP_LEFT:M(R.top,R.left);break;case B.TOP_RIGHT:M(R.top,R.right);break;case B.BOTTOM_LEFT:M(R.bottom,R.left);break;case B.BOTTOM_RIGHT:M(R.bottom,R.right);break;}}}},enforceConstraints:function(L,K,M){var O=K[0];var N=this.getConstrainedXY(O[0],O[1]);this.cfg.setProperty("x",N[0],true);this.cfg.setProperty("y",N[1],true);this.cfg.setProperty("xy",N,true);},getConstrainedXY:function(V,T){var N=B.VIEWPORT_OFFSET,U=D.getViewportWidth(),Q=D.getViewportHeight(),M=this.element.offsetHeight,S=this.element.offsetWidth,Y=D.getDocumentScrollLeft(),W=D.getDocumentScrollTop();var P=V;var L=T;if(S+N<U){var R=Y+N;var X=Y+U-S-N;if(V<R){P=R;}else{if(V>X){P=X;}}}else{P=N+Y;}if(M+N<Q){var O=W+N;var K=W+Q-M-N;if(T<O){L=O;}else{if(T>K){L=K;}}}else{L=N+W;}return[P,L];},center:function(){var N=B.VIEWPORT_OFFSET,O=this.element.offsetWidth,M=this.element.offsetHeight,L=D.getViewportWidth(),P=D.getViewportHeight(),K,Q;if(O<L){K=(L/2)-(O/2)+D.getDocumentScrollLeft();}else{K=N+D.getDocumentScrollLeft();}if(M<P){Q=(P/2)-(M/2)+D.getDocumentScrollTop();}else{Q=N+D.getDocumentScrollTop();}this.cfg.setProperty("xy",[parseInt(K,10),parseInt(Q,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var K=D.getXY(this.element);this.cfg.setProperty("x",K[0],true);this.cfg.setProperty("y",K[1],true);this.cfg.setProperty("xy",K,true);},onDomResize:function(M,L){var K=this;B.superclass.onDomResize.call(this,M,L);setTimeout(function(){K.syncPosition();K.cfg.refireEvent("iframe");K.cfg.refireEvent("context");},0);},bringToTop:function(){var O=[],N=this.element;function R(V,U){var X=D.getStyle(V,"zIndex"),W=D.getStyle(U,"zIndex"),T=(!X||isNaN(X))?0:parseInt(X,10),S=(!W||isNaN(W))?0:parseInt(W,10);if(T>S){return -1;}else{if(T<S){return 1;}else{return 0;}}}function M(U){var S=D.hasClass(U,B.CSS_OVERLAY),T=YAHOO.widget.Panel;if(S&&!D.isAncestor(N,S)){if(T&&D.hasClass(U,T.CSS_PANEL)){O[O.length]=U.parentNode;}else{O[O.length]=U;}}}D.getElementsBy(M,"DIV",document.body);O.sort(R);var K=O[0],Q;if(K){Q=D.getStyle(K,"zIndex");if(!isNaN(Q)){var P=false;if(K!=N){P=true;}else{if(O.length>1){var L=D.getStyle(O[1],"zIndex");if(!isNaN(L)&&(Q==L)){P=true;}}}if(P){this.cfg.setProperty("zindex",(parseInt(Q,10)+2));}}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){if(H!=K){if(H){H.blur();}this.bringToTop(K);H=K;E.addClass(H.element,A.CSS_FOCUSED);K.focusEvent.fire();}}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}M.focusEvent.unsubscribeAll();M.blurEvent.unsubscribeAll();M.focusEvent=null;M.blurEvent=null;M.focus=null;M.blur=null;}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._onOverlayBlur=function(K,J){H=null;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},register:function(G){var K=this,L,I,H,J;if(G instanceof D){G.cfg.addProperty("manager",{value:this});G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focus=function(){K.focus(this);};G.blur=function(){if(K.getActive()==this){E.removeClass(this.element,A.CSS_FOCUSED);this.blurEvent.fire();}};G.blurEvent.subscribe(K._onOverlayBlur);G.hideEvent.subscribe(G.blur);G.destroyEvent.subscribe(this._onOverlayDestroy,G,this);C.on(G.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,G);L=E.getStyle(G.element,"zIndex");if(!isNaN(L)){G.cfg.setProperty("zIndex",parseInt(L,10));}else{G.cfg.setProperty("zIndex",0);}this.overlays.push(G);this.bringToTop(G);return true;}else{if(G instanceof Array){I=0;J=G.length;for(H=0;H<J;H++){if(this.register(G[H])){I++;}}if(I>0){return true;}}else{return false;}}},bringToTop:function(M){var I=this.find(M),L,G,J;if(I){J=this.overlays;J.sort(this.compareZIndexDesc);G=J[0];if(G){L=E.getStyle(G.element,"zIndex");
if(!isNaN(L)){var K=false;if(G!==I){K=true;}else{if(J.length>1){var H=E.getStyle(J[1].element,"zIndex");if(!isNaN(H)&&(L==H)){K=true;}}}if(K){I.cfg.setProperty("zindex",(parseInt(L,10)+2));}}J.sort(this.compareZIndexDesc);}}},find:function(G){var I=this.overlays,J=I.length,H;if(J>0){H=J-1;if(G instanceof D){do{if(I[H]==G){return I[H];}}while(H--);}else{if(typeof G=="string"){do{if(I[H].id==G){return I[H];}}while(H--);}}return null;}},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].show();}while(G--);}},hideAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].hide();}while(G--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(N,M){YAHOO.widget.Tooltip.superclass.constructor.call(this,N,M);};var E=YAHOO.lang,L=YAHOO.util.Event,K=YAHOO.util.CustomEvent,C=YAHOO.util.Dom,G=YAHOO.widget.Tooltip,F,H={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:E.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:E.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:E.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:E.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"},"DISABLED":{key:"disabled",value:false,suppressEvent:true}},A={"CONTEXT_MOUSE_OVER":"contextMouseOver","CONTEXT_MOUSE_OUT":"contextMouseOut","CONTEXT_TRIGGER":"contextTrigger"};G.CSS_TOOLTIP="yui-tt";function I(N,M,O){var R=O[0],P=O[1],Q=this.cfg,S=Q.getProperty("width");if(S==P){Q.setProperty("width",R);}this.unsubscribe("hide",this._onHide,O);}function D(N,M){var O=document.body,S=this.cfg,R=S.getProperty("width"),P,Q;if((!R||R=="auto")&&(S.getProperty("container")!=O||S.getProperty("x")>=C.getViewportWidth()||S.getProperty("y")>=C.getViewportHeight())){Q=this.element.cloneNode(true);Q.style.visibility="hidden";Q.style.top="0px";Q.style.left="0px";O.appendChild(Q);P=(Q.offsetWidth+"px");O.removeChild(Q);Q=null;S.setProperty("width",P);S.refireEvent("xy");this.subscribe("hide",I,[(R||""),P]);}}function B(N,M,O){this.render(O);}function J(){L.onDOMReady(B,this.cfg.getProperty("container"),this);}YAHOO.extend(G,YAHOO.widget.Overlay,{init:function(N,M){G.superclass.init.call(this,N);this.beforeInitEvent.fire(G);C.addClass(this.element,G.CSS_TOOLTIP);if(M){this.cfg.applyConfig(M,true);}this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("beforeShow",D);this.subscribe("init",J);this.subscribe("render",this.onRender);this.initEvent.fire(G);},initEvents:function(){G.superclass.initEvents.call(this);var M=K.LIST;this.contextMouseOverEvent=this.createEvent(A.CONTEXT_MOUSE_OVER);this.contextMouseOverEvent.signature=M;this.contextMouseOutEvent=this.createEvent(A.CONTEXT_MOUSE_OUT);this.contextMouseOutEvent.signature=M;this.contextTriggerEvent=this.createEvent(A.CONTEXT_TRIGGER);this.contextTriggerEvent.signature=M;},initDefaultConfig:function(){G.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.PREVENT_OVERLAP.key,{value:H.PREVENT_OVERLAP.value,validator:H.PREVENT_OVERLAP.validator,supercedes:H.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(H.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:H.SHOW_DELAY.validator});this.cfg.addProperty(H.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:H.AUTO_DISMISS_DELAY.value,validator:H.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(H.HIDE_DELAY.key,{handler:this.configHideDelay,value:H.HIDE_DELAY.value,validator:H.HIDE_DELAY.validator});this.cfg.addProperty(H.TEXT.key,{handler:this.configText,suppressEvent:H.TEXT.suppressEvent});this.cfg.addProperty(H.CONTAINER.key,{handler:this.configContainer,value:document.body});this.cfg.addProperty(H.DISABLED.key,{handler:this.configContainer,value:H.DISABLED.value,supressEvent:H.DISABLED.suppressEvent});},configText:function(N,M,O){var P=M[0];if(P){this.setBody(P);}},configContainer:function(O,N,P){var M=N[0];if(typeof M=="string"){this.cfg.setProperty("container",document.getElementById(M),true);}},_removeEventListeners:function(){var P=this._context,M,O,N;if(P){M=P.length;if(M>0){N=M-1;do{O=P[N];L.removeListener(O,"mouseover",this.onContextMouseOver);L.removeListener(O,"mousemove",this.onContextMouseMove);L.removeListener(O,"mouseout",this.onContextMouseOut);}while(N--);}}},configContext:function(R,N,S){var Q=N[0],T,M,P,O;if(Q){if(!(Q instanceof Array)){if(typeof Q=="string"){this.cfg.setProperty("context",[document.getElementById(Q)],true);}else{this.cfg.setProperty("context",[Q],true);}Q=this.cfg.getProperty("context");}this._removeEventListeners();this._context=Q;T=this._context;if(T){M=T.length;if(M>0){O=M-1;do{P=T[O];L.on(P,"mouseover",this.onContextMouseOver,this);L.on(P,"mousemove",this.onContextMouseMove,this);L.on(P,"mouseout",this.onContextMouseOut,this);}while(O--);}}}},onContextMouseMove:function(N,M){M.pageX=L.getPageX(N);M.pageY=L.getPageY(N);},onContextMouseOver:function(O,N){var M=this;if(M.title){N._tempTitle=M.title;M.title="";}if(N.fireEvent("contextMouseOver",M,O)!==false&&!N.cfg.getProperty("disabled")){if(N.hideProcId){clearTimeout(N.hideProcId);N.hideProcId=null;}L.on(M,"mousemove",N.onContextMouseMove,N);N.showProcId=N.doShow(O,M);}},onContextMouseOut:function(O,N){var M=this;if(N._tempTitle){M.title=N._tempTitle;N._tempTitle=null;}if(N.showProcId){clearTimeout(N.showProcId);N.showProcId=null;}if(N.hideProcId){clearTimeout(N.hideProcId);N.hideProcId=null;}N.fireEvent("contextMouseOut",M,O);N.hideProcId=setTimeout(function(){N.hide();},N.cfg.getProperty("hidedelay"));},doShow:function(O,M){var P=25,N=this;if(YAHOO.env.ua.opera&&M.tagName&&M.tagName.toUpperCase()=="A"){P+=12;
}return setTimeout(function(){var Q=N.cfg.getProperty("text");if(N._tempTitle&&(Q===""||YAHOO.lang.isUndefined(Q)||YAHOO.lang.isNull(Q))){N.setBody(N._tempTitle);}else{N.cfg.refireEvent("text");}N.moveTo(N.pageX,N.pageY+P);if(N.cfg.getProperty("preventoverlap")){N.preventOverlap(N.pageX,N.pageY);}L.removeListener(M,"mousemove",N.onContextMouseMove);N.contextTriggerEvent.fire(M);N.show();N.hideProcId=N.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var M=this;return setTimeout(function(){M.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(Q,P){var M=this.element.offsetHeight,O=new YAHOO.util.Point(Q,P),N=C.getRegion(this.element);N.top-=5;N.left-=5;N.right+=5;N.bottom+=5;if(N.contains(O)){this.cfg.setProperty("y",(P-M-5));}},onRender:function(Q,P){function R(){var U=this.element,T=this._shadow;if(T){T.style.width=(U.offsetWidth+6)+"px";T.style.height=(U.offsetHeight+1)+"px";}}function N(){C.addClass(this._shadow,"yui-tt-shadow-visible");}function M(){C.removeClass(this._shadow,"yui-tt-shadow-visible");}function S(){var V=this._shadow,U,T,X,W;if(!V){U=this.element;T=YAHOO.widget.Module;X=YAHOO.env.ua.ie;W=this;if(!F){F=document.createElement("div");F.className="yui-tt-shadow";}V=F.cloneNode(false);U.appendChild(V);this._shadow=V;N.call(this);this.subscribe("beforeShow",N);this.subscribe("beforeHide",M);if(X==6||(X==7&&document.compatMode=="BackCompat")){window.setTimeout(function(){R.call(W);},0);this.cfg.subscribeToConfigEvent("width",R);this.cfg.subscribeToConfigEvent("height",R);this.subscribe("changeContent",R);T.textResizeEvent.subscribe(R,this,true);this.subscribe("destroy",function(){T.textResizeEvent.unsubscribe(R,this);});}}}function O(){S.call(this);this.unsubscribe("beforeShow",O);}if(this.cfg.getProperty("visible")){S.call(this);}else{this.subscribe("beforeShow",O);}},destroy:function(){this._removeEventListeners();G.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(R,Q){YAHOO.widget.Panel.superclass.constructor.call(this,R,Q);};var I=YAHOO.lang,E=YAHOO.util.DD,F=YAHOO.util.Dom,P=YAHOO.util.Event,B=YAHOO.widget.Overlay,O=YAHOO.util.CustomEvent,C=YAHOO.util.Config,N=YAHOO.widget.Panel,H,L,D,A={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},J={"CLOSE":{key:"close",value:true,validator:I.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(E?true:false),validator:I.isBoolean,supercedes:["visible"]},"DRAG_ONLY":{key:"dragonly",value:false,validator:I.isBoolean,supercedes:["draggable"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:I.isBoolean,supercedes:["visible","zindex"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]}};N.CSS_PANEL="yui-panel";N.CSS_PANEL_CONTAINER="yui-panel-container";N.FOCUSABLE=["a","button","select","textarea","input"];function M(R,Q){if(!this.header&&this.cfg.getProperty("draggable")){this.setHeader("&#160;");}}function K(R,Q,S){var V=S[0],T=S[1],U=this.cfg,W=U.getProperty("width");if(W==T){U.setProperty("width",V);}this.unsubscribe("hide",K,S);}function G(R,Q){var V=YAHOO.env.ua.ie,U,T,S;if(V==6||(V==7&&document.compatMode=="BackCompat")){U=this.cfg;T=U.getProperty("width");if(!T||T=="auto"){S=(this.element.offsetWidth+"px");U.setProperty("width",S);this.subscribe("hide",K,[(T||""),S]);}}}YAHOO.extend(N,B,{init:function(R,Q){N.superclass.init.call(this,R);this.beforeInitEvent.fire(N);F.addClass(this.element,N.CSS_PANEL);this.buildWrapper();if(Q){this.cfg.applyConfig(Q,true);}this.subscribe("showMask",this._addFocusHandlers);this.subscribe("hideMask",this._removeFocusHandlers);this.subscribe("beforeRender",M);this.initEvent.fire(N);},_onElementFocus:function(Q){this.blur();},_addFocusHandlers:function(Y,S){var V=this,Z="focus",U="hidden";function X(a){if(a.type!==U&&!F.isAncestor(V.element,a)){P.on(a,Z,V._onElementFocus);return true;}return false;}var W=N.FOCUSABLE,Q=W.length,T=[];for(var R=0;R<Q;R++){T=T.concat(F.getElementsBy(X,W[R]));}this.focusableElements=T;},_removeFocusHandlers:function(T,S){var V=this.focusableElements,Q=V.length,R="focus";if(V){for(var U=0;U<Q;U++){P.removeListener(V[U],R,this._onElementFocus);}}},initEvents:function(){N.superclass.initEvents.call(this);var Q=O.LIST;this.showMaskEvent=this.createEvent(A.SHOW_MASK);this.showMaskEvent.signature=Q;this.hideMaskEvent=this.createEvent(A.HIDE_MASK);this.hideMaskEvent.signature=Q;this.dragEvent=this.createEvent(A.DRAG);this.dragEvent.signature=Q;},initDefaultConfig:function(){N.superclass.initDefaultConfig.call(this);this.cfg.addProperty(J.CLOSE.key,{handler:this.configClose,value:J.CLOSE.value,validator:J.CLOSE.validator,supercedes:J.CLOSE.supercedes});this.cfg.addProperty(J.DRAGGABLE.key,{handler:this.configDraggable,value:J.DRAGGABLE.value,validator:J.DRAGGABLE.validator,supercedes:J.DRAGGABLE.supercedes});this.cfg.addProperty(J.DRAG_ONLY.key,{value:J.DRAG_ONLY.value,validator:J.DRAG_ONLY.validator,supercedes:J.DRAG_ONLY.supercedes});this.cfg.addProperty(J.UNDERLAY.key,{handler:this.configUnderlay,value:J.UNDERLAY.value,supercedes:J.UNDERLAY.supercedes});this.cfg.addProperty(J.MODAL.key,{handler:this.configModal,value:J.MODAL.value,validator:J.MODAL.validator,supercedes:J.MODAL.supercedes});this.cfg.addProperty(J.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:J.KEY_LISTENERS.suppressEvent,supercedes:J.KEY_LISTENERS.supercedes});},configClose:function(S,Q,U){var V=Q[0],R=this.close;function T(X,W){W.hide();}if(V){if(!R){if(!D){D=document.createElement("span");D.innerHTML="&#160;";D.className="container-close";}R=D.cloneNode(true);this.innerElement.appendChild(R);P.on(R,"click",T,this);this.close=R;}else{R.style.display="block";}}else{if(R){R.style.display="none";}}},configDraggable:function(R,Q,S){var T=Q[0];if(T){if(!E){this.cfg.setProperty("draggable",false);return ;}if(this.header){F.setStyle(this.header,"cursor","move");this.registerDragDrop();
}this.subscribe("beforeShow",G);}else{if(this.dd){this.dd.unreg();}if(this.header){F.setStyle(this.header,"cursor","auto");}this.unsubscribe("beforeShow",G);}},configUnderlay:function(b,a,V){var Z=YAHOO.env.ua,X=(this.platform=="mac"&&Z.gecko),Y=(Z.ie==6||(Z.ie==7&&document.compatMode=="BackCompat")),c=a[0].toLowerCase(),R=this.underlay,S=this.element;function d(){var e=this.underlay;F.addClass(e,"yui-force-redraw");window.setTimeout(function(){F.removeClass(e,"yui-force-redraw");},0);}function T(){var e=false;if(!R){if(!L){L=document.createElement("div");L.className="underlay";}R=L.cloneNode(false);this.element.appendChild(R);this.underlay=R;if(Y){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}if(Z.webkit&&Z.webkit<420){this.changeContentEvent.subscribe(d);}e=true;}}function W(){var e=T.call(this);if(!e&&Y){this.sizeUnderlay();}this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(W);}function U(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(W);this._underlayDeferred=false;}if(R){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);this.changeContentEvent.unsubscribe(d);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(R);this.underlay=null;}}switch(c){case"shadow":F.removeClass(S,"matte");F.addClass(S,"shadow");break;case"matte":if(!X){U.call(this);}F.removeClass(S,"shadow");F.addClass(S,"matte");break;default:if(!X){U.call(this);}F.removeClass(S,"shadow");F.removeClass(S,"matte");break;}if((c=="shadow")||(X&&!R)){if(this.cfg.getProperty("visible")){var Q=T.call(this);if(!Q&&Y){this.sizeUnderlay();}}else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(W);this._underlayDeferred=true;}}}},configModal:function(R,Q,T){var S=Q[0];if(S){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);B.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);B.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var R=this.mask,Q;if(R){this.hideMask();Q=R.parentNode;if(Q){Q.removeChild(R);}this.mask=null;}},configKeyListeners:function(T,Q,W){var S=Q[0],V,U,R;if(S){if(S instanceof Array){U=S.length;for(R=0;R<U;R++){V=S[R];if(!C.alreadySubscribed(this.showEvent,V.enable,V)){this.showEvent.subscribe(V.enable,V,true);}if(!C.alreadySubscribed(this.hideEvent,V.disable,V)){this.hideEvent.subscribe(V.disable,V,true);this.destroyEvent.subscribe(V.disable,V,true);}}}else{if(!C.alreadySubscribed(this.showEvent,S.enable,S)){this.showEvent.subscribe(S.enable,S,true);}if(!C.alreadySubscribed(this.hideEvent,S.disable,S)){this.hideEvent.subscribe(S.disable,S,true);this.destroyEvent.subscribe(S.disable,S,true);}}}},configHeight:function(T,R,U){var Q=R[0],S=this.innerElement;F.setStyle(S,"height",Q);this.cfg.refireEvent("iframe");},configWidth:function(T,Q,U){var S=Q[0],R=this.innerElement;F.setStyle(R,"width",S);this.cfg.refireEvent("iframe");},configzIndex:function(R,Q,T){N.superclass.configzIndex.call(this,R,Q,T);if(this.mask||this.cfg.getProperty("modal")===true){var S=F.getStyle(this.element,"zIndex");if(!S||isNaN(S)){S=0;}if(S===0){this.cfg.setProperty("zIndex",1);}else{this.stackMask();}}},buildWrapper:function(){var S=this.element.parentNode,Q=this.element,R=document.createElement("div");R.className=N.CSS_PANEL_CONTAINER;R.id=Q.id+"_c";if(S){S.insertBefore(R,Q);}R.appendChild(Q);this.element=R;this.innerElement=Q;F.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var R=this.underlay,Q;if(R){Q=this.element;R.style.width=Q.offsetWidth+"px";R.style.height=Q.offsetHeight+"px";}},registerDragDrop:function(){var R=this;if(this.header){if(!E){return ;}var Q=(this.cfg.getProperty("dragonly")===true);this.dd=new E(this.element.id,this.id,{dragOnly:Q});if(!this.header.id){this.header.id=this.id+"_h";}this.dd.startDrag=function(){var T,V,S,Y,X,W;if(YAHOO.env.ua.ie==6){F.addClass(R.element,"drag");}if(R.cfg.getProperty("constraintoviewport")){var U=B.VIEWPORT_OFFSET;T=R.element.offsetHeight;V=R.element.offsetWidth;S=F.getViewportWidth();Y=F.getViewportHeight();X=F.getDocumentScrollLeft();W=F.getDocumentScrollTop();if(T+U<Y){this.minY=W+U;this.maxY=W+Y-T-U;}else{this.minY=W+U;this.maxY=W+U;}if(V+U<S){this.minX=X+U;this.maxX=X+S-V-U;}else{this.minX=X+U;this.maxX=X+U;}this.constrainX=true;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}R.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){R.syncPosition();R.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}R.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){F.removeClass(R.element,"drag");}R.dragEvent.fire("endDrag",arguments);R.moveEvent.fire(R.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var Q=this.mask;if(!Q){if(!H){H=document.createElement("div");H.className="mask";H.innerHTML="&#160;";}Q=H.cloneNode(true);Q.id=this.id+"_mask";document.body.insertBefore(Q,document.body.firstChild);this.mask=Q;if(YAHOO.env.ua.gecko&&this.platform=="mac"){F.addClass(this.mask,"block-scrollbars");
}this.stackMask();}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";this.hideMaskEvent.fire();F.removeClass(document.body,"masked");}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){F.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){this.mask.style.height=F.getDocumentHeight()+"px";this.mask.style.width=F.getDocumentWidth()+"px";}},stackMask:function(){if(this.mask){var Q=F.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(Q)&&!isNaN(Q)){F.setStyle(this.mask,"zIndex",Q-1);}}},render:function(Q){return N.superclass.render.call(this,Q,this.innerElement);},destroy:function(){B.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){P.purgeElement(this.close);}N.superclass.destroy.call(this);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(L,K){YAHOO.widget.Dialog.superclass.constructor.call(this,L,K);};var J=YAHOO.util.Event,I=YAHOO.util.CustomEvent,D=YAHOO.util.Dom,B=YAHOO.util.KeyListener,H=YAHOO.util.Connect,F=YAHOO.widget.Dialog,E=YAHOO.lang,A={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},G={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none"},"HIDEAFTERSUBMIT":{key:"hideaftersubmit",value:true}};F.CSS_DIALOG="yui-dialog";function C(){var N=this._aButtons,L,M,K;if(E.isArray(N)){L=N.length;if(L>0){K=L-1;do{M=N[K];if(YAHOO.widget.Button&&M instanceof YAHOO.widget.Button){M.destroy();}else{if(M.tagName.toUpperCase()=="BUTTON"){J.purgeElement(M);J.purgeElement(M,false);}}}while(K--);}}}YAHOO.extend(F,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};this.cfg.addProperty(G.POST_METHOD.key,{handler:this.configPostMethod,value:G.POST_METHOD.value,validator:function(K){if(K!="form"&&K!="async"&&K!="none"&&K!="manual"){return false;}else{return true;}}});this.cfg.addProperty(G.HIDEAFTERSUBMIT.key,{value:G.HIDEAFTERSUBMIT.value});this.cfg.addProperty(G.BUTTONS.key,{handler:this.configButtons,value:G.BUTTONS.value});},initEvents:function(){F.superclass.initEvents.call(this);var K=I.LIST;this.beforeSubmitEvent=this.createEvent(A.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=K;this.submitEvent=this.createEvent(A.SUBMIT);this.submitEvent.signature=K;this.manualSubmitEvent=this.createEvent(A.MANUAL_SUBMIT);this.manualSubmitEvent.signature=K;this.asyncSubmitEvent=this.createEvent(A.ASYNC_SUBMIT);this.asyncSubmitEvent.signature=K;this.formSubmitEvent=this.createEvent(A.FORM_SUBMIT);this.formSubmitEvent.signature=K;this.cancelEvent=this.createEvent(A.CANCEL);this.cancelEvent.signature=K;},init:function(L,K){F.superclass.init.call(this,L);this.beforeInitEvent.fire(F);D.addClass(this.element,F.CSS_DIALOG);this.cfg.setProperty("visible",false);if(K){this.cfg.applyConfig(K,true);}this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(F);},doSubmit:function(){var Q=this.form,O=false,N=false,P,K,M,L;switch(this.cfg.getProperty("postmethod")){case"async":P=Q.elements;K=P.length;if(K>0){M=K-1;do{if(P[M].type=="file"){O=true;break;}}while(M--);}if(O&&YAHOO.env.ua.ie&&this.isSecure){N=true;}L=(Q.getAttribute("method")||"POST").toUpperCase();H.setForm(Q,O,N);H.asyncRequest(L,Q.getAttribute("action"),this.callback);this.asyncSubmitEvent.fire();break;case"form":Q.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},registerForm:function(){var M=this.element.getElementsByTagName("form")[0],L=this,K,N;if(this.form){if(this.form==M&&D.isAncestor(this.element,this.form)){return ;}else{J.purgeElement(this.form);this.form=null;}}if(!M){M=document.createElement("form");M.name="frm_"+this.id;this.body.appendChild(M);}if(M){this.form=M;J.on(M,"submit",function(O){J.stopEvent(O);this.submit();this.form.blur();},this,true);this.firstFormElement=function(){var Q,P,O=M.elements.length;for(Q=0;Q<O;Q++){P=M.elements[Q];if(P.focus&&!P.disabled&&P.type!="hidden"){return P;}}return null;}();this.lastFormElement=function(){var Q,P,O=M.elements.length;for(Q=O-1;Q>=0;Q--){P=M.elements[Q];if(P.focus&&!P.disabled&&P.type!="hidden"){return P;}}return null;}();if(this.cfg.getProperty("modal")){K=this.firstFormElement||this.firstButton;if(K){this.preventBackTab=new B(K,{shift:true,keys:9},{fn:L.focusLast,scope:L,correctScope:true});this.showEvent.subscribe(this.preventBackTab.enable,this.preventBackTab,true);this.hideEvent.subscribe(this.preventBackTab.disable,this.preventBackTab,true);}N=this.lastButton||this.lastFormElement;if(N){this.preventTabOut=new B(N,{shift:false,keys:9},{fn:L.focusFirst,scope:L,correctScope:true});this.showEvent.subscribe(this.preventTabOut.enable,this.preventTabOut,true);this.hideEvent.subscribe(this.preventTabOut.disable,this.preventTabOut,true);}}}},configClose:function(M,K,N){var O=K[0];function L(Q,P){P.cancel();}if(O){if(!this.close){this.close=document.createElement("div");D.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);J.on(this.close,"click",L,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}},configButtons:function(U,T,O){var P=YAHOO.widget.Button,W=T[0],M=this.innerElement,V,R,L,S,Q,K,N;C.call(this);this._aButtons=null;if(E.isArray(W)){Q=document.createElement("span");Q.className="button-group";S=W.length;this._aButtons=[];for(N=0;N<S;N++){V=W[N];if(P){L=new P({label:V.text,container:Q});R=L.get("element");if(V.isDefault){L.addClass("default");this.defaultHtmlButton=R;}if(E.isFunction(V.handler)){L.set("onclick",{fn:V.handler,obj:this,scope:this});
}else{if(E.isObject(V.handler)&&E.isFunction(V.handler.fn)){L.set("onclick",{fn:V.handler.fn,obj:((!E.isUndefined(V.handler.obj))?V.handler.obj:this),scope:(V.handler.scope||this)});}}this._aButtons[this._aButtons.length]=L;}else{R=document.createElement("button");R.setAttribute("type","button");if(V.isDefault){R.className="default";this.defaultHtmlButton=R;}R.innerHTML=V.text;if(E.isFunction(V.handler)){J.on(R,"click",V.handler,this,true);}else{if(E.isObject(V.handler)&&E.isFunction(V.handler.fn)){J.on(R,"click",V.handler.fn,((!E.isUndefined(V.handler.obj))?V.handler.obj:this),(V.handler.scope||this));}}Q.appendChild(R);this._aButtons[this._aButtons.length]=R;}V.htmlButton=R;if(N===0){this.firstButton=R;}if(N==(S-1)){this.lastButton=R;}}this.setFooter(Q);K=this.footer;if(D.inDocument(this.element)&&!D.isAncestor(M,K)){M.appendChild(K);}this.buttonSpan=Q;}else{Q=this.buttonSpan;K=this.footer;if(Q&&K){K.removeChild(Q);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}this.cfg.refireEvent("iframe");this.cfg.refireEvent("underlay");},getButtons:function(){var K=this._aButtons;if(K){return K;}},focusFirst:function(N,L,P){var M=this.firstFormElement,K;if(L){K=L[1];if(K){J.stopEvent(K);}}if(M){try{M.focus();}catch(O){}}else{this.focusDefaultButton();}},focusLast:function(N,L,P){var Q=this.cfg.getProperty("buttons"),M=this.lastFormElement,K;if(L){K=L[1];if(K){J.stopEvent(K);}}if(Q&&E.isArray(Q)){this.focusLastButton();}else{if(M){try{M.focus();}catch(O){}}}},focusDefaultButton:function(){var K=this.defaultHtmlButton;if(K){try{K.focus();}catch(L){}}},blurButtons:function(){var P=this.cfg.getProperty("buttons"),M,O,L,K;if(P&&E.isArray(P)){M=P.length;if(M>0){K=(M-1);do{O=P[K];if(O){L=O.htmlButton;if(L){try{L.blur();}catch(N){}}}}while(K--);}}},focusFirstButton:function(){var N=this.cfg.getProperty("buttons"),M,K;if(N&&E.isArray(N)){M=N[0];if(M){K=M.htmlButton;if(K){try{K.focus();}catch(L){}}}}},focusLastButton:function(){var O=this.cfg.getProperty("buttons"),L,N,K;if(O&&E.isArray(O)){L=O.length;if(L>0){N=O[(L-1)];if(N){K=N.htmlButton;if(K){try{K.focus();}catch(M){}}}}}},configPostMethod:function(L,K,M){this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();if(this.cfg.getProperty("hideaftersubmit")){this.hide();}return true;}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var a=this.form,M,T,W,O,U,R,Q,L,X,N,Y,b,K,P,c,Z,V;function S(e){var d=e.tagName.toUpperCase();return((d=="INPUT"||d=="TEXTAREA"||d=="SELECT")&&e.name==O);}if(a){M=a.elements;T=M.length;W={};for(Z=0;Z<T;Z++){O=M[Z].name;U=D.getElementsBy(S,"*",a);R=U.length;if(R>0){if(R==1){U=U[0];Q=U.type;L=U.tagName.toUpperCase();switch(L){case"INPUT":if(Q=="checkbox"){W[O]=U.checked;}else{if(Q!="radio"){W[O]=U.value;}}break;case"TEXTAREA":W[O]=U.value;break;case"SELECT":X=U.options;N=X.length;Y=[];for(V=0;V<N;V++){b=X[V];if(b.selected){K=b.value;if(!K||K===""){K=b.text;}Y[Y.length]=K;}}W[O]=Y;break;}}else{Q=U[0].type;switch(Q){case"radio":for(V=0;V<R;V++){P=U[V];if(P.checked){W[O]=P.value;break;}}break;case"checkbox":Y=[];for(V=0;V<R;V++){c=U[V];if(c.checked){Y[Y.length]=c.value;}}W[O]=Y;break;}}}}}return W;},destroy:function(){C.call(this);this._aButtons=null;var K=this.element.getElementsByTagName("form"),L;if(K.length>0){L=K[0];if(L){J.purgeElement(L);if(L.parentNode){L.parentNode.removeChild(L);}this.form=null;}}F.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());(function(){YAHOO.widget.SimpleDialog=function(E,D){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,E,D);};var C=YAHOO.util.Dom,B=YAHOO.widget.SimpleDialog,A={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};B.ICON_BLOCK="blckicon";B.ICON_ALARM="alrticon";B.ICON_HELP="hlpicon";B.ICON_INFO="infoicon";B.ICON_WARN="warnicon";B.ICON_TIP="tipicon";B.ICON_CSS_CLASSNAME="yui-icon";B.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(B,YAHOO.widget.Dialog,{initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(A.ICON.key,{handler:this.configIcon,value:A.ICON.value,suppressEvent:A.ICON.suppressEvent});this.cfg.addProperty(A.TEXT.key,{handler:this.configText,value:A.TEXT.value,suppressEvent:A.TEXT.suppressEvent,supercedes:A.TEXT.supercedes});},init:function(E,D){B.superclass.init.call(this,E);this.beforeInitEvent.fire(B);C.addClass(this.element,B.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(D){this.cfg.applyConfig(D,true);}this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(B);},registerForm:function(){B.superclass.registerForm.call(this);this.form.innerHTML+='<input type="hidden" name="'+this.id+'" value=""/>';},configIcon:function(F,E,J){var K=E[0],D=this.body,I=B.ICON_CSS_CLASSNAME,H,G;if(K&&K!="none"){H=C.getElementsByClassName(I,"*",D);if(H){G=H.parentNode;if(G){G.removeChild(H);H=null;}}if(K.indexOf(".")==-1){H=document.createElement("span");H.className=(I+" "+K);H.innerHTML="&#160;";}else{H=document.createElement("img");H.src=(this.imageRoot+K);H.className=I;}if(H){D.insertBefore(H,D.firstChild);}}},configText:function(E,D,F){var G=D[0];if(G){this.setBody(G);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(F,I,H,E,G){if(!G){G=YAHOO.util.Anim;}this.overlay=F;this.attrIn=I;this.attrOut=H;this.targetElement=E||F.element;this.animClass=G;};var B=YAHOO.util.Dom,D=YAHOO.util.CustomEvent,C=YAHOO.util.Easing,A=YAHOO.widget.ContainerEffect;A.FADE=function(E,G){var I={attributes:{opacity:{from:0,to:1}},duration:G,method:C.easeIn};var F={attributes:{opacity:{to:0}},duration:G,method:C.easeOut};var H=new A(E,I,F,E.element);H.handleUnderlayStart=function(){var K=this.overlay.underlay;
if(K&&YAHOO.env.ua.ie){var J=(K.filters&&K.filters.length>0);if(J){B.addClass(E.element,"yui-effect-fade");}}};H.handleUnderlayComplete=function(){var J=this.overlay.underlay;if(J&&YAHOO.env.ua.ie){B.removeClass(E.element,"yui-effect-fade");}};H.handleStartAnimateIn=function(K,J,L){B.addClass(L.overlay.element,"hide-select");if(!L.overlay.underlay){L.overlay.cfg.refireEvent("underlay");}L.handleUnderlayStart();B.setStyle(L.overlay.element,"visibility","visible");B.setStyle(L.overlay.element,"opacity",0);};H.handleCompleteAnimateIn=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateInCompleteEvent.fire();};H.handleStartAnimateOut=function(K,J,L){B.addClass(L.overlay.element,"hide-select");L.handleUnderlayStart();};H.handleCompleteAnimateOut=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}B.setStyle(L.overlay.element,"visibility","hidden");B.setStyle(L.overlay.element,"opacity",1);L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateOutCompleteEvent.fire();};H.init();return H;};A.SLIDE=function(G,I){var F=G.cfg.getProperty("x")||B.getX(G.element),K=G.cfg.getProperty("y")||B.getY(G.element),J=B.getClientWidth(),H=G.element.offsetWidth,E=new A(G,{attributes:{points:{to:[F,K]}},duration:I,method:C.easeIn},{attributes:{points:{to:[(J+25),K]}},duration:I,method:C.easeOut},G.element,YAHOO.util.Motion);E.handleStartAnimateIn=function(M,L,N){N.overlay.element.style.left=((-25)-H)+"px";N.overlay.element.style.top=K+"px";};E.handleTweenAnimateIn=function(O,N,P){var Q=B.getXY(P.overlay.element),M=Q[0],L=Q[1];if(B.getStyle(P.overlay.element,"visibility")=="hidden"&&M<F){B.setStyle(P.overlay.element,"visibility","visible");}P.overlay.cfg.setProperty("xy",[M,L],true);P.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateIn=function(M,L,N){N.overlay.cfg.setProperty("xy",[F,K],true);N.startX=F;N.startY=K;N.overlay.cfg.refireEvent("iframe");N.animateInCompleteEvent.fire();};E.handleStartAnimateOut=function(M,L,P){var N=B.getViewportWidth(),Q=B.getXY(P.overlay.element),O=Q[1];P.animOut.attributes.points.to=[(N+25),O];};E.handleTweenAnimateOut=function(N,M,O){var Q=B.getXY(O.overlay.element),L=Q[0],P=Q[1];O.overlay.cfg.setProperty("xy",[L,P],true);O.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateOut=function(M,L,N){B.setStyle(N.overlay.element,"visibility","hidden");N.overlay.cfg.setProperty("xy",[F,K]);N.animateOutCompleteEvent.fire();};E.init();return E;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=D.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=D.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=D.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=D.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(F,E,G){},handleTweenAnimateIn:function(F,E,G){},handleCompleteAnimateIn:function(F,E,G){},handleStartAnimateOut:function(F,E,G){},handleTweenAnimateOut:function(F,E,G){},handleCompleteAnimateOut:function(F,E,G){},toString:function(){var E="ContainerEffect";if(this.overlay){E+=" ["+this.overlay.toString()+"]";}return E;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
/**
 * Provides Attribute configurations.
 * @namespace YAHOO.util
 * @class Attribute
 * @constructor
 * @param hash {Object} The intial Attribute.
 * @param {YAHOO.util.AttributeProvider} The owner of the Attribute instance.
 */

YAHOO.util.Attribute = function(hash, owner) {
    if (owner) { 
        this.owner = owner;
        this.configure(hash, true);
    }
};

YAHOO.util.Attribute.prototype = {
	/**
     * The name of the attribute.
	 * @property name
	 * @type String
	 */
    name: undefined,
    
	/**
     * The value of the attribute.
	 * @property value
	 * @type String
	 */
    value: null,
    
	/**
     * The owner of the attribute.
	 * @property owner
	 * @type YAHOO.util.AttributeProvider
	 */
    owner: null,
    
	/**
     * Whether or not the attribute is read only.
	 * @property readOnly
	 * @type Boolean
	 */
    readOnly: false,
    
	/**
     * Whether or not the attribute can only be written once.
	 * @property writeOnce
	 * @type Boolean
	 */
    writeOnce: false,

	/**
     * The attribute's initial configuration.
     * @private
	 * @property _initialConfig
	 * @type Object
	 */
    _initialConfig: null,
    
	/**
     * Whether or not the attribute's value has been set.
     * @private
	 * @property _written
	 * @type Boolean
	 */
    _written: false,
    
	/**
     * The method to use when setting the attribute's value.
     * The method recieves the new value as the only argument.
	 * @property method
	 * @type Function
	 */
    method: null,
    
	/**
     * The validator to use when setting the attribute's value.
	 * @property validator
	 * @type Function
     * @return Boolean
	 */
    validator: null,
    
    /**
     * Retrieves the current value of the attribute.
     * @method getValue
     * @return {any} The current value of the attribute.
     */
    getValue: function() {
        return this.value;
    },
    
    /**
     * Sets the value of the attribute and fires beforeChange and change events.
     * @method setValue
     * @param {Any} value The value to apply to the attribute.
     * @param {Boolean} silent If true the change events will not be fired.
     * @return {Boolean} Whether or not the value was set.
     */
    setValue: function(value, silent) {
        var beforeRetVal;
        var owner = this.owner;
        var name = this.name;
        
        var event = {
            type: name, 
            prevValue: this.getValue(),
            newValue: value
        };
        
        if (this.readOnly || ( this.writeOnce && this._written) ) {
            return false; // write not allowed
        }
        
        if (this.validator && !this.validator.call(owner, value) ) {
            return false; // invalid value
        }

        if (!silent) {
            beforeRetVal = owner.fireBeforeChangeEvent(event);
            if (beforeRetVal === false) {
                return false;
            }
        }

        if (this.method) {
            this.method.call(owner, value);
        }
        
        this.value = value;
        this._written = true;
        
        event.type = name;
        
        if (!silent) {
            this.owner.fireChangeEvent(event);
        }
        
        return true;
    },
    
    /**
     * Allows for configuring the Attribute's properties.
     * @method configure
     * @param {Object} map A key-value map of Attribute properties.
     * @param {Boolean} init Whether or not this should become the initial config.
     */
    configure: function(map, init) {
        map = map || {};
        this._written = false; // reset writeOnce
        this._initialConfig = this._initialConfig || {};
        
        for (var key in map) {
            if ( key && YAHOO.lang.hasOwnProperty(map, key) ) {
                this[key] = map[key];
                if (init) {
                    this._initialConfig[key] = map[key];
                }
            }
        }
    },
    
    /**
     * Resets the value to the initial config value.
     * @method resetValue
     * @return {Boolean} Whether or not the value was set.
     */
    resetValue: function() {
        return this.setValue(this._initialConfig.value);
    },
    
    /**
     * Resets the attribute config to the initial config state.
     * @method resetConfig
     */
    resetConfig: function() {
        this.configure(this._initialConfig);
    },
    
    /**
     * Resets the value to the current value.
     * Useful when values may have gotten out of sync with actual properties.
     * @method refresh
     * @return {Boolean} Whether or not the value was set.
     */
    refresh: function(silent) {
        this.setValue(this.value, silent);
    }
};

(function() {
    var Lang = YAHOO.util.Lang;

    /*
    Copyright (c) 2006, Yahoo! Inc. All rights reserved.
    Code licensed under the BSD License:
    http://developer.yahoo.net/yui/license.txt
    */
    
    /**
     * Provides and manages YAHOO.util.Attribute instances
     * @namespace YAHOO.util
     * @class AttributeProvider
     * @uses YAHOO.util.EventProvider
     */
    YAHOO.util.AttributeProvider = function() {};

    YAHOO.util.AttributeProvider.prototype = {
        
        /**
         * A key-value map of Attribute configurations
         * @property _configs
         * @protected (may be used by subclasses and augmentors)
         * @private
         * @type {Object}
         */
        _configs: null,
        /**
         * Returns the current value of the attribute.
         * @method get
         * @param {String} key The attribute whose value will be returned.
         */
        get: function(key){
            this._configs = this._configs || {};
            var config = this._configs[key];
            
            if (!config) {
                return undefined;
            }
            
            return config.value;
        },
        
        /**
         * Sets the value of a config.
         * @method set
         * @param {String} key The name of the attribute
         * @param {Any} value The value to apply to the attribute
         * @param {Boolean} silent Whether or not to suppress change events
         * @return {Boolean} Whether or not the value was set.
         */
        set: function(key, value, silent){
            this._configs = this._configs || {};
            var config = this._configs[key];
            
            if (!config) {
                return false;
            }
            
            return config.setValue(value, silent);
        },
    
        /**
         * Returns an array of attribute names.
         * @method getAttributeKeys
         * @return {Array} An array of attribute names.
         */
        getAttributeKeys: function(){
            this._configs = this._configs;
            var keys = [];
            var config;
            for (var key in this._configs) {
                config = this._configs[key];
                if ( Lang.hasOwnProperty(this._configs, key) && 
                        !Lang.isUndefined(config) ) {
                    keys[keys.length] = key;
                }
            }
            
            return keys;
        },
        
        /**
         * Sets multiple attribute values.
         * @method setAttributes
         * @param {Object} map  A key-value map of attributes
         * @param {Boolean} silent Whether or not to suppress change events
         */
        setAttributes: function(map, silent){
            for (var key in map) {
                if ( Lang.hasOwnProperty(map, key) ) {
                    this.set(key, map[key], silent);
                }
            }
        },
    
        /**
         * Resets the specified attribute's value to its initial value.
         * @method resetValue
         * @param {String} key The name of the attribute
         * @param {Boolean} silent Whether or not to suppress change events
         * @return {Boolean} Whether or not the value was set
         */
        resetValue: function(key, silent){
            this._configs = this._configs || {};
            if (this._configs[key]) {
                this.set(key, this._configs[key]._initialConfig.value, silent);
                return true;
            }
            return false;
        },
    
        /**
         * Sets the attribute's value to its current value.
         * @method refresh
         * @param {String | Array} key The attribute(s) to refresh
         * @param {Boolean} silent Whether or not to suppress change events
         */
        refresh: function(key, silent){
            this._configs = this._configs;
            
            key = ( ( Lang.isString(key) ) ? [key] : key ) || 
                    this.getAttributeKeys();
            
            for (var i = 0, len = key.length; i < len; ++i) { 
                if ( // only set if there is a value and not null
                    this._configs[key[i]] && 
                    ! Lang.isUndefined(this._configs[key[i]].value) &&
                    ! Lang.isNull(this._configs[key[i]].value) ) {
                    this._configs[key[i]].refresh(silent);
                }
            }
        },
    
        /**
         * Adds an Attribute to the AttributeProvider instance. 
         * @method register
         * @param {String} key The attribute's name
         * @param {Object} map A key-value map containing the
         * attribute's properties.
         * @deprecated Use setAttributeConfig
         */
        register: function(key, map) {
            this.setAttributeConfig(key, map);
        },
        
        
        /**
         * Returns the attribute's properties.
         * @method getAttributeConfig
         * @param {String} key The attribute's name
         * @private
         * @return {object} A key-value map containing all of the
         * attribute's properties.
         */
        getAttributeConfig: function(key) {
            this._configs = this._configs || {};
            var config = this._configs[key] || {};
            var map = {}; // returning a copy to prevent overrides
            
            for (key in config) {
                if ( Lang.hasOwnProperty(config, key) ) {
                    map[key] = config[key];
                }
            }
    
            return map;
        },
        
        /**
         * Sets or updates an Attribute instance's properties. 
         * @method setAttributeConfig
         * @param {String} key The attribute's name.
         * @param {Object} map A key-value map of attribute properties
         * @param {Boolean} init Whether or not this should become the intial config.
         */
        setAttributeConfig: function(key, map, init) {
            this._configs = this._configs || {};
            map = map || {};
            if (!this._configs[key]) {
                map.name = key;
                this._configs[key] = this.createAttribute(map);
            } else {
                this._configs[key].configure(map, init);
            }
        },
        
        /**
         * Sets or updates an Attribute instance's properties. 
         * @method configureAttribute
         * @param {String} key The attribute's name.
         * @param {Object} map A key-value map of attribute properties
         * @param {Boolean} init Whether or not this should become the intial config.
         * @deprecated Use setAttributeConfig
         */
        configureAttribute: function(key, map, init) {
            this.setAttributeConfig(key, map, init);
        },
        
        /**
         * Resets an attribute to its intial configuration. 
         * @method resetAttributeConfig
         * @param {String} key The attribute's name.
         * @private
         */
        resetAttributeConfig: function(key){
            this._configs = this._configs || {};
            this._configs[key].resetConfig();
        },
        
        // wrapper for EventProvider.subscribe
        // to create events on the fly
        subscribe: function(type, callback) {
            this._events = this._events || {};

            if ( !(type in this._events) ) {
                this._events[type] = this.createEvent(type);
            }

            YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
        },

        on: function() {
            this.subscribe.apply(this, arguments);
        },

        addListener: function() {
            this.subscribe.apply(this, arguments);
        },

        /**
         * Fires the attribute's beforeChange event. 
         * @method fireBeforeChangeEvent
         * @param {String} key The attribute's name.
         * @param {Obj} e The event object to pass to handlers.
         */
        fireBeforeChangeEvent: function(e) {
            var type = 'before';
            type += e.type.charAt(0).toUpperCase() + e.type.substr(1) + 'Change';
            e.type = type;
            return this.fireEvent(e.type, e);
        },
        
        /**
         * Fires the attribute's change event. 
         * @method fireChangeEvent
         * @param {String} key The attribute's name.
         * @param {Obj} e The event object to pass to the handlers.
         */
        fireChangeEvent: function(e) {
            e.type += 'Change';
            return this.fireEvent(e.type, e);
        },

        createAttribute: function(map) {
            return new YAHOO.util.Attribute(map, this);
        }
    };
    
    YAHOO.augment(YAHOO.util.AttributeProvider, YAHOO.util.EventProvider);
})();

(function() {
// internal shorthand
var Dom = YAHOO.util.Dom,
    AttributeProvider = YAHOO.util.AttributeProvider;

/**
 * Element provides an wrapper object to simplify adding
 * event listeners, using dom methods, and managing attributes. 
 * @module element
 * @namespace YAHOO.util
 * @requires yahoo, dom, event
 * @beta
 */

/**
 * Element provides an wrapper object to simplify adding
 * event listeners, using dom methods, and managing attributes. 
 * @class Element
 * @uses YAHOO.util.AttributeProvider
 * @constructor
 * @param el {HTMLElement | String} The html element that 
 * represents the Element.
 * @param {Object} map A key-value map of initial config names and values
 */
YAHOO.util.Element = function(el, map) {
    if (arguments.length) {
        this.init(el, map);
    }
};

YAHOO.util.Element.prototype = {
    /**
     * Dom events supported by the Element instance.
     * @property DOM_EVENTS
     * @type Object
     */
    DOM_EVENTS: null,

    /**
     * Wrapper for HTMLElement method.
     * @method appendChild
     * @param {YAHOO.util.Element || HTMLElement} child The element to append. 
     */
    appendChild: function(child) {
        child = child.get ? child.get('element') : child;
        this.get('element').appendChild(child);
    },
    
    /**
     * Wrapper for HTMLElement method.
     * @method getElementsByTagName
     * @param {String} tag The tagName to collect
     */
    getElementsByTagName: function(tag) {
        return this.get('element').getElementsByTagName(tag);
    },
    
    /**
     * Wrapper for HTMLElement method.
     * @method hasChildNodes
     * @return {Boolean} Whether or not the element has childNodes
     */
    hasChildNodes: function() {
        return this.get('element').hasChildNodes();
    },
    
    /**
     * Wrapper for HTMLElement method.
     * @method insertBefore
     * @param {HTMLElement} element The HTMLElement to insert
     * @param {HTMLElement} before The HTMLElement to insert
     * the element before.
     */
    insertBefore: function(element, before) {
        element = element.get ? element.get('element') : element;
        before = (before && before.get) ? before.get('element') : before;
        
        this.get('element').insertBefore(element, before);
    },
    
    /**
     * Wrapper for HTMLElement method.
     * @method removeChild
     * @param {HTMLElement} child The HTMLElement to remove
     */
    removeChild: function(child) {
        child = child.get ? child.get('element') : child;
        this.get('element').removeChild(child);
        return true;
    },
    
    /**
     * Wrapper for HTMLElement method.
     * @method replaceChild
     * @param {HTMLElement} newNode The HTMLElement to insert
     * @param {HTMLElement} oldNode The HTMLElement to replace
     */
    replaceChild: function(newNode, oldNode) {
        newNode = newNode.get ? newNode.get('element') : newNode;
        oldNode = oldNode.get ? oldNode.get('element') : oldNode;
        return this.get('element').replaceChild(newNode, oldNode);
    },

    
    /**
     * Registers Element specific attributes.
     * @method initAttributes
     * @param {Object} map A key-value map of initial attribute configs
     */
    initAttributes: function(map) {
    },

    /**
     * Adds a listener for the given event.  These may be DOM or 
     * customEvent listeners.  Any event that is fired via fireEvent
     * can be listened for.  All handlers receive an event object. 
     * @method addListener
     * @param {String} type The name of the event to listen for
     * @param {Function} fn The handler to call when the event fires
     * @param {Any} obj A variable to pass to the handler
     * @param {Object} scope The object to use for the scope of the handler 
     */
    addListener: function(type, fn, obj, scope) {
        var el = this.get('element');
        scope = scope || this;
        
        el = this.get('id') || el;
        var self = this; 
        if (!this._events[type]) { // create on the fly
            if ( this.DOM_EVENTS[type] ) {
                YAHOO.util.Event.addListener(el, type, function(e) {
                    if (e.srcElement && !e.target) { // supplement IE with target
                        e.target = e.srcElement;
                    }
                    self.fireEvent(type, e);
                }, obj, scope);
            }
            
            this.createEvent(type, this);
        }
        
        YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments); // notify via customEvent
    },
    
    
    /**
     * Alias for addListener
     * @method on
     * @param {String} type The name of the event to listen for
     * @param {Function} fn The function call when the event fires
     * @param {Any} obj A variable to pass to the handler
     * @param {Object} scope The object to use for the scope of the handler 
     */
    on: function() { this.addListener.apply(this, arguments); },
    
    /**
     * Alias for addListener
     * @method subscribe
     * @param {String} type The name of the event to listen for
     * @param {Function} fn The function call when the event fires
     * @param {Any} obj A variable to pass to the handler
     * @param {Object} scope The object to use for the scope of the handler 
     */
    subscribe: function() { this.addListener.apply(this, arguments); },
    
    /**
     * Remove an event listener
     * @method removeListener
     * @param {String} type The name of the event to listen for
     * @param {Function} fn The function call when the event fires
     */
    removeListener: function(type, fn) {
        this.unsubscribe.apply(this, arguments);
    },
    
    /**
     * Wrapper for Dom method.
     * @method addClass
     * @param {String} className The className to add
     */
    addClass: function(className) {
        Dom.addClass(this.get('element'), className);
    },
    
    /**
     * Wrapper for Dom method.
     * @method getElementsByClassName
     * @param {String} className The className to collect
     * @param {String} tag (optional) The tag to use in
     * conjunction with class name
     * @return {Array} Array of HTMLElements
     */
    getElementsByClassName: function(className, tag) {
        return Dom.getElementsByClassName(className, tag,
                this.get('element') );
    },
    
    /**
     * Wrapper for Dom method.
     * @method hasClass
     * @param {String} className The className to add
     * @return {Boolean} Whether or not the element has the class name
     */
    hasClass: function(className) {
        return Dom.hasClass(this.get('element'), className); 
    },
    
    /**
     * Wrapper for Dom method.
     * @method removeClass
     * @param {String} className The className to remove
     */
    removeClass: function(className) {
        return Dom.removeClass(this.get('element'), className);
    },
    
    /**
     * Wrapper for Dom method.
     * @method replaceClass
     * @param {String} oldClassName The className to replace
     * @param {String} newClassName The className to add
     */
    replaceClass: function(oldClassName, newClassName) {
        return Dom.replaceClass(this.get('element'), 
                oldClassName, newClassName);
    },
    
    /**
     * Wrapper for Dom method.
     * @method setStyle
     * @param {String} property The style property to set
     * @param {String} value The value to apply to the style property
     */
    setStyle: function(property, value) {
        var el = this.get('element');
        if (!el) {
            return this._queue[this._queue.length] = ['setStyle', arguments];
        }

        return Dom.setStyle(el,  property, value); // TODO: always queuing?
    },
    
    /**
     * Wrapper for Dom method.
     * @method getStyle
     * @param {String} property The style property to retrieve
     * @return {String} The current value of the property
     */
    getStyle: function(property) {
        return Dom.getStyle(this.get('element'),  property);
    },
    
    /**
     * Apply any queued set calls.
     * @method fireQueue
     */
    fireQueue: function() {
        var queue = this._queue;
        for (var i = 0, len = queue.length; i < len; ++i) {
            this[queue[i][0]].apply(this, queue[i][1]);
        }
    },
    
    /**
     * Appends the HTMLElement into either the supplied parentNode.
     * @method appendTo
     * @param {HTMLElement | Element} parentNode The node to append to
     * @param {HTMLElement | Element} before An optional node to insert before
     */
    appendTo: function(parent, before) {
        parent = (parent.get) ?  parent.get('element') : Dom.get(parent);
        
        this.fireEvent('beforeAppendTo', {
            type: 'beforeAppendTo',
            target: parent
        });
        
        
        before = (before && before.get) ? 
                before.get('element') : Dom.get(before);
        var element = this.get('element');
        
        if (!element) {
            return false;
        }
        
        if (!parent) {
            return false;
        }
        
        if (element.parent != parent) {
            if (before) {
                parent.insertBefore(element, before);
            } else {
                parent.appendChild(element);
            }
        }
        
        
        this.fireEvent('appendTo', {
            type: 'appendTo',
            target: parent
        });
    },
    
    get: function(key) {
        var configs = this._configs || {};
        var el = configs.element; // avoid loop due to 'element'
        if (el && !configs[key] && !YAHOO.lang.isUndefined(el.value[key]) ) {
            return el.value[key];
        }

        return AttributeProvider.prototype.get.call(this, key);
    },

    setAttributes: function(map, silent){
        var el = this.get('element');
        for (var key in map) {
            // need to configure if setting unconfigured HTMLElement attribute 
            if ( !this._configs[key] && !YAHOO.lang.isUndefined(el[key]) ) {
                this.setAttributeConfig(key);
            }
        }

        // set based on configOrder
        for (var i = 0, len = this._configOrder.length; i < len; ++i) {
            if (map[this._configOrder[i]] !== undefined) {
                this.set(this._configOrder[i], map[this._configOrder[i]], silent);
            }
        }
    },

    set: function(key, value, silent) {
        var el = this.get('element');
        if (!el) {
            this._queue[this._queue.length] = ['set', arguments];
            if (this._configs[key]) {
                this._configs[key].value = value; // so "get" works while queueing
            
            }
            return;
        }
        
        // set it on the element if not configured and is an HTML attribute
        if ( !this._configs[key] && !YAHOO.lang.isUndefined(el[key]) ) {
            _registerHTMLAttr.call(this, key);
        }

        return AttributeProvider.prototype.set.apply(this, arguments);
    },
    
    setAttributeConfig: function(key, map, init) {
        var el = this.get('element');

        if (el && !this._configs[key] && !YAHOO.lang.isUndefined(el[key]) ) {
            _registerHTMLAttr.call(this, key, map);
        } else {
            AttributeProvider.prototype.setAttributeConfig.apply(this, arguments);
        }
        this._configOrder.push(key);
    },
    
    getAttributeKeys: function() {
        var el = this.get('element');
        var keys = AttributeProvider.prototype.getAttributeKeys.call(this);
        
        //add any unconfigured element keys
        for (var key in el) {
            if (!this._configs[key]) {
                keys[key] = keys[key] || el[key];
            }
        }
        
        return keys;
    },

    createEvent: function(type, scope) {
        this._events[type] = true;
        AttributeProvider.prototype.createEvent.apply(this, arguments);
    },
    
    init: function(el, attr) {
        _initElement.apply(this, arguments); 
    }
};

var _initElement = function(el, attr) {
    this._queue = this._queue || [];
    this._events = this._events || {};
    this._configs = this._configs || {};
    this._configOrder = []; 
    attr = attr || {};
    attr.element = attr.element || el || null;

    this.DOM_EVENTS = {
        'click': true,
        'dblclick': true,
        'keydown': true,
        'keypress': true,
        'keyup': true,
        'mousedown': true,
        'mousemove': true,
        'mouseout': true, 
        'mouseover': true, 
        'mouseup': true,
        'focus': true,
        'blur': true,
        'submit': true
    };

    var isReady = false;  // to determine when to init HTMLElement and content

    if (YAHOO.lang.isString(el) ) { // defer until available/ready
        _registerHTMLAttr.call(this, 'id', { value: attr.element });
    }

    if (Dom.get(el)) {
        isReady = true;
        _initHTMLElement.call(this, attr);
        _initContent.call(this, attr);
    } 

    YAHOO.util.Event.onAvailable(attr.element, function() {
        if (!isReady) { // otherwise already done
            _initHTMLElement.call(this, attr);
        }

        this.fireEvent('available', { type: 'available', target: attr.element });  
    }, this, true);
    
    YAHOO.util.Event.onContentReady(attr.element, function() {
        if (!isReady) { // otherwise already done
            _initContent.call(this, attr);
        }
        this.fireEvent('contentReady', { type: 'contentReady', target: attr.element });  
    }, this, true);
};

var _initHTMLElement = function(attr) {
    /**
     * The HTMLElement the Element instance refers to.
     * @attribute element
     * @type HTMLElement
     */
    this.setAttributeConfig('element', {
        value: Dom.get(attr.element),
        readOnly: true
     });
};

var _initContent = function(attr) {
    this.initAttributes(attr);
    this.setAttributes(attr, true);
    this.fireQueue();

};

/**
 * Sets the value of the property and fires beforeChange and change events.
 * @private
 * @method _registerHTMLAttr
 * @param {YAHOO.util.Element} element The Element instance to
 * register the config to.
 * @param {String} key The name of the config to register
 * @param {Object} map A key-value map of the config's params
 */
var _registerHTMLAttr = function(key, map) {
    var el = this.get('element');
    map = map || {};
    map.name = key;
    map.method = map.method || function(value) {
        el[key] = value;
    };
    map.value = map.value || el[key];
    this._configs[key] = new YAHOO.util.Attribute(map, this);
};

/**
 * Fires when the Element's HTMLElement can be retrieved by Id.
 * <p>See: <a href="#addListener">Element.addListener</a></p>
 * <p><strong>Event fields:</strong><br>
 * <code>&lt;String&gt; type</code> available<br>
 * <code>&lt;HTMLElement&gt;
 * target</code> the HTMLElement bound to this Element instance<br>
 * <p><strong>Usage:</strong><br>
 * <code>var handler = function(e) {var target = e.target};<br>
 * myTabs.addListener('available', handler);</code></p>
 * @event available
 */
 
/**
 * Fires when the Element's HTMLElement subtree is rendered.
 * <p>See: <a href="#addListener">Element.addListener</a></p>
 * <p><strong>Event fields:</strong><br>
 * <code>&lt;String&gt; type</code> contentReady<br>
 * <code>&lt;HTMLElement&gt;
 * target</code> the HTMLElement bound to this Element instance<br>
 * <p><strong>Usage:</strong><br>
 * <code>var handler = function(e) {var target = e.target};<br>
 * myTabs.addListener('contentReady', handler);</code></p>
 * @event contentReady
 */

/**
 * Fires before the Element is appended to another Element.
 * <p>See: <a href="#addListener">Element.addListener</a></p>
 * <p><strong>Event fields:</strong><br>
 * <code>&lt;String&gt; type</code> beforeAppendTo<br>
 * <code>&lt;HTMLElement/Element&gt;
 * target</code> the HTMLElement/Element being appended to 
 * <p><strong>Usage:</strong><br>
 * <code>var handler = function(e) {var target = e.target};<br>
 * myTabs.addListener('beforeAppendTo', handler);</code></p>
 * @event beforeAppendTo
 */

/**
 * Fires after the Element is appended to another Element.
 * <p>See: <a href="#addListener">Element.addListener</a></p>
 * <p><strong>Event fields:</strong><br>
 * <code>&lt;String&gt; type</code> appendTo<br>
 * <code>&lt;HTMLElement/Element&gt;
 * target</code> the HTMLElement/Element being appended to 
 * <p><strong>Usage:</strong><br>
 * <code>var handler = function(e) {var target = e.target};<br>
 * myTabs.addListener('appendTo', handler);</code></p>
 * @event appendTo
 */

YAHOO.augment(YAHOO.util.Element, AttributeProvider);
})();

YAHOO.register("element", YAHOO.util.Element, {version: "2.5.2", build: "1076"});

/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){YAHOO.widget.TabView=function(K,J){J=J||{};if(arguments.length==1&&!YAHOO.lang.isString(K)&&!K.nodeName){J=K;K=J.element||null;}if(!K&&!J.element){K=I.call(this,J);}YAHOO.widget.TabView.superclass.constructor.call(this,K,J);};YAHOO.extend(YAHOO.widget.TabView,YAHOO.util.Element);var F=YAHOO.widget.TabView.prototype;var E=YAHOO.util.Dom;var H=YAHOO.util.Event;var D=YAHOO.widget.Tab;F.CLASSNAME="yui-navset";F.TAB_PARENT_CLASSNAME="yui-nav";F.CONTENT_PARENT_CLASSNAME="yui-content";F._tabParent=null;F._contentParent=null;F.addTab=function(M,O){var P=this.get("tabs");if(!P){this._queue[this._queue.length]=["addTab",arguments];return false;}O=(O===undefined)?P.length:O;var R=this.getTab(O);var T=this;var L=this.get("element");var S=this._tabParent;var Q=this._contentParent;var J=M.get("element");var K=M.get("contentEl");if(R){S.insertBefore(J,R.get("element"));}else{S.appendChild(J);}if(K&&!E.isAncestor(Q,K)){Q.appendChild(K);}if(!M.get("active")){M.set("contentVisible",false,true);}else{this.set("activeTab",M,true);}var N=function(V){YAHOO.util.Event.preventDefault(V);var U=false;if(this==T.get("activeTab")){U=true;}T.set("activeTab",this,U);};M.addListener(M.get("activationEvent"),N);M.addListener("activationEventChange",function(U){if(U.prevValue!=U.newValue){M.removeListener(U.prevValue,N);M.addListener(U.newValue,N);}});P.splice(O,0,M);};F.DOMEventHandler=function(P){var K=this.get("element");var Q=YAHOO.util.Event.getTarget(P);var S=this._tabParent;if(E.isAncestor(S,Q)){var L;var M=null;var J;var R=this.get("tabs");for(var N=0,O=R.length;N<O;N++){L=R[N].get("element");J=R[N].get("contentEl");if(Q==L||E.isAncestor(L,Q)){M=R[N];break;}}if(M){M.fireEvent(P.type,P);}}};F.getTab=function(J){return this.get("tabs")[J];};F.getTabIndex=function(N){var K=null;var M=this.get("tabs");for(var L=0,J=M.length;L<J;++L){if(N==M[L]){K=L;break;}}return K;};F.removeTab=function(M){var L=this.get("tabs").length;var K=this.getTabIndex(M);var J=K+1;if(M==this.get("activeTab")){if(L>1){if(K+1==L){this.set("activeIndex",K-1);}else{this.set("activeIndex",K+1);}}}this._tabParent.removeChild(M.get("element"));this._contentParent.removeChild(M.get("contentEl"));this._configs.tabs.value.splice(K,1);};F.toString=function(){var J=this.get("id")||this.get("tagName");return"TabView "+J;};F.contentTransition=function(K,J){K.set("contentVisible",true);J.set("contentVisible",false);};F.initAttributes=function(J){YAHOO.widget.TabView.superclass.initAttributes.call(this,J);if(!J.orientation){J.orientation="top";}var L=this.get("element");if(!YAHOO.util.Dom.hasClass(L,this.CLASSNAME)){YAHOO.util.Dom.addClass(L,this.CLASSNAME);}this.setAttributeConfig("tabs",{value:[],readOnly:true});this._tabParent=this.getElementsByClassName(this.TAB_PARENT_CLASSNAME,"ul")[0]||G.call(this);this._contentParent=this.getElementsByClassName(this.CONTENT_PARENT_CLASSNAME,"div")[0]||C.call(this);this.setAttributeConfig("orientation",{value:J.orientation,method:function(M){var N=this.get("orientation");this.addClass("yui-navset-"+M);if(N!=M){this.removeClass("yui-navset-"+N);}switch(M){case"bottom":this.appendChild(this._tabParent);break;}}});this.setAttributeConfig("activeIndex",{value:J.activeIndex,method:function(M){this.set("activeTab",this.getTab(M));},validator:function(M){return !this.getTab(M).get("disabled");}});this.setAttributeConfig("activeTab",{value:J.activeTab,method:function(N){var M=this.get("activeTab");if(N){N.set("active",true);this._configs["activeIndex"].value=this.getTabIndex(N);}if(M&&M!=N){M.set("active",false);}if(M&&N!=M){this.contentTransition(N,M);}else{if(N){N.set("contentVisible",true);}}},validator:function(M){return !M.get("disabled");}});if(this._tabParent){B.call(this);}this.DOM_EVENTS.submit=false;this.DOM_EVENTS.focus=false;this.DOM_EVENTS.blur=false;for(var K in this.DOM_EVENTS){if(YAHOO.lang.hasOwnProperty(this.DOM_EVENTS,K)){this.addListener.call(this,K,this.DOMEventHandler);}}};var B=function(){var Q,L,P;var O=this.get("element");var N=A(this._tabParent);var K=A(this._contentParent);for(var M=0,J=N.length;M<J;++M){L={};if(K[M]){L.contentEl=K[M];}Q=new YAHOO.widget.Tab(N[M],L);this.addTab(Q);if(Q.hasClass(Q.ACTIVE_CLASSNAME)){this._configs.activeTab.value=Q;this._configs.activeIndex.value=this.getTabIndex(Q);}}};var I=function(J){var K=document.createElement("div");if(this.CLASSNAME){K.className=this.CLASSNAME;}return K;};var G=function(J){var K=document.createElement("ul");if(this.TAB_PARENT_CLASSNAME){K.className=this.TAB_PARENT_CLASSNAME;}this.get("element").appendChild(K);return K;};var C=function(J){var K=document.createElement("div");if(this.CONTENT_PARENT_CLASSNAME){K.className=this.CONTENT_PARENT_CLASSNAME;}this.get("element").appendChild(K);return K;};var A=function(M){var K=[];var N=M.childNodes;for(var L=0,J=N.length;L<J;++L){if(N[L].nodeType==1){K[K.length]=N[L];}}return K;};})();(function(){var E=YAHOO.util.Dom,J=YAHOO.util.Event;var B=function(L,K){K=K||{};if(arguments.length==1&&!YAHOO.lang.isString(L)&&!L.nodeName){K=L;L=K.element;}if(!L&&!K.element){L=H.call(this,K);}this.loadHandler={success:function(M){this.set("content",M.responseText);},failure:function(M){}};B.superclass.constructor.call(this,L,K);this.DOM_EVENTS={};};YAHOO.extend(B,YAHOO.util.Element);var F=B.prototype;F.LABEL_TAGNAME="em";F.ACTIVE_CLASSNAME="selected";F.ACTIVE_TITLE="active";F.DISABLED_CLASSNAME="disabled";F.LOADING_CLASSNAME="loading";F.dataConnection=null;F.loadHandler=null;F._loading=false;F.toString=function(){var K=this.get("element");var L=K.id||K.tagName;return"Tab "+L;};F.initAttributes=function(K){K=K||{};B.superclass.initAttributes.call(this,K);var M=this.get("element");this.setAttributeConfig("activationEvent",{value:K.activationEvent||"click"});this.setAttributeConfig("labelEl",{value:K.labelEl||G.call(this),method:function(N){var O=this.get("labelEl");if(O){if(O==N){return false;}this.replaceChild(N,O);}else{if(M.firstChild){this.insertBefore(N,M.firstChild);}else{this.appendChild(N);}}}});this.setAttributeConfig("label",{value:K.label||D.call(this),method:function(O){var N=this.get("labelEl");
if(!N){this.set("labelEl",I.call(this));}C.call(this,O);}});this.setAttributeConfig("contentEl",{value:K.contentEl||document.createElement("div"),method:function(N){var O=this.get("contentEl");if(O){if(O==N){return false;}this.replaceChild(N,O);}}});this.setAttributeConfig("content",{value:K.content,method:function(N){this.get("contentEl").innerHTML=N;}});var L=false;this.setAttributeConfig("dataSrc",{value:K.dataSrc});this.setAttributeConfig("cacheData",{value:K.cacheData||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("loadMethod",{value:K.loadMethod||"GET",validator:YAHOO.lang.isString});this.setAttributeConfig("dataLoaded",{value:false,validator:YAHOO.lang.isBoolean,writeOnce:true});this.setAttributeConfig("dataTimeout",{value:K.dataTimeout||null,validator:YAHOO.lang.isNumber});this.setAttributeConfig("active",{value:K.active||this.hasClass(this.ACTIVE_CLASSNAME),method:function(N){if(N===true){this.addClass(this.ACTIVE_CLASSNAME);this.set("title",this.ACTIVE_TITLE);}else{this.removeClass(this.ACTIVE_CLASSNAME);this.set("title","");}},validator:function(N){return YAHOO.lang.isBoolean(N)&&!this.get("disabled");}});this.setAttributeConfig("disabled",{value:K.disabled||this.hasClass(this.DISABLED_CLASSNAME),method:function(N){if(N===true){E.addClass(this.get("element"),this.DISABLED_CLASSNAME);}else{E.removeClass(this.get("element"),this.DISABLED_CLASSNAME);}},validator:YAHOO.lang.isBoolean});this.setAttributeConfig("href",{value:K.href||this.getElementsByTagName("a")[0].getAttribute("href",2)||"#",method:function(N){this.getElementsByTagName("a")[0].href=N;},validator:YAHOO.lang.isString});this.setAttributeConfig("contentVisible",{value:K.contentVisible,method:function(N){if(N){this.get("contentEl").style.display="block";if(this.get("dataSrc")){if(!this._loading&&!(this.get("dataLoaded")&&this.get("cacheData"))){A.call(this);}}}else{this.get("contentEl").style.display="none";}},validator:YAHOO.lang.isBoolean});};var H=function(K){var O=document.createElement("li");var L=document.createElement("a");L.href=K.href||"#";O.appendChild(L);var N=K.label||null;var M=K.labelEl||null;if(M){if(!N){N=D.call(this,M);}}else{M=I.call(this);}L.appendChild(M);return O;};var G=function(){return this.getElementsByTagName(this.LABEL_TAGNAME)[0];};var I=function(){var K=document.createElement(this.LABEL_TAGNAME);return K;};var C=function(K){var L=this.get("labelEl");L.innerHTML=K;};var D=function(){var K,L=this.get("labelEl");if(!L){return undefined;}return L.innerHTML;};var A=function(){if(!YAHOO.util.Connect){return false;}E.addClass(this.get("contentEl").parentNode,this.LOADING_CLASSNAME);this._loading=true;this.dataConnection=YAHOO.util.Connect.asyncRequest(this.get("loadMethod"),this.get("dataSrc"),{success:function(K){this.loadHandler.success.call(this,K);this.set("dataLoaded",true);this.dataConnection=null;E.removeClass(this.get("contentEl").parentNode,this.LOADING_CLASSNAME);this._loading=false;},failure:function(K){this.loadHandler.failure.call(this,K);this.dataConnection=null;E.removeClass(this.get("contentEl").parentNode,this.LOADING_CLASSNAME);this._loading=false;},scope:this,timeout:this.get("dataTimeout")});};YAHOO.widget.Tab=B;})();YAHOO.register("tabview",YAHOO.widget.TabView,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){for(var D=0;D<C.length;D=D+1){var H=C[D],G=E[H];if(A.isFunction(G)&&G!=Object.prototype[H]){F[H]=G;}}}:function(){},extend:function(H,I,G){if(!I||!H){throw new Error("extend failed, please check that "+"all dependencies are included.");}var E=function(){};E.prototype=I.prototype;H.prototype=new E();H.prototype.constructor=H;H.superclass=I.prototype;if(I.prototype.constructor==Object.prototype.constructor){I.prototype.constructor=I;}if(G){for(var D in G){if(A.hasOwnProperty(G,D)){H.prototype[D]=G[D];}}A._IEEnumFix(H.prototype,G);}},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}A._IEEnumFix(H,G);}},augmentProto:function(G,F){if(!F||!G){throw new Error("Augment failed, verify dependencies.");}var D=[G.prototype,F.prototype];for(var E=2;E<arguments.length;E=E+1){D.push(arguments[E]);}A.augmentObject.apply(this,D);},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},substitute:function(S,E,L){var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";for(;;){I=S.lastIndexOf(D);if(I<0){break;}H=S.indexOf(Q,I);if(I+1>=H){break;}F=S.substring(I+1,H);O=F;R=null;G=O.indexOf(M);if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}P=E[O];if(L){P=L(O,P,R);}if(A.isObject(P)){if(A.isArray(P)){P=A.dump(P,parseInt(R,10));}else{R=R||"";var K=R.indexOf(J);if(K>-1){R=R.substring(4);}if(P.toString===Object.prototype.toString||K>-1){P=A.dump(P,parseInt(R,10));}else{P=P.toString();}}}else{if(!A.isString(P)&&!A.isNumber(P)){P="~-"+N.length+"-~";N[N.length]=F;}}S=S.substring(0,I)+P+S.substring(H+1);}for(I=N.length-1;I>=0;I=I-1){S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");}return S;},trim:function(D){try{return D.replace(/^\s+|\s+$/g,"");}catch(E){return D;}},merge:function(){var G={},E=arguments;for(var F=0,D=E.length;F<D;F=F+1){A.augmentObject(G,E[F],true);}return G;},later:function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=G,I,D;if(A.isString(L)){F=E[L];}if(!F){throw new TypeError("method undefined");}if(!A.isArray(J)){J=[G];}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.5.2",build:"1076"});YAHOO.util.Get=function(){var M={},L=0,Q=0,E=false,N=YAHOO.env.ua,R=YAHOO.lang;var J=function(V,S,W){var T=W||window,X=T.document,Y=X.createElement(V);for(var U in S){if(S[U]&&YAHOO.lang.hasOwnProperty(S,U)){Y.setAttribute(U,S[U]);}}return Y;};var H=function(S,T,V){var U=V||"utf-8";return J("link",{"id":"yui__dyn_"+(Q++),"type":"text/css","charset":U,"rel":"stylesheet","href":S},T);
};var O=function(S,T,V){var U=V||"utf-8";return J("script",{"id":"yui__dyn_"+(Q++),"type":"text/javascript","charset":U,"src":S},T);};var A=function(S,T){return{tId:S.tId,win:S.win,data:S.data,nodes:S.nodes,msg:T,purge:function(){D(this.tId);}};};var B=function(S,V){var T=M[V],U=(R.isString(S))?T.win.document.getElementById(S):S;if(!U){P(V,"target node not found: "+S);}return U;};var P=function(V,U){var S=M[V];if(S.onFailure){var T=S.scope||S.win;S.onFailure.call(T,A(S,U));}};var C=function(V){var S=M[V];S.finished=true;if(S.aborted){var U="transaction "+V+" was aborted";P(V,U);return ;}if(S.onSuccess){var T=S.scope||S.win;S.onSuccess.call(T,A(S));}};var G=function(U,Y){var T=M[U];if(T.aborted){var W="transaction "+U+" was aborted";P(U,W);return ;}if(Y){T.url.shift();if(T.varName){T.varName.shift();}}else{T.url=(R.isString(T.url))?[T.url]:T.url;if(T.varName){T.varName=(R.isString(T.varName))?[T.varName]:T.varName;}}var b=T.win,a=b.document,Z=a.getElementsByTagName("head")[0],V;if(T.url.length===0){if(T.type==="script"&&N.webkit&&N.webkit<420&&!T.finalpass&&!T.varName){var X=O(null,T.win,T.charset);X.innerHTML='YAHOO.util.Get._finalize("'+U+'");';T.nodes.push(X);Z.appendChild(X);}else{C(U);}return ;}var S=T.url[0];if(T.type==="script"){V=O(S,b,T.charset);}else{V=H(S,b,T.charset);}F(T.type,V,U,S,b,T.url.length);T.nodes.push(V);if(T.insertBefore){var c=B(T.insertBefore,U);if(c){c.parentNode.insertBefore(V,c);}}else{Z.appendChild(V);}if((N.webkit||N.gecko)&&T.type==="css"){G(U,S);}};var K=function(){if(E){return ;}E=true;for(var S in M){var T=M[S];if(T.autopurge&&T.finished){D(T.tId);delete M[S];}}E=false;};var D=function(Z){var W=M[Z];if(W){var Y=W.nodes,S=Y.length,X=W.win.document,V=X.getElementsByTagName("head")[0];if(W.insertBefore){var U=B(W.insertBefore,Z);if(U){V=U.parentNode;}}for(var T=0;T<S;T=T+1){V.removeChild(Y[T]);}}W.nodes=[];};var I=function(T,S,U){var W="q"+(L++);U=U||{};if(L%YAHOO.util.Get.PURGE_THRESH===0){K();}M[W]=R.merge(U,{tId:W,type:T,url:S,finished:false,nodes:[]});var V=M[W];V.win=V.win||window;V.scope=V.scope||V.win;V.autopurge=("autopurge" in V)?V.autopurge:(T==="script")?true:false;R.later(0,V,G,W);return{tId:W};};var F=function(b,W,V,T,X,Y,a){var Z=a||G;if(N.ie){W.onreadystatechange=function(){var c=this.readyState;if("loaded"===c||"complete"===c){Z(V,T);}};}else{if(N.webkit){if(b==="script"){if(N.webkit>=420){W.addEventListener("load",function(){Z(V,T);});}else{var S=M[V];if(S.varName){var U=YAHOO.util.Get.POLL_FREQ;S.maxattempts=YAHOO.util.Get.TIMEOUT/U;S.attempts=0;S._cache=S.varName[0].split(".");S.timer=R.later(U,S,function(h){var e=this._cache,d=e.length,c=this.win,f;for(f=0;f<d;f=f+1){c=c[e[f]];if(!c){this.attempts++;if(this.attempts++>this.maxattempts){var g="Over retry limit, giving up";S.timer.cancel();P(V,g);}else{}return ;}}S.timer.cancel();Z(V,T);},null,true);}else{R.later(YAHOO.util.Get.POLL_FREQ,null,Z,[V,T]);}}}}else{W.onload=function(){Z(V,T);};}}};return{POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(S){R.later(0,null,C,S);},abort:function(T){var U=(R.isString(T))?T:T.tId;var S=M[U];if(S){S.aborted=true;}},script:function(S,T){return I("script",S,T);},css:function(S,T){return I("css",S,T);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"2.5.2",build:"1076"});(function(){var Y=YAHOO,util=Y.util,lang=Y.lang,env=Y.env,PROV="_provides",SUPER="_supersedes",REQ="expanded",AFTER="_after";var YUI={dupsAllowed:{"yahoo":true,"get":true},info:{"base":"http://yui.yahooapis.com/2.5.2/build/","skin":{"defaultSkin":"sam","base":"assets/skins/","path":"skin.css","after":["reset","fonts","grids","base"],"rollup":3},dupsAllowed:["yahoo","get"],"moduleInfo":{"animation":{"type":"js","path":"animation/animation-min.js","requires":["dom","event"]},"autocomplete":{"type":"js","path":"autocomplete/autocomplete-min.js","requires":["dom","event"],"optional":["connection","animation"],"skinnable":true},"base":{"type":"css","path":"base/base-min.css","after":["reset","fonts","grids"]},"button":{"type":"js","path":"button/button-min.js","requires":["element"],"optional":["menu"],"skinnable":true},"calendar":{"type":"js","path":"calendar/calendar-min.js","requires":["event","dom"],"skinnable":true},"charts":{"type":"js","path":"charts/charts-experimental-min.js","requires":["element","json","datasource"]},"colorpicker":{"type":"js","path":"colorpicker/colorpicker-min.js","requires":["slider","element"],"optional":["animation"],"skinnable":true},"connection":{"type":"js","path":"connection/connection-min.js","requires":["event"]},"container":{"type":"js","path":"container/container-min.js","requires":["dom","event"],"optional":["dragdrop","animation","connection"],"supersedes":["containercore"],"skinnable":true},"containercore":{"type":"js","path":"container/container_core-min.js","requires":["dom","event"],"pkg":"container"},"cookie":{"type":"js","path":"cookie/cookie-beta-min.js","requires":["yahoo"]},"datasource":{"type":"js","path":"datasource/datasource-beta-min.js","requires":["event"],"optional":["connection"]},"datatable":{"type":"js","path":"datatable/datatable-beta-min.js","requires":["element","datasource"],"optional":["calendar","dragdrop"],"skinnable":true},"dom":{"type":"js","path":"dom/dom-min.js","requires":["yahoo"]},"dragdrop":{"type":"js","path":"dragdrop/dragdrop-min.js","requires":["dom","event"]},"editor":{"type":"js","path":"editor/editor-beta-min.js","requires":["menu","element","button"],"optional":["animation","dragdrop"],"supersedes":["simpleeditor"],"skinnable":true},"element":{"type":"js","path":"element/element-beta-min.js","requires":["dom","event"]},"event":{"type":"js","path":"event/event-min.js","requires":["yahoo"]},"fonts":{"type":"css","path":"fonts/fonts-min.css"},"get":{"type":"js","path":"get/get-min.js","requires":["yahoo"]},"grids":{"type":"css","path":"grids/grids-min.css","requires":["fonts"],"optional":["reset"]},"history":{"type":"js","path":"history/history-min.js","requires":["event"]},"imagecropper":{"type":"js","path":"imagecropper/imagecropper-beta-min.js","requires":["dom","event","dragdrop","element","resize"],"skinnable":true},"imageloader":{"type":"js","path":"imageloader/imageloader-min.js","requires":["event","dom"]},"json":{"type":"js","path":"json/json-min.js","requires":["yahoo"]},"layout":{"type":"js","path":"layout/layout-beta-min.js","requires":["dom","event","element"],"optional":["animation","dragdrop","resize","selector"],"skinnable":true},"logger":{"type":"js","path":"logger/logger-min.js","requires":["event","dom"],"optional":["dragdrop"],"skinnable":true},"menu":{"type":"js","path":"menu/menu-min.js","requires":["containercore"],"skinnable":true},"profiler":{"type":"js","path":"profiler/profiler-beta-min.js","requires":["yahoo"]},"profilerviewer":{"type":"js","path":"profilerviewer/profilerviewer-beta-min.js","requires":["profiler","yuiloader","element"],"skinnable":true},"reset":{"type":"css","path":"reset/reset-min.css"},"reset-fonts-grids":{"type":"css","path":"reset-fonts-grids/reset-fonts-grids.css","supersedes":["reset","fonts","grids","reset-fonts"],"rollup":4},"reset-fonts":{"type":"css","path":"reset-fonts/reset-fonts.css","supersedes":["reset","fonts"],"rollup":2},"resize":{"type":"js","path":"resize/resize-beta-min.js","requires":["dom","event","dragdrop","element"],"optional":["animation"],"skinnable":true},"selector":{"type":"js","path":"selector/selector-beta-min.js","requires":["yahoo","dom"]},"simpleeditor":{"type":"js","path":"editor/simpleeditor-beta-min.js","requires":["element"],"optional":["containercore","menu","button","animation","dragdrop"],"skinnable":true,"pkg":"editor"},"slider":{"type":"js","path":"slider/slider-min.js","requires":["dragdrop"],"optional":["animation"]},"tabview":{"type":"js","path":"tabview/tabview-min.js","requires":["element"],"optional":["connection"],"skinnable":true},"treeview":{"type":"js","path":"treeview/treeview-min.js","requires":["event"],"skinnable":true},"uploader":{"type":"js","path":"uploader/uploader-experimental.js","requires":["element"]},"utilities":{"type":"js","path":"utilities/utilities.js","supersedes":["yahoo","event","dragdrop","animation","dom","connection","element","yahoo-dom-event","get","yuiloader","yuiloader-dom-event"],"rollup":8},"yahoo":{"type":"js","path":"yahoo/yahoo-min.js"},"yahoo-dom-event":{"type":"js","path":"yahoo-dom-event/yahoo-dom-event.js","supersedes":["yahoo","event","dom"],"rollup":3},"yuiloader":{"type":"js","path":"yuiloader/yuiloader-beta-min.js","supersedes":["yahoo","get"]},"yuiloader-dom-event":{"type":"js","path":"yuiloader-dom-event/yuiloader-dom-event.js","supersedes":["yahoo","dom","event","get","yuiloader","yahoo-dom-event"],"rollup":5},"yuitest":{"type":"js","path":"yuitest/yuitest-min.js","requires":["logger"],"skinnable":true}}},ObjectUtil:{appendArray:function(o,a){if(a){for(var i=0;
i<a.length;i=i+1){o[a[i]]=true;}}},keys:function(o,ordered){var a=[],i;for(i in o){if(lang.hasOwnProperty(o,i)){a.push(i);}}return a;}},ArrayUtil:{appendArray:function(a1,a2){Array.prototype.push.apply(a1,a2);},indexOf:function(a,val){for(var i=0;i<a.length;i=i+1){if(a[i]===val){return i;}}return -1;},toObject:function(a){var o={};for(var i=0;i<a.length;i=i+1){o[a[i]]=true;}return o;},uniq:function(a){return YUI.ObjectUtil.keys(YUI.ArrayUtil.toObject(a));}}};YAHOO.util.YUILoader=function(o){this._internalCallback=null;this._useYahooListener=false;this.onSuccess=null;this.onFailure=Y.log;this.onProgress=null;this.scope=this;this.data=null;this.insertBefore=null;this.charset=null;this.varName=null;this.base=YUI.info.base;this.ignore=null;this.force=null;this.allowRollup=true;this.filter=null;this.required={};this.moduleInfo=lang.merge(YUI.info.moduleInfo);this.rollups=null;this.loadOptional=false;this.sorted=[];this.loaded={};this.dirty=true;this.inserted={};var self=this;env.listeners.push(function(m){if(self._useYahooListener){self.loadNext(m.name);}});this.skin=lang.merge(YUI.info.skin);this._config(o);};Y.util.YUILoader.prototype={FILTERS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(o){if(o){for(var i in o){if(lang.hasOwnProperty(o,i)){if(i=="require"){this.require(o[i]);}else{this[i]=o[i];}}}}var f=this.filter;if(lang.isString(f)){f=f.toUpperCase();if(f==="DEBUG"){this.require("logger");}if(!Y.widget.LogWriter){Y.widget.LogWriter=function(){return Y;};}this.filter=this.FILTERS[f];}},addModule:function(o){if(!o||!o.name||!o.type||(!o.path&&!o.fullpath)){return false;}o.ext=("ext" in o)?o.ext:true;o.requires=o.requires||[];this.moduleInfo[o.name]=o;this.dirty=true;return true;},require:function(what){var a=(typeof what==="string")?arguments:what;this.dirty=true;YUI.ObjectUtil.appendArray(this.required,a);},_addSkin:function(skin,mod){var name=this.formatSkin(skin),info=this.moduleInfo,sinf=this.skin,ext=info[mod]&&info[mod].ext;if(!info[name]){this.addModule({"name":name,"type":"css","path":sinf.base+skin+"/"+sinf.path,"after":sinf.after,"rollup":sinf.rollup,"ext":ext});}if(mod){name=this.formatSkin(skin,mod);if(!info[name]){var mdef=info[mod],pkg=mdef.pkg||mod;this.addModule({"name":name,"type":"css","after":sinf.after,"path":pkg+"/"+sinf.base+skin+"/"+mod+".css","ext":ext});}}return name;},getRequires:function(mod){if(!mod){return[];}if(!this.dirty&&mod.expanded){return mod.expanded;}mod.requires=mod.requires||[];var i,d=[],r=mod.requires,o=mod.optional,info=this.moduleInfo,m;for(i=0;i<r.length;i=i+1){d.push(r[i]);m=info[r[i]];YUI.ArrayUtil.appendArray(d,this.getRequires(m));}if(o&&this.loadOptional){for(i=0;i<o.length;i=i+1){d.push(o[i]);YUI.ArrayUtil.appendArray(d,this.getRequires(info[o[i]]));}}mod.expanded=YUI.ArrayUtil.uniq(d);return mod.expanded;},getProvides:function(name,notMe){var addMe=!(notMe),ckey=(addMe)?PROV:SUPER,m=this.moduleInfo[name],o={};if(!m){return o;}if(m[ckey]){return m[ckey];}var s=m.supersedes,done={},me=this;var add=function(mm){if(!done[mm]){done[mm]=true;lang.augmentObject(o,me.getProvides(mm));}};if(s){for(var i=0;i<s.length;i=i+1){add(s[i]);}}m[SUPER]=o;m[PROV]=lang.merge(o);m[PROV][name]=true;return m[ckey];},calculate:function(o){if(this.dirty){this._config(o);this._setup();this._explode();if(this.allowRollup){this._rollup();}this._reduce();this._sort();this.dirty=false;}},_setup:function(){var info=this.moduleInfo,name,i,j;for(name in info){var m=info[name];if(m&&m.skinnable){var o=this.skin.overrides,smod;if(o&&o[name]){for(i=0;i<o[name].length;i=i+1){smod=this._addSkin(o[name][i],name);}}else{smod=this._addSkin(this.skin.defaultSkin,name);}m.requires.push(smod);}}var l=lang.merge(this.inserted);if(!this._sandbox){l=lang.merge(l,env.modules);}if(this.ignore){YUI.ObjectUtil.appendArray(l,this.ignore);}if(this.force){for(i=0;i<this.force.length;i=i+1){if(this.force[i] in l){delete l[this.force[i]];}}}for(j in l){if(lang.hasOwnProperty(l,j)){lang.augmentObject(l,this.getProvides(j));}}this.loaded=l;},_explode:function(){var r=this.required,i,mod;for(i in r){mod=this.moduleInfo[i];if(mod){var req=this.getRequires(mod);if(req){YUI.ObjectUtil.appendArray(r,req);}}}},_skin:function(){},formatSkin:function(skin,mod){var s=this.SKIN_PREFIX+skin;if(mod){s=s+"-"+mod;}return s;},parseSkin:function(mod){if(mod.indexOf(this.SKIN_PREFIX)===0){var a=mod.split("-");return{skin:a[1],module:a[2]};}return null;},_rollup:function(){var i,j,m,s,rollups={},r=this.required,roll;if(this.dirty||!this.rollups){for(i in this.moduleInfo){m=this.moduleInfo[i];if(m&&m.rollup){rollups[i]=m;}}this.rollups=rollups;}for(;;){var rolled=false;for(i in rollups){if(!r[i]&&!this.loaded[i]){m=this.moduleInfo[i];s=m.supersedes;roll=false;if(!m.rollup){continue;}var skin=(m.ext)?false:this.parseSkin(i),c=0;if(skin){for(j in r){if(i!==j&&this.parseSkin(j)){c++;roll=(c>=m.rollup);if(roll){break;}}}}else{for(j=0;j<s.length;j=j+1){if(this.loaded[s[j]]&&(!YUI.dupsAllowed[s[j]])){roll=false;break;}else{if(r[s[j]]){c++;roll=(c>=m.rollup);if(roll){break;}}}}}if(roll){r[i]=true;rolled=true;this.getRequires(m);}}}if(!rolled){break;}}},_reduce:function(){var i,j,s,m,r=this.required;for(i in r){if(i in this.loaded){delete r[i];}else{var skinDef=this.parseSkin(i);if(skinDef){if(!skinDef.module){var skin_pre=this.SKIN_PREFIX+skinDef.skin;for(j in r){m=this.moduleInfo[j];var ext=m&&m.ext;if(!ext&&j!==i&&j.indexOf(skin_pre)>-1){delete r[j];}}}}else{m=this.moduleInfo[i];s=m&&m.supersedes;if(s){for(j=0;j<s.length;j=j+1){if(s[j] in r){delete r[s[j]];}}}}}}},_sort:function(){var s=[],info=this.moduleInfo,loaded=this.loaded,checkOptional=!this.loadOptional,me=this;var requires=function(aa,bb){if(loaded[bb]){return false;}var ii,mm=info[aa],rr=mm&&mm.expanded,after=mm&&mm.after,other=info[bb],optional=mm&&mm.optional;if(rr&&YUI.ArrayUtil.indexOf(rr,bb)>-1){return true;}if(after&&YUI.ArrayUtil.indexOf(after,bb)>-1){return true;
}if(checkOptional&&optional&&YUI.ArrayUtil.indexOf(optional,bb)>-1){return true;}var ss=info[bb]&&info[bb].supersedes;if(ss){for(ii=0;ii<ss.length;ii=ii+1){if(requires(aa,ss[ii])){return true;}}}if(mm.ext&&mm.type=="css"&&(!other.ext)){return true;}return false;};for(var i in this.required){s.push(i);}var p=0;for(;;){var l=s.length,a,b,j,k,moved=false;for(j=p;j<l;j=j+1){a=s[j];for(k=j+1;k<l;k=k+1){if(requires(a,s[k])){b=s.splice(k,1);s.splice(j,0,b[0]);moved=true;break;}}if(moved){break;}else{p=p+1;}}if(!moved){break;}}this.sorted=s;},toString:function(){var o={type:"YUILoader",base:this.base,filter:this.filter,required:this.required,loaded:this.loaded,inserted:this.inserted};lang.dump(o,1);},insert:function(o,type){this.calculate(o);if(!type){var self=this;this._internalCallback=function(){self._internalCallback=null;self.insert(null,"js");};this.insert(null,"css");return ;}this._loading=true;this.loadType=type;this.loadNext();},sandbox:function(o,type){if(o){}else{}this._config(o);if(!this.onSuccess){throw new Error("You must supply an onSuccess handler for your sandbox");}this._sandbox=true;var self=this;if(!type||type!=="js"){this._internalCallback=function(){self._internalCallback=null;self.sandbox(null,"js");};this.insert(null,"css");return ;}if(!util.Connect){var ld=new YAHOO.util.YUILoader();ld.insert({base:this.base,filter:this.filter,require:"connection",insertBefore:this.insertBefore,charset:this.charset,onSuccess:function(){this.sandbox(null,"js");},scope:this},"js");return ;}this._scriptText=[];this._loadCount=0;this._stopCount=this.sorted.length;this._xhr=[];this.calculate();var s=this.sorted,l=s.length,i,m,url;for(i=0;i<l;i=i+1){m=this.moduleInfo[s[i]];if(!m){this.onFailure.call(this.scope,{msg:"undefined module "+m,data:this.data});for(var j=0;j<this._xhr.length;j=j+1){this._xhr[j].abort();}return ;}if(m.type!=="js"){this._loadCount++;continue;}url=m.fullpath||this._url(m.path);var xhrData={success:function(o){var idx=o.argument[0],name=o.argument[2];this._scriptText[idx]=o.responseText;if(this.onProgress){this.onProgress.call(this.scope,{name:name,scriptText:o.responseText,xhrResponse:o,data:this.data});}this._loadCount++;if(this._loadCount>=this._stopCount){var v=this.varName||"YAHOO";var t="(function() {\n";var b="\nreturn "+v+";\n})();";var ref=eval(t+this._scriptText.join("\n")+b);this._pushEvents(ref);if(ref){this.onSuccess.call(this.scope,{reference:ref,data:this.data});}else{this.onFailure.call(this.scope,{msg:this.varName+" reference failure",data:this.data});}}},failure:function(o){this.onFailure.call(this.scope,{msg:"XHR failure",xhrResponse:o,data:this.data});},scope:this,argument:[i,url,s[i]]};this._xhr.push(util.Connect.asyncRequest("GET",url,xhrData));}},loadNext:function(mname){if(!this._loading){return ;}if(mname){if(mname!==this._loading){return ;}this.inserted[mname]=true;if(this.onProgress){this.onProgress.call(this.scope,{name:mname,data:this.data});}}var s=this.sorted,len=s.length,i,m;for(i=0;i<len;i=i+1){if(s[i] in this.inserted){continue;}if(s[i]===this._loading){return ;}m=this.moduleInfo[s[i]];if(!m){this.onFailure.call(this.scope,{msg:"undefined module "+m,data:this.data});return ;}if(!this.loadType||this.loadType===m.type){this._loading=s[i];var fn=(m.type==="css")?util.Get.css:util.Get.script,url=m.fullpath||this._url(m.path),self=this,c=function(o){self.loadNext(o.data);};if(env.ua.webkit&&env.ua.webkit<420&&m.type==="js"&&!m.varName){c=null;this._useYahooListener=true;}fn(url,{data:s[i],onSuccess:c,insertBefore:this.insertBefore,charset:this.charset,varName:m.varName,scope:self});return ;}}this._loading=null;if(this._internalCallback){var f=this._internalCallback;this._internalCallback=null;f.call(this);}else{if(this.onSuccess){this._pushEvents();this.onSuccess.call(this.scope,{data:this.data});}}},_pushEvents:function(ref){var r=ref||YAHOO;if(r.util&&r.util.Event){r.util.Event._load();}},_url:function(path){var u=this.base||"",f=this.filter;u=u+path;if(f){u=u.replace(new RegExp(f.searchExp),f.replaceStr);}return u;}};})();(function(){var B=YAHOO.util,K,I,J={},F={},M=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var N=function(P){if(!E.HYPHEN.test(P)){return P;}if(J[P]){return J[P];}var Q=P;while(E.HYPHEN.exec(Q)){Q=Q.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[P]=Q;return Q;};var O=function(Q){var P=F[Q];if(!P){P=new RegExp("(?:^|\\s+)"+Q+"(?:\\s+|$)");F[Q]=P;}return P;};if(M.defaultView&&M.defaultView.getComputedStyle){K=function(P,S){var R=null;if(S=="float"){S="cssFloat";}var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){R=Q[N(S)];}return P.style[S]||R;};}else{if(M.documentElement.currentStyle&&G){K=function(P,R){switch(N(R)){case"opacity":var T=100;try{T=P.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(S){try{T=P.filters("alpha").opacity;}catch(S){}}return T/100;case"float":R="styleFloat";default:var Q=P.currentStyle?P.currentStyle[R]:null;return(P.style[R]||Q);}};}else{K=function(P,Q){return P.style[Q];};}}if(G){I=function(P,Q,R){switch(Q){case"opacity":if(YAHOO.lang.isString(P.style.filter)){P.style.filter="alpha(opacity="+R*100+")";if(!P.currentStyle||!P.currentStyle.hasLayout){P.style.zoom=1;}}break;case"float":Q="styleFloat";default:P.style[Q]=R;}};}else{I=function(P,Q,R){if(Q=="float"){Q="cssFloat";}P.style[Q]=R;};}var D=function(P,Q){return P&&P.nodeType==1&&(!Q||Q(P));};YAHOO.util.Dom={get:function(R){if(R&&(R.nodeType||R.item)){return R;}if(YAHOO.lang.isString(R)||!R){return M.getElementById(R);}if(R.length!==undefined){var S=[];for(var Q=0,P=R.length;Q<P;++Q){S[S.length]=B.Dom.get(R[Q]);}return S;}return R;},getStyle:function(P,R){R=N(R);var Q=function(S){return K(S,R);};return B.Dom.batch(P,Q,B.Dom,true);},setStyle:function(P,R,S){R=N(R);var Q=function(T){I(T,R,S);};B.Dom.batch(P,Q,B.Dom,true);},getXY:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}return H(R);};return B.Dom.batch(P,Q,B.Dom,true);},getX:function(P){var Q=function(R){return B.Dom.getXY(R)[0];};return B.Dom.batch(P,Q,B.Dom,true);},getY:function(P){var Q=function(R){return B.Dom.getXY(R)[1];};return B.Dom.batch(P,Q,B.Dom,true);},setXY:function(P,S,R){var Q=function(V){var U=this.getStyle(V,"position");if(U=="static"){this.setStyle(V,"position","relative");U="relative";}var X=this.getXY(V);if(X===false){return false;}var W=[parseInt(this.getStyle(V,"left"),10),parseInt(this.getStyle(V,"top"),10)];if(isNaN(W[0])){W[0]=(U=="relative")?0:V.offsetLeft;}if(isNaN(W[1])){W[1]=(U=="relative")?0:V.offsetTop;}if(S[0]!==null){V.style.left=S[0]-X[0]+W[0]+"px";}if(S[1]!==null){V.style.top=S[1]-X[1]+W[1]+"px";}if(!R){var T=this.getXY(V);if((S[0]!==null&&T[0]!=S[0])||(S[1]!==null&&T[1]!=S[1])){this.setXY(V,S,true);}}};B.Dom.batch(P,Q,B.Dom,true);},setX:function(Q,P){B.Dom.setXY(Q,[P,null]);},setY:function(P,Q){B.Dom.setXY(P,[null,Q]);},getRegion:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}var S=B.Region.getRegion(R);return S;};return B.Dom.batch(P,Q,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(T,X,U,V){X=X||"*";U=(U)?B.Dom.get(U):null||M;if(!U){return[];}var Q=[],P=U.getElementsByTagName(X),W=O(T);for(var R=0,S=P.length;R<S;++R){if(W.test(P[R].className)){Q[Q.length]=P[R];if(V){V.call(P[R],P[R]);}}}return Q;},hasClass:function(R,Q){var P=O(Q);var S=function(T){return P.test(T.className);};return B.Dom.batch(R,S,B.Dom,true);},addClass:function(Q,P){var R=function(S){if(this.hasClass(S,P)){return false;}S.className=YAHOO.lang.trim([S.className,P].join(" "));return true;};return B.Dom.batch(Q,R,B.Dom,true);},removeClass:function(R,Q){var P=O(Q);var S=function(T){if(!Q||!this.hasClass(T,Q)){return false;}var U=T.className;T.className=U.replace(P," ");if(this.hasClass(T,Q)){this.removeClass(T,Q);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},replaceClass:function(S,Q,P){if(!P||Q===P){return false;}var R=O(Q);var T=function(U){if(!this.hasClass(U,Q)){this.addClass(U,P);return true;}U.className=U.className.replace(R," "+P+" ");if(this.hasClass(U,Q)){this.replaceClass(U,Q,P);}U.className=YAHOO.lang.trim(U.className);return true;};return B.Dom.batch(S,T,B.Dom,true);},generateId:function(P,R){R=R||"yui-gen";var Q=function(S){if(S&&S.id){return S.id;}var T=R+YAHOO.env._id_counter++;if(S){S.id=T;}return T;};return B.Dom.batch(P,Q,B.Dom,true)||Q.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);Q=B.Dom.get(Q);if(!P||!Q){return false;}if(P.contains&&Q.nodeType&&!L){return P.contains(Q);}else{if(P.compareDocumentPosition&&Q.nodeType){return !!(P.compareDocumentPosition(Q)&16);}else{if(Q.nodeType){return !!this.getAncestorBy(Q,function(R){return R==P;});}}}return false;},inDocument:function(P){return this.isAncestor(M.documentElement,P);},getElementsBy:function(W,Q,R,T){Q=Q||"*";R=(R)?B.Dom.get(R):null||M;if(!R){return[];}var S=[],V=R.getElementsByTagName(Q);for(var U=0,P=V.length;U<P;++U){if(W(V[U])){S[S.length]=V[U];if(T){T(V[U]);}}}return S;},batch:function(T,W,V,R){T=(T&&(T.tagName||T.item))?T:B.Dom.get(T);if(!T||!W){return false;}var S=(R)?V:window;if(T.tagName||T.length===undefined){return W.call(S,T,V);}var U=[];for(var Q=0,P=T.length;Q<P;++Q){U[U.length]=W.call(S,T[Q],V);}return U;},getDocumentHeight:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollHeight:M.documentElement.scrollHeight;var P=Math.max(Q,B.Dom.getViewportHeight());return P;},getDocumentWidth:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollWidth:M.documentElement.scrollWidth;var P=Math.max(Q,B.Dom.getViewportWidth());return P;},getViewportHeight:function(){var P=self.innerHeight;
var Q=M.compatMode;if((Q||G)&&!C){P=(Q=="CSS1Compat")?M.documentElement.clientHeight:M.body.clientHeight;}return P;},getViewportWidth:function(){var P=self.innerWidth;var Q=M.compatMode;if(Q||G){P=(Q=="CSS1Compat")?M.documentElement.clientWidth:M.body.clientWidth;}return P;},getAncestorBy:function(P,Q){while(P=P.parentNode){if(D(P,Q)){return P;}}return null;},getAncestorByClassName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return B.Dom.hasClass(S,P);};return B.Dom.getAncestorBy(Q,R);},getAncestorByTagName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return S.tagName&&S.tagName.toUpperCase()==P.toUpperCase();};return B.Dom.getAncestorBy(Q,R);},getPreviousSiblingBy:function(P,Q){while(P){P=P.previousSibling;if(D(P,Q)){return P;}}return null;},getPreviousSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getPreviousSiblingBy(P);},getNextSiblingBy:function(P,Q){while(P){P=P.nextSibling;if(D(P,Q)){return P;}}return null;},getNextSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getNextSiblingBy(P);},getFirstChildBy:function(P,R){var Q=(D(P.firstChild,R))?P.firstChild:null;return Q||B.Dom.getNextSiblingBy(P.firstChild,R);},getFirstChild:function(P,Q){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getFirstChildBy(P);},getLastChildBy:function(P,R){if(!P){return null;}var Q=(D(P.lastChild,R))?P.lastChild:null;return Q||B.Dom.getPreviousSiblingBy(P.lastChild,R);},getLastChild:function(P){P=B.Dom.get(P);return B.Dom.getLastChildBy(P);},getChildrenBy:function(Q,S){var R=B.Dom.getFirstChildBy(Q,S);var P=R?[R]:[];B.Dom.getNextSiblingBy(R,function(T){if(!S||S(T)){P[P.length]=T;}return false;});return P;},getChildren:function(P){P=B.Dom.get(P);if(!P){}return B.Dom.getChildrenBy(P);},getDocumentScrollLeft:function(P){P=P||M;return Math.max(P.documentElement.scrollLeft,P.body.scrollLeft);},getDocumentScrollTop:function(P){P=P||M;return Math.max(P.documentElement.scrollTop,P.body.scrollTop);},insertBefore:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}return P.parentNode.insertBefore(Q,P);},insertAfter:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}if(P.nextSibling){return P.parentNode.insertBefore(Q,P.nextSibling);}else{return P.parentNode.appendChild(Q);}},getClientRegion:function(){var R=B.Dom.getDocumentScrollTop(),Q=B.Dom.getDocumentScrollLeft(),S=B.Dom.getViewportWidth()+Q,P=B.Dom.getViewportHeight()+R;return new B.Region(R,S,P,Q);}};var H=function(){if(M.documentElement.getBoundingClientRect){return function(Q){var R=Q.getBoundingClientRect();var P=Q.ownerDocument;return[R.left+B.Dom.getDocumentScrollLeft(P),R.top+B.Dom.getDocumentScrollTop(P)];};}else{return function(R){var S=[R.offsetLeft,R.offsetTop];var Q=R.offsetParent;var P=(L&&B.Dom.getStyle(R,"position")=="absolute"&&R.offsetParent==R.ownerDocument.body);if(Q!=R){while(Q){S[0]+=Q.offsetLeft;S[1]+=Q.offsetTop;if(!P&&L&&B.Dom.getStyle(Q,"position")=="absolute"){P=true;}Q=Q.offsetParent;}}if(P){S[0]-=R.ownerDocument.body.offsetLeft;S[1]-=R.ownerDocument.body.offsetTop;}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(Q.scrollTop||Q.scrollLeft){if(!E.OP_SCROLL.test(B.Dom.getStyle(Q,"display"))){if(!C||B.Dom.getStyle(Q,"overflow")!=="visible"){S[0]-=Q.scrollLeft;S[1]-=Q.scrollTop;}}}Q=Q.parentNode;}return S;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.2",build:"1076"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){for(var A=this.subscribers.length-1;A>-1;A--){this._delete(A);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var K=this;var L=function(){K._tryPreloadAttach();};this._interval=setInterval(L,this.POLL_INTERVAL);}},onAvailable:function(P,M,Q,O,N){var K=(YAHOO.lang.isString(P))?[P]:P;for(var L=0;L<K.length;L=L+1){F.push({id:K[L],fn:M,obj:Q,override:O,checkReady:N});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(M,K,N,L){this.onAvailable(M,K,N,L,true);},onDOMReady:function(K,M,L){if(this.DOMReady){setTimeout(function(){var N=window;if(L){if(L===true){N=M;}else{N=L;}}K.call(N,"DOMReady",[],M);},0);}else{this.DOMReadyEvent.subscribe(K,M,L);}},addListener:function(M,K,V,Q,L){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var R=0,T=M.length;R<T;++R){W=this.on(M[R],K,V,Q,L)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var P=this.getEl(M);if(P){M=P;}else{this.onAvailable(M,function(){YAHOO.util.Event.on(M,K,V,Q,L);});return true;}}}if(!M){return false;}if("unload"==K&&Q!==this){J[J.length]=[M,K,V,Q,L];return true;}var Y=M;if(L){if(L===true){Y=Q;}else{Y=L;}}var N=function(Z){return V.call(Y,YAHOO.util.Event.getEvent(Z,M),Q);};var X=[M,K,V,N,Y,Q,L];var S=I.length;I[S]=X;if(this.useLegacyEvent(M,K)){var O=this.getLegacyIndex(M,K);if(O==-1||M!=G[O][0]){O=G.length;B[M.id+K]=O;G[O]=[M,K,M["on"+K]];E[O]=[];M["on"+K]=function(Z){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(Z),O);};}E[O].push(X);}else{try{this._simpleAdd(M,K,N,false);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}}return true;},fireLegacyEvent:function(O,M){var Q=true,K,S,R,T,P;S=E[M].slice();for(var L=0,N=S.length;L<N;++L){R=S[L];if(R&&R[this.WFN]){T=R[this.ADJ_SCOPE];P=R[this.WFN].call(T,O);Q=(Q&&P);}}K=G[M];if(K&&K[2]){K[2](O);}return Q;},getLegacyIndex:function(L,M){var K=this.generateId(L)+M;if(typeof B[K]=="undefined"){return -1;}else{return B[K];}},useLegacyEvent:function(L,M){if(this.webkit&&("click"==M||"dblclick"==M)){var K=parseInt(this.webkit,10);if(!isNaN(K)&&K<418){return true;}}return false;},removeListener:function(L,K,T){var O,R,V;if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var U=true;for(O=L.length-1;O>-1;O--){U=(this.removeListener(L[O],K,T)&&U);}return U;}}if(!T||!T.call){return this.purgeElement(L,false,K);}if("unload"==K){for(O=J.length-1;O>-1;O--){V=J[O];if(V&&V[0]==L&&V[1]==K&&V[2]==T){J.splice(O,1);return true;}}return false;}var P=null;var Q=arguments[3];if("undefined"===typeof Q){Q=this._getCacheIndex(L,K,T);}if(Q>=0){P=I[Q];}if(!L||!P){return false;}if(this.useLegacyEvent(L,K)){var N=this.getLegacyIndex(L,K);var M=E[N];if(M){for(O=0,R=M.length;O<R;++O){V=M[O];if(V&&V[this.EL]==L&&V[this.TYPE]==K&&V[this.FN]==T){M.splice(O,1);break;}}}}else{try{this._simpleRemove(L,K,P[this.WFN],false);}catch(S){this.lastError=S;return false;}}delete I[Q][this.WFN];delete I[Q][this.FN];I.splice(Q,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;
},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;if(!K){if(L.type=="mouseout"){K=L.toElement;}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in D)){K=D[K];}return K;},_getCacheIndex:function(O,P,N){for(var M=0,L=I.length;M<L;M=M+1){var K=I[M];if(K&&K[this.FN]==N&&K[this.EL]==O&&K[this.TYPE]==P){return M;}}return -1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+A;++A;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(L){if(!H){H=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;clearInterval(this._interval);this._interval=null;return ;}if(this.locked){return ;}if(this.isIE){if(!this.DOMReady){this.startInterval();return ;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0&&F.length>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=F.length;L<K;L=L+1){O=F[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(H||N.nextSibling||!Q){M.push(O);F[L]=null;}}else{R(N,O);F[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}C--;if(Q){for(L=F.length-1;L>-1;L--){O=F[L];if(!O||!O.id){F.splice(L,1);}}this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[I,J];}else{if(K==="unload"){L=[J];}else{L=[I];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(Q){var K=YAHOO.util.Event,N,M,L,P,O,R=J.slice();for(N=0,P=J.length;N<P;++N){L=R[N];if(L){var S=window;if(L[K.ADJ_SCOPE]){if(L[K.ADJ_SCOPE]===true){S=L[K.UNLOAD_OBJ];}else{S=L[K.ADJ_SCOPE];}}L[K.FN].call(S,K.getEvent(Q,L[K.EL]),L[K.UNLOAD_OBJ]);R[N]=null;L=null;S=null;}}J=null;if(I){for(M=I.length-1;M>-1;M--){L=I[M];if(L){K.removeListener(L[K.EL],L[K.TYPE],L[K.FN],M);}}L=null;}G=null;K._simpleRemove(window,"unload",K._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;
if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(J,I){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){var G;if(F.keys instanceof Array){for(var H=0;H<F.keys.length;H++){G=F.keys[H];if(G==J.charCode){D.fire(J.charCode,J);break;}else{if(G==J.keyCode){D.fire(J.keyCode,J);break;}}}}else{G=F.keys;if(G==J.charCode){D.fire(J.charCode,J);}else{if(G==J.keyCode){D.fire(J.keyCode,J);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.5.2",build:"1076"});YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,"click",function(B){var A=YAHOO.util.Event.getTarget(B);if(A.nodeName.toLowerCase()=="input"&&(A.type&&A.type.toLowerCase()=="submit")){YAHOO.util.Connect._submitElementValue=encodeURIComponent(A.name)+"="+encodeURIComponent(A.value);}});return true;}return false;})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A);YAHOO.log("ActiveX Program Id  "+A+" added to _msxml_progid.","info","Connection");},setDefaultPostHeader:function(A){if(typeof A=="string"){this._default_post_header=A;YAHOO.log("Default POST header set to  "+A,"info","Connection");}else{if(typeof A=="boolean"){this._use_default_post_header=A;}}},setDefaultXhrHeader:function(A){if(typeof A=="string"){this._default_xhr_header=A;YAHOO.log("Default XHR header set to  "+A,"info","Connection");}else{this._use_default_xhr_header=A;}},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A;YAHOO.log("Default polling interval set to "+A+"ms","info","Connection");}},createXhrObject:function(E){var D,A;try{A=new XMLHttpRequest();D={conn:A,tId:E};YAHOO.log("XHR object created for transaction "+E,"info","Connection");}catch(C){for(var B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);D={conn:A,tId:E};YAHOO.log("ActiveX XHR object created for transaction "+E,"info","Connection");break;}catch(C){}}}finally{return D;}},getConnectionObject:function(A){var C;var D=this._transaction_id;try{if(!A){C=this.createXhrObject(D);}else{C={};C.tId=D;C.isUpload=true;}if(C){this._transaction_id++;}}catch(B){}finally{return C;}},asyncRequest:function(F,C,E,A){var D=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();var B=(E&&E.argument)?E.argument:null;if(!D){YAHOO.log("Unable to create connection object.","error","Connection");return null;}else{if(E&&E.customevents){this.initCustomEvents(D,E);}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(D,E,C,A);return D;}if(F.toUpperCase()=="GET"){if(this._sFormData.length!==0){C+=((C.indexOf("?")==-1)?"?":"&")+this._sFormData;}}else{if(F.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData;}}}if(F.toUpperCase()=="GET"&&(E&&E.cache===false)){C+=((C.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();}D.conn.open(F,C,true);if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);YAHOO.log("Initialize transaction header X-Request-Header to XMLHttpRequest.","info","Connection");}}if((F.toUpperCase()=="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader("Content-Type",this._default_post_header);YAHOO.log("Initialize header Content-Type to application/x-www-form-urlencoded; UTF-8 for POST transaction.","info","Connection");}if(this._has_default_headers||this._has_http_headers){this.setHeader(D);}this.handleReadyState(D,E);D.conn.send(A||"");YAHOO.log("Transaction "+D.tId+" sent.","info","Connection");if(this._isFormSubmit===true){this.resetFormState();}this.startEvent.fire(D,B);if(D.startEvent){D.startEvent.fire(D,B);}return D;}},initCustomEvents:function(A,C){for(var B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);YAHOO.log("Transaction-specific Custom Event "+A[this._customEvents[B][1]]+" created.","info","Connection");A[this._customEvents[B][0]].subscribe(C.customevents[B]);YAHOO.log("Transaction-specific Custom Event "+A[this._customEvents[B][1]]+" subscribed.","info","Connection");}}},handleReadyState:function(C,D){var B=this;var A=(D&&D.argument)?D.argument:null;if(D&&D.timeout){this._timeOut[C.tId]=window.setTimeout(function(){B.abort(C,D,true);},D.timeout);}this._poll[C.tId]=window.setInterval(function(){if(C.conn&&C.conn.readyState===4){window.clearInterval(B._poll[C.tId]);delete B._poll[C.tId];if(D&&D.timeout){window.clearTimeout(B._timeOut[C.tId]);delete B._timeOut[C.tId];}B.completeEvent.fire(C,A);if(C.completeEvent){C.completeEvent.fire(C,A);}B.handleTransactionResponse(C,D);}},this._polling_interval);},handleTransactionResponse:function(F,G,A){var D,C;var B=(G&&G.argument)?G.argument:null;try{if(F.conn.status!==undefined&&F.conn.status!==0){D=F.conn.status;}else{D=13030;}}catch(E){D=13030;}if(D>=200&&D<300||D===1223){C=this.createResponseObject(F,B);if(G&&G.success){if(!G.scope){G.success(C);YAHOO.log("Success callback. HTTP code is "+D,"info","Connection");}else{G.success.apply(G.scope,[C]);YAHOO.log("Success callback with scope. HTTP code is "+D,"info","Connection");}}this.successEvent.fire(C);if(F.successEvent){F.successEvent.fire(C);}}else{switch(D){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:C=this.createExceptionObject(F.tId,B,(A?A:false));if(G&&G.failure){if(!G.scope){G.failure(C);
YAHOO.log("Failure callback. Exception detected. Status code is "+D,"warn","Connection");}else{G.failure.apply(G.scope,[C]);YAHOO.log("Failure callback with scope. Exception detected. Status code is "+D,"warn","Connection");}}break;default:C=this.createResponseObject(F,B);if(G&&G.failure){if(!G.scope){G.failure(C);YAHOO.log("Failure callback. HTTP status code is "+D,"warn","Connection");}else{G.failure.apply(G.scope,[C]);YAHOO.log("Failure callback with scope. HTTP status code is "+D,"warn","Connection");}}}this.failureEvent.fire(C);if(F.failureEvent){F.failureEvent.fire(C);}}this.releaseObject(F);C=null;},createResponseObject:function(A,G){var D={};var I={};try{var C=A.conn.getAllResponseHeaders();var F=C.split("\n");for(var E=0;E<F.length;E++){var B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=F[E].substring(B+2);}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(G){D.argument=G;}return D;},createExceptionObject:function(H,D,A){var F=0;var G="communication failure";var C=-1;var B="transaction aborted";var E={};E.tId=H;if(A){E.status=C;E.statusText=B;}else{E.status=F;E.statusText=G;}if(D){E.argument=D;}return E;},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;B[A]=D;if(C){this._has_default_headers=true;}else{this._has_http_headers=true;}},setHeader:function(A){if(this._has_default_headers){for(var B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B]);YAHOO.log("Default HTTP header "+B+" set with value of "+this._default_headers[B],"info","Connection");}}}if(this._has_http_headers){for(var B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B]);YAHOO.log("HTTP header "+B+" set with value of "+this._http_headers[B],"info","Connection");}}delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(K,E,B){this.resetFormState();var J;if(typeof K=="string"){J=(document.getElementById(K)||document.forms[K]);}else{if(typeof K=="object"){J=K;}else{YAHOO.log("Unable to create form object "+K,"warn","Connection");return ;}}if(E){var F=this.createFrame((window.location.href.toLowerCase().indexOf("https")===0||B)?true:false);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=J;return ;}var A,I,G,L;var H=false;for(var D=0;D<J.elements.length;D++){A=J.elements[D];L=A.disabled;I=A.name;G=A.value;if(!L&&I){switch(A.type){case"select-one":case"select-multiple":for(var C=0;C<A.options.length;C++){if(A.options[C].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].attributes["value"].specified?A.options[C].value:A.options[C].text)+"&";}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].hasAttribute("value")?A.options[C].value:A.options[C].text)+"&";}}}break;case"radio":case"checkbox":if(A.checked){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&";}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(H===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+"&";}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&";}H=true;}break;default:this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&";}}}this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);YAHOO.log("Form initialized for transaction. HTML form POST message is: "+this._sFormData,"info","Connection");this.initHeader("Content-Type",this._default_form_header);YAHOO.log("Initialize header Content-Type to application/x-www-form-urlencoded for setForm() transaction.","info","Connection");return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(A){var B="yuiIO"+this._transaction_id;var C;if(window.ActiveXObject){C=document.createElement('<iframe id="'+B+'" name="'+B+'" />');if(typeof A=="boolean"){C.src="javascript:false";}}else{C=document.createElement("iframe");C.id=B;C.name=B;}C.style.position="absolute";C.style.top="-1000px";C.style.left="-1000px";document.body.appendChild(C);YAHOO.log("File upload iframe created. Id is:"+B,"info","Connection");},appendPostData:function(A){var D=[];var B=A.split("&");for(var C=0;C<B.length;C++){var E=B[C].indexOf("=");if(E!=-1){D[C]=document.createElement("input");D[C].type="hidden";D[C].name=B[C].substring(0,E);D[C].value=B[C].substring(E+1);this._formNode.appendChild(D[C]);}}return D;},uploadFile:function(D,M,E,C){var N=this;var H="yuiIO"+D.tId;var I="multipart/form-data";var K=document.getElementById(H);var J=(M&&M.argument)?M.argument:null;var B={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",E);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",H);if(YAHOO.env.ua.ie){this._formNode.setAttribute("encoding",I);}else{this._formNode.setAttribute("enctype",I);}if(C){var L=this.appendPostData(C);}this._formNode.submit();this.startEvent.fire(D,J);if(D.startEvent){D.startEvent.fire(D,J);}if(M&&M.timeout){this._timeOut[D.tId]=window.setTimeout(function(){N.abort(D,M,true);},M.timeout);}if(L&&L.length>0){for(var G=0;G<L.length;G++){this._formNode.removeChild(L[G]);}}for(var A in B){if(YAHOO.lang.hasOwnProperty(B,A)){if(B[A]){this._formNode.setAttribute(A,B[A]);}else{this._formNode.removeAttribute(A);}}}this.resetFormState();var F=function(){if(M&&M.timeout){window.clearTimeout(N._timeOut[D.tId]);
delete N._timeOut[D.tId];}N.completeEvent.fire(D,J);if(D.completeEvent){D.completeEvent.fire(D,J);}var P={};P.tId=D.tId;P.argument=M.argument;try{P.responseText=K.contentWindow.document.body?K.contentWindow.document.body.innerHTML:K.contentWindow.document.documentElement.textContent;P.responseXML=K.contentWindow.document.XMLDocument?K.contentWindow.document.XMLDocument:K.contentWindow.document;}catch(O){}if(M&&M.upload){if(!M.scope){M.upload(P);YAHOO.log("Upload callback.","info","Connection");}else{M.upload.apply(M.scope,[P]);YAHOO.log("Upload callback with scope.","info","Connection");}}N.uploadEvent.fire(P);if(D.uploadEvent){D.uploadEvent.fire(P);}YAHOO.util.Event.removeListener(K,"load",F);setTimeout(function(){document.body.removeChild(K);N.releaseObject(D);YAHOO.log("File upload iframe destroyed. Id is:"+H,"info","Connection");},100);};YAHOO.util.Event.addListener(K,"load",F);},abort:function(E,G,A){var D;var B=(G&&G.argument)?G.argument:null;if(E&&E.conn){if(this.isCallInProgress(E)){E.conn.abort();window.clearInterval(this._poll[E.tId]);delete this._poll[E.tId];if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{if(E&&E.isUpload===true){var C="yuiIO"+E.tId;var F=document.getElementById(C);if(F){YAHOO.util.Event.removeListener(F,"load");document.body.removeChild(F);YAHOO.log("File upload iframe destroyed. Id is:"+C,"info","Connection");if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{D=false;}}if(D===true){this.abortEvent.fire(E,B);if(E.abortEvent){E.abortEvent.fire(E,B);}this.handleTransactionResponse(E,G,true);YAHOO.log("Transaction "+E.tId+" aborted.","info","Connection");}return D;},isCallInProgress:function(B){if(B&&B.conn){return B.conn.readyState!==4&&B.conn.readyState!==0;}else{if(B&&B.isUpload===true){var A="yuiIO"+B.tId;return document.getElementById(A)?true:false;}else{return false;}}},releaseObject:function(A){if(A&&A.conn){A.conn=null;YAHOO.log("Connection object for transaction "+A.tId+" destroyed.","info","Connection");A=null;}}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.5.2",build:"1076"});(function(){var B=YAHOO.util;var A=function(D,C,E,F){if(!D){}this.init(D,C,E,F);};A.NAME="Anim";A.prototype={toString:function(){var C=this.getEl()||{};var D=C.id||C.tagName;return(this.constructor.NAME+": "+D);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(C,E,D){return this.method(this.currentFrame,E,D-E,this.totalFrames);},setAttribute:function(C,E,D){if(this.patterns.noNegatives.test(C)){E=(E>0)?E:0;}B.Dom.setStyle(this.getEl(),C,E+D);},getAttribute:function(C){var E=this.getEl();var G=B.Dom.getStyle(E,C);if(G!=="auto"&&!this.patterns.offsetUnit.test(G)){return parseFloat(G);}var D=this.patterns.offsetAttribute.exec(C)||[];var H=!!(D[3]);var F=!!(D[2]);if(F||(B.Dom.getStyle(E,"position")=="absolute"&&H)){G=E["offset"+D[0].charAt(0).toUpperCase()+D[0].substr(1)];}else{G=0;}return G;},getDefaultUnit:function(C){if(this.patterns.defaultUnit.test(C)){return"px";}return"";},setRuntimeAttribute:function(D){var I;var E;var F=this.attributes;this.runtimeAttributes[D]={};var H=function(J){return(typeof J!=="undefined");};if(!H(F[D]["to"])&&!H(F[D]["by"])){return false;}I=(H(F[D]["from"]))?F[D]["from"]:this.getAttribute(D);if(H(F[D]["to"])){E=F[D]["to"];}else{if(H(F[D]["by"])){if(I.constructor==Array){E=[];for(var G=0,C=I.length;G<C;++G){E[G]=I[G]+F[D]["by"][G]*1;}}else{E=I+F[D]["by"]*1;}}}this.runtimeAttributes[D].start=I;this.runtimeAttributes[D].end=E;this.runtimeAttributes[D].unit=(H(F[D].unit))?F[D]["unit"]:this.getDefaultUnit(D);return true;},init:function(E,J,I,C){var D=false;var F=null;var H=0;E=B.Dom.get(E);this.attributes=J||{};this.duration=!YAHOO.lang.isUndefined(I)?I:1;this.method=C||B.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=B.AnimMgr.fps;this.setEl=function(M){E=B.Dom.get(M);};this.getEl=function(){return E;};this.isAnimated=function(){return D;};this.getStartTime=function(){return F;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(B.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}B.AnimMgr.registerElement(this);return true;};this.stop=function(M){if(!this.isAnimated()){return false;}if(M){this.currentFrame=this.totalFrames;this._onTween.fire();}B.AnimMgr.stop(this);};var L=function(){this.onStart.fire();this.runtimeAttributes={};for(var M in this.attributes){this.setRuntimeAttribute(M);}D=true;H=0;F=new Date();};var K=function(){var O={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};O.toString=function(){return("duration: "+O.duration+", currentFrame: "+O.currentFrame);};this.onTween.fire(O);var N=this.runtimeAttributes;for(var M in N){this.setAttribute(M,this.doMethod(M,N[M].start,N[M].end),N[M].unit);}H+=1;};var G=function(){var M=(new Date()-F)/1000;var N={duration:M,frames:H,fps:H/M};N.toString=function(){return("duration: "+N.duration+", frames: "+N.frames+", fps: "+N.fps);};D=false;H=0;this.onComplete.fire(N);};this._onStart=new B.CustomEvent("_start",this,true);this.onStart=new B.CustomEvent("start",this);this.onTween=new B.CustomEvent("tween",this);this._onTween=new B.CustomEvent("_tween",this,true);this.onComplete=new B.CustomEvent("complete",this);this._onComplete=new B.CustomEvent("_complete",this,true);this._onStart.subscribe(L);this._onTween.subscribe(K);this._onComplete.subscribe(G);}};B.Anim=A;})();YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start();};this.unRegister=function(G,F){F=F||E(G);if(!G.isAnimated()||F==-1){return false;}G._onComplete.fire();B.splice(F,1);A-=1;if(A<=0){this.stop();}return true;};this.start=function(){if(C===null){C=setInterval(this.run,this.delay);}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){this.unRegister(B[0],0);}B=[];C=null;A=0;}else{this.unRegister(H);}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue;}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G);}G._onTween.fire();}else{YAHOO.util.AnimMgr.stop(G,H);}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G;}}return -1;};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame);}else{K=J-(I+1);}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1);}G.currentFrame+=K;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]];}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];}}return[C[0][0],C[0][1]];};};(function(){var A=function(F,E,G,H){A.superclass.constructor.call(this,F,E,G,H);};A.NAME="ColorAnim";var C=YAHOO.util;YAHOO.extend(A,C.Anim);var D=A.superclass;var B=A.prototype;B.patterns.color=/color$/i;B.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;B.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;B.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;B.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;B.parseColor=function(E){if(E.length==3){return E;}var F=this.patterns.hex.exec(E);if(F&&F.length==4){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)];}F=this.patterns.rgb.exec(E);if(F&&F.length==4){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)];}F=this.patterns.hex3.exec(E);if(F&&F.length==4){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)];}return null;};B.getAttribute=function(E){var G=this.getEl();if(this.patterns.color.test(E)){var H=YAHOO.util.Dom.getStyle(G,E);
if(this.patterns.transparent.test(H)){var F=G.parentNode;H=C.Dom.getStyle(F,E);while(F&&this.patterns.transparent.test(H)){F=F.parentNode;H=C.Dom.getStyle(F,E);if(F.tagName.toUpperCase()=="HTML"){H="#fff";}}}}else{H=D.getAttribute.call(this,E);}return H;};B.doMethod=function(F,J,G){var I;if(this.patterns.color.test(F)){I=[];for(var H=0,E=J.length;H<E;++H){I[H]=D.doMethod.call(this,F,J[H],G[H]);}I="rgb("+Math.floor(I[0])+","+Math.floor(I[1])+","+Math.floor(I[2])+")";}else{I=D.doMethod.call(this,F,J,G);}return I;};B.setRuntimeAttribute=function(F){D.setRuntimeAttribute.call(this,F);if(this.patterns.color.test(F)){var H=this.attributes;var J=this.parseColor(this.runtimeAttributes[F].start);var G=this.parseColor(this.runtimeAttributes[F].end);if(typeof H[F]["to"]==="undefined"&&typeof H[F]["by"]!=="undefined"){G=this.parseColor(H[F].by);for(var I=0,E=J.length;I<E;++I){G[I]=J[I]+G[I];}}this.runtimeAttributes[F].start=J;this.runtimeAttributes[F].end=G;}};C.ColorAnim=A;})();
/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A;},easeIn:function(B,A,D,C){return D*(B/=C)*B+A;},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},elasticIn:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},elasticOut:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;}};(function(){var A=function(H,G,I,J){if(H){A.superclass.constructor.call(this,H,G,I,J);}};A.NAME="Motion";var E=YAHOO.util;YAHOO.extend(A,E.ColorAnim);var F=A.superclass;var C=A.prototype;C.patterns.points=/^points$/i;C.setAttribute=function(G,I,H){if(this.patterns.points.test(G)){H=H||"px";F.setAttribute.call(this,"left",I[0],H);F.setAttribute.call(this,"top",I[1],H);}else{F.setAttribute.call(this,G,I,H);}};C.getAttribute=function(G){if(this.patterns.points.test(G)){var H=[F.getAttribute.call(this,"left"),F.getAttribute.call(this,"top")];}else{H=F.getAttribute.call(this,G);}return H;};C.doMethod=function(G,K,H){var J=null;if(this.patterns.points.test(G)){var I=this.method(this.currentFrame,0,100,this.totalFrames)/100;J=E.Bezier.getPosition(this.runtimeAttributes[G],I);}else{J=F.doMethod.call(this,G,K,H);}return J;};C.setRuntimeAttribute=function(P){if(this.patterns.points.test(P)){var H=this.getEl();var J=this.attributes;var G;var L=J["points"]["control"]||[];var I;var M,O;if(L.length>0&&!(L[0] instanceof Array)){L=[L];}else{var K=[];for(M=0,O=L.length;M<O;++M){K[M]=L[M];}L=K;}if(E.Dom.getStyle(H,"position")=="static"){E.Dom.setStyle(H,"position","relative");}if(D(J["points"]["from"])){E.Dom.setXY(H,J["points"]["from"]);}else{E.Dom.setXY(H,E.Dom.getXY(H));}G=this.getAttribute("points");if(D(J["points"]["to"])){I=B.call(this,J["points"]["to"],G);
var N=E.Dom.getXY(this.getEl());for(M=0,O=L.length;M<O;++M){L[M]=B.call(this,L[M],G);}}else{if(D(J["points"]["by"])){I=[G[0]+J["points"]["by"][0],G[1]+J["points"]["by"][1]];for(M=0,O=L.length;M<O;++M){L[M]=[G[0]+L[M][0],G[1]+L[M][1]];}}}this.runtimeAttributes[P]=[G];if(L.length>0){this.runtimeAttributes[P]=this.runtimeAttributes[P].concat(L);}this.runtimeAttributes[P][this.runtimeAttributes[P].length]=I;}else{F.setRuntimeAttribute.call(this,P);}};var B=function(G,I){var H=E.Dom.getXY(this.getEl());G=[G[0]-H[0]+I[0],G[1]-H[1]+I[1]];return G;};var D=function(G){return(typeof G!=="undefined");};E.Motion=A;})();(function(){var D=function(F,E,G,H){if(F){D.superclass.constructor.call(this,F,E,G,H);}};D.NAME="Scroll";var B=YAHOO.util;YAHOO.extend(D,B.ColorAnim);var C=D.superclass;var A=D.prototype;A.doMethod=function(E,H,F){var G=null;if(E=="scroll"){G=[this.method(this.currentFrame,H[0],F[0]-H[0],this.totalFrames),this.method(this.currentFrame,H[1],F[1]-H[1],this.totalFrames)];}else{G=C.doMethod.call(this,E,H,F);}return G;};A.getAttribute=function(E){var G=null;var F=this.getEl();if(E=="scroll"){G=[F.scrollLeft,F.scrollTop];}else{G=C.getAttribute.call(this,E);}return G;};A.setAttribute=function(E,H,G){var F=this.getEl();if(E=="scroll"){F.scrollLeft=H[0];F.scrollTop=H[1];}else{C.setAttribute.call(this,E,H,G);}};B.Scroll=D;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.5.2",build:"1076"});if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(D,C){for(var E in this.ids){for(var B in this.ids[E]){var F=this.ids[E][B];if(!this.isTypeOfDD(F)){continue;}F[D].apply(F,C);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(B){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(C,B){if(!this.initialized){this.init();}if(!this.ids[B]){this.ids[B]={};}this.ids[B][C.id]=C;},removeDDFromGroup:function(D,B){if(!this.ids[B]){this.ids[B]={};}var C=this.ids[B];if(C&&C[D.id]){delete C[D.id];}},_remove:function(C){for(var B in C.groups){if(B&&this.ids[B][C.id]){delete this.ids[B][C.id];}}delete this.handleIds[C.id];},regHandle:function(C,B){if(!this.handleIds[C]){this.handleIds[C]={};}this.handleIds[C][B]=B;},isDragDrop:function(B){return(this.getDDById(B))?true:false;},getRelated:function(G,C){var F=[];for(var E in G.groups){for(var D in this.ids[E]){var B=this.ids[E][D];if(!this.isTypeOfDD(B)){continue;}if(!C||B.isTarget){F[F.length]=B;}}}return F;},isLegalTarget:function(F,E){var C=this.getRelated(F,true);for(var D=0,B=C.length;D<B;++D){if(C[D].id==E.id){return true;}}return false;},isTypeOfDD:function(B){return(B&&B.__ygDragDrop);},isHandle:function(C,B){return(this.handleIds[C]&&this.handleIds[C][B]);},getDDById:function(C){for(var B in this.ids){if(this.ids[B][C]){return this.ids[B][C];}}return null;},handleMouseDown:function(D,C){this.currentTarget=YAHOO.util.Event.getTarget(D);this.dragCurrent=C;var B=C.getEl();this.startX=YAHOO.util.Event.getPageX(D);this.startY=YAHOO.util.Event.getPageY(D);this.deltaX=this.startX-B.offsetLeft;this.deltaY=this.startY-B.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var E=YAHOO.util.DDM;E.startDrag(E.startX,E.startY);E.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(B,D){clearTimeout(this.clickTimeout);var C=this.dragCurrent;if(C&&C.events.b4StartDrag){C.b4StartDrag(B,D);C.fireEvent("b4StartDragEvent",{x:B,y:D});}if(C&&C.events.startDrag){C.startDrag(B,D);C.fireEvent("startDragEvent",{x:B,y:D});}this.dragThreshMet=true;},handleMouseUp:function(B){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(B);}this.fromTimeout=false;this.fireEvents(B,true);}else{}this.stopDrag(B);this.stopEvent(B);}},stopEvent:function(B){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(B);}if(this.preventDefault){YAHOO.util.Event.preventDefault(B);}},stopDrag:function(D,C){var B=this.dragCurrent;if(B&&!C){if(this.dragThreshMet){if(B.events.b4EndDrag){B.b4EndDrag(D);B.fireEvent("b4EndDragEvent",{e:D});}if(B.events.endDrag){B.endDrag(D);B.fireEvent("endDragEvent",{e:D});}}if(B.events.mouseUp){B.onMouseUp(D);B.fireEvent("mouseUpEvent",{e:D});}}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(E){var B=this.dragCurrent;if(B){if(YAHOO.util.Event.isIE&&!E.button){this.stopEvent(E);return this.handleMouseUp(E);}else{if(E.clientX<0||E.clientY<0){}}if(!this.dragThreshMet){var D=Math.abs(this.startX-YAHOO.util.Event.getPageX(E));var C=Math.abs(this.startY-YAHOO.util.Event.getPageY(E));if(D>this.clickPixelThresh||C>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(B&&B.events.b4Drag){B.b4Drag(E);B.fireEvent("b4DragEvent",{e:E});}if(B&&B.events.drag){B.onDrag(E);B.fireEvent("dragEvent",{e:E});}if(B){this.fireEvents(E,false);}}this.stopEvent(E);}},fireEvents:function(U,K){var Z=this.dragCurrent;if(!Z||Z.isLocked()||Z.dragOnly){return ;}var M=YAHOO.util.Event.getPageX(U),L=YAHOO.util.Event.getPageY(U),O=new YAHOO.util.Point(M,L),J=Z.getTargetCoord(O.x,O.y),E=Z.getDragEl(),D=["out","over","drop","enter"],T=new YAHOO.util.Region(J.y,J.x+E.offsetWidth,J.y+E.offsetHeight,J.x),H=[],C={},P=[],a={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var R in this.dragOvers){var c=this.dragOvers[R];if(!this.isTypeOfDD(c)){continue;}if(!this.isOverTarget(O,c,this.mode,T)){a.outEvts.push(c);}H[R]=true;delete this.dragOvers[R];}for(var Q in Z.groups){if("string"!=typeof Q){continue;}for(R in this.ids[Q]){var F=this.ids[Q][R];if(!this.isTypeOfDD(F)){continue;}if(F.isTarget&&!F.isLocked()&&F!=Z){if(this.isOverTarget(O,F,this.mode,T)){C[Q]=true;if(K){a.dropEvts.push(F);}else{if(!H[F.id]){a.enterEvts.push(F);}else{a.overEvts.push(F);}this.dragOvers[F.id]=F;}}}}}this.interactionInfo={out:a.outEvts,enter:a.enterEvts,over:a.overEvts,drop:a.dropEvts,point:O,draggedRegion:T,sourceRegion:this.locationCache[Z.id],validDrop:K};for(var B in C){P.push(B);}if(K&&!a.dropEvts.length){this.interactionInfo.validDrop=false;if(Z.events.invalidDrop){Z.onInvalidDrop(U);Z.fireEvent("invalidDropEvent",{e:U});}}for(R=0;R<D.length;R++){var X=null;if(a[D[R]+"Evts"]){X=a[D[R]+"Evts"];}if(X&&X.length){var G=D[R].charAt(0).toUpperCase()+D[R].substr(1),W="onDrag"+G,I="b4Drag"+G,N="drag"+G+"Event",V="drag"+G;if(this.mode){if(Z.events[I]){Z[I](U,X,P);Z.fireEvent(I+"Event",{event:U,info:X,group:P});}if(Z.events[V]){Z[W](U,X,P);Z.fireEvent(N,{event:U,info:X,group:P});}}else{for(var Y=0,S=X.length;Y<S;++Y){if(Z.events[I]){Z[I](U,X[Y].id,P[0]);Z.fireEvent(I+"Event",{event:U,info:X[Y].id,group:P[0]});}if(Z.events[V]){Z[W](U,X[Y].id,P[0]);Z.fireEvent(N,{event:U,info:X[Y].id,group:P[0]});
}}}}}},getBestMatch:function(D){var F=null;var C=D.length;if(C==1){F=D[0];}else{for(var E=0;E<C;++E){var B=D[E];if(this.mode==this.INTERSECT&&B.cursorIsOver){F=B;break;}else{if(!F||!F.overlap||(B.overlap&&F.overlap.getArea()<B.overlap.getArea())){F=B;}}}}return F;},refreshCache:function(C){var E=C||this.ids;for(var B in E){if("string"!=typeof B){continue;}for(var D in this.ids[B]){var F=this.ids[B][D];if(this.isTypeOfDD(F)){var G=this.getLocation(F);if(G){this.locationCache[F.id]=G;}else{delete this.locationCache[F.id];}}}}},verifyEl:function(C){try{if(C){var B=C.offsetParent;if(B){return true;}}}catch(D){}return false;},getLocation:function(G){if(!this.isTypeOfDD(G)){return null;}var E=G.getEl(),J,D,C,L,K,M,B,I,F;try{J=YAHOO.util.Dom.getXY(E);}catch(H){}if(!J){return null;}D=J[0];C=D+E.offsetWidth;L=J[1];K=L+E.offsetHeight;M=L-G.padding[0];B=C+G.padding[1];I=K+G.padding[2];F=D-G.padding[3];return new YAHOO.util.Region(M,B,I,F);},isOverTarget:function(J,B,D,E){var F=this.locationCache[B.id];if(!F||!this.useCache){F=this.getLocation(B);this.locationCache[B.id]=F;}if(!F){return false;}B.cursorIsOver=F.contains(J);var I=this.dragCurrent;if(!I||(!D&&!I.constrainX&&!I.constrainY)){return B.cursorIsOver;}B.overlap=null;if(!E){var G=I.getTargetCoord(J.x,J.y);var C=I.getDragEl();E=new YAHOO.util.Region(G.y,G.x+C.offsetWidth,G.y+C.offsetHeight,G.x);}var H=E.intersect(F);if(H){B.overlap=H;return(D)?true:B.cursorIsOver;}else{return false;}},_onUnload:function(C,B){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(C){var B=this.elementCache[C];if(!B||!B.el){B=this.elementCache[C]=new this.ElementWrapper(YAHOO.util.Dom.get(C));}return B;},getElement:function(B){return YAHOO.util.Dom.get(B);},getCss:function(C){var B=YAHOO.util.Dom.get(C);return(B)?B.style:null;},ElementWrapper:function(B){this.el=B||null;this.id=this.el&&B.id;this.css=this.el&&B.style;},getPosX:function(B){return YAHOO.util.Dom.getX(B);},getPosY:function(B){return YAHOO.util.Dom.getY(B);},swapNode:function(D,B){if(D.swapNode){D.swapNode(B);}else{var E=B.parentNode;var C=B.nextSibling;if(C==D){E.insertBefore(D,B);}else{if(B==D.nextSibling){E.insertBefore(B,D);}else{D.parentNode.replaceChild(B,D);E.insertBefore(D,C);}}}},getScroll:function(){var D,B,E=document.documentElement,C=document.body;if(E&&(E.scrollTop||E.scrollLeft)){D=E.scrollTop;B=E.scrollLeft;}else{if(C){D=C.scrollTop;B=C.scrollLeft;}else{}}return{top:D,left:B};},getStyle:function(C,B){return YAHOO.util.Dom.getStyle(C,B);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(B,D){var C=YAHOO.util.Dom.getXY(D);YAHOO.util.Dom.setXY(B,C);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(C,B){return(C-B);},_timeoutCount:0,_addListeners:function(){var B=YAHOO.util.DDM;if(YAHOO.util.Event&&document){B._onLoad();}else{if(B._timeoutCount>2000){}else{setTimeout(B._addListeners,10);if(document&&document.body){B._timeoutCount+=1;}}}},handleWasClicked:function(B,D){if(this.isHandle(D,B.id)){return true;}else{var C=B.parentNode;while(C){if(this.isHandle(D,C.id)){return true;}else{C=C.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);
},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}else{}return ;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(H,G){var D=H.which||H.button;if(this.primaryButtonOnly&&D>1){return ;}if(this.isLocked()){return ;}var C=this.b4MouseDown(H);if(this.events.b4MouseDown){C=this.fireEvent("b4MouseDownEvent",H);}var E=this.onMouseDown(H);if(this.events.mouseDown){E=this.fireEvent("mouseDownEvent",H);}if((C===false)||(E===false)){return ;}this.DDM.refreshCache(this.groups);var F=new YAHOO.util.Point(A.getPageX(H),A.getPageY(H));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(F,this)){}else{if(this.clickValidator(H)){this.setStartPosition();this.DDM.handleMouseDown(H,this);this.DDM.stopEvent(H);}else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y];
}else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return ;}var G=this.getDragEl(),E=YAHOO.util.Dom;if(!G){G=document.createElement("div");G.id=this.dragElId;var D=G.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");G.appendChild(C);if(YAHOO.env.ua.ie){var F=document.createElement("iframe");F.setAttribute("src","javascript:");F.setAttribute("scrolling","no");F.setAttribute("frameborder","0");G.insertBefore(F,G.firstChild);E.setStyle(F,"height","100%");E.setStyle(F,"width","100%");E.setStyle(F,"position","absolute");E.setStyle(F,"top","0");E.setStyle(F,"left","0");E.setStyle(F,"opacity","0");E.setStyle(F,"zIndex","-1");E.setStyle(F.nextSibling,"zIndex","2");}A.insertBefore(G,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.5.2",build:"1076"});YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(F,B){var E;var A=this.owner;var C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false;}}if(this.method){this.method.call(A,F);}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var A in B){if(A&&YAHOO.lang.hasOwnProperty(B,A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};var B=this._configs[C];if(!B){return undefined;}return B.value;},set:function(D,E,B){this._configs=this._configs||{};var C=this._configs[D];if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;var D=[];var B;for(var C in this._configs){B=this._configs[C];if(A.hasOwnProperty(this._configs,C)&&!A.isUndefined(B)){D[D.length]=C;}}return D;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(this._configs[E[D]]&&!A.isUndefined(this._configs[E[D]].value)&&!A.isNull(this._configs[E[D]].value)){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};var B=this._configs[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};if(!this._configs[B]){C.name=B;this._configs[B]=this.createAttribute(C);}else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var D=YAHOO.util.Dom,F=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(G,H){if(arguments.length){this.init(G,H);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(G){G=G.get?G.get("element"):G;this.get("element").appendChild(G);},getElementsByTagName:function(G){return this.get("element").getElementsByTagName(G);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(G,H){G=G.get?G.get("element"):G;H=(H&&H.get)?H.get("element"):H;this.get("element").insertBefore(G,H);},removeChild:function(G){G=G.get?G.get("element"):G;this.get("element").removeChild(G);return true;},replaceChild:function(G,H){G=G.get?G.get("element"):G;H=H.get?H.get("element"):H;return this.get("element").replaceChild(G,H);},initAttributes:function(G){},addListener:function(K,J,L,I){var H=this.get("element");I=I||this;H=this.get("id")||H;var G=this;if(!this._events[K]){if(this.DOM_EVENTS[K]){YAHOO.util.Event.addListener(H,K,function(M){if(M.srcElement&&!M.target){M.target=M.srcElement;}G.fireEvent(K,M);},L,I);}this.createEvent(K,this);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},subscribe:function(){this.addListener.apply(this,arguments);},removeListener:function(H,G){this.unsubscribe.apply(this,arguments);},addClass:function(G){D.addClass(this.get("element"),G);},getElementsByClassName:function(H,G){return D.getElementsByClassName(H,G,this.get("element"));},hasClass:function(G){return D.hasClass(this.get("element"),G);},removeClass:function(G){return D.removeClass(this.get("element"),G);},replaceClass:function(H,G){return D.replaceClass(this.get("element"),H,G);},setStyle:function(I,H){var G=this.get("element");if(!G){return this._queue[this._queue.length]=["setStyle",arguments];}return D.setStyle(G,I,H);},getStyle:function(G){return D.getStyle(this.get("element"),G);},fireQueue:function(){var H=this._queue;for(var I=0,G=H.length;I<G;++I){this[H[I][0]].apply(this,H[I][1]);}},appendTo:function(H,I){H=(H.get)?H.get("element"):D.get(H);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:H});I=(I&&I.get)?I.get("element"):D.get(I);var G=this.get("element");if(!G){return false;}if(!H){return false;}if(G.parent!=H){if(I){H.insertBefore(G,I);}else{H.appendChild(G);}}this.fireEvent("appendTo",{type:"appendTo",target:H});},get:function(G){var I=this._configs||{};var H=I.element;if(H&&!I[G]&&!YAHOO.lang.isUndefined(H.value[G])){return H.value[G];}return F.prototype.get.call(this,G);},setAttributes:function(L,H){var K=this.get("element");
for(var J in L){if(!this._configs[J]&&!YAHOO.lang.isUndefined(K[J])){this.setAttributeConfig(J);}}for(var I=0,G=this._configOrder.length;I<G;++I){if(L[this._configOrder[I]]!==undefined){this.set(this._configOrder[I],L[this._configOrder[I]],H);}}},set:function(H,J,G){var I=this.get("element");if(!I){this._queue[this._queue.length]=["set",arguments];if(this._configs[H]){this._configs[H].value=J;}return ;}if(!this._configs[H]&&!YAHOO.lang.isUndefined(I[H])){C.call(this,H);}return F.prototype.set.apply(this,arguments);},setAttributeConfig:function(G,I,J){var H=this.get("element");if(H&&!this._configs[G]&&!YAHOO.lang.isUndefined(H[G])){C.call(this,G,I);}else{F.prototype.setAttributeConfig.apply(this,arguments);}this._configOrder.push(G);},getAttributeKeys:function(){var H=this.get("element");var I=F.prototype.getAttributeKeys.call(this);for(var G in H){if(!this._configs[G]){I[G]=I[G]||H[G];}}return I;},createEvent:function(H,G){this._events[H]=true;F.prototype.createEvent.apply(this,arguments);},init:function(H,G){A.apply(this,arguments);}};var A=function(H,G){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];G=G||{};G.element=G.element||H||null;this.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"focus":true,"blur":true,"submit":true};var I=false;if(YAHOO.lang.isString(H)){C.call(this,"id",{value:G.element});}if(D.get(H)){I=true;E.call(this,G);B.call(this,G);}YAHOO.util.Event.onAvailable(G.element,function(){if(!I){E.call(this,G);}this.fireEvent("available",{type:"available",target:G.element});},this,true);YAHOO.util.Event.onContentReady(G.element,function(){if(!I){B.call(this,G);}this.fireEvent("contentReady",{type:"contentReady",target:G.element});},this,true);};var E=function(G){this.setAttributeConfig("element",{value:D.get(G.element),readOnly:true});};var B=function(G){this.initAttributes(G);this.setAttributes(G,true);this.fireQueue();};var C=function(G,I){var H=this.get("element");I=I||{};I.name=G;I.method=I.method||function(J){H[G]=J;};I.value=I.value||H[G];this._configs[G]=new YAHOO.util.Attribute(I,this);};YAHOO.augment(YAHOO.util.Element,F);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.5.2",build:"1076"});YAHOO.register("utilities", YAHOO, {version: "2.5.2", build: "1076"});

function cpaint(){this.version='2.0.3';var config=new Array();config['debugging']=-1;config['proxy_url']='';config['transfer_mode']='GET';config['async']=true;config['response_type']='OBJECT';config['persistent_connection']=false;config['use_cpaint_api']=true;var stack_count=0;this.capable=test_ajax_capability();this.set_debug=function(){if(typeof arguments[0]=='boolean'){if(arguments[0]===true){config['debugging']=1;}else{config['debugging']=0;}}else if(typeof arguments[0]=='number'){config['debugging']=Math.round(arguments[0]);}}
this.set_proxy_url=function(){if(typeof arguments[0]=='string'){config['proxy_url']=arguments[0];}}
this.set_transfer_mode=function(){if(arguments[0].toUpperCase()=='GET'||arguments[0].toUpperCase()=='POST'){config['transfer_mode']=arguments[0].toUpperCase();}}
this.set_async=function(){if(typeof arguments[0]=='boolean'){config['async']=arguments[0];}}
this.set_response_type=function(){if(arguments[0].toUpperCase()=='TEXT'||arguments[0].toUpperCase()=='XML'||arguments[0].toUpperCase()=='OBJECT'||arguments[0].toUpperCase()=='E4X'||arguments[0].toUpperCase()=='JSON'){config['response_type']=arguments[0].toUpperCase();}}
this.set_persistent_connection=function(){if(typeof arguments[0]=='boolean'){config['persistent_connection']=arguments[0];}}
this.set_use_cpaint_api=function(){if(typeof arguments[0]=='boolean'){config['use_cpaint_api']=arguments[0];}}
function test_ajax_capability(){var cpc=new cpaint_call(0,config,this.version);return cpc.test_ajax_capability();}
this.call=function(){var use_stack=-1;if(config['persistent_connection']==true&&__cpaint_stack[0]!=null){switch(__cpaint_stack[0].get_http_state()){case-1:use_stack=0;debug('no XMLHttpObject object to re-use for persistence, creating new one later',2);break;case 4:use_stack=0
debug('re-using the persistent connection',2);break;default:debug('the persistent connection is in use - skipping this request',2);}}else if(config['persistent_connection']==true){use_stack=0;__cpaint_stack[use_stack]=new cpaint_call(use_stack,config,this.version);debug('no cpaint_call object available for re-use, created new one',2);}else{use_stack=stack_count;__cpaint_stack[use_stack]=new cpaint_call(use_stack,config,this.version);debug('no cpaint_call object created new one',2);}
if(use_stack!=-1){__cpaint_stack[use_stack].set_client_callback(arguments[2]);if(config['proxy_url']!=''){__cpaint_stack[use_stack].call_proxy(arguments);}else{__cpaint_stack[use_stack].call_direct(arguments);}
stack_count++;debug('stack size: '+__cpaint_stack.length,2);}}
var debug=function(message,debug_level){var prefix='[CPAINT Debug] ';if(debug_level<1){prefix='[CPAINT Error] ';}
if(config['debugging']>=debug_level){alert(prefix+message);}if (message.search("error") > 1){client_callback("", message);}}}
var __cpaint_stack=new Array();var __cpaint_transformer=new cpaint_transformer();function cpaint_call(){var version=arguments[2];var config=new Array();config['debugging']=arguments[1]['debugging'];config['proxy_url']=arguments[1]['proxy_url'];config['transfer_mode']=arguments[1]['transfer_mode'];config['async']=arguments[1]['async'];config['response_type']=arguments[1]['response_type'];config['persistent_connection']=arguments[1]['persistent_connection'];config['use_cpaint_api']=arguments[1]['use_cpaint_api'];var httpobj=false;var client_callback;var stack_id=arguments[0];this.set_client_callback=function(){if(typeof arguments[0]=='function'){client_callback=arguments[0];}}
this.get_http_state=function(){var return_value=-1;if(typeof httpobj=='object'){return_value=httpobj.readyState;}
return return_value;}
this.call_direct=function(call_arguments){var url=call_arguments[0];var remote_method=call_arguments[1];var querystring='';var i=0;if(url=='SELF'){url=document.location.href;}
if(config['use_cpaint_api']==true){for(i=3;i<call_arguments.length;i++){if((typeof call_arguments[i]=='string'&&call_arguments[i]!=''&&call_arguments[i].search(/^\s+$/g)==-1)&&!isNaN(call_arguments[i])&&isFinite(call_arguments[i])){querystring+='&cpaint_argument[]='+encodeURIComponent(JSON.stringify(Number(call_arguments[i])));}else{querystring+='&cpaint_argument[]='+encodeURIComponent(JSON.stringify(call_arguments[i]));}}
querystring+='&cpaint_response_type='+config['response_type'];if(config['transfer_mode']=='GET'){if(url.indexOf('?')!=-1){url=url+'&cpaint_function='+remote_method+querystring;}else{url=url+'?cpaint_function='+remote_method+querystring;}}else{querystring='cpaint_function='+remote_method+querystring;}}else{for(i=3;i<call_arguments.length;i++){if(i==3){querystring+=encodeURIComponent(call_arguments[i]);}else{querystring+='&'+encodeURIComponent(call_arguments[i]);}}
if(config['transfer_mode']=='GET'){url=url+querystring;}}
get_connection_object();debug('opening connection to "'+url+'"',1);httpobj.open(config['transfer_mode'],url,config['async']);if(config['transfer_mode']=='POST'){try{httpobj.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}catch(cp_err){debug('POST cannot be completed due to incompatible browser.  Use GET as your request method.',0);}}
httpobj.setRequestHeader('X-Powered-By','CPAINT v'+version+' :: http://sf.net/projects/cpaint');httpobj.onreadystatechange=callback;if(config['transfer_mode']=='GET'){httpobj.send(null);}else{debug('sending query: '+querystring,1);httpobj.send(querystring);}
if(config['async']==true){callback();}}
this.call_proxy=function(call_arguments){var proxyscript=config['proxy_url'];var url=call_arguments[0];var remote_method=call_arguments[1];var querystring='';var i=0;var querystring_argument_prefix='cpaint_argument[]=';if(config['use_cpaint_api']==false){querystring_argument_prefix='';}
for(i=3;i<call_arguments.length;i++){if(config['use_cpaint_api']==true){if((typeof call_arguments[i]=='string'&&call_arguments[i]!=''&&call_arguments[i].search(/^\s+$/g)==-1)&&!isNaN(call_arguments[i])&&isFinite(call_arguments[i])){querystring+=encodeURIComponent(querystring_argument_prefix+JSON.stringify(Number(call_arguments[i]))+'&');}else{querystring+=encodeURIComponent(querystring_argument_prefix+JSON.stringify(call_arguments[i])+'&');}}else{querystring+=encodeURIComponent(querystring_argument_prefix+call_arguments[i]+'&');}}
if(config['use_cpaint_api']==true){querystring+=encodeURIComponent('&cpaint_function='+remote_method);querystring+=encodeURIComponent('&cpaint_responsetype='+config['response_type']);}
if(config['transfer_mode']=='GET'){proxyscript+='?cpaint_remote_url='+encodeURIComponent(url)
+'&cpaint_remote_query='+querystring
+'&cpaint_remote_method='+config['transfer_mode']
+'&cpaint_response_type='+config['response_type'];}else{querystring='cpaint_remote_url='+encodeURIComponent(url)
+'&cpaint_remote_query='+querystring
+'&cpaint_remote_method='+config['transfer_mode']
+'&cpaint_response_type='+config['response_type'];}
get_connection_object();debug('opening connection to proxy "'+proxyscript+'"',1);httpobj.open(config['transfer_mode'],proxyscript,config['async']);if(config['transfer_mode']=='POST'){try{httpobj.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}catch(cp_err){debug('POST cannot be completed due to incompatible browser.  Use GET as your request method.',0);}}
httpobj.setRequestHeader('X-Powered-By','CPAINT v'+version);httpobj.onreadystatechange=callback;if(config['transfer_mode']=='GET'){httpobj.send(null);}else{debug('sending query: '+querystring,1);httpobj.send(querystring);}
if(config['async']==false){callback();}}
this.test_ajax_capability=function(){return get_connection_object();}
var get_connection_object=function(){var return_value=false;var new_connection=false;if(config['persistent_connection']==false){debug('Using new connection object',1);new_connection=true;}else{debug('Using shared connection object.',1);if(typeof httpobj!='object'){debug('Getting new persistent connection object.',1);new_connection=true;}}
if(new_connection==true){try{httpobj=new XMLHttpRequest();}catch(e1){try{httpobj=new ActiveXObject('Msxml2.XMLHTTP');}catch(e){try{httpobj=new ActiveXObject('Microsoft.XMLHTTP');}catch(oc){httpobj=null;}}}
if(!httpobj){debug('Could not create connection object',0);}else{return_value=true;}}
if(httpobj.readyState!=4){httpobj.abort();}
return return_value;}
var callback=function(){var response=null;if(httpobj.readyState==4&&httpobj.status==200){debug(httpobj.responseText,1);debug('using response type '+config['response_type'],2);switch(config['response_type']){case'XML':debug(httpobj.responseXML,2);response=__cpaint_transformer.xml_conversion(httpobj.responseXML);break;case'OBJECT':response=__cpaint_transformer.object_conversion(httpobj.responseXML);break;case'TEXT':response=__cpaint_transformer.text_conversion(httpobj.responseText);break;case'E4X':response=__cpaint_transformer.e4x_conversion(httpobj.responseText);break;case'JSON':response=__cpaint_transformer.json_conversion(httpobj.responseText);break;default:debug('invalid response type \''+response_type+'\'',0);}
if(response!=null&&typeof client_callback=='function'){client_callback(response,httpobj.responseText);}
remove_from_stack();}else if(httpobj.readyState==4&&httpobj.status!=200){debug('invalid HTTP response code \''+Number(httpobj.status)+'\'',0);client_callback("", "erro");}}
var remove_from_stack=function(){if(typeof stack_id=='number'&&__cpaint_stack[stack_id]&&config['persistent_connection']==false){__cpaint_stack[stack_id]=null;}}
var debug=function(message,debug_level){var prefix='[CPAINT Debug] ';if(config['debugging']<1){prefix='[CPAINT Error] ';if (message.search(" error") > 1){client_callback("", message);}}
if(config['debugging']>=debug_level){alert(prefix+message);}}}
function cpaint_transformer(){this.object_conversion=function(xml_document){var return_value=new cpaint_result_object();var i=0;var firstNodeName='';if(typeof xml_document=='object'&&xml_document!=null){for(i=0;i<xml_document.childNodes.length;i++){if(xml_document.childNodes[i].nodeType==1){firstNodeName=xml_document.childNodes[i].nodeName;break;}}
var ajax_response=xml_document.getElementsByTagName(firstNodeName);return_value[firstNodeName]=new Array();for(i=0;i<ajax_response.length;i++){var tmp_node=create_object_structure(ajax_response[i]);tmp_node.id=ajax_response[i].getAttribute('id')
return_value[firstNodeName].push(tmp_node);}}else{debug('received invalid XML response',0);}
return return_value;}
this.xml_conversion=function(xml_document){return xml_document;}
this.text_conversion=function(text){return decode(text);}
this.e4x_conversion=function(text){text=text.replace(/^\<\?xml[^>]+\>/,'');return new XML(text);}
this.json_conversion=function(text){return JSON.parse(text);}
var create_object_structure=function(stream){var return_value=new cpaint_result_object();var node_name='';var i=0;var attrib=0;if(stream.hasChildNodes()==true){for(i=0;i<stream.childNodes.length;i++){node_name=stream.childNodes[i].nodeName;node_name=node_name.replace(/[^a-zA-Z0-9_]*/g,'');if(typeof return_value[node_name]!='object'){return_value[node_name]=new Array();}
if(stream.childNodes[i].nodeType==1){var tmp_node=create_object_structure(stream.childNodes[i]);for(attrib=0;attrib<stream.childNodes[i].attributes.length;attrib++){tmp_node.set_attribute(stream.childNodes[i].attributes[attrib].nodeName,stream.childNodes[i].attributes[attrib].nodeValue);}
return_value[node_name].push(tmp_node);}else if(stream.childNodes[i].nodeType==3){return_value.data=decode(String(stream.firstChild.data));}}}
return return_value;}
var decode=function(rawtext){var plaintext='';var i=0;var c1=0;var c2=0;var c3=0;var u=0;var t=0;while(i<rawtext.length){if(rawtext.charAt(i)=='\\'&&rawtext.charAt(i+1)=='u'){u=0;for(j=2;j<6;j+=1){t=parseInt(rawtext.charAt(i+j),16);if(!isFinite(t)){break;}
u=u*16+t;}
plaintext+=String.fromCharCode(u);i+=6;}else{plaintext+=rawtext.charAt(i);i++;}}
if(plaintext!=''&&plaintext.search(/^\s+$/g)==-1&&!isNaN(plaintext)&&isFinite(plaintext)){plaintext=Number(plaintext);}
return plaintext;}}
function cpaint_result_object(){this.id=0;this.data='';var __attributes=new Array();this.find_item_by_id=function(){var return_value=null;var type=arguments[0];var id=arguments[1];var i=0;if(this[type]){for(i=0;i<this[type].length;i++){if(this[type][i].get_attribute('id')==id){return_value=this[type][i];break;}}}
return return_value;}
this.get_attribute=function(){var return_value=null;var id=arguments[0];if(typeof __attributes[id]!='undefined'){return_value=__attributes[id];}
return return_value;}
this.set_attribute=function(){__attributes[arguments[0]]=arguments[1];}}
Array.prototype.______array='______array';var JSON={org:'http://www.JSON.org',copyright:'(c)2005 JSON.org',license:'http://www.crockford.com/JSON/license.html',stringify:function(arg){var c,i,l,s='',v;var numeric=true;switch(typeof arg){case'object':if(arg){if(arg.______array=='______array'){for(i in arg){if(i!='______array'&&(isNaN(i)||!isFinite(i))){numeric=false;break;}}
if(numeric==true){for(i=0;i<arg.length;++i){if(typeof arg[i]!='undefined'){v=this.stringify(arg[i]);if(s){s+=',';}
s+=v;}else{s+=',null';}}
return'['+s+']';}else{for(i in arg){if(i!='______array'){v=arg[i];if(typeof v!='undefined'&&typeof v!='function'){v=this.stringify(v);if(s){s+=',';}
s+=this.stringify(i)+':'+v;}}}
return'{'+s+'}';}}else if(typeof arg.toString!='undefined'){for(i in arg){v=arg[i];if(typeof v!='undefined'&&typeof v!='function'){v=this.stringify(v);if(s){s+=',';}
s+=this.stringify(i)+':'+v;}}
return'{'+s+'}';}}
return'null';case'number':return isFinite(arg)?String(arg):'null';case'string':l=arg.length;s='"';for(i=0;i<l;i+=1){c=arg.charAt(i);if(c>=' '){if(c=='\\'||c=='"'){s+='\\';}
s+=c;}else{switch(c){case'\b':s+='\\b';break;case'\f':s+='\\f';break;case'\n':s+='\\n';break;case'\r':s+='\\r';break;case'\t':s+='\\t';break;default:c=c.charCodeAt();s+='\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);}}}
return s+'"';case'boolean':return String(arg);default:return'null';}},parse:function(text){var at=0;var ch=' ';function error(m){throw{name:'JSONError',message:m,at:at-1,text:text};}
function next(){ch=text.charAt(at);at+=1;return ch;}
function white(){while(ch!=''&&ch<=' '){next();}}
function str(){var i,s='',t,u;if(ch=='"'){outer:while(next()){if(ch=='"'){next();return s;}else if(ch=='\\'){switch(next()){case'b':s+='\b';break;case'f':s+='\f';break;case'n':s+='\n';break;case'r':s+='\r';break;case't':s+='\t';break;case'u':u=0;for(i=0;i<4;i+=1){t=parseInt(next(),16);if(!isFinite(t)){break outer;}
u=u*16+t;}
s+=String.fromCharCode(u);break;default:s+=ch;}}else{s+=ch;}}}
error("Bad string");}
function arr(){var a=[];if(ch=='['){next();white();if(ch==']'){next();return a;}
while(ch){a.push(val());white();if(ch==']'){next();return a;}else if(ch!=','){break;}
next();white();}}
error("Bad array");}
function obj(){var k,o={};if(ch=='{'){next();white();if(ch=='}'){next();return o;}
while(ch){k=str();white();if(ch!=':'){break;}
next();o[k]=val();white();if(ch=='}'){next();return o;}else if(ch!=','){break;}
next();white();}}
error("Bad object");}
function assoc(){var k,a=[];if(ch=='<'){next();white();if(ch=='>'){next();return a;}
while(ch){k=str();white();if(ch!=':'){break;}
next();a[k]=val();white();if(ch=='>'){next();return a;}else if(ch!=','){break;}
next();white();}}
error("Bad associative array");}
function num(){var n='',v;if(ch=='-'){n='-';next();}
while(ch>='0'&&ch<='9'){n+=ch;next();}
if(ch=='.'){n+='.';while(next()&&ch>='0'&&ch<='9'){n+=ch;}}
if(ch=='e'||ch=='E'){n+='e';next();if(ch=='-'||ch=='+'){n+=ch;next();}
while(ch>='0'&&ch<='9'){n+=ch;next();}}
v=+n;if(!isFinite(v)){error("Bad number");}else{return v;}}
function word(){switch(ch){case't':if(next()=='r'&&next()=='u'&&next()=='e'){next();return true;}
break;case'f':if(next()=='a'&&next()=='l'&&next()=='s'&&next()=='e'){next();return false;}
break;case'n':if(next()=='u'&&next()=='l'&&next()=='l'){next();return null;}
break;}
error("Syntax error");}
function val(){white();switch(ch){case'{':return obj();case'[':return arr();case'<':return assoc();case'"':return str();case'-':return num();default:return ch>='0'&&ch<='9'?num():word();}}
return val();}};
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.widget.TreeView=function(A){if(A){this.init(A);}};YAHOO.widget.TreeView.prototype={id:null,_el:null,_nodes:null,locked:false,_expandAnim:null,_collapseAnim:null,_animCount:0,maxAnim:2,setExpandAnim:function(A){this._expandAnim=(YAHOO.widget.TVAnim.isValid(A))?A:null;},setCollapseAnim:function(A){this._collapseAnim=(YAHOO.widget.TVAnim.isValid(A))?A:null;},animateExpand:function(C,D){if(this._expandAnim&&this._animCount<this.maxAnim){var A=this;var B=YAHOO.widget.TVAnim.getAnim(this._expandAnim,C,function(){A.expandComplete(D);});if(B){++this._animCount;this.fireEvent("animStart",{"node":D,"type":"expand"});B.animate();}return true;}return false;},animateCollapse:function(C,D){if(this._collapseAnim&&this._animCount<this.maxAnim){var A=this;var B=YAHOO.widget.TVAnim.getAnim(this._collapseAnim,C,function(){A.collapseComplete(D);});if(B){++this._animCount;this.fireEvent("animStart",{"node":D,"type":"collapse"});B.animate();}return true;}return false;},expandComplete:function(A){--this._animCount;this.fireEvent("animComplete",{"node":A,"type":"expand"});},collapseComplete:function(A){--this._animCount;this.fireEvent("animComplete",{"node":A,"type":"collapse"});},init:function(B){this.id=B;if("string"!==typeof B){this._el=B;this.id=this.generateId(B);}this.createEvent("animStart",this);this.createEvent("animComplete",this);this.createEvent("collapse",this);this.createEvent("collapseComplete",this);this.createEvent("expand",this);this.createEvent("expandComplete",this);this._nodes=[];YAHOO.widget.TreeView.trees[this.id]=this;this.root=new YAHOO.widget.RootNode(this);var A=YAHOO.widget.LogWriter;},draw:function(){var A=this.root.getHtml();this.getEl().innerHTML=A;this.firstDraw=false;},getEl:function(){if(!this._el){this._el=document.getElementById(this.id);}return this._el;},regNode:function(A){this._nodes[A.index]=A;},getRoot:function(){return this.root;},setDynamicLoad:function(A,B){this.root.setDynamicLoad(A,B);},expandAll:function(){if(!this.locked){this.root.expandAll();}},collapseAll:function(){if(!this.locked){this.root.collapseAll();}},getNodeByIndex:function(B){var A=this._nodes[B];return(A)?A:null;},getNodeByProperty:function(C,B){for(var A in this._nodes){var D=this._nodes[A];if(D.data&&B==D.data[C]){return D;}}return null;},getNodesByProperty:function(D,C){var A=[];for(var B in this._nodes){var E=this._nodes[B];if(E.data&&C==E.data[D]){A.push(E);}}return(A.length)?A:null;},getNodeByElement:function(C){var D=C,A,B=/ygtv([^\d]*)(.*)/;do{if(D&&D.id){A=D.id.match(B);if(A&&A[2]){return this.getNodeByIndex(A[2]);}}D=D.parentNode;if(!D||!D.tagName){break;}}while(D.id!==this.id&&D.tagName.toLowerCase()!=="body");return null;},removeNode:function(B,A){if(B.isRoot()){return false;}var C=B.parent;if(C.parent){C=C.parent;}this._deleteNode(B);if(A&&C&&C.childrenRendered){C.refresh();}return true;},_removeChildren_animComplete:function(A){this.unsubscribe(this._removeChildren_animComplete);this.removeChildren(A.node);},removeChildren:function(A){if(A.expanded){if(this._collapseAnim){this.subscribe("animComplete",this._removeChildren_animComplete,this,true);YAHOO.widget.Node.prototype.collapse.call(A);return ;}A.collapse();}while(A.children.length){this._deleteNode(A.children[0]);}if(A.isRoot()){YAHOO.widget.Node.prototype.expand.call(A);}A.childrenRendered=false;A.dynamicLoadComplete=false;A.updateIcon();},_deleteNode:function(A){this.removeChildren(A);this.popNode(A);},popNode:function(D){var E=D.parent;var B=[];for(var C=0,A=E.children.length;C<A;++C){if(E.children[C]!=D){B[B.length]=E.children[C];}}E.children=B;E.childrenRendered=false;if(D.previousSibling){D.previousSibling.nextSibling=D.nextSibling;}if(D.nextSibling){D.nextSibling.previousSibling=D.previousSibling;}D.parent=null;D.previousSibling=null;D.nextSibling=null;D.tree=null;delete this._nodes[D.index];},toString:function(){return"TreeView "+this.id;},generateId:function(A){var B=A.id;if(!B){B="yui-tv-auto-id-"+YAHOO.widget.TreeView.counter;++YAHOO.widget.TreeView.counter;}return B;},onExpand:function(A){},onCollapse:function(A){}};YAHOO.augment(YAHOO.widget.TreeView,YAHOO.util.EventProvider);YAHOO.widget.TreeView.nodeCount=0;YAHOO.widget.TreeView.trees=[];YAHOO.widget.TreeView.counter=0;YAHOO.widget.TreeView.getTree=function(B){var A=YAHOO.widget.TreeView.trees[B];return(A)?A:null;};YAHOO.widget.TreeView.getNode=function(B,C){var A=YAHOO.widget.TreeView.getTree(B);return(A)?A.getNodeByIndex(C):null;};YAHOO.widget.TreeView.addHandler=function(B,C,A){if(B.addEventListener){B.addEventListener(C,A,false);}else{if(B.attachEvent){B.attachEvent("on"+C,A);}}};YAHOO.widget.TreeView.removeHandler=function(B,C,A){if(B.removeEventListener){B.removeEventListener(C,A,false);}else{if(B.detachEvent){B.detachEvent("on"+C,A);}}};YAHOO.widget.TreeView.preload=function(F,E){E=E||"ygtv";var C=["tn","tm","tmh","tp","tph","ln","lm","lmh","lp","lph","loading"];var G=[];for(var A=1;A<C.length;A=A+1){G[G.length]='<span class="'+E+C[A]+'">&#160;</span>';}var D=document.createElement("div");var B=D.style;B.className=E+C[0];B.position="absolute";B.height="1px";B.width="1px";B.top="-1000px";B.left="-1000px";D.innerHTML=G.join("");document.body.appendChild(D);YAHOO.widget.TreeView.removeHandler(window,"load",YAHOO.widget.TreeView.preload);};YAHOO.widget.TreeView.addHandler(window,"load",YAHOO.widget.TreeView.preload);YAHOO.widget.Node=function(C,B,A){if(C){this.init(C,B,A);}};YAHOO.widget.Node.prototype={index:0,children:null,tree:null,data:null,parent:null,depth:-1,href:null,target:"_self",expanded:false,multiExpand:true,renderHidden:false,childrenRendered:false,dynamicLoadComplete:false,previousSibling:null,nextSibling:null,_dynLoad:false,dataLoader:null,isLoading:false,hasIcon:true,iconMode:0,nowrap:false,isLeaf:false,_type:"Node",init:function(C,B,A){this.data=C;this.children=[];this.index=YAHOO.widget.TreeView.nodeCount;++YAHOO.widget.TreeView.nodeCount;this.expanded=A;this.createEvent("parentChange",this);if(B){B.appendChild(this);}},applyParent:function(B){if(!B){return false;
}this.tree=B.tree;this.parent=B;this.depth=B.depth+1;if(!this.href){this.href="javascript:"+this.getToggleLink();}this.tree.regNode(this);B.childrenRendered=false;for(var C=0,A=this.children.length;C<A;++C){this.children[C].applyParent(this);}this.fireEvent("parentChange");return true;},appendChild:function(B){if(this.hasChildren()){var A=this.children[this.children.length-1];A.nextSibling=B;B.previousSibling=A;}this.children[this.children.length]=B;B.applyParent(this);if(this.childrenRendered&&this.expanded){this.getChildrenEl().style.display="";}return B;},appendTo:function(A){return A.appendChild(this);},insertBefore:function(A){var C=A.parent;if(C){if(this.tree){this.tree.popNode(this);}var B=A.isChildOf(C);C.children.splice(B,0,this);if(A.previousSibling){A.previousSibling.nextSibling=this;}this.previousSibling=A.previousSibling;this.nextSibling=A;A.previousSibling=this;this.applyParent(C);}return this;},insertAfter:function(A){var C=A.parent;if(C){if(this.tree){this.tree.popNode(this);}var B=A.isChildOf(C);if(!A.nextSibling){this.nextSibling=null;return this.appendTo(C);}C.children.splice(B+1,0,this);A.nextSibling.previousSibling=this;this.previousSibling=A;this.nextSibling=A.nextSibling;A.nextSibling=this;this.applyParent(C);}return this;},isChildOf:function(B){if(B&&B.children){for(var C=0,A=B.children.length;C<A;++C){if(B.children[C]===this){return C;}}}return -1;},getSiblings:function(){return this.parent.children;},showChildren:function(){if(!this.tree.animateExpand(this.getChildrenEl(),this)){if(this.hasChildren()){this.getChildrenEl().style.display="";}}},hideChildren:function(){if(!this.tree.animateCollapse(this.getChildrenEl(),this)){this.getChildrenEl().style.display="none";}},getElId:function(){return"ygtv"+this.index;},getChildrenElId:function(){return"ygtvc"+this.index;},getToggleElId:function(){return"ygtvt"+this.index;},getEl:function(){return document.getElementById(this.getElId());},getChildrenEl:function(){return document.getElementById(this.getChildrenElId());},getToggleEl:function(){return document.getElementById(this.getToggleElId());},getToggleLink:function(){return"YAHOO.widget.TreeView.getNode('"+this.tree.id+"',"+this.index+").toggle()";},collapse:function(){if(!this.expanded){return ;}var A=this.tree.onCollapse(this);if(false===A){return ;}A=this.tree.fireEvent("collapse",this);if(false===A){return ;}if(!this.getEl()){this.expanded=false;}else{this.hideChildren();this.expanded=false;this.updateIcon();}A=this.tree.fireEvent("collapseComplete",this);},expand:function(C){if(this.expanded&&!C){return ;}var A=true;if(!C){A=this.tree.onExpand(this);if(false===A){return ;}A=this.tree.fireEvent("expand",this);}if(false===A){return ;}if(!this.getEl()){this.expanded=true;return ;}if(!this.childrenRendered){this.getChildrenEl().innerHTML=this.renderChildren();}else{}this.expanded=true;this.updateIcon();if(this.isLoading){this.expanded=false;return ;}if(!this.multiExpand){var D=this.getSiblings();for(var B=0;B<D.length;++B){if(D[B]!=this&&D[B].expanded){D[B].collapse();}}}this.showChildren();A=this.tree.fireEvent("expandComplete",this);},updateIcon:function(){if(this.hasIcon){var A=this.getToggleEl();if(A){A.className=this.getStyle();}}},getStyle:function(){if(this.isLoading){return"ygtvloading";}else{var B=(this.nextSibling)?"t":"l";var A="n";if(this.hasChildren(true)||(this.isDynamic()&&!this.getIconMode())){A=(this.expanded)?"m":"p";}return"ygtv"+B+A;}},getHoverStyle:function(){var A=this.getStyle();if(this.hasChildren(true)&&!this.isLoading){A+="h";}return A;},expandAll:function(){for(var A=0;A<this.children.length;++A){var B=this.children[A];if(B.isDynamic()){alert("Not supported (lazy load + expand all)");break;}else{if(!B.multiExpand){alert("Not supported (no multi-expand + expand all)");break;}else{B.expand();B.expandAll();}}}},collapseAll:function(){for(var A=0;A<this.children.length;++A){this.children[A].collapse();this.children[A].collapseAll();}},setDynamicLoad:function(A,B){if(A){this.dataLoader=A;this._dynLoad=true;}else{this.dataLoader=null;this._dynLoad=false;}if(B){this.iconMode=B;}},isRoot:function(){return(this==this.tree.root);},isDynamic:function(){if(this.isLeaf){return false;}else{return(!this.isRoot()&&(this._dynLoad||this.tree.root._dynLoad));}},getIconMode:function(){return(this.iconMode||this.tree.root.iconMode);},hasChildren:function(A){if(this.isLeaf){return false;}else{return(this.children.length>0||(A&&this.isDynamic()&&!this.dynamicLoadComplete));}},toggle:function(){if(!this.tree.locked&&(this.hasChildren(true)||this.isDynamic())){if(this.expanded){this.collapse();}else{this.expand();}}},getHtml:function(){this.childrenRendered=false;var A=[];A[A.length]='<div class="ygtvitem" id="'+this.getElId()+'">';A[A.length]=this.getNodeHtml();A[A.length]=this.getChildrenHtml();A[A.length]="</div>";return A.join("");},getChildrenHtml:function(){var A=[];A[A.length]='<div class="ygtvchildren"';A[A.length]=' id="'+this.getChildrenElId()+'"';if(!this.expanded||!this.hasChildren()){A[A.length]=' style="display:none;"';}A[A.length]=">";if((this.hasChildren(true)&&this.expanded)||(this.renderHidden&&!this.isDynamic())){A[A.length]=this.renderChildren();}A[A.length]="</div>";return A.join("");},renderChildren:function(){var A=this;if(this.isDynamic()&&!this.dynamicLoadComplete){this.isLoading=true;this.tree.locked=true;if(this.dataLoader){setTimeout(function(){A.dataLoader(A,function(){A.loadComplete();});},10);}else{if(this.tree.root.dataLoader){setTimeout(function(){A.tree.root.dataLoader(A,function(){A.loadComplete();});},10);}else{return"Error: data loader not found or not specified.";}}return"";}else{return this.completeRender();}},completeRender:function(){var B=[];for(var A=0;A<this.children.length;++A){B[B.length]=this.children[A].getHtml();}this.childrenRendered=true;return B.join("");},loadComplete:function(){this.getChildrenEl().innerHTML=this.completeRender();this.dynamicLoadComplete=true;this.isLoading=false;this.expand(true);this.tree.locked=false;
},getAncestor:function(B){if(B>=this.depth||B<0){return null;}var A=this.parent;while(A.depth>B){A=A.parent;}return A;},getDepthStyle:function(A){return(this.getAncestor(A).nextSibling)?"ygtvdepthcell":"ygtvblankdepthcell";},getNodeHtml:function(){return"";},refresh:function(){this.getChildrenEl().innerHTML=this.completeRender();if(this.hasIcon){var A=this.getToggleEl();if(A){A.className=this.getStyle();}}},toString:function(){return"Node ("+this.index+")";}};YAHOO.augment(YAHOO.widget.Node,YAHOO.util.EventProvider);YAHOO.widget.TextNode=function(C,B,A){if(C){this.init(C,B,A);this.setUpLabel(C);}};YAHOO.extend(YAHOO.widget.TextNode,YAHOO.widget.Node,{labelStyle:"ygtvlabel",labelElId:null,label:null,textNodeParentChange:function(){if(this.tree&&!this.tree.hasEvent("labelClick")){this.tree.createEvent("labelClick",this.tree);}},setUpLabel:function(A){this.textNodeParentChange();this.subscribe("parentChange",this.textNodeParentChange);if(typeof A=="string"){A={label:A};}this.label=A.label;this.data.label=A.label;if(A.href){this.href=encodeURI(A.href);}if(A.target){this.target=A.target;}if(A.style){this.labelStyle=A.style;}if(A.title){this.title=A.title;}this.labelElId="ygtvlabelel"+this.index;},getLabelEl:function(){return document.getElementById(this.labelElId);},getNodeHtml:function(){var C=[];C[C.length]='<table border="0" cellpadding="0" cellspacing="0">';C[C.length]="<tr>";for(var A=0;A<this.depth;++A){C[C.length]='<td class="'+this.getDepthStyle(A)+'"><div class="ygtvspacer"></div></td>';}var B="YAHOO.widget.TreeView.getNode('"+this.tree.id+"',"+this.index+")";C[C.length]="<td";C[C.length]=' id="'+this.getToggleElId()+'"';C[C.length]=' class="'+this.getStyle()+'"';if(this.hasChildren(true)){C[C.length]=' onmouseover="this.className=';C[C.length]=B+'.getHoverStyle()"';C[C.length]=' onmouseout="this.className=';C[C.length]=B+'.getStyle()"';}C[C.length]=' onclick="javascript:'+this.getToggleLink()+'">';C[C.length]='<div class="ygtvspacer">';C[C.length]="</div>";C[C.length]="</td>";C[C.length]="<td ";C[C.length]=(this.nowrap)?' nowrap="nowrap" ':"";C[C.length]=" >";C[C.length]="<a";C[C.length]=' id="'+this.labelElId+'"';if(this.title){C[C.length]=' title="'+this.title+'"';}C[C.length]=' class="'+this.labelStyle+'"';C[C.length]=' href="'+this.href+'"';C[C.length]=' target="'+this.target+'"';C[C.length]=' onclick="return '+B+".onLabelClick("+B+')"';if(this.hasChildren(true)){C[C.length]=" onmouseover=\"document.getElementById('";C[C.length]=this.getToggleElId()+"').className=";C[C.length]=B+'.getHoverStyle()"';C[C.length]=" onmouseout=\"document.getElementById('";C[C.length]=this.getToggleElId()+"').className=";C[C.length]=B+'.getStyle()"';}C[C.length]=" >";C[C.length]=this.label;C[C.length]="</a>";C[C.length]="</td>";C[C.length]="</tr>";C[C.length]="</table>";return C.join("");},onLabelClick:function(A){return A.tree.fireEvent("labelClick",A);},toString:function(){return"TextNode ("+this.index+") "+this.label;}});YAHOO.widget.RootNode=function(A){this.init(null,null,true);this.tree=A;};YAHOO.extend(YAHOO.widget.RootNode,YAHOO.widget.Node,{getNodeHtml:function(){return"";},toString:function(){return"RootNode";},loadComplete:function(){this.tree.draw();},collapse:function(){},expand:function(){}});YAHOO.widget.HTMLNode=function(D,C,B,A){if(D){this.init(D,C,B);this.initContent(D,A);}};YAHOO.extend(YAHOO.widget.HTMLNode,YAHOO.widget.Node,{contentStyle:"ygtvhtml",contentElId:null,html:null,initContent:function(B,A){this.setHtml(B);this.contentElId="ygtvcontentel"+this.index;this.hasIcon=A;},setHtml:function(B){this.data=B;this.html=(typeof B==="string")?B:B.html;var A=this.getContentEl();if(A){A.innerHTML=this.html;}},getContentEl:function(){return document.getElementById(this.contentElId);},getNodeHtml:function(){var B=[];B[B.length]='<table border="0" cellpadding="0" cellspacing="0">';B[B.length]="<tr>";for(var A=0;A<this.depth;++A){B[B.length]='<td class="'+this.getDepthStyle(A)+'"><div class="ygtvspacer"></div></td>';}if(this.hasIcon){B[B.length]="<td";B[B.length]=' id="'+this.getToggleElId()+'"';B[B.length]=' class="'+this.getStyle()+'"';B[B.length]=' onclick="javascript:'+this.getToggleLink()+'"';if(this.hasChildren(true)){B[B.length]=' onmouseover="this.className=';B[B.length]="YAHOO.widget.TreeView.getNode('";B[B.length]=this.tree.id+"',"+this.index+').getHoverStyle()"';B[B.length]=' onmouseout="this.className=';B[B.length]="YAHOO.widget.TreeView.getNode('";B[B.length]=this.tree.id+"',"+this.index+').getStyle()"';}B[B.length]='><div class="ygtvspacer"></div></td>';}B[B.length]="<td";B[B.length]=' id="'+this.contentElId+'"';B[B.length]=' class="'+this.contentStyle+'"';B[B.length]=(this.nowrap)?' nowrap="nowrap" ':"";B[B.length]=" >";B[B.length]=this.html;B[B.length]="</td>";B[B.length]="</tr>";B[B.length]="</table>";return B.join("");},toString:function(){return"HTMLNode ("+this.index+")";}});YAHOO.widget.MenuNode=function(C,B,A){if(C){this.init(C,B,A);this.setUpLabel(C);}this.multiExpand=false;};YAHOO.extend(YAHOO.widget.MenuNode,YAHOO.widget.TextNode,{toString:function(){return"MenuNode ("+this.index+") "+this.label;}});YAHOO.widget.TVAnim=function(){return{FADE_IN:"TVFadeIn",FADE_OUT:"TVFadeOut",getAnim:function(B,A,C){if(YAHOO.widget[B]){return new YAHOO.widget[B](A,C);}else{return null;}},isValid:function(A){return(YAHOO.widget[A]);}};}();YAHOO.widget.TVFadeIn=function(A,B){this.el=A;this.callback=B;};YAHOO.widget.TVFadeIn.prototype={animate:function(){var D=this;var C=this.el.style;C.opacity=0.1;C.filter="alpha(opacity=10)";C.display="";var B=0.4;var A=new YAHOO.util.Anim(this.el,{opacity:{from:0.1,to:1,unit:""}},B);A.onComplete.subscribe(function(){D.onComplete();});A.animate();},onComplete:function(){this.callback();},toString:function(){return"TVFadeIn";}};YAHOO.widget.TVFadeOut=function(A,B){this.el=A;this.callback=B;};YAHOO.widget.TVFadeOut.prototype={animate:function(){var C=this;var B=0.4;var A=new YAHOO.util.Anim(this.el,{opacity:{from:1,to:0.1,unit:""}},B);A.onComplete.subscribe(function(){C.onComplete();
});A.animate();},onComplete:function(){var A=this.el.style;A.display="none";A.filter="alpha(opacity=100)";this.callback();},toString:function(){return"TVFadeOut";}};YAHOO.register("treeview",YAHOO.widget.TreeView,{version:"2.5.2",build:"1076"});
/* 
This file contains the default configuration options.  
Default options can be edited in this file or changed after the Balloon object is 
initiliazed as follows:

  var balloon = new Balloon;
  balloon.fontColor   = 'black';
  balloon.fontFamily  = 'Arial, sans-serif';
  balloon.fontSize    = '12pt';

*/

// Adds all the instance variables to the balloon object.
// Edit the values as required for your implementation.
BalloonConfig = function(balloon) {

  // ID of element to which balloon should be added
  // default = none (document.body is used)
  // This option may be required for mediawiki or other
  // implementations with complex stylesheets
  balloon.parentID = null;

  // properties of fonts contained in basic balloons (default black)
  balloon.fontColor   = 'black';
  balloon.fontFamily  = 'Arial, sans-serif';
  balloon.fontSize    = '12pt';

  // minimum allowed balloon width (px)
  balloon.minWidth = 150;

  // maximum allowed balloon width (px)
  balloon.maxWidth = 600;

  // Delay before balloon is displayed (msec)
  balloon.delayTime = 500;

  // If fade-in/out is allowed
  balloon.allowFade = false;

  // time interval for fade-in (msec)
  balloon.fadeIn    = 300;

  // time interval for fade-out (msec)
  balloon.fadeOut   = 300;  

  // Vertical Distance from cursor location (px)
  balloon.vOffset  = 0;

  // text-padding within the balloon (px)
  balloon.padding  = 10;

  // How long to display mousover balloons (msec)
  // false = 'always on'
  balloon.displayTime = 10000;

  // width of shadow (space aroung whole balloon; px)
  // Balloon can be zero if there is no shadow and the
  // edges of the balloon are also the edges of the image
  balloon.shadow   = 20;

  // images of balloon body.  If the browser is IE < 7, png alpha
  // channels will not work.  An optional alternative image can be 
  // provided.  It should have the same dimensions as the default png image
  balloon.images        = i3GEO.configura.locaplic+'/pacotes/balloon-tooltips/htdocs/images/';
  balloon.balloonImage  = 'balloon.png';    // with alpha channels
  balloon.ieImage       = 'balloon_ie.png'; // indexed color, transparent background

  // whether the balloon should have a stem
  balloon.stem          = true;

  // The height (px) of the stem and the extent to which the 
  // stem image should overlaps the balloon image.
  balloon.stemHeight  = 32;  
  balloon.stemOverlap = 3;
  
  // A stem for each of the four orientations
  balloon.upLeftStem    = 'up_left.png';
  balloon.downLeftStem  = 'down_left.png';
  balloon.upRightStem   = 'up_right.png';
  balloon.downRightStem = 'down_right.png';

  // A close button for sticky balloons
  // specify the width of your button image
  // if you do not use the default image provided
  balloon.closeButton   = 'close.png';
  balloon.closeButtonWidth = 16;


  
  /* 
    This section allows support for AJAX, iframes and JavaScript in balloons
    If you have concerns about XSS vulnerabilities, set some or all of these
    values to false;
  */

  /// URL for default AJAX request handler
  balloon.helpUrl            = false;

  // Should AJAX be allowed at all?
  balloon.allowAJAX          = true;

  // Allow iframe elements in balloons?
  balloon.allowIframes       = true;

  // Allow javascript event handlers in balloons?
  balloon.allowEventHandlers = false;

  // Allow <script> elements in balloons?
  balloon.allowScripts       = false;

  // Escape all HTML characters -- this will be very
  // unnattractive unless your AJAX request returns plain
  // text.  short of disallowing AJAX entirely, This is the safe 
  // way to go if you must have AJAX in an environment where 
  // outside users can send text to the browser/balloon
  balloon.escapeHTML         = false;
}

// simple Box alternative
BoxConfig = function(box) {
  box.isBox = true;

  // ID of element to which box should be added
  // default = none (document.body is used)
  // This option may be required for mediawiki or other
  // implementations with complex stylesheets
  box.parentID = null;

  // properties of fonts contained in basic boxes (default black)
  box.fontColor   = 'black';
  box.fontFamily  = 'Arial, sans-serif';
  box.fontSize    = '12pt';

  // border and bgcolor for plain box
  box.bgColor     = 'whitesmoke';
  box.borderStyle = '1px solid black'; 

  // minimum allowed box width (px)
  box.minWidth = 150;

  // maximum allowed box width (px)
  box.maxWidth = 600;

  // Delay before box is displayed (msec)
  box.delayTime = 500;

  // If fade-in/out is allowed
  box.allowFade = false;

  // time interval for fade-in (msec)
  box.fadeIn    = 300;

  // time interval for fade-out (msec)
  box.fadeOut   = 300;  

  // Vertical Distance from cursor location (px)
  box.vOffset  = 5;

  // text-padding within the box (px)
  box.padding  = 10;

  // How long to display mousover boxes (msec)
  // false = 'always on'
  box.displayTime = 10000;

  // no shadows for plain box
  box.shadow   = 0;

  // no stem for boxes
  box.stem        = false;

  // A close button for sticky boxes
  // specify the width of your button image
  // if you do not use the default image provided
  box.images        =  '/images/balloons';
  box.closeButton   = 'close.png';
  box.closeButtonWidth = 16;

  /* 
    This section allows support for AJAX, iframes and JavaScript in boxes
    If you have concerns about XSS vulnerabilities, set some or all of these
    values to false;
  */

  /// URL for default AJAX request handler
  box.helpUrl            = false;

  // Should AJAX be allowed at all?
  box.allowAJAX          = true;

  // Allow iframe elements in boxes?
  box.allowIframes       = true;

  // Allow javascript event handlers in boxes?
  box.allowEventHandlers = false;

  // Allow <script> elements in boxes?
  box.allowScripts       = false;

  // Escape all HTML characters -- this will be very
  // unnattractive unless your AJAX request returns plain
  // text.  short of disallowing AJAX entirely, This is the safe 
  // way to go if you must have AJAX in an environment where 
  // outside users can send text to the browser/box
  box.escapeHTML         = false;
}


/*
 balloon.js -- a DHTML library for balloon tooltips

 $Id: balloon.js,v 1.41 2008/09/23 16:33:17 sheldon_mckay Exp $

 See http://www.gmod.org/wiki/index.php/Popup_Balloons
 for documentation.

 Copyright (c) 2007,2008 Sheldon McKay, Cold Spring Harbor Laboratory

 This balloon tooltip package and associated files not otherwise copyrighted are 
 distributed under the MIT-style license:
 
 http://opensource.org/licenses/mit-license.php

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*/

// These global variables are necessary to avoid losing scope when
//setting the balloon timeout and for inter-object communication
var currentBalloonClass;
var balloonIsVisible;
var balloonIsSticky;
var balloonInvisibleSelects;
var balloonIsSuppressed;
var tooltipIsSuppressed;


//////////////////////////////////////////////////////////////////////////
// This is constructor that is called to initialize the Balloon object  //
//////////////////////////////////////////////////////////////////////////
var Balloon = function () {

  // Get default configuration from balloon.config.js
  BalloonConfig(this);

  // Track the cursor every time the mouse moves
  document.onmousemove = this.setActiveCoordinates;

  // scrolling aborts unsticky balloons
  document.onscroll    = Balloon.prototype.hideTooltip;

  // make balloons go away if the page is unloading or waiting
  // to unload.
  window.onbeforeunload = function(){
    Balloon.prototype.hideTooltip(1);
    balloonIsSuppressed = true;
  };

  // for IE, the balloons can;t start until the page is finished loading
  // set a flag that will get toggled when loading is finished
  if (this.isIE()) {
    this.suppress = true;
  }

  return this;
}

//////////////////////////////////////////////////////////////////////////
// This is the function that is called on mouseover.  It has a built-in //
// delay time to avoid balloons popping up on rapid mouseover events    //
//////////////////////////////////////////////////////////////////////////
Balloon.prototype.showTooltip = function(evt,caption,sticky,width) {
  // Awful IE bug, page load aborts if the balloon is fired
  // before the page is fully loaded.
  if (this.isIE() && document.readyState.match(/complete/i)) {
    this.suppress = false;
  }

  // All balloons have been suppressed, go no further
  if (this.suppress || balloonIsSuppressed) {
    return false;
  }

  // Non-sticky balloons suppressed
  if (tooltipIsSuppressed && !sticky) {
    return false;
  }

  // Sorry Konqueror, no fade-in for you!
  if (this.isKonqueror()) this.allowFade = false;

  // Check for mouseover (vs. mousedown or click)
  var mouseOver = true;
  try{
  var mouseOver = evt.type.match('mouseover','i');
  }catch(e){}  

  // if the firing event is a click, fade-in and a non-sticky balloon make no sense
  if (!mouseOver) {
    sticky = true;
    this.fadeOK = false;
  }
  else {
    this.fadeOK = this.allowFade;
  }

  // Don't fire on mouseover if a non-sticky balloon is visible
  if (balloonIsVisible && !balloonIsSticky && mouseOver) return false;

  // Don't start a non-sticky balloon if a sticky one is visible
  if (balloonIsVisible && balloonIsSticky && !sticky) return false;

  // Ignore repeated firing of mouseover->mouseout events on 
  // the same element (Safari)
  try{
  	var el = this.getEventTarget(evt);
  }catch(e){var el = evt;}
  if (sticky && mouseOver && this.isSameElement(el,this.currentElement)) return false;
  this.firingElement = el;

  // A new sticky balloon can erase an old one
  if (sticky) this.hideTooltip(1);

  // attach a mouseout event handler to the target element
  var closeBalloon = function() { 
 	//var override = balloonIsSticky && !balloonIsVisible;
    //Balloon.prototype.hideTooltip(override)
    var t = setTimeout("i3GEO.janela.excluiTips('todos');var override = balloonIsSticky && !balloonIsVisible;Balloon.prototype.hideTooltip(override);",2000);
  }
  if (!mouseOver) el.onmouseup  = function() {return false};
  el.onmouseout = closeBalloon;

  balloonIsSticky = sticky;

  // force balloon width and/or height if requested
  this.width  = width;

  this.hideTooltip();

  // request the contents synchronously (ie wait for result)
  this.currentHelpText = this.getAndCheckContents(caption);

  // no contents? abort.
  if (!this.currentHelpText) {
    return false;
  }

  // Put the balloon contents and images into a visible (but offscreen)
  // element so they will be preloaded and have a layout to 
  // calculate the balloon dimensions
  if (!this.container) {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.setStyle(this.container,'position','absolute');
    this.setStyle(this.container,'top',-8888);
    this.setStyle(this.container,'display','inline');
    this.setStyle(this.container,'z-index',2);
    this.setStyle(this.container,'color',this.fontColor);
    this.setStyle(this.container,'font-family',this.fontFamily);
    this.setStyle(this.container,'font-size',this.fontSize);
  }
  else {
    this.setStyle(this.container,'display','inline');
  }

  this.container.innerHTML = unescape(this.currentHelpText);

  // make sure balloon image path is complete
  if (this.images) {
    // main background image
    this.balloonImage  = this.balloonImage  ? this.images +'/'+ this.balloonImage  : false;
    this.ieImage       = this.ieImage       ? this.images +'/'+ this.ieImage       : false;

    // optional stems
    this.upLeftStem    = this.upLeftStem    ? this.images +'/'+ this.upLeftStem    : false;
    this.upRightStem   = this.upRightStem   ? this.images +'/'+ this.upRightStem   : false;
    this.downLeftStem  = this.downLeftStem  ? this.images +'/'+ this.downLeftStem  : false;
    this.downRightStem = this.downRightStem ? this.images +'/'+ this.downRightStem : false;

    this.closeButton   = this.closeButton   ? this.images +'/'+ this.closeButton   : false;

    this.images        = false;
  }

  // if this is IE < 7 use an alternative image (if provided)
  if (this.isOldIE() && this.ieImage) {
    this.balloonImage = this.ieImage;
  }

  // preload balloon images 
  if (!this.preloadedImages) {
    var images = new Array(this.balloonImage, this.closeButton);
    if (this.ieImage) {
      images.push(this.ieImage);
    }
    if (this.stem) {
      images.push(this.upLeftStem,this.upRightStem,this.downLeftStem,this.downRightStem);
    }
    var len = images.length;
    for (var i=0;i<len;i++) {
      if ( images[i] ) {
        this.preload(images[i]);
      }
    }
    this.preloadedImages = true;
  }

  currentBalloonClass = this;

  // Capture coordinates for mousedown or click
  if (!mouseOver) this.setActiveCoordinates(evt);
this.setActiveCoordinates(evt);
  // Remember which event started this
  this.currentEvent = evt;
  this.doShowTooltip(); //

  // Make delay time short for onmousedown
  //var delay = mouseOver ? this.delayTime : 1;
  //this.timeoutTooltip = window.setTimeout(this.doShowTooltip,1);
}


// Preload the balloon background images
Balloon.prototype.preload = function(src) {
  var i = new Image;
  i.src = src;

  // append to the DOM tree so the images have a layout,
  // then remove.
  this.setStyle(i,'position','absolute');
  this.setStyle(i,'top',-8000);
  document.body.appendChild(i);
  document.body.removeChild(i);
}


/////////////////////////////////////////////////////////////////////
// Tooltip rendering function
/////////////////////////////////////////////////////////////////////
Balloon.prototype.doShowTooltip = function() {
  var self = currentBalloonClass;

  // Stop firing if a balloon is already being displayed
  if (balloonIsVisible) return false;  

  if (!self.parent) {
    if (self.parentID) {
      self.parent = document.getElementById(self.parentID);
    }
    else {
      self.parent = document.body;
    }
    self.xOffset = self.getLoc(self.parent, 'x1');
    self.yOffset = self.getLoc(self.parent, 'y1');
  }

  // a short delay time might cause some intereference
  // with fade-out
  window.clearTimeout(self.timeoutFade);
  self.setStyle('balloon','display','none');

  // make sure user-configured numbers are not strings
  self.parseIntAll();

  // create the balloon object
  var balloon = self.makeBalloon();

  // window dimensions
  var pageWidth   = YAHOO.util.Dom.getViewportWidth();
  var pageCen     = Math.round(pageWidth/2);
  var pageHeight  = YAHOO.util.Dom.getViewportHeight();
  var pageLeft    = YAHOO.util.Dom.getDocumentScrollLeft();
  var pageTop     = YAHOO.util.Dom.getDocumentScrollTop();
  var pageMid     = pageTop + Math.round(pageHeight/2);
  self.pageBottom = pageTop + pageHeight;
  self.pageTop    = pageTop;

  // do we have a cursor position?
  if (!(self.activeTop && self.activeRight)) {
    self.setActiveCoordinates();
  }
  // balloon orientation
  var vOrient = self.activeTop > pageMid ? 'up' : 'down';
  var hOrient = self.activeRight > pageCen ? 'left' : 'right';
  
  // get the preloaded balloon contents
  var helpText = self.container.innerHTML;

  self.contents.innerHTML = helpText;
  // how and where to draw the balloon
  self.setBalloonStyle(vOrient,hOrient,pageWidth,pageLeft);

  // close control for balloon or box
  if (balloonIsSticky) {
    self.addCloseButton();
  }

  balloonIsVisible = true;

  // in IE < 7, hide <select> elements
  self.showHide();

  self.fade(0,95,self.fadeIn);
}

Balloon.prototype.addCloseButton = function () {
  var self         = currentBalloonClass;
  var margin       = Math.round(self.padding/2);
  var closeWidth   = self.closeButtonWidth || 16;
  var balloonTop   = self.getLoc('balloon','y1') + margin + self.shadow;
  var BalloonLeft  = self.getLoc('topRight','x2') - self.closeButtonWidth - self.shadow - margin;
  var closeButton  = document.getElementById('closeButton');

  if (!closeButton) {
    closeButton = new Image;
    closeButton.setAttribute('id','closeButton');
    closeButton.setAttribute('src',self.closeButton);
    closeButton.onclick = function() {
      Balloon.prototype.hideTooltip(1);
    };
    self.setStyle(closeButton,'position','absolute');
    document.body.appendChild(closeButton);
  }

  self.setStyle(closeButton,'top',balloonTop);
  self.setStyle(closeButton,'left',BalloonLeft);
  self.setStyle(closeButton,'display','inline');
  self.setStyle(closeButton,'cursor','pointer');
  self.setStyle(closeButton,'z-index',999999999);
}

// use a fresh object every time to make sure style 
// is not polluted
Balloon.prototype.makeBalloon = function() {
  var self = currentBalloonClass;

  var balloon = document.getElementById('balloon');
  if (balloon) self.parent.removeChild(balloon);

  balloon = document.createElement('div');
  balloon.setAttribute('id','balloon');
  self.parent.appendChild(balloon);
  self.activeBalloon = balloon;

  self.parts = new Array(balloon);
  var parts = new Array('contents','topRight','bottomRight','bottomLeft');
  for (var i=0;i<parts.length;i++) {
    var child = document.createElement('div');
    child.setAttribute('id',parts[i]);
    balloon.appendChild(child);
    if (parts[i] == 'contents') self.contents = child;
    self.parts.push(child);
  }

  self.setStyle('contents','z-index',2);
  self.setStyle('contents','color',self.fontColor);
  self.setStyle('contents','font-family',self.fontFamily);
  self.setStyle('contents','font-size',self.fontSize);

  if (balloonIsSticky) {
    self.setStyle('contents','margin-right',10); 
  }
  else if (self.displayTime)  {
      self.timeoutAutoClose = window.setTimeout(this.hideTooltip,self.displayTime);
  }
  return balloon;
}


Balloon.prototype.setBalloonStyle = function(vOrient,hOrient,pageWidth,pageLeft) {
  var self = currentBalloonClass;
  var balloon = self.activeBalloon;

  if (typeof(self.shadow) != 'number') self.shadow = 0;
  if (!self.stem) self.stemHeight = 0;

  var fullPadding   = self.padding + self.shadow;
  var insidePadding = self.padding;

  self.setStyle(balloon,'background','url('+self.balloonImage+') top left no-repeat');
  self.setStyle(balloon,'position','absolute');
  self.setStyle(balloon,'padding-top',fullPadding);
  self.setStyle(balloon,'padding-left',fullPadding);
  self.setStyle(balloon,'top',-9999);
  self.setStyle(balloon,'z-index',1000000);
  

  self.setStyle('bottomRight','background','url('+self.balloonImage+') bottom right no-repeat');
  self.setStyle('bottomRight','position','absolute');
  self.setStyle('bottomRight','right',0-fullPadding);
  self.setStyle('bottomRight','bottom',0-fullPadding);
  self.setStyle('bottomRight','height',fullPadding);
  self.setStyle('bottomRight','width',fullPadding);
  self.setStyle('bottomRight','z-index',-1);

  self.setStyle('topRight','background','url('+self.balloonImage+') top right no-repeat');
  self.setStyle('topRight','position','absolute');
  self.setStyle('topRight','right',0-fullPadding);
  self.setStyle('topRight','top',0);
  self.setStyle('topRight','width',fullPadding);

  self.setStyle('bottomLeft','background','url('+self.balloonImage+') bottom left no-repeat');
  self.setStyle('bottomLeft','position','absolute');
  self.setStyle('bottomLeft','left',0);
  self.setStyle('bottomLeft','bottom',0-fullPadding);
  self.setStyle('bottomLeft','height',fullPadding);
  self.setStyle('bottomLeft','z-index',-1);

  if (this.stem) {
    var stem = document.createElement('img');
    self.setStyle(stem,'position','absolute');
    balloon.appendChild(stem);    

    if (vOrient == 'up' && hOrient == 'left') {  
      stem.src = self.upLeftStem;
      var height = self.stemHeight + insidePadding - self.stemOverlap;
      self.setStyle(stem,'bottom',0-height);
      self.setStyle(stem,'right',0);             
    }
    else if (vOrient == 'down' && hOrient == 'left') {
      stem.src = self.downLeftStem;
      var height = self.stemHeight - (self.shadow + self.stemOverlap);
      self.setStyle(stem,'top',0-height);
      self.setStyle(stem,'right',0);
    }
    else if (vOrient == 'up' && hOrient == 'right') {
      stem.src = self.upRightStem;
      var height = self.stemHeight + insidePadding - self.stemOverlap;
      self.setStyle(stem,'bottom',0-height);
      self.setStyle(stem,'left',self.shadow);
    }
    else if (vOrient == 'down' && hOrient == 'right') {
      stem.src = self.downRightStem;
      var height = self.stemHeight - (self.shadow + self.stemOverlap);
      self.setStyle(stem,'top',0-height);
      self.setStyle(stem,'left',self.shadow);
    }

  }
//
  // flip left or right, as required
  if (hOrient == 'left') {
    var activeRight = pageWidth - self.activeLeft;
    self.setStyle(balloon,'right',activeRight);// - self.xOffset);
  }
  else {
    self.setStyle(balloon,'left',self.activeRight - self.xOffset);
  }

  if (!self.width) {
    var width = self.getLoc('contents','width');
    if (self.isIE()) width += 50;
    if (width > self.maxWidth) width = self.maxWidth + 50;
    if (width < self.minWidth) width = self.minWidth;
    self.setStyle(balloon,'width',width);
  }
  else {
    self.setStyle(balloon,'width',self.width);
  }
//
  // Make sure the balloon is not offscreen
  var balloonPad   = self.padding + self.shadow;
  var balloonLeft  = self.getLoc(balloon,'x1');
  var balloonRight = self.getLoc(balloon,'x2');
  if (hOrient == 'left')  balloonLeft  += balloonPad;
  if (hOrient == 'right') balloonRight += balloonPad;
  var pageRight    = pageLeft + pageWidth;

  if (hOrient == 'right' && balloonRight > (pageRight-30)) {
    self.setStyle(balloon,'width',(pageRight - balloonLeft) - 50);
  }
  else if (hOrient == 'left' && balloonLeft < (pageLeft+30)) {
    self.setStyle(balloon,'width',(balloonRight - pageLeft) - 50);
  }

  // Set the width/height for the right and bottom outlines
  var lineWidth  = self.getLoc(balloon,'width');
  var lineHeight = self.getLoc(balloon,'height');

  self.setStyle('topRight','height',lineHeight);
  self.setStyle('bottomLeft','width',lineWidth);

//

  // IE7 quirk -- look for unwanted overlap cause by an off by 1px error
  var vOverlap = self.isOverlap('topRight','bottomRight');
  var hOverlap = self.isOverlap('bottomLeft','bottomRight');
  if (vOverlap) self.setStyle('topRight','height',lineHeight-vOverlap[1]);
  if (hOverlap) self.setStyle('bottomLeft','width',lineWidth-hOverlap[0]);
  if (vOrient == 'up') {
    var activeTop = self.activeTop - self.vOffset - self.stemHeight - lineHeight;
    self.setStyle(balloon,'top',activeTop - self.yOffset);
    self.setStyle(balloon,'display','inline');
  }
  else {
    var activeTop = self.activeTop + self.vOffset + self.stemHeight;
    self.setStyle(balloon,'top',activeTop - self.yOffset);
  }
  self.setOpacity(1);
}

// Fade method adapted from an example on 
// http://brainerror.net/scripts/javascript/blendtrans/
Balloon.prototype.fade = function(opacStart, opacEnd, millisec) {
  var self = currentBalloonClass || new Balloon;

  //speed for each frame
  var speed = Math.round(millisec / 100);
  var timer = 0;
  if(opacStart > opacEnd) {
    if (self.fadeOK) {
      for(o = opacStart; o >= opacEnd; o--) {
        self.timeoutFade = setTimeout('Balloon.prototype.setOpacity('+o+')',(timer*speed));
        timer++;
      }
      setTimeout("Balloon.prototype.setStyle('balloon','display','none')",millisec);
    }
    else {
      self.setStyle('balloon','display','none')
    }
  }
  else if(opacStart < opacEnd && self.fadeOK) {
    for(o = opacStart; o <= opacEnd; o++) {
      self.timeoutFade = setTimeout('Balloon.prototype.setOpacity('+o+')',(timer*speed));
      timer++;
    }
  }
}

Balloon.prototype.setOpacity = function(opc) {
  var self = currentBalloonClass;
  if (!self || !self.fadeOK) return false;

  var o = parseFloat((opc||0)/100);
  
  /////////////////////////////////////////////////////////////
  // Very irritating IE deficiency: it can't handle changing //
  // opacity of child elements.  Just fade balloon contents  //
  // for IE and the whole balloon for less obtuse browsers.  //
  var el = self.isIE() ? 'contents' : 'balloon';             //
  /////////////////////////////////////////////////////////////

  var b  = document.getElementById(el);
  if (!b) return false;

  // CSS standards-compliant browsers!
  self.setStyle(b,'opacity',o);
  // old IE
  self.setStyle(b,'filter','alpha(opacity= '+opc+')');
  // old Mozilla/NN
  self.setStyle(b,'MozOpacity',o);
  // old Safari
  self.setStyle(b,'KhtmlOpacity',o);

}

Balloon.prototype.hideTooltip = function(override) {
  // some browsers pass the event object == we don't want it
  if (override && typeof override == 'object') override = false;
  if (balloonIsSticky && !override) return false;
  
  var self = currentBalloonClass;

  if (self) {
    window.clearTimeout(self.timeoutTooltip);
    window.clearTimeout(self.timeoutAutoClose);
  }

  if (balloonIsSticky && self) self.currentElement = null;

  balloonIsVisible = false;
  balloonIsSticky  = false;

  var closeButton = document.getElementById('closeButton');
  if (closeButton) {
    YAHOO.util.Dom.setStyle(closeButton,'display','none');
  }

  if (!self) {
    var hideBalloon  = document.getElementById('balloon');
    if (hideBalloon) Balloon.prototype.setStyle(hideBalloon,'display','none');
  }
  else if (self.activeBalloon) {
    if (!override && self.fadeOK && !self.isIE()) self.fade(95,0,self.fadeOut);
    else self.setStyle(self.activeBalloon,'display','none');
  }
  Balloon.prototype.showHide(1);
}

// this function is meant to be called externally to clear
// any open balloons
hideAllTooltips = function() {
  var self = currentBalloonClass;
  if (!self) return;
  window.clearTimeout(self.timeoutTooltip);
  if (self.activeBalloon) self.setStyle(self.activeBalloon,'display','none');
  balloonIsVisible    = false;
  balloonIsSticky     = false;
  currentBalloonClass = null;
}


// Track the active mouseover coordinates
Balloon.prototype.setActiveCoordinates = function(event) {

  var self = currentBalloonClass;
  if (!self) return false;
  var b = self.activeBalloon;
//
//modificado por edmar
//
  try{
  	if(typeof(event.id) == "string")
  	{
  		var pos = i3GEO.util.pegaPosicaoObjeto(event);
    	self.activeTop    = pos[1] - 10;
    	self.activeLeft   = pos[0] - 10;
    	self.activeRight  = self.activeLeft + 20;
    	self.activeBottom = self.activeTop  + 20;
    	return true; 	
  	}
  }catch(e){}
  var evt = event || window.event || self.currentEvent;
  if (!evt) {
    return false;
  }
  var XY = self.eventXY(evt);
  self.activeTop    = XY[1] - 10;
  self.activeLeft   = XY[0] - 10;
  self.activeRight  = self.activeLeft + 20;
  self.activeBottom = self.activeTop  + 20;

  return true;
}

////
// event XY and getEventTarget Functions based on examples by Peter-Paul
// Koch http://www.quirksmode.org/js/events_properties.html
Balloon.prototype.eventXY = function(event) {
  var XY = new Array(2);
  var e = event || window.event;

  if (e.pageX || e.pageY) {
    XY[0] = e.pageX;
    XY[1] = e.pageY;
  }
  else if ( e.clientX || e.clientY ) {
    XY[0] = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    XY[1] = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
  }
  //XY[0] = XY[0] + 10;
  return XY;
}

Balloon.prototype.getEventTarget = function(event) {
  var targ;
  var e = event || window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // Safari
  return targ;
}
////


Balloon.prototype.setStyle = function(el,att,val) {
  if (!el) return false;
  if (val && att.match(/left|top|bottom|right|width|height|padding|margin/)) val += 'px'; 
  if (typeof(el) != 'object') el = document.getElementById(el);

  // z-index does not work as expected
  if (att == 'z-index') {
    if (el.style) {
      el.style.zIndex = parseInt(val);
    }
  }
  else {
    YAHOO.util.Dom.setStyle(el,att,val);
  }
}

// Uses YAHOO's region class for element coordinates
Balloon.prototype.getLoc = function(el,request) {
  var region = YAHOO.util.Dom.getRegion(el);

  switch(request) {
    case ('y1') : return parseInt(region.top);
    case ('y2') : return parseInt(region.bottom);
    case ('x1') : return parseInt(region.left);
    case ('x2') : return parseInt(region.right);
    case ('width')  : return (parseInt(region.right)  - parseInt(region.left));
    case ('height') : return (parseInt(region.bottom) - parseInt(region.top));
    case ('region') : return region; 
 }
}

// We don't know if numbers are overridden with strings
// so play it safe
Balloon.prototype.parseIntAll = function() {
  this.padding     = parseInt(this.padding);
  this.shadow      = parseInt(this.shadow);
  this.stemHeight  = parseInt(this.stemHeight);
  this.stemOverlap = parseInt(this.stemOverlap);
  this.vOffset     = parseInt(this.vOffset);
  this.delayTime   = parseInt(this.delayTime);
  this.width       = parseInt(this.width);
  this.maxWidth    = parseInt(this.maxWidth);
  this.minWidth    = parseInt(this.minWidth);
  this.fadeIn      = parseInt(this.fadeIn);
  this.fadeOut     = parseInt(this.fadeOut);  
}


// show/hide select elements in older IE
// plus user-defined elements
Balloon.prototype.showHide = function(visible) {
  var self = currentBalloonClass || new Balloon;

  // IE z-index bug fix (courtesy of Lincoln Stein)
  if (self.isOldIE()) {
    if (!visible) {
      var balloonSelects = document.getElementById('contents').getElementsByTagName('select');
      var myHash = new Object();
      for (var i=0; i<balloonSelects.length; i++) {
        var id = balloonSelects[i].id || balloonSelects[i].name;
        myHash[id] = 1;
      }
      balloonInvisibleSelects = new Array();
      var allSelects = document.getElementsByTagName('select');
      for (var i=0; i<allSelects.length; i++) {
        var id = allSelects[i].id || allSelects[i].name;
        if (self.isOverlap(allSelects[i],self.activeBalloon) && !myHash[id]) {
          balloonInvisibleSelects.push(allSelects[i]);
          self.setStyle(allSelects[i],'visibility','hidden');
        }
      }
    }
    else if (balloonInvisibleSelects) {
      for (var i=0; i < balloonInvisibleSelects.length; i++) {
        var id = balloonInvisibleSelects[i].id || balloonInvisibleSelects[i].name;
        self.setStyle(balloonInvisibleSelects[i],'visibility','visible');
     }
     balloonInvisibleSelects = null;
    }
  }

  // show/hide any user-specified elements that overlap the balloon
  if (self.hide) {
    var display = visible ? 'inline' : 'none';
    for (var n=0;n<self.hide.length;n++) {
      if (self.isOverlap(self.activeBalloon,self.hide[n])) {
        self.setStyle(self.hide[n],'display',display);
      }
    }
  }
}

// Try to find overlap
Balloon.prototype.isOverlap = function(el1,el2) {
  if (!el1 || !el2) return false;
  var R1 = this.getLoc(el1,'region');
  var R2 = this.getLoc(el2,'region');
  if (!R1 || !R2) return false;
  var intersect = R1.intersect(R2);
  if (intersect) {
    // extent of overlap;
    intersect = new Array((intersect.right - intersect.left),(intersect.bottom - intersect.top));
  }
  return intersect;
}

// Coordinate-based test for the same element
Balloon.prototype.isSameElement = function(el1,el2) {
  if (!el1 || !el2) return false;
  var R1 = this.getLoc(el1,'region');
  var R2 = this.getLoc(el2,'region');
  var same = R1.contains(R2) && R2.contains(R1);
  return same ? true : false;
}


///////////////////////////////////////////////////////
// Security -- get the balloon contents while checking 
// for disallowed elements.
//////////////////////////////////////////////////////
Balloon.prototype.getAndCheckContents = function(caption) {
  var originalCaption = caption;
  var notAllowed = 'are not allowed in popup balloons in this web site.Please contact the site administrator for assistance.';
  var notSupported = 'AJAX is not supported for popup balloons in this web site. Please contact the site administrator for assistance.';
  
  // no Help Url without AJAX
  if (this.helpUrl && !this.allowAJAX) {
    //alert('Sorry, you have specified help URL '+this.helpUrl+' but '+notSupported);
    //return null;
  }

  // look for a url in the balloon contents
  if (caption.match(/^url:/)) {
    this.activeUrl = caption.replace(/^url:/,'');
    caption = '';
  }
  // or if the text is a bare hyperlink
  else if (caption.match(/^(https?:|\/|ftp:)\S+$/i)) {
    this.activeUrl = caption;
    caption = '';
  }

  // Make sure AJAX is allowed
  if (this.activeUrl && !this.allowAJAX) {
    //alert('Sorry, you asked for '+originalCaption+' but '+notSupported);
    //return null;
  }  

  // check if the contents are to be retrieved from an element
  if (caption.match(/^load:/)) {
    var load = caption.split(':');
    if (!document.getElementById(load[1])) alert ('problem locating element '+load[1]);
    caption = document.getElementById(load[1]).innerHTML;
    this.loadedFromElement = true;
  }

  // check if iframes are allowed
  if (caption.match(/\<\s*iframe/i) && !this.allowIframes) {
    //alert('Sorry: iframe elements '+notAllowed);
    //return null;
  }

  // check if event handlers are allowed
  if (caption.match(/\bon(load|mouse|click|unload|before)[^=]*=/i) && !this.allowEventHandlers) {
    //alert('Sorry: JavaScript event handlers '+notAllowed);
    //return null;
  }

  // check for script elements
  if (caption.match(/\<\s*script/i) && !this.allowScripts) {
    //alert('Sorry: <script> elements '+notAllowed);
    //return null;
  }

  // request the contents
  this.currentHelpText = this.getContents(caption);
  this.loadedFromElement = false;
  
  return this.currentHelpText;;
}


///////////////////////////////////////////////////////
// AJAX widget to fill the balloons
// requires prototype.js
///////////////////////////////////////////////////////
Balloon.prototype.getContents = function(section) {

  // just pass it back if no AJAX handler is required.
  if (!this.helpUrl && !this.activeUrl) return section;

  // or if the contents are already loaded from another element
  if (this.loadedFromElement) return section;

  // inline URL takes precedence
  var url = this.activeUrl || this.helpUrl;
  url    += this.activeUrl ? '' : '?section='+section;

  // activeUrl is meant to be single-use only
  this.activeUrl = null;

  var ajax;
  if (window.XMLHttpRequest) {
    ajax = new XMLHttpRequest();
  } else {
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (ajax) {
    ajax.open("GET", url, false);
    ajax.onreadystatechange=function() {
      //alert(ajax.readyState);
    };
    try {
      ajax.send(null);
    }
    catch (e) {
    // alert(e);
    }
    var txt = this.escapeHTML ? escape(ajax.responseText) : ajax.responseText;
    return  txt || section;
  }
  else {
    return section;
  }
}


// test for internet explorer
Balloon.prototype.isIE = function() {
  return document.all && !window.opera;
}

// test for internet explorer (but not IE7)
Balloon.prototype.isOldIE = function() {
  if (navigator.appVersion.indexOf("MSIE") == -1) return false;
  var temp=navigator.appVersion.split("MSIE");
  return parseFloat(temp[1]) < 7;
}

// test for Konqueror
Balloon.prototype.isKonqueror = function() {
  return navigator.userAgent.indexOf( 'Konqueror' ) != -1;
}

/*
Title: I3Geo

File: i3geo/classesjs/classe_i3geo.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
/*
Class: i3GEO

A classe i3GEO possu� os m�todos de cria��o e atualiza��o do mapa. Todas as subclasses
s�o baseadas em i3GEO, por exemplo, para criar uma janela flutuante sobre o mapa,
utilize i3GEO.janela.cria()

Para inicializar o mapa, utilize i3GEO.inicia() e para atualizar o mapa, utilize i3GEO.atualiza()

Ao inicializar ou atualizar o i3Geo, � feita uma chamada em AJAX 
para a obten��o dos par�metros necess�rios ao funcionamento do mapa. Esses par�metros
s�o armazenados na vari�vel i3GEO.parametros

Nessa classe est�o dispon�veis vari�veis internas utilizadas em v�rias fun��es, como i3GEO.temaAtivo
*/
i3GEO = {
	
	/*
	Variable: parametros
	
	Par�metros obtidos do mapa atual
	
	Parameters:
	
	mapexten {String} - extens�o geogr�fica do mapa no formato xmin ymin xmax ymax
	
	mapscale {Numeric} - denominador da escala do mapa
	
	mapres {Numeric} - resolu��o da imagem do mapa em DPI
	
	pixelsize {Numeric} - tamanho em unidades de terreno dos pixels da imagem
	
	mapfile {String} - nome do mapfile atualmente em uso
	
	cgi {String} - endere�o do execut�vel do mapserver no servidor acess�vel pela URL
	
	extentTotal {String} - extens�o do mapa na inicializa��o
	
	mapimagem {String} - URL da imagem que comp�e o mapa
	
	geoip {sim|nao} - indica se o geoip est� instalado, podendo ou n�o ser utilizado
	
	listavisual {String} - lista de visuais dispon�veis
	
	utilizacgi {sim|nao} - indica se o mapa atual est� no modo CGI
	
	versaoms {String} - vers�o do Mapserver instalado no servidor
	
	mensagens {String} - mensagens para uso no letreiro
	
	w {Integer} - largura do mapa atual
	
	h {Integer} - altura do mapa atual
	
	locsistemas {String} - endere�o do xml com a lista de sistemas adicionais
	
	locidentifica {String} - endere�o do xml com a lista de sistemas de identifica��o
	
	r {sim|nao} - indica se o software R est� instalado no servidor
	
	locmapas {String} - endere�o do xml com a lista de mapas
	
	extentref {String} - extens�o geogr�fica do mapa de refer�ncia
	
	celularef {Numeric} - tamanho do pixel do mapa de refer�ncia em unidades do terreno
	*/
	parametros: {
		mapexten: "",
		mapscale: "",
		mapres: "",
		pixelsize: "",
		mapfile: "",
		cgi: "",
		extentTotal: "",
		mapimagem: "",
		geoip: "",
		listavisual: "",
		utilizacgi:"",
		versaoms:"",
		mensagens:"",
		w: "",
		h: "",
		locsistemas:"",
		locidentifica:"",
		r:"",
		locmapas:"",
		celularef:""
	},
	/*
	Variable: temaAtivo
	
	Indica o �ltimo tema que foi ativado no mapa
	
	Um tema � ativado em algumas ferramentas, permitindo aue ao se passar de uma ferramenta
	para outra, os menus reflitam a �ltima escolha
	*/
	temaAtivo: "",

	cria:function(){
		//para efeitos de compatibilidade
		try {i3GEO.configura.locaplic = g_locaplic;}
		catch(e){g_locaplic = i3GEO.configura.locaplic;};
		//
		//calcula o tamanho do mapa
		var diminuix = (navm) ? i3GEO.configura.diminuixM : i3GEO.configura.diminuixN;
		var diminuiy = (navm) ? i3GEO.configura.diminuiyM : i3GEO.configura.diminuiyN;
		if (e == undefined){
			var menos = 0;
			if ($i("contemFerramentas"))
			{menos = menos + parseInt($i("contemFerramentas").style.width);}
			if ($i("ferramentas"))
			{menos = menos + parseInt($i("ferramentas").style.width);}
			var novow = parseInt(screen.availWidth) - diminuix;
			var novoh = parseInt(screen.availHeight) - diminuiy;		
			if (novow >= 1024){novow = 1000;}
			if (novoh >= 700){novoh = 700;}
			//o try aqui � necess�rio por conta do uso poss�vel do i3geo em um iframe
			try{
				if (document.body.style.width < 400){
					var novow = parseInt(screen.availWidth) - diminuix;
					var novoh = parseInt(screen.availHeight) - diminuiy;
					window.resizeTo(screen.availWidth,screen.availHeight);
					window.moveTo(0,0);
				}
			}
			catch(e){var e = "";}
			document.body.style.width = novow - diminuix;
			document.body.style.height = novoh;
			var w = novow - menos - diminuix;
			var h = novoh - diminuiy;
			if (document.getElementById("corpoMapa")){
				if (document.getElementById("corpoMapa").style.width){
					var w = parseInt(document.getElementById("corpoMapa").style.width);
					var h = parseInt(document.getElementById("corpoMapa").style.width);
				}
				if (document.getElementById("corpoMapa").style.height)
				{var h = parseInt(document.getElementById("corpoMapa").style.height);}
			}
		}
		else{
			var w = document.body.offsetWidth - parseInt($i("contemFerramentas").style.width) - diminuix;
			var h = document.body.offsetHeight - diminuiy;
		}
		if($i("contemImg")){
			$i("contemImg").style.height=h + "px";
			$i("contemImg").style.width=w + "px";
		}
		i3GEO.interface.cria(w,h);
		i3GEO.parametros = {
			mapexten: "",
			mapscale: "",
			mapres: "",
			pixelsize: "",
			mapfile: "",
			cgi: "",
			extentTotal: "",
			mapimagem: "",
			geoip: "",
			listavisual: "",
			utilizacgi:"",
			versaoms:"",
			mensagens:"",
			w: w,
			h: h,
			locsistemas:"",
			locidentifica:"",
			r:"",
			locmapas:"",
			extentref:""
		};
	},
	inicia:function(){
		i3GEOmantemCompatibilidade();
		var montaMapa = function(retorno){
			if(retorno == ""){alert("Ocorreu um erro no mapa - montaMapa");retorno = {data:{erro: "erro"}};}
			if(retorno.data.erro){
				i3GEO.janela.fechaAguarde("montaMapa");
				document.body.style.backgroundColor="white";
				document.body.innerHTML = "<br>Para abrir o i3Geo utilize o link:<br><a href="+i3GEO.configura.locaplic+"/ms_criamapa.php >"+i3GEO.configura.locaplic+"/ms_criamapa.php</a>";
				return("linkquebrado");
			}
			else{
				if(retorno.data.variaveis){

					//
					//executa com eval a string que � retornada pelo servidor (fun��o inicia do mapa_controle.php
					//
					var tempo = "";
					var titulo = "";
					eval(retorno.data.variaveis);
					try{
						if (titulo != "")
						{top.document.title = titulo;}
					}
					catch(e){var e = "";}
					i3GEO.ajuda.mostraJanela("Tempo de desenho em segundos: "+tempo,"");

					i3GEO.parametros.mapexten= mapexten;
					i3GEO.parametros.mapscale= parseInt(mapscale);
					i3GEO.parametros.mapres= mapres;
					i3GEO.parametros.pixelsize= g_celula;
					i3GEO.parametros.mapfile= mapfile;
					i3GEO.parametros.cgi= cgi;
					i3GEO.parametros.extentTotal=mapexten;
					i3GEO.parametros.mapimagem= mapimagem;
					i3GEO.parametros.geoip= geoip;
					i3GEO.parametros.listavisual= listavisual;
					i3GEO.parametros.utilizacgi= utilizacgi;
					i3GEO.parametros.versaoms= versaoms;
					i3GEO.parametros.mensagens= mensagens;
					i3GEO.parametros.locsistemas = locsistemas;
					i3GEO.parametros.locidentifica = locidentifica;
					i3GEO.parametros.r = r;
					i3GEO.parametros.locmapas = locmapas;
					i3GEO.parametros.extentref = extentref;
					i3GEO.gadgets.quadros.inicia(10);
					i3GEO.gadgets.quadros.grava("extensao",mapexten);
					i3GEO.arvoreDeCamadas.cria("",retorno.data.temas,i3GEO.configura.sid,i3GEO.configura.locaplic);
					i3GEO.util.arvore("<b>"+$trad("p13")+"</b>","listaPropriedades",i3GEO.configura.listaDePropriedadesDoMapa);
					i3GEO.gadgets.mostraBuscaRapida();
					i3GEO.guias.cria();
					if($i("arvoreAdicionaTema"))
					i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,"arvoreAdicionaTema");
					if($i("mst")){$i("mst").style.display="block";}
					i3GEO.atualiza(retorno);
					//
					//calcula (opcional) o tamanho correto da tabela onde fica o mapa
					//se n�o for feito esse c�lculo, o mapa fica ajustado � esquerda
					//			
					var temp = 0;
					if ($i("contemFerramentas")){temp = temp + parseInt($i("contemFerramentas").style.width);}
					if ($i("ferramentas")){temp = temp + parseInt($i("ferramentas").style.width);}
					if($i("mst"))
					{$i("mst").style.width=i3GEO.parametros.w + temp + "px";}
					if (i3GEO.configura.entorno == "sim"){
						i3GEO.configura.entorno == "nao";
						i3GEO.navega.entorno.ativaDesativa();
					}
					i3GEO.navega.autoRedesenho.ativa();
					if ($i("i3geo_escalanum")){$i("i3geo_escalanum").value = i3GEO.parametros.mapscale;}
					if ((i3GEO.parametros.geoip == "nao") && ($i("ondeestou")))
					{$i("ondeestou").style.display="none";}
	
					i3GEO.interface.inicia();
					if (i3GEO.finaliza)
					{eval(i3GEO.finaliza);}
				}
				else
				{alert("Erro. Impossivel criar o mapa "+retorno.data);return;}
				//
				//ativa a janela de mensagens se for o caso
				//
				if(document.getElementById("ajuda")) //para efeitos de compatibilidade com as vers�es anteriores a 4.1
				{i3GEO.ajuda.DIVAJUDA = "ajuda";}
				var abreJM = "sim";
				if (i3GEO.util.pegaCookie("g_janelaMen")){
					var abreJM = i3GEO.util.pegaCookie("g_janelaMen");
					if(abreJM == "sim")
					i3GEO.configura.iniciaJanelaMensagens = true;
					else
					i3GEO.configura.iniciaJanelaMensagens = false;
				}
				if(i3GEO.configura.iniciaJanelaMensagens == true)
				{i3GEO.ajuda.abreJanela();}		
				i3GEO.janela.fechaAguarde("montaMapa");
				if (i3GEO.configura.liberaGuias == "sim"){i3GEO.guias.libera();}
			}
			if($i("mst")){$i("mst").style.visibility ="visible";}		
		};
		if (!$i("i3geo"))
		{document.body.id = "i3geo";}
		$i("i3geo").className = "yui-skin-sam";
		if($i("mst"))
		$i("mst").style.visibility ="hidden";
		//
		//se g_sid="", o html foi aberto diretamente
		//ent�o, � necess�rio criar os arquivos tempor�rios do mapa
		//essa opera��o deve ser ass�ncrona
		//
		if(i3GEO.configura.sid==""){
			var mashup = function (retorno){
				i3GEO.configura.sid = retorno.data;
				i3GEO.inicia();
			};
			i3GEO.php.criamapa(mashup,i3GEO.configura.mashuppar);
		}
		else{
			//YAHOO.log("Chamada AJAX para obter o mapa inicial", "i3geo");
			i3GEO.janela.abreAguarde("montaMapa",$trad("o5"));
			i3GEO.php.inicia(montaMapa,i3GEO.configura.embedLegenda,i3GEO.parametros.w,i3GEO.parametros.h);
		}
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.janela.fechaAguarde()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.janela.fechaAguarde()");}
	},
	finaliza:"",

	/*
	Function: atualiza
	
	Atualiza o mapa atual, alterando a imagem do mapa e os gadgets ativos
	
	Parameters:
	
	retorno {String} - string com os par�metros do novo mapa. Se retorno n�o
	for especificado, ser� feita uma chamada em ajax para sua obten��o. O resultado
	dessa chamada � armazenada em i3GEO.parametros
	*/
	atualiza: function(retorno){
		//verifica se o par�metro retorno existe, caso contr�rio,
		//faz a chamada ao programa PHP para obter os par�metros
		try{
			if (retorno.data == "erro"){
				alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");
				i3GEO.mapa.recupera.inicia();return;
			}
		}
		catch(e){}
		var erro = function(){
			var legimagem = "";
			i3GEO.janela.abreAguarde("ajaxiniciaParametros",$trad("o1")+" atualizando");
			i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);		
		}
		try{var teste = eval(retorno.data.variaveis);}
		catch(e){erro.call();return;}
		if(arguments.length == 0 || retorno == "" || retorno.data.variaveis == undefined){erro.call();return;}
		else{	
			if(arguments.length == 0){return;}
			i3GEO.mapa.corpo.verifica(retorno);
			var tempo = "";
			if(i3GEO.desenho.richdraw)
			{i3GEO.desenho.richdraw.clearWorkspace();}
			mapscale = "";
			mapexten = "";
			//transforma o retorno em vari�veis
			eval(retorno.data.variaveis);

			i3GEO.arvoreDeCamadas.atualiza(retorno.data.temas);
			if (i3GEO.parametros.mapscale != mapscale)
			i3GEO.arvoreDeCamadas.atualizaFarol(mapscale);

			i3GEO.parametros.mapexten = mapexten;
			i3GEO.parametros.mapscale = mapscale;
			i3GEO.parametros.mapres = mapres;
			i3GEO.parametros.pixelsize = g_celula;
			i3GEO.parametros.mapimagem = mapimagem;

			i3GEO.interface.redesenha();
			
			g_operacao = "";
			i3GEO.parametros.mapexten = mapexten;
			if ($i("mensagemt"))
			{$i("mensagemt").value = i3GEO.parametros.mapexten;}
			
			i3GEO.arvoreDeCamadas.CAMADAS = retorno.data.temas;
			i3GEO.eventos.navegaMapa();
			if (i3GEO.configura.entorno == "sim"){
				i3GEO.navega.entorno.geraURL();
				i3GEO.navega.entorno.ajustaPosicao();
			}
			i3GEO.ajuda.mostraJanela("Tempo de redesenho em segundos: "+tempo,"");
		}	
	}
};
//YAHOO.log("carregou classe i3geo", "Classes i3geo");
/*
Title: Utilit�rios

File: i3geo/classesjs/classe_util.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Variable: navm

Verdadeiro (true) se o navegador for o Internet Explorer
*/
navm = false;
/*
Variable: navn

Verdadeiro (true) se o navegador for o Firefox
*/
navn = false;
//seta as vari�veis navn e navm
var app = navigator.appName.substring(0,1);
if (app=='N') navn=true; else navm=true;
/*
Variable: g_operacao

Nome da �ltima opera��o que foi executada.

Dependendo do tipo de opera��o s�o aplicadas as atualiza��es necess�rias aos componentes do mapa. Por exemplo, redesenha o corpo do mapa, atualiza a lista de temas, etc.

Essas opera��es s�o controladas pela fun��o ajaxiniciaparametros.
*/
g_operacao = "";
/*
Variable: g_tipoacao

Tipo de a��o que est� sendo executada.
Quando o usu�rio clica no mapa, essa vari�vel � pesquisada para definir o tipo de opera��o que deve ser executada.
� definida quando o usu�rio seleciona uma determinada ferramenta do i3Geo.
*/
g_tipoacao = "zoomli";
g_postpx = "px";
g_tipotop = "top";
g_tipoleft = "left";
if (navm)
{
	g_postpx = "";  //utilizado para crossbrowser
	g_tipotop = "pixelTop"; //utilizado para crossbrowser
	g_tipoleft = "pixelLeft"; //utilizado para crossbrowser
}

/*
Function: $i

Obt�m um elemento DOM a partir de seu id
  
Parameters:

id - {String} ID do elemento.
    
Returns:

{Object} Objeto.
*/
$i = function(id)
{return document.getElementById(id);};
/*
Function: Array.remove()

Extende os m�todos de um objeto Array, permitindo remover um elemento.

*/
Array.prototype.remove=function(s){
	try{
		var i = this.indexOf(s);
		if(i != -1) this.splice(i, 1);
	}catch(e){}
};

/*
Class: i3GEO.util

Utilit�rios.
*/
i3GEO.util = {
	/*
	Variable: PINS
	Elementos IMG criados na fun��o criaPin
	
	Type:
	{Array}
	*/
	PINS: new Array(),
	/*
	Variable: BOXES
	Elementos DIV criados na fun��o criaBox
	
	Type:
	{Array}
	*/
	BOXES: new Array(),	
	/*
	Function: insereCookie
	Cria um novo cookie. 
   
	Parameters:
	nome - {String} Nome do cookie.
	
	valor - (String) Valor do cookie
	*/
	insereCookie: function(nome,valor) {
		document.cookie = nome+"="+valor;
	},
	/*
	Function: pegaCookie
	Pega o valor de um cookie. 
   
	Parameters:
	nome - {String} Nome do cookie.

	Returns:
	(String) - valor do cookie
	*/
	pegaCookie: function(nome){
		var cookies = document.cookie;
		var i = cookies.indexOf(nome);
		if(i == -1)
		{return null;}
		var fim = cookies.indexOf(";",i);
		if (fim == -1)
		{var fim = cookies.length;}
		return (unescape(cookies.substring(i,fim))).split("=")[1];
	},
	/*
	Function: listaChaves
	Lista as chaves de um objeto. 
   
	Parameters:
	obj - {Object}

	Return:
	(Array) - array com as chaves.
	*/
	listaChaves: function (obj) {
		var keys = [];
		for(var key in obj){
   			keys.push(key);
		}
		return keys;
	},
	/*
	Function: criaBotaoAplicar
	Cria um bot�o flutuante do tipo aplicar.
	
	O novo bot�o � adicionado no DOM com ID "i3geo_aplicar" e posicionado sobre o objeto definido
   
	Parameters:
	
	nomeFuncao - {String} Nome da fun��o que ser� executada quando o bot�o for cllicado
	
	titulo - (opcional) {String} T�tulo que ser� mostrado no bot�o
	
	classe - (opcional) {String} Nome da classe (estilo) que ser� aplicado ao bot�o.
	
	obj - (opcional) {Objeto} Objeto DOM que foi clicado para provocar a cria��o do bot�o.

	Return:
	(Object) - Objeto DOM criado.

	*/
	criaBotaoAplicar: function (nomeFuncao,titulo,classe,obj) {
		try{clearTimeout(tempoBotaoAplicar);}catch(e){};
		tempoBotaoAplicar = eval("setTimeout('"+nomeFuncao+"\(\)',(i3GEO.configura.tempoAplicar))");
		autoRedesenho("reinicia");
		if(arguments.length == 1)
		{var titulo = "Aplicar";}
		if(arguments.length == 1 || arguments.length == 2)
		{var classe = "i3geoBotaoAplicar";}
		if (!document.getElementById("i3geo_aplicar"))
		{
			var novoel = document.createElement("input");
			novoel.id = 'i3geo_aplicar';
			novoel.type = 'button';
			novoel.value = titulo;
			novoel.style.cursor="pointer";
			novoel.style.fontSize="10px";
			novoel.style.zIndex = 15000;
			novoel.style.position="absolute";
			novoel.style.display="none";
			novoel.onmouseover = function(){this.style.display="block";};
			novoel.onmouseout = function(){this.style.display="none";};
			novoel.className = classe;
			document.body.appendChild(novoel);
		}
		else
		{var novoel = document.getElementById("i3geo_aplicar");}
		novoel.onclick = function(){
			clearTimeout(i3GEO.parametros.tempo);
			i3GEO.parametros.tempo = "";
			this.style.display='none';
			eval(nomeFuncao+"\(\)");
		};
		//reposiciona o botao
		if(arguments.length == 4){
			novoel.style.display="block";
			var xy = YAHOO.util.Dom.getXY(obj);
			YAHOO.util.Dom.setXY(novoel,xy);
		}
		return (novoel);
	},
	/*
	Function: arvore
	
	Cria uma �rvore com base em um objeto contendo aspropriedades.
	
	Parameters:
	
	titulo - {String} cabe�aljo da �rvore
	
	onde - {String} nome do id doelemento que conter� a �rvore
	
	obj - {Object} objeto contendo os par�metros, exemplo
	
		g_listaPropriedades = {
	
		"propriedades": [
	
		{ text: "p2", url: "javascript:tipoimagem()" }
	
		]}
	
	*/
	arvore: function(titulo,onde,obj){
		//YAHOO.log("arvore", "i3geo");
		if(!$i(onde)){return;}
		var currentIconMode;
		YAHOO.example.treeExample = new function(){
        	function buildTree(){
				arvore = new YAHOO.widget.TreeView(onde);
				root = arvore.getRoot();
				var tempNode = new YAHOO.widget.TextNode('', root, false);
				tempNode.isLeaf = false;
        	}
    		buildTree();
		}();
		var titulo = "<table><tr><td><b>"+titulo+"</b></td><td></td></tr></table>";
		var d = {html:titulo};
		var tempNode = new YAHOO.widget.HTMLNode(d, root, true,true);
		var c = obj.propriedades.length;
		for (var i=0, j=c; i<j; i++){
			var linha = obj.propriedades[i];
			var conteudo = "<a href='#' onclick='"+linha.url+"'>"+$trad(linha.text)+"</a>";
			var d = {html:conteudo};
			var temaNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
		}
		arvore.collapseAll();
   		arvore.draw();
   		//YAHOO.log("Fim arvore", "i3geo");
	},
	/*
	Function: removeAcentos

	Remove acentos de uma palavra ou frase

	Parameters:

	palavra {String}
	
	Return:
	
	{String}
	*/
	removeAcentos: function(palavra) {
		var re = /�|�|�|�/gi;
		palavra = palavra.replace(re,"a");
		var re = /�/gi;
		palavra = palavra.replace(re,"e");
		var re = /�/gi;
		palavra = palavra.replace(re,"i");
		var re = /�|�/gi;
		palavra = palavra.replace(re,"o");
		var re = /�/gi;
		palavra = palavra.replace(re,"c");
		var re = /�/gi;
		palavra = palavra.replace(re,"u");
		return(palavra);
	},
	/*
	Function protocolo
	
	Obt�m o protocoloutilizado na URL atual
	
	Return:
	
	{String} - protocolo
	*/
	protocolo: function(){
		var u = window.location.href;
		var u = u.split(":");
		return (u[0]);	
	},
	/*
	Function: pegaPosicaoObjeto

	Retorna a posi��o x,y de um objeto em rela��o a tela do navegador
	
	Parameters:
	
	obj {Object} - objeto dom
	
	Return:
	
	{Array} - array com a posi��o [x,y]
	*/
	pegaPosicaoObjeto: function(obj){
		if(obj)
		{
			if(obj.style.position == "absolute")
			{return [(parseInt(obj.style.left)),(parseInt(obj.style.top))];}
			else{
				var curleft = curtop = 0;
				if(obj){
					if (obj.offsetParent) {
						do {
							curleft += obj.offsetLeft-obj.scrollLeft;
							curtop += obj.offsetTop-obj.scrollTop;
						} while (obj = obj.offsetParent);
					}
				}
				return [curleft+document.body.scrollLeft,curtop+document.body.scrollTop];
			}
		}
		else
		{return [0,0];}
	},
	/*
		Function: i3geo_pegaElementoPai

		Pega o elemento pai de um elemento clicado para identificar o c�digo do tema.

		Parameters:

		e - elemento do DOM.
		
		Return:
		
		{Node} - objeto DOM
	*/
	pegaElementoPai: function(e){
		var targ;
		if (!e)
		{var e = window.event;}
		if (e.target)
		{targ = e.target;}
		else
		if (e.srcElement)
		{targ = e.srcElement;}
		if (targ.nodeType == 3)
   		{targ = targ.parentNode;}
		var tname;
		tparent=targ.parentNode;
		return(tparent);
	},
	/*
	Function: mudaCursor
	
	Altera o cursor do ponteiro do mouse.
	
	Os cursores dispon�veis s�o definidos por default em classe_configura.js
	
	Parameters:
	
	cursores {i3GEO.configura.cursores} - objeto JSON com as URIs de cada cursor (veja i3GEO.configura.cursores)
	
	tipo {String} - tipo de cursor dispon�vel em cursores
	
	idobjeto {String} - id do objeto que ter� o estilo alterado para o cursor desejado
	
	locaplic {String} - onde est� instalado o i3Geo
	*/
	mudaCursor: function(cursores,tipo,idobjeto,locaplic){
		var o = document.getElementById(idobjeto);
		if(o){
			if(navm){
				o.style.cursor = "URL(\""+locaplic+eval("cursores."+tipo+".ie")+"\"),auto";
			}
			else{
				o.style.cursor = "URL(\""+locaplic+eval("cursores."+tipo+".ff")+"\"),auto";
			}			
		}
	},
	/*
	Function: criaBox
	
	Cria um elemento div na p�gina atual.
	
	Esse elemento pode ser utilizado para desenhar ret�ngulos sobre o mapa
	
	Parameters:
	
	id {String} - id do elemento que ser� criado. Por default, ser� 'boxg'
	*/
	criaBox: function(id){
		if(arguments.length == 0)
		{var id = "boxg"}
		if (!$i(id))
		{
			var novoel = document.createElement("div");
			novoel.id = id;
			novoel.style.zIndex=1;
			novoel.innerHTML = '<font face="Arial" size=0></font>';
			document.body.appendChild(novoel);
			//YAHOO.util.Event.addListener($i(id),"mouseover", "this.style.display='none'");
			//novoel.onmouseover = eval("$i('"+id+"').style.display='none';");
			novoel.onmouseover = function(){novoel.style.display='none';};
			novoel.onmouseout = function(){novoel.style.display='block';};
			i3GEO.util.BOXES.push(id);
		}
	},
	/*
	Function: escondeBox
	
	Esconde os BOXES com IDs registrados em i3GEO.util.BOXES
	
	Os ids s�o criado pela fun��o criaBox
	*/
	escondeBox: function(){
		var l = i3GEO.util.BOXES.length;
		for (i=0; i<l; i++){
			if($i(i3GEO.util.BOXES[i]))
			{$i(i3GEO.util.BOXES[i]).style.display = "none";}
		}
	},
	/*
	Function: criaPin
	
	Cria um elemento imagem na p�gina atual.
	
	Esse elemento pode ser utilizado para desenhar pontos sobre o mapa
	
	Parameters:
	
	id {String} - id do elemento que ser� criado. Por default, ser� 'boxpin'
	*/
	criaPin: function(id){
		if(arguments.length == 0)
		{var id = "boxpin"}	
		if (!$i(id))
		{
			var novoel = document.createElement("img");
			novoel.id = id;
			novoel.style.zIndex=10000;
			novoel.style.position="absolute";
			novoel.style.width="21px";
			novoel.style.height="25px";
			novoel.src = i3GEO.configura.locaplic+'/imagens/marker.png';
			novoel.onmouseover = function(){$i("boxpin").style.display="none";};
			document.body.appendChild(novoel);
			i3GEO.util.PINS.push(id);
		}	
	},
	/*
	Function: escondePin
	
	Esconde os PINS com IDs registrados em i3GEO.util.PINS
	
	Os ids s�o criado pela fun��o criaPin
	*/
	escondePin: function(){
		var l = i3GEO.util.PINS.length;
		for (i=0; i<l; i++){
			if($i(i3GEO.util.PINS[i]))
			{$i(i3GEO.util.PINS[i]).style.display = "none";}
		}
	},
	/*
	Function: $im ou nome curto $im

	Retorna o caminho correto de uma imagem incluindo o endere�o da aplica��o e do visual em uso.

	Exemplo: $im("imagem.png")

	Par�metros:

	g {String} - nome da imagem

	Retorno:

	string - caminho para a imagem
	*/
	$im: function(g){
		return i3GEO.configura.locaplic+"/imagens/visual/"+i3GEO.configura.visual+"/"+g;
	},
	/*
	Function $inputText ou nome curto $inputText

	Cria um elemento html do tipo input text com formata��o especial.

	Parameters:

	idPai {String} - id do elemento pai do input

	larguraIdPai {Integer} - largura em pixel

	idInput {String} - id do objeto input

	titulo {String} - texto que vai no title

	digitos {Integer} - numero de d�gitos do input

	valor {String} - valor do input
	*/
	$inputText: function(idPai,larguraIdPai,idInput,titulo,digitos,valor) {
		if(idPai != "")
		{
			if(larguraIdPai != "")
			{$i(idPai).style.width=larguraIdPai+"px";}
			$i(idPai).style.padding="3";
			$i(idPai).style.textAlign="center";
			$i(idPai).onmouseover = function()
			{this.className = "digitarMouseover";};
			$i(idPai).onmouseout = function()
			{this.className = "";};	
		}
		var i = "<input onmouseover='javascript:this.className=\"digitarOver\";' onmouseout='javascript:this.className=\"digitar\";' onclick='javascript:this.className=\"digitarMouseclick\";' id="+idInput+" title='"+titulo+"' type=text size="+digitos+" class=digitar value='"+valor+"' />";
		return i;
	},
	/*
	Function: $top ou nome curto $top

	Muda a posi��o (superior) de um objeto tanto no IE como no Firefox.

	Exemplo: $top("imagem",100)

	Par�metros:

	id - identificador do objeto

	valor - posi��o em rela��o ao topo.
	*/
	$top: function(id,valor){
		if (document.getElementById(id).style){
			if (document.getElementById(id).style.pixelTop)
			{document.getElementById(id).style.pixelTop=valor;}
			else
			{document.getElementById(id).style.top=valor+"px";}
		}
	},
	/*
	Function: $left ou nome curto $left

	Muda a posi��o (esquerda) de um objeto tanto no IE como no Firefox.

	Exemplo: $left("imagem",100)

	Par�metros:

	id - identificador do objeto

	valor - posi��o em rela��o a esquerda.
	*/
	$left: function(id,valor){
		if (document.getElementById(id).style){
			if (document.getElementById(id).style.pixelLeft)
			{document.getElementById(id).style.pixelLeft=valor;}
			else
			{document.getElementById(id).style.left=valor+"px";}
		}
	},
	/*
	Function: insereMarca

	Insere ou remove pontos no mapa.
	*/
	insereMarca:{
		/*
		Variable: CONTAINER
		
		Armazena o valor do ID do div criado para inserir pontos
		
		Type:
		{Array}
		*/
		CONTAINER: new Array(),
		/*
		Function: cria
		
		Insere um ponto no mapa
		
		Os pontos s�o inseridos em um contaier de pontos e mostrados tempor�riamente

		Parameters:

		xi {Numeric} - coordenada x.

		yi {Numeric} - coordenada y.

		funcaoOnclick {String} - funcao que sera executada quando a marca 
		for clicada, se for "", o container ser� esvaziado ao ser clicado na marca
	
		container {String} - id do container que receber� os pontos
		*/
		cria:function(xi,yi,funcaoOnclick,container){
			try{
				if(i3GEO.util.insereMarca.CONTAINER.toString().search(container) < 0)
				i3GEO.util.insereMarca.CONTAINER.push(container);
				//verifica se existe o container para os pontos
				if (!$i(container)){
					var novoel = document.createElement("div");
					novoel.id = container;
					var i = novoel.style;
					i.position = "absolute";
					i.top = parseInt($i("img").style.top);
					i.left = parseInt($i("img").style.left);
					document.body.appendChild(novoel);
				}
				var container = $i(container);
				var novoel = document.createElement("div");
				var i = novoel.style;
				i.position = "absolute";
				i.zIndex=2000;
				i.top=(yi - 4)+"px";
				i.left=(xi - 4)+"px";
				i.width="4px";
				i.height="4px";
				var novoimg = document.createElement("img");
				if (funcaoOnclick != "")
				{novoimg.onclick = funcaoOnclick;}
				else
				{novoimg.onclick=function(){i3GEO.util.insereMarca.limpa();}}
				novoimg.src=i3GEO.configura.locaplic+"/imagens/dot1.gif";
				with (novoimg.style){width="6px";height="6px";zIndex=2000;}
				novoel.appendChild(novoimg);
				container.appendChild(novoel);
				if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.util.insereMarca.limpa()") < 0)
				{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.util.insereMarca.limpa()");}					
			}
			catch(e){alert("Ocorreu um erro. inseremarca"+e);}
		},
		limpa: function(){
			try{
				var n = i3GEO.util.insereMarca.CONTAINER.length;
				for(i=0;i<n;i++){
					if($i(i3GEO.util.insereMarca.CONTAINER[i]))
					$i(i3GEO.util.insereMarca.CONTAINER[i]).innerHTML = "";
				}
				i3GEO.util.insereMarca.CONTAINER = new Array();
				i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.util.insereMarca.limpa()");					
			}
			catch(e){}
		}
	},
	/*
	Function: adicionaSHP

	Inclui um arquivo shapefile no mapa atual como uma nova camada

	Parameters:

	path {String} - caminho completo do shapefile
	*/	
	adicionaSHP: function(path){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		var temp = path.split(".");
		if ((temp[1] == "SHP") || (temp[1] == "shp"))
		{i3GEO.php.adicionaTemaSHP(i3GEO.atualiza,path);}
		else
		{i3GEO.php.adicionaTemaIMG(i3GEO.atualiza,path);}
	},
	/*
	Function: abreCor
	
	Abre a janela flutuante para escolha de uma cor
	
	Parameters:
	
	janela {String} - id do conte�do da janela flutuante que chamou a fun��o
	
	elemento {String} - id do elemento que receber� os valores da cor selecionada
	*/
	abreCor: function(janela,elemento){
		i3GEO.janela.cria("400","240",i3GEO.configura.locaplic+"/ferramentas/colorpicker/index.htm?doc="+janela+"&elemento="+elemento,"","","Cor","i3geo_janelaCor",true);
	},
	/*
	Function: ajaxhttp
	
	Cria o objeto XMLHttpRequest para uso com fun��es pr�prias de chamada em ajax
	
	O uso dessa fun��o n�o � recomendado. D� prefer�ncia para uso da chamada ajax via YUI
	
	Return:
	
	{XMLHttpRequest}
	*/
	ajaxhttp: function(){
		try
		{var objhttp1 = new XMLHttpRequest();}
		catch(ee){
			try{var objhttp1 = new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){
				try{var objhttp1 = new ActiveXObject("Microsoft.XMLHTTP");}
				catch(E)
				{var objhttp1 = false;}
			}
		}
		return(objhttp1);
	},
	/*
	Function: ajaxexecASXml

	Executa uma chamada ajax no modo ass�ncrono retornando o resultado em XML.

	Parameters:

	programa {String} - URL do programa que ser� executado no servidor.
	funcao {funcao} - fun��o que tratar� o resultado.

	Returns:

	O resultado em um objeto DOM. Se o retorno contiver a palavra "Erro", � gerado um alert.
	*/
	ajaxexecASXml: function(programa,funcao){
		if (programa.search("http") == 0){
			var h = window.location.host;
			if (programa.search(h) < 0){
				alert("OOps! Nao e possivel chamar um XML de outro host.\nContacte o administrador do sistema.\nConfigure corretamente o ms_configura.php");
				return;
			}
		}	
		var ohttp = i3GEO.util.ajaxhttp();
		ohttp.open("GET",programa,true);
		var retorno = "";
		ohttp.onreadystatechange=function(){
			if (ohttp.readyState==4){
				var retorno = ohttp.responseText;
				if (retorno != undefined){
					if (document.implementation.createDocument){
						var parser = new DOMParser();
						var dom = parser.parseFromString(retorno, "text/xml");
					}
					else{
						var dom = new ActiveXObject("Microsoft.XMLDOM");
						dom.async="false";
						dom.load(programa);
					}
				}
				else
				{var dom = "erro";}
				if (funcao != "volta")
				{eval(funcao+'(dom)');}
				else
				{return dom;}
			}
		};
		ohttp.send(null);
	}
};
//
//alias
//
$im = function(g){
	return i3GEO.util.$im(g);
};
$inputText = function(idPai,larguraIdPai,idInput,titulo,digitos,valor){
	return i3GEO.util.$inputText(idPai,larguraIdPai,idInput,titulo,digitos,valor);
};
$top = function(id,valor){
	i3GEO.util.$top(id,valor);
};
$left = function(id,valor){
	i3GEO.util.$left(id,valor);
};
//YAHOO.log("carregou classe util", "Classes i3geo");
g_traducao = {
//texto da janela de mensagens
"p1": [
{
pt:"O I3Geo &eacute; software livre! Para download clique <a href='http://mapas.mma.gov.br/download' target=blank >aqui</a>. <b><a href='http://"+window.location.host+"/i3geo/mobile/qrcode.htm' target=blank >Qrcode mobile</a></b>",
en:"I3geo is a open source software! <a href='http://mapas.mma.gov.br/download' target=blank >Click</a> to download.",
es:"I3Geo es software libre. <a href='http://mapas.mma.gov.br/download' target=blank > Download</a>",
it:"I3geo � un software libero! <a href='http://mapas.mma.gov.br/download' target=blank >clicca qui </a> per il download."
}],
//lista de propriedades do mapa
"p2": [
{
pt:"Tipo de imagem",
en:"Image type",
es:"Tipo de imagen",
it:"Tipo di immagine"
}],
"p3": [
{
pt: "Legenda",
en: "Legend",
es:"Subt&iacute;tulo",
it:"Legenda"
}],
"p4": [
{
pt:"Escala",
en:"Scale",
es:"Escala",
it:"Scala"
}],
"p5": [
{
pt: "Tamanho",
en:"Size",
es:"Tama&ntilde;o",
it:"Dimensione"
}],
"p6": [
{
pt: "Ativa/desativa entorno",
en:"Enable/Disable surrounding",
es:"Activar/desactivar entorno",
it:"Attiva / Disattiva campo"
}],
"p7": [
{
pt: "Ativa/desativa logo",
en:"Enable/Disable logo",
es:"Activar/desactivar logomarca",
it:"Attiva / disattiva logo"
}],
"p8": [
{
pt: "Cor da selecao",
en:"Selection color",
es:"Color de la selecci&oacute;n",
it:"Colore della selezione"
}],
"p9": [
{
pt: "Cor do fundo",
en:"Background color",
es:"Color del fondo",
it:"Colore dello sfondo"
}],
"p10": [
{
pt: "Grade de coordenadas",
en:"Graticule",
es:"Grado de coordenadas",
it:"Reticolo"
}],
"p11": [
{
pt: "Template",
en:"Template",
es:"Template",
it:"Template"
}],
"p12": [
{
pt: "Temporizador",
en:"Timer",
es:"Temporizador",
it:"Temporizzazione"
}],
"p13": [
{
pt: "Propriedades",
en:"Properties",
es:"Propiedades",
it:"Propriet�"
}],
"p14": [
{
pt: "Aplicar",
en:"Apply",
es:"Aplicar",
it:"Applica"
}],
//itens do menu suspenso
"s1": [
{
pt: "Ajuda?",
en:"Help",
es:"Ayuda",
it:"Aiuto?"
}],
"s2": [
{
pt: "An&aacute;lise",
en:"Analysis",
es:"An&aacute;lisis",
it:"Analisi"
}],
"s3": [
{
pt: "Janelas",
en:"Windows",
es:"Ventanas",
it:"Finestra"
}],
"s4": [
{
pt: "Arquivo",
en:"Files",
es:"Archivo",
it:"Archivio"
}],
"s5": [
{
pt: "Propriedades",
en:"Properties",
es:"Propiedades",
it:"Propriet�"
}],
//submenus
"u1": [
{
pt: "Sobre o I3Geo",
en:"About",
es:"Sobre I3Geo",
it:"Informazioni WebGis"
}],
"u2": [
{
pt: "Sistema",
en:"System",
es:"Sistema",
it:"Sistema"
}],
"u3": [
{
pt: "WikiBook",
en:"WikiBook",
es:"WikiBook",
it:"WikiBook"
}],
"u4": [
{
pt: "Tutoriais",
en:"Tutorials",
es:"Tutoriales",
it:"Guida"
}],
"u5": [
{
pt: "Blog",
en:"Blog",
es:"Blog",
it:"Blog"
}],
"u5a": [
{
pt: "Portal do software p&uacute;blico",
en:"Portal do software p&uacute;blico",
es:"Portal do software p&uacute;blico",
it:"Portale del software pubblico"
}],
"u6": [
{
pt: "Geometrias",
en:"Geometries",
es:"Geometr&iacute;as",
it:"Geometrie"
}],
"u7": [
{
pt: "Grade de poligonos",
en:"Polygon grid",
es:"Grado de pol&iacute;gonos",
it:"Reticolo poligonale"
}],
"u8": [
{
pt: "Grade de pontos",
en:"Grid of Points",
es:"Grado de puntos",
it:"Reticolo puntuale"
}],
"u9": [
{
pt: "Grade de hex&aacute;gonos",
en:"Grid of Hexagons",
es:"Grado de hex&aacute;gonos",
it:"Reticolo Esagonale"
}],
"u10": [
{
pt: "Entorno(Buffer)",
en:"Buffer",
es:"Entorno (Buffer)",
it:"Buffer"
}],
"u11": [
{
pt: "Centr&oacute;ide",
en:"Centroid",
es:"Centro geom�trico",
it:"Baricentro"
}],
"u11a": [
{
pt: "Dist&acirc;ncia entre pontos",
en:"Point distance",
es:"Distancia de puntos",
it:"Distanza tra i punti"
}],
"u12": [
{
pt: "N pontos em poligono",
en:"N point in polygon",
es:"N puntos en pol&iacute;gono",
it:"N punti nel Poligono"
}],
"u13": [
{
pt: "Ponto em poligono/raster",
en:"Point in polygon/raster",
es:"Punto en pol&iacute;gono/matriz",
it:"Punto nel Poligono / raster"
}],
"u14": [
{
pt: "Distribui&ccedil;&atilde;o de pontos",
en:"Point distribution",
es:"Distribuci&oacute;n de puntos",
it:"Distribuzione di punti"
}],
"u15": [
{
pt: "Barras de ferramentas",
en:"Toolbars",
es:"Barras de herramientas",
it:"Barre Strumenti"
}],
"u16": [
{
pt: "Janela de mensagens",
en:"Message window",
es:"Ventana de mensajes",
it:"Finestra messaggi"
}],
"u17": [
{
pt: "Salvar mapa",
en:"Save map",
es:"Guardar mapa",
it:"Salva mappa"
}],
"u18": [
{
pt: "Carregar mapa",
en:"Load map",
es:"Cargar mapa",
it:"Apri mappa"
}],
"u19": [
{
pt: "Pegar imagens",
en:"Get pictures",
es:"Tomar im&aacute;genes",
it:"Apri immagine"
}],
"u20": [
{
pt: "Converter em WMS",
en:"Convert to WMS",
es:"Convertir en WMS",
it:"Converti in WMS"
}],
"u20a": [
{
pt: "Converter em KML",
en:"Convert to KML",
es:"Convertir en KML",
it:"Converti in KML"
}],
"u21": [
{
pt: "Gerador de links",
en:"Link generator",
es:"Generador de enlaces",
it:"Genera collegamento"
}],
"u22": [
{
pt: "Grade",
en:"Graticule",
es:"Grado",
it:"Reticolo"
}],
"u23": [
{
pt: "Ponto",
en:"Point",
es:"Punto",
it:"Punto"
}],
"u24": [
{
pt: "Pol&iacute;gono",
en:"Polygon",
es:"Poligonos",
it:"Poligono"
}],
"u25": [
{
pt: "Dissolve",
en:"Dissolv",
es:"Dissolve",
it:"Dissolvi"
}],
"u26": [
{
pt: "Agrupa",
en:"Group",
es:"Agrupa",
it:"Aggrega"
}],
"u27": [
{
pt: "Outros",
en:"Others",
es:"Otros",
it:"Altri"
}],
//arvore com a lista de temas
"t1": [
{
pt: "Camadas",
en:"Layers",
es:"Capas",
it:"Strati"
}],
"t2":[
{
pt:"arraste o tema aqui para excluir",
en:"Drag the layer here to remove",
es:"Arrastre el tema aqui para excluirlo",
it:"Trascina qui per rimuovere"
}],
"t3":[
{
pt:"Clique para ligar ou desligar esse tema, mostrando-o ou n&atilde;o no mapa. Ap&oacute;s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot&atilde;o aplicar que ser&aacute; mostrado.",
en:"Turn the layer on/off on the map. Wait a few moments to get the map redesigned or press the button to apply it.",
es:"Haga clic para conectar o desconectar este tema, mostr&aacute;ndolo o no en el mapa. Despu&eacute;s de alterar el estado del tema, espere algunos instantes para que el mapa sea redise&ntilde;ado, o haga clic en el bot&oacute;n aplicar que se mostrar&aacute;.",
it:"Fare clic per attivare o disattivare questo tema. Dopo aver modificato lo stato del tema, La mappa aggiornata sar� visualizzata dopo qualche istante. Per visualizzare subito cliccare su Applica" 
}],
"t4":[
{
pt:"limpa sele&ccedil;&atilde;o",
en:"Clear selection",
es:"Limpia la selecci&oacute;n",
it:"Pulizia della selezione"
}],
"t5":[
{
pt:"Limpa sele&ccedil;&atilde;o existente nesse tema",
en:"Clear selection",
es:"Limpia la selecci&oacute;n existente en este tema",
it:"Pulizia della selezione esistente in questo strato"
}],
"t6":[
{
pt:"Clique para fazer o download desse tema no formato shapefile",
en:"Click to download in shapefile format",
es:"Haga clic para hacer el download",
it:"Clicca per il download di questo tema nel formato Shapefile"
}],
"t7":[
{
pt:"clique e arraste",
en:"dragging",
es:"Haga clic y arrastre",
it:"Clicca e trascina"
}],
"t8":[
{
pt:"arraste para mudar a ordem",
en:"drag to change the draw order",
es:"Arrastre para cambiar la orden",
it:"Trascina per modificare l'ordine"
}],

"t9":[
{
pt:"A escala do tema &eacute; compat&iacute;vel com a escala do mapa",
en:"The scale of the layer is compatible with the scale of the map",
es:"La escala del tema es compatible con la escala del mapa",
it:"La scala del tema � compatibile con la scala della mappa"
}],
"t10":[
{
pt:"A escala do tema &eacute incompat&iacute;vel com a escala do mapa",
en:"The scale of the layer is incompatible with the scale of the map",
es:"La escala del tema es incompatible con la escala del mapa",
it:"La scala del tema � incompatibile con la scala della mappa"
}],
"t11":[
{
pt:"A escala do tema n&atilde;o &eacute conhecida",
en:"The scale of the layer is not known",
es:"La escala del tema no es conocida",
it: "La scala del tema non � conosciuta"
}],
"t12":[
{
pt:"excluir",
en:"delete",
es:"Excluir",
it:"Eliminare"
}],
"t12a":[
{
pt:"Clique para excluir esse tema do mapa.",
en:"Delete layer of the map.",
es:"Haga clic para excluir este tema del mapa",
it:"Clicca per rimuovere questo strato della mappa"
}],
"t13":[
{
pt:"sobe",
en:"up",
es:"Sube",
it:"Mettere sopra "
}],
"t14":[
{
pt:"Clique para subir esse tema na ordem de desenho",
en:"Drag the layer up",
es:"Haga clic para subir ese tema en la orden de dise&ntilde;o",
it:"Clicca per sollevare questo tema nell�ordine di progettazione"
}],
"t15":[
{
pt:"desce",
en:"down",
es:"Baja",
it:"scendere"
}],
"t16":[
{
pt:"Clique para descer esse tema na ordem de desenho",
en:"Drag the layer down",
es:"Haga clic para bajar este tema en la orden de dise&ntilde;o",
it:"Clicca per scendere questo tema nell�ordine di progettazione."
}],
"t17":[
{
pt:"zoom para o tema",
en:"zoom to a layer",
es:"Zoom para el tema",
it:"Zoom al tema"
}],
"t18":[
{
pt:"Clique para ajustar o mapa de forma a mostrar todo o tema",
en:"Click to adjust the map in order to show the whole layer",
es:"Haga clic para ajustar el mapa de forma para que muestre todo el tema",
it:"Clicca per regolare la mappa per visualizzare tutto lo strato"
}],
"t18a":[
{
pt:"Op&ccedil;&otilde;es",
en:"Options",
es:"Opciones",
it:"Opzioni"
}],
"t18b":[
{
pt:"Legenda",
en:"Legend",
es:"Subtitulo",
it:"Legenda"
}],
"t19":[
{
pt:"Altera a transpar�ncia do tema, possibilitando que as camadas inferiores possam ser vistas.",
en:"Change the layer transparency.",
es:"Altera la transparencia del tema, haciendo posible que las capas inferiores puedan verse",
it:"Modifica la trasparenza del tema, consentendo che gli strati pi� bassi siano visti"
}],
"t20":[
{
pt:"Opacidade:",
en:"Opacity",
es:"Opacidad",
it:"Opacit�"
}],
"t21a":[
{
pt:"Muda o nome atual do tema. Utilize para melhorar a legenda do mapa.",
en:"Change layer name.",
es:"Cambia el nombre actual del tema. Utilice para mejorar el subtitulo del mapa.",
it:"Cambia il nome del tema corrente. Utilizzare per migliorare la legenda della mappa."
}],
"t21":[
{
pt:"Novo nome:",
en:"New name",
es:"Nuevo nombre",
it:"Nuovo nome"
}],
"t22":[
{
pt:"Localize elementos no tema com base em seus atributos descritivos.",
en:"Find elements on the layer based on their descriptive attributes.",
es:"Ubique elementos en el tema con base en sus atributos descriptivos",
it:"Trova gli elementi nel tema secondo i suoi attributi descrittivi."
}],
"t23":[
{
pt:"Procurar...",
en:"Search...",
es:"Buscar...",
it:"Cerca..."
}],
"t24":[
{
pt:"Crie uma nova camada no mapa para apresentar textos descritivos sobre esse tema, tendo como base a tabela de atributos.",
en:"Create a new layer to display descriptive texts on the subject, based on table of attributes.",
es:"Crear una nueva capa en el mapa para presentar textos descriptivos sobre este tema, teniendo como base la tabla de atributos",
it:"Creare un nuovo strato sulla mappa per visualizzare testi descrittivi sul tema, secondo la tabella di attributi."
}],
"t25":[
{
pt:"Texto...",
en:"Label...",
es:"Texto...",
it:"Testo..."
}],
"t26":[
{
pt:"Defina as etiquetas que ser&atilde;o mostradas quando o mouse &eacute; estacionado sobre um elemento desse tema.",
en:"Set the tooltips that will be shown when the mouse is over the element of that layer.",
es:"Defina las etiquetas que se mostrar&aacute;n cuando el rat&oacute;n se estaciona sobre un elemento de este tema",
it:"Definire le etichette da visualizzare quando il mouse si ferma su un elemento di questo tema."
}],
"t27":[
{
pt:"Etiquetas...",
en:"Tooltip...",
es:"Etiquetas...",
it:"Descrizioni..."
}],
"t28":[
{
pt:"Insira um filtro nesse tema para mostrar apenas determinadas informa&ccedil;&otilde;es, com base na tabela de atributos.",
en:"Filter based on the table of attributes.",
es:"Inserte un filtro en este tema para mostrar solo determinadas informaciones, con base en la tabla de atributos",
it:"Inserisci un filtro in questo tema per mostrare solo determinate informazioni, con base nella tabella di attributi"
}],
"t29":[
{
pt:"Filtro...",
en:"Filter...",
es:"Filtro...",
it:"Filtro..."
}],
"t30":[
{
pt:"Veja a tabela de atributos relacionada a esse tema.",
en:"See the table of attributes related to that layer.",
es:"Vea la tabla de atributos relacionada con este tema",
it:"Vedi la tabella degli attributi di questo tema."
}],
"t31":[
{
pt:"Tabela...",
en:"Table...",
es:"Tabla...",
it:"Tabella..."
}],
"t32":[
{
pt:"Abre o editor de legenda, permitindo a altera��o da forma de representa��o desse tema.",
en:"Opens the editor of legend, allowing the modification of the form of representation of this theme.",
es:"Abre el editor de subt�tulo, permitiendo la alteraci&oacute;n de la forma de representaci&oacute;n de este tema",
it:"Aprire l'editor di legenda, che consente la modifica della forma di rappresentazione di questo tema "
}],
"t33":[
{
pt:"Editar legenda...",
en:"Legend edit...",
es:"Editar subt�tulo...",
it:"Modifica la legenda"
}],
"t34":[
{
pt:"Mostra os dados desse tema em uma janela que acompanha o mouse.",
en:"The data shows that layer in a window that tracks the mouse.",
es:"Muestra los datos de este tema en una ventana que acompa&ntilde;a el rat&oacute;n",
it:"Mostra i dati di questo tema in una finestra che accompagna il mouse."
}],
"t35":[
{
pt:"Mostra em janela...",
en:"Show in window",
es:"Muestra en la ventana...",
it: "Mostra nella finestra..."
}],
"t36":[
{
pt:"tema vis&iacute;vel apenas em determinadas escalas",
en:"the layer is visible in specific scales",
es:"capa visible en ciertas escalas",
it:"Tema visibile solo a determinate scale"
}],
"t37":[
{
pt:"Gr�fico",
en:"Graphic",
es:"Gr&aacute;fico",
it:"Grafico"
}],
//guia adiciona
"a1":[
{
pt:"procurar tema:",
en:"search layer:",
es:"Buscar datos:",
it:"Ricerca il tema:"
}],
"a2":[
{
pt:"Upload de shape file",
en:"Upload shape file",
es:"Upload de shape file",
it:"Upload del shape file"
}],
"a2b":[
{
pt:"Upload de arquivo dbf",
en:"Upload dbf file",
es:"Upload de archivo dbf",
it: "Upload del file dbf"
}],
"a3":[
{
pt:"Download de dados",
en:"Data download",
es:"Download de datos",
it:"Download dei dati"
}],
"a4":[
{
pt:"Conectar com servidor WMS",
en:"WMS server connection",
es:"Conectar con el servidor WMS",
it:"Connetti con il server WMS"
}],
"a5":[
{
pt:"Conectar com GeoRss",
en:"GeoRss connection",
es:"Conectar con GeoRss",
it:"Connetti con il GeoRss"
}],
"a5a":[
{
pt:"Nuvem de tags",
en:"Tags cloud",
es:"Tags",
it:"Tag"
}],
"a6":[
{
pt:"Acesso aos arquivos do servidor",
en:"Access files in server directory",
es:"Acceso a los archivos del servidor",
it:"Accesso agli archivi del server"
}],
"a7":[
{
pt:"Temas",
en:"Layers",
es:"Temas",
it:"Temi"
}],
"a8":[
{
pt:"Clique no box ao lado do tema para ligar ou desligar, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.",
en:"Click to connect or disconnect layer, showing it or not on the map. After changing the layer status, wait a few moments to be redesigned the map, or click in the button apply that will be shown.",
es:"Haga clic para conectar o desconectar este tema, mostr&aacute;ndolo o no en el mapa. Despu&eacute;s de alterar el estado del tema, espere algunos instantes para que el mapa sea redise&ntilde;ado, o haga clic en el bot&oacute;n aplicar que aparecer&aacute;",
it:"Clicca sulla casella accanto al tema per attivare o disattivare, mostrandolo o meno sulla mappa. Dopo aver modificato lo stato del tema, attendere qualche istante per vedere ridisegnata la mappa, oppure fare clic sul pulsante Applica, che verr� visualizzato."
}],
"a9":[
{
pt:"fonte",
en:"font",
es:"Fuente",
it:"Fonte"
}],
"a10":[
{
pt:"c&oacute;digo:",
en:"code",
es:"C&oacute;digo",
it:"Codice"
}],
"a11":[
{
pt:"Sistemas",
en:"Systems",
es:"Sistemas",
it:"Sistemi"
}],
"a12":[
{
pt:"Abrir sistema",
en:"Open system",
es:"Abrir sistema",
it:"Aprire il sistema"
}],
//guias principais
"g1":[
{
pt:"Temas",
en:"Layer",
es:"Temas",
it:"Temi"
}],
"g2":[
{
pt:"Adiciona",
en:"Add",
es:"Agrega",
it:"Aggiunge"
}],
"g3":[
{
pt:"Legenda",
en:"Legend",
es:"Subt�tulo",
it:"Legenda"
}],
"g4":[
{
pt:"Mapas",
en:"Maps",
es:"Mapas",
it:"Mappa"
}],
"g4a":[
{
pt:"Mapa",
en:"Map",
es:"Mapa",
it:"Mappe"
}],
//outros
"o1":[
{
pt:"Aguarde...",
en:"Wait...",
es:"Espere...",
it:"Attendere..."
}],
"o2":[
{
pt:"Busca r&aacute;pida...",
en:"Quick search...",
es:"B&uacute;squeda r&aacute;pida...",
it:"Ricerca rapida ..."
}],
"o3":[
{
pt:"Lendo imagem...",
en:"Loading images...",
es:"Leyendo imagen...",
it:"Lettura di immagini..."
}],
"o4":[
{
pt:"Aguarde...abrindo lente",
en:"Wait...Opening lens...",
es:"Espere...abriendo lente",
it:"Attendere...apertura della lente"
}],
"o5":[
{
pt:"Aguarde...iniciando",
en:"Wait...initializing",
es:"Espere...iniciando",
it:"Attendere...partenza"
}],
"o6":[
{
pt:"din&acirc;mico",
en:"dynamic",
es:"Din&aacute;mico",
it:"Dinamico"
}],
//dicas das ferramentas
"d1":[
{
pt:"Digite as coordenadas de um ponto (X=longitude e Y=latitude) para localiz&acute;-lo no mapa. O centro do mapa ser&acute; deslocado para o ponto digitado.",
en:"Enter the coordinates of a point (X=longitude and Y=latitude) to localize it on the map. The center of the map is move to the point entered.",
es:"Digite las coordenadas de un punto (X=longitud e Y=latitud) para ubicarlas en el mapa. El centro del mapa se desplazar&aacute; para el punto digitado.",
it:"Inserisci le coordinate di un punto (X=longitudine e Y=latitudine) per individuarlo sulla mappa. Il centro della mappa viene spostato al punto digitato"
}],
"d2":[
{
pt:"Altera a escala do mapa ajustando-a para mostrar a mesma abrang&circ;ncia geogr&aacute;fica da inicializa&ccedil;&atilde;o.",
en:"Change the scale of the map adjusting it to show the same initial geographical cover.",
es:"Modifica la escala del mapa ajust&aacute;ndola para mostrar la misma &aacute;rea geogr&aacute;fica inicial",
it:"Modificare la scala della mappa adeguandola per mostrare la stessa copertura geografica sin dall'inizializzazione"
}],
"d3":[
{
pt:"Amplia o mapa - coloca o ponto clicado no centro da tela ou amplia a regi&atilde;o indicada por um ret&acirc;ngulo.Ap&oacute;s ativada, clique e arraste o mouse sobre o mapa na &aacute;rea de zoom desejada.",
en:"Extends the map - place the clicked point in the center of the screen or extends the region indicated by a rectangular.After enabled, click and drag the mouse over the map in the area of zoom desired.",
es:"Ampl&iacute;a el mapa - coloca el punto donde se hizo clic en el centro de la pantalla o ampl&iacute;a la regi&oacute;n indicada por un rect&aacute;ngulo. Despu&eacute;s de activarla, haga clic y arrastre el rat&oacute;n sobre el mapa en el &aacute;rea de zoom deseada",
it:"Ampliare la mappa - pone il punto cliccato nel centro dello schermo o ingrandisce la regione indicata con un rettangolo. Dopo aver attivata, cliccare e trascinare il mouse sopra la mappa nell�area di zoom desiderata."
}],
"d4":[
{
pt:"Desloca a regi&atilde;o vis&iacute;vel no mapa. Ap&oacute;s ativada, clique e arraste o mouse sobre o mapa para deslocar a regi&atilde;o vis&iacute;vel.",
en:"Shifts the region visible on the map. Once activated, click and drag the mouse over the map to move the visible region.",
es:"Desloca la regi&oacute;n visible en el mapa",
it:"Sposta la regione visibile sulla mappa. Dopo averla attivata, cliccare e trascinare il mouse sulla mappa per spostare la regione visibile "
}],
"d5":[
{
pt:"Amplia o mapa tendo como refer&ecirc;ncia o centro atual.",
en:"Magnify the map with the reference the current center.",
es:"Ampl&iacute;a el mapa teniendo como referencia el centro actual",
it:"Estendi la mappa tenendo come riferimento il centro corrente."
}],
"d6":[
{
pt:"Reduz o mapa tendo como refer&ecircncia o centro atual.",
en:"Reduces the map as having reference the current center.",
es:"Reduce el mapa teniendo como referencia el centro actual",
it:"Riduci la mappa tenendo come referimento il centro corrente"
}],
"d7":[
{
pt:"Mostra informa&ccedil;&otilde;es sobre um ponto no mapa. Ap&oacute;s ativada, pare o mouse por alguns instantes no ponto desejado ou clique sobre o mesmo.",
en:"Displays information about a point on the map. Once activated, stop the mouse for a few moments at the desired point or click on it.",
es:"Muestra informaci&oacute;n sobre un punto en el mapa. Despu&eacute;s de activarla, pare el rat&oacute;n por algunos instantes en el punto deseado o haga clic sobre el mismo.",
it:"Mostra gli informazioni su un punto sulla mappa. Dopo averla attivata, fermare il mouse per qualche istante nel punto desiderato o fare clic su di esso."
}],
"d8":[
{
pt:"Mostra a extens&atilde;o geogr&aacute;fica atual em coordenadas geogr&aacute;ficas",
en:"It shows the extent of current geographic coordinates",
es:"Muestra la extensi&oacute;n geogr�fica actual en coordenadas geogr&aacute;ficas",
it:"Mostra la estensione geografica corrente in coordinate geografiche"
}],
"d9":[
{
pt:"Abre/fecha o mapa de refer&ecirc;ncia",
en:"Open/close the reference map ",
es:"Abre/cierra el mapa de referencia",
it:"Apertura/chiusura della mappa di riferimento"
}],
"d10":[
{
pt:"Digite o novo valor de escala e clique no bot&atilde;o aplicar para alterar a escala do mapa",
en:"Enter the new value of scale and click the button Apply to change the scale of the map",
es:"Digite el nuevo valor de escala y haga clic en el bot&oacute;n aplicar para modificar la escala del mapa",
it:"Immettere il nuovo valore di scala e clicca sul pulsante Applica per cambiare la scala della mappa"
}],
"d11":[
{
pt:"Busca dados na Wikipedia na abrang&ecirc;ncia atual do mapa. Fa&ccedil;a um zoom no mapa antes de abrir essa op&ccedil;&atilde;o. Regi&ocirc;es muito extensas podem tornar a busca muito demorada",
en:"Search data on Wikipedia in the current scope of the map. Make a zoom on the map before opening this option. Regions very extensive can make a very long search ",
es:"Busca datos en Wikipedia en el alcance actual del mapa. Haga zoom en el mapa antes de abrir esta opci&oacute;n. Regiones muy extensas pueden ocasionar una b&uacute;squeda muy lenta",
it:"Ricerca dati su Wikipedia nell'ambito corrente della mappa. Fare uno zoom sulla mappa prima dell�apertura di questa opzione. Regioni molto ampie potrebbero causare una ricerca troppo lenta."
}],
"d12":[
{
pt:"Imprime o mapa",
en:"Print the map",
es:"Imprime el mapa",
it:"Stampa la mappa"
}],
"d13":[
{
pt:"Localiza o IP do usu&aacute;rio no mapa",
en:"Locates the user's IP on the map",
es:"Ubica el IP del usuario en el mapa",
it:"Trova IP dell'utente nella mappa"
}],
"d14":[
{
pt:"Gera arquivo para 3d",
en:"Generates file for 3d",
es:"Genera archivo para 3d",
it:"Genera file per 3d"
}],
"d15":[
{
pt:"Abre o Google Maps, mostrando uma imagem de sat&eacute;lite da regi&atilde;o vista no mapa principal",
en:"Open Google Maps, showing a satellite image of the region's main views on the map",
es:"Abre Google Maps, mostrando una imagen de sat&eacute;lite de la regi&oacute;n en el mapa principal",
it:"Apri Google Maps, mostrando un'immagine satellitare della regione vista sulla mappa principale."
}],
"d16":[
{
pt:"Pesquisa documentos na base de dados Scielo (dados preliminares)",
en:"Search documents in the database Scielo (preliminary data)",
es:"Busca documentos en la base de datos Scielo (datos preliminares)",
it:"Ricerca dei documenti nella base di dati Scielo (dati preliminari)"
}],
"d17":[
{
pt:"Projeto Confluence. Pontos de intersec&ccedil;&atilde;o de coordenadas observadas em campo",
en:"Confluence Project. Points of intersection of coordinates observed in field",
es:"Proyecto Confluence. Puntos de intersecci&oacute;n de coordenadas observadas en campo",
it:"Progetto di confluenza. Punti di intersezione delle coordinate osservate in campo"
}],
"d18":[
{
pt:"Abre lente de amplia&ccedil;&atilde;o",
en:"Opens lens to expansion",
es:"Abre lente de ampliaci&oacute;n",
it:"Apri lente di ingrandimento"
}],
"d19":[
{
pt:"Coloca as guias em uma janela m&oacute;vel",
en:"Open the tabs in a window mobile",
es:"Coloca las gu&iacute;as en una ventana m&oacute;vil",
it:"Aprire le schede in una finestra mobile."
}],
"d20":[
{
pt:"Redesenha o mapa com as configura&ccedil;&ocirc;es iniciais.",
en:"Reload the map with the initial configurations.",
es:"Redise&ntilde;a el mapa con las configuraciones iniciales",
it:"Ricarica la mappa con la configurazione iniziale."
}],
"d21":[
{
pt:"Mede a dist&acirc;ncia entre dois ou mais pontos clicados no mapa (menor dist&acirc;ncia). O c&aacute;lculo de dist&acirc;ncia &eacute; aproximado e sua precis&atilde;o depende da escala do mapa.",
en:"It measures the distance between two or more clicked points on the map (less distance). The calculation of distance is approximate and their accuracy depends on the scale of the map.",
es:"Mide la distancia entre dos o m&aacute;s puntos marcados en el mapa (menor distancia). El c&aacute;lculo de distancia es aproximado y su precisi&oacute;n depende de la escala del mapa",
it:"Misura la distanza tra due o pi� punti cliccati sulla mappa (minore distanza). Il calcolo della distanza � approssimativo e la sua precisione dipende dalla scala della mappa."
}],
"d21a":[
{
pt:"Mede a &aacute;rea de um pol&iacute;gono desenhado na tela. O c&aacute;lculo de &aacute;ria &eacute; aproximado e sua precis&atilde;o depende da escala do mapa.",
en:"It measures the area on the map. The calculation of area is approximate and their accuracy depends on the scale of the map.",
es:"Mede a &aacute;rea de um pol&iacute;gono desenhado na tela. O c&aacute;lculo de &aacute;ria &eacute; aproximado e sua precis&atilde;o depende da escala do mapa.",
it:"Misura l'area di un poligono tracciato sullo schermo. Il calcolo della superficie � approssimativo e la sua precisione dipende dalla scala della mappa."
}],
"d22":[
{
pt:"Insere pontos no mapa em coordenadas geogr&aacute;ficas. Ospontos inclu&iacute;dos podem ser transformados em linhas ou pol&iacute;gonos. Os pontos s&atilde;o armazenados em um tema tempor&aacute;rio, podendo-se fazer o download do arquivo shapefile.",
en:"Insert points on the map in geographical coordinates. Items included can be converted into lines or polygons. Items are stored in a temporary layer, can be to download shapefile.",
es:"Inserte puntos en el mapa en coordenadas geogr&aacute;ficas. Los puntos incluidos pueden transformarse en l&iacute;neas o pol&iacute;gonos. Los puntos se almacenan en un tema temporal, pudiendo hacerse el download del archivo shapefile.",
it:"Inserire punti sulla mappa in coordinate geografiche. I punti inseriti possono essere trasformati in linee o poligoni. I punti vengono memorizzati in un tema temporaneo, con la possibilit� di effettuare il download del file Shapefile." 
}],
"d23":[
{
pt:"Insere um gr&aacute;fico no ponto clicado conforme os atributos existentes no tema escolhido. O tema deve possuir itens com valores num&eacute;ricos na tabela de atributos.",
en:"Insert a graphic in the clicked point as the exist attributes in the chosen layer. The layer must have items with numerical values in the table of attributes.",
es:"Inserte un gr&aacute;fico en el punto marcado seg&uacute;n los atributos existentes en el tema elejido. El tema debe tener puntos con valores num&eacute;ricos en la tabla de atributos",
it:"Inserire un grafico nel punto cliccato con gli attributi che esistono nel tema scelto. Il tema deve avere gli oggetti con valori numerici contenute nella tabella di attributi."
}],
"d24":[
{
pt:"Abre as ferramentas para sele&ccedil;&atilde;o de elementos de um tema. Os elementos selecionados podem ser utilizados em outras opera&ccedil;&ocirc;es, como buffer e sele&ccedil;&atilde;o por tema.",
en:"Opens the tools to select elements of a layer. The elements selected can be used in other buffer or selection operation by layer  .",
es:"Abre las herramientas para selecci&oacute;n de elementos de un tema. Los elementos seleccionados pueden utilizarse en otras ",
it:"Aprire gli strumenti per selezionare gli elementi di un tema. Gli elementi selezionati possono essere utilizzati in altre operazioni, come ad esempio buffer e selezione per tema."
}],
"d25":[
{
pt:"Insere texto no mapa clicando em um ponto. Utilize essa op&ccedil;&atilde;o para adicionar informa&ccedil;&ocirc;es ao mapa.",
en:"Insert text on the map by clicking on a point. Use this option to add information on the map.",
es:"Inserte texto en el mapa haciendo clic en un punto. Utilice esta opci&oacute;n para agregar informaci&oacute;n al mapa",
it:"Inserisci il testo sulla mappa cliccando su un punto. Utilizzare questa opzione per aggiungere informazioni alla mappa."
}],
"d26":[
{
pt:"Escolha o visual para os bot�es e outras caracter&iacute;sticas visuais do mapa",
en:"Choose look for the buttons and other map's visual characteristics",
es:"Elija la vista para los botones y otras caracter&iacute;sticas visuales del mapa",
it:"Scegli il visuale (??)  per i pulsanti e le altre caratteristiche visive della mappa."
}]
};
//YAHOO.log("carregou dicionario", "Classes i3geo");
/*
Title: Idioma

File: i3geo/classesjs/classe_idioma.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3geo.idioma

Tradu��o da interface principal.

Fornece os m�todos para traduzir frases para idiomas espec�ficos.

O dicion�rio � definido em i3geo/classesjs/dicionario.js

Se voc� est� customizando o i3geo,acrescentandonovas funcionalidades,
utilize o m�todo alteraDicionario para acrescentar novas tradu��es, dessa forma,
quandoo usu�rio escolher oidioma ainterface ser� adaptada corretamente.

Exemplos:

i3GEO.idioma.define("pt");

i3GEO.idioma.defineDicionario(g_traducao);

i3GEO.idioma.alteraDicionario("d22","novo oi");

alert($trad("d22"))
*/
i3GEO.idioma = {
	/*
	Property: MOSTRASELETOR
	
	Define se o i3Geo ir� incluir no mapa as bandeiras de sele��o de idiomas
	
	Type:
	{Boolean}
	
	Default:
	true
	*/
	MOSTRASELETOR: true,
	/*
	Property: IDSELETOR
	
	Define o id do elemento HTML que receber� o seletor. Se n�o for definido, o seletor ser�
	posicionado automaticamente pelo i3Geo
	
	Type:
	{String}
	
	Default:
	""
	*/
	IDSELETOR: "",
	/*
	Property: SELETORES
	
	Lista os seletores (bandeiras) que ser�o inclu�das no seletor
	
	Type:
	{Array}
	
	Default:
	"pt","en","es","it"
	*/
	SELETORES: new Array("pt","en","es","it"),
	/*
	Property: DICIONARIO
	
	Define o objeto com o dicion�rio utilizado
	*/
	DICIONARIO: g_traducao,
	/*
	Function: define
	
	Define qual o idioma em uso. O default � "pt". 
   
	Parameters:
	codigo - {String} C�digo do idioma.
	*/
	define: function(codigo) {
		i3GEO.idioma.ATUAL = codigo;
		i3GEO.util.insereCookie("i3geolingua",codigo);
	},
	/*
	Function: retornaAtual
	
	Retorna o idioma atual. 
       
	Returns:
	{string} C�digo do idioma.
	*/	
	retornaAtual: function() {
		return (i3GEO.idioma.ATUAL);
	},
	/*
	Function: defineDicionario
	
	Define o objeto com as tradu��es. O default � "g_traducao"
   
	Parameters:
	obj - {Object} Objeto com a tradu��o.
     
	Example:
	
	g_traducao = {
	
	"p1": [{
	
		pt:"texto em portugues",
		
		en:"texto em ingles",
		
		es:"texto em espanhol"
		
		}]
		
	}
	*/
	defineDicionario: function(obj) {
		i3GEO.idioma.DICIONARIO = obj;
	},
	/*
	Function: alteraDicionario
	
	Altera um texto do dicionario ou acresecenta um novo texto para o idioma atual. 
   
	Parameters:
	id - {String} C�digo do texto.
	novo - (String) Novo texto.
     
	*/
	alteraDicionario: function(id,novo) {
		i3GEO.idioma.DICIONARIO[id][0][i3GEO.idioma.ATUAL] = novo;
	},
	/*
	Function: traduzir
	
	Traduz um texto para o idioma escolhido
   
	Parameters:
	id - {String} C�digo do texto.
     
	Returns:
	{String} Texto traduzido.
	*/
	traduzir: function(id) {
		if(i3GEO.idioma.DICIONARIO[id]){
			//YAHOO.log("traduzir", "i3geo");
			var t = i3GEO.idioma.DICIONARIO[id][0];
			//YAHOO.log("Fim traduzir", "i3geo");
			return t[i3GEO.idioma.ATUAL];
		}
		else return;
	},
	/*
	Function: adicionaDicionario
	
	Adiciona novos registros ao dicion�rio atual
   
	Parameters:
	novodic - {Object} Objeto novo dicion�rio.
     
	Example:
	
	var novodic ={ 	"pp": [{
	
		pt:"texto em portugues",
		
		en:"texto em ingles",
		
		es:"texto em espanhol"
		
		}]}
		
	i3GEO.idioma.adicionaDicionario(novodic)
	
	alert($trad("pp"))
	*/
	adicionaDicionario: function(novodic) {
		for (k in novodic) { i3GEO.idioma.DICIONARIO[k] = novodic[k]; }
	},
	/*
	Function: mostraDicionario
	
	Abre uma nova janela do navegador com a lista de palavras do dicion�rio.
	*/
	mostraDicionario: function() {
		var w = window.open();
		for (k in i3GEO.idioma.DICIONARIO) { w.document.write(k+" = "+i3GEO.idioma.traduzir(k)+"<br>"); }
	},

	/*
	Function: trocaIdioma
	
	Troca o idioma atual por outro.
	
	A troca � baseada na defini��o de um cookie e reload da p�gina.
   
	Parameters:
	codigo - {String} C�digo do idioma (p.e. "en")
	*/
	trocaIdioma: function(codigo) {
		i3GEO.util.insereCookie("i3geolingua",codigo);
		window.location.reload(true)
	},
	/*
	Function: listaIdiomas
	
	Lista os idiomas dispon�veis no dicion�rio ativo
   
	Returns:
	{Array} Array com os c�digos de idioma dispon�veis.
	*/
	listaIdiomas: function() {
		for (k in i3GEO.idioma.DICIONARIO){
			return (i3GEO.util.listaChaves(i3GEO.idioma.DICIONARIO[k][0]));
		}
	},
	/*
	Function: mostraSeletor
	
	Inclui as bandeiras no mapa permitindo a sele��o do idioma
	
	As imagens das bandeiras devem estar definidas no CSS do i3geo, recebendo como identificadores
	os ids uk,brasil,italiano,espanhol
	*/
	mostraSeletor: function(){
		if(!i3GEO.idioma.MOSTRASELETOR){return;}
		//
		//monta o elemento HTML com as bandeiras
		//
		var ins = "";
		var n = i3GEO.idioma.SELETORES.length;
		for(i=0;i<n;i++){
			ins += '<img  style="padding:0 0px;top:-7px;padding-right:0px;border: 1px solid white;" src="'+i3GEO.util.$im("branco.gif")+'" onclick="i3GEO.idioma.trocaIdioma(\''+i3GEO.idioma.SELETORES[i]+'\')" ';
			if(i3GEO.idioma.SELETORES[i] == "en")
			ins += 'alt="Ingles" id="uk" />';
			if(i3GEO.idioma.SELETORES[i] == "pt")
			ins += 'alt="Portugues" id="brasil" />';
			if(i3GEO.idioma.SELETORES[i] == "es")
			ins += 'alt="Espanhol" id="espanhol" />';
			if(i3GEO.idioma.SELETORES[i] == "it")
			ins += 'alt="Italiano" id="italiano" />';
		}
		if(i3GEO.idioma.IDSELETOR != "" && $i(i3GEO.idioma.IDSELETOR))
		{$i(i3GEO.idioma.IDSELETOR).innerHTML = ins;}
		else{
			var pos = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.interface.IDMAPA))
			if(!$i("i3geoseletoridiomas")){
				var novoel = document.createElement("div");
				novoel.innerHTML = ins;
				novoel.id = "i3geoseletoridiomas";
				document.body.appendChild(novoel);
			}
			else
			{var novoel = $i("i3geoseletoridiomas");}
			novoel.style.position = "absolute";
			novoel.style.top = pos[1] - 17 +"px";
			novoel.style.left = pos[0]+"px";
			novoel.style.zIndex = 5000;
		}
	}
};
/*
Function: $trad

Atalho para a fun��o de tradu��o
  
Parameters:
id - {String} C�digo do texto.
    
Returns:
{String} Texto traduzido.
*/
var $trad = function(id){return (i3GEO.idioma.traduzir(id))};
//
	try {
		var c = i3GEO.util.pegaCookie("i3geolingua");
		if(c) {
			i3GEO.idioma.define(c);
			g_linguagem = c;
		}
		else {
			if(typeof(g_linguagem) != "undefined")
			{i3GEO.idioma.define(g_linguagem);}
			else {
				g_linguagem = "pt";
				i3GEO.idioma.define("pt");
			}
		}
		if(typeof('g_traducao') != "undefined")
		{i3GEO.idioma.defineDicionario(g_traducao);}
	}
	catch(e){alert("Problemas com idiomas "+e);};
//YAHOO.log("carregou classe idioma", "Classes i3geo");
/*
Title: PHP

File: i3geo/classesjs/classe_php.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Variable: cpJSON

Objeto CPAINT (ver biblioteca CPAINT) utilizado nas chamadas AJAX ass�ncronas com retorno no formato JSON

Exemplo:

	cpJSON.call()
	
Return:
	
	O objeto CPAINT retorna os dados encapsulados em um objeto JSON. Os programas PHP
	que fazem uso dessa biblioteca (CPAINT) devem fazer o include da mesma.
	Os dados de interesse retornados no objeto JSON, ficam embutidos na propriedade "data", por exemplo:
	
	var temp = function(retorno){alert(retorno.data);}
	
	cpJSON.call(p,"teste",temp);
	
	onde, p cont�m o nome do programa PHP e seus par�metros
	"teste" � o nome da fun��o PHP (no caso do i3Geo, isso n�o afeta em nada)
	e temp � a fun��o que tratar� o retorno dos dados.
	
*/
cpJSON = new cpaint();
cpJSON.set_response_type("JSON");
/*
Class: i3GEO.php

Chamadas em AJAX que executam programas no lado do servidor

Muitos dos par�metros exigidos pelos programas em PHP s�o obtidos da vari�vel
de se��o aberta no servidor quando o i3Geo � inicializado, � o caso por exemplo do nome
do arquivo correspondente ao mapfile atualmente em uso

Para mais detalhes sobre as fun��es, veja <mapa_controle.php>
*/
i3GEO.php = {
	/*
	Function: insereSHPgrafico
	
	PHP:
	classesphp/classe_shp.php
	
	<SHP->__construct>
	
	<SHP->insereSHPgrafico>
	*/
	insereSHPgrafico: function(funcao,tema,x,y,itens,shadow_height,width,inclinacao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=insereSHPgrafico&tipo=pizza&tema="+tema+"&x="+x+"&y="+y+"&itens="+itens+"&shadow_height="+shadow_height+"&width="+width+"&inclinacao="+inclinacao+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"insereSHPgrafico",funcao);
	},
	/*
	Function: insereSHP
	
	PHP:
	classesphp/classe_shp.php
	
	<SHP->__construct>
	
	<SHP->insereSHP>
	*/
	insereSHP: function(funcao,tema,item,valoritem,xy){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=insereSHP&item="+item+"&valor="+valoritem+"&tema="+tema+"&xy="+xy+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"insereSHPgrafico",funcao);
	},
	/*
	Function: pegaMensagens

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->pegaMensagens>	
	*/
	pegaMensagens: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegaMensagens&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"pegaMensagem",funcao);	
	},
	/*
	Function: areaPixel

	PHP:
	classesphp/funcoes_gerais.php
	
	<calculaAreaPixel>	
	*/
	areaPixel: function(funcao,g_celula){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=areaPixel&celsize="+g_celula+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"areaPixel",funcao);	
	},
	/*
	Function: excluitema

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->excluiTemas>	
	*/
	excluitema: function(funcao,tema){
		var p = i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php?funcao=excluitema&temas="+tema+"&g_sid="+i3GEO.arvoreDeCamadas.SID;
		cpJSON.call(p,"excluitema",funcao);	
	},
	/*
	Function: reordenatemas

	PHP:
	classesphp/classe_temas.php
	
	<Temas->reordenatemas>	
	*/
	reordenatemas: function(funcao,lista){
		var p = i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php?funcao=reordenatemas&lista="+lista+"&g_sid="+i3GEO.arvoreDeCamadas.SID;
		cpJSON.call(p,"reordenatemas",funcao);	
	},
	/*
	Function: criaLegendaHTML

	PHP:
	classesphp/classe_legenda.php
	
	<Legenda->__construct>
	
	<Legenda->criaLegenda>	
	*/
	criaLegendaHTML: function(funcao,tema,template){
		if(arguments.length == 1)
		{
			var tema = "";
			var template = "legenda2.htm";
		}
		if(arguments.length == 2)
		{var template = "legenda2.htm";}
		var p = i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&tema="+tema+"&templateLegenda="+template+"&g_sid="+i3GEO.arvoreDeCamadas.SID;
		cpJSON.call(p,"criaLegendaHTML",funcao);	
	},
	/*
	Function: inverteStatusClasse

	PHP:
	classesphp/classe_alteraclasse.php
	
	<Alteraclasse->__construct>
	
	<Alteraclasse->inverteStatusClasse>	
	*/
	inverteStatusClasse: function(funcao,tema,classe){
		var p = i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php?funcao=inverteStatusClasse&g_sid="+i3GEO.arvoreDeCamadas.SID+"&tema="+tema+"&classe="+classe;
		cpJSON.call(p,"inverteStatusClasse",funcao);	
	},
	/*
	Function: ligatemas

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->ligaDesligaTemas>	
	*/
	ligatemas: function(funcao,desligar,ligar){
		var p = i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php?funcao=ligatemas&desligar="+desligar+"&ligar="+ligar+"&g_sid="+i3GEO.arvoreDeCamadas.SID;
		cpJSON.call(p,"ligaDesligaTemas",funcao);	
	},
	/*
	Function: pegalistademenus

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->pegaListaDeMenus>	
	*/
	pegalistademenus: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegalistademenus&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"pegalistademenus",funcao);	
	},
	/*
	Function: pegalistademenus

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->pegaListaDeGrupos>	
	*/
	pegalistadegrupos: function(funcao,id_menu,listasgrupos){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadegrupos&map_file=&g_sid="+i3GEO.configura.sid+"&idmenu="+id_menu+"&listasistemas=nao&listasgrupos="+listasgrupos;
		cpJSON.call(p,"pegalistadegrupos",funcao);	
	},
	/*
	Function: pegalistadeSubgrupos

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->pegaListaDeSubGrupos>	
	*/
	pegalistadeSubgrupos: function(funcao,id_menu,id_grupo){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadeSubgrupos&g_sid="+i3GEO.configura.sid+"&idmenu="+id_menu+"&grupo="+id_grupo;
		cpJSON.call(p,"pegalistadeSubgrupos",funcao);	
	},
	/*
	Function: pegalistadetemas

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->pegaListaDeTemas>	
	*/
	pegalistadetemas: function(funcao,id_menu,id_grupo,id_subgrupo){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadetemas&g_sid="+i3GEO.configura.sid+"&idmenu="+id_menu+"&grupo="+id_grupo+"&subgrupo="+id_subgrupo;
		cpJSON.call(p,"pegalistadetemas",funcao);	
	},
	/*
	Function: pegaSistemas

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->pegaSistemas>	
	*/
	pegaSistemas: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegaSistemas&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"pegaSistemas",funcao);	
	},
	/*
	Function: listadrives

	<listaDrives>	
	*/
	listadrives: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=listaDrives&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"listaDrives",funcao);	
	},
	/*
	Function: listaarquivos

	<listaArquivos>	
	*/
	listaarquivos: function(funcao,caminho){
		var p = i3GEO.arvoreDeCamadas.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=listaArquivos&diretorio="+caminho;
		cpJSON.call(p,"listaArquivos",funcao);	
	},
	/*
	Function: geo2utm

	<geo2utm>	
	*/
	geo2utm: function(funcao,x,y){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=geo2utm&x="+x+"&y="+y+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"geo2utm",funcao);	
	},
	/*
	Function: desativacgi

	<desativacgi>	
	*/
	desativacgi: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=desativacgi&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"desativacgi",funcao);	
	},
	/*
	Function: pegaMapas

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->pegaListaDeMapas>	
	*/
	pegaMapas: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"pegaSistemas",funcao);	
	},
	/*
	Function: mudatamanho

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->mudaQS>	
	*/
	mudatamanho: function(funcao,altura,largura){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudatamanho&altura="+a+"&largura="+l+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"pegaSistemas",funcao);	
	},
	/*
	Function: ativalogo

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->ativalogo>	
	*/
	ativalogo: function(funcao,altura,largura){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=ativalogo&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"ativalogo",funcao);	
	},
	/*
	Function: insereAnnotation

	PHP:
	classesphp/classe_temas.php
	
	<Temas->insereFeature>	
	*/
	insereAnnotation: function(funcao,pin,xy,texto,position,partials,offsetx,offsety,minfeaturesize,mindistance,force,shadowcolor,shadowsizex,shadowsizey,outlinecolor,cor,sombray,sombrax,sombra,fundo,angulo,tamanho,fonte){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=inserefeature&pin="+pin+"&tipo=ANNOTATION&xy="+xy+"&texto="+texto+"&position="+position+"&partials="+partials+"&offsetx="+offsetx+"&offsety="+offsety+"&minfeaturesize="+minfeaturesize+"&mindistance="+mindistance+"&force="+force+"&shadowcolor="+shadowcolor+"&shadowsizex="+shadowsizex+"&shadowsizey="+shadowsizey+"&outlinecolor="+outlinecolor+"&cor="+cor+"&sombray="+sombray+"&sombrax="+sombrax+"&sombra="+sombra+"&fundo="+fundo+"&angulo="+angulo+"&tamanho="+tamanho+"&fonte="+fonte+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"inserefeature",funcao);	
	},
	/*
	Function: identificaunico

	PHP:
	classesphp/classe_atributos.php
	
	<Atributos->identificaQBP>	
	*/
	identificaunico: function(funcao,xy,tema,item){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=identificaunico&xy="+xy+"&resolucao=5&tema="+tema+"&item="+item+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"identificaunico",funcao);	
	},
	/*
	Function: recuperamapa

	PHP:
	classesphp/mapa_controle.php
	
	<recuperamapa>	
	*/
	recuperamapa: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=recuperamapa&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"recuperamapa",funcao);	
	},
	/*
	Function: criaLegendaImagem

	PHP:
	classesphp/classe_legenda.php
	
	<Atributos->legendaGrafica>	
	*/
	criaLegendaImagem: function(funcao){
		var p =i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaImagem&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"criaLegendaImagem",funcao);	
	},
	/*
	Function: referenciadinamica

	PHP:
	classesphp/funcoes_gerais.php
	
	<retornaReferenciaDinamica>	
	*/
	referenciadinamica: function(funcao,zoom){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=referenciadinamica&g_sid="+i3GEO.configura.sid+"&zoom="+zoom;
		cpJSON.call(p,"retornaReferenciaDinamica",funcao);	
	},
	/*
	Function: referencia

	PHP:
	classesphp/funcoes_gerais.php
	
	<retornaReferencia>	
	*/
	referencia: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=referencia&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"retornaReferencia",funcao);	
	},
	/*
	Function: pan

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->pan>	
	*/
	pan: function(funcao,escala,tipo,x,y){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+escala+"&tipo="+tipo+"&x="+x+"&y="+y+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"pan",funcao);	
	},
	/*
	Function: aproxima

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->aproxima>	
	*/
	aproxima: function(funcao,nivel){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=aproxima&nivel="+nivel+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"aproxima",funcao);	
	},
	/*
	Function: afasta

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->afasta>	
	*/
	afasta: function(funcao,nivel){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=afasta&nivel="+nivel+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"afasta",funcao);	
	},
	/*
	Function: zoomponto

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->zoomponto>	
	*/
	zoomponto: function(funcao,x,y){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&xy="+x+" "+y+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"zoomponto",funcao);	
	},
	/*
	Function: localizaIP

	PHP:
	classesphp/funccoes_gerais.php
	*/
	localizaIP: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=localizaIP&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"localizaIP",funcao);	
	},
	/*
	Function: mudaext

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->mudaExtensao>	
	*/
	mudaext: function(funcao,tipoimagem,ext){
		if(ext == 'undefined'){alert("extensao nao definida");return;}
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&tipoimagem="+tipoimagem+"&ext="+ext+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"mudaext",funcao);	
	},
	/*
	Function: mudaescala

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->mudaEscala>	
	*/
	mudaescala: function(funcao,escala){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudaescala&escala="+escala+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"mudaescala",funcao);	
	},
	/*
	Function: aplicaResolucao

	PHP:
	classesphp/classe_navegacao.php
	
	<Navegacao->aplicaResolucao>	
	*/
	aplicaResolucao: function(funcao,resolucao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=crialente&resolucao="+resolucao+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"crialente",funcao);	
	},
	/*
	Function: geradestaque

	PHP:
	classesphp/classe_temas.php
	
	<Temas->geraDestaque>	
	*/
	geradestaque: function(funcao,tema){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=geradestaque&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"geradestaque",funcao);	
	},
	/*
	Function: selecaopt

	PHP:
	classesphp/classe_selecao.php
	
	<Selecao->selecaoPT>	
	*/
	selecaopt: function(funcao,tema,xy,tipo,tolerancia){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=selecaopt&tema="+tema+"&tipo="+tipo+"&xy="+xy+"&tolerancia="+tolerancia+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"selecaoPT",funcao);	
	},
	/*
	Function: selecaobox

	PHP:
	classesphp/classe_selecao.php
	
	<Selecao->selecaoBOX>	
	*/
	selecaobox: function(funcao,tema,tipo,box){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=selecaobox&ext="+box+"&g_sid="+i3GEO.configura.sid+"&tipo="+tipo+"&tema="+tema;
		cpJSON.call(p,"selecaobox",funcao);	
	},
	/*
	Function: sobetema

	PHP:
	classesphp/classe_temas.php
	
	<Temas->sobeTema>	
	*/
	sobetema: function(funcao,tema){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=sobetema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"sobetema",funcao);	
	},
	/*
	Function: sobetema

	PHP:
	classesphp/classe_temas.php
	
	<Temas->desceTema>	
	*/
	descetema: function(funcao,tema){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?&funcao=descetema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"descetema",funcao);	
	},
	/*
	Function: zoomtema

	PHP:
	classesphp/classe_temas.php
	
	<Temas->zoomTema>	
	*/
	zoomtema: function(funcao,tema){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=zoomtema&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"zoomtema",funcao);	
	},
	/*
	Function: limpasel

	PHP:
	classesphp/classe_selecao.php
	
	<Selecao->selecaoLimpa>	
	*/
	limpasel: function(funcao,tema){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=limpasel&tema="+tema+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"limpasel",funcao);	
	},
	/*
	Function: mudatransp

	PHP:
	classesphp/classe_temas.php
	
	<Temas->mudaTransparencia>	
	*/
	mudatransp: function(funcao,tema,valor){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudatransp&tema="+tema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"mudatransp",funcao);	
	},
	/*
	Function: mudanome

	PHP:
	classesphp/classe_temas.php
	
	<Temas->mudaTransparencia>	
	*/
	mudanome: function(funcao,tema,valor){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudanome&tema="+tema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"mudanome",funcao);	
	},
	/*
	Function: adicionaTemaSHP

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->adicionaTemaSHP>	
	*/
	adicionaTemaSHP: function(funcao,path){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=adicionaTemaSHP&arq="+path;
		cpJSON.call(p,"adicionaTemaSHP",funcao);	
	},
	/*
	Function: adicionaTemaIMG

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->adicionaTemaIMG>	
	*/
	adicionaTemaIMG: function(funcao,path){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=adicionaTemaIMG&arq="+path;
		cpJSON.call(p,"adicionaTemaIMG",funcao);	
	},
	/*
	Function: identifica

	PHP:
	classesphp/classe_atributos.php
	
	<Atributos->identifica>	
	*/
	identifica: function(funcao,x,y,resolucao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=identifica&opcao=tip&xy="+x+","+y+"&resolucao=5&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"identifica",funcao);	
	},
	/*
	Function: reiniciaMapa

	PHP:
	classesphp/mapa_controle.php
	*/
	reiniciaMapa: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=reiniciaMapa&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"reiniciaMapa",funcao);	
	},
	/*
	Function: procurartemas

	PHP:
	classesphp/classe_menutemas.php
	
	<Menutemas->procurartemas>	
	*/
	procurartemas: function(funcao,procurar){
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=procurartemas&procurar="+procurar+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"procurartemas",funcao);	
	},
	/*
	Function: adtema

	PHP:
	classesphp/classe_mapa.php
	
	<Mapa->adicionaTema>	
	*/
	adtema: function(funcao,temas){
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=adtema&temas="+temas+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"adtema",funcao);	
	},
	/*
	Function: escalagrafica

	PHP:
	classesphp/classe_escala.php
	
	<Escala->retornaBarraEscala>	
	*/
	escalagrafica: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=escalagrafica&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"escalagrafica",funcao);	
	},
	/*
	Function: flamingo

	PHP:
	classesphp/mapa_controle.php
	
	<montaFlamingo>	
	*/
	flamingo: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=montaFlamingo&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"montaFlamingo",funcao);	
	},
	/*
	Function: openlayers

	PHP:
	classesphp/mapa_controle.php
	
	<openlayers>	
	*/
	openlayers: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=openlayers&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"openlayers",funcao);	
	},
	/*
	Function: corpo

	PHP:
	classesphp/mapa_controle.php
	
	<redesenhaMapa>	
	*/
	corpo: function(funcao,tipoimagem){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=corpo&tipoimagem="+tipoimagem+"&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"corpo",funcao);	
	},
	/*
	Function: criamapa

	PHP:
	classesphp/mapa_controle.php
	
	<criaMapa>	
	*/
	criamapa: function(funcao,parametros){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa&"+parametros;
		cpJSON.call(p,"criaMapa",funcao);	
	},
	/*
	Function: inicia

	PHP:
	classesphp/mapa_controle.php
	
	<iniciaMapa>	
	*/
	inicia: function(funcao,embedLegenda,w,h){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=inicia&embedLegenda="+embedLegenda+"&w="+w+"&h="+h+"&g_sid="+i3GEO.configura.sid+"&interface="+i3GEO.interface.ATUAL;
		cpJSON.call(p,"iniciaMapa",funcao);	
	},
	/*
	Function: chaveGoogle

	PHP:
	classesphp/mapa_controle.php
	
	<chavegoogle>	
	*/
	chaveGoogle: function(funcao){
		var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=chavegoogle&g_sid="+i3GEO.configura.sid;
		cpJSON.call(p,"chavegoogle",funcao);	
	}
};
//YAHOO.log("carregou classe php", "Classes i3geo");
/*
Title: Configura��es gerais

File: i3geo/classesjs/classe_configura.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.configura

Configura��o do i3geo

Define os par�metros vari�veis do i3geo. Vc pode alterar com esta classe a maioria dos par�metros que controlam
o funcionamento do i3geo.
*/
i3GEO.configura = {
	/*
	Variable: oMenuData

	Itens inclu�dos no menu suspenso. Define os par�metros para o gadget menu suspenso

	Par�metros:

	text - texto que ser�mostrado na tela

	url - fun��o que ser� executada
	*/
	oMenuData: {
		"ajudas": [ 
		{ text: $trad("u1"), url: "http://www.softwarepublico.gov.br/spb/ver-comunidade?community_id=1444332" },
		{ text: $trad("u2"), url: "javascript:i3GEO.ajuda.abreDoc()" },
		{ text: $trad("u3"), url: "http://pt.wikibooks.org/wiki/I3geo" },
		{ text: $trad("u4"), url: "http://mapas.mma.gov.br/wikibooki3geo" },
		{ text: $trad("u5a"), url: "http://www.softwarepublico.gov.br" },
		{ text: "i3Geo Blog", url: "http://sistemas.mma.gov.br/blogs/index.php?blog=6" }
		],
		"analise": [
    	{ text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u22")+'</b></span>',url: "#"}, 
		{ text: $trad("u7"), url: "javascript:i3GEO.analise.dialogo.gradePol()"},
		{ text: $trad("u8"), url: "javascript:i3GEO.analise.dialogo.gradePontos()" },
		{ text: $trad("u9"), url: "javascript:i3GEO.analise.dialogo.gradeHex()" },
    	{ text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u23")+'</b></span>',url: "#"}, 
		{ text: $trad("u11a"), url: "javascript:i3GEO.analise.dialogo.distanciaptpt()" },
		{ text: $trad("u12"), url: "javascript:i3GEO.analise.dialogo.nptPol()" },
		{ text: $trad("u13"), url: "javascript:i3GEO.analise.dialogo.pontoempoligono()" },
		{ text: $trad("u14"), url: "javascript:i3GEO.analise.dialogo.pontosdistri()" },
    	{ text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u24")+'</b></span>',url: "#"}, 
		{ text: $trad("u11"), url: "javascript:i3GEO.analise.dialogo.centroide()" },
		{ text: $trad("u25"), url: "javascript:i3GEO.analise.dialogo.dissolve()" },
    	{ text: '<span style=color:gray;text-decoration:underline; ><b>'+$trad("u27")+'</b></span>',url: "#"}, 
		{ text: $trad("u6"), url: "javascript:i3GEO.analise.dialogo.analisaGeometrias()" },
		{ text: $trad("u10"), url: "javascript:i3GEO.analise.dialogo.buffer()" },
		{ text: $trad("u26"), url: "javascript:i3GEO.analise.dialogo.agrupaElementos()" }
		],
		"janelas": [
		{ text: $trad("u15"), url: "javascript:initJanelaZoom('1');initJanelaZoom('2')" },
		{ text: $trad("u16"), url: "javascript:i3GEO.ajuda.abreJanela()" }        
		],
		"arquivo": [
		{ text: $trad("u17"), url: "javascript:i3GEO.mapa.dialogo.salvaMapa()" },
		{ text: $trad("u18"), url: "javascript:i3GEO.mapa.dialogo.carregaMapa()" },
		{ text: $trad("u19"), url: "javascript:i3GEO.gadgets.quadros.listaImagens()" },
		{ text: $trad("u20"), url: "javascript:i3GEO.mapa.dialogo.convertews()" },
		{ text: $trad("u21"), url: "../geradordelinks.htm" }
		]
	},
	/*
	Variable: tipoimagem

	Indica o tipo de filtro de imagem que est� ativo.
	O filtro ativo � aplicado sobre a imagem toda a vez que o mapa � refeito.
	*/
	tipoimagem: "nenhum",
	/*
	Variable: tipotip
	
	Tipo de tip que � mostrado na fun��o de identifica��o quando o usu�rio estaciona o mouse sobre o mapa
	
	Type:
	{completo|simples|balao}
	*/
	tipotip: "balao",
	/*
	Variable: funcaoTip
	
	Fun��o que ser� executada na opera��o de identifica��o quando o usu�rio estaciona o mouse sobre o mapa
	
	Type:
	{String}
	*/
	funcaoTip: "verificaTipDefault()",
	/*
	Variable: diminuixM

	Diminui a largura do mapa em pixels no caso do navegador ser o IE.
	Valores definidos em pixel.
	*/
	diminuixM: 20,
	/*
	Variable: diminuixN

	Diminui a largura do mapa em pixels no caso do navegador ser o FF.
	Valores definidos em pixel.
	*/
	diminuixN: 11,
	/*
	Variable: diminuiyM

	Diminui a altura do mapa em pixels no caso do navegador ser o IE.
	Valores definidos em pixel.
	*/
	diminuiyM: 106,
	/*
	Variable: diminuiyN

	Diminui a altura do mapa em pixels no caso do navegador ser o FF.
	Valores definidos em pixel.
	*/
	diminuiyN: 103,
	/*
	Variable: map3d

	Vari�vel que define o nome do map_file que possu� o layer para uso na fun��o 3d.
	Pode ser utilizado o caminho completo, se n�o, busca no diret�rio aplicmap.

	O mapfile deve conter um layer para c�lculo dos valores de Z para compor o modelo do relevo
	sobre o qual o mapa ser� desenhado.

	Por padr�o, o i3geo utiliza o mapfile aplicmpa/3dmap.map
	*/
	map3d: "",
	/*
	Variable: embedLegenda

	Indica se a legenda deve ser incluida no corpo do mapa.

	Type:
	{sim|nao}
	*/
	embedLegenda: "nao",
	/*
	Variable: templateLegenda

	Template HTML que ser� utilizado na gera��o da legenda HTML.

	A sintaxe utilizada na montagem do template � baseado na sintaxe do pr�prio Mapserver.
	O HTML pode ser armazenado em i3geo/aplicmap ou em um outro endere�o no servidor.
	O template serve para definir o layout da legenda que � mostrada quando a guia legenda � ativada.
	Se for definido como "", � utilizado o template i3geo/aplicmapa/legenda.htm.
	*/
	templateLegenda: "",
	/*
	Variable: mashuppar
	
	Define os par�metros que devem ser aplicados no modo mashup
	
	O modo mashup possibilita que o i3Geo seja embutido dentro de uma p�gina HTML. Nesse
	caso, o mapa n�o � criado no modo convencional, que utiliza o programa i3geo/ms_criamapa.php
	A variavel mashuppar deve conter os par�metros que s�o utilizados pelo programa ms_criamapa
	
	Exemplo:
	
	i3GEO.configura.mashuppar = "&pontos=-54 -12&temasa=biomas&layers=biomas"
	*/
	mashuppar: "",
	/*
	Variable: sid
	
	C�digo da se��o aberta pelo i3Geo no servidor.
	
	O c�digo � gerado na inicializa��o do i3Geo pelo programa ms_criamapa.php
	
	Type:
	{String}
	*/
	sid: "",
	/*
	Variable: locaplic
	
	Localiza��o da instala��o do i3geo (URI)
	
	Por default, � definida na inicializa��o do i3Geo com o uso do i3GEO.util

	Type:
	{URI}
	*/
	locaplic: "",
	/*
	Variable: mapaRefDisplay
	
	Indica se o mapa de refer�ncia dever� ser aberto quando o i3Geo for inicializado.
	
	Type:
	{style.display}
	*/
	mapaRefDisplay: "block",
	/*
	Variable: visual
	
	Tipo de visual que ser� utilizado no mapa.
	
	A lista de visuais existentes � obtida na inicializa��o do i3geo.
	
	Veja o diret�rio i3geo/imagens/visual

	Type:
	{String}
	*/
	visual: "default",
	/*
	Variable: cursores
	
	Imagens utilizadas para os cursores do mouse mostrados no mapa	

	Type:
	{JSON}
	*/
	cursores: {
		"identifica":
		{ff:"/imagens/cursores/identifica.png",ie:"/imagens/cursores/identifica.cur"},
		"pan":
		{ff:"/imagens/cursores/pan.png",ie:"/imagens/cursores/pan.cur"},
		"area":
		{ff:"/imagens/cursores/area.png",ie:"/imagens/cursores/area.cur"},
		"distancia":
		{ff:"/imagens/cursores/distancia.png",ie:"/imagens/cursores/distancia.cur"},
		"zoom":
		{ff:"/imagens/cursores/zoom.png",ie:"/imagens/cursores/zoom.cur"}
	},
	/*
	Variable: listaDePropriedadesDoMapa
	
	Lista com as fun��es que s�o inclu�das no item "Propriedades do mapa"	

	Type:
	{JSON}
	*/
	listaDePropriedadesDoMapa: {
		"propriedades": [
		{ text: "p2", url: "javascript:i3GEO.mapa.dialogo.tipoimagem()"},
		{ text: "p3", url: "javascript:i3GEO.mapa.dialogo.opcoesLegenda()"},
		{ text: "p4", url: "javascript:i3GEO.mapa.dialogo.opcoesEscala()"},
		{ text: "p5", url: "javascript:i3GEO.mapa.dialogo.tamanho()"},
		{ text: "p6", url: "javascript:i3GEO.navega.entorno.ativaDesativa()"},
		{ text: "p7", url: "javascript:i3GEO.mapa.ativaLogo()"},
		{ text: "p8", url: "javascript:i3GEO.mapa.dialogo.queryMap()"},
		{ text: "p9", url: "javascript:i3GEO.mapa.dialogo.corFundo()"},
		{ text: "p10", url: "javascript:i3GEO.mapa.dialogo.gradeCoord()"},
		{ text: "p11", url: "javascript:i3GEO.mapa.dialogo.template()"},
		{ text: "p12", url: "javascript:i3GEO.mapa.dialogo.autoredesenha()"}
		]
	},
	/*
	Variable: tempoAplicar
	
	Tempo em milisegundos que ser� esperado at� que o mapa seja desenhado automaticamente.
	
	Utilizado no bot�o Aplicar, quando o usu�rio liga/desliga ou adiciona umtema
	
	Type:
	{Numeric}
	*/
	tempoAplicar: 4000,
	/*
	Variable: tempoMouseParado
	
	Tempo em milisegundos que ser� esperado para detectar que o mouse est� parado.
	
	Controla o lapso de tempo utilizado para disparar as fun��es que ocorrem quando o mouse est� parado sobre o mapa
	
	Type:
	{Numeric}
	*/
	tempoMouseParado: 3500,
	/*
	Variable: iniciaJanelaMensagens
	
	Inicia o i3geo com a janela de mensagens aberta ou fechada.
	
	Se o cookie g_janelaMen estiver definido, essa vari�vel n�o ter� efeito

	Type:
	{Boolean}
	*/
	iniciaJanelaMensagens: true,
	/*
	Variable: mostraRosaDosVentos
	
	Mostra ou n�o a rosa dos ventos sob o mouse quando estiver parado.

	Type:
	{sim|nao}
	*/	
	mostraRosaDosVentos: "nao",
	/*
	Variable: liberaGuias
	
	Indica se as guias ser�o montadas em uma janela flutuante sobre o mapa
	
	Type:
	{sim|nao}
	*/
	liberaGuias: "nao",
	/*
	Variable: entorno
	
	Define se o entorno do mapa ser� desenhado tamb�m
	
	O desenho do entorno permite a navega��o no mapa no estilo "tiles"
	
	Type:
	{sim|nao}
	*/
	entorno: "nao",
	/*
	Variable: funcoesBotoes

	Objeto com a lista de funcionalidades que ser�o adicionadas ao mapa.

	Essa lista pode ser modificada antes da inicializa��o do mapa.

	A montagem das opera��es � feita no iniciamma.js.

	As funcionalidades apenas s�o inclu�das se o elemento HTML indicado em iddiv existir. Por isso, caso uma fun��o n�o seja desejada, basta excluir o div do HTML utilizado no mapa.

	Type:
	{JSON}

	Par�metros:

	iddiv - id do elemento onde a ferramenta ser� inclu�da

	dica - dica de tela que ser� acrescentada ao evento onmouseover

	conteudo - conteudo de iddiv que ser� acrescentado como innerHTML

	funcaoonclick - funcao que ser� incluida no onclick

	constroiconteudo - fun��o que ativar� a op��o. Essa op��o atua como a op��o conte�do, por�m, executa uma fun��o para preenchimento do div.

	*/
	funcoesBotoes: {
		"botoes": [
		{
			//Insere a op��o de zoom anterior e posterior.
			iddiv:"historicozoom",
			tipo:"",
			dica:$trad("d1"),
			constroiconteudo:'i3GEO.gadgets.mostraHistoricoZoom()'
		},
		{
			//Ativa o bot�o que realiza a opera��o de zoom para a extens�o total do mapa.
			iddiv:"zoomtot",
			tipo:"",
			dica:$trad("d2"),
			funcaoonclick:function(){
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,i3GEO.configura.tipoimagem,i3GEO.parametros.extentTotal);
				marcadorZoom = "";
			}
		},
		{
			//Ativa o bot�o que realiza a opera��o de zoom interativo.
			iddiv:"zoomli",
			tipo:"dinamico",
			dica:$trad("d3"),
			funcaoonclick:function(){
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","img",i3GEO.configura.locaplic);
				if(!$i("i3geoboxZoom"))
				i3GEO.navega.zoomBox.criaBox();
				g_operacao='navega';
				g_tipoacao='zoomli';
				i3GEO.barraDeBotoes.ativaIcone("zoomli");
				marcadorZoom = "";
				if(i3GEO.eventos.MOUSEDOWN.toString().search("i3GEO.navega.zoomBox.inicia()") < 0)
				{i3GEO.eventos.MOUSEDOWN.push("i3GEO.navega.zoomBox.inicia()");}
				if(i3GEO.eventos.MOUSEUP.toString().search("i3GEO.navega.zoomBox.termina()") < 0)
				{i3GEO.eventos.MOUSEUP.push("i3GEO.navega.zoomBox.termina()");}
			}
		},
		{
			//Ativa o bot�o que realiza a opera��o de deslocamento (pan).
			iddiv:"pan",
			tipo:"dinamico",
			dica:$trad("d4"),
			funcaoonclick:function(){
				g_tipoacao='pan';
				g_operacao='navega';
				i3GEO.barraDeBotoes.ativaIcone("pan");
				if($i(i3GEO.interface.IDMAPA)){
					$i(i3GEO.interface.IDMAPA).title = "";
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"pan",i3GEO.interface.IDMAPA,i3GEO.configura.locaplic);
				}
				marcadorZoom = "";
				panMapaInicia = function(){
					if ($i("img") && (g_tipoacao == "pan")){
						g_panM = "sim";
						if($i("corpoMapa")){
							leftinicial = parseInt($i(i3GEO.interface.IDCORPO).style.left);
							topinicial = parseInt($i(i3GEO.interface.IDCORPO).style.top);
						}
						clicinicialx = objposicaocursor.imgx;
						clicinicialy = objposicaocursor.imgy;
						ddinicialx = objposicaocursor.ddx;
						ddinicialy = objposicaocursor.ddy;
					}
				};
				panMapaDesloca = function(){
					if ($i(i3GEO.interface.IDMAPA) && (g_panM == "sim")){
						var nx = objposicaocursor.telax - leftinicial - clicinicialx;
						var ny = objposicaocursor.telay - topinicial - clicinicialy;
						if (i3GEO.configura.entorno == "nao"){
							var l = 0;
							if (parseInt($i("i3geo").style.left))
							{var l = parseInt($i("i3geo").style.left);}
							$i(i3GEO.interface.IDMAPA).style.left = nx - l;
							var t = 0;
							if (parseInt($i("i3geo").style.top))
							{var t = parseInt($i("i3geo").style.top);}
							$i(i3GEO.interface.IDMAPA).style.top = ny - t;
						}
						else{
							$left("img",i3GEO.parametros.w*-1 + nx);
							$left("imgS",i3GEO.parametros.w*-1 + nx);
							$left("imgL",i3GEO.parametros.w + nx);
							$left("imgO",i3GEO.parametros.w*-3 + nx);
							$left("imgN",i3GEO.parametros.w*-1 + nx);
							$top("img",i3GEO.parametros.h*-1 + ny);
							$top("imgS",i3GEO.parametros.h*-1 + ny);
							$top("imgL",i3GEO.parametros.h*-1 + ny);
							$top("imgN",i3GEO.parametros.h*-1 + ny);
							$top("imgO",i3GEO.parametros.h*-1 + ny);
						}
					}
				};
				panMapaTermina = function(){
					if (g_tipoacao == "pan"){
						marcadorZoom = "";
						g_panM = "nao";
						var res = i3GEO.navega.xy2xy(i3GEO.configura.locaplic,i3GEO.configura.sid,ddinicialx,ddinicialy,objposicaocursor.ddx,objposicaocursor.ddy,i3GEO.parametros.mapexten,i3GEO.configura.tipoimagem);
						if(res == false){i3GEO.navega.zoompontoIMG(i3GEO.configura.locaplic,i3GEO.configura.sid,objposicaocursor.imgx,objposicaocursor.imgy)}
					}
				};
				if(i3GEO.eventos.MOUSEDOWN.toString().search("panMapaInicia()") < 0)
				{i3GEO.eventos.MOUSEDOWN.push("panMapaInicia()");}
				if(i3GEO.eventos.MOUSEMOVE.toString().search("panMapaDesloca()") < 0)
				{i3GEO.eventos.MOUSEMOVE.push("panMapaDesloca()");}
				if(i3GEO.eventos.MOUSEUP.toString().search("panMapaTermina()") < 0)
				{i3GEO.eventos.MOUSEUP.push("panMapaTermina()");}
			}
		},
		{
			//bot�o que realiza a opera��o de zoom in.
			iddiv:"zoomiauto",
			tipo:"",
			dica:$trad("d5"),
			funcaoonclick:function(){
				i3GEO.navega.zoomin(i3GEO.configura.locaplic,i3GEO.configura.sid);
				marcadorZoom = "";
			}
		},
		{
			//bot�o que realiza a opera��o de zoom out
			iddiv:"zoomoauto",
			tipo:"",
			dica:$trad("d6"),
			funcaoonclick:function(){
				i3GEO.navega.zoomout(i3GEO.configura.locaplic,i3GEO.configura.sid);
				marcadorZoom = "";
			}
		},
		{
			//bot�o que abre a fun��o de identifica��o.
			iddiv:"identifica",
			tipo:"dinamico",
			dica:$trad("d7"),
			funcaoonclick:function()
			{
				if($i("img")){
					$i("img").title = "";
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"identifica","img",i3GEO.configura.locaplic);
				}
				i3GEO.barraDeBotoes.ativaIcone("identifica");
				g_tipoacao='identifica';
				g_operacao='identifica';
				cliqueIdentifica = function(){
					if (g_tipoacao == "identifica"){
						i3GEO.eventos.MOUSEPARADO.remove("verificaTip()");
						var janela = i3GEO.janela.cria("450px","250px",i3GEO.configura.locaplic+'/ferramentas/identifica/index.htm?&x='+objposicaocursor.ddx+'&y='+objposicaocursor.ddy+'&escala='+i3GEO.parametros.mapscale,"","","Identifica");
						var temp = function(){
							i3GEO.eventos.MOUSECLIQUE.remove("cliqueIdentifica()");
							i3GEO.barraDeBotoes.ativaBotoes();
						};
						if(i3GEO.interface.ATUAL != "googlemaps")
						YAHOO.util.Event.addListener(janela[0].close, "click", temp);
					}
				};
				verificaTip = function(){
					if (g_operacao != "identifica"){return;}
					//funcao default para pegar os dados
					verificaTipDefault = function(){
						var retorna = function(retorno){
							var i = $i("i3geo_rosa");
							if(i){i.style.display="none";}			
							var mostra = false;
							try{
								var retorno = retorno.data;
								if ($i("img"))
								{$i("img").title = "";}
								if (retorno != ""){
									var res = "";
									var temas = retorno.split("!");
									var tema = temas.length-1;
									if(tema >= 0){
										do{
											var titulo = temas[tema].split("@");
											if (i3GEO.configura.tipotip == "completo" || i3GEO.configura.tipotip == "balao")
											{res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";}
											var ocorrencias = titulo[1].split("*");
											var ocorrencia = ocorrencias.length-1;
											if(ocorrencia >= 0){
												do{
													if (ocorrencias[ocorrencia] != ""){
														var pares = ocorrencias[ocorrencia].split("##");
														var paresi = pares.length;
														for (var par=0;par<paresi; par++){
															var valores = pares[par].split("#");
															if (i3GEO.configura.tipotip == "completo" || i3GEO.configura.tipotip == "balao"){
																res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
																var mostra = true;
															}
															else{
																res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'><i>" + valores[1] + "</i></span><br>";
																var mostra = true;
															}
														}
													}
												}
												while(ocorrencia--)
											}
										}
										while(tema--)
									}
									if(!mostra){$i("tip").style.display="none";return;}
									else{		
										if(i3GEO.configura.tipotip != "balao"){
											var n = i3GEO.janela.tip();
											$i(n).style.textAlign="left";
											$i(n).innerHTML += res;
										}
										else{
											var nn = i3GEO.janela.tip("<img id='teste' src='"+i3GEO.configura.locaplic+"/imagens/grabber.gif' />");
											balloon = new Balloon;
											balloon.delayTime = 0;
											var res = "<div style=text-align:left >"+res+"</div>";
											//$i(nn+"cabecatip").onmouseover = function(evt){balloon.showTooltip(evt,res);};
											balloon.showTooltip($i("teste"),res);
										}
									}
								}
							}
						catch(e){}
						};
						i3GEO.php.identifica(retorna,objposicaocursor.ddx,objposicaocursor.ddy,"5");
					};				
					if (g_operacao == "identifica"){
						eval(i3GEO.configura.funcaoTip);
					}
				};
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("cliqueIdentifica()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("cliqueIdentifica()");}
				if(i3GEO.eventos.MOUSEPARADO.toString().search("verificaTip()") < 0)
				{i3GEO.eventos.MOUSEPARADO.push("verificaTip()");}
			}
		},
		{
			//bot�o que abre a janela com o valor da extens�o geogr�fica do mapa atual
			iddiv:"exten",
			tipo:"",
			dica:$trad("d8"),
			funcaoonclick:function()
			{i3GEO.janela.cria("450px","340px",i3GEO.configura.locaplic+"/ferramentas/mostraexten/index.htm","","","Extens�o geogr�fica");}
		},
		{
			//bot�o que abre a janela com o mapa de refer�ncia
			iddiv:"referencia",
			tipo:"",
			dica:$trad("d9"),
			funcaoonclick:function()
			{i3GEO.maparef.inicia();}
		},
		{
			//bot�o de busca na wikipedia
			iddiv:"wiki",
			tipo:"",
			dica:$trad("d11"),
			funcaoonclick:function(){
				g_operacao = "navega";
				i3GEO.janela.cria("450px","190px",i3GEO.configura.locaplic+"/ferramentas/wiki/index.htm","","","Wiki");
				atualizawiki = function(){
					if(!$i("wdocai"))
					{i3GEO.eventos.NAVEGAMAPA.remove("atualizawiki()");return;}
					var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
					if (docel.getElementById("resultadowiki"))
					{$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/wiki/index.htm";}
					else
					{i3GEO.eventos.NAVEGAMAPA.remove("atualizawiki()");}
				};
				if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizawiki()") < 0)
				{i3GEO.eventos.NAVEGAMAPA.push("atualizawiki()");}		
			}
		},
		{
			//bot�o de busca de fotos
			iddiv:"buscafotos",
			tipo:"",
			dica:"Fotos",
			funcaoonclick:function(){
				g_operacao = "navega";
				i3GEO.janela.cria("550px","400px",i3GEO.configura.locaplic+"/ferramentas/buscafotos/index.htm","","","Fotos");
				i3GEO.util.criaPin();
			}
		},
		{
			//bot�o de impress�o
			iddiv:"imprimir",
			tipo:"",
			dica:$trad("d12"),
			funcaoonclick:function()
			{i3GEO.janela.cria("320px","180px",i3GEO.configura.locaplic+"/ferramentas/imprimir/index.htm","","","Imprimir");}
		},
		{
			//bot�o de localiza��o do usu�rio pelo IP
			iddiv:"ondeestou",
			tipo:"",
			dica:$trad("d13"),
			funcaoonclick:function()
			{i3GEO.navega.zoomIP(i3GEO.configura.locaplic,i3GEO.configura.sid);}
		},
		{
			//abre a op��o de gera��o de um modelo virtual de eleva��o
			iddiv:"v3d",
			tipo:"",
			dica:$trad("d14"),
			funcaoonclick:function()
			{i3GEO.janela.cria("400px","200px",i3GEO.configura.locaplic+"/ferramentas/3d/index.htm","","","3d");}
		},
		{
			//Ativa o bot�o que realiza a opera��o de de busca no Google
			iddiv:"google",
			tipo:"",
			dica:$trad("d15"),
			funcaoonclick:function(){
				i3GEO.util.criaBox();
				g_operacao = "navega";
				if(navn){i3GEO.janela.cria((i3GEO.parametros.w/2)+40+"px",(i3GEO.parametros.h/2)+50+"px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps");}
				else
				{i3GEO.janela.cria("500px","380px",i3GEO.configura.locaplic+"/ferramentas/googlemaps/index.php","","","Google maps");}
				atualizagoogle = function(){
					try{
						if (navn){
							if ($i("wdocai"))
							{var doc = $i("wdocai").contentDocument;}
						}
						else{
							if(document.frames("wdocai"))
							{var doc = document.frames("wdocai").document;}
						}
						if(window.parent.frames["wdocai"].panTogoogle)
						{window.parent.frames["wdocai"].panTogoogle();}
						else{i3GEO.eventos.NAVEGAMAPA.remove("atualizagoogle()");}
						
					}
					catch(e){i3GEO.eventos.NAVEGAMAPA.remove("atualizagoogle()");}
				};		
				if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizagoogle()") < 0)
				{i3GEO.eventos.NAVEGAMAPA.push("atualizagoogle()");}		
			}
		},
		{
			//Ativa o bot�o que realiza a opera��o de de busca no site Scielo
			iddiv:"scielo",
			tipo:"",
			dica:$trad("d16"),
			funcaoonclick:function(){
				g_operacao = "navega";
				i3GEO.janela.cria("450px","190px",i3GEO.configura.locaplic+"/ferramentas/scielo/index.htm","","","Scielo");
				atualizascielo = function(){
					try{
						var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
						if (docel.getElementById("resultadoscielo"))
						{$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/scielo/index.htm";}
						else
						{i3GEO.eventos.NAVEGAMAPA.remove("atualizascielo()");}
					}
					catch(e){i3GEO.eventos.NAVEGAMAPA.remove("atualizascielo()");}
				};
				if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizascielo()") < 0)
				{i3GEO.eventos.NAVEGAMAPA.push("atualizascielo()");}
			}
		},
		{
			//Ativa o bot�o que realiza a opera��o de de busca no site confluence
			iddiv:"confluence",
			tipo:"",
			dica:$trad("d17"),	
			funcaoonclick:function(){
				g_operacao = "navega";
				i3GEO.janela.cria("250px","190px",i3GEO.configura.locaplic+"/ferramentas/confluence/index.htm","","","confluence");
				i3GEO.util.criaBox();
				atualizaconfluence = function(){
					if(!$i("wdocai"))
					{i3GEO.eventos.NAVEGAMAPA.remove("atualizaconfluence()");return;}
					var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
					if (docel.getElementById("resultadoconfluence"))
					{$i("wdocai").src = i3GEO.configura.locaplic+"/ferramentas/confluence/index.htm";}
					else
					{i3GEO.eventos.NAVEGAMAPA.remove("atualizaconfluence()")}
				};
				if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaconfluence()") < 0)
				{i3GEO.eventos.NAVEGAMAPA.push("atualizaconfluence()");}		
			}
		},
		{
			//Ativa o bot�o que abre a lente de aumento
			iddiv:"lentei",
			tipo:"",
			dica:$trad("d18"),
			funcaoonclick:function()
			{
				if (i3GEO.navega.lente.ESTAATIVA == "nao"){
				i3GEO.navega.lente.inicia();}
				else
				i3GEO.navega.lente.desativa();
			}
		},
		{
			//Coloca as guias em uma janela m�vel
			iddiv:"encolheFerramentas",
			tipo:"",
			dica:$trad("d19"),
			funcaoonclick:function()
			{docaguias();}
		},
		{
			//bot�o de reinicializa��o do mapa que restaura as condi��es iniciais do mapa
			iddiv:"reinicia",
			tipo:"",
			dica:$trad("d20"),
			funcaoonclick:function(){
				i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
				i3GEO.php.reiniciaMapa(i3GEO.atualiza);
			}
		},
		{
			//bot�o de medi��o de dist�ncias
			iddiv:"mede",
			tipo:"dinamico",
			dica:$trad("d21"),
			funcaoonclick:function(){
				i3GEO.barraDeBotoes.ativaIcone("mede");
				if($i("img")){
					$i("img").title = "";
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"distancia","img",i3GEO.configura.locaplic);
				}
				g_tipoacao = "";
				i3GEO.analise.medeDistancia.inicia();
			}
		},
		{
			//bot�o de medi��o de �rea
			iddiv:"area",
			tipo:"dinamico",
			dica:$trad("d21a"),
			funcaoonclick:function(){
				i3GEO.barraDeBotoes.ativaIcone("area");
				if($i("img")){
					$i("img").title = "";
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"area","img",i3GEO.configura.locaplic);
				}
				g_tipoacao = "";
				i3GEO.analise.medeArea.inicia();
			}
		},
		{
			//bot�o de digitaliza��o
			iddiv:"inserexy",
			tipo:"dinamico",
			dica:$trad("d22"),
			funcaoonclick:function(){
				i3GEO.barraDeBotoes.ativaIcone("inserexy");
				g_tipoacao = "";
				i3GEO.mapa.dialogo.cliquePonto();
				if($i("img")){
					$i("img").title = "clique para inserir um ponto";
					$i("img").style.cursor="crosshair";
				}
			}
		},
		{
			//bot�o de inclus�o de gr�ficos
			iddiv:"inseregrafico",
			tipo:"dinamico",
			dica:$trad("d23"),
			funcaoonclick:function(){
				i3GEO.barraDeBotoes.ativaIcone("inseregrafico");
				g_tipoacao = "";
				i3GEO.mapa.dialogo.cliqueGrafico();
				if($i("img")){
					$i("img").title = "clique para incluir o gr�fico";
					$i("img").style.cursor="pointer";
				}		
			}
		},
		{
			//bot�o de sele��o
			iddiv:"selecao",
			tipo:"dinamico",
			dica:$trad("d24"),
			funcaoonclick:function(){
				i3GEO.barraDeBotoes.ativaIcone("selecao");
				i3GEO.selecao.janelaOpcoes();
				if($i("img")){
					$i("img").title = "";
					$i("img").style.cursor="pointer";
				}
			}
		},
		{
			//bot�o de inser��o de topon�mia
			iddiv:"textofid",
			tipo:"dinamico",
			dica:$trad("d25"),
			funcaoonclick:function(){
				i3GEO.barraDeBotoes.ativaIcone("textofid");
				g_tipoacao = "";
				i3GEO.mapa.dialogo.cliqueTexto();
				if($i("img")){
					$i("img").title = "clique para inserir o texto";
					$i("img").style.cursor="pointer";
				}
			}
		}	
	]}
};
//YAHOO.log("carregou classe configura", "Classes i3geo");
//
//acerta algumas vari�veis para efeitos de compatibilidade
//
function i3GEOmantemCompatibilidade(){
	try{
		i3GEO.configura.oMenuData = oMenuData;
	}
	catch(e){}
	try{
		i3GEO.configura.tipoimagem = g_tipoimagem;
	}
	catch(e){}
	try{
		i3GEO.configura.tipotip = g_tipotip;
	}
	catch(e){}
	try{
		i3GEO.configura.funcaoTip = g_funcaoTip;
	}
	catch(e){}
	try{
		i3GEO.configura.diminuixM = g_diminuixM;
	}
	catch(e){i3GEO.configura.diminuixM = 20}
	try{
		i3GEO.configura.diminuixN = g_diminuixN;
	}
	catch(e){i3GEO.configura.diminuixN = 25}
	try{
		i3GEO.configura.diminuiyM = g_diminuiyM;
	}
	catch(e){i3GEO.configura.diminuiyM = 106}
	try{
		i3GEO.configura.diminuiyN = g_diminuiyN;
	}
	catch(e){i3GEO.configura.diminuiyN = 103}	
	try{
		i3GEO.configura.map3d = g_3dmap;
	}
	catch(e){}
	try{
		i3GEO.configura.embedLegenda = g_embedLegenda;
	}
	catch(e){}
	try{
		i3GEO.configura.templateLegenda = g_templateLegenda;
	}
	catch(e){}
	try{
		if(objmapa.finaliza != "")
		i3GEO.finaliza = objmapa.finaliza
	}catch(e){};
	g_arvoreClick = "";
	g_arvoreClicks = "";

	if ($i("longlat")){
		atualizalonglat = function(){
			$i("longlat").innerHTML = objposicaocursor.dmsx + "   " +  objposicaocursor.dmsy;
		};
		YAHOO.util.Event.addListener($i("img"),"mousemove", atualizalonglat);
	}
	try {
		if (g_opcoesTemas == "nao")
		{i3GEO.arvoreDeCamadas.OPCOESTEMAS = false;}
	}
	catch(e){};
	try {
		i3GEO.maparef.fatorZoomDinamico = g_zoomRefDinamico;
	}
	catch(e){};
	try {
		i3GEO.configura.mashuppar = g_mashuppar;
	}
	catch(e){};
	try{
		//if($i("arvoreAdicionaTema") || $i("outrasOpcoesAdiciona")){
			if(!$i("arvoreAdicionaTema"))
			{i3GEO.arvoreDeTemas.IDHTML = objmapa.guiaMenu+"obj";}
			else
			{i3GEO.arvoreDeTemas.IDHTML = "arvoreAdicionaTema";}				
		//}
	}
	catch(e){};
	try {
		if (g_uploaddbf == "nao")
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploaddbf = false;}
	}
	catch(e){};
	try {
		if (g_uploadlocal == "nao")
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploadlocal = false;}
	}
	catch(e){};
	try {
		if (g_downloadbase == "nao")
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.downloadbase = false;}
	}
	catch(e){};
	try {
		if (g_conectarwms == "nao")
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwms = false;}
	}
	catch(e){};
	try {
		if (g_conectargeorss == "nao")
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectargeorss = false;}
	}
	catch(e){};
	try {
		if (g_nuvemTags == "nao")	
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTags = false;}
	}
	catch(e){};
	try {
		if (g_kml == "nao")	
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.kml = false;}
	}
	catch(e){};
	try {
		if (g_qrcode == "nao")	
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS.qrcode = false;}
	}
	catch(e){};
	try{
		if(g_tipoacao != "")
		{i3GEO.barraDeBotoes.BOTAOPADRAO = g_tipoacao;}
	}
	catch(e){}			
	try {
		if (g_listaPropriedades)
		{i3GEO.configura.listaDePropriedadesDoMapa = g_listaPropriedades;}
	}
	catch(e){};
	try {
		if (g_tempo_aplicar)
		{i3GEO.configura.tempoAplicar = g_tempo_aplicar;}
	}
	catch(e){};
	try {
		if (g_janelaMen == "nao")
		{i3GEO.configura.iniciaJanelaMensagens = false;}
	}
	catch(e){};
	try {
		if (g_locaplic)
		{i3GEO.configura.locaplic = g_locaplic;}
	}
	catch(e){};
	try {
		if (g_tempotip)
		{i3GEO.configura.tempoMouseParado = g_tempotip;}
	}
	catch(e){};
	try {
		if (g_mostraRosa)
		{i3GEO.configura.mostraRosaDosVentos = g_mostraRosa;}
	}
	catch(e){};
	try {
		if (g_visual)
		{i3GEO.configura.visual = g_visual;}
	}
	catch(e){};
	try {
		if (g_mapaRefDisplay)
		{i3GEO.configura.mapaRefDisplay = g_mapaRefDisplay;}
	}
	catch(e){};
	try {
		if (g_docaguias)
		{i3GEO.configura.liberaGUias = g_docaguias;}
	}
	catch(e){};
	if (window.location.href.split("?")[1]){
		g_sid = window.location.href.split("?")[1];
		if (g_sid.split("#")[0])
		{g_sid = g_sid.split("#")[0];}
	}
	else
	{g_sid = "";}
	i3GEO.configura.sid = g_sid;
	try{
		i3GEO.guias.ATUAL = g_guiaativa;
	}
	catch(e){}
	try{
		i3GEO.navega.autoRedesenho.INTERVALO = g_autoRedesenho;
	}
	catch(e){}
	try{
		i3GEO.eventos.NAVEGAMAPA = g_funcoesNavegaMapaDefault;
	}
	catch(e){}
	try{
		i3GEO.eventos.MOUSEMOVE = g_funcoesMousemoveMapaDefault;
	}
	catch(e){}
	try{
		i3GEO.eventos.MOUSECLIQUE = g_funcoesClickMapaDefault;
	}
	catch(e){}
	try{
		i3GEO.configura.entorno = g_entorno;
	}
	catch(e){}
	try{
		i3GEO.navega.lente.POSICAOX = g_posicaoLenteX = 0;
	}
	catch(e){}
	try{
		i3GEO.navega.lente.POSICAOY = g_posicaoLenteY;
	}
	catch(e){}
	try{
		i3GEO.navega.destacaTema.TAMANHO = destacaTamanho;
	}
	catch(e){}
	if (!$i("tip")){
		var novoel = document.createElement("div");
		novoel.id = "tip";
		novoel.style.position="absolute";
		novoel.style.zIndex=5000;
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		document.body.appendChild(novoel);
	}
	/*
	Function: atualizaListaTemas (depreciado)

	Atualiza a lista de temas dispon�veis no mapa (guia com a lista de temas)
	*/
	try{
		objmapa.atualizaListaTemas = function(temas)
		{alert("atualizaListaTemas foi depreciado. Utilize i3GEO.arvoreDeCamadas")};
	}
	catch(e){}
}

//
//
//
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
cpObj = new cpaint();
cpObj.set_async("true");
cpObj.set_response_type("JSON");

/*
Class: Mapa (depreciado)
*/
function Mapa(e,m)
{
	i3GEO.cria();
	this.inicializa= function()
	{i3GEO.inicia();};	
}
//
//funcoes depreciadas
//
objaguarde = {
	abre: function(){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
	},
	fecha: function(){
		i3GEO.janela.fechaAguarde("i3GEO.atualiza");
	}
}
/*
Function: iCookie (depreciado)

Utilize i3GEO.util

Cria um cookie.
*/
function iCookie(nome,valor)
{i3GEO.util.insereCookie(nome,valor);}
/*
Function: pCookie (depreciado)

Utilize i3GEO.util.pegaCookie
*/
function pCookie(nome)
{i3GEO.util.pegaCookie(nome);}
/*
Function: trocalingua (depreciado)

Utilize i3GEO.idioma.trocaIdioma
*/
function trocalingua(l)
{i3GEO.idioma.trocaIdioma(l);alert("trocalingua foi depreciado utilize i3GEO.idioma");}
/*
Function: initJanelaMen (depreciado)
*/
function initJanelaMen()
{i3GEO.ajuda.abreJanela();alert("initJanelaMen foi depreciado utilize i3GEO.ajuda");}
/* 
Function: pegalistademenus (depreciado)
*/
function pegalistademenus(retorno)
{alert("Funcao pegalistademenus foi depreciado. Utilize i3GEO.arvoreDeTemas");}
/*
Function: wdocaf (depreciado)
*/
function wdocaf(wlargura,waltura,wsrc,nx,ny,texto)
{var janela = i3GEO.janela.cria(wlargura,waltura,wsrc,nx,ny,texto);}
/*
Function: redimwdocaf (depreciado)
*/
function redimwdocaf(w,h)
{i3GEO.janela.alteraTamanho(w,h);alert("redimwdocaf foi depreciado utilize i3GEO.janela");}
/*
Function: wdocaf2 (depreciado)
*/
function wdocaf2(wlargura,waltura,wsrc,nx,ny,texto)
{
	var id = YAHOO.util.Dom.generateId();
	i3GEO.janela.cria(wlargura,waltura,wsrc,nx,ny,texto,id,true);
}
/*
Function: wdocafechaf (depreciado)
*/
function wdocafechaf(odoca)
{alert("wdocafechaf foi depreciado");}
/*
Function: mostradicasf (depreciado)
*/
function mostradicasf(objeto,dica,hlpt)
{i3GEO.ajuda.mostraJanela(dica);alert("mostradicasf foi depreciado utilize i3GEO.ajuda");}	
/*
Function: mudaboxnf (depreciado)
*/
function mudaboxnf(tipo,obj,nomeFuncao)
{alert("mudaboxnf foi depreciado");}
/*
Function: inverteStatusClasse (depreciado)
*/
/*
Function: procurartemas (depreciado)

Localiza um tema no menu de temas.
*/
function procurartemas(texto)
{alert("procurartemas foi depreciado");}
/*
Function: expandeTema (depreciado)

*/
function expandeTema(itemID)
{
	//verifica se clicou para expandir a legenda
	var tema = itemID.split("legenda");
	if (tema.length == 2)
	{
		g_arvoreClick = itemID;
		tema = tema[1];
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&template=legenda2.htm&tema="+tema+"&g_sid="+g_sid;
		cpObj.call(p,"criaLegenda",expandeLegendaVer);
	}
	alert("expandeTema foi depreciado");
}
/*
Function: expandeGrupo (depreciado)
*/
/*
Function: processaGrupos (depreciado)
*/
/*
Function: pegavalSistemas (depreciado)

Adiciona uma �rvore no menu de adi��o de temas, contendo os sistemas que podem ser executados.
*/
function pegavalSistemas(sis)
{alert("Funcao pegavalSistemas foi depreciada - veja i3GEO.arvoreDeTemas");}
/*
Function: processevent1 (depreciado)

Captura a posi��o do mouse tendo como refer�ncia o navegador.

Atualiza o objeto objposicaomouse e movimenta as janelas doc�veis.

Recalcula a posi��o correta da imagem do mapa.

Parameters:

exy1 - objeto evento.
*/
function processevent1(exy1)
{}
/*
Function: ativaDragDrop (depreciado)

Ativa a funcionalidade de arrastar e soltar para altera��o da ordem de desenho dos temas e para excluir um tema do mapa.
*/
/*
Function: removeAcentos (depreciado)
*/
function removeAcentos(palavra)
{
	return(i3GEO.util.removeAcentos(palavra));
	alert("removeAcentos foi depreciado utilize i3GEO.util");
}
/*
Function: ativaMensagemBanner (depreciado
*/
function ativaMensagemBanner()
{alert("ativaMensagemBanner fooi depreciado utilize i3GEO.ajuda");}
/*
Function: mensagemBanner (depreciado)
*/
function mensagemBanner()
{}
/*
Function: mensagemf (depreciado)

Abre uma mensagem na tela em um DIV.

A mensagem � inclu�da em um elemento HTML com id ="mensagem"

Parameters:

m - mensagem que ser� mostrada.
*/
function mensagemf(m)
{
	alert("mensagemf foi depreciado");
	try
	{
		//insere o div para mensagens
		if (!$i("mensagem"))
		{
			var novoel = document.createElement("div");
			novoel.id = 'mensagem';
			novoel.innerHTML = '<table width="50" style="border: 1px solid #000000;"> <tr> <td onclick="mensagemf()" style="text-align:left;cursor:pointer" class="tdclara"> <img src="'+g_locaplic+'/imagens/excluir.png" /> </td> <td style="text-align:left" class="tdclara"> <input style="text-align:left" class="textocb" type="text" id="mensagemt" size="70" value="" /> </td></tr> </table>';
			if($i("i3geo"))
			{$i("i3geo").appendChild(novoel);}
			else
			{document.body.appendChild(novoel);}
		}
		if (m == null)
		{$i("mensagem").style.visibility = "hidden";}
		else
		{
			$i("mensagemt").value = m;
			$i("mensagem").style.visibility = "visible";
		}
		var pos = pegaPosicaoObjeto($i("img"));
		pos[1] = pos[1] + parseInt($i("img").style.height) - 22;
		eval ('document.getElementById("mensagem").style.' + g_tipoleft + ' = pos[0] + g_postpx');
		eval ('document.getElementById("mensagem").style.' + g_tipotop + ' = pos[1] + g_postpx');
	}
	catch(e){alert("Impossivel criar mensagem."+e);}
}
/*
Function: aguarde (depreciado)
*/
function aguarde()
{
	alert("aguarde foi depreciado utilize i3GEO.janela");
	this.abre = function(aguardeId,texto)
	{
		i3GEO.janela.abreAguarde(aguardeId,texto);		
	};
	this.fecha = function(aguardeId)
	{
		i3GEO.janela.fechaAguarde(aguardeId);
	};
}
/*
Function: zoomiauto (depreciado)
*/
function zoomiauto()
{alert("zoomiauto foi depreciado utilize i3GEO.navega");i3GEO.navega.zoomin(g_locaplic,g_sid);}
/*
Function: zoomoauto (depreciado)
*/
function zoomoauto()
{alert("zoomoauto foi depreciado utilize i3GEO.navega");i3GEO.navega.zoomout(g_locaplic,g_sid);}
/*
Function: convdmsddf (depreciado)
*/
function convdmsddf(cd,cm,cs)
{alert("convdmsddf foi depreciado utilize i3GEO.calculo");return (i3GEO.calculo.dsm2dd(cd,cm,cs));}
/*
Function: zoomPonto (depreciado)
*/
function zoomPonto()
{alert("utilize i3GEO.navega.zoomponto");}
/*
Function: zoomIP (depreciado)
*/
function zoomIP()
{alert("zoomIP foi depreciado. Utilize i3GEO.navega.zoomIP");}
/*
Function: zoomtot
*/
function zoomtot()
{alert("zoomtot foi depreciado. Utilize i3GEO.navega.zoomExt");}
/*
Function: atualizaFarol (depreciado)
*/
/*
Function: panFixo (depreciado)
*/
function panFixo(direcao,w,h,escala)
{alert("panFixo foi depreciado. Utilize i3GEO.navega.panFixo");}
/*
Function: protocolo (depreciado)

Utilize i3GEO.util
*/
function protocolo()
{alert("protocolo foi depreciado utilize i3GEO.util");return(i3GEO.util.protocolo());}
//Mantido aqui apenas para fins de compatibilidade
function borra()
{}
/*
Function: pegaPosicaoObjeto (depreciado)
*/
function pegaPosicaoObjeto(obj)
{alert("pegaPosicaoObjeto foi depreciado utilize i3GEO.util");return(i3GEO.util.pegaPosicaoObjeto(obj));}
/*
Function: i3geo_pegaElementoPai (depreciado)
*/
function i3geo_pegaElementoPai(e)
{alert("i3geo_pegaElementoPai foi depreciado utilize i3GEO.util");return(i3GEO.util.pegaElementoPai(e));}
/*
Function: convddtela (depreciado)
*/
function convddtela(vx,vy,docmapa)
{alert("convddtela foi depreciado utilize i3GEO.calculo");return(i3GEO.calculo.dd2tela(vx,vy,docmapa,i3GEO.parametros.extent,i3GEO.parametros.pixelsize));}
/*
Function: convdmsf (depreciado)
*/
function convdmsf(x,y)
{alert("convdmsf foi depreciado utilize i3GEO.calculo");return(i3GEO.calculo.dd2dms(x,y));}
/*
Function: calcddf (depreciado)
*/
function calcddf(xfign,yfign,g_celula,imgext)
{alert("calcddf foi depreciado utilize i3GEO.calculo");return(i3GEO.calculo.tela2dd(xfign,yfign,g_celula,imgext));}
/*
Function: movecursor (depreciado)

Move o �cone que segue o mouse quando da movimenta��o sobre o mapa
*/
function movecursor()
{
	//
	//se a interface openlayers ou flamingo estiver sendo usada, o �cone n�o � mostrado
	//'obj' � o elemento que guarda o �cone que segue o mouse
	//
	if ($i("obj"))
	{
		if ($i("openlayers") || $i("flamingo"))
		{$i("obj").style.display = "none";}
		else
		{
			var obje = $i("obj").style;
			if ($i("img"))
			{
				eval ("obje." + g_tipotop + "= objposicaocursor.telay + 9 + g_postpx");
				eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 9 + g_postpx");
			}
			else
			{
				eval ("obje." + g_tipotop + "= objposicaocursor.telay - 15 + g_postpx");
				eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 15 + g_postpx");
			}
		}
	}
	if($i("box1"))
	{
		var bx = $i("box1");
		if (bx.style.visibility != "visible")
		{
			//move o box para a posi��o correta
			bx.style.left = objposicaocursor.telax + g_postpx;
			bx.style.top = objposicaocursor.telay + g_postpx;
		}
	}
}
/*
Variable: g_janelaMen (depreciado)
*/
/*
Variable: g_downloadbase (depreciado)

Define se na �rvore de adi��o de temas, ser� mostrada a op��o de download dos dados.
*/
/*
Variable: g_conectargeorss (depreciado)

Define se na �rvore de adi��o de temas, ser� mostrada a op��o de conex�o com GeoRSS.
*/
/*
Variable: g_nuvemTags (depreciado)

Define se na �rvore de adi��o de temas, ser� mostrada a op��o de busca de temas por tags.
*/
/*
Variable: g_uploadlocal (depreciado)

Define se na �rvore de adi��o de temas, ser� mostrada a op��o de upload.
*/
/*
Variable: g_uploaddbf (depreciado)

Define se na �rvore de adi��o de temas, ser� mostrada a op��o de upload de arquivo dbf.
*/
/*
Variable: g_conectarwms (depreciado)

Define se na �rvore de adi��o de temas, ser� mostrada a op��o de conex�o com WMS.
*/
/*
Variable: g_funcoesMouseParado (depreciado)
*/
/*
Variable: g_tempotip (depreciado)
*/
/*
Variable: g_mostraRosa (depreciado)
*/

/*
Function: pegaCoordenadaUTM (depreciado)
*/
function pegaCoordenadaUTM()
{alert("pegaCoordenadaUTM foi depreciado utilize i3GEO.gadgets");i3GEO.gadgets.mostraCoordenadasUTM(g_locaplic,"mostraUTM");}
/*
Function: ativaLocalizarxy (depreciado)
*/	
function ativaLocalizarxy(iddiv)
{alert("ativaLocalizarxy foi depreciado utilize i3GEO.gadgets");i3GEO.gadgets.mostraCoordenadasGEO(iddiv);}
/*
Function: ativaEscalaNumerica (depreciado)
*/	
function ativaEscalaNumerica(iddiv)
{alert("ativaEscalaNumerica foi depreciado utilize i3GEO.gadgets");i3GEO.gadgets.mostraEscalaNumerica(iddiv);}
/*
Function: ativaBuscaRapida (depreciado)
*/	
function ativaBuscaRapida(iddiv)
{alert("ativaBuscaRapida foi depreciado utilize i3GEO.gadgets");i3GEO.gadgets.mostraBuscaRapida(iddiv);}
/*
Function: buscaRapida (depreciado)
*/
function buscaRapida()
{i3geo_buscarapida()}
/*
Function: criaboxg (depreciado)
*/
function criaboxg()
{
	i3GEO.util.criaBox();
	i3GEO.util.criaPin();
	alert("criaboxg foi depreciado utilize i3GEO.util");
}
/*
Function: initJanelaZoom (depreciado)
*/
function initJanelaZoom(qual){
	i3GEO.barraDeBotoes.reativa(qual-1);
}
/*
Function: sobeferramentas(depreciado)
*/
function sobeferramentas()
{}
/*
Function: desceferramentas (depreciado)
*/
function desceferramentas()
{}
/*
Function: mostraRosaDosVentos (depreciado)
*/
function mostraRosaDosVentos()
{alert("mostraRosaDosVentos foi depreciado utilize i3GEO.navega");i3GEO.navega.mostraRosaDosVentos();}
/*
Function: mudaVisual (depreciado)
*/
function mudaVisual(visual)
{alert("visual foi depreciado utilize i3GEO.visual");i3GEO.gadgets.visual.troca(visual);}
/*
Function: visual (depreciado)
*/
function visual(iddiv)
{alert("visual foi depreciado utilize i3GEO.visual");i3GEO.gadgets.visual.inicia(iddiv);}
/*
Function: arvoreclick (depreciado)

Marca o checkbox de adi��o de temas

Parameters:

itemID - ID que identifica qual tema foi clicado. O ID � definido no arquivo .map e no arquivo menutemas/menutemas.xml
*/
function arvoreclick(itemID)
{
	if (itemID.search("tema") == 0)
	{
		if ($i(itemID).checked == true)
		{$i(itemID).checked = false;}
		else
		{$i(itemID).checked = true;}
	}
}
/*
Function: pegaTema (depreciado)

Pega o tema de um no na guia de temas.

Utilizado nas op��es que operam sobre um tema espec�fico.

Parameters:

celula - objeto que foi clicado

Returns:

Id do tema.
*/
function pegaTema(celula)
{
	var nos = celula.parentNode.childNodes;
	var tempi = nos.length;
	for (var no=0;no<tempi; no++){if (nos[no].type == "checkbox"){return nos[no].value;}}
}
/*
Function: gerafilmef (depreciado)
*/
function gerafilmef(qs)
{}
/*
Function: gravaQuadro (depreciado)
*/
function gravaQuadro(variavel,valor)
{i3GEO.gadgets.quadros.grava(variavel,valor);}
/*
Function: avancaQuadro (depreciado)
*/
function avancaQuadro()
{i3GEO.gadgets.quadros.avanca();}
/*
Function: zoomAnterior (depreciado)
*/
function zoomAnterior(){
}
/*
Function: zoomProximo (depreciado)

*/
function zoomProximo(){
}
/*
Function: opcoesQuadros (depreciado)
*/
function opcoesQuadros()
{}
/*
Function: filmef
*/
function filmef(o)
{}
/*
Function: rebobinaf (depreciado)
*/
function rebobinaf()
{}
/*
Function: filmezf (depreciado)
*/
function filmezf(o)
{}
/*
Function: quadrofilme (depreciado)
*/
function quadrofilme()
{}
/*
Function: filmeanimaf (depreciado)
*/
function filmeanimaf()
{}
/*
Function: filmeanimarodaf (depreciado)
*/
function filmeanimarodaf(janima)
{}
/*
Function: pegaimagens (depreciado)
*/
function pegaimagens()
{}
/*
Function calculaArea (depreciado)
*/
function calculaArea(pontos,pixel)
{return (i3GEO.calculo.area(pontos,pixel));}
/*
Function: calculadistancia (depreciado)
*/
function calculadistancia(lga,lta,lgb,ltb) //0ms
{return (i3GEO.calculo.distancia(lga,lta,lgb,ltb));}
/*
Function: initJanelaRef (depreciado)
*/
function initJanelaRef()
{i3GEO.maparef.inicia();}
/*
Variable: g_mapaRefDisplay (depreciado)
*/
/*
Function: atualizaReferencia (depreciado)
*/
/*
Function: ajaxReferencia (depreciado)
*/
function ajaxReferencia(retorno)
{i3GEO.maparef.processaImagem(retorno)}
/*
Function: clicouRef (depreciado)

Altera a abrang�ncia do mapa quando o mapa de refer�ncia � clicado
*/
function clicouRef()
{}
/*
Function: movimentoRef (depreciado)

Pega a coordenada do cursor sobre o mapa de refer�ncia
*/
function movimentoRef(obj)
{}
/*
Function: mostraTip (depreciado)

Mostra a descri��o de um elemento do mapa como uma etiqueta na posi��o do mouse.

Para que um tema tenha uma etiqueta, � necess�rio configurar o metadata TIP no map file.

Parameters:

retorno - retorno da fun��o ajax com os dados para montar a etiqueta.
*/
function mostraTip(retorno)
{
	//insere div para tips
	if (!$i("tip")){
		var novoel = document.createElement("div");
		novoel.id = "tip";
		novoel.style.position="absolute";
		novoel.style.zIndex=5000;
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		document.body.appendChild(novoel);
	}
	var i = $i("i3geo_rosa");
	if(i)
	i.style.display="none";
	var mostra = false;
	var retorno = retorno.data;
	if ((retorno != "erro") && (retorno != undefined))
	{
		if ($i("img"))
		{$i("img").title = "";}
		if (retorno != "")
		{
			var res = "<div id='cabecatip' style='text-align:left;background-color:rgb(240,240,240)'><span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapaparado=\"cancela\"'>parar&nbsp;&nbsp;</span>";
			res += "<span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:i3GEO.janela.TIPS.push($i(\"tip\"));$i(\"tip\").id=\"\";$i(\"cabecatip\").innerHTML =\"\";$i(\"cabecatip\").id =\"\"' >fixar</span></div>";
			var temas = retorno.split("!");
			var tema = temas.length-1;
			if(tema >= 0)
			{
				do
				{
					var titulo = temas[tema].split("@");
					if (g_tipotip == "completo")
					{
						res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";
					}
					var ocorrencias = titulo[1].split("*");
					var ocorrencia = ocorrencias.length-1;
					if(ocorrencia >= 0)
					{
						do
						{
							if (ocorrencias[ocorrencia] != "")
							{
								var pares = ocorrencias[ocorrencia].split("##");
								var paresi = pares.length;
								for (var par=0;par<paresi; par++)
								{
									var valores = pares[par].split("#");
									if (g_tipotip == "completo")
									{
										res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
										var mostra = true;
									}
									else
									{
										res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'><i>" + valores[1] + "</i></span><br>";
										var mostra = true;
									}
								}
							}
						}
						while(ocorrencia--)
					}
				}
				while(tema--)
			}
			if(!mostra){$i("tip").style.display="none";return;}
			if ($i("janelaMen"))
			{$i("janelaMenTexto").innerHTML = res;}
			else
			{
				var i = $i("tip");
				i.innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
				ist = i.style;
				ist.top = objposicaocursor.telay - 10;
				ist.left = objposicaocursor.telax - 20;
				ist.display="block";
			}
		}
	}
}
/*
Function: trataErro (depreciado)
*/
function trataErro()
{i3GEO.janela.fechaAguarde();}
/*
Function: mostraguiaf (depreciado)
*/
function mostraguiaf(guia)
{
	i3GEO.guias.mostra(guia);
	/*
	if ($i("guia"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10,11,12];
		for (var j=0;j<10; j++)
		{
			if ($i("guia"+fs[j]))
			{
				jj = fs[j];
				if ($i("guia"+jj+"obj"))
				{$i("guia"+jj+"obj").style.display="none";}
				$i("guia"+fs[j]).parentNode.parentNode.style.background="transparent";
			}
		}
		if ($i("guia"+guia+"obj"))
		{
			$i("guia"+guia+"obj").style.display="block";
		}
		else
		{alert("O objeto guia"+guia+"obj nao existe.");}
		$i("guia"+guia).parentNode.parentNode.style.background="white";
	}
	*/
}
/*
Function: ativaGuias (depreciado)
*/
function ativaGuias()
{
	//YAHOO.log("ativaGuias", "i3geo");
	//ajusta as guias da vers�o antiga do YUI para a nova
	//
	//pega o elemento onde as guias ser�o colocadas
	//
	for(var g=0;g<12;g++)
	{
		if ($i("guia"+g))
		var gpai = $i("guia"+g).parentNode;
	}
	//
	//monta as guias
	//
	if(gpai)
	{
		gpai.id = "guiasYUI";
		gpai.className = "yui-navset";
		var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 0px;border-color:rgb(240,240,240);border-bottom-color:white;">';
		//
		//define os t�tulos das guias padr�o
		//
		try{
			if($i(objmapa.guiaTemas))
			{$i(objmapa.guiaTemas).innerHTML = $trad("g1");}
			if($i(objmapa.guiaMenu))
			{$i(objmapa.guiaMenu).innerHTML = $trad("g2");}
			if($i(objmapa.guiaLegenda))
			{$i(objmapa.guiaLegenda).innerHTML = $trad("g3");}
			if($i(objmapa.guiaListaMapas))
			{$i(objmapa.guiaListaMapas).innerHTML = $trad("g4");}
		}
		catch(e){};
		//
		//
		for(var g=0;g<12;g++)
		{
			if ($i("guia"+g))
			{
				//
				//pega os t�tulos das guias, inclusive as que n�o s�o padr�o
				//
				var tituloguia = $i("guia"+g).innerHTML;
				//
				//remove os espa�os em branco 
				//necess�rio para manter compatibilidade com vers�es antigas do i3geo
				//
				var re = new RegExp("&nbsp;", "g");
				var tituloguia = tituloguia.replace(re,'');
				//
				//monta o t�tulo das guias
				//
				ins += '<li><a href="#"><em><div id="guia'+g+'" >'+tituloguia+'</div></em></a></li>';
			}
		}
		ins += "</ul>";
		//
		//insere as guias em gpai
		//
		gpai.innerHTML = ins;
		for(var g=0;g<12;g++)
		{
			if ($i("guia"+g))
			{
				eval('$i("guia'+g+'").onclick = function(){g_guiaativa = "guia'+g+'";mostraguiaf('+g+');}');
				$i("guia"+g).onmouseover = function()
				{
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "#bfdaff";
				};
				$i("guia"+g).onmouseout = function()
				{
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "transparent";
				};
				if($i("guia"+g+"obj"))
				{
					$i("guia"+g+"obj").style.overflow="auto";
					$i("guia"+g+"obj").style.height = i3GEO.parametros.h;
				}
			}
		}
	}
	//
	//define a fun��o que ser� executada quando o usu�rio clica em uma guia padr�o
	//
	if ($i(objmapa.guiaTemas))
	{
		$i(objmapa.guiaTemas).onclick = function()
		{
			g_guiaativa = objmapa.guiaTemas;mostraguiaf(1);
		};
	}
	if ($i(objmapa.guiaMenu))
	{
		$i(objmapa.guiaMenu).onclick = function()
		{
			g_guiaativa = objmapa.guiaMenu;
			mostraguiaf(2);
			//pega a lista de �rvores que devem ser montadas
			//� executado apenas se n�o existir o id=arvoreAdicionaTema
			//caso contr�rio, a �rvore � montada na inicializa��o do i3geo
			if(!$i("arvoreAdicionaTema"))
			{var ondeArvore = objmapa.guiaMenu+"obj";}
			else
			{var ondeArvore = "arvoreAdicionaTema";}
			//
			//para efeitos de compatibilidade
			//
			if(document.getElementById("outrasOpcoesAdiciona"))
			{
				i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde = "outrasOpcoesAdiciona";
				i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore = false;
			}
			//
			//cria a �rvore
			//
			i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,ondeArvore);
		};
	}
	if($i(objmapa.guiaLegenda))
	{
		$i(objmapa.guiaLegenda).onclick = function()
		{g_guiaativa = objmapa.guiaLegenda;mostraguiaf(4);objmapa.atualizaLegendaHTML();};
	}
	if ($i(objmapa.guiaListaMapas))
	{
		$i(objmapa.guiaListaMapas).onclick = function()
		{
			g_guiaativa = objmapa.guiaListaMapas;
			mostraguiaf(5);
			if ($i("banners"))
			{
				$i("banners").innerHTML == $trad("o1");
				var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+i3GEO.configura.sid;
				cpObj.call(p,"pegaMapas",pegaMapas);
			}
			else
			{alert("id banners nao encontrado");}
		};
	}
	//YAHOO.log("Fim ativaGuias", "i3geo");
}
/*
		//
		//altera o tamanho das guias
		//
		var temp = new Array("guiaTemas","guiaMenu","guiaLegenda");
		var i = temp.length-1;
		if (i >= 0)
		{
			do
			{
				eval("var s = objmapa."+temp[i]+"obj"); 
				if ($i(s))
				{
					var d = $i(s).style;
					d.style.overflow="auto";
					d.style.height = i3GEO.parametros.h-13;
					d.style.width = "100%";
				}
			}
			while(i--)
		}
*/
/*
Function: docaguias (depreciado)
*/
function docaguias()
{i3GEO.guias.libera();}
/*
Function: autoRedesenho (depreciado)
*/
function autoRedesenho(opcao)
{}
/*
Function movePan (depreciado)
*/
function movePan()
{alert("movePan foi depreciado")}
/*
Function selecao (depreciado)
*/
function selecao()
{}
/*
Function: cliqueSelecao (depreciado)
*/
function cliqueSelecao()
{}
/*
Function: zoomboxf (depreciado)
*/
function zoomboxf(tipo)
{}
/*
Function: i3geo_comboGruposMenu (depreciado)
*/
function i3geo_comboGruposMenu(funcaoOnchange,idDestino,idCombo,largura,altura)
{}
/*
Function: i3geo_comboSubGruposMenu (depreciado)
*/
function i3geo_comboSubGruposMenu(funcaoOnchange,idDestino,idCombo,idGrupo,largura,altura)
{}
/*
Function: i3geo_comboTemasMenu (depreciado)
*/
function i3geo_comboTemasMenu(funcaoOnchange,idDestino,idCombo,idGrupo,idSubGrupo,largura,altura)
{}
/*
Function: remapaf (depreciado)
*/
function remapaf()
{i3GEO.atualiza("");}
/*
Function: limpacontainerf (depreciado)
*/
function limpacontainerf()
{}
/*
Function: inseremarcaf (depreciado)
*/
function inseremarcaf(xi,yi,funcaoOnclick,container)
{i3GEO.utl.insereMarca.cria(xi,yi,funcaoOnclick,container)}
/*
Function moveSelecaoPoli (depreciado)
*/
function moveSelecaoPoli()
{}
/*
Function: cliqueSelecaoPoli (depreciado)
*/
function cliqueSelecaoPoli()
{}
/*
Function: capturaposicao (depreciado)
*/
function capturaposicao(e)
{alert("capturaposicao foi depreciado utilize i3GEO.eventos");}
/*
Function: ativaEntorno (depreciado)
*/
function ativaEntorno()
{}
/*
Function: geraURLentorno (depreciado)
*/
function geraURLentorno()
{}
/*
Function: ajustaEntorno
*/
function ajustaEntorno()
{}
/*
Function: lenteDeAumento (depreciado)
*/
function lenteDeAumento()
{alert("lenteDeAumento foi depreciado utilize i3GEO.navega.lente.ativaDesativa()")}
/*
Function: ajaxabrelente (depreciado)
*/
function ajaxabrelente(retorno)
{}
/*
Function: movelentef (depreciado)
*/
function movelentef()
{}
/*
Function: destacaTema (depreciado)
*/
function destacaTema(tema)
{alert("destacaTema foi depreciado utilize i3GEO.navega");}

/*
Function: ajaxdestaca (depreciado)
*/
function ajaxdestaca()
{alert("ajaxdestaca foi depreciado, utilize i3GEO.navega")}
/*
Function: ativaClicks (depreciado)
*/
function ativaClicks(docMapa)
{}
/*
Function: incluir (depreciado)
*/
function incluir(path)
{i3GEO.util.adicionaSHP(path);}
/*
Function: pontosdist(depreciado)
*/
function pontosdist()
{
	this.xpt = new Array();
	this.ypt = new Array();
	this.dist = new Array();
	this.xtela = new Array();
	this.ytela = new Array();
	this.ximg = new Array();
	this.yimg = new Array();
	this.linhas = new Array();
}
/*
Function: mudaiconf (depreciado)
*/
function mudaiconf(i)
{i3GEO.barraDeBotoes.ativaIcone(i);}
/*
Function: calcposf (depreciado)
*/
function calcposf()
{i3GEO.mapa.ajustaPosicao();}
/*
Function: recuperamapa (depreciado)
*/
function recuperamapa()
{}
/*
Function: criaContainerRichdraw
*/
function criaContainerRichdraw()
{alert("criaContainerRichdraw foi depreciado utilize i3GEO.desenho");}
/*
Function: desenhoRichdraw (depreciado)
*/
function desenhoRichdraw(tipo,objeto,n)
{}
/*
Function: ajaxhttp (depreciado)

Cria o objeto http utilizado nas fun��es Ajax.

Returns:

Objeto httprequest.

See Also:

<ajaxexecAS>
*/
function ajaxhttp()
{
	try
	{var objhttp1 = new XMLHttpRequest();}
	catch(ee)
	{
		try{var objhttp1 = new ActiveXObject("Msxml2.XMLHTTP");}
		catch(e)
		{
			try{var objhttp1 = new ActiveXObject("Microsoft.XMLHTTP");}
			catch(E)
			{var objhttp1 = false;}
		}
	}
	return(objhttp1);
}
/*
Function: ajaxexecAS (depreciado)

Executa uma chamada ajax no modo ass�ncrono.

Parameters:

programa - programa que ser� executado.
funcao - fun��o que tratar� o resultado.

Returns:

O resultado em uma vari�vel. Se o retorno contiver a palavra "Erro", � gerado um alert.

See Also:

<ajaxhttp>
*/
function ajaxexecAS(programa,funcao)
{
	var ohttp = ajaxhttp();
	ohttp.open("POST",programa,true);
	var retorno = "";
	ohttp.onreadystatechange=function()
	{
		if (ohttp.readyState==4)
		{
			retorno = ohttp.responseText;
			var reg = /Warning/gi;
			if (retorno.search(reg) != -1)
			{
				alert("OOps! Ocorreu um erro\n"+retorno);
				return;
			}
			var reg = /erro/gi;
			if (retorno.search(reg) != -1)
			{
				alert("OOps! Ocorreu um erro\n"+retorno);
				return;
			}
			if (funcao != "volta")
			{eval(funcao+'("'+retorno+'")');}
		}
	};
	ohttp.send(null);
}
/*
Function: ajaxexec (depreciado)

Executa uma chamada ajax no modo s�ncrono.

Parameters:

programa - programa que ser� executado.
funcao - fun��o que tratar� o resultado.

Returns:

O resultado em uma vari�vel. Se o retorno contiver a palavra "Erro", � gerado um alert.

See Also:

<ajaxhttp>
*/
function ajaxexec(programa,funcao)
{
	var objhttp = ajaxhttp();
	objhttp.open('GET', programa, false);
	objhttp.send(null);
	if(objhttp.status == 200)
	{
		if (funcao != "volta")
		{eval(funcao+'("'+objhttp.responseText+'")');}
		else
		{return objhttp.responseText;}
	}
}
/*
Function: ajaxLegendaHTML (depreciado)
*/
function ajaxLegendaHTML(retorno)
{}
/*
Function: ajaxLegendaImagem (depreciado)
*/
function ajaxLegendaImagem(retorno)
{}
/*
Function: mede (depreciado)
*/
function mede()
{}
/*
Function: cliqueMede (depreciado)
*/
function cliqueMede()
{}
/*
Function moveMede (depreciado)
*/
function moveMede()
{}
/*
Function: area (depreciado)
*/
function area()
{}
/*
Function: cliqueArea (depreciado)
*/
function cliqueArea()
{}
/*
Function moveArea (depreciado)
*/
function moveArea()
{}
/*
Function: textofid (depreciado)
*/
function textofid()
{}
/*
Function: inserexy (depreciado)
*/
function inserexy()
{}
/*
Function: cliqueInseretoponimo (depreciado)
*/
function cliqueInseretoponimo()
{}
/*
Function: cliqueInserexy (depreciado)
*/
function cliqueInserexy()
{}
/*
Function: inseregrafico (depreciado)
*/
function inseregrafico()
{}
/*
Function: cliqueInseregrafico (depreciado)
*/
function cliqueInseregrafico()
{}
/*
Function: ativaHistoricoZoom (depreciado)
*/	
function ativaHistoricoZoom(iddiv)
{}
function ajaxhttp(){
	return i3GEO.util.ajaxhttp();
}
/*
Function: ajaxCorpoMapa (depreciado)
*/
function ajaxCorpoMapa(retorno)
{i3GEO.mapa.corpo.veirifca(retorno);}
/*
Function: ajaxredesenha (depreciado)
*/
function ajaxredesenha(retorno)
{i3GEO.atualiza(retorno);}
/*
Function: ajaxIniciaParametros (depreciado)
*/
function ajaxIniciaParametros(retorno)
{i3GEO.atualiza(retorno);}
/*
Function montaMenuSuspenso (depreciado)
*/
function montaMenuSuspenso(iddiv){
	i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso.idhtml = iddiv;
	i3GEO.gadgets.mostraMenuSuspenso();
}
//YAHOO.log("carregou depreciados", "Classes i3geo");
/*
Title: C�lculos

File: i3geo/classesjs/classe_calculo.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.calculo

Utilit�rios para c�lculos.
*/
i3GEO.calculo = {
	/*
	Function: dms2dd
	
	Converte coordenadas formatadas em DMS para DD
	
	Parameters:
	
	cd {Numeric} - grau
	
	cm {Numeric} - minuto
	
	cs {Numeric} - segundo
	
	Return:
	
	{Numeric} - Coordenada em d�cimos de grau.
	*/
	dms2dd: function(cd,cm,cs){
		try
		{
			//YAHOO.log("dms2dd", "i3geo");
			//converte dms em dd
			var sinal = 'positivo';
			if (cd < 0)
			{
				cd = cd * -1;
				sinal = 'negativo';
			}
			spm = cs / 3600;
			mpg = cm / 60;
			var dd = (cd * 1) + (mpg * 1) + (spm * 1);
			if (sinal == 'negativo')
			{dd = dd * -1;}
			//YAHOO.log("Fim dms2dd", "i3geo");
			return (dd);
		}
		catch(e){return (0);}
	},
	/*
	Function: dd2tela

	Converte coordenadas dd em coordenadas de tela.

	Parameters:

	vx {Numeric} - coordenada x.

	vy {Numeric} - coordenada y.

	docmapa - objeto DOM que cont�m o objeto imagem
	
	ext {String} - extens�o geogr�fica (espa�o como separador) xmin ymin xmax ymax
	
	cellsize {Numeric} - tamanho no terreno em DD de cada pixel da imagem

	Returns:

	{Array} - Array com o valor de x [0] e y [1]
	*/
	dd2tela: function (vx,vy,docmapa,ext,cellsize){
		try
		{
			if(arguments.length == 3){
				var ext = i3GEO.parametros.mapexten;
				var cellsize = i3GEO.parametros.pixelsize;
			}
			if(arguments.length == 4){
				var cellsize = i3GEO.parametros.pixelsize;
			}
			if(!docmapa)
			{var docmapa = window.document;}
			var dc = docmapa.getElementById("img");
			if(!dc){var dc = docmapa;}
			var pos = i3GEO.util.pegaPosicaoObjeto(dc);
			var imgext = ext; //i3GEO.parametros.mapexten;
			var imgext = imgext.split(" ");
			vx = (vx * 1) - (imgext[0] * 1);
			vy = (vy * -1) + (imgext[3] * 1);
			c = cellsize * 1;
			xy = new Array();
			return [(vx  / c) + pos[0],(vy / c) + pos[1]];
		}
		catch(e){return(new Array());}
	},
	/*
	Function: dd2dms

	Converte coordenadas de dd em dms.

	Parameters:

	x {Numeric} - coordenada x.

	y {Numeric} - coordenada y.

	Returns:

	{Array} - Array com o valor de x [0] e y [1] no formato dd mm ss
	*/
	dd2dms: function(x,y){
		var m = 0;
		var s = 0;
		var dx = parseInt(x);
		if (dx > 0)
		{var restod = x - dx;}
		if (dx < 0)
		{restod = (x * -1) - (dx * -1);}
		dx = dx;
		if (restod != 0){
			var mm = restod * 60;
			var m = parseInt(restod * 60);
			var restos = mm - m;
			var mx = m;
			if (restos != 0){
				var s = restos * 60;
				var s = (s+"_").substring(0,5);
				var sx = s;
			}
			else  { s = "00.00" }
		}
		else{
			var mx = "00";
			var sx = "00.00";
		}
		if (m.length == 2){m = "0"+m+"";}
		if (s*1 < 10){s = "0"+s;}
		var xv = dx+" "+mx+" "+sx;
		var m = 0;
		var s = 0;
		var dy = parseInt(y);
		if (dy > 0)
		{var restod = y - dy;}
		if (dy < 0)
		{var restod = (y * -1) - (dy * -1);}
		dy = dy;
		if (restod != 0){
			var mm = restod * 60;
			var m = parseInt(restod * 60);
			var restos = mm - m;
			var my = m;
			if (restos != 0){
				var s = restos * 60;
				s = (s+"_").substring(0,5);
				var sy = s;
			}
			else  { var s = "00.00";}
		}
		else{
			var my = "00";
			var sy = "00.00";
		}
		if (m.length == 2){m = "0"+m;}
		if (s*1 < 10){s = "0"+s;}
		var yv = dy+" "+my+" "+sy;
		var res = new Array();
		res[0] = xv;
		res[1] = yv;
		return res;
	},
	/*
	Function: tela2dd

	Converte o x,y de unidades de tela para d�cimo de grau.

	Parameters:

	xfign {Numeric} - x em valores de imagem.

	yfign {Numeric} - y em coordenadas de imagem.

	g_celula {Numeric} - tamanho no terreno do pixel da imagem em dd.

	imgext {String} - extens�o geogr�fica do mapa.

	Returns:

	{Array} - Coordena em dd x[0] e y[1].
	*/
	tela2dd: function(xfign,yfign,g_celula,imgext){
		try
		{
			if (navm){
				xfign = xfign - 2.2;
				yfign = yfign - 2.7;
			}
			else{
				xfign = xfign - 0.12;
				yfign = yfign - 1.05;
			}
			var nx = g_celula * xfign;
			var ny = g_celula * yfign;
			var amext = imgext.split(" ");
			var longdd = (amext[0] * 1) + nx;
			var latdd = (amext[3] * 1) - ny;
			var res = new Array();
			res[0] = longdd;
			res[1] = latdd;
			return (res);
		}
		catch(e){return(0);}
	},
	/*
	Function area

	Calcula a �rea de um pol�gono.

	Os pontos s�o obtidos do objeto pontos

	Para o c�lculo da �rea, � feito o c�lculo do n�mero de pixel abrangido pelo pol�gono e multiplicado pela resolu��o de cada pixel.

	Refer�ncia - http://www.mail-archive.com/mapserver-users@lists.umn.edu/msg07052.html
	
	Parameters:
	
	pontos {Array} - array com a lista de pontos pontos.xtela corresponde a um array com os valores de x e pontos.ytela aos valores de y
	
	pixel {Numeric} - �rea de cada pixel no mapa
	
	Return:
	
	Type:
	{Numeric}
	*/
	area: function(pontos,pixel){
		try{
			if(pontos.xpt.length > 2){
				var $array_length = pontos.xpt.length;
				pontos.xtela.push(pontos.xtela[0]);
				pontos.ytela.push(pontos.ytela[0]);
				pontos.xtela.push(pontos.xtela[0]);
				pontos.ytela.push(pontos.ytela[1]);
				var $polygon_area = 0;
				for (var $i=0;$i <= $array_length;$i++)
				{$polygon_area += ((pontos.xtela[$i] * pontos.ytela[$i+1])-(pontos.ytela[$i] * pontos.xtela[$i+1]));}
				$polygon_area = Math.abs($polygon_area) / 2;
			}
			else
			{$polygon_area = "Sao necessarios pelo menos tres pontos para o calculo";}
			return $polygon_area*pixel;
		}
		catch(e){return (0);}
	},
	/*
	Function: distancia

	Calcula a dist�ncia entre dois pontos.
	
	Baseado no site http://www.wcrl.ars.usda.gov/cec/java/lat-long.htm

	Parameters:

	lga {Numeric} - x inicial.

	lta {Numeric} - y inicial

	lgb {Numeric} - x final

	ltb {Numeric} - y final
	
	Return:
	
	Type:
	{Numeric}
	*/	
	distancia: function(lga,lta,lgb,ltb){
		try{
			var er = 6366.707;
			var radlat1 = Math.PI * lta/180;
			var radlat2 = Math.PI * ltb/180;
			var radlong1 = Math.PI * lga/180;
			var radlong2 = Math.PI * lgb/180;
			if (lta > 0) {radlat1=Math.PI/2-radlat1;}
			if (lta < 0) {radlat1=Math.PI/2+radlat1;}
			if (lga < 0) {radlong1=Math.PI*2-radlong1;}
			if (ltb > 0) {radlat2=Math.PI/2-radlat2;}
			if (ltb < 0) {radlat2=Math.PI/2+radlat2;}
			if (lgb < 0) {radlong2=Math.PI*2-radlong2;}
			var x1 = er * Math.cos(radlong1)*Math.sin(radlat1);
			var y1 = er * Math.sin(radlong1)*Math.sin(radlat1);
			var z1 = er * Math.cos(radlat1);
			var x2 = er * Math.cos(radlong2)*Math.sin(radlat2);
			var y2 = er * Math.sin(radlong2)*Math.sin(radlat2);
			var z2 = er * Math.cos(radlat2);
			var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));
			//side, side, side, law of cosines and arccos
			var theta = Math.acos((er*er+er*er-d*d)/(2*er*er));
			return theta*er;
		}
		catch(e){return (0);}
	},
	/*
	Function: rect2ext
	
	Calcula a extens�o geogr�fica de um ret�ngulo desenhado sobre o mapa.
	*/
	rect2ext: function(idrect,mapext,pixel){
		eval ('pix = parseInt(document.getElementById("'+idrect+'").style.' + g_tipoleft + ")");
		eval ('piy = parseInt(document.getElementById("'+idrect+'").style.' + g_tipotop + ")");
		if($i(idrect)){
			var bx = $i(idrect);
			var bxs = bx.style;
		}
		else
		{alert("Box nao encontrado");return;}
		var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
		var xfig0 = parseInt(bxs.width) - pos[0];
		var yfig0 = parseInt(bxs.height) - pos[1];
		var xfig = pix + (parseInt(bxs.width)) - pos[0];
		var yfig = piy + (parseInt(bxs.height)) - pos[1];
		var amext = mapext.split(" ");
		var dx = ((amext[0] * -1) - (amext[2] * -1)) / -1;
		var dy = ((amext[1] * 1) - (amext[3] * 1)) / -1;
		if (dy < 0) dy=dy * -1;
		var nx = pixel * xfig;
		var ny = pixel * yfig;
		var x1 = (amext[0] * 1) + nx;
		var y1 = (amext[3] * 1) - ny;
		var xfig = pix - pos[0];
		var yfig = piy - pos[1];
		if (dy < 0) dy=dy * -1;
		var nx = i3GEO.parametros.pixelsize * xfig;
		var ny = i3GEO.parametros.pixelsize * yfig;
		var x2 = (amext[0] * 1) + nx;
		var y2 = (amext[3] * 1) - ny;
		var v = x2+" "+y2+" "+x1+" "+y1;
		var res = new Array(v,x1,y1,x2,y2);
		return (res);
	}
};
//YAHOO.log("carregou classe calculo", "Classes i3geo");
/*
Title: Desenho de elementos gr�ficos

File: i3geo/classesjs/classe_desenho.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.desenho

Controla as opera��es de desenho sobre o mapa

Por desenho, entende-se elementos que s�o inclu�dos graficamente no mapa,
como por exemplo, linhas, pontos, c�rculos, etc e que n�o comp�em layers
com dados
*/
i3GEO.desenho = {
	/*
	Variable: richdraw
	
	Objeto richdraw criado por criaContainerRichdraw
	
	Type:
	{richdraw object}
	*/
	richdraw: "",
	/*
	Function: criaContainerRichdraw

	Cria os elementos 'dom' necess�rios ao uso das fun��es de desenho sobre o mapa.

	As ferramentas de c�lculo de dist�ncias e �reas utilizam esse container.

	Richdraw � uma biblioteca utilizada pelo i3geo para abstrair as diferen�as entre as linguagens svg e vml.

	Essa abstra��o � necess�ria devido �s diferen�as entre os navegadores.
	
	O container � criado dentro de um DIV chamado "divGeometriasTemp"
	
	Essa fun��o cria tamb�m o objeto pontosdistobj que � utilizado para armazenar
	os dados obtidos da movimenta��o do mouse sobre o mapa
	
	*/
	criaContainerRichdraw: function(){
		pontosdistobj = {
			xpt: new Array(),
			ypt: new Array(),
			dist: new Array(),
			xtela: new Array(),
			ytela: new Array(),
			ximg: new Array(),
			yimg: new Array(),
			linhas: new Array()
		};
		try{
			var divgeo = i3GEO.desenho.criaDivContainer();
			divgeo.innerHTML = "";
			var renderer;
			//
			//cria o objeto renderer conforme o browser em uso
			//esse objeto ser� utilizado nas fun��es de desenho
			//mais detalhes, veja em pacotes/richdraw
			//Conforme a resposta do navegador, utiliza-se a cria��o VML ou SVG
			//
			try{
				renderer = new VMLRenderer();
				i3GEO.desenho.richdraw = new RichDrawEditor(divgeo, renderer);
			}
			catch(e){
				renderer = new SVGRenderer();
				i3GEO.desenho.richdraw = new RichDrawEditor(divgeo, renderer);
			}
			//
			//defini��o dos s�mbolos default para os elementos gr�ficos
			//
			i3GEO.desenho.richdraw.editCommand('fillcolor', 'red');
			i3GEO.desenho.richdraw.editCommand('linecolor', 'gray');
			i3GEO.desenho.richdraw.editCommand('linewidth', '1px');
			i3GEO.desenho.richdraw.editCommand('mode', 'line');
			divgeo.style.display="block";
			//
			//ap�s o container ser criado, � necess�rio que as fun��es
			//de clique sobre o mapa sejam ativadas
			//para funcionarem sobre o container
			//
			i3GEO.eventos.ativa(divgeo);
		}
		catch(e){alert("Erro ao tentar criar container richdraw");}
	},
	/*
	Function: criaDivContainer
	
	Cria o elemento DIV que ser� utilizado para renderizar os elementos gr�ficos
	
	Return:
	
	DOM object
	*/
	criaDivContainer: function(){
		if (!$i("divGeometriasTemp")){
			//
			//pega a posi��o da imagem do mapa para posicionar corretamente o container
			//
			var pos = [0,0];
			if($i("img"))
			var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
			//
			//cria o container
			//
			var novoel = document.createElement("div");
			novoel.id = "divGeometriasTemp";
			var ne = novoel.style;
			ne.cursor="crosshair";
			ne.zIndex=0;
			ne.position="absolute";
			ne.width=i3GEO.parametros.w;
			ne.height=i3GEO.parametros.h;
			ne.border="1px solid black";
			ne.display="none";
			ne.top=pos[1];
			ne.left=pos[0];
			document.body.appendChild(novoel);
		}
		return ($i("divGeometriasTemp"));	
	},
	/*
	Function: aplica

	Desenha ou reposiciona elementos na tela usando a biblioteca richdraw

	Parameters:

	tipo - resizelinha|resizePoligono|insereCirculo tipo de opera��o

	objeto - objeto gr�fico existnente no container richdraw

	n - �ndice do elemento no array pontosdistobj com 
	*/	
	aplica: function(tipo,objeto,n){
		if(i3GEO.desenho.richdraw && $i("img")){
			var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
			//
			//faz o reposicionamento de linhas quando o mouse � movido e a linha est� ativa
			//
			if((tipo=="resizeLinha") || (tipo=="resizePoligono") && navn){
				try
				{i3GEO.desenho.richdraw.renderer.resize(objeto,0,0,objposicaocursor.imgx,objposicaocursor.imgy);}
				catch(e){window.status=n+" erro ao movimentar a linha ";}
			}
			if((tipo=="resizeLinha") && navm){
				try{
					//
					//no caso do ie, a linha tem de ser removida e desenhada novamente
					//
					var r = $i(i3GEO.desenho.richdraw.container.id);
					r.removeChild(r.lastChild);
					var dy = objposicaocursor.imgy;
					var dx = objposicaocursor.imgx - (i3GEO.parametros.w/2);
					i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(i3GEO.parametros.w/2)-1,pontosdistobj.yimg[n-1]-3,dx,dy-3);
				}
				catch(e){window.status=n+" erro ao movimentar a linha ";}			
			}
			if((tipo=="resizePoligono") && navm){
				try{
					var r = $i(i3GEO.desenho.richdraw.container.id);
					r.removeChild(r.lastChild);
					r.removeChild(r.lastChild);
					var dy = objposicaocursor.imgy;
					var dx = objposicaocursor.imgx - (i3GEO.parametros.w/2);
					i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(i3GEO.parametros.w/2)-1,pontosdistobj.yimg[n-1]-3,dx,dy-3);
					i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[0])-(i3GEO.parametros.w/2)-1,pontosdistobj.yimg[0]-3,dx,dy-3);
				}
				catch(e){window.status=n+" erro ao movimentar a linha ";}			
			}
			if(tipo=="insereCirculo"){
				var dx = Math.pow(((pontosdistobj.xtela[n])*1) - ((pontosdistobj.xtela[n-1])*1),2);
				var dy = Math.pow(((pontosdistobj.ytela[n])*1) - ((pontosdistobj.ytela[n-1])*1),2);
				var w = Math.sqrt(dx + dy);
				if (navn){
					try{
						i3GEO.desenho.richdraw.renderer.create('circ', '', 'rgb(250,250,250)', i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n-1],pontosdistobj.yimg[n-1],w,w);
					}
					catch(e){}
				}
				else{
					try{
						i3GEO.desenho.richdraw.renderer.create('circ', '', 'rgb(250,250,250)', i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n-1]-w,pontosdistobj.yimg[n-1]-w,w*2,w*2);
					}
					catch(e){}
				}
			}
		}
	}
};
//YAHOO.log("carregou classe desenho", "Classes i3geo");
/*
Title: Interface

File: i3geo/classesjs/classe_interface.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.interface

Funcoes que controlam o comportamento espec�fico de determinadas interfaces

As interfaces s�o definidas na inicializa��o do i3Geo, por exemplo, openlayers, flamingo,etc

A classe "interface" cont�m os m�tdos espec�ficos utilizados nessas interfaces

Exemplo:

Para iniciar o i3geo com uma interface espec�fica, utilize http://localhost/i3geo/ms_criamapa.php?interface=flamingo.htm
O HTML deve conter as defini��es da interface criada e deve estar armazenado em i3geo/aplicmap
*/
i3GEO.interface = {
	/*
	Property: ATUAL
	
	Interface atual em uso.
	
	Default:
	padrao
	*/
	ATUAL: "padrao",
	/*
	Property: IDCORPO
	
	ID do elemento HTML que receber� o corpo do mapa
	*/
	IDCORPO: "corpoMapa",
	/*
	Variable: IDMAPA
	
	ID do elemento HTML criado para conter o mapa
	Esse elemento normalmente � criado dentro de IDCORPO dependendo da interface
	*/
	IDMAPA: "",
	/*
	Function: redesenha
	
	Aplica o m�todo redesenha da interface atual
	*/
	redesenha: function(){
		eval("i3GEO.interface."+i3GEO.interface.ATUAL+".redesenha()");
	},
	/*
	Function: cria
	
	Cria ou altera os elementos HTML necess�rios para a interface
	
	Essa fun��o � executada na inicializa��o do i3geo
	
	Parameters:
	
	w {Integer} - largura do corpo do mapa em pixels
	
	h {Integer} - altura do corpo do mapa em pixels
	*/
	cria: function(w,h){
		eval("i3GEO.interface."+i3GEO.interface.ATUAL+".cria("+w+","+h+")");
	},
	/*
	Function: inicia
	
	Inicia a interface
	*/
	inicia: function(w,h){
		eval("i3GEO.interface."+i3GEO.interface.ATUAL+".inicia()");
	},
	/*
	Function: ativaBotoes
	
	Ativa os bot�es de ferramentas
	*/
	ativaBotoes: function(){
		eval("i3GEO.interface."+i3GEO.interface.ATUAL+".ativaBotoes()");
	},
	padrao:{
		redesenha:function(){
			$i("img").onload =  function()
			{
				$i("img").onload = "";
				//atualiza quadro
				i3GEO.gadgets.quadros.grava("imagem",i3GEO.parametros.mapimagem);
				i3GEO.gadgets.quadros.grava("extensao",i3GEO.parametros.mapexten);
				var temp = function(retorno){
					eval(retorno.data);
					i3GEO.gadgets.quadros.grava("legenda",legimagem);
				};
				i3GEO.mapa.legendaIMAGEM.obtem(temp);
				if ($i("imgtemp"))
				{$i("imgtemp").style.display="none";}
				//necess�rio na fun��o de zoom por slide
				if ($i("imgClone"))
				$i("imgClone").style.display = "none";
				$i("img").style.display = "block";			
				i3GEO.janela.fechaAguarde("ajaxCorpoMapa");
			};
			if (!$i("imgtemp"))
			{
				var ndiv = document.createElement("div");
				ndiv.id = "imgtemp";
				ndiv.style.position = "absolute";
				ndiv.style.border = "1px solid blue";
				document.getElementById("corpoMapa").appendChild(ndiv);
			}
			if(g_tipoacao == "pan")
			{
				$i("imgtemp").style.left = parseInt($i("img").style.left);
				$i("imgtemp").style.top = parseInt($i("img").style.top);
				$i("imgtemp").style.width = i3GEO.parametros.w;
				$i("imgtemp").style.height = i3GEO.parametros.h;
				$i("imgtemp").style.display="block";
				$i("imgtemp").style.backgroundImage = 'url("'+$i("img").src+'")';
			}		
			$i("img").style.left = 0;
			$i("img").style.top = 0;
			$i("img").src=i3GEO.parametros.mapimagem;
		},
		cria:function(){
			var ins = "<table>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgN' /></td><td class=verdeclaro ></td></tr>";
			ins += "<tr><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgL' /></td><td class=verdeclaro ><input style='position:relative;top:0px;left:0px'' type=image src='' id='img' /></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgO' /></td></tr>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgS' /></td><td class=verdeclaro ></td></tr>";
			ins += "</table>";
			$i(i3GEO.interface.IDCORPO).innerHTML = ins;
			i3GEO.interface.IDMAPA = "img";	
		},
		inicia:function(){
			if ($i("contemImg"))
			{var elemento = "contemImg";}
			else
			{var elemento = "img";}
			i3GEO.mapa.ajustaPosicao(elemento);
			var i = $i("img");
			i.style.width=i3GEO.parametros.w +"px";
			i.style.height=i3GEO.parametros.h +"px";
			var estilo = $i(i3GEO.interface.IDCORPO).style;
			estilo.width=i3GEO.parametros.w +"px";
			estilo.height=i3GEO.parametros.h +"px";
			estilo.clip = 'rect('+0+" "+(i3GEO.parametros.w)+" "+(i3GEO.parametros.h)+" "+0+')';
			objmapaparado = "nao"; //utilizado para verificar se o mouse esta parado
			i3GEO.gadgets.mostraMenuSuspenso();
			i3GEO.eventos.ativa(i);
			i3GEO.gadgets.mostraCoordenadasGEO();
			i3GEO.gadgets.mostraCoordenadasUTM();
			i3GEO.gadgets.mostraEscalaNumerica();
			i3GEO.gadgets.mostraEscalaGrafica();
			i3GEO.gadgets.visual.inicia();
			i3GEO.idioma.mostraSeletor();
			i3GEO.ajuda.ativaLetreiro(i3GEO.parametros.mensagens);
			i3GEO.interface.padrao.ativaBotoes();
			if (i3GEO.configura.mapaRefDisplay != "none")
			{
				if (i3GEO.util.pegaCookie("i3GEO.configura.mapaRefDisplay")){i3GEO.configura.mapaRefDisplay = i3GEO.util.pegaCookie("i3GEO.configura.mapaRefDisplay");}
				if (i3GEO.configura.mapaRefDisplay == "block"){i3GEO.maparef.inicia();}
			}
		},
		ativaBotoes: function(){
			var imagemxy = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.interface.IDCORPO));
			if ($i("barraDeBotoes1")){
				var x1 = imagemxy[0]+40;
				var y1 = imagemxy[1]+10;
			}
			if ($i("barraDeBotoes2")){
				var x2 = imagemxy[0];
				var y2 = imagemxy[1]+10;
			}
			else{
				if ($i("barraDeBotoes1")){
					var x1 = imagemxy[0];
					var x2 = imagemxy[1]+10;
				}
			}
			if ($i("barraDeBotoes1"))
			i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes1","i3geo_barra1",true,x1,y1);
			if ($i("barraDeBotoes2"))
			i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes2","i3geo_barra2",false,x2,y2);
			//ativa as fun��es dos bot�es
			i3GEO.barraDeBotoes.ativaBotoes();
			if (document.getElementById("botao3d"))
			{
				if (i3GEO.configura.map3d == ""){document.getElementById("botao3d").style.display="none";}
			}
		}
	},
	/*
	Function: flamingo
	
	Interface baseada no software flamingo (flash)
	*/
	flamingo:{
		redesenha: function(){
			var w = parseInt($i("flamingo").style.width);
			if (w == i3GEO.parametros.w)
			{$i("flamingo").style.height = parseInt($i("flamingo").style.height)+1;}
			else
			{$i("flamingo").style.height = parseInt($i("flamingo").style.height)-1;}
			i3GEO.janela.fechaAguarde();
		},
		cria: function(w,h){
			var i = $i(i3GEO.interface.IDCORPO);
			if(i){
				var f = $i("flamingo");
				if(!f){
					var ins = '<div id=flamingo style="width:0px;height:0px;text-align:left;background-image:url(/"'+i3GEO.configura.locaplic+'/imagens/i3geo1bw.jpg/")"></div>';
					i.innerHTML = ins;
				}
				var f = $i("flamingo");
				f.style.width = w;
				f.style.height = h;
				i3GEO.interface.IDMAPA = "flamingo";
			}
		},
		inicia: function(){
			var monta = function(retorno){
				$i("flamingo").style.height = i3GEO.parametros.h + 45;
				childPopups  = new Array();
				childPopupNr = 0;
				var so = new SWFObject(i3GEO.configura.locaplic+"/pacotes/flamingo/flamingo/flamingo.swf?config="+retorno.data, "flamingoi", "100%", "100%", "8", "#eaeaea");
				so.addParam("wmode","transparent"); 
				so.write("flamingo");
			}
			i3GEO.php.flamingo(monta);
			i3GEO.eventos.ativa($i("flamingo"));
			
			i3GEO.maparef.atualiza();
			if (i3GEO.configura.mapaRefDisplay != "none")
			{
				if (i3GEO.util.pegaCookie("i3GEO.configura.mapaRefDisplay")){i3GEO.configura.mapaRefDisplay = i3GEO.util.pegaCookie("i3GEO.configura.mapaRefDisplay");}
				if (i3GEO.configura.mapaRefDisplay == "block"){i3GEO.maparef.inicia();}
			}
			
		},
		ativaBotoes: function(){
		}
	},
	/*
	Function: openlayers
	
	Interface baseada no software openlayers
	
	O objeto openlayers criado nessa fun��o pode ser acessado na vari�vel i3geoOL
	*/
	openlayers:{
		redesenha: function(){
			if($i("openlayers_OpenLayers_Container")){
				var no = $i("openlayers_OpenLayers_Container");
				var divs1 = no.getElementsByTagName("div");
				var n1 = divs1.length;
				for(a=0;a<n1;a++){
					var divs2 = divs1[a].getElementsByTagName("div");
					var n2 = divs2.length;
					for(b=0;b<n2;b++){
						var imgs = divs2[b].getElementsByTagName("img");
						var nimg = imgs.length;
						for(c=0;c<nimg;c++){
							imgs[c].src += "&x";
						}
					}
				}
			}
			i3GEO.janela.fechaAguarde();
		},
		cria: function(w,h){
			var i = $i(i3GEO.interface.IDCORPO);
			if(i){
				var f = $i("openlayers");
				if(!f){
					var ins = '<div id=openlayers style="width:0px;height:0px;text-align:left;background-image:url('+i3GEO.configura.locaplic+'/imagens/i3geo1bw.jpg)"></div>';
					i.innerHTML = ins;
				}
				var f = $i("openlayers");
				f.style.width = w;
				f.style.height = h;
			}
			i3GEO.interface.IDMAPA = "openlayers";
		},
		inicia: function(){
			var montaMapa = function(){
				var url = window.location.protocol+"//"+window.location.host+i3GEO.parametros.cgi+"?";
				url += "map="+i3GEO.parametros.mapfile+"&mode=map&SRS=epsg:4326&";
				i3geoOL = new OpenLayers.Map('openlayers', { controls: [] });
				i3geoOLlayer = new OpenLayers.Layer.WMS( "Temas I3Geo", url,{layers:'estadosl'},{'buffer':0},{isBaseLayer:true, opacity: 1});
				i3geoOLlayer.setVisibility(true);
				i3geoOL.addLayer(i3geoOLlayer);
				i3geoOL.events.register("mousemove", i3geoOL, function(e){
					//pega as coordenadas do cursor
					if (navm)
					{var p = new OpenLayers.Pixel(e.x,e.y);}
					else
					{var p = e.xy;}
					//altera o indicador de localizacao
					var lonlat = i3geoOL.getLonLatFromViewPortPx(p);
					var d = i3GEO.calculo.dd2dms(lonlat.lon,lonlat.lat);
					try{
						objposicaomouse.x = p.x;
						objposicaomouse.y = p.y;
						objposicaocursor.ddx = lonlat.lon;
						objposicaocursor.ddy = lonlat.lat;
						objposicaocursor.telax = p.x;
						objposicaocursor.telay = p.y;
						var dc = $i("i3geo");
						if ($i("openlayers_OpenLayers_Container")){var dc = $i("openlayers_OpenLayers_Container");}
						while (dc.offsetParent){
							dc = dc.offsetParent;
							objposicaocursor.telax = objposicaocursor.telax + dc.offsetLeft;
							objposicaocursor.telay = objposicaocursor.telay + dc.offsetTop;
						}
						//movecursor();
					}
					catch(e){}
				});
				var pz = new OpenLayers.Control.PanZoomBar({numZoomLevels: 5});
				i3geoOL.addControl(pz);
				pz.div.style.zIndex = 5000;
				$i("OpenLayers_Control_PanZoom_pandown").style.top=parseInt($i("OpenLayers_Control_PanZoom_pandown").style.top)+5;
				$i("OpenLayers_Control_PanZoom_panup").style.top=parseInt($i("OpenLayers_Control_PanZoom_panup").style.top)+5;
				$i("OpenLayers_Control_PanZoom_panleft").style.top=parseInt($i("OpenLayers_Control_PanZoom_panleft").style.top)+5;
				$i("OpenLayers_Control_PanZoom_panright").style.top=parseInt($i("OpenLayers_Control_PanZoom_panright").style.top)+5;
				var navc = new OpenLayers.Control.NavToolbar();
				i3geoOL.addControl(navc);
				navc.div.style.left="8px";
				navc.div.style.top="-20px";
				navc.div.onclick = function(){
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"pan","img",i3GEO.configura.locaplic);
					g_operacao="navega";
				};

    			zb = new OpenLayers.Control.ZoomToMaxExtent();
				var botoesadic = new OpenLayers.Control.Panel();

    			botoesadic.addControls([
       				new OpenLayers.Control.ZoomToMaxExtent()
    			]);
    			i3geoOL.addControl(botoesadic);
    			botoesadic.div.style.left="10px";
    			botoesadic.div.style.top=parseInt($i("OpenLayers_Control_PanZoom_zoomout").style.top)+77;
	
				i3geoOL.addControl(new OpenLayers.Control.LayerSwitcher());

				var m = i3GEO.parametros.mapexten.split(" ");
				var b = new OpenLayers.Bounds(m[0],m[1],m[2],m[3]);
				i3geoOL.zoomToExtent(b);

				i3geoOL.addControl(new OpenLayers.Control.Scale("escalanumerica"));
				i3geoOL.addControl(new OpenLayers.Control.KeyboardDefaults());	
				//var ol_overview = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://labs.metacarta.com/wms/vmap0",{layers: 'basic'});
				//var options = {layers: [ol_overview],minRatio: 8,maxRatio: 128};
				//var overview = new OpenLayers.Control.OverviewMap(options);
				//i3geoOL.addControl(overview);
				i3GEO.eventos.ativa($i("openlayers"));
				var pos = i3GEO.util.pegaPosicaoObjeto($i("openlayers"));
				if ($i("aguarde")){
					$top("aguarde",pos[1]);
					$left("aguarde",pos[0]);
				}
			};
			i3GEO.php.openlayers(montaMapa);
		},
		ativaBotoes: function(){
		}
	},
	/*
	Function: googlemaps
	
	Interface baseada no software googlemaps
	
	O objeto criado com a API do google maps pode ser acessado na vari�vel i3GeoMap
	*/
	googlemaps:{
		/*
		Property: OPACIDADE
		
		Valor da opacidade da camada i3geo do mapa
		
		Varia de 0 a 1
		
		Default:
		0.8
		
		Type:
		{Numeric}
		*/
		OPACIDADE: 0.8,
		redesenha: function(){
   			if(i3GeoMap != ""){
   				i3GeoMap.removeOverlay(i3GEOTileO);
   				posfixo = posfixo + "&";
   				//wmsmap = new GGroundOverlay(i3GEO.interface.googlemaps.criaWMS()+posfixo, i3GeoMap.getBounds());
   				var i3GEOTile = new GTileLayer(null,0,18,{
                     tileUrlTemplate:i3GEO.interface.googlemaps.criaTile()+posfixo,
                     isPng:true,
                     opacity:i3GEO.interface.googlemaps.OPACIDADE });
                i3GEOTileO = new GTileLayerOverlay(i3GEOTile);
    			i3GeoMap.addOverlay(i3GEOTileO);
				//i3GeoMap.addOverlay(i3GEOTile);
			}
		},
		cria: function(w,h){
			posfixo = "&";
			var i = $i(i3GEO.interface.IDCORPO);
			if(i){
				var f = $i("googlemaps");
				if(!f){
					var ins = '<div id=googlemaps style="width:0px;height:0px;text-align:left;background-image:url('+i3GEO.configura.locaplic+'/imagens/i3geo1bw.jpg)"></div>';
					i.innerHTML = ins;
				}
				var f = $i("googlemaps");
				f.style.width = w;
				f.style.height = h;
			}
			i3GeoMap = "";
			i3GEO.interface.IDMAPA = "googlemaps";
		},
		inicia: function(){
    		i3GEO.janela.slider("i3GEO.interface.googlemaps.mudaOpacidade","150");
    		var pol = i3GEO.parametros.mapexten;
    		var ret = pol.split(" ");
    		var pt1 = (( (ret[0] * -1) - (ret[2] * -1) ) / 2) + ret[0] *1;
    		var pt2 = (((ret[1] - ret[3]) / 2)* -1) + ret[1] *1;
    		i3GeoMap = new GMap2($i("googlemaps"));
    		i3GeoMap.setMapType(G_SATELLITE_MAP);
    		i3GeoMap.addControl(new GLargeMapControl());
    		i3GeoMap.addControl(new GMapTypeControl());
    		var bottomLeft = new GControlPosition(G_ANCHOR_BOTTOM_LEFT,new GSize(0,40));
    		i3GeoMap.addControl(new GScaleControl(),bottomLeft);
    		var bottomRight = new GControlPosition(G_ANCHOR_BOTTOM_RIGHT);
    		i3GeoMap.addControl(new GOverviewMapControl(),bottomRight);
    		i3GeoMap.setCenter(new GLatLng(pt2,pt1), 4);   		
    		//wmsmap = new GGroundOverlay(i3GEO.interface.googlemaps.criaWMS(), i3GeoMap.getBounds());
			//i3GeoMap.addOverlay(wmsmap);
    		var i3GEOTile = new GTileLayer(null,0,18,{
                                 tileUrlTemplate:i3GEO.interface.googlemaps.criaTile(),
                                 isPng:true,
                                 opacity:i3GEO.interface.googlemaps.OPACIDADE });
    		
    		i3GEOTileO = new GTileLayerOverlay(i3GEOTile);
    		i3GeoMap.addOverlay(i3GEOTileO);
    		var myMapType = new GMapType([i3GEOTile], new GMercatorProjection(18), 'i3Geo');
    		i3GeoMap.addMapType(myMapType);
    		
    		/*
    		GEvent.addListener(i3GeoMap, "zoomend", function() {
    			i3GeoMap.removeOverlay(wmsmap);
    			wmsmap = new GGroundOverlay(i3GEO.interface.googlemaps.criaWMS(), i3GeoMap.getBounds());
				i3GeoMap.addOverlay(wmsmap);
    		});
    		GEvent.addListener(i3GeoMap, "dragend", function() {
    			i3GeoMap.removeOverlay(wmsmap);
    			wmsmap = new GGroundOverlay(i3GEO.interface.googlemaps.criaWMS(), i3GeoMap.getBounds());
				i3GeoMap.addOverlay(wmsmap);
    		});
    		*/
			i3GEO.interface.googlemaps.ativaBotoes();
			i3GEO.eventos.ativa($i("googlemaps"));
			i3GEO.gadgets.mostraCoordenadasGEO();
			i3GEO.gadgets.mostraMenuSuspenso();
			var pos = i3GEO.util.pegaPosicaoObjeto($i("googlemaps"));
			GEvent.addListener(i3GeoMap, "mousemove", function(ponto) {
    			var teladms = i3GEO.calculo.dd2dms(ponto.lng(),ponto.lat());
    			var tela = i3GeoMap.fromLatLngToContainerPixel(ponto);
    			objposicaocursor = {
					ddx: ponto.lng(),
					ddy: ponto.lat(),
					dmsx: teladms[0],
					dmsy: teladms[1],
					imgx:tela.x,
					imgy:tela.y,
					telax: tela.x + pos[0],
					telay: tela.y + pos[1]
				};
    		});
		},
		bbox: function(){
			var bd = i3GeoMap.getBounds();
			var so = bd.getSouthWest();
			var ne = bd.getNorthEast();
			var bbox = so.lng()+" "+so.lat()+" "+ne.lng()+" "+ne.lat();
			return (bbox);
		},
		criaWMS: function(){
		   	var cgi = i3GEO.configura.locaplic+"/classesphp/parse_cgi.php?g_sid="+i3GEO.configura.sid;
    		var parametros = "&map_size="+parseInt($i("googlemaps").style.width);
    		parametros += ","+parseInt($i("googlemaps").style.height);
    		parametros += "&mapext="+i3GEO.interface.googlemaps.bbox();
    		parametros += "&map_imagecolor=-1 -1 -1&map_transparent=on";
    		return(cgi+parametros);
		},
		criaTile: function(){
		   	var cgi = i3GEO.util.protocolo()+"://"+window.location.host+i3GEO.parametros.cgi+"?";
    		var parametros = "map="+i3GEO.parametros.mapfile;
        	parametros += '&mode=tile';
        	parametros += '&tilemode=gmap';
        	parametros += '&tile={X}+{Y}+{Z}';
    		//alert(cgi+parametros)
    		return(cgi+parametros);		
		},
		ativaBotoes: function(){
			var imagemxy = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.interface.IDCORPO));
			if ($i("barraDeBotoes2")){
				var x2 = imagemxy[0]+80;
				var y2 = imagemxy[1]+10;
			}
			if ($i("barraDeBotoes2"))
			i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes2","i3geo_barra2",false,x2,y2);
			//ativa as fun��es dos bot�es
			i3GEO.barraDeBotoes.ativaBotoes();
		},
		mudaOpacidade: function(valor){
			//$i("xg").value = valor / 200;
			i3GEO.interface.googlemaps.OPACIDADE = valor / 200;
			i3GEO.interface.googlemaps.redesenha();
		}
	},
	/*
	Function: googleearth
	
	Interface baseada no software googlemaps
	
	O objeto criado com a API do google maps pode ser acessado na vari�vel i3GeoMap
	*/
	googleearth:{
		redesenha: function(){
		},
		cria: function(w,h){
			var i = $i(i3GEO.interface.IDCORPO);
			if(i){
				i3GeoMap = document.createElement("iframe");
				i3GeoMap.style.width = w;
				i3GeoMap.style.height = h;
				i.appendChild(i3GeoMap);
			}
			i3GEO.interface.IDMAPA = "googleearth";
		},
		inicia: function(){
		//http://mapas.mma.gov.br/i3geo/pacotes/kmlmapserver/kmlservice.php?map=bioma&typename=bioma&request=kml
			i3GeoMap.src = "http://www.gmodules.com/ig/ifr?url=http://hosting.gmodules.com/ig/gadgets/file/114026893455619160549/embedkmlgadget.xml&up_kml_url=http%3A%2F%2Fmapas.mma.gov.br%2Fi3geo%2Fpacotes%2Fkmlmapserver%2Fkmlservice.php%3Fmap%3Dbioma%26typename%3Dbioma%26request%3Dkml&up_view_mode=earth&up_earth_2d_fallback=0&up_earth_fly_from_space=1&up_earth_show_buildings=0&synd=open&w=320&h=400&title=Embedded+KML+Viewer&border=%23ffffff%7C3px%2C1px+solid+%23999999&source=http%3A%2F%2Fwww.gmodules.com%2Fig%2Fcreator%3Fsynd%3Dopen%26url%3Dhttp%3A%2F%2Fhosting.gmodules.com%2Fig%2Fgadgets%2Ffile%2F114026893455619160549%2Fembedkmlgadget.xml";
			
		},
		ativaBotoes: function(){
		}
	}
};
//YAHOO.log("carregou classe interface", "Classes i3geo");
/*
Title: Mapa

File: i3geo/classesjs/classe_mapa.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.mapa

Cria e processa o mapa principal

Em i3GEO.mapa.dialogo est�o as fun��es de abertura dos di�logos para altera��o das propriedades do mapa,
como cor de fundo, tipo de imagem, legenda etc.
*/
i3GEO.mapa = {
	/*
	Function: ajustaPosicao
	
	Ajusta o posicionamento do corpo do mapa
	
	Esse ajuste � necess�rio na inicializa��o, uma vez que o mapa utiliza style.position='absolute'
	
	Parameters:
	
	elemento {String} - id do elemento HTML que dever� ser ajustado e que cont�m o mapa
	*/
	ajustaPosicao: function(elemento){
		if(arguments.length == 0){return;}
		try{
			imagemxi = 0;
			imagemyi = 0;
			imagemxref = 0;
			imagemyref = 0;
			var dc = $i("i3geo");
			if(!dc){return;}
			if (dc.style.left){imagemxi += parseInt(dc.style.left);}
			if (dc.style.top){imagemyi += parseInt(dc.style.top);}	
			var dc = $i(elemento);
			while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo")){
				dc = dc.offsetParent;
				imagemxi = imagemxi + dc.offsetLeft;
				imagemyi = imagemyi + dc.offsetTop;
			}	
			var c = $i(i3GEO.interface.IDCORPO);
			if (c){
				c.style.position="absolute";
				$left(i3GEO.interface.IDCORPO,imagemxi);
				$top(i3GEO.interface.IDCORPO,imagemyi);
				if ($i("i3geo").style.left){$left(i3GEO.interface.IDCORPO,imagemxi - parseInt($i("i3geo").style.left));}
				if ($i("i3geo").style.top){$top(i3GEO.interface.IDCORPO,imagemyi - parseInt($i("i3geo").style.top));}
			}
		}
		catch(e){alert("Ocorreu um erro. i3GEO.mapa.ajustaPosicao"+e);}
	},
	/*
	Function: ativaLogo

	Ativa ou desativa a logo marca.
	*/
	ativaLogo: function(){
		i3GEO.php.ativalogo(i3GEO.atualiza);
	},
	/*
	Function: insereToponimo
	
	Insere um texto no mapa na posi��o clicada

	O ponto � obtido do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
	*/
	insereToponimo: function(){
		if (g_tipoacao == "textofid"){
			//
			//pega os par�metros da janela flutuante aberta
			//
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			texto = doc.getElementById("texto").value;
			var f = doc.getElementById("fonte").value;
			var t = doc.getElementById("tamanho").value;
			var a = doc.getElementById("angulo").value;
			var cf = doc.getElementById("fundoc").value;
			if (cf == ""){cf = "off";}
			var cs = doc.getElementById("sombra").value;
			if (cs == ""){cs = "off";}
			var xs = doc.getElementById("sombrax").value;
			var ys = doc.getElementById("sombray").value;
			var c = doc.getElementById("frente").value;
			var m = doc.getElementById("mascara").value;
			if (m == ""){m = "off";}
			var fcs = doc.getElementById("frentes").value;
			if (fcs == ""){fcs = "off";}
			var fxs = doc.getElementById("frentex").value;
			var fys = doc.getElementById("frentey").value;
			var forca = doc.getElementById("force").value;
			var md = doc.getElementById("mindistance").value;
			var mf = doc.getElementById("minfeaturesize").value;
			var ox = doc.getElementById("offsetx").value;
			var oy = doc.getElementById("offsety").value;
			var pl = doc.getElementById("partials").value;
			var pos = doc.getElementById("position").value;
			//o texto ser� digitado
			var digi = function(retorno){
				//se texto for igual a vazio � pq o valor foi pego de um atributo
				if(texto == ""){
					i3GEO.janela.fechaAguarde("i3GEO.atualiza");
					texto = retorno.data;
				}
				if (texto != " "){
					i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
					i3GEO.php.insereAnnotation(i3GEO.atualiza,g_nomepin+"topo",objposicaocursor.ddx+" "+objposicaocursor.ddy,texto,pos,pl,ox,oy,mf,md,forca,fcs,fxs,fys,m,c,ys,xs,cs,cf,a,t,f);
				}
			};
			if (doc.getElementById("tipoInsere").value == "digitando")
			{digi.call();}
			else{
				//o texto ser� capturado de um atributo do elemento
				texto = "";
				if ((doc.getElementById("temasLigados")) && (doc.getElementById("itemsel"))){
					var tema = doc.getElementById("temasLigados").value;
					var item = doc.getElementById("itemsel").value;
					i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
					i3GEO.php.identificaunico(digi,objposicaocursor.ddx+","+objposicaocursor.ddy,tema,item);
				}			
			}
		}
		else{i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.insereToponimo()");}
	},
	/*
	Function: inserePonto
	
	Insere um ponto no mapa na posi��o clicada

	O ponto � obtidos do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
	*/
	inserePonto: function(){
		if (g_tipoacao == "inserexy"){
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if(doc.getElementById("resultado")){
				var ins = doc.getElementById("resultado").innerHTML;
				ins = ins + "<div style='font-size:12px' >" + objposicaocursor.ddx +" " + objposicaocursor.ddy + "</div><br>";
				doc.getElementById("resultado").innerHTML = ins;
			}
			var item = "";
			var valoritem = "";
			if((doc.getElementById("valorItem")) && (doc.getElementById("itemtema"))){
				var item = doc.getElementById("itemtema").value;
				var valoritem = doc.getElementById("valorItem").value;
			}
			if (g_nomepin == ""){alert("Nenhum tema definido para editar");}
			else{
				i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
				i3GEO.php.insereSHP(i3GEO.atualiza,g_nomepin,item,valoritem,objposicaocursor.ddx+" "+objposicaocursor.ddy);
			}
		}
	},
	/*
	Function: insereGrafico
	
	Insere um grafico no mapa na posi��o clicada

	O ponto � obtidos do objeto objposicaocursor e os demais par�metros da janela interna aberta no iframe "wdocai"
	*/
	insereGrafico: function(){
		if (g_tipoacao == "inseregrafico"){
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var tema = doc.getElementById("temasLigados").value;
			var width = doc.getElementById("w").value;
			var inclinacao = doc.getElementById("inclinacao").value;
			var shadow_height = doc.getElementById("sombra").value;
			if (tema == ""){alert("Nenhum tema definido para pegar os dados");}
			else{
				//pega os itens e as cores definidas
				var listadeitens = new Array();
				var g = doc.getElementById("listai");
				var iguias = g.getElementsByTagName("input");
				var i = iguias.length-1;
				if (i >= 0){
					do{
						if (iguias[i].checked == true){
							var it = iguias[i].id;
							var c = doc.getElementById("cor"+it).value;
							listadeitens.push(it+","+c);
						}
					}
					while(i--)
				}
				var itens = listadeitens.join("*");
				if (itens == "")
				{alert("Nenhum item foi escolhido");}
				else{
					i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
					i3GEO.php.insereSHPgrafico(i3GEO.atualiza,tema,objposicaocursor.ddx,objposicaocursor.ddy,itens,shadow_height,width,inclinacao);
				}
			}
		}
	},
	/*
	Class: i3GEO.mapa.recupera
	
	Tenta recuperar o mapa de backup caso ocorra algum problema
	
	O i3Geo mant�m sempre uma c�pia do arquivo mapfile em uso. Essa fun��o tenta
	usar essa c�pia para restaurar o funcionamento do mapa
	*/
	recupera:{
		/*
		Variable: TENTATIVA
		
		Armazena a quantidade de tentativas de recupera��o que foram feitas
		
		Type:
		{Integer}
		*/
		TENTATIVA: 0,
		/*
		Function: inicia
		
		Inicia a tentativa de recupera��o
		*/
		inicia: function(){
			i3GEO.mapa.ajustaPosicao();
			i3GEO.janela.fechaAguarde();
			if(i3GEO.mapa.recupera.TENTATIVA == 0){
				i3GEO.mapa.recupera.TENTATIVA++;
				i3GEO.mapa.recupera.restaura();
			}
		},
		/*
		Function: restaura
		
		Restaura o mapa para a c�pia de seguran�a existente no servidor
		*/
		restaura: function(){
			i3GEO.php.recuperamapa(i3GEO.atualiza);
		}
	},
	/*
	Class: i3GEO.mapa.legendaHTML
	
	Controla a obten��o da legenda do mapa formatada em HTML.
	
	�til para mostrar a legenda na tela
	*/
	legendaHTML:{
		/*
		Variable: ID
		
		Armazena o id definido na cria��o da legenda
		*/
		ID: "",
		/*
		Function: cria
		
		Cria a legenda HTML
		
		A legenda � incluida no id definido. Se id for igual a "", ser� apenas definido o evento de atualiza��o
		permitindo que seja criada a janela flutuante apenas, por exemplo:
		
		i3GEO.mapa.legendaHTML.cria("");
		i3GEO.mapa.legendaHTML.libera();		
		
		Parameters:
		
		id {String} - id do elemento que receber� a legenda
		*/
		cria: function(id){
			if(arguments.length == 0){var id = "";}
			i3GEO.mapa.legendaHTML.ID = id;
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.mapa.legendaHTML.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.mapa.legendaHTML.atualiza()");}					
			i3GEO.mapa.legendaHTML.atualiza();			
		},
		/*
		Function: atualiza
		
		Atualiza a legenda do mapa que s�o utilizados para mostrar a legenda
		*/
		atualiza: function(){
			var temp = function(retorno){
				if(i3GEO.mapa.legendaHTML.ID != "" && $i(i3GEO.mapa.legendaHTML.ID))
				{
					if ((retorno.data != "erro") && (retorno.data != undefined)){
						var s = i3GEO.configura.locaplic+"/imagens/solta.gif";
						$i(i3GEO.mapa.legendaHTML.ID).innerHTML = "<img onclick='i3GEO.mapa.legendaHTML.libera()' id=soltaLeg src="+s+" title='clique para liberar'/><br><div id='corpoLegi' >"+ retorno.data.legenda + "</div>";
					}
				}
				if ($i("wlegenda")){
					$i("wlegenda").innerHTML = retorno.data.legenda;
					var elementos = $i("wlegenda").getElementsByTagName("input");
					for(i=0;i<elementos.length;i++)
					{elementos[i].style.display="none";}
				}
			};
			i3GEO.mapa.legendaHTML.obtem(temp);
		},
		/*
		Function: obtem
		
		Faz a chamada em AJAX que gera a legenda
		
		O resultado � processado pela fun��o passada como par�metro
		
		Parameters:
		
			funcao {function} - fun��o que receber� o resultado da chamada AJAX. O objeto CPAINT � enviado como par�metro.
		*/
		obtem: function(funcao){
			i3GEO.php.criaLegendaHTML(funcao,"",i3GEO.configura.templateLegenda)
		},
		/*
		Function: libera
		
		Libera a legenda criando uma janela flutuante sobre o mapa
		*/
		libera: function(){
			var temp = function(retorno){
				if (!$i("moveLegi")){
					var novoel = document.createElement("div");
					novoel.id = "moveLegi";
					novoel.style.display="block";
					var temp = '<div class="hd">Legenda</div>';
					temp += '<div id="wlegenda" style="text-align:left;background-color:white" ></div>';
					novoel.innerHTML = temp;
					document.body.appendChild(novoel);
					YAHOO.namespace("moveLegi.xp");
					YAHOO.moveLegi.xp.panel = new YAHOO.widget.Panel("moveLegi", {width:"300px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
					YAHOO.moveLegi.xp.panel.render();
				}
				$i("wlegenda").innerHTML = retorno.data.legenda;
				var temp = $i("wlegenda").getElementsByTagName("input");
				var n = temp.length;
				for(i=0;i<n;i++){
					temp[i].style.display = "none";
				}
				YAHOO.moveLegi.xp.panel.show();				
			}
			i3GEO.mapa.legendaHTML.obtem(temp);
		}
	},
	/*
	Class: i3GEO.mapa.legendaIMAGEM
	
	Controla a obten��o da legenda do mapa na forma de uma imagem
	
	� utilizado principalmente para armazenar as imagens para a fun��o de 
	obten��o do hist�rico do mapa
	*/
	legendaIMAGEM:{
		/*
		Function: obtem
		
		Faz a chamada em AJAX que gera a legenda
		
		O resultado � processado pela fun��o passada como par�metro
		
		Parameters:
		
			funcao {function} - fun��o que receber� o resultado da chamada AJAX. O objeto CPAINT � enviado como par�metro.
		*/
		obtem: function(funcao){
			i3GEO.php.criaLegendaImagem(funcao);
		}
	},
	/*
	Class: i3GEO.mapa.dialogo
	
	Abre as telas de di�logo das op��es de manipula��o do mapa atual
	*/
	dialogo:{
		/*
		Function: autoredesenha

		Abre a janela para defini��o do intervalo de tempo para redesenho autom�tico do mapa.
		*/
		autoredesenha: function()
		{i3GEO.janela.cria("300px","180px",i3GEO.configura.locaplic+"/ferramentas/opcoes_autoredesenha/index.htm","","","Temporizador");},
		/*
		Function: salvaMapa

		Abre a janela para salvar localmente o mapfile utilizado no mapa atual
		*/
		salvaMapa: function(){
			if(i3GEO.parametros == "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.janela.cria("300px","180px",i3GEO.configura.locaplic+"/ferramentas/salvamapa/index.htm","","","Salva mapa");
		},
		/*
		Function: carregaMapa

		Abre a janela para a carga de um mapfile salvo localmente na m�quina dousu�rio.
		*/
		carregaMapa: function()
		{i3GEO.janela.cria("300px","150px",i3GEO.configura.locaplic+"/ferramentas/carregamapa/index.htm?urlatual="+window.location,"","","Carrega mapa");},
		/*
		Function: convertews

		Abre a janela para converter o mapa atual em web service WMS
		*/
		convertews: function(){
			if(i3GEO.parametros.mapfile == "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			i3GEO.janela.cria("440px","280px",i3GEO.configura.locaplic+"/ferramentas/convertews/index.htm","","","Web service");
		},
		/*
		Function: queryMap

		Abre a janela que altera as propriedades da exibi��o dos elementos selecionados.
		*/
		queryMap: function()
		{i3GEO.janela.cria("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_querymap/index.htm","","","Querymap");},
		/*
		Function: template

		Abre a janela que muda o template do mapa atual.
		*/
		template: function()
		{i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template");},
		/*
		Function: tamanho

		Abre a janela que muda o tamanho do mapa
		*/
		tamanho: function()
		{i3GEO.janela.cria("150px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_tamanho/index.htm","","","Tamanho");},
		/*
		Function: tipoimagem

		Abre a janela que define um filtro gr�fico (s�pia por exemplo) sobre a imagem gerada alterando suas caracter�sticas
		*/
		tipoimagem: function()
		{i3GEO.janela.cria("300px","220px",i3GEO.configura.locaplic+"/ferramentas/tipoimagem/index.htm","","","Tipo de imagem");},
		/*
		Function: corFundo

		Abre a janela que altera a cor do fundo do mapa atual.
		*/
		corFundo: function()
		{i3GEO.janela.cria("210px","170px",i3GEO.configura.locaplic+"/ferramentas/opcoes_fundo/index.htm","","","Fundo");},
		/*
		Function: opcoesEscala

		Abre a janela para defini��o das op��es da barra de escala.
		*/
		opcoesEscala: function()
		{i3GEO.janela.cria("250px","300px",i3GEO.configura.locaplic+"/ferramentas/opcoes_escala/index.htm","center","center","Escala");},
		/*
		Function: opcoesLegenda

		Abre a janela de configura��o da legenda do mapa
		*/
		opcoesLegenda: function()
		{i3GEO.janela.cria("300px","280px",i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/index.htm","","","Legenda");},
		/*
		Function: gradeCoord

		Abre a janela que gera grade de coordenadas
		*/
		gradeCoord: function()
		{i3GEO.janela.cria("350px","280px",i3GEO.configura.locaplic+"/ferramentas/gradecoord/index.htm","","","Grade de coordenadas");},
		/*
		Function: cliqueTexto
		
		Abre o di�logo para inclus�o de textos diretamente no mapa
		
		Registra os eventos que controlam o clique sobre o mapa
		*/
		cliqueTexto: function(){
			if (g_tipoacao != "textofid"){
				var temp = Math.random() + "b";
				temp = temp.split(".");
				g_nomepin = "pin"+temp[1];
				//pontosdistobj = new pontosdist();
				g_tipoacao = "textofid";
				var janela = i3GEO.janela.cria("360px","250px",i3GEO.configura.locaplic+"/ferramentas/inseretxt/index.htm","","","Texto");
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.insereToponimo()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.insereToponimo()");}
				var temp = function(){
					i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.insereToponimo()");
					i3GEO.barraDeBotoes.ativaBotoes();
				};
				YAHOO.util.Event.addListener(janela[0].close, "click", temp);
			}
		},
		/*
		Function: cliquePonto
		
		Abre o di�logo para inclus�o de pontos diretamente no mapa
		
		Registra os eventos que controlam o clique sobre o mapa
		*/
		cliquePonto: function(){
			if (g_tipoacao != "inserexy"){
				g_tipoacao = "inserexy";
				var temp = Math.random() + "a";
				temp = temp.split(".");
				g_nomepin = "pin"+temp[1];
				var janela = i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+'/ferramentas/inserexy2/index.htm',"","","Insere");
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.inserePonto()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.inserePonto()");}
				var temp = function(){
					i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.inserePonto()");
					i3GEO.barraDeBotoes.ativaBotoes();
				};
				YAHOO.util.Event.addListener(janela[0].close, "click", temp);
			}
		},
		/*
		Function: cliqueGrafico
		
		Abre o di�logo para inclus�o de gr�ficos diretamente no mapa
		
		Registra os eventos que controlam o clique sobre o mapa
		*/
		cliqueGrafico: function(){
			if (g_tipoacao != "inseregrafico"){
				g_tipoacao = "inseregrafico";
				var temp = Math.random() + "a";
				temp = temp.split(".");
				g_nomepin = "pin"+temp[1];
				var janela = i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+'/ferramentas/inseregrafico/index.htm',"","","Insere");
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.insereGrafico()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.insereGrafico()");}
				var temp = function(){
					i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.insereGrafico()");
					i3GEO.barraDeBotoes.ativaBotoes();
				};
				YAHOO.util.Event.addListener(janela[0].close, "click", temp);
			}
		}
	},
	corpo:{
		verifica:function(retorno){
			try{
				i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o3"));
				if(retorno.data){var retorno = retorno.data;}
				if (retorno.variaveis){var retorno = retorno.variaveis;}
				if ((retorno == "erro") || (retorno == undefined)){
					i3GEO.mapa.ajustaPosicao();
					i3GEO.janela.fechaAguarde();
					i3GEO.mapa.recupera.inicia();
				}
				i3GEO.mapa.recupera.TENTATIVA = 0;
			}
			catch(e){
				if(i3GEO.interface.ATUAL == "openlayers"){
					i3GEO.janela.fechaAguarde();
					return;
				}
				if(i3GEO.mapa.recupera.TENTATIVA == 0){
					alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");
					i3GEO.mapa.recupera.inicia();
				}
				else{
					alert("Recuperacao impossivel. Sera feita uma tentativa de reiniciar o mapa.");
					if (i3GEO.mapa.recupera.TENTATIVA == 1){
						i3GEO.mapa.recupera.TENTATIVA = 2;
						i3GEO.php.reiniciaMapa(i3GEO.atualiza);
					}		
				}
			}
		}
	}
};
//YAHOO.log("carregou classe mapa", "Classes i3geo");
/*
Title: Temas

File: i3geo/classesjs/classe_tema.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.tema

Fun��es de di�logo e processamento de propriedades de um tema existente no mapa

Em i3GEO.tema.dialogo est�o as fun��es de abertura dos di�logos para altera��o das propriedades do tema,
*/
i3GEO.tema = {
	/*
	Function: exclui

	Exclui um tema do mapa

	Parameters:

	tema - c�digo do tema
	*/
	exclui: function(tema){
		g_operacao = "excluitema";
		//remove o tema do DOM e seus filhos
		var p = document.getElementById("idx"+tema).parentNode.parentNode.parentNode;
		do
		{p.removeChild(p.childNodes[0]);}
		while (p.childNodes.length > 0);
		p.parentNode.removeChild(p);
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.excluitema(i3GEO.atualiza,tema);
		i3GEO.temaAtivo = "";
	},
	/*
	Function: sobe

	Sobe um tema na ordem de desenho

	Parameters:

	tema - c�digo do tema
	*/
	sobe: function(tema){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.sobetema(i3GEO.atualiza,tema);
	},
	/*
	Function: desce

	Desce um tema na ordem de desenho

	Parameters:

	tema - c�digo do tema
	*/
	desce: function(tema){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.descetema(i3GEO.atualiza,tema);
	},
	/*
	Function: zoom

	Zoom para o tema

	Parameters:

	tema - c�digo do tema
	*/
	zoom: function(tema){
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.zoomtema(i3GEO.atualiza,tema);
	},
	/*
	Function: limpasel

	Limpa a selecao do tema

	Parameters:

	tema - ID (name) do tema clicado
	*/
	limpasel: function(tema){
		g_operacao = "limpasel";
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.limpasel(i3GEO.atualiza,tema);
	},
	/*
	Function: mudatransp

	Muda a transparencia de um tema

	Parameters:

	idtema - c�digo do tema
	*/
	mudatransp: function(idtema){
		g_operacao = "transparencia";
		//o campo input com o valor possui o prefixo 'tr' seguido pelo c�digo do tema
		if ($i("tr"+idtema))
		{var valor = $i("tr"+idtema).value;}
		else
		{alert("Ocorreu um erro");}
		if (valor != ""){
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			i3GEO.php.mudatransp(i3GEO.atualiza,idtema,valor);
		}
		else
		{alert("Valor n�o definido.");}
	},
	/*
	Function: mudanome
	
	Muda o nome de um tema

	Parameters:

	idtema - c�digo do tema
	*/
	mudanome: function(idtema){
		g_operacao = "mudanome";
		if($i("nn"+idtema))
		{var valor = $i("nn"+idtema).value;}
		else
		{alert("Ocorreu um erro");}
		if (valor != ""){
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			i3GEO.php.mudanome(i3GEO.atualiza,idtema,valor);
		}
		else
		{alert("Nome n�o definido");}
	},
	/*
	Class: i3GEO.tema.dialogo
	
	Abre as telas de di�logo das op��es de manipula��o de um tema
	
	Return:
	
	i3GEO.janela.cria
	*/
	dialogo:{
		/*
		Function: abreKml

		Abre a janela para mostrar o link de acesso a um tema via kml.

		Parameters:

		tema - c�digo do tema escolhido
		*/
		abreKml: function(tema){
			if(tema == "mapfile"){
				if(i3GEO.parametros.mapfile == "")
				{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
				return(i3GEO.janela.cria("450px","250px",i3GEO.configura.locaplic+'/ferramentas/convertekml/index.htm?tema='+i3GEO.parametros.mapfile,"","","Kml"));
			}
			else
			{return(i3GEO.janela.cria("450px","250px",i3GEO.configura.locaplic+'/ferramentas/convertekml/index.htm?tema='+tema,"","","Kml"));}
		},
		/*
		Function: graficotema

		Adiciona gr�ficos automaticamente nos elementos de um tema

		Parameters:

		idtema - c�digo do tema
		*/
		graficotema: function(idtema)
		{return(i3GEO.janela.cria("350px","340px",i3GEO.configura.locaplic+"/ferramentas/graficotema/index.htm?tema="+idtema,"","","Gr&aacute;fico"));},
		/*
		Function: toponimia

		Op��es de topon�mia de um tema.

		Parameters:

		idtema - c�digo do tema
		*/
		toponimia: function(idtema)
		{i3GEO.janela.cria("350px","340px",i3GEO.configura.locaplic+"/ferramentas/toponimia/index.htm?tema="+idtema,"","","Topon&iacute;mia");},
		/*
		Function: filtro

		Op��es de filtragem de um tema.

		Parameters:

		idtema - c�digo do tema
		*/
		filtro: function(idtema)
		{i3GEO.janela.cria("480px","250px",i3GEO.configura.locaplic+"/ferramentas/filtro/index.htm?tema="+idtema,"","","Filtro");},
		/*
		Function: procuraratrib

		Abre a janela com a op��o de procurar elementos baseados nos atributos da tabela do tema

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		procuraratrib: function(idtema)
		{i3GEO.janela.cria("550px","340px",i3GEO.configura.locaplic+"/ferramentas/busca/index.htm?tema="+idtema,"","","Procurar");},
		/*
		Function: tabela

		Abre a tabela com os atributos de um tema.

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		tabela: function(idtema)
		{i3GEO.janela.cria("500px","400px",i3GEO.configura.locaplic+"/ferramentas/tabela/index.htm?tema="+idtema,"","","Tabela");},
		/*
		Function: etiquetas

		Abre a janela de configura��o das etiquetas

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		etiquetas: function(idtema)
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/etiqueta/index.htm?tema="+idtema,"","","Etiquetas");},
		/*
		Function: editaLegenda

		Abre a janela do editor de legenda de um tema

		Parameters:

		idtema - id que identifica o tema conforme definido no map file
		*/
		editaLegenda: function(idtema)
		{i3GEO.janela.cria("490px","340px",i3GEO.configura.locaplic+"/ferramentas/legenda/index.htm?tema="+idtema,"","","Legenda");},
		/*
		Function: download

		Abre a janela que faz o download de um tema

		Parameters:

		idtema - id ue identifica o tema no map file.
		*/
		download: function(idtema)
		{i3GEO.janela.cria("300px","150px",i3GEO.configura.locaplic+"/ferramentas/download/index.htm?tema="+idtema,"","","Download");}
	}
};
//YAHOO.log("carregou classe tema", "Classes i3geo");
/*
Title: An�lise geogr�fica

File: i3geo/classesjs/classe_analise.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.analise

Fun��es de gera��o das an�lises e abertura dos di�logos das op��es de an�lise espacial

Em i3GEO.analise.dialogo est�o as fun��es de abertura dos di�logos
*/
i3GEO.analise = {
	/*
	Class: i3GEO.analise.dialogo
	
	Abre as telas de di�logo das op��es de an�lise
	
	Exemplos:

	Para abrir a mensagem de di�logo de gera��o de buffer, utilize
	
	i3GEO.analise.dialogo.buffer()
	
	Returns:
	
	{i3GEO.janela.cria}
	*/
	dialogo:{
		/*
		Function: gradePontos

		Abre a janela que gera grade de pontos
		*/
		gradePontos: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradepontos/index.htm","","","Grade de pontos");},
		/*
		Function: gradePol

		Abre a janela que gera grade de poligonos
		*/
		gradePol: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradepol/index.htm","","","Grade de pol&iacute;gonos");},
		/*
		Function: gradeHex

		Abre a janela que gera grade de hex�gonos
		*/
		gradeHex: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/gradehex/index.htm","","","Grade de hex&aacute;gonos");},
		/*
		Function: analisaGeometrias

		Abre a janela com o sistema de an�lise de geometrias
		*/
		analisaGeometrias: function(){
			g_tipoacao = "selecao";
			i3GEO.temaAtivo = "";
			i3GEO.janela.cria("500px","400px",i3GEO.configura.locaplic+'/ferramentas/analisageometrias/index.htm',"","","Sele&ccedil;&atilde;o");
		},
		/*
		Function: pontosdistri

		Abre a janela para executar an�lises de distribui��o de pontos
		*/
		pontosdistri: function(){
			if (i3GEO.parametros.r == "nao")
			{alert("Op��o n�o dispon�vel");}
			else
			{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/pontosdistri/index.htm","","","Distribui&ccedil;&atilde;o de pontos");}
		},
		/*
		Function: pontoempoligono

		Abre a janela para cruzar um tema de pontos com um ou mais temas poligonais e gerar um novo tema
		*/
		pontoempoligono: function()
		{i3GEO.janela.cria("400px","250px",i3GEO.configura.locaplic+"/ferramentas/pontoempoligono/index.htm","","","Ponto em pol&iacute;gono");},
		/*
		Function: nptPol

		Abre a janela para cruzar um tema de pontos com um ou tema poligona e gerar um novo tema com o n�mero de pontos em cada pol�gono
		*/
		nptPol: function()
		{i3GEO.janela.cria("400px","200px",i3GEO.configura.locaplic+"/ferramentas/nptpol/index.htm","","","Pontos por pol&iacute;gono");},
		/*
		Function: buffer

		Gera um buffer em elementos selecionados
		*/
		buffer: function()
		{i3GEO.janela.cria("400px","180px",i3GEO.configura.locaplic+"/ferramentas/buffer/index.htm","","","Entorno");},
		/*
		Function: distanciaptpt

		Abre a janela para calcular a dist�ncia entre um ponto e outros pontos pr�ximos
		*/
		distanciaptpt: function()
		{i3GEO.janela.cria("400px","220px",i3GEO.configura.locaplic+"/ferramentas/distanciaptpt/index.htm","","","Dist&acirc;ncia");},
		/*
		Function: centroide

		Abre a janela que gera um tema com os centroides dos elementos selecionados
		*/
		centroide: function()
		{i3GEO.janela.cria("400px","180px",i3GEO.configura.locaplic+"/ferramentas/centroide/index.htm","","","Centr�ide");},
		/*
		Function: dissolve

		Abre a janela que gera um tema dissolvendo as divisas entre pol�gonos.
		*/
		dissolve: function()
		{i3GEO.janela.cria("400px","230px",i3GEO.configura.locaplic+"/ferramentas/dissolve/index.htm","","","Dissolve");},
		/*
		Function: agrupaElementos

		Abre a janela que gera um tema poligonal agrupando elementos de um tema.
		*/
		agrupaElementos: function()
		{i3GEO.janela.cria("400px","230px",i3GEO.configura.locaplic+"/ferramentas/agrupaelementos/index.htm","","","Agrupa");}
	},
	/*
	Class: i3GEO.analise.medeDistancia
	
	Ativa e controla a op��o de medi��o de dist�ncias.

	A medida � feita quando o usu�rio clica no mapa com esta op��o ativa

	Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.

	Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.
	*/
	medeDistancia:{
		/*
		Function: inicia
		
		Inicia a opera��o de medi��o, abrindo a janela de resultados e criando os componentes necess�rios
		
		S�o registrados os eventos de clique sobre o mapa e fechamento da janela de resultados
		*/
		inicia: function(){
			i3GEO.analise.medeDistancia.criaJanela();
			if (g_tipoacao != "mede"){
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.analise.medeDistancia.clique()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.analise.medeDistancia.clique()");}
				if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.analise.medeDistancia.movimento()") < 0)
				{i3GEO.eventos.MOUSEMOVE.push("i3GEO.analise.medeDistancia.movimento()");}
				$i("mostradistancia").style.display="block";
				i3GEO.desenho.criaContainerRichdraw();
				i3GEO.desenho.richdraw.lineColor = "black";
				i3GEO.desenho.richdraw.lineWidth = "1px";
				g_tipoacao = "mede";
			}
			else{
				i3GEO.desenho.richdraw.fecha();
				if($i("mostradistancia")){$i("mostradistancia").style.display="none";}
				if($i("pontosins")){$i("pontosins").style.display="none";}
			}	
		},
		/*
		Function: criaJanela
		
		Cria a janela para mostrar os resultados da medi��o
		*/
		criaJanela: function(){
			if (!$i("mostradistancia")){
				var novoel = document.createElement("div");
				novoel.id = "mostradistancia";
				var ins = '<div class="hd" >&nbsp</div>';
				ins += '<div class="bd" style="text-align:left;padding:3px;" >';
				ins += '<div style="text-align:left;padding:3px;" id="mostradistancia_calculo" ></div>';
				ins += '<div style="text-align:left;font-size:10px" >';
				ins += "<span style='color:navy;cursor:pointer;text-align:left;' >";
				ins += "<input style='cursor:pointer' type='checkbox' id='pararraios' 'checked' />Raios</span>";
				ins += '</div>';
				ins+= '</div>';
				novoel.innerHTML = ins;
				novoel.style.borderColor="gray";
				document.body.appendChild(novoel);
				$i('pararraios').checked=true;
			}
			YAHOO.namespace("janelaDocamede.xp");
			YAHOO.janelaDocamede.xp.panel = new YAHOO.widget.Panel("mostradistancia", {width:220,fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaDocamede.xp.panel.render();
			YAHOO.janelaDocamede.xp.panel.moveTo(imagemxi+150,imagemyi);
			YAHOO.util.Event.addListener(YAHOO.janelaDocamede.xp.panel.close, "click", i3GEO.analise.medeDistancia.fechaJanela);
		},
		/*
		Function: fechaJanela
		
		Fecha a janela e os elementos gr�ficos criados para a ferramenta de medi��o
		*/
		fechaJanela: function(){
			i3GEO.desenho.richdraw.fecha();
			if($i("pontosins")){document.body.removeChild($i("pontosins"));}
			YAHOO.util.Event.removeListener(YAHOO.janelaDocamede.xp.panel.close, "click");
			i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.analise.medeDistancia.clique()");
			i3GEO.eventos.MOUSEMOVE.remove("i3GEO.analise.medeDistancia.movimento()");
			i3GEO.barraDeBotoes.ativaBotoes();
		},
		/*
		Function: clique
		
		Adiciona uma marca na tela e realiza o c�lculo de dist�ncia dos pontos inseridos
		*/
		clique: function(){
			if (g_tipoacao == "mede"){
				var n = pontosdistobj.xpt.length;
				pontosdistobj.xpt[n] = objposicaocursor.ddx;
				pontosdistobj.ypt[n] = objposicaocursor.ddy;
				pontosdistobj.xtela[n] = objposicaocursor.telax;
				pontosdistobj.ytela[n] = objposicaocursor.telay;
				pontosdistobj.ximg[n] = objposicaocursor.imgx;
				pontosdistobj.yimg[n] = objposicaocursor.imgy;
				pontosdistobj.dist[n] = 0;
				try{
					if (navn)
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1),(pontosdistobj.ximg[n]-1),(pontosdistobj.yimg[n]-1));}
					else
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);}				
				}
				catch(e){window.status=n+" erro ao desenhar a linha base "+e.message;}
				if (n > 0){
					var d = parseInt(i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
					pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
					if($i("pararraios") && $i("pararraios").checked == true ){
						i3GEO.desenho.aplica("insereCirculo","",n);
						if(navm)
						{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n-1])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n-1],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);}
					}
				}
				i3GEO.util.insereMarca.cria(objposicaocursor.telax,objposicaocursor.telay,i3GEO.analise.medeDistancia.fechaJanela,"pontosins");
			}
		},
		/*
		Function: movimento
		
		Realiza os c�lculos e desenho da linha conforme o usu�rio movimenta o mouse
		*/
		movimento: function(){
			if (g_tipoacao == "mede"){
				if($i("mostradistancia"))
				$i("mostradistancia").style.display="block";
				var n = pontosdistobj.xpt.length;
				if (n > 0){
					var d = i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					if (i3GEO.parametros.mapscale > 500000)
					{var d = parseInt(d);}
					else{
						d= d + "";
						d = d.split(".");
						var decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					var da = d + pontosdistobj.dist[n-1];
					if ($i("mostradistancia_calculo"))
					{$i("mostradistancia_calculo").innerHTML = " Dist acum.= "+da+" atual= "+d+" km";}
					i3GEO.desenho.aplica("resizeLinha",pontosdistobj.linhas[n-1],n);
				}
			}
		}
	},
	/*
	Class: i3GEO.analise.medeArea
	
	Ativa e controla a op��o de medi��o de �rea.

	A medida � feita quando o usu�rio clica no mapa com esta op��o ativa

	Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.

	Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.
	*/
	medeArea:{
		/*
		Function: inicia
		
		Inicia a opera��o de medi��o, abrindo a janela de resultados e criando os componentes necess�rios
		
		S�o registrados os eventos de clique sobre o mapa e fechamento da janela de resultados
		*/
		inicia: function(){
			i3GEO.analise.medeArea.criaJanela();
			if (g_tipoacao != "area"){
				$i("mostraarea_calculo").innerHTML = "";
				if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.analise.medeArea.clique()") < 0)
				{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.analise.medeArea.clique()");}
				if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.analise.medeArea.movimento()") < 0)
				{i3GEO.eventos.MOUSEMOVE.push("i3GEO.analise.medeArea.movimento()");}		
				YAHOO.util.Event.addListener(YAHOO.janelaDocaarea.xp.panel.close, "click", i3GEO.analise.medeArea.fechaJanela);
				var temp = function(retorno){
					i3GEO.janela.fechaAguarde("i3GEO.atualiza");
					g_areapixel = retorno.data;
					if (g_areapixel < 0)
					{alert("Nao e possivel calcular a area. Entre em contato com o administrador do sistema.");}
					else{
						alert("Clique no mapa para desenhar o poligono. Clique duas vezes para concluir");
						i3GEO.barraDeBotoes.ativaIcone("area");
						g_tipoacao = "area";
						i3GEO.desenho.criaContainerRichdraw();
						i3GEO.desenho.richdraw.lineColor = "green";
						i3GEO.desenho.richdraw.lineWidth = "2px";
					}
				};
				i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
				i3GEO.php.areaPixel(temp,i3GEO.parametros.pixelsize);
			}
			else{i3GEO.desenho.richdraw.fecha();}
		},
		/*
		Function: criaJanela
		
		Cria a janela para mostrar os resultados da medi��o
		*/
		criaJanela: function(){
			if (!$i("mostraarea")){
				var novoel = document.createElement("div");
				novoel.id = "mostraarea";
				var ins = '<div class="hd" >&Aacute;rea aproximada</div>';
				ins += '<div class="bd" style="text-align:left;padding:3px;" >';
				ins += '<div style="text-align:left;padding:3px;font-size:10px" id="mostraarea_calculo" ></div>';
				ins+= '</div>';
				novoel.innerHTML = ins;
				novoel.style.borderColor="gray";
				document.body.appendChild(novoel);
			}
			YAHOO.namespace("janelaDocaarea.xp");
			YAHOO.janelaDocaarea.xp.panel = new YAHOO.widget.Panel("mostraarea", {width:220,fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaDocaarea.xp.panel.render();
			YAHOO.janelaDocaarea.xp.panel.moveTo(imagemxi+150,imagemyi);
		},
		/*
		Function: fechaJanela
		
		Fecha a janela e os elementos gr�ficos criados para a ferramenta de medi��o
		*/
		fechaJanela: function(){
			i3GEO.desenho.richdraw.fecha();
			if($i("pontosArea")){document.body.removeChild($i("pontosArea"));}
			i3GEO.eventos.MOUSECLIQUE.remove("cliqueArea()");
			i3GEO.eventos.MOUSEMOVE.remove("moveArea()");
			i3GEO.barraDeBotoes.ativaBotoes();
		},
		/*
		Function: clique
		
		Adiciona uma marca na tela e realiza o c�lculo de dist�ncia dos pontos inseridos
		*/
		clique: function(){
			if (g_tipoacao == "area"){
				var n = pontosdistobj.xpt.length;
				pontosdistobj.xpt[n] = objposicaocursor.ddx;
				pontosdistobj.ypt[n] = objposicaocursor.ddy;
				pontosdistobj.xtela[n] = objposicaocursor.telax;
				pontosdistobj.ytela[n] = objposicaocursor.telay;
				pontosdistobj.ximg[n] = objposicaocursor.imgx;
				pontosdistobj.yimg[n] = objposicaocursor.imgy;
				pontosdistobj.dist[n] = 0;
				//inclui a linha para ligar com o ponto inicial
				if (n == 0){
					try	{
						if (navn)
						{pontosdistobj.linhastemp = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[0]-1,pontosdistobj.yimg[0]-1);}
						else
						{pontosdistobj.linhastemp = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[0])-(i3GEO.parametros.w/2),pontosdistobj.yimg[0]);	}				
					}
					catch(e){}
				}
				try{
					if (navn)
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1);}
					else
					{pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);}				
				}
				catch(e){}
				var m = i3GEO.calculo.area(pontosdistobj,g_areapixel);
				if($i("mostraarea_calculo"))
				{$i("mostraarea_calculo").innerHTML = "<br>m2</b>= "+m+"<br><b>km2</b>= "+m/1000000+"<br><b>ha</b>= "+m/10000;}
				if (n > 3){
				//var d = parseInt(i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
				//pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
				}
				i3GEO.util.insereMarca.cria(objposicaocursor.telax,objposicaocursor.telay,i3GEO.analise.medeArea.fechaJanela,"pontosArea");
			}
		},
		/*
		Function: movimento
		
		Realiza os c�lculos e desenho da linha conforme o usu�rio movimenta o mouse
		*/
		movimento: function(){
			if (g_tipoacao == "area"){
				var n = pontosdistobj.xpt.length;
				if (n > 0){
					//
					//conforme a escala, os dados s�o arredondados
					// 
					var d = i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					if (i3GEO.parametros.mapscale > 500000)
					{var d = parseInt(d);}
					else{
						d= d + "";
						d = d.split(".");
						var decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					var da = d + pontosdistobj.dist[n-1];
					//
					//desenha as linhas na tela com o objeto richdraw
					//
					if(navn){i3GEO.desenho.aplica("resizePoligono",pontosdistobj.linhastemp,0);}
					i3GEO.desenho.aplica("resizeLinha",pontosdistobj.linhas[n-1],n);
				}
			}
		}
	}
};
//YAHOO.log("carregou classe analise", "Classes i3geo");
/*
Title: Mapa de refer�ncia

File: i3geo/classesjs/classe_maparef.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.maparef

Cria e processa o mapa de refer�ncia
*/
i3GEO.maparef = {
	/*
	Variable: fatorZoomDinamico
	
	Define o fator de zoom inicial do mapa de refer�ncia quando o modo din�mico for ativado
	*/
	fatorZoomDinamico: -3,
	/*
	Function: inicia
	
	Inicializa o mapa de refer�ncia
	*/
	inicia: function(){
		//YAHOO.log("initJanelaRef", "i3geo");
		if (!$i("i3geo_winRef")){
			var novoel = document.createElement("div");
			novoel.id = "i3geo_winRef";
			novoel.style.display="none";
			novoel.style.borderColor="gray";
			var ins = '<div class="hd">';
			var temp = "javascript:if(i3GEO.maparef.fatorZoomDinamico == -1){i3GEO.maparef.fatorZoomDinamico = 1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico + 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";
			ins += "<img class=mais onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />";
			var temp = "javascript:if(i3GEO.maparef.fatorZoomDinamico == 1){i3GEO.maparef.fatorZoomDinamico = -1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico - 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";
			ins += "<img class=menos onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />&nbsp;";
			ins += '<input style="cursor:pointer" onclick="javascript:i3GEO.maparef.atualiza()" type="checkbox" id="refDinamico" />&nbsp;'+$trad("o6")+'</div>';
			ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="this.onmousemove=function(exy){i3GEO.eventos.posicaoMouseMapa(exy)}" onclick="javascript:i3GEO.maparef.click()">';
			ins += '<img style="cursor:pointer;" id=imagemReferencia src="" >';
			//ins += '<div id=boxRef style="position:absolute;top:0px;left:0px;width:10px;height:10px;border:2px solid blue;display:none"></div></div>';
			ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
			novoel.innerHTML = ins;
			document.body.appendChild(novoel);
		}
		if($i("i3geo_winRef").style.display != "block"){
			$i("i3geo_winRef").style.display = "block";
			YAHOO.namespace("janelaRef.xp");
			YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("i3geo_winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
			YAHOO.janelaRef.xp.panel.render();
			var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
			if (navm){YAHOO.janelaRef.xp.panel.moveTo((pos[0]+i3GEO.parametros.w-160),pos[1]+4);}
			else
			{YAHOO.janelaRef.xp.panel.moveTo((pos[0]+i3GEO.parametros.w-160),pos[1]+4);}
			var escondeRef = function(){
				YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close, "click");
				YAHOO.janelaRef.xp.panel.destroy();	
				i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay","none");
			};
			YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close, "click", escondeRef);	
			i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay","block");
			if(typeof(atualizaLocalizarxy) == "function"){
				if(i3GEO.gadgets.PARAMETROS.mostraCoordenadasGEO.idhtml)
				YAHOO.util.Event.addListener($i("imagemReferencia"),"mousemove", atualizaLocalizarxy);
			}
		}
		//YAHOO.log("Fim initJanelaRef", "i3geo");
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.maparef.atualiza()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.maparef.atualiza()");}

		this.atualiza();
	},
	/*
	Function: atualiza
	
	Atualiza o mapa de refer�ncia.

	Se o modo cgi estiver ativado, o mapa de refer�ncia � desenhado utilizando-se como src da imagem o programa cgi do Mapserver.
	
	No modo din�mico, a imagem � gerada de forma diferenciada. Nesse caso, o modo cgi � desabilitado.
	
	O atualizaReferencia � sempre chamado ap�s o mapa ser redesenhado.
	
	Se houve altera��o na extens�o, � preciso refazer o mapa de refer�ncia se n�o, a imagem atual � armazenada no quado de anima��o
	*/
	atualiza: function(){
		var dinamico = false;
		if ($i("refDinamico"))
		{var dinamico = $i("refDinamico").checked;}
		if ($i("mapaReferencia")){
			//YAHOO.log("Atualizando o mapa de refer�ncia", "i3geo");
			if(dinamico){
				i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico);
			}
			else{
				if(($i("imagemReferencia").src == "") || (i3GEO.parametros.cgi != "sim")){
					i3GEO.php.referencia(i3GEO.maparef.processaImagem);
				}
				else{
					var re = new RegExp("&mode=map", "g");
					$i("imagemReferencia").src = $i(i3GEO.interface.IDMAPA).src.replace(re,'&mode=reference');
					i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src);
				}
			}
		}
		else{
			if($i("imagemReferencia"))
			i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src);
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.maparef.atualiza()");
		}
	},
	/*
	Function: processaImagem
		
	Substitu� a imagem do mapa de refer�ncia pela �ltima gerada.

	Esta fun��o processa os dados de uma chamada AJAX para atualizar o mapa de refer�ncia
	
	Parameters:

	retorno - string no formato "var refimagem='nome da imagem'".
	*/
	processaImagem: function(retorno){
		i3GEO.janela.fechaAguarde("ajaxreferencia1");
		if ((retorno.data != "erro") && (retorno.data != undefined)){
			eval(retorno.data);
			i3GEO.parametros.celularef = g_celularef;
			i3GEO.parametros.extentref = extentref;
			if ($i("imagemReferencia")){
				var m = new Image();
				m.src = refimagem;
				$i("imagemReferencia").src=m.src;
				if ((i3GEO.parametros.mapscale < 15000000) && (i3GEO.parametros.mapscale > 10000000)){
					$i("refmensagem").innerHTML = "Para navegar no mapa principal, voc&ecirc; pode clicar em um ponto no mapa de refer&ecirc;ncia.";
					$i("refmensagem").style.fontSize="10px";
				}
				else{
					$i("refmensagem").innerHTML = "";
					$i("refmensagem").style.fontSize="0px";
				}
			}
			i3GEO.gadgets.quadros.grava("referencia",refimagem);
			//YAHOO.log("Conclu�da imagem de refer�ncia", "redesenho");
		}
		else
		{YAHOO.log("Erro na imagem de refer�ncia", "redesenho");}
	},
	/*
	Function: click
	
	Ocorre quando o usu�rio clica sobre o mapa de refer�ncia, alterando a extens�o geogr�fica do mapa principal
	*/
	click: function(){
		try{
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			i3GEO.php.pan(i3GEO.atualiza,i3GEO.parametros.mapscale,"ref",objposicaocursor.refx,objposicaocursor.refy);
		}
		catch(e)
		{var e = "";i3GEO.janela.fechaAguarde("i3GEO.atualiza");}	
	}
};
//YAHOO.log("carregou classe maparef", "Classes i3geo");
/*
Title: Ajuda

File: i3geo/classesjs/classe_ajuda.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.ajuda

Manipula��o das janelas de ajuda e outras coisas relacionadas.

Permite definir a mensagem padr�o da janela de mensagens. Abrir a janela e definir seu conte�do.
Controla tamb�m o letreiro m�vel que mostra mensagens especiais definidas em cada layer adicionado ao mapa.

Exemplos:

	Se vc n�o quiser que a janela seja aberta, inclua em seu HTML ou javascript
	
	i3GEO.ajuda.ATIVAJANELA = false;
	
	Para enviar uma mensagem para a janela, utilize
	
	i3GEO.ajuda.mostraJanela("texto");
*/
i3GEO.ajuda = {
	/*
	Property: ATIVAJANELA
	
	Define se a janela de mensagens pode ou n�o ser aberta.
	
	Default: true
	
	Type:
	{Boolean}
	*/
	ATIVAJANELA: true,
	/*
	Property: DIVAJUDA
	
	Nome do elemento HTML, do tipo DIV, que ir� conter os textos de ajuda.
	
	Se esse DIV for encontrado no mapa, os textos ser�o mostrados em seu interior.
	
	Default:
	"i3geo_ajuda"
	
	Type:
	{String}
	*/
	DIVAJUDA: "i3geo_ajuda",
	/*
	Property: DIVLETREIRO
	
	Id do elemento HTML onde ser� inclu�do o banner (letreiro) de mensagens.
	
	Esse tipo de mensagem � obtida do METADATA "MENSAGEM" que pode ser inclu�do em um layer.
	
	Default:
	"bannerMensagem"
	
	Type:
	{String}
	*/
	DIVLETREIRO: "i3geo_letreiro",
	/*
	Property: MENSAGEMPADRAO
	
	Mensagem que ser� inclu�da ao iniciar a janela de mensagens ou quando n�o houver
	mensagem definida para o elemento sobre o qual o mouse estaciona.
	
	Default:
	""
	
	Type:
	{String}
	*/
	MENSAGEMPADRAO: "",	
	/*
	Function: abreDoc

	Abre a documentacao do i3geo em uma nova janela do navegador
	*/
	abreDoc: function()
	{window.open(i3GEO.configura.locaplic+"/documentacao/index.html");},
	/*
	Function: abreJanela
	
	Abre a janela flutuante para mostrar as mensagens de ajuda.
	
	Essa fun��o � executada na inicializa��o do i3GEO
	*/
	abreJanela: function(){
		try	{
			if(i3GEO.ajuda.ATIVAJANELA == false){return;}
			if (!$i("janelaMenTexto")){
				var nx = "";
				var ny = "";
				if($i(i3GEO.interface.IDCORPO)){
					var pos = YAHOO.util.Dom.getXY($i(i3GEO.interface.IDCORPO));
					var nx = pos[0] - 267;
					var ny = i3GEO.parametros.h - 70;
				}
				var texto = '<div id="janelaMenTexto" style="text-align:left;font-size:10px;color:rgb(80,80,80)">'+i3GEO.ajuda.MENSAGEMPADRAO+'</div>';
				var janela = i3GEO.janela.cria("266","auto","",nx,ny,"&nbsp;","i3geo_janelaMensagens",false);
				janela[2].innerHTML = texto;
				YAHOO.util.Event.addListener(janela[0].close, "click", i3GEO.ajuda.fechaJanela);
				i3GEO.ajuda.ativaCookie();
			}
		}
		catch(e){}
	},
	/*
	Function: ativaCookie
	
	Ativa o cookie g_janelaMen e inclui o valor "sim".
	
	Toda a vez que a janela � aberta, o cookie � ativado.
	
	Ativando-se o cookie, a janela de mensagens ser� aberta automaticamente a pr�xima vez que o i3geo for iniciado
	*/
	ativaCookie: function(){
		i3GEO.util.insereCookie("g_janelaMen","sim");
	},
	/*
	Function: ativaLetreiro
	
	Busca mensagens no metadata "MENSAGEM" existentes nos layers do mapa.
	
	Se existirem mensagens, as mesmas s�o inclu�das no letreiro.
	
	O letreiro deve ser um elemento do tipo INPUT (text).
	
	Parameters:
	
	mensagem {String} - (opcional) texto que ser� mostrado no letreiro. Se n�o for informado
	ser� utilizado a vari�vel i3GEO.parametros.mensagens
	*/
	ativaLetreiro: function(mensagem){
		if($i(i3GEO.ajuda.DIVLETREIRO))
		{
			if(arguments.length == 0)
			{var mensagem = i3GEO.parametros.mensagens;}
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.ajuda.ativaLetreiro()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.ajuda.ativaLetreiro()");}					
			try
			{clearTimeout(i3GEO.ajuda.tempoLetreiro);}
			catch(e){i3GEO.ajuda.tempoLetreiro = "";}
			var l= $i(i3GEO.ajuda.DIVLETREIRO);
			if(l.style.display=="none"){return;}
			l.style.cursor="pointer";
			if(mensagem == ""){
				l.value = "";
				return;
			}
			if (l.size == 1)
			{l.size = i3GEO.parametros.w / 8;}
			BMessage = mensagem + " ---Clique para parar--- ";
			l.onclick = function()
			{l.style.display = "none";};
			if (BMessage != " ---Clique para parar--- "){
				BQuantas = 0;
				BSize = l.size;
				BPos=BSize;
				BSpeed = 1;
				BSpaces = "";
				i3GEO.ajuda.mostraLetreiro();
			}
			i3GEO.ajuda.mostraLetreiro(mensagem);
		}
	},
	/*
	Function: desativaCookie
	
	Desativa o cookie g_janelaMen.
	
	Toda a vez que a janela � fechada, o cookie � desativado.

	Desativando-se o cookie, a janela de mensagens n�o ser� aberta automaticamente a pr�xima vez que o i3geo for iniciado
	*/
	desativaCookie: function(){
		i3GEO.util.insereCookie("g_janelaMen","nao");
	},
	/*
	Function: fechaJanela. 
	
	Fecha a janela de ajuda.
	*/
	fechaJanela: function(){
		i3GEO.ajuda.desativaCookie();
		document.body.removeChild($i("i3geo_janelaMensagens_c"));
	},
	/*
	Function: mostraJanela
	
	Mostra um texto dentro da janela de mensagens padr�o.
	
	Parameters:
	
	texto {String} - texto a ser mostrado
	*/
	mostraJanela: function(texto){
		if ($i(i3GEO.ajuda.DIVAJUDA)){
			if (texto == ""){$i(i3GEO.ajuda.DIVAJUDA).innerHTML="-";}
			else
			{$i(i3GEO.ajuda.DIVAJUDA).innerHTML= texto;}
		}
		else{
			if ($i("janelaMenTexto"))
			{$i("janelaMenTexto").innerHTML= texto;}
		}
	},
	/*
	Private: mostraLetreiro
	
	Preenche o elemento INPUT com a mesnagem de texto e faz a movimenta��o das letras.
	
	O aparecimento das letras � controlado por um temporizador e asmensagens s�o mostradas apenas duas vezes,
	desde o in�cio do redesenho do mapa.
	*/
	mostraLetreiro: function(){
		for (count=0; count<BPos; count++)
		{BSpaces+= " ";}
		if (BPos < 1){
			$i(i3GEO.ajuda.DIVLETREIRO).value = BMessage.substring(Math.abs(BPos), BMessage.length);
			if (BPos+BMessage.length < 1)
			{BPos = BSize;BQuantas = BQuantas + 1;}
		}
		else
		{$i(i3GEO.ajuda.DIVLETREIRO).value = BSpaces + BMessage;}
		BPos-=BSpeed;
		if (BQuantas < 2)
		i3GEO.ajuda.tempoLetreiro = setTimeout('i3GEO.ajuda.mostraLetreiro();', 140);
	}
};
//
//para efeitos de compatibilidade
//
if(i3GEO.ajuda.MENSAGEMPADRAO == ""){
	try {
		if (g_mensagempadrao != "")	
		{i3GEO.ajuda.MENSAGEMPADRAO = g_mensagempadrao;}
		else
		i3GEO.ajuda.MENSAGEMPADRAO = $trad("p1");
	}
	catch(e){i3GEO.ajuda.MENSAGEMPADRAO = $trad("p1");}
}
if(document.getElementById("bannerMensagem"))
{i3GEO.ajuda.DIVLETREIRO = "bannerMensagem";}
//YAHOO.log("carregou classe ajuda", "Classes i3geo");
/*
Title: Janelas

File: i3geo/classesjs/classe_janela.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class:: i3GEO.janela

Abre janelas flutuantes

As janelas s�o criadas por meio da biblioteca YUI
*/
i3GEO.janela = {
	/*
	Variable: TIPS
	
	Lista os tips inseridos no mapa, possibilitando sua remo��o em lote
	*/
	TIPS: new Array(),
	/*
	Property: ANTESCRIA
	
	Lista com os nomes das fun��es que ser�o executadas antes de abrir a janela.
	
	Este � um array que pode ser modificado utilizando-se as fun��es javascript de
	manipula��o de arrays.
	
	Por default, ao criar uma janela � executada a fun��o i3GEO.janela.prepara

	Type:
	{Array}
	*/
	ANTESCRIA: new Array(
		"i3GEO.janela.prepara()"
	),
	/*
	Property: ANTESFECHA
	
	Lista com os nomes das fun��es que ser�o executadas ap�s fechar a janela.
	
	Este � um array que pode ser modificado utilizando-se as fun��es javascript de
	manipula��o de arrays.
	
	Por default, ao fechar uma janela � executada a fun��o i3GEO.janela.fecha

	Type:
	{Array}
	*/
	ANTESFECHA: new Array(),
	/*
	Function: prepara
	
	Executa fun��es default antes de abrir a janela
	*/
	prepara: function(){
		//
		//esconde o box de zoom e outros objetos tempor�rios se estiverem vis�veis
		//
		i3GEO.util.escondePin();
		i3GEO.util.escondeBox();
	},
	/*
	Function: cria
	
	Cria uma janela flutuante.
	
	Vc pode obter o elemento HTML interno da janela por meio de:
	
	{retorno}[2].innerHTML
	
	Parameters:
	
	wlargura {integer} - largura da janela em pixels
	
	waltura {integer} - altura da janela em pixels
	
	wsrc {String} - URL que ser� inclu�da no SRC do iframe interno da janela. Se for "", o iframe n�o ser� criado
	
	nx {Integer} - posi��o x da janela em pixels. Se for "" ser� fixada no centro
	
	ny {Integer} - posi��o y da janela em pixels. Se for "" ser� fixada no centro

	id {String} - (opcional) nome que ser� dado ao id que conter� a janela. Se n�o for definido, ser� usado o id="wdoca". O
		id do iframe interno � sempre igual ao id + a letra i. Por default, ser� "wdocai".
		O id do cab�alho ser� igual a id+"_cabecalho" e o id do corpo ser� id+"_corpo"
	
	modal {Boolean} - (opcional) indica se a janela bloquear� as inferiores ou n�o. Por default � false
	
	Return:
	
	{Array} Array contendo: objeto YAHOO.panel criado,elemento HTML com o cabecalho, elemento HTML com o corpo
	*/
	cria: function(wlargura,waltura,wsrc,nx,ny,texto,id,modal){
		//executa as fun��es de prepara��o
		//YAHOO.log("Cria janela", "janela");
		if(i3GEO.janela.ANTESCRIA){
			for(i=0;i<i3GEO.janela.ANTESCRIA.length;i++)
			{eval(i3GEO.janela.ANTESCRIA[i]);}
		}
		//
		//por default o id ser� 'wdoca'
		//
		if (arguments.length < 7 || id == ""){
			var id = "wdoca";
			var modal = false;
		}
		if (arguments.length == 7){
			var modal = false;
		}
		var wlargura_ = parseInt(wlargura)+0+"px";
		YAHOO.namespace("janelaDoca.xp");
		if ($i(id))
		{YAHOO.janelaDoca.xp.panel.destroy();}
		var ins = '<div id="'+id+'_cabecalho" class="hd">'+texto+'</div><div id="'+id+'_corpo" class="bd">';
		if(wsrc != "")
		ins += '<iframe name="'+id+'i" id="'+id+'i" valign="top" style="border:0px white solid"></iframe>';
		ins += '</div>';
		var novoel = document.createElement("div");
		novoel.id = id;
		novoel.style.display="block";
		novoel.innerHTML = ins;
		if($i("i3geo"))
		{$i("i3geo").appendChild(novoel);}
		else
		{document.body.appendChild(novoel);}
		var wdocaiframe = $i(id+"i");
		if (wdocaiframe)
		{
			with (wdocaiframe.style){width = "100%";height=waltura;};
			wdocaiframe.style.display = "block";
			wdocaiframe.src = wsrc;
			//i3GEO.janela.ANTESFECHA.push("$i('"+id+"i').src = ''");
		}
		var fix = false;
		if(nx == "" || nx == "center"){var fix = true;}
		if(waltura == "auto")
		YAHOO.janelaDoca.xp.panel = new YAHOO.widget.Panel(id, { zIndex:5000, modal:modal, width: wlargura_,underlay:"none", fixedcenter: fix, constraintoviewport: false, visible: true, iframe:false} );	
		else
		YAHOO.janelaDoca.xp.panel = new YAHOO.widget.ResizePanel(id, { zIndex:5000, modal:modal, width: wlargura_, fixedcenter: fix, constraintoviewport: false, visible: true, iframe:false} );
		if(nx != "" && nx != "center"){
			var pos = new Array(nx,ny);
			YAHOO.janelaDoca.xp.panel.moveTo(pos[0],pos[1]+50);
		}
		YAHOO.janelaDoca.xp.panel.render();
		YAHOO.util.Event.addListener(YAHOO.janelaDoca.xp.panel.close, "click", i3GEO.janela.fecha,id);
		//YAHOO.log("Fim cria janela", "janela");
		return(new Array(YAHOO.janelaDoca.xp.panel,$i(id+"_cabecalho"),$i(id+"_corpo")));
	},
	/*
	Function: fecha
	
	Aplica a op��o definida em ANTESFECHA e elimina alguns objetos que s�o comumente adicionados por algumas opera��es do i3geo
	como richdraw, box, pin
	
	Parameters:
	
	id {String} - id da janela que ser� fechada
	*/
	fecha: function(r,id){
		//esconde o box do google
		i3GEO.util.escondePin();
		i3GEO.util.escondeBox();
		//fecha o container de desenho de elementos na tela
		if($i("divGeometriasTemp"))
		{i3GEO.desenho.richdraw.fecha();}
		if($i("flamingoi")){$i("flamingoi").style.display="block";}
		//executa as fun��es de fechamento
		if(i3GEO.janela.ANTESFECHA){
			for(i=0;i<i3GEO.janela.ANTESFECHA.length;i++)
			{eval(i3GEO.janela.ANTESFECHA[i]);}
		}
		document.body.removeChild($i(id+"_c"));
		//YAHOO.janelaDoca.xp.panel.destroy();
	},
	/*
	Function: alteraTamanho
	
	Altera o tamanho de uma janela aberta
	
	Parameters:
	
	w {Integer} - nova largura
	
	h {Integer} - nova altura
	
	id {String} - (opcional) id que identifica a janela aberta, por padr�o utiliza "wdoca"
	*/
	alteraTamanho: function(w,h,id){
		if(arguments.length == 3)
		{var i = $i(id);}
		else
		{var i = $i("wdoca");}
		if(i){
			i.style.width = w;
			i.style.height = h;
		}
	},
	/*
	Function: abreAguarde
	
	Abre uma janela com a mensagem de agurde e bloqueia cliques nomapa
	
	Parameters:
	
	id {String} - id danovajanela
	
	texto {String} - texto da janela
	*/
	abreAguarde: function(id,texto){
		//YAHOO.log("abreAguarde", "janela");
		if($i(id+"_mask"))
		{document.body.removeChild($i(id+"_mask"));}
		if($i(id+"_c"))
		{document.body.removeChild($i(id+"_c"));}
		YAHOO.namespace("aguarde."+id);
		var pos = [0,0];
		if($i("corpoMapa"))
		{var pos = YAHOO.util.Dom.getXY($i("corpoMapa"));}
		else if ($i("contemImg"))
		{var pos = YAHOO.util.Dom.getXY($i("contemImg"));}
		eval ('YAHOO.aguarde.'+id+' = new YAHOO.widget.Panel("'+id+'",{width:"240px",fixedcenter:false,underlay:"none",close:true,draggable:false,modal:true})');
		eval ('YAHOO.aguarde.'+id+'.setBody("<span style=font-size:12px; >"+texto+"</span>")');
		eval ('YAHOO.aguarde.'+id+'.body.style.height="20px"');
		eval ('YAHOO.aguarde.'+id+'.setHeader("<span><img src=\'"+i3GEO.configura.locaplic+"/imagens/aguarde.gif\' /></span>")');
		eval ('YAHOO.aguarde.'+id+'.render(document.body)');
		if($i("flamingo"))
		{eval ('YAHOO.aguarde.'+id+'.moveTo(0,0)');}
		else
		{eval ('YAHOO.aguarde.'+id+'.moveTo('+pos[0]+','+pos[1]+')');}
		eval ('YAHOO.aguarde.'+id+'.show()');
		if($i(id+"_mask"))
		{$i(id+"_mask").style.zIndex=5000;}
		if($i(id+"_c"))
		{$i(id+"_c").style.zIndex=6000;}
		//YAHOO.log("Fim abreAguarde", "janela");	
	},
	/*
	Function: tip
	
	Cria um DIV e posiciona sobre o mapa na posi��o do mouse.
	
	Parameters:
	
	cabecalho {String} - texto que ser� usado no cabe�alho (op��o fixar) (opcional)
	
	Return:
	
	ID do DIV criado
	*/
	tip: function(cabecalho){
		if(arguments.length == 0){var cabecalho = "fixar";}
		var Nid = YAHOO.util.Dom.generateId();
		var i = $i("i3geo_rosa");
		if(i)
		i.style.display="none";
		if ($i("img"))
		{$i("img").title = "";}
		//insere div para tips
		var novoel = document.createElement("div");
		novoel.id = Nid;
		novoel.style.position="absolute";
		novoel.style.zIndex=5000;
		novoel.style.textAlign="left";
		novoel.style.background="white";
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		else
		{novoel.style.opacity = ".9";}
		document.body.appendChild(novoel);
		i3GEO.janela.TIPS.push($i(Nid));
		//
		//monta o TIP com o id �nico criado
		//quando o usu�rio escolhe a op��o de fixar,
		//o div � incluido no array i3GEO.janela.TIPS
		//quando o mapa � redesenhado, esses elementos s�o exclu�dos do mapa
		//
		var res = "<div id='"+Nid+"cabecatip' style='text-align:left;background-color:rgb(240,240,240)'>";
		res += "<span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:$i(\""+Nid+"cabecatip\").innerHTML =\"\";' >"+cabecalho+"</span></div>";
		novoel.innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
		ist = novoel.style;
		ist.top = objposicaocursor.telay - 10;
		ist.left = objposicaocursor.telax - 4;
		ist.display="block";
		//
		//registra a fun��o de elimina��o dos tips
		//
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.janela.excluiTips('todos')") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.janela.excluiTips('todos')");}	
		if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.janela.excluiTips('naofixos')") < 0)
		{i3GEO.eventos.MOUSEMOVE.push("i3GEO.janela.excluiTips('naofixos')");}		
		//
		return(Nid);
	},
	/*
	Function: excluiTips
	
	Exclui os tips armazenados na vari�vel i3GEO.janela.TIPS
	
	Parameters:
	
	tipo {String} - todos|naofixos tipos de tips que ser�o exclu�dos
	*/
	excluiTips: function(tipo){
		if(i3GEO.janela.TIPS.length > 0){
			var ot = i3GEO.janela.TIPS.length-1;
			if (ot >= 0){
				do{
					if(tipo == 'todos'){
						if(i3GEO.janela.TIPS[ot]){
							var i = $i(i3GEO.janela.TIPS[ot].id);
							document.body.removeChild(i);
						}
					}
					if(tipo == 'naofixos'){
						if ($i(i3GEO.janela.TIPS[ot])){
							if($i(i3GEO.janela.TIPS[ot].id+"cabecatip").innerHTML != ""){
								document.body.removeChild($i(i3GEO.janela.TIPS[ot].id));
							}
						}
					}
				}
				while(ot--)
				if(tipo == "todos")
				{i3GEO.janela.TIPS = new Array();}
			}
		}
	},
	slider: function(funcao,inicial){
		var janela = i3GEO.janela.cria(230,200,"","","","Opacidade","opacidadeG");
		var novoel = document.createElement("div");
		novoel.id = "slider-bg";
		novoel.tabindex = "-1";
		novoel.innerHTML = '<div style="cursor:default;position:absolute;top:4px" id="slider-thumb"><img src="'+i3GEO.configura.locaplic+'/imagens/thumb-n.gif"></div>';
		janela[2].appendChild(novoel);
    	var Event = YAHOO.util.Event;
        var	Dom   = YAHOO.util.Dom;
        var	lang  = YAHOO.lang;
        var	slider; 
        var	bg="slider-bg";
        var thumb="slider-thumb"; 
        var	valuearea="slider-value";
        var textfield="slider-converted-value";
		novoel.style.position = "relative";
        novoel.style.background= 'url('+i3GEO.configura.locaplic+'/imagens/bg-fader.gif) 5px 0 no-repeat';
        novoel.style.height = "28px";
        novoel.style.width= "228px"; 
    	// The slider can move 0 pixels up
    	var topConstraint = 0;
    	// The slider can move 200 pixels down
    	var bottomConstraint = 200;
    	// Custom scale factor for converting the pixel offset into a real value
    	var scaleFactor = 1;
    	// The amount the slider moves when the value is changed with the arrow
    	// keys
    	var keyIncrement = 20;
    	var tickSize = 20;
    	Event.onDOMReady(function() {
        	slider = YAHOO.widget.Slider.getHorizSlider(bg,thumb, topConstraint, bottomConstraint, 20);
        	slider.setValue(parseInt(inicial));
        	slider.getRealValue = function() {
            	return Math.round(this.getValue() * scaleFactor);
        	}
        	slider.subscribe("slideEnd", function(offsetFromStart) {
            	//var valnode = Dom.get(valuearea);
            	//var fld = Dom.get(textfield);
            	// Display the pixel value of the control
            	//valnode.innerHTML = offsetFromStart;
            	// use the scale factor to convert the pixel offset into a real
            	// value
            	var actualValue = slider.getRealValue();
            	// update the text box with the actual value
            	//alert(actualValue);
            	eval(funcao+"("+actualValue+")");
			});
        });
        // Use setValue to reset the value to white:
        Event.on("putval", "click", function(e) {
            slider.setValue(100, false); //false here means to animate if possible
        });
	},
	/*
	Function: fechaAguarde
	
	Fecha uma janela do tipo aguarde
	
	Paremeters:
	
	id {String} - id da janela que ser� fechada. Se n�o for definido, tenta fechar as janelas principais.
	*/
	fechaAguarde: function(id){
		if(arguments.length > 0){
			try{eval('YAHOO.aguarde.'+id+'.destroy()');}
			catch(e){};
		}
		else{
			i3GEO.janela.fechaAguarde("ajaxdestaca");
			i3GEO.janela.fechaAguarde("ajaxabrelente");
			i3GEO.janela.fechaAguarde("ajaxiniciaParametros");
			i3GEO.janela.fechaAguarde("i3GEO.atualiza");
			i3GEO.janela.fechaAguarde("ajaxCorpoMapaEntorno");
			i3GEO.janela.fechaAguarde("ajaxCorpoMapa");
			i3GEO.janela.fechaAguarde("ajaxLegenda");
			i3GEO.janela.fechaAguarde("ajaxReferencia");
			i3GEO.janela.fechaAguarde("ajaxEscalaGrafica");
			i3GEO.janela.fechaAguarde("montaMapa");
			i3GEO.janela.fechaAguarde("aguardedoc");
			i3GEO.janela.fechaAguarde("ajaxCorpoMapa1");		
		}
	}
};
try{
	//controle dos pain�is que podem ser redimensionados
	YAHOO.widget.ResizePanel = function(el, userConfig)
	{
    	if (arguments.length > 0) 
    	{YAHOO.widget.ResizePanel.superclass.constructor.call(this, el, userConfig);}
	};
	YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE = "yui-resizepanel";
	YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE = "resizehandle";
	YAHOO.extend(
		YAHOO.widget.ResizePanel, YAHOO.widget.Panel,{
   			init: function(el, userConfig){
    			YAHOO.widget.ResizePanel.superclass.init.call(this, el);
       			this.beforeInitEvent.fire(YAHOO.widget.ResizePanel);
       			var Dom = YAHOO.util.Dom,
           			Event = YAHOO.util.Event,
           			oInnerElement = this.innerElement,
           			oResizeHandle = document.createElement("DIV"),
           			sResizeHandleId = this.id + "_resizehandle";
       			oResizeHandle.id = sResizeHandleId;
       			oResizeHandle.className = YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE;
       			Dom.addClass(oInnerElement, YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE);
       			this.resizeHandle = oResizeHandle;
       			function initResizeFunctionality(){
           			var me = this,
               			oHeader = this.header,
               			oBody = this.body,
               			oFooter = this.footer,
               			nStartWidth,
               			nStartHeight,
               			aStartPos,
               			nBodyBorderTopWidth,
               			nBodyBorderBottomWidth,
               			nBodyTopPadding,
               			nBodyBottomPadding,
               			nBodyOffset;
           			oInnerElement.appendChild(oResizeHandle);
           			this.ddResize = new YAHOO.util.DragDrop(sResizeHandleId, this.id);
           			this.ddResize.setHandleElId(sResizeHandleId);
           			this.ddResize.onMouseDown = function(e){
               			nStartWidth = oInnerElement.offsetWidth;
               			nStartHeight = oInnerElement.offsetHeight;
               			if (YAHOO.env.ua.ie && document.compatMode == "BackCompat")
               			{nBodyOffset = 0;}
               			else{
                   			nBodyBorderTopWidth = parseInt(Dom.getStyle(oBody, "borderTopWidth"), 10);
                   			nBodyBorderBottomWidth = parseInt(Dom.getStyle(oBody, "borderBottomWidth"), 10);
                   			nBodyTopPadding = parseInt(Dom.getStyle(oBody, "paddingTop"), 10);
                   			nBodyBottomPadding = parseInt(Dom.getStyle(oBody, "paddingBottom"), 10);
                   			nBodyOffset = nBodyBorderTopWidth + nBodyBorderBottomWidth + nBodyTopPadding + nBodyBottomPadding;
               			}
               			me.cfg.setProperty("width", nStartWidth + "px");
               			aStartPos = [Event.getPageX(e), Event.getPageY(e)];
           			};
           			this.ddResize.onDrag = function(e){
               			var aNewPos = [Event.getPageX(e), Event.getPageY(e)],
                   			nOffsetX = aNewPos[0] - aStartPos[0],
                   			nOffsetY = aNewPos[1] - aStartPos[1],
                   			nNewWidth = Math.max(nStartWidth + nOffsetX, 10),
                   			nNewHeight = Math.max(nStartHeight + nOffsetY, 10),
                   			nBodyHeight = (nNewHeight - (oFooter.offsetHeight + oHeader.offsetHeight + nBodyOffset));
               			me.cfg.setProperty("width", nNewWidth + "px");
               			if (nBodyHeight < 0)
               			{nBodyHeight = 0;}
               			oBody.style.height =  nBodyHeight + "px";
               			if ($i("wdocai"))
               			{$i("wdocai").style.height = nBodyHeight;}
           			};
       			};
       			function onBeforeShow(){
       				initResizeFunctionality.call(this);
       				this.unsubscribe("beforeShow", onBeforeShow);
       			};
       			function onBeforeRender(){
           			if (!this.footer)
           			{this.setFooter("");}
           			if (this.cfg.getProperty("visible"))
           			{initResizeFunctionality.call(this);}
           			else
           			{this.subscribe("beforeShow", onBeforeShow);}
       				this.unsubscribe("beforeRender", onBeforeRender);
       			};
       			this.subscribe("beforeRender", onBeforeRender);
       			if (userConfig)
       			{this.cfg.applyConfig(userConfig, true);}
       			this.initEvent.fire(YAHOO.widget.ResizePanel);
   			},
   			toString: function()
   			{return "ResizePanel " + this.id;}
		}
	);
}
catch(e){};
//YAHOO.log("carregou classe janela", "Classes i3geo");

/*
Title: Guias

File: i3geo/classesjs/classe_guias.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.guias

Cria e controla as guias de op��es

Para configurar as guias utilize i3GEO.guias.configura = ...
*/
i3GEO.guias = {
	/*
	Property: CONFIGURA
	
	Define os par�metros de cada guia
	
	Type:
	{JSON}
	*/
	CONFIGURA: {
		"temas":{
			titulo:$trad("g4a"),
			id:"guia1",
			idconteudo:"guia1obj",
			click:""
		},
		"adiciona":{
			titulo:"+"+$trad("g1"),
			id:"guia2",
			idconteudo:"guia2obj",
			click: function(){
				i3GEO.guias.mostra("adiciona");
				if(!$i("arvoreAdicionaTema"))
				{
					try{
						if (objmapa.guiaMenu != undefined)
						var ondeArvore = objmapa.guiaMenu+"obj";
					}
					catch(e){var ondeArvore = "guia2obj";};
				}
				else
				{var ondeArvore = "arvoreAdicionaTema";}
				//para efeitos de compatibilidade
				if(document.getElementById("outrasOpcoesAdiciona")){
					i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde = "outrasOpcoesAdiciona";
					i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore = false;
				}
				i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,ondeArvore);
			}
		},
		"legenda":{
			titulo:$trad("g3"),
			id:"guia4",
			idconteudo:"guia4obj",
			click: function(){
				i3GEO.guias.mostra("legenda");
				i3GEO.mapa.legendaHTML.cria("guia4obj");
			}
		},
		"mapas":{
			titulo:"Links",
			id:"guia5",
			idconteudo:"guia5obj",
			click: function(){
				var pegaMapas = function(retorno){
					var ins = "<br><div id='banners' style='overflow:auto;text-align:left'>";
					var mapa = retorno.data.mapas;
					var ig1lt = mapa.length;
					var ig1=0;
					if(ig1lt > 0){
						do{
							var nome = mapa[ig1].NOME;
							if(mapa[ig1].PUBLICADO){
								if(mapa[ig1].PUBLICADO == "NAO" || mapa[ig1].PUBLICADO == "nao")
								{var nome = "<s>"+nome+"</s>";}
							}
							var lkd = mapa[ig1].LINK;
							var link = i3GEO.configura.locaplic+"/ms_criamapa.php?temasa="+mapa[ig1].TEMAS+"&layers="+mapa[ig1].LIGADOS;
							if (mapa[ig1].EXTENSAO != "")
							{link += "&mapext="+mapa[ig1].EXTENSAO;}
							if (mapa[ig1].OUTROS != "")
							{link += "&"+mapa[ig1].OUTROS;}
							if (lkd != "")
							{var link = lkd;}
							ins += "<div><a href='"+link+"'><img src='"+mapa[ig1].IMAGEM+"'></a></div><br>";
							ins += "<div><p style=text-align:center >"+nome+"</p></div><br>";
							ig1++;
						}
						while(ig1<ig1lt)
					}
					$i(i3GEO.guias.CONFIGURA.mapas.idconteudo).innerHTML = ins+"</div>";
				};
				$i(i3GEO.guias.CONFIGURA.mapas.idconteudo).innerHTML = "Aguarde...";
				i3GEO.guias.mostra("mapas");
				i3GEO.php.pegaMapas(pegaMapas);
			}
		}
	},
	/*
	Variable: atual
	
	Guia que est� ativa
	*/
	ATUAL: "temas",
	/*
	Variavel: idguias
	
	ID do elemento criado pelo YUI onde ficar�o as guias
	
	Type:
	{String}
	*/
	IDGUIAS: "guiasYUI",
	/*
	Function: cria
	
	Cria as guias com base na vari�vel configura.
	
	As guias podem ser definidas no HTML do mapa sem necessariamente estarem na vari�vel configura.<b> 
	As guias, nesse caso, devem ter como ID "guia'n'", por exemplo id="guia6". Para cada uma dessas guias
	deve haver um DIV com o conte�do. Esse DIV deve ter como ID "guia'n'obj", por exemplo id="guia6obj"
	
	Parameters:
	
	onde {String} - id do elemento que conter� as guias
	*/
	cria: function(onde){
		//
		//obt�m outras guias que podem existir no mapa
		//
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		for(var g=0;g<12;g++){
			var tituloguia = "";
			if ($i("guia"+g)){
				var tituloguia = $i("guia"+g).innerHTML;
				var re = new RegExp("&nbsp;", "g");
				var tituloguia = tituloguia.replace(re,'');
				for(ng=0;ng<nguias;ng++){
					if(i3GEO.guias.CONFIGURA[guias[ng]].id == "guia"+g){
						var tituloguia = "";
					}
				}
				if (tituloguia != ""){
					eval("i3GEO.guias.CONFIGURA.guia"+g+"=new Array()");
					eval("i3GEO.guias.CONFIGURA.guia"+g+".titulo = '"+tituloguia+"'");
					eval("i3GEO.guias.CONFIGURA.guia"+g+".id = 'guia"+g+"'");
					eval("i3GEO.guias.CONFIGURA.guia"+g+".idconteudo = 'guia"+g+"obj'");
					if($i('guia'+g).onclick){
						eval("i3GEO.guias.CONFIGURA.guia"+g+".click = "+$i("guia"+g).onclick);
					}
				}
			}
		}
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		//
		//verifica o div que cont�m as guias caso n�o tenha sido passado como par�metro
		//
		if(arguments.length == 0){
			for(ng=0;ng<nguias;ng++){
				var i = $i(i3GEO.guias.CONFIGURA[guias[ng]].id);
				if(i){
					var onde = i.parentNode;
				}
			}
		}
		else
		{var onde = $i(onde);}
		if(!onde){return;}
		onde.id = i3GEO.guias.IDGUIAS;
		onde.className = "yui-navset";
		//
		//constroi as TAGs para as guias
		//
		var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 0px;border-color:rgb(240,240,240);border-bottom-color:white;">';
		for(ng=0;ng<nguias;ng++){
			if($i(i3GEO.guias.CONFIGURA[guias[ng]].idconteudo))
			ins += '<li><a href="#"><em><div id="'+i3GEO.guias.CONFIGURA[guias[ng]].id+'" >'+i3GEO.guias.CONFIGURA[guias[ng]].titulo+'</div></em></a></li>';
		}
		ins += "</ul>";
		onde.innerHTML = ins;
		for(g=0;g<nguias;g++)
		{
			var guia = i3GEO.guias.CONFIGURA[guias[g]];
			var id = guia.id;
			if($i(id)){
				if(guia.click == "" || guia.click == undefined)
					eval('$i("'+id+'").onclick = function(){i3GEO.guias.mostra("'+guias[g]+'");}');
				else
					$i(id).onclick = guia.click;
					
				$i(id).onmouseover = function(){
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "#bfdaff";
				};
				$i(id).onmouseout = function(){
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "transparent";
				};
				if($i(guia.idconteudo)){
					$i(guia.idconteudo).style.overflow="auto";
					$i(guia.idconteudo).style.height = i3GEO.parametros.h;
				}
			}
		}
		i3GEO.guias.mostra(i3GEO.guias.ATUAL);
		i3GEO.guias.ativa(i3GEO.guias.ATUAL);
	},
	/*
	Function: ajustaAltura
	
	Ajusta a altura das guias conforme a altura da imagem do mapa
	*/
	ajustaAltura: function(){
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		for(g=0;g<nguias;g++){
			var guia = i3GEO.guias.CONFIGURA[guias[g]];
			if($i(guia.idconteudo)){
				$i(guia.idconteudo).style.overflow="auto";
				$i(guia.idconteudo).style.height = i3GEO.parametros.h;
			}	
		}
	},
	
	/*
	Function: mostra
	
	Mostra no mapa uma determinada guia
	
	Parameters:
	
	guia {String} - nome da guia
	*/
	mostra: function(guia){
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		for(g=0;g<nguias;g++){
			if($i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo))
			$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.display="none";
			if($i(i3GEO.guias.CONFIGURA[guias[g]].id))
			$i(i3GEO.guias.CONFIGURA[guias[g]].id).parentNode.parentNode.style.background="transparent";
		}
		//
		//verifica se o nome da guia passado como parametro est� correto ou � o id da guia
		//
		if(i3GEO.guias.CONFIGURA.toString().search(guia) < 0){
			for(g=0;g<nguias;g++){
				if(i3GEO.guias.CONFIGURA[guias[g]].id == guia)
				{var guia = guias[g];}
			}
		}
		if($i(i3GEO.guias.CONFIGURA[guia].idconteudo)){
			$i(i3GEO.guias.CONFIGURA[guia].idconteudo).style.display="block";
			$i(i3GEO.guias.CONFIGURA[guia].id).parentNode.parentNode.style.background="white";
			i3GEO.guias.ATUAL = guia;
		}
	},
	/*
	Function: ativa
	
	Ativa uma determinada guia
	
	Parameters:
	
	guia {String} - guia que ser� ativada
	*/
	ativa: function(guia){
		try{
			if(i3GEO.guias.CONFIGURA[i3GEO.guias.ATUAL].click != "")
			{i3GEO.guias.CONFIGURA[i3GEO.guias.ATUAL].click.call();}
		}
		catch(e){};
	},
	/*
	Function: libera
	
	Libera as guias do local atual, colocando-as em uma janela m�vel sobre o mapa.
	*/
	libera: function(){
		if (!$i("conteudojanelaguias")){
			if($i(i3GEO.guias.IDGUIAS)){$i(i3GEO.guias.IDGUIAS).style.display="none";}
			var i = $i("contemFerramentas");
			if(i)
			i.style.display = "none";
			var w = parseInt($i("contemFerramentas").style.width);
			var i = $i("visual");
			if (i)
			{i.style.width="0px";i.innerHTML="";}
			var pos = "px";
			var a = i3GEO.parametros.h;
			var l = i3GEO.parametros.w + w;
			i3GEO.parametros.h = a;
			i3GEO.parametros.w = l;
			if (navm){pos = "";}
			var i = $i("img");
			if(i){
				i.style.width= l+pos;
				i.style.height= a+pos;
			}
			var i = $i("corpoMapa");
			if(i){
				i.style.width= l+pos;
				i.style.height= a+pos;
				i.style.clip = 'rect('+0+" "+(l*1+2)+" "+(a*1+2)+" "+0+')';
			}
			var i = $i("mst");
			if(i){i.style.width = l + 1 + pos;}
			var i = $i("contemImg");
			if(i){
				i.style.height= a+pos;
				i.style.width= l+pos;
			}
			if (i3GEO.configura.entorno == "sim"){
				var letras=["L","O"];
				for (var l=0;l<2; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.width = i3GEO.parametros.w+pos;
						$i("img"+letras[l]).style.height = i3GEO.parametros.h+pos;
						$i("corpoMapa"+letras[l]).style.width=i3GEO.parametros.w+pos;
						$i("corpoMapa"+letras[l]).style.height=i3GEO.parametros.h+pos+pos;
						$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
					}
				}
				var letras=["N","S"];
				for (var l=0;l<2; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.width = i3GEO.parametros.w * 2+pos;
						$i("img"+letras[l]).style.height = i3GEO.parametros.h * 2+pos;
						$i("corpoMapa"+letras[l]).style.width=i3GEO.parametros.w * 3+pos;
						$i("corpoMapa"+letras[l]).style.height=i3GEO.parametros.h+pos;
						$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
					}
				}
			}
			i3GEO.mapa.ajustaPosicao();
			var temp = function(retorno){
				//carrega janela
				var novoel = document.createElement("div");
				novoel.id = "janelaguias";
				novoel.style.display="block";
				var temp = '<div class="hd">Guias</div>';
				temp += '<div class="bd" id="conteudojanelaguias"></div>';
				novoel.innerHTML = temp;
				if($i("i3geo"))
				{$i("i3geo").appendChild(novoel);}
				else
				{document.body.appendChild(novoel);}
				YAHOO.namespace("janelaguias.xp");
				YAHOO.janelaguias.xp.panel = new YAHOO.widget.Panel("janelaguias", {width:"270px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
				YAHOO.janelaguias.xp.panel.render();
				var i = $i(i3GEO.guias.IDGUIAS);
				$i("janelaguias").appendChild(i);
				i.style.borderLeft="1px solid black";
				i.style.borderRight="1px solid black";
				var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
				var nguias = guias.length;
				for(g=0;g<nguias;g++){
					if($i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo)){
						$i("janelaguias").appendChild($i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo));
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.background="white";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.border="1px solid black";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.borderTop="0px solid black";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.width="270px";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.left="-1px";
					}
				}
				i3GEO.atualiza("")
				i.style.display="block";
				i.style.left = "-1px";
				i.style.width = "270px";
			};	
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			i3GEO.php.mudatamanho(temp,a,l);
		}
		else{
			YAHOO.janelaguias.xp.panel.render();
			YAHOO.janelaguias.xp.panel.show();
		}
	
	}
};
//YAHOO.log("carregou classe guias", "Classes i3geo");
/*
Title: �rvore de camadas

File: i3geo/classesjs/classe_arvoredecamadas.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.arvoreDeCamadas

Monta a �rvore com os temas existentes no mapa atual. A �rvore cont�m as op��es de ligar e desligar temas.

Permite controlar quais as op��es que ser�o mostradas na �rvore.

Exemplos:

	Para alterar as op��es da �rvore, modifique as propriedades

	i3GEO.arvoreDeCamadas.OPCOESTEMAS = false;
*/
i3GEO.arvoreDeCamadas = {
	/*
	Property: ATIVATEMA
	
	Nome da fun��o que ser� inclu�da no evento onclick do elemento checkbox adicionado no in�cio do nome de um tema.
	
	Type:
	{String}
	*/
	ATIVATEMA: "",
	/*
	Property: OPCOESTEMAS
	
	Inclui ou n�o o n� com as op��es de manipula��o de cada tema.
	
	Default:
	true
	
	Type:
	{Boolean}
	*/
	OPCOESTEMAS: true,
	/*
	Property: OPCOESLEGENDA
	
	Inclui ou n�o o n� para mostrar a legenda do tema.
	
	Default:
	true
	
	Type:
	{Boolean}
	*/
	OPCOESLEGENDA: true,
	/*
	Variable: CAMADAS
	
	Objeto com a lista de camadas existentes no mapa. � definido na inicializa��o ou no redesenho do mapa.
	
	Este objeto � constru�do nas opera��es em PHP de inicializa��o ou redesenho do mapa.
	
	Exemplo:
	
	"temas":[
		
		{
		
			"name":"estadosl", //c�digo do layer
			
			"status":2, //ver constante MS_STATUS do Mapserver
			
			"tema":"Limite Estadual",
			
			"transparency":100,
			
			"type":1, //ver constante MS_TYPE do Mapserver
			
			"sel":"nao",
			
			"escala":"250000",
			
			"download":"",
			
			"features":"nao",
			
			"connectiontype":1, //ver constante MS_CONNECTIONTYPE do Mapserver
			
			"zoomtema":"sim",
			
			"contextoescala":"nao"
			
		}
	]
	
	Type:
	{JSON}
	*/
	CAMADAS: "",
	/*
	Variable: ARVORE
	
	Objeto com a �rvore criada com YAHOO.widget.TreeView

	Type:
	{YAHOO.widget.TreeView}
	*/
	ARVORE: null,
	/*
	Variable: IDHTML
	
	Armazena o ID do elemento DOM onde a �rvore foi inserida.
	
	Type:
	{String}
	*/
	IDHTML: null,
	/*
	Variable: SID
	
	C�digo da se��o aberta no servidor pelo i3Geo

	Type:
	{String}
	*/
	SID: null,
	/*
	Variable: LOCAPLIC
	
	Endere�o da aplica��o i3geo. Utilizado para definir o caminho para a chamada em AJAX.
	
	Exemplo: 'http://localhost/i3geo'

	Type:
	{String}
	*/
	LOCAPLIC: null,
	/*
	Function: cria
	
	Cria a �rvore com as op��es de manipula��o das camadas existentes no mapa
	
	Parameters:
	
	onde {String} - ID do elemento DOM onde a �rvore ser� inserida. Se for definido como "" o id ser� buscado da vari�vel IDHTML.
	
	temas {JSON} - Objeto JSON com as camadas e propriedades
	
	g_sid {String} -  C�digo da se��o PHP criada ao abrir o i3Geo

	funcaoTema {String} - (opcional) Nome da fun��o que ser� executada quando o usu�rio clicar no checkbox de um tema
	*/
	cria: function(onde,temas,g_sid,g_locaplic,funcaoTema){
		//YAHOO.log("Criando a �rvore de camadas", "i3geo");
		if(arguments.length == 5){
			i3GEO.arvoreDeCamadas.ATIVATEMA = funcaoTema;
		}
		this.SID = g_sid;
		this.LOCAPLIC = g_locaplic;
		if(onde != "")
		this.IDHTML = onde;
		if(this.IDHTML == ""){return;}
		this.atualiza(temas);
	},
	/*
	Function: atualiza
	
	Atualiza a �rvore de camadas.
	
	Antes de executar a atualiza��o, essa fun��o verifica se � necess�rio faz�-lo.
	O objeto CAMADAS � comparado com o par�metro "temas" para verificar se existem diferen�as que
	justifiquem a atualiza��o.
	
	Parameters:
	
	temas {JSON} - Objeto com a lista de camadas e propriedades (veja CAMADAS)
	*/
	atualiza: function(temas){
		if(this.comparaTemas(temas,this.CAMADAS)){return;}
		//YAHOO.log("Atualizando a �rvore de camadas", "i3geo");
		document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).innerHTML = "";
		this.CAMADAS = temas;
		var currentIconMode;
		YAHOO.example.treeExample = new function(){
			function changeIconMode(){
				var newVal = parseInt(this.value);
				if (newVal != currentIconMode)
				{currentIconMode = newVal;}
				buildTree();
			}
        	function buildTree(){
				i3GEO.arvoreDeCamadas.ARVORE = new YAHOO.widget.TreeView(i3GEO.arvoreDeCamadas.IDHTML);
				var root = i3GEO.arvoreDeCamadas.ARVORE.getRoot();
				var tempNode = new YAHOO.widget.TextNode('', root, false);
				tempNode.isLeaf = false;
        	}
    		buildTree();
		}();
		var root = i3GEO.arvoreDeCamadas.ARVORE.getRoot();
		var titulo = "<table><tr><td><b>"+$trad("a7")+"</b></td><td><img id='i3geo_lixeira' title='"+$trad("t2")+"'  src='"+i3GEO.util.$im("branco.gif")+"' /></td></tr></table>";
		var d = {html:titulo};
		var tempNode = new YAHOO.widget.HTMLNode(d, root, true,true);
		var c = temas.length;
		for (var i=0, j=c; i<j; i++){
			var ltema = temas[i];		
			var d = {html:i3GEO.arvoreDeCamadas.montaTextoTema(ltema),id:temas[i].name,tipo:"tema"};
			var temaNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
			temaNode.setDynamicLoad(i3GEO.arvoreDeCamadas.montaOpcoes, currentIconMode);
		}
		document.getElementById(i3GEO.arvoreDeCamadas.IDHTML).style.textAlign="left";
   		i3GEO.arvoreDeCamadas.ARVORE.draw();
   		this.ativaDragDrop();
	},
	ativaDragDrop: function(){
		//YAHOO.log("Ativando drag-drop da �rvore de camadas", "i3geo");
		var Dom = YAHOO.util.Dom;
		var Event = YAHOO.util.Event;
		var DDM = YAHOO.util.DragDropMgr;
		YAHOO.example.DDList = "";
		YAHOO.example.DDApp = 
		{
    		init: function() 
    		{
        		if($i("i3geo_lixeira"))
        		{new YAHOO.util.DDTarget("i3geo_lixeira");}
        		var lista = i3GEO.arvoreDeCamadas.CAMADAS;
        		var i = lista.length-1;
        		if (i >= 0){
	       	 		do{
               			var ltema = lista[i];
               			if($i("arrastar_"+ltema.name))
               			{new YAHOO.example.DDList("arrastar_"+ltema.name);}
        			}
        			while(i--)
        		}
    		}
		};
		YAHOO.example.DDList = function(id, sGroup, config) {
		    YAHOO.example.DDList.superclass.constructor.call(this, id, sGroup, config);
		    this.logger = this.logger || YAHOO;
	    	var el = this.getDragEl();
	    	Dom.setStyle(el, "opacity", 0.67); // The proxy is slightly transparent
		    this.goingUp = false;
	   		this.lastY = 0;
		};
		YAHOO.extend(
			YAHOO.example.DDList, YAHOO.util.DDProxy, {
		    	startDrag: function(x, y){
    	    		this.logger.log(this.id + " startDrag");
		        	// make the proxy look like the source element
    		    	var dragEl = this.getDragEl();
        			var clickEl = this.getEl();
        			Dom.setStyle(clickEl, "visibility", "hidden");
	    	    	dragEl.innerHTML = clickEl.innerHTML;
	    	    	Dom.setStyle(dragEl, "color", Dom.getStyle(clickEl, "color"));
   		 	   		Dom.setStyle(dragEl, "backgroundColor", Dom.getStyle(clickEl, "backgroundColor"));
    	 	   		Dom.setStyle(dragEl, "border", "4px solid gray");
    	 	   		Dom.setStyle(dragEl, "z-index", "5000");
    			},
	    		endDrag: function(e){
	        		var srcEl = this.getEl();
    	    		var proxy = this.getDragEl();
	        		// Show the proxy element and animate it to the src element's location
    	    		Dom.setStyle(proxy, "visibility", "");
        			var a = new YAHOO.util.Motion( 
           				proxy,{ 
                			points:
                			{to: Dom.getXY(srcEl)}
    	        		}, 
        	   	 		0.2, 
            			YAHOO.util.Easing.easeOut
        			);
        			var proxyid = proxy.id;
        			var thisid = this.id;
	        		// Hide the proxy and show the source element when finished with the animation
	        		a.onComplete.subscribe(
	        			function(){
                			Dom.setStyle(proxyid, "visibility", "hidden");
                			Dom.setStyle(thisid, "visibility", "");
            			}
            		);
	        		a.animate();
	        		if ($i("i3geo_lixeira"))
	        		{$i("i3geo_lixeira").style.border = "0px solid blue";} 	
    			},
	    		onDragDrop: function(e, id){
	        		if (DDM.interactionInfo.drop.length === 1){
	            		var pt = DDM.interactionInfo.point; 
		            	var region = DDM.interactionInfo.sourceRegion; 
	            		if (!region.intersect(pt)){
	                		DDM.refreshCache();
	                		//exclui tema
   		             		if(DDM.getDDById(id).id == "i3geo_lixeira"){
                				i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o1"));
                				var tema = (this.getEl()).id.split("arrastar_")[1];
								i3GEO.php.excluitema(i3GEO.atualiza,tema);							
								i3GEO.temaAtivo = "";
							}
							//muda ordem de desenho do tema
							else{
	                			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
	                			var destEl = Dom.get(id);
   		             			var noid = id.split("arrastar_")[1];
   	    	         			destEl.appendChild(this.getEl()); 
 								var els = i3GEO.arvoreDeCamadas.listaLigadosDesligados();
 								var lista = els[2].join(",");
 								i3GEO.php.reordenatemas(i3GEO.atualiza,lista);
							}
        	    		}
	    	    	}
	    		},
	    		onDrag: function(e){
	        		// Keep track of the direction of the drag for use during onDragOver
	        		var y = Event.getPageY(e);
	        		if (y < this.lastY) 
	        		{this.goingUp = true;}
        			else
        			if (y > this.lastY)
        			{this.goingUp = false;}
	        		this.lastY = y;
	    		},
	    		onDragOver: function(e, id) {
	        		var srcEl = this.getEl();
	        		var destEl = Dom.get(id);
	        		// We are only concerned with list items, we ignore the dragover
	        		// notifications for the list.
	        		if ($i("i3geo_lixeira") && id == "i3geo_lixeira")
	        		{$i("i3geo_lixeira").style.border = "1px solid red";}
	        		else{destEl.style.textDecoration="underline";}
	    		},
	    		onDragOut: function(e, id)
	    		{$i(id).style.textDecoration="none";}
			}
		);
		Event.onDOMReady(YAHOO.example.DDApp.init, YAHOO.example.DDApp, true);
	},
	/*
	Function: montaOpcoes
	
	Abre o segundo n�vel da �rvore de temas, mostrando as op��es dispon�veis para cada tema.
	
	Nesse segundo n�vel s�o mostrados alguns �cones como o farol, excluir, etc, al�m do n� de op��es e legenda.
	
	Parameters:
	
	node {YAHOO.widget.HTMLNode} - N� que foi clicado
	*/
	montaOpcoes: function(node){
		//YAHOO.log("Montando as op��es da �rvore de camadas", "i3geo");
		var idtema = node.data.id;
		var ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		var farol = "maisamarelo.png";
		if (ltema.escala*1 < i3GEO.parametros.mapscale*1){
	 		var farol = "maisverde.png";
	 		var mfarol = $trad("t9");
		}
		if (ltema.escala*1 > i3GEO.parametros.mapscale*1){
	 		var farol = "maisvermelho.png";
			var mfarol = $trad("t10");
		}
		if (ltema.escala == 0){
	 		var farol = "maisamarelo.png";
			var mfarol = $trad("t11");
		}
		tnome = "&nbsp;<img id='farol"+ltema.name+"' src='"+i3GEO.util.$im(farol)+"' title='"+mfarol+"' \>";
		tnome += "&nbsp;<img  id='idx"+ltema.name+"' class='x' src='"+i3GEO.util.$im("branco.gif")+"' title='"+$trad("t12")+"' onclick='i3GEO.tema.exclui(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t12a")+"','exclui')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";
		tnome += "&nbsp;<img class='sobe' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("t13")+"' onclick='i3GEO.tema.sobe(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t14")+"','sobe')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";
		tnome += "&nbsp;<img class='desce' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("t15")+"' onclick='i3GEO.tema.desce(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t16")+"','desce')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";
		//a opera��o de zoom para o tema n�o funciona na interface flamingo
		if( (ltema.zoomtema == "sim") && (!$i("flamingo")))
		{tnome += "&nbsp;<img class='extent' src='"+i3GEO.util.$im("branco.gif") +"' title='"+$trad("t17")+"' onclick='i3GEO.tema.zoom(\""+ltema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t18")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";}
		var d = {html:tnome};
		var iconesNode = new YAHOO.widget.HTMLNode(d, node, false,true);
		iconesNode.isLeaf = true;
		if(i3GEO.arvoreDeCamadas.OPCOESTEMAS == true){
			var conteudo = $trad("t18a");
			var d = {html:conteudo,idopcoes:ltema.name};
			var opcoesNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraOpcoes, 1);
		}
		if(i3GEO.arvoreDeCamadas.OPCOESLEGENDA == true){
			var conteudo = $trad("p3");
			var d = {html:conteudo,idlegenda:ltema.name};
			var opcoesNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			opcoesNode.setDynamicLoad(i3GEO.arvoreDeCamadas.mostraLegenda, 1);
		}	
		node.loadComplete();
		//YAHOO.log("Op��es OK", "i3geo");	
	},
	/*
	Function: mostraOpcoes
	
	Monta os n�s filhos do n� "op��es"
	
	Parameter:
	
	node {YAHOO.widget.HTMLNode}
	*/
	mostraOpcoes: function(node){
		//YAHOO.log("Mostrando as op��es da �rvore de camadas", "i3geo");
		var idtema = node.data.idopcoes;
		var ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		var tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t19")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" >"+$trad("t20")+"</span> "+$inputText("","","tr"+ltema.name,"","3",ltema.transparency)+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudatransp(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";
		var d = {html:tnome};
		var n = new YAHOO.widget.HTMLNode(d, node, false,true);
		n.isLeaf = true;
		var tnome = "<span onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t21a")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" />"+$trad("t21")+" </span>"+$inputText("","","nn"+ltema.name,"","10","")+"<img  class='tic' style='position:relative;top:3px;' onclick='i3GEO.tema.mudanome(\""+ltema.name+"\")' src='"+i3GEO.util.$im("branco.gif")+"' />";
		var d = {html:tnome};
		var n = new YAHOO.widget.HTMLNode(d, node, false,true);
		n.isLeaf = true;
		if ((ltema.type < 3) && (ltema.connectiontype != 7)){
			var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t22")+"','');\" onclick='i3GEO.tema.dialogo.procuraratrib(\""+ltema.name+"\")'>"+$trad("t23")+" </a>";
			var d = {html:tnome};
			var n = new YAHOO.widget.HTMLNode(d, node, false,true);
			n.isLeaf = true;
			var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t24")+"','');\" onclick='i3GEO.tema.dialogo.toponimia(\""+ltema.name+"\")'>"+$trad("t25")+" </a>";
			var d = {html:tnome};
			var n = new YAHOO.widget.HTMLNode(d, node, false,true);
			n.isLeaf = true;
			var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t26")+"','');\" onclick='i3GEO.tema.dialogo.etiquetas(\""+ltema.name+"\")'>"+$trad("t27")+" </a>";
			var d = {html:tnome};
			var n = new YAHOO.widget.HTMLNode(d, node, false,true);
			n.isLeaf = true;
			var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t28")+"','');\" onclick='i3GEO.tema.dialogo.filtro(\""+ltema.name+"\")'>"+$trad("t29")+" </a>";
			var d = {html:tnome};
			var n = new YAHOO.widget.HTMLNode(d, node, false,true);
			n.isLeaf = true;
			var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t30")+"','');\" onclick='i3GEO.tema.dialogo.tabela(\""+ltema.name+"\")'>"+$trad("t31")+" </a>";
			var d = {html:tnome};
			var n = new YAHOO.widget.HTMLNode(d, node, false,true);
			n.isLeaf = true;
			if(i3GEO.parametros.versaoms > 4){
				var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t37")+"','');\" onclick='i3GEO.tema.dialogo.graficotema(\""+ltema.name+"\")'>"+$trad("t37")+" </a>";
				var d = {html:tnome};
				var n = new YAHOO.widget.HTMLNode(d, node, false,true);
				n.isLeaf = true;
			}
		}
		if (ltema.type < 4){
			var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t32")+"','');\" onclick='i3GEO.tema.dialogo.editaLegenda(\""+ltema.name+"\")'>"+$trad("t33")+" </a>";
			var d = {html:tnome};
			var n = new YAHOO.widget.HTMLNode(d, node, false,true);
			n.isLeaf = true;
		}
		var tnome = "<a href='#' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t34")+"','');\" onclick='i3GEO.navega.destacaTema.inicia(\""+ltema.name+"\")'>"+$trad("t35")+" </a>";
		var d = {html:tnome};
		var n = new YAHOO.widget.HTMLNode(d, node, false,true);
		n.isLeaf = true;
		node.loadComplete();
		//YAHOO.log("Op��es OK", "i3geo");
	},
	/*
	Function: mostraLegenda
	
	Monta os n�s filhos do n� "legenda"
	
	Parameter:
	
	node - {YAHOO.widget.HTMLNode}
	*/
	mostraLegenda: function(node){
		//YAHOO.log("Mostrando a legenda da �rvore de camadas", "i3geo");
		var idtema = node.data.idlegenda;
		var ltema = i3GEO.arvoreDeCamadas.pegaTema(idtema);
		var retorna = function(retorno){
			if (retorno.data.legenda){
				var original = retorno;
				var retorno = retorno.data.legenda;
				if (retorno[0]){
					if ((navn) && (!retorno[0].imagem)){var tabela = retorno;}
					else{
						var i = retorno[0].imagem;
						var re = new RegExp("tiff", "g");
						var i = i.replace(re,'png');
						var tabela = "<img src='"+i+"' />";
					}					
					retorno = "";
				}
				else{
					var linhas = retorno.split("#");
					if (linhas.length > 1){
						var linhas = retorno.split("|");
						var tabela = "<table >";
						var linha = linhas.length-1;
						if(linha >= 0){
							do{
								var colunas = linhas[linha].split("#");
								var id = colunas[0]+"-"+colunas[1];
								var re = new RegExp("'", "g");
								var exp = colunas[3].replace(re,'"');
								tabela += "<tr style='border-top:1px solid rgb(240,240,240);'><td><img src='"+colunas[4]+"' </td><td style='text-align:left'>"+colunas[2]+"</td></tr>";
							}
							while(linha--)
						}
						tabela += "</table><br>";
					}
					else{tabela = retorno;}
				}
			}
			else {var tabela = "<img src='"+retorno.data[0].imagem+"' />";} //o tema � um wms
			var incluir = "<div style='text-align:left' id='"+idtema+"verdiv"+"'>"+tabela+"</div>";
			var d = {html:incluir};
			var nodeLeg = new YAHOO.widget.HTMLNode(d, node, false,false);
			node.loadComplete();
			//
			//desliga os checkbox que foram desativados
			//pega os objetos input
			//
			var elementos = document.getElementById(idtema+"verdiv").getElementsByTagName("input");
			var nelementos = elementos.length;
			var inputs = new Array();
			var i = 0;
			if (nelementos > 0){
				do{
					if (elementos[i].type == "checkbox"){inputs.push(elementos[i]);}
					i++;
				}
				while(i < nelementos)
			}
			if(original.data.desativar){
				var desativar = original.data.desativar;
				var nindices = desativar.length;
				var i = 0;
				if (nindices > 0){
					do{
						inputs[desativar[i]].checked = false;
						i++;
					}
					while(i < nindices)
				}
			}
		};
		i3GEO.php.criaLegendaHTML(retorna,idtema);
	},
	/*
	Function: atualizaLegenda
	
	Atualiza a legenda de um tema.
	
	A legenda precisa ser atualizada emalgumas circunst�ncias, como quando � feitoumzoom no mapa.
	
	Parameter:
	
	id {String} - ID (name) do tema
	*/
	atualizaLegenda: function(idtema){
		//YAHOO.log("Atualizando a legenda da �rvore de camadas", "i3geo");
		if(document.getElementById(idtema+"verdiv"))
		{
			var node = i3GEO.arvoreDeCamadas.ARVORE.getNodeByProperty("idlegenda",idtema);
			if(node)
			{
				i3GEO.arvoreDeCamadas.ARVORE.removeChildren(node);
				this.mostraLegenda(node);
			}
		}
		//YAHOO.log("Legenda OK", "i3geo");
	},
	/*
	Function: inverteStatusClasse
	
	Liga ou desliga uma classe da legenda.
	
	A chamada dessa fun��o � definida em aplicmap/legenda2.htm
	
	Parameters:
	
	leg {Object input} - objeto do tipo INPUT com o id da classe e o id do tema
	
	*/
	inverteStatusClasse: function (leg){
		//YAHOO.log("Invertendo o status da �rvore de camadas", "i3geo");
		var temp = function()
		{i3GEO.atualiza("");};
		i3GEO.php.inverteStatusClasse(temp,leg.name,leg.value);
	},	
	/*
	Function: montaTextoTema
	
	Monta o texto com o t�tulo do tema. Esse texto � o que ser� mostrado nos n�s principais da �rvore e
	cont�m o checkbox para ligar e desligar o tema.
	
	Parameters:
	
	tema - {Object} - objeto JSON com as propriedades do tema
	
	Return:
	
	{String} - texto formatado
	*/
	montaTextoTema: function(tema){
		var ck = "";
		if(tema.status == 2){var ck = ' CHECKED ';}
		var html = "";
		html += "<p id='arrastar_"+tema.name+"' style='text-align:left;font-size:11px;' ><input class=inputsb style='cursor:pointer;' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t3")+"','ligadesliga')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" type='checkbox' name=\"layer\" value='"+tema.name+"' "+ ck ;

		if(i3GEO.arvoreDeCamadas.ATIVATEMA != "")
		html += "onclick=\""+i3GEO.arvoreDeCamadas.ATIVATEMA+"\"";
		else
		html += "onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeCamadas.aplicaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicarCamadas\",this)'";
		html += " />";
		if (tema.contextoescala == "sim")
		{html += "&nbsp;<img src="+i3GEO.util.$im("contextoescala.png")+" title='"+$trad("t36")+"' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t36")+"','')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";}				
		if (tema.sel == "sim") //o tema tem selecao
		{html += "&nbsp;<img src="+i3GEO.util.$im("estasel.png")+" title='"+$trad("t4")+"' onclick='i3GEO.tema.limpasel(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t5")+"','limpasel')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";}
		if ((tema.download == "sim") || (tema.download == "SIM"))
		{html += "&nbsp;<img src="+i3GEO.util.$im("down1.gif") +" title='download' onclick='download(\""+tema.name+"\")' onmouseover=\"javascript:i3GEO.ajuda.mostraJanela('"+$trad("t7")+"','download')\" onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" \>";}
		html += "&nbsp;<span style='cursor:move'>"+tema.tema+"</span>";
		html += "</p>";
		return(html);
	},
	/*
	Function: atualizaFarol
	
	Atualiza o farol de cada tema.
	
	O farol identifica a compatibilidade da escala do mapa com a escala de cada tema
	
	Parameters:
	
	mapscale {Numeric} - escala de compara��o com a escala de cada tema
	*/
	atualizaFarol: function(mapscale)
	{
		//YAHOO.log("Atualizando o farol da �rvore de camadas", "i3geo");
		var farol = "maisamarelo.png";
		var l = i3GEO.arvoreDeCamadas.CAMADAS.length-1;
		if (l >= 0){
			do{
				var ltema = i3GEO.arvoreDeCamadas.CAMADAS[l];
				var escala = ltema.escala;
				if (escala*1 < mapscale*1)
				{var farol = "maisverde.png";}
				if (escala*1 > mapscale*1)
				{var farol = "maisvermelho.png";}
				if (escala*1 == 0)
				{var farol = "maisamarelo.png";}
				if ($i("farol"+ltema.name)){
					$i("farol"+ltema.name).src = g_locaplic+"/imagens/"+farol;
				}
			}
			while(l--)
		}
		//YAHOO.log("Farol OK", "i3geo");
	},
	/*
	Function: aplicaTemas
	
	Refaz o mapa ligando e desligando os temas conforme consta na �rvore de camadas
	*/
	aplicaTemas: function(){
		//YAHOO.log("Mudando status ligado/desligado de um tema", "i3geo");
		var t = i3GEO.arvoreDeCamadas.listaLigadosDesligados();
		//
		//zera o contador de tempo
		//
		var temp = function(){
			i3GEO.atualiza();
			i3GEO.janela.fechaAguarde("redesenha");
		};
		clearTimeout(tempoBotaoAplicar);
		tempoBotaoAplicar = "";
		i3GEO.janela.abreAguarde("redesenha",$trad("o1"));
		i3GEO.php.ligatemas(temp,t[1].toString(),t[0].toString());
	},
	/*
	Function: listaLigadosDesligados
	
	Lista os temas que est�o ligados e os que est�o desligados.
	
	Return:
	{Array} - array com os c�digos dos temas [0]=ligados [1]=desligados [2]=todos na ordem encontrada
	*/
	listaLigadosDesligados: function(){
		var nos = i3GEO.arvoreDeCamadas.ARVORE.getNodesByProperty("tipo","tema");
		var ligados = new Array();
		var desligados = new Array();
		var todos = new Array();
		var n = nos.length;
		var i=0;
		do{
			try{
				var no = nos[i].getEl();
				var cs = no.getElementsByTagName("input");
				var csn = cs.length;
				for(j=0;j<csn;j++){
					var c = cs[j];
					if(c.name=="layer"){
						if(c.checked == true)
						{ligados.push(c.value);}
						else
						{desligados.push(c.value);}
						todos.push(c.value);
					}
				}
				i++;
			} catch(e){i++;}
		}
		while(i<n)
		var lista = new Array(ligados,desligados,todos);
		return (lista);
	},
	/*
	Function: comparaTemas
	
	Compara se dois objetos com as camadas s�o iguais
	
	Parameters:
	
	novo {JSON} - objeto novo
	
	atual {JSON} - objeto atual
	
	Return:
	
	{Boolean}
	*/
	comparaTemas: function(novo,atual){
		try{
			var novon = novo.length;
			if(novon != atual.length){return (false);}
			for (i=0;i<novon;i++){
				if(novo[i].name != atual[i].name){return (false);}
				if(novo[i].tema != atual[i].tema){return (false);}
				if(novo[i].sel != atual[i].sel){return (false);}
			}
			return(true);
		}
		catch(e){return true;}
	},
	/*
	Function: pegaTema
	
	Procura um tema no objeto CAMADAS.
	
	Parameters:
	
	idtema - {String} ID do tema que ser� procurado
	
	Return:
	
	{JSON}
	*/
	pegaTema: function pegatema(idtema){
		var c = i3GEO.arvoreDeCamadas.CAMADAS.length;
		for (i=0; i<c; i++){
			if(i3GEO.arvoreDeCamadas.CAMADAS[i].name == idtema)
			{var ltema = i3GEO.arvoreDeCamadas.CAMADAS[i];return (ltema);}
		}	
	}
};
//
//para efeitos de compatibilidade
i3GEO.arvoreDeCamadas.IDHTML = "listaTemas";
//YAHOO.log("carregou classe arvoredecamadas", "Classes i3geo");
/*
Title: Navega��o sobre o mapa

File: i3geo/classesjs/classe_navega.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.navega

Realiza opera��es de navega��o do mapa, como zoom, pan, etc..

Quando todos os argumentos da fun��o forem opcionais, basta usar nomeFuncao(),
nos casos em que os primeiros argumentos forem opcionais e os demais obrigat�rios,
utilize "" no lugar do argumento que se quer usar o default, exemplo,
nomeFuncao("","",10)
*/
i3GEO.navega = {
	/*
	Property: FATORZOOM
	
	Valor utilizado nas opera��es de zoom in e out. Fator de zoom.
	
	Default:
	2
	
	Type:
	{Integer}
	*/
	FATORZOOM: 2,
	/*
	Function: zoomin
	
	Aproxima o mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomin: function(locaplic,sid){
		//YAHOO.log("zoomin", "i3geo");
		if(arguments.length > 0){
			i3GEO.configura.locaplic = locaplic;
			i3GEO.configura.sid = sid;
		}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.aproxima(i3GEO.atualiza,i3GEO.navega.FATORZOOM);
	},
	/*
	Function: zoomout
	
	Afasta o mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomout: function(locaplic,sid){
		//YAHOO.log("zoomout", "i3geo");
		if(arguments.length > 0){
			i3GEO.configura.locaplic = locaplic;
			i3GEO.configura.sid = sid;
		}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.afasta(i3GEO.atualiza,i3GEO.navega.FATORZOOM);
	},
	/*
	Function: zoomponto
	
	Centraliza o mapa em um ponto e acrescenta o ponto como uma nova camada no mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	x {Numeric} - coordenada em d�cimos de grau da longitude
	
	y {Numeric} - coordenada em d�cimos de grau da latitude
	*/
	zoomponto: function(locaplic,sid,x,y){
		//YAHOO.log("zoomponto", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.zoomponto(i3GEO.atualiza,x,y);
	},
	/*
	Function: zoompontoIMG
	
	Centraliza o mapa em um ponto de coordenadas medidas na imagem do mapa
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	x {Numeric} - coordenada x da imagem
	
	y {Numeric} - coordenada y da imagem
	*/
	zoompontoIMG: function(locaplic,sid,x,y){
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.pan(i3GEO.atualiza,"","",x,y);
	},
	/*
	Function: xy2xy
	
	Desloca o mapa de um ponto de coordenadas xy para um segundo ponto
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	xi {Numeric} - coordenada x inicial
	
	yi {Numeric} - coordenada y inicial
	
	xf {Numeric} - coordenada x final
	
	yf {Numeric} - coordenada y final
	
	ext {String} - extens�o geogr�fica do mapa
	
	tipoimagem {String} - tipo de imagem atual do mapa (sepia,nenhum,cinza)
	*/
	xy2xy: function(locaplic,sid,xi,yi,xf,yf,ext,tipoimagem){
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		var disty = (yi * -1) + yf;
		var distx = (xi * -1) + xf;
		var ex = ext.split(" ");
		var novoxi = (ex[0] * 1) - distx;
		var novoxf = (ex[2] * 1) - distx;
		var novoyi = (ex[1] * 1) - disty;
		var novoyf = (ex[3] * 1) - disty;
		if ((distx == 0)||(disty == 0))
		{return false;}
		else{
			var nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
			i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,tipoimagem,nex);
			return true;
		}
	},	
	/*
	Function: localizaIP
	
	Localiza as coordenadas baseadas no n�mero IP do usu�rio.
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	funcao {Function} - fun��o que ser� executada ao concluir a chamada AJAX. Essa fun��o receber� o objeto JSON obtido.
	*/	
	localizaIP: function(locaplic,sid,funcao){
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		//YAHOO.log("localizaIP", "i3geo");
		i3GEO.php.localizaIP(funcao);
	},
	/*
	Function: zoomIP
	
	Mostra no mapa um ponto baseado na localiza��o do usu�rio.

	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	*/
	zoomIP: function(locaplic,sid){
		try
		{
			if(arguments.length > 0){
				i3GEO.configura.locaplic = locaplic;
				i3GEO.configura.sid = sid;
			}
			var mostraIP = function(retorno)
			{
				if (retorno.data.latitude != null)
				{
					i3GEO.navega.zoomponto(locaplic,sid,retorno.data.longitude,retorno.data.latitude);
				}
				else
				{alert("Nao foi possivel identificar a localizacao.");}
			};
			i3GEO.navega.localizaIP(locaplic,sid,mostraIP);
		}
		catch(e){var e = "";}
	},
	/*
	Function: zoomExt
	
	Aplica uma nova extens�o geogr�fica ao mapa.

	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	tipoimagem {String} - Utlize "" para aplicar o default. Tipo de imagem que ser� retornada na imagem do mapa que ser� criada

	ext {String} - Extens�o geogr�fica no formato xmin ymin xmax ymax
	*/
	zoomExt: function(locaplic,sid,tipoimagem,ext){
		//YAHOO.log("zoomExt", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		if(tipoimagem == "")
		{var tipoimagem = "nenhum";}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.mudaext(i3GEO.atualiza,tipoimagem,ext);
	},
	/*
	Function: aplicaEscala
	
	Aplica ao mapa um novo valor de escala tendo como base o valor do denminador

	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo
	
	escala {Numeric} - denominador da escala
	*/	
	aplicaEscala: function(locaplic,sid,escala){
		//YAHOO.log("aplicaescala", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.mudaescala(i3GEO.atualiza,escala);
	},
	/*
	Function: panFixo
	
	Desloca o mapa para uma determinada dire��o com uma dist�ncia fixa.
	
	Parameters:
	
	locaplic {String} - (opcional) endere�o do i3geo utilizado na gera��o da URL para fazer a chamada AJAX
	
	sid {String} - (opcional) c�digo da se��o aberta no servidor pelo i3geo

	direcao {String} - norte,sul,leste,oeste,sudeste,sudoeste,nordeste,noroeste
	
	w {Numeric} - largura da imagem do mapa em pixels
	
	h {Numeric} - altura da imagem do mapa em pixels
	
	escala {Numeric} - escala do mapa
	*/
	panFixo: function(locaplic,sid,direcao,w,h,escala){
		//YAHOO.log("panfixo", "i3geo");
		if(locaplic != ""){i3GEO.configura.locaplic = locaplic;}
		if(sid != ""){i3GEO.configura.sid = sid;}
		if (direcao == "norte"){
			var y = h / 6;
			var x = w / 2;
		}
		if (direcao == "sul"){
			var y = h - (h / 6);
			var x = w / 2;
		}
		if (direcao == "leste"){
			var x = w - (w / 6);
			var y = h / 2;
		}
		if (direcao == "oeste"){
			var x = w / 6;
			var y = h / 2;
		}
		if (direcao == "nordeste"){
			var y = h / 6;
			var x = w - (w / 6);
		}
		if (direcao == "sudeste"){
			var y = h - (h / 6);
			var x = w - (w / 6);
		}
		if (direcao == "noroeste"){
			var y = h / 6;
			var x = w / 6;
		}
		if (direcao == "sudoeste"){
			var y = h - (h / 6);
			var x = w / 6;
		}
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.pan(i3GEO.atualiza,escala,tipo,x,y);
	},
	/*
	Function: mostraRosaDosVentos
	
	Mostra sobre o mapa a rosa dos ventos.
	
	A rosa permite que o usu�rio navegue no mapa sem ter de alterar a op��o atual de navega��o.
	
	A rosa � mostrada apenas se a vari�vel i3GEO.configura.mostraRosaDosVentos for = a "sim".<b> 

	Para que a rosa seja mostrada, � necess�rio que esta fun��o esteja registrada em
	
	i3GEO.eventos.MOUSEPARADO
	*/
	mostraRosaDosVentos: function(){
		try{
			if(i3GEO.configura.mostraRosaDosVentos == "nao"){return;}
			if(g_tipoacao == "area"){return;}
		}
		catch(e){};
		if(objposicaocursor.imgx < 10 || objposicaocursor.imgy < 10 || objposicaocursor.imgy > (i3GEO.parametros.h - 10))
		{return;}
		if (!$i("i3geo_rosa")){
			var novoel = document.createElement("div");
			novoel.id = "i3geo_rosa";
			novoel.style.position="absolute";
			novoel.style.zIndex=5000;
			if(navn)
			{novoel.style.opacity=".7";}
			else
			{novoel.style.filter = "alpha(opacity=70)";}
			document.body.appendChild(novoel);
		}
		var setas = "<table id='rosaV' >";
		setas += "<tr onclick=\"javascript:i3GEO.configura.mostraRosaDosVentos='nao'\"><td></td><td></td><td style=cursor:pointer >x</td></tr><tr>";
		setas += "<td><img class='rosanoroeste' title='noroeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','noroeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosanorte' title='norte' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','norte','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosanordeste' title='nordeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','nordeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr>";
		setas += "<tr><td><img class='rosaoeste' title='oeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','oeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><table><tr>";
		setas += "<td><img class='rosamais' title='aproxima' onclick=\"i3GEO.navega.zoomin('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"')\" src='"+$im("branco.gif")+"' </td>";
		setas += "<td><img class='rosamenos' title='afasta' onclick=\"i3GEO.navega.zoomout('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"')\" src='"+$im("branco.gif")+"' </td>";
		setas += "</tr></table></td>";
		setas += "<td><img class='rosaleste' title='leste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','leste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr>";
		setas += "<tr><td><img class='rosasudoeste' title='sudoeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sudoeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosasul' title='sul' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sul','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td>";
		setas += "<td><img class='rosasudeste' title='sudeste' src='"+$im("branco.gif")+"' onclick=\"i3GEO.navega.panFixo('"+i3GEO.configura.locaplic+"','"+i3GEO.configura.sid+"','sudeste','"+i3GEO.parametros.w+"','"+i3GEO.parametros.h+"','"+i3GEO.parametros.mapscale+"')\" /></td></tr></table>";
		var i = $i("i3geo_rosa");
		i.innerHTML = setas;	
		i.style.top = objposicaocursor.telay - 27;
		i.style.left = objposicaocursor.telax - 27;
		i.style.display="block";
		var escondeRosa = function(){
			var i = $i("i3geo_rosa");
			i.style.display="none";
			YAHOO.util.Event.removeListener(escondeRosa);
		}
		if($i("img"))
		YAHOO.util.Event.addListener($i("img"),"mousemove", escondeRosa);
		i3GEO.ajuda.mostraJanela('Clique nas pontas da rosa para navegar no mapa. Clique em x para parar de mostrar essa op��o.');
	},
	/*
	Class: i3GEO.navega.autoRedesenho
	
	Controla o redesenho autom�tico do mapa por meio de um temporizador
	*/
	autoRedesenho: {
		/*
		Variable: INTERVALO
		
		Intervalo de tempo, em milisegundos, que ser� utilizado para disparar o desenho do mapa
		
		Type:
		{Integer}
		*/
		INTERVALO: 0,
		/*
		Variable: ID
		
		Guarda o valor do ID do elemento HTML que receber� o contador de tempo
		
		Type:
		{String}
		*/
		ID: "tempoRedesenho",
		/*
		Function: ativa
		
		Ativa o auto-redesenho do mapa
		
		Parameters:
		
		id {String} - id do elemento onde o contador de tempo ser� mostrado no mapa. Por default, utiliza "tempoRedesenho".
		*/
		ativa: function(id){
			if(arguments.length == 0){var id = "tempoRedesenho";}
			i3GEO.navega.autoRedesenho.ID = id;
			if (($i(id)) && i3GEO.navega.autoRedesenho.INTERVALO > 0)
			{$i(id).style.display = "block";}
			if (i3GEO.navega.autoRedesenho.INTERVALO > 0)
			{i3GEO.navega.tempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.redesenha()',i3GEO.navega.autoRedesenho.INTERVALO);}
			if (($i(id)) && (i3GEO.navega.autoRedesenho.INTERVALO > 0)){
				$i(id).innerHTML = i3GEO.navega.autoRedesenho.INTERVALO/1000;
				i3GEO.navega.contaTempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.contagem()',1000);
			}
		},
		/*
		Function: desativa
		
		Desativa o auto-redesenho do mapa
		*/
		desativa:function(){
			i3GEO.navega.autoRedesenho.INTERVALO = 0;
			clearTimeout(i3GEO.navega.tempoRedesenho);
			clearTimeout(i3GEO.navega.contaTempoRedesenho);
			i3GEO.navega.tempoRedesenho = "";
			i3GEO.navega.contaTempoRedesenho = "";
			if ($i(i3GEO.navega.autoRedesenho.ID))
			{$i(i3GEO.navega.autoRedesenho.ID).style.display = "none";}
		},
		/*
		Function: redesenha
		
		Redesenha o mapa quando o contador de tempo chegar a zero
		*/
		redesenha: function(){
			clearTimeout(i3GEO.navega.tempoRedesenho);
			clearTimeout(i3GEO.navega.contaTempoRedesenho);
			i3GEO.atualiza("");
			i3GEO.navega.autoRedesenho.ativa(i3GEO.navega.autoRedesenho.ID);
		},
		/*
		Function: contagem
		
		Faz a contagem do tempo
		*/
		contagem: function(){
			if ($i(i3GEO.navega.autoRedesenho.ID)){$i(i3GEO.navega.autoRedesenho.ID).innerHTML = parseInt($i(i3GEO.navega.autoRedesenho.ID).innerHTML) - 1;}
			i3GEO.navega.contaTempoRedesenho = setTimeout('i3GEO.navega.autoRedesenho.contagem()',1000);
		}
	},
	/*
	Class: i3GEO.navega.zoomBox
	
	Controla o desenho de um box na tela para executar o zoom por box
	*/
	zoomBox: {
		/*
		Function: inicia
		
		Marca o in�cio do desenho do box, capturando a posi��o do mouse
		*/
		inicia: function(){
			if(g_tipoacao!='zoomli'){return;}
			if(!$i("i3geoboxZoom"))
			i3GEO.navega.zoomBox.criaBox();
			var i = $i("i3geoboxZoom").style;
			i.width=0;
			i.height=0;
			i.visibility="visible";
			i.display="block";
			i.left = objposicaocursor.telax + g_postpx;
			i.top = objposicaocursor.telay + g_postpx;
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.zoomBox.desloca()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.zoomBox.desloca()");}
			if(i3GEO.eventos.MOUSEUP.toString().search("i3GEO.navega.zoomBox.termina()") < 0)
			{i3GEO.eventos.MOUSEUP.push("i3GEO.navega.zoomBox.termina()");}
		},
		/*
		Function: criaBox
		
		Cria o DIV que ser� utilizado para desenhar o box no mapa
		*/
		criaBox: function(){
			if(!$i("i3geoboxZoom")){
				var novoel = document.createElement("div");
				novoel.style.width = "0px";
				novoel.style.height = "0px";
				novoel.id = "i3geoboxZoom";
				novoel.style.display = "none";
				novoel.style.fontSize = "0px";
				if(navn)
				{novoel.style.opacity = .25;}
				novoel.style.backgroundColor = "gray";
				novoel.style.position="absolute";
				novoel.style.border = "2px solid #ff0000";		
				if (navm)
				{novoel.style.filter = "alpha(opacity=25)";}
				novoel.onmousemove = function(){
					var b = $i("i3geoboxZoom").style;
					var wb = parseInt(b.width);
					var hb = parseInt(b.height);
					if (navm){
						if(wb > 2)
						{b.width = wb - 2;}
						if(hb > 2)
						{b.height = hb - 2;}
					}
					else{
						b.width = wb - 2 + "px";
						b.height = hb - 2 + "px";
					}
				};
				novoel.onmouseup = function(){i3GEO.navega.zoomBox.termina()};
				document.body.appendChild(novoel);
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","i3geoboxZoom",i3GEO.configura.locaplic);
				if($i("img")){
					$i("img").title = "";
					i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","img",i3GEO.configura.locaplic);
				}
			}
		},
		/*
		Function: desloca
		
		Desloca o box conforme o mouse � movimentado
		*/
		desloca: function(){
			if(g_tipoacao!='zoomli'){return;}
			var bxs = $i("i3geoboxZoom").style;
			if(bxs.display != "block"){return;}
			ppx = objposicaocursor.telax;
			py = objposicaocursor.telay;
			if (navm){
				if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
				{bxs.width = ppx - boxxini - 2;}
				if ((py > boxyini) && ((py - boxyini - 2) > 0))
				{bxs.height = py - boxyini - 2;}
				if (ppx < boxxini)
				{bxs.left = ppx;bxs.width = boxxini - ppx + 2;}
				if (py < boxyini)
				{bxs.top = py;bxs.height = boxyini - py + 2;}
			}
			else{
				if (ppx > boxxini)
				{bxs.width = ppx - boxxini + "px";}
				if (py > boxyini)
				{bxs.height = py - boxyini + "px";}
				if (ppx < boxxini)
				{bxs.left = ppx + "px";bxs.width = boxxini - ppx + "px";}
				if (py < boxyini)
				{bxs.top = py + "px";bxs.height = boxyini - py + "px";}
			}
		},
		/*
		Function: termina
		
		Para o desenho do box, captura seu tamanho e faz o zoom no mapa
		*/
		termina: function(){
			if(g_tipoacao!='zoomli'){
				i3GEO.eventos.MOUSEDOWN.remove("i3GEO.navega.zoomBox.inicia()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.navega.zoomBox.termina()");
				return;
			}
			try{
				var valor = i3GEO.calculo.rect2ext("i3geoboxZoom",i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
				var v = valor[0];
				var x1 = valor[1];
				var y1 = valor[2];
				var x2 = valor[3];
				var y2 = valor[4];
				var limpa = function(){
					var bxs = $i("i3geoboxZoom").style;
					bxs.display="none";
					bxs.visibility="hidden";
					bxs.width = 0;
					bxs.height = 0;
				};
				if((x1 == x2) || (y1 == y2))
				{limpa.call();return;}
				// se o retangulo for negativo pula essa parte para n� gerar erro
				i3GEO.parametros.mapexten=v;
				limpa.call();
				i3GEO.eventos.MOUSEMOVE.remove("i3GEO.navega.zoomBox.desloca()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.navega.zoomBox.termina()");
				i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,i3GEO.configura.tipoimagem,v);
			}
			catch(e){limpa.call();return;}
		}
	},
	/*
	Class: i3GEO.navega.entorno
	
	Controla o desenho do entorno do mapa (modo tile)
	*/
	entorno:{
		/*
		Function: ativaDesativa
		
		Ajusta o mapa para ativar ou desativar o desenho do entorno
		
		Ao ser chamada, essa fun��o muda o modo atual, ativando ou desativando o entorno
		*/
		ativaDesativa: function(){
			if(i3GEO.parametros.mapfile == "")
			{alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return;}
			if (i3GEO.configura.entorno == "sim"){
				var letras=["L","O","N","S"];
				for (var l=0;l<4; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.display = "none";
						$i("img"+letras[l]).src = "";
					}
				}
				$left("img",0);
				$top("img",0);
				i3GEO.configura.entorno = "nao";
				alert("Entorno desativado");
				$i("img").style.visibility = "visible";
				$i("img").style.display = "block";
			}
			else{
				i3GEO.navega.entorno.geraURL();
				var letras=["L","O","N","S"];
				for (var l=0;l<4; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.width = i3GEO.parametros.w;
						$i("img"+letras[l]).style.height = i3GEO.parametros.h;
						$i("img"+letras[l]).style.display = "block";
					}
				}
				i3GEO.configura.entorno = "sim";
				i3GEO.navega.entorno.ajustaPosicao();
				alert("Entorno ativado. o desenho do mapa pode demorar mais.");
			}
		},
		/*
		Function: geraURL
		
		Gera as URLs que ser�o utilizadas na tag IMG dos elementos do entorno do mapa
		*/
		geraURL: function(){
			var nny = (i3GEO.parametros.h / 2) * -1;
			var nnx = i3GEO.parametros.w / 2;
			var sy = i3GEO.parametros.h + (i3GEO.parametros.h / 2);
			var sx = i3GEO.parametros.w / 2;
			var lx = i3GEO.parametros.w + (i3GEO.parametros.w / 2);
			var ly = i3GEO.parametros.h / 2;
			var ox = (parseInt(i3GEO.parametros.w/2)) * -1;
			var oy = i3GEO.parametros.h / 2;
			var u = window.location.protocol+"\/\/"+window.location.host+i3GEO.parametros.cgi+"?map="+i3GEO.parametros.mapfile;
			u += "&mode=map&imgext="+i3GEO.parametros.mapexten+"&mapsize="+nnx+" "+oy;
			var sul = u+"&imgxy="+sx/2+" "+sy/2;
			var norte = u+"&imgxy="+nnx/2+" "+nny/2;
			var leste = u+"&imgxy="+lx/2+" "+ly/2;
			var oeste = u+"&imgxy="+ox/2+" "+oy/2;
			$i("imgS").src=sul;
			$i("imgN").src=norte;
			$i("imgL").src=leste;
			$i("imgO").src=oeste;	
		},
		/*
		Function: ajustaPosicao
		
		Ajusta a posi��o das imagens do entorno do mapa
		*/
		ajustaPosicao: function(){
			$left("img",i3GEO.parametros.w*-1);
			$left("imgS",i3GEO.parametros.w*-1);
			$left("imgL",i3GEO.parametros.w);
			$left("imgO",i3GEO.parametros.w*-3);
			$left("imgN",i3GEO.parametros.w*-1);
			$top("img",i3GEO.parametros.h*-1);
			$top("imgS",i3GEO.parametros.h*-1);
			$top("imgL",i3GEO.parametros.h*-1);
			$top("imgN",i3GEO.parametros.h*-1);
			$top("imgO",i3GEO.parametros.h*-1);		
		}
	},
	/*
	Class: i3GEO.navega.lente
	
	Ativa e controla a lente de aumento.
	
	A lente de aumento � um box que pode ser ativado sobre o mapa
	mostrando uma imagem ampliada da regi�o onde est� o mouse
	*/
	lente:{
		/*
		Variable: ESTAATIVA
		
		Indica se a lente foi ou n�o aberta
		*/
		ESTAATIVA: "nao",
		/*
		Property: POSICAOX
		
		Define a posi��o em x da lente em rela��o ao corpo do mapa
		*/
		POSICAOX: 0,
		/*
		Property: POSICAOY
		
		Define a posi��o em y da lente em rela��o ao corpo do mapa
		*/
		POSICAOY:0,
		/*
		Function: inicia
		
		Ativa a lente de aumento criando os elementos gr�ficos
		necess�rios e ativando os eventos que controlam a apresenta��o
		da lente
		*/
		inicia: function(){
			//insere lente de aumento
			if (!$i("lente")){
				var novoel = document.createElement("div");
				novoel.id = 'lente';
				novoel.style.clip='rect(0px,0px,0px,0px)';
				var novoimg = document.createElement("img");
				novoimg.src="";
				novoimg.id='lenteimg';
				novoel.appendChild(novoimg);
				document.body.appendChild(novoel);
				var novoel = document.createElement("div");
				novoel.id = 'boxlente';
				document.body.appendChild(novoel);
			}
			with($i('boxlente').style){borderWidth='1' + g_postpx;borderColor="red";display = "block"}
			$i("lente").style.display = "block";
			i3GEO.navega.lente.ESTAATIVA = "sim";
			i3GEO.navega.lente.atualiza();
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.navega.lente.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.navega.lente.atualiza()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.lente.movimenta()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.lente.movimenta()");}
		},
		/*
		Function: atualiza
		
		Atualiza a imagem da lente aberta
		*/
		atualiza: function(){
			var temp = function(retorno){
				try{
					var retorno = retorno.data;
					if (retorno == "erro"){alert("A lente nao pode ser criada");return;}
					var volta = retorno.split(",");
					var nimg = volta[2];
					var olente = $i('lente');
					var oboxlente = $i('boxlente');
					var olenteimg = $i('lenteimg');
					olenteimg.src = nimg;
					olenteimg.style.width=volta[0] * 1.5;
					olenteimg.style.height=volta[1] * 1.5;
					olente.style.zIndex=1000;
					olenteimg.style.zIndex=1000;
					oboxlente.style.zIndex=1000;
					var pos = i3GEO.util.pegaPosicaoObjeto($i("corpoMapa"));
					eval ("olente.style." + g_tipoleft + " = pos[0] + i3GEO.navega.lente.POSICAOX + g_postpx");
					eval ("olente.style." + g_tipotop + " = pos[1] + i3GEO.navega.lente.POSICAOY + g_postpx");
					eval ("oboxlente.style." + g_tipoleft + " = pos[0] + i3GEO.navega.lente.POSICAOX + g_postpx");
					eval ("oboxlente.style." + g_tipotop + " = pos[1] + i3GEO.navega.lente.POSICAOY + g_postpx");
					oboxlente.style.display='block';
					oboxlente.style.visibility='visible';
					olente.style.display='block';
					olente.style.visibility='visible';
					i3GEO.janela.fechaAguarde("ajaxabrelente");
				}
				catch(e){i3GEO.janela.fechaAguarde();}
			};
			if(i3GEO.navega.lente.ESTAATIVA == "sim"){
				i3GEO.janela.abreAguarde("ajaxabrelente",$trad("o1"));
				i3GEO.php.aplicaResolucao(temp,1.5);
			}
			else{
				i3GEO.navega.lente.desativa();
			}
		},
		/*
		Function: desativa
		
		Desativa alente aberta
		*/
		desativa: function(){
			$i("lente").style.display = "none";
			$i("boxlente").style.display = "none";
			$i('boxlente').style.borderWidth = 0;
			i3GEO.navega.lente.ESTAATIVA = "nao";
			i3GEO.eventos.MOUSEMOVE.remove("i3GEO.navega.lente.movimenta()");
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.navega.lente.atualiza()");
		},
		/*
		Function: movimenta
		
		Movimenta a imagem dentro da lente para refletir a posi��o do mouse
		*/
		movimenta: function(){
			try{
				if(i3GEO.navega.lente.ESTAATIVA = "sim"){
					if ($i("lente").style.visibility=="visible")
					var pos = i3GEO.util.pegaPosicaoObjeto($i("img"));
					var esq = (objposicaocursor.telax - pos[0]) * 2.25;
					var topo = (objposicaocursor.telay - pos[1]) * 2.25;
					var clipt = "rect("+ (topo - 40) + " " + (esq + 40) + " " + (topo + 40) + " " + (esq - 40) +")";
					var i = $i("lente").style;
					i.clip = clipt;
					eval("i." + g_tipotop + "= (pos[1] - (topo - 40)) + g_postpx");
					eval("i." + g_tipoleft +  "= (pos[0] - (esq - 40)) + g_postpx");
				}
			}
			catch(e){}
		}
	},
	/*
	Class: i3GEO.navega.destacaTema
	
	Destaca um tema mostrando-o sobre os outros em um box que segue o mouse
	*/
	destacaTema:{
		/*
		Property: TAMANHO
		
		Tamanho do box
		
		Type:
		{Integer}
		*/
		TAMANHO: 75,
		/*
		Variable: ESTAATIVO
		
		Indica se o destaque est� ou n�o ativo
		
		Type:
		{sim|nao}
		*/
		ESTAATIVO: "nao",
		/*
		Variable: TEMA
		
		Tema que est� sendo destacado
		
		Type:
		{C�digo do tema}
		*/
		TEMA: "",
		/*
		Function: inicia
		
		Inicia o destaque de um tema
		
		Parameters:
		
		tema {String} - c�digo do tema
		*/
		inicia: function(tema){
			if (!$i("img_d")){
				var novoel = document.createElement("div");
				novoel.id = "div_d";
				novoel.style.zIndex = 5000;
				document.body.appendChild(novoel);
				$i("div_d").innerHTML = "<input style='position:relative;top:0px;left:0px'' type=image src='' id='img_d' />";
				$i("div_d").style.left = parseInt($i("corpoMapa").style.left);
				$i("div_d").style.top = parseInt($i("corpoMapa").style.top);
				$i("img_d").style.left = 0;
				$i("img_d").style.top = 0;
				$i("img_d").style.width = i3GEO.parametros.w;
				$i("img_d").style.height = i3GEO.parametros.h;
				$i("div_d").style.clip = 'rect(0 75 75 0)';
				var novoeli = document.createElement("div");
				novoeli.id = "div_di";
				novoel.appendChild(novoeli);
				$i("div_di").innerHTML = "<p style='position:absolute;top:0px;left:0px'>+-</p>";
			}
			i3GEO.navega.destacaTema.TEMA = tema;
			i3GEO.navega.destacaTema.ESTAATIVO = "sim";
			i3GEO.navega.destacaTema.atualiza();
			var janela = i3GEO.janela.cria(150,0,"","center","center","Parar destaque&nbsp;&nbsp;","ativadesativaDestaque");
			YAHOO.util.Event.addListener(janela[0].close, "click", i3GEO.navega.destacaTema.desativa);
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.navega.destacaTema.atualiza()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.navega.destacaTema.atualiza()");}
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.navega.destacaTema.movimenta()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.destacaTema.movimenta()");}
		},
		/*
		Function: atualiza
		
		Atualiza o destaque
		
		� definido para o evento de navega��o do mapa
		*/
		atualiza: function(){
			if(i3GEO.navega.destacaTema.ESTAATIVO == "nao")
			{return;}
			var temp = function(retorno){
				var retorno = retorno.data;
				var m = new Image();
				m.src = retorno;
				$i("div_d").innerHTML = "";
				$i("div_d").style.display="block";
				var novoel = document.createElement("input");
				novoel.id = "img_d";
				novoel.style.position = "relative";
				novoel.style.top = "0px";
				novoel.style.left = "0px";
				novoel.type = "image";
				novoel.src = m.src;
				novoel.style.display = "block";
				$i("div_d").appendChild(novoel);
				i3GEO.janela.fechaAguarde("ajaxdestaca");	
			};
			i3GEO.janela.abreAguarde("ajaxdestaca","Aguarde...gerando imagem");
			i3GEO.php.geradestaque(temp,i3GEO.navega.destacaTema.TEMA);
		},
		/*
		Function: desativa
		
		Desativa o destaque
		*/
		desativa: function(){
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.navega.destacaTema.atualiza()");
			i3GEO.eventos.MOUSEMOVE.push("i3GEO.navega.destacaTema.movimenta()");
			i3GEO.navega.destacaTema.ESTAATIVO = "nao";
			document.body.removeChild($i("div_d"));
		},
		/*
		Function: movimenta
		
		Movimenta o destaque conforme o mouse move
		
		� definido para o evento de deslocamento do mouse
		*/
		movimenta: function(){
			if(i3GEO.navega.destacaTema.ESTAATIVO == "sim")
			$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - i3GEO.navega.destacaTema.TAMANHO)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - i3GEO.navega.destacaTema.TAMANHO)+')';
		}
	}
};
//YAHOO.log("carregou classe navega", "Classes i3geo");
/*
Title: Sele��o de elementos

File: i3geo/classesjs/classe_selecao.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.selecao

Realiza opera��es de sele��o de elementos do mapa
*/
i3GEO.selecao = {
	/*
	Function: porxy
	
	Executa a sele��o de elementos de um tema com base em um par de coordenadas xy
	
	Parameters:
	
	tema {String} - c�digo do tema
	
	tipo {String} - tipo de opera��o adiciona|retira
	
	tolerancia {Integer} - toler�ncia de busca
	*/
	porxy: function(tema,tipo,tolerancia){
		var retorna = function(retorno)
		{i3GEO.atualiza(retorno);};
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.selecaopt(retorna,tema,objposicaocursor.ddx+" "+objposicaocursor.ddy,tipo,tolerancia);
	},
	/*
	Function: porbox
	
	Seleciona elementos de um tema com base em um ret�ngulo
	
	Parameters:
	
	tema {String} - c�digo do tema
	
	tipo {String} - tipo de opera��o adiciona|retira
	
	box {String} - xmin ymin xmax ymax
	*/
	porbox: function(tema,tipo,box){
		var retorna = function(retorno)
		{i3GEO.atualiza(retorno);};
		i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
		i3GEO.php.selecaobox(retorna,tema,tipo,box);
	},
	/*
	Function: janelaOpcoes
	
	Abre a janela de op��es da ferramenta de sele��o.
	
	A janela ter� como id "wdocai"
	*/
	janelaOpcoes: function(){
		g_tipoacao = "selecao";
		i3GEO.temaAtivo = "";
		var janela = i3GEO.janela.cria("430px","320px",i3GEO.configura.locaplic+'/ferramentas/selecao/index.htm',"","","Sele&ccedil;&atilde;o");
		if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.selecao.clique()") < 0)
		{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.selecao.clique()");}
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.selecao.atualizaGrafico()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.selecao.atualizaGrafico()");}

		var temp = function(){
			i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.selecao.clique()");
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.selecao.atualizaGrafico()");
			try{
				i3GEO.desenho.richdraw.fecha();
			}
			catch(e){}
			if($i("pontosins")){document.body.removeChild($i("pontosins"));}
			i3GEO.barraDeBotoes.ativaBotoes();
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
	},
	/*
	Function: atualizaGrafico
	
	Atualiza o gr�fico de barras da ferramenta de sele��o
	
	O gr�fico � atualizado sempre que ocorrer uma nova sele��o no mapa, o que implica no redesnho do mapa e
	disparo do evento NAVEGAMAPA
	*/
	atualizaGrafico: function(){
		if(g_tipoacao == "selecao"){
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if(doc.getElementById("guia5obj")){
				if(doc.getElementById("guia5obj").style.display=="block"){
					if(window.parent.frames["wdocai"].atualizaGrafico)
					{window.parent.frames["wdocai"].atualizaGrafico();}
				}
			}
		}		
	},
	/*
	Function: clique
	
	Seleciona elementos clicando no mapa
	*/
	clique: function(){
		if (g_tipoacao == "selecao"){
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var tipo = "adiciona";
			//pega o tipo de operacao da janela de selecao
			if (doc.getElementById("tipoOperacao")){var tipo = doc.getElementById("tipoOperacao").value;}
			if (i3GEO.temaAtivo == ""){alert("Nenhum tema ativo");return;}
			var tolerancia = doc.getElementById("toleranciapt").value;
			//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
			if ((tipo != "limpa") && (tipo != "inverte"))
			{i3GEO.selecao.porxy(i3GEO.temaAtivo,tipo,tolerancia);}
		}
	},
	/*
	Class: i3GEO.selecao.box
	
	Controla o desenho do box para a sele��o e executa a fun��o de sele��o
	*/
	box: {
		/*
		Function: inicia
		
		Marca o in�cio do desenho do box, capturando a posi��o do mouse
		*/
		inicia: function(){
			if(g_tipoacao!='selecaobox'){return;}
			if(!$i("i3geoboxSel"))
			i3GEO.selecao.box.criaBox();
			var i = $i("i3geoboxSel").style;
			i.width=0;
			i.height=0;
			i.visibility="visible";
			i.display="block";
			i.left = objposicaocursor.telax + g_postpx;
			i.top = objposicaocursor.telay + g_postpx;
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.selecao.box.desloca()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.selecao.box.desloca()");}
			if(i3GEO.eventos.MOUSEUP.toString().search("i3GEO.selecao.box.termina()") < 0)
			{i3GEO.eventos.MOUSEUP.push("i3GEO.selecao.box.termina()");}
		},
		/*
		Function: criaBox
		
		Cria o DIV que ser� utilizado para desenhar o box no mapa
		*/
		criaBox: function(){
			if(!$i("i3geoboxSel")){
				var novoel = document.createElement("div");
				novoel.style.width = "0px";
				novoel.style.height = "0px";
				novoel.id = "i3geoboxSel";
				novoel.style.display = "none";
				novoel.style.fontSize = "0px";
				if(navn)
				{novoel.style.opacity = .25;}
				novoel.style.backgroundColor = "yellow";
				novoel.style.position="absolute";
				novoel.style.border = "2px solid #ff0000";		
				if (navm)
				{novoel.style.filter = "alpha(opacity=25)";}
				novoel.onmousemove = function(){
					var b = $i("i3geoboxSel").style;
					var wb = parseInt(b.width);
					var hb = parseInt(b.height);
					if (navm){
						if(wb > 2)
						{b.width = wb - 2;}
						if(hb > 2)
						{b.height = hb - 2;}
					}
					else{
						b.width = wb - 2 + "px";
						b.height = hb - 2 + "px";
					}
				};
				novoel.onmouseup = function(){i3GEO.selecao.box.termina()};
				document.body.appendChild(novoel);
			}
			i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","i3geoboxSel",i3GEO.configura.locaplic);
			if($i("img")){
				$i("img").title = "";
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","img",i3GEO.configura.locaplic);
			}
		},
		/*
		Function: desloca
		
		Desloca o box conforme o mouse � movimentado
		*/
		desloca: function(){
			if(g_tipoacao!='selecaobox'){return;}
			var bxs = $i("i3geoboxSel").style;
			if(bxs.display != "block"){return;}
			ppx = objposicaocursor.telax;
			py = objposicaocursor.telay;
			if (navm){
				if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
				{bxs.width = ppx - boxxini - 2;}
				if ((py > boxyini) && ((py - boxyini - 2) > 0))
				{bxs.height = py - boxyini - 2;}
				if (ppx < boxxini)
				{bxs.left = ppx;bxs.width = boxxini - ppx + 2;}
				if (py < boxyini)
				{bxs.top = py;bxs.height = boxyini - py + 2;}
			}
			else{
				if (ppx > boxxini)
				{bxs.width = ppx - boxxini + "px";}
				if (py > boxyini)
				{bxs.height = py - boxyini + "px";}
				if (ppx < boxxini)
				{bxs.left = ppx + "px";bxs.width = boxxini - ppx + "px";}
				if (py < boxyini)
				{bxs.top = py + "px";bxs.height = boxyini - py + "px";}
			}
		},
		/*
		Function: termina
		
		Para o desenho do box, captura seu tamanho e faz o zoom no mapa
		*/
		termina: function(){
			if(g_tipoacao!='selecaobox'){return;}
			try{
				var valor = i3GEO.calculo.rect2ext("i3geoboxSel",i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
				var v = valor[0];
				var x1 = valor[1];
				var y1 = valor[2];
				var x2 = valor[3];
				var y2 = valor[4];
				var limpa = function(){
					var bxs = $i("i3geoboxSel").style;
					bxs.display="none";
					bxs.visibility="hidden";
					bxs.width = 0;
					bxs.height = 0;
				};
				if((x1 == x2) || (y1 == y2))
				{limpa.call();return;}
				// se o retangulo for negativo pula essa parte para n� gerar erro
				i3GEO.parametros.mapexten=v;
				limpa.call();
				i3GEO.eventos.MOUSEMOVE.remove("i3GEO.selecao.box.desloca()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.selecao.box.termina()");

				var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				var tipo = "adiciona";
				//pega o tipo de operacao da janela de selecao
				if (doc.getElementById("tipoOperacao")){var tipo = doc.getElementById("tipoOperacao").value;}

				if ((tipo != "limpa") && (tipo != "inverte"))
				{i3GEO.selecao.porbox(i3GEO.temaAtivo,tipo,v);}
			}
			catch(e){limpa.call();return;}
		}
	},
	/*
	Class: i3GEO.selecao.poligono
	
	Realiza a sele��o desenhando um pol�gono no mapa
	*/
	poligono:{
		/*
		Function: inicia
		
		Inicia o desenho do pol�gono
		*/
		inicia: function(){
			try{i3GEO.desenho.richdraw.fecha()}catch(e){}
			i3GEO.util.insereMarca.limpa()
			g_tipoacao = "selecaopoli";
			alert("Clique no mapa para desenhar o pol�gono.")
			i3GEO.desenho.criaContainerRichdraw();
			i3GEO.desenho.richdraw.lineColor = "red";
			i3GEO.desenho.richdraw.lineWidth = "2px";
			i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.selecao.clique()");
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.selecao.poligono.move()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.selecao.poligono.move()");}
			if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.selecao.poligono.clique()") < 0)
			{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.selecao.poligono.clique()");}
		},
		/*
		Function: move
		
		Modifica o pol�gono conforme o usu�rio cria v�rtices
		*/
		move: function(){
			if (g_tipoacao == "selecaopoli"){
				var n = pontosdistobj.xpt.length;
				if (n > 0){
					var d = i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					if (i3GEO.parametros.mapscale > 500000)
					{var d = parseInt(d);}
					else{
						d= d + "";
						d = d.split(".");
						var decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					var da = d + pontosdistobj.dist[n-1];
					if(navn){i3GEO.desenho.aplica("resizePoligono",pontosdistobj.linhastemp,0);}
					i3GEO.desenho.aplica("resizePoligono",pontosdistobj.linhas[n-1],n);
				}
			}
		},
		/*
		Function: clique
		
		Inclui um novo v�rtice no pol�gono
		*/
		clique: function(){
			if (g_tipoacao != "selecaopoli"){return;}
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			pontosdistobj.xtela[n] = objposicaocursor.telax;
			pontosdistobj.ytela[n] = objposicaocursor.telay;
			pontosdistobj.ximg[n] = objposicaocursor.imgx;
			pontosdistobj.yimg[n] = objposicaocursor.imgy;
			pontosdistobj.dist[n] = 0;
			//inclui a linha para ligar com o ponto inicial
			if (n == 0){
				try{
					if (navn){
						pontosdistobj.linhastemp = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n]-1,pontosdistobj.yimg[n]-1,pontosdistobj.ximg[0]-1,pontosdistobj.yimg[0]-1);
					}
					else{
						pontosdistobj.linhastemp = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[0])-(i3GEO.parametros.w/2),pontosdistobj.yimg[0]);	
					}				
				}
				catch(e){}
			}
			try{
				if (navn){
					pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, pontosdistobj.ximg[n],pontosdistobj.yimg[n],pontosdistobj.ximg[n],pontosdistobj.yimg[n]);
				}
				else{
					pontosdistobj.linhas[n] = i3GEO.desenho.richdraw.renderer.create(i3GEO.desenho.richdraw.mode, i3GEO.desenho.richdraw.fillColor, i3GEO.desenho.richdraw.lineColor, i3GEO.desenho.richdraw.lineWidth, (pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n],(pontosdistobj.ximg[n])-(i3GEO.parametros.w/2),pontosdistobj.yimg[n]);
				}				
			}
			catch(e){}
			if (n > 0){
				var d = parseInt(i3GEO.util.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
				pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
			}
			i3GEO.util.insereMarca.cria(objposicaocursor.telax,objposicaocursor.telay,i3GEO.selecao.poligono.termina,"pontospoli");
		},
		/*
		Function: termina
		
		Termina o desenho do pol�gono e executa a opera��o de sele��o
		*/
		termina: function(){
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var pontos = pontosdistobj;
			i3GEO.desenho.richdraw.fecha();
			var n = pontos.xpt.length;
			i3GEO.temaAtivo = doc.getElementById("comboTemas").value;
			var xs = pontos.xpt.toString(",");
			var ys = pontos.ypt.toString(",");
			var retorna = function(){
				i3GEO.janela.fechaAguarde("i3GEO.atualiza",$trad("o1"));
				i3GEO.atualiza("");
			};
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=selecaoPoli";
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_transfer_mode('POST');
			cp.set_response_type("JSON");
			cp.call(p,"selecaoPoli",retorna,xs,ys,doc.getElementById("comboTemas").value,doc.getElementById("tipoOperacao").value);
		}
	}
};
//YAHOO.log("carregou classe selecao", "Classes i3geo");
/*
Title: Eventos

File: i3geo/classesjs/classe_eventos.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.eventos

Controla as opera��es que s�o executadas em eventos que ocorrem no mapa.

As listas de opera��es consistem em vari�veis com nomes de fun��es.

As listas s�o inicializadas com algunmas fun��es j� embutidas, mas podem ser acrescentadas outras.

Exemplos:

	Para incluir uma fun��o em um determinado evento utilize

	if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaNumerica()") < 0)
	
	{i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaNumerica()");}		

	Para remover utilize
	
	i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaNumerica()");
*/
i3GEO.eventos = {
	/*
	Variable: NAVEGAMAPA
	
	Armazena as fun��es que ser�o executadas quando � feita uma opera��o de navega��o sobre o mapa.
	
	Type:
	{Array}
	*/
	NAVEGAMAPA: new Array(
		"atualizaEscalaNumerica()"
	),
	/*
	Variable: MOUSEPARADO

	Nome das fun��es padr�o que ser�o executadas quando o usu�rio estaciona o mouse sobre o mapa 
	por alguns instantes.
	
	Type:
	{Array}
	*/
	MOUSEPARADO: new Array(
		"i3GEO.navega.mostraRosaDosVentos()"
	),
	/*
	Variable: MOUSEMOVE

	Nome das fun��es que ser�o executadas quando o usu�rio move o mouse sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSEMOVE: new Array(),
	/*
	Variable: MOUSEDOWN

	Nome das fun��es que ser�o executadas quando o usu�rio pressiona o bot�o do mouse sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSEDOWN: new Array(),
	/*
	Variable: MOUSEUP

	Nome das fun��es que ser�o executadas quando o usu�rio solta o bot�o do mouse sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSEUP: new Array(),
	/*
	Variable: MOUSECLIQUE

	Nome das fun��es que ser�o executadas quando o usu�rio clica sobre o mapa 
	
	Type:
	{Array}
	*/
	MOUSECLIQUE: new Array(
		"i3GEO.eventos.cliqueCapturaPt()"	
	),
	/*
	Variable: TIMERPARADO
	
	Timer utilizado pelo contador do mouse parado
	
	Type:
	{Timeout}
	*/
	TIMERPARADO: "",
	/*
	Function: mouseParado
	
	Executa as fun��es definidas em MOUSEPARADO quando � detectado que o mouse est� estacionado.
	
	A execu��o desse evento � controlado por um timer definido no evento onmousemove (sobre o mapa).
	
	*/
	mouseParado: function()	{
		try
		{clearTimeout(i3GEO.eventos.TIMERPARADO);}
		catch(e){i3GEO.eventos.TIMERPARADO = "";}
		try{
			if (i3GEO.eventos.MOUSEPARADO.length > 0 && objposicaocursor.imgy > 0 && objposicaocursor.imgx > 0){
				var f = i3GEO.eventos.MOUSEPARADO.length-1;
				if (f >= 0){
					do{
						if(objposicaocursor.imgx > 0)
						{YAHOO.log("mouseParado", "i3geo");eval(i3GEO.eventos.MOUSEPARADO[f]);}
					}
					while(f--)
				}
			}
		}catch(e){}
	},
	/*
	Function: navegaMapa
	
	Executa as fun��es armazenadas em NAVEGAMAPA, ou seja, opera��es executadas quando o mapa tem sua extens�o geogr�fica alterada.
	*/
	navegaMapa: function(){
		if (i3GEO.eventos.NAVEGAMAPA.length > 0){
			var f = i3GEO.eventos.NAVEGAMAPA.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.NAVEGAMAPA[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function'){
						eval(i3GEO.eventos.NAVEGAMAPA[f]);
						//YAHOO.log("navegaMapa", "i3geo");
					}
				}
				while(f--)
			}
		}
	},
	/*
	Function: mousemoveMapa
	
	Executa as fun��es armazenadas em MOUSEMOVE.
	*/
	mousemoveMapa: function(){
		if (i3GEO.eventos.MOUSEMOVE.length > 0){
			var f = i3GEO.eventos.MOUSEMOVE.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.MOUSEMOVE[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function'){
						eval(i3GEO.eventos.MOUSEMOVE[f]);
						//YAHOO.log("mousemoveMapa", "i3geo");
					}
				}
				while(f--)
			}
		}	
	},
	/*
	Function: mousedownMapa
	
	Executa as fun��es armazenadas em MOUSEDOWN.
	*/
	mousedownMapa: function(){
		if (i3GEO.eventos.MOUSEDOWN.length > 0){
			var f = i3GEO.eventos.MOUSEDOWN.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.MOUSEDOWN[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function'){
						eval(i3GEO.eventos.MOUSEDOWN[f]);
						//YAHOO.log("mousedownMapa", "i3geo");
					}
				}
				while(f--)
			}
		}
	},
	/*
	Function: mouseupMapa
	
	Executa as fun��es armazenadas em MOUSEUP.
	*/
	mouseupMapa: function(){
		if (i3GEO.eventos.MOUSEUP.length > 0){
			var f = i3GEO.eventos.MOUSEUP.length-1;
			if (f >= 0){
				do{
					var temp = i3GEO.eventos.MOUSEUP[f].replace("()", "");
					if(eval('typeof ' + temp) == 'function'){
						eval(i3GEO.eventos.MOUSEUP[f]);
						//YAHOO.log("mouseupMapa", "i3geo");
					}
				}
				while(f--)
			}
		}	
	},
	/*
	Function: mousecliqueMapa
	
	Executa as fun��es armazenadas em MOUSECLIQUE.
	*/
	mousecliqueMapa: function(){
		if (i3GEO.eventos.MOUSECLIQUE.length > 0){
			var f = i3GEO.eventos.MOUSECLIQUE.length-1;
			if (f >= 0){
				do{
					eval(i3GEO.eventos.MOUSECLIQUE[f]);
					//YAHOO.log("mousecliqueMapa", "i3geo");
				}
				while(f--)
			}
		}
	},
	/*
	Function posicaoMouseMapa
	
	Captura a posi��o do mouse sobre um mapa. O c�lculo pode ser feito sobre o corpo do mapa principal ou sob o corpo do mapa de refer�ncia
	
	O resultado dos c�lculos s�o armazenados no objeto objposicaocursor
	esse objeto ter� as seguintes propriedades:
	
			propriedades.ddx valor de x em d�cimos de grau
			
			propriedades.ddy valor de y em d�cimos de grau
			
			propriedades.dmsx valor de x em dms
			
			propriedades.dmsy valor de y em dms
			
			propriedades.telax posicao x na tela em pixels
			
			propriedades.telay posicao y na tela em pixels
			
			propriedades.imgx posicao x no mapa em pixels
			
			propriedades.imgy: posicao y no mapa em pixels
			
			propriedades.refx: posicao x no mapa de refer�ncia em pixels
			
			propriedades.refy: posicao x no mapa de refer�ncia em pixels
	
	Parameters:
	
	e {Event object} - objeto do tipo evento disparado sobre o objeto em foco
	*/
	posicaoMouseMapa: function(e){
		//
		//os eventos da interface googlemaps s�o definidos em i3GEO.interface
		//
		if(i3GEO.interface.ATUAL == "googlemaps")
		{return;}	
		if (!e) var e = window.event;
		//
		//verifica sob qual objeto o mouse est� se movendo
		//
		if (e.target)
		{var targ = e.target;}
		else if (e.srcElement) var targ = e.srcElement;
		if(targ.id == "" && $i(i3GEO.interface.IDMAPA))
		{var targ = $i(i3GEO.interface.IDMAPA);}
		//
		//se estiver no modo pan, o movimento deve ser obtido do elemento
		//onde est� a imagem do mapa e n�o diretamente sobre o elemento 'img'
		//se n�o for feito assim, o deslocamento do mapa n�o � capturado
		//
		try{
			if(g_panM != 'undefined' && g_panM == "sim")
			{var pos = i3GEO.util.pegaPosicaoObjeto(targ.parentNode);}
			else
			{var pos = i3GEO.util.pegaPosicaoObjeto(targ);}
			if((i3GEO.configura.entorno == "sim") && (g_panM == "sim")){
				pos[0] = pos[0] - i3GEO.parametros.w;
				pos[1] = pos[1] - i3GEO.parametros.h;
			}
		}
		catch(m){var pos = i3GEO.util.pegaPosicaoObjeto(targ);}
		//
		//pega a posicao correta do mouse
		//
		var mousex = 0;
		var mousey = 0;
		if (e.pageX || e.pageY){
			var mousex = e.pageX;
			var mousey = e.pageY;
		}
		else if (e.clientX || e.clientY){
			var mousex = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
			var mousey = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
		}
		//
		//faz os c�lculos de posicionamento
		//fig e reffig s�o a mesma coisa por enquanto
		//
		var xfig = mousex - pos[0];
		var yfig = mousey - pos[1];
		var xreffig = xfig;
		var yreffig = yfig;
		var xtela = mousex;
		var ytela = mousey;
		//
		//celula e extent s�o necess�rios para se fazer a
		//convers�o de coordenadas de tela para coordenadas geogr�ficas
		//esses valores s�o obtidos das fun��es ajax que redesenham ou inicializam o mapa
		// 
		var c = i3GEO.parametros.pixelsize;
		var ex = i3GEO.parametros.mapexten;
		try{
			if(targ.id == "imagemReferencia"){
				var c = i3GEO.parametros.celularef;
				var ex = i3GEO.parametros.extentref;
				var r = $i("i3geo_rosa");
				if(r)
				r.style.display = "none"
			}
		}
		catch(e){i3GEO.parametros.celularef = 0;}
		var teladd = i3GEO.calculo.tela2dd(xfig,yfig,c,ex);
		var teladms = i3GEO.calculo.dd2dms(teladd[0],teladd[1]);
		objposicaocursor = {
			ddx: teladd[0],
			ddy: teladd[1],
			dmsx: teladms[0],
			dmsy: teladms[1],
			telax: xtela,
			telay: ytela,
			imgx: xfig,
			imgy: yfig,
			refx: xreffig,
			refy: yreffig
		};
	},
	/*
	Function: ativa

	Ativa as opera��es de clique sobre o mapa

	Define o que ser� executado quando o mouse � clicado ou movido sobre o mapa.

	Al�m das fun��es padr�o,s�o ativadas aquelas definidas nas vari�veis de configura��o (veja configura.js)

	Parameters:

	docMapa {DOM node} - objeto que ser� alvo da ativa��o dos cliques
	*/
	ativa: function(docMapa){
		docMapa.onmouseover = function(){
			this.onmousemove=function(exy){
				i3GEO.eventos.posicaoMouseMapa(exy);
				try{
					try
					{clearTimeout(i3GEO.eventos.TIMERPARADO);}
					catch(e){var a = e;}
					i3GEO.eventos.TIMERPARADO = setTimeout('i3GEO.eventos.mouseParado()',i3GEO.configura.tempoMouseParado);
				}
				catch(e){var e = "";}
				try
				{i3GEO.eventos.mousemoveMapa();}
				catch(e){var e = "";}
			};
		};
		docMapa.onmouseout = function(){
			try
			{objmapaparado="parar";}
			catch(e){var e = "";}
		};
		docMapa.onmousedown = function(exy){
			try{
				i3GEO.eventos.posicaoMouseMapa(exy);
				i3GEO.eventos.mousedownMapa();
			}
			catch(e){var e = "";}
		};
		docMapa.onclick = function(){
			try
			{i3GEO.eventos.mousecliqueMapa();}
			catch(e){var e = "";}
		};
		docMapa.onmouseup = function(){
			try
			{i3GEO.eventos.mouseupMapa();}
			catch(e){var e = "";}
		};
	},
	/*
	Function: cliqueCapturaPt

	Captura um ponto na tela e retorna o resultado para a janela interna que estiver aberta.

	As coordenadas do ponto, em DMS, s�o repassadas para os campos do tipo input da janela interna que estiver aberta.
	A janela aberta deve ter os seguintes elementos do tipo input (ids):
	ixg,ixm,ixs,iyg,iym,iys
	*/
	cliqueCapturaPt: function(){
		if (g_tipoacao != "capturaponto"){return;}
		else{
			if($i("wdocai"))
			{var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;}
			var x = objposicaocursor.dmsx.split(" ");
			var y = objposicaocursor.dmsy.split(" ");
			if (doc.getElementById("ixg"))
			{doc.getElementById("ixg").value = x[0];}
			if (doc.getElementById("ixm"))
			{doc.getElementById("ixm").value = x[1];}
			if (doc.getElementById("ixs"))
			{doc.getElementById("ixs").value = x[2];}
			if (doc.getElementById("iyg"))
			{doc.getElementById("iyg").value = y[0];}
			if (doc.getElementById("iym"))
			{doc.getElementById("iym").value = y[1];}
			if (doc.getElementById("iys"))
			{doc.getElementById("iys").value = y[2];}
		}
	}
};
//YAHOO.log("carregou classe eventos", "Classes i3geo");
/*
Title: �rvore de temas

File: i3geo/classesjs/classe_arvodetemas.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.arvoreDeTemas

Monta a �rvore com os temas dispon�veis para ser adicionados ao mapa.
*/
i3GEO.arvoreDeTemas = {
	/*
	Property: OPCOESADICIONAIS
	
	Objeto com a defini��o das propriedades que ser�o utilizadas na inclus�o dos �cones adicionais de adi��o de temas e no item de descri��o de cada tema.

	Example:
	
	var obj = {
	
		idonde: "",
		
		incluiArvore: true,
		
		uploaddbf: true,
		
		uploadlocal: true,
		
		downloadbase: true,
		
		conectarwms: true,
		
		conectargeorss: true,
		
		nuvemTags: true,
		
		navegacaoDir: false,
		
		incluibusca: true,

		kml: true,
		
		qrcode: true,
		
		mini: true		
	}
	
	Type:
	{Object}
	*/
	OPCOESADICIONAIS: {
		idonde: "",
		incluiArvore: true,
		uploaddbf: true,
		uploadlocal: true,
		downloadbase: true,
		conectarwms: true,
		conectargeorss: true,
		nuvemTags: true,
		navegacaoDir: false,
		incluibusca: true,
		kml: true,
		qrcode: true,
		mini: true,
		estrelas: true
	},
	/*
	Property: FATORESTRELA
	
	Valor que ser� utilizado para dividir o valor bruto do n�mero de acessos de cada tema.
	
	A divis�o � utilizada para definir quantas estrelas ser�o mostradas na �rvore de op��es adicionais.<b> 

	Type:
	{Numeric}
	*/
	FATORESTRELA: "1",
	/*
	Property: INCLUISISTEMAS
	
	Inclui na �rvore a lista de sistemas adicionais definidos no i3geo?
	
	Type:
	{Boolean}
	*/
	INCLUISISTEMAS: true,
	/*
	Property: FILTRADOWNLOAD
	
	N�o mostra na �rvore os n�s que n�o possuem temas para download
	
	Type:
	{Boolean}
	*/
	FILTRADOWNLOAD: false,
	/*
	Property: FILTRAOGC
	
	N�o mostra na �rvore os n�s que n�o permitem a gera��o de WMS
	
	Type:
	{Boolean}
	*/
	FILTRAOGC: false,

	/*
	Property: ATIVATEMA
	
	Nome da fun��o que ser� inclu�da no evento onclick do elemento checkbox adicionado no in�cio do nome de um tema.
	
	Type:
	{String}
	*/
	ATIVATEMA: "",
	/*
	Property: IDSMENUS
	
	Array com a lista de ids que ser�o considerados na montagem da �rvore. Por default � vazio, o que significa que todos os menus ser�o considerados.
	
	Type:
	{Array}
	*/
	IDSMENUS: new Array(),
	/*
	Variable: IDHTML
	
	Armazena o ID do elemento HTML onde a �rvore ser� incluida

	Type:
	{String}
	*/
	IDHTML: null,
	/*
	Variable: LOCAPLIC
	
	Endere�o da aplica��o i3geo. Utilizado para definir o caminho para a chamada em AJAX.

	Type:
	{String}
	*/
	LOCAPLIC: null,
	/*
	Variable: SID
	
	C�digo da se��o aberta no servidor pelo i3Geo

	Type:
	{String}
	*/
	SID: null,
	/*
	Variable: ARVORE
	
	Objeto com a �rvore criada com YAHOO.widget.TreeView

	Type:
	{YAHOO.widget.TreeView}
	*/
	ARVORE: null,
	/*
	Variable: DRIVES
	
	Objeto JSON com a lista de drives no servidor que podem ser abertos na op��o de navega��o pelos diret�rios
	
	Type:
	{JSON}
	*/
	DRIVES: null,
	/*
	Variable: SISTEMAS
	
	Objeto JSON com a lista de sistemas existentes
	
	Type:
	{JSON}
	*/
	SISTEMAS: null,
	/*
	Variable: MENUS
	
	Armazena o objeto JSON com a lista de menus resultante da fun��o listaMenus
	
	Type:
	{JSON}
	*/
	MENUS: null,
	/*
	Variable: GRUPOS
	
	Armazena o objeto JSON com a �ltima lista de grupos obtida

	Type:
	{JSON}
	*/
	GRUPOS: null,
	/*
	Variable: SUBGRUPOS
	
	Armazena o objeto JSON com a �ltima lista de sub-grupos obtida

	Type:
	{JSON}
	*/
	SUBGRUPOS: null,
	/*
	Variable: TEMAS
	
	Armazena o objeto JSON com a �ltima lista de temas obtida

	Type:
	{JSON}
	*/
	TEMAS: null,
	/*
	Function: listaMenus

	Lista os menus dispon�veis.
	
	Pesquisa no banco de dados administrativo ou na vari�vel de configura��o (veja ms_configura.php) a lista de menus dispon�veis.
	
	O resultado � inclu�do em i3GEO.arvoreDeTemas.MENUS.
	
	A propriedade i3GEO.arvoreDetemas.IDSMENUS pode ser utilizada para filtrar alista de menus que ser� utilizada.

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {String} nome da fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaMenus: function(g_sid,g_locaplic,funcao) {
		var retorno = function(retorno) {
			if(i3GEO.arvoreDeTemas.IDSMENUS.length == 0)
				i3GEO.arvoreDeTemas.MENUS = retorno.data;
			else{
				i3GEO.arvoreDeTemas.MENUS = new Array();
				var c = retorno.data.length;
				var m = i3GEO.arvoreDeTemas.IDSMENUS.length;
				for (var i=0, j=c; i<j; i++){
					for (var k=0, jj=m; k<jj; k++){
						if(retorno.data[i].idmenu == i3GEO.arvoreDeTemas.IDSMENUS[k]) 
						i3GEO.arvoreDeTemas.MENUS.push(retorno.data[i]);
					}
				}
			}
			if(funcao != "")
				eval(funcao+"(retorno)");
		};
		i3GEO.php.pegalistademenus(retorno);
	},
	/*
	Function: listaGrupos
	
	Lista os grupos de um menu.
	
	O resultado � armazenado em i3GEO.arvoreDetemas.GRUPOS 

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaGrupos: function(g_sid,g_locaplic,id_menu,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.GRUPOS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		var listasgrupos = "nao";
		if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD || i3GEO.arvoreDeTemas.FILTRAOGC)
		var listasgrupos = "sim";
		i3GEO.php.pegalistadegrupos(retorno,id_menu,listasgrupos);
	},
	/*
	Function: listaSubGrupos
	
	Lista os sub-grupos de um grupo.
	
	O resultado � armazenado emi3GEO.arvoreDetemas.SUBGRUPOS

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos
	
	id_grupo - {String} Id do grupo que contem os sub-grupos

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaSubGrupos: function(g_sid,g_locaplic,id_menu,id_grupo,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.SUBGRUPOS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		i3GEO.php.pegalistadeSubgrupos(retorno,id_menu,id_grupo)
	},
	/*
	Function: listaTemas
	
	Lista os temas de um sub-grupo.
	
	O resultado � armazenado em i3GEO.arvoreDeTemas.TEMAS

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp
	
	id_menu - {String} Id do menu que contem os grupos
	
	id_grupo - {String} Id do grupo que contem os sub-grupos
	
	id_subgrupo - {String} Id do sub-grupo que contem os temas

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaTemas: function(g_sid,g_locaplic,id_menu,id_grupo,id_subgrupo,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.TEMAS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		i3GEO.php.pegalistadetemas(retorno,id_menu,id_grupo,id_subgrupo)
	},
	/*
	Function: listaSistemas
	
	Lista os sistemas especiais de adi��o de temas.
	
	O resultado � armazenado em i3GEO.arvoreDeTemas.SISTEMAS

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaSistemas: function(g_sid,g_locaplic,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.SISTEMAS = retorno.data;
			if(funcao != "")
			funcao.call();
		};
		i3GEO.php.pegaSistemas(retorno);
	},
	/*
	Function: listaDrives
	
	Lista os endere�os no servidor dos drives que podem ser abertos pela op��o de navega��o em arquivos no servidor.
	
	Alista de drives deve ser definida emi3geo/ms_configura.php
	
	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	funcao - {Function} fun��o que ser� executada quando a lista for recebida. Se for "", n�o � chamada.
	*/
	listaDrives: function(g_sid,g_locaplic,funcao) {
		var retorno = function(retorno) {
			i3GEO.arvoreDeTemas.DRIVES = retorno.data[0];
			if(funcao != "")
			funcao.call();
		};
		i3GEO.php.listadrives(retorno);
	},
	/*
	Function: cria
	
	Cria a �rvore com os menus dispon�veis.
	
	A �rvore cont�m opcionalmente a op��o de busca, os �cones adicionais e a lista de sistemas.
	
	Ao ser criada, os par�metros utilizados s�o armazenados em vari�veis que podem ser acessadas com
	i3geo.arvoreDeTemas.[ATIVATEMA,OPCOESADICIONAIS,IDHTML,LOCAPLIC,SID]

	Parameters:
	
	g_sid - {String} C�digo da se��o PHP criada ao abrir o i3Geo

	g_locaplic - {String} Endere�o da aplica��o (i3geo) onde fica o diret�rio classesphp

	idhtml - {String} Id do elemento onde a �rvore ser� inserida. Se for vazio, ser� utilizado o ID definido em IDHTML
	
	funcaoTema - {String} (opcional) Nome da fun��o que ser� executada quando o usu�rio clicar no checkbox de um tema

	objOpcoes - {Object} (opcional) Objeto com as op��es necess�rias para cria��o dos �cones com as op��es adicionais de adi��o de temas
	*/
	cria: function(g_sid,g_locaplic,idhtml,funcaoTema,objOpcoes) {
		if(this.ARVORE){return;}
		if(idhtml != "")
		{i3GEO.arvoreDeTemas.IDHTML = idhtml;}
		var nargs = arguments.length;
		if(nargs == 4 || nargs == 5){
			i3GEO.arvoreDeTemas.ATIVATEMA = funcaoTema;
		}
		if(nargs == 5)
		{i3GEO.arvoreDeTemas.OPCOESADICIONAIS = objOpcoes;}	
		i3GEO.arvoreDeTemas.LOCAPLIC = g_locaplic;
		i3GEO.arvoreDeTemas.SID = g_sid;
		if(i3GEO.arvoreDeTemas.IDHTML == ""){return;}
		this.listaMenus(g_sid,g_locaplic,"i3GEO.arvoreDeTemas.montaArvore");
	},
	/*
	Function: montaArvore
	
	Monta a �rvore incluindo os n�s do primeiro n�vel. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos grupos.
	*/
	montaArvore: function() {
		var currentIconMode;
		YAHOO.example.treeExample = new function(){
			function changeIconMode(){
				var newVal = parseInt(this.value);
				if (newVal != currentIconMode)
				{currentIconMode = newVal;}
				buildTree();
			}
        	function buildTree(){
				i3GEO.arvoreDeTemas.ARVORE = new YAHOO.widget.TreeView(i3GEO.arvoreDeTemas.IDHTML);
				var root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
				var tempNode = new YAHOO.widget.TextNode('', root, false);
				tempNode.isLeaf = false;
        	}
    		buildTree();
		}();
		var root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
		//op��o de busca de temas
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluibusca == true){
			var insp = "<br><br><table  cellspacing='0' cellpadding='0' ><tr><td style='text-align:left;font-size:10px;'>";
			insp += "<span style='font-size:12px'>&nbsp;"+$trad("a1")+"</span><input class='digitar' type='text' id='i3geo_buscatema' size='15' value=''  /><img  class='tic' title='"+$trad("a1")+"' src='"+i3GEO.util.$im("branco.gif")+"' onclick='i3GEO.arvoreDeTemas.buscaTema(document.getElementById(\"i3geo_buscatema\").value)' style='cursor:pointer;top:2px;position:relative;' /></p></td></tr></table>&nbsp;";
			var d = {html:insp};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,false);
		}
		//icones com as outras op��es
		var outrasOpcoes = i3GEO.arvoreDeTemas.outrasOpcoesHTML();
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde != "")
		{document.getElementById(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde).innerHTML = outrasOpcoes;}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore == true){
			var d = {html:outrasOpcoes+"&nbsp;<br>"};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
			tempNode.isLeaf = true;
			if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir == true){
				var retorno = function(){
					var conteudo = "&nbsp;"+$trad("a6");;
					var d = {html:conteudo};
					var tempNode = new YAHOO.widget.HTMLNode(d,root, false,true);
					var drives = i3GEO.arvoreDeTemas.DRIVES;
					var iglt = drives.length;
					var ig=0;
					do{
						var d = {html:drives[ig].nome,caminho:drives[ig].caminho};
						var drive = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
						drive.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir, 1);
						ig++;
					}
					while(ig<iglt)
				};
				i3GEO.arvoreDeTemas.listaDrives(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno);
			}
		}
		//
		//adiciona na �rvore a raiz de cada menu
		//
		var dados = i3GEO.arvoreDeTemas.MENUS;
		var c = dados.length;
		for (var i=0, j=c; i<j; i++)
		{
			var desc = dados[i].desc;
			if(!dados[i].nomemenu)
			dados[i].nomemenu = dados[i].idmenu;
			if(dados[i].publicado != "NAO")
			var conteudo = "<b>&nbsp;<span title='"+desc+"'>"+dados[i].nomemenu+"</span>";
			else
			var conteudo = "<b>&nbsp;<span title='nao publicado' style=color:red; >"+dados[i].nomemenu+"</span>";
			var d = {html:conteudo,idmenu:dados[i].idmenu};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
			tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaGrupos, currentIconMode);
			if(dados[i].status == "aberto")
			{tempNode.expand();}
		}
		if(i3GEO.arvoreDeTemas.INCLUISISTEMAS){
			var retorno = function(){
				var conteudo = "<b>Sistemas</b>";
				var d = {html:conteudo};
				var tempNode = new YAHOO.widget.HTMLNode(d,root, false,true);
				var sis = i3GEO.arvoreDeTemas.SISTEMAS;
				var iglt = sis.length;
				var ig=0;
				do{
					var nomeSis = sis[ig].NOME;
					if(sis[ig].PUBLICADO){
						if(sis[ig].PUBLICADO == "NAO" || sis[ig].PUBLICADO == "nao")
						{var nomeSis = "<s>"+sis[ig].NOME+"</s>";}
					}
					var d = {html:nomeSis};
					var sisNode = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
					var funcoes = sis[ig].FUNCOES;
					var tempf = funcoes.length;
					for (var ig2=0;ig2<tempf;ig2++){
						var executar = funcoes[ig2].ABRIR;
						var w = funcoes[ig2].W;
						var h = funcoes[ig2].H;
						var abre = "i3GEO.janela.cria('"+w+"px','"+h+"px','"+executar+"','','','Sistemas')";
						var nomeFunc = "<a href='#' onclick='"+abre+"'>"+funcoes[ig2].NOME+"</a>";
						var d = {html:nomeFunc};
						var funcNode = new YAHOO.widget.HTMLNode(d, sisNode, false,true);
						funcNode.isLeaf = true;
					}
					ig++;
				}
				while(ig<iglt)
				i3GEO.arvoreDeTemas.ARVORE.draw();
			};
			i3GEO.arvoreDeTemas.listaSistemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno);
		}
		document.getElementById(i3GEO.arvoreDeTemas.IDHTML).style.textAlign="left";
   		if(!i3GEO.arvoreDeTemas.INCLUISISTEMAS)
   		i3GEO.arvoreDeTemas.ARVORE.draw();
	},
	/*
	Function: montaGrupos
	
	Monta a lista de grupos de um n� principal da �rvore. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos sub-grupos.
	*/
	montaGrupos: function(node){		
		var temp=function(){
			var grupos = i3GEO.arvoreDeTemas.GRUPOS.grupos;
			var c = grupos.length - 3;
			var raiz = grupos[c].temasraiz;
			var nraiz = raiz.length;
			for (i=0;i<nraiz; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && raiz[i].download == "nao")
				{var mostra = false;}				
				if(i3GEO.arvoreDeTemas.FILTRAOGC && raiz[i].ogc == "nao")
				{var mostra = false;}				
				if(mostra){
					var html = i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i]);
					var d = {html:html};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.isLeaf = true;
				}
			}
			for (i=0;i<c; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && grupos[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && grupos[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					var d = {html:grupos[i].nome,idmenu:node.data.idmenu,idgrupo:i};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaSubGrupos, 1);
					tempNode.isLeaf = false;
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,temp);
	},
	/*
	Function: montaSubGrupos
	
	Monta a lista de sub-grupos de um n� do tipo grupo. 

	A op��o de carga din�mica dos n�s filhos � definida para a montagem dos temas.
	*/
	montaSubGrupos: function(node){		
		var temp=function(){
			var subgrupos = i3GEO.arvoreDeTemas.SUBGRUPOS.subgrupo;
			var c = subgrupos.length;
			var raiz = i3GEO.arvoreDeTemas.SUBGRUPOS.temasgrupo;
			var nraiz = raiz.length;
			
			for (i=0;i<nraiz; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && raiz[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && raiz[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					var html = i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i]);
					var d = {html:html};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.isLeaf = true;
				}
			}
			for (i=0;i<c; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && subgrupos[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && subgrupos[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					var d = {html:subgrupos[i].nome,idmenu:node.data.idmenu,idgrupo:node.data.idgrupo,idsubgrupo:i};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaTemas, 1);
					tempNode.isLeaf = false;
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaSubGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,temp)
	},
	/*
	Function: montaTemas
	
	Monta a lista de temas de um n�. 
	*/
	montaTemas: function(node){		
		var temp=function(){
			var temas = i3GEO.arvoreDeTemas.TEMAS.temas;
			var c = temas.length;
			var cor = "rgb(51, 102, 102)";
			for (i=0;i<c; i++){
				var mostra = true;
				if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && temas[i].download == "nao")
				{var mostra = false;}
				if(i3GEO.arvoreDeTemas.FILTRAOGC && temas[i].ogc == "nao")
				{var mostra = false;}

				if(mostra){
					htmli = i3GEO.arvoreDeTemas.montaTextoTema(cor,temas[i]);
					var d = {nacessos:temas[i].nacessos,html:htmli,idtema:temas[i].tid,fonte:temas[i].link,ogc:temas[i].ogc};
					var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
					//tempNode.nowrap = true;
					tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.propTemas, 1);
					tempNode.isLeaf = false;
					if(cor == "rgb(51, 102, 102)")
					{var cor = "rgb(47, 70, 50)";}
					else{var cor = "rgb(51, 102, 102)";}
				}
			}
			node.loadComplete();
		};
		i3GEO.arvoreDeTemas.listaTemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,node.data.idsubgrupo,temp)
	},
	/*
	Function: montaDir
	
	Inclu� na �rvore o navegador de diret�rios
	
	Parameters:
	
	node {node} - n� onde ser� criada a lista 
	*/
	montaDir: function(node){
		var montaLista = function(retorno)
		{
			var dirs = retorno.data.diretorios;
			for (ig=0;ig<dirs.length;ig++)
			{
				var conteudo = dirs[ig];
				var d = {html:conteudo,caminho:node.data.caminho+"/"+conteudo};
				var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
				tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir, 1);
			}
			var arquivos = retorno.data.arquivos;
			for (ig=0;ig<arquivos.length;ig++)
			{
				var conteudo = arquivos[ig];
				if(conteudo.search(".tif") > 1 || conteudo.search(".TIF") > 1 || conteudo.search(".shp") > 1 || conteudo.search(".SHP") > 1)
				{
					var conteudo = "<a href='#' title='"+$trad("g2")+"' onclick='i3GEO.util.adicionaSHP(\""+node.data.caminho+"/"+conteudo+"\")' >"+conteudo+"</a>";
					var d = {html:conteudo,caminho:node.data.caminho+"/"+conteudo};
					var nodeSHP = new YAHOO.widget.HTMLNode(d, node, false,true);
					nodeSHP.isLeaf = true;
				}
			}
			node.loadComplete();
		};
		i3GEO.php.listaarquivos(montaLista,node.data.caminho);
	},
	/*
	Function: montaTextoTema
	
	Monta o texto com o t�tulo do tema.
	
	Parameters:
	
	cor - {String} - cor que ser� utilizada no estilo "color"
	
	tema - {Object} - objeto JSON com as propriedades do tema
	
	Return:
	
	{String} - texto formatado
	*/
	montaTextoTema: function(cor,tema){
		var html = "<td style='vertical-align:top;padding-top:5px;'><span ><input style='cursor:pointer;border:solid 0 white;' ";
		if(i3GEO.arvoreDeTemas.ATIVATEMA != "")
		html += "onclick=\""+i3GEO.arvoreDeTemas.ATIVATEMA+"\"";
		else
		html += "onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeTemas.adicionaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicar\",this)'";
		html += " type='checkbox' value='"+tema.tid+"' /></td><td style='padding-top:4px;vertical-align:top;text-align:left;color:"+cor+";padding-left:3px;' >";
		html += tema.nome;
		html += "</td></span>";
		return(html);
	},
	/*
	Function: propTemas
	
	Monta o n� com informa��es adicionais sobre o tema.
	
	Parameters:
	
	node - {Object} - objeto com o n� que foi clicado
	*/
	propTemas: function(node){		
		var g_locaplic = i3GEO.arvoreDeTemas.LOCAPLIC;
		if(node.data.fonte != "" && node.data.fonte != " "){
			var html = "<a href='"+node.data.fonte+"' target='_blank' >Fonte</a>";
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.mini == true){
			var lkmini = g_locaplic+"/testamapfile.php?map="+node.data.idtema+".map&tipo=mini";
			var lkmini1 = g_locaplic+"/testamapfile.php?map="+node.data.idtema+".map&tipo=grande";
			var html = "<a onmouseover='i3GEO.ajuda.mostraJanela(\"<img src="+lkmini+" />\")' href='"+lkmini1+"' target='blank' >Miniatura</a>";	
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}

		if (node.data.ogc != "nao"){
			if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.kml == true){
				var html = "<a href='#' onclick='i3GEO.tema.dialogo.abreKml(\""+node.data.idtema+"\")' >Kml</a>";		
				var d = {html:html};
				var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
				tempNode.isLeaf = true;
			}
			var ogc = g_locaplic+"/ogc.php?tema="+node.data.idtema+"&service=wms&request=getcapabilities";
			var html = "<a href='"+ogc+"' target='blank' >WMS - OGC</a>";	
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.qrcode == true){
			var lkgrcode = g_locaplic+"/pacotes/qrcode/php/qr_html.php?d="+g_locaplic+"/mobile/index.php?temasa="+node.data.idtema;
			var lkgrcode1 = g_locaplic+"/pacotes/qrcode/php/qr_img.php?d="+g_locaplic+"/mobile/index.php?temasa="+node.data.idtema;
			var html = "<a onmouseover='i3GEO.ajuda.mostraJanela(\"<img src="+lkgrcode1+" />\")' href='"+lkgrcode+"' target='blank' >Qrcode</a>";	
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.estrelas == true){
			var n = parseInt(node.data.nacessos / (i3GEO.arvoreDeTemas.FATORESTRELA*1));		
			if(n >= 5){var n = 5;}
			if(n > 0)
			var html = "<img src='"+i3GEO.util.$im("e"+n+".png")+"'/>";
			else
			var html = "<img src='"+i3GEO.util.$im("e0.png")+"'/>";
			var d = {html:html};
			var tempNode = new YAHOO.widget.HTMLNode(d, node, false,true);
			tempNode.isLeaf = true;
		}
		node.loadComplete();
	},
	/*
	Function: outrasOpcoesHTML
	
	Constr�i o HTML com as op��es adicionais de inclus�o de temas (upload de shp, etc.).
	
	Return:
	
	{String} - html gerado
	*/
	outrasOpcoesHTML: function(){
		var ins = "<table width='120px' ><tr>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploaddbf == true)
		ins += "<td><img class='uploaddbf' onclick='i3GEO.arvoreDeTemas.dialogo.uploaddbf()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2b")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploadlocal == true)
		ins += "<td><img class='upload' onclick='i3GEO.arvoreDeTemas.dialogo.upload()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.downloadbase == true)
		ins += "<td><img onclick='i3GEO.arvoreDeTemas.dialogo.downloadbase()' class='download' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a3")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwms == true)
		ins += "<td><img class='conectarwms' onclick='i3GEO.arvoreDeTemas.dialogo.conectarwms()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a4")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectargeorss == true)
		ins += "<td><img class='conectargeorss' onclick='i3GEO.arvoreDeTemas.dialogo.conectargeorss()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5")+"'/><td>";
		if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTags == true)
		ins += "<td><img class='nuvemtags' onclick='i3GEO.arvoreDeTemas.dialogo.nuvemTags()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5a")+"'/><td>";
		ins += "</tr></table>";
		return(ins);
	},
	/*
	Function: desativaCheckbox
	
	Desmarca todos os checkbox dos temas marcados na �rvore.
	*/
	desativaCheckbox: function(){
		var o = document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);
		var inputs = o.getElementsByTagName("input");
		var n = inputs.length;
		var i=0;
		do{
			inputs[i].checked = false;
			i++;
		}
		while(i<n)	
	},
	/*
	Function: listaTemasAtivos
	
	Lista os temas com checkbox marcados.
	
	Return:
	{Array} - array com os c�digos dos temas
	*/
	listaTemasAtivos: function(){
		var o = document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);
		var inputs = o.getElementsByTagName("input");
		var n = inputs.length;
		var i=0;
		var lista = new Array();
		do{
			if(inputs[i].checked == true)
			{lista.push(inputs[i].value);}
			i++;
		}
		while(i<n)
		return (lista);
	},
	/*
	Function: buscaTema
	
	Procura temas na �rvore de temas (a busca � feita no servidor e n�o na �rvore atual).
	
	Parameter:
	
	palavra {String}
	*/
	buscaTema: function(palavra){
		var procurar = i3GEO.util.removeAcentos(palavra);
		var resultadoProcurar = function(retorno)
		{
			if(!retorno.data)
			{alert("Ocorreu um erro");}
			else{
				var retorno = retorno.data;
				var conta = 0;
				if ((retorno != "erro") && (retorno != undefined)){
					var ig = retorno.length-1;
					if(ig >= 0){
						do{
							var ngSgrupo = retorno[ig].subgrupos;
							var tempn = ngSgrupo.length;
							for (var sg=0;sg<tempn;sg++){
								var nomeSgrupo = ngSgrupo[sg].subgrupo;
								var ngTema = ngSgrupo[sg].temas;
								var tempng = ngTema.length;
								for (var st=0;st<tempng;st++){
									var mostra = true;
									if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD && ngTema[st].download == "nao")
									{var mostra = false;}
									if(i3GEO.arvoreDeTemas.FILTRAOGC && ngTema[st].ogc == "nao")
									{var mostra = false;}

									if(mostra){
										var d = i3GEO.arvoreDeTemas.montaTextoTema("gray",ngTema[st]);
										var lk = "";
										if ( ngTema[st].link != " ")
										{var lk = "<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>";}
										d += "<td style='text-allign:left'> ("+nomeSgrupo+") "+lk+"</td>";
										var tempNode = new YAHOO.widget.HTMLNode(d, nodePalavra, false,true);
										tempNode.isLeaf = true;
									}
									conta++;
								}
							}
						}
						while(ig--)
					}
					else{
						var d = "<span style='color:red'>Nada encontrado<br><br></span>";
						var tempNode = new YAHOO.widget.HTMLNode(d, nodePalavra, false,true);
						tempNode.isLeaf = true;
					}
				}
			}
			nodePalavra.loadComplete();
		};
		//
		//funcao que ser� executada para buscar os temas
		//
		var busca = function(){
			i3GEO.php.procurartemas(resultadoProcurar,procurar);
		};
		//
		//recolhe todos os n�s e acrescenta um novo
		//
		i3GEO.arvoreDeTemas.ARVORE.collapseAll();
		var root = i3GEO.arvoreDeTemas.ARVORE.getRoot();
		if(!i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados")){
			var d = {html:"Temas encontrados",id:"temasEncontrados"};
			var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
		}
		else
		{var tempNode = i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados");}
		var d = {html:palavra};
		nodePalavra = new YAHOO.widget.HTMLNode(d, tempNode, false,true);
		i3GEO.arvoreDeTemas.ARVORE.draw();
		tempNode.expand();
		nodePalavra.setDynamicLoad(busca, 1);
		nodePalavra.expand();
	},
	/*
	Function: adicionaTemas
	
	Adiciona ao mapa os temas selecionados na �rvore
	*/
	adicionaTemas: function(){
		//
		//zera o contador de tempo
		//
		clearTimeout(tempoBotaoAplicar);
		tempoBotaoAplicar = "";
		i3GEO.temaAtivo = "";
		//
		//pega os temas ativados na �rvore de menus
		//
		var tsl = i3GEO.arvoreDeTemas.listaTemasAtivos();
		i3GEO.arvoreDeTemas.desativaCheckbox();
		//
		//se forem encontrados temas ativos na �rvore de menus, o mapa � redesenhado com a adi��o de novos temas
		//
		if(tsl.length > 0){
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			var temp = function(retorno){
				i3GEO.janela.fechaAguarde("i3GEO.atualiza");
				if(retorno.data.erro){
					alert(retorno.data.erro);
					return;
				}
				i3GEO.atualiza();					
			};
			i3GEO.php.adtema(temp,tsl.toString());
		}
	},
	/*
	Function: comboGruposMenu

	Busca a lista de grupos existentes no menu de temas do i3geo e monta um combo com o resultado.

	Ao escolher uma op��o do combo, a fun��o de retorno receber� como par�metro o id do grupo.

	Parameters:

	locaplic {String} - endere�o do i3geo
	
	funcaoOnchange {String} - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino {String} - id do elemento HTML que receber� o combo

	idCombo {String} - id do combo que ser� criado

	largura {Numeric} - largura em pixels do combo

	altura {Numeric} - altura do combo em linhas
	
	id_menu {Numeric} - id do menu que ser� utilizado para obter os dados
	*/
	comboGruposMenu: function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura,id_menu){
		i3GEO.configura.locaplic = locaplic;
		var combo = function (retorno){
			obGrupos = retorno.data;
			var ins = "<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um grupo:</option>";
			for (ig=0;ig<obGrupos.grupos.length; ig++){
				if(obGrupos.grupos[ig].nome)
				ins += "<option value="+ig+" >"+obGrupos.grupos[ig].nome+"</option>";
			}
			$i(idDestino).innerHTML = ins+"</select>";
		};
		i3GEO.php.pegalistadegrupos(combo,id_menu,"nao");
	},
	/*
	Function: comboSubGruposMenu
	
	Monta um combo com a lista de subgrupos de um grupo do menu de temas do i3geo.

	Ao escolher um subgrupo, a fun��o de retorno receber� o id do grupo e o id do subgrupo.

	Parameters:

	locaplic {String} - endere�o do i3geo

	funcaoOnchange {String} - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino {String} - id do elemento HTML que receber� o combo

	idCombo {String} - id do combo que ser� criado

	idGrupo {String} - identificador do grupo que ser� pesquisado

	largura {Numeric} - largura em pixels do combo

	altura {Numeric} - altura do combo em linhas
	*/
	comboSubGruposMenu: function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,largura,altura){
		if(idGrupo != ""){
			var combo = function(retorno){
				var ins = "<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+",this.value)' ><option value='' >Escolha um sub-grupo:</option>";
				if (retorno.data.subgrupo){
					var sg = retorno.data.subgrupo;
					for (ig=0;ig<sg.length; ig++){	
						ins += "<option value="+ig+" >"+sg[ig].nome+"</option>";
					}
				}
				$i(idDestino).innerHTML = ins+"</select>";
			};
			i3GEO.php.pegalistadeSubgrupos(combo,"",idGrupo);
		}
	},
	/*
	Function: comboTemasMenu

	Monta um combo com a lista de subgrupos de um grupo do menu de temas do i3geo.

	Ao escolher um subgrupo, a fun��o de retorno receber� o id do grupo e o id do subgrupo.

	Parameters:

	locaplic {String} - endere�o do i3geo

	funcaoOnchange - nome da funcao que ser� executada quando o usu�rio escolhe um grupo

	idDestino - id do elemento HTML que receber� o combo

	idCombo - id do combo que ser� criado

	idGrupo - identificador do grupo que ser� pesquisado

	idSubGrupo - id do subgrupo

	largura - largura em pixels do combo

	altura - altura do combo em linhas
	
	id_menu - id do menu escolhido
	*/
	comboTemasMenu: function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,idSubGrupo,largura,altura,id_menu){
		var combo = function(retorno){
			var ins = "<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+","+idSubGrupo+",this.value)' ><option value='' >Escolha um tema:</option>";
			if (retorno.data.temas[i]){
				var sg = retorno.data.temas;
				for (ig=0;ig<sg.length; ig++){	
					ins += "<option value="+sg[ig].tid+" >"+sg[ig].nome+"</option>";
				}
			}
			$i(idDestino).innerHTML = ins+"</select>";
		};
		i3GEO.php.pegalistadetemas(combo,id_menu,idGrupo,idSubGrupo);
	},
	/*
	Class: dialogo
	
	Abre as janelas de di�logo com as op��es adicionais que permitem acrescentar temas ao mapa
	
	Por exemplo, para abrir a janela de upload de arquivos dbf, utilize
	
	i3GEO.arvoreDeTemas.dialogo.uploaddbf()
	*/
	dialogo:{
		/*
		Function: nuvemTags

		Mostra a nuvem de tags para escolha de temas baseado nos tags registrados nos menus de temas
		*/
		nuvemTags: function()
		{i3GEO.janela.cria("350px","350px",i3GEO.configura.locaplic+"/ferramentas/nuvemtags/index.htm","","","Nuvem de tags");},
		/*
		Function: navegacaoDir

		Abre a janela para adicionar temas navegando pelos diret�rios do servidor
		*/
		navegacaoDir: function()
		{i3GEO.janela.cria("550px","350px",i3GEO.configura.locaplic+"/ferramentas/navegacaodir/index.htm","","","Diret&oacute;rios");},
		/*
		Function: conectarwms

		Abre a janela para adicionar temas tendo como fonte um web service do tipo wms
		*/
		conectarwms: function()
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwms/index.htm","","","WMS");},
		/*
		Function: conectarwfs

		Abre a janela para adicionar temas tendo como fonte um web service do tipo wfs
		*/
		conectarwfs: function()
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwfs/index.htm","","","WFS");},
		/*
		Function: conectargeorss

		Abre a janela para adicionar temas tendo como fonte um georss
		*/
		conectargeorss: function()
		{i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectargeorss/index.htm","","","GeoRSS");},
		/*
		Function: upload

		Abre a janela para o upload de shape file
		*/
		upload: function()
		{i3GEO.janela.cria("300px","230px",i3GEO.configura.locaplic+"/ferramentas/upload/index.htm","","","Upload");},
		/*
		Function: uploaddbf

		Abre a janela para o upload de um arquivo dbf
		*/
		uploaddbf: function()
		{i3GEO.janela.cria("300px","280px",i3GEO.configura.locaplic+"/ferramentas/uploaddbf/index.htm","","","Upload");},
		/*
		Function: downloadbase

		Abre o aplicativo datadownload
		*/
		downloadbase: function()
		{window.open(i3GEO.configura.locaplic+"/datadownload.htm");}
	}
};
//YAHOO.log("carregou classe arvoredetemas", "Classes i3geo");
/*
Title: Barra de bot�es

File: i3geo/classesjs/classe_barradebotoes.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.barradebotoes

Constr�i a barra de bot�es flutuante
*/
i3GEO.barraDeBotoes = {
	/*
	Variable: BARRAS
	
	Array com os objetos YAHOO.janelaBotoes.xp.panel criados
	*/
	BARRAS: new Array(),
	/*
	Property: LISTABOTOES
	
	Objeto com a lista de bot�es.
	
	Por default utiliza os botoes definidos em i3GEO.configura.funcoesBotoes.botoes
	
	Type:
	{JSON}
	*/
	LISTABOTOES: i3GEO.configura.funcoesBotoes.botoes,
	/*
	Property: BOTAOPADRAO
	
	Bot�o que ser� ativado ao inicializar os bot�es com ativaBotoes.
	
	Correpsonde ao item iddiv de LISTABOTOES
	
	Type:
	{String}
	*/
	BOTAOPADRAO: "pan",
	/*
	Function: ativaIcone
	
	Altera as bordas de um �cone aplicando um efeito de �cone real�ado.
	
	Todos os demais �cones definidos em LISTABOTOES e que tiverem o tipo = "dinamico"
	ser�o processados para alterar as bordas dando o efeito de n�o ativo.
	
	Parameters:
	
	icone {String} - id do icone que ser� ativado. Esse id � o mesmo definido em LISTABOTOES
	*/
	ativaIcone: function(icone){
		//desativa todos os �cones
		var ko = i3GEO.barraDeBotoes.LISTABOTOES.length-1;
		if(ko >= 0)
		{
			do
			{
				var temp = $i(i3GEO.barraDeBotoes.LISTABOTOES[ko].iddiv);
				if (i3GEO.barraDeBotoes.LISTABOTOES[ko].tipo=="dinamico" && temp)
				{
					var ist = temp.style;
					ist.borderWidth="1px";
					ist.borderColor='white';
					ist.borderLeftColor='rgb(50,50,50)';
					ist.borderBottomColor='rgb(50,50,50)';
				}
			}
			while(ko--)
		}
		//ativa o icone
		if($i(icone))
		{with ($i(icone).style){
			borderColor='white';
			borderWidth="1px";
		}}
	},
	/*
	Function: ativaBotoes
	
	Ativa os botoes definidos em LISTABOTOES
	
	Os botoes s�o constru�dos e as fun��es definidas s�o embutidas no evento onclick
	
	Parameters:
	
	padrao (String} - botao que ser� mostrado como ativo (opcional).
	Se n�o for definido, ser� utilizado o bot�o especificado em BOTAOPADRAO.
	O nome do botao deve estar em LISTABOTOES na propriedade iddiv
	*/
	ativaBotoes:function(padrao){
		if(arguments.length == 0)
		{var padrao = i3GEO.barraDeBotoes.BOTAOPADRAO;}
		var l = i3GEO.barraDeBotoes.LISTABOTOES;
		var b = l.length-1;
		if (b >= 0){
			do{
				if ($i(l[b].iddiv)){
					if(l[b].conteudo)
					{eval('$i(l[b].iddiv).innerHTML = "'+l[b].conteudo+'"');}
					if(l[b].dica){
						eval('$i("'+l[b].iddiv+'").onmouseover = function(){i3GEO.ajuda.mostraJanela("'+l[b].dica+'","");}');
						eval('$i("'+l[b].iddiv+'").onmouseout = function(){i3GEO.ajuda.mostraJanela("");};');
					}
					if(l[b].funcaoonclick){
						$i(l[b].iddiv).onclick = l[b].funcaoonclick;
						if(l[b].iddiv == padrao)
						{l[b].funcaoonclick();}
					}
					if(l[b].constroiconteudo)
					{eval(l[b].constroiconteudo);}
				}
			}
			while (b--);
		}
	},
	/*
	Function: inicializaBarra
	
	Inicializa a barra de bot�es
	
	Exemplo:
	
	if ($i("barraDeBotoes1"))
	
	i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes1","i3geo_barra1",true,x1,y1);
	
	if ($i("barraDeBotoes2"))
	
	i3GEO.barraDeBotoes.inicializaBarra("barraDeBotoes2","i3geo_barra2",false,x2,y2);
	
	Os objetos criados s�o armazenados no array BARRAS, dessa forma, para acessar uma barra utilize
	por exemplo:
	
	i3GEO.barraDeBotoes.BARRAS[1].show();
	
	Parameters:
	
	idconteudo {String} - id do elemento existente no HTML e que cont�m as defini��es dos bot�es
	
	idconteudonovo {String} - id do elemento que ser� criado para adicionar os boto�es
	
	barraZoom {boolean} - indica se a barra de zoom ser� inclu�da
	
	x {Numeric} - posi��o x (pixels) da barra em rela��o ao mapa
	
	y {Numeric} - posi��o y (pixels) da barra em rela��o ao mapa
	*/
	inicializaBarra:function(idconteudo,idconteudonovo,barraZoom,x,y){
		var wj = "36px";
		var recuo = "0px";
		var novoel = document.createElement("div");
		novoel.id = idconteudonovo;
		novoel.style.display="block";
		novoel.style.border="1px solid gray";
		novoel.style.background="white";
		if (navm)
		{novoel.style.filter='alpha(opacity=90)';}
		else
		{novoel.style.opacity= .85;}
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" style="background-color:rgb(250,250,250);width='+wj+'px"  >';		
		var temp = "";
		if (barraZoom == true)
		{
			if (navn){temp += '<div style="text-align:center;position:relative;left:9px" >';}
			temp += '<div id="vertMaisZoom" onmouseover="i3GEO.ajuda.mostraJanela(\'Amplia o mapa mantendo o centro atual.\')" onclick="i3GEO.navega.zoomin()" ></div><div id="vertBGDiv" name="vertBGDiv" tabindex="0" x2:role="role:slider" state:valuenow="0" state:valuemin="0" state:valuemax="200" title="Zoom" >';
			temp += '<div id="vertHandleDiv" ><img alt="" class="slider" src="'+i3GEO.util.$im("branco.gif")+'" /></div></div>';
			temp += '<div id=vertMenosZoom onmouseover="i3GEO.ajuda.mostraJanela(\'Reduz o mapa mantendo o centro atual.\')" onclick="i3GEO.navega.zoomout()"  ></div>';
			if (navn){temp += '</div>';}
		}
		temp += '<div id="'+idconteudonovo+'_" style="left:'+recuo+';top:-6px;"  ></div></div>';
		novoel.innerHTML = temp;
		//necess�roi para impedir o desenho da rosa dos ventos
		novoel.onmouseover = function(){
			//objposicaocursor.imgx = 0;
			if($i("i3geo_rosa"))
			{$i("i3geo_rosa").style.display="none";}
		};
		document.body.appendChild(novoel);
		//copia os botoes do HTML para a janela
		if ($i(idconteudo))
		{
			$i(idconteudonovo+"_").innerHTML = $i(idconteudo).innerHTML;
			$i(idconteudo).innerHTML = "";
		}
		YAHOO.namespace("janelaBotoes.xp");
		YAHOO.janelaBotoes.xp.panel = new YAHOO.widget.Panel(idconteudonovo, {width:wj, fixedcenter: false, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		if((barraZoom == true) && $i("img")){
			if (!$i("imgClone")){
				iclone=document.createElement('IMG');
				iclone.style.position = "relative";
				iclone.id = "imgClone";
				iclone.style.border="1px solid blue";
				$i("img").parentNode.appendChild(iclone);
			}
			else
			{iclone = $i("imgClone");}
			iclone.style.display = "none";
			verticalSlider = YAHOO.widget.Slider.getVertSlider("vertBGDiv","vertHandleDiv", 0, 70);
			verticalSlider.onChange = function(offsetFromStart)
			{g_fatordezoom = (offsetFromStart - 35) / 5;};
			verticalSlider.setValue(35,true);
			if ($i("vertBGDiv")){
				$i("vertBGDiv").onmouseup = function(){
					i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,i3geo_ns)
					g_fatordezoom = 0;
					verticalSlider.setValue(35,true);
				};
			}
			if($i("vertHandleDiv")){
				$i("vertHandleDiv").onmousedown = function(){
					var corpo = $i("img");
					if(!corpo){return;}
					iclone.src = corpo.src;
					iclone.style.width = i3GEO.parametros.w;
					iclone.style.heigth = i3GEO.parametros.h;
					iclone.style.top = corpo.style.top;
					iclone.style.left = corpo.style.left;
					$i("img").style.display = "none";
					iclone.style.display = "block";
				};
			}
			if($i("vertHandleDiv")){
				$i("vertHandleDiv").onmousemove = function(){
					var corpo = $i("img");
					if(!corpo){return;}
					var nw = i3GEO.parametros.w;
					var nh = i3GEO.parametros.h;
					var nt = 0;
					var nl = 0;
					i3geo_ns = parseInt(i3GEO.parametros.mapscale);
					if ((g_fatordezoom > 0) && (g_fatordezoom < 7)){
						g_fatordezoom = g_fatordezoom + 1;
						var velhoh = parseInt(iclone.style.height);
						var velhow = parseInt(iclone.style.width);
						nh = i3GEO.parametros.h / g_fatordezoom;
						nw = i3GEO.parametros.w / g_fatordezoom;
						var t = parseInt(iclone.style.top);
						var l = parseInt(iclone.style.left);
						nt=t + ((velhoh - nh)*.5);
						if (navm){nl=0;}
						else
						{nl=l + ((velhow - nw)*.5);}
						var fatorEscala = nh/i3GEO.parametros.h;
						i3geo_ns=parseInt(i3GEO.parametros.mapscale / fatorEscala);
					}
					if ((g_fatordezoom < 0) && (g_fatordezoom > -7)){
						g_fatordezoom = g_fatordezoom - 1;
						var velhoh = parseInt(iclone.style.height);
						var velhow = parseInt(iclone.style.width);
						nh = i3GEO.parametros.h * g_fatordezoom * -1;
						nw = i3GEO.parametros.w * g_fatordezoom * -1;
						var t = parseInt(iclone.style.top);
						var l = parseInt(iclone.style.left);
						nt = t - ((nh - velhoh)*.5);
						nl = l - ((nw - velhow)*.5);
						var fatorEscala = nh/i3GEO.parametros.h;
						i3geo_ns=parseInt(i3GEO.parametros.mapscale / fatorEscala);
					}
					iclone.style.width = nw;
					iclone.style.height = nh;
					//$top("img",nt);
					//$left("img",nl);
					if (iclone.style.pixelTop)
					{iclone.style.pixelTop=nt;}
					else
					{iclone.style.top=nt+"px";}
					if (iclone.style.pixelLeft)
					{iclone.style.pixelLeft=nl;}
					else
					{iclone.style.left=nl+"px";}					
					if ($i("i3geo_escalanum"))
					{$i("i3geo_escalanum").value=i3geo_ns;}
				};
			}		
		}
		YAHOO.janelaBotoes.xp.panel.render();
		YAHOO.janelaBotoes.xp.panel.moveTo(x,y);
		if($i("sobeferramentas")){
			$i("sobeferramentas").onclick = function(){
				var elementos = $i(idconteudonovo+"_").getElementsByTagName("div");
				if(elementos[0].style.display == "inline")
				{return;}
				if(elementos.length > 0){
					var mostra = elementos[0];
					var i = 0;
					do{
						if(elementos[i].style){
							if(elementos[i].style.display == "inline")
							{break;}
							if(elementos[i].style.display == "none")
							{var mostra = elementos[i];}
						}
						var i = i + 1;
					}
					while(i < elementos.length)
					mostra.style.display="inline";
					//esconde o �ltimo botao
					var i = elementos.length - 1;
					var mostra = elementos[i];
					do{
						if(elementos[i].style){
							if(elementos[i].style.display == "inline")
							{var mostra = elementos[i];break;}
						}
						var i = i - 1;
					}
					while(i >= 0)
					mostra.style.display="none";
				}
			};
		}
		if($i("desceferramentas")){
			$i("desceferramentas").onclick = function(){
				var tipo = "inline";
				if($i(idconteudonovo+"_")){
					var elementos = $i(idconteudonovo+"_").getElementsByTagName("div");
					if(elementos[elementos.length - 1].style.display == tipo)
					{return;}
					if(elementos.length > 0){
						//esconde o primeiro botao
						var i = 0;
						do{
							if(elementos[i].style){
								if((elementos[i].style.display == "block") || (elementos[i].style.display == "inline") || (elementos[i].style.display == ""))
								{elementos[i].style.display="none";break;}
							}
							var i = i + 1;
						}
						while(i < elementos.length)
						//mostra o �ltimo botao
						var i = elementos.length-1;
						var mostra = elementos[i];
						do{
							if(elementos[i].style){
								if(elementos[i].style.display == tipo)
								{break;}
								if(elementos[i].style.display == "none")
								{var mostra = elementos[i];}
							}
							var i = i - 1;
						}
						while(i >= 0)
						mostra.style.display=tipo;
					}
				}
			};
		}
		i3GEO.barraDeBotoes.BARRAS.push(YAHOO.janelaBotoes.xp.panel);
		YAHOO.janelaBotoes.xp.panel.show();		
	},
	/*
	Function: reativa
	
	Reativa as barras de ferramentas j� criadas
	
	Parameters:
	
	indice {Integer} - �ndice do array BARRAS que guarda os objetos YAHOO com 
	as barras Se n�o for definido, todas as barras ser�o reativadas
	*/
	reativa: function(indice){
		if(arguments.length == 1)
			i3GEO.barraDeBotoes.BARRAS[indice].show();
		else{
			var n = i3GEO.barraDeBotoes.BARRAS.length;
			for(i=0;i<n;i++){
				i3GEO.barraDeBotoes.BARRAS[i].show();
			}
		}
	}
};
//YAHOO.log("carregou classe barradebotoes", "Classes i3geo");
/*----------------------------------------------------------------------------
 RICHDRAW 1.0
 Vector Graphics Drawing Script
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of simple vector graphic drawing control using SVG or VML.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies: (SVG or VML rendering implementations)
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function RichDrawEditor(elem, renderer) {
  this.container = elem;
	this.gridX = 10;
	this.gridY = 10;
  this.mouseDownX = 0;
  this.mouseDownY = 0;
  this.mode = '';
  this.fillColor = '';
  this.lineColor = '';
  this.lineWidth = '';
  this.selected = null;
  this.selectedBounds = { x:0, y:0, width:0, height: 0 };

	this.onselect = function() {};
	this.onunselect = function() {};

  this.renderer = renderer;
  this.renderer.init(this.container);
  this.fecha = function()
  {
  	pontosdistobj = new pontosdist();
  	elem.innerHTML = "";
  	elem.style.display="none";
  	if(g_tipoacao == "mede")
  	{mudaiconf("pan");}
  	if(document.getElementById("mostradistancia"))
  	{document.getElementById("mostradistancia").style.display="none";}
  }

/*
  //this.onMouseDownListener = this.onMouseDown.bindAsEventListener(this);
  this.onClickListener = this.onClick.bindAsEventListener(this);
  this.onMouseUpListener = this.onMouseUp.bindAsEventListener(this);
  this.onDragListener = this.onDrag.bindAsEventListener(this);
  this.onResizeListener = this.onResize.bindAsEventListener(this);
  this.onDrawListener = this.onDraw.bindAsEventListener(this);

  this.onHitListener = this.onHit.bindAsEventListener(this);

  this.onSelectStartListener = this.onSelectStart.bindAsEventListener(this);

  //Event.observe(this.container, "mousedown", this.onMouseDownListener);
  Event.observe(this.container, "mouseclick", this.onClickListener);
  Event.observe(this.container, "mouseup", this.onMouseUpListener);
  Event.observe(this.container, "selectstart", this.onSelectStartListener);  
*/
}


RichDrawEditor.prototype.clearWorkspace = function() {
	this.container.innerHTML = '';
};


RichDrawEditor.prototype.deleteSelection = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.renderer.remove(this.selected);
    this.selected = null;
  }
};


RichDrawEditor.prototype.select = function(elem) {
  if (elem == this.selected)
    return;

  this.selected = elem;
  this.renderer.showTracker(this.selected);
  this.onselect(this);
};


RichDrawEditor.prototype.unselect = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.selected = null;
    this.onunselect(this);
  }
};


RichDrawEditor.prototype.getSelectedElement = function() {
  return this.selected;
};


RichDrawEditor.prototype.setGrid = function(horizontal, vertical) {
  this.gridX = horizontal;
  this.gridY = vertical;
};


RichDrawEditor.prototype.editCommand = function(cmd, value)
{
  if (cmd == 'mode') {
    this.mode = value;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      this.fillColor = value;
    }
    else if (cmd == 'linecolor') {
      this.lineColor = value;
    }
    else if (cmd == 'linewidth') {
      this.lineWidth = parseInt(value) + 'px';
    }
  }
  else {
    this.renderer.editCommand(this.selected, cmd, value);
  }
};


RichDrawEditor.prototype.queryCommand = function(cmd)
{
  if (cmd == 'mode') {
    return this.mode;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      return this.fillColor;
    }
    else if (cmd == 'linecolor') {
      return this.lineColor;
    }
    else if (cmd == 'linewidth') {
      return this.lineWidth;
    }
  }
  else {
    return this.renderer.queryCommand(this.selected, cmd);
  }
};


RichDrawEditor.prototype.onSelectStart = function(event) {
  return false;
};

RichDrawEditor.prototype.onClick = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;
  if (this.mode != 'select') {
    this.unselect();
    this.mouseDownX = snappedX;
    this.mouseDownY = snappedY;
    this.selected = this.renderer.create(this.mode, this.fillColor, this.lineColor, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1);
    this.selected.id = 'shape:' + createUUID();
    Event.observe(this.selected, "mousemove", this.onHitListener);  
    Event.observe(this.container, "mousemove", this.onDrawListener);  
  
  }
  else {
    if (this.mouseDownX != snappedX || this.mouseDownY != snappedY)
      this.unselect();
  }
  
  return false;
};


RichDrawEditor.prototype.onMouseDown = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;
  if (this.mode != 'select') {
    this.unselect();
    this.mouseDownX = snappedX;
    this.mouseDownY = snappedY;
    this.selected = this.renderer.create(this.mode, this.fillColor, this.lineColor, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1);
    this.selected.id = 'shape:' + createUUID();
    Event.observe(this.selected, "mousedown", this.onHitListener);  
    Event.observe(this.container, "mousemove", this.onDrawListener);  
  }
  else {
    if (this.mouseDownX != snappedX || this.mouseDownY != snappedY)
      this.unselect();
  }
  
  return false;
};


RichDrawEditor.prototype.onMouseUp = function(event) {
  Event.stopObserving(this.container, "mouseup", this.onDrawListener);  
  Event.stopObserving(this.container, "mouseup", this.onDragListener);  

  if (this.mode != 'select') {
    this.selected = null;
  }
};


RichDrawEditor.prototype.onDrag = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;
  this.renderer.move(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY);
  // Update selection tracker
  this.renderer.showTracker(this.selected);
//  hide_tracker();
};


RichDrawEditor.prototype.onResize = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;

  this.renderer.track(handle, deltaX, deltaY);

  // Update selection tracker
  show_tracker();
//  hide_tracker();
};

//
//o elemento est� sendo desenhado
//
RichDrawEditor.prototype.onDraw = function(event) {
  if (this.selected == null)
    return;

  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;
  this.renderer.resize(this.selected, this.mouseDownX, this.mouseDownY, snappedX, snappedY);
};


RichDrawEditor.prototype.onHit = function(event) {
  if (this.mode == 'select') {
    this.select(Event.element(event));
    this.selectedBounds = this.renderer.bounds(this.selected);
    
    var offset = Position.cumulativeOffset(this.container);
    this.mouseDownX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
    this.mouseDownY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

    Event.observe(this.container, "mousemove", this.onDragListener);  
  }
};


function createUUID()
{
  return [4, 2, 2, 2, 6].map(function(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
      var uuidchar = parseInt((Math.random() * 256)).toString(16);
      if (uuidchar.length == 1)
        uuidchar = "0" + uuidchar;
      uuidpart += uuidchar;
    }
    return uuidpart;
  }).join('-');
}

//----------------------------------------------------------------------------
// AbstractRenderer
//
// Abstract base class defining the drawing API. Can not be used directly.
//----------------------------------------------------------------------------

function AbstractRenderer() {

};

AbstractRenderer.prototype.init = function(elem) {};
AbstractRenderer.prototype.bounds = function(shape) { return { x:0, y:0, width:0, height: 0 }; };
AbstractRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {};
AbstractRenderer.prototype.remove = function(shape) {};
AbstractRenderer.prototype.move = function(shape, left, top) {};
AbstractRenderer.prototype.track = function(shape) {};
AbstractRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {};
AbstractRenderer.prototype.editCommand = function(shape, cmd, value) {};
AbstractRenderer.prototype.queryCommand = function(shape, cmd) {};
AbstractRenderer.prototype.showTracker = function(shape) {};
AbstractRenderer.prototype.getMarkup = function() { return null; };

/*----------------------------------------------------------------------------
 SVGRENDERER 1.0
 SVG Renderer For RichDraw
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of SVG based renderer.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies:
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function SVGRenderer() {
	this.base = AbstractRenderer;
	this.svgRoot = null;
}


SVGRenderer.prototype = new AbstractRenderer;


SVGRenderer.prototype.init = function(elem) {
  this.container = elem;

  this.container.style.MozUserSelect = 'none';
    
  var svgNamespace = 'http://www.w3.org/2000/svg';
  this.svgRoot = this.container.ownerDocument.createElementNS(svgNamespace, "svg");
  this.container.appendChild(this.svgRoot);
};


SVGRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  var box = shape.getBBox();
  rect['x'] = box.x;
  rect['y'] = box.y;
  rect['width'] =  box.width;
  rect['height'] = box.height;
  return rect;
};


SVGRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {
  var svgNamespace = 'http://www.w3.org/2000/svg';
  var svg;

  if (shape == 'rect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
  }
  else if (shape == 'ellipse') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'ellipse');
    svg.setAttributeNS(null, 'cx', (left + width / 2) + 'px');
    svg.setAttributeNS(null, 'cy', (top + height / 2) + 'px');
    svg.setAttributeNS(null, 'rx', (width / 2) + 'px');
    svg.setAttributeNS(null, 'ry', (height / 2) + 'px');
  }
  else if (shape == 'circ') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'ellipse');
    svg.setAttributeNS(null, 'cx', left + 'px');
    svg.setAttributeNS(null, 'cy', top + 'px');
    svg.setAttributeNS(null, 'rx', width + 'px');
    svg.setAttributeNS(null, 'ry', width + 'px');
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'rx', '20px');
    svg.setAttributeNS(null, 'ry', '20px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
  }
  else if (shape == 'line') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'line');
    svg.setAttributeNS(null, 'x1', left + 'px');
    svg.setAttributeNS(null, 'y1', top + 'px');
    svg.setAttributeNS(null, 'x2', width + 'px');
    svg.setAttributeNS(null, 'y2', height + 'px');
  }

  svg.style.position = 'absolute';

  if (fillColor.length == 0)
    fillColor = 'none';
  svg.setAttributeNS(null, 'fill', fillColor);

  if (lineColor.length == 0)
    lineColor = 'none';
  svg.setAttributeNS(null, 'stroke', lineColor);
  svg.setAttributeNS(null, 'stroke-width', lineWidth);
      
  this.svgRoot.appendChild(svg);
  
  return svg;
};


SVGRenderer.prototype.remove = function(shape) {
  shape.parentNode.removeChild(shape);
};


SVGRenderer.prototype.move = function(shape, left, top) {
  if (shape.tagName == 'line') {
    var deltaX = shape.getBBox().width;
    var deltaY = shape.getBBox().height;
    shape.setAttributeNS(null, 'x1', left);
    shape.setAttributeNS(null, 'y1', top);
    shape.setAttributeNS(null, 'x2', left + deltaX);
    shape.setAttributeNS(null, 'y2', top + deltaY);
  }
  else if (shape.tagName == 'ellipse') {
    shape.setAttributeNS(null, 'cx', left + (shape.getBBox().width / 2));
    shape.setAttributeNS(null, 'cy', top + (shape.getBBox().height / 2));
  }
  else {
    shape.setAttributeNS(null, 'x', left);
    shape.setAttributeNS(null, 'y', top);
  }
};


SVGRenderer.prototype.track = function(shape) {
  // TODO
};


SVGRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {
  var deltaX = toX - fromX;
  var deltaY = toY - fromY;

  if (shape.tagName == 'line') {
    shape.setAttributeNS(null, 'x2', toX);
    shape.setAttributeNS(null, 'y2', toY);
  }
  else if (shape.tagName == 'ellipse') {
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (-deltaX / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (deltaX / 2) + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (-deltaY / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (deltaY / 2) + 'px');
    }
  }
  else { 
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'x', toX + 'px');
      shape.setAttributeNS(null, 'width', -deltaX + 'px');
    }
    else {
      shape.setAttributeNS(null, 'width', deltaX + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'y', toY + 'px');
      shape.setAttributeNS(null, 'height', -deltaY + 'px');
    }
    else {
      shape.setAttributeNS(null, 'height', deltaY + 'px');
    }
  }
};


SVGRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '')
        shape.setAttributeNS(null, 'fill', value);
      else
        shape.setAttributeNS(null, 'fill', 'none');
    }
    else if (cmd == 'linecolor') {
      if (value != '')
        shape.setAttributeNS(null, 'stroke', value);
      else
        shape.setAttributeNS(null, 'stroke', 'none');
    }
    else if (cmd == 'linewidth') {
      shape.setAttributeNS(null, 'stroke-width', parseInt(value) + 'px');
    }
  }
};


SVGRenderer.prototype.queryCommand = function(shape, cmd)
{
  var result = '';
  
  if (shape != null) {
    if (cmd == 'fillcolor') {
      result = shape.getAttributeNS(null, 'fill');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linecolor') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linewidth') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
      else
        result = shape.getAttributeNS(null, 'stroke-width');
    }
  }
  
  return result;
};


SVGRenderer.prototype.showTracker = function(shape) {
  var box = shape.getBBox();

  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  var svgNamespace = 'http://www.w3.org/2000/svg';

  tracker = document.createElementNS(svgNamespace, 'rect');
  tracker.setAttributeNS(null, 'id', 'tracker');
  tracker.setAttributeNS(null, 'x', box.x - 10);
  tracker.setAttributeNS(null, 'y', box.y - 10);
  tracker.setAttributeNS(null, 'width', box.width + 20);
  tracker.setAttributeNS(null, 'height', box.height + 20);
  tracker.setAttributeNS(null, 'fill', 'none');
  tracker.setAttributeNS(null, 'stroke', 'blue');
  tracker.setAttributeNS(null, 'stroke-width', '1');
  this.svgRoot.appendChild(tracker);
};


SVGRenderer.prototype.getMarkup = function() {
  return this.container.innerHTML;
};

/*----------------------------------------------------------------------------
 VMLRENDERER 1.0
 VML Renderer For RichDraw
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of VML based renderer.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies:
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function VMLRenderer() {
	this.base = AbstractRenderer;
}


VMLRenderer.prototype = new AbstractRenderer;


VMLRenderer.prototype.init = function(elem) {
  this.container = elem;
  
  this.container.style.overflow = 'hidden';
  
	// Add VML includes and namespace
  elem.ownerDocument.namespaces.add("v", "urn:schemas-microsoft-com:vml");

	var style = elem.ownerDocument.createStyleSheet();
	style.addRule('v\\:*', "behavior: url(#default#VML);");
};


VMLRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  rect['x'] = shape.offsetLeft;
  rect['y'] = shape.offsetTop;
  rect['width'] =  shape.offsetWidth;
  rect['height'] = shape.offsetHeight;
  return rect;
};


VMLRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {
  var vml;
  if (shape == 'rect') {
    vml = this.container.ownerDocument.createElement('v:rect');
  }
  else if (shape == 'roundrect') {
    vml = this.container.ownerDocument.createElement('v:roundrect');
  }
  else if (shape == 'ellipse') {
    vml = this.container.ownerDocument.createElement('v:oval');
  }
  else if (shape == 'circ') {
	vml = this.container.ownerDocument.createElement('v:oval');
  }
  else if (shape == 'line') {
    vml = this.container.ownerDocument.createElement('v:line');
  }

  if (shape != 'line') {  
    vml.style.position = 'absolute';
    vml.style.left = left;
    vml.style.top = top;
    vml.style.width = width;
    vml.style.height = height;

    if (fillColor != '') {
      vml.setAttribute('filled', 'true');
      vml.setAttribute('fillcolor', fillColor);
    }
    else {
      vml.setAttribute('filled', 'false');
    }
  }
  else {
    vml.style.position = 'absolute';
    vml.setAttribute('from', left + 'px,' + top + 'px');
    vml.setAttribute('to', width + 'px,' + height + 'px');
  }

  if (lineColor != '') {
    vml.setAttribute('stroked', 'true');
    vml.setAttribute('strokecolor', lineColor);
    vml.setAttribute('strokeweight', lineWidth);
  }
  else {
    vml.setAttribute('stroked', 'false');
  }

  this.container.appendChild(vml);
  return vml;
};


VMLRenderer.prototype.remove = function(shape) {
  shape.removeNode(true);
};


VMLRenderer.prototype.move = function(shape, left, top) {
  if (shape.tagName == 'line') {
    shape.style.marginLeft = left;
    shape.style.marginTop = top;
  }
  else {
    shape.style.left = left;
    shape.style.top = top;
  }
};


VMLRenderer.prototype.track = function(shape) {
  // TODO
};


VMLRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {
  shape.setAttribute('to', toX + 'px,' + toY + 'px');
  /*
  var deltaX = toX - fromX;
  var deltaY = toY - fromY;
  if (shape.tagName == 'line') {
	shape.setAttribute('to', toX + 'px,' + toY + 'px');
  }
  else {
    if (deltaX < 0) {
      shape.style.left = toX + 'px';
      shape.style.width = -deltaX + 'px';
    }
    else {
      shape.style.width = deltaX + 'px';
    } 
    if (deltaY < 0) {
      shape.style.top = toY + 'px';
      shape.style.height = -deltaY + 'px';
    }
    else {
      shape.style.height = deltaY + 'px';
    }
  }
  */
};

VMLRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '') {
        shape.filled = 'true';
        shape.fillcolor = value;
      }
      else {
        shape.filled = 'false';
        shape.fillcolor = '';
      }
    }
    else if (cmd == 'linecolor') {
      if (value != '') {
        shape.stroked = 'true';
        shape.strokecolor = value;
      }
      else {
        shape.stroked = 'false';
        shape.strokecolor = '';
      }
    }
    else if (cmd == 'linewidth') {
      shape.strokeweight = parseInt(value) + 'px';
    }
  }
};


VMLRenderer.prototype.queryCommand = function(shape, cmd)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (shape.filled == 'false')
        return '';
      else
        return shape.fillcolor;
    }
    else if (cmd == 'linecolor') {
      if (shape.stroked == 'false')
        return '';
      else
        return shape.strokecolor;
    }
    else if (cmd == 'linewidth') {
      if (shape.stroked == 'false') {
        return '';
      }
      else {
        // VML always transforms the pixels to points, so we have to convert them back
        return (parseFloat(shape.strokeweight) * (screen.logicalXDPI / 72)) + 'px';
      }
    }
  }
};


VMLRenderer.prototype.showTracker = function(shape) {
  var box = this.bounds(shape);

  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  tracker = this.container.ownerDocument.createElement('v:rect');
  tracker.id = 'tracker';
  tracker.style.position = 'absolute';
  tracker.style.left = box.x - 10;
  tracker.style.top = box.y - 10;
  tracker.style.width = box.width + 20;
  tracker.style.height = box.height + 20;
  tracker.setAttribute('filled', 'false');
  tracker.setAttribute('stroked', 'true');
  tracker.setAttribute('strokecolor', 'blue');
  tracker.setAttribute('strokeweight', '1px');
  this.container.appendChild(tracker);
};


VMLRenderer.prototype.getMarkup = function() {
  return this.container.innerHTML;
};


/*
Title: Gadgets (objetos marginais do mapa)

File: i3geo/classesjs/classe_gadgets.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
/*
Class: i3GEO.gadgets

Inclui elementos especiais no mapa

Os elementos s�o opcionais e adicionam funcionalidades ao mapa.
*/
i3GEO.gadgets = {
	/*
	Variable: PARAMETROS
	
	Parametros de inicializa��o dos gadgets.
	
	Type:
	{JSON}
	*/	
	PARAMETROS: {
		"mostraCoordenadasUTM":
		{idhtml:"mostraUTM"},
		"mostraCoordenadasGEO":
		{idhtml:"localizarxy"},
		"mostraEscalaNumerica":
		{idhtml:"escala"},
		"mostraEscalaGrafica":
		{idhtml:"escalaGrafica"},
		"mostraBuscaRapida":
		{idhtml:"buscaRapida"},
		"mostraVisual":
		{idhtml:"visual"},
		"mostraQuadros":
		{idhtml:"lugarquadros"},
		"mostraHistoricoZoom":
		{idhtml:"historicozoom"},
		"mostraMenuSuspenso":
		{idhtml:"menus"}
	},
	/*
	Function: mostraCoordenadasUTM
	
	Obt�m as coordenadas UTM da posi��o do mouse sobre o mapa.
	
	As coordenadas s�o obtidas por meio de uma chamada AJAX.
	
	Para o funcionamento correto � necess�rio incluir essa fun��o no evento que identifica quando o mouse
	est� estacionado sobre o mapa. Por default isso j� � feito pelo i3Geo.
	
	Se voc� n�o quer essa fun��o no mapa, elimine o elemento HTML existente no mapa que contenha o 
	id definido em i3GEO.gadgets.PARAMETROS (mostraUTM) ou altere a vari�vel i3GEO.eventos.MOUSEPARADO
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS

	Return:
	
	{JSON} - objeto com x e y
	*/
	mostraCoordenadasUTM: function(id){
		if(arguments.length == 0 || id == "")
		{var id = i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml;}
		else
		{i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml = id;}
		var temp = $i(id);
		if (!temp){return;}
		atualizaCoordenadasUTM = function()
		{
			//if($i(i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml).style.display == "block"){return;}
			if(objposicaocursor.imgx < 10 || objposicaocursor.imgy < 10)
			{return;}
			var tempUtm = function(retorno){
				setTimeout("$i(i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml).style.display='none';",3400);
				var temp = $i(i3GEO.gadgets.PARAMETROS.mostraCoordenadasUTM.idhtml);
				if(retorno.data){
					temp.style.display="block";
					temp.innerHTML = "UTM: x="+retorno.data.x+" y="+retorno.data.y+" zona="+retorno.data.zona+" datum="+retorno.data.datum;
					//return (retorno.data);
				}
			};
			i3GEO.php.geo2utm(tempUtm,objposicaocursor.ddx,objposicaocursor.ddy);
		};
		if(i3GEO.eventos.MOUSEPARADO.toString().search("atualizaCoordenadasUTM()") < 0)
		{i3GEO.eventos.MOUSEPARADO.push("atualizaCoordenadasUTM()");}		
	},
	/*
	Function: mostraCoordenadasGEO
	
	Obt�m as coordenadas Geogr�ficas da posi��o do mouse sobre o mapa.
		
	Se voc� n�o quer essa fun��o no mapa, elimine o elemento HTML existente no mapa que contenha o 
	id definido em i3GEO.gadgets.PARAMETROS (localizarxy)
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS
	*/	
	mostraCoordenadasGEO: function(id){
		try{
			//
			//ativa o evento que preenche os campos de coordenadas
			//
			if(arguments.length == 0)
			{var id = i3GEO.gadgets.PARAMETROS.mostraCoordenadasGEO.idhtml;}
			else
			{i3GEO.gadgets.PARAMETROS.mostraCoordenadasGEO.idhtml = id;}
			if($i(id)){
				if(!$i("xm")){
					var ins = "<table style='text-align:center'><tr>";
					ins += "<td>localiza X:&nbsp;</td>";
					ins += "<td>"+$inputText(id,"315","xg","grau","3","-00")+"&nbsp;</td>";
					ins += "<td>"+$inputText("","","xm","minuto","3","00")+"&nbsp;</td>";
					ins += "<td>"+$inputText("","","xs","segundo","5","00.00")+"&nbsp;</td>";
					ins += "<td>Y:"+$inputText("","","yg","grau","3","-00")+"&nbsp;</td>";
					ins += "<td>"+$inputText("","","ym","minuto","3","00")+"&nbsp;</td>";
					ins += "<td>"+$inputText("","","ys","segundo","5","00.00")+"</td>";
					var temp = 'var xxx = i3GEO.calculo.dms2dd($i("xg").value,$i("xm").value,$i("xs").value);';
					temp +=	'var yyy = i3GEO.calculo.dms2dd($i("yg").value,$i("ym").value,$i("ys").value);';
					temp +=	'i3GEO.navega.zoomponto(i3GEO.configura.locaplic,i3GEO.configura.sid,xxx,yyy);';		
					ins += "<td><img  class='tic' title='zoom' onclick='"+temp+"' src='"+i3GEO.util.$im("branco.gif")+"' id=procurarxy /></td>";
					ins += "</tr></table>";
					$i(id).innerHTML = ins;
					$i3geo_temp_xg = $i("xg");
					$i3geo_temp_xm = $i("xm");
					$i3geo_temp_xs = $i("xs");
					$i3geo_temp_yg = $i("yg");
					$i3geo_temp_ym = $i("ym");
					$i3geo_temp_ys = $i("ys");
					atualizaLocalizarxy = function(){
						try{
							var x = objposicaocursor.dmsx.split(" ");
							var y = objposicaocursor.dmsy.split(" ");
							$i3geo_temp_xg.value = x[0];
							$i3geo_temp_xm.value = x[1];
							$i3geo_temp_xs.value = x[2];
							$i3geo_temp_yg.value = y[0];
							$i3geo_temp_ym.value = y[1];
							$i3geo_temp_ys.value = y[2];
						}
						catch(m){};
					};
					if($i(i3GEO.interface.IDMAPA))
					{YAHOO.util.Event.addListener($i(i3GEO.interface.IDMAPA),"mousemove", atualizaLocalizarxy);}
				}
			}
		}
		catch(e){alert("mostraCoordenadasGeo: "+e.description);}
	},
	/*
	Function: mostraEscalaNumerica
	
	Mostra no mapa a escala num�rica.
	
	A escala num�rica pode ser alterada pelo usu�rio digitando-se a nova escala.
		
	Se voc� n�o quer essa fun��o no mapa, elimine o elemento HTML existente no mapa que contenha o 
	id definido em i3GEO.gadgets.PARAMETROS
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS
	*/		
	mostraEscalaNumerica: function(id){
		if(arguments.length == 0)
		{var id = i3GEO.gadgets.PARAMETROS.mostraEscalaNumerica.idhtml;}
		if($i(id)){
			atualizaEscalaNumerica = function(escala){
				var e = $i("i3geo_escalanum");  
				if(!e){
					i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaNumerica()");
					return;
				}
				if(arguments.length == 1)
				e.value = escala;
				else
				e.value = parseInt(i3GEO.parametros.mapscale);
			};
			if(!$i("i3geo_escalanum")){
				var i = $inputText(id,"138","i3geo_escalanum",$trad("d10"),"19",parseInt(i3GEO.parametros.mapscale));
				var ins = "<table><tr><td>1:"+i;
				var temp = 'var nova = document.getElementById("i3geo_escalanum").value;';
				temp += 'i3GEO.navega.aplicaEscala(i3GEO.configura.locaplic,i3GEO.configura.sid,nova);';
				ins += "</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='"+temp+"' /></td></tr></table>";
				$i(id).innerHTML = ins;
			}
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaNumerica()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaNumerica()");}		
		}
	},
	/*
	Function: mostraEscalaGrafica
	
	Mostra no mapa a escala grafica como um elemento fora do mapa.
		
	Se voc� n�o quer essa fun��o no mapa, elimine o elemento HTML existente no mapa que contenha o 
	id definido em i3GEO.gadgets.PARAMETROS(escala)
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS
	*/		
	mostraEscalaGrafica: function(id){
		if(arguments.length == 0)
		{var id = i3GEO.gadgets.PARAMETROS.mostraEscalaGrafica.idhtml;}
		if($i(id)){
			atualizaEscalaGrafica = function(){
				var e = $i("imagemEscalaGrafica");  
				if(!e){
					i3GEO.eventos.NAVEGAMAPA.remove("atualizaEscalaGrafica()");
					return;
				}
				var temp = function(retorno){
				
					eval(retorno.data);
					i3GEO.gadgets.quadros.grava("escala",scaimagem);
					$i("imagemEscalaGrafica").src = scaimagem;
				};
				i3GEO.php.escalagrafica(temp);
			};
			if(!$i("imagemEscalaGrafica")){
				
				var ins = "<img class='menuarrow' src=\""+g_localimg+"/branco.gif\" title='op&ccedil;&otilde;es' onclick='i3GEO.mapa.dialogo.opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />"
				$i(id).innerHTML = ins;
			}
			atualizaEscalaGrafica();
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("atualizaEscalaGrafica()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("atualizaEscalaGrafica()");}		
		}
	},
	/*
	Function: mostraBuscaRapida
	
	Mostra a op��o de busca r�pida de lugares por palavra digitada.
		
	Se voc� n�o quer essa fun��o no mapa, elimine o elemento HTML existente no mapa que contenha o 
	id definido em i3GEO.gadgets.PARAMETROS (buscaRapida)
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS
	*/	
	mostraBuscaRapida: function(id){
		if(arguments.length == 0)
		{var id = i3GEO.gadgets.PARAMETROS.mostraBuscaRapida.idhtml;}
		if($i(id)){
			i3geo_buscaRapida = function(){
				if ($i("valorBuscaRapida").value == "")
				{alert ("Digite uma palavra para busca!");return;}
				wdocaf("300px","280px",i3GEO.configura.locaplic+"/ferramentas/buscarapida/index.htm","","","Busca rapida");
			}
			var i = $inputText(id,"180","valorBuscaRapida","digite o texto para busca","30",$trad("o2"));
			var ins = "<table><tr><td>"+i;
			ins += "</td><td><img src='"+i3GEO.util.$im("branco.gif")+"' class='tic' onclick='i3geo_buscaRapida()' /></td></tr></table>";
			$i(id).innerHTML = ins;
		}	
	},
	/*
	Function: mostraHistoricoZoom
	
	Mostra na barra de zoom os �cones que controlam a visualiza��o do hist�rico da navega��o sobre o mapa
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS
	*/
	mostraHistoricoZoom: function(id){
		if(arguments.length == 0)
		{var id = i3GEO.gadgets.PARAMETROS.mostraHistoricoZoom.idhtml;}
		if($i(id)){
			marcadorZoom = "";
			var ins = "<table style='text-align:center;position:relative;left:";
			if(navm){ins += "0px;'>";}
			else
			{ins += "6px;'>";}
			ins += "<tr><td><img  id='i3geo_zoomanterior' class='zoomAnterior' title='anterior' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";
			ins += "<td>&nbsp;</td>";
			ins += "<td><img  id='i3geo_zoomproximo' class='zoomProximo' title='proximo' src='"+i3GEO.util.$im("branco.gif")+"'  /></td>";
			ins += "</tr></table>";
			$i(id).innerHTML = ins;
			$i("i3geo_zoomanterior").onclick = function(){
				if(marcadorZoom == ""){marcadorZoom = i3GEO.gadgets.quadros.quadroatual;}
				if(i3GEO.gadgets.quadros.quadroatual > 0){
					marcadorZoom = marcadorZoom - 1;
					if(marcadorZoom >= 0)
					i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[marcadorZoom].extensao);
					else
					marcadorZoom = 0;
				}
			};
			$i("i3geo_zoomproximo").onclick = function(){
				if(marcadorZoom == ""){marcadorZoom = i3GEO.gadgets.quadros.quadroatual;}
				if(i3GEO.gadgets.quadros.quadroatual < i3GEO.gadgets.quadros.quadrosfilme.length){
					marcadorZoom = marcadorZoom + 1
					if(marcadorZoom < i3GEO.gadgets.quadros.quadrosfilme.length)
					i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[marcadorZoom].extensao);
				}
				else
				marcadorZoom = i3GEO.gadgets.quadros.quadrosfilme.length;
			};
		}
	},
	/*
	Class: i3GEO.gadgets.visual
	
	Gera os �cones e controla as op��es de modifica��o do visual do mapa.
	
	O visual consiste na defini��o dos �cones utilizados no mapa. O visual pode
	ser modificado na inicializa��o ou ent�o escolhido pelo usu�rio.
	
	Os visuais dispon�veis s�o definidos no servidor e consistem em diret�rios localizados
	em i3geo/imagens/visual. A lista de visuais dispon�veis � obtida na inicializa��o do i3geo.
	
	Os �cones para mudan�a do visual s�o inclu�dos no elemento HTML definido em
	i3geo.gadgets.PARAMETROS.visual
	*/
	visual: {
		/*
		Function: inicia
		
		Constr�i os �cones de escolha do visual.
		
		Parameters:
		
		id {String} - id do elemento que receber� os �cones (opcional)
		*/
		inicia: function(id){
			if(arguments.length == 0)
			{var id = i3GEO.gadgets.PARAMETROS.mostraVisual.idhtml;}
			if($i(id)){
				if (i3GEO.parametros.listavisual != ""){
					var l = i3GEO.parametros.listavisual.split(",");
					var visuais = "";
					var li = l.length-1;
					if(li >= 0){
						do{visuais += "<img title='"+l[li]+"' style=cursor:pointer onclick='i3GEO.gadgets.visual.troca(\""+l[li]+"\")' src='"+i3GEO.configura.locaplic+"/imagens/visual/"+l[li]+".png' />&nbsp;";}
						while(li--)
					}
					$i(id).innerHTML = visuais;
					$i(id).onmouseover = function(){i3GEO.ajuda.mostraJanela($trad("d26"));};
					$i(id).onmouseout = function(){i3GEO.ajuda.mostraJanela("");};
				}		
			}
		},
		/*
		Function: troca
		
		Troca o visual atual. A lista de visuais dispon�veis � obtida em i3GEO.parametros.listavisual
		
		Parameters:
		
		visual {String} - nome do visual que ser� utilizado.
		*/
		troca: function(visual){
			var monta = function(retorno){
				try{
					i3GEO.janela.fechaAguarde("i3GEO.atualiza");
					//
					//pega todas as imagens da interface
					//
					var imgstemp = retorno.data.arquivos;
					var imgs = new Array();
					var i = imgstemp.length-1;
					if(i >= 0){
						do{
							var temp = imgstemp[i].split(".");
							if ((temp[1] == "png") || (temp[1] == "gif") || (temp[1] == "jpg"))
							{imgs.push(imgstemp[i]);}
						}
						while(i--)
					}
					var elementos = document.getElementsByTagName("img");
					var elt = elementos.length;
					var caminho = i3GEO.configura.locaplic+"/imagens/visual/"+visual+"/";
					//faz a troca em imagens
					var j = imgs.length-1;
					if(j >= 0){
						do{
							for (var i=0;i < elt; i++){
								if ((elementos[i].src.search("branco") > -1) && ((elementos[i].className != "") || (elementos[i].id != "")))
								{elementos[i].src = caminho+"branco.gif";}
								if (elementos[i].src.search("visual") > -1)
								{elementos[i].style.backgroundImage = "url('"+caminho+imgs[j]+"')";}
							}
						}
						while(j--)
					}	
					//faz a troca em ids
					var j = imgs.length-1;
					if(j >= 0){
						do{
							var busca = imgs[j].split(".");
							if ($i(busca[0]))
							{$i(busca[0]).src = caminho+imgs[j];}
						}
						while(j--)
					}
					//faz a troca em bg
					var elementos = new Array("barraSuperior","barraInferior","vertMaisZoom","vertMenosZoom","foldermapa","foldermapa1","tic");
					var i = elementos.length-1;
					if(i >= 0){
						do{
							if ($i(elementos[i])){
								var nimagem = $i(elementos[i]).style.backgroundImage.replace(i3GEO.configura.visual,visual);
								$i(elementos[i]).style.backgroundImage = nimagem;
								//$i(elementos[i]).style.backgroundImage = "url('"+caminho+"sprite.png')";
							}
						}
						while(i--)
					}
					i3GEO.configura.visual = visual;
				}
				catch(e){alert("Ocorreu um erro. mudaVisual"+e);i3GEO.janela.fechaAguarde("i3GEO.atualiza");}
			};
			//
			//pega a lista de imagens no diret�rio do i3geo correspondente ao visual selecionado
			//
			i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));
			i3GEO.php.listaarquivos(monta,"imagens/visual/"+visual);
		}
	},
	/*
	Class: i3GEO.gadgets.quadros
	
	Cria e controla o funcionamento dos quadros de anima��o.
	
	Os quadros s�o mostrados no mapa como uma sequ�ncia de quadros de um filme.
	As imagens que s�o produzidas no mapa s�o armazenadas em cada quadro, permitindo sua recupera��o.
	
	Os quadros armazenam tamb�m a extens�o geogr�fica de cada imagem, permitindo sua recupera��o.
	*/
	quadros: {
		/*
		Variable: quadrosfilme
		
		Armazena cada quadro individualmente com as suas propriedades
		
		Type:
		{Array}
		*/
		quadrosfilme: new Array(),
		/*
		Variable: quadroatual
		
		Valor do �ndice do quadro atual
		
		Type:
		{Integer}
		*/
		quadroatual: 0,
		/*
		Function: inicia
		
		Gera os quadros e inicializa os objetos para armazenar as imagens
		
		Parameters:
		
		qs {Integer} - n�mero de quadros
		
		lugarquadros {String} - id do elemento HTML que receber� os quadros (opcional)
		*/
		inicia: function(qs,lugarquadros){
			if(arguments.length == 1)
			{var lugarquadros = i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml;}
			var q = "<table class=tablefilme ><tr><td><div class='menuarrow'  title='op&ccedil;&otilde;es' onclick='i3GEO.gadgets.quadros.opcoes(this)' style='cursor:pointer'></div></td>";
			for (var i = 0; i < qs; i++){
				q += "<td><img class='quadro' src=\""+i3GEO.configura.locaplic+"/imagens/branco.gif\" id='quadro"+i+"' ";
				q += "onmouseover='i3GEO.gadgets.quadros.trocaMapa(this.id);i3GEO.ajuda.mostraJanela(\"Clique para aplicar a extens�o geogr�fica do quadro ao mapa\")' ";
				q += "onmouseout=\"javascript:i3GEO.ajuda.mostraJanela('')\" ";
				q += "onclick='i3GEO.gadgets.quadros.zoom(this.id)' /></td>";
				i3GEO.gadgets.quadros.quadrosfilme[i] = new Array();
			}
			q += "</tr></table>";
			if($i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml)){
				document.getElementById(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml).innerHTML = q;
				$i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml).onmouseout = function(){
					if($i("imgClone")){
						$i("imgClone").style.display = "none";
						$i("img").style.display = "block";
					}
				};
			}
			i3GEO.gadgets.quadros.quadroatual = 0;
			if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.gadgets.quadros.avanca()") < 0)
			{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.gadgets.quadros.avanca()");}
		},
		/*
		Function: grava

		Armazena um determinado valor em uma determinada caracter�stica de um objeto quadro.

		Parameters:

		variavel {String} - par�metro do objeto quadro.

		valor - {String} valor que ser� aplicado.
		*/
		grava: function(variavel,valor){
			eval("i3GEO.gadgets.quadros.quadrosfilme["+i3GEO.gadgets.quadros.quadroatual+"]."+variavel+" = '"+valor+"'");
			if($i(i3GEO.gadgets.PARAMETROS.mostraQuadros.idhtml))
			{$i("quadro"+i3GEO.gadgets.quadros.quadroatual).className = "quadro1";}
		},
		/*
		Function: avanca

		Avan�a um quadro na lista de quadros, mudando a imagem utilizada na sua representa��o.
		*/		
		avanca: function(){
			try{
				var nquadros = i3GEO.gadgets.quadros.quadrosfilme.length;
				if ((nquadros - 1) == (i3GEO.gadgets.quadros.quadroatual))
				{i3GEO.gadgets.quadros.inicia(nquadros);}
				else{i3GEO.gadgets.quadros.quadroatual++;}
			}
			catch(e){var e = "";}		
		},
		/*
		Function: zoom
		
		Aplica o zoom no mapa para a extens�o geogr�fica armazenada em um quadro
		
		Parameter:
		
		quadro {String} - id do quadro que ser� utilizado
		*/
		zoom: function(quadro){
			var indice = quadro.replace("quadro","");
			i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",i3GEO.gadgets.quadros.quadrosfilme[indice].extensao)
		},
		/*
		Function: trocaMapa
		
		Troca a imagem do mapa atual pela que estiver armazenada em quadro
		
		A imagem mostrada no mapa � um clone do mapa atual, preservando o mapa.
		
		Parameters:
		
		quadro {String} - id do quadro que ter� a imagem recuperada
		*/
		trocaMapa: function(quadro){
			var indice = quadro.replace("quadro","");
			var i = $i("img");
			var c = $i("imgClone");
			if(i){
				if(!c){
					var iclone=document.createElement('IMG');
					iclone.style.position = "relative";
					iclone.id = "imgClone";
					iclone.style.border="1px solid blue";
					i.parentNode.appendChild(iclone);
					iclone.src = corpo.src;
					iclone.style.width = i3GEO.parametros.w;
					iclone.style.heigth = i3GEO.parametros.h;
					iclone.style.top = corpo.style.top;
					iclone.style.left = corpo.style.left;		
				}
				try{
					if(!i3GEO.gadgets.quadros.quadrosfilme[indice].imagem){return;}
					c.src = i3GEO.gadgets.quadros.quadrosfilme[indice].imagem;
					c.style.display = "block";
					i.style.display = "none";
				}
				catch(e){var e = "";}
			}
		},
		/*
		Function: opcoes
		
		Abre a janela de op��es que controla as caracter�sticas do quado e permite disparar a anima��o.
		
		Parameters:
		
		obj {Object} - objeto clicado
		*/
		opcoes: function(obj){
			if (i3GEO.parametros.utilizacgi == "sim"){
				i3GEO.parametros.utilizacgi = "nao";
				var volta = function(){
					alert("Armazenamento de imagens ativado. As proximas imagens ficarao disponiveis");
				};
				i3GEO.php.desativacgi(volta);
			}
			else
			{i3GEO.janela.cria("150px","150px",i3GEO.configura.locaplic+"/ferramentas/opcoes_quadros/index.htm","center","","Quadros");}
		},
		/*
		Function: anima
		
		Mostra as imagens armazenadas nos quadros em uma sequ�ncia animada
		
		Parameters:
		
		Qanima {Integer} - quadro atual na sequ�ncia de anima��o
		
		t {Numeric} - tempo em milisegundos entre cada quadro
		*/
		anima: function(Qanima,t){
			if(arguments.length == 0){
				Qanima = 0;
				var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				var t = doc.getElementById("tempoanima").value;
			}
			if(Qanima > i3GEO.gadgets.quadros.quadrosfilme.length){
				clearTimeout(tAnima);
				$i("imgClone").style.display = "none";	
				$i("img").style.display="block";
				return;
			}
			//$i("img").src = preLoad[janima].src;
			//$i("f"+janima).className = "quadro1";
			i3GEO.gadgets.quadros.trocaMapa("quadro"+Qanima);
			Qanima++;
			tAnima = setTimeout('i3GEO.gadgets.quadros.anima('+Qanima+','+t+')',t);
		},
		/*
		Function: listaImagens
		
		Lista as imagens armazenadas em uma nova p�gina no navegador
		*/
		listaImagens: function(){
			if (i3GEO.parametros.utilizacgi == "sim"){
				i3GEO.parametros.utilizacgi = "nao";
				var volta = function()
				{alert("Armazenamento de imagens ativado. As proximas imagens ficarao disponiveis");};
				i3GEO.php.desativacgi(volta);
			}
			else{
				var wi = window.open("");//"",null,"width=550,height=650,resizable=yes,scrollbars=yes");
				//pega os dados do objeto quadrosfilme e escreve na nova janela
				var mensagem = "<br><b>N&atilde;o existem imagens guardadas.";
				wi.document.write("<html><body><p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Click com o bot&atilde;o da direita do mouse sobre a imagem para fazer o download<br>");	
				var i = i3GEO.gadgets.quadros.quadrosfilme.length-1;
				if(i >= 0){
					do{
						if (i3GEO.gadgets.quadros.quadrosfilme[i].imagem){
							wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Imagem: "+i+"<br>");
							wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Abrang�ncia: "+i3GEO.gadgets.quadros.quadrosfilme[i].extensao+"<br>");
							wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].imagem+"' />");
							wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].referencia+"' />");
							wi.document.write("<img src='"+i3GEO.gadgets.quadros.quadrosfilme[i].legenda+"' />");
						}
						i--
					}
					while(i>=0)
				}
				wi.document.write("<br>Fim</body></html>");
			}
		}
	},
	/*
	Function: mostraMenuSuspenso
	
	Mostra o menu suspenso com op��es extras de an�lise, ajuda, etc
	
	O objeto YAHOO.widget.MenuBar resultante pode ser obtido na vari�vel i3GEOoMenuBar

	O conte�do do menu � baseado na vari�vel i3GEO.configura.oMenuData
	
	Parameters:
	
	id {String} - id do elemento HTML que receber� o resultado. Esse id por default � obtido de
	i3GEO.gadgets.PARAMETROS
	*/
	mostraMenuSuspenso: function(id){
		if(arguments.length == 0)
		{var id = i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso.idhtml;}
		else
		{i3GEO.gadgets.PARAMETROS.mostraMenuSuspenso.idhtml = id;}
		var objid = $i(id);
		if(objid){
			objid.className="yuimenubar";
			if($i("contemMenu")){
				$i("contemMenu").className="yui-navset";
			}
			if(i3GEO.configura.oMenuData.ajudas){
				var ins = "";
				ins += '<div class="bd" style="display:block;align:right;border: 0px solid white;z-index:6000;line-height:1.4" >';
				ins += '<ul class="first-of-type" style="display:block;border:0px solid white;top:10px;">';
 				var sobe = "";
 				if(navn){var sobe = "line-height:0px;";}
				ins += '<li class="yuimenubaritem" style="padding-bottom:5px" ><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menuajuda" >&nbsp;&nbsp;'+$trad("s1")+'</a></li>';
				ins += '<li class="yuimenubaritem" style="padding-bottom:5px"><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menuanalise" >&nbsp;&nbsp;'+$trad("s2")+'</a></li>';
 				ins += '<li class="yuimenubaritem" style="padding-bottom:5px"><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menujanelas" >&nbsp;&nbsp;'+$trad("s3")+'</a></li>';
 				ins += '<li class="yuimenubaritem" style="padding-bottom:5px"><a style="border: 0px solid white;" href="#" class="yuimenubaritemlabel" id="menuarquivos" >&nbsp;&nbsp;'+$trad("s4")+'</a></li>';
 				ins += '</ul>'; 
 				ins += '</div>';
 				objid.innerHTML=ins;
 			}
			var onMenuBarBeforeRender = function (p_sType, p_sArgs){
				if(i3GEO.parametros.w >= 500)
				{var conta = 0;}
				else
				{var conta = 0;}
				for(var nomeMenu in i3GEO.configura.oMenuData){
					i3GEOoMenuBar.getItem(conta).cfg.setProperty('submenu',{id:nomeMenu,itemdata: i3GEO.configura.oMenuData[nomeMenu]});
					var conta=conta+1;
				}
			}
 			i3GEOoMenuBar=new YAHOO.widget.MenuBar(id,{autosubmenudisplay: true, showdelay: 100, hidedelay: 250, lazyload: false});
 			i3GEOoMenuBar.beforeRenderEvent.subscribe(onMenuBarBeforeRender);
 			i3GEOoMenuBar.render();
			//
			//corrige problemas de estilo
			//
			var temp = objid.style;
			temp.backgroundPosition = "0px -5px";
			temp.border = "1px solid white";
		}
	}
};
//YAHOO.log("carregou classe gadgets", "Classes i3geo");

$i = function(id){return document.getElementById(id);};
if(typeof YAHOO=="undefined"){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang={isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice)&&!A.hasOwnProperty(B.length);}return false;},isBoolean:function(A){return typeof A==="boolean";},isFunction:function(A){return typeof A==="function";},isNull:function(A){return A===null;},isNumber:function(A){return typeof A==="number"&&isFinite(A);},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false;},isString:function(A){return typeof A==="string";},isUndefined:function(A){return typeof A==="undefined";},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B);}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B];},_IEEnumFix:function(C,B){if(YAHOO.env.ua.ie){var E=["toString","valueOf"],A;for(A=0;A<E.length;A=A+1){var F=E[A],D=B[F];if(YAHOO.lang.isFunction(D)&&D!=Object.prototype[F]){C[F]=D;}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E;}if(C){for(var A in C){D.prototype[A]=C[A];}YAHOO.lang._IEEnumFix(D.prototype,C);}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.");}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]];}}else{for(F in D){if(B||!E[F]){E[F]=D[F];}}YAHOO.lang._IEEnumFix(E,D);}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.");}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B]);}YAHOO.lang.augmentObject.apply(this,A);},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)){return A+"";}else{if(A instanceof Date||("nodeType" in A&&"tagName" in A)){return A;}else{if(C.isFunction(A)){return B;}}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}if(I.length>1){I.pop();}I.push("]");}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}}if(I.length>1){I.pop();}I.push("}");}return I.join("");},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break;}F=Q.indexOf(O,G);if(G+1>=F){break;}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E);}N=B[M];if(J){N=J(M,N,P);}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10));}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4);}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10));}else{N=N.toString();}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C;}}Q=Q.substring(0,G)+N+Q.substring(F+1);}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g");}return Q;},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"");}catch(B){return A;}},merge:function(){var C={},A=arguments,B;for(B=0;B<A.length;B=B+1){YAHOO.lang.augmentObject(C,A[B],true);}return C;},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.1",build:"541"});
if(typeof YAHOO=="undefined"){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang={isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice)&&!A.hasOwnProperty(B.length);}return false;},isBoolean:function(A){return typeof A==="boolean";},isFunction:function(A){return typeof A==="function";},isNull:function(A){return A===null;},isNumber:function(A){return typeof A==="number"&&isFinite(A);},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false;},isString:function(A){return typeof A==="string";},isUndefined:function(A){return typeof A==="undefined";},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B);}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B];},_IEEnumFix:function(C,B){if(YAHOO.env.ua.ie){var E=["toString","valueOf"],A;for(A=0;A<E.length;A=A+1){var F=E[A],D=B[F];if(YAHOO.lang.isFunction(D)&&D!=Object.prototype[F]){C[F]=D;}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E;}if(C){for(var A in C){D.prototype[A]=C[A];}YAHOO.lang._IEEnumFix(D.prototype,C);}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.");}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]];}}else{for(F in D){if(B||!E[F]){E[F]=D[F];}}YAHOO.lang._IEEnumFix(E,D);}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.");}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B]);}YAHOO.lang.augmentObject.apply(this,A);},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)){return A+"";}else{if(A instanceof Date||("nodeType" in A&&"tagName" in A)){return A;}else{if(C.isFunction(A)){return B;}}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}if(I.length>1){I.pop();}I.push("]");}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}}if(I.length>1){I.pop();}I.push("}");}return I.join("");},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break;}F=Q.indexOf(O,G);if(G+1>=F){break;}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E);}N=B[M];if(J){N=J(M,N,P);}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10));}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4);}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10));}else{N=N.toString();}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C;}}Q=Q.substring(0,G)+N+Q.substring(F+1);}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g");}return Q;},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"");}catch(B){return A;}},merge:function(){var C={},A=arguments,B;for(B=0;B<A.length;B=B+1){YAHOO.lang.augmentObject(C,A[B],true);}return C;},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.1",build:"541"});(function(){var B=YAHOO.util,K,I,H=0,J={},F={};var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var M=function(O){if(!E.HYPHEN.test(O)){return O;}if(J[O]){return J[O];}var P=O;while(E.HYPHEN.exec(P)){P=P.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[O]=P;return P;};var N=function(P){var O=F[P];if(!O){O=new RegExp("(?:^|\\s+)"+P+"(?:\\s+|$)");F[P]=O;}return O;};if(document.defaultView&&document.defaultView.getComputedStyle){K=function(O,R){var Q=null;if(R=="float"){R="cssFloat";}var P=document.defaultView.getComputedStyle(O,"");if(P){Q=P[M(R)];}return O.style[R]||Q;};}else{if(document.documentElement.currentStyle&&G){K=function(O,Q){switch(M(Q)){case"opacity":var S=100;try{S=O.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(R){try{S=O.filters("alpha").opacity;}catch(R){}}return S/100;case"float":Q="styleFloat";default:var P=O.currentStyle?O.currentStyle[Q]:null;return(O.style[Q]||P);}};}else{K=function(O,P){return O.style[P];};}}if(G){I=function(O,P,Q){switch(P){case"opacity":if(YAHOO.lang.isString(O.style.filter)){O.style.filter="alpha(opacity="+Q*100+")";if(!O.currentStyle||!O.currentStyle.hasLayout){O.style.zoom=1;}}break;case"float":P="styleFloat";default:O.style[P]=Q;}};}else{I=function(O,P,Q){if(P=="float"){P="cssFloat";}O.style[P]=Q;};}var D=function(O,P){return O&&O.nodeType==1&&(!P||P(O));};YAHOO.util.Dom={get:function(Q){if(Q&&(Q.tagName||Q.item)){return Q;}if(YAHOO.lang.isString(Q)||!Q){return document.getElementById(Q);}if(Q.length!==undefined){var R=[];for(var P=0,O=Q.length;P<O;++P){R[R.length]=B.Dom.get(Q[P]);}return R;}return Q;},getStyle:function(O,Q){Q=M(Q);var P=function(R){return K(R,Q);};return B.Dom.batch(O,P,B.Dom,true);},setStyle:function(O,Q,R){Q=M(Q);var P=function(S){I(S,Q,R);};B.Dom.batch(O,P,B.Dom,true);},getXY:function(O){var P=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=document.body){return false;}var Q=null;var V=[];var S;var T=R.ownerDocument;if(R.getBoundingClientRect){S=R.getBoundingClientRect();return[S.left+B.Dom.getDocumentScrollLeft(R.ownerDocument),S.top+B.Dom.getDocumentScrollTop(R.ownerDocument)];}else{V=[R.offsetLeft,R.offsetTop];Q=R.offsetParent;var U=this.getStyle(R,"position")=="absolute";if(Q!=R){while(Q){V[0]+=Q.offsetLeft;V[1]+=Q.offsetTop;if(L&&!U&&this.getStyle(Q,"position")=="absolute"){U=true;}Q=Q.offsetParent;}}if(L&&U){V[0]-=R.ownerDocument.body.offsetLeft;V[1]-=R.ownerDocument.body.offsetTop;}}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(B.Dom.getStyle(Q,"display").search(/^inline|table-row.*$/i)){V[0]-=Q.scrollLeft;V[1]-=Q.scrollTop;}Q=Q.parentNode;}return V;};return B.Dom.batch(O,P,B.Dom,true);},getX:function(O){var P=function(Q){return B.Dom.getXY(Q)[0];};return B.Dom.batch(O,P,B.Dom,true);},getY:function(O){var P=function(Q){return B.Dom.getXY(Q)[1];};return B.Dom.batch(O,P,B.Dom,true);},setXY:function(O,R,Q){var P=function(U){var T=this.getStyle(U,"position");if(T=="static"){this.setStyle(U,"position","relative");T="relative";}var W=this.getXY(U);if(W===false){return false;}var V=[parseInt(this.getStyle(U,"left"),10),parseInt(this.getStyle(U,"top"),10)];if(isNaN(V[0])){V[0]=(T=="relative")?0:U.offsetLeft;}if(isNaN(V[1])){V[1]=(T=="relative")?0:U.offsetTop;}if(R[0]!==null){U.style.left=R[0]-W[0]+V[0]+"px";}if(R[1]!==null){U.style.top=R[1]-W[1]+V[1]+"px";}if(!Q){var S=this.getXY(U);if((R[0]!==null&&S[0]!=R[0])||(R[1]!==null&&S[1]!=R[1])){this.setXY(U,R,true);}}};B.Dom.batch(O,P,B.Dom,true);},setX:function(P,O){B.Dom.setXY(P,[O,null]);},setY:function(O,P){B.Dom.setXY(O,[null,P]);},getRegion:function(O){var P=function(Q){if((Q.parentNode===null||Q.offsetParent===null||this.getStyle(Q,"display")=="none")&&Q!=document.body){return false;}var R=B.Region.getRegion(Q);return R;};return B.Dom.batch(O,P,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(S,W,T,U){W=W||"*";T=(T)?B.Dom.get(T):null||document;if(!T){return[];}var P=[],O=T.getElementsByTagName(W),V=N(S);for(var Q=0,R=O.length;Q<R;++Q){if(V.test(O[Q].className)){P[P.length]=O[Q];if(U){U.call(O[Q],O[Q]);}}}return P;},hasClass:function(Q,P){var O=N(P);var R=function(S){return O.test(S.className);};return B.Dom.batch(Q,R,B.Dom,true);},addClass:function(P,O){var Q=function(R){if(this.hasClass(R,O)){return false;}R.className=YAHOO.lang.trim([R.className,O].join(" "));return true;};return B.Dom.batch(P,Q,B.Dom,true);},removeClass:function(Q,P){var O=N(P);var R=function(S){if(!this.hasClass(S,P)){return false;}var T=S.className;S.className=T.replace(O," ");if(this.hasClass(S,P)){this.removeClass(S,P);}S.className=YAHOO.lang.trim(S.className);return true;};return B.Dom.batch(Q,R,B.Dom,true);},replaceClass:function(R,P,O){if(!O||P===O){return false;}var Q=N(P);var S=function(T){if(!this.hasClass(T,P)){this.addClass(T,O);return true;}T.className=T.className.replace(Q," "+O+" ");if(this.hasClass(T,P)){this.replaceClass(T,P,O);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},generateId:function(O,Q){Q=Q||"yui-gen";var P=function(R){if(R&&R.id){return R.id;}var S=Q+H++;if(R){R.id=S;}return S;};return B.Dom.batch(O,P,B.Dom,true)||P.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);if(!P||!Q){return false;}var O=function(R){if(P.contains&&R.nodeType&&!L){return P.contains(R);}else{if(P.compareDocumentPosition&&R.nodeType){return !!(P.compareDocumentPosition(R)&16);}else{if(R.nodeType){return !!this.getAncestorBy(R,function(S){return S==P;});}}}return false;};return B.Dom.batch(Q,O,B.Dom,true);},inDocument:function(O){var P=function(Q){if(L){while(Q=Q.parentNode){if(Q==document.documentElement){return true;}}return false;}return this.isAncestor(document.documentElement,Q);};return B.Dom.batch(O,P,B.Dom,true);},getElementsBy:function(V,P,Q,S){P=P||"*";
Q=(Q)?B.Dom.get(Q):null||document;if(!Q){return[];}var R=[],U=Q.getElementsByTagName(P);for(var T=0,O=U.length;T<O;++T){if(V(U[T])){R[R.length]=U[T];if(S){S(U[T]);}}}return R;},batch:function(S,V,U,Q){S=(S&&(S.tagName||S.item))?S:B.Dom.get(S);if(!S||!V){return false;}var R=(Q)?U:window;if(S.tagName||S.length===undefined){return V.call(R,S,U);}var T=[];for(var P=0,O=S.length;P<O;++P){T[T.length]=V.call(R,S[P],U);}return T;},getDocumentHeight:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;var O=Math.max(P,B.Dom.getViewportHeight());return O;},getDocumentWidth:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;var O=Math.max(P,B.Dom.getViewportWidth());return O;},getViewportHeight:function(){var O=self.innerHeight;var P=document.compatMode;if((P||G)&&!C){O=(P=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;}return O;},getViewportWidth:function(){var O=self.innerWidth;var P=document.compatMode;if(P||G){O=(P=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth;}return O;},getAncestorBy:function(O,P){while(O=O.parentNode){if(D(O,P)){return O;}}return null;},getAncestorByClassName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return B.Dom.hasClass(R,O);};return B.Dom.getAncestorBy(P,Q);},getAncestorByTagName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return R.tagName&&R.tagName.toUpperCase()==O.toUpperCase();};return B.Dom.getAncestorBy(P,Q);},getPreviousSiblingBy:function(O,P){while(O){O=O.previousSibling;if(D(O,P)){return O;}}return null;},getPreviousSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getPreviousSiblingBy(O);},getNextSiblingBy:function(O,P){while(O){O=O.nextSibling;if(D(O,P)){return O;}}return null;},getNextSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getNextSiblingBy(O);},getFirstChildBy:function(O,Q){var P=(D(O.firstChild,Q))?O.firstChild:null;return P||B.Dom.getNextSiblingBy(O.firstChild,Q);},getFirstChild:function(O,P){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getFirstChildBy(O);},getLastChildBy:function(O,Q){if(!O){return null;}var P=(D(O.lastChild,Q))?O.lastChild:null;return P||B.Dom.getPreviousSiblingBy(O.lastChild,Q);},getLastChild:function(O){O=B.Dom.get(O);return B.Dom.getLastChildBy(O);},getChildrenBy:function(P,R){var Q=B.Dom.getFirstChildBy(P,R);var O=Q?[Q]:[];B.Dom.getNextSiblingBy(Q,function(S){if(!R||R(S)){O[O.length]=S;}return false;});return O;},getChildren:function(O){O=B.Dom.get(O);if(!O){}return B.Dom.getChildrenBy(O);},getDocumentScrollLeft:function(O){O=O||document;return Math.max(O.documentElement.scrollLeft,O.body.scrollLeft);},getDocumentScrollTop:function(O){O=O||document;return Math.max(O.documentElement.scrollTop,O.body.scrollTop);},insertBefore:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}return O.parentNode.insertBefore(P,O);},insertAfter:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}if(O.nextSibling){return O.parentNode.insertBefore(P,O.nextSibling);}else{return O.parentNode.appendChild(P);}}};})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.1",build:"541"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){var E=this.subscribers.length;if(!E&&this.silent){return true;}var H=[],G=true,D,I=false;for(D=0;D<arguments.length;++D){H.push(arguments[D]);}var A=H.length;if(!this.silent){}for(D=0;D<E;++D){var L=this.subscribers[D];if(!L){I=true;}else{if(!this.silent){}var K=L.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(H.length>0){B=H[0];}try{G=L.fn.call(K,B,L.obj);}catch(F){this.lastError=F;}}else{try{G=L.fn.call(K,this.type,H,L.obj);}catch(F){this.lastError=F;}}if(false===G){if(!this.silent){}return false;}}}if(I){var J=[],C=this.subscribers;for(D=0,E=C.length;D<E;D=D+1){J.push(C[D]);}this.subscribers=J;}return true;},unsubscribeAll:function(){for(var B=0,A=this.subscribers.length;B<A;++B){this._delete(A-1-B);}this.subscribers=[];return B;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers[A]=null;},toString:function(){return"CustomEvent: '"+this.type+"', scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var J=false;var I=[];var K=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var L=this;var M=function(){L._tryPreloadAttach();};this._interval=setInterval(M,this.POLL_INTERVAL);}},onAvailable:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:false});C=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(L,N,M){if(J){setTimeout(function(){var O=window;if(M){if(M===true){O=N;}else{O=M;}}L.call(O,"DOMReady",[],N);},0);}else{this.DOMReadyEvent.subscribe(L,N,M);}},onContentReady:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:true});C=this.POLL_RETRYS;this.startInterval();},addListener:function(N,L,W,R,M){if(!W||!W.call){return false;}if(this._isValidCollection(N)){var X=true;for(var S=0,U=N.length;S<U;++S){X=this.on(N[S],L,W,R,M)&&X;}return X;}else{if(YAHOO.lang.isString(N)){var Q=this.getEl(N);if(Q){N=Q;}else{this.onAvailable(N,function(){YAHOO.util.Event.on(N,L,W,R,M);});return true;}}}if(!N){return false;}if("unload"==L&&R!==this){K[K.length]=[N,L,W,R,M];return true;}var Z=N;if(M){if(M===true){Z=R;}else{Z=M;}}var O=function(a){return W.call(Z,YAHOO.util.Event.getEvent(a,N),R);};var Y=[N,L,W,O,Z,R,M];var T=I.length;I[T]=Y;if(this.useLegacyEvent(N,L)){var P=this.getLegacyIndex(N,L);if(P==-1||N!=G[P][0]){P=G.length;B[N.id+L]=P;G[P]=[N,L,N["on"+L]];E[P]=[];N["on"+L]=function(a){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(a),P);};}E[P].push(Y);}else{try{this._simpleAdd(N,L,O,false);}catch(V){this.lastError=V;this.removeListener(N,L,W);return false;}}return true;},fireLegacyEvent:function(P,N){var R=true,L,T,S,U,Q;T=E[N];for(var M=0,O=T.length;M<O;++M){S=T[M];if(S&&S[this.WFN]){U=S[this.ADJ_SCOPE];Q=S[this.WFN].call(U,P);R=(R&&Q);}}L=G[N];if(L&&L[2]){L[2](P);}return R;},getLegacyIndex:function(M,N){var L=this.generateId(M)+N;if(typeof B[L]=="undefined"){return -1;}else{return B[L];}},useLegacyEvent:function(M,N){if(this.webkit&&("click"==N||"dblclick"==N)){var L=parseInt(this.webkit,10);if(!isNaN(L)&&L<418){return true;}}return false;},removeListener:function(M,L,U){var P,S,W;if(typeof M=="string"){M=this.getEl(M);}else{if(this._isValidCollection(M)){var V=true;for(P=0,S=M.length;P<S;++P){V=(this.removeListener(M[P],L,U)&&V);}return V;}}if(!U||!U.call){return this.purgeElement(M,false,L);}if("unload"==L){for(P=0,S=K.length;P<S;P++){W=K[P];if(W&&W[0]==M&&W[1]==L&&W[2]==U){K[P]=null;return true;}}return false;}var Q=null;var R=arguments[3];if("undefined"===typeof R){R=this._getCacheIndex(M,L,U);}if(R>=0){Q=I[R];}if(!M||!Q){return false;}if(this.useLegacyEvent(M,L)){var O=this.getLegacyIndex(M,L);var N=E[O];if(N){for(P=0,S=N.length;P<S;++P){W=N[P];if(W&&W[this.EL]==M&&W[this.TYPE]==L&&W[this.FN]==U){N[P]=null;break;}}}}else{try{this._simpleRemove(M,L,Q[this.WFN],false);}catch(T){this.lastError=T;return false;}}delete I[R][this.WFN];delete I[R][this.FN];I[R]=null;return true;},getTarget:function(N,M){var L=N.target||N.srcElement;return this.resolveTextNode(L);},resolveTextNode:function(L){if(L&&3==L.nodeType){return L.parentNode;}else{return L;}},getPageX:function(M){var L=M.pageX;if(!L&&0!==L){L=M.clientX||0;if(this.isIE){L+=this._getScrollLeft();}}return L;},getPageY:function(L){var M=L.pageY;if(!M&&0!==M){M=L.clientY||0;if(this.isIE){M+=this._getScrollTop();}}return M;},getXY:function(L){return[this.getPageX(L),this.getPageY(L)];
},getRelatedTarget:function(M){var L=M.relatedTarget;if(!L){if(M.type=="mouseout"){L=M.toElement;}else{if(M.type=="mouseover"){L=M.fromElement;}}}return this.resolveTextNode(L);},getTime:function(N){if(!N.time){var M=new Date().getTime();try{N.time=M;}catch(L){this.lastError=L;return M;}}return N.time;},stopEvent:function(L){this.stopPropagation(L);this.preventDefault(L);},stopPropagation:function(L){if(L.stopPropagation){L.stopPropagation();}else{L.cancelBubble=true;}},preventDefault:function(L){if(L.preventDefault){L.preventDefault();}else{L.returnValue=false;}},getEvent:function(Q,O){var P=Q||window.event;if(!P){var R=this.getEvent.caller;while(R){P=R.arguments[0];if(P&&Event==P.constructor){break;}R=R.caller;}}if(P&&this.isIE){try{var N=P.srcElement;if(N){var M=N.type;}}catch(L){P.target=O;}}return P;},getCharCode:function(M){var L=M.keyCode||M.charCode||0;if(YAHOO.env.ua.webkit&&(L in D)){L=D[L];}return L;},_getCacheIndex:function(P,Q,O){for(var N=0,M=I.length;N<M;++N){var L=I[N];if(L&&L[this.FN]==O&&L[this.EL]==P&&L[this.TYPE]==Q){return N;}}return -1;},generateId:function(L){var M=L.id;if(!M){M="yuievtautoid-"+A;++A;L.id=M;}return M;},_isValidCollection:function(M){try{return(typeof M!=="string"&&M.length&&!M.tagName&&!M.alert&&typeof M[0]!=="undefined");}catch(L){return false;}},elCache:{},getEl:function(L){return(typeof L==="string")?document.getElementById(L):L;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(M){if(!H){H=true;var L=YAHOO.util.Event;L._ready();L._tryPreloadAttach();}},_ready:function(M){if(!J){J=true;var L=YAHOO.util.Event;L.DOMReadyEvent.fire();L._simpleRemove(document,"DOMContentLoaded",L._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}if(this.isIE){if(!J){this.startInterval();return false;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var M,L,O,N;for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&!O.checkReady){N=this.getEl(O.id);if(N){R(N,O);F[M]=null;}else{P.push(O);}}}for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&O.checkReady){N=this.getEl(O.id);if(N){if(H||N.nextSibling){R(N,O);F[M]=null;}}else{P.push(O);}}}C=(P.length===0)?0:C-1;if(Q){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return true;},purgeElement:function(O,P,R){var Q=this.getListeners(O,R),N,L;if(Q){for(N=0,L=Q.length;N<L;++N){var M=Q[N];this.removeListener(O,M.type,M.fn,M.index);}}if(P&&O&&O.childNodes){for(N=0,L=O.childNodes.length;N<L;++N){this.purgeElement(O.childNodes[N],P,R);}}},getListeners:function(N,L){var Q=[],M;if(!L){M=[I,K];}else{if(L=="unload"){M=[K];}else{M=[I];}}for(var P=0;P<M.length;P=P+1){var T=M[P];if(T&&T.length>0){for(var R=0,S=T.length;R<S;++R){var O=T[R];if(O&&O[this.EL]===N&&(!L||L===O[this.TYPE])){Q.push({type:O[this.TYPE],fn:O[this.FN],obj:O[this.OBJ],adjust:O[this.OVERRIDE],scope:O[this.ADJ_SCOPE],index:R});}}}}return(Q.length)?Q:null;},_unload:function(S){var R=YAHOO.util.Event,P,O,M,L,N;for(P=0,L=K.length;P<L;++P){M=K[P];if(M){var Q=window;if(M[R.ADJ_SCOPE]){if(M[R.ADJ_SCOPE]===true){Q=M[R.UNLOAD_OBJ];}else{Q=M[R.ADJ_SCOPE];}}M[R.FN].call(Q,R.getEvent(S,M[R.EL]),M[R.UNLOAD_OBJ]);K[P]=null;M=null;Q=null;}}K=null;if(I&&I.length>0){O=I.length;while(O){N=O-1;M=I[N];if(M){R.removeListener(M[R.EL],M[R.TYPE],M[R.FN],N);}O=O-1;}M=null;R.clearCache();}for(P=0,L=G.length;P<L;++P){G[P][0]=null;G[P]=null;}G=null;R._simpleRemove(window,"unload",R._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var L=document.documentElement,M=document.body;if(L&&(L.scrollTop||L.scrollLeft)){return[L.scrollTop,L.scrollLeft];}else{if(M){return[M.scrollTop,M.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(N,O,M,L){N.addEventListener(O,M,(L));};}else{if(window.attachEvent){return function(N,O,M,L){N.attachEvent("on"+O,M);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(N,O,M,L){N.removeEventListener(O,M,(L));};}else{if(window.detachEvent){return function(M,N,L){M.detachEvent("on"+N,L);};}else{return function(){};}}}()};}();(function(){var D=YAHOO.util.Event;D.on=D.addListener;if(D.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var B,E=document,A=E.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){B=document.createElement("script");var C=E.getElementsByTagName("head")[0]||A;C.insertBefore(B,C.firstChild);}else{E.write("<script id=\"_yui_eu_dr\" defer=\"true\" src=\"//:\"></script>");B=document.getElementById("_yui_eu_dr");}if(B){B.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};}else{}B=null;}else{if(D.webkit){D._drwatch=setInterval(function(){var F=document.readyState;if("loaded"==F||"complete"==F){clearInterval(D._drwatch);D._drwatch=null;D._ready();}},D.POLL_INTERVAL);}else{D._simpleAdd(document,"DOMContentLoaded",D._ready);}}D._simpleAdd(window,"load",D._load);D._simpleAdd(window,"unload",D._unload);D._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};
var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(K,J){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(K.shiftKey==F.shift&&K.altKey==F.alt&&K.ctrlKey==F.ctrl){var H;var G;if(F.keys instanceof Array){for(var I=0;I<F.keys.length;I++){H=F.keys[I];if(H==K.charCode){D.fire(K.charCode,K);break;}else{if(H==K.keyCode){D.fire(K.keyCode,K);break;}}}}else{H=F.keys;if(H==K.charCode){D.fire(K.charCode,K);}else{if(H==K.keyCode){D.fire(K.keyCode,K);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.1",build:"541"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.3.1", build: "541"});

(function(){var B=YAHOO.util,K,I,H=0,J={},F={};var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var M=function(O){if(!E.HYPHEN.test(O)){return O;}if(J[O]){return J[O];}var P=O;while(E.HYPHEN.exec(P)){P=P.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[O]=P;return P;};var N=function(P){var O=F[P];if(!O){O=new RegExp("(?:^|\\s+)"+P+"(?:\\s+|$)");F[P]=O;}return O;};if(document.defaultView&&document.defaultView.getComputedStyle){K=function(O,R){var Q=null;if(R=="float"){R="cssFloat";}var P=document.defaultView.getComputedStyle(O,"");if(P){Q=P[M(R)];}return O.style[R]||Q;};}else{if(document.documentElement.currentStyle&&G){K=function(O,Q){switch(M(Q)){case"opacity":var S=100;try{S=O.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(R){try{S=O.filters("alpha").opacity;}catch(R){}}return S/100;case"float":Q="styleFloat";default:var P=O.currentStyle?O.currentStyle[Q]:null;return(O.style[Q]||P);}};}else{K=function(O,P){return O.style[P];};}}if(G){I=function(O,P,Q){switch(P){case"opacity":if(YAHOO.lang.isString(O.style.filter)){O.style.filter="alpha(opacity="+Q*100+")";if(!O.currentStyle||!O.currentStyle.hasLayout){O.style.zoom=1;}}break;case"float":P="styleFloat";default:O.style[P]=Q;}};}else{I=function(O,P,Q){if(P=="float"){P="cssFloat";}O.style[P]=Q;};}var D=function(O,P){return O&&O.nodeType==1&&(!P||P(O));};YAHOO.util.Dom={get:function(Q){if(Q&&(Q.tagName||Q.item)){return Q;}if(YAHOO.lang.isString(Q)||!Q){return document.getElementById(Q);}if(Q.length!==undefined){var R=[];for(var P=0,O=Q.length;P<O;++P){R[R.length]=B.Dom.get(Q[P]);}return R;}return Q;},getStyle:function(O,Q){Q=M(Q);var P=function(R){return K(R,Q);};return B.Dom.batch(O,P,B.Dom,true);},setStyle:function(O,Q,R){Q=M(Q);var P=function(S){I(S,Q,R);};B.Dom.batch(O,P,B.Dom,true);},getXY:function(O){var P=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=document.body){return false;}var Q=null;var V=[];var S;var T=R.ownerDocument;if(R.getBoundingClientRect){S=R.getBoundingClientRect();return[S.left+B.Dom.getDocumentScrollLeft(R.ownerDocument),S.top+B.Dom.getDocumentScrollTop(R.ownerDocument)];}else{V=[R.offsetLeft,R.offsetTop];Q=R.offsetParent;var U=this.getStyle(R,"position")=="absolute";if(Q!=R){while(Q){V[0]+=Q.offsetLeft;V[1]+=Q.offsetTop;if(L&&!U&&this.getStyle(Q,"position")=="absolute"){U=true;}Q=Q.offsetParent;}}if(L&&U){V[0]-=R.ownerDocument.body.offsetLeft;V[1]-=R.ownerDocument.body.offsetTop;}}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(B.Dom.getStyle(Q,"display").search(/^inline|table-row.*$/i)){V[0]-=Q.scrollLeft;V[1]-=Q.scrollTop;}Q=Q.parentNode;}return V;};return B.Dom.batch(O,P,B.Dom,true);},getX:function(O){var P=function(Q){return B.Dom.getXY(Q)[0];};return B.Dom.batch(O,P,B.Dom,true);},getY:function(O){var P=function(Q){return B.Dom.getXY(Q)[1];};return B.Dom.batch(O,P,B.Dom,true);},setXY:function(O,R,Q){var P=function(U){var T=this.getStyle(U,"position");if(T=="static"){this.setStyle(U,"position","relative");T="relative";}var W=this.getXY(U);if(W===false){return false;}var V=[parseInt(this.getStyle(U,"left"),10),parseInt(this.getStyle(U,"top"),10)];if(isNaN(V[0])){V[0]=(T=="relative")?0:U.offsetLeft;}if(isNaN(V[1])){V[1]=(T=="relative")?0:U.offsetTop;}if(R[0]!==null){U.style.left=R[0]-W[0]+V[0]+"px";}if(R[1]!==null){U.style.top=R[1]-W[1]+V[1]+"px";}if(!Q){var S=this.getXY(U);if((R[0]!==null&&S[0]!=R[0])||(R[1]!==null&&S[1]!=R[1])){this.setXY(U,R,true);}}};B.Dom.batch(O,P,B.Dom,true);},setX:function(P,O){B.Dom.setXY(P,[O,null]);},setY:function(O,P){B.Dom.setXY(O,[null,P]);},getRegion:function(O){var P=function(Q){if((Q.parentNode===null||Q.offsetParent===null||this.getStyle(Q,"display")=="none")&&Q!=document.body){return false;}var R=B.Region.getRegion(Q);return R;};return B.Dom.batch(O,P,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(S,W,T,U){W=W||"*";T=(T)?B.Dom.get(T):null||document;if(!T){return[];}var P=[],O=T.getElementsByTagName(W),V=N(S);for(var Q=0,R=O.length;Q<R;++Q){if(V.test(O[Q].className)){P[P.length]=O[Q];if(U){U.call(O[Q],O[Q]);}}}return P;},hasClass:function(Q,P){var O=N(P);var R=function(S){return O.test(S.className);};return B.Dom.batch(Q,R,B.Dom,true);},addClass:function(P,O){var Q=function(R){if(this.hasClass(R,O)){return false;}R.className=YAHOO.lang.trim([R.className,O].join(" "));return true;};return B.Dom.batch(P,Q,B.Dom,true);},removeClass:function(Q,P){var O=N(P);var R=function(S){if(!this.hasClass(S,P)){return false;}var T=S.className;S.className=T.replace(O," ");if(this.hasClass(S,P)){this.removeClass(S,P);}S.className=YAHOO.lang.trim(S.className);return true;};return B.Dom.batch(Q,R,B.Dom,true);},replaceClass:function(R,P,O){if(!O||P===O){return false;}var Q=N(P);var S=function(T){if(!this.hasClass(T,P)){this.addClass(T,O);return true;}T.className=T.className.replace(Q," "+O+" ");if(this.hasClass(T,P)){this.replaceClass(T,P,O);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},generateId:function(O,Q){Q=Q||"yui-gen";var P=function(R){if(R&&R.id){return R.id;}var S=Q+H++;if(R){R.id=S;}return S;};return B.Dom.batch(O,P,B.Dom,true)||P.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);if(!P||!Q){return false;}var O=function(R){if(P.contains&&R.nodeType&&!L){return P.contains(R);}else{if(P.compareDocumentPosition&&R.nodeType){return !!(P.compareDocumentPosition(R)&16);}else{if(R.nodeType){return !!this.getAncestorBy(R,function(S){return S==P;});}}}return false;};return B.Dom.batch(Q,O,B.Dom,true);},inDocument:function(O){var P=function(Q){if(L){while(Q=Q.parentNode){if(Q==document.documentElement){return true;}}return false;}return this.isAncestor(document.documentElement,Q);};return B.Dom.batch(O,P,B.Dom,true);},getElementsBy:function(V,P,Q,S){P=P||"*";
Q=(Q)?B.Dom.get(Q):null||document;if(!Q){return[];}var R=[],U=Q.getElementsByTagName(P);for(var T=0,O=U.length;T<O;++T){if(V(U[T])){R[R.length]=U[T];if(S){S(U[T]);}}}return R;},batch:function(S,V,U,Q){S=(S&&(S.tagName||S.item))?S:B.Dom.get(S);if(!S||!V){return false;}var R=(Q)?U:window;if(S.tagName||S.length===undefined){return V.call(R,S,U);}var T=[];for(var P=0,O=S.length;P<O;++P){T[T.length]=V.call(R,S[P],U);}return T;},getDocumentHeight:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;var O=Math.max(P,B.Dom.getViewportHeight());return O;},getDocumentWidth:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;var O=Math.max(P,B.Dom.getViewportWidth());return O;},getViewportHeight:function(){var O=self.innerHeight;var P=document.compatMode;if((P||G)&&!C){O=(P=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;}return O;},getViewportWidth:function(){var O=self.innerWidth;var P=document.compatMode;if(P||G){O=(P=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth;}return O;},getAncestorBy:function(O,P){while(O=O.parentNode){if(D(O,P)){return O;}}return null;},getAncestorByClassName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return B.Dom.hasClass(R,O);};return B.Dom.getAncestorBy(P,Q);},getAncestorByTagName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return R.tagName&&R.tagName.toUpperCase()==O.toUpperCase();};return B.Dom.getAncestorBy(P,Q);},getPreviousSiblingBy:function(O,P){while(O){O=O.previousSibling;if(D(O,P)){return O;}}return null;},getPreviousSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getPreviousSiblingBy(O);},getNextSiblingBy:function(O,P){while(O){O=O.nextSibling;if(D(O,P)){return O;}}return null;},getNextSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getNextSiblingBy(O);},getFirstChildBy:function(O,Q){var P=(D(O.firstChild,Q))?O.firstChild:null;return P||B.Dom.getNextSiblingBy(O.firstChild,Q);},getFirstChild:function(O,P){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getFirstChildBy(O);},getLastChildBy:function(O,Q){if(!O){return null;}var P=(D(O.lastChild,Q))?O.lastChild:null;return P||B.Dom.getPreviousSiblingBy(O.lastChild,Q);},getLastChild:function(O){O=B.Dom.get(O);return B.Dom.getLastChildBy(O);},getChildrenBy:function(P,R){var Q=B.Dom.getFirstChildBy(P,R);var O=Q?[Q]:[];B.Dom.getNextSiblingBy(Q,function(S){if(!R||R(S)){O[O.length]=S;}return false;});return O;},getChildren:function(O){O=B.Dom.get(O);if(!O){}return B.Dom.getChildrenBy(O);},getDocumentScrollLeft:function(O){O=O||document;return Math.max(O.documentElement.scrollLeft,O.body.scrollLeft);},getDocumentScrollTop:function(O){O=O||document;return Math.max(O.documentElement.scrollTop,O.body.scrollTop);},insertBefore:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}return O.parentNode.insertBefore(P,O);},insertAfter:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}if(O.nextSibling){return O.parentNode.insertBefore(P,O.nextSibling);}else{return O.parentNode.appendChild(P);}}};})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.1",build:"541"});
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}if(!D){}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F,E;for(F in this.config){E=this.config[F];if(E&&E.event){D[F]=E.value;}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(E,H){var G,D,F;if(H){F={};for(G in E){if(B.hasOwnProperty(E,G)){F[G.toLowerCase()]=E[G];}}this.initialConfig=F;}for(G in E){if(B.hasOwnProperty(E,G)){this.queueProperty(G,E[G]);}}},refresh:function(){var D;for(D in this.config){this.refireEvent(D);}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(E,F,H,D){var G=this.config[E.toLowerCase()];if(G&&G.event){if(!A.alreadySubscribed(G.event,F,H)){G.event.subscribe(F,H,D);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(Q,P){if(Q){this.init(Q,P);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,M=YAHOO.util.Event,L=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,H,O,N,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},I={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.textResizeEvent=new L("textResize");function K(){if(!H){H=document.createElement("div");H.innerHTML=("<div class=\""+G.CSS_HEADER+"\"></div><div class=\""+G.CSS_BODY+"\"></div><div class=\""+G.CSS_FOOTER+"\"></div>");O=H.firstChild;N=O.nextSibling;E=N.nextSibling;}return H;}function J(){if(!O){K();}return(O.cloneNode(false));}function B(){if(!N){K();}return(N.cloneNode(false));}function C(){if(!E){K();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var P=L.LIST;this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=P;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=P;this.appendEvent=this.createEvent(A.APPEND);
this.appendEvent.signature=P;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=P;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=P;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=P;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=P;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=P;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=P;this.destroyEvent=this.createEvent(A.DESTORY);this.destroyEvent.signature=P;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=P;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=P;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=P;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=P;},platform:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("windows")!=-1||P.indexOf("win32")!=-1){return"windows";}else{if(P.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("opera")!=-1){return"opera";}else{if(P.indexOf("msie 7")!=-1){return"ie7";}else{if(P.indexOf("msie")!=-1){return"ie";}else{if(P.indexOf("safari")!=-1){return"safari";}else{if(P.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(I.VISIBLE.key,{handler:this.configVisible,value:I.VISIBLE.value,validator:I.VISIBLE.validator});this.cfg.addProperty(I.EFFECT.key,{suppressEvent:I.EFFECT.suppressEvent,supercedes:I.EFFECT.supercedes});this.cfg.addProperty(I.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:I.MONITOR_RESIZE.value});this.cfg.addProperty(I.APPEND_TO_DOCUMENT_BODY.key,{value:I.APPEND_TO_DOCUMENT_BODY.value});},init:function(V,U){var R,T,W;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof V=="string"){R=V;V=document.getElementById(V);if(!V){V=(K()).cloneNode(false);V.id=R;}}this.element=V;if(V.id){this.id=V.id;}W=this.element.firstChild;if(W){var Q=false,P=false,S=false;do{if(1==W.nodeType){if(!Q&&F.hasClass(W,G.CSS_HEADER)){this.header=W;Q=true;}else{if(!P&&F.hasClass(W,G.CSS_BODY)){this.body=W;P=true;}else{if(!S&&F.hasClass(W,G.CSS_FOOTER)){this.footer=W;S=true;}}}}}while((W=W.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(U){this.cfg.applyConfig(U,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var P,Q,S;function T(){G.textResizeEvent.fire();}if(!YAHOO.env.ua.opera){Q=F.get("_yuiResizeMonitor");if(!Q){Q=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){Q.src=G.RESIZE_MONITOR_SECURE_URL;}if(YAHOO.env.ua.gecko){S="<html><head><script type=\"text/javascript\">window.onresize=function(){window.parent.YAHOO.widget.Module.textResizeEvent.fire();};window.parent.YAHOO.widget.Module.textResizeEvent.fire();</script></head><body></body></html>";Q.src="data:text/html;charset=utf-8,"+encodeURIComponent(S);}Q.id="_yuiResizeMonitor";Q.style.position="absolute";Q.style.visibility="hidden";var R=document.body.firstChild;if(R){document.body.insertBefore(Q,R);}else{document.body.appendChild(Q);}Q.style.width="10em";Q.style.height="10em";Q.style.top=(-1*Q.offsetHeight)+"px";Q.style.left=(-1*Q.offsetWidth)+"px";Q.style.borderWidth="0";Q.style.visibility="visible";if(YAHOO.env.ua.webkit){P=Q.contentWindow.document;P.open();P.close();}}if(Q&&Q.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(!M.on(Q.contentWindow,"resize",T)){M.on(Q,"resize",T);}G.textResizeInitialized=true;}this.resizeMonitor=Q;}}},onDomResize:function(S,R){var Q=-1*this.resizeMonitor.offsetWidth,P=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=P+"px";this.resizeMonitor.style.left=Q+"px";},setHeader:function(Q){var P=this.header||(this.header=J());if(typeof Q=="string"){P.innerHTML=Q;}else{P.innerHTML="";P.appendChild(Q);}this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},appendToHeader:function(Q){var P=this.header||(this.header=J());P.appendChild(Q);this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},setBody:function(Q){var P=this.body||(this.body=B());if(typeof Q=="string"){P.innerHTML=Q;}else{P.innerHTML="";P.appendChild(Q);}this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},appendToBody:function(Q){var P=this.body||(this.body=B());P.appendChild(Q);this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},setFooter:function(Q){var P=this.footer||(this.footer=C());if(typeof Q=="string"){P.innerHTML=Q;}else{P.innerHTML="";P.appendChild(Q);}this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},appendToFooter:function(Q){var P=this.footer||(this.footer=C());P.appendChild(Q);this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},render:function(R,P){var S=this,T;function Q(U){if(typeof U=="string"){U=document.getElementById(U);}if(U){S._addToParent(U,S.element);S.appendEvent.fire();}}this.beforeRenderEvent.fire();if(!P){P=this.element;}if(R){Q(R);}else{if(!F.inDocument(this.element)){return false;}}if(this.header&&!F.inDocument(this.header)){T=P.firstChild;if(T){P.insertBefore(this.header,T);}else{P.appendChild(this.header);}}if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){P.insertBefore(this.body,this.footer);}else{P.appendChild(this.body);}}if(this.footer&&!F.inDocument(this.footer)){P.appendChild(this.footer);}this.renderEvent.fire();return true;},destroy:function(){var P,Q;if(this.element){M.purgeElement(this.element,true);
P=this.element.parentNode;}if(P){P.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(Q in this){if(Q instanceof L){Q.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(Q,P,R){var S=P[0];if(S){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(R,Q,S){var P=Q[0];if(P){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(P,Q){if(!this.cfg.getProperty("appendtodocumentbody")&&P===document.body&&P.firstChild){P.insertBefore(Q,P.firstChild);}else{P.appendChild(Q);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(L,K){YAHOO.widget.Overlay.superclass.constructor.call(this,L,K);};var F=YAHOO.lang,I=YAHOO.util.CustomEvent,E=YAHOO.widget.Module,J=YAHOO.util.Event,D=YAHOO.util.Dom,C=YAHOO.util.Config,B=YAHOO.widget.Overlay,G,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},H={"X":{key:"x",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:F.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:F.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:F.isBoolean,supercedes:["zindex"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.CSS_OVERLAY="yui-overlay";B.windowScrollEvent=new I("windowScroll");B.windowResizeEvent=new I("windowResize");B.windowScrollHandler=function(K){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}};B.windowResizeHandler=function(K){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){J.on(window,"scroll",B.windowScrollHandler);J.on(window,"resize",B.windowResizeHandler);B._initialized=true;}YAHOO.extend(B,E,{init:function(L,K){B.superclass.init.call(this,L);this.beforeInitEvent.fire(B);D.addClass(this.element,B.CSS_OVERLAY);if(K){this.cfg.applyConfig(K,true);}if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!C.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!C.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var K=I.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=K;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=K;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.X.key,{handler:this.configX,validator:H.X.validator,suppressEvent:H.X.suppressEvent,supercedes:H.X.supercedes});this.cfg.addProperty(H.Y.key,{handler:this.configY,validator:H.Y.validator,suppressEvent:H.Y.suppressEvent,supercedes:H.Y.supercedes});this.cfg.addProperty(H.XY.key,{handler:this.configXY,suppressEvent:H.XY.suppressEvent,supercedes:H.XY.supercedes});this.cfg.addProperty(H.CONTEXT.key,{handler:this.configContext,suppressEvent:H.CONTEXT.suppressEvent,supercedes:H.CONTEXT.supercedes});this.cfg.addProperty(H.FIXED_CENTER.key,{handler:this.configFixedCenter,value:H.FIXED_CENTER.value,validator:H.FIXED_CENTER.validator,supercedes:H.FIXED_CENTER.supercedes});this.cfg.addProperty(H.WIDTH.key,{handler:this.configWidth,suppressEvent:H.WIDTH.suppressEvent,supercedes:H.WIDTH.supercedes});this.cfg.addProperty(H.HEIGHT.key,{handler:this.configHeight,suppressEvent:H.HEIGHT.suppressEvent,supercedes:H.HEIGHT.supercedes});this.cfg.addProperty(H.ZINDEX.key,{handler:this.configzIndex,value:H.ZINDEX.value});this.cfg.addProperty(H.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:H.CONSTRAIN_TO_VIEWPORT.value,validator:H.CONSTRAIN_TO_VIEWPORT.validator,supercedes:H.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(H.IFRAME.key,{handler:this.configIframe,value:H.IFRAME.value,validator:H.IFRAME.validator,supercedes:H.IFRAME.supercedes});},moveTo:function(K,L){this.cfg.setProperty("xy",[K,L]);},hideMacGeckoScrollbars:function(){D.removeClass(this.element,"show-scrollbars");D.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){D.removeClass(this.element,"hide-scrollbars");D.addClass(this.element,"show-scrollbars");},configVisible:function(N,K,T){var M=K[0],O=D.getStyle(this.element,"visibility"),U=this.cfg.getProperty("effect"),R=[],Q=(this.platform=="mac"&&YAHOO.env.ua.gecko),b=C.alreadySubscribed,S,L,a,Y,X,W,Z,V,P;if(O=="inherit"){a=this.element.parentNode;while(a.nodeType!=9&&a.nodeType!=11){O=D.getStyle(a,"visibility");if(O!="inherit"){break;}a=a.parentNode;}if(O=="inherit"){O="visible";}}if(U){if(U instanceof Array){V=U.length;
for(Y=0;Y<V;Y++){S=U[Y];R[R.length]=S.effect(this,S.duration);}}else{R[R.length]=U.effect(this,U.duration);}}if(M){if(Q){this.showMacGeckoScrollbars();}if(U){if(M){if(O!="visible"||O===""){this.beforeShowEvent.fire();P=R.length;for(X=0;X<P;X++){L=R[X];if(X===0&&!b(L.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){L.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}L.animateIn();}}}}else{if(O!="visible"||O===""){this.beforeShowEvent.fire();D.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(Q){this.hideMacGeckoScrollbars();}if(U){if(O=="visible"){this.beforeHideEvent.fire();P=R.length;for(W=0;W<P;W++){Z=R[W];if(W===0&&!b(Z.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){Z.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}Z.animateOut();}}else{if(O===""){D.setStyle(this.element,"visibility","hidden");}}}else{if(O=="visible"||O===""){this.beforeHideEvent.fire();D.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(O,M,P){var Q=M[0],L=C.alreadySubscribed,N=B.windowResizeEvent,K=B.windowScrollEvent;if(Q){this.center();if(!L(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}if(!L(N,this.doCenterOnDOMEvent,this)){N.subscribe(this.doCenterOnDOMEvent,this,true);}if(!L(K,this.doCenterOnDOMEvent,this)){K.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);N.unsubscribe(this.doCenterOnDOMEvent,this);K.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(N,L,O){var K=L[0],M=this.element;D.setStyle(M,"height",K);this.cfg.refireEvent("iframe");},configWidth:function(N,K,O){var M=K[0],L=this.element;D.setStyle(L,"width",M);this.cfg.refireEvent("iframe");},configzIndex:function(M,K,N){var O=K[0],L=this.element;if(!O){O=D.getStyle(L,"zIndex");if(!O||isNaN(O)){O=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(O<=0){O=1;}}D.setStyle(L,"zIndex",O);this.cfg.setProperty("zIndex",O,true);if(this.iframe){this.stackIframe();}},configXY:function(M,L,N){var P=L[0],K=P[0],O=P[1];this.cfg.setProperty("x",K);this.cfg.setProperty("y",O);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configX:function(M,L,N){var K=L[0],O=this.cfg.getProperty("y");this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setX(this.element,K,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configY:function(M,L,N){var K=this.cfg.getProperty("x"),O=L[0];this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setY(this.element,O,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},showIframe:function(){var L=this.iframe,K;if(L){K=this.element.parentNode;if(K!=L.parentNode){this._addToParent(K,L);}L.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var K=this.iframe,M=this.element,O=B.IFRAME_OFFSET,L=(O*2),N;if(K){K.style.width=(M.offsetWidth+L+"px");K.style.height=(M.offsetHeight+L+"px");N=this.cfg.getProperty("xy");if(!F.isArray(N)||(isNaN(N[0])||isNaN(N[1]))){this.syncPosition();N=this.cfg.getProperty("xy");}D.setXY(K,[(N[0]-O),(N[1]-O)]);}},stackIframe:function(){if(this.iframe){var K=D.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(K)&&!isNaN(K)){D.setStyle(this.iframe,"zIndex",(K-1));}}},configIframe:function(N,M,O){var K=M[0];function P(){var R=this.iframe,S=this.element,U,T;if(!R){if(!G){G=document.createElement("iframe");if(this.isSecure){G.src=B.IFRAME_SRC;}if(YAHOO.env.ua.ie){G.style.filter="alpha(opacity=0)";G.frameBorder=0;}else{G.style.opacity="0";}G.style.position="absolute";G.style.border="none";G.style.margin="0";G.style.padding="0";G.style.display="none";}R=G.cloneNode(false);U=S.parentNode;var Q=U||document.body;this._addToParent(Q,R);this.iframe=R;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function L(){P.call(this);this.beforeShowEvent.unsubscribe(L);this._iframeDeferred=false;}if(K){if(this.cfg.getProperty("visible")){P.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(L);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},configConstrainToViewport:function(L,K,M){var N=K[0];if(N){if(!C.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(M,L,O){var Q=L[0],N,P,K;if(Q){N=Q[0];P=Q[1];K=Q[2];if(N){if(typeof N=="string"){this.cfg.setProperty("context",[document.getElementById(N),P,K],true);}if(P&&K){this.align(P,K);}}}},align:function(L,K){var Q=this.cfg.getProperty("context"),P=this,O,N,R;function M(S,T){switch(L){case B.TOP_LEFT:P.moveTo(T,S);break;case B.TOP_RIGHT:P.moveTo((T-N.offsetWidth),S);break;case B.BOTTOM_LEFT:P.moveTo(T,(S-N.offsetHeight));break;case B.BOTTOM_RIGHT:P.moveTo((T-N.offsetWidth),(S-N.offsetHeight));break;}}if(Q){O=Q[0];N=this.element;P=this;if(!L){L=Q[1];}if(!K){K=Q[2];}if(N&&O){R=D.getRegion(O);switch(K){case B.TOP_LEFT:M(R.top,R.left);
break;case B.TOP_RIGHT:M(R.top,R.right);break;case B.BOTTOM_LEFT:M(R.bottom,R.left);break;case B.BOTTOM_RIGHT:M(R.bottom,R.right);break;}}}},enforceConstraints:function(S,R,O){var U=R[0],W=U[0],V=U[1],L=this.element.offsetHeight,Q=this.element.offsetWidth,T=D.getViewportWidth(),N=D.getViewportHeight(),Z=D.getDocumentScrollLeft(),X=D.getDocumentScrollTop(),M=X+10,P=Z+10,K=X+N-L-10,Y=Z+T-Q-10;if(W<P){W=P;}else{if(W>Y){W=Y;}}if(V<M){V=M;}else{if(V>K){V=K;}}this.cfg.setProperty("x",W,true);this.cfg.setProperty("y",V,true);this.cfg.setProperty("xy",[W,V],true);},center:function(){var Q=D.getDocumentScrollLeft(),O=D.getDocumentScrollTop(),L=D.getClientWidth(),P=D.getClientHeight(),N=this.element.offsetWidth,M=this.element.offsetHeight,K=(L/2)-(N/2)+Q,R=(P/2)-(M/2)+O;this.cfg.setProperty("xy",[parseInt(K,10),parseInt(R,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var K=D.getXY(this.element);this.cfg.setProperty("x",K[0],true);this.cfg.setProperty("y",K[1],true);this.cfg.setProperty("xy",K,true);},onDomResize:function(M,L){var K=this;B.superclass.onDomResize.call(this,M,L);setTimeout(function(){K.syncPosition();K.cfg.refireEvent("iframe");K.cfg.refireEvent("context");},0);},bringToTop:function(){var N=[],M=this.element;function P(T,S){var V=D.getStyle(T,"zIndex"),U=D.getStyle(S,"zIndex"),R=(!V||isNaN(V))?0:parseInt(V,10),Q=(!U||isNaN(U))?0:parseInt(U,10);if(R>Q){return -1;}else{if(R<Q){return 1;}else{return 0;}}}function L(S){var Q=D.hasClass(S,B.CSS_OVERLAY),R=YAHOO.widget.Panel;if(Q&&!D.isAncestor(M,Q)){if(R&&D.hasClass(S,R.CSS_PANEL)){N[N.length]=S.parentNode;}else{N[N.length]=S;}}}D.getElementsBy(L,"DIV",document.body);N.sort(P);var K=N[0],O;if(K){O=D.getStyle(K,"zIndex");if(!isNaN(O)&&K!=M){this.cfg.setProperty("zindex",(parseInt(O,10)+2));}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){if(H!=K){if(H){H.blur();}this.bringToTop(K);H=K;E.addClass(H.element,A.CSS_FOCUSED);K.focusEvent.fire();}}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}M.focusEvent.unsubscribeAll();M.blurEvent.unsubscribeAll();M.focusEvent=null;M.blurEvent=null;M.focus=null;M.blur=null;}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._onOverlayBlur=function(K,J){H=null;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},register:function(G){var K=this,L,I,H,J;if(G instanceof D){G.cfg.addProperty("manager",{value:this});G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focus=function(){K.focus(this);};G.blur=function(){if(K.getActive()==this){E.removeClass(this.element,A.CSS_FOCUSED);this.blurEvent.fire();}};G.blurEvent.subscribe(K._onOverlayBlur);G.hideEvent.subscribe(G.blur);G.destroyEvent.subscribe(this._onOverlayDestroy,G,this);C.on(G.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,G);L=E.getStyle(G.element,"zIndex");if(!isNaN(L)){G.cfg.setProperty("zIndex",parseInt(L,10));}else{G.cfg.setProperty("zIndex",0);}this.overlays.push(G);this.bringToTop(G);return true;}else{if(G instanceof Array){I=0;J=G.length;for(H=0;H<J;H++){if(this.register(G[H])){I++;}}if(I>0){return true;}}else{return false;}}},bringToTop:function(K){var H=this.find(K),J,G,I;if(H){I=this.overlays;I.sort(this.compareZIndexDesc);G=I[0];if(G){J=E.getStyle(G.element,"zIndex");if(!isNaN(J)&&G!=H){H.cfg.setProperty("zIndex",(parseInt(J,10)+2));}I.sort(this.compareZIndexDesc);}}},find:function(G){var I=this.overlays,J=I.length,H;if(J>0){H=J-1;if(G instanceof D){do{if(I[H]==G){return I[H];}}while(H--);}else{if(typeof G=="string"){do{if(I[H].id==G){return I[H];}}while(H--);}}return null;}},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].show();}while(G--);}},hideAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].hide();}while(G--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.ContainerEffect=function(F,I,H,E,G){if(!G){G=YAHOO.util.Anim;}this.overlay=F;this.attrIn=I;this.attrOut=H;
this.targetElement=E||F.element;this.animClass=G;};var B=YAHOO.util.Dom,D=YAHOO.util.CustomEvent,C=YAHOO.util.Easing,A=YAHOO.widget.ContainerEffect;A.FADE=function(E,F){var G=new A(E,{attributes:{opacity:{from:0,to:1}},duration:F,method:C.easeIn},{attributes:{opacity:{to:0}},duration:F,method:C.easeOut},E.element);G.handleStartAnimateIn=function(I,H,J){B.addClass(J.overlay.element,"hide-select");if(!J.overlay.underlay){J.overlay.cfg.refireEvent("underlay");}if(J.overlay.underlay){J.initialUnderlayOpacity=B.getStyle(J.overlay.underlay,"opacity");J.overlay.underlay.style.filter=null;}B.setStyle(J.overlay.element,"visibility","visible");B.setStyle(J.overlay.element,"opacity",0);};G.handleCompleteAnimateIn=function(I,H,J){B.removeClass(J.overlay.element,"hide-select");if(J.overlay.element.style.filter){J.overlay.element.style.filter=null;}if(J.overlay.underlay){B.setStyle(J.overlay.underlay,"opacity",J.initialUnderlayOpacity);}J.overlay.cfg.refireEvent("iframe");J.animateInCompleteEvent.fire();};G.handleStartAnimateOut=function(I,H,J){B.addClass(J.overlay.element,"hide-select");if(J.overlay.underlay){J.overlay.underlay.style.filter=null;}};G.handleCompleteAnimateOut=function(I,H,J){B.removeClass(J.overlay.element,"hide-select");if(J.overlay.element.style.filter){J.overlay.element.style.filter=null;}B.setStyle(J.overlay.element,"visibility","hidden");B.setStyle(J.overlay.element,"opacity",1);J.overlay.cfg.refireEvent("iframe");J.animateOutCompleteEvent.fire();};G.init();return G;};A.SLIDE=function(G,I){var F=G.cfg.getProperty("x")||B.getX(G.element),K=G.cfg.getProperty("y")||B.getY(G.element),J=B.getClientWidth(),H=G.element.offsetWidth,E=new A(G,{attributes:{points:{to:[F,K]}},duration:I,method:C.easeIn},{attributes:{points:{to:[(J+25),K]}},duration:I,method:C.easeOut},G.element,YAHOO.util.Motion);E.handleStartAnimateIn=function(M,L,N){N.overlay.element.style.left=((-25)-H)+"px";N.overlay.element.style.top=K+"px";};E.handleTweenAnimateIn=function(O,N,P){var Q=B.getXY(P.overlay.element),M=Q[0],L=Q[1];if(B.getStyle(P.overlay.element,"visibility")=="hidden"&&M<F){B.setStyle(P.overlay.element,"visibility","visible");}P.overlay.cfg.setProperty("xy",[M,L],true);P.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateIn=function(M,L,N){N.overlay.cfg.setProperty("xy",[F,K],true);N.startX=F;N.startY=K;N.overlay.cfg.refireEvent("iframe");N.animateInCompleteEvent.fire();};E.handleStartAnimateOut=function(N,M,Q){var O=B.getViewportWidth(),R=B.getXY(Q.overlay.element),P=R[1],L=Q.animOut.attributes.points.to;Q.animOut.attributes.points.to=[(O+25),P];};E.handleTweenAnimateOut=function(N,M,O){var Q=B.getXY(O.overlay.element),L=Q[0],P=Q[1];O.overlay.cfg.setProperty("xy",[L,P],true);O.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateOut=function(M,L,N){B.setStyle(N.overlay.element,"visibility","hidden");N.overlay.cfg.setProperty("xy",[F,K]);N.animateOutCompleteEvent.fire();};E.init();return E;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=D.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=D.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=D.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=D.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(F,E,G){},handleTweenAnimateIn:function(F,E,G){},handleCompleteAnimateIn:function(F,E,G){},handleStartAnimateOut:function(F,E,G){},handleTweenAnimateOut:function(F,E,G){},handleCompleteAnimateOut:function(F,E,G){},toString:function(){var E="ContainerEffect";if(this.overlay){E+=" ["+this.overlay.toString()+"]";}return E;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("container_core",YAHOO.widget.Module,{version:"2.3.1",build:"541"});
(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event;YAHOO.widget.MenuManager=function(){var N=false,F={},Q={},J={},E={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent"},K=null;function D(S){var R;if(S&&S.tagName){switch(S.tagName.toUpperCase()){case"DIV":R=S.parentNode;if((B.hasClass(S,"hd")||B.hasClass(S,"bd")||B.hasClass(S,"ft"))&&R&&R.tagName&&R.tagName.toUpperCase()=="DIV"){return R;}else{return S;}break;case"LI":return S;default:R=S.parentNode;if(R){return D(R);}break;}}}function G(V){var R=A.getTarget(V),S=D(R),X,T,U,Z,Y;if(S){T=S.tagName.toUpperCase();if(T=="LI"){U=S.id;if(U&&J[U]){Z=J[U];Y=Z.parent;}}else{if(T=="DIV"){if(S.id){Y=F[S.id];}}}}if(Y){X=E[V.type];if(Z&&!Z.cfg.getProperty("disabled")){Z[X].fire(V);if(V.type=="keyup"||V.type=="mousedown"){if(K!=Z){if(K){K.blurEvent.fire();}Z.focusEvent.fire();}}}Y[X].fire(V,Z);}else{if(V.type=="mousedown"){if(K){K.blurEvent.fire();K=null;}for(var W in F){if(YAHOO.lang.hasOwnProperty(F,W)){Y=F[W];if(Y.cfg.getProperty("clicktohide")&&!(Y instanceof YAHOO.widget.MenuBar)&&Y.cfg.getProperty("position")=="dynamic"){Y.hide();}else{Y.clearActiveItem(true);}}}}else{if(V.type=="keyup"){if(K){K.blurEvent.fire();K=null;}}}}}function P(S,R,T){if(F[T.id]){this.removeMenu(T);}}function M(S,R){var T=R[0];if(T){K=T;}}function H(S,R){K=null;}function C(T,S){var R=S[0],U=this.id;if(R){Q[U]=this;}else{if(Q[U]){delete Q[U];}}}function L(S,R){O(this);}function O(S){var R=S.id;if(R&&J[R]){if(K==S){K=null;}delete J[R];S.destroyEvent.unsubscribe(L);}}function I(S,R){var U=R[0],T;if(U instanceof YAHOO.widget.MenuItem){T=U.id;if(!J[T]){J[T]=U;U.destroyEvent.subscribe(L);}}}return{addMenu:function(S){var R;if(S instanceof YAHOO.widget.Menu&&S.id&&!F[S.id]){F[S.id]=S;if(!N){R=document;A.on(R,"mouseover",G,this,true);A.on(R,"mouseout",G,this,true);A.on(R,"mousedown",G,this,true);A.on(R,"mouseup",G,this,true);A.on(R,"click",G,this,true);A.on(R,"keydown",G,this,true);A.on(R,"keyup",G,this,true);A.on(R,"keypress",G,this,true);N=true;}S.cfg.subscribeToConfigEvent("visible",C);S.destroyEvent.subscribe(P,S,this);S.itemAddedEvent.subscribe(I);S.focusEvent.subscribe(M);S.blurEvent.subscribe(H);}},removeMenu:function(U){var S,R,T;if(U){S=U.id;if(F[S]==U){R=U.getItems();if(R&&R.length>0){T=R.length-1;do{O(R[T]);}while(T--);}delete F[S];if(Q[S]==U){delete Q[S];}if(U.cfg){U.cfg.unsubscribeFromConfigEvent("visible",C);}U.destroyEvent.unsubscribe(P,U);U.itemAddedEvent.unsubscribe(I);U.focusEvent.unsubscribe(M);U.blurEvent.unsubscribe(H);}}},hideVisible:function(){var R;for(var S in Q){if(YAHOO.lang.hasOwnProperty(Q,S)){R=Q[S];if(!(R instanceof YAHOO.widget.MenuBar)&&R.cfg.getProperty("position")=="dynamic"){R.hide();}}}},getMenus:function(){return F;},getMenu:function(S){var R=F[S];if(R){return R;}},getMenuItem:function(R){var S=J[R];if(S){return S;}},getMenuItemGroup:function(U){var S=B.get(U),R,W,V,T;if(S&&S.tagName&&S.tagName.toUpperCase()=="UL"){W=S.firstChild;if(W){R=[];do{T=W.id;if(T){V=this.getMenuItem(T);if(V){R[R.length]=V;}}}while((W=W.nextSibling));if(R.length>0){return R;}}}},getFocusedMenuItem:function(){return K;},getFocusedMenu:function(){if(K){return(K.parent.getRoot());}},toString:function(){return"MenuManager";}};}();})();(function(){YAHOO.widget.Menu=function(O,N){if(N){this.parent=N.parent;this.lazyLoad=N.lazyLoad||N.lazyload;this.itemData=N.itemData||N.itemdata;}YAHOO.widget.Menu.superclass.constructor.call(this,O,N);};function I(N){if(typeof N=="string"){return("dynamic,static".indexOf((N.toLowerCase()))!=-1);}}var C=YAHOO.util.Dom,M=YAHOO.util.Event,D=YAHOO.widget.Module,B=YAHOO.widget.Overlay,F=YAHOO.widget.Menu,K=YAHOO.widget.MenuManager,L=YAHOO.util.CustomEvent,E=YAHOO.lang,H=YAHOO.env.ua,G,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","FOCUS":"focus","BLUR":"blur","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved"},J={"VISIBLE":{key:"visible",value:false,validator:E.isBoolean},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:true,validator:E.isBoolean,supercedes:["iframe","x","y","xy"]},"POSITION":{key:"position",value:"dynamic",validator:I,supercedes:["visible","iframe"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","tr"]},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:true,validator:E.isBoolean},"SHOW_DELAY":{key:"showdelay",value:250,validator:E.isNumber},"HIDE_DELAY":{key:"hidedelay",value:0,validator:E.isNumber,suppressEvent:true},"SUBMENU_HIDE_DELAY":{key:"submenuhidedelay",value:250,validator:E.isNumber},"CLICK_TO_HIDE":{key:"clicktohide",value:true,validator:E.isBoolean},"CONTAINER":{key:"container"},"MAX_HEIGHT":{key:"maxheight",value:0,validator:E.isNumber,supercedes:["iframe"]},"CLASS_NAME":{key:"classname",value:null,validator:E.isString},"DISABLED":{key:"disabled",value:false,validator:E.isBoolean,suppressEvent:true}};YAHOO.lang.extend(F,B,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",_nHideDelayId:null,_nShowDelayId:null,_nSubmenuHideDelayId:null,_nBodyScrollId:null,_bHideDelayEventHandlersAssigned:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_nMaxHeight:-1,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,itemAddedEvent:null,itemRemovedEvent:null,init:function(P,O){this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuItem;}var N;if(typeof P=="string"){N=document.getElementById(P);}else{if(P.tagName){N=P;}}if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":this.srcElement=N;
if(!N.id){N.setAttribute("id",C.generateId());}F.superclass.init.call(this,N);this.beforeInitEvent.fire(F);break;case"SELECT":this.srcElement=N;F.superclass.init.call(this,C.generateId());this.beforeInitEvent.fire(F);break;}}else{F.superclass.init.call(this,P);this.beforeInitEvent.fire(F);}if(this.element){C.addClass(this.element,this.CSS_CLASS_NAME);this.initEvent.subscribe(this._onInit);this.beforeRenderEvent.subscribe(this._onBeforeRender);this.renderEvent.subscribe(this._onRender);this.renderEvent.subscribe(this.onRender);this.beforeShowEvent.subscribe(this._onBeforeShow);this.showEvent.subscribe(this._onShow);this.beforeHideEvent.subscribe(this._onBeforeHide);this.hideEvent.subscribe(this._onHide);this.mouseOverEvent.subscribe(this._onMouseOver);this.mouseOutEvent.subscribe(this._onMouseOut);this.clickEvent.subscribe(this._onClick);this.keyDownEvent.subscribe(this._onKeyDown);this.keyPressEvent.subscribe(this._onKeyPress);if(O){this.cfg.applyConfig(O,true);}K.addMenu(this);this.initEvent.fire(F);}},_initSubTree:function(){var O=this.srcElement,N,Q,T,U,S,R,P;if(O){N=(O.tagName&&O.tagName.toUpperCase());if(N=="DIV"){U=this.body.firstChild;if(U){Q=0;T=this.GROUP_TITLE_TAG_NAME.toUpperCase();do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case T:this._aGroupTitleElements[Q]=U;break;case"UL":this._aListElements[Q]=U;this._aItemGroups[Q]=[];Q++;break;}}}while((U=U.nextSibling));if(this._aListElements[0]){C.addClass(this._aListElements[0],"first-of-type");}}}U=null;if(N){switch(N){case"DIV":S=this._aListElements;R=S.length;if(R>0){P=R-1;do{U=S[P].firstChild;if(U){do{if(U&&U.tagName&&U.tagName.toUpperCase()=="LI"){this.addItem(new this.ITEM_TYPE(U,{parent:this}),P);}}while((U=U.nextSibling));}}while(P--);}break;case"SELECT":U=O.firstChild;do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case"OPTGROUP":case"OPTION":this.addItem(new this.ITEM_TYPE(U,{parent:this}));break;}}}while((U=U.nextSibling));break;}}}},_getFirstEnabledItem:function(){var N=this.getItems(),Q=N.length,P;for(var O=0;O<Q;O++){P=N[O];if(P&&!P.cfg.getProperty("disabled")&&P.element.style.display!="none"){return P;}}},_addItemToGroup:function(T,U,X){var V,P=this.cfg.getProperty("disabled"),Y,R,W,S,O,Q;function N(Z,a){return(Z[a]||N(Z,(a+1)));}if(U instanceof this.ITEM_TYPE){V=U;V.parent=this;}else{if(typeof U=="string"){V=new this.ITEM_TYPE(U,{parent:this});}else{if(typeof U=="object"){U.parent=this;V=new this.ITEM_TYPE(U.text,U);}}}if(V){if(V.cfg.getProperty("selected")){this.activeItem=V;}Y=typeof T=="number"?T:0;R=this._getItemGroup(Y);if(!R){R=this._createItemGroup(Y);}if(typeof X=="number"){S=(X>=R.length);if(R[X]){R.splice(X,0,V);}else{R[X]=V;}W=R[X];if(W){if(S&&(!W.element.parentNode||W.element.parentNode.nodeType==11)){this._aListElements[Y].appendChild(W.element);}else{O=N(R,(X+1));if(O&&(!W.element.parentNode||W.element.parentNode.nodeType==11)){this._aListElements[Y].insertBefore(W.element,O.element);}}W.parent=this;this._subscribeToItemEvents(W);this._configureSubmenu(W);this._updateItemProperties(Y);this.itemAddedEvent.fire(W);this.changeContentEvent.fire();return W;}}else{Q=R.length;R[Q]=V;W=R[Q];if(W){if(!C.isAncestor(this._aListElements[Y],W.element)){this._aListElements[Y].appendChild(W.element);}W.element.setAttribute("groupindex",Y);W.element.setAttribute("index",Q);W.parent=this;W.index=Q;W.groupIndex=Y;this._subscribeToItemEvents(W);this._configureSubmenu(W);if(Q===0){C.addClass(W.element,"first-of-type");}this.itemAddedEvent.fire(W);this.changeContentEvent.fire();return W;}}}},_removeItemFromGroupByIndex:function(Q,O){var P=typeof Q=="number"?Q:0,R=this._getItemGroup(P),T,S,N;if(R){T=R.splice(O,1);S=T[0];if(S){this._updateItemProperties(P);if(R.length===0){N=this._aListElements[P];if(this.body&&N){this.body.removeChild(N);}this._aItemGroups.splice(P,1);this._aListElements.splice(P,1);N=this._aListElements[0];if(N){C.addClass(N,"first-of-type");}}this.itemRemovedEvent.fire(S);this.changeContentEvent.fire();return S;}}},_removeItemFromGroupByValue:function(P,N){var R=this._getItemGroup(P),S,Q,O;if(R){S=R.length;Q=-1;if(S>0){O=S-1;do{if(R[O]==N){Q=O;break;}}while(O--);if(Q>-1){return(this._removeItemFromGroupByIndex(P,Q));}}}},_updateItemProperties:function(O){var P=this._getItemGroup(O),S=P.length,R,Q,N;if(S>0){N=S-1;do{R=P[N];if(R){Q=R.element;R.index=N;R.groupIndex=O;Q.setAttribute("groupindex",O);Q.setAttribute("index",N);C.removeClass(Q,"first-of-type");}}while(N--);if(Q){C.addClass(Q,"first-of-type");}}},_createItemGroup:function(O){var N;if(!this._aItemGroups[O]){this._aItemGroups[O]=[];N=document.createElement("ul");this._aListElements[O]=N;return this._aItemGroups[O];}},_getItemGroup:function(O){var N=((typeof O=="number")?O:0);return this._aItemGroups[N];},_configureSubmenu:function(N){var O=N.cfg.getProperty("submenu");if(O){this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,O,true);this.renderEvent.subscribe(this._onParentMenuRender,O,true);O.beforeShowEvent.subscribe(this._onSubmenuBeforeShow);}},_subscribeToItemEvents:function(N){N.focusEvent.subscribe(this._onMenuItemFocus);N.blurEvent.subscribe(this._onMenuItemBlur);N.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,N,this);},_getOffsetWidth:function(){var P=this.element.cloneNode(true),O=this.getRoot(),N=O.element.parentNode,Q;C.removeClass(P,"visible");C.setStyle(P,"width","");if(N){N.appendChild(P);Q=P.offsetWidth;N.removeChild(P);return Q;}},_setWidth:function(){var O=this.element,N=C.removeClass(O,"visible"),P;if(O.parentNode.tagName.toUpperCase()=="BODY"){if(YAHOO.env.ua.opera){P=this._getOffsetWidth();}else{C.setStyle(O,"width","auto");P=O.offsetWidth;}}else{P=this._getOffsetWidth();}this.cfg.setProperty("width",(P+"px"));if(N){C.addClass(O,"visible");}},_onWidthChange:function(O,N){var P=N[0];if(P&&!this._hasSetWidthHandlers){this.itemAddedEvent.subscribe(this._setWidth);this.itemRemovedEvent.subscribe(this._setWidth);this._hasSetWidthHandlers=true;}else{if(this._hasSetWidthHandlers){this.itemAddedEvent.unsubscribe(this._setWidth);
this.itemRemovedEvent.unsubscribe(this._setWidth);this._hasSetWidthHandlers=false;}}},_onVisibleChange:function(P,O){var N=O[0];if(N){C.addClass(this.element,"visible");}else{C.removeClass(this.element,"visible");}},_cancelHideDelay:function(){var N=this.getRoot();if(N._nHideDelayId){window.clearTimeout(N._nHideDelayId);}},_execHideDelay:function(){this._cancelHideDelay();var O=this.getRoot(),P=this;function N(){if(O.activeItem){O.clearActiveItem();}if(O==P&&!(P instanceof YAHOO.widget.MenuBar)&&P.cfg.getProperty("position")=="dynamic"){P.hide();}}O._nHideDelayId=window.setTimeout(N,O.cfg.getProperty("hidedelay"));},_cancelShowDelay:function(){var N=this.getRoot();if(N._nShowDelayId){window.clearTimeout(N._nShowDelayId);}},_execShowDelay:function(P){var O=this.getRoot();function N(){if(P.parent.cfg.getProperty("selected")){P.show();}}O._nShowDelayId=window.setTimeout(N,O.cfg.getProperty("showdelay"));},_execSubmenuHideDelay:function(Q,O,N){var P=this;Q._nSubmenuHideDelayId=window.setTimeout(function(){if(P._nCurrentMouseX>(O+10)){Q._nSubmenuHideDelayId=window.setTimeout(function(){Q.hide();},N);}else{Q.hide();}},50);},_disableScrollHeader:function(){if(!this._bHeaderDisabled){C.addClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=true;}},_disableScrollFooter:function(){if(!this._bFooterDisabled){C.addClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=true;}},_enableScrollHeader:function(){if(this._bHeaderDisabled){C.removeClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=false;}},_enableScrollFooter:function(){if(this._bFooterDisabled){C.removeClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=false;}},_onMouseOver:function(W,R){if(this._bStopMouseEventHandlers){return false;}var X=R[0],V=R[1],N=M.getTarget(X),O,Q,U,P,T,S;if(!this._bHandledMouseOverEvent&&(N==this.element||C.isAncestor(this.element,N))){this._nCurrentMouseX=0;M.on(this.element,"mousemove",this._onMouseMove,this,true);this.clearActiveItem();if(this.parent&&this._nSubmenuHideDelayId){window.clearTimeout(this._nSubmenuHideDelayId);this.parent.cfg.setProperty("selected",true);O=this.parent.parent;O._bHandledMouseOutEvent=true;O._bHandledMouseOverEvent=false;}this._bHandledMouseOverEvent=true;this._bHandledMouseOutEvent=false;}if(V&&!V.handledMouseOverEvent&&!V.cfg.getProperty("disabled")&&(N==V.element||C.isAncestor(V.element,N))){Q=this.cfg.getProperty("showdelay");U=(Q>0);if(U){this._cancelShowDelay();}P=this.activeItem;if(P){P.cfg.setProperty("selected",false);}T=V.cfg;T.setProperty("selected",true);if(this.hasFocus()){V.focus();}if(this.cfg.getProperty("autosubmenudisplay")){S=T.getProperty("submenu");if(S){if(U){this._execShowDelay(S);}else{S.show();}}}V.handledMouseOverEvent=true;V.handledMouseOutEvent=false;}},_onMouseOut:function(V,P){if(this._bStopMouseEventHandlers){return false;}var W=P[0],T=P[1],Q=M.getRelatedTarget(W),U=false,S,R,N,O;if(T&&!T.cfg.getProperty("disabled")){S=T.cfg;R=S.getProperty("submenu");if(R&&(Q==R.element||C.isAncestor(R.element,Q))){U=true;}if(!T.handledMouseOutEvent&&((Q!=T.element&&!C.isAncestor(T.element,Q))||U)){if(!U){T.cfg.setProperty("selected",false);if(R){N=this.cfg.getProperty("submenuhidedelay");O=this.cfg.getProperty("showdelay");if(!(this instanceof YAHOO.widget.MenuBar)&&N>0&&O>=N){this._execSubmenuHideDelay(R,M.getPageX(W),N);}else{R.hide();}}}T.handledMouseOutEvent=true;T.handledMouseOverEvent=false;}}if(!this._bHandledMouseOutEvent&&((Q!=this.element&&!C.isAncestor(this.element,Q))||U)){M.removeListener(this.element,"mousemove",this._onMouseMove);this._nCurrentMouseX=M.getPageX(W);this._bHandledMouseOutEvent=true;this._bHandledMouseOverEvent=false;}},_onMouseMove:function(O,N){if(this._bStopMouseEventHandlers){return false;}this._nCurrentMouseX=M.getPageX(O);},_onClick:function(U,P){var V=P[0],S=P[1],N,R,Q,T,W,O;if(S&&!S.cfg.getProperty("disabled")){N=M.getTarget(V);R=S.cfg;Q=R.getProperty("submenu");if(N==S.submenuIndicator&&Q){if(Q.cfg.getProperty("visible")){Q.hide();Q.parent.focus();}else{this.clearActiveItem();R.setProperty("selected",true);Q.show();Q.setInitialFocus();}M.preventDefault(V);}else{T=R.getProperty("url");if((T.substr(0,1)=="#")){M.preventDefault(V);S.focus();}if(!Q){O=this.getRoot();if(O instanceof YAHOO.widget.MenuBar||O.cfg.getProperty("position")=="static"){O.clearActiveItem();}else{if(O.cfg.getProperty("clicktohide")){O.hide();}}}}}},_onKeyDown:function(b,V){var Y=V[0],X=V[1],f=this,U,Z,O,S,c,N,e,R,a,Q,W,d,T;function P(){f._bStopMouseEventHandlers=true;window.setTimeout(function(){f._bStopMouseEventHandlers=false;},10);}if(X&&!X.cfg.getProperty("disabled")){Z=X.cfg;O=this.parent;switch(Y.keyCode){case 38:case 40:c=(Y.keyCode==38)?X.getPreviousEnabledSibling():X.getNextEnabledSibling();if(c){this.clearActiveItem();c.cfg.setProperty("selected",true);c.focus();if(this.cfg.getProperty("maxheight")>0){N=this.body;e=N.scrollTop;R=N.offsetHeight;a=this.getItems();Q=a.length-1;W=c.element.offsetTop;if(Y.keyCode==40){if(W>=(R+e)){N.scrollTop=W-R;}else{if(W<=e){N.scrollTop=0;}}if(c==a[Q]){N.scrollTop=c.element.offsetTop;}}else{if(W<=e){N.scrollTop=W-c.element.offsetHeight;}else{if(W>=(e+R)){N.scrollTop=W;}}if(c==a[0]){N.scrollTop=0;}}e=N.scrollTop;d=N.scrollHeight-N.offsetHeight;if(e===0){this._disableScrollHeader();this._enableScrollFooter();}else{if(e==d){this._enableScrollHeader();this._disableScrollFooter();}else{this._enableScrollHeader();this._enableScrollFooter();}}}}M.preventDefault(Y);P();break;case 39:U=Z.getProperty("submenu");if(U){if(!Z.getProperty("selected")){Z.setProperty("selected",true);}U.show();U.setInitialFocus();U.setInitialSelection();}else{S=this.getRoot();if(S instanceof YAHOO.widget.MenuBar){c=S.activeItem.getNextEnabledSibling();if(c){S.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");if(U){U.show();}c.focus();}}}M.preventDefault(Y);P();break;case 37:if(O){T=O.parent;if(T instanceof YAHOO.widget.MenuBar){c=T.activeItem.getPreviousEnabledSibling();
if(c){T.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");if(U){U.show();}c.focus();}}else{this.hide();O.focus();}}M.preventDefault(Y);P();break;}}if(Y.keyCode==27){if(this.cfg.getProperty("position")=="dynamic"){this.hide();if(this.parent){this.parent.focus();}}else{if(this.activeItem){U=this.activeItem.cfg.getProperty("submenu");if(U&&U.cfg.getProperty("visible")){U.hide();this.activeItem.focus();}else{this.activeItem.blur();this.activeItem.cfg.setProperty("selected",false);}}}M.preventDefault(Y);}},_onKeyPress:function(P,O){var N=O[0];if(N.keyCode==40||N.keyCode==38){M.preventDefault(N);}},_onTextResize:function(O,N,P){if(YAHOO.env.ua.gecko&&!this._handleResize){this._handleResize=true;return ;}var Q=this.cfg;if(Q.getProperty("position")=="dynamic"){Q.setProperty("width",(this._getOffsetWidth()+"px"));}},_onScrollTargetMouseOver:function(S,V){this._cancelHideDelay();var P=M.getTarget(S),Q=this.body,U=this,N,O;function T(){var W=Q.scrollTop;if(W<N){Q.scrollTop=(W+1);U._enableScrollHeader();}else{Q.scrollTop=N;window.clearInterval(U._nBodyScrollId);U._disableScrollFooter();}}function R(){var W=Q.scrollTop;if(W>0){Q.scrollTop=(W-1);U._enableScrollFooter();}else{Q.scrollTop=0;window.clearInterval(U._nBodyScrollId);U._disableScrollHeader();}}if(C.hasClass(P,"hd")){O=R;}else{N=Q.scrollHeight-Q.offsetHeight;O=T;}this._nBodyScrollId=window.setInterval(O,10);},_onScrollTargetMouseOut:function(O,N){window.clearInterval(this._nBodyScrollId);this._cancelHideDelay();},_onInit:function(O,N){this.cfg.subscribeToConfigEvent("width",this._onWidthChange);this.cfg.subscribeToConfigEvent("visible",this._onVisibleChange);var P=!this.parent,Q=this.lazyLoad;if(((P&&!Q)||(P&&(this.cfg.getProperty("visible")||this.cfg.getProperty("position")=="static"))||(!P&&!Q))&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){this.addItems(this.itemData);}}else{if(Q){this.cfg.fireQueue();}}},_onBeforeRender:function(V,Q){var R=this.cfg,P=this.element,S=this._aListElements.length,T=true,O=0,N,U;if(S>0){do{N=this._aListElements[O];if(N){if(T){C.addClass(N,"first-of-type");T=false;}if(!C.isAncestor(P,N)){this.appendToBody(N);}U=this._aGroupTitleElements[O];if(U){if(!C.isAncestor(P,U)){N.parentNode.insertBefore(U,N);}C.addClass(N,"hastitle");}}O++;}while(O<S);}},_onRender:function(O,N){D.textResizeEvent.subscribe(this._onTextResize,this,true);if(this.cfg.getProperty("position")=="dynamic"&&!this.cfg.getProperty("width")){this._setWidth();}},_onBeforeShow:function(V,R){var U,N,T,Q,P,O,S;if(this.lazyLoad&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()=="SELECT"){U=this.itemData.length;for(N=0;N<U;N++){if(this.itemData[N].tagName){this.addItem((new this.ITEM_TYPE(this.itemData[N])));}}}else{this.addItems(this.itemData);}}S=this.srcElement;if(S){if(S.tagName.toUpperCase()=="SELECT"){if(C.inDocument(S)){this.render(S.parentNode);}else{this.render(this.cfg.getProperty("container"));}}else{this.render();}}else{if(this.parent){this.render(this.parent.element);}else{this.render(this.cfg.getProperty("container"));this.cfg.refireEvent("xy");}}}if(!(this instanceof YAHOO.widget.MenuBar)&&this.cfg.getProperty("position")=="dynamic"){T=C.getViewportHeight();if(this.parent&&this.parent.parent instanceof YAHOO.widget.MenuBar){Q=YAHOO.util.Region.getRegion(this.parent.element);T=(T-Q.bottom);}if(this.element.offsetHeight>=T){P=this.cfg.getProperty("maxheight");this._nMaxHeight=P;this.cfg.setProperty("maxheight",(T-20));}if(this.cfg.getProperty("maxheight")>0){O=this.body;if(O.scrollTop>0){O.scrollTop=0;}this._disableScrollHeader();this._enableScrollFooter();}}},_onShow:function(Q,P){var T=this.parent,S,N,O;function R(V){var U;if(V.type=="mousedown"||(V.type=="keydown"&&V.keyCode==27)){U=M.getTarget(V);if(U!=S.element||!C.isAncestor(S.element,U)){S.cfg.setProperty("autosubmenudisplay",false);M.removeListener(document,"mousedown",R);M.removeListener(document,"keydown",R);}}}if(T){S=T.parent;N=S.cfg.getProperty("submenualignment");O=this.cfg.getProperty("submenualignment");if((N[0]!=O[0])&&(N[1]!=O[1])){this.cfg.setProperty("submenualignment",[N[0],N[1]]);}if(!S.cfg.getProperty("autosubmenudisplay")&&(S instanceof YAHOO.widget.MenuBar||S.cfg.getProperty("position")=="static")){S.cfg.setProperty("autosubmenudisplay",true);M.on(document,"mousedown",R);M.on(document,"keydown",R);}}},_onBeforeHide:function(P,O){var N=this.activeItem,R,Q;if(N){R=N.cfg;R.setProperty("selected",false);Q=R.getProperty("submenu");if(Q){Q.hide();}}if(this.getRoot()==this){this.blur();}},_onHide:function(O,N){if(this._nMaxHeight!=-1){this.cfg.setProperty("maxheight",this._nMaxHeight);this._nMaxHeight=-1;}},_onParentMenuConfigChange:function(O,N,R){var P=N[0][0],Q=N[0][1];switch(P){case"iframe":case"constraintoviewport":case"hidedelay":case"showdelay":case"submenuhidedelay":case"clicktohide":case"effect":case"classname":R.cfg.setProperty(P,Q);break;}},_onParentMenuRender:function(O,N,S){var P=S.parent.parent,Q={constraintoviewport:P.cfg.getProperty("constraintoviewport"),xy:[0,0],clicktohide:P.cfg.getProperty("clicktohide"),effect:P.cfg.getProperty("effect"),showdelay:P.cfg.getProperty("showdelay"),hidedelay:P.cfg.getProperty("hidedelay"),submenuhidedelay:P.cfg.getProperty("submenuhidedelay"),classname:P.cfg.getProperty("classname")},R;if(this.cfg.getProperty("position")==P.cfg.getProperty("position")){Q.iframe=P.cfg.getProperty("iframe");}S.cfg.applyConfig(Q);if(!this.lazyLoad){R=this.parent.element;if(this.element.parentNode==R){this.render();}else{this.render(R);}}},_onSubmenuBeforeShow:function(P,O){var Q=this.parent,N=Q.parent.cfg.getProperty("submenualignment");this.cfg.setProperty("context",[Q.element,N[0],N[1]]);var R=Q.parent.body.scrollTop;if((H.gecko||H.webkit)&&R>0){this.cfg.setProperty("y",(this.cfg.getProperty("y")-R));}},_onMenuItemFocus:function(O,N){this.parent.focusEvent.fire(this);
},_onMenuItemBlur:function(O,N){this.parent.blurEvent.fire(this);},_onMenuItemConfigChange:function(P,O,N){var R=O[0][0],S=O[0][1],Q;switch(R){case"selected":if(S===true){this.activeItem=N;}break;case"submenu":Q=O[0][1];if(Q){this._configureSubmenu(N);}break;case"text":case"helptext":if(this.element.style.width){this.cfg.setProperty("width",(this._getOffsetWidth()+"px"));}break;}},enforceConstraints:function(Q,P,W){var i=this.parent,b,S,T,V,U,R,d,h,a,f,e,Z,Y,g,O,N,c,X;if(i&&!(i.parent instanceof YAHOO.widget.MenuBar)){b=this.element;S=this.cfg;T=P[0];V=T[0];U=T[1];R=b.offsetHeight;d=b.offsetWidth;h=C.getViewportWidth();a=C.getViewportHeight();f=C.getDocumentScrollLeft();e=C.getDocumentScrollTop();Z=(i.parent instanceof YAHOO.widget.MenuBar)?0:10;Y=e+Z;g=f+Z;O=e+a-R-Z;N=f+h-d-Z;c=S.getProperty("context");X=c?c[0]:null;if(V<10){V=g;}else{if((V+d)>h){if(X&&((V-X.offsetWidth)>d)){V=(V-(X.offsetWidth+d));}else{V=N;}}}if(U<10){U=Y;}else{if(U>O){if(X&&(U>R)){U=((U+X.offsetHeight)-R);}else{U=O;}}}S.setProperty("x",V,true);S.setProperty("y",U,true);S.setProperty("xy",[V,U],true);}else{if(this==this.getRoot()&&this.cfg.getProperty("position")=="dynamic"){F.superclass.enforceConstraints.call(this,Q,P,W);}}},configVisible:function(P,O,Q){var N,R;if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configVisible.call(this,P,O,Q);}else{N=O[0];R=C.getStyle(this.element,"display");C.setStyle(this.element,"visibility","visible");if(N){if(R!="block"){this.beforeShowEvent.fire();C.setStyle(this.element,"display","block");this.showEvent.fire();}}else{if(R=="block"){this.beforeHideEvent.fire();C.setStyle(this.element,"display","none");this.hideEvent.fire();}}}},configPosition:function(P,O,S){var R=this.element,Q=O[0]=="static"?"static":"absolute",U=C.getStyle(R,"position"),T=this.cfg,N;C.setStyle(this.element,"position",Q);if(Q=="static"){T.setProperty("iframe",false);C.setStyle(this.element,"display","block");T.setProperty("visible",true);}else{if(U!="absolute"){T.setProperty("iframe",(H.ie==6?true:false));}C.setStyle(this.element,"visibility","hidden");}if(Q=="absolute"){N=T.getProperty("zindex");if(!N||N===0){N=this.parent?(this.parent.parent.cfg.getProperty("zindex")+1):1;T.setProperty("zindex",N);}}},configIframe:function(O,N,P){if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configIframe.call(this,O,N,P);}},configHideDelay:function(O,N,R){var T=N[0],S=this.mouseOutEvent,P=this.mouseOverEvent,Q=this.keyDownEvent;if(T>0){if(!this._bHideDelayEventHandlersAssigned){S.subscribe(this._execHideDelay);P.subscribe(this._cancelHideDelay);Q.subscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=true;}}else{S.unsubscribe(this._execHideDelay);P.unsubscribe(this._cancelHideDelay);Q.unsubscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=false;}},configContainer:function(O,N,Q){var P=N[0];if(typeof P=="string"){this.cfg.setProperty("container",document.getElementById(P),true);}},_setMaxHeight:function(O,N,P){this.cfg.setProperty("maxheight",P);this.renderEvent.unsubscribe(this._setMaxHeight);},configMaxHeight:function(V,Q,T){var P=Q[0],O=this.body,U=this.header,N=this.footer,S=this._onScrollTargetMouseOver,W=this._onScrollTargetMouseOut,R;if(this.lazyLoad&&!O){this.renderEvent.unsubscribe(this._setMaxHeight);if(P>0){this.renderEvent.subscribe(this._setMaxHeight,P,this);}return ;}C.setStyle(O,"height","auto");C.removeClass(O,"yui-menu-body-scrolled");if((P>0)&&(O.offsetHeight>P)){if(!this.cfg.getProperty("width")){this._setWidth();}if(!U&&!N){this.setHeader("&#32;");this.setFooter("&#32;");U=this.header;N=this.footer;C.addClass(U,"topscrollbar");C.addClass(N,"bottomscrollbar");this.element.insertBefore(U,O);this.element.appendChild(N);M.on(U,"mouseover",S,this,true);M.on(U,"mouseout",W,this,true);M.on(N,"mouseover",S,this,true);M.on(N,"mouseout",W,this,true);}C.addClass(O,"yui-menu-body-scrolled");R=(P-(this.footer.offsetHeight+this.header.offsetHeight));C.setStyle(O,"height",(R+"px"));}else{if(U&&N){M.removeListener(U,"mouseover",S);M.removeListener(U,"mouseout",W);M.removeListener(N,"mouseover",S);M.removeListener(N,"mouseout",W);this.element.removeChild(U);this.element.removeChild(N);this.header=null;this.footer=null;}}this.cfg.refireEvent("iframe");},configClassName:function(P,O,Q){var N=O[0];if(this._sClassName){C.removeClass(this.element,this._sClassName);}C.addClass(this.element,N);this._sClassName=N;},_onItemAdded:function(O,N){var P=N[0];if(P){P.cfg.setProperty("disabled",true);}},configDisabled:function(P,O,S){var R=O[0],N=this.getItems(),T,Q;if(E.isArray(N)){T=N.length;if(T>0){Q=T-1;do{N[Q].cfg.setProperty("disabled",R);}while(Q--);}if(R){C.addClass(this.element,"disabled");this.itemAddedEvent.subscribe(this._onItemAdded);}else{C.removeClass(this.element,"disabled");this.itemAddedEvent.unsubscribe(this._onItemAdded);}}},onRender:function(R,Q){function S(){var V=this.element,U=this._shadow;if(U){U.style.width=(V.offsetWidth+6)+"px";U.style.height=(V.offsetHeight+1)+"px";}}function O(){C.addClass(this._shadow,"yui-menu-shadow-visible");}function N(){C.removeClass(this._shadow,"yui-menu-shadow-visible");}function T(){var V=this._shadow,U,W;if(!V){U=this.element;W=this;if(!G){G=document.createElement("div");G.className="yui-menu-shadow";}V=G.cloneNode(false);U.appendChild(V);this._shadow=V;O.call(this);this.beforeShowEvent.subscribe(O);this.beforeHideEvent.subscribe(N);if(H.ie){window.setTimeout(function(){S.call(W);W.syncIframe();},0);this.cfg.subscribeToConfigEvent("width",S);this.cfg.subscribeToConfigEvent("height",S);this.cfg.subscribeToConfigEvent("maxheight",S);this.changeContentEvent.subscribe(S);D.textResizeEvent.subscribe(S,W,true);this.destroyEvent.subscribe(function(){D.textResizeEvent.unsubscribe(S,W);});}}}function P(){T.call(this);this.beforeShowEvent.unsubscribe(P);}if(this.cfg.getProperty("position")=="dynamic"){if(this.cfg.getProperty("visible")){T.call(this);}else{this.beforeShowEvent.subscribe(P);}}},initEvents:function(){F.superclass.initEvents.call(this);
var N=L.LIST;this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);this.mouseOverEvent.signature=N;this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);this.mouseOutEvent.signature=N;this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);this.mouseDownEvent.signature=N;this.mouseUpEvent=this.createEvent(A.MOUSE_UP);this.mouseUpEvent.signature=N;this.clickEvent=this.createEvent(A.CLICK);this.clickEvent.signature=N;this.keyPressEvent=this.createEvent(A.KEY_PRESS);this.keyPressEvent.signature=N;this.keyDownEvent=this.createEvent(A.KEY_DOWN);this.keyDownEvent.signature=N;this.keyUpEvent=this.createEvent(A.KEY_UP);this.keyUpEvent.signature=N;this.focusEvent=this.createEvent(A.FOCUS);this.focusEvent.signature=N;this.blurEvent=this.createEvent(A.BLUR);this.blurEvent.signature=N;this.itemAddedEvent=this.createEvent(A.ITEM_ADDED);this.itemAddedEvent.signature=N;this.itemRemovedEvent=this.createEvent(A.ITEM_REMOVED);this.itemRemovedEvent.signature=N;},getRoot:function(){var O=this.parent,N;if(O){N=O.parent;return N?N.getRoot():this;}else{return this;}},toString:function(){var O="Menu",N=this.id;if(N){O+=(" "+N);}return O;},setItemGroupTitle:function(S,R){var Q,P,O,N;if(typeof S=="string"&&S.length>0){Q=typeof R=="number"?R:0;P=this._aGroupTitleElements[Q];if(P){P.innerHTML=S;}else{P=document.createElement(this.GROUP_TITLE_TAG_NAME);P.innerHTML=S;this._aGroupTitleElements[Q]=P;}O=this._aGroupTitleElements.length-1;do{if(this._aGroupTitleElements[O]){C.removeClass(this._aGroupTitleElements[O],"first-of-type");N=O;}}while(O--);if(N!==null){C.addClass(this._aGroupTitleElements[N],"first-of-type");}this.changeContentEvent.fire();}},addItem:function(N,O){if(N){return this._addItemToGroup(O,N);}},addItems:function(Q,P){var S,N,R,O;if(E.isArray(Q)){S=Q.length;N=[];for(O=0;O<S;O++){R=Q[O];if(R){if(E.isArray(R)){N[N.length]=this.addItems(R,O);}else{N[N.length]=this._addItemToGroup(P,R);}}}if(N.length){return N;}}},insertItem:function(N,O,P){if(N){return this._addItemToGroup(P,N,O);}},removeItem:function(N,O){var P;if(typeof N!="undefined"){if(N instanceof YAHOO.widget.MenuItem){P=this._removeItemFromGroupByValue(O,N);}else{if(typeof N=="number"){P=this._removeItemFromGroupByIndex(O,N);}}if(P){P.destroy();return P;}}},getItems:function(){var P=this._aItemGroups,O,N=[];if(E.isArray(P)){O=P.length;return((O==1)?P[0]:(Array.prototype.concat.apply(N,P)));}},getItemGroups:function(){return this._aItemGroups;},getItem:function(N,O){var P;if(typeof N=="number"){P=this._getItemGroup(O);if(P){return P[N];}}},getSubmenus:function(){var O=this.getItems(),S=O.length,N,P,R,Q;if(S>0){N=[];for(Q=0;Q<S;Q++){R=O[Q];if(R){P=R.cfg.getProperty("submenu");if(P){N[N.length]=P;}}}}return N;},clearContent:function(){var R=this.getItems(),O=R.length,P=this.element,Q=this.body,V=this.header,N=this.footer,U,T,S;if(O>0){S=O-1;do{U=R[S];if(U){T=U.cfg.getProperty("submenu");if(T){this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,T);this.renderEvent.unsubscribe(this._onParentMenuRender,T);}this.removeItem(U);}}while(S--);}if(V){M.purgeElement(V);P.removeChild(V);}if(N){M.purgeElement(N);P.removeChild(N);}if(Q){M.purgeElement(Q);Q.innerHTML="";}this.activeItem=null;this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];this.cfg.setProperty("width",null);},destroy:function(){D.textResizeEvent.unsubscribe(this._onTextResize,this);this.clearContent();this._aItemGroups=null;this._aListElements=null;this._aGroupTitleElements=null;F.superclass.destroy.call(this);},setInitialFocus:function(){var N=this._getFirstEnabledItem();if(N){N.focus();}},setInitialSelection:function(){var N=this._getFirstEnabledItem();if(N){N.cfg.setProperty("selected",true);}},clearActiveItem:function(P){if(this.cfg.getProperty("showdelay")>0){this._cancelShowDelay();}var N=this.activeItem,Q,O;if(N){Q=N.cfg;if(P){N.blur();}Q.setProperty("selected",false);O=Q.getProperty("submenu");if(O){O.hide();}this.activeItem=null;}},focus:function(){if(!this.hasFocus()){this.setInitialFocus();}},blur:function(){var N;if(this.hasFocus()){N=K.getFocusedMenuItem();if(N){N.blur();}}},hasFocus:function(){return(K.getFocusedMenu()==this.getRoot());},subscribe:function(){function R(T,S,V){var W=S[0],U=W.cfg.getProperty("submenu");if(U){U.subscribe.apply(U,V);}}F.superclass.subscribe.apply(this,arguments);F.superclass.subscribe.call(this,"itemAdded",R,arguments);var N=this.getSubmenus(),P,O,Q;if(N){P=N.length;if(P>0){Q=P-1;do{O=N[Q];O.subscribe.apply(O,arguments);}while(Q--);}}},initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);var N=this.cfg;N.addProperty(J.VISIBLE.key,{handler:this.configVisible,value:J.VISIBLE.value,validator:J.VISIBLE.validator});N.addProperty(J.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:J.CONSTRAIN_TO_VIEWPORT.value,validator:J.CONSTRAIN_TO_VIEWPORT.validator,supercedes:J.CONSTRAIN_TO_VIEWPORT.supercedes});N.addProperty(J.POSITION.key,{handler:this.configPosition,value:J.POSITION.value,validator:J.POSITION.validator,supercedes:J.POSITION.supercedes});N.addProperty(J.SUBMENU_ALIGNMENT.key,{value:J.SUBMENU_ALIGNMENT.value});N.addProperty(J.AUTO_SUBMENU_DISPLAY.key,{value:J.AUTO_SUBMENU_DISPLAY.value,validator:J.AUTO_SUBMENU_DISPLAY.validator});N.addProperty(J.SHOW_DELAY.key,{value:J.SHOW_DELAY.value,validator:J.SHOW_DELAY.validator});N.addProperty(J.HIDE_DELAY.key,{handler:this.configHideDelay,value:J.HIDE_DELAY.value,validator:J.HIDE_DELAY.validator,suppressEvent:J.HIDE_DELAY.suppressEvent});N.addProperty(J.SUBMENU_HIDE_DELAY.key,{value:J.SUBMENU_HIDE_DELAY.value,validator:J.SUBMENU_HIDE_DELAY.validator});N.addProperty(J.CLICK_TO_HIDE.key,{value:J.CLICK_TO_HIDE.value,validator:J.CLICK_TO_HIDE.validator});N.addProperty(J.CONTAINER.key,{handler:this.configContainer,value:document.body});N.addProperty(J.MAX_HEIGHT.key,{handler:this.configMaxHeight,value:J.MAX_HEIGHT.value,validator:J.MAX_HEIGHT.validator});N.addProperty(J.CLASS_NAME.key,{handler:this.configClassName,value:J.CLASS_NAME.value,validator:J.CLASS_NAME.validator});
N.addProperty(J.DISABLED.key,{handler:this.configDisabled,value:J.DISABLED.value,validator:J.DISABLED.validator,suppressEvent:J.DISABLED.suppressEvent});}});})();(function(){YAHOO.widget.MenuItem=function(K,J){if(K){if(J){this.parent=J.parent;this.value=J.value;this.id=J.id;}this.init(K,J);}};var B=YAHOO.util.Dom,C=YAHOO.widget.Module,E=YAHOO.widget.Menu,H=YAHOO.widget.MenuItem,I=YAHOO.util.CustomEvent,F=YAHOO.lang,D,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved","FOCUS":"focus","BLUR":"blur","DESTROY":"destroy"},G={"TEXT":{key:"text",value:"",validator:F.isString,suppressEvent:true},"HELP_TEXT":{key:"helptext",supercedes:["text"]},"URL":{key:"url",value:"#",suppressEvent:true},"TARGET":{key:"target",suppressEvent:true},"EMPHASIS":{key:"emphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"STRONG_EMPHASIS":{key:"strongemphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"CHECKED":{key:"checked",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"DISABLED":{key:"disabled",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"SELECTED":{key:"selected",value:false,validator:F.isBoolean,suppressEvent:true},"SUBMENU":{key:"submenu",supercedes:["text"]},"ONCLICK":{key:"onclick"},"CLASS_NAME":{key:"classname",value:null,validator:F.isString}};H.prototype={COLLAPSED_SUBMENU_INDICATOR_TEXT:"Submenu collapsed.  Click to expand submenu.",EXPANDED_SUBMENU_INDICATOR_TEXT:"Submenu expanded.  Click to collapse submenu.",DISABLED_SUBMENU_INDICATOR_TEXT:"Submenu collapsed.  (Item disabled.)",CHECKED_TEXT:"Menu item checked.",DISABLED_CHECKED_TEXT:"Checked. (Item disabled.)",CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oCheckedIndicator:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:H,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,submenuIndicator:null,browser:C.prototype.browser,id:null,destroyEvent:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,focusEvent:null,blurEvent:null,init:function(J,R){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=E;}this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();var O=I.LIST,N=this.cfg,P="#",Q,K,M,L;if(F.isString(J)){this._createRootNodeStructure();N.queueProperty("text",J);}else{if(J&&J.tagName){switch(J.tagName.toUpperCase()){case"OPTION":this._createRootNodeStructure();N.queueProperty("text",J.text);this.value=J.value;this.srcElement=J;break;case"OPTGROUP":this._createRootNodeStructure();N.queueProperty("text",J.label);this.srcElement=J;this._initSubTree();break;case"LI":Q=B.getFirstChild(J);if(Q){P=Q.getAttribute("href");if(YAHOO.env.ua.ie){P=P.substring(document.location.href.length,P.length);}K=Q.getAttribute("target");M=Q.innerHTML;}this.srcElement=J;this.element=J;this._oAnchor=Q;N.setProperty("text",M,true);N.setProperty("url",P,true);N.setProperty("target",K,true);this._initSubTree();break;}}}if(this.element){L=this.element.id;if(!L){L=this.id||B.generateId();this.element.id=L;}this.id=L;B.addClass(this.element,this.CSS_CLASS_NAME);B.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);this.mouseOverEvent.signature=O;this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);this.mouseOutEvent.signature=O;this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);this.mouseDownEvent.signature=O;this.mouseUpEvent=this.createEvent(A.MOUSE_UP);this.mouseUpEvent.signature=O;this.clickEvent=this.createEvent(A.CLICK);this.clickEvent.signature=O;this.keyPressEvent=this.createEvent(A.KEY_PRESS);this.keyPressEvent.signature=O;this.keyDownEvent=this.createEvent(A.KEY_DOWN);this.keyDownEvent.signature=O;this.keyUpEvent=this.createEvent(A.KEY_UP);this.keyUpEvent.signature=O;this.focusEvent=this.createEvent(A.FOCUS);this.focusEvent.signature=O;this.blurEvent=this.createEvent(A.BLUR);this.blurEvent.signature=O;this.destroyEvent=this.createEvent(A.DESTROY);this.destroyEvent.signature=O;if(R){N.applyConfig(R);}N.fireQueue();}},_createRootNodeStructure:function(){var J,K;if(!D){D=document.createElement("li");D.innerHTML="<a href=\"#\"></a>";}J=D.cloneNode(true);J.className=this.CSS_CLASS_NAME;K=J.firstChild;K.className=this.CSS_LABEL_CLASS_NAME;this.element=J;this._oAnchor=K;},_initSubTree:function(){var P=this.srcElement,L=this.cfg,N,M,K,J,O;if(P.childNodes.length>0){if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()=="SELECT"){L.setProperty("submenu",{id:B.generateId(),itemdata:P.childNodes});}else{N=P.firstChild;M=[];do{if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":L.setProperty("submenu",N);break;case"OPTION":M[M.length]=N;break;}}}while((N=N.nextSibling));K=M.length;if(K>0){J=new this.SUBMENU_TYPE(B.generateId());L.setProperty("submenu",J);for(O=0;O<K;O++){J.addItem((new J.ITEM_TYPE(M[O])));}}}}},configText:function(V,M,P){var K=M[0],N=this.cfg,S=this._oAnchor,J=N.getProperty("helptext"),U="",T="",O=N.getProperty("submenu"),L="",Q="",R="";if(K){if(J){U="<em class=\"helptext\">"+J+"</em>";}if(N.getProperty("checked")){T="<em class=\"checkedindicator\">"+this.CHECKED_TEXT+"</em>";}if(O){L="<em class=\"submenuindicator\">"+((O instanceof E&&O.cfg.getProperty("visible"))?this.EXPANDED_SUBMENU_INDICATOR_TEXT:this.COLLAPSED_SUBMENU_INDICATOR_TEXT)+"</em>";}if(N.getProperty("emphasis")){Q="<em>";R="</em>";}if(N.getProperty("strongemphasis")){Q="<strong>";R="</strong>";}S.innerHTML=(Q+K+R+U+T+L);if(O){this.submenuIndicator=S.lastChild;}}},configHelpText:function(L,K,J){var M=K[0],N=this._oAnchor;if(M){B.addClass(N,"hashelptext");}else{B.removeClass(N,"hashelptext");}this.cfg.refireEvent("text");
},configURL:function(L,K,J){var N=K[0];if(!N){N="#";}var M=this._oAnchor;if(YAHOO.env.ua.opera){M.removeAttribute("href");}M.setAttribute("href",N);},configTarget:function(M,L,K){var J=L[0],N=this._oAnchor;if(J&&J.length>0){N.setAttribute("target",J);}else{N.removeAttribute("target");}},configEmphasis:function(L,K,J){var N=K[0],M=this.cfg;if(N&&M.getProperty("strongemphasis")){M.setProperty("strongemphasis",false);}M.refireEvent("text");},configStrongEmphasis:function(M,L,K){var J=L[0],N=this.cfg;if(J&&N.getProperty("emphasis")){N.setProperty("emphasis",false);}N.refireEvent("text");},configChecked:function(L,K,J){var N=K[0],M=this._oAnchor;if(N){B.addClass(M,"checked");}else{B.removeClass(M,"checked");}this.cfg.refireEvent("text");},configDisabled:function(L,K,J){var M=K[0],O=this.cfg,N=this._oAnchor;if(M){if(O.getProperty("selected")){O.setProperty("selected",false);}N.removeAttribute("href");B.addClass(N,"disabled");}else{N.setAttribute("href",O.getProperty("url"));B.removeClass(N,"disabled");}},configSelected:function(L,K,J){var N,M;if(!this.cfg.getProperty("disabled")){N=K[0];M=this._oAnchor;if(YAHOO.env.ua.opera){M.blur();}if(N){B.addClass(M,"selected");}else{B.removeClass(M,"selected");}if(this.hasFocus()&&YAHOO.env.ua.opera){M.focus();}}},_onSubmenuShow:function(L,K){var J=this.submenuIndicator.firstChild;if(J){J.nodeValue=this.EXPANDED_SUBMENU_INDICATOR_TEXT;}},_onSubmenuBeforeHide:function(M,L){var N=this.parent,J;function K(){N._oAnchor.blur();J.beforeHideEvent.unsubscribe(K);}if(N.hasFocus()){J=N.parent;J.beforeHideEvent.subscribe(K);}},_onSubmenuHide:function(L,K){var J=this.submenuIndicator.firstChild;if(J){J.nodeValue=this.COLLAPSED_SUBMENU_INDICATOR_TEXT;}},configSubmenu:function(S,L,O){var Q=this._oAnchor,N=L[0],P=this.submenuIndicator,M=this.cfg,K=this.parent&&this.parent.lazyLoad,R,T,J;if(N){if(N instanceof E){R=N;R.parent=this;R.lazyLoad=K;}else{if(typeof N=="object"&&N.id&&!N.nodeType){T=N.id;J=N;J.lazyload=K;J.parent=this;R=new this.SUBMENU_TYPE(T,J);this.cfg.setProperty("submenu",R,true);}else{R=new this.SUBMENU_TYPE(N,{lazyload:K,parent:this});this.cfg.setProperty("submenu",R,true);}}if(R){B.addClass(Q,"hassubmenu");this._oSubmenu=R;R.showEvent.subscribe(this._onSubmenuShow,null,this);R.hideEvent.subscribe(this._onSubmenuHide,null,this);if(YAHOO.env.ua.opera){R.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);}}}else{B.removeClass(Q,"hassubmenu");if(P){Q.removeChild(P);}if(this._oSubmenu){this._oSubmenu.destroy();}}M.refireEvent("text");},configOnClick:function(L,K,J){var M=K[0];if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=M)){this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);this._oOnclickAttributeValue=null;}if(!this._oOnclickAttributeValue&&typeof M=="object"&&typeof M.fn=="function"){this.clickEvent.subscribe(M.fn,((!YAHOO.lang.isUndefined(M.obj))?M.obj:this),M.scope);this._oOnclickAttributeValue=M;}},configClassName:function(M,L,K){var J=L[0];if(this._sClassName){B.removeClass(this.element,this._sClassName);}B.addClass(this.element,J);this._sClassName=J;},initDefaultConfig:function(){var J=this.cfg;J.addProperty(G.TEXT.key,{handler:this.configText,value:G.TEXT.value,validator:G.TEXT.validator,suppressEvent:G.TEXT.suppressEvent});J.addProperty(G.HELP_TEXT.key,{handler:this.configHelpText});J.addProperty(G.URL.key,{handler:this.configURL,value:G.URL.value,suppressEvent:G.URL.suppressEvent});J.addProperty(G.TARGET.key,{handler:this.configTarget,suppressEvent:G.TARGET.suppressEvent});J.addProperty(G.EMPHASIS.key,{handler:this.configEmphasis,value:G.EMPHASIS.value,validator:G.EMPHASIS.validator,suppressEvent:G.EMPHASIS.suppressEvent});J.addProperty(G.STRONG_EMPHASIS.key,{handler:this.configStrongEmphasis,value:G.STRONG_EMPHASIS.value,validator:G.STRONG_EMPHASIS.validator,suppressEvent:G.STRONG_EMPHASIS.suppressEvent});J.addProperty(G.CHECKED.key,{handler:this.configChecked,value:G.CHECKED.value,validator:G.CHECKED.validator,suppressEvent:G.CHECKED.suppressEvent,supercedes:G.CHECKED.supercedes});J.addProperty(G.DISABLED.key,{handler:this.configDisabled,value:G.DISABLED.value,validator:G.DISABLED.validator,suppressEvent:G.DISABLED.suppressEvent});J.addProperty(G.SELECTED.key,{handler:this.configSelected,value:G.SELECTED.value,validator:G.SELECTED.validator,suppressEvent:G.SELECTED.suppressEvent});J.addProperty(G.SUBMENU.key,{handler:this.configSubmenu});J.addProperty(G.ONCLICK.key,{handler:this.configOnClick});J.addProperty(G.CLASS_NAME.key,{handler:this.configClassName,value:G.CLASS_NAME.value,validator:G.CLASS_NAME.validator});},getNextEnabledSibling:function(){var L,O,J,N,M;function K(P,Q){return P[Q]||K(P,(Q+1));}if(this.parent instanceof E){L=this.groupIndex;O=this.parent.getItemGroups();if(this.index<(O[L].length-1)){J=K(O[L],(this.index+1));}else{if(L<(O.length-1)){N=L+1;}else{N=0;}M=K(O,N);J=K(M,0);}return(J.cfg.getProperty("disabled")||J.element.style.display=="none")?J.getNextEnabledSibling():J;}},getPreviousEnabledSibling:function(){var N,P,K,J,M;function O(Q,R){return Q[R]||O(Q,(R-1));}function L(Q,R){return Q[R]?R:L(Q,(R+1));}if(this.parent instanceof E){N=this.groupIndex;P=this.parent.getItemGroups();if(this.index>L(P[N],0)){K=O(P[N],(this.index-1));}else{if(N>L(P,0)){J=N-1;}else{J=P.length-1;}M=O(P,J);K=O(M,(M.length-1));}return(K.cfg.getProperty("disabled")||K.element.style.display=="none")?K.getPreviousEnabledSibling():K;}},focus:function(){var N=this.parent,M=this._oAnchor,J=N.activeItem,L=this;function K(){try{if(YAHOO.env.ua.ie&&!document.hasFocus()){return ;}M.focus();}catch(O){}}if(!this.cfg.getProperty("disabled")&&N&&N.cfg.getProperty("visible")&&this.element.style.display!="none"){if(J){J.blur();}window.setTimeout(K,0);this.focusEvent.fire();}},blur:function(){var K=this.parent;if(!this.cfg.getProperty("disabled")&&K&&K.cfg.getProperty("visible")){try{this._oAnchor.blur();}catch(J){}this.blurEvent.fire();}},hasFocus:function(){return(YAHOO.widget.MenuManager.getFocusedMenuItem()==this);
},destroy:function(){var L=this.element,K,J;if(L){K=this.cfg.getProperty("submenu");if(K){K.destroy();}this.mouseOverEvent.unsubscribeAll();this.mouseOutEvent.unsubscribeAll();this.mouseDownEvent.unsubscribeAll();this.mouseUpEvent.unsubscribeAll();this.clickEvent.unsubscribeAll();this.keyPressEvent.unsubscribeAll();this.keyDownEvent.unsubscribeAll();this.keyUpEvent.unsubscribeAll();this.focusEvent.unsubscribeAll();this.blurEvent.unsubscribeAll();this.cfg.configChangedEvent.unsubscribeAll();J=L.parentNode;if(J){J.removeChild(L);this.destroyEvent.fire();}this.destroyEvent.unsubscribeAll();}},toString:function(){var K="MenuItem",J=this.id;if(J){K+=(" "+J);}return K;}};F.augmentProto(H,YAHOO.util.EventProvider);})();(function(){YAHOO.widget.ContextMenu=function(F,E){YAHOO.widget.ContextMenu.superclass.constructor.call(this,F,E);};var A=YAHOO.util.Event,D=YAHOO.widget.ContextMenu,C={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(YAHOO.env.ua.opera?"mousedown":"contextmenu"),"CLICK":"click"},B={"TRIGGER":{key:"trigger"}};YAHOO.lang.extend(D,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(F,E){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.ContextMenuItem;}D.superclass.init.call(this,F);this.beforeInitEvent.fire(D);if(E){this.cfg.applyConfig(E,true);}this.initEvent.fire(D);},initEvents:function(){D.superclass.initEvents.call(this);this.triggerContextMenuEvent=this.createEvent(C.TRIGGER_CONTEXT_MENU);this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;},cancel:function(){this._bCancelled=true;},_removeEventHandlers:function(){var E=this._oTrigger;if(E){A.removeListener(E,C.CONTEXT_MENU,this._onTriggerContextMenu);if(YAHOO.env.ua.opera){A.removeListener(E,C.CLICK,this._onTriggerClick);}}},_onTriggerClick:function(F,E){if(F.ctrlKey){A.stopEvent(F);}},_onTriggerContextMenu:function(F,E){if(F.type=="mousedown"&&!F.ctrlKey){return ;}A.stopEvent(F);YAHOO.widget.MenuManager.hideVisible();this.contextEventTarget=A.getTarget(F);this.triggerContextMenuEvent.fire(F);if(!this._bCancelled){this.cfg.setProperty("xy",A.getXY(F));this.show();}this._bCancelled=false;},toString:function(){var F="ContextMenu",E=this.id;if(E){F+=(" "+E);}return F;},initDefaultConfig:function(){D.superclass.initDefaultConfig.call(this);this.cfg.addProperty(B.TRIGGER.key,{handler:this.configTrigger});},destroy:function(){this._removeEventHandlers();D.superclass.destroy.call(this);},configTrigger:function(F,E,H){var G=E[0];if(G){if(this._oTrigger){this._removeEventHandlers();}this._oTrigger=G;A.on(G,C.CONTEXT_MENU,this._onTriggerContextMenu,this,true);if(YAHOO.env.ua.opera){A.on(G,C.CLICK,this._onTriggerClick,this,true);}}else{this._removeEventHandlers();}}});}());YAHOO.widget.ContextMenuItem=function(B,A){YAHOO.widget.ContextMenuItem.superclass.constructor.call(this,B,A);};YAHOO.lang.extend(YAHOO.widget.ContextMenuItem,YAHOO.widget.MenuItem,{init:function(B,A){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.ContextMenu;}YAHOO.widget.ContextMenuItem.superclass.init.call(this,B);var C=this.cfg;if(A){C.applyConfig(A,true);}C.fireQueue();},toString:function(){var A="ContextMenuItem";if(this.cfg&&this.cfg.getProperty("text")){A+=(": "+this.cfg.getProperty("text"));}return A;}});(function(){YAHOO.widget.MenuBar=function(G,F){YAHOO.widget.MenuBar.superclass.constructor.call(this,G,F);};function E(F){if(typeof F=="string"){return("dynamic,static".indexOf((F.toLowerCase()))!=-1);}}var B=YAHOO.util.Event,D=YAHOO.util.Dom,A=YAHOO.widget.MenuBar,C={"POSITION":{key:"position",value:"static",validator:E,supercedes:["visible"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","bl"]},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:false,validator:YAHOO.lang.isBoolean}};YAHOO.lang.extend(A,YAHOO.widget.Menu,{init:function(G,F){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuBarItem;}A.superclass.init.call(this,G);this.beforeInitEvent.fire(A);if(F){this.cfg.applyConfig(F,true);}this.initEvent.fire(A);},CSS_CLASS_NAME:"yuimenubar",_onKeyDown:function(H,G,L){var F=G[0],M=G[1],J,K,I;if(M&&!M.cfg.getProperty("disabled")){K=M.cfg;switch(F.keyCode){case 37:case 39:if(M==this.activeItem&&!K.getProperty("selected")){K.setProperty("selected",true);}else{I=(F.keyCode==37)?M.getPreviousEnabledSibling():M.getNextEnabledSibling();if(I){this.clearActiveItem();I.cfg.setProperty("selected",true);if(this.cfg.getProperty("autosubmenudisplay")){J=I.cfg.getProperty("submenu");if(J){J.show();}}I.focus();}}B.preventDefault(F);break;case 40:if(this.activeItem!=M){this.clearActiveItem();K.setProperty("selected",true);M.focus();}J=K.getProperty("submenu");if(J){if(J.cfg.getProperty("visible")){J.setInitialSelection();J.setInitialFocus();}else{J.show();}}B.preventDefault(F);break;}}if(F.keyCode==27&&this.activeItem){J=this.activeItem.cfg.getProperty("submenu");if(J&&J.cfg.getProperty("visible")){J.hide();this.activeItem.focus();}else{this.activeItem.cfg.setProperty("selected",false);this.activeItem.blur();}B.preventDefault(F);}},_onClick:function(M,H,K){A.superclass._onClick.call(this,M,H,K);var L=H[1],N,F,G,I,J;if(L&&!L.cfg.getProperty("disabled")){N=H[0];F=B.getTarget(N);G=this.activeItem;I=this.cfg;if(G&&G!=L){this.clearActiveItem();}L.cfg.setProperty("selected",true);J=L.cfg.getProperty("submenu");if(J&&F!=L.submenuIndicator){if(J.cfg.getProperty("visible")){J.hide();}else{J.show();}}}},toString:function(){var G="MenuBar",F=this.id;if(F){G+=(" "+F);}return G;},initDefaultConfig:function(){A.superclass.initDefaultConfig.call(this);var F=this.cfg;F.addProperty(C.POSITION.key,{handler:this.configPosition,value:C.POSITION.value,validator:C.POSITION.validator,supercedes:C.POSITION.supercedes});F.addProperty(C.SUBMENU_ALIGNMENT.key,{value:C.SUBMENU_ALIGNMENT.value});F.addProperty(C.AUTO_SUBMENU_DISPLAY.key,{value:C.AUTO_SUBMENU_DISPLAY.value,validator:C.AUTO_SUBMENU_DISPLAY.validator});}});}());YAHOO.widget.MenuBarItem=function(B,A){YAHOO.widget.MenuBarItem.superclass.constructor.call(this,B,A);
};YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(B,A){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.Menu;}YAHOO.widget.MenuBarItem.superclass.init.call(this,B);var C=this.cfg;if(A){C.applyConfig(A,true);}C.fireQueue();},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){var A="MenuBarItem";if(this.cfg&&this.cfg.getProperty("text")){A+=(": "+this.cfg.getProperty("text"));}return A;}});YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.3.1",build:"541"});
YAHOO.widget.LogMsg=function(A){if(A&&(A.constructor==Object)){for(var B in A){this[B]=A[B];}}};YAHOO.widget.LogMsg.prototype.msg=null;YAHOO.widget.LogMsg.prototype.time=null;YAHOO.widget.LogMsg.prototype.category=null;YAHOO.widget.LogMsg.prototype.source=null;YAHOO.widget.LogMsg.prototype.sourceDetail=null;YAHOO.widget.LogWriter=function(A){if(!A){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return ;}this._source=A;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(A,B){YAHOO.widget.Logger.log(A,B,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._sSource;};YAHOO.widget.LogWriter.prototype.setSource=function(A){if(!A){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return ;}else{this._sSource=A;}};YAHOO.widget.LogWriter.prototype._source=null;YAHOO.widget.LogReader=function(B,A){this._sName=YAHOO.widget.LogReader._index;YAHOO.widget.LogReader._index++;this._buffer=[];this._filterCheckboxes={};this._lastTime=YAHOO.widget.Logger.getStartTime();if(A&&(A.constructor==Object)){for(var C in A){this[C]=A[C];}}this._initContainerEl(B);if(!this._elContainer){YAHOO.log("Could not instantiate LogReader due to an invalid container element "+B,"error",this.toString());return ;}this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initDragDrop();this._initCategories();this._initSources();YAHOO.widget.Logger.newLogEvent.subscribe(this._onNewLog,this);YAHOO.widget.Logger.logResetEvent.subscribe(this._onReset,this);YAHOO.widget.Logger.categoryCreateEvent.subscribe(this._onCategoryCreate,this);YAHOO.widget.Logger.sourceCreateEvent.subscribe(this._onSourceCreate,this);this._filterLogs();YAHOO.log("LogReader initialized",null,this.toString());};YAHOO.widget.LogReader.prototype.logReaderEnabled=true;YAHOO.widget.LogReader.prototype.width=null;YAHOO.widget.LogReader.prototype.height=null;YAHOO.widget.LogReader.prototype.top=null;YAHOO.widget.LogReader.prototype.left=null;YAHOO.widget.LogReader.prototype.right=null;YAHOO.widget.LogReader.prototype.bottom=null;YAHOO.widget.LogReader.prototype.fontSize=null;YAHOO.widget.LogReader.prototype.footerEnabled=true;YAHOO.widget.LogReader.prototype.verboseOutput=true;YAHOO.widget.LogReader.prototype.newestOnTop=true;YAHOO.widget.LogReader.prototype.outputBuffer=100;YAHOO.widget.LogReader.prototype.thresholdMax=500;YAHOO.widget.LogReader.prototype.thresholdMin=100;YAHOO.widget.LogReader.prototype.isCollapsed=false;YAHOO.widget.LogReader.prototype.isPaused=false;YAHOO.widget.LogReader.prototype.draggable=true;YAHOO.widget.LogReader.prototype.toString=function(){return"LogReader instance"+this._sName;};YAHOO.widget.LogReader.prototype.pause=function(){this.isPaused=true;this._btnPause.value="Resume";this._timeout=null;this.logReaderEnabled=false;};YAHOO.widget.LogReader.prototype.resume=function(){this.isPaused=false;this._btnPause.value="Pause";this.logReaderEnabled=true;this._printBuffer();};YAHOO.widget.LogReader.prototype.hide=function(){this._elContainer.style.display="none";};YAHOO.widget.LogReader.prototype.show=function(){this._elContainer.style.display="block";};YAHOO.widget.LogReader.prototype.collapse=function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}this._btnCollapse.value="Expand";this.isCollapsed=true;};YAHOO.widget.LogReader.prototype.expand=function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}this._btnCollapse.value="Collapse";this.isCollapsed=false;};YAHOO.widget.LogReader.prototype.getCheckbox=function(A){return this._filterCheckboxes[A];};YAHOO.widget.LogReader.prototype.getCategories=function(){return this._categoryFilters;};YAHOO.widget.LogReader.prototype.showCategory=function(B){var D=this._categoryFilters;if(D.indexOf){if(D.indexOf(B)>-1){return ;}}else{for(var A=0;A<D.length;A++){if(D[A]===B){return ;}}}this._categoryFilters.push(B);this._filterLogs();var C=this.getCheckbox(B);if(C){C.checked=true;}};YAHOO.widget.LogReader.prototype.hideCategory=function(B){var D=this._categoryFilters;for(var A=0;A<D.length;A++){if(B==D[A]){D.splice(A,1);break;}}this._filterLogs();var C=this.getCheckbox(B);if(C){C.checked=false;}};YAHOO.widget.LogReader.prototype.getSources=function(){return this._sourceFilters;};YAHOO.widget.LogReader.prototype.showSource=function(A){var D=this._sourceFilters;if(D.indexOf){if(D.indexOf(A)>-1){return ;}}else{for(var B=0;B<D.length;B++){if(A==D[B]){return ;}}}D.push(A);this._filterLogs();var C=this.getCheckbox(A);if(C){C.checked=true;}};YAHOO.widget.LogReader.prototype.hideSource=function(A){var D=this._sourceFilters;for(var B=0;B<D.length;B++){if(A==D[B]){D.splice(B,1);break;}}this._filterLogs();var C=this.getCheckbox(A);if(C){C.checked=false;}};YAHOO.widget.LogReader.prototype.clearConsole=function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var A=this._elConsole;while(A.hasChildNodes()){A.removeChild(A.firstChild);}};YAHOO.widget.LogReader.prototype.setTitle=function(A){this._title.innerHTML=this.html2Text(A);};YAHOO.widget.LogReader.prototype.getLastTime=function(){return this._lastTime;};YAHOO.widget.LogReader.prototype.formatMsg=function(D){var E=D.category;var L=E.substring(0,4).toUpperCase();var I=D.time;if(I.toLocaleTimeString){var J=I.toLocaleTimeString();}else{J=I.toString();}var B=I.getTime();var F=YAHOO.widget.Logger.getStartTime();var C=B-F;var N=B-this.getLastTime();var A=D.source;var M=D.sourceDetail;var K=(M)?A+" "+M:A;var H=this.html2Text(YAHOO.lang.dump(D.msg));var G=(this.verboseOutput)?["<pre class=\"yui-log-verbose\"><p><span class='",E,"'>",L,"</span> ",C,"ms (+",N,") ",J,": ","</p><p>",K,": </p><p>",H,"</p></pre>"]:["<pre><p><span class='",E,"'>",L,"</span> ",C,"ms (+",N,") ",J,": ",K,": ",H,"</p></pre>"];return G.join("");};YAHOO.widget.LogReader.prototype.html2Text=function(A){if(A){A+="";return A.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");
}return"";};YAHOO.widget.LogReader._index=0;YAHOO.widget.LogReader.prototype._sName=null;YAHOO.widget.LogReader.prototype._buffer=null;YAHOO.widget.LogReader.prototype._consoleMsgCount=0;YAHOO.widget.LogReader.prototype._lastTime=null;YAHOO.widget.LogReader.prototype._timeout=null;YAHOO.widget.LogReader.prototype._filterCheckboxes=null;YAHOO.widget.LogReader.prototype._categoryFilters=null;YAHOO.widget.LogReader.prototype._sourceFilters=null;YAHOO.widget.LogReader.prototype._elContainer=null;YAHOO.widget.LogReader.prototype._elHd=null;YAHOO.widget.LogReader.prototype._elCollapse=null;YAHOO.widget.LogReader.prototype._btnCollapse=null;YAHOO.widget.LogReader.prototype._title=null;YAHOO.widget.LogReader.prototype._elConsole=null;YAHOO.widget.LogReader.prototype._elFt=null;YAHOO.widget.LogReader.prototype._elBtns=null;YAHOO.widget.LogReader.prototype._elCategoryFilters=null;YAHOO.widget.LogReader.prototype._elSourceFilters=null;YAHOO.widget.LogReader.prototype._btnPause=null;YAHOO.widget.LogReader.prototype._btnClear=null;YAHOO.widget.LogReader.prototype._initContainerEl=function(B){B=YAHOO.util.Dom.get(B);if(B&&B.tagName&&(B.tagName.toLowerCase()=="div")){this._elContainer=B;YAHOO.util.Dom.addClass(this._elContainer,"yui-log");}else{this._elContainer=document.body.appendChild(document.createElement("div"));YAHOO.util.Dom.addClass(this._elContainer,"yui-log");YAHOO.util.Dom.addClass(this._elContainer,"yui-log-container");var A=this._elContainer.style;if(this.width){A.width=this.width;}if(this.right){A.right=this.right;}if(this.top){A.top=this.top;}if(this.left){A.left=this.left;A.right="auto";}if(this.bottom){A.bottom=this.bottom;A.top="auto";}if(this.fontSize){A.fontSize=this.fontSize;}if(navigator.userAgent.toLowerCase().indexOf("opera")!=-1){document.body.style+="";}}};YAHOO.widget.LogReader.prototype._initHeaderEl=function(){var A=this;if(this._elHd){YAHOO.util.Event.purgeElement(this._elHd,true);this._elHd.innerHTML="";}this._elHd=this._elContainer.appendChild(document.createElement("div"));this._elHd.id="yui-log-hd"+this._sName;this._elHd.className="yui-log-hd";this._elCollapse=this._elHd.appendChild(document.createElement("div"));this._elCollapse.className="yui-log-btns";this._btnCollapse=document.createElement("input");this._btnCollapse.type="button";this._btnCollapse.className="yui-log-button";this._btnCollapse.value="Collapse";this._btnCollapse=this._elCollapse.appendChild(this._btnCollapse);YAHOO.util.Event.addListener(A._btnCollapse,"click",A._onClickCollapseBtn,A);this._title=this._elHd.appendChild(document.createElement("h4"));this._title.innerHTML="Logger Console";};YAHOO.widget.LogReader.prototype._initConsoleEl=function(){if(this._elConsole){YAHOO.util.Event.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}this._elConsole=this._elContainer.appendChild(document.createElement("div"));this._elConsole.className="yui-log-bd";if(this.height){this._elConsole.style.height=this.height;}};YAHOO.widget.LogReader.prototype._initFooterEl=function(){var A=this;if(this.footerEnabled){if(this._elFt){YAHOO.util.Event.purgeElement(this._elFt,true);this._elFt.innerHTML="";}this._elFt=this._elContainer.appendChild(document.createElement("div"));this._elFt.className="yui-log-ft";this._elBtns=this._elFt.appendChild(document.createElement("div"));this._elBtns.className="yui-log-btns";this._btnPause=document.createElement("input");this._btnPause.type="button";this._btnPause.className="yui-log-button";this._btnPause.value="Pause";this._btnPause=this._elBtns.appendChild(this._btnPause);YAHOO.util.Event.addListener(A._btnPause,"click",A._onClickPauseBtn,A);this._btnClear=document.createElement("input");this._btnClear.type="button";this._btnClear.className="yui-log-button";this._btnClear.value="Clear";this._btnClear=this._elBtns.appendChild(this._btnClear);YAHOO.util.Event.addListener(A._btnClear,"click",A._onClickClearBtn,A);this._elCategoryFilters=this._elFt.appendChild(document.createElement("div"));this._elCategoryFilters.className="yui-log-categoryfilters";this._elSourceFilters=this._elFt.appendChild(document.createElement("div"));this._elSourceFilters.className="yui-log-sourcefilters";}};YAHOO.widget.LogReader.prototype._initDragDrop=function(){if(YAHOO.util.DD&&this.draggable&&this._elHd){var A=new YAHOO.util.DD(this._elContainer);A.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}};YAHOO.widget.LogReader.prototype._initCategories=function(){this._categoryFilters=[];var C=YAHOO.widget.Logger.categories;for(var A=0;A<C.length;A++){var B=C[A];this._categoryFilters.push(B);if(this._elCategoryFilters){this._createCategoryCheckbox(B);}}};YAHOO.widget.LogReader.prototype._initSources=function(){this._sourceFilters=[];var C=YAHOO.widget.Logger.sources;for(var B=0;B<C.length;B++){var A=C[B];this._sourceFilters.push(A);if(this._elSourceFilters){this._createSourceCheckbox(A);}}};YAHOO.widget.LogReader.prototype._createCategoryCheckbox=function(B){var A=this;if(this._elFt){var E=this._elCategoryFilters;var D=E.appendChild(document.createElement("span"));D.className="yui-log-filtergrp";var C=document.createElement("input");C.id="yui-log-filter-"+B+this._sName;C.className="yui-log-filter-"+B;C.type="checkbox";C.category=B;C=D.appendChild(C);C.checked=true;YAHOO.util.Event.addListener(C,"click",A._onCheckCategory,A);var F=D.appendChild(document.createElement("label"));F.htmlFor=C.id;F.className=B;F.innerHTML=B;this._filterCheckboxes[B]=C;}};YAHOO.widget.LogReader.prototype._createSourceCheckbox=function(A){var D=this;if(this._elFt){var F=this._elSourceFilters;var E=F.appendChild(document.createElement("span"));E.className="yui-log-filtergrp";var C=document.createElement("input");C.id="yui-log-filter"+A+this._sName;C.className="yui-log-filter"+A;C.type="checkbox";C.source=A;C=E.appendChild(C);C.checked=true;YAHOO.util.Event.addListener(C,"click",D._onCheckSource,D);var B=E.appendChild(document.createElement("label"));B.htmlFor=C.id;B.className=A;B.innerHTML=A;this._filterCheckboxes[A]=C;
}};YAHOO.widget.LogReader.prototype._filterLogs=function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(YAHOO.widget.Logger.getStack());}};YAHOO.widget.LogReader.prototype._printBuffer=function(){this._timeout=null;if(this._elConsole!==null){var B=this.thresholdMax;B=(B&&!isNaN(B))?B:500;if(this._consoleMsgCount<B){var A=[];for(var C=0;C<this._buffer.length;C++){A[C]=this._buffer[C];}this._buffer=[];this._printToConsole(A);}else{this._filterLogs();}if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}};YAHOO.widget.LogReader.prototype._printToConsole=function(J){var B=J.length;var O=this.thresholdMin;if(isNaN(O)||(O>this.thresholdMax)){O=0;}var L=(B>O)?(B-O):0;var C=this._sourceFilters.length;var M=this._categoryFilters.length;for(var I=L;I<B;I++){var F=false;var K=false;var N=J[I];var A=N.source;var D=N.category;for(var H=0;H<C;H++){if(A==this._sourceFilters[H]){K=true;break;}}if(K){for(var G=0;G<M;G++){if(D==this._categoryFilters[G]){F=true;break;}}}if(F){var E=this.formatMsg(N);if(this.newestOnTop){this._elConsole.innerHTML=E+this._elConsole.innerHTML;}else{this._elConsole.innerHTML+=E;}this._consoleMsgCount++;this._lastTime=N.time.getTime();}}};YAHOO.widget.LogReader.prototype._onCategoryCreate=function(D,C,A){var B=C[0];A._categoryFilters.push(B);if(A._elFt){A._createCategoryCheckbox(B);}};YAHOO.widget.LogReader.prototype._onSourceCreate=function(D,C,A){var B=C[0];A._sourceFilters.push(B);if(A._elFt){A._createSourceCheckbox(B);}};YAHOO.widget.LogReader.prototype._onCheckCategory=function(A,B){var C=this.category;if(!this.checked){B.hideCategory(C);}else{B.showCategory(C);}};YAHOO.widget.LogReader.prototype._onCheckSource=function(A,B){var C=this.source;if(!this.checked){B.hideSource(C);}else{B.showSource(C);}};YAHOO.widget.LogReader.prototype._onClickCollapseBtn=function(A,B){if(!B.isCollapsed){B.collapse();}else{B.expand();}};YAHOO.widget.LogReader.prototype._onClickPauseBtn=function(A,B){if(!B.isPaused){B.pause();}else{B.resume();}};YAHOO.widget.LogReader.prototype._onClickClearBtn=function(A,B){B.clearConsole();};YAHOO.widget.LogReader.prototype._onNewLog=function(D,C,A){var B=C[0];A._buffer.push(B);if(A.logReaderEnabled===true&&A._timeout===null){A._timeout=setTimeout(function(){A._printBuffer();},A.outputBuffer);}};YAHOO.widget.LogReader.prototype._onReset=function(C,B,A){A._filterLogs();};if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null};YAHOO.widget.Logger.log=function(B,F,G){if(this.loggerEnabled){if(!F){F="info";}else{F=F.toLocaleLowerCase();if(this._isNewCategory(F)){this._createNewCategory(F);}}var C="global";var A=null;if(G){var D=G.indexOf(" ");if(D>0){C=G.substring(0,D);A=G.substring(D,G.length);}else{C=G;}if(this._isNewSource(C)){this._createNewSource(C);}}var H=new Date();var J=new YAHOO.widget.LogMsg({msg:B,time:H,category:F,source:C,sourceDetail:A});var I=this._stack;var E=this.maxStackEntries;if(E&&!isNaN(E)&&(I.length>=E)){I.shift();}I.push(J);this.newLogEvent.fire(J);if(this._browserConsoleEnabled){this._printToBrowserConsole(J);}return true;}else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(A){this.categories.push(A);this.categoryCreateEvent.fire(A);};YAHOO.widget.Logger._isNewCategory=function(B){for(var A=0;A<this.categories.length;A++){if(B==this.categories[A]){return false;}}return true;};YAHOO.widget.Logger._createNewSource=function(A){this.sources.push(A);this.sourceCreateEvent.fire(A);};YAHOO.widget.Logger._isNewSource=function(A){if(A){for(var B=0;B<this.sources.length;B++){if(A==this.sources[B]){return false;}}return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(C){if(window.console&&console.log){var E=C.category;var D=C.category.substring(0,4).toUpperCase();var G=C.time;if(G.toLocaleTimeString){var F=G.toLocaleTimeString();}else{F=G.toString();}var H=G.getTime();var B=(YAHOO.widget.Logger._lastTime)?(H-YAHOO.widget.Logger._lastTime):0;YAHOO.widget.Logger._lastTime=H;var A=F+" ("+B+"ms): "+C.source+": "+C.msg;console.log(A);}};YAHOO.widget.Logger._onWindowError=function(A,C,B){try{YAHOO.widget.Logger.log(A+" ("+C+", line "+B+")","window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}catch(D){return false;}};if(window.onerror){YAHOO.widget.Logger._origOnWindowError=window.onerror;}window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger.log("Logger initialized");}YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.3.1",build:"541"});
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(D,C){for(var E in this.ids){for(var B in this.ids[E]){var F=this.ids[E][B];if(!this.isTypeOfDD(F)){continue;}F[D].apply(F,C);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(B){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(C,B){if(!this.initialized){this.init();}if(!this.ids[B]){this.ids[B]={};}this.ids[B][C.id]=C;},removeDDFromGroup:function(D,B){if(!this.ids[B]){this.ids[B]={};}var C=this.ids[B];if(C&&C[D.id]){delete C[D.id];}},_remove:function(C){for(var B in C.groups){if(B&&this.ids[B][C.id]){delete this.ids[B][C.id];}}delete this.handleIds[C.id];},regHandle:function(C,B){if(!this.handleIds[C]){this.handleIds[C]={};}this.handleIds[C][B]=B;},isDragDrop:function(B){return(this.getDDById(B))?true:false;},getRelated:function(G,C){var F=[];for(var E in G.groups){for(var D in this.ids[E]){var B=this.ids[E][D];if(!this.isTypeOfDD(B)){continue;}if(!C||B.isTarget){F[F.length]=B;}}}return F;},isLegalTarget:function(F,E){var C=this.getRelated(F,true);for(var D=0,B=C.length;D<B;++D){if(C[D].id==E.id){return true;}}return false;},isTypeOfDD:function(B){return(B&&B.__ygDragDrop);},isHandle:function(C,B){return(this.handleIds[C]&&this.handleIds[C][B]);},getDDById:function(C){for(var B in this.ids){if(this.ids[B][C]){return this.ids[B][C];}}return null;},handleMouseDown:function(D,C){this.currentTarget=YAHOO.util.Event.getTarget(D);this.dragCurrent=C;var B=C.getEl();this.startX=YAHOO.util.Event.getPageX(D);this.startY=YAHOO.util.Event.getPageY(D);this.deltaX=this.startX-B.offsetLeft;this.deltaY=this.startY-B.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var E=YAHOO.util.DDM;E.startDrag(E.startX,E.startY);},this.clickTimeThresh);},startDrag:function(B,D){clearTimeout(this.clickTimeout);var C=this.dragCurrent;if(C){C.b4StartDrag(B,D);}if(C){C.startDrag(B,D);}this.dragThreshMet=true;},handleMouseUp:function(B){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(B,true);}else{}this.stopDrag(B);this.stopEvent(B);}},stopEvent:function(B){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(B);}if(this.preventDefault){YAHOO.util.Event.preventDefault(B);}},stopDrag:function(C,B){if(this.dragCurrent&&!B){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(C);this.dragCurrent.endDrag(C);}this.dragCurrent.onMouseUp(C);}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(E){var B=this.dragCurrent;if(B){if(YAHOO.util.Event.isIE&&!E.button){this.stopEvent(E);return this.handleMouseUp(E);}if(!this.dragThreshMet){var D=Math.abs(this.startX-YAHOO.util.Event.getPageX(E));var C=Math.abs(this.startY-YAHOO.util.Event.getPageY(E));if(D>this.clickPixelThresh||C>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){B.b4Drag(E);if(B){B.onDrag(E);}if(B){this.fireEvents(E,false);}}this.stopEvent(E);}},fireEvents:function(Q,H){var S=this.dragCurrent;if(!S||S.isLocked()){return ;}var J=YAHOO.util.Event.getPageX(Q),I=YAHOO.util.Event.getPageY(Q),K=new YAHOO.util.Point(J,I),F=S.getTargetCoord(K.x,K.y),C=S.getDragEl(),P=new YAHOO.util.Region(F.y,F.x+C.offsetWidth,F.y+C.offsetHeight,F.x),E=[],G=[],B=[],R=[],O=[];for(var M in this.dragOvers){var T=this.dragOvers[M];if(!this.isTypeOfDD(T)){continue;}if(!this.isOverTarget(K,T,this.mode,P)){G.push(T);}E[M]=true;delete this.dragOvers[M];}for(var L in S.groups){if("string"!=typeof L){continue;}for(M in this.ids[L]){var D=this.ids[L][M];if(!this.isTypeOfDD(D)){continue;}if(D.isTarget&&!D.isLocked()&&D!=S){if(this.isOverTarget(K,D,this.mode,P)){if(H){R.push(D);}else{if(!E[D.id]){O.push(D);}else{B.push(D);}this.dragOvers[D.id]=D;}}}}}this.interactionInfo={out:G,enter:O,over:B,drop:R,point:K,draggedRegion:P,sourceRegion:this.locationCache[S.id],validDrop:H};if(H&&!R.length){this.interactionInfo.validDrop=false;S.onInvalidDrop(Q);}if(this.mode){if(G.length){S.b4DragOut(Q,G);if(S){S.onDragOut(Q,G);}}if(O.length){if(S){S.onDragEnter(Q,O);}}if(B.length){if(S){S.b4DragOver(Q,B);}if(S){S.onDragOver(Q,B);}}if(R.length){if(S){S.b4DragDrop(Q,R);}if(S){S.onDragDrop(Q,R);}}}else{var N=0;for(M=0,N=G.length;M<N;++M){if(S){S.b4DragOut(Q,G[M].id);}if(S){S.onDragOut(Q,G[M].id);}}for(M=0,N=O.length;M<N;++M){if(S){S.onDragEnter(Q,O[M].id);}}for(M=0,N=B.length;M<N;++M){if(S){S.b4DragOver(Q,B[M].id);}if(S){S.onDragOver(Q,B[M].id);}}for(M=0,N=R.length;M<N;++M){if(S){S.b4DragDrop(Q,R[M].id);}if(S){S.onDragDrop(Q,R[M].id);}}}},getBestMatch:function(D){var F=null;var C=D.length;if(C==1){F=D[0];}else{for(var E=0;E<C;++E){var B=D[E];if(this.mode==this.INTERSECT&&B.cursorIsOver){F=B;break;}else{if(!F||!F.overlap||(B.overlap&&F.overlap.getArea()<B.overlap.getArea())){F=B;}}}}return F;},refreshCache:function(C){var E=C||this.ids;for(var B in E){if("string"!=typeof B){continue;}for(var D in this.ids[B]){var F=this.ids[B][D];if(this.isTypeOfDD(F)){var G=this.getLocation(F);if(G){this.locationCache[F.id]=G;}else{delete this.locationCache[F.id];}}}}},verifyEl:function(C){try{if(C){var B=C.offsetParent;if(B){return true;}}}catch(D){}return false;},getLocation:function(G){if(!this.isTypeOfDD(G)){return null;}var E=G.getEl(),J,D,C,L,K,M,B,I,F;try{J=YAHOO.util.Dom.getXY(E);}catch(H){}if(!J){return null;
}D=J[0];C=D+E.offsetWidth;L=J[1];K=L+E.offsetHeight;M=L-G.padding[0];B=C+G.padding[1];I=K+G.padding[2];F=D-G.padding[3];return new YAHOO.util.Region(M,B,I,F);},isOverTarget:function(J,B,D,E){var F=this.locationCache[B.id];if(!F||!this.useCache){F=this.getLocation(B);this.locationCache[B.id]=F;}if(!F){return false;}B.cursorIsOver=F.contains(J);var I=this.dragCurrent;if(!I||(!D&&!I.constrainX&&!I.constrainY)){return B.cursorIsOver;}B.overlap=null;if(!E){var G=I.getTargetCoord(J.x,J.y);var C=I.getDragEl();E=new YAHOO.util.Region(G.y,G.x+C.offsetWidth,G.y+C.offsetHeight,G.x);}var H=E.intersect(F);if(H){B.overlap=H;return(D)?true:B.cursorIsOver;}else{return false;}},_onUnload:function(C,B){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(C){var B=this.elementCache[C];if(!B||!B.el){B=this.elementCache[C]=new this.ElementWrapper(YAHOO.util.Dom.get(C));}return B;},getElement:function(B){return YAHOO.util.Dom.get(B);},getCss:function(C){var B=YAHOO.util.Dom.get(C);return(B)?B.style:null;},ElementWrapper:function(B){this.el=B||null;this.id=this.el&&B.id;this.css=this.el&&B.style;},getPosX:function(B){return YAHOO.util.Dom.getX(B);},getPosY:function(B){return YAHOO.util.Dom.getY(B);},swapNode:function(D,B){if(D.swapNode){D.swapNode(B);}else{var E=B.parentNode;var C=B.nextSibling;if(C==D){E.insertBefore(D,B);}else{if(B==D.nextSibling){E.insertBefore(B,D);}else{D.parentNode.replaceChild(B,D);E.insertBefore(D,C);}}}},getScroll:function(){var D,B,E=document.documentElement,C=document.body;if(E&&(E.scrollTop||E.scrollLeft)){D=E.scrollTop;B=E.scrollLeft;}else{if(C){D=C.scrollTop;B=C.scrollLeft;}else{}}return{top:D,left:B};},getStyle:function(C,B){return YAHOO.util.Dom.getStyle(C,B);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(B,D){var C=YAHOO.util.Dom.getXY(D);YAHOO.util.Dom.setXY(B,C);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(C,B){return(C-B);},_timeoutCount:0,_addListeners:function(){var B=YAHOO.util.DDM;if(YAHOO.util.Event&&document){B._onLoad();}else{if(B._timeoutCount>2000){}else{setTimeout(B._addListeners,10);if(document&&document.body){B._timeoutCount+=1;}}}},handleWasClicked:function(B,D){if(this.isHandle(D,B.id)){return true;}else{var C=B.parentNode;while(C){if(this.isHandle(D,C.id)){return true;}else{C=C.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(E,C,D){this.initTarget(E,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(E,C,D){this.config=D||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){return ;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(F,E){var C=F.which||F.button;
if(this.primaryButtonOnly&&C>1){return ;}if(this.isLocked()){return ;}this.b4MouseDown(F);this.onMouseDown(F);this.DDM.refreshCache(this.groups);var D=new YAHOO.util.Point(A.getPageX(F),A.getPageY(F));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(D,this)){}else{if(this.clickValidator(F)){this.setStartPosition();this.DDM.handleMouseDown(F,this);this.DDM.stopEvent(F);}else{}}},clickValidator:function(D){var C=A.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(B,F,E){var D=this.getTargetCoord(F,E);if(!this.deltaSetXY){var G=[D.x,D.y];YAHOO.util.Dom.setXY(B,G);var C=parseInt(YAHOO.util.Dom.getStyle(B,"left"),10);var A=parseInt(YAHOO.util.Dom.getStyle(B,"top"),10);this.deltaSetXY=[C-D.x,A-D.y];}else{YAHOO.util.Dom.setStyle(B,"left",(D.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(B,"top",(D.y+this.deltaSetXY[1])+"px");}this.cachePosition(D.x,D.y);this.autoScroll(D.x,D.y,B.offsetHeight,B.offsetWidth);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return ;}var F=this.getDragEl(),E=YAHOO.util.Dom;if(!F){F=document.createElement("div");F.id=this.dragElId;var D=F.style;
D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");F.appendChild(C);A.insertBefore(F,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.3.1",build:"541"});
YAHOO.widget.Slider=function(C,A,B,D){YAHOO.widget.Slider.ANIM_AVAIL=(!YAHOO.lang.isUndefined(YAHOO.util.Anim));if(C){this.init(C,A,true);this.initSlider(D);this.initThumb(B);}};YAHOO.widget.Slider.getHorizSlider=function(B,C,E,D,A){return new YAHOO.widget.Slider(B,B,new YAHOO.widget.SliderThumb(C,B,E,D,0,0,A),"horiz");};YAHOO.widget.Slider.getVertSlider=function(C,D,A,E,B){return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,0,0,A,E,B),"vert");};YAHOO.widget.Slider.getSliderRegion=function(C,D,F,E,A,G,B){return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,F,E,A,G,B),"region");};YAHOO.widget.Slider.ANIM_AVAIL=false;YAHOO.extend(YAHOO.widget.Slider,YAHOO.util.DragDrop,{initSlider:function(A){this.type=A;this.createEvent("change",this);this.createEvent("slideStart",this);this.createEvent("slideEnd",this);this.isTarget=false;this.animate=YAHOO.widget.Slider.ANIM_AVAIL;this.backgroundEnabled=true;this.tickPause=40;this.enableKeys=true;this.keyIncrement=20;this.moveComplete=true;this.animationDuration=0.2;this.SOURCE_UI_EVENT=1;this.SOURCE_SET_VALUE=2;this.valueChangeSource=0;this._silent=false;this.lastOffset=[0,0];},initThumb:function(B){var A=this;this.thumb=B;B.cacheBetweenDrags=true;if(B._isHoriz&&B.xTicks&&B.xTicks.length){this.tickPause=Math.round(360/B.xTicks.length);}else{if(B.yTicks&&B.yTicks.length){this.tickPause=Math.round(360/B.yTicks.length);}}B.onAvailable=function(){return A.setStartSliderState();};B.onMouseDown=function(){return A.focus();};B.startDrag=function(){A._slideStart();};B.onDrag=function(){A.fireEvents(true);};B.onMouseUp=function(){A.thumbMouseUp();};},onAvailable:function(){var A=YAHOO.util.Event;A.on(this.id,"keydown",this.handleKeyDown,this,true);A.on(this.id,"keypress",this.handleKeyPress,this,true);},handleKeyPress:function(C){if(this.enableKeys){var A=YAHOO.util.Event;var B=A.getCharCode(C);switch(B){case 37:case 38:case 39:case 40:case 36:case 35:A.preventDefault(C);break;default:}}},handleKeyDown:function(E){if(this.enableKeys){var G=YAHOO.util.Event;var C=G.getCharCode(E),I=this.thumb;var B=this.getXValue(),F=this.getYValue();var H=false;var D=true;switch(C){case 37:B-=this.keyIncrement;break;case 38:F-=this.keyIncrement;break;case 39:B+=this.keyIncrement;break;case 40:F+=this.keyIncrement;break;case 36:B=I.leftConstraint;F=I.topConstraint;break;case 35:B=I.rightConstraint;F=I.bottomConstraint;break;default:D=false;}if(D){if(I._isRegion){this.setRegionValue(B,F,true);}else{var A=(I._isHoriz)?B:F;this.setValue(A,true);}G.stopEvent(E);}}},setStartSliderState:function(){this.setThumbCenterPoint();this.baselinePos=YAHOO.util.Dom.getXY(this.getEl());this.thumb.startOffset=this.thumb.getOffsetFromParent(this.baselinePos);if(this.thumb._isRegion){if(this.deferredSetRegionValue){this.setRegionValue.apply(this,this.deferredSetRegionValue,true);this.deferredSetRegionValue=null;}else{this.setRegionValue(0,0,true,true,true);}}else{if(this.deferredSetValue){this.setValue.apply(this,this.deferredSetValue,true);this.deferredSetValue=null;}else{this.setValue(0,true,true,true);}}},setThumbCenterPoint:function(){var A=this.thumb.getEl();if(A){this.thumbCenterPoint={x:parseInt(A.offsetWidth/2,10),y:parseInt(A.offsetHeight/2,10)};}},lock:function(){this.thumb.lock();this.locked=true;},unlock:function(){this.thumb.unlock();this.locked=false;},thumbMouseUp:function(){if(!this.isLocked()&&!this.moveComplete){this.endMove();}},onMouseUp:function(){if(!this.isLocked()&&!this.moveComplete){this.endMove();}},getThumb:function(){return this.thumb;},focus:function(){this.valueChangeSource=this.SOURCE_UI_EVENT;var A=this.getEl();if(A.focus){try{A.focus();}catch(B){}}this.verifyOffset();if(this.isLocked()){return false;}else{this._slideStart();return true;}},onChange:function(A,B){},onSlideStart:function(){},onSlideEnd:function(){},getValue:function(){return this.thumb.getValue();},getXValue:function(){return this.thumb.getXValue();},getYValue:function(){return this.thumb.getYValue();},handleThumbChange:function(){},setValue:function(G,C,D,A){this._silent=A;this.valueChangeSource=this.SOURCE_SET_VALUE;if(!this.thumb.available){this.deferredSetValue=arguments;return false;}if(this.isLocked()&&!D){return false;}if(isNaN(G)){return false;}var B=this.thumb;B.lastOffset=[G,G];var F,E;this.verifyOffset(true);if(B._isRegion){return false;}else{if(B._isHoriz){this._slideStart();F=B.initPageX+G+this.thumbCenterPoint.x;this.moveThumb(F,B.initPageY,C);}else{this._slideStart();E=B.initPageY+G+this.thumbCenterPoint.y;this.moveThumb(B.initPageX,E,C);}}return true;},setRegionValue:function(H,A,D,E,B){this._silent=B;this.valueChangeSource=this.SOURCE_SET_VALUE;if(!this.thumb.available){this.deferredSetRegionValue=arguments;return false;}if(this.isLocked()&&!E){return false;}if(isNaN(H)){return false;}var C=this.thumb;C.lastOffset=[H,A];this.verifyOffset(true);if(C._isRegion){this._slideStart();var G=C.initPageX+H+this.thumbCenterPoint.x;var F=C.initPageY+A+this.thumbCenterPoint.y;this.moveThumb(G,F,D);return true;}return false;},verifyOffset:function(B){var A=YAHOO.util.Dom.getXY(this.getEl());if(A){if(A[0]!=this.baselinePos[0]||A[1]!=this.baselinePos[1]){this.thumb.resetConstraints();this.baselinePos=A;return false;}}return true;},moveThumb:function(G,F,E,D){var H=this.thumb;var I=this;if(!H.available){return ;}H.setDelta(this.thumbCenterPoint.x,this.thumbCenterPoint.y);var B=H.getTargetCoord(G,F);var C=[B.x,B.y];this._slideStart();if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&H._graduated&&!E){this.lock();this.curCoord=YAHOO.util.Dom.getXY(this.thumb.getEl());setTimeout(function(){I.moveOneTick(C);},this.tickPause);}else{if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&!E){this.lock();var A=new YAHOO.util.Motion(H.id,{points:{to:C}},this.animationDuration,YAHOO.util.Easing.easeOut);A.onComplete.subscribe(function(){I.endMove();});A.animate();}else{H.setDragElPos(G,F);if(!D){this.endMove();}}}},_slideStart:function(){if(!this._sliding){if(!this._silent){this.onSlideStart();
this.fireEvent("slideStart");}this._sliding=true;}},_slideEnd:function(){if(this._sliding&&this.moveComplete){if(!this._silent){this.onSlideEnd();this.fireEvent("slideEnd");}this._sliding=false;this._silent=false;this.moveComplete=false;}},moveOneTick:function(B){var E=this.thumb,D;var F=null;if(E._isRegion){F=this._getNextX(this.curCoord,B);var A=(F)?F[0]:this.curCoord[0];F=this._getNextY([A,this.curCoord[1]],B);}else{if(E._isHoriz){F=this._getNextX(this.curCoord,B);}else{F=this._getNextY(this.curCoord,B);}}if(F){this.curCoord=F;this.thumb.alignElWithMouse(E.getEl(),F[0],F[1]);if(!(F[0]==B[0]&&F[1]==B[1])){var C=this;setTimeout(function(){C.moveOneTick(B);},this.tickPause);}else{this.endMove();}}else{this.endMove();}},_getNextX:function(A,B){var D=this.thumb;var F;var C=[];var E=null;if(A[0]>B[0]){F=D.tickSize-this.thumbCenterPoint.x;C=D.getTargetCoord(A[0]-F,A[1]);E=[C.x,C.y];}else{if(A[0]<B[0]){F=D.tickSize+this.thumbCenterPoint.x;C=D.getTargetCoord(A[0]+F,A[1]);E=[C.x,C.y];}else{}}return E;},_getNextY:function(A,B){var D=this.thumb;var F;var C=[];var E=null;if(A[1]>B[1]){F=D.tickSize-this.thumbCenterPoint.y;C=D.getTargetCoord(A[0],A[1]-F);E=[C.x,C.y];}else{if(A[1]<B[1]){F=D.tickSize+this.thumbCenterPoint.y;C=D.getTargetCoord(A[0],A[1]+F);E=[C.x,C.y];}else{}}return E;},b4MouseDown:function(A){this.thumb.autoOffset();this.thumb.resetConstraints();},onMouseDown:function(B){if(!this.isLocked()&&this.backgroundEnabled){var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.focus();this.moveThumb(A,C);}},onDrag:function(B){if(!this.isLocked()){var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.moveThumb(A,C,true,true);}},endMove:function(){this.unlock();this.moveComplete=true;this.fireEvents();},fireEvents:function(C){var B=this.thumb;if(!C){B.cachePosition();}if(!this.isLocked()){if(B._isRegion){var E=B.getXValue();var D=B.getYValue();if(E!=this.previousX||D!=this.previousY){if(!this._silent){this.onChange(E,D);this.fireEvent("change",{x:E,y:D});}}this.previousX=E;this.previousY=D;}else{var A=B.getValue();if(A!=this.previousVal){if(!this._silent){this.onChange(A);this.fireEvent("change",A);}}this.previousVal=A;}this._slideEnd();}},toString:function(){return("Slider ("+this.type+") "+this.id);}});YAHOO.augment(YAHOO.widget.Slider,YAHOO.util.EventProvider);YAHOO.widget.SliderThumb=function(G,B,E,D,A,F,C){if(G){YAHOO.widget.SliderThumb.superclass.constructor.call(this,G,B);this.parentElId=B;}this.isTarget=false;this.tickSize=C;this.maintainOffset=true;this.initSlider(E,D,A,F,C);this.scroll=false;};YAHOO.extend(YAHOO.widget.SliderThumb,YAHOO.util.DD,{startOffset:null,_isHoriz:false,_prevVal:0,_graduated:false,getOffsetFromParent0:function(C){var A=YAHOO.util.Dom.getXY(this.getEl());var B=C||YAHOO.util.Dom.getXY(this.parentElId);return[(A[0]-B[0]),(A[1]-B[1])];},getOffsetFromParent:function(H){var A=this.getEl(),E;if(!this.deltaOffset){var I=YAHOO.util.Dom.getXY(A);var F=H||YAHOO.util.Dom.getXY(this.parentElId);E=[(I[0]-F[0]),(I[1]-F[1])];var B=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);var K=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);var D=B-E[0];var C=K-E[1];if(isNaN(D)||isNaN(C)){}else{this.deltaOffset=[D,C];}}else{var J=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);var G=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);E=[J+this.deltaOffset[0],G+this.deltaOffset[1]];}return E;},initSlider:function(D,C,A,E,B){this.initLeft=D;this.initRight=C;this.initUp=A;this.initDown=E;this.setXConstraint(D,C,B);this.setYConstraint(A,E,B);if(B&&B>1){this._graduated=true;}this._isHoriz=(D||C);this._isVert=(A||E);this._isRegion=(this._isHoriz&&this._isVert);},clearTicks:function(){YAHOO.widget.SliderThumb.superclass.clearTicks.call(this);this.tickSize=0;this._graduated=false;},getValue:function(){return(this._isHoriz)?this.getXValue():this.getYValue();},getXValue:function(){if(!this.available){return 0;}var A=this.getOffsetFromParent();if(YAHOO.lang.isNumber(A[0])){this.lastOffset=A;return(A[0]-this.startOffset[0]);}else{return(this.lastOffset[0]-this.startOffset[0]);}},getYValue:function(){if(!this.available){return 0;}var A=this.getOffsetFromParent();if(YAHOO.lang.isNumber(A[1])){this.lastOffset=A;return(A[1]-this.startOffset[1]);}else{return(this.lastOffset[1]-this.startOffset[1]);}},toString:function(){return"SliderThumb "+this.id;},onChange:function(A,B){}});YAHOO.register("slider",YAHOO.widget.Slider,{version:"2.3.1",build:"541"});
YAHOO.util.Anim=function(B,A,C,D){if(!B){}this.init(B,A,C,D);};YAHOO.util.Anim.prototype={toString:function(){var A=this.getEl();var B=A.id||A.tagName||A;return("Anim "+B);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(A,C,B){return this.method(this.currentFrame,C,B-C,this.totalFrames);},setAttribute:function(A,C,B){if(this.patterns.noNegatives.test(A)){C=(C>0)?C:0;}YAHOO.util.Dom.setStyle(this.getEl(),A,C+B);},getAttribute:function(A){var C=this.getEl();var E=YAHOO.util.Dom.getStyle(C,A);if(E!=="auto"&&!this.patterns.offsetUnit.test(E)){return parseFloat(E);}var B=this.patterns.offsetAttribute.exec(A)||[];var F=!!(B[3]);var D=!!(B[2]);if(D||(YAHOO.util.Dom.getStyle(C,"position")=="absolute"&&F)){E=C["offset"+B[0].charAt(0).toUpperCase()+B[0].substr(1)];}else{E=0;}return E;},getDefaultUnit:function(A){if(this.patterns.defaultUnit.test(A)){return"px";}return"";},setRuntimeAttribute:function(B){var G;var C;var D=this.attributes;this.runtimeAttributes[B]={};var F=function(H){return(typeof H!=="undefined");};if(!F(D[B]["to"])&&!F(D[B]["by"])){return false;}G=(F(D[B]["from"]))?D[B]["from"]:this.getAttribute(B);if(F(D[B]["to"])){C=D[B]["to"];}else{if(F(D[B]["by"])){if(G.constructor==Array){C=[];for(var E=0,A=G.length;E<A;++E){C[E]=G[E]+D[B]["by"][E]*1;}}else{C=G+D[B]["by"]*1;}}}this.runtimeAttributes[B].start=G;this.runtimeAttributes[B].end=C;this.runtimeAttributes[B].unit=(F(D[B].unit))?D[B]["unit"]:this.getDefaultUnit(B);return true;},init:function(C,H,G,A){var B=false;var D=null;var F=0;C=YAHOO.util.Dom.get(C);this.attributes=H||{};this.duration=!YAHOO.lang.isUndefined(G)?G:1;this.method=A||YAHOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.setEl=function(K){C=YAHOO.util.Dom.get(K);};this.getEl=function(){return C;};this.isAnimated=function(){return B;};this.getStartTime=function(){return D;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}YAHOO.util.AnimMgr.registerElement(this);return true;};this.stop=function(K){if(K){this.currentFrame=this.totalFrames;this._onTween.fire();}YAHOO.util.AnimMgr.stop(this);};var J=function(){this.onStart.fire();this.runtimeAttributes={};for(var K in this.attributes){this.setRuntimeAttribute(K);}B=true;F=0;D=new Date();};var I=function(){var M={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};M.toString=function(){return("duration: "+M.duration+", currentFrame: "+M.currentFrame);};this.onTween.fire(M);var L=this.runtimeAttributes;for(var K in L){this.setAttribute(K,this.doMethod(K,L[K].start,L[K].end),L[K].unit);}F+=1;};var E=function(){var K=(new Date()-D)/1000;var L={duration:K,frames:F,fps:F/K};L.toString=function(){return("duration: "+L.duration+", frames: "+L.frames+", fps: "+L.fps);};B=false;F=0;this.onComplete.fire(L);};this._onStart=new YAHOO.util.CustomEvent("_start",this,true);this.onStart=new YAHOO.util.CustomEvent("start",this);this.onTween=new YAHOO.util.CustomEvent("tween",this);this._onTween=new YAHOO.util.CustomEvent("_tween",this,true);this.onComplete=new YAHOO.util.CustomEvent("complete",this);this._onComplete=new YAHOO.util.CustomEvent("_complete",this,true);this._onStart.subscribe(J);this._onTween.subscribe(I);this._onComplete.subscribe(E);}};YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start();};this.unRegister=function(G,F){G._onComplete.fire();F=F||E(G);if(F==-1){return false;}B.splice(F,1);A-=1;if(A<=0){this.stop();}return true;};this.start=function(){if(C===null){C=setInterval(this.run,this.delay);}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){if(B[0].isAnimated()){this.unRegister(B[0],0);}}B=[];C=null;A=0;}else{this.unRegister(H);}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue;}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G);}G._onTween.fire();}else{YAHOO.util.AnimMgr.stop(G,H);}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G;}}return -1;};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame);}else{K=J-(I+1);}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1);}G.currentFrame+=K;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]];}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];}}return[C[0][0],C[0][1]];};};(function(){YAHOO.util.ColorAnim=function(E,D,F,G){YAHOO.util.ColorAnim.superclass.constructor.call(this,E,D,F,G);};YAHOO.extend(YAHOO.util.ColorAnim,YAHOO.util.Anim);var B=YAHOO.util;var C=B.ColorAnim.superclass;var A=B.ColorAnim.prototype;A.toString=function(){var D=this.getEl();var E=D.id||D.tagName;return("ColorAnim "+E);};A.patterns.color=/color$/i;A.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;A.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;A.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;A.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;A.parseColor=function(D){if(D.length==3){return D;}var E=this.patterns.hex.exec(D);if(E&&E.length==4){return[parseInt(E[1],16),parseInt(E[2],16),parseInt(E[3],16)];}E=this.patterns.rgb.exec(D);if(E&&E.length==4){return[parseInt(E[1],10),parseInt(E[2],10),parseInt(E[3],10)];
}E=this.patterns.hex3.exec(D);if(E&&E.length==4){return[parseInt(E[1]+E[1],16),parseInt(E[2]+E[2],16),parseInt(E[3]+E[3],16)];}return null;};A.getAttribute=function(D){var F=this.getEl();if(this.patterns.color.test(D)){var G=YAHOO.util.Dom.getStyle(F,D);if(this.patterns.transparent.test(G)){var E=F.parentNode;G=B.Dom.getStyle(E,D);while(E&&this.patterns.transparent.test(G)){E=E.parentNode;G=B.Dom.getStyle(E,D);if(E.tagName.toUpperCase()=="HTML"){G="#fff";}}}}else{G=C.getAttribute.call(this,D);}return G;};A.doMethod=function(E,I,F){var H;if(this.patterns.color.test(E)){H=[];for(var G=0,D=I.length;G<D;++G){H[G]=C.doMethod.call(this,E,I[G],F[G]);}H="rgb("+Math.floor(H[0])+","+Math.floor(H[1])+","+Math.floor(H[2])+")";}else{H=C.doMethod.call(this,E,I,F);}return H;};A.setRuntimeAttribute=function(E){C.setRuntimeAttribute.call(this,E);if(this.patterns.color.test(E)){var G=this.attributes;var I=this.parseColor(this.runtimeAttributes[E].start);var F=this.parseColor(this.runtimeAttributes[E].end);if(typeof G[E]["to"]==="undefined"&&typeof G[E]["by"]!=="undefined"){F=this.parseColor(G[E].by);for(var H=0,D=I.length;H<D;++H){F[H]=I[H]+F[H];}}this.runtimeAttributes[E].start=I;this.runtimeAttributes[E].end=F;}};})();YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A;},easeIn:function(B,A,D,C){return D*(B/=C)*B+A;},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},elasticIn:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},elasticOut:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;}};(function(){YAHOO.util.Motion=function(G,F,H,I){if(G){YAHOO.util.Motion.superclass.constructor.call(this,G,F,H,I);}};YAHOO.extend(YAHOO.util.Motion,YAHOO.util.ColorAnim);var D=YAHOO.util;var E=D.Motion.superclass;var B=D.Motion.prototype;B.toString=function(){var F=this.getEl();var G=F.id||F.tagName;return("Motion "+G);};B.patterns.points=/^points$/i;B.setAttribute=function(F,H,G){if(this.patterns.points.test(F)){G=G||"px";E.setAttribute.call(this,"left",H[0],G);E.setAttribute.call(this,"top",H[1],G);}else{E.setAttribute.call(this,F,H,G);}};B.getAttribute=function(F){if(this.patterns.points.test(F)){var G=[E.getAttribute.call(this,"left"),E.getAttribute.call(this,"top")];}else{G=E.getAttribute.call(this,F);}return G;};B.doMethod=function(F,J,G){var I=null;if(this.patterns.points.test(F)){var H=this.method(this.currentFrame,0,100,this.totalFrames)/100;I=D.Bezier.getPosition(this.runtimeAttributes[F],H);}else{I=E.doMethod.call(this,F,J,G);}return I;};B.setRuntimeAttribute=function(O){if(this.patterns.points.test(O)){var G=this.getEl();var I=this.attributes;var F;var K=I["points"]["control"]||[];var H;var L,N;if(K.length>0&&!(K[0] instanceof Array)){K=[K];}else{var J=[];for(L=0,N=K.length;L<N;++L){J[L]=K[L];}K=J;}if(D.Dom.getStyle(G,"position")=="static"){D.Dom.setStyle(G,"position","relative");}if(C(I["points"]["from"])){D.Dom.setXY(G,I["points"]["from"]);}else{D.Dom.setXY(G,D.Dom.getXY(G));}F=this.getAttribute("points");if(C(I["points"]["to"])){H=A.call(this,I["points"]["to"],F);var M=D.Dom.getXY(this.getEl());for(L=0,N=K.length;L<N;++L){K[L]=A.call(this,K[L],F);}}else{if(C(I["points"]["by"])){H=[F[0]+I["points"]["by"][0],F[1]+I["points"]["by"][1]];for(L=0,N=K.length;L<N;++L){K[L]=[F[0]+K[L][0],F[1]+K[L][1]];}}}this.runtimeAttributes[O]=[F];if(K.length>0){this.runtimeAttributes[O]=this.runtimeAttributes[O].concat(K);}this.runtimeAttributes[O][this.runtimeAttributes[O].length]=H;}else{E.setRuntimeAttribute.call(this,O);}};var A=function(F,H){var G=D.Dom.getXY(this.getEl());F=[F[0]-G[0]+H[0],F[1]-G[1]+H[1]];return F;};var C=function(F){return(typeof F!=="undefined");};})();(function(){YAHOO.util.Scroll=function(E,D,F,G){if(E){YAHOO.util.Scroll.superclass.constructor.call(this,E,D,F,G);}};YAHOO.extend(YAHOO.util.Scroll,YAHOO.util.ColorAnim);var B=YAHOO.util;var C=B.Scroll.superclass;var A=B.Scroll.prototype;A.toString=function(){var D=this.getEl();var E=D.id||D.tagName;return("Scroll "+E);};A.doMethod=function(D,G,E){var F=null;if(D=="scroll"){F=[this.method(this.currentFrame,G[0],E[0]-G[0],this.totalFrames),this.method(this.currentFrame,G[1],E[1]-G[1],this.totalFrames)];
}else{F=C.doMethod.call(this,D,G,E);}return F;};A.getAttribute=function(D){var F=null;var E=this.getEl();if(D=="scroll"){F=[E.scrollLeft,E.scrollTop];}else{F=C.getAttribute.call(this,D);}return F;};A.setAttribute=function(D,G,F){var E=this.getEl();if(D=="scroll"){E.scrollLeft=G[0];E.scrollTop=G[1];}else{C.setAttribute.call(this,D,G,F);}};})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.3.1",build:"541"});
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}if(!D){}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F,E;for(F in this.config){E=this.config[F];if(E&&E.event){D[F]=E.value;}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(E,H){var G,D,F;if(H){F={};for(G in E){if(B.hasOwnProperty(E,G)){F[G.toLowerCase()]=E[G];}}this.initialConfig=F;}for(G in E){if(B.hasOwnProperty(E,G)){this.queueProperty(G,E[G]);}}},refresh:function(){var D;for(D in this.config){this.refireEvent(D);}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(E,F,H,D){var G=this.config[E.toLowerCase()];if(G&&G.event){if(!A.alreadySubscribed(G.event,F,H)){G.event.subscribe(F,H,D);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(Q,P){if(Q){this.init(Q,P);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,M=YAHOO.util.Event,L=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,H,O,N,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},I={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.textResizeEvent=new L("textResize");function K(){if(!H){H=document.createElement("div");H.innerHTML=("<div class=\""+G.CSS_HEADER+"\"></div><div class=\""+G.CSS_BODY+"\"></div><div class=\""+G.CSS_FOOTER+"\"></div>");O=H.firstChild;N=O.nextSibling;E=N.nextSibling;}return H;}function J(){if(!O){K();}return(O.cloneNode(false));}function B(){if(!N){K();}return(N.cloneNode(false));}function C(){if(!E){K();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var P=L.LIST;this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=P;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=P;this.appendEvent=this.createEvent(A.APPEND);
this.appendEvent.signature=P;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=P;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=P;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=P;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=P;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=P;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=P;this.destroyEvent=this.createEvent(A.DESTORY);this.destroyEvent.signature=P;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=P;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=P;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=P;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=P;},platform:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("windows")!=-1||P.indexOf("win32")!=-1){return"windows";}else{if(P.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("opera")!=-1){return"opera";}else{if(P.indexOf("msie 7")!=-1){return"ie7";}else{if(P.indexOf("msie")!=-1){return"ie";}else{if(P.indexOf("safari")!=-1){return"safari";}else{if(P.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(I.VISIBLE.key,{handler:this.configVisible,value:I.VISIBLE.value,validator:I.VISIBLE.validator});this.cfg.addProperty(I.EFFECT.key,{suppressEvent:I.EFFECT.suppressEvent,supercedes:I.EFFECT.supercedes});this.cfg.addProperty(I.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:I.MONITOR_RESIZE.value});this.cfg.addProperty(I.APPEND_TO_DOCUMENT_BODY.key,{value:I.APPEND_TO_DOCUMENT_BODY.value});},init:function(V,U){var R,T,W;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof V=="string"){R=V;V=document.getElementById(V);if(!V){V=(K()).cloneNode(false);V.id=R;}}this.element=V;if(V.id){this.id=V.id;}W=this.element.firstChild;if(W){var Q=false,P=false,S=false;do{if(1==W.nodeType){if(!Q&&F.hasClass(W,G.CSS_HEADER)){this.header=W;Q=true;}else{if(!P&&F.hasClass(W,G.CSS_BODY)){this.body=W;P=true;}else{if(!S&&F.hasClass(W,G.CSS_FOOTER)){this.footer=W;S=true;}}}}}while((W=W.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(U){this.cfg.applyConfig(U,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var P,Q,S;function T(){G.textResizeEvent.fire();}if(!YAHOO.env.ua.opera){Q=F.get("_yuiResizeMonitor");if(!Q){Q=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){Q.src=G.RESIZE_MONITOR_SECURE_URL;}if(YAHOO.env.ua.gecko){S="<html><head><script type=\"text/javascript\">window.onresize=function(){window.parent.YAHOO.widget.Module.textResizeEvent.fire();};window.parent.YAHOO.widget.Module.textResizeEvent.fire();</script></head><body></body></html>";Q.src="data:text/html;charset=utf-8,"+encodeURIComponent(S);}Q.id="_yuiResizeMonitor";Q.style.position="absolute";Q.style.visibility="hidden";var R=document.body.firstChild;if(R){document.body.insertBefore(Q,R);}else{document.body.appendChild(Q);}Q.style.width="10em";Q.style.height="10em";Q.style.top=(-1*Q.offsetHeight)+"px";Q.style.left=(-1*Q.offsetWidth)+"px";Q.style.borderWidth="0";Q.style.visibility="visible";if(YAHOO.env.ua.webkit){P=Q.contentWindow.document;P.open();P.close();}}if(Q&&Q.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(!M.on(Q.contentWindow,"resize",T)){M.on(Q,"resize",T);}G.textResizeInitialized=true;}this.resizeMonitor=Q;}}},onDomResize:function(S,R){var Q=-1*this.resizeMonitor.offsetWidth,P=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=P+"px";this.resizeMonitor.style.left=Q+"px";},setHeader:function(Q){var P=this.header||(this.header=J());if(typeof Q=="string"){P.innerHTML=Q;}else{P.innerHTML="";P.appendChild(Q);}this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},appendToHeader:function(Q){var P=this.header||(this.header=J());P.appendChild(Q);this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},setBody:function(Q){var P=this.body||(this.body=B());if(typeof Q=="string"){P.innerHTML=Q;}else{P.innerHTML="";P.appendChild(Q);}this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},appendToBody:function(Q){var P=this.body||(this.body=B());P.appendChild(Q);this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},setFooter:function(Q){var P=this.footer||(this.footer=C());if(typeof Q=="string"){P.innerHTML=Q;}else{P.innerHTML="";P.appendChild(Q);}this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},appendToFooter:function(Q){var P=this.footer||(this.footer=C());P.appendChild(Q);this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},render:function(R,P){var S=this,T;function Q(U){if(typeof U=="string"){U=document.getElementById(U);}if(U){S._addToParent(U,S.element);S.appendEvent.fire();}}this.beforeRenderEvent.fire();if(!P){P=this.element;}if(R){Q(R);}else{if(!F.inDocument(this.element)){return false;}}if(this.header&&!F.inDocument(this.header)){T=P.firstChild;if(T){P.insertBefore(this.header,T);}else{P.appendChild(this.header);}}if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){P.insertBefore(this.body,this.footer);}else{P.appendChild(this.body);}}if(this.footer&&!F.inDocument(this.footer)){P.appendChild(this.footer);}this.renderEvent.fire();return true;},destroy:function(){var P,Q;if(this.element){M.purgeElement(this.element,true);
P=this.element.parentNode;}if(P){P.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);if(this.cfg){this.cfg.destroy();this.cfg=null;}this.destroyEvent.fire();for(Q in this){if(Q instanceof L){Q.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(Q,P,R){var S=P[0];if(S){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(R,Q,S){var P=Q[0];if(P){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(P,Q){if(!this.cfg.getProperty("appendtodocumentbody")&&P===document.body&&P.firstChild){P.insertBefore(Q,P.firstChild);}else{P.appendChild(Q);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(L,K){YAHOO.widget.Overlay.superclass.constructor.call(this,L,K);};var F=YAHOO.lang,I=YAHOO.util.CustomEvent,E=YAHOO.widget.Module,J=YAHOO.util.Event,D=YAHOO.util.Dom,C=YAHOO.util.Config,B=YAHOO.widget.Overlay,G,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},H={"X":{key:"x",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:F.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:F.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:F.isBoolean,supercedes:["zindex"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.CSS_OVERLAY="yui-overlay";B.windowScrollEvent=new I("windowScroll");B.windowResizeEvent=new I("windowResize");B.windowScrollHandler=function(K){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}};B.windowResizeHandler=function(K){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){J.on(window,"scroll",B.windowScrollHandler);J.on(window,"resize",B.windowResizeHandler);B._initialized=true;}YAHOO.extend(B,E,{init:function(L,K){B.superclass.init.call(this,L);this.beforeInitEvent.fire(B);D.addClass(this.element,B.CSS_OVERLAY);if(K){this.cfg.applyConfig(K,true);}if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!C.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!C.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var K=I.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=K;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=K;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.X.key,{handler:this.configX,validator:H.X.validator,suppressEvent:H.X.suppressEvent,supercedes:H.X.supercedes});this.cfg.addProperty(H.Y.key,{handler:this.configY,validator:H.Y.validator,suppressEvent:H.Y.suppressEvent,supercedes:H.Y.supercedes});this.cfg.addProperty(H.XY.key,{handler:this.configXY,suppressEvent:H.XY.suppressEvent,supercedes:H.XY.supercedes});this.cfg.addProperty(H.CONTEXT.key,{handler:this.configContext,suppressEvent:H.CONTEXT.suppressEvent,supercedes:H.CONTEXT.supercedes});this.cfg.addProperty(H.FIXED_CENTER.key,{handler:this.configFixedCenter,value:H.FIXED_CENTER.value,validator:H.FIXED_CENTER.validator,supercedes:H.FIXED_CENTER.supercedes});this.cfg.addProperty(H.WIDTH.key,{handler:this.configWidth,suppressEvent:H.WIDTH.suppressEvent,supercedes:H.WIDTH.supercedes});this.cfg.addProperty(H.HEIGHT.key,{handler:this.configHeight,suppressEvent:H.HEIGHT.suppressEvent,supercedes:H.HEIGHT.supercedes});this.cfg.addProperty(H.ZINDEX.key,{handler:this.configzIndex,value:H.ZINDEX.value});this.cfg.addProperty(H.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:H.CONSTRAIN_TO_VIEWPORT.value,validator:H.CONSTRAIN_TO_VIEWPORT.validator,supercedes:H.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(H.IFRAME.key,{handler:this.configIframe,value:H.IFRAME.value,validator:H.IFRAME.validator,supercedes:H.IFRAME.supercedes});},moveTo:function(K,L){this.cfg.setProperty("xy",[K,L]);},hideMacGeckoScrollbars:function(){D.removeClass(this.element,"show-scrollbars");D.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){D.removeClass(this.element,"hide-scrollbars");D.addClass(this.element,"show-scrollbars");},configVisible:function(N,K,T){var M=K[0],O=D.getStyle(this.element,"visibility"),U=this.cfg.getProperty("effect"),R=[],Q=(this.platform=="mac"&&YAHOO.env.ua.gecko),b=C.alreadySubscribed,S,L,a,Y,X,W,Z,V,P;if(O=="inherit"){a=this.element.parentNode;while(a.nodeType!=9&&a.nodeType!=11){O=D.getStyle(a,"visibility");if(O!="inherit"){break;}a=a.parentNode;}if(O=="inherit"){O="visible";}}if(U){if(U instanceof Array){V=U.length;
for(Y=0;Y<V;Y++){S=U[Y];R[R.length]=S.effect(this,S.duration);}}else{R[R.length]=U.effect(this,U.duration);}}if(M){if(Q){this.showMacGeckoScrollbars();}if(U){if(M){if(O!="visible"||O===""){this.beforeShowEvent.fire();P=R.length;for(X=0;X<P;X++){L=R[X];if(X===0&&!b(L.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){L.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}L.animateIn();}}}}else{if(O!="visible"||O===""){this.beforeShowEvent.fire();D.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(Q){this.hideMacGeckoScrollbars();}if(U){if(O=="visible"){this.beforeHideEvent.fire();P=R.length;for(W=0;W<P;W++){Z=R[W];if(W===0&&!b(Z.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){Z.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}Z.animateOut();}}else{if(O===""){D.setStyle(this.element,"visibility","hidden");}}}else{if(O=="visible"||O===""){this.beforeHideEvent.fire();D.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(O,M,P){var Q=M[0],L=C.alreadySubscribed,N=B.windowResizeEvent,K=B.windowScrollEvent;if(Q){this.center();if(!L(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}if(!L(N,this.doCenterOnDOMEvent,this)){N.subscribe(this.doCenterOnDOMEvent,this,true);}if(!L(K,this.doCenterOnDOMEvent,this)){K.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);N.unsubscribe(this.doCenterOnDOMEvent,this);K.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(N,L,O){var K=L[0],M=this.element;D.setStyle(M,"height",K);this.cfg.refireEvent("iframe");},configWidth:function(N,K,O){var M=K[0],L=this.element;D.setStyle(L,"width",M);this.cfg.refireEvent("iframe");},configzIndex:function(M,K,N){var O=K[0],L=this.element;if(!O){O=D.getStyle(L,"zIndex");if(!O||isNaN(O)){O=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(O<=0){O=1;}}D.setStyle(L,"zIndex",O);this.cfg.setProperty("zIndex",O,true);if(this.iframe){this.stackIframe();}},configXY:function(M,L,N){var P=L[0],K=P[0],O=P[1];this.cfg.setProperty("x",K);this.cfg.setProperty("y",O);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configX:function(M,L,N){var K=L[0],O=this.cfg.getProperty("y");this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setX(this.element,K,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configY:function(M,L,N){var K=this.cfg.getProperty("x"),O=L[0];this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setY(this.element,O,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},showIframe:function(){var L=this.iframe,K;if(L){K=this.element.parentNode;if(K!=L.parentNode){this._addToParent(K,L);}L.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var K=this.iframe,M=this.element,O=B.IFRAME_OFFSET,L=(O*2),N;if(K){K.style.width=(M.offsetWidth+L+"px");K.style.height=(M.offsetHeight+L+"px");N=this.cfg.getProperty("xy");if(!F.isArray(N)||(isNaN(N[0])||isNaN(N[1]))){this.syncPosition();N=this.cfg.getProperty("xy");}D.setXY(K,[(N[0]-O),(N[1]-O)]);}},stackIframe:function(){if(this.iframe){var K=D.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(K)&&!isNaN(K)){D.setStyle(this.iframe,"zIndex",(K-1));}}},configIframe:function(N,M,O){var K=M[0];function P(){var R=this.iframe,S=this.element,U,T;if(!R){if(!G){G=document.createElement("iframe");if(this.isSecure){G.src=B.IFRAME_SRC;}if(YAHOO.env.ua.ie){G.style.filter="alpha(opacity=0)";G.frameBorder=0;}else{G.style.opacity="0";}G.style.position="absolute";G.style.border="none";G.style.margin="0";G.style.padding="0";G.style.display="none";}R=G.cloneNode(false);U=S.parentNode;var Q=U||document.body;this._addToParent(Q,R);this.iframe=R;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function L(){P.call(this);this.beforeShowEvent.unsubscribe(L);this._iframeDeferred=false;}if(K){if(this.cfg.getProperty("visible")){P.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(L);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},configConstrainToViewport:function(L,K,M){var N=K[0];if(N){if(!C.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(M,L,O){var Q=L[0],N,P,K;if(Q){N=Q[0];P=Q[1];K=Q[2];if(N){if(typeof N=="string"){this.cfg.setProperty("context",[document.getElementById(N),P,K],true);}if(P&&K){this.align(P,K);}}}},align:function(L,K){var Q=this.cfg.getProperty("context"),P=this,O,N,R;function M(S,T){switch(L){case B.TOP_LEFT:P.moveTo(T,S);break;case B.TOP_RIGHT:P.moveTo((T-N.offsetWidth),S);break;case B.BOTTOM_LEFT:P.moveTo(T,(S-N.offsetHeight));break;case B.BOTTOM_RIGHT:P.moveTo((T-N.offsetWidth),(S-N.offsetHeight));break;}}if(Q){O=Q[0];N=this.element;P=this;if(!L){L=Q[1];}if(!K){K=Q[2];}if(N&&O){R=D.getRegion(O);switch(K){case B.TOP_LEFT:M(R.top,R.left);
break;case B.TOP_RIGHT:M(R.top,R.right);break;case B.BOTTOM_LEFT:M(R.bottom,R.left);break;case B.BOTTOM_RIGHT:M(R.bottom,R.right);break;}}}},enforceConstraints:function(S,R,O){var U=R[0],W=U[0],V=U[1],L=this.element.offsetHeight,Q=this.element.offsetWidth,T=D.getViewportWidth(),N=D.getViewportHeight(),Z=D.getDocumentScrollLeft(),X=D.getDocumentScrollTop(),M=X+10,P=Z+10,K=X+N-L-10,Y=Z+T-Q-10;if(W<P){W=P;}else{if(W>Y){W=Y;}}if(V<M){V=M;}else{if(V>K){V=K;}}this.cfg.setProperty("x",W,true);this.cfg.setProperty("y",V,true);this.cfg.setProperty("xy",[W,V],true);},center:function(){var Q=D.getDocumentScrollLeft(),O=D.getDocumentScrollTop(),L=D.getClientWidth(),P=D.getClientHeight(),N=this.element.offsetWidth,M=this.element.offsetHeight,K=(L/2)-(N/2)+Q,R=(P/2)-(M/2)+O;this.cfg.setProperty("xy",[parseInt(K,10),parseInt(R,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var K=D.getXY(this.element);this.cfg.setProperty("x",K[0],true);this.cfg.setProperty("y",K[1],true);this.cfg.setProperty("xy",K,true);},onDomResize:function(M,L){var K=this;B.superclass.onDomResize.call(this,M,L);setTimeout(function(){K.syncPosition();K.cfg.refireEvent("iframe");K.cfg.refireEvent("context");},0);},bringToTop:function(){var N=[],M=this.element;function P(T,S){var V=D.getStyle(T,"zIndex"),U=D.getStyle(S,"zIndex"),R=(!V||isNaN(V))?0:parseInt(V,10),Q=(!U||isNaN(U))?0:parseInt(U,10);if(R>Q){return -1;}else{if(R<Q){return 1;}else{return 0;}}}function L(S){var Q=D.hasClass(S,B.CSS_OVERLAY),R=YAHOO.widget.Panel;if(Q&&!D.isAncestor(M,Q)){if(R&&D.hasClass(S,R.CSS_PANEL)){N[N.length]=S.parentNode;}else{N[N.length]=S;}}}D.getElementsBy(L,"DIV",document.body);N.sort(P);var K=N[0],O;if(K){O=D.getStyle(K,"zIndex");if(!isNaN(O)&&K!=M){this.cfg.setProperty("zindex",(parseInt(O,10)+2));}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){if(H!=K){if(H){H.blur();}this.bringToTop(K);H=K;E.addClass(H.element,A.CSS_FOCUSED);K.focusEvent.fire();}}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}M.focusEvent.unsubscribeAll();M.blurEvent.unsubscribeAll();M.focusEvent=null;M.blurEvent=null;M.focus=null;M.blur=null;}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._onOverlayBlur=function(K,J){H=null;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},register:function(G){var K=this,L,I,H,J;if(G instanceof D){G.cfg.addProperty("manager",{value:this});G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focus=function(){K.focus(this);};G.blur=function(){if(K.getActive()==this){E.removeClass(this.element,A.CSS_FOCUSED);this.blurEvent.fire();}};G.blurEvent.subscribe(K._onOverlayBlur);G.hideEvent.subscribe(G.blur);G.destroyEvent.subscribe(this._onOverlayDestroy,G,this);C.on(G.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,G);L=E.getStyle(G.element,"zIndex");if(!isNaN(L)){G.cfg.setProperty("zIndex",parseInt(L,10));}else{G.cfg.setProperty("zIndex",0);}this.overlays.push(G);this.bringToTop(G);return true;}else{if(G instanceof Array){I=0;J=G.length;for(H=0;H<J;H++){if(this.register(G[H])){I++;}}if(I>0){return true;}}else{return false;}}},bringToTop:function(K){var H=this.find(K),J,G,I;if(H){I=this.overlays;I.sort(this.compareZIndexDesc);G=I[0];if(G){J=E.getStyle(G.element,"zIndex");if(!isNaN(J)&&G!=H){H.cfg.setProperty("zIndex",(parseInt(J,10)+2));}I.sort(this.compareZIndexDesc);}}},find:function(G){var I=this.overlays,J=I.length,H;if(J>0){H=J-1;if(G instanceof D){do{if(I[H]==G){return I[H];}}while(H--);}else{if(typeof G=="string"){do{if(I[H].id==G){return I[H];}}while(H--);}}return null;}},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].show();}while(G--);}},hideAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].hide();}while(G--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(L,K){YAHOO.widget.Tooltip.superclass.constructor.call(this,L,K);};var D=YAHOO.lang,J=YAHOO.util.Event,B=YAHOO.util.Dom,F=YAHOO.widget.Tooltip,E,G={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:D.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:D.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:D.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:D.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"}};
F.CSS_TOOLTIP="yui-tt";function H(L,K,M){var P=M[0],N=M[1],O=this.cfg,Q=O.getProperty("width");if(Q==N){O.setProperty("width",P);}this.unsubscribe("hide",this._onHide,M);}function C(L,K){var M=document.body,Q=this.cfg,P=Q.getProperty("width"),N,O;if((!P||P=="auto")&&(Q.getProperty("container")!=M||Q.getProperty("x")>=B.getViewportWidth()||Q.getProperty("y")>=B.getViewportHeight())){O=this.element.cloneNode(true);O.style.visibility="hidden";O.style.top="0px";O.style.left="0px";M.appendChild(O);N=(O.offsetWidth+"px");M.removeChild(O);O=null;Q.setProperty("width",N);Q.refireEvent("xy");this.subscribe("hide",H,[(P||""),N]);}}function A(L,K,M){this.render(M);}function I(){J.onDOMReady(A,this.cfg.getProperty("container"),this);}YAHOO.extend(F,YAHOO.widget.Overlay,{init:function(L,K){F.superclass.init.call(this,L);this.beforeInitEvent.fire(F);B.addClass(this.element,F.CSS_TOOLTIP);if(K){this.cfg.applyConfig(K,true);}this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("beforeShow",C);this.subscribe("init",I);this.subscribe("render",this.onRender);this.initEvent.fire(F);},initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);this.cfg.addProperty(G.PREVENT_OVERLAP.key,{value:G.PREVENT_OVERLAP.value,validator:G.PREVENT_OVERLAP.validator,supercedes:G.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(G.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:G.SHOW_DELAY.validator});this.cfg.addProperty(G.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:G.AUTO_DISMISS_DELAY.value,validator:G.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(G.HIDE_DELAY.key,{handler:this.configHideDelay,value:G.HIDE_DELAY.value,validator:G.HIDE_DELAY.validator});this.cfg.addProperty(G.TEXT.key,{handler:this.configText,suppressEvent:G.TEXT.suppressEvent});this.cfg.addProperty(G.CONTAINER.key,{handler:this.configContainer,value:document.body});},configText:function(L,K,M){var N=K[0];if(N){this.setBody(N);}},configContainer:function(M,L,N){var K=L[0];if(typeof K=="string"){this.cfg.setProperty("container",document.getElementById(K),true);}},_removeEventListeners:function(){var N=this._context,K,M,L;if(N){K=N.length;if(K>0){L=K-1;do{M=N[L];J.removeListener(M,"mouseover",this.onContextMouseOver);J.removeListener(M,"mousemove",this.onContextMouseMove);J.removeListener(M,"mouseout",this.onContextMouseOut);}while(L--);}}},configContext:function(P,L,Q){var O=L[0],R,K,N,M;if(O){if(!(O instanceof Array)){if(typeof O=="string"){this.cfg.setProperty("context",[document.getElementById(O)],true);}else{this.cfg.setProperty("context",[O],true);}O=this.cfg.getProperty("context");}this._removeEventListeners();this._context=O;R=this._context;if(R){K=R.length;if(K>0){M=K-1;do{N=R[M];J.on(N,"mouseover",this.onContextMouseOver,this);J.on(N,"mousemove",this.onContextMouseMove,this);J.on(N,"mouseout",this.onContextMouseOut,this);}while(M--);}}}},onContextMouseMove:function(L,K){K.pageX=J.getPageX(L);K.pageY=J.getPageY(L);},onContextMouseOver:function(M,L){var K=this;if(L.hideProcId){clearTimeout(L.hideProcId);L.hideProcId=null;}J.on(K,"mousemove",L.onContextMouseMove,L);if(K.title){L._tempTitle=K.title;K.title="";}L.showProcId=L.doShow(M,K);},onContextMouseOut:function(M,L){var K=this;if(L._tempTitle){K.title=L._tempTitle;L._tempTitle=null;}if(L.showProcId){clearTimeout(L.showProcId);L.showProcId=null;}if(L.hideProcId){clearTimeout(L.hideProcId);L.hideProcId=null;}L.hideProcId=setTimeout(function(){L.hide();},L.cfg.getProperty("hidedelay"));},doShow:function(M,K){var N=25,L=this;if(YAHOO.env.ua.opera&&K.tagName&&K.tagName.toUpperCase()=="A"){N+=12;}return setTimeout(function(){if(L._tempTitle){L.setBody(L._tempTitle);}else{L.cfg.refireEvent("text");}L.moveTo(L.pageX,L.pageY+N);if(L.cfg.getProperty("preventoverlap")){L.preventOverlap(L.pageX,L.pageY);}J.removeListener(K,"mousemove",L.onContextMouseMove);L.show();L.hideProcId=L.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var K=this;return setTimeout(function(){K.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(O,N){var K=this.element.offsetHeight,M=new YAHOO.util.Point(O,N),L=B.getRegion(this.element);L.top-=5;L.left-=5;L.right+=5;L.bottom+=5;if(L.contains(M)){this.cfg.setProperty("y",(N-K-5));}},onRender:function(O,N){function P(){var S=this.element,R=this._shadow;if(R){R.style.width=(S.offsetWidth+6)+"px";R.style.height=(S.offsetHeight+1)+"px";}}function L(){B.addClass(this._shadow,"yui-tt-shadow-visible");}function K(){B.removeClass(this._shadow,"yui-tt-shadow-visible");}function Q(){var T=this._shadow,S,R,V,U;if(!T){S=this.element;R=YAHOO.widget.Module;V=YAHOO.env.ua.ie;U=this;if(!E){E=document.createElement("div");E.className="yui-tt-shadow";}T=E.cloneNode(false);S.appendChild(T);this._shadow=T;L.call(this);this.subscribe("beforeShow",L);this.subscribe("beforeHide",K);if(V==6||(V==7&&document.compatMode=="BackCompat")){window.setTimeout(function(){P.call(U);},0);this.cfg.subscribeToConfigEvent("width",P);this.cfg.subscribeToConfigEvent("height",P);this.subscribe("changeContent",P);R.textResizeEvent.subscribe(P,this,true);this.subscribe("destroy",function(){R.textResizeEvent.unsubscribe(P,this);});}}}function M(){Q.call(this);this.unsubscribe("beforeShow",M);}if(this.cfg.getProperty("visible")){Q.call(this);}else{this.subscribe("beforeShow",M);}},destroy:function(){this._removeEventListeners();F.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(U,T){YAHOO.widget.Panel.superclass.constructor.call(this,U,T);};var G=YAHOO.lang,N=YAHOO.util.DD,A=YAHOO.util.Dom,S=YAHOO.util.Event,I=YAHOO.widget.Overlay,L=YAHOO.util.CustomEvent,J=YAHOO.util.Config,O=YAHOO.widget.Panel,H,Q,D,E={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},M={"CLOSE":{key:"close",value:true,validator:G.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(N?true:false),validator:G.isBoolean,supercedes:["visible"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:G.isBoolean,supercedes:["visible","zindex"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]}};
O.CSS_PANEL="yui-panel";O.CSS_PANEL_CONTAINER="yui-panel-container";function K(U,T){if(!this.header){this.setHeader("&#160;");}}function R(U,T,V){var Y=V[0],W=V[1],X=this.cfg,Z=X.getProperty("width");if(Z==W){X.setProperty("width",Y);}this.unsubscribe("hide",R,V);}function C(U,T){var Y=YAHOO.env.ua.ie,X,W,V;if(Y==6||(Y==7&&document.compatMode=="BackCompat")){X=this.cfg;W=X.getProperty("width");if(!W||W=="auto"){V=(this.element.offsetWidth+"px");X.setProperty("width",V);this.subscribe("hide",R,[(W||""),V]);}}}function F(){this.blur();}function P(V,U){var W=this;function T(Z){var Y=Z.tagName.toUpperCase(),X=false;switch(Y){case"A":case"BUTTON":case"SELECT":case"TEXTAREA":if(!A.isAncestor(W.element,Z)){S.on(Z,"focus",F,Z,true);X=true;}break;case"INPUT":if(Z.type!="hidden"&&!A.isAncestor(W.element,Z)){S.on(Z,"focus",F,Z,true);X=true;}break;}return X;}this.focusableElements=A.getElementsBy(T);}function B(V,U){var Y=this.focusableElements,T=Y.length,W,X;for(X=0;X<T;X++){W=Y[X];S.removeListener(W,"focus",F);}}YAHOO.extend(O,I,{init:function(U,T){O.superclass.init.call(this,U);this.beforeInitEvent.fire(O);A.addClass(this.element,O.CSS_PANEL);this.buildWrapper();if(T){this.cfg.applyConfig(T,true);}this.subscribe("showMask",P);this.subscribe("hideMask",B);if(this.cfg.getProperty("draggable")){this.subscribe("beforeRender",K);}this.initEvent.fire(O);},initEvents:function(){O.superclass.initEvents.call(this);var T=L.LIST;this.showMaskEvent=this.createEvent(E.SHOW_MASK);this.showMaskEvent.signature=T;this.hideMaskEvent=this.createEvent(E.HIDE_MASK);this.hideMaskEvent.signature=T;this.dragEvent=this.createEvent(E.DRAG);this.dragEvent.signature=T;},initDefaultConfig:function(){O.superclass.initDefaultConfig.call(this);this.cfg.addProperty(M.CLOSE.key,{handler:this.configClose,value:M.CLOSE.value,validator:M.CLOSE.validator,supercedes:M.CLOSE.supercedes});this.cfg.addProperty(M.DRAGGABLE.key,{handler:this.configDraggable,value:M.DRAGGABLE.value,validator:M.DRAGGABLE.validator,supercedes:M.DRAGGABLE.supercedes});this.cfg.addProperty(M.UNDERLAY.key,{handler:this.configUnderlay,value:M.UNDERLAY.value,supercedes:M.UNDERLAY.supercedes});this.cfg.addProperty(M.MODAL.key,{handler:this.configModal,value:M.MODAL.value,validator:M.MODAL.validator,supercedes:M.MODAL.supercedes});this.cfg.addProperty(M.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:M.KEY_LISTENERS.suppressEvent,supercedes:M.KEY_LISTENERS.supercedes});},configClose:function(V,T,X){var Y=T[0],U=this.close;function W(a,Z){Z.hide();}if(Y){if(!U){if(!D){D=document.createElement("span");D.innerHTML="&#160;";D.className="container-close";}U=D.cloneNode(true);this.innerElement.appendChild(U);S.on(U,"click",W,this);this.close=U;}else{U.style.display="block";}}else{if(U){U.style.display="none";}}},configDraggable:function(U,T,V){var W=T[0];if(W){if(!N){this.cfg.setProperty("draggable",false);return ;}if(this.header){A.setStyle(this.header,"cursor","move");this.registerDragDrop();}if(!J.alreadySubscribed(this.beforeRenderEvent,K,null)){this.subscribe("beforeRender",K);}this.subscribe("beforeShow",C);}else{if(this.dd){this.dd.unreg();}if(this.header){A.setStyle(this.header,"cursor","auto");}this.unsubscribe("beforeRender",K);this.unsubscribe("beforeShow",C);}},configUnderlay:function(c,b,X){var a=YAHOO.env.ua,Z=(this.platform=="mac"&&a.gecko),d=b[0].toLowerCase(),T=this.underlay,U=this.element;function V(){var e;if(!T){if(!Q){Q=document.createElement("div");Q.className="underlay";}T=Q.cloneNode(false);this.element.appendChild(T);this.underlay=T;e=a.ie;if(e==6||(e==7&&document.compatMode=="BackCompat")){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}}}function Y(){V.call(this);this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(Y);}function W(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(Y);this._underlayDeferred=false;}if(T){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(T);this.underlay=null;}}switch(d){case"shadow":A.removeClass(U,"matte");A.addClass(U,"shadow");break;case"matte":if(!Z){W.call(this);}A.removeClass(U,"shadow");A.addClass(U,"matte");break;default:if(!Z){W.call(this);}A.removeClass(U,"shadow");A.removeClass(U,"matte");break;}if((d=="shadow")||(Z&&!T)){if(this.cfg.getProperty("visible")){V.call(this);}else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(Y);this._underlayDeferred=true;}}}},configModal:function(U,T,W){var V=T[0];if(V){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);I.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);I.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var U=this.mask,T;if(U){this.hideMask();T=U.parentNode;if(T){T.removeChild(U);}this.mask=null;}},configKeyListeners:function(W,T,Z){var V=T[0],Y,X,U;if(V){if(V instanceof Array){X=V.length;for(U=0;U<X;U++){Y=V[U];if(!J.alreadySubscribed(this.showEvent,Y.enable,Y)){this.showEvent.subscribe(Y.enable,Y,true);}if(!J.alreadySubscribed(this.hideEvent,Y.disable,Y)){this.hideEvent.subscribe(Y.disable,Y,true);this.destroyEvent.subscribe(Y.disable,Y,true);
}}}else{if(!J.alreadySubscribed(this.showEvent,V.enable,V)){this.showEvent.subscribe(V.enable,V,true);}if(!J.alreadySubscribed(this.hideEvent,V.disable,V)){this.hideEvent.subscribe(V.disable,V,true);this.destroyEvent.subscribe(V.disable,V,true);}}}},configHeight:function(W,U,X){var T=U[0],V=this.innerElement;A.setStyle(V,"height",T);this.cfg.refireEvent("iframe");},configWidth:function(W,T,X){var V=T[0],U=this.innerElement;A.setStyle(U,"width",V);this.cfg.refireEvent("iframe");},configzIndex:function(U,T,W){O.superclass.configzIndex.call(this,U,T,W);if(this.mask||this.cfg.getProperty("modal")===true){var V=A.getStyle(this.element,"zIndex");if(!V||isNaN(V)){V=0;}if(V===0){this.cfg.setProperty("zIndex",1);}else{this.stackMask();}}},buildWrapper:function(){var V=this.element.parentNode,T=this.element,U=document.createElement("div");U.className=O.CSS_PANEL_CONTAINER;U.id=T.id+"_c";if(V){V.insertBefore(U,T);}U.appendChild(T);this.element=U;this.innerElement=T;A.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var U=this.underlay,T;if(U){T=this.element;U.style.width=T.offsetWidth+"px";U.style.height=T.offsetHeight+"px";}},registerDragDrop:function(){var T=this;if(this.header){if(!N){return ;}this.dd=new N(this.element.id,this.id);if(!this.header.id){this.header.id=this.id+"_h";}this.dd.startDrag=function(){var V,Z,a,X,d,b,W,Y,U,c;if(YAHOO.env.ua.ie==6){A.addClass(T.element,"drag");}if(T.cfg.getProperty("constraintoviewport")){V=T.element.offsetHeight;Z=T.element.offsetWidth;a=A.getViewportWidth();X=A.getViewportHeight();d=A.getDocumentScrollLeft();b=A.getDocumentScrollTop();W=b+10;Y=d+10;U=b+X-V-10;c=d+a-Z-10;this.minX=Y;this.maxX=c;this.constrainX=true;this.minY=W;this.maxY=U;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}T.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){T.syncPosition();T.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}T.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){A.removeClass(T.element,"drag");}T.dragEvent.fire("endDrag",arguments);T.moveEvent.fire(T.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var T=this.mask;if(!T){if(!H){H=document.createElement("div");H.className="mask";H.innerHTML="&#160;";}T=H.cloneNode(true);T.id=this.id+"_mask";document.body.insertBefore(T,document.body.firstChild);this.mask=T;this.stackMask();}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";this.hideMaskEvent.fire();A.removeClass(document.body,"masked");}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){A.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){this.mask.style.height=A.getDocumentHeight()+"px";this.mask.style.width=A.getDocumentWidth()+"px";}},stackMask:function(){if(this.mask){var T=A.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(T)&&!isNaN(T)){A.setStyle(this.mask,"zIndex",T-1);}}},render:function(T){return O.superclass.render.call(this,T,this.innerElement);},destroy:function(){I.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){S.purgeElement(this.close);}O.superclass.destroy.call(this);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(L,K){YAHOO.widget.Dialog.superclass.constructor.call(this,L,K);};var J=YAHOO.util.Event,I=YAHOO.util.CustomEvent,D=YAHOO.util.Dom,B=YAHOO.util.KeyListener,H=YAHOO.util.Connect,F=YAHOO.widget.Dialog,E=YAHOO.lang,A={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},G={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none"}};F.CSS_DIALOG="yui-dialog";function C(){var N=this._aButtons,L,M,K;if(E.isArray(N)){L=N.length;if(L>0){K=L-1;do{M=N[K];if(YAHOO.widget.Button&&M instanceof YAHOO.widget.Button){M.destroy();}else{if(M.tagName.toUpperCase()=="BUTTON"){J.purgeElement(M);J.purgeElement(M,false);}}}while(K--);}}}YAHOO.extend(F,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};this.cfg.addProperty(G.POST_METHOD.key,{handler:this.configPostMethod,value:G.POST_METHOD.value,validator:function(K){if(K!="form"&&K!="async"&&K!="none"&&K!="manual"){return false;}else{return true;}}});this.cfg.addProperty(G.BUTTONS.key,{handler:this.configButtons,value:G.BUTTONS.value});},initEvents:function(){F.superclass.initEvents.call(this);var K=I.LIST;this.beforeSubmitEvent=this.createEvent(A.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=K;this.submitEvent=this.createEvent(A.SUBMIT);this.submitEvent.signature=K;this.manualSubmitEvent=this.createEvent(A.MANUAL_SUBMIT);this.manualSubmitEvent.signature=K;this.asyncSubmitEvent=this.createEvent(A.ASYNC_SUBMIT);this.asyncSubmitEvent.signature=K;this.formSubmitEvent=this.createEvent(A.FORM_SUBMIT);this.formSubmitEvent.signature=K;this.cancelEvent=this.createEvent(A.CANCEL);this.cancelEvent.signature=K;},init:function(L,K){F.superclass.init.call(this,L);this.beforeInitEvent.fire(F);D.addClass(this.element,F.CSS_DIALOG);this.cfg.setProperty("visible",false);if(K){this.cfg.applyConfig(K,true);}this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(F);},doSubmit:function(){var Q=this.form,O=false,N=false,P,K,M,L;switch(this.cfg.getProperty("postmethod")){case"async":P=Q.elements;K=P.length;if(K>0){M=K-1;do{if(P[M].type=="file"){O=true;break;}}while(M--);}if(O&&YAHOO.env.ua.ie&&this.isSecure){N=true;}L=(Q.getAttribute("method")||"POST").toUpperCase();
H.setForm(Q,O,N);H.asyncRequest(L,Q.getAttribute("action"),this.callback);this.asyncSubmitEvent.fire();break;case"form":Q.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},registerForm:function(){var M=this.element.getElementsByTagName("form")[0],L=this,K,N;if(this.form){if(this.form==M&&D.isAncestor(this.element,this.form)){return ;}else{J.purgeElement(this.form);this.form=null;}}if(!M){M=document.createElement("form");M.name="frm_"+this.id;this.body.appendChild(M);}if(M){this.form=M;J.on(M,"submit",function(O){J.stopEvent(O);this.submit();this.form.blur();},this,true);this.firstFormElement=function(){var Q,P,O=M.elements.length;for(Q=0;Q<O;Q++){P=M.elements[Q];if(P.focus&&!P.disabled&&P.type!="hidden"){return P;}}return null;}();this.lastFormElement=function(){var Q,P,O=M.elements.length;for(Q=O-1;Q>=0;Q--){P=M.elements[Q];if(P.focus&&!P.disabled&&P.type!="hidden"){return P;}}return null;}();if(this.cfg.getProperty("modal")){K=this.firstFormElement||this.firstButton;if(K){this.preventBackTab=new B(K,{shift:true,keys:9},{fn:L.focusLast,scope:L,correctScope:true});this.showEvent.subscribe(this.preventBackTab.enable,this.preventBackTab,true);this.hideEvent.subscribe(this.preventBackTab.disable,this.preventBackTab,true);}N=this.lastButton||this.lastFormElement;if(N){this.preventTabOut=new B(N,{shift:false,keys:9},{fn:L.focusFirst,scope:L,correctScope:true});this.showEvent.subscribe(this.preventTabOut.enable,this.preventTabOut,true);this.hideEvent.subscribe(this.preventTabOut.disable,this.preventTabOut,true);}}}},configClose:function(M,K,N){var O=K[0];function L(Q,P){P.cancel();}if(O){if(!this.close){this.close=document.createElement("div");D.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);J.on(this.close,"click",L,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}},configButtons:function(U,T,O){var P=YAHOO.widget.Button,W=T[0],M=this.innerElement,V,R,L,S,Q,K,N;C.call(this);this._aButtons=null;if(E.isArray(W)){Q=document.createElement("span");Q.className="button-group";S=W.length;this._aButtons=[];for(N=0;N<S;N++){V=W[N];if(P){L=new P({label:V.text,container:Q});R=L.get("element");if(V.isDefault){L.addClass("default");this.defaultHtmlButton=R;}if(E.isFunction(V.handler)){L.set("onclick",{fn:V.handler,obj:this,scope:this});}else{if(E.isObject(V.handler)&&E.isFunction(V.handler.fn)){L.set("onclick",{fn:V.handler.fn,obj:((!E.isUndefined(V.handler.obj))?V.handler.obj:this),scope:(V.handler.scope||this)});}}this._aButtons[this._aButtons.length]=L;}else{R=document.createElement("button");R.setAttribute("type","button");if(V.isDefault){R.className="default";this.defaultHtmlButton=R;}R.innerHTML=V.text;if(E.isFunction(V.handler)){J.on(R,"click",V.handler,this,true);}else{if(E.isObject(V.handler)&&E.isFunction(V.handler.fn)){J.on(R,"click",V.handler.fn,((!E.isUndefined(V.handler.obj))?V.handler.obj:this),(V.handler.scope||this));}}Q.appendChild(R);this._aButtons[this._aButtons.length]=R;}V.htmlButton=R;if(N===0){this.firstButton=R;}if(N==(S-1)){this.lastButton=R;}}this.setFooter(Q);K=this.footer;if(D.inDocument(this.element)&&!D.isAncestor(M,K)){M.appendChild(K);}this.buttonSpan=Q;}else{Q=this.buttonSpan;K=this.footer;if(Q&&K){K.removeChild(Q);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}this.cfg.refireEvent("iframe");this.cfg.refireEvent("underlay");},getButtons:function(){var K=this._aButtons;if(K){return K;}},focusFirst:function(N,L,P){var M=this.firstFormElement,K;if(L){K=L[1];if(K){J.stopEvent(K);}}if(M){try{M.focus();}catch(O){}}else{this.focusDefaultButton();}},focusLast:function(N,L,P){var Q=this.cfg.getProperty("buttons"),M=this.lastFormElement,K;if(L){K=L[1];if(K){J.stopEvent(K);}}if(Q&&E.isArray(Q)){this.focusLastButton();}else{if(M){try{M.focus();}catch(O){}}}},focusDefaultButton:function(){var K=this.defaultHtmlButton;if(K){try{K.focus();}catch(L){}}},blurButtons:function(){var P=this.cfg.getProperty("buttons"),M,O,L,K;if(P&&E.isArray(P)){M=P.length;if(M>0){K=(M-1);do{O=P[K];if(O){L=O.htmlButton;if(L){try{L.blur();}catch(N){}}}}while(K--);}}},focusFirstButton:function(){var N=this.cfg.getProperty("buttons"),M,K;if(N&&E.isArray(N)){M=N[0];if(M){K=M.htmlButton;if(K){try{K.focus();}catch(L){}}}}},focusLastButton:function(){var O=this.cfg.getProperty("buttons"),L,N,K;if(O&&E.isArray(O)){L=O.length;if(L>0){N=O[(L-1)];if(N){K=N.htmlButton;if(K){try{K.focus();}catch(M){}}}}}},configPostMethod:function(M,L,N){var K=L[0];this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();this.hide();return true;}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var a=this.form,M,T,W,O,U,R,Q,L,X,N,Y,b,K,P,c,Z,V;function S(e){var d=e.tagName.toUpperCase();return((d=="INPUT"||d=="TEXTAREA"||d=="SELECT")&&e.name==O);}if(a){M=a.elements;T=M.length;W={};for(Z=0;Z<T;Z++){O=M[Z].name;U=D.getElementsBy(S,"*",a);R=U.length;if(R>0){if(R==1){U=U[0];Q=U.type;L=U.tagName.toUpperCase();switch(L){case"INPUT":if(Q=="checkbox"){W[O]=U.checked;}else{if(Q!="radio"){W[O]=U.value;}}break;case"TEXTAREA":W[O]=U.value;break;case"SELECT":X=U.options;N=X.length;Y=[];for(V=0;V<N;V++){b=X[V];if(b.selected){K=b.value;if(!K||K===""){K=b.text;}Y[Y.length]=K;}}W[O]=Y;break;}}else{Q=U[0].type;switch(Q){case"radio":for(V=0;V<R;V++){P=U[V];if(P.checked){W[O]=P.value;break;}}break;case"checkbox":Y=[];for(V=0;V<R;V++){c=U[V];if(c.checked){Y[Y.length]=c.value;}}W[O]=Y;break;}}}}}return W;},destroy:function(){C.call(this);this._aButtons=null;var K=this.element.getElementsByTagName("form"),L;if(K.length>0){L=K[0];if(L){J.purgeElement(L);if(L.parentNode){L.parentNode.removeChild(L);}this.form=null;}}F.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());
(function(){YAHOO.widget.SimpleDialog=function(E,D){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,E,D);};var C=YAHOO.util.Dom,B=YAHOO.widget.SimpleDialog,A={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};B.ICON_BLOCK="blckicon";B.ICON_ALARM="alrticon";B.ICON_HELP="hlpicon";B.ICON_INFO="infoicon";B.ICON_WARN="warnicon";B.ICON_TIP="tipicon";B.ICON_CSS_CLASSNAME="yui-icon";B.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(B,YAHOO.widget.Dialog,{initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(A.ICON.key,{handler:this.configIcon,value:A.ICON.value,suppressEvent:A.ICON.suppressEvent});this.cfg.addProperty(A.TEXT.key,{handler:this.configText,value:A.TEXT.value,suppressEvent:A.TEXT.suppressEvent,supercedes:A.TEXT.supercedes});},init:function(E,D){B.superclass.init.call(this,E);this.beforeInitEvent.fire(B);C.addClass(this.element,B.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(D){this.cfg.applyConfig(D,true);}this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(B);},registerForm:function(){B.superclass.registerForm.call(this);this.form.innerHTML+="<input type=\"hidden\" name=\""+this.id+"\" value=\"\"/>";},configIcon:function(F,E,J){var K=E[0],D=this.body,I=B.ICON_CSS_CLASSNAME,H,G;if(K&&K!="none"){H=C.getElementsByClassName(I,"*",D);if(H){G=H.parentNode;if(G){G.removeChild(H);H=null;}}if(K.indexOf(".")==-1){H=document.createElement("span");H.className=(I+" "+K);H.innerHTML="&#160;";}else{H=document.createElement("img");H.src=(this.imageRoot+K);H.className=I;}if(H){D.insertBefore(H,D.firstChild);}}},configText:function(E,D,F){var G=D[0];if(G){this.setBody(G);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(F,I,H,E,G){if(!G){G=YAHOO.util.Anim;}this.overlay=F;this.attrIn=I;this.attrOut=H;this.targetElement=E||F.element;this.animClass=G;};var B=YAHOO.util.Dom,D=YAHOO.util.CustomEvent,C=YAHOO.util.Easing,A=YAHOO.widget.ContainerEffect;A.FADE=function(E,F){var G=new A(E,{attributes:{opacity:{from:0,to:1}},duration:F,method:C.easeIn},{attributes:{opacity:{to:0}},duration:F,method:C.easeOut},E.element);G.handleStartAnimateIn=function(I,H,J){B.addClass(J.overlay.element,"hide-select");if(!J.overlay.underlay){J.overlay.cfg.refireEvent("underlay");}if(J.overlay.underlay){J.initialUnderlayOpacity=B.getStyle(J.overlay.underlay,"opacity");J.overlay.underlay.style.filter=null;}B.setStyle(J.overlay.element,"visibility","visible");B.setStyle(J.overlay.element,"opacity",0);};G.handleCompleteAnimateIn=function(I,H,J){B.removeClass(J.overlay.element,"hide-select");if(J.overlay.element.style.filter){J.overlay.element.style.filter=null;}if(J.overlay.underlay){B.setStyle(J.overlay.underlay,"opacity",J.initialUnderlayOpacity);}J.overlay.cfg.refireEvent("iframe");J.animateInCompleteEvent.fire();};G.handleStartAnimateOut=function(I,H,J){B.addClass(J.overlay.element,"hide-select");if(J.overlay.underlay){J.overlay.underlay.style.filter=null;}};G.handleCompleteAnimateOut=function(I,H,J){B.removeClass(J.overlay.element,"hide-select");if(J.overlay.element.style.filter){J.overlay.element.style.filter=null;}B.setStyle(J.overlay.element,"visibility","hidden");B.setStyle(J.overlay.element,"opacity",1);J.overlay.cfg.refireEvent("iframe");J.animateOutCompleteEvent.fire();};G.init();return G;};A.SLIDE=function(G,I){var F=G.cfg.getProperty("x")||B.getX(G.element),K=G.cfg.getProperty("y")||B.getY(G.element),J=B.getClientWidth(),H=G.element.offsetWidth,E=new A(G,{attributes:{points:{to:[F,K]}},duration:I,method:C.easeIn},{attributes:{points:{to:[(J+25),K]}},duration:I,method:C.easeOut},G.element,YAHOO.util.Motion);E.handleStartAnimateIn=function(M,L,N){N.overlay.element.style.left=((-25)-H)+"px";N.overlay.element.style.top=K+"px";};E.handleTweenAnimateIn=function(O,N,P){var Q=B.getXY(P.overlay.element),M=Q[0],L=Q[1];if(B.getStyle(P.overlay.element,"visibility")=="hidden"&&M<F){B.setStyle(P.overlay.element,"visibility","visible");}P.overlay.cfg.setProperty("xy",[M,L],true);P.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateIn=function(M,L,N){N.overlay.cfg.setProperty("xy",[F,K],true);N.startX=F;N.startY=K;N.overlay.cfg.refireEvent("iframe");N.animateInCompleteEvent.fire();};E.handleStartAnimateOut=function(N,M,Q){var O=B.getViewportWidth(),R=B.getXY(Q.overlay.element),P=R[1],L=Q.animOut.attributes.points.to;Q.animOut.attributes.points.to=[(O+25),P];};E.handleTweenAnimateOut=function(N,M,O){var Q=B.getXY(O.overlay.element),L=Q[0],P=Q[1];O.overlay.cfg.setProperty("xy",[L,P],true);O.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateOut=function(M,L,N){B.setStyle(N.overlay.element,"visibility","hidden");N.overlay.cfg.setProperty("xy",[F,K]);N.animateOutCompleteEvent.fire();};E.init();return E;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=D.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=D.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=D.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=D.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);
},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(F,E,G){},handleTweenAnimateIn:function(F,E,G){},handleCompleteAnimateIn:function(F,E,G){},handleStartAnimateOut:function(F,E,G){},handleTweenAnimateOut:function(F,E,G){},handleCompleteAnimateOut:function(F,E,G){},toString:function(){var E="ContainerEffect";if(this.overlay){E+=" ["+this.overlay.toString()+"]";}return E;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.3.1",build:"541"});
/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(F,B){var E;var A=this.owner;var C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false;}}if(this.method){this.method.call(A,F);}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var A in B){if(A&&YAHOO.lang.hasOwnProperty(B,A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};var B=this._configs[C];if(!B){return undefined;}return B.value;},set:function(D,E,B){this._configs=this._configs||{};var C=this._configs[D];if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;var D=[];var B;for(var C in this._configs){B=this._configs[C];if(A.hasOwnProperty(this._configs,C)&&!A.isUndefined(B)){D[D.length]=C;}}return D;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(this._configs[E[D]]&&!A.isUndefined(this._configs[E[D]].value)&&!A.isNull(this._configs[E[D]].value)){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};var B=this._configs[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};if(!this._configs[B]){C.name=B;this._configs[B]=this.createAttribute(C);}else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var D=YAHOO.util.Dom,F=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(G,H){if(arguments.length){this.init(G,H);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(G){G=G.get?G.get("element"):G;this.get("element").appendChild(G);},getElementsByTagName:function(G){return this.get("element").getElementsByTagName(G);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(G,H){G=G.get?G.get("element"):G;H=(H&&H.get)?H.get("element"):H;this.get("element").insertBefore(G,H);},removeChild:function(G){G=G.get?G.get("element"):G;this.get("element").removeChild(G);return true;},replaceChild:function(G,H){G=G.get?G.get("element"):G;H=H.get?H.get("element"):H;return this.get("element").replaceChild(G,H);},initAttributes:function(G){},addListener:function(K,J,L,I){var H=this.get("element");I=I||this;H=this.get("id")||H;var G=this;if(!this._events[K]){if(this.DOM_EVENTS[K]){YAHOO.util.Event.addListener(H,K,function(M){if(M.srcElement&&!M.target){M.target=M.srcElement;}G.fireEvent(K,M);},L,I);}this.createEvent(K,this);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},subscribe:function(){this.addListener.apply(this,arguments);},removeListener:function(H,G){this.unsubscribe.apply(this,arguments);},addClass:function(G){D.addClass(this.get("element"),G);},getElementsByClassName:function(H,G){return D.getElementsByClassName(H,G,this.get("element"));},hasClass:function(G){return D.hasClass(this.get("element"),G);},removeClass:function(G){return D.removeClass(this.get("element"),G);},replaceClass:function(H,G){return D.replaceClass(this.get("element"),H,G);},setStyle:function(I,H){var G=this.get("element");if(!G){return this._queue[this._queue.length]=["setStyle",arguments];}return D.setStyle(G,I,H);},getStyle:function(G){return D.getStyle(this.get("element"),G);},fireQueue:function(){var H=this._queue;for(var I=0,G=H.length;I<G;++I){this[H[I][0]].apply(this,H[I][1]);}},appendTo:function(H,I){H=(H.get)?H.get("element"):D.get(H);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:H});I=(I&&I.get)?I.get("element"):D.get(I);var G=this.get("element");if(!G){return false;}if(!H){return false;}if(G.parent!=H){if(I){H.insertBefore(G,I);}else{H.appendChild(G);}}this.fireEvent("appendTo",{type:"appendTo",target:H});},get:function(G){var I=this._configs||{};var H=I.element;if(H&&!I[G]&&!YAHOO.lang.isUndefined(H.value[G])){return H.value[G];}return F.prototype.get.call(this,G);},setAttributes:function(L,H){var K=this.get("element");
for(var J in L){if(!this._configs[J]&&!YAHOO.lang.isUndefined(K[J])){this.setAttributeConfig(J);}}for(var I=0,G=this._configOrder.length;I<G;++I){if(L[this._configOrder[I]]){this.set(this._configOrder[I],L[this._configOrder[I]],H);}}},set:function(H,J,G){var I=this.get("element");if(!I){this._queue[this._queue.length]=["set",arguments];if(this._configs[H]){this._configs[H].value=J;}return ;}if(!this._configs[H]&&!YAHOO.lang.isUndefined(I[H])){C.call(this,H);}return F.prototype.set.apply(this,arguments);},setAttributeConfig:function(G,I,J){var H=this.get("element");if(H&&!this._configs[G]&&!YAHOO.lang.isUndefined(H[G])){C.call(this,G,I);}else{F.prototype.setAttributeConfig.apply(this,arguments);}this._configOrder.push(G);},getAttributeKeys:function(){var H=this.get("element");var I=F.prototype.getAttributeKeys.call(this);for(var G in H){if(!this._configs[G]){I[G]=I[G]||H[G];}}return I;},createEvent:function(H,G){this._events[H]=true;F.prototype.createEvent.apply(this,arguments);},init:function(H,G){A.apply(this,arguments);}};var A=function(H,G){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];G=G||{};G.element=G.element||H||null;this.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"focus":true,"blur":true,"submit":true};var I=false;if(YAHOO.lang.isString(H)){C.call(this,"id",{value:G.element});}if(D.get(H)){I=true;E.call(this,G);B.call(this,G);}YAHOO.util.Event.onAvailable(G.element,function(){if(!I){E.call(this,G);}this.fireEvent("available",{type:"available",target:G.element});},this,true);YAHOO.util.Event.onContentReady(G.element,function(){if(!I){B.call(this,G);}this.fireEvent("contentReady",{type:"contentReady",target:G.element});},this,true);};var E=function(G){this.setAttributeConfig("element",{value:D.get(G.element),readOnly:true});};var B=function(G){this.initAttributes(G);this.setAttributes(G,true);this.fireQueue();};var C=function(G,I){var H=this.get("element");I=I||{};I.name=G;I.method=I.method||function(J){H[G]=J;};I.value=I.value||H[G];this._configs[G]=new YAHOO.util.Attribute(I,this);};YAHOO.augment(YAHOO.util.Element,F);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.3.1",build:"541"});
/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
(function(){YAHOO.widget.TabView=function(K,J){J=J||{};if(arguments.length==1&&!YAHOO.lang.isString(K)&&!K.nodeName){J=K;K=J.element||null;}if(!K&&!J.element){K=I.call(this,J);}YAHOO.widget.TabView.superclass.constructor.call(this,K,J);};YAHOO.extend(YAHOO.widget.TabView,YAHOO.util.Element);var F=YAHOO.widget.TabView.prototype;var E=YAHOO.util.Dom;var H=YAHOO.util.Event;var D=YAHOO.widget.Tab;F.CLASSNAME="yui-navset";F.TAB_PARENT_CLASSNAME="yui-nav";F.CONTENT_PARENT_CLASSNAME="yui-content";F._tabParent=null;F._contentParent=null;F.addTab=function(M,O){var P=this.get("tabs");if(!P){this._queue[this._queue.length]=["addTab",arguments];return false;}O=(O===undefined)?P.length:O;var R=this.getTab(O);var T=this;var L=this.get("element");var S=this._tabParent;var Q=this._contentParent;var J=M.get("element");var K=M.get("contentEl");if(R){S.insertBefore(J,R.get("element"));}else{S.appendChild(J);}if(K&&!E.isAncestor(Q,K)){Q.appendChild(K);}if(!M.get("active")){M.set("contentVisible",false,true);}else{this.set("activeTab",M,true);}var N=function(V){YAHOO.util.Event.preventDefault(V);var U=false;if(this==T.get("activeTab")){U=true;}T.set("activeTab",this,U);};M.addListener(M.get("activationEvent"),N);M.addListener("activationEventChange",function(U){if(U.prevValue!=U.newValue){M.removeListener(U.prevValue,N);M.addListener(U.newValue,N);}});P.splice(O,0,M);};F.DOMEventHandler=function(P){var K=this.get("element");var Q=YAHOO.util.Event.getTarget(P);var S=this._tabParent;if(E.isAncestor(S,Q)){var L;var M=null;var J;var R=this.get("tabs");for(var N=0,O=R.length;N<O;N++){L=R[N].get("element");J=R[N].get("contentEl");if(Q==L||E.isAncestor(L,Q)){M=R[N];break;}}if(M){M.fireEvent(P.type,P);}}};F.getTab=function(J){return this.get("tabs")[J];};F.getTabIndex=function(N){var K=null;var M=this.get("tabs");for(var L=0,J=M.length;L<J;++L){if(N==M[L]){K=L;break;}}return K;};F.removeTab=function(M){var L=this.get("tabs").length;var K=this.getTabIndex(M);var J=K+1;if(M==this.get("activeTab")){if(L>1){if(K+1==L){this.set("activeIndex",K-1);}else{this.set("activeIndex",K+1);}}}this._tabParent.removeChild(M.get("element"));this._contentParent.removeChild(M.get("contentEl"));this._configs.tabs.value.splice(K,1);};F.toString=function(){var J=this.get("id")||this.get("tagName");return"TabView "+J;};F.contentTransition=function(K,J){K.set("contentVisible",true);J.set("contentVisible",false);};F.initAttributes=function(J){YAHOO.widget.TabView.superclass.initAttributes.call(this,J);if(!J.orientation){J.orientation="top";}var L=this.get("element");if(!YAHOO.util.Dom.hasClass(L,this.CLASSNAME)){YAHOO.util.Dom.addClass(L,this.CLASSNAME);}this.setAttributeConfig("tabs",{value:[],readOnly:true});this._tabParent=this.getElementsByClassName(this.TAB_PARENT_CLASSNAME,"ul")[0]||G.call(this);this._contentParent=this.getElementsByClassName(this.CONTENT_PARENT_CLASSNAME,"div")[0]||C.call(this);this.setAttributeConfig("orientation",{value:J.orientation,method:function(M){var N=this.get("orientation");this.addClass("yui-navset-"+M);if(N!=M){this.removeClass("yui-navset-"+N);}switch(M){case"bottom":this.appendChild(this._tabParent);break;}}});this.setAttributeConfig("activeIndex",{value:J.activeIndex,method:function(M){this.set("activeTab",this.getTab(M));},validator:function(M){return !this.getTab(M).get("disabled");}});this.setAttributeConfig("activeTab",{value:J.activeTab,method:function(N){var M=this.get("activeTab");if(N){N.set("active",true);this._configs["activeIndex"].value=this.getTabIndex(N);}if(M&&M!=N){M.set("active",false);}if(M&&N!=M){this.contentTransition(N,M);}else{if(N){N.set("contentVisible",true);}}},validator:function(M){return !M.get("disabled");}});if(this._tabParent){B.call(this);}this.DOM_EVENTS.submit=false;this.DOM_EVENTS.focus=false;this.DOM_EVENTS.blur=false;for(var K in this.DOM_EVENTS){if(YAHOO.lang.hasOwnProperty(this.DOM_EVENTS,K)){this.addListener.call(this,K,this.DOMEventHandler);}}};var B=function(){var Q,L,P;var O=this.get("element");var N=A(this._tabParent);var K=A(this._contentParent);for(var M=0,J=N.length;M<J;++M){L={};if(K[M]){L.contentEl=K[M];}Q=new YAHOO.widget.Tab(N[M],L);this.addTab(Q);if(Q.hasClass(Q.ACTIVE_CLASSNAME)){this._configs.activeTab.value=Q;this._configs.activeIndex.value=this.getTabIndex(Q);}}};var I=function(J){var K=document.createElement("div");if(this.CLASSNAME){K.className=this.CLASSNAME;}return K;};var G=function(J){var K=document.createElement("ul");if(this.TAB_PARENT_CLASSNAME){K.className=this.TAB_PARENT_CLASSNAME;}this.get("element").appendChild(K);return K;};var C=function(J){var K=document.createElement("div");if(this.CONTENT_PARENT_CLASSNAME){K.className=this.CONTENT_PARENT_CLASSNAME;}this.get("element").appendChild(K);return K;};var A=function(M){var K=[];var N=M.childNodes;for(var L=0,J=N.length;L<J;++L){if(N[L].nodeType==1){K[K.length]=N[L];}}return K;};})();(function(){var E=YAHOO.util.Dom,J=YAHOO.util.Event;var B=function(L,K){K=K||{};if(arguments.length==1&&!YAHOO.lang.isString(L)&&!L.nodeName){K=L;L=K.element;}if(!L&&!K.element){L=H.call(this,K);}this.loadHandler={success:function(M){this.set("content",M.responseText);},failure:function(M){}};B.superclass.constructor.call(this,L,K);this.DOM_EVENTS={};};YAHOO.extend(B,YAHOO.util.Element);var F=B.prototype;F.LABEL_TAGNAME="em";F.ACTIVE_CLASSNAME="selected";F.DISABLED_CLASSNAME="disabled";F.LOADING_CLASSNAME="loading";F.dataConnection=null;F.loadHandler=null;F._loading=false;F.toString=function(){var K=this.get("element");var L=K.id||K.tagName;return"Tab "+L;};F.initAttributes=function(K){K=K||{};B.superclass.initAttributes.call(this,K);var M=this.get("element");this.setAttributeConfig("activationEvent",{value:K.activationEvent||"click"});this.setAttributeConfig("labelEl",{value:K.labelEl||G.call(this),method:function(N){var O=this.get("labelEl");if(O){if(O==N){return false;}this.replaceChild(N,O);}else{if(M.firstChild){this.insertBefore(N,M.firstChild);}else{this.appendChild(N);}}}});this.setAttributeConfig("label",{value:K.label||D.call(this),method:function(O){var N=this.get("labelEl");
if(!N){this.set("labelEl",I.call(this));}C.call(this,O);}});this.setAttributeConfig("contentEl",{value:K.contentEl||document.createElement("div"),method:function(N){var O=this.get("contentEl");if(O){if(O==N){return false;}this.replaceChild(N,O);}}});this.setAttributeConfig("content",{value:K.content,method:function(N){this.get("contentEl").innerHTML=N;}});var L=false;this.setAttributeConfig("dataSrc",{value:K.dataSrc});this.setAttributeConfig("cacheData",{value:K.cacheData||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("loadMethod",{value:K.loadMethod||"GET",validator:YAHOO.lang.isString});this.setAttributeConfig("dataLoaded",{value:false,validator:YAHOO.lang.isBoolean,writeOnce:true});this.setAttributeConfig("dataTimeout",{value:K.dataTimeout||null,validator:YAHOO.lang.isNumber});this.setAttributeConfig("active",{value:K.active||this.hasClass(this.ACTIVE_CLASSNAME),method:function(N){if(N===true){this.addClass(this.ACTIVE_CLASSNAME);this.set("title","active");}else{this.removeClass(this.ACTIVE_CLASSNAME);this.set("title","");}},validator:function(N){return YAHOO.lang.isBoolean(N)&&!this.get("disabled");}});this.setAttributeConfig("disabled",{value:K.disabled||this.hasClass(this.DISABLED_CLASSNAME),method:function(N){if(N===true){E.addClass(this.get("element"),this.DISABLED_CLASSNAME);}else{E.removeClass(this.get("element"),this.DISABLED_CLASSNAME);}},validator:YAHOO.lang.isBoolean});this.setAttributeConfig("href",{value:K.href||this.getElementsByTagName("a")[0].getAttribute("href",2)||"#",method:function(N){this.getElementsByTagName("a")[0].href=N;},validator:YAHOO.lang.isString});this.setAttributeConfig("contentVisible",{value:K.contentVisible,method:function(N){if(N){this.get("contentEl").style.display="block";if(this.get("dataSrc")){if(!this._loading&&!(this.get("dataLoaded")&&this.get("cacheData"))){A.call(this);}}}else{this.get("contentEl").style.display="none";}},validator:YAHOO.lang.isBoolean});};var H=function(K){var O=document.createElement("li");var L=document.createElement("a");L.href=K.href||"#";O.appendChild(L);var N=K.label||null;var M=K.labelEl||null;if(M){if(!N){N=D.call(this,M);}}else{M=I.call(this);}L.appendChild(M);return O;};var G=function(){return this.getElementsByTagName(this.LABEL_TAGNAME)[0];};var I=function(){var K=document.createElement(this.LABEL_TAGNAME);return K;};var C=function(K){var L=this.get("labelEl");L.innerHTML=K;};var D=function(){var K,L=this.get("labelEl");if(!L){return undefined;}return L.innerHTML;};var A=function(){if(!YAHOO.util.Connect){return false;}E.addClass(this.get("contentEl").parentNode,this.LOADING_CLASSNAME);this._loading=true;this.dataConnection=YAHOO.util.Connect.asyncRequest(this.get("loadMethod"),this.get("dataSrc"),{success:function(K){this.loadHandler.success.call(this,K);this.set("dataLoaded",true);this.dataConnection=null;E.removeClass(this.get("contentEl").parentNode,this.LOADING_CLASSNAME);this._loading=false;},failure:function(K){this.loadHandler.failure.call(this,K);this.dataConnection=null;E.removeClass(this.get("contentEl").parentNode,this.LOADING_CLASSNAME);this._loading=false;},scope:this,timeout:this.get("dataTimeout")});};YAHOO.widget.Tab=B;})();YAHOO.register("tabview",YAHOO.widget.TabView,{version:"2.3.1",build:"541"});
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
var debug=function(message,debug_level){var prefix='[CPAINT Debug] ';if(config['debugging']<1){prefix='[CPAINT Error] ';if (message.search("error") > 1){client_callback("", message);}}
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
var browser;if(document.all)browser="IE";else browser="MOZ";function replace(oldString, findString, replaceString){stringParts=oldString.split(findString);newString="";for(s=0;s<stringParts.length;s++){newString+=stringParts[s];if(s < stringParts.length-1)newString+=replaceString;}return newString;}function objectEvent(target, eventType, currbrowser){var ieEvent, mozEvent;if(!currbrowser)currbrowser=browser;if(typeof(target)!="object")target=document.getElementById(target);try{if(eventType.indexOf("on")!=-1){ieEvent=eventType;mozEvent=replace(eventType, "on", "");}else{ieEvent="on"+eventType;mozEvent=eventType;}if(currbrowser=="IE"){target.fireEvent(ieEvent);return true;}else{oEvent=document.createEvent("MouseEvents");oEvent.initMouseEvent(mozEvent, true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);target.dispatchEvent(oEvent);}return true;}catch(ex){return false;}}function getAllDescendants(node, tagName){if(tagName !=null && tagName !="" && tagName !=undefined)tagName=tagName.toUpperCase();else tagName="ALL";if(typeof(node)!="object")node=document.getElementById(node);var objArray=new Array();for(var c=0;c<node.childNodes.length;c++){if(node.childNodes[c].tagName==tagName || tagName=="ALL" && node.childNodes[c].tagName !=undefined){objArray[objArray.length]=node.childNodes[c];}if(node.childNodes[c].childNodes.length > 0){var subChildren=getAllDescendants(node.childNodes[c], tagName);for(var s=0;s<subChildren.length;s++)objArray[objArray.length]=subChildren[s];}}return objArray;}function doNothing(){return false;}function getHost(url){url=url+"";url=url.split("/");return url[2];}function getQueryString(path){var queryString=new Object();if(path==null || path=="" || path==undefined)path=document.location+"";var pathParts=path.split("?");if(pathParts.length > 1){pathParts=pathParts[1].split("&");for(var p=0;p<pathParts.length;p++){var paramParts=pathParts[p].split("=");if(paramParts.length > 1){paramParts[1]=replace(paramParts[1], "%20", " ");eval("queryString."+paramParts[0]+"=\""+paramParts[1]+"\"");}}}return queryString;}function serializeObject(currObject){var XMLString="";for(var i in currObject){var nodeType=typeof(currObject[i]);if(typeof(currObject[i])!="object")XMLString+="<"+nodeType+" name=\""+i+"\" value=\""+currObject[i]+"\"/>";else{if(typeof(currObject[i].length)!="undefined")var nodeType="array";else var nodeType="object";XMLString+="<"+nodeType+" name=\""+i+"\">";XMLString+=serializeObject(currObject[i]);XMLString+="</"+nodeType+">";}}return XMLString;}function getFormData(startNode){if(startNode==null || startNode==undefined || startNode=="")startNode=document.body;if(typeof(startNode)!="object")startNode=document.getElementById(startNode);try{var childArray=new Array();childArray=getAllDescendants(startNode);var dataObj=new Object();for(var c=0;c<childArray.length;c++){if(childArray[c].id !=null && childArray[c].id !=""){var tagType;tagType=childArray[c].tagName.toUpperCase();switch(tagType){case "INPUT":{var inputObj=new Object();inputObj.type=childArray[c].type;inputObj.id=childArray[c].id;if(childArray[c].type.toLowerCase()=="checkbox")inputObj.value=childArray[c].checked;else inputObj.value=HTMLEncode(childArray[c].value);if(childArray[c].attributes.getNamedItem("datatype")!=null && childArray[c].attributes.getNamedItem("datatype")!="" && childArray[c].attributes.getNamedItem("datatype")!=undefined)inputObj.datatype=childArray[c].attributes.getNamedItem("datatype").value;eval("dataObj."+childArray[c].id+"=new Object();");eval("dataObj."+childArray[c].id+"=inputObj;");break;}case "SELECT":{var inputObj=new Object();inputObj.type="select";inputObj.id=HTMLEncode(childArray[c].id);inputObj.value=childArray[c].value;eval("dataObj."+childArray[c].id+"=new Object();");eval("dataObj."+childArray[c].id+"=inputObj;");break;}case "TEXTAREA":{var inputObj=new Object();inputObj.type="textarea";inputObj.id=childArray[c].id;inputObj.value=replace(HTMLEncode(childArray[c].value), "\r\n", "&linebreak;");eval("dataObj."+childArray[c].id+"=new Object();");eval("dataObj."+childArray[c].id+"=inputObj;");break;}case "TABLE":{if(childArray[c].className=="GridMain"){var gridName=replace(childArray[c].id, "tbl", "");var data=eval(gridName+".getGridData()");eval("dataObj."+gridName+"=new Object();");eval("dataObj."+gridName+"=data;");}break;}}}}return dataObj;}catch(e){alert(e.message);}}function HTMLEncode(htmldata){htmldata=replace(htmldata, "<", "&lt;");htmldata=replace(htmldata, ">", "&gt;");htmldata=replace(htmldata, "#", "&#163;");htmldata=replace(htmldata, "&", "&amp;");return htmldata;}function xmlDecode(xmldata){xmldata=replace(xmldata, "&amp;", "&");xmldata=replace(xmldata, "&lt;", "<");xmldata=replace(xmldata, "&gt;", ">");xmldata=replace(xmldata, "&#163;", "#");xmldata=replace(xmldata, "&#x0024;", "$");return xmldata;}
window.onclick=jsUIGblRecordClick;if(window.captureEvents)window.captureEvents(Event.CLICK);document.onkeydown=jsUIGblHandleKeys;if(window.captureEvents)window.captureEvents(Event.KEYPRESS);function jsUIGblAddSkin(component, skinName, rootDir){if(skinName==null || skinName=="")skinName="default";var newStyle=document.createElement("link");newStyle.rel="stylesheet";newStyle.type="text/css";if(component==null || component=="")newStyle.href=rootDir+"/"+skinName+".css";else newStyle.href=rootDir+"/"+component+"/"+skinName+".css";document.body.appendChild(newStyle);return true;}function jsUIGblHandleKeys(e){var keyCode;if(browser=="IE"){obj=window.event.srcElement;e=window.event;keyCode=e.keyCode;}if(browser=="MOZ"){obj=e.target;if(e.target.tagName.toUpperCase()=="HTML")obj=jsUIGblLastClickedElement;keyCode=e.which;}var gridAt="";try{if(obj.tagName.toUpperCase()=="DIV"){if(obj.parentNode.tagName=="TD"){if(obj.parentNode.className=="GridCell" || obj.parentNode.className=="GridCellOver")gridAt=obj.parentNode;}}if(obj.tagName.toUpperCase()=="TD"){if(obj.className=="GridCell" || obj.className=="GridTitleCell")gridAt=obj.parentNode;}}catch(e){}if(gridAt !=""){var currGrid=GridPvtFindRootObject(gridAt);if(keyCode==46){currGrid.removeRow(currGrid.currentRow, e);}else if(keyCode==38)currGrid.moveRow(currGrid.currentRow, "up");else if(keyCode==40)currGrid.moveRow(currGrid.currentRow, "down");else currGrid.editRow(currGrid.currentRow, e);}else{if(keyCode==13){if(obj.tagName.toUpperCase()!="TEXTAREA" && browser=="IE")e.keyCode=9;}if(keyCode==8){if(obj.tagName.toUpperCase()!="TEXTAREA" && obj.tagName.toUpperCase()!="INPUT"){if(browser=="IE")e.returnValue=false;if(browser=="MOZ"){e.stopPropagation();e.preventDefault();}}}}if(keyCode==116){if(browser=="IE"){e.keyCode=0;e.returnValue=false;}if(browser=="MOZ"){e.stopPropagation();e.preventDefault();}try{var updateObj=new Object();updateObj.sender="AppCentral";updateObj.itemID="resetPage";appcentral.update(updateObj);}catch(e){}return false;}if(e.altKey){if(keyCode>=65 && keyCode<=90){var s=String.fromCharCode(keyCode);eval('(window.k'+s+')?eval(\'k\'+s+\'.click();\'):eval();');}}}var jsUIGblLastClickedElement;function jsUIGblRecordClick(e){if(browser=="IE"){obj=window.event.srcElement;e=window.event;}if(browser=="MOZ"){obj=e.target;}jsUIGblLastClickedElement=obj.target;}
function treeviewNew(treeviewName, skinName, treeviewParent, rootDir)
{
	if (treeviewName == null || treeviewName == "")
		return false;
	if (rootDir == null)
		rootDir = g_locaplic+"/classesjs/jsobjects";
	jsUIGblAddSkin("jsUI-Treeview", skinName, rootDir);
	if (treeviewParent == null || treeviewParent == "" || treeviewParent == undefined)
		treeviewParent = document.body;
	if (typeof(treeviewParent) != "object")
		treeviewParent = document.getElementById(treeviewParent);
	var tvDiv = document.createElement("div");
	//tvDiv.style.height = "100%";
	tvDiv.style.width = "100%";
	tvDiv.style.overflow = "auto"; //era auto
	tvDiv.className = "TreeviewMain";
	tvDiv.id = treeviewName;
	treeviewParent.appendChild(tvDiv);
	var tbObject = TreeviewPvtConstructTaskbar(treeviewName, tvDiv, treeviewParent, rootDir);
	return tbObject;
}

// Private constructor method
// Used to attach taskbar elements and methods to a given instance of the treeview
function TreeviewPvtConstructTaskbar(treeviewName, treeviewDiv, treeviewParent, rootDir)
{
	var tbObject;
	treeviewName = document.getElementById(treeviewName);
	eval("treeviewName.element = treeviewDiv");	//element
	/*eval(treeviewName + ".createItem = TreeviewPubCreateItem");	//method
	eval(treeviewName + ".itemClick = doNothing");	//event
	eval(treeviewName + ".itemExpand = doNothing");	//event
	eval(treeviewName + ".TreeviewParent = treeviewParent");	//private property
	eval(treeviewName + ".rootDir = rootDir");	//private property
	eval("tbObject = " + treeviewName);	//assignment*/
	eval("treeviewName.createItem = TreeviewPubCreateItem");	//method
	eval("treeviewName.itemClick = doNothing");	//event
	eval("treeviewName.itemExpand = doNothing");	//event
	eval("treeviewName.TreeviewParent = treeviewParent");	//private property
	eval("treeviewName.rootDir = rootDir");	//private property
	eval("tbObject = treeviewName");	//assignment
	return tbObject;
}

function TreeviewPubCreateItem(itemID, itemName, itemImg, hasChildren, preload, show, parentID)	//public name: createItem
{
	var naveg;
	if (document.all)
		naveg = "IE";
	else
		naveg = "MOZ";
	var tbItem = document.createElement("ul");
	//tbItem.style.backgroundColor="gray";
	tbItem.id = itemID;
	if (parentID == null)
		tbItem.style.marginBottom = "0px";
	tbItem.className = "TreeviewItem";
	if (naveg == "MOZ")
		tbItem.style.overflow = "auto";
	else
		tbItem.style.overflow = "hidden";
	tbItem.hasChildren = hasChildren;
	tbItem.preload = preload;
	//tbItem.onmouseover = TreeviewPvtItemOver;
	//tbItem.onmouseout = TreeviewPvtItemOut;
	if (!show)
		tbItem.style.display = "none";
	var tbImg = document.createElement("img");
	if (hasChildren == false)
		tbImg.src = this.rootDir + "/jsUI-Treeview/dot.gif";
	else if (hasChildren == true)
		tbImg.src = this.rootDir + "/jsUI-Treeview/plus.gif";
	else
		tbImg.src = this.rootDir + "/jsUI-Treeview/unknown.gif";
	tbImg.onclick = TreeviewPvtExpandClick;
	//incluido pelo edmar
	if (hasChildren != false)
	{tbItem.appendChild(tbImg);}

	if (typeof(itemImg)=="object")
	{var tbIcon = itemImg;}
	else
	{var tbIcon = document.createElement("img");tbIcon.src = itemImg;}
	if (itemImg != null)
	{
		tbIcon.onclick = TreeviewPvtItemClick;
		tbIcon.ondblclick = TreeviewPvtExpandClick;
		tbIcon.style.marginRight = "4px";
		//tbIcon.align = "absmiddle";
		tbItem.appendChild(tbIcon);
	}
	var tbText = document.createElement("span");
	//tbText.style.backgroundColor="gray"
	tbText.className = "TreeviewItemTextOut";
	//tbText.ondblclick = TreeviewPvtExpandClick;
	tbText.ondblclick = TreeviewPvtExpandClick;
	tbText.innerHTML += itemName;
	tbItem.appendChild(tbText);
	if (parentID == null || parentID == "")
		this.element.appendChild(tbItem);
	else
	{
		var parentObj = document.getElementById(parentID);
		if (parentObj.hasChildren != false)
		{
			parentObj.appendChild(tbItem);
			if (show)
			{
				parentObj.childNodes[0].src = this.rootDir + "/jsUI-Treeview/minus.gif";
				//see if there are hidden children and show them too
				var allArray = parentObj.childNodes;
				if (allArray.length > 0)
				{
					for (var a=0;a<allArray.length;a++)
					{
						if (allArray[a].tagName == "UL")
							allArray[a].style.display = "block";
					}
				}
			}
			if (!show)
				parentObj.childNodes[0].src = this.rootDir + "/jsUI-Treeview/plus.gif";
		}
	}
}

var oldClass = "";
function TreeviewPvtItemOver(e)
{
	if (this.childNodes[2].className != "TreeviewItemTextOver")
		oldClass = this.childNodes[2].className;
	if (this.childNodes[2].className != "TreeviewItemTextClicked")
		this.childNodes[2].className = "TreeviewItemTextOver";
	if (!e)
		var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
}

function TreeviewPvtItemOut(e)
{
	this.childNodes[2].className = oldClass;
	if (!e) 
		var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
}

function TreeviewPvtItemClick(e)
{
	if (!e)
		var e = window.event;

	var currTree = TreeviewPvtFindRootObject(this);
	node = currTree.element;

	var allArray = getAllDescendants(node, "UL");

	for (var a=0;a<allArray.length;a++)
	{
		if (allArray[a].childNodes[2])
		allArray[a].childNodes[2].className="TreeviewItemTextOut";
	}
	this.parentNode.childNodes[2].className = "TreeviewItemTextClicked";
	oldClass = "TreeviewItemTextClicked";

	currTree.itemClick(this.parentNode.id);
	
	e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
	e.returnValue = true;
	
}

function TreeviewPvtExpandClick(e)
{
	if (!e)
		var e = window.event;
	
	var currTree = TreeviewPvtFindRootObject(this);
	var node = this.parentNode.childNodes[0];
	var currSrc = node.src;
	currSrc = currSrc.split("jsUI-Treeview/");
	if (currSrc[1] == "plus.gif")
	{
		var allArray = this.parentNode.childNodes;
		var hiddenChildren = false;
		if (allArray.length > 0)
		{
			for (var a=0;a<allArray.length;a++)
			{
				if (allArray[a].tagName == "UL")
				{
					allArray[a].style.display = "block";
					hiddenChildren = true;
				}
			}
			node.src = g_locaplic+"/classesjs/jsobjects" + "/jsUI-Treeview/minus.gif";
		}
		if (!hiddenChildren)
			node.src = g_locaplic+"/classesjs/jsobjects" + "/jsUI-Treeview/minus.gif";
		currTree.itemExpand(this.parentNode.id);
	}
	else if (currSrc[1] == "minus.gif")
	{
		node.src = g_locaplic+"/classesjs/jsobjects" + "/jsUI-Treeview/plus.gif";
		var allArray = getAllDescendants(node.parentNode, "UL");
		for (var a=0;a<allArray.length;a++)
		{
			if (allArray[a].preload)
			{
				if (allArray[a].parentNode == node.parentNode)
					allArray[a].style.display = "none";
			}
			else
			{
				if (allArray[a].parentNode == node.parentNode)
					allArray[a].parentNode.removeChild(allArray[a]);
			}
		}
	}
	else if (currSrc[1] == "unknown.gif")
		currTree.itemExpand(this.parentNode.id);
	else if (currSrc[1] == "dot.gif")
		objectEvent(node.parentNode.childNodes[1], "onclick", browser);
		
	e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
	e.returnValue = false;
}

function TreeviewPvtFindRootObject(currTree)
{
	while(currTree.tagName != "DIV")
		currTree = currTree.parentNode;
	var obj = eval ("document.getElementById('" + currTree.id + "')")
	currTree = obj;	
	return currTree;
}
/*
Title: Fun��es gerais

Fun��es de uso geral para processamento de dados

File: funcoes.js

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
Function: $im

Retorna o caminho correto de uma imagem.

Exemplo: $im("imagem.png")

Par�metros:

g - nome da imagem

Retorno:

string - caminho para a imagem
*/
$im = function(g)
{return g_locaplic+"/imagens/visual/"+g_visual+"/"+g;};
/*
Function: $top

Muda a posi��o (superior) de um objeto tanto no IE como no Firefox.

Exemplo: $top("imagem",100)

Par�metros:

id - identificador do objeto

valor - posi��o em rela��o ao topo.
*/
$top = function(id,valor)
{
	if (navm)
	{document.getElementById(id).style.pixelTop=valor;}
	if(navn)
	{document.getElementById(id).style.top=valor+"px";}
};
/*
Function: $left

Muda a posi��o (esquerda) de um objeto tanto no IE como no Firefox.

Exemplo: $left("imagem",100)

Par�metros:

id - identificador do objeto

valor - posi��o em rela��o a esquerda.
*/
$left = function(id,valor)
{
	if (navm)
	{document.getElementById(id).style.pixelLeft=valor;}
	if(navn)
	{document.getElementById(id).style.left=valor+"px";}
};
/*
Function: htmlAcentos

Troca os acentos de uma frase por entidades html.

Par�metros:

palavra - palavra que ser� processada
*/
function htmlAcentos(palavra)
{
	return(palavra);
}
/*
Function: trataErro

Trata o erro de um try cacth.
*/
function trataErro()
{
	objaguarde.fecha("ajaxdestaca");
	objaguarde.fecha("ajaxabrelente");
	objaguarde.fecha("ajaxiniciaParametros");
	objaguarde.fecha("ajaxredesenha");
	objaguarde.fecha("ajaxCorpoMapaEntorno");
	objaguarde.fecha("ajaxCorpoMapa");
	objaguarde.fecha("ajaxLegenda");
	objaguarde.fecha("ajaxReferencia");
	objaguarde.fecha("ajaxEscalaGrafica");
	objaguarde.fecha("montaMapa");
	objaguarde.fecha("aguardedoc");
}
/*
Function: iCookie

Insere um cookie.
*/
function iCookie(nome,valor)
{
	document.cookie = nome+"="+valor;
}
/*
Function: pCookie

Pega um cookie.
*/
function pCookie(nome)
{
	var cookies = document.cookie;
	var i = cookies.indexOf(nome);
	if(i == -1)
	{return null;}
	var fim = cookies.indexOf(";",i);
	if (fim == -1)
	{var fim = cookies.length;}
	return (unescape(cookies.substring(i,fim))).split("=")[1];
}
/*
Section: interface
*/
/*
Function: mudaVisual

Muda o visual do mapa atual

Parameters:

visual - nome do novo visual. Obtido na inicializa��o do I3Geo e armazenado na vari�vel objmapa.listavisual
*/
function mudaVisual(visual)
{
	var monta = function(retorno)
	{
		objaguarde.fecha("ajaxredesenha");
		var imgstemp = retorno.data.arquivos;
		var imgs = new Array();
		for (i=0;i < imgstemp.length; i++)
		{
			var temp = imgstemp[i].split(".");
			if ((temp[1] == "png") || (temp[1] == "gif") || (temp[1] == "jpg"))
			{
				imgs.push(imgstemp[i]);
			}
		}
		var elementos = document.getElementsByTagName("img");
		var caminho = g_locaplic+"/imagens/visual/"+visual+"/";
		//faz a troca em imagens
		for (j=0;j<imgs.length; j++)
		{
			for (i=0;i < elementos.length; i++)
			{
				if (elementos[i].src.search(imgs[j]) > -1)
				{elementos[i].src = caminho+imgs[j];}
			}
		}
		//faz a troca em ids
		for (j=0;j < imgs.length; j++)
		{
			var busca = imgs[j].split(".");
			if ($i(busca[0]))
			{$i(busca[0]).src = caminho+imgs[j];}
		}
		//faz a troca em bg
		var elementos = new Array("vertMaisZoom","vertMenosZoom","vertBGDiv");
		for (i=0;i < elementos.length; i++)
		{
			if ($i(elementos[i]))
			{
				for (j=0;j < imgs.length; j++)
				{
					var busca = imgs[j].split(".");
					if (busca[0] == elementos[i])
					{$i(elementos[i]).style.backgroundImage = "url('"+caminho+imgs[j]+"')";}
				}				
			}
		}
		g_visual = visual;
	};
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=listaArquivos&g_sid="+g_sid+"&diretorio=imagens/visual/"+visual;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"mudaQS",monta);
}
/*
Function: initJanelaMen

Abre a janela com as mensagens de ajuda ao usu�rio

*/
function initJanelaMen()
{
	if (!$i("janelaMen"))
	{
		var novoel = document.createElement("div");
		novoel.id = "janelaMen";
		novoel.style.display="block";
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" ><div id="janelaMenTexto" style="color:rgb(170,170,170)">'+g_mensagempadrao+'</div></div>';
		novoel.innerHTML = temp;
		novoel.style.border="1px solid rgb(170,170,170)";
		document.body.appendChild(novoel);
		$i("janelaMenTexto").style.textAlign="left";
		$i("janelaMenTexto").style.fontSize="10px";
		document.body.appendChild(novoel);
		YAHOO.namespace("janelaMen.xp");
		YAHOO.janelaMen.xp.panel = new YAHOO.widget.Panel("janelaMen", { width:"266px", height:"auto", fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaMen.xp.panel.render();
		var escondeMen = function()
		{
			YAHOO.util.Event.removeListener(YAHOO.janelaMen.xp.panel.close, "click");
			YAHOO.janelaMen.xp.panel.destroy();	
			iCookie("g_janelaMen","nao");	
		};
		YAHOO.util.Event.addListener(YAHOO.janelaMen.xp.panel.close, "click", escondeMen);
		iCookie("g_janelaMen","sim");
	}
	YAHOO.janelaMen.xp.panel.show();
	YAHOO.janelaMen.xp.panel.moveTo(imagemxi - 267 ,objmapa.h - 70);
}
/*
Function: docaguias

Coloca as guias de navega��o em uma janela interna do mapa e altera o tamanho do mapa para ajustar o novo tamanho.
*/
function docaguias()
{
	if (!$i("conteudojanelaguias"))
	{
		if (!$i("contemFerramentas")){return;}
		var novono = $i("contemFerramentas").innerHTML;
		$i("contemFerramentas").innerHTML = "";
		var wef = 0;
		if ($i("encolheFerramentas"))
		{wef = parseInt($i("encolheFerramentas").style.width);}
		var w = parseInt($i("contemFerramentas").style.width) - wef;
		$i("contemFerramentas").style.width="0px";
		if ($i("visual"))
		{$i("visual").style.width="0px";$i("visual").innerHTML="";}
		var pos = "px";
		var a = objmapa.h;
		var l = objmapa.w + w;
		objmapa.h = a;
		objmapa.w = l;
		if (navm){pos = "";}
		$i("img").style.width= l+pos;
		$i("img").style.height= a+pos;
		$i("corpoMapa").style.width= l+pos;
		$i("corpoMapa").style.height= a+pos;
		$i("corpoMapa").style.clip = 'rect('+0+" "+(l*1+2)+" "+(a*1+2)+" "+0+')';
		$i("mst").style.width = l + 1 + wef + pos;
		$i("contemImg").style.height= a+pos;
		$i("contemImg").style.width= l+pos;
		// entorno
		if (g_entorno == "sim")
		{
			var letras=["L","O"];
			for (l=0;l<letras.length; l++)
			{
				if ($i("img"+letras[l]))
				{
					$i("img"+letras[l]).style.width = objmapa.w+pos;
					$i("img"+letras[l]).style.height = objmapa.h+pos;
					$i("corpoMapa"+letras[l]).style.width=objmapa.w+pos;
					$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos+pos;
					$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
				}
			}
			var letras=["N","S"];
			for (l=0;l<letras.length; l++)
			{
				if ($i("img"+letras[l]))
				{
					$i("img"+letras[l]).style.width = objmapa.w * 2+pos;
					$i("img"+letras[l]).style.height = objmapa.h * 2+pos;
					$i("corpoMapa"+letras[l]).style.width=objmapa.w * 3+pos;
					$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos;
					$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
				}
			}
		}
		calcposf();
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudatamanho&altura="+a+"&largura="+l+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"mudaQS",ajaxredesenha);
		//carrega janela
		var novoel = document.createElement("div");
		novoel.id = "janelaguias";
		novoel.style.display="block";
		var temp = '<div class="hd">Guias</div>';
		temp += '<div class="bd" id="conteudojanelaguias"></div>';
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		$i("conteudojanelaguias").innerHTML = novono;
		YAHOO.namespace("janelaguias.xp");
		YAHOO.janelaguias.xp.panel = new YAHOO.widget.Panel("janelaguias", {width:"268px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaguias.xp.panel.render();
		if($i(objmapa.guiaMenu+"obj"))
		{
			$i(objmapa.guiaMenu+"obj").innerHTML = "";
		}
		ativaGuias();
	}
	else
	{
		YAHOO.janelaguias.xp.panel.render();
		YAHOO.janelaguias.xp.panel.show();
	}
}
/*
Function: ativaGuias

Ativa as guias principais do mapa, definindo as fun��es que ser�o executadas quando a guia � escolhida.

As guias principais s�o definidas nos objetos

objmapa.guiaTemas

objmapa.guiaMenu

objmapa.guiaLegenda

objmapa.guiaListaMapas

*/
function ativaGuias()
{
	//ajusta as guias da vers�o antiga do YUI
	//pega o elemento onde est�o os tabs
	for(g=0;g<12;g++)
	{
		if ($i("guia"+g))
		var gpai = $i("guia"+g).parentNode;
	}
	gpai.id = "guiasYUI";
	gpai.className = "yui-navset";
	var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 2px;border-color:rgb(240,240,240)">';
	for(g=0;g<12;g++)
	{
		if ($i("guia"+g))
		{ins += '<li><a href="#"><em><div id="guia"'+g+' >'+$i("guia"+g).innerHTML+'</div></em></a></li>';}
	}
	ins += "</ul>";
	gpai.innerHTML = ins;
	//guias
	if ($i(objmapa.guiaTemas))
	{
		$i(objmapa.guiaTemas).onclick = function()
		{g_guiaativa = objmapa.guiaTemas;mostraguiaf(1);};
	}
	if ($i(objmapa.guiaMenu))
	{
		$i(objmapa.guiaMenu).onclick = function()
		{
			g_guiaativa = objmapa.guiaMenu;
			mostraguiaf(2);
			if (!$i("buscatema"))
			{
				var pegalistademenus = function(retorno)
				{
					if (retorno.data == "")
					{pegaListaDeGrupos("","sim");}
					else
					{
						for (j=0;j<retorno.data.length;j++)
						{
							if(j == retorno.data.length-1)
							{pegaListaDeGrupos(retorno.data[j].idmenu,"sim");}
							else
							{pegaListaDeGrupos(retorno.data[j].idmenu,"nao");}
						}
					}
				};
				//pega a lista de �rvores que devem ser montadas
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistademenus&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"pegalistademenus",pegalistademenus);
			}
		};
	}
	if ($i(objmapa.guiaLegenda))
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
				$i("banners").innerHTML == "Aguarde...";
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"pegaMapas",pegaMapas);
			}
			else
			{alert("id banners nao encontrado");}
		};
	}
}
/*
Function: mensagemf

Abre uma mensagem na tela em um DIV.

Parameters:

m - mensagem que ser� mostrada.
*/
function mensagemf(m)
{
	//insere o div para mensagens
	if (!$i("mensagem"))
	{
		var novoel = document.createElement("div");
		novoel.id = 'mensagem';
		novoel.innerHTML = '<table width="50" style="border: 1px solid #000000;"> <tr> <td onclick="mensagemf()" style="text-align:left;cursor:pointer" class="tdclara"> <img src='+$im("excluir.png")+' /> </td> <td style="text-align:left" class="tdclara"> <input style="text-align:left" class="textocb" type="text" id="mensagemt" size="50" value="" /> </td></tr> </table>';
		document.body.appendChild(novoel);
	}
	if (m == null)
	{$i("mensagem").style.visibility = "hidden";}
	else
	{
		$i("mensagemt").value = m;
		$i("mensagem").style.visibility = "visible";
	}
	eval ('document.getElementById("mensagem").style.' + g_tipoleft + ' = imagemxi + g_postpx');
	eval ('document.getElementById("mensagem").style.' + g_tipotop + ' = imagemyi + g_postpx');
}
/*
Function: wdocaf

Abre a janela doc�vel para executar algum programa.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

wsrc - endere�o do conte�do que ser� aberto

nx - posi��o da janela em x

ny - posi��o da janela em y

texto - texto que ser� mostrado no t�tulo da janela
*/
function wdocaf(wlargura,waltura,wsrc,nx,ny,texto)
{
	if($i("boxg"))
	{$i("boxg").style.display = "none";}
	var wlargura_ = parseInt(wlargura)+0+"px";
	YAHOO.namespace("janelaDoca.xp");
	if (!$i("wdoca"))
	{
		var novoel = document.createElement("div");
		novoel.id = "wdoca";
		novoel.style.display="block";
		var ins = '<div class="hd">'+texto+"</div>";
		ins += '<div class="bd">';
		ins += '<iframe name="wdocai" id="wdocai" valign="top" style="border:0px white solid"></iframe>';
		ins += "</div>";
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
	}
	if ($i("wdocai"))
	{
		with ($i("wdocai").style){width = "100%";height=waltura;};
		$i("wdoca").style.display = "block";
		$i("wdocai").src = wsrc;
	}
    YAHOO.janelaDoca.xp.panel = new YAHOO.widget.ResizePanel("wdoca", { width: wlargura_, fixedcenter: false, constraintoviewport: false, visible: true, iframe:false} );
    YAHOO.janelaDoca.xp.panel.moveTo(imagemxi,imagemyi+50);
    YAHOO.janelaDoca.xp.panel.render();
	var escondeWdoca = function()
	{
		$i("wdoca").style.display = "none";
		$i("wdocai").src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca.xp.panel.close, "click");
		YAHOO.janelaDoca.xp.panel.destroy();
		if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
		{mudaiconf("pan");}
		//esconde o box do google
		if ($i("boxg"))
		{$i("boxg").style.display = "none";}
	};
	YAHOO.util.Event.addListener(YAHOO.janelaDoca.xp.panel.close, "click", escondeWdoca);
}
/*
Function: redimwdocaf

Redimensiona a janela doc�vel.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

*/
function redimwdocaf(wlargura,waltura)
{
	if ($i("wdoca"))
	{
		$i("wdoca").style.width = wlargura;
		$i("wdoca").style.height = waltura;
	}
		
}
/*
Function: wdocaf2

Abre uma segunda janela doc�vel para executar algum programa relativo a outra janela.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

wsrc - endere�o do conte�do que ser� aberto

nx - posi��o da janela em x

ny - posi��o da janela em y

texto - texto que ser� mostrado no t�tulo da janela
*/
function wdocaf2(wlargura,waltura,wsrc,nx,ny,texto)
{
	if (!$i("wdoca2"))
	{
		var novoel = document.createElement("div");
		novoel.id = "wdoca2";
		novoel.style.display="none";
		var ins = '<div class="hd">&nbsp;</div><div class="bd">';
		ins += '<iframe name="wdocai2" id="wdocai2"  valign="top" ></iframe></div></div>';
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
	}
	YAHOO.namespace("janelaDoca2.xp");
	YAHOO.janelaDoca2.xp.panel = new YAHOO.widget.Panel("wdoca2", {width:wlargura, fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:true } );
	YAHOO.janelaDoca2.xp.panel.moveTo(imagemxi,imagemyi);
	YAHOO.janelaDoca2.xp.panel.render();
	YAHOO.janelaDoca2.xp.panel.show();
	with ($i("wdocai2").style){width = "100%";height = waltura;}
	$i("wdoca2").style.display = "block";
	$i("wdocai2").src = wsrc;
	var escondeWdoca2 = function()
	{
		$i("wdoca2").style.display = "none";
		$i("wdocai2").src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca2.xp.panel.close, "click");
		//YAHOO.janelaDoca2.xp.panel.destroy();
	};
	YAHOO.util.Event.addListener(YAHOO.janelaDoca2.xp.panel.close, "click", escondeWdoca2);
}
/*
Function: wdocafechaf

Fecha uma janela doc�vel.

Depreciado

Parameters:

odoca - objeto janela
*/
function wdocafechaf(odoca)
{
	$i(odoca).style.display="none";
	if ((odoca != "wdocaref") && (odoca != "wdocac"))
	{
		if($i("wdocain")){$i("wdocain").value = "";}
		if($i("wdocadiv")){$i("wdocadiv").innerHTML = "";$i("wdocadiv").display="none";}
		if ($i("temp")){$i("temp").value == "";}
		$i("wdocai").src = "";
		$i("imgh").style.visibility="visible";
	}
	if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
	{mudaiconf("pan");}
}
/*
Function: ajudaf

Depreciada - Mostra a ajuda sobre uma op��o do mapa quando � pressionada a tecla "a".

Parameters:

evt - evento onkeypress sobre o elemento BODY.
*/
function ajudaf(evt)
{
	if (navn)
	{
		var tecla = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
	}
	if (navm)
	{var tecla = evt.keyCode;}
	//a variavel g_hlpt guarda o endereco do help que deve ser aberto
	if (evt == "abre") // nesse caso a ajuda sera aberta (nao e um evento)
	{
		s = g_locaplic+"/ajuda/"+g_hlpt+".htm";
		wdocaf("400px","300px",s,"","","Ajuda");
		return;
	}
	if ($i("ajuda").innerHTML!="-")
	{
		if (tecla == 97)
		{
			s = g_locaplic+"/ajuda/"+g_hlpt+".htm";
			wdocaf("300px","300px",s,"","","Ajuda");
		}
	}
	if (tecla == 43)
	{destacaTamanho += 10;} //aumenta o tamanho do destaque
	if (tecla == 45)
	{destacaTamanho -= 10;} //diminui o tamanho do destaque
}
/*
Function: mostradicasf

Mostra dicas sobre uma fun��o quando o mouse passa sobre um bot�o ou outra op��o qualquer.

Parameters:

objeto - objeto sobre o qual o mouse est� sobreposto.

dica - dica que aparece no mapa.

hlpt - arquivo de help que dever� ser aberto se a tecla "a" for pressionada. O arquivo � passado para
a vari�vel global g_hlpt.
*/
function mostradicasf(objeto,dica,hlpt)
{
	if ($i("ajuda"))
	{
		if (dica == ""){$i("ajuda").innerHTML="-";}
		else
		{
			g_hlpt = hlpt;
			$i("ajuda").innerHTML= "<b>"+dica+" </b>";
		}
	}
	if ($i("janelaMenTexto"))
	{
		if (dica == ""){dica = g_mensagempadrao;}
		$i("janelaMenTexto").innerHTML= "<b>"+dica+" </b>";
	}
}
/*
Function: mudaiconf

Muda as bordas dos �cones de ferramentas, passando todos para normal.
Aplica uma borda sobre um �cone espec�fico

Parameters:

i - id do �cone que receber� a borda.
*/
function mudaiconf(i)
{
	//limpa o container com os tips fixos na tela
	for(ot=0;ot<objmapa.objtips.length;ot++)
	{
		if (objmapa.objtips[ot])
		{
			objmapa.objtips[ot].innerHTML = "";
			objmapa.objtips[ot].style.display="none";
		}
	}
	objmapa.objtips = new Array();
	limpacontainerf();
	var objetos=["inseregrafico","textofid","zoomli","zoomlo","zoomiauto","zoomoauto","pan","identifica","mede","inserexy","selecao"];
	for (ko=0;ko<objetos.length; ko++)
	{
		if ($i(objetos[ko]))
		with ($i(objetos[ko]).style){borderWidth=0;borderBottomWidth=1;borderLeftWidth=1;borderColor='rgb(50,50,50)';}
	}
	g_tipoacao = i;
	if($i(i))
	{
		with ($i(i).style){borderLeftWidth='0px';borderBottomWidth='0px';borderColor='black';}
	}
	$i("imgh").style.display="block";
	switch(i)
	{
		case "zoomli":
		$i("imgh").src= g_localimg + "/" + "ic_zoom.png";
		if($i("img")){$i("img").title = "";}
		break;
		case "pan":
		$i("imgh").src= g_localimg + "/" + "icon_pan.gif";
		if($i("img")){$i("img").title = "";}
		break;
		case "mede":
		$i("imgh").src= g_localimg + "/" + "mede.gif";
		break;
		case "inserexy":
		$i("imgh").src= g_localimg + "/" + "ic_xy.png";
		if($i("img")){$i("img").title = "clique para inserir um ponto";}
		break;
		case "textofid":
		$i("imgh").src= g_localimg + "/" + "ic_xy.png";
		if($i("img")){$i("img").title = "clique para inserir o texto";}
		break;
		case "selecao":
		$i("imgh").src= g_localimg + "/" + "ic_seleciona.png";
		if($i("img")){$i("img").title = "clique para selecionar";}
		break;
		case "inseregrafico":
		$i("imgh").src= g_localimg + "/" + "ic_seleciona.png";
		if($i("img")){$i("img").title = "clique para incluir o gr�fico";}
		break;
		case "identifica":
		$i("imgh").src= g_localimg + "/" + "ic_identifica.png";
		if($i("img")){$i("img").title = "";}
		break;
	}
}
/*
Function: ferramentasf

Ativa o DIV com as ferramentas dos blocos de �cones quando uma guia de ferramentas � clicada.

Parameters:

f - c�digo da ferramenta.
*/
function ferramentasf(f)
{
	if ($i("ferramentas"+f))
	{
		var fs=["1","2","3","4","5"];
		for (i=0;i<fs.length; i++)
		{
			if ($i("ferramentas"+fs[i]))
			{
				$i("ferramentas"+fs[i]).style.display="none";
				$i("ferr"+fs[i]).style.backgroundColor="rgb(230,230,230)";
			}
		}
		$i("ferramentas"+f).style.display="block";
		$i("ferr"+f).style.backgroundColor="rgb(255,255,255)";
	}
}
/*
Function: mostraguiaf

Ativa a visualiza��o de uma determinada guia.

Par�metros:

guia - n�mero da guia que ser� ativada.
*/
function mostraguiaf(guia)
{
	if ($i("guia"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10];
		for (j=0;j<fs.length; j++)
		{
			if ($i("guia"+fs[j]))
			{
				jj = fs[j];
				if ($i("guia"+jj+"obj"))
				{$i("guia"+jj+"obj").style.display="none";}
			}
		}
		if ($i("guia"+guia+"obj"))
		{$i("guia"+guia+"obj").style.display="block";}
		else
		{alert("O objeto guia"+guia+"obj nao existe.");}
	}
}
/*
Function: mostraferramenta

Ativa a visualiza��o de uma guia de ferramentas.

Par�metros:

guia - n�mero da guia que ser� ativada.
*/
function mostraferramenta(guia)
{
	if ($i("ferr"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10];
		for (j=0;j<fs.length; j++)
		{
			if ($i("ferr"+fs[j]))
			{
				jj = fs[j];
				$i("ferr"+jj).style.backgroundColor="rgb(230,230,230)";
				if ($i("ferr"+jj+"obj"))
				{$i("ferr"+jj+"obj").style.display="none";}
			}
		}
		$i("ferr"+guia).style.backgroundColor="rgb(255,255,255)";
		if ($i("ferr"+guia+"obj"))
		{$i("ferr"+guia+"obj").style.display="block";}
		else
		{alert("O objeto ferr"+guia+"obj nao existe.");}
	}
}
/*
Function: borra

Borra o mapa evitando que o usu�rio clique em alguma op��o

*/
function borra(tipo)
{}
/*
Function: aguarde

Cria um objeto aguarde.
O objeto � um banner mostrado na tela quando uma fun��o ajax � executada.

Method:

abre - abre o banner

Par�metros:

aguardeId - identificador do banner

texto - texto do banner

Method:

fecha - fecha o banner

Par�metros:

aguardeId - identificador do banner

*/
function aguarde()
{
	this.abre = function(aguardeId,texto)
	{
		YAHOO.namespace("aguarde."+aguardeId);
		eval ('YAHOO.aguarde.'+aguardeId+' = new YAHOO.widget.Panel("wait",{width:"240px",fixedcenter:false,underlay:"none",close:true,draggable:false,modal:true})');
		eval ('YAHOO.aguarde.'+aguardeId+'.setBody("<span style=font-size:12px; >"+texto+"</span>")');
		eval ('YAHOO.aguarde.'+aguardeId+'.body.style.height="20px"');
		eval ('YAHOO.aguarde.'+aguardeId+'.setHeader("<span><img src=\'"+g_locaplic+"/imagens/aguarde.gif\' /></span>")');
		eval ('YAHOO.aguarde.'+aguardeId+'.render(document.body)');
		eval ('YAHOO.aguarde.'+aguardeId+'.moveTo('+imagemxi+','+imagemyi+')');
		eval('YAHOO.aguarde.'+aguardeId+'.show()');
	};
	this.fecha = function(aguardeId)
	{
		if ($i("wait"))
		{
			if (eval('YAHOO.aguarde.'+aguardeId))
			{
				if ($i(eval('YAHOO.aguarde.'+aguardeId+".id")))
				{eval('YAHOO.aguarde.'+aguardeId+'.destroy()');}
			}
		}
	};
}
/*
Function: ativaClicks

Ativa as opera��es de clique sobre o mapa

Define o que ser� executado quando o mouse � clicado ou movido sobre o mapa
*/
function ativaClicks(docMapa)
{
	docMapa.onmouseover = function()
	{
		if ($i("imgh")){$i("imgh").style.display="block";}
		if ($i("janelaMenu"))
		{$i("janelaMenu").style.display="none";}
		this.src=g_quadrooriginal;
		//verifica se o mouse esta parado
		if (objmapa.parado!="cancela")
		{
			objmapa.parado="nao";
			verificaTip();
		}
		if ($i("tip"))
		{$i("tip").style.display="none";}
		this.onmousemove=function(exy)
		{
			if ($i("tip"))
			{$i("tip").style.display="none";}
			capturaposicao(exy);
			if (g_destaca != "")
			{$i("imgh").style.display="none";$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - destacaTamanho)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - destacaTamanho)+')';}
			if (g_realca == "sim")
			{
				$i("areaRealce").style.left = objposicaocursor.telax - destacaTamanho + 10;
				$i("areaRealce").style.top = objposicaocursor.telay - destacaTamanho + 10;
			}
			if ($i("img") && (g_panM == "sim"))
			{
				var nx = objposicaocursor.telax - leftinicial - clicinicialx;
				var ny = objposicaocursor.telay - topinicial - clicinicialy;
				if (g_entorno == "nao")
				{
					var l = 0;
					if (parseInt($i("i3geo").style.left))
					{var l = parseInt($i("i3geo").style.left);}
					$i("img").style.left = nx - l;
					var t = 0;
					if (parseInt($i("i3geo").style.top))
					{var t = parseInt($i("i3geo").style.top);}
					$i("img").style.top = ny - t;
				}
				else
				{
					$left("img",objmapa.w*-1 + nx);
					$left("imgS",objmapa.w*-1 + nx);
					$left("imgL",objmapa.w + nx);
					$left("imgO",objmapa.w*-3 + nx);
					$left("imgN",objmapa.w*-1 + nx);
					$top("img",objmapa.h*-1 + ny);
					$top("imgS",objmapa.h*-1 + ny);
					$top("imgL",objmapa.h*-1 + ny);
					$top("imgN",objmapa.h*-1 + ny);
					$top("imgO",objmapa.h*-1 + ny);
				}
			}
			movecursor();
			if ($i("longlat"))
			{$i("longlat").innerHTML = objposicaocursor.dmsx + "   " +  objposicaocursor.dmsy;}
			if (g_tipoacao == "mede")
			{
				$i("mostradistancia").style.display="block";
				var n = pontosdistobj.xpt.length;
				if (n > 0)
				{
					var d = calculadistancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					if (objmapa.scale > 500000)
					{
						var d = parseInt(d);
					}
					else
					{
						d= d + "";
						d = d.split(".");
						var decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					var da = d + pontosdistobj.dist[n-1];
					if ($i("mostradistancia"))
					{$i("mostradistancia").innerHTML = " Dist acum.= "+da+" atual= "+d+" km";}
				}
			}
			movelentef();
			//desloca cursor de zoom box
			if (((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox")) && ($i("box1").style.visibility == "visible"))
			{zoomboxf("desloca");}
		};
	};
	docMapa.onmouseout = function()
	{
		objmapa.parado="parar";
		mostradicasf(this,'');
		if ($i("imgh")){$i("imgh").style.display="none";}
	};
	docMapa.onmousedown = function()
	{
		$i("imgh").style.display="none";
		//verifica se esta na opï¿½o de zoom box
		if ((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox"))
		{
			// inicia retï¿½gulo de zoom
			$i("imgh").style.display="none";
			with($i("box1").style)
			{width=0;height=0;visibility="visible";}
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
		}
		if ($i("img") && (g_tipoacao == "pan"))
		{
			g_panM = "sim";
			leftinicial = parseInt($i("corpoMapa").style.left);
			topinicial = parseInt($i("corpoMapa").style.top);
			clicinicialx = objposicaocursor.imgx;
			clicinicialy = objposicaocursor.imgy;
			ddinicialx = objposicaocursor.ddx;
			ddinicialy = objposicaocursor.ddy;
		}
	};
	docMapa.onclick = function()
	{
		//verifica se esta na opcao de identificacao
		if (g_tipoacao == "identifica")
		{
			wdocaf("450px","250px",g_locaplic+'/ferramentas/identifica/index.htm?&x='+objposicaocursor.ddx+'&y='+objposicaocursor.ddy+'&escala='+objmapa.scale,"","","Identifica");
		}
		if (g_tipoacao == "mede")
		{
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			pontosdistobj.dist[n] = 0;
			if (n > 0)
			{
				var d = parseInt(calculadistancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
				pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
			}
			inseremarcaf(objposicaocursor.telax,objposicaocursor.telay);
		}
		//insere pontos
		if (g_tipoacao == "inserexy")
		{
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			if ($i("wdoca").style.display == "none")
			{wdocaf("270px","200px",g_locaplic+'/ferramentas/inserexy2/index.htm',"");}
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var ins = doc.getElementById("resultado").innerHTML;
			ins = ins + "<div style='font-size:12px' >" + objposicaocursor.ddx +" " + objposicaocursor.ddy + "</div><br>";
			doc.getElementById("resultado").innerHTML = ins;
			if (g_nomepin == ""){alert("Nenhum tema definido para editar");}
			else
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=insereSHP&tema="+g_nomepin+"&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2);
				cp.set_response_type("JSON");
				cp.call(p,"insereSHP",ajaxredesenha);
			}
		}
		//insere graficos
		if (g_tipoacao == "inseregrafico")
		{
			if ($i("wdoca").style.display == "none")
			{wdocaf("270px","200px",g_locaplic+'/ferramentas/inseregrafico/index.htm',"");}
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var tema = doc.getElementById("temasLigados").value;
			var width = doc.getElementById("w").value;
			var inclinacao = doc.getElementById("inclinacao").value;
			var shadow_height = doc.getElementById("sombra").value;
			if (tema == ""){alert("Nenhum tema definido para pegar os dados");}
			else
			{
				var itens = doc.getElementById("listadeitens").value;;
				if (itens == "")
				{alert("Nenhum item foi escolhido");}
				else
				{
					objaguarde.abre("ajaxredesenha","Aguarde...");
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=insereSHPgrafico&tipo=pizza&tema="+tema+"&x="+objposicaocursor.ddx+"&y="+objposicaocursor.ddy+"&itens="+itens+"&shadow_height="+shadow_height+"&width="+width+"&inclinacao="+inclinacao+"&g_sid="+g_sid;
					var cp = new cpaint();
					//cp.set_debug(2);
					cp.set_response_type("JSON");
					cp.call(p,"insereSHPgrafico",ajaxredesenha);
				}
			}
		}
		//insere toponimo
		if (g_tipoacao == "textofid")
		{
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			if ($i("wdoca").style.display == "none")
			{textofid();}
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var texto = doc.getElementById("texto").value;
			texto = htmlAcentos(texto);
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
			objaguarde.abre("ajaxredesenha","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inserefeature&pin="+g_nomepin+"topo&tipo=ANNOTATION&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&texto="+texto+"&position="+pos+"&partials="+pl+"&offsetx="+ox+"&offsety="+oy+"&minfeaturesize="+mf+"&mindistance="+md+"&force="+forca+"&shadowcolor="+fcs+"&shadowsizex="+fxs+"&shadowsizey="+fys+"&outlinecolor="+m+"&cor="+c+"&sombray="+ys+"&sombrax="+xs+"&sombra="+cs+"&fundo="+cf+"&angulo="+a+"&tamanho="+t+"&fonte="+f+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2);
			cp.set_response_type("JSON");
			cp.call(p,"insereFeature",ajaxredesenha);
		}
		//seleciona
		if (g_tipoacao == "selecao")
		{
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var tipo = "adiciona";
			//pega o tipo de operacao da janela de selecao
			if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
			if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
			//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
			if ((tipo != "limpa") && (tipo != "inverte"))
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=selecaopt&tema="+objmapa.temaAtivo+"&tipo="+tipo+"&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"selecaoPT",ajaxredesenha);
			}
		}
		objmapa.verificaClickMapa();
	};
	docMapa.onmouseup = function()
	{
		if (g_tipoacao == "zoomli"){zoomboxf("termina");}
		if (g_tipoacao == "selecaobox"){zoomboxf("termina");}
		if ($i("img") && (g_tipoacao == "pan"))
		{
			g_panM = "nao";
			var disty = (ddinicialy * -1) + objposicaocursor.ddy; //teladd[1]
			var distx = (ddinicialx * -1) + objposicaocursor.ddx; //teladd[0]
			var ex = objmapa.extent;
			var ex = ex.split(" ");
			var novoxi = (ex[0] * 1) - distx;
			var novoxf = (ex[2] * 1) - distx;
			var novoyi = (ex[1] * 1) - disty;
			var novoyf = (ex[3] * 1) - disty;
			if ((distx == 0)||(disty == 0))
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&x="+objposicaocursor.imgx+"&y="+objposicaocursor.imgy+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"pan",ajaxredesenha);
				return;
			}
			var nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
			objaguarde.abre("ajaxredesenha","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+nex+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"mudaExtensao",ajaxredesenha);
		}
	};
}
/*
Section: navega��o
*/
/*
Function: initJanelaZoom

Abre a janela com as ferramentas de zoom

Parametros:

qual - Qual janela (1 ou 2)
*/
function initJanelaZoom(qual)
{
	//janela de botoes 1
	if(navn){var wj = "36px";}
	else{var wj = "36px";}
	if(navn){var recuo = "0px";}
	else{var recuo = "0px";}	
	if ((qual == 1) && (!$i("maisBotoes1")))
	{
		var novoel = document.createElement("div");
		novoel.id = "janelaBotoes1";
		novoel.style.display="block";
		if (navm)
		{novoel.style.filter='alpha(opacity=90)';}
		else
		{novoel.style.opacity= .85;}
		novoel.style.border="1px solid gray";
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" style="background-color:rgb(250,250,250);width='+wj+'px"  >';
		//barra de zoom
		if ($i("zoomli"))
		{
			if (navn){temp += '<div style="text-align:center;position:relative;left:9px" >';}
			temp += '<div id="vertMaisZoom" onmouseover="mostradicasf(this,\'Amplia o mapa mantendo o centro atual.\',\'\')" onclick="zoomiauto()" ></div><div id="vertBGDiv" name="vertBGDiv" tabindex="0" x2:role="role:slider" state:valuenow="0" state:valuemin="0" state:valuemax="200" title="Zoom" >';
			temp += '<div id="vertHandleDiv" ><img alt="" src="'+$im("slider.png")+'" /></div></div>';
			temp += '<div id=vertMenosZoom onmouseover="mostradicasf(this,\'Reduz o mapa mantendo o centro atual.\',\'\')" onclick="zoomoauto()"  ></div>';
			if (navn){temp += '</div>';}
		}
		temp += '<div id="maisBotoes1" style="left:'+recuo+'" ></div></div>';
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		//copia os botoes do HTML para a janela
		if ($i("barraDeBotoes1"))
		{
			$i("maisBotoes1").innerHTML = $i("barraDeBotoes1").innerHTML+"<table><tr><td>&nbsp;</td></tr></table>";
			$i("barraDeBotoes1").innerHTML = "";
		}
		YAHOO.namespace("janelaBotoes1.xp");
		YAHOO.janelaBotoes1.xp.panel = new YAHOO.widget.Panel("janelaBotoes1", {width:wj, fixedcenter: false, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaBotoes1.xp.panel.render();
		verticalSlider = YAHOO.widget.Slider.getVertSlider("vertBGDiv","vertHandleDiv", 0, 70);
		verticalSlider.onChange = function(offsetFromStart)
		{g_fatordezoom = (offsetFromStart - 35) / 5;};
		verticalSlider.setValue(35,true);
		if ($i("vertBGDiv"))
		{
			$i("vertBGDiv").onmouseup = function()
			{
				aplicaescala();
				g_fatordezoom = 0;
				verticalSlider.setValue(35,true);
			};
		}
		//altera o tamanho da imagem do mapa
		if($i("vertHandleDiv"))
		{
			$i("vertHandleDiv").onmousemove = function()
			{
				var nw = objmapa.w;
				var nh = objmapa.h;
				var nt = 0;
				var nl = 0;
				var ns = parseInt(objmapa.scale);
				if ((g_fatordezoom > 0) && (g_fatordezoom < 7))
				{
					g_fatordezoom = g_fatordezoom + 1;
					var velhoh = parseInt($i("img").style.height);
					var velhow = parseInt($i("img").style.width);
					nh = objmapa.h / g_fatordezoom;
					nw = objmapa.w / g_fatordezoom;
					var t = parseInt($i("img").style.top);
					var l = parseInt($i("img").style.left);
					nt=t + ((velhoh - nh)*.5);
					if (navm){nl=0;}
					else
					{nl=l + ((velhow - nw)*.5);}
					var fatorEscala = nh/objmapa.h;
					ns=parseInt(objmapa.scale / fatorEscala);
				}
				if ((g_fatordezoom < 0) && (g_fatordezoom > -7))
				{
					g_fatordezoom = g_fatordezoom - 1;
					var velhoh = parseInt($i("img").style.height);
					var velhow = parseInt($i("img").style.width);
					nh = objmapa.h * g_fatordezoom * -1;
					nw = objmapa.w * g_fatordezoom * -1;
					var t = parseInt($i("img").style.top);
					var l = parseInt($i("img").style.left);
					nt = t - ((nh - velhoh)*.5);
					nl = l - ((nw - velhow)*.5);
					var fatorEscala = nh/objmapa.h;
					ns=parseInt(objmapa.scale / fatorEscala);
				}
				$i("img").style.width = nw;
				$i("img").style.height = nh;
				$top("img",nt);
				$left("img",nl);
				if ($i("escalanum"))
				{$i("escalanum").value=ns;}
			};
		}		
		return;
	}
	if ((qual == 1) && ($i("maisBotoes1")))
	{YAHOO.janelaBotoes1.xp.panel.show();}
	//janela de botoes 2
	if ((qual == 2) && (!$i("maisBotoes2")))
	{
		var novoel = document.createElement("div");
		novoel.id = "janelaBotoes2";
		novoel.style.display="block";
		if (navm)
		{novoel.style.filter='alpha(opacity=90)';}
		else
		{novoel.style.opacity= .85;}
		novoel.style.border="1px solid gray";
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" style="background-color:rgb(250,250,250);width='+wj+'px"  >';		
		temp += '<div id="maisBotoes2" style="left:'+recuo+';top:-6px;"  ></div></div>';
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		//copia os botoes do HTML para a janela
		if ($i("barraDeBotoes2"))
		{
			$i("maisBotoes2").innerHTML = $i("barraDeBotoes2").innerHTML;
			$i("barraDeBotoes2").innerHTML = "";
		}
		YAHOO.namespace("janelaBotoes2.xp");
		YAHOO.janelaBotoes2.xp.panel = new YAHOO.widget.Panel("janelaBotoes2", {width:wj, fixedcenter: false, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaBotoes2.xp.panel.render();
		return;
	}
	if ((qual == 2) && ($i("maisBotoes2")))
	{YAHOO.janelaBotoes2.xp.panel.show();}
}
/*
Function: initJanelaRef

Abre a janela com o mapa de referencia

*/
function initJanelaRef()
{
	if (!$i("winRef"))
	{
		var novoel = document.createElement("div");
		novoel.id = "winRef";
		novoel.style.display="none";
		var ins = '<div class="hd">Refer&ecirc;ncia</div>';
		ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="javascript:movimentoRef(this)" onclick="javascript:clicouRef()">';
		ins += '<img style="cursor:pointer;" id=imagemReferencia src="" />';
		ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
		novoel.innerHTML = ins;
		novoel.style.borderColor="gray";
		document.body.appendChild(novoel);
		$i("imagemReferencia").style.height = objmapa.refheight+"px";
	}
	$i("winRef").style.display = "block";
	YAHOO.namespace("janelaRef.xp");
	YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
	YAHOO.janelaRef.xp.panel.render();
	if (navm){YAHOO.janelaRef.xp.panel.moveTo((imagemxi+objmapa.w-160),imagemyi+4);}
	else
	{YAHOO.janelaRef.xp.panel.moveTo((imagemxi+objmapa.w-160),imagemyi+4);}
	var escondeRef = function()
	{
		YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close, "click");
		YAHOO.janelaRef.xp.panel.destroy();	
		iCookie("g_mapaRefDisplay","none");	
	};
	YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close, "click", escondeRef);	
	iCookie("g_mapaRefDisplay","block");
	objmapa.atualizaReferencia();
}
/*
Function: mudaboxnf

Posiciona o botao aplicar quando o check box que liga/desliga um tema � pressionado.

Par�metros:

tipo - de onde veio a requisicao ligadesliga|adicionatema
*/
function mudaboxnf(tipo)
{
	g_operacao = tipo;
	clearTimeout(objmapa.tempo);
	objmapa.tempo = setTimeout('remapaf()',(4000));
	autoRedesenho("reinicia");
	if ($i("aplicari"))
	{
		$i("aplicari").style.display="block";
		if (navm)
		{
			mx = objposicaomouse.x - 10;
			my = objposicaomouse.y - 15;
			with ($i("aplicari").style)
			{
				pixelLeft = mx+document.body.scrollLeft;
				pixelTop = my+document.body.scrollTop;
			}
		}
		if (navn)
		{
			var l = objposicaomouse.x;
			var t = objposicaomouse.y+document.body.scrollTop;
			with ($i("aplicari").style)
			{
				left = l;
				top = t;
			}
		}
	}
}
/*
Function: movelentef

Move a imagem na lente de aumento conforme o moveimento do mouse sobre o mapa.
*/
function movelentef()
{
	if ($i("lente"))
	{
		if ($i("lente").style.visibility=="visible")
		{
			var esq = (objposicaocursor.telax - imagemxi) * 2.25;
			var topo = (objposicaocursor.telay - imagemyi) * 2.25;
			var clipt = "rect("+ (topo - 40) + " " + (esq + 40) + " " + (topo + 40) + " " + (esq - 40) +")";
			with ($i("lente").style)
			{
				clip = clipt;
				eval (g_tipotop + "= (imagemyi - (topo - 40)) + g_postpx");
				eval (g_tipoleft +  "= (imagemxi - (esq - 40)) + g_postpx");
			}
		}
	}
}
/*
Function: zoomiauto

Aproxima o mapa tendo o centro como refer�ncia.
*/
function zoomiauto()
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	g_fatordezoom = 0;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=aproxima&nivel=2&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"aproxima",ajaxredesenha);
}
/*
Function: zoomoauto

Afasta o mapa tendo o centro como refer�ncia.
*/
function zoomoauto()
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	g_fatordezoom = 0;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=afasta&nivel=2&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"afasta",ajaxredesenha);
}
/*
Function: zoomboxf

Faz o zoom no mapa utilizando a op��o de desenhar um ret�ngulo.

As coordenadas de tela devem estar no objeto "objposicaocursor".
A op��o "desloca" altera a posi��o do box (box1) na tela. A op��o "termina", pega as coordenadas
de tela do box1 e chama a fun��o ajax que redesenha o mapa.

Parameters:

tipo - desloca|termina
*/
function zoomboxf (tipo)
{
	var bx = $i("box1");
	switch(tipo)
	{
		case "desloca":
		// muda o ret�gulo de zoom conforme deslocamento do mouse
		ppx = objposicaocursor.telax;
		py = objposicaocursor.telay;
		if (navn)
		{
			if (ppx > boxxini)
			{with(bx.style){width = ppx - boxxini - 15 + "px";}}
			if (py > boxyini)
			{with(bx.style){height = py - boxyini - 15 + "px";}}
			if (ppx < boxxini)
			{with(bx.style){left = ppx + "px";width = boxxini - ppx + 15 + "px";}}
			if (py < boxyini)
			{with(bx.style){top = py + "px";height = boxyini - py + 15 + "px";}}
		}
		if (navm)
		{
			if (ppx > boxxini)
			{with(bx.style){width = ppx - boxxini - 2;}}
			if (py > boxyini)
			{with(bx.style){height = py - boxyini - 2;}}
			if (ppx < boxxini)
			{with(bx.style){left = ppx;width = boxxini - ppx + 2;}}
			if (py < boxyini)
			{with(bx.style){top = py;height = boxyini - py + 2;}}
		}
		break;
		case "termina":
		// finaliza o ret�gulo de zoom
		md = 1;
		eval ('pix = parseInt(document.getElementById("box1").style.' + g_tipoleft + ")");
		eval ('piy = parseInt(document.getElementById("box1").style.' + g_tipotop + ")");
		xfig0 = parseInt(bx.style.width) - imagemxi;
		yfig0 = parseInt(bx.style.height) - imagemyi;
		xfig = pix + (parseInt(bx.style.width)) - imagemxi;
		yfig = piy + (parseInt(bx.style.height)) - imagemyi;
		amext = objmapa.extent.split(" ");
		dx = ((amext[0] * -1) - (amext[2] * -1)) / (tamanhox - 1);
		dy = ((amext[1] * 1) - (amext[3] * 1)) / (tamanhoy - 1);
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x1 = (amext[0] * 1) + nx;
		y1 = (amext[3] * 1) - ny;
		xfig = pix - imagemxi;
		yfig = piy - imagemyi;
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x2 = (amext[0] * 1) + nx;
		y2 = (amext[3] * 1) - ny;
		v = x2+" "+y2+" "+x1+" "+y1;
		// se o retangulo for negativo pula essa parte para n� gerar erro
		if (g_tipoacao != "selecaobox")
		{
			if (x1 != x2)
			{
				objmapa.extent=v;
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+v+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"mudaExtensao",ajaxredesenha);
			}
		}
		else
		{
			if (x1 != x2)
			{
				var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				var tipo = "adiciona";
				//pega o tipo de operacao da janela de selecao
				if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
				if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
				//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
				if ((tipo != "limpa") && (tipo != "inverte"))
				{
					objaguarde.abre("ajaxredesenha","Aguarde...");
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=selecaobox&ext="+v+"&g_sid="+g_sid+"&tipo="+tipo+"&tema="+objmapa.temaAtivo;
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_response_type("JSON");
					cp.call(p,"selecaobox",ajaxredesenha);
				}
			}
		}		
		with(bx.style){visibility="hidden";width = 0; height = 0;}
		document.getElementById("imgh").style.display="block";
		break;
	}
}
/*
Function: zoomIP

Localiza no mapa o usu�rio baseado em seu n�mero IP.
*/
function zoomIP()
{
	var xxx = convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
	var yyy = convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
	var mostraIP = function(retorno)
	{
		if (retorno.data.latitude != null)
		{
			objaguarde.abre("ajaxredesenha","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&tamanho=14&xy="+retorno.data.longitude+" "+retorno.data.latitude+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"zoomPonto",ajaxredesenha);
		}
		else
		{alert("Nao foi possivel identificar a localizacao.");}
	};
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=localizaIP&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"localizaIP",mostraIP);	
}
/*
Function: zoomPonto

Localiza uma coordenada no mapa.
*/
function zoomPonto()
{
	if ($i("xg"))
	{
		var xxx = convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
		var yyy = convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&xy="+xxx+" "+yyy+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"zoomPonto",ajaxredesenha);
	}
}
/*
Function: clicouRef

Altera a abrang�ncia do mapa quando o mapa de refer�ncia � clicado

*/
function clicouRef()
{
	objposicaocursor.refx = objposicaocursor.refx - parseInt(YAHOO.janelaRef.xp.panel.element.style.left) - 5;
	objposicaocursor.refy = objposicaocursor.refy - parseInt(YAHOO.janelaRef.xp.panel.element.style.top) - 25;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&tipo=ref&x="+objposicaocursor.refx+"&y="+objposicaocursor.refy+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"pan",ajaxredesenha);
}
/*
Function: movimentoRef

Pega a coordenada do cursor sobre o mapa de refer�ncia

*/
function movimentoRef(obj)
{
	obj.onmousemove =function(exy)
	{
		if (navm){capturaposicao(obj);}
		else{capturaposicao(exy);}
	};
}
/*
Function: aplicaescala

Aplica a escala numerica definida no formul�rio existente no mapa.
*/
function aplicaescala()
{
	if ($i("escalanum"))
	{var nova = $i("escalanum").value;}
	else
	{ var nova = objmapa.scale;}
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaescala&escala="+nova+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "outras";
	cp.call(p,"mudaEscala",ajaxredesenha);
}
/*
Function: zoomtot

Zoom para a extens�o default.
*/
function zoomtot()
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+objmapa.extentTotal+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"mudaExtensao",ajaxredesenha);
}
/*
Function: panFixo

Desloca o mapa em uma dire��o determinada.
*/
function panFixo(direcao)
{
	if (direcao == "norte")
	{
		var y = objmapa.h / 6;
		var x = objmapa.w / 2;
	}
	if (direcao == "sul")
	{
		var y = objmapa.h - (objmapa.h / 6);
		var x = objmapa.w / 2;
	}
	if (direcao == "leste")
	{
		var x = objmapa.w - (objmapa.w / 6);
		var y = objmapa.h / 2;
	}
	if (direcao == "oeste")
	{
		var x = objmapa.w / 6;
		var y = objmapa.h / 2;
	}
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&x="+x+"&y="+y+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"pan",ajaxredesenha);
}
/*
Function: ativaEntorno

Ativa ou desativa a carga do entorno.

Com o entorno ativo, s�o produzidas imagens no entorno do mapa, no estilo Google.
*/
function ativaEntorno()
{
	//if (navn)
	//{alert("op��o em desenvolvimento");return;}
	if (g_entorno == "sim")
	{
		var letras=["L","O","N","S"];
		for (l=0;l<letras.length; l++)
		{
			if ($i("img"+letras[l]))
			{
				$i("img"+letras[l]).style.display = "none";
				$i("img"+letras[l]).src = "";
			}
		}
		$left("img",0);
		$top("img",0);
		g_entorno = "nao";
		alert("Entorno desativado");
		$i("img").style.visibility = "visible";
		$i("img").style.display = "block";
	}
	else
	{
		geraURLentorno();
		var letras=["L","O","N","S"];
		for (l=0;l<letras.length; l++)
		{
			if ($i("img"+letras[l]))
			{
				$i("img"+letras[l]).style.width = objmapa.w;
				$i("img"+letras[l]).style.height = objmapa.h;
				$i("img"+letras[l]).style.display = "block";
			}
		}
		g_entorno = "sim";
		ajustaEntorno();
		alert("Entorno ativado. o desenho do mapa pode demorar mais.");
	}
}
/*
Function: geraURLentorno

Gera as urls que far�o parte dos divs de desenho do entorno do mapa
*/
function geraURLentorno()
{
	var nny = (objmapa.h / 2) * -1;
	var nnx = objmapa.w / 2;
	var sy = objmapa.h + (objmapa.h / 2);
	var sx = objmapa.w / 2;
	var lx = objmapa.w + (objmapa.w / 2);
	var ly = objmapa.h / 2;
	var ox = (parseInt(objmapa.w/2)) * -1;
	var oy = objmapa.h / 2;
	var u = window.location.protocol+"\/\/"+window.location.host+objmapa.cgi+"?map="+objmapa.mapfile;
	u += "&mode=map&imgext="+objmapa.extent+"&mapsize="+nnx+" "+oy+"&map_scalebar_status=off";
	var sul = u+"&imgxy="+sx/2+" "+sy/2;
	var norte = u+"&imgxy="+nnx/2+" "+nny/2;
	var leste = u+"&imgxy="+lx/2+" "+ly/2;
	var oeste = u+"&imgxy="+ox/2+" "+oy/2;
	$i("imgS").src=sul;
	$i("imgN").src=norte;
	$i("imgL").src=leste;
	$i("imgO").src=oeste;
}
/*
Function: ajustaEntorno

Ajusta o tamanho do mapa e das imagens do entorno
*/
function ajustaEntorno()
{
	$left("img",objmapa.w*-1);
	$left("imgS",objmapa.w*-1);
	$left("imgL",objmapa.w);
	$left("imgO",objmapa.w*-3);
	$left("imgN",objmapa.w*-1);
	$top("img",objmapa.h*-1);
	$top("imgS",objmapa.h*-1);
	$top("imgL",objmapa.h*-1);
	$top("imgN",objmapa.h*-1);
	$top("imgO",objmapa.h*-1);
}
/*
Section: atributos
*/
/*
Function: buscaRapida

Realiza a busca por palavra no servi�o geonames do MMA

Chama o web service e mostra os resultados na tela
*/
function buscaRapida()
{
	if (!$i("boxg"))
	{
		var novoel = document.createElement("div");
		novoel.id = "boxg";
		novoel.style.zIndex=5000;
		novoel.innerHTML = '<font face="Arial" size="0"></font>';
		document.body.appendChild(novoel);
	}
	if ($i("buscaRapida"))
	{
		if ($i("valorBuscaRapida").value == "")
		{alert ("Digite uma palavra para busca!");return;}
		wdocaf("300px","280px",g_locaplic+"/ferramentas/buscarapida/index.htm","","","Busca rapida");
	}
}
/*
Function: verificaTip

Verifica se a op��o de identifica��o est� ativa e se o mouse est� parado.
Se o mouse estiver parado, chama a fun��o de mostrar tip.
*/
function verificaTip()
{
	//insere div para tips
	if (!$i("tip"))
	{
		var novoel = document.createElement("div");
		novoel.id = "tip";
		novoel.style.position="absolute";
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		document.body.appendChild(novoel);
	}
	if ((objmapa.parado == "parar") || (objmapa.parado=="cancela")){return;}
	if ((objmapa.parado == "sim") && (g_operacao == "identifica") && ($i("tip").style.display!="block"))
	{
		$i("tip").style.top = objposicaocursor.telay +20;
		$i("tip").style.left = objposicaocursor.telax;
		$i("tip").innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>Pesquisando...</td></tr></table>";
		$i("tip").style.display="block";
		eval(g_funcaoTip);
	}
	//mostra op��o sobre o mouse quando est� na fun��o pan
	if (($i("box1")) && (objmapa.parado == "sim") && (document.getElementById("imgh").style.display=="block") && ($i("box1").style.visibility != "visible"))
	{
		if ((g_tipoacao == "zoomli") || (g_tipoacao == "zoomlo") || (g_tipoacao == "pan"))
		{
			if(g_mostraRosa == "sim")
			{
				if (navm)
				{$i("tip").style.filter = "alpha(opacity=0)";}
				else
				{$i("tip").style.opacity="5";}
				var setas = "<table id='rosaV' ><tr>";
				if (navm){var s = " style=\"filter:'alpha(opacity=0)'\" ";}
				if (navn){var s = " style='opacity:0' ";}
				setas += "<td "+s+" ></td>";
				setas += "<td><img title='norte' src='"+$im("rosanorte.png")+"' onclick=\"panFixo('norte')\" /></td>";
				setas += "<td "+s+" ></td></tr>";
				setas += "<tr><td><img title='oeste' src='"+$im("rosaoeste.png")+"' onclick=\"panFixo('oeste')\" /></td>";
				setas += "<td><table><tr>";
				setas += "<td><img title='aproxima' onclick='zoomiauto()' src='"+$im("rosacentrol.png")+"' </td>";
				setas += "<td><img title='afasta' onclick='zoomoauto()' src='"+$im("rosacentroo.png")+"' </td>";
				setas += "</tr></table></td>";
				setas += "<td><img title='leste' src='"+$im("rosaleste.png")+"' onclick=\"panFixo('leste')\" /></td></tr>";
				setas += "<tr><td "+s+" ></td><td><img title='sul' src='"+$im("rosasul.png")+"' onclick=\"panFixo('sul')\" /></td><td "+s+" ></td></tr></table>";
				$i("tip").innerHTML = setas;
				$i("tip").style.top = objposicaocursor.telay - 27;
				$i("tip").style.left = objposicaocursor.telax - 27;
				$i("tip").style.display="block";
				//anim.animate();
				mostradicasf('','Clique nas pontas da rosa para navegar no mapa. Clique em x para parar de mostrar essa op��o.','');
				return;
			}
		}
	}
	if ((objmapa.parado!="cancela") && ($i("tip").style.display!="block"))
	{objmapa.parado = "sim";}
	setTimeout('verificaTip()',g_tempotip);
}
/*
Function: verificaTipDefault

Executa a opera��o de identifica��o para mostrar um TIP.

Esta � a fun��o default, definida na vari�vel g_funcaoTip
*/
function verificaTipDefault()
{
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=identifica&opcao=tip&xy="+objposicaocursor.ddx+","+objposicaocursor.ddy+"&resolucao=5&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_persistent_connection(true);
	cp.set_response_type("JSON");
	cp.call(p,"identifica",mostraTip);
}
/*
Function: mostraTip

Mostra a descri��o de um elemento do mapa como um tip na posi��o do mouse.

Para que um tema tenha um tip, � necess�rio configurar o metadata TIP no map file.

Parameters:

retorno - retorno da fun��o ajax.
*/
function mostraTip(retorno)
{
	var retorno = retorno.data;
	if ((retorno != "erro") && (retorno != undefined))
	{
		if ($i("img"))
		{$i("img").title = "";}
		if (retorno != "")
		{
			var res = "<div id='cabecatip' style='text-align:left;background-color:rgb(240,240,240)'><span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapa.parado=\"cancela\"'>parar&nbsp;&nbsp;</span>";
			res += "<span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapa.objtips.push($i(\"tip\"));$i(\"tip\").id=\"\";$i(\"cabecatip\").innerHTML =\"\";$i(\"cabecatip\").id =\"\"' >fixar</span></div>";
			var temas = retorno.split("!");
			for (tema=0;tema<temas.length; tema++)
			{
				var titulo = temas[tema].split("@");
				if (g_tipotip == "completo")
				{
					res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";
				}
				var ocorrencias = titulo[1].split("*");
				for (ocorrencia=0;ocorrencia<ocorrencias.length; ocorrencia++)
				{
					if (ocorrencias[ocorrencia] != "")
					{
						var pares = ocorrencias[ocorrencia].split("##");
						for (par=0;par<pares.length; par++)
						{
							var valores = pares[par].split("#");
							if (g_tipotip == "completo")
							{
								res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
							}
							else
							{
								res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'><i>" + valores[1] + "</i></span><br>";
							}
						}
					}
				}
			}
			if ($i("janelaMen"))
			{
				$i("janelaMenTexto").innerHTML = res;
			}
			else
			{
				$i("tip").innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
				with($i("tip").style){top = objposicaocursor.telay - 10;left = objposicaocursor.telax - 20;display="block";}
			}
		}
	}
}
/*
Section: legenda
*/
/*
Function: legendaGrafico

Mostra a legenda dos gr�ficos adicionados no mapa.

Chamado pela ferramenta de inclus�o de gr�ficos

Par�metros:

par - string com os par�metros item*r,g,b*item....
*/
function legendaGrafico(par)
{
	var temp = par.split("*");
	var par = "<table>";
	for (i=0;i<temp.length; i++)
	{
		var t = temp[i];
		var t = t.split(",");
		par += "<tr style='text-align:left'><td style='background-color:rgb("+t[1]+","+t[2]+","+t[3]+")'>&nbsp;&nbsp;</td><td style='text-align:left'>"+t[0]+"</td></tr>";
	}
	par += "</table>";
	if (!$i("legendagr"))
	{
		var novoel = document.createElement("div");
		var temp = '<div class="hd">Legenda</div>';
		temp += '<div class="bd">';
		temp += '<div id="contemleggr" ></div></div>';
		novoel.id = "legendagr";
		novoel.style.display="block";
		novoel.style.textAlign="left";
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		YAHOO.namespace("legendagr.xp");
		YAHOO.legendagr.xp.panel = new YAHOO.widget.Panel("legendagr", {width:"250px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
	}
	$i("contemleggr").innerHTML = par;
	YAHOO.legendagr.xp.panel.render();
	YAHOO.legendagr.xp.panel.show();
}
/*
Function: inverteStatusClasse

Ativa ou desativa a visualiza��o de uma classe de um tema.

Parameters:

leg - objeto input clicado no mapa
*/
function inverteStatusClasse(leg)
{
	var classe = leg.value;
	var layer = leg.name;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inverteStatusClasse&g_sid="+g_sid+"&tema="+layer+"&classe="+classe;
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("json");
	cp.call(p,"inverteStatusClasse",ajaxredesenha);
}
/*
Section: sistemas de busca e navega��o
*/
/*
Function: atualizagoogle

Atualiza o box do google se a fun��o google estiver ativa
*/
function atualizagoogle()
{
	if (parent.frames["wdocai"])
	{
		if (navn)
		{
			if ($i("wdocai"))
			{var doc = $i("wdocai").contentDocument;}
		}
		else
		{
			if(document.frames("wdocai"))
			{var doc = document.frames("wdocai").document;}
		}
		if(doc)
		{
			if (doc.getElementById("map"))
			{parent.frames["wdocai"].panTogoogle();}
		}
	}
}
/*
Function: atualizascielo

Atualiza a lista de dados na op��o de busca Scielo
*/
function atualizascielo()
{
	if ($i("wdocai"))
	{
		if (parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoscielo"))
			{parent.frames["wdocai"].buscascielo();}
		}
	}
}
/*
Function: atualizaconfluence

Atualiza a lista de dados na op��o de busca confluence
*/
function atualizaconfluence()
{
	if($i("wdocai"))
	{
		if (parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoconfluence"))
			{parent.frames["wdocai"].buscaconfluence();}
		}
	}
}
/*
Function: atualizawiki

Atualiza a lista de dados na op��o de busca wiki
*/
function atualizawiki()
{
	if ($i("wdocai"))
	{
		if (parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadowiki"))
			{parent.frames["wdocai"].buscawiki();}
		}
	}
}
/*
Section: menu de temas e outras listagens
*/
/*
Function: procurartemas

Localiza um tema no menu de temas.
*/
function procurartemas()
{
	var procurar = document.getElementById("buscatema").value;
	var resultadoProcurar = function(retorno)
	{
		var retorno = retorno.data;
		if ((retorno != "erro") && (retorno != undefined))
		{
			//var grupos = retorno.grupo;
			var ins = "";
			for (ig=0;ig<retorno.length;ig++)
			{
					var ngSgrupo = retorno[ig].subgrupos;
					for (sg=0;sg<ngSgrupo.length;sg++)
					{
						var nomeSgrupo = ngSgrupo[sg].subgrupo;
						var ngTema = ngSgrupo[sg].temas;
						for (st=0;st<ngTema.length;st++)
						{
								if ( ngTema[st].link != " ")
								{var lk = "<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>";}
								var tid = ngTema[st].tid;
								var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type='checkbox' value='"+tid+"' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" /> ("+nomeSgrupo+")";
								var nomeTema = inp+(ngTema[st].nome)+lk+"<br>";
								ins += nomeTema;
						}
					}
			}
			if (ins != "")
			{
				$i("achados").innerHTML = ins+"<br>";
			}
			else
			{$i("achados").innerHTML = "<span style='color:red'>Nada encontrado<br><br></span>";}
		}
	};
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=procurartemas&procurar="+procurar+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("json");
	cp.call(p,"procurartemas",resultadoProcurar);
}
/*
Function: expandeTema

Busca dados sobre um tema quando o bot�o de expandir tema (guia1) � clicado.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeTema(itemID)
{
	var lista = (objmapa.temas).split(";");
	if (!document.getElementById("idx"+itemID))
	{
		for (l=0;l<lista.length; l++)
		{
			var ltema = lista[l].split("*");
			//codigo,status,nome,transparencia,tipo,selecao,escala,download,tem features,conexao,tem wfs
			if (ltema[0] == itemID)
			{
				var farol = "maisamarelo.png";
				if (ltema[8] == undefined){ltema[8] = "nao";}
				if (ltema[6]*1 < objmapa.scale*1)
				{
				 	var farol = "maisverde.png";
				 	var mfarol = "A escala do tema &eacute; compat&iacute;vel com a escala do mapa";
				}
				if (ltema[6]*1 > objmapa.scale*1)
				{
				 	var farol = "maisvermelho.png";
					var mfarol = "A escala do tema &eacute incompat&iacute;vel com a escala do mapa";
				}
				if (ltema[6] == 0)
				{
				 	var farol = "maisamarelo.png";
					var mfarol = "A escala do tema n&atilde;o &eacute conhecida";
				}
				tnome = "&nbsp;<img id='farol"+ltema[0]+"' src='"+$im(farol)+"' title='"+mfarol+"' \>";
				tnome += "&nbsp;<img  id='idx"+ltema[0]+"' src='"+$im("x.gif")+"' title='excluir' onclick='excluitemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para excluir esse tema do mapa.','exclui')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("sobe.gif") +" title='sobe' onclick='sobetemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para subir esse tema na ordem de desenho','sobe')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("desce.gif") +"' title='desce' onclick='descetemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou descer esse tema na ordem de desenho','desce')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("extent.gif") +"' title='zoom para o tema' onclick='zoomtemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para ajustar o mapa de forma a mostrar todo o tema','')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				mytreeview1.createItem("temap0"+ltema[0], tnome, imgBranco, false, true, true, ltema[0]);
				if (g_opcoesTemas == "sim")
				{mytreeview1.createItem("opc"+ltema[0], "Op��es", imgBranco, true, true, true, ltema[0]);}
				mytreeview1.createItem("legenda"+ltema[0], "Legenda", imgBranco, true, true, true, ltema[0]);
				if (g_opcoesTemas == "sim")
				{
					var im = "";
					if (navn)
					{var im = "<img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='13' />";}
					//transparencia
					if ((ltema[4] != 0) || (ltema[8] == "sim"))
					{
						tnome = "<span onclick='mudatranspf(\""+ltema[0]+"\")'>"+im+"<img  src='"+$im("tic.png")+"' onmouseover=\"javascript:mostradicasf(this,'Altera a transpar�ncia do tema, possibilitando que as camadas inferiores possam ser vistas.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;opacidade: </span><input  onchange='mudatranspf(\""+ltema[0]+"\")' class=digitar type=text size=3 value='"+ltema[3]+"' id='tr"+ltema[0]+"' />";
						mytreeview1.createItem("temap1"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					//muda nome
					tnome = "<span onclick='mudanomef(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png")+"' onmouseover=\"javascript:mostradicasf(this,'Muda o nome atual do tema, utilize para melhorar a leganda do mapa.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;novo nome: </span><input onchange='mudanomef(\""+ltema[0]+"\")' class=digitar type=text size=10 value='' id='nn"+ltema[0]+"' />";
					mytreeview1.createItem("temap2"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					if ((ltema[4] < 3) && (ltema[9] != 7))
					{
						tnome = "<span onclick='procuraratribf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png")+" onmouseover=\"javascript:mostradicasf(this,'Localize elementos no tema com base em seus atributos descritivos.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;procurar... </span>";
						mytreeview1.createItem("temap3"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='toponimiaf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Crie uma nova camada no mapa para apresentar textos descritivos sobre esse tema, tendo como base a tabela de atributos.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;texto... </span>";
						mytreeview1.createItem("temap4"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='etiquetas(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Defina as etiquetas que ser�o mostradas quando o mouse � estacionado sobre um elemento desse tema.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;etiquetas... </span>";
						mytreeview1.createItem("temap7"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='filtrof(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Insira um filtro nesse tema para mostrar apenas determinadas informa��es, com base na tabela de atributos.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;filtro... </span>";
						mytreeview1.createItem("temap5"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='tabelaf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Veja a tabela de atributos relacionada a esse tema.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;tabela... </span>";
						mytreeview1.createItem("temap6"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					if (ltema[4] < 4)
					{
						tnome = "<span onclick='editaLegenda(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png") + "' onmouseover=\"javascript:mostradicasf(this,'Abre o editor de legenda, permitindo a altera��o da forma de representa��o desse tema.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;editar legenda... </span>";
						mytreeview1.createItem("temap7"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					tnome = "<span onclick='destacaTema(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png") + "' onmouseover=\"javascript:mostradicasf(this,'Mostra os dados desse tema em uma janela que acompanha o mouse.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;mostra em janela... </span>";
					mytreeview1.createItem("temap8"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
				}
				mytreeview1.createItem("","", imgBranco, false, true, true, ltema[0]);
				break;
			}
		}
	}
	//verifica se clicou para expandir a legenda
	var tema = itemID.split("legenda");
	if (tema.length == 2)
	{
		var expandeLegendaVer = function (retorno)
		{
			if (retorno.data != undefined)
			{
				var retorno = retorno.data;
				if (retorno[0])
				{
					if ((navn) && (!retorno[0].imagem))
					{tabela = retorno;}
					else
					{
						var i = retorno[0].imagem;
						var re = new RegExp("tiff", "g");
						var i = i.replace(re,'png');
						var tabela = "<img src='"+i+"' />";
					}					
					retorno = "";
				}
				else
				{
					var linhas = retorno.split("#");
					if (linhas.length > 1)
					{
						var linhas = retorno.split("|");
						var tabela = "<table >";
						for (linha=0;linha<linhas.length;linha++)
						{
							var colunas = linhas[linha].split("#");
							var id = colunas[0]+"-"+colunas[1];
							var re = new RegExp("'", "g");
							var exp = colunas[3].replace(re,'"');
							tabela += "<tr style='border-top:1px solid rgb(240,240,240);'><td><img src='"+colunas[4]+"' </td><td style='text-align:left'>"+colunas[2]+"</td></tr>";
						}
						tabela += "</table><br>";
					}
					else
					{tabela = retorno;}
				}
				if (!$i(g_arvoreClick+"verdiv"))
				{
					incluir = "<div style='text-align:left' id='"+g_arvoreClick+"verdiv"+"'>"+tabela+"</div>";
					mytreeview1.createItem(g_arvoreClick+"ver", incluir, imgBranco, false, true, true, g_arvoreClick);
				}
				else
				{
					$i(g_arvoreClick+"verdiv").innerHTML = tabela;
				}
			}
		};
		g_arvoreClick = itemID;
		tema = tema[1];
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&template=legenda2.htm&tema="+tema+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2);
		cp.set_response_type("JSON");
		cp.call(p,"criaLegenda",expandeLegendaVer);
	}
}
/*
Function: expandeGrupo

Chama a fun��o ajax que pega a lista de temas de um subgrupo no menu de temas.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeGrupo(itemID)
{
	g_arvoreClick = itemID;
	if ((itemID.search("sgrupo") > -1) && (g_arvoreClicks.search(itemID) == -1 ))
	{
		var codigos = itemID.split("_");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadetemas&grupo="+codigos[1]+"&subgrupo="+codigos[2]+"&g_sid="+g_sid+"&idmenu="+codigos[3];
		var cp = new cpaint();
		//cp.set_debug(2);
		cp.set_response_type("json");
		cp.call(p,"pegaListaDeTemas",processaTemas);
	}
}
/*
Function: pegaListaDeGrupos

Pega a lista de grupos de uma �rvore de tremas.

Parameters:

idmenu - id que identifica a �rvore. Esse id � definido no ms_configura, vari�vel $menutemas. Se idmenu for vazio, ser� considerado o arquivo de menus default do I3Geo, existente no diret�rio menutemas.

listasistemas - sim|nao pega a lista de sistemas para montar a �rvore de sistemas
*/
function pegaListaDeGrupos(idmenu,listasistemas)
{			
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadegrupos&g_sid="+g_sid+"&idmenu="+idmenu+"&listasistemas="+listasistemas;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"pegaListaDeGrupos",processaGrupos);
}
/*
Function: processaGrupos

Recebe os dados da fun��o Ajax com a lista de grupos e subgrupos.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaGrupos(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var idarvore = retorno.data.grupos[retorno.data.grupos.length - 2].idmenu;
		if ($i("buscatema"))
		{var busca = $i("buscatema").value;}
		//$i(objmapa.guiaMenu+"obj").innerHTML = "";
		if (!document.getElementById("buscatema"))
		{
			var insp = "<div style='text-align:left;'><table  cellspacing='0' cellpadding='0' ><tr><td style='text-align:left;font-size:10px;'>";
			insp = insp + "<img src='"+g_locaplic+"/imagens/branco.gif'  height=0 />";
			insp = insp + "<p>&nbsp;procurar:<input class='digitar' type='text' id='buscatema' size='15' value=''  /><img  title='procurar' src='"+$im("tic.png")+"' onclick='procurartemas()' style='cursor:pointer'/></td></tr></table><br>";
			$i(objmapa.guiaMenu+"obj").innerHTML = insp+"<div style='text-align:left;font-size:10px;' id='achados' ></div></div>";
		}
		if (!$i("uplocal"))
		{
			var upload = "";
			if (g_uploadlocal == "sim")
			{upload += "<div id='uplocal' style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='upload()'><img src='"+$im("upload.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;Upload de arquivo local</div>";}
			if (g_downloadbase == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='downloadbase()'><img src='"+$im("connected-s.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;Download de dados</div>";}
			if (g_conectarwms == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='conectarwms()'><img src='"+$im("cmdLink.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;Conectar com servidor WMS</div>";}
			if (g_conectargeorss == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='conectargeorss()'><img src='"+g_locaplic+"/imagens/georss-1.png' style='cursor:pointer;text-align:left'  />&nbsp;Conectar com GeoRss</div>";}
			$i(objmapa.guiaMenu+"obj").innerHTML += upload;
			if (objmapa.navegacaoDir == "sim")
			{
				var temp = "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='navegacaoDir()'><img src='"+g_locaplic+"/imagens/desktop.png' style='cursor:pointer;text-align:left'  />&nbsp;Acesso aos arquivos do servidor</div>";
				$i(objmapa.guiaMenu+"obj").innerHTML += temp;
			}
		}
		//arvore de menus
		mytreeview2 = new Object();
		mytreeview2 = treeviewNew("mytreeview2"+idarvore, "default", objmapa.guiaMenu+"obj", null);
		var nometemas = "Temas";
		if (idarvore != ""){nometemas += " - "+idarvore;}
		mytreeview2.createItem("item1"+idarvore, "<b>"+nometemas+"</b>", g_locaplic+"/imagens/visual/"+g_visual+"/temas.png", true, true, true, null);
		mytreeview2.itemExpand = expandeGrupo;
		for (i=0;i<retorno.data.grupos.length; i++)
		{
			if (retorno.data.grupos[i].nome)
			{
				mytreeview2.createItem("grupo"+i+"a"+idarvore, retorno.data.grupos[i].nome, g_locaplic+"/imagens/visual/"+g_visual+"/folder-s.gif", true, true, true, "item1"+idarvore);
				var ngSgrupo = retorno.data.grupos[i].subgrupos;
				var cor = "rgb(230,230,230)";
				for (sg=0;sg<ngSgrupo.length;sg++)
				{
					if (navm)
					var nomeSgrupo = "<span style='background-color:"+cor+"' >"+ngSgrupo[sg].nome+"</span>";
					else
					var nomeSgrupo = "<span style='background-color:"+cor+"' ><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+ngSgrupo[sg].nome+"</span>";
					mytreeview2.createItem("sgrupo_"+i+"_"+sg+"a"+"grupo"+i+"_"+idarvore, nomeSgrupo, imgBranco, true, true, false, "grupo"+i+"a"+idarvore);
					if (cor == "rgb(230,230,230)"){var cor = "rgb(255,255,255)";}
					else
					{var cor = "rgb(230,230,230)";}
				}
				var ngtSgrupo = retorno.data.grupos[i].temasgrupo;
				for (sgt=0;sgt<ngtSgrupo.length;sgt++)
				{
					var no = ngtSgrupo[sgt];
					var nome = no.nome;
					var lk = no.link;
					if ( lk != " ")
					{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
					var tid = no.tid;
					var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type=\"checkbox\" value="+tid+" onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
					if(navm)
					nomeTema = "&nbsp;"+inp+nome+lk;
					else
					nomeTema = "<span><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
					mytreeview2.createItem("sgrupo_"+i+"_"+sg+"_"+sgt+"_"+idarvore, nomeTema, imgBranco, false, true, false, "grupo"+i+"a"+idarvore);
				}				
			}
			if (retorno.data.grupos[i].temasraiz)
			{
				for (st=0;st<retorno.data.grupos[i].temasraiz.length; st++)
				{
					var no = retorno.data.grupos[i].temasraiz[st];
					var nome = no.nome;
					var lk = no.link;
					if ( lk != " ")
					{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
					var tid = no.tid;
					var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type='checkbox' value="+tid+" onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
					if(navm)
					nomeTema = "&nbsp;"+inp+nome+lk;
					else
					nomeTema = "<span><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
					mytreeview2.createItem("tema"+i+""+st+"a"+idarvore, nomeTema, imgBranco, false, true, true, "item1"+idarvore);
				}
				mytreeview2.createItem("", "", imgBranco, false, true, true, "item1"+idarvore);
			}
		}
		if (g_locsistemas != "")
		{pegavalSistemas(retorno.data.grupos[retorno.data.grupos.length - 1].sistemas);}		
	}
}
/*
Function: processaTemas

Recebe os dados da fun��o Ajax com a lista de temas de um subgrupo.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaTemas(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var cor = "rgb(251,246,184)";
		for (st=0;st<retorno.data.temas.length; st++)
		{
			var nome = retorno.data.temas[st].nome;
			var lk = retorno.data.temas[st].link;
			if ( lk != " ")
			{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
			var tid = retorno.data.temas[st].tid;
			var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type=\"checkbox\" value="+tid+" onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
			if(navm)
			nomeTema = "<span style='background-color:"+cor+"' title='c&oacute;digo: "+tid+"'>"+inp+nome+lk+"</span>";
			else
			nomeTema = "<span style='background-color:"+cor+"' title='c&oacute;digo: "+tid+"'><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
			mytreeview2.createItem("tema"+sg+""+st, nomeTema, imgBranco, false, true, true, g_arvoreClick);
			if (cor == "rgb(251,246,184)"){var cor = "rgb(255,255,255)";}
			else
			{var cor = "rgb(251,246,184)";}
		}
		//inclui um item em branco
		mytreeview2.createItem("vazio", "", imgBranco, false, true, true, g_arvoreClick);
		g_arvoreClicks += ","+g_arvoreClick;
	}
}
/*
Function: pegavalSistemas

Adiciona uma �rvore no menu de adi��o de temas, contendo os sistemas que podem ser executados.

Parameters:

sis - objeto com a lista de sistemas.
*/
function pegavalSistemas(sis)
{
	if(sis.length > 0)
	{
		mytreeviewS = new Object();
		mytreeviewS = treeviewNew("mytreeviewS", "default", objmapa.guiaMenu+"obj", null);
		mytreeviewS.createItem("Sitem1", "<b>Sistemas</b>", g_locaplic+"/imagens/temas.png", true, true, true, null);
		for (ig=0;ig<sis.length;ig++)
		{
			var nomeSis = sis[ig].NOME;
			mytreeviewS.createItem("sis"+ig, nomeSis, g_locaplic+"/imagens/folder-s.gif", true, true, true, "Sitem1");
			var funcoes = sis[ig].FUNCOES;
			for (ig2=0;ig2<funcoes.length;ig2++)
			{
				var nomeFunc = funcoes[ig2].NOME;
				var executar = funcoes[ig2].ABRIR;
				var w = funcoes[ig2].W;
				var h = funcoes[ig2].H;
				var inp = "<img title='Abrir sistema' src='"+$im("open.gif")+"' style='cursor:pointer;text-align:left' onclick='abreSistema(\""+executar+"\",\""+w+"\",\""+h+"\")' />&nbsp;";
				mytreeviewS.createItem("sis"+ig+"func"+ig2, inp+nomeFunc, imgBranco, false, true, false, "sis"+ig);
			}
		}
	}
}
/*
Function: pegaMapas

Recebe a lista de mapas (banners) e monta a apresenta��o.

Adiciona na guia mapas os banners que d�o acesso direto a mapas especiais.

A indica��o do arquivo xml � feita em ms_configura.php

*/
function pegaMapas(retorno)
{
	var ins = "<br>";
	var mapa = retorno.data.mapas;
	for (ig1=0;ig1<mapa.length;ig1++)
	{
		var nome = mapa[ig1].NOME;
		var descricao = mapa[ig1].DESCRICAO;
		var imagem = mapa[ig1].IMAGEM;
		var temas = mapa[ig1].TEMAS;
		var ligados = mapa[ig1].LIGADOS;
		var extensao = mapa[ig1].EXTENSAO;
		var outros = mapa[ig1].OUTROS;
		var lkd = mapa[ig1].LINK;
		var link = g_locaplic+"/ms_criamapa.php?temasa="+temas+"&layers="+ligados;
		if (extensao != "")
		{link += "&mapext="+extensao;}
		if (outros != "")
		{link += "&"+outros;}
		if (lkd != "")
		{var link = lkd;}
		ins += "<div><a href='"+link+"'><img src='"+imagem+"'></a></div><br>";
		ins += "<div><p>"+nome+"</p></div><br>";
	}
	$i("banners").innerHTML = ins;
}
/*
Function: arvoreclick

Adiciona um tema no mapa quando o usu�rio clica em um novo tema no menu de adi��o de temas.

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
Function: pegaTema

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
	for (no=0;no<nos.length; no++){if (nos[no].type == "checkbox"){return nos[no].value;}}
}
/*
Section: redesenho do mapa
*/
/*
Function: autoRedesenho

Controla a op��o de redesenho autom�tico temporizado

Para funcionar, a vari�vel de inicializa��o g_autoRedesenho deve ser > 0

Parameters:

opcao: ativa|desativa|redesenha
*/
function autoRedesenho(opcao)
{
	if (opcao == "desativa")
	{
		g_autoRedesenho = 0;
		clearTimeout(objmapa.tempoRedesenho);
		clearTimeout(objmapa.contaTempoRedesenho);
		objmapa.tempoRedesenho = "";
		objmapa.contaTempoRedesenho = "";
		objmapa.tempoRedesenho = "";
		if ($i("tempoRedesenho"))
		{$i("tempoRedesenho").style.display = "none";}
	}
	if (opcao == "ativa")
	{
		if (($i("tempoRedesenho")) && (g_autoRedesenho > 0))
		{$i("tempoRedesenho").style.display = "block";}
		if (g_autoRedesenho > 0)
		{objmapa.tempoRedesenho = setTimeout('autoRedesenho("redesenha")',g_autoRedesenho);}
		if (($i("tempoRedesenho")) && (g_autoRedesenho > 0))
		{
			$i("tempoRedesenho").innerHTML = g_autoRedesenho/1000;
			objmapa.contaTempoRedesenho = setTimeout('autoRedesenho("contagem")',1000);
		}
	}
	if (opcao == "redesenha")
	{
		clearTimeout(objmapa.tempoRedesenho);
		clearTimeout(objmapa.contaTempoRedesenho);
		remapaf();
		autoRedesenho("ativa");
	}
	if (opcao == "contagem")
	{
		if ($i("tempoRedesenho"))
		{
			$i("tempoRedesenho").innerHTML = parseInt($i("tempoRedesenho").innerHTML) - 1;
			objmapa.contaTempoRedesenho = setTimeout('autoRedesenho("contagem")',1000);
		}
	}
}
/*
Function: remapaf

Prepara o redesenho do mapa de acordo com o que esta visivel ou nao.

Chamado por algumas fun��es que necessitam refazer o desenho do mapa.

Verifica na lista de temas j� adicionados, os temas que est�o ligados e desligados,
Chama a fun��o que verifica na lista de temas adicionais.
*/
function remapaf()
{
	clearTimeout(objmapa.tempo);
	objmapa.tempo = "";
	objmapa.temaAtivo = "";
	if ($i(objmapa.guiaTemas+"obj"))
	{
		var iguias = $i(objmapa.guiaTemas+"obj").getElementsByTagName("input");
		var tsl = new Array();
		var tsd = new Array();
		for (i=0;i<iguias.length; i++)
		{
			if (iguias[i].type == "checkbox")
			{
				if (iguias[i].checked == false)
				{tsd.push(iguias[i].value);}
				if (iguias[i].checked == true)
				{tsl.push(iguias[i].value);}
			}
		}
		var remapaAdicNovos = function remapaAdicNovos(retorno)
		{
			if ($i("buscatema"))
			{
				var g = $i(objmapa.guiaMenu+"obj");
				var iguias = g.getElementsByTagName("input");
				var ta = new Array();
				for (i=0;i<iguias.length; i++)
				{
					if (iguias[i].type == "checkbox")
					{
						if (iguias[i].checked == true)
						{
							ta.push(iguias[i].value);
							iguias[i].checked = false;
						}
					}
				}
				if (ta.length > 0)
				{
					objaguarde.abre("ajaxredesenha","Aguarde...");
					var temp = function()
					{ajaxredesenha("");};
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=adtema&temas="+(ta.toString())+"&g_sid="+g_sid;
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_response_type("JSON");
					cp.call(p,"adicionaTema",temp);
				}
				else
				{
					objaguarde.abre("ajaxredesenha","Aguarde...");
					ajaxredesenha("");
				}
			}
			else
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				ajaxredesenha("");
			}
			objaguarde.fecha("remapa");
		};
		if ((tsd.length > 0) || (tsl.length > 0))
		{
			objaguarde.abre("remapa","Aguarde...refazendo o mapa");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=ligatemas&desligar="+(tsd.toString())+"&ligar="+(tsl.toString())+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"ligaDesligaTemas",remapaAdicNovos);
		}
		else{remapaAdicNovos();}
	}
	else
	{remapaAdicNovos();}
}
/*
Section: eventos
*/
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
Function: calcposf

Calcula a posi��o correta do corpo do mapa e posiciona-o.

Atualiza as vari�veis imagemxi,imagemyi,imagemxref e imagemyref
*/
function calcposf()
{
	imagemxi = 0;
	imagemyi = 0;
	imagemxref = 0;
	imagemyref = 0;
	if(!$i("i3geo")){return;}
	if ($i("i3geo").style.left){imagemxi += parseInt($i("i3geo").style.left);}
	if ($i("i3geo").style.top){imagemyi += parseInt($i("i3geo").style.top);}	
	var dc = $i("i3geo");
	if ($i("img"))
	{var dc = $i("contemImg");}
	if ($i("openlayers_OpenLayers_Container"))
	{var dc = $i("openlayers_OpenLayers_Container");}
	while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo"))
	{
		dc = dc.offsetParent;
		imagemxi = imagemxi + dc.offsetLeft;
		imagemyi = imagemyi + dc.offsetTop;
	}

	if ($i("img"))
	{
		$left("corpoMapa",imagemxi);
		$top("corpoMapa",imagemyi);
		if ($i("i3geo").style.left){$left("corpoMapa",imagemxi - parseInt($i("i3geo").style.left));}
		if ($i("i3geo").style.top){$top("corpoMapa",imagemyi - parseInt($i("i3geo").style.top));}
	}
	if ($i("mostradistancia"))
	{
		$left("mostradistancia",imagemxi);
		$top("mostradistancia",imagemyi);
	}
	
	if ($i("ref"))
	{
		var dc = $i("ref");
		while (dc.offsetParent.id != "i3geo")
		{
			dc = dc.offsetParent;
			imagemxref = imagemxref + dc.offsetLeft;
			imagemyref = imagemyref + dc.offsetTop;
		}
	}
	if ($i("aguarde"))
	{
		$top("aguarde",imagemyi);
		$left("aguarde",imagemxi);
	}
}
/*
Function: movecursor

Move o �cone que segue o mouse quando da movimenta��o sobre o mapa
*/
function movecursor()
{
	var obje = $i("obj").style;
	if ($i("img"))
	{
		eval ("obje." + g_tipotop + "= objposicaocursor.telay + 5 + g_postpx");
		eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 5 + g_postpx");
	}
	else
	{
		eval ("obje." + g_tipotop + "= objposicaocursor.telay - 15 + g_postpx");
		eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 15 + g_postpx");
	}	
	if($i("box1"))
	{
		var bx = $i("box1");
		if (bx.style.visibility != "visible")
		{
			//move o box para a posi��o correta
			with(bx.style)
			{
				left = objposicaocursor.telax + g_postpx;
				top = objposicaocursor.telay + g_postpx;
			}
		}
	}
}
/*
Function: capturaposicao

Captura a posi��o do mouse em fun��o do evento onmousemove sobre o corpo do mapa.

Atualiza o objeto objposicaocursor.
A fun��o de mostrar TIP � definida como "" quando o mouse � movimentado.

Parameters:

exy - objeto evento.
*/
function capturaposicao(exy)
{
	var e = (navn) ? exy : window.event;
	if (navn)
	{
		var storage = e.clientY+window.pageYOffset;
		var storage1 = e.clientX+window.pageXOffset;
		calcposf(); 
		var xfig = e.clientX - imagemxi + pageXOffset;
		var yfig = e.clientY - imagemyi + pageYOffset;
		var xreffig = e.clientX - imagemxref + pageXOffset;
		var yreffig = e.clientY - imagemyref + pageYOffset;
	}
	if (navm)
	{
		var storage = e.clientY+document.body.scrollTop;
		var storage1 = e.clientX+document.body.scrollLeft;
		calcposf(); 
		var xfig = e.clientX - imagemxi + document.body.scrollLeft;
		var yfig = e.clientY - imagemyi + document.body.scrollTop;
		var xreffig = e.clientX - imagemxref + document.body.scrollLeft;
		var yreffig = e.clientY - imagemyref + document.body.scrollTop;
	}
	var teladd = calcddf(xfig,yfig,g_celula,objmapa.extent);
	var teladms = convdmsf(teladd[0],teladd[1]);
	with(objposicaocursor)
	{
		ddx = teladd[0];
		ddy = teladd[1];
		dmsx = teladms[0];
		dmsy = teladms[1];
		telax = storage1;
		telay = storage;
		imgx = xfig;
		imgy = yfig;
		refx = xreffig;
		refy = yreffig;
	}
	if (objmapa.parado!="cancela")
	{objmapa.parado = "nao";}
	ajaxTip = "";
}

/*
Section: quadro de anima��o
*/
/*
Function: gerafilmef

Cria os quadros que ser�o utilizados na fun��o de anima��o e mostrados no mapa.

Cada novo quadro � criado como um objeto quadrofilme. Os quadros criados s�o armazenados no
array global quadrosfilme.

Parameters:

qs - n�mero de quadros
*/
function gerafilmef(qs)
{
	if ($i("lugarquadros"))
	{
		var q = "<table class=tablefilme ><tr><td><img src=\""+g_localimg+"/icon_menuarrow.gif\" title='op&ccedil;&otilde;es' onclick='opcoesQuadros()' style='cursor:pointer'/></td>";
		for (i = 0; i < qs; i++)
		{
			q = q + "<td><img src=\""+g_localimg+"/quadro.png\" id=f"+i+"  onmouseover='filmef(this);mostradicasf(this,\"Quadro - clique para restaurar\",\"quadro\")' onmouseout=\"javascript:mostradicasf(this,'')\" onclick='filmezf(this)' /></td>";
			var qu = new quadrofilme();
			quadrosfilme[i] = qu;
		}
		var finalq = "</tr></table>";
		document.getElementById("lugarquadros").innerHTML = q+finalq;
	}
}
/*
Function: gravaQuadro

Armazena um determinado valor em uma determinada caracter�stica de um objeto quadro.

Parameters:

variavel - par�metro do objeto quadro.

valor - valor que ser� aplicado.
*/
function gravaQuadro(variavel,valor)
{
	var muda = -1;
	if ($i("lugarquadros"))
	{
		var nquadros = quadrosfilme.length;
		if (quadrosfilme[nquadros - 1].imagem != " ")
		{rebobinaf();}
		for (i = 0; i < nquadros; i++)
		{
			if ((eval("quadrosfilme["+i+"]."+variavel+" == ' '")) && (muda < 0))
			{muda = i;}
		}
		eval("quadrosfilme["+(muda)+"]."+variavel+"='"+ valor+"'");
	}
}
/*
Function: avancaQuadro

Avan�a um quadro na lista de quadros, mudando a imagem utilizada na sua representa��o.
*/
function avancaQuadro()
{
	var muda = -1;
	if ($i("lugarquadros"))
	{
		var nquadros = quadrosfilme.length;
		if (quadrosfilme[nquadros - 1].imagem != " ")
		{rebobinaf();}
		for (i = 0; i < nquadros; i++)
		{
			if ((quadrosfilme[i].imagem == " ") && (muda < 0))
			{muda = i;}
		}
		$i("f"+muda).src = g_localimg+"/quadro1.png";
	}
}
/*
Function: filmef

Mostra a imagem armazenada em um quadro no lugar do corpo do mapa.

Parameters:

o - quadro
*/
function filmef(o)
{
	if ($i("lugarquadros"))
	{
		var v = (o.id).replace("f","");
		if (quadrosfilme[v].imagem != " ")
		{$i("img").src = quadrosfilme[v].imagem;}
	}
}
/*
Function: rebobinaf

Rebobina as imagens dos quadros, limpando os par�metros armazenados.
*/
function rebobinaf()
{
	janima = 0;
	var nquadros = quadrosfilme.length;
	for (i = 0; i < nquadros; i++)
	{
		$i("f"+i).src = g_localimg+"/quadro.png";
		with (quadrosfilme[i]){imagem = " ";escala = " ";legenda = " ";extensao = " ";referencia = " ";}
	}
}
/*
Function: filmezf

Muda a extens�o geogr�fica do mapa conforme o valor armazenado em um quado de anima��o.

Parameters:

o - quadro
*/
function filmezf(o)
{
	var quadro = (o.id).replace("f","");
	if (quadrosfilme[quadro].extensao != " ")
	{
		ext = quadrosfilme[quadro].extensao;
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+ext+"&g_sid="+g_sid;
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"mudaExtensao",ajaxredesenha);
	}
}
/*
Function: filmeanimaf

Carrega as imagens armazenadas nos quadros de anima��o quadros.
*/
function filmeanimaf()
{
	preLoad = new Array();
	for (i = 0; i < quadrosfilme.length; i++)
	{
		$i("f"+i).src = g_localimg+"/quadro.png";
		if (quadrosfilme[i].imagem != " ")
		{
			preLoad[i] = new Image();
			preLoad[i].src = quadrosfilme[i].imagem;
		}
	}
	filmeanimarodaf(0);
}
/*
Function: filmeanimarodaf

Roda a animacao usando as imagens armazenadas nos quadros de anima��o quadros.
*/
function filmeanimarodaf(janima)
{
	if (janima < quadrosfilme.length)
	{
		$i("img").src = preLoad[janima].src;
		$i("f"+janima).src = g_localimg+"/quadro1.png";
		janima = janima + 1;
		var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
		var ti = doc.getElementById("tempoanima").value;
		t = setTimeout('filmeanimarodaf('+janima+')',ti);
	}
}
/*
Function: quadrofilme

Cria um objeto quadro de anima��o. Cada quadro � utilizado para armazenar par�metros de um mapa que foi visto na tela.
� utilizado pela fun��o que lista as imagens j� vistas no mapa e pela fun��o que retorna a um determinado zoom do mapa.

Methods:

imagem - URL da imagem

escala - escala do mapa

legenda - URL da legenda do mapa

extensao - extens�o geogr�fica do mapa com valores separados por espa�o

referencia - URL do mapa de refer�ncia
*/
function quadrofilme()
{
	this.imagem = " ";
	this.escala = " ";
	this.legenda = " ";
	this.extensao = " ";
	this.referencia = " ";
}
/*
Section: calculos
*/
/*
Function: calculadistancia

Calcula a dist�ncia entre dois pontos.

Parameters:

lga - x inicial.

lta - y inicial

lgb - x final

ltb - y final
*/
function calculadistancia(lga,lta,lgb,ltb) //0ms
{
	//calculo baseado no site http://www.wcrl.ars.usda.gov/cec/java/lat-long.htm
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
/*
Function: convdmsddf

Converte dms em dd.

Parameters:

cd - grau.

cm - minuto.

cs - segundo

Returns:

Coordenada em dd.
*/
function convdmsddf(cd,cm,cs)
{
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
	return (dd);
}
/*
Function: calcddf

Converte o x,y de unidades de tela para d�cimo de grau.

Parameters:

xfign - x em valores de imagem.

yfign - y em coordenadas de imagem.

g_celula - tamanho no terreno do pixel da imagem.

imgext - extens�o geogr�fica do mapa.

Returns:

Coordena em dd.
*/
function calcddf(xfign,yfign,g_celula,imgext)
{
	if (navm)
	{
	 xfign = xfign - 2.2;
	 yfign = yfign - 2.7;
	}
	if (navn)
	{
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
/*
Function: convdmsf

Converte dd em dms.

Parameters:

x - coordenada x.

y - coordenada y.

Returns:

Array com o valor de x [0] e y [1] no formato dd mm ss
*/
function convdmsf(x,y)
{
	var m = 0;
	var s = 0;
	var dx = parseInt(x);
	if (dx > 0)
	{var restod = x - dx;}
	if (dx < 0)
	{restod = (x * -1) - (dx * -1);}
	dx = dx;
	if (restod != 0)
	{
		var mm = restod * 60;
		var m = parseInt(restod * 60);
		var restos = mm - m;
		var mx = m;
		if (restos != 0)
		{
			var s = restos * 60;
			var s = (s+"_").substring(0,5);
			var sx = s;
		}
		else  { s = "00.00" }
	}
	else
	{
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
	if (restod != 0)
	{
		var mm = restod * 60;
		var m = parseInt(restod * 60);
		var restos = mm - m;
		var my = m;
		if (restos != 0)
		{
			var s = restos * 60;
			s = (s+"_").substring(0,5);
			var sy = s;
		}
		else  { var s = "00.00";}
	}
	else
	{
		var my = "00";
		var sy = "00.00";
	}
	if (m.length == 2){m = "0"+m;}
	if (s*1 < 10){s = "0"+s;}
	var yv = dy+" "+my+" "+sy;
	var res = new Array();
	res[0] = xv;
	res[1] = yv;
	if ($i("localizarxy"))
	{
		$i("xg").value = dx;
		$i("xm").value = mx;
		$i("xs").value = sx;
		$i("yg").value = dy;
		$i("ym").value = my;
		$i("ys").value = sy;

	}
	return res;
}
/*
Function: convddtela

Converte coordenadas dd em coordenadas de tela.

Parameters:

vx - coordenada x.

vy - coordenada y.

docmapa - objeto que cont�m o objeto imagem.

Returns:

Array com o valor de x [0] e y [1]
*/
function convddtela(vx,vy,docmapa)
{
	if(!docmapa)
	{var docmapa = window.document;}
	var dc = docmapa.getElementById("img");
	imgext = objmapa.extent;
	varimgext = imgext.split(" ");
	vx = (varimgext[0] * -1) - (vx * -1);
	vy = (vy * -1) + (varimgext[3] * 1);
	c = objmapa.cellsize * 1;
	xy = new Array();
	xy[0] = (vx  / c) + imagemxi;
	xy[1]  = (vy / c) + imagemyi;
	return (xy);
}
/*
Function: posicaomouse

Cria um objeto que guarda a posi��o do mouse na tela. A posi��o � medida em rela��o a janela do navegador.

Methods:

x - coordenada x em valores de tela

y - coordenada y em valores de tela
*/
function posicaomouse()
{
	this.x = 0;
	this.y = 0;
}
/*
Function: posicaocursor

Cria um objeto que guarda a posi��o do mouse no corpo do mapa. A posi��o � medida em rela��o � posi��o do mapa no navegador.

Methods:

ddx - coordenada x em d�cimo de grau

ddy - coordenada y em d�cimo de grau

dmsx - coordenada x em grau, minuto e segundo

dmsy - coordenada y em grau, minuto e segundo

telax - coordenada x em valores de tela

telay - coordenada y em valores de tela

imgx - coordenada x em rela��o ao mapa

imgy - coordenada y em rela��o ao mapa

refx - coordenada x em rela��o ao mapa de refer�ncia

refy - coordenada y em rela��o ao mapa de refer�ncia
*/
function posicaocursor()
{
	this.ddx = 0;
	this.ddy = 0;
	this.dmsx = '';
	this.dmsy = '';
	this.telax = 0;
	this.telay = 0;
	this.imgx = 0;
	this.imgy = 0;
	this.refx = 0;
	this.refy = 0;
}
/*
Function: pontosdist

Armazena coordenadas no objeto pontosdist para calculo de distancia
*/
function pontosdist()
{
	this.xpt = new Array();
	this.ypt = new Array();
	this.dist = new Array();
}
/*
Section: outros
*/
/*
Function: inseremarcaf

Insere um ponto no mapa.

Os pontos s�o inseridos em um contaier de pontos e mostrados tempor�riamente como uma imagem.
Utilizado pela fun��o de medi��o de dist�ncias.

Parameters:

xi - coordenada x.

yi - coordenada y.
*/
function inseremarcaf(xi,yi)
{
	//verifica se existe o container para os pontos
	if (!$i("pontosins") )
	{
		var novoel = document.createElement("div");
		novoel.id = "pontosins";
		with(novoel.style){position = "absolute";top = parseInt($i("img").style.top);left = parseInt($i("img").style.left);}
		document.body.appendChild(novoel);
	}
	var container = $i("pontosins");
	var novoel = document.createElement("div");
	with (novoel.style){position = "absolute";zIndex=2000;top=(yi - 2)+"px";left=(xi - 2)+"px";width="4px";height="4px";}
	var novoimg = document.createElement("img");
	novoimg.src=g_locaplic+"/imagens/dot1.gif";
	with (novoimg.style){width="4px";height="4px";zIndex=2000;}
	novoel.appendChild(novoimg);
	container.appendChild(novoel);
}
/*
Function: limpacontainerf

Limpa o container de pontos.
*/
function limpacontainerf()
{
	if ($i("pontosins") )
	{$i("pontosins").innerHTML = "";}
	if ($i("mostradistancia"))
	{$i("mostradistancia").style.display="none";}
}


	YAHOO.widget.ResizePanel = function(el, userConfig)
	{
	    if (arguments.length > 0) 
	    {YAHOO.widget.ResizePanel.superclass.constructor.call(this, el, userConfig);}
	};
	YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE = "yui-resizepanel";
	YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE = "resizehandle";
	YAHOO.extend
	(
		YAHOO.widget.ResizePanel, YAHOO.widget.Panel,
		{
    		init: function(el, userConfig) 
    		{
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
        		function initResizeFunctionality()
        		{
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
            		this.ddResize.onMouseDown = function(e)
            		{
                		nStartWidth = oInnerElement.offsetWidth;
                		nStartHeight = oInnerElement.offsetHeight;
                		if (YAHOO.env.ua.ie && document.compatMode == "BackCompat")
                		{nBodyOffset = 0;}
                		else
                		{
                    		nBodyBorderTopWidth = parseInt(Dom.getStyle(oBody, "borderTopWidth"), 10),
                    		nBodyBorderBottomWidth = parseInt(Dom.getStyle(oBody, "borderBottomWidth"), 10),
                    		nBodyTopPadding = parseInt(Dom.getStyle(oBody, "paddingTop"), 10),
                    		nBodyBottomPadding = parseInt(Dom.getStyle(oBody, "paddingBottom"), 10),
                    		nBodyOffset = nBodyBorderTopWidth + nBodyBorderBottomWidth + nBodyTopPadding + nBodyBottomPadding;
                		}
                		me.cfg.setProperty("width", nStartWidth + "px");
                		aStartPos = [Event.getPageX(e), Event.getPageY(e)];
            		};
            		this.ddResize.onDrag = function(e)
            		{
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
        		function onBeforeShow()
        		{
           			initResizeFunctionality.call(this);
           			this.unsubscribe("beforeShow", onBeforeShow);
        		};
        		function onBeforeRender()
        		{
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
    		{return "ResizePanel " + this.id;};
		}
	);
//testa se esse script foi carregado
function testafuncoes()
{}

/*
Title: Ferramentas

Abre ou executa determinadas opera��es de manipula��o do mapa.

Normalmente, as fun��es abrem uma janela interna no i3geo

File: ferramentas.js

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
Section: propriedades do mapa
*/
/*
Function: temporizador

Define o intervalo de tempo para redesenho autom�tico do mapa.
*/
function autoredesenha()
{wdocaf("300px","180px",g_locaplic+"/ferramentas/opcoes_autoredesenha/index.htm","","","Temporizador");}
/*
Function: salvaMapa

Salva o map file localmente
*/
function salvaMapa()
{wdocaf("300px","180px",g_locaplic+"/ferramentas/salvamapa/index.htm","","","Salva mapa");}
/*
Function: carregaMapa

Carrega um map file salvo
*/
function carregaMapa()
{wdocaf("300px","150px",g_locaplic+"/ferramentas/carregamapa/index.htm?urlatual="+window.location,"","","Carrega mapa");}
/*
Function: convertews

Converte mapa em web service
*/
function convertews()
{wdocaf("440px","280px",g_locaplic+"/ferramentas/convertews/index.htm","","","Web service");}
/*
Function: queryMap

Altera as propriedades da exibi��o dos elementos selecionados.
*/
function queryMap()
{wdocaf("210px","170px",g_locaplic+"/ferramentas/opcoes_querymap/index.htm","","","Querymap");}
/*
Function: template

Muda o template do mapa atual.
*/
function template()
{wdocaf("300px","400px",g_locaplic+"/ferramentas/template/index.htm","","","Template");}
/*
Function: ativaLogo

Ativa ou desativa a logo marca.

*/
function ativaLogo()
{
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=ativalogo&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"ativalogo",ajaxredesenha);
}
/*
Function: tamanho

Muda o tamanho do mapa
*/
function tamanho()
{wdocaf("150px","170px",g_locaplic+"/ferramentas/opcoes_tamanho/index.htm","","","Tamanho");}
/*
Function: tipoimagem

Define um filtro sobre a imagem gerada alterando susas caracter�sticas
*/
function tipoimagem()
{wdocaf("300px","200px",g_locaplic+"/ferramentas/tipoimagem/index.htm","","","Tipo de imagem");}
/*
Function: corFundo

Altera a cor do fundo atual.
*/
function corFundo()
{wdocaf("210px","170px",g_locaplic+"/ferramentas/opcoes_fundo/index.htm","","","Fundo");}
/*
Section: propriedades de um tema
*/
/*
Function: destacaTema

Cria imagem de destaque

Parameters:

tema - id ue identifica o tema no map file.
*/
function destacaTema(tema)
{
	if ($i("img_d"))
	{$i("img_d").src = "";}
	if ($i(objmapa.guiaTemas+"obj"))
	{
		var iguias = $i(objmapa.guiaTemas+"obj").getElementsByTagName("input");
		for (i=0;i<iguias.length; i++)
		{
			if ((iguias[i].type == "checkbox") && (iguias[i].value == tema) && (iguias[i].checked == true))
			{alert("Desligue o tema antes de destacar");return;}
		}
	}
	objaguarde.abre("ajaxdestaca","Aguarde...gerando imagem");
	g_destaca = tema;
	var p =g_locaplic+"/classesphp/mapa_controle.php?funcao=geradestaque&tema="+tema+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"geraDestaque",ajaxdestaca);
	if ($i("img"))
	{$i("img").title = "utilize as teclas +- para mudar o tamanho do destaque";}
}
/*
Function: excluitemaf

Exclui um tema do mapa

Parameters:

celula - objeto que foi clicado nas op��es de um tema.
*/
function excluitemaf(tema)
{
	g_operacao = "excluitema";
	//remove o tema do DOM e seus filhos
	var p = document.getElementById("idx"+tema).parentNode.parentNode.parentNode;
	do
	{
		p.removeChild(p.childNodes[0]);
	} while (p.childNodes.length > 0);
	p.parentNode.removeChild(p);
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=excluitema&temas="+tema+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"excluiTemas",ajaxredesenha);
	objmapa.temaAtivo = "";
}
/*
Function: sobetemaf

Sobe um tema na ordem de desenho

Parameters:

celula - objeto que foi clicado nas op��es de um tema.
*/
function sobetemaf(tema)
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=sobetema&tema="+tema+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"sobeTema",ajaxredesenha);
}
/*
Function: descetemaf

Desce um tema na ordem de desenho

Parameters:

celula - objeto que foi clicado nas op��es de um tema.
*/
function descetemaf(tema)
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?&funcao=descetema&tema="+tema+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"desceTema",ajaxredesenha);
}
/*
Function: zoomtemaf

Zoom para o tema

Parameters:

celula - objeto que foi clicado nas op��es de um tema.
*/
function zoomtemaf(tema)
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomtema&tema="+tema+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("JSON");
	cp.call(p,"zoomTema",ajaxredesenha);
}
/*
Function: limpaseltemaf

Limpa a selecao do tema

Parameters:

celula - objeto que foi clicado nas op��es de um tema. Passado para a fun��o pegatema.
*/
function limpaseltemaf(celula)
{
	g_operacao = "limpasel";
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=limpasel&tema="+pegaTema(celula)+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("JSON");
	cp.call(p,"selecaoLimpa",ajaxredesenha);
}
/*
Function: mudatranspf

Muda a transparencia de um tema

Parameters:

celula - objeto que foi clicado nas op��es de um tema. Passado para a fun��o pegatema.
*/
function mudatranspf(idtema)
{
	g_operacao = "transparencia";
	//o campo input com o valor possui o prefixo 'tr' seguido pelo c�digo do tema
	if ($i("tr"+idtema))
	{var valor = $i("tr"+idtema).value;}
	else
	{alert("Ocorreu um erro");}
	if (valor != "")
	{
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudatransp&tema="+idtema+"&valor="+valor+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"mudaTransparencia",ajaxredesenha);
	}
	else
	{alert("Valor n�o definido.");}
}
/*
Function: mudanomef

Muda o nome de um tema

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function mudanomef(idtema)
{
	g_operacao = "mudanome";
	if($i("nn"+idtema))
	{var valor = $i("nn"+idtema).value;}
	else
	{alert("Ocorreu um erro");}
	if (valor != "")
	{
		var p = $i("nometema"+idtema);
		$i("nometema"+idtema).innerHTML = valor;
		//valor = htmlAcentos(valor);
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudanome&tema="+idtema+"&valor="+valor+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2);
		cp.set_response_type("JSON");
		cp.call(p,"mudaNome",ajaxredesenha);
	}
	else
	{alert("Nome n�o definido");}
}
/*
Function: toponimiaf

Op��es de topon�mia de um tema.

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function toponimiaf(idtema)
{wdocaf("350px","340px",g_locaplic+"/ferramentas/toponimia/index.htm?tema="+idtema,"","","Topon&iacute;mia");}
/*
Function: filtrof

Op��es de filtragem de um tema.

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function filtrof(idtema)
{wdocaf("480px","250px",g_locaplic+"/ferramentas/filtro/index.htm?tema="+idtema,"","","Filtro");}
/*
Section: an�lise geogr�fica
*/
/*
Function: pontosdistri

An�lises de distribui��o de pontos
*/
function pontosdistri()
{
	//a vari�vel g_r indica se o R est� instalado no servidor e � definida na inicializa��o do I3Geo
	if (g_r == "nao")
	{alert("Op��o n�o dispon�vel");}
	else
	{wdocaf("400px","300px",g_locaplic+"/ferramentas/pontosdistri/index.htm","","","Distribui&ccedil;&atilde;o de pontos");}
}

/*
Function: pontoempoligono

Cruza um tema de pontos com um ou mais temas poligonais e gera um novo tema
*/
function pontoempoligono()
{wdocaf("400px","250px",g_locaplic+"/ferramentas/pontoempoligono/index.htm","","","Ponto em pol&iacute;gono");}
/*
Function: nptPol

Cruza um tema de pontos com um ou tema poligona e gera um novo tema com o n�mero de pontos em cada pol�gono
*/
function nptPol()
{wdocaf("400px","200px",g_locaplic+"/ferramentas/nptpol/index.htm","","","Pontos por pol&iacute;gono");}
/*
Function: buffer

Gera um buffer em elementos selecionados
*/
function buffer()
{wdocaf("400px","180px",g_locaplic+"/ferramentas/buffer/index.htm","","","Entorno");}
/*
Function: centroide

Gera um tema com os centroides dos elementos selecionados
*/
function centroide()
{wdocaf("400px","180px",g_locaplic+"/ferramentas/centroide/index.htm","","","Centr�ide");}
/*
Function: analisaGeometrias

Sistema de an�lise de geometrias
*/
function analisaGeometrias()
{
	g_tipoacao = "selecao";
	mudaiconf("selecao");
	pontosdistobj = new pontosdist();
	objmapa.temaAtivo = "";
	wdocaf("500px","400px",g_locaplic+'/ferramentas/analisageometrias/index.htm',"","","Sele&ccedil;&atilde;o");
}
/*
Section: grades
*/
/*
Function: gradePontos

Gera grade de pontos
*/
function gradePontos()
{wdocaf("400px","250px",g_locaplic+"/ferramentas/gradepontos/index.htm","","","Grade de pontos");}
/*
Function: gradePoligonos

Gera grade de poligonos
*/
function gradePol()
{wdocaf("400px","250px",g_locaplic+"/ferramentas/gradepol/index.htm","","","Grade de pol&iacute;gonos");}
/*
Function: gradeHex

Gera grade de hex�gonos
*/
function gradeHex()
{wdocaf("400px","250px",g_locaplic+"/ferramentas/gradehex/index.htm","","","Grade de hex&aacute;gonos");}

/*
Function: gradeCoord

Gera grade de coordenadas
*/
function gradeCoord()
{wdocaf("300px","180px",g_locaplic+"/ferramentas/gradecoord/index.htm","","","Grade de coordenadas");}
/*
Section: atributos
*/
/*
Function: procuraratribf

Procurar atributos na tabela do tema

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function procuraratribf(idtema)
{wdocaf("550px","340px",g_locaplic+"/ferramentas/busca/index.htm?tema="+idtema,"","","Procurar");}
/*
Function: tabelaf

Abre a tabela de atributos de um tema.

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function tabelaf(idtema)
{wdocaf("500px","400px",g_locaplic+"/ferramentas/tabela/index.htm?tema="+idtema,"","","Tabela");}
/*
Function: etiquetas

Abre a tabela de atributos de um tema.

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function etiquetas(idtema)
{wdocaf("400px","300px",g_locaplic+"/ferramentas/etiqueta/index.htm?tema="+idtema,"","","Etiquetas");}
/*
Section: legenda
*/
/*
Function: opcoesLegenda

Ativa ou desativa a legenda incluida na imagem do mapa e define seus par�metros.

*/
function opcoesLegenda()
{wdocaf("300px","280px",g_locaplic+"/ferramentas/opcoes_legenda/index.htm","","","Legenda");}
/*
Function: abreCor

Abre a paleta de cores

Parameters:

janela - id da janela que disparou a janela de cores

elemento - elemento da janela que receber� os valores de cor selecionada
*/
function abreCor(janela,elemento)
{wdocaf2("380px","220px",g_locaplic+"/ferramentas/colorpicker/index.htm?doc="+janela+"&elemento="+elemento,"","","Cor");}
/*
Function: editaLegenda

Editor de legenda de um tema

Parameters:

idtema - id que identifica o tema conforme definido no map file
*/
function editaLegenda(idtema)
{wdocaf("490px","340px",g_locaplic+"/ferramentas/legenda/index.htm?tema="+idtema,"","","Legenda");}
/*
Section: adi��o de temas
*/
/*
Function: navegacaoDir

Adiciona temas navegando pelos diret�rios do servidor
*/
function navegacaoDir()
{wdocaf("550px","350px",g_locaplic+"/ferramentas/navegacaodir/index.htm","","","Diret&oacute;rios");}
/*
Function: conectarwms

Adiciona temas tendo como fonte um web service do tipo wms
*/
function conectarwms()
{wdocaf("400px","300px",g_locaplic+"/ferramentas/conectarwms/index.htm","","","WMS");}
/*
Function: conectarwfs

Adiciona temas tendo como fonte um web service do tipo wfs
*/
function conectarwfs()
{wdocaf("400px","300px",g_locaplic+"/ferramentas/conectarwfs/index.htm","","","WFS");}
/*
Function: conectargeorss

Adiciona temas tendo como fonte um georss
*/
function conectargeorss()
{wdocaf("400px","300px",g_locaplic+"/ferramentas/conectargeorss/index.htm","","","GeoRSS");}
/*
Function: abreSistema

Abre um programa definido no menu de sistemas.

A lista de sistemas � lida de um arquivo xml definido no ms_configura.php

Parameters:

endereco - programa que ser� executado.
w - largura da janela.
h - altura da janela.
*/
function abreSistema(endereco,w,h)
{
	if(endereco != "")
	{wdocaf(w+"px",h+"px",endereco,"","","Sistemas");}
	else
	{alert("Endere�o n�o definido");}
}
/*
Function: upload

Faz o upload de shape file
*/
function upload()
{wdocaf("300px","200px",g_locaplic+"/ferramentas/upload/index.htm","","","Upload");}
/*
Section: outros
*/
/*
Function: pegaimagens

Pega as imagens armazenadas nos quadros e mostra em uma nova janela
*/
function pegaimagens()
{
	if ($i("lugarquadros"))
	{
		//abre uma nova janela do navegador
		if (navm) {var wi = window.open("",null,"width=550,height=650,resizable=yes,scrollbars=yes");}
		if (navn) {var wi = window.open("","Cor","width=550,height=650,resizable,scrollbars");}
		wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Click com o bot&atilde;o da direita do mouse sobre a imagem para fazer o download<br>");
		//pega os dados do objeto quadrosfilme e escreve na nova janela
		var mensagem = "<br><b>N&atilde;o existem imagens guardadas.";
		for (i = 1; i < (quadrosfilme.length); i++)
		{
			if (quadrosfilme[i].imagem != " ")
			{
				wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Imagem: "+i+"<br>");
				wi.document.write("<p style='font-size: 12px; font-family: verdana, arial, helvetica, sans-serif;'>Abrang&eacute;ncia: "+quadrosfilme[i].extensao+"<br>");
				wi.document.write("<img src="+quadrosfilme[i].imagem+">");
				wi.document.write("<img src="+quadrosfilme[i].referencia+">");
				//wi.document.write("<img src="+quadrosfilme[i].legenda+">");
				//wi.document.write("<img src="+quadrosfilme[i].escala+"><br>");
				mensagem = "<br>Fim"
			}
		}
		wi.document.write(mensagem);
	}
}

/*
Function: abreDoc

Abre a documentacao do sistema.
*/
function abreDoc()
{window.open(g_locaplic+"/documentacao/index.html");}

/*
Function: downloadbase

Lista temas para download
*/
function downloadbase()
{window.open(g_locaplic+"/datadownload.htm");}
/*
Function: download

Faz o download de um tema

Parameters:

idtema - id ue identifica o tema no map file.
*/
function download(idtema)
{wdocaf("300px","150px",g_locaplic+"/ferramentas/download/index.htm?tema="+idtema,"","","Download");}

/*
Function: opcoesQuadros

Op��es de anima��o dos quadros de armazenamento de imagens.
*/
function opcoesQuadros()
{wdocaf("150px","150px",g_locaplic+"/ferramentas/opcoes_quadros/index.htm",objposicaomouse.x - 75,objposicaomouse.y - 160,"Quadros");}
/*
Function: opcoesEscala

Op��es da barra de escala.
*/
function opcoesEscala()
{wdocaf("250px","300px",g_locaplic+"/ferramentas/opcoes_escala/index.htm",objposicaomouse.x - 75,objposicaomouse.y - 260,"Escala");}

//testa se esse script foi carregado
function testaferramentas()
{}

/*
Title: Redesenho

Executa as opera��es de redesenho do mapa.

Obt�m os par�metros necess�rios ao funcionamento da interface, como resolu��o, escala, etc.

File: redesenho.js

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
Function: ajaxexecASXml

Executa uma chamada ajax no modo ass�ncrono retornando o resultado em XML.

Parameters:

programa - programa que ser� executado.
funcao - fun��o que tratar� o resultado.

Returns:

O resultado em um objeto DOM. Se o retorno contiver a palavra "Erro", � gerado um alert.

See Also:

<ajaxhttp>
*/
function ajaxexecASXml(programa,funcao)
{
	if (programa.search("http") == 0)
	{
		var h = window.location.host;
		if (programa.search(h) < 0)
		{
			alert("OOps! Nao e possivel chamar um XML de outro host.\nContacte o administrador do sistema.\nConfigure corretamente o ms_configura.php");
			return;
		}
	}	
	var ohttp = ajaxhttp();
	ohttp.open("GET",programa,true);
	var retorno = "";
	ohttp.onreadystatechange=function()
	{
		if (ohttp.readyState==4)
		{
			var retorno = ohttp.responseText;
			if (retorno != undefined)
			{
				if (document.implementation.createDocument)
				{
					var parser = new DOMParser();
					var dom = parser.parseFromString(retorno, "text/xml");
				}
				else
				{
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
/*
Function: ajaxEscalaGrafica

Substitu� a imagem da escala gr�fica pela �ltima gerada.

Parameters:

retorno - string no formato "var scaimagem='nome da imagem'".

*/
function ajaxEscalaGrafica(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		eval(retorno.data);
		if ($i("imagemEscalaGrafica"))
		{
			var m = new Image();
			m.src = scaimagem;
			$i("imagemEscalaGrafica").src=m.src;
			//atualiza quadro
			gravaQuadro("escala",scaimagem);
		}
	}
}
/*
Function: ajaxReferencia

Substitu� a imagem do mapa de refer�ncia pela �ltima gerada.

Parameters:

retorno - string no formato "var refimagem='nome da imagem'".
*/
function ajaxReferencia(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		eval(retorno.data);
		if ($i("imagemReferencia"))
		{
			var m = new Image();
			m.src = refimagem;
			$i("imagemReferencia").src=m.src;
			if ((objmapa.scale < 15000000) && (objmapa.scale > 10000000))
			{
				$i("refmensagem").innerHTML = "Para navegar no mapa principal, voc&ecirc; pode clicar em um ponto no mapa de refer&ecirc;ncia.";
				$i("refmensagem").style.fontSize="10px";
			}
			else
			{
				$i("refmensagem").innerHTML = "";
				$i("refmensagem").style.fontSize="0px";
			}
		}
		gravaQuadro("referencia",refimagem);
	}
}
/*
Function: ajaxLegendaHTML

Substitu� a legenda do mapa pela �ltima gerada.

Parameters:

retorno - string HTML com a legenda.
*/
function ajaxLegendaHTML(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var s = g_locaplic+"/imagens/solta.gif";
		$i("legenda").innerHTML = "<img src="+s+" title='clique para liberar'/><div id='corpoLegi' >"+ retorno.data + "</div>";
		g_legendaHTML = retorno.data;
		//
		//verifica se a janela m�vel existe e preenche com a legenda se for o caso
		//
		if ($i("moveLegi"))
		{$i("wlegenda").innerHTML = g_legendaHTML;}
		//
		//abre a janela m�vel com a legenda quando o usu�rio clica no �cone solta.gif definido acima
		//
		$i("legenda").onclick = function()
		{
			//
			//cria a janela m�vel para a legenda se j� n�o existir
			//
			if (!$i("moveLegi"))
			{
				var novoel = document.createElement("div");
				novoel.id = "moveLegi";
				novoel.style.display="block";
				var temp = '<div class="hd">Legenda</div>';
				temp += '<div id="wlegenda" style="text-align:left;background-color:white" >';
				temp += g_legendaHTML+"</div>";
				novoel.innerHTML = temp;
				document.body.appendChild(novoel);
				YAHOO.namespace("moveLegi.xp");
				YAHOO.moveLegi.xp.panel = new YAHOO.widget.Panel("moveLegi", {width:"300px", fixedcenter: true, constraintoviewport: false, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
			}
			YAHOO.moveLegi.xp.panel.render();
			YAHOO.moveLegi.xp.panel.show();
		};
	}
}
/*
Function: ajaxLegendaImagem

Armazena a imagem da legenda na lista de quadros de anima��o.

Parameters:

retorno - string no formato "var legimagem='nome da imagem'".
*/
function ajaxLegendaImagem(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		eval(retorno.data);
		if ($i("lugarquadros"))
		{gravaQuadro("legenda",legimagem);}
	}
}
/*
Function: ajaxCorpoMapa

Atualiza a imagem do corpo do mapa e redesenha o entorno se for necess�rio.

Parameters:

retorno - string no formato "var mapimagem='nome da imagem'".
*/
function ajaxCorpoMapa(retorno)
{
	$i("mst").style.display="block";
	if (!$i("img")){return;}
	objaguarde.abre("ajaxCorpoMapa1","Lendo imagem...");
	//retorno n�o � um objeto CPAINT
	if (retorno.data){retorno = retorno.data;}
	if ((retorno != "erro") && (retorno != undefined))
	{
		eval(retorno);
		$i("img").onload =  function()
		{
			//atualiza quadro
			avancaQuadro();
			gravaQuadro("imagem",mapimagem);
			g_quadrooriginal = mapimagem;
			if ($i("banners"))
			{$i("banners").style.height = objmapa.h;}
			if ($i("legenda"))
			{$i("legenda").style.height = objmapa.h;}
			$i("img").style.width = objmapa.w;
			$i("img").style.height = objmapa.h;
			calcposf();
			objaguarde.fecha("ajaxCorpoMapa1");
			if ($i("imgtemp"))
			{$i("imgtemp").style.display="none";}
			$i("img").onload = "";
		};
		$i("img").src=mapimagem;
	}
	else
	{
		calcposf();
		trataErro();
		alert("Erro no mapa");
	}
}
/*
Function: ajaxredesenha

Prepara o mapa para receber os elementos que compor�o o mapa e chama a fun��o que ir� gerar os novos elementos.

Parameters:

retorno - string indicando se houve erro na fun��o que chamou.
*/
function ajaxredesenha(retorno)
{
	var original = retorno;
	if (retorno.data)
	{var retorno = retorno.data;}
	else {retorno = "";}
	if ((retorno != "erro") && (retorno != undefined))
	{
		if (retorno.search("var mapimagem=") > -1)
		{objaguarde.abre("ajaxiniciaParametros","Aguarde...");ajaxIniciaParametros(original);}
		else
		{
			//algumas vari�eis n� s� retornadas, conforme o programa, ent� devem ser declaradas
			var legimagem = "";
			//pega os parametros do mapa e redesenha
			if($i("img"))
			{
				objaguarde.abre("ajaxiniciaParametros","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=corpo&tipoimagem="+g_tipoimagem+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"redesenhaCorpo",ajaxIniciaParametros);
			}
			objaguarde.fecha("ajaxredesenha");
			if ($i("img_d"))
			{$i("img_d").style.display = "none";}
			g_destaca = "";
			//
			//utilizado na interface openlayers
			//
			//OL = objeto map do openlayers
			//OLI3Geo = objeto layer do openlayers com o mapa do I3Geo
			//
			if ($i("openlayers"))
			{
				$i("openlayers").innerHTML = "";
				var b = objmapa.OL.getExtent();
				criaOL(Math.random()+Math.random()+Math.random()+Math.random());
				objmapa.OL.zoomToExtent(b);
			}
		}
	}
}
/*
Function: ajaxIniciaParametros

Refaz o mapa e os elementos marginais, como legenda, escala, lista de temas, etc.

Parameters:

retorno - string no formato "var variavel='valor'".
*/
function ajaxIniciaParametros(retorno)
{
		if ($i("openlayers"))
		{
			$i("openlayers").innerHTML = "";
			var b = objmapa.OL.getExtent();
			criaOL(Math.random()+Math.random()+Math.random()+Math.random());
			objmapa.OL.zoomToExtent(b);
		}
		//
		//limpa os objetos tips da tela
		//
		for(ot=0;ot<objmapa.objtips.length;ot++)
		{
			if (objmapa.objtips[ot])
			{
				objmapa.objtips[ot].innerHTML = "";
				objmapa.objtips[ot].style.display="none";
			}
		}
		objmapa.objtips = new Array();
		//
		//limpa os pontos digitados no calculo de distancia
		//
		limpacontainerf();
		//
		//mostra a figura que segue o mouse
		//
		if($i("imgh"))
		{$i("imgh").style.display="block";}
		var retorno = retorno.data;
		if ((retorno != "erro") && (retorno != undefined))
		{
			if ($i("imgL"))
			{
				var letras=["N","S","L","O"];
				for (l=0;l<letras.length; l++)
				{$i("img"+letras[l]).src="";}
			}
			temas = "";
			mapscale = "";
			mapexten = "";
			if (retorno != "")
			{eval(retorno);}
			if($i("img"))
			{
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
					$i("imgtemp").style.width = objmapa.w;
					$i("imgtemp").style.height = objmapa.h;
					$i("imgtemp").style.display="block";
					$i("imgtemp").style.backgroundImage = 'url("'+$i("img").src+'")';
				}		
				$i("img").style.width = 0;
				$i("img").style.height = 0;
				$i("img").src = "";
				$i("img").style.left = 0;
				$i("img").style.top = 0;
				ajaxCorpoMapa(retorno);
			}
			//
			//atualiza a legenda
			//
			objmapa.atualizaLegendaHTML();
			//
			//verifica se precisa mudar a lista de temas
			//
			objmapa.atualizaListaTemas(temas);
			//
			//atualiza o indicador de compatibilidade de escala se houve um processo de navegacao
			//
			objmapa.atualizaFarol(mapscale);
			//
			//atualiza mapa de referencia
			//
			objmapa.atualizaReferencia(mapexten);
			//
			//atualliza os valores do objmapa
			//
			objmapa.scale = mapscale;
			g_operacao = "";
			objmapa.temas = temas;
			objmapa.cellsize = g_celula;
			objmapa.extent = mapexten;
			objmapa.temas = temas;
			//
			//arredonda o valor da escala numerica e mostra no mapa se for o caso
			//
			if ($i("escalanum"))
			{$i("escalanum").value=parseInt(mapscale);}
			//
			//atualiza a janela com o valor da extens�o geogr�fica do mapa se for o caso
			//
			if ($i("mensagemt"))
			{$i("mensagemt").value = mapexten;}
			//
			//grava a extensao geogr�fica nova no quadro de anima��o
			//
			gravaQuadro("extensao",mapexten);
			//
			//fecha as janelas de aguarde
			//
			objaguarde.fecha("ajaxiniciaParametros");
			objaguarde.fecha("aguardedoc");
			objaguarde.fecha("ajaxredesenha");
			if (g_lenteaberta == "sim")
			{
				objaguarde.abre("ajaxabrelente","Aguarde...abrindo lente");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2);
				cp.set_response_type("JSON");
				cp.call(p,"lente",ajaxabrelente);
			}
			//
			//atualiza as ferramentas de consulta que dependem da extens�o geogr�fica
			//	
			atualizagoogle();
			atualizascielo();
			atualizawiki();
			atualizaconfluence();
			//
			//atualiza as imagens do entorno do mapa caso essa op��oestiver ativa
			//
			if (g_entorno == "sim")
			{
				geraURLentorno();
				ajustaEntorno();
			}
		}
}
/*
Function: ajaxabrelente

Substitu� a imagem da lente de aumento e mostra no mapa.

Parameters:

retorno - string no formato "largura,altura,imagem".
*/
function ajaxabrelente(retorno)
{
	try
	{
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
		eval ("olente.style." + g_tipoleft + " = imagemxi + g_postpx");
		eval ("olente.style." + g_tipotop + " = imagemyi + g_postpx");
		eval ("oboxlente.style." + g_tipoleft + " = imagemxi + g_postpx");
		eval ("oboxlente.style." + g_tipotop + " = imagemyi + g_postpx");
		oboxlente.style.display='block';
		oboxlente.style.visibility='visible';
		olente.style.display='block';
		olente.style.visibility='visible';
		objaguarde.fecha("ajaxabrelente");
	}
	catch(e){trataErro();}
}
/*
Function: ajaxdestaca

Prepara a imagem utilizada na op��o de abertura de um tema em uma janela.

Parameters:

retorno - nome da imagem.
*/
function ajaxdestaca(retorno)
{
	var retorno = retorno.data;
	var m = new Image();
	m.src = retorno;
	if (!$i("img_d"))
	{
		var novoel = document.createElement("div");
		novoel.id = "div_d";
		document.body.appendChild(novoel);
		$i("div_d").innerHTML = "<input style='position:relative;top:0px;left:0px'' type=image src='' id='img_d' />";
		$i("div_d").style.left = parseInt($i("corpoMapa").style.left);
		$i("div_d").style.top = parseInt($i("corpoMapa").style.top);
		$i("img_d").style.left = 0;
		$i("img_d").style.top = 0;
		$i("img_d").style.width = objmapa.w;
		$i("img_d").style.height = objmapa.h;
		$i("div_d").style.clip = 'rect(0 75 75 0)';
		$i("img_d").src=retorno;
		var novoeli = document.createElement("div");
		novoeli.id = "div_di";
		novoel.appendChild(novoeli);
		$i("div_di").innerHTML = "<p style='position:absolute;top:0px;left:0px'>+-</p>";
	}
	$i("div_d").innerHTML = "";
	var novoel = document.createElement("input");
	novoel.id = "img_d";
	novoel.style.position = "relative";
	novoel.style.top = "0px";
	novoel.style.left = "0px";
	novoel.type = "image";
	novoel.src = m.src;
	novoel.style.display = "block";
	$i("div_d").appendChild(novoel);
	objaguarde.fecha("ajaxdestaca");
}
//testa se esse script foi carregado
function testaajax()
{}
/*
Title: Inicializa��o do i3geo.

Cria o objeto objmapa e inicializa o mapa.

Define as opera��es das funcionalidades principais.

Exemplo:

g_janelaMen = "nao"

objmapa = new Mapa()

objmapa.inicializa()

File: iniciamma.js

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
Section: vari�veis de configura��o
*/
/*
Variable: g_autoRedesenho

Ativa o auto redesenho ap�s um determinado temp.

Ap�s decorrido o tempo definido, o mapa � redesenhado. Se for 0 o temporizador n�o � ativado.
*/
g_autoRedesenho = 0;
/*
Variable: g_sid

Id da se��o atual no servidor.

*/
if (window.location.href.split("?")[1])
{
	g_sid = window.location.href.split("?")[1];
	if (g_sid.split("#")[0])
	{g_sid = g_sid.split("#")[0];}
}
else 
{g_sid = "";}
/*
Variable: imagemxi

Inicializa��o da vari�vel de c�lculo de posicionamento.

*/
imagemxi = 0;
/*
Variable: imagemyi

Inicializa��o da vari�vel de c�lculo de posicionamento.

*/
imagemyi = 0;
/*
Variable: atuaLeg

Vari�vel interna que define se a legenda doc�vel deve ser atualizada.

*/
atuaLeg="nao";
/*
Variable: g_mashuppar

Par�metros de inicializa��o que podem ser utilizados na interface mashup.

Os par�metros s�o os mesmos que podem ser utilizados quando o i3geo � inicializado pelo ms_criamapa.php.

Exemplo: g_mashuppar = "&pontos=-54 -12&temasa=biomas&layers=biomas"
*/
g_mashuppar = "";
/*
Variable: g_operacao

Nome da �ltima opera��o que foi executada.

Dependendo do tipo de opera��o s�o aplicadas as atualiza��es necess�rias aos componentes do mapa. Por exemplo, redesenha o corpo do mapa, atualiza a lista de temas, etc.

Essas opera��es s�o controladas pela fun��o ajaxiniciaparametros.
*/
g_operacao = "";
/*
Variable: g_nomepin

Nome do tema atual que ir� receber dados pontuais ou toponimia.

*/
g_nomepin = "";
/*
Variable: g_arvoreClick

Item da �rvore de temas que foi clicado por �ltimo. Guarda o identificador do n� da �rvore de temas.
*/
g_arvoreClick = "";
/*
Variable: g_arvoreClicks

Guarda os n�s da �rvore de temas que j� foram clicados. Evita que a fun��o ajax que busca os filhos de um n� na �rvore de temas seja executado novamente, recuperando o que j� est� na mem�ria.
*/
g_arvoreClicks = "";
/*
Variable: g_movedoca (depreciado)

Indica o status (0 ou 1) atual da janela interna.
Se a janela estiver sendo movimentada, o status � igual a 1.
*/
g_movedoca = 0;
/*
Variable: g_movedocac (depreciado)

Indica o status (0 ou 1) atual da janela para sele��o de cores.
Se a janela estiver sendo movimentada, o status � igual a 1.
*/
g_movedocac = 0;
/*
Variable: g_movedocar (depreciado)

Indica o status (0 ou 1) atual da janela do mapa de refer�ncia.
Se a janela estiver sendo movimentada, o status � igual a 1.
*/
g_movedocar = 0;
/*
Variable: g_tipoacao

Tipo de a��o que est� sendo executada.
Quando o usu�rio clica no mapa, essa vari�vel � pesquisada para definir o tipo de opera��o que deve ser executada.
� definida quando o usu�rio seleciona uma determinada ferramenta do i3Geo.
*/
g_tipoacao = "zoomli";
/*
Variable: g_realca

Define se o realce do mapa deve ficar ativo.
O realce � um box que segue o mouse, por ter uma colora��o diferente, provoca um efeito de destaque.
*/
g_realca = "nao";
/*
Variable: g_destaca

Armazena o c�digo do tema que est� em destaque.
Um tema em destaque � mostrado em um ret�ngulo que segue o mouse.
O tema destacado � selecionado nas op��es de cada tema.
*/
g_destaca = "";
/*
Variable: g_lenteaberta

Indica se a lente de aumento est� ou n�o aberta.
� definida quando o usu�rio clica no �cone "lente".
Quando o mapa � redesenhado, essa vari�vel � checada para verificar se a lente deve ser refeita.
*/
g_lenteaberta = "nao";
/*
Variable: g_hlpt

Indica qual o nome do arquivo de ajuda que ser� aberto quando a letra "a" for digiada.
� definida quando o usu�rio passa o mouse sobre um �cone ou outro objeto.
*/
g_hlpt = "";
/*
Variable: g_panM

Indica se o mapa deve ou n�o ser deslocado.
� utilizada no controle da fun��o "pan".
*/
g_panM = "nao";
/*
Variable: quadrofilme

Array que guarda os objetos do quadro de anima��o.
Cada elemento guarda um objeto com par�metros espec�ficos da classe quadrofilme
*/
quadrosfilme = new Array();
/*
Variable: g_quadrooriginal

Guarda a URL da imagem do mapa atual.
� utilizada para recuperar a imagem correta do corpo do mapa atual, uma vez que ao mover de um objeto quadofilme para outro, a imagem do corpo do mapa � alterada.
*/
g_quadrooriginal = "";
/*
Variable: wd (depreciado)

Indica se a janela interna foi clicada.
Utilizada na movimenta��o interativa da janela interna.
*/
wd = 0;
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
/*
Variable: g_r

Indica se o software R esta instalado (sim ou nao). � preenchida na inicializa��o do mapa via AJAX.
*/
g_r = "nao";

/*
Section: vari�veis p�blicas que podem ser alteradas pelo usu�rio antes de inicializar o mapa
*/
/*
Variable: g_embedLegenda

Indica se a legenda deve ser incluida no corpo do mapa.

Values:

sim|nao

*/
g_embedLegenda = "nao";
/*
Variable: oMenuData

Array com a arvore do menu suspenso

Se for igual a "" ser� utilizado o menu padr�o.
*/
oMenuData = "";
/*
Variable: g_3dmap

Vari�vel que define o nome do map_file que possu� o layer para uso na fun��o 3d.
Pode ser caminho completo. Se n�o, busca no aplicmap.

*/
g_3dmap = "";
/*
Variable: g_opcoesTemas

Vari�vel que define se as opcoes adicionais de cada tema serao mostradas. As op��es s�o aquelas apresentadas na lista de temas do mapa quando um tema � expandido.

Values:

sim|nao

*/
g_opcoesTemas = "sim";
/*
Variable: g_mostraRosa

Vari�vel que define se a rosa dos ventos deve ser mostrada junto ao mouse. A rosa dos ventos permite a navega��o pelo mapa sem a necessidade de alterar a op��o atual. Por exemplo, pode-se navegar pelo mapa mesmo estando na op��o de identifica��o.

O aparecimento da rosa � temporizada.

Values:

sim|nao
*/
g_mostraRosa = "sim";
/*
Variable: g_visual

Indica qual o tipo de visual para abertura do mapa.

Os visuais dispon�veis s�o obtidos do diret�rio i3geo/imagens/visual na inicializa��o do i3geo.
*/
g_visual = "default";

/*
Variable: g_janelaMen

Define se a janela de mensagens come�ar� aberta.

Values:

siim|nao
*/
g_janelaMen = "sim";
/*
Variable: g_downloadbase

Define se na guia 2 ser� mostrada a op��o de download dos dados.

Values:

sim|nao
*/
g_downloadbase = "sim";
/*
Variable: g_conectargeorss

Define se na guia 2 ser� mostrada a op��o de conex�o com GeoRSS.

Values:

sim|nao
*/
g_conectargeorss = "sim";
/*
Variable: g_uploadlocal

Vari�vel que define se na guia 2 ser� mostrada a op��o de upload.

Values:

sim|nao
*/
g_uploadlocal = "sim";
/*
Variable: g_conectarwms

Vari�vel que define se na guia 2 ser� mostrada a op��o de conex�o com WMS.

Values:

sim|nao
*/
g_conectarwms = "sim";
/*
Variable: g_docaguias

Vari�vel que define se o mapa deve iniciar com as guias em janela ou n�o. As guias em janela causam o desenho de um mapa com tamanho extendido.

Values:

sim|nao
*/
g_docaguias = "nao";
/*
Variable: g_barraFerramentas1

Define se a barra de ferramentas 1 ser� aberta ou n�o no mapa.

Values:

sim|nao
*/
g_barraFerramentas1 = "sim";
/*
Variable: g_barraFerramentas2

Define se a barra de ferramentas 2 ser� aberta ou n�o no mapa.

Values:

sim|nao
*/
g_barraFerramentas2 = "sim";
/*
Variable: g_fatordezoom

Vari�vel interna para a barra de zoom.

*/
g_fatordezoom = 0;
/*
Variable: g_diminuixM

Diminui a largura do mapa em pixels no caso do navegador ser o IE.

*/
g_diminuixM = 20;
/*
Variable: g_diminuixN

Diminui a largura do mapa em pixels no caso do navegador ser o FF.

*/
g_diminuixN = 25;
/*
Variable: g_diminuiyM

Diminui a altura do mapa em pixels no caso do navegador ser o IE.

*/
g_diminuiyM = 106;
/*
Variable: g_diminuiyN

Diminui a altura do mapa em pixels no caso do navegador ser o FF.

*/
g_diminuiyN = 103;
/*
Variable: g_mapaRefDisplay

Indica a visibilidade do mapa de refer�ncia na inicializa��o

Values:

block|none

*/
g_mapaRefDisplay = "block";
/*
Variable: g_funcaoTip

Fun��o ajax que ser� executada para mostrar informa��es do tipo TIP.

A fun��o � executada pelo CPAINT e avaliada com "eval".

Por padr�o a fun��o � a verificaTipDefault
*/
g_funcaoTip = "verificaTipDefault()";
/*
Variable: g_tempotip

Tempo utilizado para verificar se o mouse est� parado.

Se o mouse estiver parado, a fun��o de mostrar tip � ativada.
*/
g_tempotip = 4500;
/*
Variable: g_tipotip

Define como o tip ser� mostrado.

Values:

simples|completo
*/
g_tipotip = "completo";
/*
Variable: g_tipoimagem

Indica o tipo de filtro de imagem que est� ativo. O filtro ativo � aplicado sobre a imagem toda a vez que o mapa � refeito.
*/
g_tipoimagem = "nenhum";
/*
Variable: g_sistemas

Nome do arquivo xml com a lista de sistemas que ser�o mostrados na guia de adi��o de temas.
O valor dessa vari�vel � definido no arquivo "ms_configura.php" e � preenchida utilizando o ajax.
*/
g_sistemas = "";
/*
Variable: destacaTamanho

Valor em pixel do ret�ngulo de destaque de temas.
*/
destacaTamanho = 75;
/*
Variable: g_mensagempadrao

Mensagem padr�o que ser� mostrada na janela de mensagens.
*/
g_mensagempadrao = "O I3Geo � software livre! Para download clique <a href='http://mapas.mma.gov.br/download' target=blanck >aqui</a>";
/*
Variable: g_entorno

Indica se o preenchimento do entorno do mapa est� ou n�o ativo.
Utilizado para criar o efeito de auto-preenchimento do mapa quando � executada a fun��o pan.
� alterada em uma op��o espec�fica no menu suspenso.

Values:

sim|nao
*/
g_entorno = "nao";
/*
Variable: g_guiaativa

Indica qual guia do mapa iniciar� ativa.
*/
g_guiaativa = "guia1";
//seta as vari�veis navn e navm
var app = navigator.appName.substring(0,1);
if (app=='N') navn=true; else navm=true;
if (navm)
{
	g_postpx = "";  //utilizado para crossbrowser
	g_tipotop = "pixelTop"; //utilizado para crossbrowser
	g_tipoleft = "pixelLeft"; //utilizado para crossbrowser
}
else
{
	g_postpx = "px";
	g_tipotop = "top";
	g_tipoleft = "left";
}
//inclui uma mensagem no rodap� da janela quando a tela do navegador tem seu tamanho modificado pelo usu�rio
window.onresize = function(){window.status = "Ap�s alterar o tamanho da janela, clique no bot�o de refresh do navegador";};

function cria()
{
	var mashup = function (retorno)
	{
		g_sid = retorno.data;
		objmapa.inicializa();
	};
	var cp = new cpaint();
	cp.set_async(true);
	cp.set_response_type("JSON");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa";
	cp.call(p,"",mashup);		
}

/*
Class: Mapa

Objeto mapa (objmapa).

Executa os programas ajax que geram o corpo do mapa, o mapa de refer�ncia, a barra de escala e a legenda.
Preenche os elementos HTML necess�rios para visualiza��o do mapa.

Parameters:

e - (opcional, se n�o existir, o valor ser� buscado na URL) extens�o geogr�fica do mapa com valores separados por espa�o

m - (opcional, se n�o existir, o valor ser� buscado na URL) nome do mapfile criado para o mapa

return:

objmapa - objeto mapa do i3geo

Constructor: 

objmapa = New Mapa()
*/
function Mapa(e,m)
{
	objaguarde = new aguarde();
	objposicaocursor = new posicaocursor();
	objposicaomouse = new posicaomouse();
	//faz o cache das imagens para desenhar mais r�pido
	imgBranco = new Image();
	imgBranco.src = g_locaplic+"/imagens/branco.gif";
	var icache = new Array("foldermapa.gif","extent.gif","tic.png","maisvermelho.png","maisverde.png","maisamarelo.png","temas.png","x.gif","sobe.gif","desce.gif","quadro.png","quadro1.png","excluir.png");
	for (i=0;icache.lenght;i++)
	{
		var temp = new Image();
		temp.src = g_locaplic+"/imagens/"+icache[i];
	}
	var temp = new Image();
	temp.src = g_locaplic+"/classesjs/jsobjects/jsUI-Treeview/plus.gif";
	temp.src = g_locaplic+"/classesjs/jsobjects/jsUI-Treeview/minus.gif";
	//calcula o tamanho do mapa
	var diminuix = (navm) ? g_diminuixM : g_diminuixN;
	var diminuiy = (navm) ? g_diminuiyM : g_diminuiyN;
	/*
	Variable: objmapa.w
	
	Largura do mapa criado

	� calculado em fun��o do tamanho da tela. No caso do corpo do mapa possuir a propridedade de largura em seu estilo, � utilizado esse tamanho.
	*/
	/*
	Variable: objmapa.h
	
	Altura do mapa criado

	� calculado em fun��o do tamanho da tela. No caso do corpo do mapa possuir a propridedade de largura em seu estilo, � utilizado esse tamanho.
	*/
	if (e == undefined)
	{
		var menos = 0;
		if ($i("contemFerramentas"))
		{menos = menos + parseInt($i("contemFerramentas").style.width);}
		if ($i("encolheFerramentas"))
		{menos = menos + parseInt($i("encolheFerramentas").style.width);}
		if ($i("ferramentas"))
		{menos = menos + parseInt($i("ferramentas").style.width);}
		var novow = screen.availWidth - diminuix;
		var novoh = screen.availHeight - diminuiy;
		if (novow >= 1024)
		{
			novow = 1000;
		}
		if (novoh >= 700)
		{
			novoh = 700;
		}
		if (document.body.style.width < 400)
		{
			var novow = screen.availWidth - diminuix;
			var novoh = screen.availHeight - diminuiy;
			window.resizeTo(screen.availWidth,screen.availHeight);
			window.moveTo(0,0);
		}
		document.body.style.width = novow;
		document.body.style.height = novoh;
		this.w = parseInt(document.body.style.width) - menos - diminuix;
		this.h = parseInt(document.body.style.height) - diminuiy;
		if (document.getElementById("corpoMapa"))
		{
			if (document.getElementById("corpoMapa").style.width)
			{
				this.w = parseInt(document.getElementById("corpoMapa").style.width);
				this.h = parseInt(document.getElementById("corpoMapa").style.width);
			}
			if (document.getElementById("corpoMapa").style.height)
			{this.h = parseInt(document.getElementById("corpoMapa").style.height);}
		}
	}
	else
	{
		this.w = document.body.offsetWidth - parseInt($i("contemFerramentas").style.width) - diminuix;
		this.h = document.body.offsetHeight - diminuiy;
	}
	if ($i("openlayers"))
	{
		$i("openlayers").style.width = this.w;
		$i("openlayers").style.height = this.h;
	}
	/*
	Variable: objmapa.navegacaoDir
	
	Indica se deve ser incluida a op��o de navega��o nos diret�rios do servidor.

	A indica��o sim|nao � obtida na inicializa��o do i3geo, e � definido no ms_configura.php
	*/
	this.navegacaoDir = "nao";	
	/*
	Variable: objmapa.listavisual
	
	String com a lista de visuais dispon�veis no i3geo.

	A lista � obtida na inicializa��o do i3geo, lendo-se os diret�rios dispon�veis em imagens/visual
	*/
	this.listavisual = "";
	/*
	Variable: objmapa.visualatual
	
	Indica qual o visual atualmente em uso.
	*/
	this.visualatual = "default";
	/*
	Variable: objmapa.funcoesClickMapa
	
	Array com a lista de fun��es que ser�o executadas quando o usu�rio clica no mapa

	� utilizado quando o i3geo � customizado, acrescentando outras funcionalidades al� do padr�o.
	
	Na customiza��o, deve ser definida ap�s a inicializa��o do mapa.
	*/
	this.funcoesClickMapa = new Array();
	/*
	Variable: objmapa.objtips
	
	Array que guarda os objetos tips fixos na tela.
	
	Os objetos s�o acrescentados � essa vari�vel quando um tip � fixado na tela pelo usu�rio.
	
	Quando o mapa � redesenhado, essa vari�vel � limpa.
	*/
	this.objtips = new Array(); //
	/*
	Variable: objmapa.tempo
	
	Inicia o temporizador para redesenhar o mapa.
	
	*/
	this.tempo = ""; //
	/*
	Variable: objmapa.autoRedesenho
	
	Inicia o temporizador para redesenhar o mapa automaticamente.
	
	*/
	this.tempoRedesenho = ""; //
	this.contaTempoRedesenho = ""; //
	/*
	Variable: objmapa.temaAtivo
	
	Tema que esta ativo.
	
	Utilizado em varias operacoes onde o tema e selecionado de um combo
	*/	
	this.temaAtivo = ""; 
	/*
	Variable: objmapa.pinmarca
	
	Simbolo utilizado para insercao de pontos.
	
	A inser��o � utilizada em algumas ferramentas, como a digitaliza��o de elementos.
	*/
	this.pinmarca = "marca"; //
	/*
	Variable: objmapa.pintamanho
	
	Tamanho da marca utilizada na inclus�o de pontos
	*/
	this.pintamanho= "5";
	/*
	Variable: objmapa.escala
	
	Escala do mapa atual.
	
	� sempre redefinida quando o mapa � redesenhado.
	*/
	this.scale = 50000;
	/*
	Variable: objmapa.temas
	
	Temas dispon�veis no mapa atual.
	
	Guarda a lista de temas e suas caracter�sticas. � definida quando o mapa � inicializado ou redesenhado.
	*/
	this.temas = "";
	/*
	Variable: objmapa.legenda
	
	Legenda HTML do mapa atual.
	
	Guarda o HTML que apresenta a legenda no mapa.
	*/
	this.legenda="";
	/*
	Variable: objmapa.finaliza
	
	Fun��o que ser� executada no final do processo de montagem do mapa.
	
	Pode ser utilizada quando se deseja customizar o I3Geo.
	*/
	this.finaliza="";
	/*
	Variable: objmapa.guiaTemas
	
	Define qual a guia para listar os temas do mapa
	*/
	this.guiaTemas = "guia1";
	/*
	Variable: objmapa.guiaMenu
	
	Define qual a guia que receber� o menu de sele��o de temas
	*/
	this.guiaMenu = "guia2";
	/*
	Variable: objmapa.guiaLegenda
	
	Define qual a guia receber� a legenda do mapa
	*/
	this.guiaLegenda = "guia4";
	/*
	Variable: objmapa.guiaListaMapas
	
	Define a guia que receber� a lista de mapas
	*/
	this.guiaListaMapas = "guia5";
	/*
	Function: inicializa
	
	Inicializa o mapa
	
	Paremeters:
	
	void
	*/
	this.inicializa= function()
	{
		if (!$i("i3geo"))
		{document.body.id = "i3geo";}
		//altera a classe do corpo do HTML
		$i("i3geo").className = "yui-skin-sam";
		$i("i3geo").onmouseover = function()
		{
			this.onmousemove=function(exy1)
			{
				//if ($i("img")){calcposf();}
				if (navn)
				{
					objposicaomouse.x = exy1.clientX;
					objposicaomouse.y = exy1.clientY;
				}
				if (navm)
				{
					objposicaomouse.x = window.event.clientX;
					objposicaomouse.y = window.event.clientY;
				}
			};
		};
		//
		//se g_sid="", o html foi aberto diretamente
		//ent�o, � necess�rio criar o mapa
		//
		if (g_sid=="")
		{
			var mashup = function (retorno)
			{
				g_sid = retorno.data;
				objmapa.inicializa();
			};
			var cp = new cpaint();
			cp.set_async("true");
			cp.set_response_type("JSON");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaMapa"+g_mashuppar;
			cp.call(p,"",mashup);
			return;
		}	
		//testa se os javascripts foram carregados
		if (!window.testafuncoes)
		{alert("funcoes.js com problemas");}
		if (!window.testamenususpenso)
		{alert("menususpenso.js com problemas");}
		if (!window.testaferramentas)
		{alert("ferramentas.js com problemas");}
		if (!window.testaajax)
		{alert("redesenho.js com problemas");}
		//
		//objeto que guarda os parametros de posicionamento do cursor
		objaguarde.abre("montaMapa","Aguarde...iniciando o mapa");
		var cp = new cpaint();
		cp.set_response_type("JSON");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inicia&embedLegenda="+g_embedLegenda+"&w="+this.w+"&h="+this.h+"&g_sid="+g_sid;
		cp.call(p,"iniciaMapa",this.montaMapa);
	};
	/*
	Function: montaMapa
	
	Processa os resultados da inicializa��o e monta o mapa
	
	Parameters:
	
	Resultado da fun��o inicializa
	*/
	this.montaMapa = function (retorno)
	{
		if (retorno.data.search(" erro.") > -1)
		{
			alert(retorno.data);
		}
		if (retorno.data == "linkquebrado")
		{
			objaguarde.fecha("montaMapa");
			document.body.style.backgroundColor="white";
			document.body.innerHTML = "<br>Para abrir o mapa utilize o link:<br><a href="+g_locaplic+"/ms_criamapa.php >"+g_locaplic+"/ms_criamapa.php</a>";
			return("linkquebrado");
		}
		else
		{
			if ((retorno.data != "erro") && (retorno.data != undefined))
			{
				eval(retorno.data);
				/*
				menu suspenso
				*/
				if (oMenuData == "")
				{
               		oMenuData = {
                   "ajudas": [ 
                  
                       { text: "Sobre o I3Geo", url: "javascript:g_hlpt = 'sobrei3geo';ajudaf('abre')" },
                       { text: "Sistema", url: "javascript:abreDoc()" },
                       { text: "WikiBook", url: "http://pt.wikibooks.org/wiki/I3geo" },
                       { text: "Tutoriais", url: "http://mapas.mma.gov.br/wikibooki3geo" },
                       { text: "Blog", url: "http://sistemas.mma.gov.br/blogs/index.php?blog=6" },
                   ],
                   "analise": [
                       { text: "Geometrias", url: "javascript:analisaGeometrias()" },
                       { text: "Grade de poligonos", url: "javascript:gradePol()" },
                       { text: "Grade de pontos", url: "javascript:gradePontos()" },
                       { text: "Grade de hex�gonos", url: "javascript:gradeHex()" },
                       { text: "Entorno (buffer)", url: "javascript:buffer()" },
                       { text: "Centr�ide", url: "javascript:centroide()" },
                       { text: "N pontos em poligono", url: "javascript:nptPol()" },
                       { text: "Ponto em poligono/raster", url: "javascript:pontoempoligono()" },
                       { text: "Distribui��o de pontos", url: "javascript:pontosdistri()" }
                   ]
                };
				if (!$i("listaPropriedades"))
               	{
                   	oMenuData.propriedades = [
                       { text: "Tipo de imagem", url: "javascript:tipoimagem()" },
                       { text: "Legenda", url: "javascript:opcoesLegenda()" },
                       { text: "Escala", url: "javascript:opcoesEscala()" },
                       { text: "Tamanho", url: "javascript:tamanho()" },
                       { text: "Ativa/desativa entorno", url: "javascript:ativaEntorno()" },
                       { text: "Ativa/desativa logo", url: "javascript:ativaLogo()" },
                       { text: "Cor da selecao", url: "javascript:queryMap()" },
                       { text: "Cor do fundo", url: "javascript:corFundo()" },
                       { text: "Grade de coordenadas", url: "javascript:gradeCoord()" }
                       ];
                   }
                   oMenuData.janelas = [
                       { text: "Barras de ferramentas", url: "javascript:initJanelaZoom('1');initJanelaZoom('2')" },
                       { text: "Janela de mensagens", url: "javascript:initJanelaMen()" }        
                   ];
                   oMenuData.arquivo = [
                       { text: "Salvar mapa", url: "javascript:salvaMapa()" },
                       { text: "Carregar mapa", url: "javascript:carregaMapa()" },
                       { text: "Pegar imagens", url: "javascript:pegaimagens()" },
                       { text: "Converter em WMS", url: "javascript:convertews()" },
                       { text: "Gerador de links", url: "../geradordelinks.htm" }
                   ];
               }
               if ($i("menus"))
               {montaMenuSuspenso();}
				//insere botao dinamico de aplicar
				if (!$i("aplicari"))
				{
					var novoel = document.createElement("input");
					novoel.id = 'aplicari';
					novoel.type = 'button';
					novoel.value = 'Aplicar';
					novoel.style.cursor="pointer";
					novoel.style.fontSize="10px";
					novoel.style.zIndex = 15000;
					novoel.style.position="absolute";
					novoel.style.display="none";
					novoel.onclick=function()
					{
						remapaf();
						this.style.display="none"
					};
					novoel.onmouseover = function(){this.style.display="block";};
					novoel.onmouseout = function(){this.style.display="none";};
					document.body.appendChild(novoel);
				}
				gerafilmef(10);
				//inicia as barras de ferramentas
				if (g_barraFerramentas1 == "sim")
				{initJanelaZoom(1);}
				if (g_barraFerramentas2 == "sim")
				{initJanelaZoom(2);}				
				objmapa.atualizaListaTemas(temas);
				objmapa.atualizaReferencia(mapexten);
				objmapa.scale = parseInt(mapscale);
				objmapa.temas = temas;
				objmapa.cellsize = g_celula;
				objmapa.extent = mapexten;
				objmapa.extentTotal = mapexten;
				objmapa.criaCorpoMapa();
				ajaxCorpoMapa(retorno);
				objmapa.criaEscalaGrafica();
				objmapa.atualizaEscalaGrafica();
				objmapa.ativaLocallizarXY("localizarxy");
				objmapa.ativaBuscaRapida("buscaRapida");
				objmapa.ativaListaPropriedades("listaPropriedades");
				objmapa.ativaRealce("realca");
				objmapa.ativaGoogle("google");
				objmapa.ativaScielo("scielo");
				objmapa.ativaConfluence("confluence");
				objmapa.ativaZoomtot("zoomtot");
				objmapa.ativaZoomli("zoomli");
				objmapa.ativaPan("pan");
				objmapa.ativaZoomiauto("zoomiauto");
				objmapa.ativaZoomoauto("zoomoauto");
				objmapa.ativaIdentifica("identifica");
				objmapa.ativaLente("lentei");
				objmapa.ativaExten("exten");
				objmapa.ativaReferencia("referencia");
				objmapa.ativaEscalanum("escala");
				objmapa.ativaWiki("wiki");
				objmapa.ativaReinicia("reinicia");
				objmapa.ativaMede("mede");
				objmapa.ativaInserexy("inserexy");	
				objmapa.ativaInsereGrafico("inseregrafico");
				objmapa.ativaSelecao("selecao");
				objmapa.ativaTextofid("textofid");
				objmapa.ativa3D("v3d");
				objmapa.ativaImpressao("imprimir");
				objmapa.ativaVisual("visual");
				objmapa.ativaOndeEstou("ondeestou");
				ativaGuias();
				//esconde guias
				if(($i("encolheFerramentas")) && ($i("contemFerramentas")))
				{
					$i("encolheFerramentas").onclick = function()
					{docaguias();};
				}
				calcposf();           //calcula a posicao do mapa no browser
				g_leftinicial = imagemxi;
				if ($i("corpoMapa"))
				{
					$i("img").style.width=objmapa.w +"px";
					$i("img").style.height=objmapa.h +"px";
					$i("corpoMapa").style.width=objmapa.w +"px";
					$i("corpoMapa").style.height=objmapa.h +"px";
					$i("corpoMapa").style.clip = 'rect('+0+" "+(objmapa.w)+" "+(objmapa.h)+" "+0+')';
				}
				var temp = 0;
				if ($i("contemFerramentas")){temp = temp + parseInt($i("contemFerramentas").style.width);}
				if ($i("encolheFerramentas")){temp = temp + parseInt($i("encolheFerramentas").style.width);}
				if ($i("ferramentas")){temp = temp + parseInt($i("ferramentas").style.width);}
				$i("mst").style.width=objmapa.w + temp + "px";
				$i("contemImg").style.height=objmapa.h + "px";
				$i("contemImg").style.width=objmapa.w + "px";
				calcposf();
				//reposiciona a janela de botoes
				if(navn){var desloca = 40;}else{var desloca = 40;}
				if ($i("maisBotoes1")){YAHOO.janelaBotoes1.xp.panel.moveTo(imagemxi+desloca,imagemyi+10);}
				if ($i("maisBotoes2")){YAHOO.janelaBotoes2.xp.panel.moveTo(imagemxi,imagemyi+10);}
				mudaiconf("pan"); //inicia no icone de zoom por box
				if (g_entorno == "sim")
				{
					geraURLentorno();
					var letras=["L","O","N","S"];
					for (l=0;l<letras.length; l++)
					{
						if ($i("img"+letras[l]))
						{
							$i("img"+letras[l]).style.width = objmapa.w;
							$i("img"+letras[l]).style.height = objmapa.h;
							$i("img"+letras[l]).style.display = "block";
						}
					}
					ajustaEntorno();
				}
				autoRedesenho("ativa");
			}
			else
			{alert("Erro. Impossivel criar o mapa "+retorno.data);return;}
			//ativa a guia correta
			var temp = g_guiaativa.split("guia");
			mostraguiaf(temp[1]);
			//verifica se a guia5 (mapas) deve ou n�o ser mostrada
			if ($i(objmapa.guiaListaMapas))
			{
				if (g_locmapas == ""){$i(objmapa.guiaListaMapas).style.display = "none"}
			}
			if (pCookie("g_janelaMen")){g_janelaMen = pCookie("g_janelaMen");}
			if (g_janelaMen == "sim"){initJanelaMen();}
			if (pCookie("g_mapaRefDisplay")){g_mapaRefDisplay = pCookie("g_mapaRefDisplay");}
			if (g_mapaRefDisplay == "block"){initJanelaRef();}
			if($i("img")){g_quadrooriginal = $i("img").src;}
			objaguarde.fecha("montaMapa");
			if (g_docaguias == "sim"){docaguias();}
			if (document.getElementById("botao3d"))
			{
				if (g_3dmap == ""){document.getElementById("botao3d").style.display="none";}
			}
		}
		rebobinaf();
	};
	/*
	Function: ativaVisual
	
	Ativa os �cones de escolha do visual do mapa.
	
	Parameters:
	
	id - id do elemento	
	*/
	this.ativaVisual = function(visual)
	{
		//verifica se o elemento existe
		if ($i(visual))
		{
			if (objmapa.listavisual != "")
			{
				var l = objmapa.listavisual.split(",");
				var visuais = "";
				for (li=0;li<l.length; li++)
				{
					visuais += "<img title='muda visual - "+l[li]+"' style=cursor:pointer onclick='mudaVisual(\""+l[li]+"\")' src='"+g_locaplic+"/imagens/visual/"+l[li]+".png' />&nbsp;";
				}
				$i(visual).innerHTML = visuais;
			}
		}
	};
	/*
	Function: ativaLocallizarXY
	
	Insere a op��o de busca r�pida.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/
	this.ativaLocallizarXY = function(id)
	{
		if ($i(id))
		{
			$i(id).innerHTML = "localiza X:<input class=digitar id='xg' title='grau' type=text size=5 value='-00'/>&nbsp;<input class=digitar id='xm' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='xs' title='segundo' type=text size=5 value='00.00'/>&nbsp;&nbsp;Y:<input class=digitar id='yg' title='grau' type=text size=3 value='-00'/>&nbsp;<input class=digitar id='ym' title='minuto' type=text size=3 value='00'/>&nbsp;<input class=digitar id='ys' title='segundo' type=text size=5 value='00.00'/><img  title='zoom' onclick='zoomPonto()' src="+$im("tic.png") +" id=procurarxy />";
			$i(id).onmouseover = function(){mostradicasf(this,'Digite as coordenadas de um ponto (X=longitude e Y=latitude) para localiz�-lo no mapa. O centro do mapa ser� deslocado para o ponto digitado.','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaBuscaRapida
	
	Insere a op��o de busca r�pida.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaBuscaRapida = function (id)
	{
		if($i(id))
		{
			var ins = "<input onclick='javascript:this.value=\"\"' id=valorBuscaRapida title='digite o texto para busca' type=text size=30 class=digitar value='busca r�pida...' />";
			ins += "<img  src='"+g_locaplic+"/imagens/tic.png' onclick='buscaRapida()' />";
			$i(id).innerHTML = ins;
		}
	};
	/*
	Function: ativaListaPropriedades
	
	Mostra a lista de propriedades do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaListaPropriedades = function(id)
	{
		if ($i(id))
		{
			var lista = {
   	              "propriedades": [
   	                  { text: "Tipo de imagem", url: "javascript:tipoimagem()" },
   	                  { text: "Legenda", url: "javascript:opcoesLegenda()" },
   	                  { text: "Escala", url: "javascript:opcoesEscala()" },
   	                  { text: "Tamanho", url: "javascript:tamanho()" },
   	                  { text: "Ativa/desativa entorno", url: "javascript:ativaEntorno()" },
   	                  { text: "Ativa/desativa logo", url: "javascript:ativaLogo()" },
   	                  { text: "Cor da selecao", url: "javascript:queryMap()" },
   	                  { text: "Cor do fundo", url: "javascript:corFundo()" },
   	                  { text: "Grade de coordenadas", url: "javascript:gradeCoord()" },
   	                  { text: "Template", url: "javascript:template()" },
   	                  { text: "Temporizador", url: "javascript:autoredesenha()" }
   	              ]};					
			listaPr = new Object();
			listaPr = treeviewNew("listaPr", "default", id, null);
			listaPr.createItem("propriedadesRaiz", "<b>Propriedades do mapa</b>", g_locaplic+"/imagens/visual/"+g_visual+"/foldermapa1.gif", true, false, true, null);
			var im = "";
			if (navn)
			{var im = "<img src='"+g_locaplic+"/imagens/branco.gif' width=0 height=13 />";}
			for (l=0;l<lista.propriedades.length; l++)
			{
				tnome = "<span onclick='"+lista.propriedades[l].url+"'>"+im+"<img  src='"+g_locaplic+"/imagens/visual/"+g_visual+"/tic.png' />&nbsp;"+lista.propriedades[l].text+" </span>";
				listaPr.createItem("propriedadesMapa"+l, tnome, imgBranco, false, true, false, "propriedadesRaiz");
			}
			listaPr.createItem("","", imgBranco, false, true, false, "propriedadesRaiz");				
		}
	};
	/*
	Function: ativaRealce
	
	Ativa o bot�o que realiza o realce de um tema.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaRealce = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function realcaAtiva()
			{
				if (!$i("areaRealce"))
				{
					var novoel = document.createElement("div");
					novoel.id = 'areaRealce';
					novoel.style.display="none";
					document.body.appendChild(novoel);
					if (navm)
					{
						$i("areaRealce").style.filter = "alpha(opacity=20)";
					}
				}
				if (g_realca == "sim")
				{
					g_realca = "nao";
					$i("areaRealce").style.display = "none";
					$i(id).style.borderWidth=0;
					$i(id).style.borderColor='red';
				}
				else
				{
					g_realca = "sim";
					$i("areaRealce").style.display = "block";
					$i(id).style.borderWidth=1;
					$i(id).style.borderColor='red';
				}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Ativa/desativa &aacute;rea de destaque no mapa','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaGoogle
	
	Ativa o bot�o que realiza a opera��o de de busca no Google.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaGoogle = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick= function google()
			{
				//div para google
				if (!$i("boxg"))
				{
					var novoel = document.createElement("div");
					novoel.id = "boxg";
					novoel.style.zIndex=1;
					novoel.innerHTML = '<font face="Arial" size=0></font>';
					novoel.onmouseover = function(){$i("boxg").style.display="none";};
					document.body.appendChild(novoel);
				}
				g_operacao = "navega";
				wdocaf("340px","340px",g_locaplic+"/ferramentas/googlemaps/index.htm","","","Google maps");
			};
			$i(id).onmouseover=function(){mostradicasf(this,'Abre o Google Maps, mostrando uma imagem de sat�lite da regi�o vista no mapa principal.','google');};
			$i(id).onmouseout=function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaScielo
	
	Ativa o bot�o que realiza a opera��o de de busca no site Scielo.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaScielo = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick= function scielo()
			{
				g_operacao = "navega";
				wdocaf("450px","190px",g_locaplic+"/ferramentas/scielo/index.htm","","","Scielo");
			};
			$i(id).onmouseover=function(){mostradicasf(this,'Pesquisa documentos na base de dados Scielo (dados preliminares)','scielo');};
			$i(id).onmouseout=function(){mostradicasf(this,'');};
		}	
	};
	/*
	Function: ativaConfluence
	
	Ativa o bot�o que realiza a opera��o de de busca no site confluence.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaConfluence = function(id)
	{	
		if ($i(id))
		{
			$i(id).onclick= function confluence()
			{
				g_operacao = "navega";
				wdocaf("250px","190px",g_locaplic+"/ferramentas/confluence/index.htm","","","confluence");
				if (!$i("boxg"))
				{
					var novoel = document.createElement("div");
					novoel.id = "boxg";
					novoel.style.zIndex=5000;
					novoel.innerHTML = '<font face="Arial" size=0></font>';
					document.body.appendChild(novoel);
				} 
			};
			$i(id).onmouseover=function(){mostradicasf(this,'Projeto Confluence. Pontos de intersec��o de coordenadas observadas em campo.','confluence');};
			$i(id).onmouseout=function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomtot
	
	Ativa o bot�o que realiza a opera��o de zoom para a extens�o total do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaZoomtot = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function (){zoomtot();};
			$i(id).onmouseover = function(){mostradicasf(this,'Altera a escala do mapa ajustando-a para mostrar a mesma abrang�ncia geogr�fica da inicializa��o.','geral');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomli
	
	Ativa o bot�o que realiza a opera��o de zoom interativo.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/		
	this.ativaZoomli = function (id)
	{
		if ($i(id))
		{
			$i(id).onclick =function(){mudaiconf("zoomli");g_operacao="navega";};
			$i(id).onmouseover = function(){mostradicasf(this,'Amplia o mapa - coloca o ponto clicado no centro da tela ou amplia a regi&atilde;o indicada por um ret&acirc;ngulo.Ap�s ativada, clique e arraste o mouse sobre o mapa na �rea de zoom desejada.','zoomli');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaPan
	
	Ativa o bot�o que realiza a opera��o de deslocamento (pan).
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaPan = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick =function(){mudaiconf("pan");g_tipoacao = "pan";g_operacao="navega";};
			$i(id).onmouseover = function(){mostradicasf(this,'Desloca a regi�o vis�vel no mapa. Ap�s ativada, clique e arraste o mouse sobre o mapa para deslocar a regi�o vis�vel.','pan');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomiauto
	
	Ativa o bot�o que realiza a opera��o de zoom in.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaZoomiauto = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function() {zoomiauto();};
			$i(id).onmouseover = function(){mostradicasf(this,'Amplia o mapa tendo como refer&ecirc;cia o centro atual.','zoomiauto');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaZoomoauto
	
	Ativa o bot�o que realiza a opera��o de zoom out.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaZoomoauto = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function(){zoomoauto();};
			$i(id).onmouseover = function(){mostradicasf(this,'Reduz o mapa tendo como refer&ecirccia o centro atual.','zoomoauto');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaIdentifica
	
	Ativa o bot�o que abre a fun��o de identifica��o.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/
	this.ativaIdentifica = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function()
			{
				mudaiconf("identifica");
				g_operacao="identifica";
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Mostra informa&ccedil;&otilde;es sobre um ponto no mapa. Ap�s ativada, pare o mouse por alguns instantes no ponto desejado ou clique sobre o mesmo.','identifica');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaLente
	
	Ativa o bot�o que abre a lente de aumento.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/	
	this.ativaLente = function(id)
	{	
		if ($i(id))
		{
			$i(id).onclick = function lentei()
			{
				//insere lente de aumento
				if (!$i("lente"))
				{
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
				with($i(id).style){borderWidth='1' + g_postpx;borderColor="red";}
				if (g_lenteaberta == "sim")
				{
					$i("lente").style.display = "none";
					$i("boxlente").style.display = "none";
					$i(id).style.borderWidth = 0;
					g_lenteaberta = "nao";
				}
				else
				{
					g_lenteaberta = "sim";
					objaguarde.abre("ajaxabrelente","Aguarde...");
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid;
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_response_type("JSON");
					cp.call(p,"lente",ajaxabrelente);
				}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Abre lente de amplia&ccedil;&atilde;o','lente');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaExten
	
	Ativa o bot�o que abre a janela com o mapa de refer�ncia.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o	
	*/
	this.ativaExten = function (id)
	{
		if ($i(id))
		{
			$i(id).onclick = function(){mensagemf(objmapa.extent);};
			$i(id).onmouseover = function(){mostradicasf(this,'Mostra a extens&atilde;o geogr&aacute;fica atual em coordenadas geogr�ficas.','extensao');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaReferencia
	
	Ativa o bot�o que abre a janela com o mapa de refer�ncia.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o
	*/
	this.ativaReferencia = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function(){initJanelaRef();};
			$i(id).onmouseover = function(){mostradicasf(this,'Abre/fecha o mapa de refer&ecirc;ncia','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaEscalanum
	
	Ativa a apresenta��o da escala num�rica.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/	
	this.ativaEscalanum = function(id)
	{
		if($i(id))
		{
			$i(id).innerHTML = "1:<input class='digitar' type='text' onchange='javascript:aplicaescala()' id=escalanum size=19 value=''/><img src=\""+g_localimg+"/tic.png\" onclick='javascript:aplicaescala()' />";
			$i("escalanum").onmouseover = function(){mostradicasf(this,'Digite o novo valor de escala e clique no bot�o aplicar para alterar a escala do mapa.','escala');};
			$i("escalanum").onmouseout = function(){mostradicasf(this,'');};
			if ($i("escalanum")){$i("escalanum").value = this.scale;}
		}
	};
	/*
	Function: ativaWiki
	
	Ativa o bot�o de busca na wikipedia.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaWiki = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick= function wiki()
			{
				g_operacao = "navega";
				wdocaf("450px","190px",g_locaplic+"/ferramentas/wiki/index.htm","","","Wiki");
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Busca dados na Wikipedia na abrang&ecirc;ncia atual do mapa. Fa�a um zoom no mapa antes de abrir essa op��o. Regi�es muito extensas podem tornar a busca muito demorada.','');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};	
	/*
	Function: ativaReinicia
	
	Ativa o bot�o de reinicializa��o do mapa que restaura as condi��es iniciais do mapa.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaReinicia = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick =function()
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=reiniciaMapa&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2);
				cp.set_response_type("JSON");
				cp.call(p,"reiniciaMapa",ajaxredesenha);
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Redesenha o mapa com as configura��es iniciais.','redesenha');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaMede
	
	Ativa o bot�o de medi��o de dist�ncias.
	
	A medida � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela que mostra o resultado da medida, o �cone que segue o mouse � alterado.
	
	Para mostrar o resultado do c�lculo, � inclu�do um div espec�fico.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaMede = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function mede()
			{
				//insere div para medida de distancias
				if (!$i("mostradistancia"))
				{
					var novoel = document.createElement("div");
					novoel.id = "mostradistancia";
					novoel.style.display="none";
					novoel.style.position="absolute";
					document.body.appendChild(novoel);
				}
				if (g_tipoacao != "mede")
				{
					mudaiconf("mede");
					pontosdistobj = new pontosdist();
					$i("mostradistancia").style.display="block";
				}
				else
				{
					mudaiconf("pan");
					limpacontainerf(); //tira os pontos da tela
					$i("mostradistancia").style.display="none";
				}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Mede a dist&acirc;ncia entre dois ou mais pontos clicados no mapa (menor dist&acirc;ncia). O c�lculo de dist�ncia � aproximado e sua precis�o depende da escala do mapa.','mede');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaInserexy
	
	Ativa o bot�o de inser��o de pontos (digitaliza��o).
	
	A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaInserexy = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function inserexy()
			{
				if (g_tipoacao != "inserexy")
				{
					var temp = Math.random() + "a";
					temp = temp.split(".");
					g_nomepin = "pin"+temp[1];
					mudaiconf("inserexy");
					pontosdistobj = new pontosdist();
					wdocaf("400px","300px",g_locaplic+'/ferramentas/inserexy2/index.htm',"","","Insere");
				}
				else
				{mudaiconf("pan");}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Insere pontos no mapa em coordenadas geogr&aacute;ficas. Os pontos inclu�dos podem ser transformados em linhas ou pol�gonos. Os pontos s�o armazenados em um tema tempor�rio, podendo-se fazer o download do arquivo shapefile.','inserexy');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaInsereGrafico
	
	Ativa o bot�o de inser��o de gr�ficos.
	
	A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaInsereGrafico = function(id)
	{
		//insere grafico
		if ($i(id))
		{
			$i(id).onclick = function inseregrafico()
			{
				if (g_tipoacao != "inseregrafico")
				{
					var temp = Math.random() + "gr";
					temp = temp.split(".");
					g_nomepin = "pin"+temp[1];
					mudaiconf("inseregrafico");
					wdocaf("400px","300px",g_locaplic+'/ferramentas/inseregrafico/index.htm',"","","Insere");
				}
				else
				{mudaiconf("pan");}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Insere um gr&aacute;fico no ponto clicado conforme os atributos existentes no tema escolhido. O tema deve possuir itens com valores num�ricos na tabela de atributos.','inseregrafico');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaSelecao
	
	Ativa o bot�o de sele��o.
	
	A sele��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaSelecao = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function selecao()
			{
				if (g_tipoacao != "selecao")
				{
					g_tipoacao = "selecao";
					mudaiconf("selecao");
					pontosdistobj = new pontosdist();
					objmapa.temaAtivo = "";
					wdocaf("360px","320px",g_locaplic+'/ferramentas/selecao/index.htm',"","","Sele&ccedil;&atilde;o");
				}
				else
				{mudaiconf("pan");}
			};
			$i(id).onmouseover = function(){mostradicasf(this,'Abre as ferramentas para sele&ccedil;&atilde;o de elementos de um tema. Os elementos selecionados podem ser utilizados em outras opera��es, como buffer e sele��o por tema.','selecao');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaTextoFid
	
	Ativa o bot�o de inser��o de topon�mia.
	
	A inser��o � feita quando o usu�rio clica no mapa com esta op��o ativa
	
	Quando o bot�o � acionado, abre-se a janela de op��es, o �cone que segue o mouse � alterado
	e a vari�vel g_tipoacao � definida.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaTextofid = function(id)
	{
		if ($i("textofid"))
		{
			$i("textofid").onclick = function textofid()
			{
				if (g_tipoacao != "textofid")
				{
					var temp = Math.random() + "b";
					temp = temp.split(".");
					g_nomepin = "pin"+temp[1];
					mudaiconf("textofid");
					pontosdistobj = new pontosdist();
					g_tipoacao = "textofid";
					wdocaf("350px","200px",g_locaplic+"/ferramentas/inseretxt/index.htm","","","Texto");
				}
				else
				{mudaiconf("pan");}
			};
			$i("textofid").onmouseover = function(){mostradicasf(this,'Insere um texto no mapa clicando no ponto desejado no mapa. Utilize essa op��o para adicionar informa��es ao mapa.','inseretxt');};
			$i("textofid").onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativa3d
	
	Ativa a funcionalidade do bot�o 3d.
	
	O bot�o 3d abre a op��o de gera��o de um modelo virtual de eleva��o.

	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativa3D = function(id)
	{
		if ($i(id))
		{
			$i(id).onclick = function v3d()
			{wdocaf("400px","200px",g_locaplic+"/ferramentas/3d/index.htm","","","3d");};
			$i(id).onmouseover = function(){mostradicasf(this,'Gera arquivo para 3d','3d');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaImpress�o
	
	Ativa o bot�o de impress�o do mapa.
	
	O bot�o de impress�o abre as op��es para impress�o do mapa atual.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaImpressao = function(id)
	{	
		if ($i(id))
		{
			$i(id).onclick = function imprimir()
			{wdocaf("320px","180px",g_locaplic+"/ferramentas/imprimir/index.htm","","","Imprimir");};
			$i(id).onmouseover = function(){mostradicasf(this,'Imprime o mapa','imprimir');};
			$i(id).onmouseout = function(){mostradicasf(this,'');};
		}
	};
	/*
	Function: ativaOndeEstou
	
	Ativa o bot�o de localiza��o do usu�rio pelo IP.
	
	Essa op��o s� � ativada se a vari�vel objmapa.geoip for igual a "sim" e se existir o div com id=ondeestou.
	
	O valor dessa vari�vel � obtida na inicializa��o.
	
	Parameters:
	
	id - id do elemento que ativa a opera��o 
	*/
	this.ativaOndeEstou = function(id)
	{	
		if ($i(id))
		{
			if (objmapa.geoip == "nao")
			{$i(id).style.display="none";}
			else
			{
				$i(id).onclick = function(){zoomIP();};
				$i(id).onmouseover = function(){mostradicasf(this,'Localiza o IP do usuario no mapa','');};
				$i(id).onmouseout = function(){mostradicasf(this,'');};
			}
		}
	};	
	/*
	Function: criaEscalaGrafica
	
	Cria a escala gr�fica como um lemento HTML se existir o id escalaGrafica
	*/
	this.criaEscalaGrafica = function()
	{
		if ( ($i("escalaGrafica")) && (!$i("imagemEscalaGrafica")) )
		{$i("escalaGrafica").innerHTML = "<img src=\""+g_localimg+"/icon_menuarrow.gif\" title='op&ccedil;&otilde;es' onclick='opcoesEscala()' style='cursor:pointer'/><img id=imagemEscalaGrafica src='' />";}
	};
	/*
	Function: atualizaEscalaGrafica
	
	Atualilza a escala gr�fica
	*/
	this.atualizaEscalaGrafica = function()
	{
		if ($i("escalaGrafica"))
		{
			//objaguarde.abre("ajaxEscalaGrafica","Aguarde...criando escala gr&aacute;fica");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=escalagrafica&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"retornaBarraEscala",ajaxEscalaGrafica);
		}
	};
	/*
	Function: atualizaReferencia
	
	Atualiza o mapa de refer�ncia
	
	Parameters:
	
	mapexten - extens�o geogr�fica
	*/
	this.atualizaReferencia = function(mapexten)
	{
		//
		//se houve altera��o na extens�o, � preciso refazer o mapa de refer�ncia
		//se n�o, a imagem atual � armazenada no quado de anima��o
		//
		if ($i("mapaReferencia") && objmapa.extent != mapexten)
		{
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=referencia&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2);
			cp.set_response_type("JSON");
			cp.call(p,"retornaReferencia",ajaxReferencia);
		}
		else
		{
			if($i("imagemReferencia"))
			gravaQuadro("referencia",$i("imagemReferencia").src);
		}		
	};
	/*
	Function: atualizaLegendaHTML
	
	Atualiza a legenda, em HTML, nos ids legenda e moveLegi
	*/
	this.atualizaLegendaHTML = function()
	{
		if  (($i("moveLegi")) || ($i("legenda") && $i(objmapa.guiaLegenda+"obj") && $i(objmapa.guiaLegenda+"obj").style.display == "block"))
		{
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"criaLegenda",ajaxLegendaHTML);
		}
	};
	/*
	Function: atualizaLegendaImagem
	
	Atualiza a legenda no formato de uma imagem
	*/
	this.atualizaLegendaImagem = function()
	{
		if ($i("legenda"))
		{
			//objaguarde.abre("ajaxLegenda","Aguarde...atualizando a legenda");
			var p =g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaImagem&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"legendaGrafica",ajaxLegendaImagem);
		}
	};
	/*
	Function: atualizaListaTemas
	
	Atualiza a lista de temas dispon�veis no mapa (guia com a lista de temas)
	
	Parameters:
	
	temas - lista de temas. Se vazio, utiliza o objeto objmapa.temas
	*/
	this.atualizaListaTemas = function(temas)
	{
		if (($i("listaTemas")) && (objmapa.temas != temas))
		{
			$i("listaTemas").innerHTML = "";
			var lista = temas.split(";");
			mytreeview1 = new Object();
			mytreeview1 = treeviewNew("mytreeview1", "default", "listaTemas", null);
			mytreeview1.createItem("g1", "<b>Camadas</b>", g_locaplic+"/imagens/foldermapa.gif", true, true, true, null);
			mytreeview1.itemExpand = expandeTema;
			var cor = "rgb(250,250,250)";
			//codigo,status,nome,transparencia,tipo,selecao,escala,download,tem features,conexao,tem wfs
			for (l=0;l<lista.length; l++)
			{
				var ltema = lista[l].split("*");
				var ck = "";
				if(ltema[1] == 2){ck = 'CHECKED';}
				//ltema[8]==sim indica que e um tema com features
				if (ltema[8] == undefined){ltema[8] = "nao";}
				tnome = "<input class=inputsb style='cursor:pointer' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" type='checkbox' name=\"layer\" value='"+ltema[0]+"' "+ ck +" onclick='mudaboxnf(\"ligadesliga\")'/>";
				if (ltema[5] == "sim") //o tema tem selecao
				{tnome += "&nbsp;<img src="+$im("estasel.png")+" title='limpa sele&ccedil;&atilde;o' onclick='limpaseltemaf(this)' onmouseover=\"javascript:mostradicasf(this,'Limpa sele&ccedil;&atilde;o existente nesse tema','limpasel')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				//verifica se e um wms que tem wfs
				if ((ltema[10] == "sim") || (ltema[10] == "SIM"))
				{tnome += "&nbsp;<img src="+$im("down1.gif") +" title='download' onclick='download(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para fazer o download desse tema no formato shapefile','download')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				if ((ltema[7] == "sim") || (ltema[7] == "SIM"))
				{tnome += "&nbsp;<img src="+$im("down1.gif") +" title='download' onclick='download(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para fazer o download desse tema no formato shapefile','download')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";}
				if (navm)
				{tnome += "<span style='background-color:"+cor+"' id=nometema"+ltema[0]+">&nbsp;" + ltema[2]+"</span>";}
				else
				{tnome += "<span style='background-color:"+cor+"' id=nometema"+ltema[0]+">&nbsp;" +"<img src='"+g_locaplic+"/imagens/branco.gif' width=0 height=15 />" +ltema[2]+"</span>";}
				mytreeview1.createItem(ltema[0], tnome, null, true, true, true, "g1");
				tnome = "<img width=0px src="+$im("branco.gif") + " />";
				mytreeview1.createItem("", tnome, imgBranco, false, true, false, ltema[0]);
				if (cor == "rgb(250,250,250)"){var cor = "none";}
				else
				{var cor = "rgb(250,250,250)";}
			}
		}
	};
	/*
	Function: atualizaFarol
	
	Atualiza o farol de cada tema.
	
	O farol identifica a compatibilidade da escala do mapa com a escala de cada tema
	
	Parameters:
	
	mapscale - escala de compara��o com a escala de cada tema
	*/
	this.atualizaFarol = function(mapscale)
	{
		//mapscale � o valor da escala do novo mapa
		if (objmapa.scale != mapscale)
		{
			var lista = (objmapa.temas).split(";");
			var farol = "maisamarelo.png";
			for (l=0;l<lista.length; l++)
			{
				var ltema = lista[l].split("*");
				if (ltema[6]*1 < mapscale*1)
				{var farol = "maisverde.png";}
				if (ltema[6]*1 > mapscale*1)
				{var farol = "maisvermelho.png";}
				if (ltema[6]*1 == 0)
				{var farol = "maisamarelo.png";}
				if ($i("farol"+ltema[0]))
				{
					$i("farol"+ltema[0]).src = g_locaplic+"/imagens/"+farol;
				}
			}
		}
	};
	/*
	Function: criaCorpoMapa
	
	Cria os objetos para preenchimento com a imagem do corpo do mapa.
	
	*/
	this.criaCorpoMapa = function()
	{
		if ($i("corpoMapa"))
		{
			var ins = "<table>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgN' /></td><td class=verdeclaro ></td></tr>";
			ins += "<tr><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgL' /></td><td class=verdeclaro ><input style='position:relative;top:0px;left:0px'' type=image src='' id='img' /></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgO' /></td></tr>";
			ins += "<tr><td class=verdeclaro ></td><td class=verdeclaro ><input style='display:none;position:relative' type=image src='' id='imgS' /></td><td class=verdeclaro ></td></tr>";
			ins += "</table>";
			$i("corpoMapa").innerHTML = ins;
		}
		//insere a figura que segue o mouse
		var novoel = document.createElement("div");
		novoel.style.zIndex=1000;
		novoel.id="obj";
		var novoimg = document.createElement("img");
		novoimg.src= g_locaplic+"/imagens/pan.gif";
		novoimg.name="imgh";
		novoimg.id='imgh';
		novoimg.style.width = "15px";
		novoimg.style.height = "15px";
		novoel.appendChild(novoimg);
		novoel.onmouseover = function()
		{this.style.display = "none";};
		novoel.onmouseout = function()
		{this.style.display = "block";};
		document.body.appendChild(novoel);
		var docMapa = "";
		if (document.getElementById("openlayers_OpenLayers_Container"))
		{
			var docMapa = $i("openlayers_OpenLayers_Container");
		}
		if (document.getElementById("img"))
		{
			var docMapa = $i("img");
			//insere box de zoom
			var novoel = document.createElement("div");
			novoel.style.width = "0px";
			novoel.style.height = "0px";
			novoel.id = "box1";
			document.body.appendChild(novoel);
			if (navm)
			{
				$i("box1").style.filter = "alpha(opacity=25)";
			}
			$i("box1").onmousemove = function()
			{
				var wb = parseInt($i("box1").style.width);
				var hb = parseInt($i("box1").style.height);
				if (navn)
				{
					with(this.style){width = wb - 10 + "px";}
					with(this.style){height = hb - 10 + "px";}
				}
				if (navm)
				{
					$i("box1").style.width = wb - 2;
					$i("box1").style.height = hb - 2;
				}
			};
			$i("box1").onmouseup = function(){zoomboxf("termina")};
			//funcoes que operam sobre o mapa
			this.parado = "nao"; //utilizado para verificar se o mouse esta parado
		}
		if (docMapa != "")
		{
			ativaClicks(docMapa);
		}
		this.atualizaCorpoMapa = function()
		{
			objaguarde.abre("ajaxCorpoMapa","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=corpo&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"redesenhaCorpo",ajaxCorpoMapa);
		};
		if (objmapa.finaliza)
		{eval(objmapa.finaliza);}
		//
		//altera o tamanho das guias
		//
		if ($i(objmapa.guiaTemas+"obj"))
		{
			$i(objmapa.guiaTemas+"obj").style.overflow="auto";
			$i(objmapa.guiaTemas+"obj").style.height = objmapa.h-13;
		}
		if ($i(objmapa.guiaMenu+"obj"))
		{
			$i(objmapa.guiaMenu+"obj").style.overflow="auto";
			$i(objmapa.guiaMenu+"obj").style.height = objmapa.h-13;
			$i(objmapa.guiaMenu+"obj").style.width = "100%";
		}
		if ($i(objmapa.guiaLegenda+"obj"))
		{
			$i(objmapa.guiaLegenda+"obj").style.overflow="auto";
			$i(objmapa.guiaLegenda+"obj").style.height = objmapa.h-13;
			$i(objmapa.guiaLegenda+"obj").style.width = "100%";
		}
	};
	/*
	Function: verificaClickMapa
	
	Verifica se existem fun��es adicionais que devem ser executadas quando o usu�rio clica no mapa.
	*/
	this.verificaClickMapa = function()
	{
		if (this.funcoesClickMapa.length > 0)
		{
			for (f=0;f<this.funcoesClickMapa.length; f++)
			{
				eval(this.funcoesClickMapa[f]);
			}
		}
	};
}
/*
Title: Menu suspenso

Monta o menu suspenso.

File: menususpenso.js


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
Function: montaMenuSuspenso

Monta o menu baseado na vari�vel oMenuData
*/
function montaMenuSuspenso()
{ 
	if($i("menus"))
	{
		$i("menus").className="yuimenubar yuimenubarnav";
		if(oMenuData.ajudas)
		{
			var ins='<div class="bd" style="z-index:2000;" >';
			ins += '<ul class="first-of-type">';
			ins += '<li class="yuimenubaritemlabel"><a class="yuimenubaritemlabel" ><img style="width:12px;height:12px;"src="'+g_locaplic+'/imagens/visual/default/chat_icon_01.png"/>&nbsp;Ajuda?</a></li>';
			ins += '<li class="yuimenubaritemlabel"><a><img style="width:12px;height:12px;"src="'+g_locaplic+'/imagens/visual/default/grey_wheel_cedric_bosdon_01.png"/>&nbsp;An&aacute;lise</a></li>';
			if(!$i("listaPropriedades"))
			{
				ins += '<li class="yuimenubaritemlabel"><a>Propriedades</a></li>';
			}
 			ins += '<li class="yuimenubaritemlabel"><a><img style="width:12px;height:12px;"src="'+g_locaplic+'/imagens/visual/default/gthumb.png"/>&nbsp;Janelas</a></li>';
 			ins += '<li class="yuimenubaritemlabel"><a><img style="width:12px;height:12px;"src="'+g_locaplic+'/imagens/visual/default/bb_dsk_.png"/>&nbsp;Arquivo</a></li>';
 			ins += '</ul>'; ins+='</div>'; $i("menus").innerHTML=ins;
 		}
		function onMenuBarBeforeRender(p_sType, p_sArgs)
		{
			var conta=0;
			for(nomeMenu in oMenuData)
			{
				var v="this.getItem("+conta+").cfg.setProperty('submenu',{id:'"+nomeMenu+"',itemdata: oMenuData['"+nomeMenu+"']})";
				eval(v);
				var conta=conta+1;
			}
		}
	}
	else{return;}
 	var oMenuBar=new YAHOO.widget.MenuBar("menus",{autosubmenudisplay: true, showdelay: 250, hidedelay: 750, lazyload: true});
 	oMenuBar.beforeRenderEvent.subscribe(onMenuBarBeforeRender);
 	oMenuBar.render();
}
function testamenususpenso(){}


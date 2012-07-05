/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Esta classe foi depreciada e podera ser removida. Veja i3geo/ferramentas/selecao/index.js

*/
if(typeof(i3GEO) === 'undefined'){
	var i3GEO = {};
}
i3GEO.selecao = {
	porxy: function(tema,tipo,tolerancia){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.selecao.porxy()");}
		var retorna = function(retorno)
		{i3GEO.atualiza(retorno);};
		i3GEO.php.selecaopt(retorna,tema,objposicaocursor.ddx+" "+objposicaocursor.ddy,tipo,tolerancia);
	},
	porbox: function(tema,tipo,box){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.navega.selecao.porbox()");}
		var retorna = function(retorno)
		{i3GEO.atualiza(retorno);};
		i3GEO.php.selecaobox(retorna,tema,tipo,box);
	},
	janelaOpcoes: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.selecao.janelaOpcoes()");}
		var janela,temp;
		g_tipoacao = "selecao";
		i3GEO.mapa.ativaTema("");
		janela = i3GEO.janela.cria("430px","320px",i3GEO.configura.locaplic+'/ferramentas/selecao/index.htm',"","","Sele&ccedil;&atilde;o  <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=48a' >&nbsp;&nbsp;&nbsp;</a>");
		if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.selecao.clique()") < 0)
		{i3GEO.eventos.MOUSECLIQUE.push("i3GEO.selecao.clique()");}
		if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.selecao.atualizaGrafico()") < 0)
		{i3GEO.eventos.NAVEGAMAPA.push("i3GEO.selecao.atualizaGrafico()");}

		temp = function(){
			i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.selecao.clique()");
			i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.selecao.atualizaGrafico()");
			try{
				i3GEO.desenho.richdraw.fecha();
			}
			catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
			}
			if($i("pontosins")){document.body.removeChild($i("pontosins"));}
			i3GEO.barraDeBotoes.ativaBotoes();
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
	},
	atualizaGrafico: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.selecao.atualizaGrafico()");}
		if(g_tipoacao === "selecao"){
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if(doc.getElementById("guia5obj")){
				if(doc.getElementById("guia5obj").style.display==="block"){
					if(window.parent.frames.wdocai.atualizaGrafico)
					{window.parent.frames.wdocai.atualizaGrafico();}
				}
			}
		}
	},
	clique: function(){
		if(typeof(console) !== 'undefined'){console.info("i3GEO.selecao.clique()");}
		if (g_tipoacao === "selecao"){
			var doc,tipo,tolerancia;
			doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			tipo = "adiciona";
			//pega o tipo de operacao da janela de selecao
			if(doc.getElementById("tipoOperacao"))
			{tipo = doc.getElementById("tipoOperacao").value;}
			if (i3GEO.temaAtivo === "")
			{alert("Nenhum tema ativo");return;}
			tolerancia = doc.getElementById("toleranciapt").value;
			//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
			if ((tipo !== "limpa") && (tipo !== "inverte"))
			{i3GEO.selecao.porxy(i3GEO.temaAtivo,tipo,tolerancia);}
		}
	},
	box: {
		inicia: function(){
			if(g_tipoacao !== 'selecaobox')
			{return;}
			i3GEO.selecao.box.criaBox();
			adicionaxyBox = i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));
			var i = $i("i3geoboxSel").style;
			i.width=0 + "px";
			i.height=0 + "px";
			i.visibility="visible";
			i.display="block";
			i.left = objposicaocursor.imgx + adicionaxyBox[0] + "px";
			i.top = objposicaocursor.imgy + adicionaxyBox[1] + "px";

			boxxini = objposicaocursor.imgx + adicionaxyBox[0];
			boxyini = objposicaocursor.imgy + adicionaxyBox[1];
			tamanhox = 0;
			tamanhoy = 0;
			if(i3GEO.eventos.MOUSEMOVE.toString().search("i3GEO.selecao.box.desloca()") < 0)
			{i3GEO.eventos.MOUSEMOVE.push("i3GEO.selecao.box.desloca()");}
			if(i3GEO.eventos.MOUSEUP.toString().search("i3GEO.selecao.box.termina()") < 0)
			{i3GEO.eventos.MOUSEUP.push("i3GEO.selecao.box.termina()");}
		},
		/*
		 criaBox

		Cria o DIV que sera utilizado para desenhar o box no mapa
		*/
		criaBox: function(){
			try{i3GEO.desenho.richdraw.fecha();}catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
			}
			i3GEO.desenho.criaContainerRichdraw();
			i3GEO.desenho.richdraw.lineColor = "red";
			i3GEO.desenho.richdraw.lineWidth = "2px";
			var novoel,temp;
			if(!$i("i3geoboxSel")){
				novoel = document.createElement("div");
				novoel.style.width = "0px";
				novoel.style.height = "0px";
				novoel.id = "i3geoboxSel";
				novoel.style.display = "none";
				novoel.style.fontSize = "0px";
				if(navn)
				{novoel.style.opacity = 0.25;}
				novoel.style.backgroundColor = "yellow";
				novoel.style.position="absolute";
				novoel.style.border = "2px solid #ff0000";
				if (navm)
				{novoel.style.filter = "alpha(opacity=25)";}
				novoel.onmousemove = function(){
					var b,wb,hb;
					b = $i("i3geoboxSel").style;
					wb = parseInt(b.width,10);
					hb = parseInt(b.height,10);
					if (navm){
						if(wb > 2)
						{b.width = wb - 2 + "px";}
						if(hb > 2)
						{b.height = hb - 2 + "px";}
					}
					else{
						b.width = wb - 2 + "px";
						b.height = hb - 2 + "px";
					}
				};
				novoel.onmouseup = function()
				{i3GEO.selecao.box.termina();};
				document.body.appendChild(novoel);
			}
			i3GEO.util.mudaCursor(i3GEO.configura.cursores,"zoom","i3geoboxSel",i3GEO.configura.locaplic);
			if($i("img")){
				$i("img").title = "";
				temp = "zoom";
				if(i3GEO.Interface.ATIVAMENUCONTEXTO)
				{temp = "zoom_contexto";}
				i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,"img",i3GEO.configura.locaplic);
			}
		},
		/*
		 desloca

		Desloca o box conforme o mouse e movimentado
		*/
		desloca: function(){
			if(g_tipoacao !== 'selecaobox')
			{return;}
			var bxs,ppx,py;
			bxs = $i("i3geoboxSel").style;
			if(bxs.display !== "block")
			{return;}
			ppx = objposicaocursor.imgx + adicionaxyBox[0];
			py = objposicaocursor.imgy + adicionaxyBox[1];
			if (navm){
				if ((ppx > boxxini) && ((ppx - boxxini - 2) > 0))
				{bxs.width = ppx - boxxini - 2 + "px";}
				if ((py > boxyini) && ((py - boxyini - 2) > 0))
				{bxs.height = py - boxyini - 2 + "px";}
				if (ppx < boxxini)
				{bxs.left = ppx;bxs.width = boxxini - ppx + 2 + "px";}
				if (py < boxyini)
				{bxs.top = py;bxs.height = boxyini - py + 2 + "px";}
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
		 termina

		Para o desenho do box, captura seu tamanho e faz o zoom no mapa
		*/
		termina: function(){
			if(g_tipoacao !== 'selecaobox')
			{return;}
			var valor,v,x1,y1,x2,y2,
				limpa = function(){},
				doc,tipo;
			try{
				valor = i3GEO.calculo.rect2ext("i3geoboxSel",i3GEO.parametros.mapexten,i3GEO.parametros.pixelsize);
				v = valor[0];
				x1 = valor[1];
				y1 = valor[2];
				x2 = valor[3];
				y2 = valor[4];
				limpa = function(){
					var bxs = $i("i3geoboxSel").style;
					bxs.display="none";
					bxs.visibility="hidden";
					bxs.width = 0 + "px";
					bxs.height = 0 + "px";
				};
				if((x1 === x2) || (y1 === y2))
				{limpa.call();return;}
				// se o retangulo for negativo pula essa parte para nao gerar erro
				i3GEO.parametros.mapexten=v;
				limpa.call();
				i3GEO.eventos.MOUSEMOVE.remove("i3GEO.selecao.box.desloca()");
				i3GEO.eventos.MOUSEUP.remove("i3GEO.selecao.box.termina()");

				doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				tipo = "adiciona";
				//pega o tipo de operacao da janela de selecao
				if (doc.getElementById("tipoOperacao"))
				{tipo = doc.getElementById("tipoOperacao").value;}

				if ((tipo !== "limpa") && (tipo !== "inverte"))
				{i3GEO.selecao.porbox(i3GEO.temaAtivo,tipo,v);}
			}
			catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
				limpa.call();
				return;
			}
		}
	},
	/*
	 i3GEO.selecao.poligono

	Realiza a selecao desenhando um poligono no mapa
	*/
	poligono:{
		/*
		 inicia

		Inicia o desenho do poligono
		*/
		inicia: function(){
			try
			{i3GEO.desenho.richdraw.fecha();}
			catch(e){
				if(typeof(console) !== 'undefined'){console.error(e);}
			}
			i3GEO.util.insereMarca.limpa();
			g_tipoacao = "selecaopoli";
			alert($trad("x20"));
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
		 move

		Modifica o poligono conforme o usuario cria vertices
		*/
		move: function(){
			if (g_tipoacao === "selecaopoli"){
				var n = pontosdistobj.xpt.length;
				if (n > 0){
					i3GEO.desenho.aplica("resizePoligono",pontosdistobj.linhas[n-1],n);
				}
			}
		},
		/*
		 clique

		Inclui um novo vertice no poligono
		*/
		clique: function(){
			if (g_tipoacao !== "selecaopoli"){return;}
				var n,d;
				n = pontosdistobj.xpt.length;
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
				catch(e){
					if(typeof(console) !== 'undefined'){console.error(e);}
				}
				if (n > 0){
					d = parseInt(i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy),10);
					pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
				}
			i3GEO.util.insereMarca.cria(objposicaocursor.imgx,objposicaocursor.imgy,i3GEO.selecao.poligono.termina,"divGeometriasTemp");
		},
		/*
		termina

		Termina o desenho do poligono e executa a operacao de selecao
		*/
		termina: function(){
			var doc,pontos,xs,ys,retorna,p,cp;
			doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			pontos = pontosdistobj;
			i3GEO.desenho.richdraw.fecha();
			i3GEO.mapa.ativaTema(doc.getElementById("comboTemas").value);
			xs = pontos.xpt.toString(",");
			ys = pontos.ypt.toString(",");
			retorna = function(){
				i3GEO.janela.fechaAguarde("i3GEO.atualiza",$trad("o1"));
				i3GEO.atualiza("");
			};
			p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=selecaoPoli";
			cp = new cpaint();
			//cp.set_debug(2)
			cp.set_transfer_mode('POST');
			cp.set_response_type("JSON");
			cp.call(p,"selecaoPoli",retorna,xs,ys,doc.getElementById("comboTemas").value,doc.getElementById("tipoOperacao").value);
		}
	}
};
//YAHOO.log("carregou classe selecao", "Classes i3geo");
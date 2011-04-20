<?php error_reporting(0);if(extension_loaded('zlib')){ob_start('ob_gzhandler');} header("Content-type: text/javascript"); ?>
/*jslint plusplus:false,white:false,undef: false, rhino: true, onevar: true, evil: true */

/*
Title: Cortina

Aplica um efeito de cortina a um tema, permitindo mostr�-lo ou escond�-lo de forma controlada por um bot�o deslizante.
Funciona apenas nas interfaces que utilizam camadas m�ltiplas, como a interface openlayers

Veja:

<i3GEO.tema.dialogo.cortina>

Arquivo:

i3geo/ferramentas/cortina/index.js.php

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/

if(typeof(i3GEOF) === 'undefined'){
	i3GEOF = [];
}
/*
Classe: i3GEOF.cortina
*/
i3GEOF.cortina = {
	/*
	Variavel: aguarde
	
	Estilo do objeto DOM com a imagem de aguarde existente no cabe�alho da janela.
	*/
	aguarde: "",
	/*
	Variavel: tema
	
	C�digo do tema definido na inicializa��o da janela e que ser� alvo da cortina.
	*/
	tema: "",
	/*
	Variavel: janela
	
	Janela flutuante criada
	
	Type:
	{YAHOO.panel}
	*/
	janela: "",
	/*
	Function: inicia
	
	Inicia a ferramenta. � chamado por criaJanelaFlutuante
	
	Parametro:
	
	iddiv {String} - id do div que receber� o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		//if(navm)
		//{alert("Esta ferramenta nao funciona adequadamente no Internet Explorer. Experimente usar o Firefox");}
		try{
			$i(iddiv).innerHTML = i3GEOF.cortina.html();
		}
		catch(erro){alert(erro);}
		i3GEOF.cortina.criaslide();
		i3GEOF.cortina.comboTemas();
	},
	/*
	Function: html
	
	Gera o c�digo html para apresenta��o das op��es da ferramenta
	
	Retorno:
	
	String com o c�digo html
	*/
	html:function(){
		var ins = "<div id='i3GEOcortinaTemasDiv' style='text-align:left;font-size:11px'></div>";
		if(navm){
			ins += '<div id="slider-bg" class="yui-h-slider" style="background: url('+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/bg-h.gif) no-repeat -108px 0;height: 28px;width: 210px;" tabindex="-1" title="Slider">' +
				'<div id="slider-thumb" class="yui-slider-thumb"><img src="'+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/thumb-n.gif"></div>' +
				'</div>';
		}
		else{
			ins += '<div id="slider-bg" class="yui-h-slider" style="background: url('+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/bg-h.gif) no-repeat 5px 0;height: 28px;width: 210px;" tabindex="-1" title="Slider">' +
				'<div id="slider-thumb" class="yui-slider-thumb"><img src="'+i3GEO.configura.locaplic+'/pacotes/yui270/build/slider/assets/thumb-n.gif"></div>' +
				'</div>';
		}
		return ins;
	},
	/*
	Function: criaJanelaFlutuante
	
	Cria a janela flutuante para controle da ferramenta.
	
	Parametro:
	
	tema {string} - codigo do tema
	
	mx {numero} - (opcional) posi��o em x para onde a janela ser� movida ap�s ser criada
	
	my {numero} - (opcional) posi��o em y para onde a janela ser� movida ap�s ser criada
	*/
	criaJanelaFlutuante: function(tema,mx,my){
		if(tema == undefined)
		{tema = i3GEO.temaAtivo;}
		else
		{i3GEO.mapa.ativaTema(tema);}
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.cortina");
			//i3GEOF.cortina.slider.setValue(0,false);
		};		
		var janela,divid,temp,titulo;
		i3GEOF.cortina.tema = tema;
		//cria a janela flutuante
		titulo = "Cortina <a class=ajuda_usuario target=_blank href='" + i3GEO.configura.locaplic + "/ajuda_usuario.php?idcategoria=5&idajuda=86' >&nbsp;&nbsp;&nbsp;</a>";
		janela = i3GEO.janela.cria(
			"230px",
			"60px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.cortina",
			false,
			"hd",
			"",
			minimiza
		);
		divid = janela[2].id;
		i3GEOF.cortina.janela = janela[0];
		if(mx != undefined)
		{janela[0].moveTo(mx,my);}
		$i("i3GEOF.cortina_corpo").style.backgroundColor = "white";
		$i("i3GEOF.cortina_corpo").style.textAlign = "left";
		i3GEOF.cortina.aguarde = $i("i3GEOF.cortina_imagemCabecalho").style;
		temp = function(){
			var layer,estilo;
			if(i3GEO.Interface.ATUAL === "openlayers"){
				layer = i3geoOL.getLayersByName(i3GEO.temaAtivo)[0];
				if(layer)
				{estilo = layer.div.style;}
			}
			if(i3GEO.Interface.ATUAL === "googlemaps"){
				layer = i3GEO.Interface.googlemaps.retornaDivLayer(i3GEO.temaAtivo);
				if(layer)
				{estilo = layer.style;}
			}
			if(layer)
			{estilo.clip = "rect(0px,"+i3GEO.parametros.w+"px,"+i3GEO.parametros.h+"px,0px)";}
			if(i3GEO.eventos.ATUALIZAARVORECAMADAS.toString().search("i3GEOF.cortina.comboTemas()") > 0)
			{i3GEO.eventos.ATUALIZAARVORECAMADAS.remove("i3GEOF.cortina.comboTemas()");}
			i3GEOF.cortina.slider = null;
		};
		YAHOO.util.Event.addListener(janela[0].close, "click", temp);
		if(i3GEO.eventos.ATUALIZAARVORECAMADAS.toString().search("i3GEOF.cortina.comboTemas()") < 0)
		{i3GEO.eventos.ATUALIZAARVORECAMADAS.push("i3GEOF.cortina.comboTemas()");}
		i3GEOF.cortina.inicia(divid);
	},
	/*
	Function: criaslide
	
	Cria a barra deslizante com base em YAHOO.widget.Slider
	*/
	criaslide: function(){
		i3GEOF.cortina.slider = YAHOO.widget.Slider.getHorizSlider($i("slider-bg"),$i("slider-thumb"), 0, 200, 0);
		var	layer;
		if(i3GEOF.cortina.tema !== ""){
			if(i3GEO.Interface.ATUAL === "openlayers"){
				layer = i3geoOL.getLayersByName(i3GEOF.cortina.tema)[0];
				i3GEOF.cortina.estilo = layer.div.style;
			}
			if(i3GEO.Interface.ATUAL === "googlemaps"){
				layer = i3GEO.Interface.googlemaps.retornaDivLayer(i3GEOF.cortina.tema);
				i3GEOF.cortina.estilo = layer.style;
			}
			i3GEOF.cortina.estilo.clip = "rect(0px,"+i3GEO.parametros.w+"px,"+i3GEO.parametros.h+"px,0px)";
		}
		i3GEOF.cortina.slider.setValue(0,false);
		i3GEOF.cortina.slider.subscribe("change", function(offsetFromStart) {
			var t=0,
				r=i3GEO.parametros.w,
				b=i3GEO.parametros.h,
				l=0,
				escala = r / 200;
			l = l + (offsetFromStart * escala);
			i3GEOF.cortina.estilo.clip = "rect("+t+"px,"+r+"px,"+b+"px,"+l+"px)";
		});
		if(navm){
			$i("slider-bg").style.left = "-100px";
			$i("i3GEOF.cortina_corpo").style.background = "url("+i3GEO.configura.locaplic+"/pacotes/yui270/build/slider/assets/bg-h.gif) white no-repeat 10px 0px";
		}
	},
	/*
	Function: reiniciaSlide
	
	Zera a barra do slide
	*/
	reiniciaSlide: function(){
		var divlayer,layer;
		i3GEOF.cortina.slider.setValue(0,false);
		if(i3GEO.Interface.ATUAL === "openlayers"){
			layer = i3geoOL.getLayersByName(i3GEOF.cortina.tema)[0];
			if(layer)
			{i3GEOF.cortina.estilo = layer.div.style;}
		}
		if(i3GEO.Interface.ATUAL === "googlemaps"){
			layer = i3GEO.Interface.googlemaps.retornaDivLayer(i3GEOF.cortina.tema);
			if(layer)
			{i3GEOF.cortina.estilo = layer.style;}
		}
		i3GEOF.cortina.slider.subscribe("change", function(offsetFromStart) {
			var t=0,
				r=i3GEO.parametros.w,
				b=i3GEO.parametros.h,
				l=0,
				escala = r / 200;
			l = l + (offsetFromStart * escala);
			i3GEOF.cortina.estilo.clip = "rect("+t+"px,"+r+"px,"+b+"px,"+l+"px)";
		});
	},
	/*
	Function: comboTemas
	
	Cria um combo com a lista de temas
	
	Veja:
	
	<i3GEO.util.comboTemas>
	*/
	comboTemas: function(){
		i3GEO.util.comboTemas(
			"i3GEOcortinatemas",
			function(retorno){
		 		$i("i3GEOcortinaTemasDiv").innerHTML = retorno.dados;
		 		$i("i3GEOcortinaTemasDiv").style.display = "block";
		 		if ($i("i3GEOcortinatemas")){
		 			$i("i3GEOcortinatemas").onchange = function(){
						if(i3GEOF.cortina.estilo)
						{i3GEOF.cortina.estilo.clip = "rect(0px,"+i3GEO.parametros.w+"px,"+i3GEO.parametros.h+"px,0px)";}
						var t = $i("i3GEOcortinatemas").value;
						i3GEO.mapa.ativaTema(t);
						i3GEOF.cortina.tema = t;
						i3GEOF.cortina.reiniciaSlide();
		 			};
					$i("i3GEOcortinatemas").style = "210px";
				}
				if(i3GEO.temaAtivo !== ""){
					$i("i3GEOcortinatemas").value = i3GEO.temaAtivo;
					$i("i3GEOcortinatemas").onchange.call();
				}
			},
			"i3GEOcortinaTemasDiv",
			"",
			false,
			"ligados"
		);	
	}
};
<?php error_reporting(0);if(extension_loaded('zlib')){ob_end_flush();}?>
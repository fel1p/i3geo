if(typeof(i3GEOF) === 'undefined'){
	var i3GEOF = {};
}
/*
Classe: i3GEOF.filtroarvore

*/
i3GEOF.filtroarvore = {
	/*
	Variavel: aguarde

	Estilo do objeto DOM com a imagem de aguarde existente no cabe&ccedil;alho da janela.
	*/
	aguarde: "",
	/**
	 * Template no formato mustache. E preenchido na carga do javascript com o programa dependencias.php
	 */
	MUSTACHE : "",
	/**
	 * Susbtitutos para o template
	 */
	mustacheHash : function() {
		var dicionario = i3GEO.idioma.objetoIdioma(i3GEOF.filtroarvore.dicionario);
		return dicionario;
	},
	/*
	Function: inicia

	Inicia a ferramenta. &Eacute; chamado por criaJanelaFlutuante

	Parametro:

	iddiv {String} - id do div que receber&aacute; o conteudo HTML da ferramenta
	*/
	inicia: function(iddiv){
		if(i3GEOF.filtroarvore.MUSTACHE == ""){
			$.get(i3GEO.configura.locaplic + "/ferramentas/filtroarvore/template_mst.html", function(template) {
				i3GEOF.filtroarvore.MUSTACHE = template;
				i3GEOF.filtroarvore.inicia(iddiv);
			});
			return;
		}
		$i(iddiv).innerHTML = i3GEOF.filtroarvore.html();
	},
	/*
	Function: html

	Gera o c&oacute;digo html para apresenta&ccedil;&atilde;o das op&ccedil;&otilde;es da ferramenta

	Retorno:

	String com o c&oacute;digo html
	*/
	html:function() {
		var ins = Mustache.render(i3GEOF.filtroarvore.MUSTACHE, i3GEOF.filtroarvore.mustacheHash());
		return ins;
	},
	/*
	Function: iniciaJanelaFlutuante

	Cria a janela flutuante para controle da ferramenta.
	*/
	iniciaJanelaFlutuante: function(){
		var janela,divid,titulo,cabecalho,minimiza;
		if($i("i3GEOF.filtroarvore")){
			return;
		}
		cabecalho = function(){};
		minimiza = function(){
			i3GEO.janela.minimiza("i3GEOF.filtroarvore");
		};
		//cria a janela flutuante
		titulo = "<span class='i3GeoTituloJanelaBsNolink' >" + $trad("t29") + "</span></div>";
		janela = i3GEO.janela.cria(
			"270px",
			"160px",
			"",
			"",
			"",
			titulo,
			"i3GEOF.filtroarvore",
			false,
			"hd",
			cabecalho,
			minimiza,
			"",
			true,
			"",
			"",
			"",
			"",
			"97"
		);
		divid = janela[2].id;
		$i("i3GEOF.filtroarvore_corpo").style.backgroundColor = "white";
		i3GEOF.filtroarvore.aguarde = $i("i3GEOF.filtroarvore_imagemCabecalho").style;
		i3GEOF.filtroarvore.inicia(divid);
	},
	/*
	Function: lote

	Executa uma opera&ccedil;&atilde;o em lote sobre as camadas mostradas no mapa

	*/
	lote: function(objeto){
		var operacao = objeto.value,
			lista = i3GEO.arvoreDeCamadas.listaLigadosDesligados();
		if(operacao === "excluir"){
			i3GEO.janela.confirma(
				"Remove do mapa?",
				300,
				$trad("x14"),
				$trad("x15"),
				function(){
					i3GEO.php.excluitema(i3GEO.atualiza,lista[2]);
				}
			);
		}
		objeto.value = "";
	}
};

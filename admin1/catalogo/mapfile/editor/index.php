<?php
//TODO botoes de copiar, colar, limpar
//TODO testa tabela do mapfile em um modal
//TODO preview com openlayers
//TODO editor de cores
//
define ( ONDEI3GEO, "../../../.." );
include (dirname ( __FILE__ ) . "/../../../../ms_configura.php");
error_reporting ( 0 );
include "../../../head.php";
$codigo = filter_var ( $_GET ["codigo"], FILTER_SANITIZE_STRING );
$id_tema = ( int ) $_GET ["id_tema"];
include ("exec.php");
salvaMapfile();
$textoMapfile = textoMapfile ( $codigo );
?>
<div class="container-fluid migalha">
	<div class="row">
		<div class="btn-group btn-breadcrumb">
			<a class="btn btn-default" href="../../../../init/index.php">
				<span>i3Geo</span>
			</a>
			<a class="btn btn-default" href="../../../index.php">
				<span>Admin</span>
			</a>
			<a class="btn btn-default" style="pointer-events: none">
				<span>Cat&aacute;logo</span>
			</a>
			<a class="btn btn-default" href="../index.php">
				<span>Mapfiles</span>
			</a>
			<a class="btn btn-default" href="../opcoes/index.php?codigo=<?php echo $codigo; ?>&id_tema=<?php echo $id_tema; ?>">
				<span>Op&ccedil;&otilde;es</span>
			</a>
			<a class="btn btn-default" style="pointer-events: none">
				<span><?php echo $codigo; ?></span>
			</a>
			<a class="btn btn-default" style="pointer-events: none">
				<span>Editor</span>
			</a>
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="row center-block">
		<div class="col-md-12">
			<div class="well" id="titulo">
				<blockquote>
					{{{ajudaEditor}}}
					<a href="http://mapserver.org/mapfile/index.html#mapfile" target="_new">Mapserver</a>
				</blockquote>
				<a onclick="i3GEOadmin.editor.salvar()" class="btn btn-primary" style="color: #008579;" href="#" role="button"> {{{salva}}} </a>
				<a onclick="i3GEOadmin.editor.preview()" class="btn btn-primary" style="color: #008579;" href="#" role="button"> Preview </a>
				<a onclick="i3GEOadmin.editor.testa('<?php echo $codigo;?>')" href="javascript:void(0)" class="btn btn-primary" style="color: #008579;" role="button"> {{{testaLayer}}} </a>
				<a onclick="window.open('../../../../ms_criamapa.php?temasa=<?php echo $codigo;?>&layers=<?php echo $codigo;?>')" class="btn btn-primary" style="color: #008579;" href="javascript:void(0)" role="button"> {{{testarI3geo}}} </a>
				<a onclick="window.open('../../../../ferramentas/recline/default.php?tema=<?php echo $codigo;?>')" class="btn btn-primary" style="color: #008579;" href="javascript:void(0)" role="button"> {{{tabela}}} </a>
			</div>
			<form action="index.php?codigo=<?php echo $codigo;?>&id_tema=<?php echo $id_tema;?>" method="post">
				<TEXTAREA id=editor name=texto class="well form-control" style='font-size: 16px; width: 100%; float: left; border: 2px dotted lightgray;'>
					<?php echo $textoMapfile; ?>
					</TEXTAREA>
			</form>
			<!-- para calcular a altura do textarea -->
			<pre id="editortemp" style="font-size: 16px; display: block; visibility: hidden;"><?php echo $textoMapfile; ?></pre>
		</div>
	</div>
</div>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="../teste/index.js"></script>
<script type="text/javascript" src="../../../dicionario/editormapfile.js"></script>
<script>

$(document).ready(function(){
		//vem de admin1/index.js
		iniciaMenuPrincipal();
		$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			$(this).parent().siblings().removeClass('open');
			$(this).parent().toggleClass('open');
		});
		//traducao
		var t = $("#titulo");
		//complementa dicionario
		i3GEOadmin.mapfile.dicionario = $.extend(
			{},
			i3GEOadmin.core.dicionario,
			i3GEOadmin.mapfile.dicionario
		);

		i3GEOadmin.core.dicionario = null;

		i3GEOadmin.editor.dicionario = i3GEO.idioma.objetoIdioma(i3GEOadmin.mapfile.dicionario);

		t.html(
			Mustache.to_html(
				t.html(),
				i3GEOadmin.editor.dicionario
			)
		);

		var inicia = function() {
			$(".hidden").removeClass('hidden');
		};
		i3GEO.login.verificaOperacao("admin/html/editortexto",i3GEO.configura.locaplic, inicia, "sessao");

		$.material.init();
		$("#editor").height(parseInt($("#editortemp").height()) + 50 + "px");
		$("#editortemp").html("").hide();
	});
</script>
</body>
</html>

<?php
define ( "ONDEI3GEO", "../../.." );
include "exec.php";
include "../../head.php";
?>
<div class="container-fluid migalha">
	<div class="row">
		<div class="btn-group btn-breadcrumb">
			<a class="btn btn-default" href="../../../init/index.php"><span>i3Geo</span></a>
			<a class="btn btn-default" href="../../index.php"><span>Admin</span></a>
			<a class="btn btn-default" style="pointer-events: none"><span>Cat&aacute;logo</span></a>
			<a class="btn btn-default" style="pointer-events: none"><span>Menus</span></a>
		</div>
	</div>
</div>
<div class="container">
	<div class="row center-block">
		<div class="col-md-12" id="titulo">
			<div class="well hidden" >
				<button title="preview" data-toggle="modal" data-target="#previewArvore"
					class="btn btn-primary btn-fab btn-fab-mini pull-right" style="left:10px">
					<i class="material-icons">visibility</i>
				</button>
				<button data-toggle="modal" data-target="#ajudaPrincipal"
					class="btn btn-primary btn-fab btn-fab-mini pull-right">
					<i class="material-icons">help</i>
				</button>
				<span class="pull-right">&nbsp;&nbsp;</span>
				<button data-toggle="modal" data-target="#modalFiltro"
					class="btn btn-primary btn-fab btn-fab-mini pull-right">
					<i class="material-icons">search</i>
				</button>
				<h2>
					<small>{{{txtTitulo}}}</small>
				</h2>
				<blockquote>{{{txtDesc}}}</blockquote>
				<div class="clearfix"></div>
				<div id="ajudaPrincipal" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<p>{{{txtAjuda}}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="well hidden">
				<div class="panel-heading">
					<p class="lead" style="margin:0px;">&nbsp;
						<a title="{{{adicionar}}}" onclick="i3GEOadmin.menus.adicionaDialogo();" href="javascript:void(0)"
							class="pull-right btn btn-danger btn-fab btn-fab-mini" role="button" ><i class="material-icons ">add</i>
						</a>
					</p>
				</div>
				<div class="clearfix"></div>
				<div id="corpo"></div>
			</div>
		</div>
	</div>
</div>
<?php
include("templates/templateLista.php");
include("templates/templateFormLista.php");
include("templates/templateFiltro.php");
include("templates/templateOpcoesPerfil.php");
include("../../templates/templateOpcoesPublicado.php");
include("../../templates/templateOpcoesAberto.php");
?>
<script type="text/javascript" src="../index.js"></script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="../../dicionario/menus.js"></script>
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
		i3GEOadmin.menus.dicionario = $.extend(
			{},
			i3GEOadmin.menus.dicionario,
			i3GEOadmin.core.dicionario
		);

		i3GEOadmin.core.dicionario = null;

		i3GEOadmin.menus.dicionario = i3GEO.idioma.objetoIdioma(i3GEOadmin.menus.dicionario);

		t.html(
			Mustache.to_html(
				t.html(),
				i3GEOadmin.menus.dicionario
			)
		);
		$.material.init();
			i3GEOadmin.core.loginOn();
			//verifica se foi enviado um parametro de filtro pela url
			var f = "<?php if (isset($_GET["id_filtro"])) echo filter_var($_GET["id_filtro"], FILTER_SANITIZE_NUMBER_INT); ?>";
			if(f != ""){
				i3GEOadmin.core.initFiltro = "form-" + f;
			}
			$(".hidden").removeClass('hidden');
			i3GEOadmin.menus.init($("#corpo"));
	});
</script>
</body>
</html>

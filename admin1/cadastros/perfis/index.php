<?php
define ( ONDEI3GEO, "../../.." );
include (dirname ( __FILE__ ) . "/../../../ms_configura.php");
error_reporting ( 0 );
include "../../head.php";
?>
<div class="container-fluid migalha">
	<div class="row">
		<div class="btn-group btn-breadcrumb">
			<a class="btn btn-default" href="../../../init/index.php"><div>i3Geo</div></a>
			<a class="btn btn-default" href="../../index.php"><div>Admin</div></a>
			<a class="btn btn-default" style="pointer-events: none"><div>Cadastros</div></a>
			<a class="btn btn-default" style="pointer-events: none"><div>Perfis</div></a>
		</div>
	</div>
</div>

<div class="container">
	<div class="row center-block">
		<div class="col-md-12" id="titulo">
			<div class="well hidden" >
				<!--
				<button data-toggle="modal" data-target="#ajudaPrincipal"
					class="btn btn-primary btn-fab btn-fab-mini pull-right">
					<i class="material-icons">help</i>
				</button>
				-->
				<button data-toggle="modal" data-target="#modalFiltro"
					class="btn btn-primary btn-fab btn-fab-mini pull-right">
					<i class="material-icons">search</i>
				</button>
				<h2><small>{{{txtTitulo}}}</small></h2>
				<blockquote>{{{txtDesc}}}</blockquote>
				<!--
				<div id="ajudaPrincipal" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<p>{{{txtAjuda}}}</p>
							</div>
						</div>
					</div>
				</div>
				-->
			</div>
			<div class="well hidden">
				<div class="row pull-right">
					<a onclick="i3GEOadmin.perfis.adicionaDialogo();" href="javascript:void(0)"
						class="btn btn-primary" role="button" style="color:#008579;">{{{adicionar}}}</a>
				</div>
				<div class="clearfix"></div>
				<div id="corpo"></div>
			</div>
		</div>
	</div>
</div>
<script id="templateFiltro" type="x-tmpl-mustache">
<option value="form-{{id_perfil}}">{{{perfil}}}</option>
</script>
<script id="templateFormLista" type="x-tmpl-mustache">
<form id="form-edicao-{{id_perfil}}" style="" action="#" onsubmit="{{onSalvar}}('{{id_perfil}}');return false;" onchange="this.style.boxShadow='2px 2px 5px 0 #009688';" class="form-horizontal" role="form"
	method="post"  >
	<div class="row">
		<div class="col-md-12">
			<h4>{{{txtPerfil}}}</h4>
			<div class="form-group form-group-lg">
				<div class="col-md-10">
					<input title="{{{perfil}}}" type="text" value="{{{perfil}}}" class="form-control" name="perfil" required>
				</div>
			</div>
		</div>
	</div>
	<div class="pull-right">
		<button type="submit" class="btn btn-primary" role="button" style="color:#008579;">{{salvar}}</button>
	</div>
	<div class="clearfix"></div>
</form>
</script>
<script id="templateLista" type="x-tmpl-mustache">
	<div class="list-group-item" id="form-{{id_perfil}}">
		<div class="row-content">
				<h3 class="list-group-item-heading {{escondido}}">
					<a href="javascript:void(0)" onclick="{{onEditar}}('{{id_perfil}}')" class="btn btn-danger btn-fab btn-fab-mini pull-right" role="button">
						<i class="material-icons md-18">edit</i>
					</a>
					<span class="pull-right">&nbsp;&nbsp;</span>
					<a href="javascript:void(0)" onclick="{{onExcluir}}('{{id_perfil}}')" class="btn btn-danger btn-fab btn-fab-mini pull-right" role="button">
						<i class="material-icons md-18">delete_forever</i>
					</a>
					&nbsp;{{{perfil}}}
				</h3>
		</div>
		<div class="list-group-separator"></div>
	</div>
</script>

<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="../../dicionario/perfis.js"></script>
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
		i3GEOadmin.perfis.dicionario = $.extend(
			{},
			i3GEOadmin.perfis.dicionario,
			i3GEOadmin.core.dicionario
		);

		i3GEOadmin.core.dicionario = null;

		i3GEOadmin.perfis.dicionario = i3GEO.idioma.objetoIdioma(i3GEOadmin.perfis.dicionario);

		t.html(
			Mustache.to_html(
				t.html(),
				i3GEOadmin.perfis.dicionario
			)
		);
		$.material.init();
		var inicia = function() {
			$(".hidden").removeClass('hidden');
			i3GEOadmin.perfis.init($("#corpo"));
		};
		i3GEO.login.verificaOperacao("admin/html/perfis",i3GEO.configura.locaplic, inicia, "sessao");
	});
</script>
</body>
</html>

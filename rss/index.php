<?php
define ( "ONDEI3GEO", ".." );
include (dirname ( __FILE__ ) . "/../ms_configura.php");
//error_reporting ( 0 );
include "../init/head.php";
?>
<style>
.list-group .list-group-separator::before{
	width: calc(100% - 45px);
}
.list-group-item-heading{
	line-height: 2;
	left: 5px;
	margin-left: 45px;
}
.list-group{
	margin: auto;
}
</style>
<body style="padding-top: 55px;">
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="../init/index.php?home="><?php echo $mensagemInicia;?> <i
					class="fa fa-home fa-1x"></i></a>
			</div>
		</div>
	</nav>
	<div class="container-fluid">
		<div class="row">
			<ol class="breadcrumb">
				<li><a href="../init/index.php?home=">i3Geo</a></li>
				<li class="active">RSS/XML/JSON</li>
			</ol>
		</div>
	</div>
	<div class="container">
		<div class="row center-block">
			<div class="col-sm-12 hidden">
				<!-- Template para criacao dos quadros ver index.js -->
				<div class="panel panel-default">
					<div class="panel-body" id="botoesTpl">
						<div class="list-group" >
							<div class="row-action-primary">
								<div class="bs-component btn-group-sm pull-left">
									<a class="btn btn-primary btn-fab" href="{{{link}}}"> <i class="material-icons">launch</i>
									</a>
								</div>
							</div>
							<div class="row-content">
								<h4 class="list-group-item-heading">
									<a href="{{{link}}}">{{{corpo}}} </a>
								</h4>
							</div>
							<div class="list-group-separator"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src='../classesjs/compactados/mustache.js'></script>
	<script src='../classesjs/compactados/dicionario_compacto.js'></script>
	<script src='../classesjs/compactados/classe_util_compacto.js'></script>
	<script src='../classesjs/compactados/classe_idioma_compacto.js'></script>
	<script src='dicionario.js'></script>
	<script src='index.js'></script>

	<script>
	$(document).ready(function(){
		i3GEO.configura = {"locaplic" : "..","sid": ""};
		mostraBotoesBT();
		$('.hidden').removeClass('hidden');
		$.material.init();
	});
	</script>

</body>
</html>

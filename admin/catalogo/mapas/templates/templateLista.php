<script id="templateLista" type="x-tmpl-mustache">
<div class="list-group-item" id="form-{{id_mapa}}">
	<div class="row-content">
		<h4 class="list-group-item-heading {{escondido}}">
			<a title="i3Geo" href="javascript:void(0)" onclick="window.open('../../../admin/black_editorCriaMapa.php?id_mapa={{id_mapa}}')" class="contemmapfile{{contemmapfile}} btn btn-danger btn-fab btn-fab-mini pull-right" role="button">
				<i class="material-icons md-18">send</i>
			</a>
			<span class="pull-right">&nbsp;&nbsp;</span>
            <a href="javascript:void(0)" onclick="{{onEditar}}('{{id_mapa}}')" class="btn btn-danger btn-fab btn-fab-mini pull-right" role="button">
				<i class="material-icons md-18">edit</i>
			</a>
			<span class="pull-right">&nbsp;&nbsp;</span>
            <a href="javascript:void(0)" onclick="{{onExcluir}}('{{id_mapa}}')" class="btn btn-danger btn-fab btn-fab-mini pull-right" role="button">
				<i class="material-icons md-18">delete_forever</i>
			</a>
			&nbsp;{{{nome_mapa}}}
		</h4>
	</div>
	<div class="list-group-separator"></div>
</div>
</script>
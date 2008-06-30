YAHOO.namespace("example.container");
function initMenu()
{
	ativaBotaoAdicionaMenu()
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	core_pegaPerfis("pegaMenus()");
}
function ativaBotaoAdicionaMenu()
{
	var adicionalinha = function()
	{
		core_carregando("ativa");
		core_carregando(" adicionando um novo registro");
		var sUrl = "../php/menutemas.php?funcao=alteraMenus&publicado_menu=&perfil=&nome=&desc=&id=&aberto=";
		var callback =
		{
  			success:function(o)
  			{
  				try
  				{
  					myDataTable.addRow(YAHOO.lang.JSON.parse(o.responseText)[0],0);
  					core_carregando("desativa");
  				}
  				catch(e){core_handleFailure(o,o.responseText);}
  			},
  			failure:core_handleFailure,
  			argument: { foo:"foo", bar:"bar" }
		}; 
		core_makeRequest(sUrl,callback)
	};
	//cria o bot�o de adi��o de um novo menu
	var adiciona = new YAHOO.widget.Button("adiciona",{ onclick: { fn: adicionalinha } });
}
function pegaMenus()
{
	core_carregando("buscando menus...");
	var sUrl = "../php/menutemas.php?funcao=pegaMenus";
	var callback =
	{
  		success:function(o)
  		{
  			try
  			{montaTabela(YAHOO.lang.JSON.parse(o.responseText));}
  			catch(e){core_handleFailure(o,o.responseText);}
  		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	}; 
	core_makeRequest(sUrl,callback)
}
function montaTabela(dados)
{
    YAHOO.example.InlineCellEditing = new function()
    {
        // Custom formatter for "address" column to preserve line breaks
        var formatTexto = function(elCell, oRecord, oColumn, oData)
        {
            elCell.innerHTML = "<pre ><p>" + oData + "</pre>";
        };
        var formatSalva = function(elCell, oRecord, oColumn)
        {
            elCell.innerHTML = "<div class=aplicar style='text-align:center' onclick='gravaLinha(\""+oRecord._sId+"\")'></div>";
        };
        var formatExclui = function(elCell, oRecord, oColumn)
        {
            elCell.innerHTML = "<div class=excluir style='text-align:center' ></div>";//onclick='excluiLinha(\""+oRecord.getData("id_menu")+"\",\""+oRecord.getId()+"\")'></div>";
        };
        var myColumnDefs = [
            {key:"excluir",label:"excluir",formatter:formatExclui},
            {label:"salvar",formatter:formatSalva},
            {label:"id",key:"id_menu", formatter:formatTexto},
			{label:"nome",resizeable:true,key:"nome_menu", formatter:formatTexto, editor:"textbox"},
			{label:"publicado?",key:"publicado_menu",editor:"radio" ,editorOptions:{radioOptions:["SIM","NAO"],disableBtns:false}},
			{label:"perfis",resizeable:true,key:"perfil_menu", formatter:formatTexto,editor:"textbox"},
			{label:"aberto?",key:"aberto", editor:"radio" ,editorOptions:{radioOptions:["SIM","NAO"],disableBtns:false}},
			{label:"descri��o",resizeable:true,key:"desc_menu", formatter:formatTexto, editor:"textbox"}
        ];
        myDataSource = new YAHOO.util.DataSource(dados);
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
        myDataSource.responseSchema =
        {
            fields: ["publicado_menu","perfil_menu","aberto","desc_menu","id_menu","nome_menu"]
        };
        myDataTable = new YAHOO.widget.DataTable("tabela", myColumnDefs, myDataSource);
        // Set up editing flow
        myDataTable.highlightEditableCell = function(oArgs)
        {
            var elCell = oArgs.target;
            var column = myDataTable.getColumn(oArgs.target);
            //if(column.editor != "null")
            if(!YAHOO.lang.isNull(column.editor))
            {
				YAHOO.util.Dom.addClass(elCell,'yui-dt-highlighted');
            }
        };
        myDataTable.unhighlightEditableCell = function(oArgs)
        {
            var elCell = oArgs.target;
            if(elCell.style.cursor="pointer")
            {
				YAHOO.util.Dom.removeClass(elCell,'yui-dt-highlighted');
            }
        };
        myDataTable.subscribe("cellMouseoverEvent", myDataTable.highlightEditableCell);
        myDataTable.subscribe("cellMouseoutEvent", myDataTable.unhighlightEditableCell);
		myDataTable.subscribe('cellClickEvent',function(ev)
		{
			var target = YAHOO.util.Event.getTarget(ev);
			var column = this.getColumn(target);
			if(YAHOO.example.container.panelCK)
			{
				YAHOO.example.container.panelCK.destroy();
				YAHOO.example.container.panelCK = null;
			}
			if (column.key == 'excluir')
			{
				var record = this.getRecord(target);
				excluiLinha(record.getData('id_menu'),target);
			}
			else
			{
				if (column.key == 'perfil_menu')
				{
					var record = this.getRecord(target);
					var selecionados = record.getData('perfil_menu');
					var selecionados = selecionados.split(",");
					core_menuCheckBox($perfisArray,$perfisArray,selecionados,target,record,"perfil_menu");
				}
				else
				{this.onEventShowCellEditor(ev);}
			}
		});
        // Hook into custom event to customize save-flow of "radio" editor
        myDataTable.subscribe("editorUpdateEvent", function(oArgs)
        {
            if(oArgs.editor.column.key === "active")
            {
                this.saveCellEditor();
                
            }
        });
        myDataTable.subscribe("editorBlurEvent", function(oArgs)
        {
            this.cancelCellEditor();
        });
    };
    core_carregando("desativa");
}
function gravaLinha(row)
{
	var r = myDataTable.getRecordSet().getRecord(row);
	var publicado_menu = r.getData("publicado_menu");
	var perfil_menu = r.getData("perfil_menu");
	var aberto = r.getData("aberto")
	var desc_menu = r.getData("desc_menu")
	var id_menu = r.getData("id_menu")
	var nome_menu = r.getData("nome_menu")
	core_carregando("ativa");
	core_carregando(" gravando registro do id= "+id_menu);
	var sUrl = "../php/menutemas.php?funcao=alteraMenus&publicado_menu="+publicado_menu+"&perfil="+perfil_menu+"&nome="+nome_menu+"&desc="+desc_menu+"&id="+id_menu+"&aberto="+aberto+"";
	var callback =
	{
  		success:function(o)
  		{
			var rec = myDataTable.getRecordSet().getRecord(row);
			myDataTable.updateRow(rec,YAHOO.lang.JSON.parse(o.responseText)[0])
  			core_carregando("desativa");
  		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	}; 
	core_makeRequest(sUrl,callback)
}
function excluiLinha(id,row)
{
	//dialogo
	// Define various event handlers for Dialog
	var handleYes = function() {
		this.hide();
		core_carregando("ativa");
		core_carregando(" excluindo o registro do id= "+id);
		var sUrl = "../php/menutemas.php?funcao=excluirRegistro&id="+id+"&tabela=menus";
		var callback =
		{
  			success:function(o)
  			{
  				try
  				{
  					if(YAHOO.lang.JSON.parse(o.responseText) == "erro")
  					{
  						core_carregando("<span style=color:red >N�o foi poss�vel excluir. Verifique se n�o existem grupos vinculados a este menu</span>");
  						setTimeout("core_carregando('desativa')",3000)
  					}
  					else
  					{
  						myDataTable.deleteRow(row);
  						core_carregando("desativa");
  					}
  				}
  				catch(e){core_handleFailure(o,o.responseText);}
  			},
  			failure:core_handleFailure,
  			argument: { foo:"foo", bar:"bar" }
		}; 
		core_makeRequest(sUrl,callback)
	};
	var handleNo = function()
	{
		this.hide();
	};
	var mensagem = "Exclui o registro?";
	var largura = "300"
	core_dialogoContinua(handleYes,handleNo,mensagem,largura)	
}
YAHOO.util.Event.addListener(window, "load", initMenu);
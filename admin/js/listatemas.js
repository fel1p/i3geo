YAHOO.namespace("example.container");
function initMenu()
{
	core_ativaBotaoAdicionaLinha("../php/menutemas.php?funcao=alteraTemas","adiciona")
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	core_pegaPerfis("pegaTemas()");
}
function pegaTemas()
{
	core_pegaDados("buscando temas...","../php/menutemas.php?funcao=pegaTemas2","montaTabela")
}
function montaTabela(dados)
{
    YAHOO.example.InlineCellEditing = new function()
    {
        // Custom formatter for "address" column to preserve line breaks
        var formatTextoId = function(elCell, oRecord, oColumn, oData)
        {
            elCell.innerHTML = "<p>" + oData + "</p>";
        };

        var formatMais = function(elCell, oRecord, oColumn)
        {
            elCell.innerHTML = "<div class=editar style='text-align:center' ></div>";
        };
        var formatExclui = function(elCell, oRecord, oColumn)
        {
            elCell.innerHTML = "<div class=excluir style='text-align:center' ></div>";
        };
        var myColumnDefs = [
            {key:"excluir",label:"excluir",formatter:formatExclui},
            {key:"mais",label:"editar",formatter:formatMais},
            {label:"id",key:"id_tema", formatter:formatTextoId},
            {label:"codigo (mapfile)",key:"codigo_tema", formatter:formatTextoId},
            {label:"nome",key:"nome_tema", formatter:formatTextoId},
        ];
        myDataSource = new YAHOO.util.DataSource(dados);
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
        myDataSource.responseSchema =
        {
            fields: ["nome_tema","codigo_tema","id_tema"]
        };
        myDataTable = new YAHOO.widget.DataTable("tabela", myColumnDefs, myDataSource);
        // Set up editing flow
		myDataTable.subscribe('cellClickEvent',function(ev)
		{
			var target = YAHOO.util.Event.getTarget(ev);
			var column = this.getColumn(target);
			if (column.key == 'excluir')
			{
				var record = this.getRecord(target);
				excluiLinha(record.getData('id_tema'),target);
			}
			if (column.key == 'mais')
			{
				var record = this.getRecord(target);
				core_carregando("ativa");
				core_carregando("buscando dados...");
				$clicouId = record.getData('id_tema');
				$recordid = record.getId();
				var sUrl = "../php/menutemas.php?funcao=pegaTemas&id_tema="+record.getData('id_tema');
				var callback =
				{
  					success:function(o)
  					{
  						try
  						{
  							montaEditorTema(YAHOO.lang.JSON.parse(o.responseText),$clicouId,$recordid);
  						}
  						catch(e){core_handleFailure(e,o.responseText);}
  					},
  					failure:core_handleFailure,
  					argument: { foo:"foo", bar:"bar" }
				}; 
				core_makeRequest(sUrl,callback)
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
function montaEditorTema(dados,id,recordid)
{
	function on_editorCheckBoxChange(p_oEvent)
	{
		var ins = "";
		if(p_oEvent.newValue.get("value") == "OK")
		{
			gravaDadosTema(id,recordid);
		}
		else
		{
			YAHOO.example.container.panelEditorTema.destroy();
			YAHOO.example.container.panelEditorTema = null;
		}
	};
	if(!YAHOO.example.container.panelEditorTema)
	{
		var novoel = document.createElement("div");
		novoel.id =  "janela_editor";
		var ins = '<div class="hd">Editor</div>';
		ins += "<div class='bd' style='height:354px;overflow:auto'>";
		ins += "<div id='okcancel_checkbox'></div><div id='editor_bd'></div>";
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
		var editorBotoes = new YAHOO.widget.ButtonGroup({id:"okcancel_checkbox_id", name:  "okcancel_checkbox_id", container:  "okcancel_checkbox" });
		editorBotoes.addButtons([
            { label: "Salva", value: "OK", checked: false},
            { label: "Cancela", value: "CANCEL", checked: false }
        ]);
		editorBotoes.on("checkedButtonChange", on_editorCheckBoxChange);	
		YAHOO.example.container.panelEditorTema = new YAHOO.widget.Panel("janela_editor", { fixedcenter:true,close:false,width:"400px", height:"400px",overflow:"auto", visible:false,constraintoviewport:true } );
		YAHOO.example.container.panelEditorTema.render();
	}
	YAHOO.example.container.panelEditorTema.show();
	//carrega os dados na janela
	$i("editor_bd").innerHTML = montaDivTemas(dados[0])
	core_carregando("desativa");
	//
	//preenche a div com a lista de tags
	//
	core_comboTags("comboTags","Etags_tema","registraTag");
	//
	//preenche a div com a lista de mapfiles
	//
	core_comboMapfiles("comboMapfiles","Ecodigo_tema",dados[0].codigo_tema);
}
function registraTag(valor)
{
	var inp = $i("Etags_tema")
	var tags = inp.value
	if(tags == "")
	inp.value = valor
	else
	inp.value = tags+" "+valor
}
function montaDivTemas(i)
{
	var param = {
		"linhas":[
		{titulo:"Nome do tema:",id:"Enome_tema",size:"50",value:i.nome_tema,tipo:"text",div:""}
		]
	}
	var ins = ""
	ins += core_geraLinhas(param)	

	ins += "<p>Mapfile (c�digo do mapfile que ser� utilizado para criar a camada no i3geo):"
	ins += "<div id=comboMapfiles >Buscando...</div>";
	
	ins += "<p>Descri��o:<br>";
	ins += "<input size=50 type=text id=Edesc_tema value='"+i.desc_tema+"' /></p>"
	
	ins += "<p>Link para a fonte:<br>";
	ins += "<input size=50 type=text id=Elink_tema value='"+i.link_tema+"' /></p>"
	
	ins += "<p>Tags (separe com espa�o). Voc� pode digitar novos tags ou pegar da lista abaixo:"
	ins += "<input type=text size=50 value='"+i.tags_tema+"' id='Etags_tema' ><br>"
	ins += "<div id=comboTags >Buscando...</div>";
	
	ins += "<p>Tipo:<br>"
	ins += "<select  id='Etipo_tema' />"
	ins += "<option value='' "
	if (i.tipoa_tema == ""){ins += "selected";}
	ins += ">Normal</option>"
	ins += "<option value='WMS' "
	if (i.tipoa_tema == "WMS"){ins += "selected";}
	ins += " >WMS<option></select></p>"
	
	ins += "<p>Permite acesso via WMS/WFS?<br>"
	ins += "<select  id='Eogc_tema' >"
	ins += core_combosimnao(i.ogc_tema)
	ins += "</select></p>"
	
	ins += "<p>Permite o download na aplica��o datadownload.htm?<br>"
	ins += "<select  id='Edownload_tema' >"
	ins += core_combosimnao(i.download_tema)
	ins += "</select></p>"

	ins += "<p>Permite acesso via kml?<br>"
	ins += "<select  id='Ekml_tema' >"
	ins += core_combosimnao(i.kml_tema)
	ins += "</select></p>"
	return(ins)
}
function excluiLinha(id,row)
{
	var mensagem = " excluindo o registro do id= "+id;
	var sUrl = "../php/menutemas.php?funcao=excluirRegistro&id="+id+"&tabela=temas";
	core_excluiLinha(sUrl,row,mensagem)
}
function gravaDadosTema(id,recordid)
{
	var campos = new Array("nome","codigo","desc","link","tags","tipo","ogc","download","kml")
	var par = ""
	for (i=0;i<campos.length;i++)
	{par += "&"+campos[i]+"="+($i("E"+campos[i]+"_tema").value)}
	par += "&id="+id
	core_carregando("ativa");
	core_carregando(" gravando o registro do id= "+id);
	var sUrl = "../php/menutemas.php?funcao=alteraTemas"+par;
	var callback =
	{
  		success:function(o)
  		{
  			try
  			{
  				if(YAHOO.lang.JSON.parse(o.responseText) == "erro")
  				{
  					core_carregando("<span style=color:red >N�o foi poss�vel excluir. Verifique se n�o existem menus vinculados a este tema</span>");
  					setTimeout("core_carregando('desativa')",3000)
  				}
  				else
  				{
  					var rec = myDataTable.getRecordSet().getRecord(recordid);
  					myDataTable.updateRow(rec,YAHOO.lang.JSON.parse(o.responseText)[0])
  					core_carregando("desativa");
  				}
				YAHOO.example.container.panelEditorTema.destroy();
				YAHOO.example.container.panelEditorTema = null;
  			}
  			catch(e){core_handleFailure(e,o.responseText);}
  		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	}; 
	core_makeRequest(sUrl,callback)
}
YAHOO.util.Event.addListener(window, "load", initMenu);
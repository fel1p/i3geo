YAHOO.namespace("example.container");
function initMenu()
{
	ativaBotaoAdicionaRaiz("../php/sistemas.php?funcao=alterarSistemas","adiciona")
	core_carregando("ativa");
	core_ativaPainelAjuda("ajuda","botaoAjuda");
	core_pegaPerfis("pegaSistemas()");
}
function ativaBotaoAdicionaRaiz(sUrl,idBotao)
{
	var adiciona = function()
	{
		core_carregando("ativa");
		core_carregando(" adicionando um novo registro");
		var callback =
		{
  			success:function(o)
  			{
  				try
  				{
  					adicionaNosRaiz(YAHOO.lang.JSON.parse(o.responseText),true);
  					core_carregando("desativa");
  				}
  				catch(e){core_handleFailure(e,o.responseText);}
  			},
  			failure:core_handleFailure,
  			argument: { foo:"foo", bar:"bar" }
		}; 
		core_makeRequest(sUrl,callback)
	};
	//cria o bot�o de adi��o de um novo menu
	var adiciona = new YAHOO.widget.Button(idBotao,{ onclick: { fn: adiciona } });
}
function pegaSistemas()
{
	core_pegaDados("buscando sistemas...","../php/sistemas.php?funcao=pegaSistemas","montaArvore")
}
function montaArvore(dados)
{
	YAHOO.example.treeExample = new function()
	{
		var currentIconMode;
		tree = "";
		function changeIconMode()
		{
			var newVal = parseInt(this.value);
			if (newVal != currentIconMode)
			{currentIconMode = newVal;}
			buildTree();
		}
        function loadNodeData(node, fnLoadComplete)
        {
			var sUrl = "../php/sistemas.php?funcao=pegaFuncoes&id_sistema="+node.data.id_sistema;
			var callback =
			{
                success: function(oResponse)
                {
                    var dados = YAHOO.lang.JSON.parse(oResponse.responseText)
					adicionaNos(node,dados,false)
                    oResponse.argument.fnLoadComplete();
                },
                failure: function(oResponse)
                {
                    oResponse.argument.fnLoadComplete();
                },
                argument:
                {
                    "node": node,
                    "fnLoadComplete": fnLoadComplete
                },
                timeout: 7000
            };
            YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
        }
        function buildTree()
        {
			tree = new YAHOO.widget.TreeView("tabela");
			tree.setDynamicLoad(loadNodeData, currentIconMode);
			adicionaNosRaiz(dados)
			var root = tree.getRoot();
			var tempNode = new YAHOO.widget.TextNode('', root, false);
			tempNode.isLeaf = true;
			tree.draw();
			core_carregando("desativa");
        }
    	buildTree();
	}();
}
function adicionaNos(no,dados,redesenha)
{
	for (var i=0, j=dados.length; i<j; i++)
	{
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"excluir('funcao','"+dados[i].id_funcao+"')\" title=excluir width='10px' heigth='10px' src=\"../imagens/01.png\" />&nbsp;"
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:0px\" onclick=\"editar('funcao','"+dados[i].id_funcao+"')\" title=editar width='10px' heigth='10px' src=\"../imagens/06.png\" />&nbsp;<span>"+dados[i].nome_funcao+"</span>"
		var d = {html:conteudo,id_funcao:dados[i].id_funcao,tipo:"funcao"}
		var tempNode = new YAHOO.widget.HTMLNode(d, no, false,true);
		tempNode.isLeaf = true;
	}
	if(redesenha){tree.draw();}
}
function adicionaNosRaiz(dados,redesenha)
{
	var root = tree.getRoot();
	for (var i=0, j=dados.length; i<j; i++)
	{
		var conteudo = "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"excluir('sistema','"+dados[i].id_sistema+"')\" title=excluir src=\"../imagens/01.png\" />"
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"adicionarFuncao('"+dados[i].id_sistema+"')\" title='adiciona fun��o' src=\"../imagens/05.png\" />"
		conteudo += "&nbsp;<img style=\"position:relative;cursor:pointer;top:2px\" onclick=\"editar('sistema','"+dados[i].id_sistema+"')\" title=editar src=\"../imagens/06.png\" /><b>&nbsp;"+dados[i].nome_sistema
		var d = {html:conteudo,id_sistema:dados[i].id_sistema,tipo:"sistema"};
		var tempNode = new YAHOO.widget.HTMLNode(d, root, false,true);
	}
	if(redesenha){tree.draw();}
}
function editar(tipo,id)
{
	if(tipo == "funcao")
	{
		core_carregando("ativa");
		core_carregando(" buscando dados");
		var callback =
		{
			success:function(o)
			{
				try
				{
					montaEditorFuncoes(YAHOO.lang.JSON.parse(o.responseText)[0],id);
					core_carregando("desativa");
				}
				catch(e){core_handleFailure(e,o.responseText);}
			},
			failure:core_handleFailure,
			argument: { foo:"foo", bar:"bar" }
		}; 
		var sUrl = "../php/sistemas.php?funcao=pegaFuncao&id_funcao="+id;
		core_makeRequest(sUrl,callback)
	}
}
function montaEditorFuncoes(dados,id)
{
	function on_editorCheckBoxChange(p_oEvent)
	{
		var ins = "";
		if(p_oEvent.newValue.get("value") == "OK")
		{
			gravaDadosFuncao(id);
		}
		else
		{
			YAHOO.example.container.panelEditorFuncao.destroy();
			YAHOO.example.container.panelEditorFuncao = null;
		}
	};
	if(!YAHOO.example.container.panelEditorFuncao)
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
		YAHOO.example.container.panelEditorFuncao = new YAHOO.widget.Panel("janela_editor", { fixedcenter:true,close:false,width:"400px", height:"400px",overflow:"auto", visible:false,constraintoviewport:true } );
		YAHOO.example.container.panelEditorFuncao.render();
	}
	YAHOO.example.container.panelEditorFuncao.show();
	//carrega os dados na janela
	$i("editor_bd").innerHTML = montaDivFuncoes(dados)
	core_carregando("desativa");
	//
	//preenche a div com a lista de tags
	//
	//core_comboTags("comboTags","Etags_tema","registraTag");
	//
	//preenche a div com a lista de mapfiles
	//
	//core_comboMapfiles("comboMapfiles","Ecodigo_tema",dados[0].codigo_tema);
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
function montaDivFuncoes(i)
{
	var param =
	{
		"linhas":[
		{titulo:"Nome da fun��o:",id:"Enome_funcao",size:"50",value:i.nome_funcao,tipo:"text",div:""},
		{titulo:"Programa que ser� executado:",id:"Eabrir_funcao",size:"50",value:i.abrir_funcao,tipo:"text",div:""},
		{titulo:"Largura da janela onde o programa ser� aberto:",id:"Ew_funcao",size:"5",value:i.w_funcao,tipo:"text",div:""},
		{titulo:"Altura da janela:",id:"Eh_funcao",size:"5",value:i.h_funcao,tipo:"text",div:""},
		{titulo:"Perfis:",id:"Eperfil_funcao",size:"50",value:i.perfil_funcao,tipo:"text",div:""}
		]
	}
	var ins = ""
	ins += core_geraLinhas(param)	
	return(ins)
}
function excluir(tipo,id)
{
	var mensagem = " excluindo o registro do id= "+id;
	if(tipo == "sistema")
	{
		var no = tree.getNodeByProperty("id_sistema",id)
		var sUrl = "../php/sistemas.php?funcao=excluirSistema&id="+id+"&tabela=sistemas";
	}
	if(tipo == "funcao")
	{
		var no = tree.getNodeByProperty("id_funcao",id)
		var sUrl = "../php/sistemas.php?funcao=excluirFuncao&id="+id+"&tabela=funcoes";
	}
	core_excluiNoTree(sUrl,no,mensagem)
}
function adicionarFuncao(id)
{
	var mensagem = " adicionando fun��o...";
	var no = tree.getNodeByProperty("id_sistema",id)
	var sUrl = "../php/sistemas.php?funcao=alterarFuncoes&id_sistema="+id;
	var callback =
	{
    	success: function(oResponse)
		{
			var dados = YAHOO.lang.JSON.parse(oResponse.responseText)
			adicionaNos(no,dados,true)
		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	};
	
	core_makeRequest(sUrl,callback)
}
function gravaDadosFuncao(id)
{
	var campos = new Array("perfil","w","h","abrir","nome")
	var par = ""
	for (i=0;i<campos.length;i++)
	{par += "&"+campos[i]+"_funcao="+($i("E"+campos[i]+"_funcao").value)}
	par += "&id_funcao="+id
	core_carregando("ativa");
	core_carregando(" gravando o registro do id= "+id);
	var sUrl = "../php/sistemas.php?funcao=alterarFuncoes"+par;
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
  					//var rec = myDataTable.getRecordSet().getRecord(recordid);
  					//myDataTable.updateRow(rec,YAHOO.lang.JSON.parse(o.responseText)[0])
  					var no = tree.getNodeByProperty("id_funcao",id)
  					no.getContentEl().getElementsByTagName("span")[0].innerHTML = document.getElementById("Enome_funcao").value
  					core_carregando("desativa");
  				}
				YAHOO.example.container.panelEditorFuncao.destroy();
				YAHOO.example.container.panelEditorFuncao = null;
  			}
  			catch(e){core_handleFailure(e,o.responseText);}
  		},
  		failure:core_handleFailure,
  		argument: { foo:"foo", bar:"bar" }
	}; 
	core_makeRequest(sUrl,callback)
}
YAHOO.util.Event.addListener(window, "load", initMenu);